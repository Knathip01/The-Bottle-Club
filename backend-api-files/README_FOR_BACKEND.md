# 🍷 คำแนะนำการติดตั้งระบบ Backend API สำหรับ The Bottle Club & Admin POS Wine

> **สำหรับ:** Backend Developer (FastAPI / PostgreSQL)  
> **วัตถุประสงค์:** นำไฟล์ทั้งหมดในโฟลเดอร์นี้ไปติดตั้งและรันในโปรเจกต์ FastAPI เพื่อเปิดใช้งานระบบ e-Commerce ครบทั้ง 9 โมดูล และระบบ Social Login

---

## 📁 รายการไฟล์ในชุดนี้ (Files in this Package)

| ชื่อไฟล์ | หน้าที่ | วิธีนำไปใช้ |
| :--- | :--- | :--- |
| `schema_migrations.sql` | สคริปต์ SQL DDL สำหรับ PostgreSQL | นำไปรันใน PostgreSQL (เช่น pgAdmin, DBeaver หรือ `psql`) |
| `ecommerce_models.py` | SQLAlchemy ORM Models | นำไปวางใน `app/models/` ของโปรเจกต์ FastAPI |
| `ecommerce_schemas.py` | Pydantic v2 Request/Response Schemas | นำไปวางใน `app/schemas/` |
| `oauth_line_google.py` | Router สำหรับ Login ด้วย Google และ LINE | นำไปวางใน `app/routers/` หรือ include ใน `main.py` |
| `ecommerce_router.py` | Router รวม API ทั้ง 9 โมดูล | นำไปวางใน `app/routers/` หรือ include ใน `main.py` |

---

## 🚀 ขั้นตอนการติดตั้ง 3 ขั้นตอน (3-Step Quick Start)

### ขั้นตอนที่ 1: รันคำสั่ง SQL ใน PostgreSQL
เปิดโปรแกรมฐานข้อมูล PostgreSQL (pgAdmin หรือ DBeaver) จากนั้นเปิดไฟล์ `schema_migrations.sql` แล้วกด **Execute Query**  
สิ่งที่จะถูกสร้างขึ้น:
- คอลัมน์ `order_source`, `shipping_fee`, `tracking_number`, `slip_url` ในตาราง `orders`
- ตาราง `customer_addresses` (ที่อยู่จัดส่งลูกค้า)
- ตาราง `slip_verifications` (ข้อมูลการแนบสลิปโอนเงิน)
- ตาราง `loyalty_transactions` (ประวัติการได้/ใช้แต้มสะสม)
- ตาราง `product_reviews` (รีวิวและคะแนนดาวของไวน์)
- ตาราง `ecommerce_settings` (ตั้งค่าร้านค้า ค่าส่ง บัญชีธนาคาร)

---

### ขั้นตอนที่ 2: ติดตั้ง Python Dependencies
ใน Virtual Environment ของ FastAPI ให้ติดตั้งไลบรารีที่จำเป็น:
```bash
pip install httpx python-jose[cryptography] pydantic
```

---

### ขั้นตอนที่ 3: ลงทะเบียน Router ใน `main.py`
ในไฟล์ `main.py` ของ FastAPI ให้เพิ่ม 2 บรรทัดนี้:

```python
from fastapi import FastAPI
# นำเข้า router จากไฟล์ที่เตรียมไว้
from app.routers.ecommerce_router import router as ecommerce_router
from app.routers.oauth_line_google import router as oauth_router

app = FastAPI(title="Wayneven API")

# รวมเข้ากับแอปหลัก
app.include_router(ecommerce_router)
app.include_router(oauth_router)
```

---

## ⚡ สรุป Auto-Triggers สำคัญที่ระบบจัดการให้อัตโนมัติ

1. **เมื่อลูกค้าสมัครสมาชิกใหม่ หรือ Login ผ่าน Google / LINE:**
   - ระบบจะสร้างบัญชีในตาราง `users` และตาราง `customers` อัตโนมัติ
   - พร้อมมอบโบนัสแต้มต้อนรับ **50 PTS** ให้ลูกค้าฟรีทันที
2. **เมื่อลูกค้าสั่งซื้อสินค้าหน้าร้าน (/checkout):**
   - บันทึกออเดอร์ด้วย `order_source = 'ecommerce'`
   - คำนวณส่วนลดจากคูปอง (ถ้ามี)
3. **เมื่อลูกค้าแนบสลิปโอนเงิน (/account/confirm-payment):**
   - บันทึกรูปภาพสลิป และอัปเดตสถานะออเดอร์เป็น `pending_approval`
4. **เมื่อ Admin กดอนุมัติสลิป (/admin/bottleclub/payments):**
   - สลิปเปลี่ยนเป็น `approved`
   - ออเดอร์เปลี่ยนเป็น `paid`
   - **ตัดสต็อกสินค้าในคลังอัตโนมัติ**
   - **คำนวณแต้มสะสม Loyalty อัตโนมัติ (100 บาท = 1 แต้ม)** เพิ่มเข้ากระเป๋าของลูกค้าทันที
5. **เมื่อลูกค้าอัปเดตข้อมูลส่วนตัว หรือ เพิ่มที่อยู่:**
   - ข้อมูลจะถูกบันทึกลงในระบบกลาง ทำให้หน้า [สมาชิก & แต้มสะสม](http://localhost:3000/admin/bottleclub/members) ฝั่ง Admin เห็นข้อมูลอัปเดตทันที
