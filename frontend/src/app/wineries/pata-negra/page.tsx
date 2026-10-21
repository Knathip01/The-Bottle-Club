import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PataNegraContent from './PataNegraContent';

export const metadata: Metadata = {
  title: 'Pata Negra Winery | The Bottle Club & Vivino',
  description: 'Explore Pata Negra wines by García Carrión. Discover the Fauna collection celebrating Rioja, Toro, Rueda, and La Mancha.',
};

export default function PataNegraPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <PataNegraContent />
      </div>
      <Footer />
    </main>
  );
}
