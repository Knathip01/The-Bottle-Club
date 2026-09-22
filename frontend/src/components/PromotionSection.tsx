'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Clock, Tag, ChevronRight, Wine, Gift } from 'lucide-react';

export interface PromotionItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  badge: string;
  discountTag?: string;
  validUntil?: string;
  linkUrl: string;
  ctaText: string;
  isFeatured?: boolean;
}

/**
 * กำหนดข้อมูลรูปภาพและรายละเอียดโปรโมชั่น (สามารถแก้ไขหรือใส่รูปภาพโปรโมทเพิ่มเติมได้ที่นี่)
 * Easily configure or add your promotional images and campaigns here
 */
export const DEFAULT_PROMOTIONS: PromotionItem[] = [
  {
    id: 'grand-cru-2026',
    title: 'GRAND CRU & VINTAGE SELECTION',
    subtitle: 'คอลเลกชันไวน์วินเทจระดับพรีเมียม',
    description: 'สิทธิพิเศษสำหรับสมาชิก The Bottle Club รับส่วนลดสูงสุด 30% สำหรับไวน์คอลเลกชัน Grand Cru คัดสรรพิเศษ พร้อมบริการจัดส่งควบคุมอุณหภูมิฟรี',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1600&auto=format&fit=crop',
    badge: 'FEATURED PROMOTION',
    discountTag: 'UP TO 30% OFF',
    validUntil: 'จำกัดเวลาสิทธิพิเศษ',
    linkUrl: '/#products',
    ctaText: 'ดูสินค้าโปรโมชั่น',
    isFeatured: true,
  },
  {
    id: 'welcome-privilege',
    title: 'Welcome Member Bonus',
    subtitle: 'สิทธิพิเศษต้อนรับสมาชิกใหม่',
    description: 'สมัครสมาชิกวันนี้ รับโค้ดส่วนลด 500 บาท ทันทีเมื่อมียอดสั่งซื้อไวน์ครั้งแรกตั้งแต่ 2,500 บาทขึ้นไป',
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop',
    badge: 'NEW MEMBER',
    discountTag: 'ลดทันที 500฿',
    validUntil: 'สำหรับสมาชิกใหม่',
    linkUrl: '/register',
    ctaText: 'สมัครรับสิทธิ์',
  },
  {
    id: 'sommelier-pairings',
    title: 'Sommelier Curated Sets',
    subtitle: 'ชุดเซ็ตไวน์จับคู่อาหารค่ำ',
    description: 'แพ็กเกจไวน์นำเข้าจับคู่จานโปรด คัดสรรโดยซอมเมอลิเยร์มืออาชีพ ให้คุณเพลิดเพลินกับมื้อค่ำสุดหรูที่บ้าน',
    imageUrl: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?q=80&w=800&auto=format&fit=crop',
    badge: 'CURATED BUNDLE',
    discountTag: 'BUY 2 GET 10%',
    validUntil: 'มีจำนวนจำกัด',
    linkUrl: '/#products',
    ctaText: 'เลือกดูเซ็ตไวน์',
  },
  {
    id: 'cold-chain-express',
    title: 'Cold-Chain Express Delivery',
    subtitle: 'จัดส่งด่วนแบบควบคุมอุณหภูมิ',
    description: 'รักษามาตรฐานและรสชาติไวน์ทุกขวดด้วยรถห้องเย็นพิเศษ จัดส่งฟรีทั่วกรุงเทพฯ และปริมณฑลเมื่อช้อปครบ 3,000 บาท',
    imageUrl: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?q=80&w=800&auto=format&fit=crop',
    badge: 'COMPLIMENTARY',
    discountTag: 'FREE SHIPPING',
    validUntil: 'ทุกวันไม่มีวันหยุด',
    linkUrl: '/#products',
    ctaText: 'สั่งซื้อเลย',
  },
];

interface PromotionSectionProps {
  promotions?: PromotionItem[];
  title?: string;
  subtitle?: string;
}

