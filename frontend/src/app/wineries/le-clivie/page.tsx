import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LeClivieContent from './LeClivieContent';

export const metadata: Metadata = {
  title: 'Le Clivie Winery | The Bottle Club & Vivino',
  description: 'Explore Le Clivie by Dacastello Vini in Piedmont, Italy. Prestigious Italian wines representing excellence, unique terroir, and refined dining experiences.',
};

export default function LeCliviePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <LeClivieContent />
      </div>
      <Footer />
    </main>
  );
}
