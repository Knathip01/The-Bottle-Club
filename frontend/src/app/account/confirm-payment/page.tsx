import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-utils';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AccountSidebar from '@/components/account/AccountSidebar';
import ConfirmPaymentListContent from '@/components/account/ConfirmPaymentListContent';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://possimon.onrender.com';

export default async function ConfirmPaymentListingPage() {
  const session = await getSession();
  const { user } = (session as any) || {};

  if (!user) {
    redirect('/login');
  }

  const token: string | undefined = session?.user?.access_token;
  const authHeaders: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

  let orders: any[] = [];
  
  // Fetch pending orders
  if (token) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/my`, {
        headers: authHeaders,
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.orders ?? data.data ?? []);
        // Filter only pending orders
        orders = list.filter((o: any) => o.status === 'pending');
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
