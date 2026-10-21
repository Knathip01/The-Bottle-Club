import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AttisContent from './AttisContent';

export const metadata: Metadata = {
  title: 'Attis Winery | The Bottle Club & Vivino',
  description: 'Explore Attis winery in Rías Baixas, Spain. Discover Atlantic wines crafted with artisanal care, including underwater-aged Albariño ATTIS Mar.',
};

export default function AttisPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <AttisContent />
      </div>
      <Footer />
    </main>
  );
}
