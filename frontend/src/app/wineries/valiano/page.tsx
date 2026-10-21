import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ValianoContent from './ValianoContent';

export const metadata: Metadata = {
  title: 'Valiano Winery | The Bottle Club & Vivino',
  description: 'Explore Fattoria di Valiano in Castelnuovo Berardenga, Chianti Classico, famed for organic vineyards and prestigious Piccini family heritage.',
};

export default function ValianoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <ValianoContent />
      </div>
      <Footer />
    </main>
  );
}
