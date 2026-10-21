import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ArgelesWineryContent from './ArgelesWineryContent';

export const metadata: Metadata = {
  title: 'Argeles Winery | The Bottle Club & Vivino',
  description: 'Explore Argeles Winery in DOQ Priorat, crafting limited-production, single-estate wines rooted in slate llicorella soils and Carthusian heritage.',
};

export default function ArgelesWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <ArgelesWineryContent />
      </div>
      <Footer />
    </main>
  );
}
