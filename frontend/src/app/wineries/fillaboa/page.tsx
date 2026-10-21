import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import FillaboaContent from './FillaboaContent';

export const metadata: Metadata = {
  title: 'Fillaboa | The Bottle Club & Vivino',
  description: 'Explore Bodegas Fillaboa wines from Salvatierra de Miño, Rías Baixas, Spain. Singular estate Albariño wines, Grandes Pagos de España member, and sustainable Atlantic viticulture.',
};

export default function FillaboaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <FillaboaContent />
      </div>
      <Footer />
    </main>
  );
}
