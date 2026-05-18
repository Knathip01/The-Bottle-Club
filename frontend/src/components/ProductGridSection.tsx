import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/lib/products';
import { getSession } from '@/lib/auth-utils';

export default async function ProductGridSection() {
  const session = await getSession();
  const token = session?.user?.access_token;
  const products = await getProducts(undefined, token);

  return <ProductGrid products={products} isLoggedIn={!!session} />;
}
