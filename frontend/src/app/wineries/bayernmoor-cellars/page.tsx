import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BayernmoorContent from './BayernmoorContent';

export const metadata: Metadata = {
  title: 'Bayernmoor Cellars | The Bottle Club & Vivino',
  description: 'Bayernmoor Cellars: Estate winery located in the Puget Sound AVA of Washington State, specializing in cool-climate Pinot Noir.',
};

export default function BayernmoorCellarsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <BayernmoorContent />
      </div>
      <Footer />
    </main>
  );
}
