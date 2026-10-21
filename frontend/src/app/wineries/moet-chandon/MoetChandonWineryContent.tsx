'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Phone, Mail, Mountain } from 'lucide-react';

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

// Instagram SVG Icon
function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
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

// Winemaker Icon (concentric circles)
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

export default function MoetChandonWineryContent() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1e1e1e] font-sans antialiased pb-24">
      {/* Main Container */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ── 2-Column Responsive Layout (matching Vivino) ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT SIDEBAR (4 cols on lg) ─────────────────────────────────── */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Main Profile Info Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-sm space-y-5">
              
              {/* Circular Winery Logo */}
              <div className="w-[88px] h-[88px] rounded-full border border-stone-200 p-1 bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <Image
                  src="https://images.vivino.com/wineries/7799/logos/IVuutLbLQcid_HmWWecGxw.jpeg"
                  alt="Moët & Chandon"
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
                  Moët & Chandon
                </h1>

                {/* Verified Partner Winery */}
                <VerifiedPartnerBadge />

                {/* Stats */}
                <div className="flex items-center gap-3 pt-1 text-sm text-[#1e1e1e]">
                  <p className="font-semibold text-stone-700">
                    <strong className="text-stone-900 font-extrabold">82</strong> Wines
                  </p>
                </div>
              </div>

              {/* View Wines Button */}
              <Link
                href="/search?q=Moët+%26+Chandon"
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
                      Benoît Gouez
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
                  href="http://www.moet.com"
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

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/moetchandon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <InstagramIcon className="w-[18px] h-[18px] text-[#1e1e1e]" />
                    <span className="text-sm font-semibold text-[#1e1e1e] group-hover:text-[#BA1628] transition-colors">
                      Instagram
                    </span>
                  </div>
                  <ExternalLink size={14} className="text-stone-400 group-hover:text-stone-600 transition-colors" />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/moet"
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
                  href="https://x.com/moet"
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
                  href="tel:330326512020"
                  className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <Phone size={18} className="text-[#1e1e1e]" />
                    <span className="text-sm font-semibold text-[#1e1e1e] group-hover:text-[#BA1628] transition-colors">
                      33 03 2651 2020
                    </span>
                  </div>
                </a>

                {/* Winery Email */}
                <a
                  href="mailto:visites@moet.fr"
                  className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <Mail size={18} className="text-[#1e1e1e]" />
                    <span className="text-sm font-semibold text-[#1e1e1e] group-hover:text-[#BA1628] transition-colors">
                      visites@moet.fr
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
              
              {/* Top Hero Photo (Moët & Chandon Champagne Vineyards) */}
              <div className="relative w-full h-[280px] sm:h-[350px] bg-stone-100 overflow-hidden">
                <Image
                  src="https://thumbs.vivino.com/wineries/sponsorship_cards/zsfPCiOTSPa4WAuLWTMdMA_2560x1520.jpeg"
                  alt="Moët & Chandon Champagne Vineyards"
                  fill
                  priority
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Story Content Area */}
              <article className="p-6 sm:p-9 space-y-7">
                
                {/* Photo 1: Historic Cellars and Champagne Bottle */}
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                  <img
                    src="https://images.vivino.com/misc/sponsorships/7799_moetchandon/_moetchandon_1_2560x1520.jpg"
                    alt="Moët & Chandon Historic Cellars and Champagne Bottle"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 1. MOËT & CHANDON CELEBRATES 270 YEARS */}
                <div className="space-y-3">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1e1e1e]">
                    MOËT & CHANDON CELEBRATES 270 YEARS
                  </h2>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#1e1e1e]">
                    The legendary Moët & Chandon is celebrating 270 years as the world’s most loved champagne. For over a quarter of a millennium, the renowned French winemaker has been sharing the magic of champagne across the globe. Every glass overflows with the House’s hallmark values of history, generosity, savoir-faire, success, boldness and elegance—values still at the heart of its global appeal. Toward the end of the 18th century, Jean-Remy Moët, grandson of founder Claude Moët, became famous as the man who introduced champagne to the world. The important figures of the era, from the Marquise de Pompadour to Talleyrand to Napoleon quickly fell in love with the House’s effervescent wine. Moët & Chandon was soon the icon of success and elegance that it remains to this day.
                  </p>
                </div>

                {/* Photo 2: Celebrating life's triumphant moments */}
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                  <img
                    src="https://images.vivino.com/misc/sponsorships/7799_moetchandon/_moetchandon_2_2560x1520.jpg"
                    alt="Celebrating life's triumphant moments with Moët & Chandon"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 2. Celebrating triumphs paragraph */}
                <div className="space-y-3">
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#1e1e1e]">
                    Celebrating life’s triumphant moments with elegance, extraversion and sensorial pleasure is the essence of who we are. From Napoleon’s conquests to royal weddings, from Hollywood’s most dazzling event, the Oscars, to its most exclusive private parties, we are devoted to honoring accomplishment. As we were there for the important occasions in history, we’re there for your important occasions today. Discover how much Moët has meant to some of our famous fans.
                  </p>
                </div>

                {/* Photo 3: Moët & Chandon Estate in Champagne */}
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                  <img
                    src="https://images.vivino.com/misc/sponsorships/7799_moetchandon/_moetchandon_3_2560x1520.jpg"
                    alt="Moët & Chandon Estate in Champagne"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 3. ABUNDANT NATURE */}
                <div className="space-y-3">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1e1e1e]">
                    ABUNDANT NATURE
                  </h2>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#1e1e1e]">
                    Perhaps it’s no surprise that the wine which best expresses the quintessential qualities of champagne is made from grapes grown on the most extensive estate in the region. Of our 1,150 hectares (2,840 acres) of rich chalk soil, 50% are grands crus and 25% are premiers crus.
                  </p>
                </div>

                {/* Photo 4: The luxury of choice in Champagne crus */}
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                  <img
                    src="https://images.vivino.com/misc/sponsorships/7799_moetchandon/_moetchandon_4_2560x1520.jpeg"
                    alt="The luxury of choice in Champagne crus"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 4. THE LUXURY OF CHOICE */}
                <div className="space-y-3">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1e1e1e]">
                    THE LUXURY OF CHOICE
                  </h2>
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#1e1e1e]">
                    As the grapes that impart their incomparable flavor to our wines, Pinot Noir, Pinot Meunier and Chardonnay, come from vineyards in all of the five main areas of Champagne, we have the luxury of choice and the luxury of choosing the best.
                  </p>
                </div>

                {/* Photo 5: Moët & Chandon vineyard panorama */}
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                  <img
                    src="https://images.vivino.com/misc/sponsorships/7799_moetchandon/_moetchandon_5_2560x1520.jpeg"
                    alt="Moët & Chandon vineyard panorama"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 5. Access to crus paragraph */}
                <div className="space-y-3">
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#1e1e1e]">
                    With vineyards in Montagne de Reims, Côte des Blancs, Vallée de la Marne, Sézanne and Aube, we have access to approximately 200 of the 323 crus in the region, including a total of 17 grands crus and 32 of the 44 premiers crus. This wide-ranging diversity of fruits and vineyards ensures the optimum selection of grapes, enabling us to maintain the constancy of Moët Impérial and the originality of Grand Vintage.
                  </p>
                </div>

                {/* Photo 6: Moët & Chandon grape varietals */}
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                  <img
                    src="https://images.vivino.com/misc/sponsorships/7799_moetchandon/_moetchandon_6_2560x1520.jpeg"
                    alt="Moët & Chandon grape varietals"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 6. Grape varietals paragraph */}
                <div className="space-y-3">
                  <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#1e1e1e]">
                    Not everyone knows this, but the rich flavor and color of champagne results from combining three different types of grapes: Pinot Noir, Pinot Meunier and Chardonnay. Each grape varietal contributes its own special qualities to the uniquely delectable pleasure of Moët & Chandon champagnes. Discover the special role that each grape plays in creating the luscious sparkle of Moët & Chandon. If you would like to know them even better, why not visit our estates during harvest time.
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
