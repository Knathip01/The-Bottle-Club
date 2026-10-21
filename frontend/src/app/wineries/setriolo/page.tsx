import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import SetrioloContent from './SetrioloContent';

export const metadata: Metadata = {
  title: 'Setriolo Winery & Agriturismo | The Bottle Club & Vivino',
  description: 'Explore Setriolo in Castellina in Chianti, Tuscany, Italy. Small family-run organic Chianti Classico producer and agriturismo.',
};

export default function SetrioloPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <SetrioloContent />
      </div>
      <Footer />
    </main>
  );
}
