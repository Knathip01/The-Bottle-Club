import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ZoninContent from './ZoninContent';

export const metadata: Metadata = {
  title: 'Zonin Winery | The Bottle Club & Vivino',
  description: 'Explore Zonin, founded in 1821 in Veneto, internationally celebrated for Prosecco DOC, prestigious Italian still wines, and sparkling lifestyle innovations.',
};

export default function ZoninPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <ZoninContent />
      </div>
      <Footer />
    </main>
  );
}
