import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import OZVContent from './OZVContent';

export const metadata: Metadata = {
  title: 'OZV | The Bottle Club & Vivino',
  description: 'Crafted from our oldest Zinfandel vines with an average age of fifty years, OZV wines exude the unique character of the Lodi terroir.',
};

export default function OZVPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <OZVContent />
      </div>
      <Footer />
    </main>
  );
}
