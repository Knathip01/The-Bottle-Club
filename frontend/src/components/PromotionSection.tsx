'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  Clock,
  Sparkles,
  Megaphone,
  Tag,
  Wine,
  ChevronLeft,
  ChevronRight,
  Images,
  Maximize2,
  X,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { PromotionItem, DEFAULT_PROMOTIONS } from '@/lib/promotions.types';

export type { PromotionItem };
export { DEFAULT_PROMOTIONS };

interface PromotionSectionProps {
  promotions?: PromotionItem[];
  title?: string;
  subtitle?: string;
}

// ── Interactive Banner Media Viewer (แสดงรูปภาพหลายรูป และสลับรูป/กดดูได้) ──
function BannerMediaViewer({
  images,
  title,
  badge,
  discountTag,
  validUntil,
  onOpenLightbox,
}: {
  images: string[];
  title: string;
  badge?: string;
  discountTag?: string;
  validUntil?: string;
  onOpenLightbox: (images: string[], startIndex: number, title: string) => void;
}) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const touchStart = useRef<number | null>(null);
  const { t } = useLanguage();

  const safeImages = images && images.length > 0 ? images : ['/images/wine_banner.png'];
  const currentImg = safeImages[activeImgIdx] || safeImages[0];
  const isCustomUrl = typeof currentImg === 'string' && (currentImg.startsWith('data:') || currentImg.startsWith('http'));

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev + 1) % safeImages.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        setActiveImgIdx((prev) => (prev + 1) % safeImages.length);
      } else {
        setActiveImgIdx((prev) => (prev - 1 + safeImages.length) % safeImages.length);
      }
    }
    touchStart.current = null;
  };

  return (
    <div
      className="group/img relative aspect-[4/5] w-full overflow-hidden bg-stone-950 cursor-pointer select-none"
      onClick={() => onOpenLightbox(safeImages, activeImgIdx, title)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient background blur so any ratio fills naturally without harsh borders */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src={currentImg}
          alt=""
          fill
          unoptimized={isCustomUrl}
          aria-hidden="true"
          className="object-cover object-center blur-xl opacity-35 scale-110"
        />
      </div>

      {/* Main Full Image (Uncropped, Full Display) */}
      <Image
        src={currentImg}
        alt={title || 'Promotion'}
        fill
        unoptimized={isCustomUrl}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-contain object-center transition-transform duration-500 group-hover/img:scale-105 z-10"
      />

      {/* Subtle gentle hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-stone-950/10 pointer-events-none z-10 opacity-50 group-hover/img:opacity-70 transition-opacity" />

      {/* Top Badges (Left) */}
      <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 flex flex-wrap items-center gap-2 z-20">
        {badge && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#a11a1a] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md">
            <Sparkles className="h-3 w-3" />
            <span>{badge}</span>
          </span>
        )}
        {discountTag && (
          <span className="rounded-full bg-amber-400 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-stone-950 shadow-md">
            {discountTag}
          </span>
        )}
      </div>

      {/* Multi-image count badge (Top Right) */}
      {safeImages.length > 1 && (
        <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-black text-white/95 backdrop-blur-md border border-white/15 shadow">
          <Images className="h-3 w-3 text-amber-300" />
          <span>{activeImgIdx + 1} / {safeImages.length} {t('promotions.photos_count')}</span>
        </div>
      )}

      {/* Prev / Next controls for multiple images */}
      {safeImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevImg}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-black/90 active:scale-95 cursor-pointer shadow-md"
            aria-label={t('promotions.prev_photo')}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={nextImg}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-black/90 active:scale-95 cursor-pointer shadow-md"
            aria-label={t('promotions.next_photo')}
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Dots Indicator at bottom */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 p-1 rounded-full bg-black/40 backdrop-blur-sm">
            {safeImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImgIdx(i);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeImgIdx === i ? 'w-4 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Valid Until Tag (Bottom Right on Banner) */}
      {validUntil && (
        <div className="absolute bottom-3 right-3 sm:bottom-3.5 sm:right-3.5 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1 text-[11px] font-bold text-white/90 backdrop-blur-md border border-white/10 shadow-sm">
            <Clock className="h-3 w-3 text-amber-300" />
            <span>{validUntil}</span>
          </span>
        </div>
      )}

      {/* Hover Zoom hint */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity z-20">
        <div className="flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md border border-white/20 shadow-lg">
          <Maximize2 className="h-3.5 w-3.5 text-amber-300" />
          <span>{t('promotions.zoom_hint')}</span>
        </div>
      </div>
    </div>
  );
}

// ── Lightbox Modal Component (เปิดดูรูปภาพขนาดใหญ่และเลื่อนดูรูปทั้งหมดได้) ──
function PromotionLightbox({
  isOpen,
  images,
  initialIndex,
  title,
  onClose,
}: {
  isOpen: boolean;
  images: string[];
  initialIndex: number;
  title: string;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIndex);
  const { t } = useLanguage();

  useEffect(() => {
    setIdx(initialIndex);
  }, [initialIndex, isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[idx] || images[0];
  const isCustomUrl = typeof currentImg === 'string' && (currentImg.startsWith('data:') || currentImg.startsWith('http'));

  const next = () => setIdx((prev) => (prev + 1) % images.length);
  const prev = () => setIdx((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-lg animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="w-full flex items-center justify-between pb-3 text-white">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm sm:text-base truncate max-w-md">{title}</span>
            {images.length > 1 && (
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold">
                {idx + 1} / {images.length}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label={t('promotions.close_lightbox')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main Large Image (Expands to full height up to 82vh) */}
        <div className="relative w-full h-[72vh] sm:h-[80vh] max-h-[85vh] rounded-2xl overflow-hidden bg-black/90 shadow-2xl border border-white/10 flex items-center justify-center">
          <Image
            src={currentImg}
            alt={title}
            fill
            unoptimized={isCustomUrl}
            className="object-contain object-center"
            priority
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition shadow-lg cursor-pointer"
                aria-label={t('promotions.prev_photo')}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition shadow-lg cursor-pointer"
                aria-label={t('promotions.next_photo')}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails strip below */}
        {images.length > 1 && (
          <div className="flex items-center gap-2 pt-3 overflow-x-auto max-w-full">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                className={`relative w-12 h-15 sm:w-14 sm:h-18 rounded-lg overflow-hidden border-2 transition cursor-pointer shrink-0 ${
                  idx === i ? 'border-amber-400 scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  unoptimized={typeof img === 'string' && (img.startsWith('data:') || img.startsWith('http'))}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main PromotionSection Component ──
export default function PromotionSection({
  promotions = DEFAULT_PROMOTIONS,
  title,
  subtitle,
}: PromotionSectionProps) {
  const { t } = useLanguage();
  const sectionBadge = t('promotions.badge');
  const sectionTitle = title || t('promotions.title');
  const sectionSubtitle = subtitle !== undefined ? subtitle : t('promotions.subtitle');
  const [activePromos, setActivePromos] = useState<PromotionItem[]>(promotions);

  // Lightbox Modal state
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: string[];
    startIndex: number;
    title: string;
  }>({
    isOpen: false,
    images: [],
    startIndex: 0,
    title: '',
  });

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
    if (count <= 1 || isPaused || lightbox.isOpen) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(timer);
  }, [count, isPaused, lightbox.isOpen, nextSlide]);

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

  const handleOpenLightbox = (imgs: string[], startIdx: number, promoTitle: string) => {
    setLightbox({
      isOpen: true,
      images: imgs,
      startIndex: startIdx,
      title: promoTitle,
    });
  };

  return (
    <section className="py-12 sm:py-16 bg-stone-100/70 border-t border-stone-200/80 overflow-hidden" id="promotions">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Left / Right Buttons */}
        <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-red-900/15 bg-red-950/5 px-4 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#a11a1a]">
              <Megaphone className="h-3.5 w-3.5 text-[#a11a1a]" />
              <span>{sectionBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950">
              {sectionTitle}
            </h2>
            {sectionSubtitle && (
              <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-stone-600">
                {sectionSubtitle}
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
                aria-label={t('promotions.prev')}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm transition-all hover:bg-stone-50 hover:border-stone-400 active:scale-95 cursor-pointer"
                aria-label={t('promotions.next')}
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
              const allImages =
                Array.isArray(item.images) && item.images.length > 0
                  ? item.images
                  : [item.imageUrl || (item as any)?.image_url || '/images/wine_banner.png'];

              return (
                <article
                  key={`${item.id || 'promo'}-${idx}`}
                  className="w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] shrink-0 flex flex-col overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  {/* ── 1. Top Banner Visual Area (Interactive Multi-Image Slider) ── */}
                  <BannerMediaViewer
                    images={allImages}
                    title={item.title}
                    badge={item.badge}
                    discountTag={item.discountTag}
                    validUntil={item.validUntil}
                    onOpenLightbox={handleOpenLightbox}
                  />

                  {/* ── 2. Sub-information Inside Each Banner (ข้อมูลย่อยข้างใน) ── */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      {/* Discount Summary Tag if present */}
                      {item.discountTag && (
                        <div className="mb-2 flex items-center gap-1.5 text-xs font-black text-[#a11a1a]">
                          <Tag className="h-3.5 w-3.5 text-[#a11a1a]" />
                          <span>{t('promotions.special_offer')} {item.discountTag}</span>
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
                        <span>{t('promotions.exclusive')}</span>
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

      {/* ── Lightbox Modal for Fullscreen Photo Viewing ── */}
      <PromotionLightbox
        isOpen={lightbox.isOpen}
        images={lightbox.images}
        initialIndex={lightbox.startIndex}
        title={lightbox.title}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
      />
    </section>
  );
}
