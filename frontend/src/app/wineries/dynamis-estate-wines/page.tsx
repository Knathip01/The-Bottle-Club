import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import DynamisContent from './DynamisContent';

export const metadata: Metadata = {
  title: 'Dynamis Estate Wines | The Bottle Club & Vivino',
  description: 'Perched at 1,640 feet in the Swan Creek of North Carolina, Dynamis Estate Wines is a mountain winery crafting structured Bordeaux-style estate wines.',
};

export default function DynamisEstateWinesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <DynamisContent />
      </div>
      <Footer />
    </main>
  );
}
