import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CastelloPominoContent from './CastelloPominoContent';

export const metadata: Metadata = {
  title: 'Castello Pomino Winery | The Bottle Club & Vivino',
  description: 'Explore Castello Pomino in Pomino, Tuscany, historic Frescobaldi estate renowned for elegant whites and pinot nero.',
};

export default function CastelloPominoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CastelloPominoContent />
      </div>
      <Footer />
    </main>
  );
}
