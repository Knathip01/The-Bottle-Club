import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CosDEstournelWineryContent from './CosDEstournelWineryContent';

export const metadata: Metadata = {
  title: "Cos d'Estournel | The Bottle Club & Vivino",
  description: "Discover Cos d'Estournel, its history, terroir, and innovations in winemaking in Saint-Estèphe.",
};

export default function CosDEstournelWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><CosDEstournelWineryContent /></div>
      <Footer />
    </main>
  );
}
