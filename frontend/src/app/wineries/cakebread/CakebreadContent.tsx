'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, User } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/193/logos/ILKSKundTieGBgavTdB73Q_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/NZjPXmPoT7qyq8qbc3ivpA_2560x1520.jpeg',
  story1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/193_cakebread/2024_aug_refresh/193_cakebread_1_2560x1520.jpg',
  story2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/193_cakebread/2024_aug_refresh/193_cakebread_2_2560x1520.jpg',
  story3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/193_cakebread/2024_aug_refresh/193_cakebread_3_2560x1520.jpg',
  story4: 'https://vivino.s3.amazonaws.com/misc/sponsorships/193_cakebread/2024_aug_refresh/193_cakebread_6_2560x1520.jpg',
  story5: 'https://vivino.s3.amazonaws.com/misc/sponsorships/193_cakebread/2024_aug_refresh/193_cakebread_4_2560x1520.jpg',
  story6: 'https://vivino.s3.amazonaws.com/misc/sponsorships/193_cakebread/2024_aug_refresh/193_cakebread_5_2560x1520.jpg',
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

export default function CakebreadContent() {
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
                alt="Cakebread logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Cakebread</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientCakebread)"></path>
                  <defs>
                    <linearGradient id="badgeGradientCakebread" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>46</strong> Wines</span>
            </div>

            <Link
              href="/search?q=Cakebread"
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
              value="Niki Williams"
              icon={<User className="h-4 w-4" />}
            />
            <Row
              label="Owned by"
              value="The Cakebread Family"
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="http://www.cakebread.com"
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
              href="https://www.instagram.com/cakebreadcellars"
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
              href="https://www.facebook.com/cakebreadcellars"
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
              href="https://x.com/CakebreadWines"
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
              <span>(800) 588-0298</span>
            </div>

            <a
              href="mailto:cellars@cakebread.com"
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
              alt="Cakebread Cellars illuminated timber estate buildings nestled among Rutherford vineyards at twilight"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <StoryImage
            src={images.story1}
            alt="Cakebread Cellars estate winery buildings illuminated against evening dusk sky"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            Their story started over 50 years ago with a piece of land, a family passionate about wine, and a community of friends who helped bring Cakebread Cellars to life. Since founding the winery in 1973, the Cakebread family has set out to create quality wines that pair best with good food and good company. Still owned by Bruce and Dennis Cakebread, the wines reflect the personalities of their estate vineyards as well as the spirit of their entire team.
          </Paragraph>

          <blockquote className="my-2 border-l-2 border-amber-600/40 pl-4 py-1">
            <p className="italic text-[12px] leading-relaxed text-stone-700 sm:text-[14px]">
              &ldquo;When you share our wines with your family and friends, you invite our family into yours &ndash; we are honored to be a part of so many memorable moments for you, our Cakebread family.&rdquo;
            </p>
            <footer className="mt-1 text-[11px] font-medium text-stone-500 sm:text-xs">
              &ndash; Jack Cakebread, co-founder
            </footer>
          </blockquote>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story2}
            alt="Cakebread Cellars tasting room modern timber architecture with landscaped entry drive"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            Today, the winery has 771 planted acres throughout the Napa and Anderson Valleys. Niki Williams, the winemaker, crafts timeless wines with consistent, uncompromising quality.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story3}
            alt="Scenic aerial view of Cakebread estate hillside vineyards draped in morning valley fog"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            Cakebread Cellars&#39; range of vineyards embodies a blend of both cooler and warmer sites, imbuing their wines with unique characteristics that contribute to their diversity and complexity.
          </Paragraph>

          <Paragraph>
            Sustainability runs deep at Cakebread with practices that range from sustainable farming to diligent water and energy conservation. For example, 100% of wastewater is recycled for use in the vineyard, and 88% of total waste is diverted from landfills. Cakebread is the proud recipient of multiple sustainability awards, including the Napa Green certification, California Green Medal Community Award, and Bee Friendly Certification. They aim to be carbon neutral by 2030 and are proud to have achieved silver-level membership status of International Wineries for Climate Action (IWCA) in 2022. Founded in 2019, the IWCA is a collaborative working group of wineries committed to reducing global carbon emissions across the wine industry.
          </Paragraph>

          <blockquote className="my-2 border-l-2 border-amber-600/40 pl-4 py-1">
            <p className="italic text-[12px] leading-relaxed text-stone-700 sm:text-[14px]">
              &ldquo;Quality and sustainability have been Cakebread cornerstones since our first vintage in 1973. We&#39;re a family winery, and we want to protect the land for future generations.&rdquo;
            </p>
            <footer className="mt-1 text-[11px] font-medium text-stone-500 sm:text-xs">
              &ndash; Bruce Cakebread, co-owner, board member
            </footer>
          </blockquote>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story4}
            alt="Night grape harvesting under spotlights in Cakebread Napa Valley vineyards with Green Medal award"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            From the beginning, Cakebread Cellars wine has been crafted to share with friends and loved ones around a table. Their wines&#39; elegant acidity and structure bring out the best in a wide range of foods. From vibrant Chardonnays to robust Cabernets, the array of wines is renowned for making delicious food pairings. Cheers!
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story5}
            alt="Guests enjoying fine dining and toasting wine around an elegantly lit table at Cakebread Cellars"
          />

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story6}
            alt="Bottle of Cakebread Chardonnay paired with gourmet pan-seared salmon and seasonal vegetables"
          />
        </article>
      </div>
    </div>
  );
}
