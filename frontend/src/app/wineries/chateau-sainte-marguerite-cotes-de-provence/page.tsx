import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import SainteMargueriteWineryContent from './SainteMargueriteWineryContent';

export const metadata: Metadata = {
  title: 'Château Sainte Marguerite | The Bottle Club & Vivino',
  description: 'Discover Château Sainte Marguerite, a Cru Classé Côtes de Provence estate crafting organic wines.',
};

export default function SainteMargueriteWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><SainteMargueriteWineryContent /></div>
      <Footer />
    </main>
  );
}
