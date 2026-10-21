import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import EpicuroContent from './EpicuroContent';

export const metadata: Metadata = {
  title: 'Epicuro Winery | The Bottle Club & Vivino',
  description: 'Explore Epicuro by I Viticoltori Felice & Armando Mergè, crafting authentic expressions of southern Italian terroir in Puglia.',
};

export default function EpicuroPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <EpicuroContent />
      </div>
      <Footer />
    </main>
  );
}
