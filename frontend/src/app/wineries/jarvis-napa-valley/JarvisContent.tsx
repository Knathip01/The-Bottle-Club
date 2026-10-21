'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star, User } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/1699/logos/x-FavvZ6SPq1hAibskVl9A.jpeg',
  hero: 'https://thumbs.vivino.com/winery_backgrounds/s7MAhr0vTTm-m2qJ9Te-Bg_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/1699_JarvisEstate/1669_Jarvis_1_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/1699_JarvisEstate/1669_Jarvis_2_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/1699_JarvisEstate/1669_Jarvis_3_2560_1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/1699_JarvisEstate/1669_Jarvis_4_2560x1520.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/1699_JarvisEstate/1669_Jarvis_5_2560x1520.jpg',
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

export default function JarvisContent() {
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
                alt="Jarvis logo"
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Jarvis</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientJarvis)"></path>
                  <defs>
                    <linearGradient id="badgeGradientJarvis" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>21</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                4.5
              </span>
              <span className="text-stone-500">10,131 total ratings</span>
            </div>

            <Link
              href="/search?q=Jarvis"
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
              value="Napa Valley"
              icon={<Mountain className="h-4 w-4" />}
            />
            <Row
              label="Winemaker"
              value="Dimitri Tchelistcheff"
              icon={<User className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="http://www.jarviswines.com"
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

            <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800">
              <Phone className="h-3.5 w-3.5 text-stone-500" />
              <span>707 255 5280</span>
            </div>

            <a
              href="mailto:info@jarviswines.com"
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
              alt="Jarvis Napa Valley hillside vineyard rows with wooden trellises and mountain backdrop"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <Paragraph>
            Each bottle of Jarvis wine is a proud expression of the estate’s exceptional craftsmanship, terroir, and legacy winemaking.
          </Paragraph>

          <hr className="border-stone-100" />

          <Paragraph>
            Twelve hundred feet above the city of Napa, in the mountains bordering the valley’s east side, sits Jarvis Estate. William and Leticia Jarvis bought the property with the vision of producing world-class wines and planted their first vines in 1986. Founding winemaker Dimitri Tchelistcheff, son of Napa legend Andre Tchelistcheff, worked closely with the family to establish a unique winemaking philosophy and style. Their commitment to this dream led them to excavate a 45,000 square foot cave and create the world’s first entirely subterranean winery, a visual and technical masterpiece. Today, their son and second-generation vintner Will Jarvis and winemaker Scott Morrison, uphold the family’s commitment to uncompromising excellence as they carry their legacy into the future.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story1}
            alt="Leticia, Will, and William Jarvis at the Jarvis Estate underground winery"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            There are two lakes on the estate, which in tandem with its high elevation and the maritime influence of the San Pablo Bay, offer a moderating effect on temperatures that allows for extended fruit maturation and maximum flavor and concentration. Undulating hillsides covered in rocky, volcanic, and well-draining soils are mineral-rich and exceedingly shallow, leading the grapevines to produce low yields with great intensity. Only 37 of the estate’s 1,320 acres are planted to vine, carefully selecting the most promising sites, clones, and trellising systems for each.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story2}
            alt="Terraced hillside vineyards with golden autumn leaves and lush green vines at Jarvis Estate"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            Due to the invariant temperature and high humidity level of caves, wineries have typically used caves for the barrel aging of wines. Jarvis Estate was the first to include the entire winemaking operation inside the cave, from the moment the grapes are harvested and brought inside until they are bottled, aged, and ready to be enjoyed.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story3}
            alt="Symmetrical subterranean wine cave tunnel with oak barrels at Jarvis Estate"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            All Jarvis grapes are grown within one mile of the cave. During harvest, grapes are handpicked by the year-round vineyard crew and collected in small 30-pound bins to eliminate premature crushing of the fruit as they make the short journey to the winery. The cave holds everything necessary to complete the metamorphosis of the grape to wine. Jarvis wines are only released when the family-led winemaking team feels that they are ready for enjoyment, which may be more than five to ten years from their vintage date.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story4}
            alt="Two people walking through sunlit vineyard rows on the hillside slopes"
          />

          <hr className="border-stone-100" />

          <Paragraph>
            Jarvis wines are made from 100% estate-grown fruit. Although best known for Cabernet Sauvignon and Chardonnay, Jarvis also produces small lots of Merlot, Petit Verdot, Cabernet Franc, and Tempranillo. Jarvis wines are available exclusively to Inner Circle club members and visitors to the winery. To reserve your tour and tasting experience, please visit jarviswines.com to fill out an online request form or call 707-255-5280 extension 150.
          </Paragraph>

          <hr className="border-stone-100" />

          <StoryImage
            src={images.story5}
            alt="Grand arched stone portal entrance into the subterranean Jarvis wine cave"
          />
        </article>
      </div>
    </div>
  );
}
