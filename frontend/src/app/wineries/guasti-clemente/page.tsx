import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import GuastiClementeContent from './GuastiClementeContent';

export const metadata: Metadata = {
  title: 'Guasti Clemente Winery | The Bottle Club & Vivino',
  description: 'Explore Guasti Clemente in Nizza Monferrato, Piedmont, Italy, pioneer of single-vineyard Barbera, historic cellars, and artisanal Piedmont wines.',
};

export default function GuastiClementePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <GuastiClementeContent />
      </div>
      <Footer />
    </main>
  );
}
