import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-utils';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ConfirmPaymentClient from '@/components/ConfirmPaymentClient';
import { query } from '@/lib/db';
import { getBackendServiceToken } from '@/app/actions/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';

export default async function ConfirmPaymentPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const session = await getSession();
  const token: string | undefined = session?.user?.access_token;
  const user = session?.user;

  if (!user || !token) {
    redirect('/login');
  }

  const { orderId } = await params;
  const serviceToken = await getBackendServiceToken();
  const tokenToUse = serviceToken || token;

  const authHeaders: HeadersInit = {
    Authorization: `Bearer ${tokenToUse}`,
    'X-Branch-Id': '1',
  };

  // ── 1. Fetch directly via GET /api/v1/orders/{reference} ──
  let order: any = null;

  try {
    const singleRes = await fetch(`${API_BASE_URL}/api/v1/orders/${orderId}`, {
      headers: authHeaders,
      cache: 'no-store',
    });

    if (singleRes.ok) {
      const singleData = await singleRes.json();
      order = singleData.data ?? singleData;
    } else {
      // Fallback: list orders with branch context
      const res = await fetch(`${API_BASE_URL}/api/v1/orders/`, {
        headers: authHeaders,
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.orders ?? data.items ?? data.data ?? []);
        order = list.find((o: any) => String(o.id) === String(orderId) || String(o.order_number) === String(orderId)) ?? null;
      }
    }

    if (order) {
      const itemsList = Array.isArray(order.items)
        ? order.items.map((item: any) => ({
            ...item,
            name: item.product?.name ?? item.name ?? `Product #${item.product_id ?? item.id}`,
            price: Number(item.unit_price ?? item.price ?? item.product?.selling_price ?? 0),
            quantity: Number(item.quantity ?? 0),
          }))
        : [];

      const calculatedSubtotal = itemsList.reduce((sum: number, it: any) => sum + (it.price * it.quantity), 0);
      const subtotal = calculatedSubtotal > 0 ? calculatedSubtotal : Number(order.subtotal ?? order.subtotal_amount ?? 0);

      // Match checkout shipping calculation: standard shipping is 150 THB, free if >= 2000 THB
      let shippingFee = Number(order.shipping_fee ?? 0);
      if (shippingFee === 0 && subtotal > 0) {
        shippingFee = subtotal >= 2000 ? 0 : 150;
      }
      const totalAmount = subtotal + shippingFee;

      // Normalize shape
      order = {
        ...order,
        items: itemsList,
        subtotal_amount: subtotal,
        shipping_fee: shippingFee,
        total_price: totalAmount,
        total_amount: totalAmount,
        payment_method: order.notes?.includes('Payment:')
          ? order.notes.split('Payment:')[1].split(',')[0].trim()
          : (order.payment_method || 'promptpay'),
        created_at: order.created_at || new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error('[ConfirmPaymentPage] Failed to fetch from /api/v1/orders/:', err);
  }

  // ── 2. Fallback: fetch from local PostgreSQL DB if available ─────────────
  if (!order) {
    try {
      const result = await Promise.race([
        query(
          'SELECT * FROM orders WHERE id = $1 AND user_id::text = $2::text LIMIT 1',
          [Number(orderId), String(user.id)]
        ),
        new Promise((_, reject) => setTimeout(() => reject(new Error('DB timeout after 2000ms')), 2000)),
      ]) as Awaited<ReturnType<typeof query>>;

      if (result.rows.length > 0) {
        const row = result.rows[0];

        const itemsResult = await Promise.race([
          query(
            `SELECT oi.id, oi.order_id, oi.product_id, oi.quantity, oi.price,
                    COALESCE(oi.name, p.name, 'Product #' || oi.product_id::text) AS name
             FROM order_items oi
             LEFT JOIN products p ON p.id = oi.product_id
             WHERE oi.order_id = $1`,
            [row.id]
          ),
          new Promise((_, reject) => setTimeout(() => reject(new Error('DB timeout after 2000ms')), 2000)),
        ]) as Awaited<ReturnType<typeof query>>;

        const itemsList = itemsResult.rows.map((item: any) => ({
          ...item,
          price: Number(item.price ?? 0),
          quantity: Number(item.quantity ?? 0),
        }));

        const calculatedSubtotal = itemsList.reduce((sum: number, it: any) => sum + (it.price * it.quantity), 0);
        const subtotal = calculatedSubtotal > 0 ? calculatedSubtotal : Number(row.subtotal_amount ?? 0);
        let shippingFee = Number(row.shipping_fee ?? 0);
        if (shippingFee === 0 && subtotal > 0) {
          shippingFee = subtotal >= 2000 ? 0 : 150;
        }
        const totalAmount = subtotal + shippingFee;

        order = {
          ...row,
          items: itemsList,
          subtotal_amount: subtotal,
          shipping_fee: shippingFee,
          total_price: totalAmount,
          total_amount: totalAmount,
          payment_method: row.payment_method || 'credit_card',
          created_at: row.created_at?.toISOString
            ? row.created_at.toISOString()
            : (row.created_at || new Date().toISOString()),
        };
      }
    } catch (err: any) {
      console.warn('[ConfirmPaymentPage] Local DB unavailable, proceeding with remote order data:', err?.message ?? err);
    }
  }

  // ── 3. Fetch existing slip record from Supabase settings ───────────────────
  let existingSlip: any = null;
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yywymyxautnskmuvupwv.supabase.co';
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_L0zDWoTrfHQHPSvUBntbgA_H-kUMxgR';
    const slipRes = await fetch(`${supabaseUrl}/rest/v1/settings?key=eq.order_slips&select=*`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
      cache: 'no-store',
    });
    if (slipRes.ok) {
      const rows = await slipRes.json();
      if (Array.isArray(rows) && rows.length > 0) {
        const rawVal = rows[0].value;
        const slipsMap = typeof rawVal === 'string' ? JSON.parse(rawVal) : (rawVal || {});
        existingSlip = slipsMap[String(orderId)] || null;
      }
    }
  } catch (e) {
    console.warn('Failed to load existing slip for order', orderId, e);
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      <MainHeader />
      <ConfirmPaymentClient
        accessToken={token || tokenToUse}
        orderId={String(orderId)}
        initialOrder={order}
        existingSlip={existingSlip}
      />
      <Footer />
    </div>
  );
}
