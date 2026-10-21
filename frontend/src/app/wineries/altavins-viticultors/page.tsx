import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AltavinsViticultorsContent from './AltavinsViticultorsContent';

export const metadata: Metadata = {
  title: 'Altavins Viticultors Winery | The Bottle Club & Vivino',
  description: 'Explore Altavins Viticultors winery in Batea, Terra Alta, Spain. Discover boutique wines crafted with Mediterranean soul by Joan Arrufí.',
};

export default function AltavinsViticultorsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <AltavinsViticultorsContent />
      </div>
      <Footer />
    </main>
  );
}
