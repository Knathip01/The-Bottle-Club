'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Clock, Sparkles, Megaphone, Tag, Wine, ChevronLeft, ChevronRight } from 'lucide-react';
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
  subtitle = 'อัปเดตข้อมูลข่าวสาร สิทธิพิเศษ และโปรโมชั่นลดราคาล่าสุดจาก The Bottle Club',
}: PromotionSectionProps) {
  const [activePromos, setActivePromos] = useState<PromotionItem[]>(promotions);

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

  // Triple the list for an infinite, seamless continuous carousel sliding to the left
  const displayList = count > 0 ? [...promoList, ...promoList, ...promoList] : [];

  const [currentIndex, setCurrentIndex] = useState(count);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Reset index when count changes
  useEffect(() => {
    setCurrentIndex(count);
  }, [count]);

  const nextSlide = useCallback(() => {
    if (count <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [count]);

  const prevSlide = useCallback(() => {
    if (count <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [count]);

  // Auto-slide to the left every 3.5 seconds
  useEffect(() => {
    if (count <= 1 || isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(timer);
  }, [count, isPaused, nextSlide]);

  // Handle seamless infinite loop on transition end
  const handleTransitionEnd = () => {
    if (currentIndex >= count * 2) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - count);
    } else if (currentIndex < count) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + count);
    }
  };

  // Re-enable transitioning after instant jump
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  if (count === 0) return null;

  // Active dot indicator (0 .. count - 1)
  const activeDot = ((currentIndex % count) + count) % count;

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
    <section className="py-12 sm:py-16 bg-stone-100/70 border-t border-stone-200/80 overflow-hidden" id="promotions">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Left / Right Buttons */}
        <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-red-900/15 bg-red-950/5 px-4 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#a11a1a]">
              <Megaphone className="h-3.5 w-3.5 text-[#a11a1a]" />
              <span>NEWS & SPECIAL PROMOTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-stone-600">
                {subtitle}
              </p>
            )}
          </div>

          {/* Navigation Controls */}
          {count > 1 && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={prevSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm transition-all hover:bg-stone-50 hover:border-stone-400 active:scale-95 cursor-pointer"
                aria-label="Previous promotion banner"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm transition-all hover:bg-stone-50 hover:border-stone-400 active:scale-95 cursor-pointer"
                aria-label="Next promotion banner"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* ── Auto-scroll Banner Carousel (เลื่อนไปทางซ้ายอัตโนมัติ) ── */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Sliding Track */}
          <div
            className="flex gap-6 [--cards-visible:1] md:[--cards-visible:2] lg:[--cards-visible:3]"
            style={{
              transform: `translateX(calc(-1 * ${currentIndex} * (100% + 24px) / var(--cards-visible, 1)))`,
              transition: isTransitioning ? 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {displayList.map((item, idx) => {
              const img = item.imageUrl || (item as any)?.image_url || '/images/wine_banner.png';
              const isCustomUrl = typeof img === 'string' && (img.startsWith('data:') || img.startsWith('http'));

              return (
                <article
                  key={`${item.id || 'promo'}-${idx}`}
                  className="w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] shrink-0 flex flex-col overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  {/* ── 1. Top Banner Visual Area ── */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950">
                    {img && (
                      <Image
                        src={img}
                        alt={item.title || 'Promotion Banner'}
                        fill
                        unoptimized={isCustomUrl}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 hover:scale-105"
                      />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20 pointer-events-none" />

                    {/* Top Badges (Badge & Discount Tag) */}
                    <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 flex flex-wrap items-center gap-2 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#a11a1a] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md">
                        <Sparkles className="h-3 w-3" />
                        <span>{item.badge || 'PROMOTION'}</span>
                      </span>

                      {item.discountTag && (
                        <span className="rounded-full bg-amber-400 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-stone-950 shadow-md">
                          {item.discountTag}
                        </span>
                      )}
                    </div>

                    {/* Valid Until Tag (Bottom Right on Banner) */}
                    {item.validUntil && (
                      <div className="absolute bottom-3 right-3 sm:bottom-3.5 sm:right-3.5 z-10">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur-md border border-white/10 shadow-sm">
                          <Clock className="h-3 w-3 text-amber-300" />
                          <span>{item.validUntil}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ── 2. Sub-information Inside Each Banner (ข้อมูลย่อยข้างใน) ── */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      {/* Discount Summary Tag if present */}
                      {item.discountTag && (
                        <div className="mb-2 flex items-center gap-1.5 text-xs font-black text-[#a11a1a]">
                          <Tag className="h-3.5 w-3.5 text-[#a11a1a]" />
                          <span>โปรโมชั่นพิเศษ: {item.discountTag}</span>
                        </div>
                      )}

                      {/* Banner Headline / Title */}
                      <h3 className="text-lg sm:text-xl font-black text-stone-950 leading-snug">
                        {item.title}
                      </h3>

                      {/* Subtitle */}
                      {item.subtitle && (
                        <p className="mt-1 text-xs sm:text-sm font-bold text-[#a11a1a]/90">
                          {item.subtitle}
                        </p>
                      )}

                      {/* Divider line */}
                      <div className="my-3.5 h-px w-full bg-stone-100" />

                      {/* Sub-description (รายละเอียดโปรโมชั่นลดราคา ข้อมูลย่อย) */}
                      <p className="text-xs sm:text-sm leading-relaxed text-stone-600 whitespace-pre-line line-clamp-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Sub-info Bottom Bar: Status / Highlights (No external click link) */}
                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <div className="inline-flex items-center gap-1.5 text-stone-700 font-semibold">
                        <Wine className="h-3.5 w-3.5 text-[#a11a1a]" />
                        <span>The Bottle Club Exclusive</span>
                      </div>

                      {item.validUntil && (
                        <span className="text-[11px] font-medium text-stone-400">
                          {item.validUntil}
                        </span>
                      )}
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── Pagination Indicator Dots ── */}
        {count > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {promoList.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(count + dotIdx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeDot === dotIdx
                    ? 'w-8 bg-[#a11a1a]'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
