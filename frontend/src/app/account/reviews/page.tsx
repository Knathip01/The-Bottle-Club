import { redirect } from 'next/navigation';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ReviewsContent from '@/components/account/ReviewsContent';
import { syncSession } from '@/app/actions/auth';

export default async function ReviewsPage() {
  const user = await syncSession();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />

      <div className="flex-1 container mx-auto px-4 py-8">
        <ReviewsContent user={user} />
      </div>

      <Footer />
    </main>
  );
}
