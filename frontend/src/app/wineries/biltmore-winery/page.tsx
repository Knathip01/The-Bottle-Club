import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import BiltmoreWineryContent from './BiltmoreWineryContent';

export const metadata: Metadata = {
  title: 'Biltmore Winery | The Bottle Club & Vivino',
  description: 'Biltmore Winery in North Carolina reflects the legacy of George Vanderbilt, handcrafting award-winning wines from estate and partner vineyards.',
};

export default function BiltmoreWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <BiltmoreWineryContent />
      </div>
      <Footer />
    </main>
  );
}
