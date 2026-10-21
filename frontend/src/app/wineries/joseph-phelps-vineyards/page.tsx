import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import JosephPhelpsVineyardsContent from './JosephPhelpsVineyardsContent';

export const metadata: Metadata = {
  title: 'Joseph Phelps Vineyards | The Bottle Club & Vivino',
  description: 'Joseph Phelps Vineyards is committed to crafting world-class, estate-based wines in Napa Valley and the Sonoma Coast, renowned for the iconic Insignia Bordeaux-style blend.',
};

export default function JosephPhelpsVineyardsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <JosephPhelpsVineyardsContent />
      </div>
      <Footer />
    </main>
  );
}
