# ==============================================================================
# 🍷 THE BOTTLE CLUB - COMPLETE E-COMMERCE FASTAPI ROUTER
# File: ecommerce_router.py (Include in FastAPI: app.include_router(ecommerce_router))
# ==============================================================================

from fastapi import (
    APIRouter, Depends, HTTPException, Query, UploadFile,
    File, Form, status, Body
)
from sqlalchemy.orm import Session
from sqlalchemy import func, desc, and_, text
from typing import List, Optional, Dict, Any
from datetime import datetime, date, time
from decimal import Decimal
import json
import os
import shutil

# ปรับแก้ Import ตามโครงสร้าง Backend ของเพื่อน
# from app.db.session import get_db
# from app.api.deps import get_current_user, get_current_admin
# from app.models import ...
# from app.schemas import ...

from .ecommerce_models import (
    CustomerAddress, SlipVerification, LoyaltyTransaction,
    ProductReview, EcommerceSetting
)
from .ecommerce_schemas import (
    OrderEcommerceCreate, OrderEcommerceResponse, OrderTrackingUpdate,
    SlipResponse, SlipApprovalAction, SlipRejectAction,
    CustomerAddressCreate, CustomerAddressUpdate, CustomerAddressResponse,
    LoyaltyBalanceResponse, LoyaltyTransactionResponse, LoyaltyEarnRequest,
    WineProductUpdateSchema, CouponValidateRequest, CouponValidateResponse,
    ProductReviewCreate, ProductReviewResponse, EcommerceSettingsSchema,
    DashboardMetricsResponse
)

router = APIRouter(prefix="/api/v1", tags=["Bottle Club E-Commerce"])

# โฟลเดอร์เก็บรูปภาพสลิป
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads/slips")
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ─────────────────────────────────────────────────────────────────────────────
# 1. DASHBOARD WEB WINE (Module 1)
# ─────────────────────────────────────────────────────────────────────────────
@router.get("/reports/ecommerce/dashboard", response_model=Dict[str, Any])
def get_ecommerce_dashboard(
    db: Session = Depends(lambda: None)  # Replace with Depends(get_db)
):
    """
    สรุปตัวเลขสถิติยอดขาย คำสั่งซื้อ สลิปรอตรวจสอบ สำหรับหน้า Admin (/admin/bottleclub)
    """
    today = date.today()
    first_day_month = today.replace(day=1)

    # 1. ยอดขายวันนี้ (เฉพาะ e-Commerce)
    sales_today = db.execute(
        text("SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE order_source = 'ecommerce' AND status = 'paid' AND DATE(created_at) = :today"),
        {"today": today}
    ).scalar() or 0.0

    # 2. ยอดขายเดือนนี้
    sales_month = db.execute(
        text("SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE order_source = 'ecommerce' AND status = 'paid' AND created_at >= :first_day"),
        {"first_day": first_day_month}
    ).scalar() or 0.0

    # 3. ออเดอร์ที่รอดำเนินการ
    pending_orders = db.execute(
        text("SELECT COUNT(*) FROM orders WHERE order_source = 'ecommerce' AND status IN ('pending', 'pending_slip')")
    ).scalar() or 0

    # 4. สลิปรอตรวจสอบ
    pending_slips = db.execute(
        text("SELECT COUNT(*) FROM slip_verifications WHERE status = 'pending'")
    ).scalar() or 0

    # 5. จำนวนสมาชิกทั้งหมด
    total_members = db.execute(text("SELECT COUNT(*) FROM customers")).scalar() or 0

    # 6. ออเดอร์ล่าสุด
    recent_orders_rows = db.execute(
        text("""
            SELECT id, order_number, recipient_name, total_amount, status, payment_method, created_at
            FROM orders
            WHERE order_source = 'ecommerce'
            ORDER BY id DESC
            LIMIT 5
        """)
    ).fetchall()

    recent_orders = [
        {
            "id": r[0],
            "order_number": r[1] or f"BC-{r[0]}",
            "customer_name": r[2] or f"Customer #{r[0]}",
            "total_amount": float(r[3]),
            "status": r[4],
            "payment_method": r[5],
            "created_at": r[6].isoformat() if r[6] else None
        }
        for r in recent_orders_rows
    ]

    return {
        "status": "success",
        "data": {
            "sales_today": float(sales_today),
            "sales_this_month": float(sales_month),
            "pending_orders_count": pending_orders,
            "pending_slips_count": pending_slips,
            "total_members": total_members,
            "recent_orders": recent_orders,
            "top_selling_wines": []
        }
    }


