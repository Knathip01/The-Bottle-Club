import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import LaUnicaContent from './LaUnicaContent';

export const metadata: Metadata = {
  title: 'La Unica | The Bottle Club & Vivino',
  description: 'Explore La Única limited-edition wines crafted by Félix Solís and Pagos del Rey in collaboration with artist Mariano Rinaldi Goñi. Discover unique barrel-aged Tempranillo blends.',
};

export default function LaUnicaPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <LaUnicaContent />
      </div>
      <Footer />
    </main>
  );
}
