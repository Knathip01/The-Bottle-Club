import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WineryOnCreationsContent from './WineryOnCreationsContent';

export const metadata: Metadata = {
  title: 'Winery On Creations | The Bottle Club & Vivino',
  description: 'Explore Winery On Creations and the DEMUERTE wine collection from Yecla, Spain. High-altitude old-vine Monastrell with artistic skull label designs.',
};

export default function WineryOnCreationsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <WineryOnCreationsContent />
      </div>
      <Footer />
    </main>
  );
}