# ─────────────────────────────────────────────────────────────────────────────
# 2. PROMOTIONS & COUPONS (Module 2)
# ─────────────────────────────────────────────────────────────────────────────
@router.get("/promotions/ecommerce")
def get_ecommerce_promotions(db: Session = Depends(lambda: None)):
    """
    ดึงแบนเนอร์และโปรโมชั่นหน้าร้าน The Bottle Club
    """
    return {
        "banners": [
            {
                "id": 1,
                "title": "PREMIUM FRENCH WINE FESTIVAL",
                "subtitle": "ลดสูงสุด 25% ต้อนรับฤดูกาลไวน์ใหม่จากฝรั่งเศส",
                "image_url": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200",
                "button_text": "ช้อปเลยตอนนี้",
                "link": "/product?country=FR"
            },
            {
                "id": 2,
                "title": "EXCLUSIVE VIP PRIVILEGES",
                "subtitle": "สมาชิก VIP รับแต้มสะสม 2 เท่า ทุกวันศุกร์และเสาร์",
                "image_url": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1200",
                "button_text": "ดูสิทธิประโยชน์",
                "link": "/account/points"
            }
        ]
    }


@router.post("/promotions/coupons/validate", response_model=CouponValidateResponse)
def validate_coupon(
    body: CouponValidateRequest,
    db: Session = Depends(lambda: None)
):
    """
    ตรวจสอบโค้ดส่วนลดในขั้นตอน Checkout
    """
    code = body.code.strip().upper()
    subtotal = body.subtotal

    # ตัวอย่างการตรวจสอบโค้ดส่วนลด (ปรับเชื่อมตาราง promotions/coupons จริง)
    valid_coupons = {
        "WINEVIP2026": {"type": "percentage", "value": Decimal("10.0"), "min_spend": Decimal("1500.00")},
        "WELCOME50": {"type": "fixed", "value": Decimal("50.0"), "min_spend": Decimal("500.00")},
        "FREESHIP": {"type": "fixed", "value": Decimal("120.0"), "min_spend": Decimal("2000.00")}
    }

    if code not in valid_coupons:
        raise HTTPException(status_code=400, detail="รหัสคูปองไม่ถูกต้อง หรือหมดอายุแล้ว")

    coupon = valid_coupons[code]
    if subtotal < coupon["min_spend"]:
        raise HTTPException(status_code=400, detail=f"ยอดสั่งซื้อขั้นต่ำสำหรับโค้ดนี้คือ ฿{coupon['min_spend']:,.2f}")

    if coupon["type"] == "percentage":
        discount = (subtotal * coupon["value"]) / Decimal("100.0")
    else:
        discount = coupon["value"]

    final_total = max(Decimal("0.00"), subtotal - discount)

    return CouponValidateResponse(
        valid=True,
        code=code,
        discount_type=coupon["type"],
        discount_value=coupon["value"],
        discount_amount=discount,
        final_total=final_total,
        message=f"ใช้โค้ดส่วนลดสำเร็จ ลดไป ฿{discount:,.2f}"
    )


