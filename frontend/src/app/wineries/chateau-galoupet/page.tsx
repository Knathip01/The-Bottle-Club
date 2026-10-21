import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChateauGaloupetWineryContent from './ChateauGaloupetWineryContent';

export const metadata: Metadata = {
  title: 'Château Galoupet | The Bottle Club & Vivino',
  description: 'Discover Château Galoupet, a sustainable Cru Classé rosé estate in Provence.',
};

export default function ChateauGaloupetWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ChateauGaloupetWineryContent /></div>
      <Footer />
    </main>
  );
}
