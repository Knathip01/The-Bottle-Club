import { Suspense } from 'react';
import MainHeader from '@/components/MainHeader';
import Hero from '@/components/Hero';
import ProductGridSection from '@/components/ProductGridSection';
import ProductGridSkeleton from '@/components/ProductGridSkeleton';
import PromotionSection from '@/components/PromotionSection';
import Footer from '@/components/Footer';
import { getPromotions } from '@/lib/promotions.server';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const promotions = await getPromotions();

  return (
    <main className="min-h-screen flex flex-col">
      <MainHeader />
      <div className="flex-1">
        <Hero />
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGridSection />
        </Suspense>
        <PromotionSection promotions={promotions} />
      </div>
      <Footer />
    </main>
  );
}
