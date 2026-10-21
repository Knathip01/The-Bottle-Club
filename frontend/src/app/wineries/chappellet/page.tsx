import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ChappelletContent from './ChappelletContent';

export const metadata: Metadata = {
  title: 'Chappellet | The Bottle Club & Vivino',
  description: 'Family-owned since 1967, Chappellet crafts exceptional Napa Valley wines from Pritchard Hill, honoring a legacy of mountain winemaking.',
};

export default function ChappelletPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <ChappelletContent />
      </div>
      <Footer />
    </main>
  );
}
