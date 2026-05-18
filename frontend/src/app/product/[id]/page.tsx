import ProductDetailClient from '@/components/ProductDetailClient';
import { getProductById, getProducts } from '@/lib/products';
import { getSession } from '@/lib/auth-utils';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/products';

type Props = {
  params: { id: string };
};

export default async function ProductPage({ params }: Props) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  
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
    <div className="container mx-auto py-12 px-4">
      <ProductDetailClient 
        product={product} 
        relatedProducts={allProducts} 
        isLoggedIn={isLoggedIn} 
      />
    </div>
  );
}
