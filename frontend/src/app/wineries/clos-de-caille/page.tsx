import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ClosDeCailleWineryContent from './ClosDeCailleWineryContent';

export const metadata: Metadata = {
  title: 'Clos de Caille | The Bottle Club & Vivino',
  description: 'Discover Clos de Caille, a family winery in Provence, France.',
};

export default function ClosDeCailleWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><ClosDeCailleWineryContent /></div>
      <Footer />
    </main>
  );
}
