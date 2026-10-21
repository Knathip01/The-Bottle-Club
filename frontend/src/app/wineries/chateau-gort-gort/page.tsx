import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChateauGortWineryContent from './ChateauGortWineryContent';

export const metadata: Metadata = {
  title: 'Château Gort & Gort | The Bottle Club & Vivino',
  description: 'Discover Château Gort & Gort, a family wine estate in Bordeaux.',
};

export default function ChateauGortWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ChateauGortWineryContent /></div>
      <Footer />
    </main>
  );
}
