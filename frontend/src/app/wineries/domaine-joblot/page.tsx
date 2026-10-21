import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DomaineJoblotWineryContent from './DomaineJoblotWineryContent';

export const metadata: Metadata = {
  title: 'Domaine Joblot | The Bottle Club & Vivino',
  description: 'Discover Domaine Joblot, a Givry estate crafting expressive wines since 1946.',
};

export default function DomaineJoblotWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><DomaineJoblotWineryContent /></div>
      <Footer />
    </main>
  );
}
