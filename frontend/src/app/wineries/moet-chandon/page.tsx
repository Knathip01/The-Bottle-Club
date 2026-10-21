import { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MoetChandonWineryContent from './MoetChandonWineryContent';

export const metadata: Metadata = {
  title: 'Moët & Chandon | The Bottle Club & Vivino',
  description:
    'Discover Moët & Chandon, celebrating over 270 years as the world’s most loved champagne house. Explore extensive vineyards across Champagne, Grands Crus and Premiers Crus, cellar master Benoît Gouez, and iconic cuvées.',
};

export default function MoetChandonWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* The Bottle Club Application Header */}
      <MainHeader />

      {/* Main Winery Body matching Vivino Moët & Chandon specifications */}
      <div className="flex-grow">
        <MoetChandonWineryContent />
      </div>

      {/* The Bottle Club Application Footer */}
      <Footer />
    </main>
  );
}
