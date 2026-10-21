import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CignomoroContent from './CignomoroContent';

export const metadata: Metadata = {
  title: 'Cignomoro Winery | The Bottle Club & Vivino',
  description: 'Explore Cignomoro in Puglia, Italy, dedicated to authentic indigenous grapes like Minutolo, Bianco d’Alessano, and Negroamaro.',
};

export default function CignomoroPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CignomoroContent />
      </div>
      <Footer />
    </main>
  );
}
