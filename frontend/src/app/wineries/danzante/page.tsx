import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DanzanteContent from './DanzanteContent';

export const metadata: Metadata = {
  title: 'Danzante Winery | The Bottle Club & Vivino',
  description: 'Explore Danzante in Tuscany, Italy, crafted by Marchesi Frescobaldi, featuring vibrant Italian wines and signature wine cocktail recipes.',
};

export default function DanzantePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <DanzanteContent />
      </div>
      <Footer />
    </main>
  );
}
