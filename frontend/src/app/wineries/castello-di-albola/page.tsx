import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CastelloDiAlbolaContent from './CastelloDiAlbolaContent';

export const metadata: Metadata = {
  title: 'Castello di Albola Winery | The Bottle Club & Vivino',
  description: 'Explore Castello di Albola in Radda in Chianti, Tuscany. Elevated high-altitude Sangiovese wines from historic vineyards.',
};

export default function CastelloDiAlbolaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CastelloDiAlbolaContent />
      </div>
      <Footer />
    </main>
  );
}
