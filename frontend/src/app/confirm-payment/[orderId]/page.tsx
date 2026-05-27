import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-utils';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ConfirmPaymentClient from '@/components/ConfirmPaymentClient';
import { query } from '@/lib/db';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://possimon.onrender.com';

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
  const authHeaders: HeadersInit = { Authorization: `Bearer ${token}` };

  // ── 1. Try fetching from the user-scoped remote API endpoint ────────────────
  let order: any = null;

  try {
    const res = await fetch(`${API_BASE_URL}/api/orders/my`, {
      headers: authHeaders,
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.orders ?? data.data ?? []);
      // Find the specific order by id
      order = list.find((o: any) => String(o.id) === String(orderId)) ?? null;

      if (order) {
        // Normalize shape
        order = {
          ...order,
          total_price: Number(order.total_price ?? order.total_amount ?? 0),
          total_amount: Number(order.total_price ?? order.total_amount ?? 0),
          subtotal_amount: Number(order.subtotal_amount ?? 0),
          shipping_fee: Number(order.shipping_fee ?? 0),
          payment_method: order.payment_method || 'credit_card',
          created_at: order.created_at || new Date().toISOString(),
          items: Array.isArray(order.items)
            ? order.items.map((item: any) => ({
                ...item,
                name: item.product?.name ?? item.name ?? `Product #${item.product_id ?? item.id}`,
                price: Number(item.price ?? item.product?.price ?? 0),
                quantity: Number(item.quantity ?? 0),
              }))
            : [],
        };
      }
    }
  } catch (err) {
    console.error('[ConfirmPaymentPage] Failed to fetch from /api/orders/my:', err);
  }

  // ── 2. Fallback: fetch from local PostgreSQL DB ─────────────────────────────
  if (!order) {
    try {
      const result = await query(
        'SELECT * FROM orders WHERE id = $1 AND user_id::text = $2::text LIMIT 1',
        [Number(orderId), String(user.id)]
      );

      if (result.rows.length > 0) {
        const row = result.rows[0];

        const itemsResult = await query(
          `SELECT oi.id, oi.order_id, oi.product_id, oi.quantity, oi.price,
                  COALESCE(oi.name, p.name, 'Product #' || oi.product_id::text) AS name
           FROM order_items oi
           LEFT JOIN products p ON p.id = oi.product_id
           WHERE oi.order_id = $1`,
          [row.id]
        );

        order = {
          ...row,
          total_price: Number(row.total_amount ?? 0),
          total_amount: Number(row.total_amount ?? 0),
          subtotal_amount: Number(row.subtotal_amount ?? 0),
          shipping_fee: Number(row.shipping_fee ?? 0),
          payment_method: row.payment_method || 'credit_card',
          created_at: row.created_at?.toISOString
            ? row.created_at.toISOString()
            : (row.created_at || new Date().toISOString()),
          items: itemsResult.rows.map((item: any) => ({
            ...item,
            price: Number(item.price ?? 0),
            quantity: Number(item.quantity ?? 0),
          })),
        };
      }
    } catch (err) {
      console.error('[ConfirmPaymentPage] Failed to fetch from local DB:', err);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      <MainHeader />
      <ConfirmPaymentClient
        accessToken={token}
        orderId={String(orderId)}
        initialOrder={order}
      />
      <Footer />
    </div>
  );
}
