import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import JacobsCreekContent from './JacobsCreekContent';

export const metadata: Metadata = {
  title: "Jacob's Creek Winery | The Bottle Club & Vivino",
  description: "Discover Jacob's Creek winery, its Barossa roots, winemakers, growers and vineyards across South Australia.",
};

export default function JacobsCreekPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><JacobsCreekContent /></div>
      <Footer />
    </main>
  );
}
