import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LevitationContent from './LevitationContent';

export const metadata: Metadata = {
  title: 'Levitation | The Bottle Club & Vivino',
  description: 'Explore Levitation wines crafted by Bodegas Villa Amalia in Spain. Discover premium Sauvignon Blanc, Tempranillo - Shiraz, Viura - Verdejo, and Mediterranean blends.',
};

export default function LevitationPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <LevitationContent />
      </div>
      <Footer />
    </main>
  );
}
