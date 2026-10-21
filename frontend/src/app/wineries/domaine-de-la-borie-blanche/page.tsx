import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DomaineBorieBlancheWineryContent from './DomaineBorieBlancheWineryContent';

export const metadata: Metadata = {
  title: 'Domaine de la Borie Blanche | The Bottle Club & Vivino',
  description: 'Discover Domaine de la Borie Blanche in Minervois La Livinière, France.',
};

export default function DomaineBorieBlancheWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><DomaineBorieBlancheWineryContent /></div>
      <Footer />
    </main>
  );
}