# ─────────────────────────────────────────────────────────────────────────────
# 3. ONLINE ORDERS & CHECKOUT (Module 3)
# ─────────────────────────────────────────────────────────────────────────────
@router.post("/orders/ecommerce", status_code=status.HTTP_201_CREATED)
def create_ecommerce_order(
    payload: OrderEcommerceCreate,
    db: Session = Depends(lambda: None)
):
    """
    สร้างคำสั่งซื้อออนไลน์จากหน้าร้าน /checkout (The Bottle Club)
    """
    # 1. คำนวณราคารวม
    subtotal = sum(item.quantity * item.unit_price for item in payload.items)
    discount = Decimal("0.00")

    # ถ้ามีโค้ดส่วนลด ให้คิดส่วนลด
    if payload.coupon_code:
        if payload.coupon_code.upper() == "WINEVIP2026":
            discount = (subtotal * Decimal("10.0")) / Decimal("100.0")
        elif payload.coupon_code.upper() == "WELCOME50":
            discount = Decimal("50.0")

    total_amount = subtotal - discount + payload.shipping_fee

    # 2. สร้าง Order Number
    today_str = datetime.now().strftime("%Y%m%d")
    order_number = f"BC-{today_str}-{int(datetime.now().timestamp()) % 10000:04d}"

    # 3. บันทึกลงตาราง orders
    insert_order = db.execute(
        text("""
            INSERT INTO orders (
                order_number, customer_id, recipient_name, recipient_phone,
                shipping_address, delivery_note, order_source, subtotal,
                discount_amount, shipping_fee, total_amount, status,
                payment_method, coupon_code, created_at
            ) VALUES (
                :order_number, :customer_id, :recipient_name, :recipient_phone,
                :shipping_address, :delivery_note, 'ecommerce', :subtotal,
                :discount_amount, :shipping_fee, :total_amount, 'pending_slip',
                :payment_method, :coupon_code, NOW()
            ) RETURNING id
        """),
        {
            "order_number": order_number,
            "customer_id": payload.customer_id,
            "recipient_name": payload.recipient_name,
            "recipient_phone": payload.recipient_phone,
            "shipping_address": payload.shipping_address,
            "delivery_note": payload.delivery_note,
            "subtotal": subtotal,
            "discount_amount": discount,
            "shipping_fee": payload.shipping_fee,
            "total_amount": total_amount,
            "payment_method": payload.payment_method,
            "coupon_code": payload.coupon_code
        }
    ).fetchone()
    order_id = insert_order[0]

    # 4. บันทึก Order Items
    for item in payload.items:
        db.execute(
            text("""
                INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
                VALUES (:order_id, :product_id, :quantity, :unit_price, :total_price)
            """),
            {
                "order_id": order_id,
                "product_id": item.product_id,
                "quantity": item.quantity,
                "unit_price": item.unit_price,
                "total_price": item.quantity * item.unit_price
            }
        )

    db.commit()

    return {
        "id": order_id,
        "order_number": order_number,
        "subtotal": float(subtotal),
        "discount_amount": float(discount),
        "shipping_fee": float(payload.shipping_fee),
        "total_amount": float(total_amount),
        "status": "pending_slip",
        "payment_method": payload.payment_method,
        "created_at": datetime.now().isoformat()
    }


@router.get("/orders/ecommerce")
def list_ecommerce_orders(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(lambda: None)
):
    """
    ดึงรายการคำสั่งซื้อออนไลน์สำหรับ Admin (/admin/bottleclub/orders)
    """
    offset = (page - 1) * per_page
    query_sql = "SELECT * FROM orders WHERE order_source = 'ecommerce'"
    params: Dict[str, Any] = {"limit": per_page, "offset": offset}

    if status:
        query_sql += " AND status = :status"
        params["status"] = status

    if search:
        query_sql += " AND (order_number ILIKE :search OR recipient_name ILIKE :search)"
        params["search"] = f"%{search}%"

    query_sql += " ORDER BY id DESC LIMIT :limit OFFSET :offset"
    rows = db.execute(text(query_sql), params).fetchall()

    return {
        "data": [dict(r._mapping) for r in rows],
        "meta": {"page": page, "per_page": per_page}
    }


@router.put("/orders/{order_id}/tracking")
def update_order_tracking(
    order_id: int,
    body: OrderTrackingUpdate,
    db: Session = Depends(lambda: None)
):
    """
    Admin เพิ่มเลขพัสดุและเปลี่ยนสถานะเป็น shipped
    """
    db.execute(
        text("""
            UPDATE orders
            SET carrier_name = :carrier, tracking_number = :tracking, status = 'shipped'
            WHERE id = :order_id
        """),
        {"order_id": order_id, "carrier": body.carrier_name, "tracking": body.tracking_number}
    )
    db.commit()
    return {"status": "success", "message": "อัปเดตข้อมูลการจัดส่งเรียบร้อยแล้ว"}


