import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TenutaPolvaroContent from './TenutaPolvaroContent';

export const metadata: Metadata = {
  title: 'Tenuta Polvaro Winery | The Bottle Club & Vivino',
  description: 'Explore Tenuta Polvaro in Veneto, Italy. Sustainable Venetian fine wines, Guyot cultivation, modern cellar techniques, and Candoni De Zan Family heritage.',
};

export default function TenutaPolvaroPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TenutaPolvaroContent />
      </div>
      <Footer />
    </main>
  );
}
