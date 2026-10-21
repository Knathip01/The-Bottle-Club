'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star, User } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/1498/logos/1AIEg747TbWiSKjyZE9o9w.jpeg',
  hero: 'https://thumbs.vivino.com/winery_backgrounds/2RZrjfQgT7CeYKyskNElnA_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/1498_longshadows/1498_longshadows_1_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/1498_longshadows/1498_longshadows_2_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/1498_longshadows/1498_longshadows_3_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/1498_longshadows/1498_longshadows_5_2560x1520.jpg',
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

export default function LongShadowsContent() {
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
                alt="Long Shadows logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Long Shadows</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientLongShadows)"></path>
                  <defs>
                    <linearGradient id="badgeGradientLongShadows" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>17</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.2
              </span>
              <span className="text-stone-500">21,444 total ratings</span>
            </div>

            <Link
              href="/search?q=Long%20Shadows"
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
              value="Gilles Nicault"
              icon={<User className="h-4 w-4" />}
            />
            <Row
              label="Owned by"
              value="Long Shadows Vintners"
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="http://www.longshadows.com"
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
              href="https://www.facebook.com/longshadows"
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
              href="https://x.com/LongShadowsWine"
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
              <span>509 526-0905</span>
            </div>

            <a
              href="mailto:info@longshadows.com"
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
              alt="Long Shadows Chihuly tasting room lounge overlooking Columbia Valley rolling hills"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <StoryImage
            src={images.story1}
            alt="Vineyard harvest with workers and tractor on hillside slope overlooking the river"
          />

          <Paragraph>
            Allen knew the ambitious project would need a director of winemaking who was highly knowledgeable and flexible enough to help the collaborating winemakers realize their vision. Allen tapped Gilles Nicault for the job. Gilles—a French native—carried with him an impressive résumé, at the time working as winemaker for Woodward Canyon, one of Washington’s premier wineries.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story2}
            alt="Three winemakers inspecting barrel fermentation cellar at Long Shadows"
          />

          <Paragraph>
            With Gilles at the helm, Allen recruited a veritable who’s who of winemakers: Randy Dunn (Napa, Feather Cabernet Sauvignon), John Duval (Australia, Sequel Syrah), Philippe Melka and Agustin Huneeus, Sr. (Napa, Pirouette Red Wine), Michel Rolland (France, Pedestal Merlot), Armin Diel (Germany, Poet’s Leap Riesling), and father-and-son winemakers Ambrogio and Giovanni Folonari (Italy, Saggi Red Wine). Since the beginning Gilles has served as director of winemaking and viticulture, overseeing and participating in the production of all labels, including Chester-Kidder Red Wine.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story3}
            alt="Long Shadows tasting room lounge with Dale Chihuly blown-glass chandeliers"
          />

          <Paragraph>
            Recruiting winemakers from around the world, each to produce a single Columbia Valley wine representing a “best of type,” was only half of the plan. Allen knew each winemaker would come with their own winemaking techniques and requirements, so a world-class winery was designed and built, capable of making wine to each winemaker’s rigorous specifications. The results were almost immediate. Acclaim for the wines and for the project followed, and in 2007, just four short years from its inception, Food &amp; Wine Magazine named Long Shadows “Winery of the Year.” Since then, Long Shadows has continued to produce highly-sought-after and highly-acclaimed examples of the best Washington can produce.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story4}
            alt="Sunset golden light on vineyard rows running down to the Columbia River bend"
          />

          <Paragraph>
            As the years passed, and the wines continued to show remarkable consistency under Gilles’ direction, the partners&#39; visits to the Columbia Valley naturally became less frequent.
          </Paragraph>

          <Paragraph>
            Today, Long Shadows&#39; original team of celebrated vintners is no longer directly involved in production, but the signature style of each winemaker can be tasted in each glass of Long Shadows wine. Gilles sees to that, as he always has, by skillfully maintaining their long-standing methods and techniques.
          </Paragraph>
        </article>
      </div>
    </div>
  );
}
