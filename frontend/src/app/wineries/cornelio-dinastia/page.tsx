import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CornelioDinastiaContent from './CornelioDinastiaContent';

export const metadata: Metadata = {
  title: 'Cornelio Dinastía | The Bottle Club & Vivino',
  description: 'Explore Bodegas Cornelio Dinastía organic wines from Rioja, Spain. Discover Vega Vella and Cornelio premium Reserva, Crianza, and organic white wines.',
};

export default function CornelioDinastiaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CornelioDinastiaContent />
      </div>
      <Footer />
    </main>
  );
}
