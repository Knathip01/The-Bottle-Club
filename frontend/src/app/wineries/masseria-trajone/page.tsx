import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MasseriaTrajoneContent from './MasseriaTrajoneContent';

export const metadata: Metadata = {
  title: 'Masseria Trajone Winery | The Bottle Club & Vivino',
  description: 'Discover Masseria Trajone, celebrated collection of Apulian wines owned by I Viticoltori Felice e Armando Mergè.',
};

export default function MasseriaTrajonePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <MasseriaTrajoneContent />
      </div>
      <Footer />
    </main>
  );
}
