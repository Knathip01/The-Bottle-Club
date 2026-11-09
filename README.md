# 🍷 The Bottle Club — Project Documentation & Developer Guide

เอกสารคู่มือโครงการ **The Bottle Club** แพลตฟอร์มร้านค้าออนไลน์สำหรับไวน์และเครื่องดื่มระดับพรีเมียม (Wine & Spirits E-Commerce) พัฒนาด้วยสถาปัตยกรรม **Next.js 16 (App Router + Turbopack)**, **React 19**, **Tailwind CSS v4** และเชื่อมต่อระบบหลังบ้านแบบ **Hybrid Architecture** ร่วมกับ **FastAPI Backend (Wayneven API)** และ **PostgreSQL / Supabase** พร้อมระบบ **Mock Product & Instant Login Fallback** เพื่อความต่อเนื่องในการพัฒนาและทดสอบ

---

## 📑 สารบัญ (Table of Contents)
1. [ภาพรวมสถาปัตยกรรมระบบ (Architecture Overview)](#-ภาพรวมสถาปัตยกรรมระบบ-architecture-overview)
2. [วิธีการทำงานของระบบ (System Workflows)](#-วิธีการทำงานของระบบ-system-workflows)
3. [โครงสร้างโปรเจกต์ (Project Structure)](#-โครงสร้างโปรเจกต์-project-structure)
4. [คู่มือการติดตั้งสำหรับ Developer (Local Setup Guide)](#-คู่มือการติดตั้งสำหรับ-developer-local-setup-guide)
5. [การตั้งค่า Environment Variables](#-การตั้งค่า-environment-variables)
6. [คู่มือการ Deploy ขึ้น Vercel (Vercel Deployment Guide)](#-คู่มือการ-deploy-ขึ้น-vercel-vercel-deployment-guide)
7. [เส้นทางและโมดูลทั้งหมด (Pages & API Routes)](#-เส้นทางและโมดูลทั้งหมด-pages--api-routes)
8. [แผนผังฐานข้อมูล (Database ER Diagram)](#-แผนผังฐานข้อมูล-database-er-diagram)
9. [การทำงานร่วมกับระบบ POS หน้าร้าน](#-การทำงานร่วมกับระบบ-pos-หน้าร้าน)

---

## 📐 ภาพรวมสถาปัตยกรรมระบบ (Architecture Overview)

ระบบออกแบบเป็น **Hybrid Decoupled Architecture** เพื่อความยืดหยุ่นสูงสุดในการทำงานร่วมกันระหว่าง Frontend E-Commerce, Backend API และระบบขายหน้าร้าน (POS)

```mermaid
flowchart TD
    subgraph Client ["Client Devices"]
        Browser["User Browser (Web / Mobile)"]
    end

    subgraph Vercel ["Vercel Edge Platform"]
        NextApp["Next.js 16 App Router (Turbopack)"]
        ServerActions["Server Actions & SSR"]
        APIRoutes["Route Handlers (/api/*)"]
        FallbackEngine["Mock Catalog & Auth Fallback"]
    end

    subgraph ExternalAPI ["Wayneven FastAPI Backend (api.wayneven.uk)"]
        AuthMe["/api/v1/auth/ (OAuth2 / JWT)"]
        WineCatalog["/api/v1/wine-products/"]
        OrderAPI["/api/v1/orders/"]
        CustomerAPI["/api/v1/customers/"]
    end

    subgraph DataLayer ["Data & Storage Layer"]
        SupabaseDB["Supabase PostgreSQL (Settings & Sync)"]
        DirectPG["PostgreSQL Database (Local/Render)"]
        StripeGateway["Stripe Payments Gateway"]
        GeminiAI["Google Gemini AI (Vision & Chat)"]
    end

    Browser -->|HTTPS / RSC| NextApp
    NextApp --> ServerActions
    NextApp --> APIRoutes
    ServerActions -->|Fetch Data| ExternalAPI
    ServerActions -->|If API down/empty| FallbackEngine
    ServerActions -->|Shared Config| SupabaseDB
    ServerActions -->|Orders & Reviews| DirectPG
    APIRoutes -->|Payment Intents| StripeGateway
    APIRoutes -->|Label OCR / Sommelier| GeminiAI
```

---

## ⚙️ วิธีการทำงานของระบบ (System Workflows)

### 1. ระบบดึงข้อมูลสินค้าแบบ Hybrid (Hybrid Product Catalog & Fallback)
1. เมื่อผู้ใช้เข้าชมหน้าเว็บ (`/`, `/search`, `/product/[id]`) ระบบจะเรียกฟังก์ชัน `getWineProducts()` ใน [`products.ts`](frontend/src/lib/products.ts)
2. มีการเรียกคำขอไปยัง Wayneven API (`https://api.wayneven.uk/api/v1/wine-products/`) ด้วย Timeout 8 วินาที
3. **Fallback อัตโนมัติ:** หาก Backend API ตอบกลับ 0 รายการ (`items: []`), หรือเกิดข้อผิดพลาด/ช้า ระบบจะสลับมาดึงสินค้าจาก **`MOCK_PRODUCTS_POOL` (ไวน์ชั้นนำระดับโลกกว่า 130+ รายการ)** ทันที
4. ทำให้ผู้ใช้, พนักงาน และทีมพัฒนาสามารถดูข้อมูล ราคา รูปภาพ กรองตามประเภท (Red, White, Rosé, Sparkling) และทดสอบสั่งซื้อได้ตลอดเวลาโดยไม่สะดุด

### 2. ระบบยืนยันตัวตนและการเข้าสู่ระบบด่วน (Authentication & Instant Demo Login)
- **Production Mode:** ส่งคำขอเข้าสู่ระบบไปยัง FastAPI `/api/v1/auth/login` เพื่อรับ Access Token และเข้ารหัสเก็บไว้ใน HttpOnly Cookie ผ่าน `jose (HS256)`
- **Instant Demo Login:** หาก API ยังไม่พร้อมใช้งาน หรือกรอกรหัสทดสอบ ระบบมีปุ่ม **"⚡ เข้าสู่ระบบทันที (Instant Demo Login)"** ในหน้า [`/login`](frontend/src/app/login/page.tsx)
- ระบบจะสร้าง Mock Session ระดับ **VIP Member** (มี 250 คะแนนสะสม และรหัสสมาชิก `•••• •••• •••• 9999`) ให้อัตโนมัติ ทำให้สามารถทดสอบฟังก์ชันในหน้าสมาชิก เช่น ดูคะแนนสะสม, ตรวจสอบที่อยู่ และจำลองสั่งซื้อได้ทันที

### 3. ระบบสมาชิกและการซ่อนข้อมูลสำหรับ Guest (Members-Only Barrier)
- ผู้ใช้ที่ยังไม่ได้เข้าสู่ระบบจะเห็นราคาและปุ่มเพิ่มลงตะกร้าพร้อมแท็กกระตุ้นให้สมัครสมาชิก
- เมื่อเข้าสู่ระบบแล้ว ข้อมูลราคาเต็ม สิทธิประโยชน์แต้มสะสม และรีวิวจากลูกค้าจะแสดงผลแบบสมบูรณ์

### 4. ระบบ AI Sommelier และ AI Wine Label Scanner (`/scan`)
- เชื่อมต่อกับ **Google Gemini 2.5/Pro API**
- ผู้ใช้สามารถเปิดกล้องหรืออัปโหลดรูปภาพฉลากไวน์ เพื่อให้อัลกอริทึมสกัดชื่อไวน์ ปีที่ผลิต พันธุ์องุ่น และแนะนำเมนูอาหารที่จับคู่ได้อย่างแม่นยำ

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
ProjectbottleClub1/
├── frontend/                  # Next.js 16 Web Application (Deploy บน Vercel)
│   ├── src/
│   │   ├── app/              # Next.js App Router (หน้าเว็บและ API Routes)
│   │   │   ├── (auth)/       # /login, /register, /auth/success
│   │   │   ├── account/      # /account (addresses, orders, points, profile, reviews)
│   │   │   ├── actions/      # Server Actions (auth.ts, product.ts)
│   │   │   ├── api/          # Route Handlers (create-order, upload-slip, wine-scan ฯลฯ)
│   │   │   ├── cart/         # ตะกร้าสินค้า
│   │   │   ├── checkout/     # เช็คเอาต์และชำระเงิน
│   │   │   ├── download/     # ดาวน์โหลดสเปกและไฟล์แบ็กเอนด์
│   │   │   ├── product/      # รายละเอียดสินค้า (/product/[id])
│   │   │   ├── promotions/   # โปรโมชันประจำเดือน
│   │   │   ├── scan/         # AI Wine Label Scanner
│   │   │   ├── search/       # ค้นหาและกรองสินค้า
│   │   │   ├── tracking/     # ติดตามสถานะพัสดุ
│   │   │   └── wineries/     # แคตตาล็อกโรงไวน์ 150+ แห่งทั่วโลก
│   │   ├── components/       # Reusable React Components
│   │   ├── context/          # LanguageContext (รองรับ 25 ภาษา), CartContext
│   │   ├── data/             # Mock Data Pools, Winery Master Data
│   │   └── lib/              # Database, Utilities, Auth-utils, Products Library
│   ├── public/               # รูปภาพ โลโก้ และ Static Assets
│   ├── .env.example          # ตัวอย่าง Environment Variables
│   ├── package.json          # Dependencies & Scripts
│   └── tsconfig.json         # TypeScript Config
├── backend/                   # Node.js/Express Backend เสริม (Microservices/Webhooks)
├── shared/                    # ไฟล์ Schema และ JSON ข้อมูลรีวิวที่แชร์ร่วมกัน
├── AGENTS.md                  # กฎและข้อกำหนดสำหรับ AI Coding Assistant
├── BACKEND_CONTRACT.md        # ข้อตกลง API Contract ร่วมกับทีม FastAPI
└── README.md                  # เอกสารคู่มือโครงการ (ไฟล์นี้)
```

---

## 💻 คู่มือการติดตั้งสำหรับ Developer (Local Setup Guide)

### ความต้องการของระบบ (Prerequisites)
- **Node.js**: เวอร์ชัน `20.x` หรือ `22.x` ขึ้นไป (แนะนำ `22.12.0 LTS`)
- **Package Manager**: `npm` เวอร์ชัน 10 ขึ้นไป
- **Git**: สำหรับการจัดการเวอร์ชันโค้ด

### ขั้นตอนการรันโปรเจกต์บนเครื่อง Local

1. **Clone Repository:**
   ```bash
   git clone https://github.com/Knathip01/The-Bottle-Club.git
   cd The-Bottle-Club
   ```

2. **เข้าไปที่โฟลเดอร์ `frontend`:**
   ```bash
   cd frontend
   ```

3. **ติดตั้ง Dependencies:**
   ```bash
   npm install
   ```

4. **สร้างไฟล์ Environment Variables:**
   คัดลอกไฟล์ `.env.example` เป็น `.env.local`:
   ```bash
   cp .env.example .env.local
   # บน Windows PowerShell:
   Copy-Item .env.example .env.local
   ```
   *(แก้ไขค่าคีย์ต่างๆ ให้อิงตามข้อมูลจริง หรือใช้ค่าเริ่มต้นสำหรับพัฒนาต่อได้ทันที)*

5. **รัน Development Server:**
   ```bash
   npm run dev
   ```
   เปิดเว็บเบราว์เซอร์แล้วเข้าสู่ [http://localhost:3000](http://localhost:3000)

6. **คำสั่งตรวจสอบคุณภาพโค้ด:**
   ```bash
   # ตรวจสอบ Type Safety
   npx tsc --noEmit

   # ตรวจสอบ Linting
   npm run lint

   # ทดสอบคอมไพล์ Production Build
   npm run build
   ```

---

## 🔐 การตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ในโฟลเดอร์ `frontend/` โดยใช้ตัวแปรดังตารางต่อไปนี้:

| ตัวแปร (Variable Name) | จำเป็น | ค่าเริ่มต้น / ตัวอย่าง | คำอธิบาย |
|-----------------------|:-----:|----------------------|----------|
| `NEXT_PUBLIC_API_URL` | ✅ | `https://api.wayneven.uk` | URL ฐานสำหรับเรียก FastAPI Backend |
| `API_URL` | ✅ | `https://api.wayneven.uk` | URL แบ็กเอนด์สำหรับ Server-side Fetch |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | `https://yywymyxautnskmuvupwv.supabase.co` | URL ของ Supabase Project |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | `sb_publishable_...` | Public Anonymous Key ของ Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | `eyJhbGciOi...` | Service Role Key สำหรับจัดการ Settings ลับ |
| `DATABASE_URL` | ⚠️ | `postgresql://user:pass@host:5432/db` | Connection String ฐานข้อมูล PostgreSQL |
| `JWT_SECRET` | ✅ | `super-secret-key-min-32-characters` | คีย์เข้ารหัส Cookie Session ของผู้ใช้ |
| `GEMINI_API_KEY` | ⚠️ | `AQ.Ab8RN6Jh...` | API Key สำหรับ AI Sommelier และ Wine OCR |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ⚠️ | `pk_test_...` | Public Key สำหรับระบบจ่ายเงิน Stripe |
| `STRIPE_SECRET_KEY` | ⚠️ | `sk_test_...` | Secret Key สำหรับ Stripe Webhook / Intents |
| `BACKEND_ADMIN_USER` | ⚠️ | `admin` | Username แอดมินสำหรับดึง Service Token |
| `API_ADMIN_PASSWORD` | ⚠️ | `admin123` | Password แอดมินสำหรับดึง Service Token |

---

## 🚀 คู่มือการ Deploy ขึ้น Vercel (Vercel Deployment Guide)

เนื่องจากโปรเจกต์นี้มีโครงสร้างแบบ Monorepo ย่อย (โค้ดเว็บ Next.js อยู่ในไดเรกทอรี `frontend/`) **การตั้งค่า Root Directory ใน Vercel จึงเป็นขั้นตอนที่สำคัญที่สุด**

### ขั้นตอนการ Deploy ผ่าน Vercel Dashboard

1. **เข้าสู่ระบบ Vercel:** ไปที่ [vercel.com](https://vercel.com) และล็อกอินด้วยบัญชี GitHub ของคุณ
2. **สร้างโปรเจกต์ใหม่ (Add New Project):**
   - คลิกปุ่ม **"Add New..."** → เลือก **"Project"**
   - ค้นหา Repository `The-Bottle-Club` แล้วคลิก **"Import"**
3. **การตั้งค่าโปรเจกต์ (Project Configuration):**
   - **Root Directory (สำคัญที่สุด):** คลิก **Edit** ข้าง Root Directory แล้วระบุเป็น:
     ```text
     frontend
     ```
   - **Framework Preset:** ตรวจสอบว่าระบบเลือกเป็น `Next.js` อัตโนมัติ
   - **Build Command:** ปล่อยเป็นค่าเริ่มต้น (`next build` หรือ `npm run build`)
   - **Output Directory:** ปล่อยเป็นค่าเริ่มต้น (`.next`)
   - **Install Command:** ปล่อยเป็นค่าเริ่มต้น (`npm install`)
4. **ตั้งค่า Environment Variables ใน Vercel:**
   - ขยายแถบ **Environment Variables**
   - คัดลอกค่าจากตาราง Environment Variables ด้านบนไปใส่ให้ครบถ้วน (โดยเฉพาะ `NEXT_PUBLIC_API_URL`, `JWT_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`)
5. **กดปุ่ม Deploy:**
   - คลิก **"Deploy"**
   - Vercel จะทำการ Build และ Deploy หน้าเว็บทั้ง 295 หน้าภายในเวลาประมาณ 1-2 นาที
   - เมื่อสำเร็จ จะได้รับโดเมน Production เช่น `https://pos-thebottleclub-web-eta.vercel.app`

### การตั้งค่า Redeploy อัตโนมัติผ่าน Git
- ทุกครั้งที่มีการ `git push origin main` Vercel จะทำการตรวจสอบและ Build เวอร์ชันใหม่อัตโนมัติ (Continuous Deployment)

---

## 📄 เส้นทางและโมดูลทั้งหมด (Pages & API Routes)

### 1. หน้าเว็บหลัก (User Interface Routes)
| Route | หน้าที่ | คำอธิบาย |
|-------|--------|----------|
| `/` | หน้าหลัก (Home) | Hero Banner, ตัวกรองหมวดหมู่, สินค้ายอดนิยม และโปรโมชัน |
| `/product/[id]` | รายละเอียดสินค้า | ข้อมูลรสสัมผัส, แคว้น, ความเข้มข้นแอลกอฮอล์, คะแนนรีวิว และสินค้าแนะนำ |
| `/search` | ค้นหาสินค้า | ค้นหาแบบ Real-time, กรองตามราคา ชนิดไวน์ (แดง/ขาว/โรเซ่/สปาร์กลิ้ง) |
| `/cart` | ตะกร้าสินค้า | คำนวณยอดเงินรวม, ภาษีมูลค่าเพิ่ม (VAT 7%) และแต้มสะสม |
| `/checkout` | ชำระเงิน | เลือกที่อยู่จัดส่ง, ช่องทางชำระเงิน (Stripe, PromptPay, บัตรเครดิต) |
| `/account` | บัญชีของฉัน | แดชบอร์ดภาพรวมสมาชิก, ระดับ Member Tier (Classic, Silver, Gold, Platinum) |
| `/account/orders` | รายการสั่งซื้อ | ประวัติการสั่งซื้อ และสถานะการชำระเงิน |
| `/account/addresses` | จัดการที่อยู่ | เพิ่มและแก้ไขที่อยู่สำหรับจัดส่งพัสดุ |
| `/account/points` | คะแนนสะสม | ตรวจสอบแต้มสะสมและสิทธิประโยชน์ |
| `/account/confirm-payment` | แจ้งชำระเงิน | อัปโหลดสลิปโอนเงินสำหรับออเดอร์หน้าร้าน/โอนเงิน |
| `/account/reviews` | รีวิวของฉัน | ประวัติการเขียนรีวิวและให้คะแนนสินค้า |
| `/tracking` | ติดตามพัสดุ | ตรวจสอบสถานะการจัดส่งแบบ Real-time |
| `/scan` | AI Wine Scanner | สแกนฉลากไวน์ผ่านกล้องเพื่อรับข้อมูลและคำแนะนำ |
| `/wineries` | แคตตาล็อกโรงไวน์ | ทำเนียบผู้ผลิตไวน์และโรงไวน์ชื่อดังกว่า 150 แห่งทั่วโลก |
| `/download` | ศูนย์ดาวน์โหลด | เอกสารสเปก API, Schema ฐานข้อมูล และสคริปต์หลังบ้าน |

### 2. API ภายใน (Next.js Internal Route Handlers)
- `POST /api/create-order` : สร้างคำสั่งซื้อใหม่และบันทึกลงฐานข้อมูล
- `POST /api/upload-slip` : อัปโหลดและตรวจสอบสลิปการโอนเงิน
- `GET /api/products` : บริการดึงแคตตาล็อกสินค้าพร้อมระบบ Fallback
- `GET /api/promotions` : ดึงข้อมูลโปรโมชันปัจจุบัน
- `POST /api/wine-scan` : วิเคราะห์ฉลากไวน์ด้วย Gemini Vision AI
- `GET /api/shipping/track` : ตรวจสอบสถานะเลขพัสดุ
- `GET/POST /api/customers/addresses` : จัดการที่อยู่ลูกค้าผ่าน Supabase

---

## 🗄️ แผนผังฐานข้อมูล (Database ER Diagram)

```mermaid
erDiagram
    users {
        SERIAL id PK
        VARCHAR first_name
        VARCHAR last_name
        VARCHAR email UK "NOT NULL"
        VARCHAR password_hash "NOT NULL"
        INTEGER points "DEFAULT 0"
        TIMESTAMPTZ created_at
    }

    products {
        SERIAL id PK
        VARCHAR name "NOT NULL"
        DECIMAL price "NOT NULL"
        INTEGER stock "DEFAULT 0"
        VARCHAR color "red / white / rose / sparkling"
        VARCHAR region
        TIMESTAMPTZ created_at
    }

    orders {
        SERIAL id PK
        VARCHAR user_id FK "users.id or external email"
        DECIMAL subtotal_amount "NOT NULL"
        DECIMAL shipping_fee "DEFAULT 0"
        DECIMAL total_amount "NOT NULL"
        VARCHAR status "pending / confirmed / shipped / delivered"
        VARCHAR payment_method "promptpay / stripe / transfer / cash"
        TEXT payment_slip_url
        TIMESTAMPTZ created_at
    }

    order_items {
        SERIAL id PK
        INTEGER order_id FK
        INTEGER product_id FK
        INTEGER quantity "NOT NULL"
        DECIMAL price "NOT NULL"
    }

    product_reviews {
        SERIAL id PK
        INTEGER product_id "NOT NULL"
        VARCHAR user_id "NOT NULL"
        VARCHAR user_name
        INTEGER rating "1-5"
        TEXT comment
        TIMESTAMPTZ created_at
    }

    users ||--o{ orders : "places"
    orders ||--|{ order_items : "contains"
    products ||--o{ order_items : "included in"
    products ||--o{ product_reviews : "receives"
    users ||--o{ product_reviews : "writes"
```

---

## 🍷 การทำงานร่วมกับระบบ POS หน้าร้าน

ระบบ E-Commerce นี้ออกแบบมาเพื่อทำงานสอดประสานกับระบบ **The Bottle Club POS (Point of Sale)**:
- **POS URL:** [pos-thebottleclub-web-eta.vercel.app/pos](https://pos-thebottleclub-web-eta.vercel.app/pos)
- **การแชร์ข้อมูล:** บัญชีสมาชิก, แต้มสะสม (Loyalty Points) และการตั้งค่าร้านค้าจะเชื่อมโยงกันผ่านตารางกลางบน Supabase
- **ระบบสิทธิ์:** ออเดอร์และยอดขายทั้งจาก Online และ POS สามารถสรุปวิเคราะห์ร่วมกันในหน้า Manager Dashboard

---

## 🤝 สำหรับ Developer ที่เข้ามาพัฒนาต่อ (Developer Checklist)
1. **เมื่อเริ่มงาน:** รัน `npm install` ในโฟลเดอร์ `frontend` และตรวจสอบว่า `.env.local` มีคีย์ครบ
2. **ก่อน Commit:** รัน `npx tsc --noEmit` เพื่อตรวจความถูกต้องของ Type และรัน `npm run build` เพื่อให้แน่ใจว่าการ Generate ทุกหน้าผ่าน 100%
3. **การเพิ่มหน้าใหม่:** ใช้โครงสร้าง Next.js 16 App Router และระบุ `'use client'` เฉพาะคอมโพเนนต์ที่มีการใช้งาน State/Hooks เท่านั้น
4. **ความช่วยเหลือ:** สอบถามทีมงานผ่านช่องทาง Issue หรือ Pull Request บน GitHub
