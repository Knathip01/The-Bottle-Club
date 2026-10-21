import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MonterusticoContent from './MonterusticoContent';

export const metadata: Metadata = {
  title: 'Monterustico Winery | The Bottle Club & Vivino',
  description: 'Explore Monterustico by G.D. Vajra in Farigliano, Piedmont, Italy, rediscovering native Langhe grapes and organic artisanal viticulture.',
};

export default function MonterusticoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <MonterusticoContent />
      </div>
      <Footer />
    </main>
  );
}
