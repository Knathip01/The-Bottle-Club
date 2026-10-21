import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BodegasMarquesDeCaceresContent from './BodegasMarquesDeCaceresContent';

export const metadata: Metadata = {
  title: 'Bodegas Marqués de Cáceres Winery | The Bottle Club & Vivino',
  description: 'Explore Bodegas Marqués de Cáceres in Rioja Alta, Spain. Founded in 1970 by Enrique Forner, crafting world-class Rioja, Rueda, and Ribera del Duero wines.',
};

export default function BodegasMarquesDeCaceresPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <BodegasMarquesDeCaceresContent />
      </div>
      <Footer />
    </main>
  );
}
