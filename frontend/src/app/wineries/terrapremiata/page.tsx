import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TerrapremiataContent from './TerrapremiataContent';

export const metadata: Metadata = {
  title: 'Terrapremiata Winery | The Bottle Club & Vivino',
  description: 'Explore Terrapremiata in Marche, Italy. A boutique winery crafting wines with balance, clarity, elegance, and deep respect for the land.',
};

export default function TerrapremiataPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TerrapremiataContent />
      </div>
      <Footer />
    </main>
  );
}
