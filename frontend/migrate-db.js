const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL, 
  ssl: { rejectUnauthorized: false } 
});

async function migrate() {
  const client = await pool.connect();
  try {
    console.log('Starting migration...');

    // 1. Add missing columns to orders table (keep existing data)
    const migrations = [
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS subtotal_amount DECIMAL(10,2) NOT NULL DEFAULT 0`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_fee DECIMAL(10,2) NOT NULL DEFAULT 0`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_type VARCHAR(50) NOT NULL DEFAULT 'online'`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) NOT NULL DEFAULT 'credit_card'`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_method VARCHAR(50)`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS address_id INTEGER`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS is_full_tax_invoice BOOLEAN NOT NULL DEFAULT false`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax_id VARCHAR(13)`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax_business_name VARCHAR(255)`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS use_shipping_as_tax_address BOOLEAN NOT NULL DEFAULT true`,
      `ALTER TABLE orders ADD COLUMN IF NOT EXISTS tax_address JSONB`,
      // Make total_amount nullable temporarily for migration safety
      `ALTER TABLE orders ALTER COLUMN total_amount SET DEFAULT 0`,
    ];

    for (const sql of migrations) {
      console.log('Running:', sql.substring(0, 60) + '...');
      await client.query(sql);
    }

    // 2. Create products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL DEFAULT 0,
        stock INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created products table');

    // 3. Create order_items table (no FK to products so we don't need product in DB first)
    await client.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price DECIMAL(10,2) NOT NULL DEFAULT 0,
        name VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Created order_items table');

    // 4. Verify
    const tables = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name"
    );
    console.log('\nTables after migration:', tables.rows.map(x => x.table_name));

    const cols = await client.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name='orders' ORDER BY ordinal_position"
    );
    console.log('orders columns:', cols.rows.map(x => x.column_name));

    console.log('\nMigration complete!');
  } catch (e) {
    console.error('Migration failed:', e.message);
    throw e;
  } finally {
    client.release();
    pool.end();
  }
}

migrate();
