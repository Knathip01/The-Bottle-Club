import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TrackingContent from '@/components/tracking/TrackingContent';

export default function TrackingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-stone-50">
      <MainHeader />
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <TrackingContent />
      </div>
      <Footer />
    </main>
  );
}
