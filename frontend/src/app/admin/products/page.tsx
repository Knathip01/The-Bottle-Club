import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth-utils';
import { getProducts } from '@/lib/products';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import AdminProductList from '@/components/admin/AdminProductList';

export default async function AdminProductsPage() {
  const session = await getSession();
  
  // Basic security check: only logged in users (you might want to check for admin role here)
  if (!session) {
    redirect('/login');
  }

  const products = await getProducts(undefined, session.user.access_token);

  return (
    <main className="min-h-screen flex flex-col bg-stone-50">
      <MainHeader />

      <div className="flex-1 container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-stone-950">Admin: Manage Products</h1>
          <p className="mt-2 text-stone-500">Manage your product images and details</p>
        </div>

        <AdminProductList initialProducts={products} token={session.user.access_token} />
      </div>

      <Footer />
    </main>
  );
}
