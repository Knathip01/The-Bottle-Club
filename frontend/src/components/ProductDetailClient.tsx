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
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [mediaPreviews, setMediaPreviews] = useState<{ id: string; file: File; url?: string; type: 'image' | 'video'; uploading: boolean; error?: string }[]>([]);

  useEffect(() => {
    async function loadReviews() {
      const data = await getReviews(product.id);
      setReviews(data);
    }
    loadReviews();
  }, [product.id]);

  const handleMediaSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileList = Array.from(files);
    
    // Generate temporary IDs and add to preview list with uploading: true
    const newPreviews = fileList.map(file => {
      const isVideo = file.type.startsWith('video/');
      return {
        id: Math.random().toString(36).substring(2, 9),
        file,
        type: isVideo ? 'video' as const : 'image' as const,
        uploading: true
      };
    });

    setMediaPreviews(prev => [...prev, ...newPreviews]);

    // Clear input
    e.target.value = '';

    // Upload each file
    for (const preview of newPreviews) {
      const formData = new FormData();
      formData.append('file', preview.file);
      formData.append('media', preview.file);

      try {
        const res = await fetch('/api/reviews/media', {
          method: 'POST',
          body: formData
        });

        if (!res.ok) {
          throw new Error(`Upload failed: ${res.statusText}`);
        }

        const data = await res.json();
        const uploadedUrl = data.url || data.file_url || data.data?.url || data.imageUrl || data.videoUrl || '';
        
        if (!uploadedUrl) {
          throw new Error('No URL returned from server');
        }

        setMediaPreviews(prev => prev.map(p => p.id === preview.id ? { ...p, url: uploadedUrl, uploading: false } : p));
      } catch (err: any) {
        console.error('Error uploading file:', err);
        setMediaPreviews(prev => prev.map(p => p.id === preview.id ? { ...p, uploading: false, error: 'อัปโหลดล้มเหลว' } : p));
      }
    }
  };

  const handleRemoveMedia = (id: string) => {
    setMediaPreviews(prev => prev.filter(p => p.id !== id));
  };

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

    // Decode JWT payload to get user_id and username
    let userId = '';
    let username = 'Customer';
    try {
      const parts = token.split('.');
      if (parts.length >= 2) {
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        userId = String(payload.id || payload.sub || payload.user_id || '');
        username =
          payload.username ||
          payload.name ||
          payload.email?.split('@')[0] ||
          'Customer';
      }
    } catch {
      // fallback to defaults
    }

    setIsSubmitting(true);
    setReviewError(null);
    setReviewSuccess(false);

    const images = mediaPreviews.filter(p => p.type === 'image' && p.url).map(p => p.url!);
    const videos = mediaPreviews.filter(p => p.type === 'video' && p.url).map(p => p.url!);

    const result = await createReview({
      wine_id: Number(product.id),
      user_id: userId,
      username,
      rating,
      comment,
      images,
      videos,
    });

    if (result.ok) {
      // Refresh Strategy: Fetch all reviews again to ensure synchronization with the backend/MongoDB
      const freshReviews = await getReviews(Number(product.id));
      setReviews(freshReviews);
      setComment('');
      setRating(5);
      setMediaPreviews([]); // Reset uploaded previews on success
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 4000);
    } else if (result.status === 422) {
      setReviewError('กรุณาตรวจสอบข้อมูล: คะแนนต้องอยู่ระหว่าง 1–5 และต้องกรอกความคิดเห็น');
    } else {
      setReviewError(result.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่');
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

                {/* Media Upload Section */}
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase text-stone-400 mb-2">
                    แนบรูปภาพหรือวิดีโอ (Add Images or Videos)
                  </label>
                  
                  <div className="flex flex-wrap gap-3 items-center">
                    {/* Select Files Button */}
                    <label className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl border-2 border-dashed border-stone-200 hover:border-[#a11a1a] cursor-pointer hover:bg-stone-100/50 transition-all select-none">
                      <span className="text-xl">📸</span>
                      <span className="text-[10px] font-bold text-stone-400 mt-1">อัปโหลดสื่อ</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleMediaSelect}
                        className="hidden"
                      />
                    </label>

                    {/* Previews List */}
                    {mediaPreviews.map((preview) => (
                      <div key={preview.id} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-stone-100 bg-white group shadow-sm">
                        {preview.uploading ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-50 text-[10px] font-bold text-stone-500">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#a11a1a] border-t-transparent mb-1" />
                            <span>กำลังโหลด...</span>
                          </div>
                        ) : preview.error ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 text-[10px] font-bold text-red-500 p-2 text-center">
                            <span>❌</span>
                            <span>{preview.error}</span>
                          </div>
                        ) : (
                          <>
                            {preview.type === 'image' ? (
                              <img
                                src={preview.url || URL.createObjectURL(preview.file)}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <video
                                src={preview.url || URL.createObjectURL(preview.file)}
                                className="w-full h-full object-cover"
                              />
                            )}
                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveMedia(preview.id)}
                              className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center text-xs opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ✕
                            </button>
                            {/* Type badge */}
                            <span className="absolute bottom-1 left-1 px-1 py-0.5 rounded text-[8px] bg-black/50 text-white font-bold tracking-widest uppercase">
                              {preview.type}
                            </span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Error / Success feedback */}
                {reviewError && (
                  <div className="mb-4 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {reviewError}
                  </div>
                )}
                {reviewSuccess && (
                  <div className="mb-4 rounded-2xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                    ✅ ส่งรีวิวสำเร็จแล้ว ขอบคุณสำหรับความคิดเห็น!
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !comment.trim() || mediaPreviews.some(p => p.uploading)}
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
                          {review.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold text-stone-900">{review.username}</span>
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

                    {/* Media Attachments in Review List */}
                    {((review.images && review.images.length > 0) || (review.videos && review.videos.length > 0)) && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {review.images?.map((imgUrl, idx) => (
                          <a key={idx} href={imgUrl} target="_blank" rel="noopener noreferrer" className="relative w-16 h-16 rounded-xl overflow-hidden border border-stone-100 bg-stone-50 hover:opacity-90 transition-opacity">
                            <img src={imgUrl} alt={`Review media ${idx}`} className="w-full h-full object-cover" />
                          </a>
                        ))}
                        {review.videos?.map((vidUrl, idx) => (
                          <video key={idx} src={vidUrl} controls className="w-24 h-16 rounded-xl border border-stone-100 bg-black object-cover" />
                        ))}
                      </div>
                    )}
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