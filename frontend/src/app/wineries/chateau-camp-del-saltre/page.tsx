import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChateauCampDelSaltreWineryContent from './ChateauCampDelSaltreWineryContent';

export const metadata: Metadata = {
  title: 'Château Camp del Saltre | The Bottle Club & Vivino',
  description: 'Discover Château Camp del Saltre, a historic wine estate in Cahors, France.',
};

export default function ChateauCampDelSaltreWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ChateauCampDelSaltreWineryContent /></div>
      <Footer />
    </main>
  );
}
