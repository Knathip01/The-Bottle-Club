import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import GratsiContent from './GratsiContent';

export const metadata: Metadata = {
  title: 'Gratsi | The Bottle Club & Vivino',
  description: 'Gratsi makes clean, Mediterranean blends from grapes grown in the South of France and Sicily. Zero sugar, minimal sulfites, and eco-friendly 3L boxes.',
};

export default function GratsiWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <GratsiContent />
      </div>
      <Footer />
    </main>
  );
}