@router.get("/orders/track/{tracking_or_ref}")
def public_track_order(
    tracking_or_ref: str,
    db: Session = Depends(lambda: None)
):
    """
    ลูกค้าตรวจสอบสถานะพัสดุหน้า /tracking
    """
    order = db.execute(
        text("SELECT * FROM orders WHERE order_number = :ref OR tracking_number = :ref LIMIT 1"),
        {"ref": tracking_or_ref}
    ).fetchone()

    if not order:
        raise HTTPException(status_code=404, detail="ไม่พบข้อมูลพัสดุหรือหมายเลขคำสั่งซื้อนี้")

    o = dict(order._mapping)
    return {
        "order_number": o.get("order_number"),
        "carrier_name": o.get("carrier_name"),
        "tracking_number": o.get("tracking_number"),
        "status": o.get("status"),
        "recipient_name": o.get("recipient_name"),
        "created_at": o.get("created_at")
    }


# ─────────────────────────────────────────────────────────────────────────────
# 4. SLIP VERIFICATION & PAYMENTS (Module 4)
# ─────────────────────────────────────────────────────────────────────────────
@router.post("/slip-verify/upload", status_code=status.HTTP_201_CREATED)
async def upload_payment_slip(
    order_id: int = Form(...),
    transfer_amount: Decimal = Form(...),
    transfer_date: str = Form(...),
    transfer_time: str = Form(...),
    bank_name: str = Form(...),
    customer_id: Optional[int] = Form(None),
    slip_file: UploadFile = File(...),
    db: Session = Depends(lambda: None)
):
    """
    ลูกค้าแนบสลิปโอนเงินหน้า /account/confirm-payment
    """
    # 1. บันทึกรูปภาพสลิป
    file_ext = os.path.splitext(slip_file.filename)[1] or ".jpg"
    filename = f"slip_order_{order_id}_{int(datetime.now().timestamp())}{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(slip_file.file, buffer)

    image_url = f"/uploads/slips/{filename}"

    # 2. บันทึกตาราง slip_verifications
    t_date = datetime.strptime(transfer_date, "%Y-%m-%d").date()
    t_time = datetime.strptime(transfer_time, "%H:%M").time()

    insert_slip = db.execute(
        text("""
            INSERT INTO slip_verifications (
                order_id, customer_id, image_url, transfer_amount,
                transfer_date, transfer_time, bank_name, status, created_at
            ) VALUES (
                :order_id, :customer_id, :image_url, :transfer_amount,
                :transfer_date, :transfer_time, :bank_name, 'pending', NOW()
            ) RETURNING id
        """),
        {
            "order_id": order_id,
            "customer_id": customer_id,
            "image_url": image_url,
            "transfer_amount": transfer_amount,
            "transfer_date": t_date,
            "transfer_time": t_time,
            "bank_name": bank_name
        }
    ).fetchone()

    # 3. อัปเดตตาราง orders
    db.execute(
        text("UPDATE orders SET slip_url = :image_url, status = 'pending_approval' WHERE id = :order_id"),
        {"image_url": image_url, "order_id": order_id}
    )
    db.commit()

    return {"status": "success", "slip_id": insert_slip[0], "image_url": image_url}


@router.get("/slip-verify/list")
def list_pending_slips(
    status: Optional[str] = Query("pending"),
    db: Session = Depends(lambda: None)
):
    """
    Admin ดูรายการสลิปที่รอตรวจสอบ (/admin/bottleclub/payments)
    """
    rows = db.execute(
        text("""
            SELECT sv.*, o.order_number, o.total_amount as order_total, c.first_name, c.last_name, c.email
            FROM slip_verifications sv
            JOIN orders o ON sv.order_id = o.id
            LEFT JOIN customers c ON sv.customer_id = c.id
            WHERE (:status IS NULL OR sv.status = :status)
            ORDER BY sv.id DESC
        """),
        {"status": status}
    ).fetchall()

    return {"data": [dict(r._mapping) for r in rows]}


