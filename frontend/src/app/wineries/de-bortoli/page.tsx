import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DeBortoliContent from './DeBortoliContent';

export const metadata: Metadata = {
  title: 'De Bortoli Winery | The Bottle Club & Vivino',
  description: 'Explore De Bortoli Wines, its family heritage, winery locations and sustainability journey.',
};

export default function DeBortoliPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><DeBortoliContent /></div>
      <Footer />
    </main>
  );
}
