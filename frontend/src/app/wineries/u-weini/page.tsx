import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import UWeiniWineryContent from './UWeiniWineryContent';

export const metadata: Metadata = {
  title: "U’Weini | The Bottle Club & Vivino",
  description: "Discover U’Weini, a French wine brand from Bordeaux.",
};

export default function UWeiniWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><UWeiniWineryContent /></div>
      <Footer />
    </main>
  );
}
