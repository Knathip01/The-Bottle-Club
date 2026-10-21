import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PodereLaPaceContent from './PodereLaPaceContent';

export const metadata: Metadata = {
  title: 'Podere La Pace Winery | The Bottle Club & Vivino',
  description: 'Explore Podere La Pace in Massa Marittima, Costa Toscana, Italy. Certified organic & regenerative viticulture, modern winery architecture, and fine Tuscan wines.',
};

export default function PodereLaPacePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <PodereLaPaceContent />
      </div>
      <Footer />
    </main>
  );
}
