import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import MascaDelTaccoContent from './MascaDelTaccoContent';

export const metadata: Metadata = {
  title: 'Masca del Tacco Winery | The Bottle Club & Vivino',
  description: 'Explore Masca del Tacco in Apulia, Italy, celebrated for Primitivo Old Vines, Susumaniello, and the award-winning Anniversario Cuvée.',
};

export default function MascaDelTaccoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <MascaDelTaccoContent />
      </div>
      <Footer />
    </main>
  );
}
