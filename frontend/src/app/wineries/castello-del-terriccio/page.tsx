import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CastelloDelTerriccioContent from './CastelloDelTerriccioContent';

export const metadata: Metadata = {
  title: 'Castello del Terriccio Winery | The Bottle Club & Vivino',
  description: 'Explore Castello del Terriccio in Tuscany, Italy, producer of legendary Super Tuscans including Lupicaia, Castello del Terriccio, and Tassinaia.',
};

export default function CastelloDelTerriccioPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CastelloDelTerriccioContent />
      </div>
      <Footer />
    </main>
  );
}
