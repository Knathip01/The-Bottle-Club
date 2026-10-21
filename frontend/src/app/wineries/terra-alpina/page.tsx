import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TerraAlpinaContent from './TerraAlpinaContent';

export const metadata: Metadata = {
  title: 'Terra Alpina Winery | The Bottle Club & Vivino',
  description: 'Explore Terra Alpina by Alois Lageder in Vigneti delle Dolomiti, Italy, certified organic Alpine wines from the Dolomites.',
};

export default function TerraAlpinaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TerraAlpinaContent />
      </div>
      <Footer />
    </main>
  );
}
