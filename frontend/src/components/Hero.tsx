'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Clock3, ShieldCheck, Sparkles, Star, Users, Award } from 'lucide-react';
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

  const stats = [
    { value: '500+', label: t('hero.stats.items'), icon: Award },
    { value: '50+',  label: t('hero.stats.brands'), icon: Star },
    { value: '10K+', label: t('hero.stats.customers'), icon: Users },
  ];

  const serviceBadges = [
    { label: t('hero.service.delivery'), icon: Clock3 },
    { label: t('hero.service.curated'), icon: Sparkles },
    { label: t('hero.service.secure'), icon: ShieldCheck },
  ];

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
        <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(0,0,0,.82)_0%,rgba(0,0,0,.55)_45%,rgba(0,0,0,.75)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,.2)_0%,transparent_35%,rgba(12,10,9,.7)_100%)]" />
        {/* Warm burgundy radial accent */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 55% at 70% 40%, rgba(120,20,20,.18) 0%, transparent 70%)' }} />
        {/* Ground fade to page bg */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-stone-50 to-transparent" />
      </div>

      {/* ── Decorative floating rings (background) ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full border border-white/5" />
        <div className="absolute -left-24 top-4 h-56 w-56 rounded-full border border-[#a11a1a]/10" />
        <div className="absolute right-[15%] bottom-[20%] h-48 w-48 rounded-full border border-white/5" />
      </div>

      {/* ── Main Content ── */}
      <div className="container relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] flex-col justify-end px-4 pb-8 pt-28 sm:min-h-[760px] sm:px-6 sm:pb-14 lg:px-12">
        <div className="max-w-3xl">

          {/* Badge pill */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.9)]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/85">{copy.welcome}</span>
          </div>

          {/* Title — editorial style with accent word */}
          <h1 className="max-w-[20ch] text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {copy.title}
          </h1>

          {/* Decorative gold rule */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-[#d4a017] to-[#a11a1a]" />
            <div className="h-1 w-1 rounded-full bg-[#d4a017]/70" />
          </div>

          {/* Subtitle */}
          <p className="mt-5 max-w-2xl text-sm leading-7 text-stone-200/80 sm:text-base sm:leading-8 font-light">
            {copy.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={copy.primaryLink}
              className="group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-2xl bg-white px-7 py-3.5 text-sm font-extrabold text-stone-950 shadow-2xl shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-50 hover:shadow-[0_20px_40px_rgba(255,255,255,.15)] active:scale-[0.98]"
            >
              {copy.primary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.8} />
            </Link>
            {copy.secondary && (
              <Link
                href={copy.secondaryLink}
                className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-white/20 bg-white/8 px-7 py-3.5 text-sm font-bold text-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/15 active:scale-[0.98]"
              >
                {copy.secondary}
              </Link>
            )}
          </div>

          {/* ── Stats Row ── */}
          <div className="mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.value} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                    <Icon className="h-4 w-4 text-[#d4a017]" strokeWidth={2} />
                  </div>
                  <div>
                    <strong className="block text-xl font-black text-white leading-none">{stat.value}</strong>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-400">{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Service Badges ── */}
          <div className="mt-6 flex flex-wrap gap-2">
            {serviceBadges.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/8 px-3.5 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-[#d4a017]" strokeWidth={2.5} />
                  {item.label}
                </div>
              );
            })}
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
