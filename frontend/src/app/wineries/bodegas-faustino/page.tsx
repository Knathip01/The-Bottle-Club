import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BodegasFaustinoContent from './BodegasFaustinoContent';

export const metadata: Metadata = {
  title: 'Bodegas Faustino Winery | The Bottle Club & Vivino',
  description: 'Explore Bodegas Faustino in Rioja Alavesa, Spain. European Winery of the Year 2025, makers of Faustino I Gran Reserva, with over 160 years of history.',
};

export default function BodegasFaustinoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <BodegasFaustinoContent />
      </div>
      <Footer />
    </main>
  );
}
