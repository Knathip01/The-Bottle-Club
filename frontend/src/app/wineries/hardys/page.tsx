import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import HardysContent from './HardysContent';

export const metadata: Metadata = {
  title: 'Hardys Winery | The Bottle Club & Vivino',
  description: 'Discover Hardys winery, founded by Thomas Hardy, and its South Australian winemaking story.',
};

export default function HardysPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><HardysContent /></div>
      <Footer />
    </main>
  );
}
