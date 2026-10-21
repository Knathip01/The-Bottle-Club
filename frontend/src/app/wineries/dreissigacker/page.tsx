import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DreissigackerContent from './DreissigackerContent';

export const metadata: Metadata = {
  title: 'Dreissigacker Winery | The Bottle Club & Vivino',
  description: 'Explore Dreissigacker in Rheinhessen, Germany. Organic, sustainable artisanal Rieslings and estate wines crafted with dedication and time.',
};

export default function DreissigackerPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <DreissigackerContent />
      </div>
      <Footer />
    </main>
  );
}
