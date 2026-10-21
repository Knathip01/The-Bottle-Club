import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-utils';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AccountSidebar from '@/components/account/AccountSidebar';
import { query } from '@/lib/db';
import OrdersContent from '@/components/account/OrdersContent';
import { getBackendServiceToken, getCustomerLoyaltyInfo } from '@/app/actions/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';

/** Normalize an order from the remote API to match the shape OrdersContent expects. */
function normalizeApiOrder(order: any): any {
  return {
    ...order,
    total_price: Number(order.grand_total ?? order.total_price ?? order.total_amount ?? 0),
    total_amount: Number(order.grand_total ?? order.total_price ?? order.total_amount ?? 0),
    subtotal_amount: Number(order.subtotal ?? order.subtotal_amount ?? 0),
    shipping_fee: Number(order.shipping_fee ?? 0),
    payment_method: order.notes?.includes('Payment:')
      ? order.notes.split('Payment:')[1].split(',')[0].trim()
      : (order.payment_method || 'promptpay'),
    created_at: order.created_at || new Date().toISOString(),
    items: Array.isArray(order.items)
      ? order.items.map((item: any) => ({
          ...item,
          name: item.product?.name ?? item.name ?? `Product #${item.product_id ?? item.id}`,
          price: Number(item.unit_price ?? item.price ?? item.product?.selling_price ?? 0),
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
  const serviceToken = await getBackendServiceToken();
  const tokenToUse = serviceToken || token;

  // Resolve customer ID
  let customerId: number | null = null;
  if (user?.customer_id) {
    customerId = Number(user.customer_id);
  } else if (user?.email && tokenToUse) {
    try {
      const loyalty = await getCustomerLoyaltyInfo(user.email, tokenToUse);
      customerId = loyalty?.customerId;
    } catch {}
  }

  // ── 1. Fetch from GET /api/v1/orders/ (Wayneven API) ──────────
  let apiOrders: any[] = [];
  if (tokenToUse) {
    try {
      const url = customerId
        ? `${API_BASE_URL}/api/v1/orders/?customer_id=${customerId}&per_page=50`
        : `${API_BASE_URL}/api/v1/orders/?per_page=50`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${tokenToUse}`,
          'X-Branch-Id': '1',
        },
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : (data.data?.orders ?? data.orders ?? data.items ?? data.data ?? []);
        apiOrders = list.map(normalizeApiOrder);
        console.log(`[OrdersPage] /api/v1/orders/ returned ${apiOrders.length} orders for customer ${customerId}`);
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
      const dbTimeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('DB query timeout')), 2000)
      );

      const result = await Promise.race([
        query(
          'SELECT * FROM orders WHERE user_id::text = $1::text ORDER BY created_at DESC',
          [String(userId)]
        ),
        dbTimeout,
      ]) as any;

      if (result?.rows?.length > 0) {
        const orderIds = result.rows.map((o: any) => o.id);

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
            setTimeout(() => reject(new Error('DB items query timeout')), 2000)
          ),
        ]) as any;

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
          items: (itemsResult?.rows || [])
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
    console.warn('[OrdersPage] Local DB unavailable, using API orders only:', error?.message ?? error);
  }

  // ── 3. Fetch user addresses and order shipping addresses ────────────────────
  let userAddresses: any[] = [];
  let orderShippingMap: Record<string, any> = {};

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yywymyxautnskmuvupwv.supabase.co';
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_L0zDWoTrfHQHPSvUBntbgA_H-kUMxgR';
    const [addrRes, shippingRes] = await Promise.allSettled([
      fetch(`${supabaseUrl}/rest/v1/settings?key=eq.customer_addresses&select=*`, {
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        cache: 'no-store',
      }),
      fetch(`${supabaseUrl}/rest/v1/settings?key=eq.order_shipping_addresses&select=*`, {
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        cache: 'no-store',
      }),
    ]);

    if (addrRes.status === 'fulfilled' && addrRes.value.ok) {
      const rows = await addrRes.value.json();
      if (Array.isArray(rows) && rows.length > 0) {
        const val = rows[0].value;
        const map = typeof val === 'string' ? JSON.parse(val) : (val || {});
        userAddresses = map[String(user.id)] || (user.email ? map[user.email.toLowerCase()] : []) || [];
      }
    }

    if (shippingRes.status === 'fulfilled' && shippingRes.value.ok) {
      const rows = await shippingRes.value.json();
      if (Array.isArray(rows) && rows.length > 0) {
        const val = rows[0].value;
        orderShippingMap = typeof val === 'string' ? JSON.parse(val) : (val || {});
      }
    }
  } catch (err) {
    console.warn('[OrdersPage] Failed to fetch shared addresses:', err);
  }

  // ── 4. Merge: API orders take priority; local DB fills gaps ─────────────────
  const apiOrderMap = new Map<number, any>(apiOrders.map((o) => [o.id, o]));

  for (const local of localOrders) {
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

  const orders = Array.from(apiOrderMap.values()).map((o) => {
    const shippingInfo = orderShippingMap[String(o.id)] || (o.order_number ? orderShippingMap[String(o.order_number)] : null);
    return {
      ...o,
      shipping_address: shippingInfo?.address || o.shipping_address || null,
      recipient_name: shippingInfo?.recipient_name || o.recipient_name || null,
      recipient_phone: shippingInfo?.phone || o.recipient_phone || null,
    };
  }).sort((a, b) => {
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
