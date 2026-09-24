'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  Check, 
  ShoppingBag, 
  Megaphone,
  Wine
} from 'lucide-react';
import type { PromotionItem } from '@/lib/promotions.types';

interface PromotionDetailClientProps {
  promotion: PromotionItem;
  otherPromotions?: PromotionItem[];
}

export default function PromotionDetailClient({
  promotion,
  otherPromotions = [],
}: PromotionDetailClientProps) {
  const [copied, setCopied] = useState(false);

  const bannerImg = promotion.imageUrl || '/images/wine_banner.png';
  const isCustomUrl = typeof bannerImg === 'string' && (bannerImg.startsWith('data:') || bannerImg.startsWith('http'));

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const filteredOthers = otherPromotions.filter((p) => p.id !== promotion.id && p.isActive !== false);

  return (
    <div className="py-6 sm:py-10">
      {/* ── Breadcrumb Navigation ── */}
      <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8 flex items-center gap-2 text-xs sm:text-sm text-stone-500">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          หน้าแรก
        </Link>
        <span>/</span>
        <Link href="/#promotions" className="hover:text-stone-900 transition-colors">
          ข่าวสารและโปรโมชั่น
        </Link>
        <span>/</span>
        <span className="text-stone-900 font-semibold truncate max-w-[200px] sm:max-w-md">
          {promotion.title}
        </span>
      </nav>

      {/* ── Top Back Button ── */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-950 transition-colors group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-200/80 group-hover:bg-stone-300 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <span>กลับหน้าแรก</span>
        </Link>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-xs font-bold text-stone-700 shadow-sm hover:bg-stone-50 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-emerald-700">คัดลอกลิงก์แล้ว!</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5 text-stone-500" />
              <span>แชร์โปรโมชั่นนี้</span>
            </>
          )}
        </button>
      </div>

      {/* ── Main Promotion Detail Card ── */}
      <article className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-xl">
        {/* Banner Visual Area */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[460px] overflow-hidden bg-stone-950">
          <Image
            src={bannerImg}
            alt={promotion.title}
            fill
            priority
            unoptimized={isCustomUrl}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-center"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30" />

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2 z-10">
            {promotion.badge && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#a11a1a] px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{promotion.badge}</span>
              </span>
            )}
            {promotion.discountTag && (
              <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-black uppercase tracking-wider text-stone-950 shadow-md">
                {promotion.discountTag}
              </span>
            )}
          </div>

          {/* Validity Badge Bottom-Right */}
          {promotion.validUntil && (
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-bold text-white/90 backdrop-blur-md border border-white/10 shadow-md">
                <Clock className="h-3.5 w-3.5 text-amber-300" />
                <span>{promotion.validUntil}</span>
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 lg:p-12">
          {/* Badge & News Label */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-900/15 bg-red-950/5 px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-[#a11a1a]">
            <Megaphone className="h-3.5 w-3.5 text-[#a11a1a]" />
            <span>THE BOTTLE CLUB PROMOTION</span>
          </div>

          {/* Promotion Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight leading-tight">
            {promotion.title}
          </h1>

          {/* Promotion Subtitle */}
          {promotion.subtitle && (
            <p className="mt-3 text-base sm:text-xl font-bold text-[#a11a1a]/90">
              {promotion.subtitle}
            </p>
          )}

          {/* Divider */}
          <div className="my-6 sm:my-8 h-px w-full bg-gradient-to-r from-stone-200 via-stone-300 to-transparent" />

          {/* Promotion Description */}
          <div className="prose prose-stone max-w-none text-stone-700">
            <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
              <Wine className="h-4 w-4 text-[#a11a1a]" />
              <span>รายละเอียดโปรโมชั่นและสิทธิพิเศษ</span>
            </h3>
            <p className="text-base sm:text-lg leading-relaxed whitespace-pre-line text-stone-700">
              {promotion.description}
            </p>
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-stone-200/80">
            <Link
              href={promotion.linkUrl || '/#products'}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-[#a11a1a] px-8 py-4 text-sm sm:text-base font-black uppercase tracking-wider text-white shadow-xl shadow-red-950/20 transition-all duration-300 hover:bg-[#861414] hover:shadow-2xl active:scale-95"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>{promotion.ctaText || 'เลือกซื้อสินค้าที่ร่วมรายการ'}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-stone-300 bg-stone-100/80 px-6 py-4 text-sm font-bold text-stone-800 transition-all hover:bg-stone-200 active:scale-95"
            >
              <span>ย้อนกลับไปหน้าแรก</span>
            </Link>
          </div>
        </div>
      </article>

      {/* ── Related / Other Promotions ── */}
      {filteredOthers.length > 0 && (
        <section className="mt-14 sm:mt-20">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-950">
                ข่าวสารและโปรโมชั่นอื่นๆ
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                เลือกชมข้อเสนอพิเศษอื่นๆ จาก The Bottle Club
              </p>
            </div>
            <Link
              href="/#promotions"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#a11a1a] hover:underline"
            >
              <span>ดูทั้งหมด</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOthers.map((item) => {
              const itemImg = item.imageUrl || '/images/wine_banner.png';
              return (
                <div
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
                    <Image
                      src={itemImg}
                      alt={item.title}
                      fill
                      unoptimized={typeof itemImg === 'string' && (itemImg.startsWith('data:') || itemImg.startsWith('http'))}
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-[#a11a1a] px-2.5 py-1 text-[10px] font-black uppercase text-white shadow">
                        {item.badge || 'PROMO'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      {item.discountTag && (
                        <span className="text-[11px] font-extrabold text-amber-600 block mb-1">
                          {item.discountTag}
                        </span>
                      )}
                      <h3 className="text-base font-black text-stone-950 line-clamp-1 group-hover:text-[#a11a1a] transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                      {item.validUntil ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-stone-400">
                          <Clock className="h-3 w-3" />
                          <span>{item.validUntil}</span>
                        </span>
                      ) : <span />}

                      <Link
                        href={`/promotions/${item.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#a11a1a] group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>ดูรายละเอียด</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
