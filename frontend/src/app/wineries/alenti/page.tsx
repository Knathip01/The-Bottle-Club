import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AlentiWineryContent from './AlentiWineryContent';

export const metadata: Metadata = {
  title: 'Alenti | The Bottle Club & Vivino',
  description: 'Discover Alenti, a contemporary French wine project from Vin de France.',
};

export default function AlentiWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><AlentiWineryContent /></div>
      <Footer />
    </main>
  );
}
