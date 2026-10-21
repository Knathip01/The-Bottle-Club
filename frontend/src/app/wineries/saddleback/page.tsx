import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import SaddlebackContent from './SaddlebackContent';

export const metadata: Metadata = {
  title: 'Saddleback | The Bottle Club & Vivino',
  description: 'Historic Oakville estate founded in 1978 by legendary pioneer Nils Venge, creator of America’s first 100-point wine.',
};

export default function SaddlebackPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <SaddlebackContent />
      </div>
      <Footer />
    </main>
  );
}
