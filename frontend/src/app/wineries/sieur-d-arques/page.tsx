import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import SieurDArquesWineryContent from './SieurDArquesWineryContent';

export const metadata: Metadata = {
  title: "Sieur d'Arques | The Bottle Club & Vivino",
  description: "Discover Sieur d'Arques, the Limoux cooperative crafting sparkling and still wines since 1946.",
};

export default function SieurDArquesWineryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><SieurDArquesWineryContent /></div>
      <Footer />
    </main>
  );
}
