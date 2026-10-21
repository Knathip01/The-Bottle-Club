import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import VillaSandiContent from './VillaSandiContent';

export const metadata: Metadata = {
  title: 'Villa Sandi Winery | The Bottle Club & Vivino',
  description: 'Explore Villa Sandi, a Palladian-style Venetian villa dating back to 1622 in Treviso, renowned for Prosecco Superiore DOCG.',
};

export default function VillaSandiPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <VillaSandiContent />
      </div>
      <Footer />
    </main>
  );
}
