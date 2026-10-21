import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ShaferContent from './ShaferContent';

export const metadata: Metadata = {
  title: 'Shafer | The Bottle Club & Vivino',
  description: 'Shafer Vineyards is a historic Napa Valley estate renowned for producing world-class wines including Hillside Select in Stags Leap District.',
};

export default function ShaferPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <ShaferContent />
      </div>
      <Footer />
    </main>
  );
}
