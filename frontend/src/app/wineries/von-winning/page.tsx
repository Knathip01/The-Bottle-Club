import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import VonWinningContent from './VonWinningContent';

export const metadata: Metadata = {
  title: 'Von Winning Winery | The Bottle Club & Vivino',
  description: 'Discover Von Winning, a historic Pfalz estate known for its vineyards and nature-conscious winemaking.',
};

export default function VonWinningPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><VonWinningContent /></div>
      <Footer />
    </main>
  );
}
