import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BeringerContent from './BeringerContent';

export const metadata: Metadata = {
  title: 'Beringer | The Bottle Club & Vivino',
  description: 'Explore Beringer Vineyards in St. Helena, Napa Valley. Founded in 1876, crafting legendary Cabernet Sauvignon and Chardonnay with 145+ years of heritage.',
};

export default function BeringerPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <BeringerContent />
      </div>
      <Footer />
    </main>
  );
}
