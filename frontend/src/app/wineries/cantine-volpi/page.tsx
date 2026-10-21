import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CantineVolpiContent from './CantineVolpiContent';

export const metadata: Metadata = {
  title: 'Cantine Volpi Winery | The Bottle Club & Vivino',
  description: 'Explore Cantine Volpi in Piemonte, Italy, known for Barbera, Timorasso, organic winemaking, and over a century of winemaking tradition.',
};

export default function CantineVolpiPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CantineVolpiContent />
      </div>
      <Footer />
    </main>
  );
}