export default function PromotionSection({
  promotions = DEFAULT_PROMOTIONS,
  title = 'โปรโมชั่นพิเศษและดีลคัดสรร',
  subtitle = 'ค้นพบข้อเสนอสุดเอ็กซ์คลูซีฟสำหรับสมาชิก The Bottle Club ไวน์และเครื่องดื่มนำเข้าราคาพิเศษพร้อมบริการระดับพรีเมียม',
}: PromotionSectionProps) {
  const featuredPromo = promotions.find((p) => p.isFeatured) || promotions[0];
  const subPromos = promotions.filter((p) => p.id !== featuredPromo?.id);

  return (
    <section className="bg-stone-100/80 py-16 md:py-24 border-t border-stone-200/80" id="promotions">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="mb-10 md:mb-14 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-900/15 bg-red-950/5 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-[#a11a1a] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#a11a1a]" />
            <span>EXCLUSIVE OFFERS & PROMOTIONS</span>
          </div>

          <h2 className="text-3xl font-black tracking-normal text-stone-950 md:text-5xl">
            {title}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-stone-600 md:text-base">
            {subtitle}
          </p>
        </div>

        {/* MAIN FEATURED PROMOTION BANNER */}
        {featuredPromo && (
          <div className="mb-8 md:mb-10">
            <div className="group relative min-h-[380px] sm:min-h-[420px] md:min-h-[460px] overflow-hidden rounded-[2rem] border border-stone-900/10 bg-stone-950 shadow-2xl transition-all duration-500">
              
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={featuredPromo.imageUrl}
                  alt={featuredPromo.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Gradient Overlays for optimal text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/30 md:bg-gradient-to-r md:from-stone-950/95 md:via-stone-950/75 md:to-stone-950/20" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(161,26,26,0.25),transparent_60%)]" />
              </div>

              {/* Banner Content */}
              <div className="relative z-10 flex h-full min-h-[380px] sm:min-h-[420px] md:min-h-[460px] flex-col justify-end p-6 sm:p-10 md:p-14 lg:max-w-3xl">
                
                {/* Badges */}
                <div className="mb-4 flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md">
                    <Tag className="h-3 w-3" />
                    {featuredPromo.badge}
                  </span>

                  {featuredPromo.discountTag && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#a11a1a] px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-lg shadow-red-950/50">
                      <Gift className="h-3 w-3" />
                      {featuredPromo.discountTag}
                    </span>
                  )}

                  {featuredPromo.validUntil && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-300">
                      <Clock className="h-3 w-3 text-stone-400" />
                      {featuredPromo.validUntil}
                    </span>
                  )}
                </div>

                {/* Headline */}
                <h3 className="text-2xl font-black leading-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
                  {featuredPromo.title}
                </h3>

                {featuredPromo.subtitle && (
                  <p className="mt-2 text-sm font-bold uppercase tracking-widest text-amber-200/90 sm:text-base">
                    {featuredPromo.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-200 sm:text-base">
                  {featuredPromo.description}
                </p>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3.5">
                  <Link
                    href={featuredPromo.linkUrl}
                    className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-stone-950 shadow-xl transition-all duration-300 hover:bg-stone-100 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>{featuredPromo.ctaText}</span>
                    <ArrowRight className="h-4 w-4 text-[#a11a1a]" strokeWidth={2.8} />
                  </Link>

                  <Link
                    href="/#products"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white/20 hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>เลือกดูไวน์ทั้งหมด</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECONDARY PROMOTIONS GRID (3 CARDS) */}
        {subPromos.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subPromos.map((promo) => (
              <div
                key={promo.id}
                className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-stone-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Promo Card Image */}
                <Link href={promo.linkUrl} className="relative block aspect-[16/10] overflow-hidden bg-stone-900">
                  <Image
                    src={promo.imageUrl}
                    alt={promo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges on Image */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-stone-900/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {promo.badge}
                    </span>

                    {promo.discountTag && (
                      <span className="rounded-full bg-[#a11a1a] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                        {promo.discountTag}
                      </span>
                    )}
                  </div>

                  {/* Validity on bottom of image */}
                  {promo.validUntil && (
                    <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-[11px] font-medium text-stone-300">
                      <Clock className="h-3 w-3 text-stone-400" />
                      <span>{promo.validUntil}</span>
                    </div>
                  )}
                </Link>

                {/* Promo Card Body */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {promo.subtitle && (
                    <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#a11a1a]">
                      {promo.subtitle}
                    </span>
                  )}

                  <Link href={promo.linkUrl} className="group/title block">
                    <h4 className="text-lg font-extrabold text-stone-950 transition-colors group-hover/title:text-[#a11a1a] line-clamp-1">
                      {promo.title}
                    </h4>
                  </Link>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-600 line-clamp-2">
                    {promo.description}
                  </p>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-stone-100">
                    <Link
                      href={promo.linkUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#a11a1a] transition-all hover:text-red-800 hover:gap-2.5"
                    >
                      <span>{promo.ctaText}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    <div className="flex items-center text-stone-300">
                      <Wine className="h-4 w-4 text-stone-400/80" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
