# Project1-ThebottleClub

โครงการร้านค้าออนไลน์สำหรับเครื่องดื่ม (Wine & Spirits) พัฒนาด้วย Next.js (Frontend) และ Express.js (Backend) โดยใช้ฐานข้อมูล PostgreSQL และเชื่อมต่อกับ External API แบบ Hybrid System

## 🌟 ฟีเจอร์ที่พัฒนาแล้ว (Implemented Features)

### 🔐 ระบบสมาชิกและความปลอดภัย (Authentication & Security)
- **ระบบ Login / Register**: เชื่อมต่อกับ External API และมีระบบสำรองใน Local Database เพื่อความเสถียร
- **JWT Session**: จัดการ Session ผ่าน Cookie ด้วย `jose` (Sign/Verify) รองรับการใช้งานทั้งฝั่ง Server และ Client
- **Middleware Protection**: ระบบความปลอดภัยป้องกันการเข้าถึงหน้าสมาชิก (Account, Orders, Checkout) โดยไม่ได้รับอนุญาต
- **Members-Only Barrier**: ระบบบล็อกเนื้อหาและซ่อนราคาสำหรับผู้ที่ยังไม่ได้เข้าสู่ระบบ เพื่อกระตุ้นการสมัครสมาชิก

### 👤 การจัดการบัญชี (Account Management)
- **Unified Profile**: แสดงข้อมูลส่วนตัวและจัดการบัญชีแบบรวมศูนย์
- **Address Book Management**: จัดการที่อยู่สำหรับการจัดส่งผ่าน API Proxy ไปยังระบบ External
- **Order Tracking**: ประวัติการสั่งซื้อที่ดึงข้อมูลจาก External API พร้อมระบบ Fallback บันทึกลง Local Database
- **Points & Rewards**: ระบบคะแนนสะสมสำหรับสมาชิก
- **Review System**: ระบบรีวิวสินค้าที่เชื่อมต่อกับฐานข้อมูล

### 🍷 ระบบจัดการและแสดงสินค้า (Product Management & Catalog)
- **Hybrid Data Fetching**: ระบบดึงข้อมูลสินค้าจาก External API พร้อมระบบ Fallback เป็น Mock Data เพื่อให้หน้าเว็บยังทำงานได้แม้ API หลักขัดข้อง
- **Dynamic Product Routing**: หน้าแสดงรายละเอียดสินค้าแบบ Dynamic (SSG/SSR) รองรับการแสดงผลแยกตาม ID สินค้า
- **Smart Product Mapping**: 
  - ระบบแปลงข้อมูลจาก API (Raw Data) มาเป็น Standard Product Schema ในโปรเจกต์
  - ระบบ Auto-color Tagging: แยกประเภทไวน์ (Red, White, Rose) อัตโนมัติจากชื่อและประเภทองุ่น
  - Country Mapping: แปลงชื่อประเทศเป็น ISO Code เพื่อแสดงผลธงชาติหรือข้อมูลเฉพาะภูมิภาค
- **Filtering & Search System**: 
  - ระบบค้นหาขั้นสูงที่รองรับการค้นหาตาม ชื่อสินค้า, ประเภท (Type), สายพันธุ์ (Sub-type) และ ภูมิภาค (Region)
  - ระบบ Cache: ใช้ Next.js Data Cache (revalidate 3600s) เพื่อลดภาระการโหลดจาก API หลัก

---

## ✅ อัปเดตล่าสุด (Latest Updates)
- **Product Infrastructure**: ปรับปรุง `getProducts` ให้รองรับการ Authentication (Bearer Token) เมื่อดึงข้อมูลจาก External API
- **Dynamic Routing Fix**: แก้ไขระบบ Dynamic Params สำหรับหน้า Product Detail ให้รองรับการใช้งานบน Next.js 15
- **Mapping Logic Enhancement**: เพิ่ม Logic การแยกประเภทไวน์ (Red, White, Rose) ให้แม่นยำยิ่งขึ้นโดยตรวจสอบจาก Keyword ในสายพันธุ์องุ่น
- **Hybrid Order System**: พัฒนาระบบการสั่งซื้อที่พยายามส่งข้อมูลไปยัง External API ก่อน และจะสลับไปใช้ Local Database อัตโนมัติหากเกิดข้อผิดพลาด (Fallback Strategy)
- **API Proxy Architecture**: เพิ่ม Route Proxy สำหรับจัดการที่อยู่และคำสั่งซื้อ เพื่อความปลอดภัยของ Token และลดปัญหา Network

