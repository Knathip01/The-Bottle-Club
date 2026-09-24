'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Clock, Sparkles, Megaphone, Tag, Wine } from 'lucide-react';
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

  if (count === 0) return null;

  // Responsive grid configuration based on number of banners
  const gridLayoutClass =
    count === 1
      ? 'max-w-md mx-auto grid-cols-1'
      : count === 2
      ? 'max-w-4xl mx-auto grid-cols-1 md:grid-cols-2'
      : 'max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <section className="py-12 sm:py-16 bg-stone-100/70 border-t border-stone-200/80" id="promotions">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 text-center">
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-red-900/15 bg-red-950/5 px-4 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#a11a1a]">
            <Megaphone className="h-3.5 w-3.5 text-[#a11a1a]" />
            <span>NEWS & SPECIAL PROMOTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-1.5 max-w-2xl text-xs sm:text-sm text-stone-600">
              {subtitle}
            </p>
          )}
        </div>

        {/* ── Separate Banners Grid (แยก Banner เรียงกันตามจำนวน พร้อมข้อมูลย่อยข้างใน) ── */}
        <div className={`grid gap-6 sm:gap-8 ${gridLayoutClass}`}>
          {promoList.map((item, idx) => {
            const img = item.imageUrl || (item as any)?.image_url || '/images/wine_banner.png';
            const isCustomUrl = typeof img === 'string' && (img.startsWith('data:') || img.startsWith('http'));

            return (
              <article
                key={item.id || idx}
                className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* ── 1. Top Banner Visual Area ── */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950">
                  {img && (
                    <Image
                      src={img}
                      alt={item.title || 'Promotion Banner'}
                      fill
                      priority={idx === 0}
                      unoptimized={isCustomUrl}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {/* Gradient Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20" />

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

                    {/* Sub-description (รายละเอียดโปรโมชั่นลดราคา) */}
                    <p className="text-xs sm:text-sm leading-relaxed text-stone-600 whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>

                  {/* Sub-info Bottom Bar: Status / Badge / Highlights (No external click link) */}
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
    </section>
  );
}
