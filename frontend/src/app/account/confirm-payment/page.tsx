import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-utils';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AccountSidebar from '@/components/account/AccountSidebar';
import ConfirmPaymentListContent from '@/components/account/ConfirmPaymentListContent';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';

export default async function ConfirmPaymentListingPage() {
  const session = await getSession();
  const { user } = (session as any) || {};

  if (!user) {
    redirect('/login');
  }

  const token: string | undefined = session?.user?.access_token;
  const authHeaders: HeadersInit = token
    ? {
        Authorization: `Bearer ${token}`,
        'X-Branch-Id': '1',
      }
    : {};

  let orders: any[] = [];
  
  // Fetch orders from API
  if (token) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/orders/`, {
        headers: authHeaders,
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        const rawList = Array.isArray(data)
          ? data
          : (Array.isArray(data?.data)
              ? data.data
              : (data?.data?.orders ?? data?.orders ?? data?.items ?? []));
        const list = Array.isArray(rawList) ? rawList : [];

        // Load shared order slips from Supabase settings
        let slipsMap: Record<string, any> = {};
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
              slipsMap = typeof rawVal === 'string' ? JSON.parse(rawVal) : (rawVal || {});
            }
          }
        } catch (e) {
          console.warn('[ConfirmPaymentListingPage] Failed to fetch slips:', e);
        }

        // Filter orders for user and attach slip metadata
        const userEmail = (user.email || '').toLowerCase().trim();
        const userId = user.id ? String(user.id) : '';
        const userCustomerId = (user as any).customer_id ? String((user as any).customer_id) : '';

        orders = list
          .filter((o: any) => {
            const orderEmail = (o.customer_email || o.customer?.email || '').toLowerCase().trim();
            const orderCustId = o.customer_id ? String(o.customer_id) : '';
            const orderUserId = o.user_id ? String(o.user_id) : '';
            const slip = slipsMap[String(o.id)];
            const slipEmail = (slip?.customer_email || '').toLowerCase().trim();
            return (
              (userEmail && (orderEmail === userEmail || slipEmail === userEmail)) ||
              (userId && (orderUserId === userId || orderCustId === userId)) ||
              (userCustomerId && orderCustId === userCustomerId) ||
              (!orderEmail && !orderCustId && !orderUserId)
            );
          })
          .map((o: any) => {
            const orderIdStr = String(o.id);
            const slip = slipsMap[orderIdStr] || null;
            return {
              ...o,
              slip,
              has_slip: Boolean(slip),
              total_price: Number(o.grand_total ?? o.total_price ?? o.total_amount ?? 0),
            };
          });
      }
    } catch (err) {
      console.error('[ConfirmPaymentListingPage] Failed to fetch orders:', err);
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-stone-50">
      <MainHeader />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <AccountSidebar user={user} activePath="/account/confirm-payment" />
          <ConfirmPaymentListContent orders={orders} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
