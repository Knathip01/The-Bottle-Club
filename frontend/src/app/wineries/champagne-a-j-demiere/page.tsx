import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChampagneAJDemiereWineryContent from './ChampagneAJDemiereWineryContent';

export const metadata: Metadata = {
  title: 'Champagne A&J Demière | The Bottle Club & Vivino',
  description: 'Discover Champagne A&J Demière, a Champagne producer led by Jérôme Niziolek-Demière.',
};

export default function ChampagneAJDemiereWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ChampagneAJDemiereWineryContent /></div>
      <Footer />
    </main>
  );
}
