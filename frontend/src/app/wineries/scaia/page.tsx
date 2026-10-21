import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ScaiaContent from './ScaiaContent';

export const metadata: Metadata = {
  title: 'Scaia Winery | The Bottle Club & Vivino',
  description: 'Explore Scaia in Veneto, Italy. Reinterpreting Verona’s winemaking heritage with contemporary spirit and fresh, distinctive wines by the Castagnedi family.',
};

export default function ScaiaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <ScaiaContent />
      </div>
      <Footer />
    </main>
  );
}
