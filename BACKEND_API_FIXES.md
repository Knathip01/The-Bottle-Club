# คู่มือรายการแก้ไขและปรับปรุง Backend API (FastAPI)
**Target Host**: `https://api.wayneven.uk`  
**API Documentation Reference**: `https://api.wayneven.uk/docs`  
**วันที่อัปเดตล่าสุด**: 6 ตุลาคม 2026  
**สำหรับ**: Backend Developer / ทีมพัฒนา API  

---

## สรุปภาพรวม (Executive Summary)

ระบบฝั่ง **Storefront (Next.js - Port 3001)** และ **Admin POS (Next.js - Port 3000)** ได้เชื่อมต่อระบบการสั่งซื้อ, การจัดส่ง, การอัปโหลดสลิป และการอนุมัติการชำระเงินเสร็จสมบูรณ์แล้ว

จากการทดสอบระบบร่วมกับ Production API (`https://api.wayneven.uk`) พบจุดที่ต้องดำเนินการแก้ไขใน Backend FastAPI จำนวน **6 รายการหลัก** เพื่อให้ระบบทำงานประสานกันได้ 100% โดยไม่ต้องพึ่งพา Fallback ชั่วคราว ดังรายละเอียดด้านล่างนี้ครับ

---

## 1. แก้ไข Database Error ในระบบ Customer Addresses (HTTP 500)

### Endpoint ที่มีปัญหา
* `POST /api/v1/customer-addresses/`
* `GET /api/v1/customer-addresses/customer/{customer_id}`

### ปัญหาที่พบจริง
เมื่อลูกค้าเพิ่มหรือเรียกดูที่อยู่จัดส่ง ระบบ Backend ตอบกลับด้วย HTTP 500:
```json
{
  "detail": "DATABASE_ERROR: Database operation failed",
  "code": "DATABASE_ERROR"
}
```

### สาเหตุ
* ตาราง `customer_addresses` ในฐานข้อมูล PostgreSQL ของ Production ยังไม่มีโครงสร้าง หรือ Migration ไม่สมบูรณ์ หรือ Foreign Key `customer_id` ติด Constraint

### แนวทางแก้ไข
1. ตรวจสอบและรัน Migration ตาราง `customer_addresses` ใน PostgreSQL:
   ```sql
   CREATE TABLE IF NOT EXISTS customer_addresses (
       id SERIAL PRIMARY KEY,
       customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
       first_name VARCHAR(100),
       last_name VARCHAR(100),
       phone VARCHAR(50),
       address_line TEXT NOT NULL,
       subdistrict VARCHAR(100),
       district VARCHAR(100),
       province VARCHAR(100),
       postal_code VARCHAR(20),
       country VARCHAR(100) DEFAULT 'Thailand',
       is_default_shipping BOOLEAN DEFAULT FALSE,
       is_default_billing BOOLEAN DEFAULT FALSE,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
       updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   CREATE INDEX IF NOT EXISTS idx_customer_addresses_customer_id ON customer_addresses(customer_id);
   ```

2. ตรวจสอบให้แน่ใจว่า Pydantic Schema `CustomerAddressCreate` และ `CustomerAddressResponse` รองรับฟิลด์ทั้งหมด และส่งสถานะ `HTTP 200/201` กลับมา

---

## 2. เปิดฟิลด์ `notes`, `shipping_address`, `customer_email`, และ `shipping_fee` ใน Order Response

### Endpoint ที่มีปัญหา
* `GET /api/v1/orders/`
* `GET /api/v1/orders/{order_id}`

### ปัญหาที่พบจริง
1. ฟิลด์ `notes` (ข้อความหมายเหตุและที่อยู่จัดส่งที่ลูกค้ากรอกตอน Checkout) **ถูกตัดทิ้ง ไม่ส่งออกมาใน JSON**
2. ฟิลด์ `shipping_address` **ไม่มีใน JSON**
3. ฟิลด์ `customer_email` และ `customer_phone` **ไม่ถูกคืนค่ากลับมา** ทำให้ระบบไม่สามารถจับคู่ออเดอร์กับลูกค้าได้ถูกต้อง
4. ฟิลด์ `shipping_fee` คืนค่าเป็น `0.00` เสมอ แม้ตอนสร้างออเดอร์จะส่ง `150.00` ไปก็ตาม

