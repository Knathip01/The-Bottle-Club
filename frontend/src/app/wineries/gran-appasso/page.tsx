import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import GranAppassoContent from './GranAppassoContent';

export const metadata: Metadata = {
  title: 'Gran Appasso Winery | The Bottle Club & Vivino',
  description: 'Discover Gran Appasso, celebrated collection of appassimento wines from Puglia by I Viticoltori Felice e Armando Mergè.',
};

export default function GranAppassoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <GranAppassoContent />
      </div>
      <Footer />
    </main>
  );
}
