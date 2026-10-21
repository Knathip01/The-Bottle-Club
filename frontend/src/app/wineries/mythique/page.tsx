import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MythiqueWineryContent from './MythiqueWineryContent';

export const metadata: Metadata = {
  title: 'Mythique | The Bottle Club & Vivino',
  description: 'Discover Mythique, a pioneering wine from Occitanie shaped by the terroirs and traditions of Languedoc.',
};

export default function MythiqueWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><MythiqueWineryContent /></div>
      <Footer />
    </main>
  );
}
