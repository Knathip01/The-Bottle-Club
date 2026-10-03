'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Sparkles, Award, Wine } from 'lucide-react';
import { PromotionItem } from '@/lib/promotions.types';

interface HeroProps {
  heroPromo?: PromotionItem | null;
}

export default function Hero({ heroPromo: initialHeroPromo }: HeroProps = {}) {
  const { language, t } = useLanguage();
  const [promo, setPromo] = useState<PromotionItem | null>(initialHeroPromo ?? null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (initialHeroPromo !== undefined) {
      setPromo(initialHeroPromo);
    }
  }, [initialHeroPromo]);

  // Live client-side fetch from /api/promotions to keep synced with admin updates
  useEffect(() => {
    async function loadPromotions() {
      try {
        const res = await fetch('/api/promotions', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            const featured = json.data.find((p: PromotionItem) => p.isFeatured && p.isActive !== false);
            if (featured) {
              setPromo(featured);
            }
          }
        }
      } catch {
        // Keep current promo
      }
    }
    loadPromotions();
  }, []);

  const copy = {
    welcome: promo?.badge || t('hero.welcome'),
    title: promo?.title || t('hero.title'),
    subtitle: promo?.subtitle || promo?.description || t('hero.subtitle'),
    primary: promo?.ctaText || t('hero.cta_all'),
    primaryLink: promo?.linkUrl || '#products',
    secondary: promo?.secondaryCtaText || t('hero.cta_more'),
    secondaryLink: promo?.secondaryLinkUrl || '#wine-categories',
  };

  const bgImage = promo?.imageUrl || (promo?.images && promo.images.length > 0 ? promo.images[0] : null) || '/images/wine_banner.png';
  const isCustomBg = typeof bgImage === 'string' && (bgImage.startsWith('data:') || bgImage.startsWith('http'));

  const floatingImage = promo?.heroImageUrl || (promo?.images && promo.images.length > 1 ? promo.images[1] : null) || '/images/wine_hero.png';
  const isCustomFloating = typeof floatingImage === 'string' && (floatingImage.startsWith('data:') || floatingImage.startsWith('http'));


  return (
    <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-stone-950 text-white sm:min-h-[760px]">

      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        {isCustomBg ? (
          <img src={bgImage} alt={copy.title} className="h-full w-full object-cover object-[58%_center]" />
        ) : (
          <Image
            src={bgImage}
            alt="The Bottle Club wine selection"
            fill priority sizes="100vw"
            className="object-cover object-[58%_center]"
          />
        )}

        {/* Multi-layer cinematic overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(0,0,0,.85)_0%,rgba(0,0,0,.60)_45%,rgba(0,0,0,.80)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,.3)_0%,transparent_35%,rgba(12,10,9,.75)_100%)]" />
        {/* Warm burgundy radial accent */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 55% at 65% 40%, rgba(120,20,20,.22) 0%, transparent 70%)' }} />
        {/* Ground fade to page bg */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-stone-50 to-transparent" />
      </div>

      {/* ── Decorative floating rings (background) ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full border border-white/5" />
        <div className="absolute -left-24 top-4 h-56 w-56 rounded-full border border-[#a11a1a]/15" />
        <div className="absolute right-[15%] bottom-[20%] h-48 w-48 rounded-full border border-[#d4a017]/10" />
      </div>

      {/* ── Main Content ── */}
      <div className="container relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] flex-col justify-end px-4 pb-8 pt-28 sm:min-h-[760px] sm:px-6 sm:pb-14 lg:px-12">
        <div className="max-w-4xl">

          {/* Badge pill */}
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#d4a017]/30 bg-white/10 px-4 py-2 backdrop-blur-md shadow-lg shadow-black/20">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.9)]" />
            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#F6D393]">{copy.welcome}</span>
          </div>

          {/* Title — Bespoke Luxury Typography */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] drop-shadow-2xl">
            {copy.title.toLowerCase().includes('essential partner') ? (
              <>
                <span className="font-light tracking-wide text-stone-100">We are your </span>
                <span className="font-serif italic font-normal tracking-normal bg-gradient-to-r from-[#FFF0D4] via-[#F3D7A4] to-[#D4A017] bg-clip-text text-transparent drop-shadow-sm">
                  essential partner
                </span>
                <span className="block mt-1 sm:mt-2">
                  <span className="font-light text-stone-200">for </span>
                  <span className="relative inline-block font-black text-white">
                    hospitality success.
                    <span className="absolute -bottom-1.5 sm:-bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-[#d4a017] via-[#a11a1a] to-transparent rounded-full opacity-90 shadow-sm shadow-[#d4a017]/50" />
                  </span>
                </span>
              </>
            ) : (
              copy.title
            )}
          </h1>

          {/* Subtitle / Descriptive Lead with Editorial Typography */}
          <div className="mt-6 max-w-2xl">
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-8 text-stone-200/90 font-light tracking-wide drop-shadow-sm">
              {copy.subtitle.toLowerCase().includes('premier selection of beverages') ? (
                <>
                  We provide bars and restaurants with a{' '}
                  <span className="font-semibold text-white drop-shadow-sm border-b border-[#d4a017]/40 pb-0.5">
                    premier selection of beverages
                  </span>
                  ,{' '}
                  <span className="font-semibold bg-gradient-to-r from-[#FCEFD5] to-[#EED8AC] bg-clip-text text-transparent drop-shadow-sm border-b border-[#d4a017]/40 pb-0.5">
                    expert consultancy
                  </span>
                  , and{' '}
                  <span className="font-semibold text-white drop-shadow-sm border-b border-[#d4a017]/40 pb-0.5">
                    bespoke solutions
                  </span>{' '}
                  designed to elevate your brand and operations.
                </>
              ) : (
                copy.subtitle
              )}
            </p>
          </div>

          {/* Hospitality Core Pillars */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md text-xs font-semibold text-stone-200 transition-all duration-300">
              <Wine className="w-3.5 h-3.5 text-[#d4a017]" />
              Premier Beverages
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md text-xs font-semibold text-amber-200/90 transition-all duration-300">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a017]" />
              Expert Consultancy
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md text-xs font-semibold text-stone-200 transition-all duration-300">
              <Award className="w-3.5 h-3.5 text-[#d4a017]" />
              Bespoke Solutions
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link
              href={copy.primaryLink}
              className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-white via-stone-100 to-amber-50 px-8 py-4 text-sm font-black text-stone-950 shadow-2xl shadow-black/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(212,160,23,.25)] active:scale-[0.98]"
            >
              <span>{copy.primary}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-[#a11a1a]" strokeWidth={3} />
            </Link>
            {copy.secondary && (
              <Link
                href={copy.secondaryLink}
                className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200/40 hover:bg-white/20 active:scale-[0.98]"
              >
                {copy.secondary}
              </Link>
            )}
          </div>

        </div>

        {/* ── Floating bottle image (desktop) ── */}
        <div className="pointer-events-none absolute bottom-4 right-4 hidden w-[min(30vw,340px)] lg:block">
          <div className="relative aspect-[3/4]">
            {isCustomFloating ? (
              <img
                src={floatingImage}
                alt=""
                className="h-full w-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,.65)]"
              />
            ) : (
              <Image
                src={floatingImage}
                alt=""
                fill
                sizes="340px"
                className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,.65)]"
              />
            )}
            {/* Subtle glow under bottle */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-12 w-40 rounded-full bg-[#a11a1a]/20 blur-2xl" />
          </div>
        </div>

      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-white/10" />
    </section>
  );
}
