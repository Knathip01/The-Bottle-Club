import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MicheleSattaContent from './MicheleSattaContent';

export const metadata: Metadata = {
  title: 'Michele Satta Winery | The Bottle Club & Vivino',
  description: 'Explore Michele Satta in Bolgheri, Tuscany, pioneer of Bolgheri Superiore DOC with winemaker Michele Satta.',
};

export default function MicheleSattaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <MicheleSattaContent />
      </div>
      <Footer />
    </main>
  );
}
