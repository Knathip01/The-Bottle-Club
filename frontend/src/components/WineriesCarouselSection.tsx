'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Shield, Star } from 'lucide-react';
import { WINERIES_DATA, type Winery } from '@/data/wineriesData';

// Featured Wineries matching user's requested order and premier global estates
const FEATURED_SLUGS = [
  'cantine-volpi',
  'fontezoppa',
  'san-marzano',
  'vina-loriente',
  'chateau-cheval-blanc',
  'moet-chandon',
  'veuve-clicquot',
  'cakebread',
  'bodegas-muga',
  'tenuta-luce',
  'gut-hermannsberg',
];

// Vivino Partner Badge Shield-Check SVG Component matching site standard
function PartnerVerifiedBadge() {
  const rawId = React.useId();
  const gradId = 'badgeGrad_' + rawId.replace(/:/g, '_');
  return (
    <span className="inline-flex items-center shrink-0" title="Verified Partner Winery">
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z"
          fill={`url(#${gradId})`}
        />
        <defs>
          <linearGradient id={gradId} x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EE803E" />
            <stop offset="1" stopColor="#BA1628" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

const COUNTRY_FLAGS: Record<string, string> = {
  it: '🇮🇹',
  Italy: '🇮🇹',
  fr: '🇫🇷',
  France: '🇫🇷',
  us: '🇺🇸',
  'United States': '🇺🇸',
  es: '🇪🇸',
  Spain: '🇪🇸',
  de: '🇩🇪',
  Germany: '🇩🇪',
  au: '🇦🇺',
  Australia: '🇦🇺',
};

export default function WineriesCarouselSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Retrieve featured wineries
  const featuredWineries: Winery[] = FEATURED_SLUGS.map((slug) =>
    WINERIES_DATA.find((w) => w.seo_name === slug)
  ).filter((w): w is Winery => Boolean(w));

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 20);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 370;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full bg-[#faf9f8] py-12 md:py-16 border-t border-b border-stone-200/80">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching requested UI */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Discover wineries around the world
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-stone-600">
              Looking for a winery or planning a wine escape? Let us help you find the perfect spot.
            </p>
          </div>

          <Link
            href="/wineries"
            className="self-start sm:self-center px-7 py-2 rounded-full border border-stone-800 text-stone-900 font-semibold text-sm hover:bg-stone-900 hover:text-white transition-all shadow-xs shrink-0 cursor-pointer"
          >
            Discover
          </Link>
        </div>

        {/* Carousel Slider */}
        <div className="relative group">
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Previous wineries"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-stone-200/90 shadow-lg flex items-center justify-center text-stone-800 hover:bg-stone-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 text-stone-700" />
            </button>
          )}

          {/* Cards Track */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredWineries.map((winery) => {
              const flag = COUNTRY_FLAGS[winery.country_code?.toLowerCase()] || COUNTRY_FLAGS[winery.country_name] || '🍷';
              const displayLocation = winery.region_name || winery.address?.city || winery.country_name;

              return (
                <div
                  key={winery.id}
                  className="w-[310px] sm:w-[350px] shrink-0 rounded-2xl border border-stone-200/80 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <Link
                    href={`/wineries/${winery.seo_name}`}
                    className="block group/card flex-1 flex flex-col"
                  >
                    {/* Cover Image & Overlapping Circular Logo */}
                    <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                      <img
                        src={winery.cover_image || 'https://thumbs.vivino.com/region_backgrounds/LDuFJnFPQCShMdQFFILd0g_600x356.jpg'}
                        alt={winery.name}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Circular Winery Logo Badge */}
                      <div className="absolute top-3 left-3 w-13 h-13 rounded-full bg-white border border-stone-200/80 shadow-md flex items-center justify-center overflow-hidden p-1.5 z-10">
                        {winery.logo_image ? (
                          <img
                            src={winery.logo_image}
                            alt={`${winery.name} logo`}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <Shield className="w-6 h-6 text-stone-700" />
                        )}
                      </div>
                    </div>

                    {/* Winery Card Information */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
                      <div>
                        {/* Name + Verified Partner Badge */}
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-base sm:text-[17px] text-stone-900 group-hover/card:text-[#ba1628] transition-colors truncate">
                            {winery.name}
                          </h3>
                          <PartnerVerifiedBadge />
                        </div>

                        {/* Country Flag & Link */}
                        <div
                          className="mt-1 flex items-center gap-1.5 text-xs text-stone-500 font-medium hover:underline hover:text-[#ba1628] cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = `/product?country=${encodeURIComponent(winery.country_name)}`;
                          }}
                        >
                          <span className="text-sm leading-none">{flag}</span>
                          <span className="truncate">{winery.country_name}</span>
                        </div>

                        {/* Wines count */}
                        <p className="mt-2 text-xs font-bold text-stone-900">
                          {winery.wines_count} Wines
                        </p>

                        {/* Rating & Ratings count */}
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-700">
                          <span className="inline-flex items-center gap-0.5 font-bold text-stone-900">
                            <Star className="w-3.5 h-3.5 fill-stone-900 text-stone-900" />
                            {winery.ratings_average.toFixed(1)}
                          </span>
                          <span className="text-stone-500">
                            {winery.ratings_count.toLocaleString()} total ratings
                          </span>
                        </div>
                      </div>

                      {/* CTA Button: Discover the Winery */}
                      <div className="mt-2 pt-2 border-t border-stone-100">
                        <div className="w-full py-2.5 px-4 rounded-full bg-[#1e1e1e] group-hover/card:bg-black text-white text-xs font-bold text-center transition-colors shadow-xs">
                          Discover the Winery
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Next wineries"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-stone-200/90 shadow-lg flex items-center justify-center text-stone-800 hover:bg-stone-50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 text-stone-700" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
