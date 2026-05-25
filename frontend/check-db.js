const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL, 
  ssl: { rejectUnauthorized: false } 
});

async function main() {
  try {
    // List all tables
    const tables = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name"
    );
    console.log('Tables:', tables.rows.map(x => x.table_name));

    // Check orders table columns if it exists
    if (tables.rows.some(r => r.table_name === 'orders')) {
      const cols = await pool.query(
        "SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name='orders' ORDER BY ordinal_position"
      );
      console.log('\norders columns:');
      cols.rows.forEach(c => console.log(' ', c.column_name, c.data_type, c.is_nullable, c.column_default));

      const count = await pool.query('SELECT COUNT(*) FROM orders');
      console.log('\norders count:', count.rows[0].count);

      if (parseInt(count.rows[0].count) > 0) {
        const sample = await pool.query('SELECT * FROM orders LIMIT 3');
        console.log('\nSample orders:', JSON.stringify(sample.rows, null, 2));
      }
    }

    // Check order_items
    if (tables.rows.some(r => r.table_name === 'order_items')) {
      const count = await pool.query('SELECT COUNT(*) FROM order_items');
      console.log('\norder_items count:', count.rows[0].count);
    }

  } catch(e) {
    console.error('Error:', e.message);
  } finally {
    pool.end();
  }
}

main();
