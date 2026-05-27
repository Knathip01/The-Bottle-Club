import { redirect } from 'next/navigation';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AddressesContent from '@/components/account/AddressesContent';
import { syncSession } from '@/app/actions/auth';

export default async function AddAddressPage() {
  const user = await syncSession();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />

      <div className="flex-1 container mx-auto px-4 py-8">
        <AddressesContent user={user} />
      </div>

      <Footer />
    </main>
  );
}