### แนวทางแก้ไข
ปรับปรุง Pydantic Schema `OrderResponse` (เช่นใน `app/schemas/order.py`):
```python
from pydantic import BaseModel
from typing import Optional, Any, List
from decimal import Decimal

class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    product_name: str
    product_sku: Optional[str] = None
    quantity: int
    unit_price: Decimal
    discount_amount: Decimal = Decimal("0.00")
    line_total: Decimal

    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: int
    order_number: str
    status: str                         # 'pending', 'paid', 'completed', 'cancelled'
    order_source: Optional[str] = "ecommerce"
    customer_id: Optional[int] = None
    user_id: Optional[int] = None
    
    # ── ฟิลด์ที่จำเป็นต้องเปิดเพิ่ม ──
    customer_name: Optional[str] = None
    customer_email: Optional[str] = None
    customer_phone: Optional[str] = None
    shipping_address: Optional[Any] = None  # ที่อยู่จัดส่งจริง (Dict หรือ String)
    notes: Optional[str] = None             # บันทึกช่วยจำ / ข้อความจาก Checkout
    shipping_fee: Decimal = Decimal("0.00") # ค่าจัดส่งจริง
    payment_slip_url: Optional[str] = None  # URL ของสลิปที่แนบไว้
    
    subtotal: Decimal
    discount_amount: Decimal = Decimal("0.00")
    tax_amount: Decimal = Decimal("0.00")
    grand_total: Decimal
    amount_paid: Decimal = Decimal("0.00")
    loyalty_points_earned: int = 0
    items: List[OrderItemResponse] = []
    
    created_at: Any
    completed_at: Optional[Any] = None

    class Config:
        from_attributes = True
```
และตรวจสอบคำสั่ง SQLAlchemy Query ว่าได้ทำการ `SELECT notes, shipping_address, shipping_fee` จากตาราง `orders` และ Join ตาราง `customers` เพื่อดึง `email`, `phone` ขึ้นมาด้วย

---

## 3. ปรับปรุงระบบ Upload Slip ไม่ให้ Error 422 และบันทึกไฟล์เสมอ

### Endpoint ที่มีปัญหา
* `POST /api/v1/slip-verify/upload`

### ปัญหาที่พบจริง
เมื่อลูกค้าอัปโหลดรูปถ่ายสลิปหรือใบเสร็จที่มีความละเอียดต่ำ หรือเป็นสลิปที่ระบบ OCR สแกน PromptPay QR Code ไม่ผ่าน Backend จะ Reject คำขอทันทีด้วย:
```json
{
  "detail": "ocr_failed: Unable to detect valid PromptPay QR code",
  "code": "UNPROCESSABLE_ENTITY"
}
```
ส่งผลให้:
1. การอัปโหลดล้มเหลว
2. **รูปภาพไม่ถูกบันทึกลงในระบบ**
3. แอดมินในหน้า Admin POS ไม่สามารถเปิดดูสลิปเพื่อตรวจสอบด้วยสายตา (Manual Review) ได้

### แนวทางแก้ไข
1. **Graceful Fallback สำหรับ OCR**:
   * เมื่อได้รับไฟล์ ให้บันทึกรูปลงใน Object Storage หรือ File Server เสมอ
   * หากฟังก์ชัน OCR สแกน QR ไม่สำเร็จ **ไม่ต้อง Throw HTTP 422** ให้บันทึกแถวลงใน `slip_verifications` โดยตั้งค่า:
     * `status = "ocr_failed"` หรือ `"pending_manual_review"`
     * `risk_score = 1`
   * ตอบกลับสถานะ `HTTP 201 Created` พร้อมส่ง `slip_url` กลับมา

2. **คืนค่า URL รูปภาพใน Response**:
   ```json
   {
     "id": 12,
     "order_id": 11,
     "slip_url": "https://api.wayneven.uk/storage/slips/order_11_1791274019130.png",
     "status": "pending_manual_review",
     "created_at": "2026-10-06T15:07:04Z"
   }
   ```

---

## 4. ส่งฟิลด์ `slip_url` ในประวัติสลิปของออเดอร์ (`/api/v1/slip-verify/order/{id}`)

### Endpoint ที่มีปัญหา
* `GET /api/v1/slip-verify/order/{order_id}`

