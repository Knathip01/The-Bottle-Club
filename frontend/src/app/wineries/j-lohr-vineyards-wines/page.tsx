import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import JLohrVineyardsWinesContent from './JLohrVineyardsWinesContent';

export const metadata: Metadata = {
  title: 'J. Lohr Vineyards & Wines | The Bottle Club & Vivino',
  description: 'Family-owned and sustainably grown, J. Lohr is trusted by everyday wine lovers and connoisseurs alike. Taste the quality behind one of California’s most-awarded wineries.',
};

export default function JLohrVineyardsWinesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <JLohrVineyardsWinesContent />
      </div>
      <Footer />
    </main>
  );
}
