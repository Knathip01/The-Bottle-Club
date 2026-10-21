'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mail, Mountain, Phone, Star, User } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/163/logos/z-ABIn87R--86CoMdCkQ7g.jpeg',
  hero: 'https://thumbs.vivino.com/winery_backgrounds/apeu9KhEQ6Ctl4hkZBEMWw_2560x1520.jpeg',
  story1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/163_Bernardus/163_Bernardus_1.jpg',
  story2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/163_Bernardus/163_Bernardus_2.jpg',
  story3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/163_Bernardus/163_Bernardus_3.jpg',
  story4: 'https://vivino.s3.amazonaws.com/misc/sponsorships/163_Bernardus/163_Bernardus_4.jpg',
  story5: 'https://vivino.s3.amazonaws.com/misc/sponsorships/163_Bernardus/163_Bernardus_5.jpg',
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

export default function BernardusContent() {
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
                alt="Bernardus logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Bernardus</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientBernardus)"></path>
                  <defs>
                    <linearGradient id="badgeGradientBernardus" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>26</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.2
              </span>
              <span className="text-stone-500">30,136 total ratings</span>
            </div>

            <Link
              href="/search?q=Bernardus"
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
              value="Central Coast"
              icon={<Mountain className="h-4 w-4" />}
            />
            <Row
              label="Winemaker"
              value="Bernardus"
              icon={<User className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://www.bernardus-wine.com/en"
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
              href="https://www.instagram.com/bernardusgolfandwine/"
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
              href="https://www.facebook.com/bernardusgolfandwine"
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
              href="https://x.com/bernarduswinery"
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
              <span>+1 800-223-2533</span>
            </div>

            <a
              href="mailto:Sales@bernardus.com"
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
              alt="Bernardus Winery rustic wooden lodge nestled among trees in Carmel Valley"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-base font-bold text-stone-900 sm:text-xl">The art of winemaking</h2>
          </div>

          <Paragraph>
            Ben Pon regarded wine as art. An art form that transcends the ordinary. This philosophy still resonates in how Bernardus makes wine. With an eye for detail, quality and the ambition to make the very best wines. Our winemaker keeps a close eye on all vineyards so that the grapes can be picked at perfect ripeness and have the right balance of sugars, acids and tannins.
          </Paragraph>

          <Paragraph>
            More and more established French wineries are switching to stainless steel barrels. Bernardus consciously chooses to continue making wine in the traditional way and mature the wines in French oak barrels, which are made especially for Bernardus in Bordeaux and Burgundy. The oak comes from various French tonnelleries, allowing different aromas to blend together beautifully.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story1}
            alt="Bernardus winemaker nosing wine in glass next to French oak barrel"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            Carmel Valley is an area of approximately 500 km² in Monterey County. The unincorporated community has a population of around 6,000. Unlike Monterey, the summers are warm and dry here. Carmel Valley has a number of wine tasting rooms, as well as several high-end hotels affiliated with the wineries. Bernardus is one of them.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story2}
            alt="Winding road and vineyard rows nestled in Carmel Valley golden hills at sunset"
          />

          <hr className="border-stone-100" />

          <div>
            <h2 className="text-base font-bold text-stone-900 sm:text-xl">Santa Lucia Highlands</h2>
          </div>

          <Paragraph>
            The Santa Lucia Highlands AVA is an American wine-growing region in Monterey County, a mountain range above the Salinas Valley with 931 acres of vineyards far above sea level. The region enjoys cool morning mists and breeze from Monterey Bay, followed by warm afternoons thanks to direct southern exposure to the sun. Wine Enthusiast Magazine named it the California “Grand Cru” vineyard, in recognition of locations that produce the highest quality wine grapes. Our Santa Lucia Highlands Pinot Noir is a blend of Pinot grapes selected from some of our favorite SLH vineyards.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story3}
            alt="Aerial view of high-altitude mountain ridge vineyard in the Santa Lucia Highlands"
          />

          <hr className="border-stone-100" />

          <div>
            <h2 className="text-base font-bold text-stone-900 sm:text-xl">Bernardus white wine at the White House</h2>
          </div>

          <Paragraph>
            In 1997, during the administration of Clinton, the 1995 Monterey County Chardonnay was served at White House dinners. This was repeated in 2000 during George W. Bush’s administration.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story4}
            alt="The White House framed by blooming spring cherry blossoms"
          />

          <hr className="border-stone-100" />

          <div>
            <h2 className="text-base font-bold text-stone-900 sm:text-xl">Feel California taste La Provence</h2>
          </div>

          <Paragraph>
            What happens when the best winemakers in the world visit the best Rosé region in the world? Bernardus traveled from the Golden State, California, to France in search of the finest Rosé la Provence.
          </Paragraph>

          <Paragraph>
            They initially got lost, but later they stumbled upon the best organically produced Rosé they had ever tasted. The location? Château La Coste in the heart of the Provence region, where the finest wines are made with passion and respect toward the soil and the environment. The boys and girls from Bernardus fell in love right there and proposed a joint venture. La Coste gladly accepted, and Bernardus Rosé is their first creation: a premium French Rosé with a twist of California.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story5}
            alt="Lavender fields and organic vineyard rows at Château La Coste in Provence"
          />

          <hr className="border-stone-100" />
        </article>
      </div>
    </div>
  );
}
