'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mail, Mountain, Phone, User } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/1445/logos/nnRmT8Q5SqCRDLhChprfBA.jpeg',
  hero: 'https://thumbs.vivino.com/winery_backgrounds/hLmjSFE5SWCk0bTN7DCTtg_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/1445_newtonvineyard/1445_newtonvineyard/1445_newtonvineyard_1_2560x1520.jpeg',
  story2: 'https://images.vivino.com/misc/sponsorships/1445_newtonvineyard/1445_newtonvineyard/1445_newtonvineyard_2_2560x1520.jpeg',
  story3: 'https://images.vivino.com/misc/sponsorships/1445_newtonvineyard/1445_newtonvineyard/1445_newtonvineyard_3_2560x1520.jpeg',
  story4: 'https://images.vivino.com/misc/sponsorships/1445_newtonvineyard/1445_newtonvineyard/1445_newtonvineyard_4_2560x3040.jpeg',
  story5: 'https://images.vivino.com/misc/sponsorships/1445_newtonvineyard/1445_newtonvineyard/1445_newtonvineyard_6_2560x1520.jpeg',
  story6: 'https://images.vivino.com/misc/sponsorships/1445_newtonvineyard/1445_newtonvineyard/1445_newtonvineyard_5_2560x1520.jpeg',
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

export default function NewtonContent() {
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
                alt="Newton logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Newton</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientNewton)"></path>
                  <defs>
                    <linearGradient id="badgeGradientNewton" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>30</strong> Wines</span>
            </div>

            <Link
              href="/search?q=Newton"
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
              value="Alberto Bianchi & Andrew Holve"
              icon={<User className="h-4 w-4" />}
            />
            <Row
              label="Owned by"
              value="Moët Hennessy"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13.765 11.585S15 12.554 15 14v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6c0-1.446 1.235-2.415 1.235-2.415.6-.503.578-1.062.578-1.062V7h2.374v3.524s-.021.559.578 1.061Z"></path>
                  <path d="M3 9.783c0-.288 0-.431.037-.563a1 1 0 0 1 .159-.326c.082-.11.195-.198.422-.374l7.4-5.756c.351-.273.527-.41.72-.462a1 1 0 0 1 .523 0c.194.052.37.189.721.462l7.4 5.756c.227.176.34.264.422.374a1 1 0 0 1 .159.326c.037.132.037.275.037.563V19.4c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437C20.24 21 19.96 21 19.4 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C3 20.24 3 19.96 3 19.4V9.783Z"></path>
                </svg>
              }
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="http://www.newtonvineyard.com"
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
              href="https://www.facebook.com/NewtonVineyard"
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
              href="https://x.com/Newtonvineyard"
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
              <span>(707) 963-9000</span>
            </div>

            <a
              href="mailto:winery@newtonvineyard.com"
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
              alt="Terraced hillside vineyards of Newton Estate winding along Spring Mountain"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <StoryImage
            src={images.story1}
            alt="Panoramic bird's-eye view of Spring Mountain hillside vineyard with tree line and valley"
          />

          <Paragraph>
            Newton Vineyard was founded in 1977 by English businessman Peter Newton, an eclectic innovator with a pioneering spirit and a deep respect for nature. Peter and his wife, Su Hua, set their sights high to Spring Mountain’s steep hillsides, whose volcanic, well-draining soils held the key to the wine quality they sought.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story2}
            alt="Pouring Newton Unfiltered white wine into a glass in gentle natural sunlight"
          />

          <Paragraph>
            It was Peter Newton’s ambitious quest to create wines that embrace contrasts, delivering a classic freshness and precision while inviting the supple ripeness that Napa’s climate offers, in absolute harmony with nature.
          </Paragraph>

          <Paragraph>
            To unlock this terroir’s full potential, Peter turned to a time-honored Burgundian technique: Unfiltered winemaking that involved a great deal of time and precision. Released in 1990, Newton’s iconic Unfiltered Chardonnay became the first Napa Valley wine to indicate this method on the label.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story3}
            alt="Newton The Puzzle bottle and wine glasses on a picnic table among the vineyards"
          />

          <Paragraph>
            Being first and foremost, passionate about red wine, Peter Newton started with Cabernet Sauvignon &amp; Merlot plantings, that yielded the first Puzzle Cabernet Sauvignon (1992 vintage) in 1994. Created for nearly 30 years, this was the flagship, representing the passion for blending the finest grapes across Newton’s vineyards. This is the historic wine of the estate, originally produced from a single vineyard block shaped like the piece of a puzzle, and now blended from specific blocks of the Spring Mountain and Mt. Veeder vineyards into a singular wine with a vivacious personality and exceptional drinkability.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story4}
            alt="Three bottles of Newton Single Vineyard Cabernet Sauvignon: Spring Mountain, Yountville, and Mt. Veeder"
          />

          <Paragraph>
            Pursuing even deeper terroir exploration, in 2016, Newton released three exceptional single-vineyard Cabernets from the Spring Mountain, Mt. Veeder and Yountville AVAs and two single-vineyard Chardonnays, revealing the character of each individual estate through the best blocks, each season.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story5}
            alt="Dramatic sunset over vineyard rows with a flock of sheep grazing"
          />

          <Paragraph>
            Committed to sustainable practices from the beginning, Newton aims to express nature with precision, pursuing a natural, patient approach in the vineyards and winery. The estate holds the Napa Green Land &amp; Winery certifications, with the Spring Mountain vineyard certified Organic by the CCOF in 2020 and the Mt. Veeder and Carneros vineyards to be certified in 2021.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story6}
            alt="Rolling green hillside vineyard estate overlooking the Napa valley at dawn"
          />

          <Paragraph>
            Newton is defined by its unique combination of Place and Philosophy. Despite its incredible diversity of soils and exposures, the sense of place would get lost if not farmed and vinified with this approach of sustainability, intention and precision. The unfiltered philosophy alone wouldn’t express the wine so fully without having these specific vineyards and native yeasts to work with. The combination is what sets Newton apart, creating a very fresh profile that offers a rare interpretation of Napa.
          </Paragraph>
        </article>
      </div>
    </div>
  );
}
