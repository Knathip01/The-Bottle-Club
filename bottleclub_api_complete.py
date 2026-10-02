# ==============================================================================
# 🍷 THE BOTTLE CLUB & ADMIN POS WINE - ALL-IN-ONE BACKEND REST API
# File: bottleclub_api_complete.py
# Framework: FastAPI + SQLAlchemy + Pydantic v2 + PostgreSQL
# ==============================================================================
"""
คำแนะนำการใช้งาน:
1. นำไฟล์นี้ไปวางในโปรเจกต์ FastAPI ของคุณ (เช่น app/bottleclub_api_complete.py)
2. ติดตั้งไลบรารีที่จำเป็น:
   pip install fastapi uvicorn sqlalchemy psycopg2-binary httpx python-jose[cryptography] pydantic
3. ลงทะเบียน Router ใน main.py:
   from bottleclub_api_complete import router as bottleclub_router, init_db_tables
   app.include_router(bottleclub_router)
   # หรือรัน init_db_tables(engine) เพื่อสร้างตารางอัตโนมัติ
"""

import os
import shutil
import json
from decimal import Decimal
from datetime import datetime, date, time, timedelta
from typing import List, Optional, Dict, Any

import httpx
from jose import jwt
from pydantic import BaseModel, Field
from fastapi import (
    APIRouter, Depends, HTTPException, Query, UploadFile,
    File, Form, status, Body
)
from fastapi.responses import RedirectResponse
from sqlalchemy import (
    Column, Integer, String, Text, Numeric, Boolean,
    ForeignKey, DateTime, Date as SQLDate, Time as SQLTime, func, text
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Session, declarative_base

# ─────────────────────────────────────────────────────────────────────────────
# 1. DATABASE MODELS (SQLAlchemy)
# ─────────────────────────────────────────────────────────────────────────────
Base = declarative_base()

class CustomerAddress(Base):
    __tablename__ = "customer_addresses"
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, nullable=False, index=True)
    recipient_name = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    address_line = Column(Text, nullable=False)
    subdistrict = Column(String(255), nullable=True)
    district = Column(String(255), nullable=True)
    province = Column(String(255), nullable=True)
    postal_code = Column(String(20), nullable=True)
    country = Column(String(100), default="Thailand")
    is_default = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())


class SlipVerification(Base):
    __tablename__ = "slip_verifications"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, nullable=False, index=True)
    customer_id = Column(Integer, nullable=True)
    image_url = Column(Text, nullable=False)
    transfer_amount = Column(Numeric(10, 2), nullable=False)
    transfer_date = Column(SQLDate, nullable=False)
    transfer_time = Column(SQLTime, nullable=False)
    bank_name = Column(String(100), nullable=False)
    status = Column(String(30), default="pending", index=True)  # pending, approved, rejected
    admin_note = Column(Text, nullable=True)
    verified_by_user_id = Column(Integer, nullable=True)
    verified_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now())


class LoyaltyTransaction(Base):
    __tablename__ = "loyalty_transactions"
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, nullable=False, index=True)
    order_id = Column(Integer, nullable=True)
    type = Column(String(20), nullable=False)  # earn, redeem, adjust, expire, welcome
    points = Column(Integer, nullable=False)
    balance_after = Column(Integer, nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now())


class ProductReview(Base):
    __tablename__ = "product_reviews"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, nullable=False, index=True)
    customer_id = Column(Integer, nullable=True)
    customer_name = Column(String(255), nullable=False)
    rating = Column(Integer, nullable=False)
    comment = Column(Text, nullable=True)
    status = Column(String(20), default="pending", index=True)
    created_at = Column(DateTime(timezone=True), default=func.now())


class EcommerceSetting(Base):
    __tablename__ = "ecommerce_settings"
    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, nullable=False, index=True)
    value = Column(JSONB, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())


# ─────────────────────────────────────────────────────────────────────────────
# 2. PYDANTIC SCHEMAS
# ─────────────────────────────────────────────────────────────────────────────
class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)
    unit_price: Decimal = Field(ge=0)

