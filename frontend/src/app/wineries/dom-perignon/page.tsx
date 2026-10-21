import { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DomPerignonWineryContent from './DomPerignonWineryContent';

export const metadata: Metadata = {
  title: 'Dom Pérignon | The Bottle Club & Vivino',
  description:
    'Discover Dom Pérignon, the pinnacle of vintage champagne. An absolute commitment to vintage wines, craftsmanship by cellar master Benoît Gouez, and the quest for harmony.',
};

export default function DomPerignonWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* The Bottle Club Application Header */}
      <MainHeader />

      {/* Main Winery Body matching Vivino Dom Pérignon specifications */}
      <div className="flex-grow">
        <DomPerignonWineryContent />
      </div>

      {/* The Bottle Club Application Footer */}
      <Footer />
    </main>
  );
}
