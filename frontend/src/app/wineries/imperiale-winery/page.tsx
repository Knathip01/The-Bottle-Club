import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ImperialeWineryContent from './ImperialeWineryContent';

export const metadata: Metadata = {
  title: 'Imperiale Winery | The Bottle Club & Vivino',
  description: 'Explore Imperiale Winery in Veneto, Italy. Discover artisan Italian wines born from a passion for quality, tradition, and conquest ("Veni, vidi, vici").',
};

export default function ImperialeWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <ImperialeWineryContent />
      </div>
      <Footer />
    </main>
  );
}
