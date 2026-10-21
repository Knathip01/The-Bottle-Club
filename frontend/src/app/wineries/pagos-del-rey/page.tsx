import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PagosDelReyContent from './PagosDelReyContent';

export const metadata: Metadata = {
  title: 'Pagos del Rey Winery | The Bottle Club & Vivino',
  description: 'Explore Pagos del Rey wineries across Rioja, Ribera del Duero, Rueda, Toro, and Rías Baixas. Part of the Félix Solís Avantis family.',
};

export default function PagosDelReyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <PagosDelReyContent />
      </div>
      <Footer />
    </main>
  );
}
