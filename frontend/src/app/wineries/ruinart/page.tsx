import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import RuinartWineryContent from './RuinartWineryContent';

export const metadata: Metadata = {
  title: 'Ruinart | The Bottle Club & Vivino',
  description:
    'Discover Maison Ruinart, the first established Champagne house, founded in Reims in 1729.',
};

export default function RuinartWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <RuinartWineryContent />
      </div>
      <Footer />
    </main>
  );
}
