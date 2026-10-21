import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-utils';
import { query } from '@/lib/db';
import { getBackendServiceToken, getCustomerLoyaltyInfo } from '@/app/actions/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yywymyxautnskmuvupwv.supabase.co';
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5d3lteXhhdXRuc2ttdXZ1cHd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDI1NjQ2MiwiZXhwIjoyMDk5ODMyNDYyfQ.Bh_ixuXnD6246abT5URUHZ_jy6BJjK29e1aFeEUKZ_Y';

// Memory cache fallback
const memoryAddresses: any[] = [];
let memoryIdCounter = 1;

/** Fetch all stored customer addresses from shared Supabase settings table */
async function getStoredCustomerAddresses(): Promise<{ rowId: string | null; map: Record<string, any[]> }> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/settings?key=eq.customer_addresses&select=*`, {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
      },
      cache: 'no-store',
    });
    if (res.ok) {
      const rows = await res.json();
      if (Array.isArray(rows) && rows.length > 0) {
        const rowId = rows[0].id;
        const val = rows[0].value;
        const map = typeof val === 'string' ? JSON.parse(val) : (val || {});
        return { rowId, map };
      }
    }
  } catch (err) {
    console.warn('[AddressRoute] Error fetching Supabase settings customer_addresses:', err);
  }
  return { rowId: null, map: {} };
}

/** Save updated customer addresses map to shared Supabase settings table */
async function saveStoredCustomerAddresses(rowId: string | null, map: Record<string, any[]>) {
  try {
    const jsonStr = JSON.stringify(map);
    if (rowId) {
      await fetch(`${SUPABASE_URL}/rest/v1/settings?id=eq.${rowId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          value: jsonStr,
          updated_at: new Date().toISOString(),
        }),
      });
    } else {
      await fetch(`${SUPABASE_URL}/rest/v1/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          key: 'customer_addresses',
          value: jsonStr,
          updated_at: new Date().toISOString(),
        }),
      });
    }
  } catch (err) {
    console.warn('[AddressRoute] Error persisting customer_addresses:', err);
  }
}

export async function GET() {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id ? String(user.id) : null;
  const userEmail = (user?.email || '').trim().toLowerCase();

  // 1. Try reading from shared Supabase settings
  const { map } = await getStoredCustomerAddresses();
  const fromSupabase =
    (userId && map[userId]) ||
    (userEmail && map[userEmail]) ||
    (user?.customer_id && map[String(user.customer_id)]) ||
    [];

  if (Array.isArray(fromSupabase) && fromSupabase.length > 0) {
    return NextResponse.json(fromSupabase);
  }

  // 2. Try PostgreSQL if available
  try {
    if (userId) {
      const result = await query(
        `SELECT * FROM customer_addresses WHERE user_id = $1 ORDER BY id DESC`,
        [userId]
      );
      if (result.rows && result.rows.length > 0) {
        return NextResponse.json(result.rows);
      }
    }
  } catch {}

  // 3. Fallback memory store
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
  const user = session?.user;
  const userId = body.user_id ? String(body.user_id) : (user?.id ? String(user.id) : '1');
  const userEmail = (user?.email || body.email || '').trim().toLowerCase();

  const newAddressItem = {
    id: Date.now(),
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // 1. Sync name & phone with FastAPI backend Customer profile
  const serviceToken = await getBackendServiceToken();
  const tokenToUse = serviceToken || user?.access_token;
  if (tokenToUse) {
    let customerId = user?.customer_id ? Number(user.customer_id) : null;
    if (!customerId && userEmail) {
      try {
        const loyalty = await getCustomerLoyaltyInfo(userEmail, tokenToUse);
        if (loyalty?.customerId) customerId = Number(loyalty.customerId);
      } catch {}
    }
    if (customerId) {
      try {
        await fetch(`${API_BASE_URL}/api/v1/customers/${customerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenToUse}`,
          },
          body: JSON.stringify({
            first_name: newAddressItem.first_name || undefined,
            last_name: newAddressItem.last_name || undefined,
            phone: newAddressItem.phone || undefined,
          }),
        });
      } catch (e) {
        console.warn('[AddressRoute] Failed to sync customer name to FastAPI:', e);
      }
    }
  }

  // 2. Persist in shared Supabase settings table (accessible by Admin POS)
  const { rowId, map } = await getStoredCustomerAddresses();
  const userKey = userId || userEmail || 'default';
  const existingList = Array.isArray(map[userKey]) ? map[userKey] : [];

  // Reset defaults if needed
  if (newAddressItem.is_default_shipping) {
    for (const a of existingList) a.is_default_shipping = false;
  }
  const updatedList = [newAddressItem, ...existingList.filter((a: any) => a.id !== newAddressItem.id)];
  map[userKey] = updatedList;
  if (userEmail && userEmail !== userKey) {
    map[userEmail] = updatedList;
  }
  if (user?.customer_id && String(user.customer_id) !== userKey) {
    map[String(user.customer_id)] = updatedList;
  }

  await saveStoredCustomerAddresses(rowId, map);

  // 3. Best-effort mirror to PostgreSQL
  try {
    await query(
      `INSERT INTO customer_addresses (
        user_id, first_name, last_name, phone, address_line,
        subdistrict, district, province, postal_code, country,
        is_default_shipping, is_default_billing
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        newAddressItem.user_id,
        newAddressItem.first_name,
        newAddressItem.last_name,
        newAddressItem.phone,
        newAddressItem.address_line,
        newAddressItem.subdistrict,
        newAddressItem.district,
        newAddressItem.province,
        newAddressItem.postal_code,
        newAddressItem.country,
        newAddressItem.is_default_shipping,
        newAddressItem.is_default_billing,
      ]
    ).catch(() => {});
  } catch {}

  // 4. Also store in memory
  memoryAddresses.unshift(newAddressItem);

  return NextResponse.json(newAddressItem, { status: 201 });
}
