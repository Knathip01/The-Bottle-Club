import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BodegasMugaContent from './BodegasMugaContent';

export const metadata: Metadata = {
  title: 'Bodegas Muga Winery | The Bottle Club & Vivino',
  description: 'Explore Bodegas Muga in Rioja, Spain. World’s Best Vineyards #23, family heritage, handcrafted oak cooperage, and legendary Rioja wines.',
};

export default function BodegasMugaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <BodegasMugaContent />
      </div>
      <Footer />
    </main>
  );
}
