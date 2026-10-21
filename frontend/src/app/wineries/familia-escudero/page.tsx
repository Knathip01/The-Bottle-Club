import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import FamiliaEscuderoContent from './FamiliaEscuderoContent';

export const metadata: Metadata = {
  title: 'Familia Escudero | The Bottle Club & Vivino',
  description: 'Explore Bodegas Familia Escudero wines and Cavas from Rioja, Spain. Five generations of winemaking tradition, organic vineyards, and handcrafted excellence.',
};

export default function FamiliaEscuderoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <FamiliaEscuderoContent />
      </div>
      <Footer />
    </main>
  );
}