### ปัญหาที่พบจริง
ผลลัพธ์ที่ Backend ส่งกลับมาปัจจุบัน:
```json
{
  "data": [
    {
      "id": 5,
      "order_id": 11,
      "status": "ocr_failed",
      "risk_score": 1,
      "ocr_amount": null,
      "ocr_reference": null,
      "created_at": "2026-10-06T15:07:04.936947+07:00"
    }
  ]
}
```
**ไม่มีฟิลด์ `slip_url`, `file_url`, หรือ `image_url`** ทำให้ฝั่ง Admin POS ไม่รู้ว่าจะโหลดรูปภาพสลิปจาก URL ใดเพื่อแสดงบนหน้าจอ

### แนวทางแก้ไข
เพิ่มฟิลด์ `slip_url: str` (หรือ `file_url`) ใน `SlipVerificationResponse` โดยเป็น Public URL ที่ Client สามารถเปิดดูรูปภาพได้โดยตรง

---

## 5. ปลดล็อก Endpoint อนุมัติสลิป ให้ Admin อนุมัติสลิปที่ OCR ไม่ผ่านได้ (`HTTP 400 Bad Request`)

### Endpoint ที่มีปัญหา
* `POST /api/v1/slip-verify/{verification_id}/approve`

### ปัญหาที่พบจริง
เมื่อแอดมินตรวจดูสลิปแล้วเห็นว่ายอดเงินถูกต้อง และกดปุ่ม **"อนุมัติการชำระเงิน"** ใน Admin POS ตัว Backend ส่ง HTTP 400 ปฏิเสธกลับมาว่า:
```json
{
  "detail": "This verification cannot be approved",
  "code": "BAD_REQUEST"
}
```

### สาเหตุ
โค้ดใน Backend มีเงื่อนไขดักไว้ว่า:
```python
if verification.status != "pending":
    raise HTTPException(status_code=400, detail="This verification cannot be approved")
```
เนื่องจากสลิปที่ OCR ไม่ผ่านจะมีสถานะเป็น `ocr_failed` แอดมินจึงไม่สามารถกดยืนยันอนุมัติสลิปใบนั้นได้เลย

### แนวทางแก้ไข
เปิดให้แอดมินสามารถอนุมัติสลิปที่มีสถานะ `ocr_failed` หรือ `flagged` ได้ด้วย:
```python
# app/api/v1/endpoints/slip_verify.py
@router.post("/{verification_id}/approve")
async def approve_slip_verification(verification_id: int, ...):
    ...
    # อนุญาตให้อนุมัติได้ทั้ง pending, ocr_failed และ flagged
    if verification.status not in ["pending", "ocr_failed", "flagged"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This verification cannot be approved because it is already processed"
        )
    
    verification.status = "approved"
    verification.approved_by = current_user.id
    verification.approved_at = datetime.utcnow()
    ...
```

---

## 6. ซิงค์สถานะออเดอร์ในตาราง `orders` เป็น `paid` อัตโนมัติเมื่อสลิปได้รับการอนุมัติ

### ปัญหาที่พบจริง
* เมื่อสลิปได้รับการอนุมัติ (`POST /api/v1/slip-verify/{id}/approve`) Backend อัปเดตเฉพาะแถวในตาราง `slip_verifications`
* **แต่ตาราง `orders` ไม่ถูกเปลี่ยนสถานะ!** ออเดอร์ยังคงค้างอยู่ที่ `status: "pending"`
* ในปัจจุบัน หากต้องการเปลี่ยนสถานะออเดอร์เป็น `paid` Client จะต้องส่งคำขอแยกไปที่:
  `POST /api/v1/orders/{order_id}/checkout`
  พร้อมแนบ JSON Body:
  ```json
  {
    "payments": [
      {
        "payment_method": "bank_transfer",
        "amount": 3457.00,
        "notes": "ยืนยันการชำระเงินโดยแอดมิน"
      }
    ]
  }
  ```

