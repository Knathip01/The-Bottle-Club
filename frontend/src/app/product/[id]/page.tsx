import ProductDetailClient from '@/components/ProductDetailClient';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import { getProductById, getProducts } from '@/lib/products';
import { getSession } from '@/lib/auth-utils';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/products';

type Props = {
  params: Promise<{ id: string }> | { id: string };
};

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const id = Number(resolvedParams?.id);
  
  if (isNaN(id)) {
    notFound();
  }

  const session = await getSession();
  const isLoggedIn = !!session;
  const token = session?.user?.access_token;

  const product: Product | null = await getProductById(id, token);
  
  if (!product) {
    notFound();
  }

  const allProducts = await getProducts(undefined, token);

  return (
    <main className="min-h-screen flex flex-col bg-stone-50">
      <MainHeader />
      <div className="flex-1 container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <ProductDetailClient 
          product={product} 
          relatedProducts={allProducts} 
          isLoggedIn={isLoggedIn} 
        />
      </div>
      <Footer />
    </main>
  );
}

