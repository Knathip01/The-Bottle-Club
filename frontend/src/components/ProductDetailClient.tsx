"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Star, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { addCartItem } from '@/lib/cart';
import { getReviews, createReview, type Product, type ProductReview } from '@/lib/products';

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
      ? product.image || `/images/bottle-silhouette.svg`
      : '/images/bottle-silhouette.svg'
  );

  useEffect(() => {
    if (isLoggedIn && product.image) {
      setActiveImage(product.image);
    }
  }, [isLoggedIn, product.image]);

  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      const data = await getReviews(product.id);
      setReviews(data);
    }
    loadReviews();
  }, [product.id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
      return;
    }

    setIsSubmitting(true);
    const newReview = await createReview(product.id, token, {
      rating,
      comment,
      user_name: 'Customer' // Simplified for now, backend will try to get from token if possible
    });

    if (newReview) {
      setReviews([newReview, ...reviews]);
      setComment('');
      setRating(5);
    }
    setIsSubmitting(false);
  };

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

          <div className="mt-8">
            <h3 className="text-lg font-bold text-stone-900">
              รายละเอียดสินค้า
            </h3>

            <p className="mt-3 text-sm text-stone-600">
              {product.description}
            </p>
          </div>

          {/* Reviews Section */}
          <div className="mt-12 border-t border-stone-100 pt-10">
            <h3 className="text-2xl font-black text-stone-900 mb-6">
              รีวิวสินค้า (Product Reviews)
            </h3>

            {/* Review Form */}
            {isLoggedIn ? (
              <form onSubmit={handleReviewSubmit} className="mb-10 bg-stone-50 p-6 rounded-3xl">
                <div className="mb-4">
                  <label className="block text-xs font-bold uppercase text-stone-400 mb-2">
                    ให้คะแนน (Rating)
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          size={24}
                          className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-stone-300"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold uppercase text-stone-400 mb-2">
                    ความคิดเห็น (Comment)
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows={3}
                    className="w-full p-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all resize-none text-sm"
                    placeholder="แชร์ความรู้สึกเกี่ยวกับสินค้าชิ้นนี้..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !comment.trim()}
                  className="flex items-center justify-center gap-2 bg-stone-950 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#a11a1a] transition-all disabled:bg-stone-300"
                >
                  {isSubmitting ? "กำลังส่ง..." : (
                    <>
                      ส่งรีวิว <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="mb-10 bg-stone-50 p-6 rounded-3xl text-center">
                <p className="text-sm text-stone-500">
                  กรุณา <Link href="/login" className="text-blue-600 underline">เข้าสู่ระบบ</Link> เพื่อเขียนรีวิว
                </p>
              </div>
            )}

            {/* Review List */}
            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="border-b border-stone-100 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-stone-200 flex items-center justify-center text-[10px] font-bold">
                          {review.user_name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold text-stone-900">{review.user_name}</span>
                      </div>
                      <span className="text-[10px] text-stone-400">
                        {new Date(review.created_at).toLocaleDateString('th-TH')}
                      </span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          className={star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-stone-200"}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-white border border-dashed border-stone-200 rounded-3xl">
                  <p className="text-sm text-stone-400">ยังไม่มีรีวิวสำหรับสินค้านี้</p>
                </div>
              )}
            </div>
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