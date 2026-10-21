import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BouvetLadubayWineryContent from './BouvetLadubayWineryContent';

export const metadata: Metadata = {
  title: 'Bouvet Ladubay | The Bottle Club & Vivino',
  description: 'Discover Bouvet Ladubay, the Loire Valley sparkling wine house founded in 1851.',
};

export default function BouvetLadubayWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><BouvetLadubayWineryContent /></div>
      <Footer />
    </main>
  );
}
