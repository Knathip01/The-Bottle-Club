import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PiusContent from './PiusContent';

export const metadata: Metadata = {
  title: 'Pius Estates | The Bottle Club & Vivino',
  description: 'Pius Estates: Limited, estate-grown wines crafted with elegance and intention from organically farmed vineyards in Paso Robles, California.',
};

export default function PiusEstatesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <PiusContent />
      </div>
      <Footer />
    </main>
  );
}
