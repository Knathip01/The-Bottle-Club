import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CampoViejoContent from './CampoViejoContent';

export const metadata: Metadata = {
  title: 'Campo Viejo Winery | The Bottle Club & Vivino',
  description: 'Explore Campo Viejo in Rioja, Spain. Vibrant, expressive Rioja wines balancing tradition, cutting-edge architecture, and sustainable viticulture.',
};

export default function CampoViejoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CampoViejoContent />
      </div>
      <Footer />
    </main>
  );
}
