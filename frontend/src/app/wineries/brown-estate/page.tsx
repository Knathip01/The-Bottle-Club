import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BrownEstateContent from './BrownEstateContent';

export const metadata: Metadata = {
  title: 'Brown Estate | The Bottle Club & Vivino',
  description: 'BROWN Napa Valley is a collection of wine brands anchored by the heritage Brown Estate label, crafting world-class Zinfandels and distinctive blends.',
};

export default function BrownEstatePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <BrownEstateContent />
      </div>
      <Footer />
    </main>
  );
}
