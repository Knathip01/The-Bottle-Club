import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-utils';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AccountContent from '@/components/account/AccountContent';

export default async function AccountPage() {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  const { user } = session;

  return (
    <main className="min-h-screen flex flex-col bg-[linear-gradient(180deg,#fafaf9_0%,#f5f5f4_45%,#fff_100%)]">
      <MainHeader />

      <div className="flex-1 container mx-auto px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <AccountContent user={user} />
      </div>

      <Footer />
    </main>
  );
}
