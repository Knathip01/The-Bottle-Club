import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CakebreadContent from './CakebreadContent';

export const metadata: Metadata = {
  title: 'Cakebread | The Bottle Club & Vivino',
  description: 'Cakebread Cellars has set out to create quality wines that pair best with good food and good company in Rutherford, Napa Valley since 1973.',
};

export default function CakebreadPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <CakebreadContent />
      </div>
      <Footer />
    </main>
  );
}
