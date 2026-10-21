import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChampagneTelmontWineryContent from './ChampagneTelmontWineryContent';

export const metadata: Metadata = {
  title: 'Champagne Telmont | The Bottle Club & Vivino',
  description: 'Discover Champagne Telmont, a family Champagne house in Damery, France.',
};

export default function ChampagneTelmontWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ChampagneTelmontWineryContent /></div>
      <Footer />
    </main>
  );
}
