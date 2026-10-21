import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import OrnellaiaContent from './OrnellaiaContent';

export const metadata: Metadata = {
  title: 'Ornellaia Winery | The Bottle Club & Vivino',
  description: 'Discover Tenuta dell\'Ornellaia, the legendary Bolgheri estate celebrated for Ornellaia Bolgheri Superiore, Vendemmia d\'Artista, and extraordinary Mediterranean elegance.',
};

export default function OrnellaiaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <OrnellaiaContent />
      </div>
      <Footer />
    </main>
  );
}
