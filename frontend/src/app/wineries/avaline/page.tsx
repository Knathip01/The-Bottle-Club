import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AvalineWineryContent from './AvalineWineryContent';

export const metadata: Metadata = {
  title: 'Avaline | The Bottle Club & Vivino',
  description: 'Discover Avaline wines from France.',
};

export default function AvalineWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><AvalineWineryContent /></div>
      <Footer />
    </main>
  );
}
