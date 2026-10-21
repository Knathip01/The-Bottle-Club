import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ByingtonContent from './ByingtonContent';

export const metadata: Metadata = {
  title: 'Byington Vineyard and Winery | The Bottle Club & Vivino',
  description: 'Byington Vineyard & Winery: Award-winning estate Pinot Noir, Cabernet Sauvignon, and Chardonnay wines from the Santa Cruz Mountains.',
};

export default function ByingtonPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <ByingtonContent />
      </div>
      <Footer />
    </main>
  );
}
