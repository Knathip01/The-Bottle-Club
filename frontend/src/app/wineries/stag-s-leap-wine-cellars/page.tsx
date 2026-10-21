import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import StagsLeapWineCellarsContent from './StagsLeapWineCellarsContent';

export const metadata: Metadata = {
  title: "Stags' Leap | The Bottle Club & Vivino",
  description: "Since our first vintage in 1893, Stags’ Leap Winery has inspired the creation of the AVA that bears our name and has become the foremost producer of Napa Valley Petite Sirah and Cabernet Sauvignon.",
};

export default function StagsLeapWineCellarsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <StagsLeapWineCellarsContent />
      </div>
      <Footer />
    </main>
  );
}
