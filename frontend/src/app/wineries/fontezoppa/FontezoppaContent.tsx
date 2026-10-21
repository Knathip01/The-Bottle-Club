'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
      <div className="w-5 shrink-0 text-[#262626]">{icon}</div>
      <div className="min-w-0">
        <div className="text-[10px] leading-3 text-stone-500">{label}</div>
        <div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div>
      </div>
    </div>
  );
}

export default function FontezoppaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            {/* Default Winery Logo matching Vivino and screenshot */}
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-stone-100 sm:mx-0 sm:h-14 sm:w-14">
              <svg
                className="h-5 w-5 text-stone-400 sm:h-7 sm:w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11.392 22.723c.2.095.3.143.431.167.105.018.25.018.354 0 .132-.024.231-.072.431-.167C14.777 21.692 22 17.854 22 12.5V8.287c0-.773 0-1.159-.123-1.493a2 2 0 0 0-.519-.777c-.262-.242-.618-.39-1.331-.686l-7.414-3.076c-.226-.094-.34-.141-.456-.16a1 1 0 0 0-.314 0c-.117.019-.23.066-.456.16L3.973 5.33c-.713.296-1.07.444-1.331.686a2 2 0 0 0-.519.777C2 7.128 2 7.514 2 8.287V12.5c0 5.354 7.223 9.192 9.392 10.223Z" />
                <path d="M12 16.9a4.4 4.4 0 1 0 0-8.8 4.4 4.4 0 0 0 0 8.8ZM17.5 12.5h-2.2M8.7 12.5H6.5M12 9.2V7M12 18v-2.2" />
              </svg>
            </div>

            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Fontezoppa</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>32</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.7</b>
                </span>
                <span className="hidden sm:inline">8,270 total ratings</span>
                <span className="sm:hidden">8,270 ratings</span>
              </div>
            </div>

            <Link
              href="/search?q=Fontezoppa"
              className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs"
            >
              View wines
            </Link>

            {/* Location Info (Country & Region only, as shown in screenshot) */}
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row
                label="Country"
                value={
                  <a href="https://www.vivino.com/en/explore/countries/italy" className="hover:underline">
                    Italy
                  </a>
                }
                icon={<span>🇮🇹</span>}
              />
              <Row
                label="Region"
                value={
                  <a href="https://www.vivino.com/en/explore/regions/marche" className="hover:underline">
                    Marche
                  </a>
                }
                icon={<Mountain size={17} />}
              />
            </div>
          </section>

          {/* Contacts & Social Links */}
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.cantinefontezoppa.it/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <Globe size={14} />
                Website
              </span>
              <ExternalLink size={11} />
            </a>
            <a
              href="https://www.instagram.com/fontezoppa"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                Instagram
              </span>
              <ExternalLink size={11} />
            </a>
            <a
              href="https://www.facebook.com/cantinefontezoppa/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </span>
              <ExternalLink size={11} />
            </a>
            <a
              href="https://x.com/Fontezoppa"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:390733790504" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              39 0733 790504
            </a>
            <a href="mailto:support@cantinefontezoppa.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Main Content */}
        <main className="min-w-0 space-y-4">
          {/* Header Banner Image exactly matching screenshot media_1791361769682.png */}
          <div className="overflow-hidden rounded-md border border-stone-200 bg-white">
            <Image
              src="https://thumbs.vivino.com/region_backgrounds/LDuFJnFPQCShMdQFFILd0g_1280x760.jpg"
              alt="Marche picturesque alley with stone well - Fontezoppa"
              width={1280}
              height={760}
              unoptimized
              className="h-auto w-full max-h-[300px] object-cover sm:max-h-[380px]"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
