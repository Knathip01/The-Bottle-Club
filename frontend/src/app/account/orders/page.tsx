import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-utils';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AccountSidebar from '@/components/account/AccountSidebar';
import { query } from '@/lib/db';
import OrdersContent from '@/components/account/OrdersContent';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';

/** Normalize an order from the remote API to match the shape OrdersContent expects. */
function normalizeApiOrder(order: any): any {
  return {
    ...order,
    // The new /api/orders/my endpoint returns total_price; also support total_amount
    total_price: Number(order.total_price ?? order.total_amount ?? 0),
    total_amount: Number(order.total_price ?? order.total_amount ?? 0),
    subtotal_amount: Number(order.subtotal_amount ?? 0),
    shipping_fee: Number(order.shipping_fee ?? 0),
    payment_method: order.payment_method || 'credit_card',
    created_at: order.created_at || new Date().toISOString(),
    // items already come from API as [{ product: { name, ... }, quantity, price }]
    // re-shape to the flat format OrdersContent uses: { name, quantity, price }
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

export default async function OrdersPage() {
  const session = await getSession();
  const { user } = (session as any) || {};

  if (!user) {
    redirect('/login');
  }

  const token: string | undefined = session?.user?.access_token;
  const authHeaders: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

  // ── 1. Fetch from GET /api/v1/orders/ (Wayneven API) ──────────
  let apiOrders: any[] = [];
  if (token) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/orders/`, {
        headers: authHeaders,
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.orders ?? data.items ?? data.data ?? []);
        apiOrders = list.map(normalizeApiOrder);
        console.log(`[OrdersPage] /api/v1/orders/ returned ${apiOrders.length} orders`);
      } else if (res.status === 401 || res.status === 403) {
        console.warn('[OrdersPage] /api/v1/orders/ auth error:', res.status);
      } else {
        console.error('[OrdersPage] /api/v1/orders/ unexpected status:', res.status);
      }
    } catch (err) {
      console.error('[OrdersPage] Failed to fetch /api/v1/orders/:', err);
    }
  }

  // ── 2. Fetch from local PostgreSQL DB (supplement / fallback) ────────────────
  let localOrders: any[] = [];
  try {
    const userId = user.id || user.user_id;
    if (userId) {
      // Wrap in a timeout so a hung/terminated DB connection doesn't freeze rendering
      const dbTimeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('DB query timeout after 6s')), 6000)
      );

      const result = await Promise.race([
        query(
          'SELECT * FROM orders WHERE user_id::text = $1::text ORDER BY created_at DESC',
          [String(userId)]
        ),
        dbTimeout,
      ]);

      if (result.rows.length > 0) {
        const orderIds = result.rows.map((o: any) => o.id);

        // Fetch items with LEFT JOIN so orders show even if products table is sparse
        const itemsResult = await Promise.race([
          query(
            `SELECT oi.id, oi.order_id, oi.product_id, oi.quantity, oi.price,
                    COALESCE(oi.name, p.name, 'Product #' || oi.product_id::text) AS name
             FROM order_items oi
             LEFT JOIN products p ON p.id = oi.product_id
             WHERE oi.order_id = ANY($1)`,
            [orderIds]
          ),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('DB items query timeout after 6s')), 6000)
          ),
        ]);

        localOrders = result.rows.map((order: any) => ({
          ...order,
          total_price: Number(order.total_amount ?? 0),
          total_amount: Number(order.total_amount ?? 0),
          subtotal_amount: Number(order.subtotal_amount ?? 0),
          shipping_fee: Number(order.shipping_fee ?? 0),
          payment_method: order.payment_method || 'credit_card',
          created_at: order.created_at?.toISOString
            ? order.created_at.toISOString()
            : (order.created_at || new Date().toISOString()),
          items: itemsResult.rows
            .filter((item: any) => item.order_id === order.id)
            .map((item: any) => ({
              ...item,
              price: Number(item.price ?? 0),
              quantity: Number(item.quantity ?? 0),
            })),
        }));

        console.log(`[OrdersPage] Local DB returned ${localOrders.length} orders`);
      }
    }
  } catch (error: any) {
    // DB connection issue — gracefully fall back to API orders only
    console.warn('[OrdersPage] Local DB unavailable, using API orders only:', error?.message ?? error);
  }

  // ── 3. Fetch user addresses for display in order details ────────────────────
  let userAddresses: any[] = [];
  try {
    const userId = user.id || user.user_id;
    if (userId) {
      const addrRes = await query(
        `SELECT * FROM customer_addresses WHERE user_id = $1 ORDER BY id DESC`,
        [String(userId)]
      ).catch(() => ({ rows: [] }));
      userAddresses = addrRes.rows || [];
    }
  } catch (err) {
    console.error('[OrdersPage] Failed to fetch addresses:', err);
  }

  // ── 4. Merge: API orders take priority; local DB fills gaps ─────────────────
  // Use stripe_payment_intent_id as a reference to match remote API id with local id
  const apiOrderMap = new Map<number, any>(apiOrders.map((o) => [o.id, o]));

  // Add local orders that aren't already covered by the API response
  for (const local of localOrders) {
    // Check if this local order's api_order_id (stored in stripe_payment_intent_id) is already in apiOrders
    const apiRef = local.stripe_payment_intent_id
      ? parseInt(local.stripe_payment_intent_id, 10)
      : null;

    const alreadyPresent =
      apiOrderMap.has(local.id) ||
      (apiRef && apiOrderMap.has(apiRef));

    if (!alreadyPresent) {
      apiOrderMap.set(local.id, local);
    }
  }

  const orders = Array.from(apiOrderMap.values()).sort((a, b) => {
    const da = new Date(a.created_at).getTime();
    const db_ = new Date(b.created_at).getTime();
    return (isNaN(db_) ? 0 : db_) - (isNaN(da) ? 0 : da);
  });

  return (
    <main className="min-h-screen flex flex-col bg-stone-50">
      <MainHeader />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <AccountSidebar user={user} activePath="/account/orders" />
          <OrdersContent initialOrders={orders} addresses={userAddresses} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
