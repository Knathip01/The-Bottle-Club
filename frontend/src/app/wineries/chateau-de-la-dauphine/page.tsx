import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChateauDauphineWineryContent from './ChateauDauphineWineryContent';

export const metadata: Metadata = {
  title: 'Château de La Dauphine | The Bottle Club & Vivino',
  description: 'Discover Château de La Dauphine, an organic and biodynamic Bordeaux estate in Fronsac.',
};

export default function ChateauDauphineWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ChateauDauphineWineryContent /></div>
      <Footer />
    </main>
  );
}
