import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import SenorioDeLosLlanosContent from './SenorioDeLosLlanosContent';

export const metadata: Metadata = {
  title: 'Señorío de Los Llanos Winery | The Bottle Club & Vivino',
  description: 'Explore Señorío de Los Llanos in Valdepeñas, Castilla, Spain. Founded in 1875, nearly 150 years of winemaking heritage.',
};

export default function SenorioDeLosLlanosPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <SenorioDeLosLlanosContent />
      </div>
      <Footer />
    </main>
  );
}
