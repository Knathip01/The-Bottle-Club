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

  useEffect(() => {
    if (initialHeroPromo !== undefined) setPromo(initialHeroPromo);
  }, [initialHeroPromo]);

  useEffect(() => {
    async function loadPromotions() {
      try {
        const res = await fetch('/api/promotions', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            const featured = json.data.find((p: PromotionItem) => p.isFeatured && p.isActive !== false);
            if (featured) setPromo(featured);
          }
        }
      } catch { /* keep current */ }
    }
    loadPromotions();
  }, []);

  const copy = {
    welcome:      promo?.badge        || t('hero.welcome'),
    title:        promo?.title        || t('hero.title'),
    subtitle:     promo?.subtitle     || promo?.description || t('hero.subtitle'),
    primary:      promo?.ctaText      || t('hero.cta_all'),
    primaryLink:  promo?.linkUrl      || '#products',
    secondary:    promo?.secondaryCtaText   || t('hero.cta_more'),
    secondaryLink:promo?.secondaryLinkUrl   || '#wine-categories',
  };

  const bgImage       = promo?.imageUrl || (promo?.images?.[0] ?? null) || '/images/wine_banner.png';
  const isCustomBg    = typeof bgImage === 'string' && (bgImage.startsWith('data:') || bgImage.startsWith('http'));
  const floatingImage = promo?.heroImageUrl || (promo?.images?.[1] ?? null) || '/images/wine_hero.png';
  const isCustomFloat = typeof floatingImage === 'string' && (floatingImage.startsWith('data:') || floatingImage.startsWith('http'));

  const stats = [
    { value: '500+', label: t('hero.stats.items'),     icon: Award },
    { value: '50+',  label: t('hero.stats.brands'),    icon: Star  },
    { value: '10K+', label: t('hero.stats.customers'), icon: Users },
  ];

  const serviceBadges = [
    { label: t('hero.service.delivery'), icon: Clock3     },
    { label: t('hero.service.curated'),  icon: Sparkles   },
    { label: t('hero.service.secure'),   icon: ShieldCheck},
  ];

  /* Split title into 3 lines for word-level styling (only if default, no promo override) */
  const isTitleDefault = !promo?.title;
  const titleWords = copy.title.split(' ');

  return (
    <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-stone-950 text-white sm:min-h-[760px]">

      {/* ── keyframe styles ─────────────────────────────── */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes goldShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center;  }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .hero-badge     { animation: heroFadeIn  0.7s ease both; }
        .hero-title     { animation: heroFadeUp  0.9s ease 0.15s both; }
        .hero-rule      { animation: lineGrow    0.8s ease 0.5s both; transform-origin: left; }
        .hero-subtitle  { animation: heroFadeUp  0.9s ease 0.35s both; }
        .hero-ctas      { animation: heroFadeUp  0.9s ease 0.55s both; }
        .hero-stats     { animation: heroFadeUp  0.9s ease 0.65s both; }
        .hero-badges    { animation: heroFadeUp  0.9s ease 0.75s both; }
        .gold-shimmer {
          background: linear-gradient(90deg, #e2b96e 0%, #fff3c0 35%, #d4a017 60%, #e2b96e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldShimmer 5s linear infinite;
        }
        .title-line-accent {
          position: relative;
          display: inline-block;
        }
        .title-line-accent::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          right: 0;
          height: 3px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #d4a017, #a11a1a);
          opacity: 0.7;
        }
      `}</style>

      {/* ── Background ─────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {isCustomBg ? (
          <img src={bgImage} alt={copy.title} className="h-full w-full object-cover object-[58%_center]" />
        ) : (
          <Image src={bgImage} alt="The Bottle Club wine selection" fill priority sizes="100vw" className="object-cover object-[58%_center]" />
        )}
        {/* Cinematic gradient layers */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,.88)_0%,rgba(0,0,0,.55)_50%,rgba(0,0,0,.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,8,.15)_0%,transparent_30%,rgba(10,8,8,.65)_100%)]" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 50% at 68% 38%, rgba(120,18,18,.22) 0%, transparent 65%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-stone-50 to-transparent" />
      </div>

      {/* ── Decorative rings ──────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-40 top-20 h-[480px] w-[480px] rounded-full border border-white/[0.04]" />
        <div className="absolute -left-20 top-8  h-[320px] w-[320px] rounded-full border border-[#d4a017]/[0.06]" />
        <div className="absolute right-[10%] bottom-[18%] h-[280px] w-[280px] rounded-full border border-white/[0.03]" />
      </div>

      {/* ── Content ──────────────────────────────────── */}
      <div className="container relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] flex-col justify-end px-4 pb-8 pt-28 sm:min-h-[760px] sm:px-6 sm:pb-14 lg:px-12">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="hero-badge mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.9)]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/80">{copy.welcome}</span>
          </div>

          {/* ── Hero Title — editorial large type ────── */}
          <h1 className="hero-title">
            {isTitleDefault ? (
              /* Styled word-by-word for default titles */
              <span className="block">
                {/* Line 1: first ~2 words normal */}
                <span className="block text-[clamp(2.4rem,7vw,5.5rem)] font-black leading-[0.9] tracking-tight text-white/95 drop-shadow-lg">
                  {titleWords.slice(0, 2).join(' ')}
                </span>
                {/* Line 2: middle word(s) — gold shimmer accent */}
                {titleWords.length > 2 && (
                  <span className="block text-[clamp(2.4rem,7vw,5.5rem)] font-black leading-[0.9] tracking-tight">
                    <span className="gold-shimmer">{titleWords.slice(2, 4).join(' ')}</span>
                  </span>
                )}
                {/* Line 3: last word(s) — italic serif overlay */}
                {titleWords.length > 4 && (
                  <span className="title-line-accent block text-[clamp(2.4rem,7vw,5.5rem)] font-black leading-[0.9] tracking-tight text-white/90 font-serif italic">
                    {titleWords.slice(4).join(' ')}
                  </span>
                )}
              </span>
            ) : (
              /* Plain title for promo overrides */
              <span className="block text-[clamp(2.4rem,7vw,5.5rem)] font-black leading-[0.92] tracking-tight text-white drop-shadow-lg">
                {copy.title}
              </span>
            )}
          </h1>

          {/* Decorative ruled line */}
          <div className="hero-rule mt-6 flex items-center gap-3">
            <div className="h-[2px] w-14 origin-left bg-gradient-to-r from-[#d4a017] via-[#c4870e] to-[#a11a1a] rounded-full" />
            <div className="h-1 w-1 rounded-full bg-[#d4a017]" />
            <div className="h-px w-6 bg-white/20 rounded-full" />
          </div>

          {/* ── Subtitle — hospitality brand message ── */}
          <div className="hero-subtitle mt-6 max-w-2xl">
            {/* Subtle label above */}
            <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-[#d4a017]/80">
              Our Promise
            </span>
            <p className="text-sm font-light leading-[1.85] text-stone-200/75 sm:text-base sm:leading-[1.9]">
              {copy.subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="hero-ctas mt-8 flex flex-wrap gap-3">
            <Link
              href={copy.primaryLink}
              className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-2xl bg-white px-7 py-3 text-sm font-extrabold text-stone-950 shadow-2xl shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-50 hover:shadow-[0_20px_40px_rgba(255,255,255,.12)] active:scale-[0.98]"
            >
              {copy.primary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.8} />
            </Link>
            {copy.secondary && (
              <Link
                href={copy.secondaryLink}
                className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-white/20 bg-white/8 px-7 py-3 text-sm font-bold text-white/85 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/15 active:scale-[0.98]"
              >
                {copy.secondary}
              </Link>
            )}
          </div>

          {/* Stats row */}
          <div className="hero-stats mt-10 flex flex-wrap gap-8 border-t border-white/10 pt-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.value} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8 backdrop-blur-sm ring-1 ring-white/10">
                    <Icon className="h-4 w-4 text-[#d4a017]" strokeWidth={2} />
                  </div>
                  <div>
                    <strong className="block text-xl font-black text-white leading-none">{stat.value}</strong>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Service badges */}
          <div className="hero-badges mt-5 flex flex-wrap gap-2">
            {serviceBadges.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/6 px-3.5 py-2 text-xs font-semibold text-white/75 backdrop-blur-sm">
                  <Icon className="h-3.5 w-3.5 text-[#d4a017]" strokeWidth={2.5} />
                  {item.label}
                </div>
              );
            })}
          </div>

        </div>

        {/* Floating bottle */}
        <div className="pointer-events-none absolute bottom-4 right-4 hidden w-[min(30vw,330px)] lg:block">
          <div className="relative aspect-[3/4]">
            {isCustomFloat ? (
              <img src={floatingImage} alt="" className="h-full w-full object-contain drop-shadow-[0_40px_70px_rgba(0,0,0,.7)]" />
            ) : (
              <Image src={floatingImage} alt="" fill sizes="330px" className="object-contain drop-shadow-[0_40px_70px_rgba(0,0,0,.7)]" />
            )}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-10 w-36 rounded-full bg-[#a11a1a]/25 blur-2xl" />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-white/10" />
    </section>
  );
}
