import { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import VeuveClicquotWineryContent from './VeuveClicquotWineryContent';

export const metadata: Metadata = {
  title: 'Veuve Clicquot | The Bottle Club & Vivino',
  description:
    'Discover Veuve Clicquot, the iconic Champagne house. Explore their vineyards across Grands Crus and Premiers Crus, expert winegrowers, sustainable viticulture, and timeless cuvées.',
};

export default function VeuveClicquotWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* The Bottle Club Application Header */}
      <MainHeader />

      {/* Main Winery Body matching Vivino Veuve Clicquot specifications */}
      <div className="flex-grow">
        <VeuveClicquotWineryContent />
      </div>

      {/* The Bottle Club Application Footer */}
      <Footer />
    </main>
  );
}
