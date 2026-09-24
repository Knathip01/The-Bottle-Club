'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, ArrowRight, Sparkles, Megaphone } from 'lucide-react';
import { PromotionItem, DEFAULT_PROMOTIONS } from '@/lib/promotions.types';

export type { PromotionItem };
export { DEFAULT_PROMOTIONS };

interface PromotionSectionProps {
  promotions?: PromotionItem[];
  title?: string;
  subtitle?: string;
}

export default function PromotionSection({
  promotions = DEFAULT_PROMOTIONS,
  title = 'ข่าวสารและโปรโมชั่นพิเศษ',
  subtitle = 'อัปเดตข้อมูลข่าวสาร สิทธิพิเศษ และกิจกรรมล่าสุดจาก The Bottle Club',
}: PromotionSectionProps) {
  const [activePromos, setActivePromos] = useState<PromotionItem[]>(promotions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Sync props
  useEffect(() => {
    if (promotions && promotions.length > 0) {
      setActivePromos(promotions);
    }
  }, [promotions]);

  // Client-side fetch
  useEffect(() => {
    async function loadPromotions() {
      try {
        const res = await fetch('/api/promotions', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            setActivePromos(data.data);
          }
        }
      } catch {
        // Keep initial
      }
    }
    loadPromotions();
  }, []);

  const promoList = activePromos.filter((p) => p.isActive !== false);
  const count = promoList.length;

  const nextSlide = useCallback(() => {
    if (count <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prevSlide = useCallback(() => {
    if (count <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Auto-slide effect every 4 seconds
  useEffect(() => {
    if (count <= 1 || isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [count, isPaused, nextSlide]);

  if (count === 0) return null;

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section className="py-12 sm:py-16 bg-stone-100/70 border-t border-stone-200/80" id="promotions">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 text-center">
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-red-900/15 bg-red-950/5 px-4 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#a11a1a]">
            <Megaphone className="h-3.5 w-3.5 text-[#a11a1a]" />
            <span>NEWS & ANNOUNCEMENTS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-950">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-1 max-w-xl text-xs sm:text-sm text-stone-600">
              {subtitle}
            </p>
          )}
        </div>

        {/* Vertical Rectangle Slider Container (สี่เหลี่ยมแนวตั้ง + สไลด์อัตโนมัติ) */}
        <div className="relative mx-auto max-w-[380px] sm:max-w-[420px]">
          
          {/* Main Card Frame (Aspect 3:4 or 4:5 Vertical Rectangle) */}
          <div
            className="group relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-stone-800/20 bg-stone-950 shadow-2xl transition-all duration-300 hover:shadow-red-950/20"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Sliding Track */}
            <div
              className="flex h-full w-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {promoList.map((item, idx) => {
                const img = item.imageUrl || (item as any)?.image_url || '/images/wine_banner.png';
                return (
                  <div key={item.id || idx} className="relative h-full w-full shrink-0 overflow-hidden">
                    {/* Background Image */}
                    {img && (
                      <Image
                        src={img}
                        alt={item.title || 'Promotion'}
                        fill
                        priority={idx === 0}
                        unoptimized={typeof img === 'string' && (img.startsWith('data:') || img.startsWith('http'))}
                        sizes="(max-width: 768px) 100vw, 420px"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    {/* Gradient Dark Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 to-stone-950/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(161,26,26,0.3),transparent_70%)]" />

                    {/* Content inside Vertical Card */}
                    <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7">
                      
                      {/* Top Bar: Badge & Counter */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#a11a1a] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                          <Sparkles className="h-3 w-3" />
                          <span>{item.badge || 'PROMOTION'}</span>
                        </span>

                        <div className="rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur-md border border-white/10">
                          <span>{idx + 1}</span>
                          <span className="text-white/40 mx-1">/</span>
                          <span className="text-white/60">{count}</span>
                        </div>
                      </div>

                      {/* Bottom Info: Title, Subtitle, Description, CTA */}
                      <div>
                        {/* Discount Tag & Date */}
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          {item.discountTag && (
                            <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-stone-950">
                              {item.discountTag}
                            </span>
                          )}

                          {item.validUntil && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-300">
                              <Clock className="h-3 w-3 text-stone-400" />
                              <span>{item.validUntil}</span>
                            </span>
                          )}
                        </div>

                        {/* Title (Clickable link to detail page) */}
                        <Link href={`/promotions/${item.id}`} className="group/title block">
                          <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-md line-clamp-2 group-hover/title:text-amber-300 transition-colors">
                            {item.title}
                          </h3>
                        </Link>

                        {/* Subtitle */}
                        {item.subtitle && (
                          <p className="mt-1 text-xs sm:text-sm font-bold text-amber-200/90 line-clamp-1">
                            {item.subtitle}
                          </p>
                        )}

                        {/* Description */}
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-200 line-clamp-3">
                          {item.description}
                        </p>

                        {/* Action Link Button to dedicated promotion detail page */}
                        <div className="mt-5">
                          <Link
                            href={`/promotions/${item.id}`}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-stone-950 shadow-xl transition-all duration-300 hover:bg-stone-100 hover:shadow-2xl active:scale-95"
                          >
                            <span>{item.ctaText || 'ดูรายละเอียด'}</span>
                            <ArrowRight className="h-4 w-4 text-[#a11a1a]" strokeWidth={2.8} />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Prev / Next Arrows (Show on Hover) */}
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    prevSlide();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 hover:text-white"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    nextSlide();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 hover:text-white"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Dots Pagination Indicators */}
          {count > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {promoList.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === dotIdx
                      ? 'w-7 bg-[#a11a1a]'
                      : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
