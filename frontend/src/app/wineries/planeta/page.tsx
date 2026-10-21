import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PlanetaContent from './PlanetaContent';

export const metadata: Metadata = {
  title: 'Planeta Winery | The Bottle Club & Vivino',
  description: 'Explore Planeta, a pioneering Sicilian winery with iconic vineyards in Ulmo, Menfi, Vittoria, Noto, Etna, and Capo Milazzo.',
};

export default function PlanetaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <PlanetaContent />
      </div>
      <Footer />
    </main>
  );
}
