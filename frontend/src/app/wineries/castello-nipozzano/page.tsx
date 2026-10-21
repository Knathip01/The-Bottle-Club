import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CastelloNipozzanoContent from './CastelloNipozzanoContent';

export const metadata: Metadata = {
  title: 'Castello Nipozzano Winery | The Bottle Club & Vivino',
  description: 'Explore Castello Nipozzano, the historic Frescobaldi fortress estate in Chianti Rùfina producing legendary Tuscan wines.',
};

export default function CastelloNipozzanoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CastelloNipozzanoContent />
      </div>
      <Footer />
    </main>
  );
}
