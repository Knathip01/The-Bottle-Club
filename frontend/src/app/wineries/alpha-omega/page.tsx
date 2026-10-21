import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AlphaOmegaContent from './AlphaOmegaContent';

export const metadata: Metadata = {
  title: 'Alpha Omega | The Bottle Club & Vivino',
  description: 'Alpha Omega is a family-owned boutique winery on the Rutherford Bench of Napa Valley, handcrafting Bordeaux-inspired Cabernet Sauvignon and single-vineyard wines.',
};

export default function AlphaOmegaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <AlphaOmegaContent />
      </div>
      <Footer />
    </main>
  );
}
