import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ValencisoContent from './ValencisoContent';

export const metadata: Metadata = {
  title: 'VALENCISO Winery | The Bottle Club & Vivino',
  description: 'Explore VALENCISO winery in Ollauri, Rioja, Spain. Discover boutique Tempranillo wines crafted with minimal intervention and concrete fermentation.',
};

export default function ValencisoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <ValencisoContent />
      </div>
      <Footer />
    </main>
  );
}
