'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';

// Verified Partner Badge
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
      <span className="text-[15px] font-semibold text-[#1e1e1e]">Verified Partner Winery</span>
    </div>
  );
}

export default function CatenaWineryContent() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1e1e1e] font-sans antialiased pb-24">
      {/* Main Container */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ── 2-Column Responsive Layout (matching Vivino screenshot) ──────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT SIDEBAR (4 cols on lg) ─────────────────────────────────── */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-sm space-y-5">
              
              {/* Circular Winery Logo */}
              <div className="w-[88px] h-[88px] rounded-full border border-stone-200 p-1 bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <Image
                  src="https://images.vivino.com/wineries/243362/logos/n4htQLboTbSuHY-Q00jZIg.jpeg"
                  alt="Catena"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                  unoptimized
                  priority
                />
              </div>

              {/* Title & Badges */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1e1e1e] tracking-tight">
                  Catena
                </h1>

                {/* Verified Partner Winery */}
                <VerifiedPartnerBadge />

                {/* Stats */}
                <div className="flex items-center gap-3 pt-1 text-sm text-[#1e1e1e]">
                  <p className="font-semibold text-stone-700">
                    <strong className="text-stone-900 font-extrabold">88</strong> Wines
                  </p>
                </div>
              </div>

              {/* View Wines Button */}
              <Link
                href="/search?q=Catena"
                className="w-full py-3 px-6 rounded-full bg-[#1e1e1e] text-white font-bold text-sm hover:bg-black transition-all shadow-sm hover:shadow active:scale-[0.98] cursor-pointer text-center block"
              >
                View wines
              </Link>

              {/* Info Box: Country, Region, Owned by */}
              <div className="rounded-2xl border border-stone-200 bg-stone-50/50 divide-y divide-stone-200/80 overflow-hidden">
                
                {/* Country */}
                <div className="p-3.5 flex items-center gap-3.5">
                  <div className="w-6 h-6 rounded overflow-hidden flex items-center justify-center shadow-xs shrink-0">
                    <img
                      src="https://flagcdn.com/w40/ar.png"
                      alt="Argentina"
                      className="w-full h-full object-cover rounded-xs"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                      Country
                    </span>
                    <a
                      href="https://www.vivino.com/en/explore/countries/argentina"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#1e1e1e] hover:text-[#BA1628] hover:underline"
                    >
                      Argentina
                    </a>
                  </div>
                </div>

                {/* Region */}
                <div className="p-3.5 flex items-center gap-3.5">
                  <div className="w-6 h-6 rounded flex items-center justify-center text-stone-700 shrink-0">
                    <MapPin size={20} className="text-[#1e1e1e]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                      Region
                    </span>
                    <a
                      href="https://www.vivino.com/en/explore/regions/mendoza"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#1e1e1e] hover:text-[#BA1628] hover:underline"
                    >
                      Mendoza
                    </a>
                  </div>
                </div>

                {/* Owned by */}
                <div className="p-3.5 flex items-center gap-3.5">
                  <div className="w-6 h-6 rounded flex items-center justify-center text-stone-700 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 9.783c0-.288 0-.431.037-.563a1 1 0 0 1 .159-.326c.082-.11.195-.198.422-.374l7.4-5.756c.351-.273.527-.41.72-.462a1 1 0 0 1 .523 0c.194.052.37.189.721.462l7.4 5.756c.227.176.34.264.422.374a1 1 0 0 1 .159.326c.037.132.037.275.037.563V19.4c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437C20.24 21 19.96 21 19.4 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C3 20.24 3 19.96 3 19.4V9.783Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                      Owned by
                    </span>
                    <span className="text-sm font-semibold text-[#1e1e1e]">
                      Bodega Catena
                    </span>
                  </div>
                </div>

              </div>

              {/* Search Bar in Sidebar */}
              <form onSubmit={handleSearchSubmit} className="relative pt-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search wines from Catena..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-300 text-sm text-[#1e1e1e] placeholder:text-stone-400 focus:outline-none focus:border-[#BA1628] focus:ring-1 focus:ring-[#BA1628] transition-colors"
                />
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              </form>

            </div>
          </aside>

          {/* ── RIGHT COLUMN (8 cols on lg): Story & Gallery ────────────────── */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Story Card Container */}
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
              
              {/* Top Hero Photo (Mayan-pyramid-inspired Bodega Catena Zapata) */}
              <div className="relative w-full h-[280px] sm:h-[350px] bg-stone-100 overflow-hidden">
                <Image
                  src="https://thumbs.vivino.com/wineries/sponsorship_cards/gozcgqkNQ6O8CEAAK-A0GQ_2560x1520.jpeg"
                  alt="Bodega Catena Zapata Estate"
                  fill
                  priority
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Story Content Area */}
              <article className="p-6 sm:p-9 space-y-7">
                
                {/* Paragraph 1 */}
                <p className="text-[15px] sm:text-base leading-relaxed text-[#1e1e1e]">
                  Ever since 1902, when Italian immigrant to Argentina, Nicola Catena, planted his first Malbec in Mendoza, the Catenas have pioneered Argentine wine: from resurrecting the ancient Malbec grape, to preserving ancient biodiverse plant selections, to planting vineyards at high altitudes where no one had dared to plant before. The visionary work of Nicolás Catena Zapata set a new standard for quality and demonstrated Argentina’s potential to produce grand cru level wines. This legacy continues under the leadership of his children and grandchildren.
                </p>

                {/* Awards Row */}
                <div className="space-y-4 py-2">
                  {/* Logos strip (Decanter, Wine Spectator, etc.) */}
                  <div className="w-full flex justify-center py-2">
                    <img
                      src="https://vivino.s3.amazonaws.com/misc/sponsorships/1437_CatenaZapata/Catena1_2828x397.jpg"
                      alt="Critic Accolades and World Wine Awards"
                      className="w-full max-w-[620px] object-contain"
                    />
                  </div>

                  {/* Red Award Banner */}
                  <div className="w-full flex justify-center">
                    <img
                      src="https://vivino.s3.amazonaws.com/misc/sponsorships/1437_CatenaZapata/Catena2_1474x660.png"
                      alt="Catena Zapata - Vivino's Most Awarded Winery in the World"
                      className="w-full max-w-[380px] rounded-xl shadow-md object-contain"
                    />
                  </div>
                </div>

                {/* Paragraph 2 */}
                <p className="text-[15px] sm:text-base leading-relaxed text-[#1e1e1e]">
                  Voted the #1 World’s Most Admired Wine Brand in 2020, 2025 and 2026 by Drinks International, Catena Bodega y Viñedos makes wines that stand proudly with the best in the world.
                </p>

                {/* Photo 1 */}
                <div className="space-y-2">
                  <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                    <img
                      src="https://vivino.s3.amazonaws.com/misc/sponsorships/1437_CatenaZapata/Catena3_2650x1620.jpg"
                      alt="Catena Zapata Malbec vines, 1902"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <em className="text-xs sm:text-sm text-stone-600 block italic">
                    Catena Zapata Malbec vines, 1902
                  </em>
                </div>

                {/* Photo 2 */}
                <div className="space-y-2">
                  <div className="relative w-full h-[320px] sm:h-[500px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                    <img
                      src="https://vivino.s3.amazonaws.com/misc/sponsorships/1437_CatenaZapata/Catena4_2650x2655.jpg"
                      alt="Nicolás Catena Zapata and his daughter Laura"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <em className="text-xs sm:text-sm text-stone-600 block italic">
                    Nicolás Catena Zapata and his daughter Laura, third and fourth generation vintners
                  </em>
                </div>

                {/* Photo 3 */}
                <div className="space-y-2">
                  <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                    <img
                      src="https://vivino.s3.amazonaws.com/misc/sponsorships/1437_CatenaZapata/Catena5_2650x1550.JPG"
                      alt="Dr. Laura Catena"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <em className="text-xs sm:text-sm text-stone-600 block italic">
                    Dr. Laura Catena leads a team of scientists in a mission to preserve nature and culture
                  </em>
                </div>

                {/* Photo 4 */}
                <div className="space-y-2">
                  <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                    <img
                      src="https://vivino.s3.amazonaws.com/misc/sponsorships/1437_CatenaZapata/Catena6_2650x1550.jpg"
                      alt="El Mirador overlooking Adrianna Vineyard"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <em className="text-xs sm:text-sm text-stone-600 block italic">
                    El Mirador overlooking Adrianna Vineyard
                  </em>
                </div>

                {/* Photo 5 */}
                <div className="space-y-2">
                  <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden shadow-sm bg-stone-100">
                    <img
                      src="https://vivino.s3.amazonaws.com/misc/sponsorships/1437_CatenaZapata/Catena7_2650x1550.jpg"
                      alt="Snow cools down the intense sunlight that shines on Adrianna Vineyard"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <em className="text-xs sm:text-sm text-stone-600 block italic">
                    Snow cools down the intense sunlight that shines on Adrianna Vineyard
                  </em>
                </div>

              </article>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
