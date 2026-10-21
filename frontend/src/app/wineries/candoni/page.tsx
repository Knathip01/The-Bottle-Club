import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CandoniContent from './CandoniContent';

export const metadata: Metadata = {
  title: 'Candoni Winery | The Bottle Club & Vivino',
  description: 'Explore Candoni De Zan Family wines in Veneto, Italy, celebrated for Ancient Etruscan Collection, Pinot Grigio, Prosecco, and fine Italian viticulture.',
};

export default function CandoniPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CandoniContent />
      </div>
      <Footer />
    </main>
  );
}
