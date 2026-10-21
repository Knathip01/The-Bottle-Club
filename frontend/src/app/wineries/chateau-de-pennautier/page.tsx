import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PennautierWineryContent from './PennautierWineryContent';

export const metadata: Metadata = {
  title: 'Château de Pennautier | The Bottle Club & Vivino',
  description: 'Discover Château de Pennautier, historic home of Maison Lorgeril and its organic Cabardès wines.',
};

export default function PennautierWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><PennautierWineryContent /></div>
      <Footer />
    </main>
  );
}