class OrderEcommerceCreate(BaseModel):
    customer_id: int
    recipient_name: str
    recipient_phone: str
    shipping_address: str
    delivery_note: Optional[str] = None
    payment_method: str = "transfer"
    coupon_code: Optional[str] = None
    shipping_fee: Decimal = Decimal("0.00")
    order_source: str = "ecommerce"
    items: List[OrderItemCreate]

class OrderTrackingUpdate(BaseModel):
    carrier_name: str
    tracking_number: str

class SlipApprovalAction(BaseModel):
    admin_note: Optional[str] = None

class SlipRejectAction(BaseModel):
    reason: str

class CustomerAddressCreate(BaseModel):
    customer_id: int
    recipient_name: str
    phone: Optional[str] = None
    address_line: str
    subdistrict: Optional[str] = None
    district: Optional[str] = None
    province: Optional[str] = None
    postal_code: Optional[str] = None
    country: str = "Thailand"
    is_default: bool = False

class CustomerAddressResponse(BaseModel):
    id: int
    customer_id: int
    recipient_name: str
    phone: Optional[str] = None
    address_line: str
    subdistrict: Optional[str] = None
    district: Optional[str] = None
    province: Optional[str] = None
    postal_code: Optional[str] = None
    country: str
    is_default: bool
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

class LoyaltyBalanceResponse(BaseModel):
    customer_id: int
    customer_name: str
    balance: int
    tier: str
    member_code: str
    pending_expiring: int = 0

class LoyaltyTransactionResponse(BaseModel):
    id: int
    customer_id: int
    order_id: Optional[int] = None
    type: str
    points: int
    balance_after: int
    description: Optional[str] = None
    created_at: datetime
    class Config:
        from_attributes = True

class LoyaltyEarnRequest(BaseModel):
    customer_id: int
    order_id: Optional[int] = None
    points: int
    description: Optional[str] = None

class WineProductUpdateSchema(BaseModel):
    name: Optional[str] = None
    price: Optional[Decimal] = None
    cost_price: Optional[Decimal] = None
    quantity: Optional[str] = None
    alcohol: Optional[str] = None
    vintage: Optional[str] = None
    grape_variety: Optional[str] = None
    country: Optional[str] = None
    region: Optional[str] = None
    in_stock: Optional[int] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None

class CouponValidateRequest(BaseModel):
    code: str
    subtotal: Decimal
    customer_id: Optional[int] = None

class CouponValidateResponse(BaseModel):
    valid: bool
    code: str
    discount_type: str
    discount_value: Decimal
    discount_amount: Decimal
    final_total: Decimal
    message: str

class ProductReviewCreate(BaseModel):
    product_id: int
    customer_name: str
    rating: int = Field(ge=1, le=5)
    comment: Optional[str] = None


# ─────────────────────────────────────────────────────────────────────────────
# 3. ROUTER & DEPENDENCIES
# ─────────────────────────────────────────────────────────────────────────────
router = APIRouter(prefix="/api/v1", tags=["The Bottle Club E-Commerce"])

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads/slips")
os.makedirs(UPLOAD_DIR, exist_ok=True)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
LINE_CLIENT_ID = os.getenv("LINE_CLIENT_ID", "")
LINE_CLIENT_SECRET = os.getenv("LINE_CLIENT_SECRET", "")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "bottleclub-super-secret-key-2026")
ALGORITHM = "HS256"

# ฟังก์ชัน Database Session Dependency (ปรับให้เชื่อมต่อ Session จริงของคุณ)
def get_db():
    # สมมติฐานว่าในระบบของคุณมี SessionLocal อยู่แล้ว:
    # db = SessionLocal()
    # try:
    #     yield db
    # finally:
    #     db.close()
    yield None

def create_access_token(data: dict, expires_delta: timedelta = timedelta(days=7)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)


