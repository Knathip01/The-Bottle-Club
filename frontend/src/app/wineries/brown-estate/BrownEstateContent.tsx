'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star, User } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/11306/logos/HdDYM5J7SimDv3fDWZwhow.png',
  hero: 'https://thumbs.vivino.com/winery_backgrounds/_nVV1TARQqm8JMc6VG30Ug_2560x1520.jpeg',
  story1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/11306_brownfamiliy/11306_brownfamily_1.png',
  story2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/11306_brownfamiliy/11306_brownfamily_2.png',
  story3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/11306_brownfamiliy/11306_brownfamily_3.png',
  story4: 'https://vivino.s3.amazonaws.com/misc/sponsorships/11306_brownfamiliy/11306_brownfamily_4.png',
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

export default function BrownEstateContent() {
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
                alt="Brown Estate logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Brown Estate</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientBrownEstate)"></path>
                  <defs>
                    <linearGradient id="badgeGradientBrownEstate" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>45</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.3
              </span>
              <span className="text-stone-500">10,720 total ratings</span>
            </div>

            <Link
              href="/search?q=Brown%20Estate"
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
              value="David F. Brown"
              icon={<User className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://www.brownestate.com"
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
              href="https://www.instagram.com/brownestate/"
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
              href="https://www.facebook.com/brownestate"
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
              href="https://twitter.com/brownestate"
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
              <span>707-963-2435</span>
            </div>

            <a
              href="mailto:gina@brownestate.com"
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
              alt="Brown Estate rustic wooden barn winery surrounded by trees in Napa Valley hills"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <Paragraph>
            BROWN Napa Valley is a collection of wine brands anchored by the heritage Brown Estate label. Founded in 1996 by siblings Deneen, David &amp; Coral, the Brown portfolio includes sister label House of Brown and the iconic Chaos Theory red and white blends. The Brown family has been in Napa since 1980; growing grapes for 40 years, making wine for 25 years, and operating their wine club for nearly 20 years.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story1}
            alt="Deneen, David and Coral Brown on the white Victorian gazebo stairs"
          />

          <Paragraph>
            By way of Southern California, the Brown family tree has roots in Jamaica (Dad) and Panama (Mom). The siblings grew up primarily in Los Angeles, with a brief stint in Jamaica. During mandatory turns pitching in at their parents’ medical clinic in South Central LA, they adopted an all-for-one, one-for-all sense of responsibility for each other, their work, and the community they were serving.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story2}
            alt="Harvest bin overflowing with ripe Napa Valley grapes with BROWN NAPA VALLEY label"
          />

          <Paragraph>
            Raised in what now would be known as a “Blue-Zone” household, they also swore allegiance to what would become a foundational tenet at Brown: Do no harm. This principle informs their practices in the realms of farming, winemaking, and hospitality.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story3}
            alt="Brown Downtown Napa tasting room with server pouring wine for guests"
          />

          <Paragraph>
            After opening their destination Brown Downtown Napa tasting room in 2017, they established House of Brown to expand access to the Brown wine experience. All of the family’s wines are regeneratively farmed, certified sustainable, and vegan-friendly.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story4}
            alt="Aerial drone view of hillside vineyard rows in afternoon sunlight"
          />

          <Paragraph>
            BROWN Napa Valley and its portfolio of wine brands are 100% family-owned.
          </Paragraph>
        </article>
      </div>
    </div>
  );
}
