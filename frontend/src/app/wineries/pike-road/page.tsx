import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PikeRoadContent from './PikeRoadContent';

export const metadata: Metadata = {
  title: 'Pike Road | The Bottle Club & Vivino',
  description: 'Pike Road crafts affordable, expressive Pinot Noir, Pinot Gris, and Chardonnay wines reflecting the best of Oregon’s northern Willamette Valley.',
};

export default function PikeRoadPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <PikeRoadContent />
      </div>
      <Footer />
    </main>
  );
}
