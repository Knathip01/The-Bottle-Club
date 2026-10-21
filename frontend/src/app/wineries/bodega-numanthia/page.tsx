import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BodegaNumanthiaContent from './BodegaNumanthiaContent';

export const metadata: Metadata = {
  title: 'Bodega Numanthia Winery | The Bottle Club & Vivino',
  description: 'Explore Bodega Numanthia in Toro, Spain. Renowned guardian of unique Spanish winemaking heritage with ancient Tinta de Toro vines.',
};

export default function BodegaNumanthiaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <BodegaNumanthiaContent />
      </div>
      <Footer />
    </main>
  );
}
