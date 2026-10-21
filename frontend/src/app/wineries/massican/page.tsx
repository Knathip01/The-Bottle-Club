import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MassicanContent from './MassicanContent';

export const metadata: Metadata = {
  title: 'Massican | The Bottle Club & Vivino',
  description: 'Napa Valley’s only white wine winery. Handcrafted Mediterranean-style wines by Dan Petroski from native Italian varietals.',
};

export default function MassicanPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <MassicanContent />
      </div>
      <Footer />
    </main>
  );
}
