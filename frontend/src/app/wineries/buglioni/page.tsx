import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BuglioniContent from './BuglioniContent';

export const metadata: Metadata = {
  title: 'Buglioni Winery | The Bottle Club & Vivino',
  description: 'Explore Buglioni in Valpolicella Classica, founded by Alfredo and Mariano Buglioni with winemaker Diego Bertoni.',
};

export default function BuglioniPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <BuglioniContent />
      </div>
      <Footer />
    </main>
  );
}