# ─────────────────────────────────────────────────────────────────────────────
# 4. SOCIAL LOGIN (LINE & GOOGLE)
# ─────────────────────────────────────────────────────────────────────────────
def sync_social_customer(db: Session, email: str, display_name: str, avatar: str, provider: str):
    name_parts = display_name.strip().split(" ", 1)
    first_name = name_parts[0]
    last_name = name_parts[1] if len(name_parts) > 1 else ""

    # ตรวจสอบและสร้าง Customer พร้อมแต้มต้อนรับ 50 PTS
    customer_id = 1
    if db is not None:
        cust = db.execute(text("SELECT id FROM customers WHERE email = :email LIMIT 1"), {"email": email}).fetchone()
        if cust:
            customer_id = cust[0]
        else:
            ins = db.execute(
                text("""
                    INSERT INTO customers (first_name, last_name, email, loyalty_points_balance, created_at)
                    VALUES (:first_name, :last_name, :email, 50, NOW()) RETURNING id
                """),
                {"first_name": first_name, "last_name": last_name, "email": email}
            ).fetchone()
            customer_id = ins[0]
            db.execute(
                text("INSERT INTO loyalty_transactions (customer_id, type, points, balance_after, description, created_at) VALUES (:cid, 'welcome', 50, 50, 'โบนัสแต้มต้อนรับสมาชิกใหม่ (Welcome Bonus)', NOW())"),
                {"cid": customer_id}
            )
            db.commit()

    token_payload = {
        "sub": str(customer_id),
        "id": customer_id,
        "email": email,
        "display_name": display_name,
        "first_name": first_name,
        "last_name": last_name,
        "avatar": avatar,
        "provider": provider,
        "role": "customer"
    }
    return create_access_token(token_payload)


@router.get("/auth/oauth/google")
async def google_auth_callback(
    code: Optional[str] = Query(None),
    redirect_uri: str = Query("http://localhost:3001/auth/success"),
    db: Session = Depends(get_db)
):
    if not code:
        url = f"https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id={GOOGLE_CLIENT_ID}&redirect_uri={redirect_uri}&scope=openid%20profile%20email"
        return RedirectResponse(url=url)

    async with httpx.AsyncClient() as client:
        token_res = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code, "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": redirect_uri, "grant_type": "authorization_code"
            }
        )
        token_data = token_res.json()
        acc_token = token_data.get("access_token")
        uinfo = await client.get("https://www.googleapis.com/oauth2/v2/userinfo", headers={"Authorization": f"Bearer {acc_token}"})
        userinfo = uinfo.json()

    jwt_token = sync_social_customer(
        db, userinfo.get("email"), userinfo.get("name") or "Google User",
        userinfo.get("picture"), "google"
    )
    return RedirectResponse(url=f"{redirect_uri}?token={jwt_token}")


@router.get("/auth/oauth/line")
async def line_auth_callback(
    code: Optional[str] = Query(None),
    redirect_uri: str = Query("http://localhost:3001/auth/success"),
    db: Session = Depends(get_db)
):
    if not code:
        url = f"https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id={LINE_CLIENT_ID}&redirect_uri={redirect_uri}&state=bottleclub&scope=profile%20openid%20email"
        return RedirectResponse(url=url)

    async with httpx.AsyncClient() as client:
        t_res = await client.post(
            "https://api.line.me/oauth2/v2.1/token",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            data={
                "grant_type": "authorization_code", "code": code,
                "redirect_uri": redirect_uri, "client_id": LINE_CLIENT_ID,
                "client_secret": LINE_CLIENT_SECRET
            }
        )
        id_token = t_res.json().get("id_token")
        p_res = await client.post("https://api.line.me/oauth2/v2.1/verify", data={"id_token": id_token, "client_id": LINE_CLIENT_ID})
        profile = p_res.json()

    jwt_token = sync_social_customer(
        db, profile.get("email") or f"{profile.get('sub')}@line.me",
        profile.get("name") or "LINE User", profile.get("picture"), "line"
    )
    return RedirectResponse(url=f"{redirect_uri}?token={jwt_token}")


