import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import FrescobaldiContent from './FrescobaldiContent';

export const metadata: Metadata = {
  title: 'Frescobaldi Winery | The Bottle Club & Vivino',
  description: 'Explore Frescobaldi, over 700 years of Tuscan winemaking history across 9 prestigious estates including Nipozzano, CastelGiocondo, and Pomino.',
};

export default function FrescobaldiPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <FrescobaldiContent />
      </div>
      <Footer />
    </main>
  );
}
