import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LloydCellarsContent from './LloydCellarsContent';

export const metadata: Metadata = {
  title: 'Lloyd Cellars | The Bottle Club & Vivino',
  description: 'Big, fruit-forward Carneros Chardonnay and Sta. Rita Hills Pinot Noir handcrafted by Rob and Bonnie Lloyd in Napa Valley.',
};

export default function LloydCellarsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <LloydCellarsContent />
      </div>
      <Footer />
    </main>
  );
}
