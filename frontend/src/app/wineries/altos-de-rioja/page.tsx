import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AltosDeRiojaContent from './AltosDeRiojaContent';

export const metadata: Metadata = {
  title: 'Altos de Rioja | The Bottle Club & Vivino',
  description: 'Explore Altos de Rioja boutique winery from Elvillar, Rioja Alavesa, Spain. Award-winning Rioja wines crafted by Jean-Marc Sauboua.',
};

export default function AltosDeRiojaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <AltosDeRiojaContent />
      </div>
      <Footer />
    </main>
  );
}
