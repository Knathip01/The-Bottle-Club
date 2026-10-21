'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star, User } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/2375/logos/X9BdCJQqQEmd7Xw1mL1_jQ.jpeg',
  hero: 'https://thumbs.vivino.com/winery_backgrounds/JrxjzenjRaiPUseATKrM8Q_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/2375_AlphaOmega/2375_AlphaOmega_1.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/2375_AlphaOmega/2375_AlphaOmega_2.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/2375_AlphaOmega/2375_AlphaOmega_3.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/2375_AlphaOmega/2375_AlphaOmega_4.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/2375_AlphaOmega/2375_AlphaOmega_5.jpg',
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

export default function AlphaOmegaContent() {
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
                alt="Alpha Omega logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Alpha Omega</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientAlphaOmega)"></path>
                  <defs>
                    <linearGradient id="badgeGradientAlphaOmega" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>93</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.4
              </span>
              <span className="text-stone-500">28,002 total ratings</span>
            </div>

            <Link
              href="/search?q=Alpha%20Omega"
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
              value="St. Helena"
              icon={<Mountain className="h-4 w-4" />}
            />
            <Row
              label="Winemaker"
              value="Head Winemaker Melissa Paris and Consulting Winemaker Andy Erickson"
              icon={<User className="h-4 w-4" />}
            />
            <Row
              label="Owned by"
              value="Alpha Omega"
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://www.aowinery.com/"
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
              href="https://www.instagram.com/aowinery/"
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
              href="https://www.facebook.com/AlphaOmegaWinery/"
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

            <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800">
              <Phone className="h-3.5 w-3.5 text-stone-500" />
              <span>+1 707-302-2800</span>
            </div>

            <a
              href="mailto:era@aowinery.com"
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
              alt="Alpha Omega Winery estate building across tranquil reflecting pond and fountains"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <Paragraph>
            All that is good from beginning to end. The name says it, and every vintage has to prove it again. Alpha Omega is a family-owned winery on Highway 29, in the historic Rutherford appellation of Napa Valley, founded by Robin and Michelle Baggett in 2006. We farm the old way, by hand, by feel, one small lot at a time. Twenty vintages on, the work is the same and never finished.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story1}
            alt="Vineyard vines overlooking Alpha Omega winery estate and fountains in evening light"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            Most wineries ferment red wine in big stainless steel tanks. We ferment much of ours in oak barrels, one barrel at a time, as we did in our first vintage in 2006, and every vintage since. It is slow, physical work; each barrel is punched down by hand. The reward is a wine whose fruit, oak and tannin knit together early, so it drinks well young and still rewards a decade in the cellar.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story2}
            alt="Hand punch-down of fermenting red grapes inside oak wine barrel"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            We are one of the few wineries in Napa Valley with a cooper on staff, building and repairing our barrels on site. The same care goes into the fruit. We farm a select group of single vineyards, including some of the valley&#39;s most historic - Beckstoffer To Kalon and Dr. Crane among them. Made in small quantities, these wines are our clearest statement of grape and place, and the ones critics score from 95 to 100 points.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story3}
            alt="On-staff cooper handcrafting and hammering wine barrel in front of vineyard hills"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            Come see it. The estate sits at 1155 Mee Lane in St. Helena, where fountains rise from a pond against the Mayacamas Mountains. Tastings are outdoors and unhurried: choose your flight when you arrive, and an Estate Host walks you through the vineyard behind each pour. Open daily, 10am to 6pm. Dogs, kids and walk-ins all welcome.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story4}
            alt="Outdoor lounge chairs overlooking reflective pond, fountains, and Mayacamas Mountains"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            Since 2017 we have been certified Napa Green in both vineyard and winery, a soil-to-bottle standard met by roughly 90 Napa wineries, with more than 120 requirements covering water, energy, soil and habitat. We are solar powered. It is the least we owe a place this good.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story5}
            alt="Alpha Omega entrance sign and Napa Green certified winery banner"
          />

          <hr className="border-stone-100" />
        </article>
      </div>
    </div>
  );
}