# ─────────────────────────────────────────────────────────────────────────────
# 5. CORE E-COMMERCE ENDPOINTS (MODULES 1 - 9)
# ─────────────────────────────────────────────────────────────────────────────
@router.get("/reports/ecommerce/dashboard")
def get_dashboard_metrics(db: Session = Depends(get_db)):
    """Module 1: Dashboard Web Wine"""
    return {
        "sales_today": 48900.0,
        "sales_this_month": 1285000.0,
        "pending_orders_count": 8,
        "pending_slips_count": 5,
        "total_members": 1420
    }

@router.post("/promotions/coupons/validate", response_model=CouponValidateResponse)
def validate_coupon(body: CouponValidateRequest):
    """Module 2: Validate coupon"""
    subtotal = body.subtotal
    if body.code.upper() == "WINEVIP2026":
        discount = (subtotal * Decimal("10.0")) / Decimal("100.0")
        return CouponValidateResponse(
            valid=True, code=body.code.upper(), discount_type="percentage",
            discount_value=Decimal("10.0"), discount_amount=discount,
            final_total=subtotal - discount, message="ใช้โค้ดส่วนลด 10% สำเร็จ"
        )
    raise HTTPException(status_code=400, detail="รหัสคูปองไม่ถูกต้อง")

@router.post("/orders/ecommerce", status_code=status.HTTP_201_CREATED)
def create_ecommerce_order(body: OrderEcommerceCreate, db: Session = Depends(get_db)):
    """Module 3: Online Checkout"""
    subtotal = sum(i.quantity * i.unit_price for i in body.items)
    discount = Decimal("0.00")
    if body.coupon_code and body.coupon_code.upper() == "WINEVIP2026":
        discount = (subtotal * Decimal("10.0")) / Decimal("100.0")
    total = subtotal - discount + body.shipping_fee
    order_num = f"BC-{datetime.now().strftime('%Y%m%d')}-{int(datetime.now().timestamp()) % 10000:04d}"

    if db is not None:
        ins = db.execute(
            text("""
                INSERT INTO orders (order_number, customer_id, recipient_name, recipient_phone,
                    shipping_address, delivery_note, order_source, subtotal, discount_amount,
                    shipping_fee, total_amount, status, payment_method, coupon_code, created_at)
                VALUES (:num, :cid, :name, :phone, :addr, :note, 'ecommerce', :sub, :disc, :ship, :tot, 'pending_slip', :pay, :code, NOW())
                RETURNING id
            """),
            {
                "num": order_num, "cid": body.customer_id, "name": body.recipient_name,
                "phone": body.recipient_phone, "addr": body.shipping_address, "note": body.delivery_note,
                "sub": subtotal, "disc": discount, "ship": body.shipping_fee, "tot": total,
                "pay": body.payment_method, "code": body.coupon_code
            }
        ).fetchone()
        db.commit()
        return {"id": ins[0], "order_number": order_num, "total_amount": float(total), "status": "pending_slip"}
    return {"id": 1, "order_number": order_num, "total_amount": float(total), "status": "pending_slip"}

@router.put("/orders/{order_id}/tracking")
def update_order_tracking(order_id: int, body: OrderTrackingUpdate, db: Session = Depends(get_db)):
    """Module 3: Update tracking"""
    if db is not None:
        db.execute(
            text("UPDATE orders SET carrier_name = :c, tracking_number = :t, status = 'shipped' WHERE id = :id"),
            {"c": body.carrier_name, "t": body.tracking_number, "id": order_id}
        )
        db.commit()
    return {"status": "success", "message": "อัปเดตข้อมูลการจัดส่งแล้ว"}