---

## 📋 งานที่เพิ่งเสร็จสิ้น (Recent Session - 2026-05-18)

### 🎨 ปรับปรุงหน้าแสดงรายละเอียดสินค้า (UI/UX Refinement)
- **Centering & Alignment**: ปรับแก้การจัดวางตำแหน่งส่วน "More from Our Collection" ให้เป็นไปตามความต้องการของผู้ใช้งาน ทั้งการจัดตำแหน่งกึ่งกลางและการเลื่อนชิดซ้าย
- **Dynamic Rendering**: ตั้งค่าให้ส่วน "Related Products" แสดงผลเฉพาะเมื่อมีสินค้าที่เกี่ยวข้องจริงเท่านั้น (Conditional Rendering) เพื่อป้องกันช่องว่างเปล่าๆ บนหน้าเว็บ
- **Layout Optimization**: ปรับปรุง CSS ของส่วนเลื่อนสินค้า (Carousel) โดยเพิ่มการจำกัดความกว้างและจัดการ Padding/Whitespace รอบๆ ให้น้อยลง เพื่อความสวยงามและกระชับของเลย์เอาท์

### 1. 🌍 ระบบหลายภาษาที่สมบูรณ์ (Comprehensive Localization)
- **ขยายการแปล**: เพิ่มคีย์การแปลภาษาสำหรับหน้าตะกร้าสินค้า (Cart) และหน้าชำระเงิน (Checkout) ครอบคลุมกว่า 10 ภาษาหลัก
- **Language Engine Refactor**: 
  - ใช้ `useSyncExternalStore` เพื่อจัดการสถานะภาษาให้ซิงค์กันทั่วทั้งแอปและลดปัญหา Hydration Mismatch
  - รองรับภาษาที่อ่านจากขวาไปซ้าย (RTL Support) เช่น ภาษาอาหรับ (Arabic) และ ฮีบรู (Hebrew)
  - ระบบบันทึกการเลือกภาษาลงใน `localStorage` อัตโนมัติ

### 2. 🛒 ปรับปรุงระบบตะกร้าสินค้า (Enhanced Shopping Cart)
- **UI/UX Redesign**: ปรับโฉมหน้าตะกร้าสินค้าใหม่ให้ดูเป็นมืออาชีพและใช้งานง่ายขึ้น
- **Financial Calculation**: 
  - เพิ่มการคำนวณภาษีมูลค่าเพิ่ม (VAT 7%) ในยอดรวม
  - ระบบคำนวณคะแนนสะสม (Reward Points) ที่จะได้รับจากคำสั่งซื้อ
- **State Management**: ปรับปรุงการจัดการสถานะตะกร้าสินค้าให้มีความเสถียรมากขึ้น

### 3. 🍷 พัฒนาโครงสร้างข้อมูลสินค้า (Product Logic & Security)
- **Conditional Visibility**: ระบบแสดงรูปภาพสินค้าตามสถานะสมาชิก (สมาชิกเห็นรูปจริง / ผู้เยี่ยมชมเห็นภาพ Silhouette)
- **Data Integrity**: ปรับปรุงการแปลงข้อมูล (Parsing) ของ ID และราคาให้เป็นตัวเลขที่ถูกต้องเพื่อป้องกันข้อผิดพลาดทางตรรกะ
- **New Utilities**: เพิ่มฟังก์ชัน `getProductById` เพื่อการดึงข้อมูลที่รวดเร็วและแม่นยำ

### 4. 🛠️ อัปเดตโครงสร้างพื้นฐาน (Infrastructure Updates)
- **Stripe Integration**: อัปเดต API Version ของ Stripe เป็น `2023-10-16` เพื่อความเสถียรและฟีเจอร์ใหม่
- **Error Handling**: พัฒนาการแจ้งเตือนข้อผิดพลาดในหน้า Checkout ให้มีความละเอียดและเข้าใจง่ายขึ้น

---

