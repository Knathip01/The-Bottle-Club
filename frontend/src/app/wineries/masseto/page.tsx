import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MassetoContent from './MassetoContent';

export const metadata: Metadata = {
  title: 'Masseto Winery | The Bottle Club & Vivino',
  description: 'Explore legendary Masseto in Bolgheri, Tuscany, born from unique blue clay soil, owned by Marchesi Frescobaldi.',
};

export default function MassetoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <MassetoContent />
      </div>
      <Footer />
    </main>
  );
}