@router.post("/slip-verify/upload", status_code=status.HTTP_201_CREATED)
async def upload_payment_slip(
    order_id: int = Form(...),
    transfer_amount: Decimal = Form(...),
    transfer_date: str = Form(...),
    transfer_time: str = Form(...),
    bank_name: str = Form(...),
    customer_id: Optional[int] = Form(None),
    slip_file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Module 4: Upload slip"""
    fname = f"slip_{order_id}_{int(datetime.now().timestamp())}.jpg"
    fpath = os.path.join(UPLOAD_DIR, fname)
    with open(fpath, "wb") as buffer:
        shutil.copyfileobj(slip_file.file, buffer)
    url = f"/uploads/slips/{fname}"

    if db is not None:
        db.execute(
            text("""
                INSERT INTO slip_verifications (order_id, customer_id, image_url, transfer_amount, transfer_date, transfer_time, bank_name, status, created_at)
                VALUES (:oid, :cid, :url, :amt, :d, :t, :b, 'pending', NOW())
            """),
            {"oid": order_id, "cid": customer_id, "url": url, "amt": transfer_amount, "d": transfer_date, "t": transfer_time, "b": bank_name}
        )
        db.execute(text("UPDATE orders SET slip_url = :url, status = 'pending_approval' WHERE id = :oid"), {"url": url, "oid": order_id})
        db.commit()
    return {"status": "success", "image_url": url}

@router.post("/slip-verify/{slip_id}/approve")
def approve_slip(slip_id: int, action: SlipApprovalAction = Body(default=SlipApprovalAction()), db: Session = Depends(get_db)):
    """
    Module 4: 🔥 APPROVE SLIP TRIGGER
    1. slip -> approved
    2. order -> paid
    3. deduct product inventory
    4. earn loyalty points (100 THB = 1 point)
    """
    if db is not None:
        slip = db.execute(text("SELECT order_id, customer_id, transfer_amount FROM slip_verifications WHERE id = :id"), {"id": slip_id}).fetchone()
        if slip:
            oid, cid, amt = slip[0], slip[1], float(slip[2])
            db.execute(text("UPDATE slip_verifications SET status = 'approved', admin_note = :n, verified_at = NOW() WHERE id = :id"), {"n": action.admin_note, "id": slip_id})
            db.execute(text("UPDATE orders SET status = 'paid', slip_verified = true WHERE id = :oid"), {"oid": oid})
            
            # ตัดสต็อก
            items = db.execute(text("SELECT product_id, quantity FROM order_items WHERE order_id = :oid"), {"oid": oid}).fetchall()
            for it in items:
                db.execute(text("UPDATE products SET in_stock = GREATEST(0, in_stock - :q) WHERE id = :pid"), {"q": it[1], "pid": it[0]})
            
            # คำนวณแต้มสะสม
            earned = int(amt // 100)
            if cid and earned > 0:
                db.execute(text("UPDATE customers SET loyalty_points_balance = loyalty_points_balance + :pts WHERE id = :cid"), {"pts": earned, "cid": cid})
                bal = db.execute(text("SELECT loyalty_points_balance FROM customers WHERE id = :cid"), {"cid": cid}).scalar() or earned
                db.execute(text("INSERT INTO loyalty_transactions (customer_id, order_id, type, points, balance_after, description, created_at) VALUES (:cid, :oid, 'earn', :pts, :bal, :desc, NOW())"), {"cid": cid, "oid": oid, "pts": earned, "bal": bal, "desc": f"ได้รับแต้มจากการสั่งซื้อ #{oid}"})
            db.commit()
            return {"status": "success", "earned_points": earned}
    return {"status": "success", "message": "อนุมัติสลิปเรียบร้อย"}

@router.put("/wine-products/{product_id}")
def update_wine_product(product_id: int, payload: WineProductUpdateSchema, db: Session = Depends(get_db)):
    """Module 5: Admin edit wine details"""
    if db is not None:
        updates = [f"{k} = :{k}" for k, v in payload.dict(exclude_unset=True).items()]
        if updates:
            p = payload.dict(exclude_unset=True)
            p["id"] = product_id
            db.execute(text(f"UPDATE products SET {', '.join(updates)} WHERE id = :id"), p)
            db.commit()
    return {"status": "success", "message": f"อัปเดตข้อมูลไวน์ ID #{product_id} เรียบร้อยแล้ว"}

@router.get("/customer-addresses/customer/{customer_id}")
def get_customer_addresses(customer_id: int, db: Session = Depends(get_db)):
    """Module 6: Get customer addresses"""
    if db is not None:
        rows = db.execute(text("SELECT * FROM customer_addresses WHERE customer_id = :cid ORDER BY is_default DESC, id DESC"), {"cid": customer_id}).fetchall()
        return [dict(r._mapping) for r in rows]
    return []

@router.post("/customer-addresses/", status_code=status.HTTP_201_CREATED)
def create_customer_address(body: CustomerAddressCreate, db: Session = Depends(get_db)):
    """Module 6: Add address"""
    if db is not None:
        if body.is_default:
            db.execute(text("UPDATE customer_addresses SET is_default = false WHERE customer_id = :cid"), {"cid": body.customer_id})
        ins = db.execute(
            text("""
                INSERT INTO customer_addresses (customer_id, recipient_name, phone, address_line, subdistrict, district, province, postal_code, country, is_default, created_at, updated_at)
                VALUES (:customer_id, :recipient_name, :phone, :address_line, :subdistrict, :district, :province, :postal_code, :country, :is_default, NOW(), NOW())
                RETURNING id
            """),
            body.dict()
        ).fetchone()
        db.commit()
        return {**body.dict(), "id": ins[0]}
    return {**body.dict(), "id": 1}

@router.get("/loyalty/balance/{customer_id}", response_model=LoyaltyBalanceResponse)
def get_loyalty_balance(customer_id: int, db: Session = Depends(get_db)):
    """Module 6: VIP Card & Points Balance"""
    balance = 0
    name = f"Member #{customer_id}"
    if db is not None:
        cust = db.execute(text("SELECT first_name, last_name, loyalty_points_balance FROM customers WHERE id = :cid"), {"cid": customer_id}).fetchone()
        if cust:
            name = f"{cust[0] or ''} {cust[1] or ''}".strip()
            balance = cust[2] or 0
    
    tier = (
        "DIAMOND VIP" if balance >= 10000 else
        "PLATINUM LEVEL" if balance >= 5000 else
        "GOLD VIP" if balance >= 2000 else
        "SILVER LEVEL" if balance >= 500 else
        "CLASSIC LEVEL"
    )
    return LoyaltyBalanceResponse(
        customer_id=customer_id,
        customer_name=name,
        balance=balance,
        tier=tier,
        member_code=f"•••• •••• •••• {customer_id:04d}"
    )

@router.get("/loyalty/transactions/{customer_id}")
def get_loyalty_transactions(customer_id: int, db: Session = Depends(get_db)):
    """Module 6: Loyalty History"""
    if db is not None:
        rows = db.execute(text("SELECT * FROM loyalty_transactions WHERE customer_id = :cid ORDER BY id DESC"), {"cid": customer_id}).fetchall()
        return [dict(r._mapping) for r in rows]
    return []

@router.get("/reviews/product/{product_id}")
def get_product_reviews(product_id: int, db: Session = Depends(get_db)):
    """Module 7: Wine Reviews"""
    if db is not None:
        rows = db.execute(text("SELECT * FROM product_reviews WHERE product_id = :pid AND status = 'approved' ORDER BY id DESC"), {"pid": product_id}).fetchall()
        return {"reviews": [dict(r._mapping) for r in rows]}
    return {"reviews": []}

@router.get("/settings/ecommerce")
def get_ecommerce_settings(db: Session = Depends(get_db)):
    """Module 9: Store Settings"""
    return {
        "shipping": {"standard_fee": 120.0, "free_shipping_threshold": 2500.0},
        "bank_account": {"bank_name": "KBANK", "account_name": "บริษัท เดอะ บอทเทิล คลับ จำกัด", "account_number": "123-4-56789-0"},
        "loyalty_rules": {"earn_rate_thb": 100, "earn_points": 1, "welcome_points": 50}
    }
