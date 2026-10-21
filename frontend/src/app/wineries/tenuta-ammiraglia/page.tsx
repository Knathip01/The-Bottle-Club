import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TenutaAmmiragliaContent from './TenutaAmmiragliaContent';

export const metadata: Metadata = {
  title: 'Tenuta Ammiraglia Winery | The Bottle Club & Vivino',
  description: 'Explore Tenuta Ammiraglia in Maremma, Tuscany, the modern coastal estate of Marchesi Frescobaldi.',
};

export default function TenutaAmmiragliaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TenutaAmmiragliaContent />
      </div>
      <Footer />
    </main>
  );
}
