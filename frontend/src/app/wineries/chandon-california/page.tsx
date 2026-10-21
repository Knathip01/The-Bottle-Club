import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChandonCaliforniaContent from './ChandonCaliforniaContent';

export const metadata: Metadata = {
  title: 'CHANDON California | The Bottle Club & Vivino',
  description: 'Pioneers of American Sparkling Wine in Napa Valley since 1973, crafting award-winning sparkling wines that combine French heritage with Californian character.',
};

export default function ChandonCaliforniaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <ChandonCaliforniaContent />
      </div>
      <Footer />
    </main>
  );
}
