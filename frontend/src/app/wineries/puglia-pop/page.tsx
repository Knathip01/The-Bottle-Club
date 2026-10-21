import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PugliaPopContent from './PugliaPopContent';

export const metadata: Metadata = {
  title: 'Puglia Pop Winery | The Bottle Club & Vivino',
  description: 'Explore Puglia Pop wines from Martina Franca, Puglia, Italy. Pop art inspired signature bottles, Primitivo di Manduria, Susumaniello, and Mediterranean spirit.',
};

export default function PugliaPopPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <PugliaPopContent />
      </div>
      <Footer />
    </main>
  );
}
