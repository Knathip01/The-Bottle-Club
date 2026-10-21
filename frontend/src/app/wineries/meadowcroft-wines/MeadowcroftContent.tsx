'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mail, Mountain, Phone, Star, User } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/26051/logos/I4MQM0YoQ_-AR0WGjhZ2OA.jpeg',
  hero: 'https://thumbs.vivino.com/winery_backgrounds/n8LQDhquQeKgu05pESodpw_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/26051_Meadowcroft/2024_refresh/26051_meadowcroft_1_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/26051_Meadowcroft/2024_refresh/26051_meadowcroft_2_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/26051_Meadowcroft/2024_refresh/26051_meadowcroft_3_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/26051_Meadowcroft/2024_refresh/26051_meadowcroft_4_2560x1520.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/26051_Meadowcroft/2024_refresh/26051_meadowcroft_5_2560x1520.jpg',
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

export default function MeadowcroftContent() {
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
                alt="Meadowcroft Wines logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Meadowcroft Wines</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientMeadowcroft)"></path>
                  <defs>
                    <linearGradient id="badgeGradientMeadowcroft" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>59</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.1
              </span>
              <span className="text-stone-500">5,970 total ratings</span>
            </div>

            <Link
              href="/search?q=Meadowcroft"
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
              value="Sonoma County"
              icon={<Mountain className="h-4 w-4" />}
            />
            <Row
              label="Winemaker"
              value="Tom Meadowcroft"
              icon={<User className="h-4 w-4" />}
            />
            <Row
              label="Owned by"
              value="Meadowcroft Wines"
              icon={<User className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="http://www.meadowcroftwines.com"
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
              href="https://www.facebook.com/drinkmeadowcroftwines"
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
              href="https://x.com/meadowcroft"
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

            <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800">
              <Phone className="h-3.5 w-3.5 text-stone-500" />
              <span>(707) 934-4090</span>
            </div>

            <a
              href="mailto:info@meadowcroftwines.com"
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
              alt="Meadowcroft Wines vineyard estate panorama in Sonoma County"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <StoryImage
            src={images.story1}
            alt="Tom Meadowcroft examining grape clusters in sunny vineyard"
          />

          <Paragraph>
            From the renowned sites of Bordeaux to the rolling hills of Napa Valley, the evolution of Meadowcroft Wines is as rich and complex as the wines it produces. The journey began with a young, curious winemaker named Tom Meadowcroft, whose quest for winemaking knowledge and unwavering passion led him to the world&apos;s most renowned wine regions and making wines for 25 years that have received numerous accolades.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story2}
            alt="Scenic vineyard landscape with mountains under vibrant sky"
          />

          <Paragraph>
            Tom was born in Seattle, yet at 4, he and his family moved to Geneva Switzerland. There he grew up in a small village surrounded by vines and agriculture. Tom returned to Seattle every summer and eventually graduated from the University of Washington. Yet before U of W, in the summer of 1979, Tom worked in the vineyards of Bordeaux, France. This is where winegrowing became his fascination. It left an indelible mark on him, dictating not only his future endeavors but also the genesis of Meadowcroft Wines To really dial in his knowledge in viticulture and winemaking, Tom made his first wine in 1995 in Seattle’s Pioneer Square.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story3}
            alt="Oak aging barrels aligned neatly in the Meadowcroft winery cellar"
          />

          <Paragraph>
            In 1996 Tom pursued a degree at the prestigious Napa College. In the morning working at Forman Winery and then classes in the afternoon and evening. Tom then worked for 7 years developing extensive vineyard management experience and knowledge of Napa Valley, and Sonoma Vineyards. Managing vineyards for Mondavi, Saintsbury, Etude, Mumm, and Opus One. There, he carved out a niche that juxtaposed old-world sophistication with new-world ingenuity.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story4}
            alt="Pouring Meadowcroft wine into elegant tasting glass"
          />

          <Paragraph>
            At the heart of Meadowcroft Wines are core values where respect for time-honored traditions meets the creative spirit of Californian winemaking. Each bottle is a testament to the belief that each bottle holds a sensorial story, holding within it the essence of its origins and the people who have left their handprints on each vintage.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story5}
            alt="Pairing table set with Meadowcroft wines and gourmet food"
          />

          <Paragraph>
            Meadowcroft endeavors to offer a selection of wines that suits all palates following Tom’s belief that Excellent wine should be accessible and enjoyable; a compelling reason for people to gather and share time.
          </Paragraph>

          <Paragraph className="font-semibold text-stone-900">
            <a
              href="https://www.meadowcroftwines.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a61a30] underline hover:text-[#881326]"
            >
              Meadowcroft Wines
            </a>
            : European Heritage meets California creativity.
          </Paragraph>
        </article>
      </div>
    </div>
  );
}
