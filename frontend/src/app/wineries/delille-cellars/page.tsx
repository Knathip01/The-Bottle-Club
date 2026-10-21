import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DeLilleCellarsContent from './DeLilleCellarsContent';

export const metadata: Metadata = {
  title: 'DeLille Cellars | The Bottle Club & Vivino',
  description: 'DeLille Cellars is regarded as a top American producer of Bordeaux-style blends, showcasing a tradition of quality and excellence in Washington State.',
};

export default function DeLilleCellarsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <DeLilleCellarsContent />
      </div>
      <Footer />
    </main>
  );
}
