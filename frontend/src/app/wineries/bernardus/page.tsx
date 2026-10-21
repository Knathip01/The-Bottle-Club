import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BernardusContent from './BernardusContent';

export const metadata: Metadata = {
  title: 'Bernardus | The Bottle Club & Vivino',
  description: 'Bernardus Winery in Carmel Valley crafts artfully produced wines, including acclaimed Santa Lucia Highlands Pinot Noir and Monterey Chardonnay.',
};

export default function BernardusPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <BernardusContent />
      </div>
      <Footer />
    </main>
  );
}