## 📋 งานที่เพิ่งเสร็จสิ้น (Recent Session - 2026-05-17)

### 1. ✅ แก้ไขปัญหา 404 Account Page
- **ปัญหา**: หน้า `/account` แสดง 404 error
- **สาเหตุ**: ไฟล์ `account/page.tsx` ถูกลบออกจากการ staging ไป
- **แก้ไข**: 
  - ตรวจสอบโครงสร้างไฟล์ account pages
  - พบว่าไฟล์ยังอยู่ในระบบและพร้อมใช้งาน
  - ปัญหาแก้ไขโดยการ restart dev server

### 2. ✅ เพิ่มส่วนแสดงสินค้าที่เกี่ยวข้องใน Product Detail Page
- **ฟีเจอร์**: Carousel สินค้าที่เกี่ยวข้องบนหน้ารายละเอียดสินค้า
- **ไฟล์ที่แก้ไข**:
  - `frontend/src/app/product/[id]/page.tsx` - เพิ่มการดึงข้อมูลสินค้าทั้งหมดจาก API
  - `frontend/src/components/ProductDetailClient.tsx` - เพิ่มส่วน Carousel และฟังก์ชันการทำงาน
- **คุณสมบัติ**:
  - ✨ Carousel แสดงสินค้าแบบ horizontal scroll
  - ⬅️➡️ ปุ่มควบคุมเลื่อนซ้าย-ขวา
  - 🛒 ปุ่ม Quick Buy เพิ่มสินค้าลงตะกร้าโดยตรง
  - 🏷️ แสดงข้อมูล: ชื่อ, ราคา, สถานะ "NEW ARRIVAL", ประเภทไวน์
  - 📱 Responsive design ที่ปรับตัวกับหน้าจอต่างๆ

### 3. ✅ อัปเดตการคำนวณ VAT (Value Added Tax) ในตะกร้า
- **ปัญหา**: ค่ารวมทั้งหมดไม่รวมภาษี VAT
- **แก้ไข**: 
  - เปลี่ยนตัวแปร `tax` → `vat` (ชัดเจนขึ้น)
  - อัปเดตสูตร: `total = subtotal + vat`
  - VAT ถูกคำนวณที่ 7% ของ subtotal
- **ตัวอย่าง**: 
  - Subtotal: ฿1,000
  - VAT (7%): ฿70
  - **รวม: ฿1,070**

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Lucide React (Icons)
- **Backend**: Node.js, Express (Stripe Support)
- **Database**: PostgreSQL (pg pool)
- **Authentication**: JWT (jose), External API Integration
- **Payments**: Stripe (Checkout & Webhooks)

---

## 🚀 วิธีการติดตั้ง (Installation)

### 1. โคลนโปรเจกต์
```bash
git clone https://github.com/artisan-digital-asia/Project1-ThebottleClub.git
cd Project1-ThebottleClub
```

### 2. ตั้งค่า Frontend
```bash
cd frontend
npm install
```
สร้างไฟล์ `.env.local` ในโฟลเดอร์ `frontend`:
```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=https://possimon.onrender.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```
รัน Frontend:
```bash
npm run dev
```

### 3. ตั้งค่า Backend (สำหรับ Stripe Checkout/Webhooks)
```bash
cd ../backend
npm install
```
สร้างไฟล์ `.env` ในโฟลเดอร์ `backend`:
```env
PORT=3001
STRIPE_SECRET_KEY=your_stripe_secret_key
```
รัน Backend:
```bash
npm run dev
```

### 4. การเตรียมฐานข้อมูล
รันคำสั่งใน `database_init.sql` ใน PostgreSQL Database ของคุณเพื่อสร้างตาราง `users` และ `orders` ที่จำเป็นสำหรับระบบ Fallback

---

## 📁 โครงสร้างโฟลเดอร์
- `/frontend`: Next.js App (UI, Actions, Components, API Routes, Proxy)
- `/backend`: Express Server (Stripe Integration, Webhooks)
- `/database_init.sql`: ไฟล์สำหรับสร้าง Schema ในฐานข้อมูล PostgreSQL
- `/frontend/src/lib`: คลังฟังก์ชันส่วนกลาง (Database, Auth, Cart, Stripe)
