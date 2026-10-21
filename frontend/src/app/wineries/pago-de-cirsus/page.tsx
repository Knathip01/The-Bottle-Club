import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PagoDeCirsusContent from './PagoDeCirsusContent';

export const metadata: Metadata = {
  title: 'Pago de Cirsus Winery | The Bottle Club & Vivino',
  description: 'Explore Pago de Cirsus winery in Navarra, Spain. Single-estate wines crafted with passion by Jean-Marc Sauboua.',
};

export default function PagoDeCirsusPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <PagoDeCirsusContent />
      </div>
      <Footer />
    </main>
  );
}
