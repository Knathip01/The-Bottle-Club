import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import SanMarzanoContent from './SanMarzanoContent';

export const metadata: Metadata = {
  title: 'San Marzano Winery | The Bottle Club & Vivino',
  description: 'Discover Cantine San Marzano, founded in 1962 in Puglia, famous for iconic Sessantanni Primitivo di Manduria and authentic Mediterranean wines.',
};

export default function SanMarzanoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <SanMarzanoContent />
      </div>
      <Footer />
    </main>
  );
}
