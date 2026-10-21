import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CanAxartellContent from './CanAxartellContent';

export const metadata: Metadata = {
  title: 'Can Axartell | The Bottle Club & Vivino',
  description: 'Explore Can Axartell organic wines from Pollença, Mallorca, Spain. Experience gravity-flow winemaking (Mètode Gravetat) and handcrafted Mallorcan varieties.',
};

export default function CanAxartellPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CanAxartellContent />
      </div>
      <Footer />
    </main>
  );
}
