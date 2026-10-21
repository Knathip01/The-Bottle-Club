'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mail, Mountain, Phone, User } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/299986/logos/RnM4a7gnSOqb4bOxq1M0KQ.jpeg',
  hero: 'https://thumbs.vivino.com/winery_backgrounds/w5MpxRj1TPyZQITKWV4R6w_2560x1520.jpeg',
  story1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/299986_tirriddis/299986_tirriddis_1.jpg',
  story2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/299986_tirriddis/299986_tirriddis_2.jpg',
  story3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/299986_tirriddis/299986_tirriddis_3.jpg',
  story4: 'https://vivino.s3.amazonaws.com/misc/sponsorships/299986_tirriddis/299986_tirriddis_4.jpg',
  story5: 'https://vivino.s3.amazonaws.com/misc/sponsorships/299986_tirriddis/299986_tirriddis_5.jpg',
};

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

function StoryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-md">
      <Image
        src={src}
        alt={alt}
        width={1280}
        height={760}
        unoptimized
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

function Paragraph({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`px-0.5 py-1 text-[11px] leading-[1.6] text-[#242424] sm:text-[13.5px] ${className}`}>{children}</p>;
}

export default function TirriddisContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          {/* Main Card */}
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-white sm:mx-0 sm:h-16 sm:w-16">
              <Image
                src={images.logo}
                alt="Tirriddis logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Tirriddis</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientTirriddis)"></path>
                  <defs>
                    <linearGradient id="badgeGradientTirriddis" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>18</strong> Wines</span>
            </div>

            <Link
              href="/search?q=Tirriddis"
              className="inline-flex h-8 w-full items-center justify-center rounded-full bg-[#1e1e1e] text-xs font-semibold text-white transition hover:bg-black sm:h-9"
            >
              View wines
            </Link>
          </section>

          {/* Details Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <Row
              label="Country"
              value={
                <Link href="/product?country=United%20States" className="inline-flex items-center gap-1.5 hover:underline">
                  <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full border border-stone-200">
                    <span className="block h-full w-full bg-[#3c3b6e] text-center text-[7px] leading-3 text-white">🇺🇸</span>
                  </span>
                  United States
                </Link>
              }
              icon={<Globe className="h-4 w-4" />}
            />
            <Row
              label="Winemaker"
              value="Gabriel Crowell"
              icon={<User className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://www.tirriddis.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-stone-500" />
                Website
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <a
              href="https://www.instagram.com/tirriddis"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <svg className="h-3.5 w-3.5 fill-stone-500" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <a
              href="https://www.facebook.com/tirriddis"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <svg className="h-3.5 w-3.5 fill-stone-500" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <a
              href="tel:+15095028576"
              className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <Phone className="h-3.5 w-3.5 text-stone-500" />
              <span>+15095028576</span>
            </a>

            <a
              href="mailto:Info@tirriddis.com"
              className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <Mail className="h-3.5 w-3.5 text-stone-500" />
              <span>Winery Email</span>
            </a>
          </section>
        </aside>

        {/* Right Article & Content */}
        <article className="space-y-4 rounded-md border border-stone-200 bg-white p-3 sm:space-y-6 sm:p-5">
          {/* Hero Banner */}
          <div className="overflow-hidden rounded-md">
            <Image
              src={images.hero}
              alt="Tirriddis sparkling winery modern tasting room exterior in Prosser, Washington at sunset"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 sm:text-base">
              Original, Authentic, and Unapologetically Washington Traditional Method Sparkling Wines
            </h2>
            <Paragraph className="mt-1">
              Tirriddis is a Washington State traditional method sparkling winery located in Prosser, Washington. Founded in 2021 by Andrew Gerow, Gabriel Crowell, and Matthew Doutney, three 20-year-old graduates of Washington State University’s Viticulture &amp; Enology program. With passion, ambition, and a focus on quality &amp; sustainability, they are happily working hard to pioneer &amp; curate Washington’s sparkling identity.
            </Paragraph>
          </div>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story1}
            alt="Founders and winemaking team of Tirriddis sparkling winery"
          />

          <hr className="border-stone-100" />

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 sm:text-base">
              Devoted to the Traditional Method
            </h2>
            <Paragraph className="mt-1">
              The name, Tirriddis, comes from the three steps to naturally produce sparkling wines in the traditional method; Tirage, Riddle, and Disgorge. Thus, showcasing their devotion to traditional method sparkling wines in Washington State.
            </Paragraph>
          </div>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story2}
            alt="Pouring sparkling rosé and blanc into elegant stemware glasses"
          />

          <hr className="border-stone-100" />

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 sm:text-base">
              Original &amp; Authentic to Washington
            </h2>
            <Paragraph className="mt-1">
              Since the beginning, their ambition is to define an authentic and original expression of Washington’s diverse yet world class growing environment through traditional method sparkling wines. Rooted in quality, each bottle represents the diversity, brightness, and vitality in Washington grapes, geography, and climate – the key pillars that make their sparkling wines unparalleled and uniquely Washington.
            </Paragraph>
          </div>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story3}
            alt="Three Tirriddis traditional method sparkling wine bottles side by side"
          />

          <hr className="border-stone-100" />

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 sm:text-base">
              Philosophy
            </h2>
            <Paragraph className="mt-1">
              In addition to wine quality and authenticity, sustainability is very important to them as they strive to help represent and push forward the future of all Washington wine. Their sparkling wines are 100% vegan and composed of grapes sourced from Sustainable Washington &amp; Salmon Safe certified vineyards. They are proud to offer unique, sustainable, accessible, and quality-focused Washington Traditional Method sparkling wines.
            </Paragraph>
          </div>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story4}
            alt="Vibrant clusters of ripe sparkling wine grapes on Washington vines"
          />

          <hr className="border-stone-100" />

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 sm:text-base">
              Defining Washington Sparkling Wines
            </h2>
          </div>

          <StoryImage
            src={images.story5}
            alt="Guests enjoying glasses of sparkling wine on the Tirriddis garden tasting patio"
          />
        </article>
      </div>
    </div>
  );
}
