import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DomaineSainteMarieWineryContent from './DomaineSainteMarieWineryContent';

export const metadata: Metadata = {
  title: 'Domaine Sainte Marie | The Bottle Club & Vivino',
  description: 'Discover Domaine Sainte Marie in Provence, France.',
};

export default function DomaineSainteMarieWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><DomaineSainteMarieWineryContent /></div>
      <Footer />
    </main>
  );
}
