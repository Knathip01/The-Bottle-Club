import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LaBurgondieWineryContent from './LaBurgondieWineryContent';

export const metadata: Metadata = {
  title: 'La Burgondie | The Bottle Club & Vivino',
  description: 'Discover La Burgondie, Burgundy wines brought together by 800 cooperating winegrower families.',
};

export default function LaBurgondieWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><LaBurgondieWineryContent /></div>
      <Footer />
    </main>
  );
}
