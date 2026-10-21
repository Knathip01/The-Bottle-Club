import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import GeograficoContent from './GeograficoContent';

export const metadata: Metadata = {
  title: 'Geografico Winery | The Bottle Club & Vivino',
  description: 'Explore Agricoltori del Chianti Geografico, founded in 1961 in Chianti Classico, Tuscany.',
};

export default function GeograficoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <GeograficoContent />
      </div>
      <Footer />
    </main>
  );
}
