import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import NomineRenardWineryContent from './NomineRenardWineryContent';

export const metadata: Metadata = {
  title: 'Nominé-Renard | The Bottle Club & Vivino',
  description: 'Discover Nominé-Renard, a family-owned grower Champagne house.',
};

export default function NomineRenardWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><NomineRenardWineryContent /></div>
      <Footer />
    </main>
  );
}
