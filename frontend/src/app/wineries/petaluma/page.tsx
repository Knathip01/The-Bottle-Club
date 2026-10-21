import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PetalumaContent from './PetalumaContent';

export const metadata: Metadata = {
  title: 'Petaluma Winery | The Bottle Club & Vivino',
  description: 'Discover Petaluma wines from distinguished vineyard sites across South Australia.',
};

export default function PetalumaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><PetalumaContent /></div>
      <Footer />
    </main>
  );
}
