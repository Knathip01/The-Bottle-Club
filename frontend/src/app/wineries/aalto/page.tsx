import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AaltoContent from './AaltoContent';

export const metadata: Metadata = {
  title: 'Aalto Winery | The Bottle Club & Vivino',
  description: 'Explore Aalto winery in Ribera del Duero, Spain. Founded in 1999 by Mariano García and Javier Zaccagnini, crafting legendary Tinto Fino wines.',
};

export default function AaltoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <AaltoContent />
      </div>
      <Footer />
    </main>
  );
}
