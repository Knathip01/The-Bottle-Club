'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, ExternalLink, Globe, Mountain, Star, Award, MapPin } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/301071/logos/ShSJkLmGSE27gpjNmh77zA.jpeg',
  cardTop: 'https://thumbs.vivino.com/wineries/sponsorship_cards/3j7IJvTbSc6Fyw1uUaf-Hg_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/301071_capital_call/301071_capital_call_1_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/301071_capital_call/301071_capital_call_2_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/301071_capital_call/301071_capital_call_3_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/301071_capital_call/301071_capital_call_4_2560x1520.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/301071_capital_call/301071_capital_call_5_2560x1520.jpg',
  story6: 'https://images.vivino.com/misc/sponsorships/301071_capital_call/301071_capital_call_6_2560x1520.jpg',
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

function StoryImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-md">
      <Image
        src={src}
        alt={alt}
        width={1280}
        height={760}
        unoptimized
        priority={priority}
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

function Paragraph({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`px-0.5 py-1 text-[11px] leading-[1.6] text-[#242424] sm:text-[13.5px] ${className}`}>{children}</p>;
}

export default function CapitalCallContent() {
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
                alt="Capital Call Vintners logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Capital Call Vintners</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientCapitalCall)"></path>
                  <defs>
                    <linearGradient id="badgeGradientCapitalCall" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>32</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.4
              </span>
              <span className="text-stone-500">165 total ratings</span>
            </div>

            <Link
              href={'/search?q=' + encodeURIComponent('Capital Call Vintners')}
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
              label="Owned by"
              value="Capital Call Vintners"
              icon={<Building2 className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://capitalcallvintners.com"
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
          </section>
        </aside>

        {/* Right Article & Content */}
        <article className="space-y-4 rounded-md border border-stone-200 bg-white p-3 sm:space-y-6 sm:p-5">
          {/* Top Card Image */}
          <StoryImage
            src={images.cardTop}
            alt="Capital Call Vintners aerial vineyard landscape at sunset"
            priority
          />

          <StoryImage
            src={images.story1}
            alt="Scenic view through oaks over Columbia Gorge vineyards"
          />

          <Paragraph>
            Capital Call Vintners’ wines showcase fruit produced on their two estate vineyards: Windhorse Vineyard and Wheatfield Vines Vineyard. Their love for the land and a passion for farming gave rise to their goal of creating delicious wines that honor the unique characteristics and unparalleled growing conditions of this renowned region.
          </Paragraph>

          <StoryImage
            src={images.story2}
            alt="Wheatfield Vines vineyard rows stretching toward the rolling Washington hills"
          />

          <Paragraph>
            Steve Bruere and Alan Busacca met in 2016 during a chance introduction while collaborating on a large agricultural asset outside of Walla Walla. Alan was retained to evaluate the potential to convert a portion of the farm to wine grapes and Steve was engaged as the real estate broker to oversee the property sale. Immediately a strong friendship formed between Alan and Steve as they bonded through their love of land and fine wine.
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Windhorse Vineyard on the hills of the Columbia Gorge with mountain sunset glow"
          />

          <Paragraph>
            After showing Steve his vineyard located in the Columbia Gorge AVA near The Dalles, Oregon, and detailing his vision for its development, Alan asked Steve to join him as a partner in Windhorse Vineyard. Steve, with a knack for both farming and real estate immediately understood the opportunity and became Alan’s partner to see the vision of developing Windhorse into a world-class vineyard.
          </Paragraph>

          <StoryImage
            src={images.story4}
            alt="Sunset aerial view of agricultural fields and vineyard estate"
          />

          <Paragraph>
            As Steve began to build his real estate business in the Pacific Northwest, he was presented with the opportunity to purchase a second vineyard which he seized. Wheatfield Vines Vineyard is nestled in the Walla Walla Valley on the edge of the Blue Mountains.
          </Paragraph>

          <StoryImage
            src={images.story5}
            alt="Close-up of ripe clusters of dark wine grapes on the vine"
          />

          <Paragraph>
            Throughout the farming and development of the two vineyards, Steve and Alan quickly learned the lesson that many in the wine industry know too well. To make a small fortune in the wine business, you must first start with a large fortune.
          </Paragraph>

          <StoryImage
            src={images.story6}
            alt="Bottle of Capital Call Cabernet Sauvignon next to fresh floral bouquet and wine glass"
          />

          <Paragraph>
            This principle became the flagship and foundation of Capital Call Vintners founded by Alan and Steve’s wife, Nikki. Just as the story has deepened and become richer over the years, so too has this friendship and their commitment to making great wines.
          </Paragraph>

          <Paragraph>
            Learn more here:{' '}
            <a
              href="https://capitalcallvintners.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ba1628] underline hover:text-[#8a101e]"
            >
              https://capitalcallvintners.com
            </a>
          </Paragraph>

          {/* Tasting Room & Accolades */}
          <div className="rounded-lg border border-stone-200 bg-stone-50/70 p-4">
            <div className="flex items-center gap-2 text-stone-900 font-bold text-sm sm:text-base">
              <MapPin className="h-4 w-4 text-[#ba1628]" />
              <span>Tasting Room</span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-stone-700">11 N Second Ave, Walla Walla, WA</p>
          </div>
        </article>
      </div>
    </div>
  );
}