@router.post("/slip-verify/{slip_id}/approve")
def approve_payment_slip(
    slip_id: int,
    action: SlipApprovalAction = Body(default=SlipApprovalAction()),
    db: Session = Depends(lambda: None)
):
    """
    🔥 CORE TRIGGER: Admin กดอนุมัติสลิป
    ระบบจะทำงานอัตโนมัติ 4 ขั้นตอน:
    1. เปลี่ยนสถานะสลิปเป็น approved
    2. เปลี่ยนสถานะออเดอร์เป็น paid
    3. ตัดสต็อกไวน์ในคลังตามสินค้าในออเดอร์
    4. มอบแต้ม Loyalty Points ให้ลูกค้า (100 THB = 1 แต้ม)
    """
    slip = db.execute(
        text("SELECT * FROM slip_verifications WHERE id = :id LIMIT 1"),
        {"id": slip_id}
    ).fetchone()

    if not slip:
        raise HTTPException(status_code=404, detail="ไม่พบข้อมูลสลิปนี้")

    s = dict(slip._mapping)
    order_id = s["order_id"]
    customer_id = s["customer_id"]

    # 1. อัปเดตสลิป
    db.execute(
        text("UPDATE slip_verifications SET status = 'approved', admin_note = :note, verified_at = NOW() WHERE id = :id"),
        {"id": slip_id, "note": action.admin_note}
    )

    # 2. อัปเดตออเดอร์
    db.execute(
        text("UPDATE orders SET status = 'paid', slip_verified = true WHERE id = :order_id"),
        {"order_id": order_id}
    )

    # 3. ตัดสต็อกไวน์
    order_items = db.execute(
        text("SELECT product_id, quantity FROM order_items WHERE order_id = :order_id"),
        {"order_id": order_id}
    ).fetchall()

    for item in order_items:
        prod_id, qty = item[0], item[1]
        db.execute(
            text("UPDATE products SET in_stock = GREATEST(0, in_stock - :qty) WHERE id = :prod_id"),
            {"qty": qty, "prod_id": prod_id}
        )

    # 4. มอบแต้มสะสม Loyalty (100 บาท = 1 แต้ม)
    total_amount = float(s["transfer_amount"])
    earned_points = int(total_amount // 100)

    if customer_id and earned_points > 0:
        # อัปเดต balance ของลูกค้า
        db.execute(
            text("UPDATE customers SET loyalty_points_balance = loyalty_points_balance + :points WHERE id = :cid"),
            {"points": earned_points, "cid": customer_id}
        )
        # ดึงยอดล่าสุด
        new_balance = db.execute(
            text("SELECT loyalty_points_balance FROM customers WHERE id = :cid"),
            {"cid": customer_id}
        ).scalar() or 0

        # บันทึกประวัติแต้ม
        db.execute(
            text("""
                INSERT INTO loyalty_transactions (customer_id, order_id, type, points, balance_after, description, created_at)
                VALUES (:cid, :order_id, 'earn', :points, :balance_after, :desc, NOW())
            """),
            {
                "cid": customer_id,
                "order_id": order_id,
                "points": earned_points,
                "balance_after": new_balance,
                "desc": f"ได้รับแต้มจากการสั่งซื้อคำสั่งซื้อ #{order_id} (฿{total_amount:,.2f})"
            }
        )

    db.commit()
    return {"status": "success", "message": "อนุมัติสลิปและตัดแต้มสะสมเรียบร้อยแล้ว", "earned_points": earned_points}


@router.post("/slip-verify/{slip_id}/reject")
def reject_payment_slip(
    slip_id: int,
    action: SlipRejectAction,
    db: Session = Depends(lambda: None)
):
    """
    Admin ปฏิเสธสลิป พร้อมระบุสาเหตุ
    """
    db.execute(
        text("UPDATE slip_verifications SET status = 'rejected', admin_note = :reason, verified_at = NOW() WHERE id = :id"),
        {"id": slip_id, "reason": action.reason}
    )
    db.commit()
    return {"status": "success", "message": "ปฏิเสธสลิปเรียบร้อยแล้ว"}


# ─────────────────────────────────────────────────────────────────────────────
# 5. WINE PRODUCT EDIT (Module 5)
# ─────────────────────────────────────────────────────────────────────────────
@router.put("/wine-products/{product_id}")
def update_wine_product(
    product_id: int,
    payload: WineProductUpdateSchema,
    db: Session = Depends(lambda: None)
):
    """
    Admin แก้ไขข้อมูลไวน์ (ราคา, สต็อก, ปริมาณ, แอลกอฮอล์ ฯลฯ) (/admin/bottleclub/products)
    """
    updates = []
    params: Dict[str, Any] = {"id": product_id}

    for field, val in payload.dict(exclude_unset=True).items():
        updates.append(f"{field} = :{field}")
        params[field] = val

    if not updates:
        return {"status": "no_change"}

    sql = f"UPDATE products SET {', '.join(updates)} WHERE id = :id"
    db.execute(text(sql), params)
    db.commit()
    return {"status": "success", "message": f"อัปเดตข้อมูลไวน์ ID #{product_id} เรียบร้อยแล้ว"}


# ─────────────────────────────────────────────────────────────────────────────
# 6. MEMBERS & ADDRESSES & LOYALTY (Module 6)
# ─────────────────────────────────────────────────────────────────────────────
@router.get("/customer-addresses/customer/{customer_id}", response_model=List[CustomerAddressResponse])
def get_customer_addresses(
    customer_id: int,
    db: Session = Depends(lambda: None)
):
    """
    ดึงรายการที่อยู่จัดส่งของลูกค้า (/account/addresses)
    """
    rows = db.execute(
        text("SELECT * FROM customer_addresses WHERE customer_id = :cid ORDER BY is_default DESC, id DESC"),
        {"cid": customer_id}
    ).fetchall()
    return [CustomerAddressResponse.from_orm(CustomerAddress(**dict(r._mapping))) for r in rows]


@router.post("/customer-addresses/", response_model=CustomerAddressResponse, status_code=status.HTTP_201_CREATED)
def create_customer_address(
    body: CustomerAddressCreate,
    db: Session = Depends(lambda: None)
):
    """
    เพิ่มที่อยู่จัดส่งใหม่ (/account/addresses)
    """
    if body.is_default:
        db.execute(
            text("UPDATE customer_addresses SET is_default = false WHERE customer_id = :cid"),
            {"cid": body.customer_id}
        )

    insert_res = db.execute(
        text("""
            INSERT INTO customer_addresses (
                customer_id, recipient_name, phone, address_line,
                subdistrict, district, province, postal_code, country, is_default, created_at, updated_at
            ) VALUES (
                :customer_id, :recipient_name, :phone, :address_line,
                :subdistrict, :district, :province, :postal_code, :country, :is_default, NOW(), NOW()
            ) RETURNING *
        """),
        body.dict()
    ).fetchone()
    db.commit()
    return dict(insert_res._mapping)


@router.get("/loyalty/balance/{customer_id}", response_model=LoyaltyBalanceResponse)
def get_loyalty_balance(
    customer_id: int,
    db: Session = Depends(lambda: None)
):
    """
    ดึงแต้มสะสมและระดับ VIP Tier สำหรับบัตรสมาชิกในหน้า /account
    """
    cust = db.execute(
        text("SELECT id, first_name, last_name, loyalty_points_balance FROM customers WHERE id = :cid LIMIT 1"),
        {"cid": customer_id}
    ).fetchone()

    if not cust:
        raise HTTPException(status_code=404, detail="ไม่พบข้อมูลลูกค้า")

    c = dict(cust._mapping)
    balance = c.get("loyalty_points_balance") or 0
    full_name = f"{c.get('first_name') or ''} {c.get('last_name') or ''}".strip() or f"Member #{customer_id}"

    # คำนวณระดับ Tier
    if balance >= 10000:
        tier = "DIAMOND VIP"
    elif balance >= 5000:
        tier = "PLATINUM LEVEL"
    elif balance >= 2000:
        tier = "GOLD VIP"
    elif balance >= 500:
        tier = "SILVER LEVEL"
    else:
        tier = "CLASSIC LEVEL"

    return LoyaltyBalanceResponse(
        customer_id=customer_id,
        customer_name=full_name,
        balance=balance,
        tier=tier,
        member_code=f"•••• •••• •••• {customer_id:04d}",
        pending_expiring=0
    )


@router.get("/loyalty/transactions/{customer_id}", response_model=List[LoyaltyTransactionResponse])
def get_loyalty_transactions(
    customer_id: int,
    db: Session = Depends(lambda: None)
):
    """
    ประวัติการได้รับและใช้แต้มสะสม (/account/points)
    """
    rows = db.execute(
        text("SELECT * FROM loyalty_transactions WHERE customer_id = :cid ORDER BY id DESC"),
        {"cid": customer_id}
    ).fetchall()
    return [dict(r._mapping) for r in rows]


@router.post("/loyalty/earn")
def earn_loyalty_points(
    body: LoyaltyEarnRequest,
    db: Session = Depends(lambda: None)
):
    """
    API เพิ่มแต้มสะสมให้ลูกค้า
    """
    db.execute(
        text("UPDATE customers SET loyalty_points_balance = loyalty_points_balance + :pts WHERE id = :cid"),
        {"pts": body.points, "cid": body.customer_id}
    )
    new_bal = db.execute(
        text("SELECT loyalty_points_balance FROM customers WHERE id = :cid"),
        {"cid": body.customer_id}
    ).scalar() or 0

    db.execute(
        text("""
            INSERT INTO loyalty_transactions (customer_id, order_id, type, points, balance_after, description, created_at)
            VALUES (:cid, :order_id, 'earn', :points, :balance_after, :desc, NOW())
        """),
        {
            "cid": body.customer_id,
            "order_id": body.order_id,
            "points": body.points,
            "balance_after": new_bal,
            "desc": body.description or f"เพิ่มคะแนนสะสม {body.points} PTS"
        }
    )
    db.commit()
    return {"status": "success", "new_balance": new_bal}


# ─────────────────────────────────────────────────────────────────────────────
# 7. PRODUCT REVIEWS & MODERATION (Module 7)
# ─────────────────────────────────────────────────────────────────────────────
@router.get("/reviews/product/{product_id}")
def get_product_reviews(
    product_id: int,
    db: Session = Depends(lambda: None)
):
    """
    ดึงรีวิวที่ผ่านการอนุมัติแล้วมาแสดงในหน้ารายละเอียดไวน์ (/product/[id])
    """
    rows = db.execute(
        text("SELECT * FROM product_reviews WHERE product_id = :pid AND status = 'approved' ORDER BY id DESC"),
        {"pid": product_id}
    ).fetchall()
    return {"reviews": [dict(r._mapping) for r in rows]}


@router.post("/reviews/", status_code=status.HTTP_201_CREATED)
def submit_product_review(
    body: ProductReviewCreate,
    customer_id: Optional[int] = None,
    db: Session = Depends(lambda: None)
):
    """
    ลูกค้าเขียนรีวิวไวน์
    """
    db.execute(
        text("""
            INSERT INTO product_reviews (product_id, customer_id, customer_name, rating, comment, status, created_at)
            VALUES (:pid, :cid, :name, :rating, :comment, 'pending', NOW())
        """),
        {
            "pid": body.product_id,
            "cid": customer_id,
            "name": body.customer_name,
            "rating": body.rating,
            "comment": body.comment
        }
    )
    db.commit()
    return {"status": "success", "message": "ส่งรีวิวเรียบร้อยแล้ว รอการอนุมัติจากผู้ดูแลระบบ"}


@router.put("/reviews/{review_id}/moderate")
def moderate_product_review(
    review_id: int,
    status: str = Query(..., regex="^(approved|rejected)$"),
    db: Session = Depends(lambda: None)
):
    """
    Admin อนุมัติหรือซ่อนรีวิวไวน์ (/admin/bottleclub/reviews)
    """
    db.execute(
        text("UPDATE product_reviews SET status = :st WHERE id = :id"),
        {"st": status, "id": review_id}
    )
    db.commit()
    return {"status": "success", "message": f"เปลี่ยนสถานะรีวิวเป็น {status} เรียบร้อยแล้ว"}


# ─────────────────────────────────────────────────────────────────────────────
# 8. STORE SETTINGS (Module 9)
# ─────────────────────────────────────────────────────────────────────────────
@router.get("/settings/ecommerce")
def get_ecommerce_settings(db: Session = Depends(lambda: None)):
    """
    ดึงค่าจัดส่ง บัญชีธนาคารรับโอน และกฎแต้มสะสม
    """
    rows = db.execute(text("SELECT key, value FROM ecommerce_settings")).fetchall()
    settings_dict = {r[0]: r[1] for r in rows}
    return settings_dict


@router.put("/settings/ecommerce")
def update_ecommerce_settings(
    settings: Dict[str, Any],
    db: Session = Depends(lambda: None)
):
    """
    Admin บันทึกการตั้งค่าร้านค้าออนไลน์ (/admin/bottleclub/settings)
    """
    for key, val in settings.items():
        db.execute(
            text("""
                INSERT INTO ecommerce_settings (key, value, updated_at)
                VALUES (:key, :val, NOW())
                ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
            """),
            {"key": key, "val": json.dumps(val)}
        )
    db.commit()
    return {"status": "success", "message": "บันทึกการตั้งค่าร้านค้าเรียบร้อยแล้ว"}
