import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MayorDeCastillaContent from './MayorDeCastillaContent';

export const metadata: Metadata = {
  title: 'Mayor de Castilla Winery | The Bottle Club & Vivino',
  description: 'Explore Mayor de Castilla winery in Castilla y León, Spain. Discover expressive Tempranillo and fresh Verdejo across Ribera del Duero, Rueda, and Toro.',
};

export default function MayorDeCastillaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <MayorDeCastillaContent />
      </div>
      <Footer />
    </main>
  );
}
