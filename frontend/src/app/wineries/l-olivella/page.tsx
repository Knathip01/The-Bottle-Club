import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LOlivellaContent from './LOlivellaContent';

export const metadata: Metadata = {
  title: "l'Olivella Winery | The Bottle Club & Vivino",
  description: "Explore l'Olivella in Frascati, Lazio, Italy. Organic wines, volcanic soils, sustainable viticulture, and centuries of winemaking tradition.",
};

export default function LOlivellaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <LOlivellaContent />
      </div>
      <Footer />
    </main>
  );
}
