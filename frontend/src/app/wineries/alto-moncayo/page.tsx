import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AltoMoncayoContent from './AltoMoncayoContent';

export const metadata: Metadata = {
  title: 'Alto Moncayo Winery | The Bottle Club & Vivino',
  description: 'Explore Bodegas Alto Moncayo in Campo de Borja, Spain. Bottling the highest quality wines made from old Garnachas.',
};

export default function AltoMoncayoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <AltoMoncayoContent />
      </div>
      <Footer />
    </main>
  );
}
