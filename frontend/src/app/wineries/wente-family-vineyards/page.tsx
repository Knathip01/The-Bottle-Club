import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WenteFamilyVineyardsContent from './WenteFamilyVineyardsContent';

export const metadata: Metadata = {
  title: 'Wente Family Vineyards | The Bottle Club & Vivino',
  description: 'Wente Family Vineyards is the longest, continuously operated family-owned winery in the United States, maintaining leadership in California winegrowing across five generations.',
};

export default function WenteFamilyVineyardsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <WenteFamilyVineyardsContent />
      </div>
      <Footer />
    </main>
  );
}
