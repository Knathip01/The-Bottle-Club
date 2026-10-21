import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import RetroterraContent from './RetroterraContent';

export const metadata: Metadata = {
  title: 'Retroterra Winery | The Bottle Club & Vivino',
  description: 'Explore Retroterra in Puglia, Italy. Rooted in Puglia, balancing memory, land, and Mediterranean roots with authentic Italian wines.',
};

export default function RetroterraPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <RetroterraContent />
      </div>
      <Footer />
    </main>
  );
}
