import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LaPruinaContent from './LaPruinaContent';

export const metadata: Metadata = {
  title: 'La Pruina Winery | The Bottle Club & Vivino',
  description: 'Explore La Pruina in Torre Santa Susanna, Salento, Puglia, Italy, celebrated for Primitivo di Manduria, Negroamaro, and artisanal Apulian viticulture.',
};

export default function LaPruinaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <LaPruinaContent />
      </div>
      <Footer />
    </main>
  );
}
