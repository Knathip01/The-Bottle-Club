import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import SanSimeonContent from './SanSimeonContent';

export const metadata: Metadata = {
  title: 'San Simeon Wines | The Bottle Club & Vivino',
  description: 'San Simeon takes its name from California’s coastline where wind, fog, and sea shape the vineyards, crafting expressive wines from Monterey to Paso Robles.',
};

export default function SanSimeonPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <SanSimeonContent />
      </div>
      <Footer />
    </main>
  );
}
