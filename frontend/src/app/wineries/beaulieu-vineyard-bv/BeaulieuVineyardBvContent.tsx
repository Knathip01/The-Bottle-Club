'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star, User } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/1334/logos/Arv-tt_STS2zKaRkEJNddg.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/W6GoGiLHTKyy6dX3lO9wdA_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/1334_beaulieu_vineyard/1334_beaulieu_vineyard_1_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/1334_beaulieu_vineyard/1334_beaulieu_vineyard_2_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/1334_beaulieu_vineyard/1334_beaulieu_vineyard_3_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/1334_beaulieu_vineyard/1334_beaulieu_vineyard_4_2560x1520.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/1334_beaulieu_vineyard/1334_beaulieu_vineyard_5_2560x1520.jpg',
  story6: 'https://images.vivino.com/misc/sponsorships/1334_beaulieu_vineyard/1334_beaulieu_vineyard_6_2560x1520.jpg',
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

export default function BeaulieuVineyardBvContent() {
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
                alt="Beaulieu Vineyard logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Beaulieu Vineyard (BV)</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientBv)"></path>
                  <defs>
                    <linearGradient id="badgeGradientBv" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>115</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.1
              </span>
              <span className="text-stone-500">79,124 total ratings</span>
            </div>

            <Link
              href="/search?q=Beaulieu%20Vineyard"
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
              value="Nate Weis"
              icon={<User className="h-4 w-4" />}
            />
            <Row
              label="Owned by"
              value="Treasury Wine Estates"
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="https://www.bvwines.com"
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
              href="https://www.instagram.com/bvwines"
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
              href="https://x.com/bvwines"
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
              <span>707-967-5233</span>
            </div>

            <a
              href="mailto:bvinfo@bvwines.com"
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
              alt="Beaulieu Vineyard heritage estate sign surrounded by lush ivy and California palm trees"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <StoryImage
            src={images.story1}
            alt="Historic ivy-covered stone building of Beaulieu Vineyard in Rutherford"
          />

          <Paragraph>
            Few wineries have helped shape the craft, legacy, and legend of Napa Valley as Beaulieu Vineyard. Founded in 1900 by Georges de Latour, the winery has long set the benchmark for rich, classic Napa Valley wines.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story2}
            alt="Sign marking Beaulieu Vineyard with scenic morning light illuminating lush rows of vines"
          />

          <Paragraph>
            In 1900, when Georges de Latour first showed his wife Fernande the land that would become BV’s original vineyard, she said, “Quel beau lieu!” or “What a beautiful place!” Georges recognized immediately that this was the place that would help them achieve their goal of making Napa Valley wines to rival those of their native France.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story3}
            alt="Historic black and white photograph of cellarmaster inspecting oak wine aging barrels at Beaulieu Vineyard"
          />

          <Paragraph>
            The vineyard’s secret is the renowned Rutherford Dust, the characteristic soil that legendary winemaker André Tchelistcheff proclaimed was the key to growing great Cabernet Sauvignon.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story4}
            alt="Bottle of Georges de Latour Private Reserve Cabernet Sauvignon flanked by filled glasses of red wine"
          />

          <Paragraph>
            Since its debut, Georges de Latour Private Reserve Cabernet Sauvignon has become the benchmark for Napa Valley Cabernet and one of the most collected American wines, served at dozens of state and White House dinners over the past century.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story5}
            alt="Lineup of vintage Beaulieu Vineyard reserve bottles against dark ambient background"
          />

          <Paragraph>
            For 125 years, Beaulieu Vineyard has known that what’s good for the earth is best for the wine. We take sustainability seriously to ensure the longevity of the Napa Valley, and we are committed to protecting the Rutherford Dust that we made famous over a century ago.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story6}
            alt="Hands cradling fertile Rutherford Dust vineyard soil while planting a young vine"
          />

          <div className="pt-1">
            <a
              href="https://www.bvwines.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#8b1820] hover:underline sm:text-sm"
            >
              BV Website
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
