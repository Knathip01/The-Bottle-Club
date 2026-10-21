import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import GrantBurgeContent from './GrantBurgeContent';

export const metadata: Metadata = {
  title: 'Grant Burge Wines Winery | The Bottle Club & Vivino',
  description: 'Discover Grant Burge Wines and five generations of Barossa Valley winemaking.',
};

export default function GrantBurgePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><GrantBurgeContent /></div>
      <Footer />
    </main>
  );
}
