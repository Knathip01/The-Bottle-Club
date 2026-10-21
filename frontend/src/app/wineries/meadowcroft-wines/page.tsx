import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MeadowcroftContent from './MeadowcroftContent';

export const metadata: Metadata = {
  title: 'Meadowcroft Wines | The Bottle Club & Vivino',
  description: 'European Heritage meets California creativity. Explore expressive Sonoma County and Napa Valley wines handcrafted by Tom Meadowcroft.',
};

export default function MeadowcroftPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <MeadowcroftContent />
      </div>
      <Footer />
    </main>
  );
}
