import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DomaineBlegerWineryContent from './DomaineBlegerWineryContent';

export const metadata: Metadata = {
  title: 'Domaine Bleger Claude et Christophe | The Bottle Club & Vivino',
  description: 'Discover Domaine Bleger Claude et Christophe, a family winery in Alsace, France.',
};

export default function DomaineBlegerWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><DomaineBlegerWineryContent /></div>
      <Footer />
    </main>
  );
}
