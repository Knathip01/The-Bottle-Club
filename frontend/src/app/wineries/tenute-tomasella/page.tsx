import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TenuteTomasellaContent from './TenuteTomasellaContent';

export const metadata: Metadata = {
  title: 'Tenute Tomasella Winery | The Bottle Club & Vivino',
  description: 'Explore Tenute Tomasella located in Mansuè, Veneto & Friuli, Italy. Fine sparkling and still wines produced with deep respect for nature and tradition.',
};

export default function TenuteTomasellaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TenuteTomasellaContent />
      </div>
      <Footer />
    </main>
  );
}
