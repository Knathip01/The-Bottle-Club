import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CastilloSanSimonContent from './CastilloSanSimonContent';

export const metadata: Metadata = {
  title: 'Castillo San Simon | The Bottle Club & Vivino',
  description: 'Explore Castillo San Simon wines from Jumilla, Murcia, Spain. Discover approachable Monastrell reds, refreshing whites, and García Carrión family winemaking heritage.',
};

export default function CastilloSanSimonPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CastilloSanSimonContent />
      </div>
      <Footer />
    </main>
  );
}
