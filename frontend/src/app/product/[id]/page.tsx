import ProductDetailClient from '@/components/ProductDetailClient';
import { getProductById, getProducts } from '@/lib/products';
import { getSession } from '@/lib/auth-utils';
import type { Product } from '@/lib/products';

type Props = {
  params: { id: string };
  searchParams?: { mock?: string };
};

function buildMockProduct(id: number): Product {
  const colors = ['red', 'white', 'rose'];
  const color = colors[id % colors.length];
  const price = 500 + (id % 50) * 20;
  const names = [
    'GRANMONTE SPRING CHENIN BLANC',
    'CHÂTEAU GRAND HARVEST',
    'VINTAGE SELECTION RED',
    'PREMIUM ROSÉ COLLECTION'
  ];
  return {
    id,
    name: names[id % names.length],
    price,
    stock: (id % 30) + 1,
    color,
    type: color === 'red' ? 'Red Wine' : color === 'white' ? 'White Wine' : 'Rosé',
    sub_type: color === 'white' ? 'CHENIN BLANC' : color === 'rose' ? 'Rosé' : 'Classic Red',
    region: 'Khao Yai',
    countryCode: 'th',
  } as Product;
}

export default async function ProductPage({ params, searchParams }: Props) {
  const id = Math.max(1, Number(params.id) || 1);
  const session = await getSession();
  const isLoggedIn = !!session;
  const token = session?.user?.access_token;

  if (searchParams?.mock === '1') {
    const product = buildMockProduct(id);
    const allProducts = Array.from({ length: 5 }, (_, i) => buildMockProduct(id + i + 1));
    return (
      <div className="container mx-auto py-12 px-4">
        <ProductDetailClient product={product} relatedProducts={allProducts} isLoggedIn={isLoggedIn} />
      </div>
    );
  }

  const product: Product | null = await getProductById(id, token);
  const allProducts = await getProducts(undefined, token);
  const finalProduct = product || buildMockProduct(id);

  return (
    <div className="container mx-auto py-12 px-4">
      <ProductDetailClient product={finalProduct} relatedProducts={allProducts} isLoggedIn={isLoggedIn} />
    </div>
  );
}
