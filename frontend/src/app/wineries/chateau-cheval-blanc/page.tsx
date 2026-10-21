import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChevalBlancWineryContent from './ChevalBlancWineryContent';

export const metadata: Metadata = {
  title: 'Château Cheval Blanc | The Bottle Club & Vivino',
  description: 'Discover Château Cheval Blanc, its Saint-Émilion terroir, history, vineyards, and winemaking tradition.',
};

export default function ChevalBlancWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ChevalBlancWineryContent /></div>
      <Footer />
    </main>
  );
}
