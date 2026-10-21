import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChateauMaineGazinWineryContent from './ChateauMaineGazinWineryContent';

export const metadata: Metadata = {
  title: 'Château Maine-Gazin | The Bottle Club & Vivino',
  description: 'Discover Château Maine-Gazin, a family winery in Bordeaux, France.',
};

export default function ChateauMaineGazinWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ChateauMaineGazinWineryContent /></div>
      <Footer />
    </main>
  );
}
