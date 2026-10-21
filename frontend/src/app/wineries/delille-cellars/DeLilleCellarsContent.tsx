'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mail, Mountain, Phone, Star, User } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/1424/logos/7jUHCSmaSF-NVervImmxSg.jpeg',
  hero: 'https://thumbs.vivino.com/winery_backgrounds/05V0a8MZQPqMjz4cDIVDEQ_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/1424_DeLille+Cellars/1424_delille_2023_1_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/1424_DeLille+Cellars/1424_delille_2023_2_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/1424_DeLille+Cellars/1424_delille_2023_3_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/1424_DeLille+Cellars/1424_delille_2023_4_2560x1520.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/1424_DeLille+Cellars/1424_delille_2023_5_2560x1520.jpg',
  story6: 'https://images.vivino.com/misc/sponsorships/1424_DeLille+Cellars/1424_delille_2023_6_2560x1520.jpg',
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

export default function DeLilleCellarsContent() {
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
                alt="DeLille Cellars logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">DeLille Cellars</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientDeLille)"></path>
                  <defs>
                    <linearGradient id="badgeGradientDeLille" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>63</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.2
              </span>
              <span className="text-stone-500">25,587 total ratings</span>
            </div>

            <Link
              href="/search?q=DeLille%20Cellars"
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
              value="Washington"
              icon={<Mountain className="h-4 w-4" />}
            />
            <Row
              label="Winemaker"
              value="DeLille Cellars"
              icon={<User className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="http://www.delillecellars.com"
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
              href="https://www.instagram.com/delillecellars"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-[8px] font-bold text-white">IG</span>
                Instagram
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <a
              href="https://www.facebook.com/DeLilleCellars/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-stone-900 text-[9px] font-bold text-white">f</span>
                Facebook
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <a
              href="https://x.com/DeLilleCellars"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">𝕏</span>
                X
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800">
              <Phone className="h-3.5 w-3.5 text-stone-500" />
              <span>425 489-0544</span>
            </div>

            <a
              href="mailto:contact@delillecellars.com"
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
              alt="DeLille Cellars modern tasting room and winery headquarters in Woodinville"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-base font-bold text-stone-900 sm:text-xl">Bordeaux Inspired – Distinctly Washington – Uniquely DeLille</h2>
          </div>

          <Paragraph>
            DeLille Cellars is regarded as a top American producer of Bordeaux-style blends, showcasing a tradition of quality and excellence over its 30-year history. DeLille remains a principal influence in establishing Washington State as a premier viticultural region, with a focus on the Red Mountain AVA and other prestigious vineyard sites throughout the Columbia Valley.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story1}
            alt="Interior architectural view of DeLille Cellars modern multi-level winery facility"
          />

          <Paragraph>
            Founded on the concept of crafting world-class wine from Washington State, DeLille was one of the first five wineries in Washington to receive Robert Parker&#39;s 5-star excellence rating. The winery’s legacy of consistent quality and acclaim includes over 800 individual 90+ ratings from top international critics, numerous placements on Top 100 lists, and five Wine &amp; Spirits Top 100 Wineries of the World accolades (2017-2020, 2022).
          </Paragraph>

          <hr className="border-stone-100" />

          <div>
            <h2 className="text-base font-bold text-stone-900 sm:text-xl">Philosophy</h2>
          </div>

          <Paragraph>
            DeLille was the first winery in the state to focus on both red and white Bordeaux-style blends. Seeking to create the best blends through combinations of different grapes varietals and vineyard sites, the founders of DeLille Cellars believed that all good blends transcend the sum of their individual parts.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story2}
            alt="Bottle lineup of DeLille Cellars premium wines on illuminated bar display"
          />

          <Paragraph>
            This founding principle and a company philosophy of “always seeking” guides the winery’s commitment to constant improvement, continuous discovery in the cellar, and ultimately the creation of exceptional wines and experiences.
          </Paragraph>

          <Paragraph>
            In 2019, DeLille Cellars moved all winery production and operations to the Old Redhook Brewery in Woodinville, Washington, where it built a three-story tasting room and opened a restaurant — The Restaurant at DeLille Cellars. Today, DeLille’s portfolio consists of over 20 wines, a handful of which are internationally distributed.
          </Paragraph>

          <hr className="border-stone-100" />

          <div>
            <h2 className="text-base font-bold text-stone-900 sm:text-xl">Notable Wines</h2>
          </div>

          <StoryImage
            src={images.story3}
            alt="Pouring DeLille Cellars D2 red wine into two crystal glasses"
          />

          <div>
            <h3 className="text-sm font-bold text-stone-900 sm:text-base">D2</h3>
          </div>

          <Paragraph>
            D2 takes its name from the grand route du vin, or great wine road that travels through the historic chateau region of Bordeaux. Always leading with Merlot, D2 is a traditional Bordeaux-style blend sourced from over 15 of the state’s most prestigious vineyards across the Columbia Valley to create the ultimate expression of Washington State terroir. Created as a second to Chaleur Estate, D2 has become the winery’s most sought-after label. First vintage 1992.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story4}
            alt="Bottle of Chaleur Blanc with elegant wine tasting glass on table"
          />

          <div>
            <h3 className="text-sm font-bold text-stone-900 sm:text-base">Chaleur Blanc</h3>
          </div>

          <Paragraph>
            Crafting a white Bordeaux-style blend was unheard of in Washington when the winery first created Chaleur Blanc. A blend of Sauvignon Blanc &amp; Sémillon, this wine is fermented sur lie in French oak barrels, imparting a memorable “crème brulee” finish. Served at the White House over three administrations &amp; rivaling its French counterparts in quality &amp; exceptional value, Chaleur Blanc has become one of the winery’s most influential blends. First vintage 1995.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story5}
            alt="Toast with red wine glasses in front of DeLille Cellars Four Flags Cabernet Sauvignon"
          />

          <div>
            <h3 className="text-sm font-bold text-stone-900 sm:text-base">Four Flags</h3>
          </div>

          <Paragraph>
            Four Flags is 100% Cabernet Sauvignon blended from four prestigious Red Mountain vineyards. Originally made for our Wine Club as a blending trial of specific plots, this wine showcases the nuances of each vineyard in a seamless blend. Four Flags is a harmonious &amp; complex representation of the incomparable terroir of Red Mountain &amp; a tribute to the winery’s steadfast commitment to this respected viticultural area. First vintage 2010.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story6}
            alt="Viticulturist tending to vines in Columbia Valley vineyard with sunny mountain backdrop"
          />

          <div className="pt-2 text-xs text-stone-700 sm:text-sm">
            <p className="font-semibold text-stone-900">Learn more here:</p>
            <p className="mt-1">
              The Restaurant:{' '}
              <a
                href="https://www.delillecellars.com/restaurant/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#8b1527] hover:underline"
              >
                www.delillecellars.com/restaurant/
              </a>
            </p>
            <p className="mt-0.5">
              The Tasting Room:{' '}
              <a
                href="https://www.delillecellars.com/tasting-room/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#8b1527] hover:underline"
              >
                www.delillecellars.com/tasting-room
              </a>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
