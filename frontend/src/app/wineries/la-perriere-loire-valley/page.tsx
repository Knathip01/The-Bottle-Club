import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LaPerriereWineryContent from './LaPerriereWineryContent';

export const metadata: Metadata = {
  title: 'La Perrière | The Bottle Club & Vivino',
  description: 'Discover La Perrière, Saget La Perrière’s Sancerre vineyards and winemaking in the Loire Valley.',
};

export default function LaPerriereWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><LaPerriereWineryContent /></div>
      <Footer />
    </main>
  );
}
