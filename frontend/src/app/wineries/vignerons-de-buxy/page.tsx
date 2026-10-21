import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import VigneronsDeBuxyWineryContent from './VigneronsDeBuxyWineryContent';

export const metadata: Metadata = {
  title: 'Vignerons de Buxy | The Bottle Club & Vivino',
  description: 'Discover Vignerons de Buxy, the cooperative promoting the Côte Chalonnaise region since 1931.',
};

export default function VigneronsDeBuxyWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><VigneronsDeBuxyWineryContent /></div>
      <Footer />
    </main>
  );
}
