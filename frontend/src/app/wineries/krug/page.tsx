import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import KrugWineryContent from './KrugWineryContent';

export const metadata: Metadata = {
  title: 'Krug | The Bottle Club & Vivino',
  description: 'Discover Maison Krug, its Champagne-making philosophy, and the story behind Krug Grande Cuvée.',
};

export default function KrugWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><KrugWineryContent /></div>
      <Footer />
    </main>
  );
}
