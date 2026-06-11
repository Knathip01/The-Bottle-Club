-- Admin users table (แยกจาก users ปกติ)
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'staff',  -- 'superadmin' | 'staff'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- เพิ่มคอลัมน์ใน orders (สำหรับ Admin actions)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS admin_note TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS approved_by INTEGER REFERENCES admin_users(id);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number VARCHAR(100);

-- เพิ่มคอลัมน์ใน product_reviews (สำหรับ Moderation)
ALTER TABLE product_reviews ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT true;
ALTER TABLE product_reviews ADD COLUMN IF NOT EXISTS moderated_by INTEGER REFERENCES admin_users(id);

-- เพิ่ม is_active ใน users (สำหรับระงับบัญชี)
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Default superadmin for first-time setup.
-- Email: admin@thebottleclub.com
-- Password: admin123
-- Rotate this password before using the admin panel in production.
INSERT INTO admin_users (email, password_hash, name, role)
VALUES (
    'admin@thebottleclub.com',
    '$2b$10$D1Ybxw2YnFIT/EtbtjJDuOeo8IgPmQ8MWQ0cF1EkCM7NP3wcvqB3y',
    'Super Admin',
    'superadmin'
)
ON CONFLICT (email) DO NOTHING;
