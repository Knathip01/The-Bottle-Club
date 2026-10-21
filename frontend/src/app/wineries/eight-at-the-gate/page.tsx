import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import EightAtTheGateContent from './EightAtTheGateContent';

export const metadata: Metadata = {
  title: 'Eight at the Gate Winery | The Bottle Club & Vivino',
  description: 'Meet Eight at the Gate, a family-owned winery in South Australia’s Wrattonbully region.',
};

export default function EightAtTheGatePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1"><EightAtTheGateContent /></div>
      <Footer />
    </main>
  );
}
