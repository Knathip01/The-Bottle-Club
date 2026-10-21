import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TorreBisenzioContent from './TorreBisenzioContent';

export const metadata: Metadata = {
  title: 'Torre Bisenzio Winery | The Bottle Club & Vivino',
  description: 'Explore Torre Bisenzio in Umbria, Italy. Contemporary organic viticulture in the Umbrian hills blending tradition, quality, and innovation.',
};

export default function TorreBisenzioPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TorreBisenzioContent />
      </div>
      <Footer />
    </main>
  );
}
