import { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WineScannerComponent from '@/components/WineScannerComponent';

export const metadata: Metadata = {
  title: 'AI Wine Scanner | The Bottle Club',
  description: 'Scan authentic wine bottles with AI, explore winery origin and tasting notes.',
};

export default function ScanPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0c0905] text-white">
      <MainHeader />
      <div className="flex-grow flex items-center justify-center p-3 sm:p-6">
        <WineScannerComponent isStandalonePage />
      </div>
      <Footer />
    </main>
  );
}
