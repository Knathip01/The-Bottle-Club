import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import FlavabomContent from './FlavabomContent';

export const metadata: Metadata = {
  title: 'Flavabom Winery | The Bottle Club & Vivino',
  description: 'Discover Flavabom wines, estate-grown in the Riverland by family-owned Byrne Vineyards.',
};

export default function FlavabomPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><FlavabomContent /></div>
      <Footer />
    </main>
  );
}
