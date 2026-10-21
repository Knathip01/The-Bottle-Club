import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AvignonesiContent from './AvignonesiContent';

export const metadata: Metadata = {
  title: 'Avignonesi Winery | The Bottle Club & Vivino',
  description: 'Explore Avignonesi in Vino Nobile di Montepulciano, Tuscany. Certified biodynamic estate renowned for honest wines, biodiversity, and sustainable agriculture.',
};

export default function AvignonesiPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <AvignonesiContent />
      </div>
      <Footer />
    </main>
  );
}
