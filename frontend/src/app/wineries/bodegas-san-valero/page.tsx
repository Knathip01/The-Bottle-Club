import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BodegasSanValeroContent from './BodegasSanValeroContent';

export const metadata: Metadata = {
  title: 'Bodegas San Valero Winery | The Bottle Club & Vivino',
  description: 'Explore Bodegas San Valero in Cariñena, Spain. The Heart of Cariñena Since 1944.',
};

export default function BodegasSanValeroPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <BodegasSanValeroContent />
      </div>
      <Footer />
    </main>
  );
}
