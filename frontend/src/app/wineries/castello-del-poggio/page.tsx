import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CastelloDelPoggioContent from './CastelloDelPoggioContent';

export const metadata: Metadata = {
  title: 'Castello del Poggio Winery | The Bottle Club & Vivino',
  description: 'Experience La Dolce Vita with Castello del Poggio in Asti, Piedmont, celebrated sweet and sparkling Italian wines owned by Zonin1821.',
};

export default function CastelloDelPoggioPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CastelloDelPoggioContent />
      </div>
      <Footer />
    </main>
  );
}
