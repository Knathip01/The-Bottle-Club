"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { loginWithProvider } from '@/lib/auth-client';
import { addCartItem } from '@/lib/cart';
import type { Product } from '@/lib/products';

type Props = {
  product: Product;
  relatedProducts?: Product[];
  isLoggedIn?: boolean;
};

function formatPrice(price: number) {
  return price.toLocaleString('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export default function ProductDetailClient({
  product,
  relatedProducts = [],
  isLoggedIn = true,
}: Props) {
  const { t } = useLanguage();
  const router = useRouter();

  const [activeImage, setActiveImage] = useState(
    isLoggedIn
      ? product.image || `/images/wine_${product.color || 'red'}.png`
      : '/images/bottle-silhouette.svg'
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      setCanScrollLeft(scrollContainerRef.current.scrollLeft > 0);

      setCanScrollRight(
        scrollContainerRef.current.scrollLeft <
          scrollContainerRef.current.scrollWidth -
            scrollContainerRef.current.clientWidth -
            10
      );
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;

      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });

      setTimeout(checkScroll, 300);
    }
  };

  const handleQuickBuy = (product: Product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image:
        product.image ||
        `/images/wine_${product.color || 'red'}.png`,
    };

    addCartItem(cartItem);

    router.push('/cart');
  };

  const hasMultipleImages = product.images && product.images.length > 1;

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-start">
      {/* Product Image Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center p-12 bg-stone-50 rounded-3xl min-h-[500px]">
          <Image
            src={activeImage}
            alt={product.name}
            width={300}
            height={600}
            className="h-[450px] w-auto object-contain drop-shadow-lg transition-all duration-300"
          />
        </div>

        {/* Thumbnail Gallery */}
        {isLoggedIn && hasMultipleImages && (
          <div className="flex gap-3 overflow-x-auto pb-2 px-1">
            {product.images?.map((img) => (
              <button
                key={img.id}
                onClick={() => setActiveImage(img.image_url)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  activeImage === img.image_url
                    ? 'border-stone-950 ring-2 ring-stone-950/10'
                    : 'border-transparent hover:border-stone-200'
                }`}
              >
                <Image
                  src={img.image_url}
                  alt={`${product.name} ${img.id}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-extrabold text-stone-900">
          {product.name}
        </h1>

        <p className="mt-2 text-sm text-stone-500">
          {product.sub_type}
        </p>

        <div className="mt-4 border-t border-stone-100 pt-6">

          {/* Login/Register Notice */}
          {!isLoggedIn && (
            <div className="mb-8 rounded-3xl border border-stone-100 bg-stone-50 p-6 text-center">
              <p className="mb-2 text-sm font-black uppercase tracking-wider text-stone-700">
                MEMBER ACCESS —
              </p>

              <p className="text-sm font-black uppercase tracking-wider text-stone-700">
                PLEASE{' '}
                <Link
                  href="/register"
                  className="text-blue-600 underline hover:text-blue-700"
                >
                  REGISTER
                </Link>{' '}
                /{' '}
                <Link
                  href="/login"
                  className="text-blue-600 underline hover:text-blue-700"
                >
                  LOG-IN
                </Link>{' '}
                TO CONTINUE
              </p>
            </div>
          )}

          {/* Price */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase text-stone-400">
                {t('products.price_label')}
              </div>

              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold text-stone-900">
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice && (
                  <div className="text-sm font-medium text-stone-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-bold uppercase text-stone-400">
                {t('products.in_stock')}
              </div>

              <div className="text-sm font-semibold text-stone-700">
                {Number(product.stock) || 0}
              </div>

              <div className="mt-2 text-xs text-stone-400">
                {/* SKU */}
              </div>
            </div>
          </div>

          {/* Product Detail Grid */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

            <div className="flex items-start gap-4">
              <div className="w-8 text-stone-500">🗺️</div>

              <div>
                <div className="text-xs text-stone-400">
                  ประเทศ (COUNTRY)
                </div>

                <div className="text-sm font-bold">
                  {(product.countryCode || '').toUpperCase()}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 text-stone-500">🍾</div>

              <div>
                <div className="text-xs text-stone-400">
                  ขนาดบรรจุ (BOTTLE SIZE)
                </div>

                <div className="text-sm font-bold">
                  {/* Leave blank */}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 text-stone-500">🍷</div>

              <div>
                <div className="text-xs text-stone-400">
                  ประเภทไวน์ (WINE TYPE)
                </div>

                <div className="text-sm font-bold">
                  {product.type}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 text-stone-500">🌿</div>

              <div>
                <div className="text-xs text-stone-400">
                  แคว้น (WINE REGION)
                </div>

                <div className="text-sm font-bold">
                  {product.region}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 text-stone-500">🍇</div>

              <div>
                <div className="text-xs text-stone-400">
                  พันธุ์องุ่น (GRAPE VARIETY)
                </div>

                <div className="text-sm font-bold">
                  {product.sub_type}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 text-stone-500">📅</div>

              <div>
                <div className="text-xs text-stone-400">
                  ปี (VINTAGE)
                </div>

                <div className="text-sm font-bold">
                  {product.vintage}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 text-stone-500">🏛️</div>

              <div>
                <div className="text-xs text-stone-400">
                  โรงไวน์ (WINERY)
                </div>

                <div className="text-sm font-bold">
                  {product.designation}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 text-stone-500">🧪</div>

              <div>
                <div className="text-xs text-stone-400">
                  แอลกอฮอล์ (ALCOHOL)
                </div>

                <div className="text-sm font-bold">
                  {product.alcohol ? `${product.alcohol}%` : ''}
                </div>
              </div>
            </div>
          </div>

          {/* LINE Button */}
          <div className="mt-8">
            <div className="mb-6 flex justify-center">
              <button
                onClick={() => loginWithProvider('line')}
                className="flex w-full max-w-md items-center justify-center gap-3 rounded-2xl bg-[#06C755] px-6 py-4 font-black uppercase text-white shadow-lg transition-colors hover:bg-[#05b14a]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white font-bold text-[#06C755]">
                  L
                </span>

                แชทกับเราทาง LINE
              </button>
            </div>

            <h3 className="text-lg font-bold text-stone-900">
              รายละเอียดสินค้า
            </h3>

            <p className="mt-3 text-sm text-stone-600">
              {product.description}
            </p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-8 border-t border-stone-100 pt-8">

            <div className="mb-4 text-left w-full">

              <p className="mb-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#a11a1a]">
                {t('products.recommended_subtitle') ||
                  'Other Wines'}
              </p>

              <h3 className="text-3xl font-black tracking-normal text-stone-950 md:text-4xl">
                More from Our Collection
              </h3>
            </div>

            <div className="relative w-full">

              <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide w-full"
              >
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={
                      isLoggedIn
                        ? `/product/${relatedProduct.id}`
                        : '/login'
                    }
                    className="group flex w-64 flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-2xl"
                  >

                    <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-stone-50 to-stone-100 p-6">

                      <Image
                        src={
                          isLoggedIn
                            ? relatedProduct.image ||
                              `/images/wine_${relatedProduct.color || 'red'}.png`
                            : '/images/bottle-silhouette.svg'
                        }
                        alt={relatedProduct.name}
                        width={150}
                        height={260}
                        className="h-40 w-auto object-contain"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-4">

                      <h4 className="line-clamp-2 text-base font-extrabold text-stone-950">
                        {relatedProduct.name}
                      </h4>

                      <div className="mt-auto pt-4">

                        <div className="flex items-center justify-between">

                          <p className="font-bold text-lg text-stone-900">
                            ฿{relatedProduct.price.toLocaleString()}
                          </p>

                          {isLoggedIn ? (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                handleQuickBuy(relatedProduct);
                              }}
                              className="rounded-full bg-stone-950 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#a11a1a]"
                            >
                              Add
                            </button>
                          ) : (
                            <span className="text-[8px] font-black uppercase text-stone-400">
                              Login to Buy
                            </span>
                          )}
                        </div>

                        {!isLoggedIn && (
                          <div className="border-t border-stone-100 pt-2 text-center">

                            <div className="text-[9px] font-black uppercase tracking-wider text-stone-700">

                              PLEASE{' '}

                              <span
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();

                                  router.push('/register');
                                }}
                                className="cursor-pointer text-blue-600 underline hover:text-blue-700"
                              >
                                REGISTER
                              </span>

                              {' '} / {' '}

                              <span
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();

                                  router.push('/login');
                                }}
                                className="cursor-pointer text-blue-600 underline hover:text-blue-700"
                              >
                                LOG-IN
                              </span>

                              {' '}TO CONTINUE
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Scroll Buttons */}
              {canScrollLeft && (
                <button
                  onClick={() => scroll('left')}
                  className="absolute left-0 top-1/2 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
                >
                  <ChevronLeft
                    size={20}
                    className="text-stone-900"
                  />
                </button>
              )}

              {canScrollRight && (
                <button
                  onClick={() => scroll('right')}
                  className="absolute right-0 top-1/2 z-10 translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
                >
                  <ChevronRight
                    size={20}
                    className="text-stone-900"
                  />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}