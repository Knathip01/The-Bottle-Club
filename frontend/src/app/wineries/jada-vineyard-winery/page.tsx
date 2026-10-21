import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import JadaContent from './JadaContent';

export const metadata: Metadata = {
  title: 'Jada Vineyard & Winery | The Bottle Club & Vivino',
  description: 'Jada Vineyard & Winery: Certified organic Rhone & Bordeaux-style estate wines from the Willow Creek District of Paso Robles.',
};

export default function JadaVineyardWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <JadaContent />
      </div>
      <Footer />
    </main>
  );
}
