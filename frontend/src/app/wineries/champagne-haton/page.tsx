import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChampagneHatonWineryContent from './ChampagneHatonWineryContent';

export const metadata: Metadata = {
  title: 'Champagne Haton | The Bottle Club & Vivino',
  description: 'Discover Champagne Haton, a family Champagne house in the Marne Valley.',
};

export default function ChampagneHatonWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ChampagneHatonWineryContent /></div>
      <Footer />
    </main>
  );
}
