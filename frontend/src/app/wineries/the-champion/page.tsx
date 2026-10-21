import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TheChampionContent from './TheChampionContent';

export const metadata: Metadata = {
  title: 'The Champion Winery | The Bottle Club & Vivino',
  description: 'Discover The Champion Sauvignon Blanc, inspired by the racehorses and landscapes of New Zealand’s South Island.',
};

export default function TheChampionPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><TheChampionContent /></div>
      <Footer />
    </main>
  );
}
