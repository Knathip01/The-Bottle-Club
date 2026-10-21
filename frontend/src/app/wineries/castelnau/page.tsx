import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CastelnauWineryContent from './CastelnauWineryContent';

export const metadata: Metadata = {
  title: 'Castelnau | The Bottle Club & Vivino',
  description: 'Discover Champagne Castelnau and its elegant, long-aged Champagnes.',
};

export default function CastelnauWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><CastelnauWineryContent /></div>
      <Footer />
    </main>
  );
}
