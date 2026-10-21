import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChateauMarguiWineryContent from './ChateauMarguiWineryContent';

export const metadata: Metadata = {
  title: 'Château Margüi | The Bottle Club & Vivino',
  description: 'Discover Château Margüi, an organic estate in Provence and part of Skywalker Vineyards.',
};

export default function ChateauMarguiWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ChateauMarguiWineryContent /></div>
      <Footer />
    </main>
  );
}
