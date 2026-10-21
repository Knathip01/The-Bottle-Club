import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BelpostoContent from './BelpostoContent';

export const metadata: Metadata = {
  title: 'Belposto Winery | The Bottle Club & Vivino',
  description: 'Explore Belposto wines by Candoni De Zan Family from Veneto, Italy. Authentic Italian wines celebrating beautiful places, tradition, and life moments.',
};

export default function BelpostoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <BelpostoContent />
      </div>
      <Footer />
    </main>
  );
}
