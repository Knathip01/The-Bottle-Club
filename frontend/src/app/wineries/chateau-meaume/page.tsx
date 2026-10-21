import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChateauMeaumeWineryContent from './ChateauMeaumeWineryContent';

export const metadata: Metadata = {
  title: 'Château Méaume | The Bottle Club & Vivino',
  description: 'Discover Château Méaume, a sustainable family vineyard in Bordeaux Supérieur.',
};

export default function ChateauMeaumeWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ChateauMeaumeWineryContent /></div>
      <Footer />
    </main>
  );
}
