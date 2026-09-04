'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { addCartItem } from '@/lib/cart';
import type { Product } from '@/lib/products';
import { ShoppingCart, Star, Lock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SearchProductListProps {
  products: Product[];
  isLoggedIn?: boolean;
}

export default function SearchProductList({ products, isLoggedIn = false }: SearchProductListProps) {
  const { t } = useLanguage();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [effectiveLoggedIn, setEffectiveLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasToken = !!localStorage.getItem('access_token');
      setEffectiveLoggedIn(isLoggedIn || hasToken);
    }
  }, [isLoggedIn]);

  const getMockRating = (id: number) => {
    const rating = (3.5 + (id % 15) / 10).toFixed(1);
    const reviews = 100 + (id * 17) % 900;
    return { rating, reviews };
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
    });
  };

  const getCountryName = (code?: string) => {
    return code?.toUpperCase() || '...';
  };

  const handleSelectProduct = (product: Product) => {
    if (!effectiveLoggedIn) {
      window.location.href = '/login';
      return;
    }

    setLoadingId(product.id);

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image || `/images/wine_${product.color || 'red'}.png`,
    };

    try {
      addCartItem(cartItem);

      setTimeout(() => {
        window.location.href = '/cart';
      }, 300);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {products.map((product) => {
        const { rating, reviews } = getMockRating(product.id);
        const wineColor = product.color || 'red';
        const countryCode = product.countryCode?.toLowerCase() || 'fr';

        return (
          <div
            key={product.id}
            className="group flex flex-col gap-8 overflow-hidden rounded-3xl border border-stone-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:flex-row"
          >
            <Link
              href={`/product/${product.id}`}
              className="relative flex h-64 w-full flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-stone-50 p-4 md:w-48"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-stone-200/30" />

              <div className="relative transition-transform duration-500 group-hover:scale-110">
                <img
                  src={
                    effectiveLoggedIn
                      ? (product.image && product.image !== '/images/bottle-silhouette.svg'
                          ? product.image
                          : `/images/wine_${wineColor}.png`)
                      : '/images/bottle-silhouette.svg'
                  }
                  alt={product.name}
                  className="h-48 w-auto object-contain drop-shadow-lg"
                />
              </div>
            </Link>

            <div className="flex flex-1 flex-col justify-center">
              <div className="mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                  {product.type || t('search.wine_type')} - {product.sub_type || t('products.classic')}
                </span>
              </div>
              <Link href={`/product/${product.id}`}>
                <h2 className="mb-1 cursor-pointer font-serif text-2xl font-bold leading-tight text-stone-900 transition-colors hover:text-[#a11a1a]">
                  {product.name}
                </h2>
              </Link>
              <div className="mb-4 flex items-center gap-2">
                <div className="relative flex h-3.5 w-5 shrink-0 overflow-hidden rounded-sm border border-stone-200 bg-stone-100">
                  <img
                    src={`https://flagcdn.com/w40/${countryCode}.png`}
                    alt={countryCode}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-stone-500">
                  {product.region ? `${product.region}, ` : ''}
                  {getCountryName(product.countryCode)}
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col items-center justify-center border-t border-stone-100 pt-6 md:w-48 md:items-end md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <div className="mb-6 text-center md:text-right">
                <div className="mb-1 flex items-center justify-center gap-2 md:justify-end">
                  <span className="text-3xl font-bold text-stone-900">{rating}</span>
                  <div className="flex flex-col">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={star <= Math.floor(Number(rating)) ? 'fill-red-500 text-red-500' : 'text-stone-300'}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-stone-400">
                      ({reviews} {t('search.ratings')})
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="mb-2 text-center md:text-right">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    {t('search.avg_price')}
                  </span>
                </div>
                <button
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-bold text-white shadow-lg transition-colors active:scale-95 disabled:opacity-70 ${
                    effectiveLoggedIn
                      ? 'bg-[#008967] hover:bg-[#007054]'
                      : 'bg-stone-900 hover:bg-stone-800'
                  }`}
                  onClick={() => handleSelectProduct(product)}
                  disabled={loadingId === product.id}
                >
                  {loadingId === product.id ? (
                    <span className="animate-pulse">{t('search.loading')}</span>
                  ) : effectiveLoggedIn ? (
                    <>
                      <ShoppingCart size={18} />
                      {formatPrice(product.price)}
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      <span>{t('auth.login') || 'Log In'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
