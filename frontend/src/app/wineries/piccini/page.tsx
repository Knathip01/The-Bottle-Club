import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PicciniContent from './PicciniContent';

export const metadata: Metadata = {
  title: 'Piccini Winery | The Bottle Club & Vivino',
  description: 'Discover Piccini 1882, a historic Tuscan estate spanning four generations of passionate Italian winemaking and iconic Chianti wines.',
};

export default function PicciniPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <PicciniContent />
      </div>
      <Footer />
    </main>
  );
}
