import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import OldSoulContent from './OldSoulContent';

export const metadata: Metadata = {
  title: 'Old Soul | The Bottle Club & Vivino',
  description: 'Old Soul wines exude concentrated fruit with integrated oak and structured tannins – mature vines, intense fruit, old souls.',
};

export default function OldSoulPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <MainHeader />
      <div className="flex-1">
        <OldSoulContent />
      </div>
      <Footer />
    </main>
  );
}
