'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ExternalLink, Globe, Phone, Mail, Mountain } from 'lucide-react';

// Vivino Verified Partner Badge with gradient shield
function VerifiedPartnerBadge() {
  const rawId = React.useId();
  const gradId = 'badgeGrad_' + rawId.replace(/:/g, '_');
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={gradId} x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EE803E" />
              <stop offset="1" stopColor="#BA1628" />
            </linearGradient>
          </defs>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z"
            fill={`url(#${gradId})`}
          />
        </svg>
      </div>
      <span className="text-[14px] sm:text-[15px] font-semibold text-[#1e1e1e]">Verified Partner Winery</span>
    </div>
  );
}

// X (formerly Twitter) SVG Icon
function XIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Facebook SVG Icon
function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

// Winemaker Icon (fingerprint/target concentric circles)
function WinemakerIcon({ className = 'w-5 h-5 text-stone-700' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Estate / Winery Building Icon
function EstateBuildingIcon({ className = 'w-5 h-5 text-stone-700' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path
        d="M3 9.783c0-.288 0-.431.037-.563a1 1 0 0 1 .159-.326c.082-.11.195-.198.422-.374l7.4-5.756c.351-.273.527-.41.72-.462a1 1 0 0 1 .523 0c.194.052.37.189.721.462l7.4 5.756c.227.176.34.264.422.374a1 1 0 0 1 .159.326c.037.132.037.275.037.563V19.4c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437C20.24 21 19.96 21 19.4 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C3 20.24 3 19.96 3 19.4V9.783Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function VeuveClicquotWineryContent() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1e1e1e] font-sans antialiased pb-24">
      {/* Main Container */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ── 2-Column Responsive Layout (matching Vivino screenshot) ──────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT SIDEBAR (4 cols on lg) ─────────────────────────────────── */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Main Profile Info Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-sm space-y-5">
              
              {/* Circular Winery Logo */}
              <div className="w-[88px] h-[88px] rounded-full border border-stone-200 p-1 bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <Image
                  src="https://images.vivino.com/wineries/7979/logos/Fqk2nRSQQdWndGLOuMbLbw.jpeg"
                  alt="Veuve Clicquot"
                  width={80}
                  height={80}
                  className="rounded-full object-contain"
                  unoptimized
                  priority
                />
              </div>

              {/* Title & Badges */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1e1e1e] tracking-tight">
                  Veuve Clicquot
                </h1>

                {/* Verified Partner Winery */}
                <VerifiedPartnerBadge />

                {/* Stats */}
                <div className="flex items-center gap-3 pt-1 text-sm text-[#1e1e1e]">
                  <p className="font-semibold text-stone-700">
                    <strong className="text-stone-900 font-extrabold">41</strong> Wines
                  </p>
                  <span className="text-stone-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <Star size={16} className="fill-[#e1a100] text-[#e1a100]" />
                    <strong className="font-extrabold text-[#1e1e1e]">4.3</strong>
                    <span className="text-stone-500 text-xs">269,028 total ratings</span>
                  </div>
                </div>
              </div>

              {/* View Wines Button */}
              <Link
                href="/search?q=Veuve+Clicquot"
                className="w-full py-3 px-6 rounded-full bg-[#1e1e1e] text-white font-bold text-sm hover:bg-black transition-all shadow-sm hover:shadow active:scale-[0.98] cursor-pointer text-center block"
              >
                View wines
              </Link>

              {/* Info Box: Country, Region, Winemaker, Owned by */}
              <div className="rounded-2xl border border-stone-200 bg-white divide-y divide-stone-200/80 overflow-hidden">
                
                {/* Country */}
                <div className="p-3.5 flex items-center gap-3.5">
                  <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center shadow-xs shrink-0">
                    <img
                      src="https://flagcdn.com/w40/fr.png"
                      alt="France"
                      className="w-full h-full object-cover"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                      Country
                    </span>
                    <a
                      href="https://www.vivino.com/en/explore/countries/france"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#1e1e1e] hover:text-[#BA1628] underline underline-offset-2"
                    >
                      France
                    </a>
                  </div>
                </div>

                {/* Region */}
                <div className="p-3.5 flex items-center gap-3.5">
                  <div className="w-6 h-6 rounded flex items-center justify-center text-stone-700 shrink-0">
                    <Mountain size={20} className="text-[#1e1e1e]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                      Region
                    </span>
                    <a
                      href="https://www.vivino.com/en/explore/regions/champagne"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#1e1e1e] hover:text-[#BA1628] underline underline-offset-2"
                    >
                      Champagne
                    </a>
                  </div>
                </div>

                {/* Winemaker */}
                <div className="p-3.5 flex items-center gap-3.5">
                  <div className="w-6 h-6 rounded flex items-center justify-center text-stone-700 shrink-0">
                    <WinemakerIcon className="w-5 h-5 text-[#1e1e1e]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                      Winemaker
                    </span>
                    <span className="text-sm font-semibold text-[#1e1e1e]">
                      Veuve Clicquot Ponsardin
                    </span>
                  </div>
                </div>

                {/* Owned by */}
                <div className="p-3.5 flex items-center gap-3.5">
                  <div className="w-6 h-6 rounded flex items-center justify-center text-stone-700 shrink-0">
                    <EstateBuildingIcon className="w-5 h-5 text-[#1e1e1e]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                      Owned by
                    </span>
                    <span className="text-sm font-semibold text-[#1e1e1e]">
                      Moët Hennessy
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Social & Contact Box */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-sm">
              <div className="rounded-2xl border border-stone-200 divide-y divide-stone-200/80 overflow-hidden">
                
                {/* Website */}
                <a
                  href="http://www.veuve-clicquot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <Globe size={18} className="text-[#1e1e1e]" />
                    <span className="text-sm font-semibold text-[#1e1e1e] group-hover:text-[#BA1628] transition-colors">
                      Website
                    </span>
                  </div>
                  <ExternalLink size={14} className="text-stone-400 group-hover:text-stone-600 transition-colors" />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/veuveclicquot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <FacebookIcon className="w-[18px] h-[18px] text-[#1e1e1e]" />
                    <span className="text-sm font-semibold text-[#1e1e1e] group-hover:text-[#BA1628] transition-colors">
                      Facebook
                    </span>
                  </div>
                  <ExternalLink size={14} className="text-stone-400 group-hover:text-stone-600 transition-colors" />
                </a>

                {/* X */}
                <a
                  href="https://x.com/VeuveClicquot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <XIcon className="w-[17px] h-[17px] text-[#1e1e1e]" />
                    <span className="text-sm font-semibold text-[#1e1e1e] group-hover:text-[#BA1628] transition-colors">
                      X
                    </span>
                  </div>
                  <ExternalLink size={14} className="text-stone-400 group-hover:text-stone-600 transition-colors" />
                </a>

                {/* Phone */}
                <a
                  href="tel:330326895390"
                  className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <Phone size={18} className="text-[#1e1e1e]" />
                    <span className="text-sm font-semibold text-[#1e1e1e] group-hover:text-[#BA1628] transition-colors">
                      33 03 2689 5390
                    </span>
                  </div>
                </a>

                {/* Winery Email */}
                <a
                  href="mailto:visitscenter@veuve-clicquot.fr"
                  className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <Mail size={18} className="text-[#1e1e1e]" />
                    <span className="text-sm font-semibold text-[#1e1e1e] group-hover:text-[#BA1628] transition-colors">
                      Winery Email
                    </span>
                  </div>
                </a>

              </div>
            </div>

          </aside>

          {/* ── RIGHT COLUMN (8 cols on lg): Story & Gallery ────────────────── */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Story Card Container */}
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
              
              {/* Top Hero Photo (Grapes hanging on the vine) */}
              <div className="relative w-full h-[280px] sm:h-[350px] bg-stone-100 overflow-hidden">
                <Image
                  src="https://thumbs.vivino.com/wineries/sponsorship_cards/Uv-zI2ykSJScWG8jgIIoPA_2560x1520.jpeg"
                  alt="Veuve Clicquot Champagne Grapes"
                  fill
                  priority
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Story Content Area */}
              <article className="p-6 sm:p-9 space-y-7">
                
                {/* 1. EXPERT WINEMAKERS */}
                <div className="space-y-3">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1e1e1e]">
                    EXPERT WINEMAKERS
                  </h2>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#1e1e1e]">
                    Around 100 winegrowers have mastered the different facets of grape growing and production. Over the course of the year, they may be bolstered by additional seasonal workers and, at harvest time, by over 1,000 harvest workers who come to help pick grapes.
                  </p>
                </div>

                {/* Photo 1: Vineyard hills with road */}
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                  <img
                    src="https://images.vivino.com/misc/sponsorships/7979_veuveclicquot/7979_veuveclicquot_1_2560x1520.jpeg"
                    alt="Veuve Clicquot vineyard hills and road"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 2. AN EXCELLENT TERROIR */}
                <div className="space-y-3">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1e1e1e]">
                    AN EXCELLENT TERROIR
                  </h2>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#1e1e1e]">
                    Spread over a landscape of hills, the Veuve Clicquot vineyards are in an optimal position to catch the sun’s rays. These zones are defined according to key criteria from the AOC, delineating sun exposure, sloping, soil, and subsoil. A north-facing position leaves the vines exposed to variations in climate such as frosts in winter or spring, causing unfertilized grapes or grape drop; however, it can also result in moderate rainfall and temperatures, with temperate summer and autumn seasons.
                  </p>
                </div>

                {/* Photo 2: Milestone marker with anchor and Veuve Clicquot */}
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                  <img
                    src="https://images.vivino.com/misc/sponsorships/7979_veuveclicquot/7979_veuveclicquot_2_2560x1520.jpeg"
                    alt="Veuve Clicquot milestone marker"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 3. ADAPTED PLANTS */}
                <div className="space-y-3">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1e1e1e]">
                    ADAPTED PLANTS
                  </h2>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#1e1e1e]">
                    The vines are selected for their quality rather than volume of production. They are also chosen to ensure a harmonious blend between the three varietals (Chardonnay, Pinot Noir, and Pinot Meunier) as well as the different terroirs of the vineyards.
                  </p>
                </div>

                {/* Photo 3: Ripe purple grapes with vine leaves */}
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                  <img
                    src="https://images.vivino.com/misc/sponsorships/7979_veuveclicquot/7979_veuveclicquot_3_2560x1520.jpg"
                    alt="Veuve Clicquot dark purple grapes on vine"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 4. A CEASELESS VIGILANCE */}
                <div className="space-y-3">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1e1e1e]">
                    A CEASELESS VIGILANCE
                  </h2>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#1e1e1e]">
                    Cutting, binding, maintaining soil, and fighting disease — the vines demand a lot of time and attention. A vine has an average lifespan of 40 years, and according to its age often requires different treatment. One hectare of vineyard requires 380 to 420 hours of work per year, without counting the intense work of harvesting. Throughout the year, work is carried out as part of sustainable viticulture, respecting the terroir, the environment, Mother Nature, and the safety and security of the staff.
                  </p>
                </div>

                {/* Photo 4: Rolling hills and vineyards */}
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                  <img
                    src="https://images.vivino.com/misc/sponsorships/7979_veuveclicquot/7979_veuveclicquot_4_2560x1520.jpeg"
                    alt="Rolling hills and vineyards of Veuve Clicquot"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 5. PROTECTING THE VINES */}
                <div className="space-y-3">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1e1e1e]">
                    PROTECTING THE VINES
                  </h2>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#1e1e1e]">
                    The protection of the vines against fungal diseases and insects is an essential part of preserving the vines, ensuring the quality of the leaves, and the quality of the grapes. This protocol requires precise management of the frequency of treatments and a sound understanding of the best choices for managing vines.
                  </p>
                </div>

                {/* Photo 5: Grape vine leaves in sunshine */}
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                  <img
                    src="https://images.vivino.com/misc/sponsorships/7979_veuveclicquot/7979_veuveclicquot_5_2560x1520.jpeg"
                    alt="Veuve Clicquot grape vine leaves in sunshine"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 6. THE CONSERVATION OF THE SOIL */}
                <div className="space-y-3">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1e1e1e]">
                    THE CONSERVATION OF THE SOIL
                  </h2>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#1e1e1e]">
                    Conserving the vineyard soil ensures the balanced nutrition of the vines, avoids weed growth, and prevents erosion. At Veuve Clicquot, soil is nourished with respect to the environment, exclusively using organic fertilizers. Veuve Clicquot reduces the frequency of weeds with grass strips between the vineyard rows, and by trimming under the vines via mechanical means without using pesticides – for the majority of the vineyards.
                  </p>
                </div>

              </article>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
