import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import StellaRosaContent from './StellaRosaContent';

export const metadata: Metadata = {
  title: 'Stella Rosa Winery | The Bottle Club & Vivino',
  description: 'Discover Stella Rosa, crafted in Asti, Piedmont by the Riboli Family. America’s favorite semi-sweet, semi-sparkling Italian wines.',
};

export default function StellaRosaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <StellaRosaContent />
      </div>
      <Footer />
    </main>
  );
}
