import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import FilodivinoContent from './FilodivinoContent';

export const metadata: Metadata = {
  title: 'Filodivino Winery & Wine Resort | The Bottle Club & Vivino',
  description: "Explore Filodivino in San Marcello, Marche, Italy. Certified organic Verdicchio dei Castelli di Jesi, Lacrima di Morro d'Alba, and luxury Wine Resort.",
};

export default function FilodivinoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <FilodivinoContent />
      </div>
      <Footer />
    </main>
  );
}
