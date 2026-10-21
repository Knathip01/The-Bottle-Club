import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CaBolaniContent from './CaBolaniContent';

export const metadata: Metadata = {
  title: "Ca' Bolani Winery | The Bottle Club & Vivino",
  description: "Explore Ca' Bolani in Friuli-Venezia Giulia, Italy, famous for over 570 hectares of pristine vineyards, Prosecco, and elegant Friulian wines.",
};

export default function CaBolaniPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CaBolaniContent />
      </div>
      <Footer />
    </main>
  );
}
