import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import RivaDeLaRosaContent from './RivaDeLaRosaContent';

export const metadata: Metadata = {
  title: 'Riva de la Rosa Winery | The Bottle Club & Vivino',
  description: 'Explore Riva de la Rosa in Verdicchio di Matelica, Italy. Classic, crisp Italian coastal white wines born where roses grow beside the vines.',
};

export default function RivaDeLaRosaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <RivaDeLaRosaContent />
      </div>
      <Footer />
    </main>
  );
}
