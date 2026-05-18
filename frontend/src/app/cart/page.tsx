import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CartContent from '@/components/cart/CartContent';

export default function CartPage() {
  return (
    <main className="min-h-screen bg-white">
      <MainHeader />
      
      <div className="container mx-auto px-4 py-8">
        <CartContent />
      </div>

      <Footer />
    </main>
  );
}
