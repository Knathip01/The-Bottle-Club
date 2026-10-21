import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import FelixSolisContent from './FelixSolisContent';

export const metadata: Metadata = {
  title: 'Félix Solís Winery | The Bottle Club & Vivino',
  description: 'Explore Félix Solís in Valdepeñas, Spain. 100% family-owned Spanish wine brand renowned worldwide for quality, innovation, and heritage.',
};

export default function FelixSolisPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <FelixSolisContent />
      </div>
      <Footer />
    </main>
  );
}
