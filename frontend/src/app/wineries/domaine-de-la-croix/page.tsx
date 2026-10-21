import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DomaineCroixWineryContent from './DomaineCroixWineryContent';

export const metadata: Metadata = {
  title: 'Domaine de la Croix | The Bottle Club & Vivino',
  description: 'Discover Domaine de la Croix, a Cru Classé estate in Côtes de Provence.',
};

export default function DomaineCroixWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><DomaineCroixWineryContent /></div>
      <Footer />
    </main>
  );
}
