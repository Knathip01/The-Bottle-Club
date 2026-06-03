'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Star, MessageSquare, ExternalLink } from 'lucide-react';
import AccountSidebar from '@/components/account/AccountSidebar';
import { useLanguage } from '@/context/LanguageContext';
import { type ProductReview } from '@/lib/products';

interface ReviewsContentProps {
  user: any;
}


const AVATAR_GRADIENTS = [
  'linear-gradient(135deg,#667eea,#764ba2)',
  'linear-gradient(135deg,#f093fb,#f5576c)',
  'linear-gradient(135deg,#4facfe,#00f2fe)',
  'linear-gradient(135deg,#43e97b,#38f9d7)',
  'linear-gradient(135deg,#fa709a,#fee140)',
  'linear-gradient(135deg,#a18cd1,#fbc2eb)',
  'linear-gradient(135deg,#fda085,#f6d365)',
  'linear-gradient(135deg,#a1c4fd,#c2e9fb)',
];

export default function ReviewsContent({ user }: ReviewsContentProps) {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const token = localStorage.getItem('access_token');
        if (!token) { setLoading(false); return; }

        const res = await fetch('/api/reviews/user', {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        });
        if (!res.ok) { setLoading(false); return; }
        const data = await res.json();
        const list: ProductReview[] = Array.isArray(data) ? data : [];
        setReviews(list);
      } catch {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="flex flex-col md:flex-row gap-12">
      <AccountSidebar user={user} activePath="/account/reviews" />

      <div className="flex-1 min-w-0">

        {/* ── Page Header ── */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#a11a1a] mb-1">
              My Activity
            </p>
            <h1 className="text-2xl font-black text-stone-950 leading-tight">
              {t('account.reviews_title')}
            </h1>
          </div>

          {reviews.length > 0 && (
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-stone-950">
                {avgRating.toFixed(1)}
              </span>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={11}
                      className={s <= Math.round(avgRating) ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-stone-400 font-semibold text-right">
                  {reviews.length} รีวิว
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Rating Distribution ── */}
        {reviews.length > 0 && (
          <div className="mb-8 p-5 rounded-2xl"
            style={{background:'linear-gradient(135deg,#fafaf9,#f5f5f4)', border:'1px solid rgba(0,0,0,0.05)'}}>
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
                          background: star >= 4
                            ? 'linear-gradient(90deg,#fbbf24,#f59e0b)'
                            : star === 3
                            ? 'linear-gradient(90deg,#94a3b8,#64748b)'
                            : 'linear-gradient(90deg,#fca5a5,#ef4444)',
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

        {/* ── Loading ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-[#a11a1a] border-t-transparent animate-spin mb-3" />
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">กำลังโหลด...</p>
          </div>
        )}

        {/* ── Review List (Scrollable Frame) ── */}
        {!loading && reviews.length > 0 && (
          <div className="relative rounded-3xl overflow-hidden"
            style={{border:'1px solid rgba(0,0,0,0.08)', boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>

            {/* Header bar */}
            <div className="flex items-center justify-between px-5 py-3.5"
              style={{background:'linear-gradient(135deg,#fafaf9,#f5f5f4)', borderBottom:'1px solid rgba(0,0,0,0.06)'}}>
              <div className="flex items-center gap-2">
                <MessageSquare size={13} className="text-[#a11a1a]" />
                <span className="text-xs font-black text-stone-700 uppercase tracking-widest">รีวิวของฉัน</span>
              </div>
              <span className="text-[10px] font-bold text-stone-400 bg-white px-2.5 py-1 rounded-full"
                style={{border:'1px solid rgba(0,0,0,0.08)'}}>
                {reviews.length} รายการ
              </span>
            </div>

            {/* Scrollable area */}
            <style>{`
              .my-review-scroll::-webkit-scrollbar { width: 5px; }
              .my-review-scroll::-webkit-scrollbar-track { background: transparent; }
              .my-review-scroll::-webkit-scrollbar-thumb { background: rgba(161,26,26,0.25); border-radius: 99px; }
              .my-review-scroll::-webkit-scrollbar-thumb:hover { background: rgba(161,26,26,0.45); }
            `}</style>
            <div
              className="my-review-scroll overflow-y-auto p-4 space-y-3"
              style={{
                maxHeight: '520px',
                background: '#fefefe',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(161,26,26,0.25) transparent',
              }}
            >
              {reviews.map((review) => {
                const avatarGradient = AVATAR_GRADIENTS[review.username.charCodeAt(0) % AVATAR_GRADIENTS.length];
                return (
                  <div
                    key={review.id}
                    className="rounded-2xl p-4 transition-all duration-200 hover:shadow-md"
                    style={{
                      background: 'linear-gradient(135deg,#ffffff,#fafaf9)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      boxShadow: '0 1px 6px rgba(0,0,0,0.03)',
                    }}
                  >
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="h-9 w-9 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
                          style={{background: avatarGradient, boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}
                        >
                          {review.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-stone-900">{review.username}</span>
                            {/* Link to product */}
                            <Link
                              href={`/product/${review.wine_id}`}
                              className="flex items-center gap-0.5 text-[10px] font-bold text-[#a11a1a] hover:underline"
                            >
                              <ExternalLink size={10} />
                              ดูสินค้า
                            </Link>
                          </div>
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

                      {/* Rating badge */}
                      <div
                        className="flex items-center gap-1 px-2 py-0.5 rounded-lg"
                        style={{
                          background: review.rating >= 4 ? 'rgba(251,191,36,0.12)' : 'rgba(0,0,0,0.04)',
                          border: review.rating >= 4 ? '1px solid rgba(251,191,36,0.25)' : '1px solid rgba(0,0,0,0.06)',
                        }}
                      >
                        <Star size={9} className={review.rating >= 4 ? 'fill-amber-400 text-amber-400' : 'fill-stone-400 text-stone-400'} />
                        <span className="text-[11px] font-black"
                          style={{color: review.rating >= 4 ? '#b45309' : '#78716c'}}>
                          {review.rating}.0
                        </span>
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
                            style={{border:'1.5px solid rgba(0,0,0,0.08)'}}
                          >
                            <img src={imgUrl} alt={`Review photo ${i+1}`} className="w-full h-full object-cover" />
                          </a>
                        ))}
                        {review.videos?.map((vidUrl, i) => (
                          <div key={i} className="relative w-20 h-14 rounded-xl overflow-hidden"
                            style={{border:'1.5px solid rgba(0,0,0,0.08)', background:'#000'}}>
                            <video src={vidUrl} controls className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
              style={{background:'linear-gradient(to top, rgba(254,254,254,0.9), transparent)'}} />
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && reviews.length === 0 && (
          <div className="py-20 text-center rounded-3xl"
            style={{background:'linear-gradient(135deg,#fafaf9,#f5f5f4)', border:'1.5px dashed rgba(0,0,0,0.08)'}}>
            <div className="w-14 h-14 rounded-3xl mx-auto mb-4 flex items-center justify-center"
              style={{background:'linear-gradient(135deg,#f8fafc,#e2e8f0)'}}>
              <Star size={24} className="text-stone-300" />
            </div>
            <p className="text-sm font-semibold text-stone-500 mb-1">{t('account.no_reviews')}</p>
            <p className="text-xs text-stone-400 mb-6">เริ่มสั่งซื้อสินค้าและแชร์ประสบการณ์ของคุณ</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest text-white transition-all duration-200 hover:scale-105"
              style={{background:'linear-gradient(135deg,#1c1c1c,#a11a1a)', boxShadow:'0 4px 16px rgba(161,26,26,0.3)'}}
            >
              เลือกซื้อสินค้า
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
