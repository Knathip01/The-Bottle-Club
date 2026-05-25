import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-utils';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AccountSidebar from '@/components/account/AccountSidebar';
import { query } from '@/lib/db';
import OrdersContent from '@/components/account/OrdersContent';

export default async function OrdersPage() {
  const session = await getSession();
  const { user } = (session as any) || {};
  
  if (!user) {
    redirect('/login');
  }

  // Fetch all orders from both API and local DB
  let orders: any[] = [];
  
  // 1. Fetch from Render API
  let apiOrders: any[] = [];
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://possimon.onrender.com';
    const token = session?.user?.access_token;
    
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      headers,
      next: { revalidate: 0 },
    });
    
    if (res.ok) {
      const allOrders = await res.json();
      if (Array.isArray(allOrders)) {
        apiOrders = allOrders.map((order: any) => ({
          ...order,
          // Handle schema: OrderOut might have total_price
          total_price: order.total_price || order.total_amount || 0,
          payment_method: order.payment_method || 'API'
        }));
      }
    } else if (res.status === 401 || res.status === 403) {
      // Expected for non-admin users — GET /api/orders is admin-only.
      // Fall back to local DB orders below.
    } else {
      console.error('API response not OK:', res.status);
    }
  } catch (error) {
    console.error('Failed to fetch orders from API:', error);
  }

  // 2. Fetch from Local Database (Fallback/Historical)
  let localOrders: any[] = [];
  try {
    const userId = user.id || user.user_id;
    const userEmail = user.email;
    if (userId) {
      const result = await query(
        'SELECT * FROM orders WHERE user_id::text = $1::text ORDER BY created_at DESC',
        [String(userId)]
      );
      localOrders = result.rows.map(order => ({
        ...order,
        total_price: Number(order.total_amount || 0),
        total_amount: Number(order.total_amount || 0),
        subtotal_amount: Number(order.subtotal_amount || 0),
        shipping_fee: Number(order.shipping_fee || 0),
        payment_method: order.payment_method || 'credit_card',
        created_at: order.created_at?.toISOString
          ? order.created_at.toISOString()
          : (order.created_at || new Date().toISOString()),
      }));

      // Fetch items — LEFT JOIN so orders show even if products table is empty
      if (localOrders.length > 0) {
        const orderIds = localOrders.map(o => o.id);
        const itemsResult = await query(
          `SELECT oi.id, oi.order_id, oi.product_id, oi.quantity,
                  oi.price, COALESCE(oi.name, p.name, 'Product #' || oi.product_id::text) AS name
           FROM order_items oi
           LEFT JOIN products p ON p.id = oi.product_id
           WHERE oi.order_id = ANY($1)`,
          [orderIds]
        );
        localOrders.forEach(order => {
          order.items = itemsResult.rows
            .filter(item => item.order_id === order.id)
            .map(item => ({
              ...item,
              price: Number(item.price || 0),
              quantity: Number(item.quantity || 0),
            }));
        });
      }
    }
  } catch (error) {
    console.error('Failed to fetch orders from local DB:', error);
  }

  // 3. Fetch Addresses from API to display in Order History
  let userAddresses: any[] = [];
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://possimon.onrender.com';
    const token = session?.user?.access_token;
    if (token) {
      const res = await fetch(`${API_BASE_URL}/api/customers/addresses`, {
        headers: { 'Authorization': `Bearer ${token}` },
        next: { revalidate: 0 },
      });
      if (res.ok) {
        const data = await res.json();
        userAddresses = Array.isArray(data) ? data : (data.addresses || data.data || []);
      }
    }
  } catch (err) {
    console.error('Failed to fetch addresses for orders page:', err);
  }

  // Combine and remove duplicates (by ID if both sources have the same order)
  const combined = [...apiOrders, ...localOrders];
  const uniqueOrders = Array.from(new Map(combined.map(item => [item.id, item])).values());
  
  orders = uniqueOrders;
  orders.sort((a: any, b: any) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
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
