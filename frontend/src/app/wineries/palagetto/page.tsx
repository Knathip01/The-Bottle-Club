import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import PalagettoContent from './PalagettoContent';

export const metadata: Metadata = {
  title: 'Palagetto Winery | The Bottle Club & Vivino',
  description: 'Explore Palagetto in San Gimignano, Chianti, famous for Vernaccia di San Gimignano, noble reds, and artisanal extra virgin olive oil.',
};

export default function PalagettoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <PalagettoContent />
      </div>
      <Footer />
    </main>
  );
}
