import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChateauDeMilleWineryContent from './ChateauDeMilleWineryContent';

export const metadata: Metadata = {
  title: 'Château de Mille | The Bottle Club & Vivino',
  description: 'Discover Château de Mille, an organic winery in Luberon, France.',
};

export default function ChateauDeMilleWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ChateauDeMilleWineryContent /></div>
      <Footer />
    </main>
  );
}
