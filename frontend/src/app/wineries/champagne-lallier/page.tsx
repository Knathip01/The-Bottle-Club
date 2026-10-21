import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChampagneLallierWineryContent from './ChampagneLallierWineryContent';

export const metadata: Metadata = {
  title: 'Champagne Lallier | The Bottle Club & Vivino',
  description: 'Discover Champagne Lallier, a family-owned Champagne house rooted in Aÿ since 1906.',
};

export default function ChampagneLallierWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ChampagneLallierWineryContent /></div>
      <Footer />
    </main>
  );
}
