import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-utils';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AccountSidebar from '@/components/account/AccountSidebar';
import RewardPointsContent from '@/components/account/RewardPointsContent';
import { syncSession } from '@/app/actions/auth';

export default async function RewardPointsPage() {
  const user = await syncSession();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-12">
          <AccountSidebar user={user} activePath="/account/points" />
          <RewardPointsContent user={user} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
