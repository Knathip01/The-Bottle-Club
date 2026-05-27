'use client';

import { useSyncExternalStore } from 'react';
import type { CartItem } from '@/lib/cart';
import { readCart, subscribeCart, writeCart, getEmptyCart } from '@/lib/cart';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CartContent() {
  const items = useSyncExternalStore(subscribeCart, readCart, getEmptyCart);
  const { t } = useLanguage();

  const updateQuantity = (id: number, delta: number) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    writeCart(newItems);
  };

  const removeItem = (id: number) => {
    const newItems = items.filter(item => item.id !== id);
    writeCart(newItems);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = Math.round(subtotal * 0.07);
  const total = subtotal + vat;
  const points = Math.floor(subtotal / 25);

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="flex justify-center mb-4">
          <ShoppingBag size={64} className="text-stone-200" />
        </div>
        <h2 className="text-2xl font-bold mb-4">{t('cart.empty')}</h2>
        <Link 
          href="/" 
          className="inline-block bg-[#a11a1a] text-white px-8 py-3 rounded-full font-bold hover:bg-red-800 transition-colors"
        >
          {t('hero.cta_all')}
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Points Banner - Restored to original style but localized */}
      <div className="mb-6 bg-red-50 text-red-800 p-4 rounded-lg flex items-center justify-between text-sm sm:text-base">
        <div className="flex items-center gap-2">
          <span className="font-bold">✓</span> 
          <span>
            {t('cart.pay_now_earn')} <span className="font-bold">{points} {t('common.points')}</span> {t('cart.for_this_order')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg font-bold">{t('cart.title')}</h1>
            <span className="text-stone-500">{items.length} {t('cart.items')}</span>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-lg bg-white shadow-sm">
                <div className="w-24 h-32 flex-shrink-0 bg-stone-50 rounded flex items-center justify-center p-2">
                  <img src={item.image} alt={item.name} className="max-h-full object-contain" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm">{item.name}</h3>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center border rounded-lg overflow-hidden bg-white">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-stone-50 text-stone-500"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 font-bold min-w-[3rem] text-center text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-stone-50 text-stone-500"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">฿{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-stone-50 p-6 rounded-lg sticky top-24 border border-stone-100">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wider">{t('cart.order_summary')}</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-stone-500 uppercase text-xs font-bold tracking-tight">{t('cart.subtotal')}</span>
                <span className="font-bold">฿{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 uppercase text-xs font-bold tracking-tight">{t('cart.tax')}</span>
                <span className="font-bold">฿{vat.toLocaleString()}</span>
              </div>
              <div className="border-t border-stone-200 pt-4 flex justify-between">
                <span className="font-bold uppercase">{t('cart.total')}</span>
                <span className="text-xl font-bold text-[#a11a1a]">฿{total.toLocaleString()}</span>
              </div>
            </div>

            <Link 
              href="/checkout"
              className="block w-full bg-[#a11a1a] text-white text-center py-4 text-sm font-bold uppercase hover:bg-red-800 transition-all rounded-lg"
            >
              {t('cart.checkout')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
