import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PanizziContent from './PanizziContent';

export const metadata: Metadata = {
  title: 'Panizzi Winery | The Bottle Club & Vivino',
  description: 'Explore Panizzi in San Gimignano, Tuscany, Italy, celebrated for iconic Vernaccia di San Gimignano, organic viticulture, and artisanal terroir wines.',
};

export default function PanizziPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <PanizziContent />
      </div>
      <Footer />
    </main>
  );
}
