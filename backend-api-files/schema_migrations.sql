-- ==============================================================================
-- 🍷 THE BOTTLE CLUB & ADMIN POS WINE - DATABASE MIGRATION SCRIPT
-- PostgreSQL DDL for FastAPI Backend (api.wayneven.uk)
-- ==============================================================================

-- 1. เพิ่มคอลัมน์ระบบ e-Commerce ในตาราง orders (หากยังไม่มี)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_source VARCHAR(20) DEFAULT 'pos'; -- 'pos' หรือ 'ecommerce'
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS recipient_name VARCHAR(255);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS recipient_phone VARCHAR(50);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_address TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_note TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_fee NUMERIC(10,2) DEFAULT 0.00;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS discount_amount NUMERIC(10,2) DEFAULT 0.00;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS coupon_code VARCHAR(50);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number VARCHAR(100);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS carrier_name VARCHAR(100);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS slip_url TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS slip_verified BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_orders_order_source ON orders(order_source);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);

-- 2. ตารางที่อยู่ลูกค้า (Customer Addresses)
CREATE TABLE IF NOT EXISTS customer_addresses (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    recipient_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    address_line TEXT NOT NULL,
    subdistrict VARCHAR(255),
    district VARCHAR(255),
    province VARCHAR(255),
    postal_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'Thailand',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_customer_addresses_customer_id ON customer_addresses(customer_id);

-- 3. ตารางตรวจสอบสลิปโอนเงิน (Slip Verifications)
CREATE TABLE IF NOT EXISTS slip_verifications (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
    image_url TEXT NOT NULL,
    transfer_amount NUMERIC(10,2) NOT NULL,
    transfer_date DATE NOT NULL,
    transfer_time TIME NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    status VARCHAR(30) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    admin_note TEXT,
    verified_by_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_slip_verifications_status ON slip_verifications(status);
CREATE INDEX IF NOT EXISTS idx_slip_verifications_order_id ON slip_verifications(order_id);

-- 4. ตารางประวัติแต้มสะสม Loyalty (Loyalty Transactions)
CREATE TABLE IF NOT EXISTS loyalty_transactions (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
    type VARCHAR(20) NOT NULL, -- 'earn', 'redeem', 'adjust', 'expire', 'welcome'
    points INTEGER NOT NULL,
    balance_after INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_customer_id ON loyalty_transactions(customer_id);

-- 5. ตารางรีวิวไวน์จากลูกค้า (Product Reviews)
CREATE TABLE IF NOT EXISTS product_reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_status ON product_reviews(status);

-- 6. ตารางตั้งค่าร้านค้า e-Commerce (Store Settings)
CREATE TABLE IF NOT EXISTS ecommerce_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- เพิ่มค่าเริ่มต้น (Seed initial default settings)
INSERT INTO ecommerce_settings (key, value) VALUES
('shipping', '{"standard_fee": 120.00, "free_shipping_threshold": 2500.00, "express_delivery_available": true}'::jsonb),
('bank_account', '{"bank_name": "ธนาคารกสิกรไทย (KBANK)", "account_name": "บริษัท เดอะ บอทเทิล คลับ จำกัด", "account_number": "123-4-56789-0", "promptpay_id": "0105566000000"}'::jsonb),
('loyalty_rules', '{"earn_rate_thb": 100, "earn_points": 1, "redeem_points": 10, "redeem_discount_thb": 1, "welcome_points": 50}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- ตรวจสอบคอลัมน์ loyalty_points_balance ใน customers
ALTER TABLE customers ADD COLUMN IF NOT EXISTS loyalty_points_balance INTEGER DEFAULT 0;
