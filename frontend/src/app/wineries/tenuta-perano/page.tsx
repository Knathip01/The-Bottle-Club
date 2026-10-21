import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import TenutaPeranoContent from './TenutaPeranoContent';

export const metadata: Metadata = {
  title: 'Tenuta Perano Winery | The Bottle Club & Vivino',
  description: 'Explore Tenuta Perano in Chianti Classico, Tuscany, Italy, a prized Frescobaldi estate situated in a natural amphitheater producing exceptional Chianti Classico.',
};

export default function TenutaPeranoPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <TenutaPeranoContent />
      </div>
      <Footer />
    </main>
  );
}
