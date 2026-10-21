import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import FiguiereWineryContent from './FiguiereWineryContent';

export const metadata: Metadata = {
  title: 'Figuière, Famille Combard | The Bottle Club & Vivino',
  description: 'Discover Figuière, a family winery crafting organic wines in Provence.',
};

export default function FiguiereWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><FiguiereWineryContent /></div>
      <Footer />
    </main>
  );
}
