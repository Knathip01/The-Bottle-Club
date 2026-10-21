import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MuruaContent from './MuruaContent';

export const metadata: Metadata = {
  title: 'Murua | The Bottle Club & Vivino',
  description: 'Explore Bodegas Murua wines from Elciego, Rioja Alavesa, Spain. Discover old-vine Tempranillo reds, barrel-fermented whites, and Masaveu family winemaking excellence.',
};

export default function MuruaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <MuruaContent />
      </div>
      <Footer />
    </main>
  );
}
