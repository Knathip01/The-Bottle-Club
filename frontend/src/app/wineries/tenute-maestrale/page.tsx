import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TenuteMaestraleContent from './TenuteMaestraleContent';

export const metadata: Metadata = {
  title: 'Tenute Maestrale Winery | The Bottle Club & Vivino',
  description: 'Explore Tenute Maestrale in Isola dei Nuraghi, Italy. Discover fragrant Vermentino and authentic Sardinian wines.',
};

export default function TenuteMaestralePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TenuteMaestraleContent />
      </div>
      <Footer />
    </main>
  );
}
