import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import XavierVignonWineryContent from './XavierVignonWineryContent';

export const metadata: Metadata = {
  title: 'Xavier Vignon | The Bottle Club & Vivino',
  description: 'Discover Xavier Vignon and his Rhône wines, crafted with expertise in vine-growing, blending, and ageing.',
};

export default function XavierVignonWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><XavierVignonWineryContent /></div>
      <Footer />
    </main>
  );
}
