import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-utils';
import { query } from '@/lib/db';

// Fallback in-memory store if PostgreSQL is unavailable
const memoryAddresses: any[] = [];
let memoryIdCounter = 1;

let isTableInitialized = false;

async function ensureTable() {
  if (isTableInitialized) return;
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS customer_addresses (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        phone VARCHAR(50),
        address_line TEXT,
        subdistrict VARCHAR(255),
        district VARCHAR(255),
        province VARCHAR(255),
        postal_code VARCHAR(20),
        country VARCHAR(100) DEFAULT 'Thailand',
        is_default_shipping BOOLEAN DEFAULT false,
        is_default_billing BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    isTableInitialized = true;
  } catch (err: any) {
    console.warn('[AddressRoute] DB init warning, fallback to memory storage:', err?.message);
  }
}

export async function GET() {
  const session = await getSession();
  const userId = session?.user?.id ? String(session.user.id) : null;

  try {
    await ensureTable();
    if (userId) {
      const result = await query(
        `SELECT * FROM customer_addresses WHERE user_id = $1 ORDER BY id DESC`,
        [userId]
      );
      if (result.rows && result.rows.length > 0) {
        return NextResponse.json(result.rows);
      }
    } else {
      const result = await query(
        `SELECT * FROM customer_addresses ORDER BY id DESC LIMIT 20`
      );
      if (result.rows) {
        return NextResponse.json(result.rows);
      }
    }
  } catch (dbErr) {
    console.warn('[AddressRoute] DB fetch failed, using memory store:', dbErr);
  }

  // Memory fallback
  const filtered = userId 
    ? memoryAddresses.filter(a => String(a.user_id) === userId)
    : memoryAddresses;

  return NextResponse.json(filtered);
}

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const session = await getSession();
  const userId = body.user_id ? String(body.user_id) : (session?.user?.id ? String(session.user.id) : null);

  const addressData = {
    user_id: userId,
    first_name: body.first_name || '',
    last_name: body.last_name || '',
    phone: body.phone || '',
    address_line: body.address_line || body.address || '',
    subdistrict: body.subdistrict || body.subDistrict || '',
    district: body.district || '',
    province: body.province || '',
    postal_code: body.postal_code || body.zipcode || '',
    country: body.country || 'Thailand',
    is_default_shipping: Boolean(body.is_default_shipping ?? true),
    is_default_billing: Boolean(body.is_default_billing ?? true),
  };

  try {
    await ensureTable();
    const insertRes = await query(
      `INSERT INTO customer_addresses (
        user_id, first_name, last_name, phone, address_line,
        subdistrict, district, province, postal_code, country,
        is_default_shipping, is_default_billing
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`,
      [
        addressData.user_id,
        addressData.first_name,
        addressData.last_name,
        addressData.phone,
        addressData.address_line,
        addressData.subdistrict,
        addressData.district,
        addressData.province,
        addressData.postal_code,
        addressData.country,
        addressData.is_default_shipping,
        addressData.is_default_billing,
      ]
    );

    if (insertRes.rows && insertRes.rows[0]) {
      return NextResponse.json(insertRes.rows[0], { status: 201 });
    }
  } catch (dbErr) {
    console.warn('[AddressRoute] DB insert failed, using memory store:', dbErr);
  }

  // Memory fallback
  const newAddress = {
    id: memoryIdCounter++,
    ...addressData,
    created_at: new Date().toISOString(),
  };
  memoryAddresses.unshift(newAddress);

  return NextResponse.json(newAddress, { status: 201 });
}
