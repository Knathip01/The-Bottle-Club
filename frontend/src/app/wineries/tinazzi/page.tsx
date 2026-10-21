import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TinazziContent from './TinazziContent';

export const metadata: Metadata = {
  title: 'Tinazzi Winery | The Bottle Club & Vivino',
  description: 'Discover Cantine Tinazzi, a historic family-run producer in Veneto and Puglia, celebrated for Amarone della Valpolicella and authentic Italian wine experiences.',
};

export default function TinazziPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TinazziContent />
      </div>
      <Footer />
    </main>
  );
}
