import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ArmandBrignacWineryContent from './ArmandBrignacWineryContent';

export const metadata: Metadata = {
  title: 'Armand de Brignac | The Bottle Club & Vivino',
  description: 'Discover Armand de Brignac, a collection of prestige Champagne cuvées.',
};

export default function ArmandBrignacWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ArmandBrignacWineryContent /></div>
      <Footer />
    </main>
  );
}
