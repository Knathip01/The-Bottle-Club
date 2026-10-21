import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CantineParadisoContent from './CantineParadisoContent';

export const metadata: Metadata = {
  title: 'Cantine Paradiso Winery | The Bottle Club & Vivino',
  description: 'Discover Cantine Paradiso, three generations of Apulian winemaking tradition in Cerignola, Puglia with winemaker Angelo Paradiso.',
};

export default function CantineParadisoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CantineParadisoContent />
      </div>
      <Footer />
    </main>
  );
}
