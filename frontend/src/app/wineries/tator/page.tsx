import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TatorContent from './TatorContent';

export const metadata: Metadata = {
  title: 'Tator Winery | The Bottle Club & Vivino',
  description: 'Explore Tator, inspired by ancient Apulian mythology and celebrated for intense Primitivo and Collezione Privata wines.',
};

export default function TatorPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TatorContent />
      </div>
      <Footer />
    </main>
  );
}
