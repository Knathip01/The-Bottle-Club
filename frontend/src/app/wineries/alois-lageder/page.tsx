import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AloisLagederContent from './AloisLagederContent';

export const metadata: Metadata = {
  title: 'Alois Lageder Winery | The Bottle Club & Vivino',
  description: 'Explore Alois Lageder in Südtirol - Alto Adige. Pioneer of biodynamic viticulture and sustainable winemaking since 1823.',
};

export default function AloisLagederPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <AloisLagederContent />
      </div>
      <Footer />
    </main>
  );
}
