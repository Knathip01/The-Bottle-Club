"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Star, Send, Camera, X, CheckCircle2, AlertCircle, Play, Lock } from 'lucide-react';
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
  isLoggedIn = false,
}: Props) {
  const { t } = useLanguage();
  const router = useRouter();

  const [effectiveLoggedIn, setEffectiveLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasToken = !!localStorage.getItem('access_token');
      setEffectiveLoggedIn(isLoggedIn || hasToken);
    }
  }, [isLoggedIn]);

  const [activeImage, setActiveImage] = useState(
    isLoggedIn
      ? (product.image && product.image !== '/images/bottle-silhouette.svg'
          ? product.image
          : `/images/wine_${product.color || 'red'}.png`)
      : '/images/bottle-silhouette.svg'
  );

  useEffect(() => {
    if (effectiveLoggedIn) {
      if (product.images && product.images.length > 0) {
        setActiveImage(product.images[0].image_url);
      } else if (product.image && product.image !== '/images/bottle-silhouette.svg') {
        setActiveImage(product.image);
      } else {
        setActiveImage(`/images/wine_${product.color || 'red'}.png`);
      }
    } else {
      setActiveImage('/images/bottle-silhouette.svg');
    }
  }, [effectiveLoggedIn, product]);

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
    if (!effectiveLoggedIn) {
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
        <div className="relative flex items-center justify-center p-12 bg-stone-50 rounded-3xl min-h-[500px]">
          <Image
            src={effectiveLoggedIn ? activeImage : '/images/bottle-silhouette.svg'}
            alt={product.name}
            width={300}
            height={600}
            className="h-[450px] w-auto object-contain drop-shadow-lg transition-all duration-300"
          />
          {!effectiveLoggedIn && (
            <div className="absolute inset-x-0 bottom-6 flex justify-center">
              <Link
                href="/login"
                className="rounded-full bg-stone-900/90 hover:bg-stone-950 backdrop-blur-md px-5 py-2.5 text-xs font-bold text-white shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
              >
                <Lock size={14} className="text-amber-400" />
                <span>Member Access — Log in to view</span>
              </Link>
            </div>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {effectiveLoggedIn && hasMultipleImages && (
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
          {!effectiveLoggedIn && (
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

          {/* ═══════════════════════════════════════════════════════
               REVIEWS SECTION — 2027 Design
          ═══════════════════════════════════════════════════════ */}
          <div className="mt-12 pt-10" style={{borderTop: '1px solid rgba(0,0,0,0.06)'}}>

            {/* Section Header */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#a11a1a] mb-1">Customer Experience</p>
                <h3 className="text-2xl font-black text-stone-950 leading-tight">
                  รีวิวสินค้า
                </h3>
              </div>
              {reviews.length > 0 && (
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-stone-950">
                    {(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)}
                  </span>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={11}
                          className={s <= Math.round(reviews.reduce((a,r)=>a+r.rating,0)/reviews.length) ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] text-stone-400 font-semibold">{reviews.length} รีวิว</p>
                  </div>
                </div>
              )}
            </div>

            {/* Rating Distribution Bars */}
            {reviews.length > 0 && (
              <div className="mb-8 p-5 rounded-2xl" style={{background: 'linear-gradient(135deg,#fafaf9 0%,#f5f5f4 100%)', border: '1px solid rgba(0,0,0,0.05)'}}>
                <div className="space-y-2">
                  {[5,4,3,2,1].map(star => {
                    const count = reviews.filter(r => r.rating === star).length;
                    const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-12 flex-shrink-0">
                          <span className="text-xs font-bold text-stone-700">{star}</span>
                          <Star size={10} className="fill-amber-400 text-amber-400" />
                        </div>
                        <div className="flex-1 h-2 rounded-full bg-stone-200 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${pct}%`,
                              background: star >= 4 ? 'linear-gradient(90deg,#fbbf24,#f59e0b)'
                                : star === 3 ? 'linear-gradient(90deg,#94a3b8,#64748b)'
                                : 'linear-gradient(90deg,#fca5a5,#ef4444)'
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-stone-400 w-6 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── Review Form ─── */}
            {effectiveLoggedIn ? (
              <form onSubmit={handleReviewSubmit} className="mb-10 rounded-3xl overflow-hidden" style={{background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,250,249,0.95) 100%)', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)'}}>

                {/* Form top accent */}
                <div className="h-1 w-full" style={{background: 'linear-gradient(90deg, #a11a1a 0%, #c0392b 50%, #e74c3c 100%)'}} />

                <div className="p-6">
                  {/* Star Rating */}
                  <div className="mb-6">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-3">
                      ให้คะแนน · Rating
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="group relative focus:outline-none transition-transform duration-150 hover:scale-110 active:scale-95"
                          style={{filter: star <= rating ? 'drop-shadow(0 0 6px rgba(251,191,36,0.7))' : 'none'}}
                        >
                          <Star
                            size={32}
                            className={`transition-all duration-200 ${
                              star <= rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-stone-200 group-hover:text-amber-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-3 text-sm font-black text-stone-700">
                        {rating === 5 ? '🌟 ยอดเยี่ยม' : rating === 4 ? '😊 ดีมาก' : rating === 3 ? '😐 ปานกลาง' : rating === 2 ? '😕 พอใช้' : '😞 ต้องปรับปรุง'}
                      </span>
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="mb-5">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-3">
                      ความคิดเห็น · Comment
                    </label>
                    <div className="relative">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        rows={4}
                        className="w-full p-4 rounded-2xl outline-none resize-none text-sm text-stone-800 placeholder-stone-300 transition-all duration-200"
                        style={{
                          background: 'rgba(250,250,249,0.8)',
                          border: '1.5px solid',
                          borderColor: comment ? '#a11a1a' : 'rgba(0,0,0,0.1)',
                          boxShadow: comment ? '0 0 0 3px rgba(161,26,26,0.08)' : 'none'
                        }}
                        placeholder="แชร์ความรู้สึกเกี่ยวกับสินค้าชิ้นนี้..."
                      />
                      <div className="absolute bottom-3 right-4 text-[10px] text-stone-300 font-mono">
                        {comment.length}
                      </div>
                    </div>
                  </div>

                  {/* Media Upload */}
                  <div className="mb-6">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-3">
                      แนบไฟล์ · Media
                    </label>
                    <div className="flex flex-wrap gap-3 items-start">
                      {/* Upload Button */}
                      <label className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl cursor-pointer select-none transition-all duration-200 hover:scale-105 group" style={{border: '2px dashed rgba(161,26,26,0.3)', background: 'rgba(161,26,26,0.02)'}}>
                        <Camera size={20} className="text-[#a11a1a] opacity-70 group-hover:opacity-100 transition-opacity" />
                        <span className="text-[9px] font-black text-[#a11a1a] opacity-60 group-hover:opacity-100 mt-1.5 tracking-wider">อัปโหลด</span>
                        <input type="file" multiple accept="image/*,video/*" onChange={handleMediaSelect} className="hidden" />
                      </label>

                      {/* Previews */}
                      {mediaPreviews.map((preview) => (
                        <div key={preview.id} className="relative w-20 h-20 rounded-2xl overflow-hidden group shadow-md" style={{border: '1px solid rgba(0,0,0,0.08)'}}>
                          {preview.uploading ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center" style={{background: 'rgba(250,250,249,0.95)'}}>
                              <div className="w-6 h-6 rounded-full border-2 border-[#a11a1a] border-t-transparent animate-spin mb-1" />
                              <span className="text-[8px] font-bold text-stone-400">กำลังโหลด</span>
                            </div>
                          ) : preview.error ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 p-2 text-center">
                              <AlertCircle size={16} className="text-red-400 mb-1" />
                              <span className="text-[8px] font-bold text-red-400">{preview.error}</span>
                            </div>
                          ) : (
                            <>
                              {preview.type === 'image' ? (
                                <img src={preview.url || URL.createObjectURL(preview.file)} alt="Preview" className="w-full h-full object-cover" />
                              ) : (
                                <div className="relative w-full h-full bg-stone-900">
                                  <video src={preview.url || URL.createObjectURL(preview.file)} className="w-full h-full object-cover opacity-70" />
                                  <Play size={16} className="absolute inset-0 m-auto text-white" />
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveMedia(preview.id)}
                                className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                                style={{background: 'rgba(0,0,0,0.7)'}}
                              >
                                <X size={10} className="text-white" />
                              </button>
                              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md text-[7px] font-black tracking-widest uppercase" style={{background: 'rgba(0,0,0,0.55)', color: 'white'}}>
                                {preview.type === 'video' ? 'VDO' : 'IMG'}
                              </span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Error / Success */}
                  {reviewError && (
                    <div className="mb-4 flex items-start gap-3 rounded-2xl px-4 py-3" style={{background: 'rgba(254,242,242,0.8)', border: '1px solid rgba(252,165,165,0.5)'}}>
                      <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-red-700">{reviewError}</span>
                    </div>
                  )}
                  {reviewSuccess && (
                    <div className="mb-4 flex items-start gap-3 rounded-2xl px-4 py-3" style={{background: 'rgba(240,253,244,0.8)', border: '1px solid rgba(134,239,172,0.5)'}}>
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-emerald-700">ส่งรีวิวสำเร็จแล้ว! ขอบคุณสำหรับความคิดเห็นของคุณ 🙏</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !comment.trim() || mediaPreviews.some(p => p.uploading)}
                    className="relative flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-black uppercase tracking-widest text-white transition-all duration-300 overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: isSubmitting ? '#888' : 'linear-gradient(135deg, #1c1c1c 0%, #3d1010 50%, #a11a1a 100%)',
                      boxShadow: isSubmitting ? 'none' : '0 4px 20px rgba(161,26,26,0.35), 0 1px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    {isSubmitting ? (
                      <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> กำลังส่ง...</>
                    ) : (
                      <><Send size={15} /> ส่งรีวิว</>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mb-10 rounded-3xl p-8 text-center" style={{background: 'linear-gradient(135deg,#fafaf9,#f5f5f4)', border: '1px dashed rgba(0,0,0,0.1)'}}>
                <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{background: 'linear-gradient(135deg,#fef2f2,#fee2e2)'}}>
                  <Star size={20} className="text-[#a11a1a]" />
                </div>
                <p className="text-sm font-semibold text-stone-600">
                  กรุณา{' '}<Link href="/login" className="font-black underline" style={{color:'#a11a1a'}}>เข้าสู่ระบบ</Link>{' '}เพื่อเขียนรีวิว
                </p>
              </div>
            )}

            {/* ─── Review List (Scrollable) ─── */}
            {reviews.length > 0 ? (
              <div className="relative rounded-3xl overflow-hidden" style={{border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)'}}>
                {/* Header bar */}
                <div className="flex items-center justify-between px-5 py-3.5" style={{background: 'linear-gradient(135deg,#fafaf9,#f5f5f4)', borderBottom: '1px solid rgba(0,0,0,0.06)'}}>
                  <div className="flex items-center gap-2">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-black text-stone-700 uppercase tracking-widest">รีวิวทั้งหมด</span>
                  </div>
                  <span className="text-[10px] font-bold text-stone-400 bg-white px-2.5 py-1 rounded-full" style={{border: '1px solid rgba(0,0,0,0.08)'}}>
                    {reviews.length} รายการ
                  </span>
                </div>

                {/* Scrollable area */}
                <div
                  className="overflow-y-auto"
                  style={{
                    maxHeight: '420px',
                    background: '#fefefe',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(161,26,26,0.25) transparent',
                  }}
                >
                  <style>{`
                    .review-scroll::-webkit-scrollbar { width: 5px; }
                    .review-scroll::-webkit-scrollbar-track { background: transparent; }
                    .review-scroll::-webkit-scrollbar-thumb { background: rgba(161,26,26,0.25); border-radius: 99px; }
                    .review-scroll::-webkit-scrollbar-thumb:hover { background: rgba(161,26,26,0.45); }
                  `}</style>
                  <div className="review-scroll overflow-y-auto p-4 space-y-3" style={{maxHeight: '420px'}}>
                    {reviews.map((review) => {
                      const avatarColors = [
                        'linear-gradient(135deg,#667eea,#764ba2)',
                        'linear-gradient(135deg,#f093fb,#f5576c)',
                        'linear-gradient(135deg,#4facfe,#00f2fe)',
                        'linear-gradient(135deg,#43e97b,#38f9d7)',
                        'linear-gradient(135deg,#fa709a,#fee140)',
                        'linear-gradient(135deg,#a18cd1,#fbc2eb)',
                        'linear-gradient(135deg,#fda085,#f6d365)',
                        'linear-gradient(135deg,#a1c4fd,#c2e9fb)',
                      ];
                      const avatarGradient = avatarColors[review.username.charCodeAt(0) % avatarColors.length];
                      return (
                        <div key={review.id} className="rounded-2xl p-4 transition-all duration-200 hover:shadow-md" style={{background: 'linear-gradient(135deg,#ffffff,#fafaf9)', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 1px 6px rgba(0,0,0,0.03)'}}>
                          {/* Header */}
                          <div className="flex items-center justify-between mb-2.5">
                            <div className="flex items-center gap-2.5">
                              <div
                                className="h-9 w-9 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                                style={{background: avatarGradient, boxShadow: '0 2px 8px rgba(0,0,0,0.15)'}}
                              >
                                {review.username.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <span className="text-sm font-black text-stone-900">{review.username}</span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(star => (
                                      <Star key={star} size={10}
                                        className={star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-[10px] text-stone-300">·</span>
                                  <span className="text-[10px] font-semibold text-stone-400">
                                    {new Date(review.created_at).toLocaleDateString('th-TH', {day:'numeric', month:'short', year:'2-digit'})}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg" style={{background: review.rating >= 4 ? 'rgba(251,191,36,0.12)' : 'rgba(0,0,0,0.04)', border: review.rating >= 4 ? '1px solid rgba(251,191,36,0.25)' : '1px solid rgba(0,0,0,0.06)'}}>
                              <Star size={9} className={review.rating >= 4 ? 'fill-amber-400 text-amber-400' : 'fill-stone-400 text-stone-400'} />
                              <span className="text-[11px] font-black" style={{color: review.rating >= 4 ? '#b45309' : '#78716c'}}>{review.rating}.0</span>
                            </div>
                          </div>

                          {/* Comment */}
                          <p className="text-sm text-stone-600 leading-relaxed pl-[46px]">
                            {review.comment}
                          </p>

                          {/* Media */}
                          {((review.images && review.images.length > 0) || (review.videos && review.videos.length > 0)) && (
                            <div className="mt-3 pl-[46px] flex flex-wrap gap-2">
                              {review.images?.map((imgUrl, i) => (
                                <a key={i} href={imgUrl} target="_blank" rel="noopener noreferrer"
                                  className="relative w-14 h-14 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-lg"
                                  style={{border: '1.5px solid rgba(0,0,0,0.08)'}}
                                >
                                  <img src={imgUrl} alt={`Review photo ${i+1}`} className="w-full h-full object-cover" />
                                </a>
                              ))}
                              {review.videos?.map((vidUrl, i) => (
                                <div key={i} className="relative w-20 h-14 rounded-xl overflow-hidden" style={{border: '1.5px solid rgba(0,0,0,0.08)', background: '#000'}}>
                                  <video src={vidUrl} controls className="w-full h-full object-cover" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom fade overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none" style={{background: 'linear-gradient(to top, rgba(254,254,254,0.9), transparent)'}} />
              </div>
            ) : (
              <div className="py-16 text-center rounded-3xl" style={{background: 'linear-gradient(135deg,#fafaf9,#f5f5f4)', border: '1.5px dashed rgba(0,0,0,0.08)'}}>
                <div className="w-14 h-14 rounded-3xl mx-auto mb-4 flex items-center justify-center" style={{background: 'linear-gradient(135deg,#f8fafc,#e2e8f0)'}}>
                  <Star size={24} className="text-stone-300" />
                </div>
                <p className="text-sm font-semibold text-stone-400">ยังไม่มีรีวิว เป็นคนแรกที่แบ่งปันความคิดเห็น!</p>
              </div>
            )}
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
                    href={`/product/${relatedProduct.id}`}
                    className="group flex w-64 flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-2xl"
                  >

                    <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-stone-50 to-stone-100 p-6">

                      <Image
                        src={
                          effectiveLoggedIn
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

                          {effectiveLoggedIn ? (
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

                        {!effectiveLoggedIn && (
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