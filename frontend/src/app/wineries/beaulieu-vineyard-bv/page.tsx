import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BeaulieuVineyardBvContent from './BeaulieuVineyardBvContent';

export const metadata: Metadata = {
  title: 'Beaulieu Vineyard (BV) | The Bottle Club & Vivino',
  description: 'Beaulieu Vineyard (BV) has shaped the craft, legacy, and legend of Napa Valley since 1900, renowned for Georges de Latour Private Reserve and Rutherford Dust.',
};

export default function BeaulieuVineyardBvPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <BeaulieuVineyardBvContent />
      </div>
      <Footer />
    </main>
  );
}
