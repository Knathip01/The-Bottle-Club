import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star } from 'lucide-react';

const images = {
  logo: 'https://images.vivino.com/wineries/26132/logos/x1vBeXTWRVOvwSgyQkAESw.png',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/lKMAaZetTwaScBlIK00MFw_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/26132_pagodetharsys_2_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/26132_pagodetharsys_3_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/26132_pagodetharsys_4_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/26132_pagodetharsys_5_2560x1520.jpg',
  turismeLogo: 'https://images.vivino.com/misc/sponsorships/Distintivo_Turisme_logo.jpg',
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
  return <p className={`px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px] ${className}`}>{children}</p>;
}

export default function PagoDeTharsysContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Pago de Tharsys logo"
                width={56}
                height={56}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold text-stone-900 sm:text-2xl">Pago de Tharsys</h1>
              <div className="mt-0.5 flex items-center gap-1.5 sm:mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 sm:h-4 sm:w-4">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.575 14.46C6.207 13.764 2 11.35 2 8V5.386c0-.502 0-.753.079-.972.07-.193.183-.368.332-.51.168-.162.397-.264.856-.467l4.3-1.911c.16-.071.24-.107.322-.12a.667.667 0 0 1 .222 0c.083.013.163.049.322.12l4.3 1.91c.459.204.688.306.856.467.149.143.262.318.332.511.079.22.079.47.079.972V8c0 3.35-4.207 5.764-5.575 6.46-.138.07-.207.106-.3.123a.753.753 0 0 1-.25 0c-.093-.017-.162-.053-.3-.123Zm3.23-7.323a.667.667 0 1 0-.943-.942L7.333 8.723l-.862-.862a.667.667 0 1 0-.942.943l1.333 1.333c.26.26.682.26.943 0l3-3Z" fill="url(#badgeGradientTharsys)"></path>
                  <defs>
                    <linearGradient id="badgeGradientTharsys" x1=".333" y1=".334" x2="10" y2="13.667" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EE803E"></stop>
                      <stop offset="1" stopColor="#BA1628"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[10px] font-medium text-stone-700 sm:text-xs">Verified Partner Winery</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-stone-600 sm:text-xs">
              <span><strong>68</strong> Wines</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-semibold text-stone-900">
                <Star className="h-3.5 w-3.5 fill-[#1e1e1e] text-[#1e1e1e]" />
                3.7
              </span>
              <span className="text-stone-500">15,023 total ratings</span>
            </div>

            <Link
              href="/search?q=Pago%20de%20Tharsys"
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
                    <span className="block h-full w-full bg-[#c60b1e] text-center text-[7px] leading-3 text-yellow-300">🇪🇸</span>
                  </span>
                  Spain
                </span>
              }
              icon={<Globe className="h-4 w-4" />}
            />
            <Row
              label="Region"
              value="Valencia"
              icon={<Mountain className="h-4 w-4" />}
            />
            <Row
              label="Owned by"
              value="Pago de Tharsys"
              icon={<Landmark className="h-4 w-4" />}
            />
          </section>

          {/* Contacts Card */}
          <section className="divide-y divide-stone-100 rounded-md border border-stone-200 bg-white">
            <a
              href="http://pagodetharsys.com/en/"
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
              href="https://www.instagram.com/pagodetharsys"
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
              href="https://www.facebook.com/pagodetharsys"
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
              href="https://x.com/pagodetharsys"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-stone-800 hover:text-stone-950"
            >
              <span className="inline-flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-stone-900 text-[9px] font-bold text-white">𝕏</span>
                X
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
            </a>

            <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-stone-800">
              <Phone className="h-3.5 w-3.5 text-stone-500" />
              <span>34 96 230 33 54</span>
            </div>

            <a
              href="mailto:pagodetharsys@pagodetharsys.com"
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
              alt="Pago de Tharsys historic estate and vineyards in Requena, Valencia"
              width={1280}
              height={760}
              unoptimized
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <Paragraph>
            This beautiful winery, dating back to 1808, is surrounded by 14 hectares of organic vineyards and is a pioneer in the production of sparkling wines, with its founder, Vicente García, regarded as the father of Valencian Cava.
          </Paragraph>

          <StoryImage
            src={images.story1}
            alt="Hands holding mineral-rich limestone rock from Tharsys estate terroir"
          />

          <Paragraph>
            The uniqueness of its limestone soils and the microclimate of this landscape have earned it its own DOP, called THARSYS. The wines produced in this Pago are known for their balance, freshness, finesse, and remarkable ageing potential. The estate practices night harvesting to obtain maximum aromatic intensity, as well as healthier components that are organoleptically flavorful and pleasurable. Once a year, the family, friends, and customers gather to harvest together under the stars; this group harvest day gives rise to one of their most renowned wines, Pago de Tharsys Vendimia Nocturna Albariño.
          </Paragraph>

          <StoryImage
            src={images.story2}
            alt="Walking through lush green organic vineyards at Pago de Tharsys"
          />

          <Paragraph>
            They also produce still wines from century-old vineyards located in the municipality of Requena under the Utiel–Requena D.O., where the Bobal variety reigns supreme.
          </Paragraph>

          <Paragraph>
            Their sparkling wines are produced under the Cava D.O., and their style is well known and appreciated: elegance, ultra-fine bubbles, and floral notes that evoke a journey through a Monet landscape.
          </Paragraph>

          <StoryImage
            src={images.story3}
            alt="Early-19th-century underground cellar with traditional bottle-fermenting Cava racks"
          />

          <Paragraph>
            Excellence, originality, and sustainability are the pillars of their work. The winery also features a charming hotel where guests can enjoy an authentic wine experience. A wide range of activities is available, including winery tours and tastings, pairings, music evenings, traditional harvest events, and experiences that combine fine gastronomy with their wines. Discovering the secrets of their bottle-fermented sparkling wines and descending into their early-19th-century underground cellar is essential to understanding the greatness of this winery and the distinctive style of its wines.
          </Paragraph>

          <StoryImage
            src={images.story4}
            alt="Wine tasting experience outdoors in the Pago de Tharsys estate garden"
          />

          <Paragraph>
            The figure of Medusa —that powerful mythological being crowned with serpents whose gaze turns one to stone— is the symbol of this winery. She appears on all their labels, and her presence can be felt in every corner. It is their way of expressing that wine is an ancestral creation deeply connected to Mediterranean culture, and its power is eternal, permeating every decision made in this exceptional winery.
          </Paragraph>

          <Paragraph>
            A visit to Pago de Tharsys and tasting its elixir is something one should experience at least once in a lifetime!
          </Paragraph>

          {/* Turisme Collaboration Footer */}
          <div className="space-y-2 pt-2 text-center">
            <p className="text-[10px] text-stone-500 sm:text-xs">
              Amb la col·laboració de / Con la colaboración de
            </p>
            <div className="mx-auto flex justify-center">
              <Image
                src={images.turismeLogo}
                alt="Generalitat Valenciana - Turisme"
                width={200}
                height={60}
                unoptimized
                className="h-auto max-w-[180px] object-contain sm:max-w-[220px]"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
