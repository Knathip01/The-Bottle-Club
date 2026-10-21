import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import GuidoBerlucchiContent from './GuidoBerlucchiContent';

export const metadata: Metadata = {
  title: 'Guido Berlucchi Winery | The Bottle Club & Vivino',
  description: 'Discover Guido Berlucchi, the historic birthplace of Franciacorta sparkling wines in Lombardy, Italy.',
};

export default function GuidoBerlucchiPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <GuidoBerlucchiContent />
      </div>
      <Footer />
    </main>
  );
}
