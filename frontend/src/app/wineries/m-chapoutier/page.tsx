import { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MChapoutierWineryContent from './MChapoutierWineryContent';

export const metadata: Metadata = {
  title: 'M. Chapoutier | The Bottle Club & Vivino',
  description:
    'Discover M. Chapoutier, a premier winery in Rhône Valley, France. Learn about eight generations of winemaking, biodynamic farming, single vineyard selections, and culinary partnerships.',
};

export default function MChapoutierWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* The Bottle Club Application Header */}
      <MainHeader />

      {/* Main Winery Body matching Vivino M. Chapoutier specifications */}
      <div className="flex-grow">
        <MChapoutierWineryContent />
      </div>

      {/* The Bottle Club Application Footer */}
      <Footer />
    </main>
  );
}
