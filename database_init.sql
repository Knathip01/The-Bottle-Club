-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    points INTEGER DEFAULT 0
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255), -- Matching User ID
    subtotal_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    shipping_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    order_type VARCHAR(50) NOT NULL, -- 'online', 'pos'
    payment_method VARCHAR(50) NOT NULL, -- 'cash', 'transfer', 'credit_card', 'promptpay', 'alipay', 'wechat_pay', 'line_pay', 'shopee_pay', 'true_wallet'
    shipping_method VARCHAR(50), -- 'standard', 'express', or 'pos'
    address_id INTEGER,
    received_amount DECIMAL(10, 2),
    change_amount DECIMAL(10, 2),
    is_full_tax_invoice BOOLEAN NOT NULL DEFAULT false,
    tax_id VARCHAR(13),
    tax_business_name VARCHAR(255),
    use_shipping_as_tax_address BOOLEAN NOT NULL DEFAULT true,
    tax_address JSONB,
    stripe_payment_intent_id VARCHAR(255),
    payment_slip_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Keep existing databases compatible with the current order API.
ALTER TABLE orders ADD COLUMN IF NOT EXISTS subtotal_amount DECIMAL(10, 2) NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_fee DECIMAL(10, 2) NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_method VARCHAR(50);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS is_full_tax_invoice BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax_id VARCHAR(13);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax_business_name VARCHAR(255);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS use_shipping_as_tax_address BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax_address JSONB;

-- Create order items table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Create product reviews table
CREATE TABLE IF NOT EXISTS product_reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert some dummy products if table is empty
INSERT INTO products (name, price, stock) 
SELECT 'Sample Wine Red', 500.00, 100
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);
