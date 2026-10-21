import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import KukeriContent from './KukeriContent';

export const metadata: Metadata = {
  title: 'Kukeri | The Bottle Club & Vivino',
  description: 'Kukeri Wines: Limited production Cabernet Sauvignon, Pinot Noir, and Chardonnay from Napa Valley, Russian River Valley, and Sonoma Coast.',
};

export default function KukeriPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <KukeriContent />
      </div>
      <Footer />
    </main>
  );
}