### แนวทางแก้ไข
เมื่อ Admin เรียก `POST /api/v1/slip-verify/{verification_id}/approve` ให้ Backend ดำเนินการอัปเดตคำสั่งซื้อที่ผูกกันโดยอัตโนมัติ:
```python
# ภายในฟังก์ชัน approve_slip_verification
order = db.query(Order).filter(Order.id == verification.order_id).first()
if order:
    order.status = "paid"
    order.amount_paid = order.grand_total
    
    # คำนวณแต้มสะสม Loyalty Points ให้ลูกค้า (100 บาท = 1 แต้ม)
    points_to_earn = int(order.grand_total / Decimal("100"))
    order.loyalty_points_earned = points_to_earn
    
    # บันทึกลงตาราง loyalty_transactions (ถ้ามี)
    if order.customer_id and points_to_earn > 0:
        award_loyalty_points(
            customer_id=order.customer_id,
            points=points_to_earn,
            reason=f"Earned from Order #{order.order_number}"
        )

db.commit()
```

---

## ตาราง Checklist สรุปงานสำหรับ Backend Developer

| ลำดับ | จุดที่ต้องแก้ไข | Endpoint / ไฟล์ | ผลลัพธ์ที่คาดหวัง |
| :---: | :--- | :--- | :--- |
| **1** | แก้ไขตารางฐานข้อมูล Customer Addresses | `POST & GET /api/v1/customer-addresses/` | ส่ง HTTP 200/201 พร้อมข้อมูล JSON (ไม่เกิด 500) |
| **2** | เปิดฟิลด์ `notes`, `shipping_address`, `customer_email`, `shipping_fee` ใน Order Response | `GET /api/v1/orders/` & `GET /api/v1/orders/{id}` | ข้อมูลที่อยู่จัดส่ง, ค่าจัดส่ง และอีเมลลูกค้าปรากฏครบถ้วน |
| **3** | ปรับระบบ Upload Slip ให้รับรูปภาพและไม่ Error 422 | `POST /api/v1/slip-verify/upload` | บันทึกรูปภาพลง Storage เสมอ แม้ OCR สแกนไม่ผ่าน และส่ง 201 Created |
| **4** | ส่งค่า `slip_url` ในประวัติสลิปของออเดอร์ | `GET /api/v1/slip-verify/order/{order_id}` | ส่ง URL รูปภาพสลิปที่เปิดดูผ่าน Browser ได้ |
| **5** | ปลดล็อกให้อนุมัติสลิป `ocr_failed` ได้ | `POST /api/v1/slip-verify/{id}/approve` | แอดมินสามารถกดยืนยันอนุมัติสลิปได้ ไม่เกิด 400 Bad Request |
| **6** | อัปเดต `order.status = 'paid'` อัตโนมัติเมื่ออนุมัติสลิป | `POST /api/v1/slip-verify/{id}/approve` | เมื่ออนุมัติสลิป ออเดอร์จะเปลี่ยนเป็น `paid` และสะสมแต้มให้ลูกค้าทันที |

---

## ตัวอย่าง cURL สำหรับทดสอบ API

### 1. ทดสอบบันทึกที่อยู่ลูกค้า (Customer Addresses)
```bash
curl -X POST "https://api.wayneven.uk/api/v1/customer-addresses/" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <ACCESS_TOKEN>" \
     -d '{
       "customer_id": 1,
       "first_name": "ศะศิบุตร์",
       "last_name": "310",
       "phone": "0812345678",
       "address_line": "123/45 ถนนสุขุมวิท",
       "subdistrict": "คลองเตย",
       "district": "คลองเตย",
       "province": "กรุงเทพมหานคร",
       "postal_code": "10110",
       "country": "Thailand",
       "is_default_shipping": true
     }'
```

### 2. ทดสอบดูรายละเอียดออเดอร์ (ต้องมี notes และ shipping_address)
```bash
curl -X GET "https://api.wayneven.uk/api/v1/orders/11" \
     -H "Authorization: Bearer <ACCESS_TOKEN>" \
     -H "X-Branch-Id: 1"
```

### 3. ทดสอบอนุมัติสลิป
```bash
curl -X POST "https://api.wayneven.uk/api/v1/slip-verify/5/approve" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <ACCESS_TOKEN>" \
     -H "X-Branch-Id: 1" \
     -d '{
       "note": "ยืนยันสลิปถูกต้องโดยแอดมิน"
     }'
```

---
*เอกสารนี้จัดทำขึ้นโดยอ้างอิงจากโค้ดและการทดสอบจริงบน Production Environment เพื่อให้ทีมพัฒนา Backend สามารถแก้ไขปัญหาได้อย่างตรงจุดและรวดเร็วที่สุดครับ*
