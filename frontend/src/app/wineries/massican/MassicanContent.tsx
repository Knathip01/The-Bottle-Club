'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mail, Mountain, Star, User } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/57053/logos/Qbzkk_p5R4eIcx66bkNTSQ.jpeg',
  hero: 'https://thumbs.vivino.com/winery_backgrounds/0CzrtxrOQLeGm3KP302Amw_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/57053_massican_2025/57053_massican_1_2025_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/57053_massican_2025/57053_massican_2_2025_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/57053_massican_2025/57053_massican_3_2025_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/57053_massican_2025/57053_massican_4_2025_2560x1520.jpg',
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

export default function MassicanContent() {
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
                alt="Massican logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Massican</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientMassican)"></path>
                  <defs>
                    <linearGradient id="badgeGradientMassican" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>10</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.1
              </span>
              <span className="text-stone-500">4,705 total ratings</span>
            </div>

            <Link
              href="/search?q=Massican"
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
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full border border-stone-200">
                    <span className="block h-full w-full bg-[#3c3b6e] text-center text-[7px] leading-3 text-white">🇺🇸</span>
                  </span>
                  United States
                </span>
              }
              icon={<Globe className="h-4 w-4" />}
            />
            <Row
              label="Region"
              value="Napa Valley"
              icon={<Mountain className="h-4 w-4" />}
            />
            <Row
              label="Owned by"
              value="Gallo"
              icon={<User className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="http://www.massican.com"
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
              href="https://www.instagram.com/massicanwinery"
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
              href="https://x.com/massicanwinery"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <svg className="h-3.5 w-3.5 fill-stone-500" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <a
              href="mailto:info@massican.com"
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
              alt="Massican white wines in bright Mediterranean style setting with citrus"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <Paragraph>
            Winemaker Dan Petroski founded Massican in 2009 as Napa&apos;s &apos;only white wine winery.&apos; Petroski makes &apos;Mediterranean&apos; wines, which refers to not only their style (high-acid, floral, salty) but their ambition: to grace tables, not stock cellars.While Petroski makes Sauvignon Blanc, Pinot Grigio, and Chardonnay, the soul of the project comes from his bottlings of native Italian varieties planted in California. These include Annia, a Tocai-Friulano-and-Ribolla-Gialla-based blend from Napa and Sonoma counties, and Gemina, a blend of the Southern Italian varieties Greco and Falanghina.
          </Paragraph>

          <Paragraph>
            This unique take on American wine - and his outsized presence in the wine world at large - inspired the San Francisco Chronicle to name Petroski &apos;Winemaker of the Year&apos; in 2017, writing: &quot;Not that all the Massican wines are identical to each other, each wine performs its distinctions...yet they all, somehow, taste like Massican. Like paintings in a series, cast from the same color palette yet individual, the pieces cohere.&quot;
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story1}
            alt="Dan Petroski holding a wine bottle against weathered wooden barn wall"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            “The wines didn’t fit the culture of how I was living my life and how nostalgically and romantically I wanted to live my life. I wanted to live the Mediterranean lifestyle; I wanted to drink white wines that are salty and acidic and floral.” Dan Petroski is talking about the dissonance of his early days in Napa. By day, he made Cabernet Sauvignon; at night, he and the other winemakers in the Valley would sit around dinner tables dotted with white wines.
          </Paragraph>

          <Paragraph>
            Dan started Massican to make “wines that you can drink at the peak of summer when you’re eating dinner outside with your friends and family.” He was just a few years removed from a late-career shift from media into wine, a “big swing” that landed him in the cellar of Valle dell’Acate in Sicily, then a harvest internship at DuMol, which, in turn, led to a job at Larkmead. In 2012, Dan became Larkmead’s head winemaker, overseeing the winery’s transition into low-intervention winemaking and increasing its focus on vineyard-designate wines.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story2}
            alt="Dan Petroski in lush Napa Valley vineyard rows"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            It was in his early days at Larkmead that Dan discovered some old vines of Tocai Friulano, and with the 2009 vintage, he started Massican with 400 cases of a Ribolla Gialla-Friulano-based-blend, not exactly standard Napa fare. Over the next several years, Dan moonlit as Massican’s auteur while taking Larkmead from strength to strength, and this ability to straddle two worlds - positing Napa’s future while simultaneously caretaking its historical legacy - inspired the San Francisco Chronicle to name him “Winemaker of the Year” in 2017. In 2021, Dan left Larkmead to focus on Massican full-time.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story3}
            alt="Massican white wine bottles with fresh citrus fruits in the Mediterranean sun"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            Nearly fifteen years since its founding, Massican has become more than a white wine winery; it’s an entry point to conversations about accessibility and affordability of top California wines. But this is only possible if the wines are good…and they are. The grapes may not be obvious, but the intention is clear because Massican is rooted in the personal, an extension of its founder: Italian in heritage and exuberant in expression; casually elegant wines built for the table and, perhaps, a bowl of brined olives.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story4}
            alt="Reaching for green olives alongside a chilled bottle of Massican white wine"
          />

          <hr className="border-stone-100" />

          <div className="space-y-1 text-xs">
            <div>
              <a
                href="https://www.massican.com/shop/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#a61a30] underline hover:text-[#881326]"
              >
                Buy more Massican here
              </a>
            </div>
            <div>
              <a
                href="https://substack.com/@massican"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#a61a30] underline hover:text-[#881326]"
              >
                Check us out on Substack
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
