import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import FamilleLorgerilWineryContent from './FamilleLorgerilWineryContent';

export const metadata: Metadata = {
  title: 'Famille de Lorgeril | The Bottle Club & Vivino',
  description: 'Discover Famille de Lorgeril wines, shaped by the diverse high-altitude terroirs of the Languedoc.',
};

export default function FamilleLorgerilWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><FamilleLorgerilWineryContent /></div>
      <Footer />
    </main>
  );
}
