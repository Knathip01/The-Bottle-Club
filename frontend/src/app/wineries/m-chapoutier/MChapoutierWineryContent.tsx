'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Phone, Mountain } from 'lucide-react';

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

export default function MChapoutierWineryContent() {
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
                  src="https://images.vivino.com/wineries/7829/logos/aqrWPaFXSgecnUexbTn3hg.jpeg"
                  alt="M. Chapoutier"
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
                  M. Chapoutier
                </h1>

                {/* Verified Partner Winery */}
                <VerifiedPartnerBadge />

                {/* Stats */}
                <div className="flex items-center gap-3 pt-1 text-sm text-[#1e1e1e]">
                  <p className="font-semibold text-stone-700">
                    <strong className="text-stone-900 font-extrabold">229</strong> Wines
                  </p>
                </div>
              </div>

              {/* View Wines Button */}
              <Link
                href="/search?q=M.+Chapoutier"
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
                      href="https://www.vivino.com/en/explore/regions/rhone-valley"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#1e1e1e] hover:text-[#BA1628] underline underline-offset-2"
                    >
                      Rhône Valley
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
                      Michel Chapoutier
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
                      Chapoutier
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
                  href="http://www.chapoutier.com"
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
                  href="https://www.instagram.com/m_chapoutier/?hl=fr"
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
                  href="https://www.facebook.com/MaisonChapoutier"
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
                  href="https://x.com/M_Chapoutier"
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
                  href="tel:0475082865"
                  className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <Phone size={18} className="text-[#1e1e1e]" />
                    <span className="text-sm font-semibold text-[#1e1e1e] group-hover:text-[#BA1628] transition-colors">
                      04 75 08 28 65
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
              
              {/* Top Hero Photo (M. Chapoutier Rhône Valley Estate Hillside) */}
              <div className="relative w-full h-[280px] sm:h-[350px] bg-stone-100 overflow-hidden">
                <Image
                  src="https://thumbs.vivino.com/wineries/sponsorship_cards/W62q9FeFQfSSiTQ3wAR6ZA_2560x1520.jpeg"
                  alt="M. Chapoutier Rhône Valley Estate"
                  fill
                  priority
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Story Content Area */}
              <article className="p-6 sm:p-9 space-y-7">
                
                {/* Paragraph 1: The wines */}
                <div className="space-y-3">
                  <h2 className="text-base sm:text-lg font-bold text-[#1e1e1e]">
                    The wines:
                  </h2>
                  <p className="text-[15px] sm:text-base leading-relaxed text-[#1e1e1e]">
                    For Mr. CHAPOUTIER, a vintage cannot be altered. No techniques such as chaptalization, the addition of yeast, or acidifiers are used to compensate for the vagaries of a capricious climate. Michel Chapoutier states: &ldquo;The vintage is a truth, not a bluff. Correcting the vintage is a bit like lying. Or else, let&apos;s just make a wine without a vintage—that&apos;s more honest.&rdquo;
                  </p>
                </div>

                {/* Photo 1: Wine bottles on wooden shelves */}
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                  <img
                    src="https://vivino.s3.amazonaws.com/misc/sponsorships/7829_mchapoutier/7829_mchapoutier_1.jpg"
                    alt="M. Chapoutier Cellar and Wine Display"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Paragraphs 2-5: Philosophy, Heritage, Innovation, CSR */}
                <div className="space-y-5 text-[15px] sm:text-base leading-relaxed text-[#1e1e1e]">
                  <p>
                    Discovery, simplicity, and conviviality—wine is all about pleasure. Since 1808, eight generations have worked together to build one of the most beautiful estates in the Rhône Valley, with the utmost respect for natural balance and terroirs. The estate has gradually expanded its horizons, cultivating vineyards across 857 hectares worldwide.
                  </p>
                  <p>
                    The fusion of tradition and modernity has allowed us to develop expertise that enhances our wines and our terroirs. The craft of winemaking and viticulture is an ancient one. While some practices have remained unchanged, others have evolved with new technical approaches, a more responsible vision, and an unwavering pursuit of excellence.
                  </p>
                  <p>
                    The family-owned business is committed to innovation. Since 1996, the inclusion of Braille on all bottle labels has made wine accessible to everyone, as wine is a symbol of conviviality—it brings people together. Since 2006, the use of wax has provided optimal protection for the cork and ensures a completely airtight seal, slowing the aging process of the wine over time for all our Single Vineyard Selections, wines intended for long-term aging.
                  </p>
                  <p>
                    As a natural extension of our long-standing commitment to organic and biodynamic farming, the House&apos;s Corporate Social Responsibility (CSR) principles are reflected in the implementation of best practices in governance, social responsibility, and environmental stewardship. Our goal is to cultivate our terroirs and age our wines while minimizing chemical inputs, in the spirit of biodynamic, organic, or sustainable agriculture.
                  </p>
                </div>

                {/* Photo 2: Three people holding wine glasses in barrel cellar */}
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                  <img
                    src="https://vivino.s3.amazonaws.com/misc/sponsorships/7829_mchapoutier/7829_mchapoutier_2.jpg"
                    alt="Food and wine pairings with M. Chapoutier"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Paragraphs 6-7: Food and wine pairings */}
                <div className="space-y-5 text-[15px] sm:text-base leading-relaxed text-[#1e1e1e]">
                  <p>
                    It&apos;s all about food and wine pairings—a marriage of ideas and sensibilities between the restaurateur and the winemaker. The M. CHAPOUTIER team has always forged strong ties with key players in the global culinary world.
                  </p>
                  <p>
                    Our partners honor the men and women who are the pride of these essential professions, combining gastronomy and wine around the pleasure of taste. From traditional cuisine to prestigious restaurants offering exceptional wines, such as the Single Vineyard Selections in the Ermitage AOP. A selection that perfectly aligns with the M. CHAPOUTIER universe.
                  </p>
                </div>

                {/* Photo 3: Worker guiding draft horse plowing steep vineyard */}
                <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                  <img
                    src="https://vivino.s3.amazonaws.com/misc/sponsorships/7829_mchapoutier/7829_mchapoutier_3.jpg"
                    alt="Biodynamic farming with horse in vineyard"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Concluding Lines */}
                <div className="space-y-4 pt-2 text-[15px] sm:text-base leading-relaxed text-[#1e1e1e]">
                  <p className="font-semibold">
                    Because wine isn&apos;t meant to be drunk alone.
                  </p>
                  <p>
                    It truly comes into its own when paired with food, whether simple or elaborate.
                  </p>
                  <p className="text-stone-600 italic pt-1">
                    Discovery, simplicity, and conviviality—wine is all about enjoyment.
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
