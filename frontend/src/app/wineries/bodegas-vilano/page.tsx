import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BodegasVilanoContent from './BodegasVilanoContent';

export const metadata: Metadata = {
  title: 'Bodegas Vilano Winery | The Bottle Club & Vivino',
  description: 'Explore Bodegas Vilano in Ribera del Duero, Castilla y León, Spain. Founded as a cooperative in 1957, crafting exceptional wines.',
};

export default function BodegasVilanoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <BodegasVilanoContent />
      </div>
      <Footer />
    </main>
  );
}
