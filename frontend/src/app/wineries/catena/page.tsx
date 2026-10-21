import { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CatenaWineryContent from './CatenaWineryContent';

export const metadata: Metadata = {
  title: 'Catena | The Bottle Club & Vivino',
  description:
    'Ever since 1902, when Italian immigrant to Argentina, Nicola Catena, planted his first Malbec in Mendoza, the Catenas have pioneered Argentine wine: from resurrecting the ancient Malbec grape, to preserving ancient biodiverse plant selections, to planting vineyards at high altitudes where no one had dared to plant before.',
};

export default function CatenaWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* The Bottle Club Application Header */}
      <MainHeader />

      {/* Main Winery Body matching Vivino Catena specifications */}
      <div className="flex-grow">
        <CatenaWineryContent />
      </div>

      {/* The Bottle Club Application Footer */}
      <Footer />
    </main>
  );
}
