import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import EmilioMoroContent from './EmilioMoroContent';

export const metadata: Metadata = {
  title: 'Emilio Moro Winery | The Bottle Club & Vivino',
  description: 'Explore Bodegas Emilio Moro in Ribera del Duero, Spain. Four generations of passion producing world-class Tempranillo and Bierzo Godello wines.',
};

export default function EmilioMoroPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <EmilioMoroContent />
      </div>
      <Footer />
    </main>
  );
}
