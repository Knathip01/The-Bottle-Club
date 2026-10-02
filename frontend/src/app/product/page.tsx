import { Suspense } from 'react';
import type { Metadata } from 'next';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import ProductCatalogClient from '@/components/ProductCatalogClient';
import { getWineProducts } from '@/lib/products';
import { getSession } from '@/lib/auth-utils';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Wine Collection | The Bottle Club',
  description: 'ค้นพบคอลเลกชันไวน์ชั้นเลิศกว่า 7,600+ รายการจากแหล่งผลิตชั้นนำทั่วโลก พร้อมส่งตรงถึงคุณ',
};

interface ProductPageProps {
  searchParams: Promise<{
    search?: string;
    q?: string;
    category?: string;
    countries?: string;
    country?: string;
    brands?: string;
    brand?: string;
    page?: string;
    per_page?: string;
    sort?: string;
  }>;
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const sp = await searchParams;

  const search = sp.search || sp.q || undefined;
  const category = sp.category || undefined;
  const countries = sp.countries || sp.country || undefined;
  const brands = sp.brands || sp.brand || undefined;
  const page = parseInt(sp.page || '1', 10) || 1;
  const perPage = Math.min(100, Math.max(1, parseInt(sp.per_page || '24', 10) || 24));
  const sort = sp.sort || 'default';

  const session = await getSession();
  const token = session?.user?.access_token;
  const isLoggedIn = !!session;

  const result = await getWineProducts({
    search,
    category,
    countries,
    brands,
    page,
    per_page: perPage,
    sort,
    token,
  });

  return (
    <div className="min-h-screen flex flex-col bg-stone-900">
      <MainHeader />
      
      <div className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-stone-900 text-amber-400">
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
                <p className="text-sm font-medium text-stone-300">กำลังโหลดรายการไวน์จากระบบ...</p>
              </div>
            </div>
          }
        >
          <ProductCatalogClient
            initialProducts={result.products}
            total={result.total}
            currentPage={result.page}
            perPage={result.per_page}
            totalPages={result.pages}
            currentSearch={search}
            currentCategory={category}
            currentCountry={countries}
            currentSort={sort}
            isLoggedIn={isLoggedIn}
          />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
