import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChateauDeCiffreWineryContent from './ChateauDeCiffreWineryContent';

export const metadata: Metadata = {
  title: 'Château de Ciffre | The Bottle Club & Vivino',
  description: 'Discover Château de Ciffre, a family estate in Faugères, Languedoc.',
};

export default function ChateauDeCiffreWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ChateauDeCiffreWineryContent /></div>
      <Footer />
    </main>
  );
}
