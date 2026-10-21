import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import SantaMargheritaContent from './SantaMargheritaContent';

export const metadata: Metadata = {
  title: 'Santa Margherita Winery | The Bottle Club & Vivino',
  description: 'Explore Santa Margherita, iconic Italian winery founded in 1935 in Veneto, world-renowned pioneer of Pinot Grigio and premium Prosecco.',
};

export default function SantaMargheritaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <SantaMargheritaContent />
      </div>
      <Footer />
    </main>
  );
}
