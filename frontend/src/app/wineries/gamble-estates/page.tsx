import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import GambleEstatesContent from './GambleEstatesContent';

export const metadata: Metadata = {
  title: 'Gamble Estates | The Bottle Club & Vivino',
  description: 'Estate wines from Oakville, Rutherford, Mount Veeder, and Yountville in Napa Valley. Handcrafted Cabernet Sauvignon and Sauvignon Blanc by Tom Gamble.',
};

export default function GambleEstatesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <GambleEstatesContent />
      </div>
      <Footer />
    </main>
  );
}
