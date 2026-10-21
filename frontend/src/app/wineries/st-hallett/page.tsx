import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import StHallettContent from './StHallettContent';

export const metadata: Metadata = {
  title: 'St Hallett Winery | The Bottle Club & Vivino',
  description: 'Discover St Hallett, a Barossa winery with a long history and a focus on Shiraz.',
};

export default function StHallettPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><StHallettContent /></div>
      <Footer />
    </main>
  );
}
