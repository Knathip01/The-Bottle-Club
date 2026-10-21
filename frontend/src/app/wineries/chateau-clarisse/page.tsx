import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChateauClarisseWineryContent from './ChateauClarisseWineryContent';

export const metadata: Metadata = {
  title: 'Château Clarisse | The Bottle Club & Vivino',
  description: 'Discover Château Clarisse, an organic family winery in Saint-Émilion.',
};

export default function ChateauClarisseWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ChateauClarisseWineryContent /></div>
      <Footer />
    </main>
  );
}
