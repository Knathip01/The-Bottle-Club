import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import FavoriWineryContent from './FavoriWineryContent';

export const metadata: Metadata = {
  title: 'Favori | The Bottle Club & Vivino',
  description: 'Discover Favori, a winery in Provence, France.',
};

export default function FavoriWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><FavoriWineryContent /></div>
      <Footer />
    </main>
  );
}
