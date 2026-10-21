import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PriestRanchContent from './PriestRanchContent';

export const metadata: Metadata = {
  title: 'Priest Ranch | The Bottle Club & Vivino',
  description: 'Explore estate-grown wines of exploration, authenticity, and minimal intervention from Priest Ranch nestled in the rugged eastern hills of Napa Valley.',
};

export default function PriestRanchPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <PriestRanchContent />
      </div>
      <Footer />
    </main>
  );
}
