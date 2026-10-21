import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PagoDeTharsysContent from './PagoDeTharsysContent';

export const metadata: Metadata = {
  title: 'Pago de Tharsys | The Bottle Club & Vivino',
  description: 'Explore Pago de Tharsys wines and Cavas from Requena, Valencia, Spain. Acclaimed organic Valencian Cava, DOP Tharsys night-harvested wines, and historic cellar heritage.',
};

export default function PagoDeTharsysPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <PagoDeTharsysContent />
      </div>
      <Footer />
    </main>
  );
}
