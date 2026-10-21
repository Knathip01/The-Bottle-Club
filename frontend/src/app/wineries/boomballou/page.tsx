import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BoomballouContent from './BoomballouContent';

export const metadata: Metadata = {
  title: 'Boomballou Winery | The Bottle Club & Vivino',
  description: 'Discover Boomballou Vine Dried Shiraz from a distinctive Riverland vineyard on the Murray River.',
};

export default function BoomballouPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><BoomballouContent /></div>
      <Footer />
    </main>
  );
}
