import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import NewtonContent from './NewtonContent';

export const metadata: Metadata = {
  title: 'Newton | The Bottle Club & Vivino',
  description: 'Newton Vineyard was founded in 1977 by English businessman Peter Newton. Renowned for pioneering Unfiltered Chardonnay and expressive mountain terroir in Napa Valley.',
};

export default function NewtonPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <NewtonContent />
      </div>
      <Footer />
    </main>
  );
}
