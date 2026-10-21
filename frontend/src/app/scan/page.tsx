import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import WineScannerView from '@/components/scanner/WineScannerView';

export const metadata: Metadata = {
  title: 'AI Wine Scanner | The Bottle Club',
  description: 'สแกนขวดไวน์แท้ด้วยเทคโนโลยี AI พร้อมตรวจสอบแหล่งผลิตและข้อมูลโรงไวน์พันธมิตรจาก The Bottle Club',
};

export default function WineScanPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#090704]">
      <MainHeader />
      <div className="flex-grow flex items-center justify-center py-6 px-2 sm:px-4">
        <WineScannerView />
      </div>
      <Footer />
    </main>
  );
}
