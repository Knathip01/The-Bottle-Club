import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ArnaizContent from './ArnaizContent';

export const metadata: Metadata = {
  title: 'Arnaiz | The Bottle Club & Vivino',
  description: 'Explore Viña Arnáiz wines from Ribera del Duero and Castilla y León, Spain. Premium Tempranillo Gran Reserva, Reserva, and Crianza handcrafted by J. García Carrión.',
};

export default function ArnaizPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <ArnaizContent />
      </div>
      <Footer />
    </main>
  );
}
