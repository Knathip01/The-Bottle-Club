import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TrackingContent from '@/components/tracking/TrackingContent';

export default function TrackingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-stone-100 via-stone-50 to-[#FAF6EE]">
      <MainHeader />
      <div className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <TrackingContent />
      </div>
      <Footer />
    </main>
  );
}
