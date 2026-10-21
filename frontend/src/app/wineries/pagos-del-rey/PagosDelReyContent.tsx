import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Star, Target } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/12833/logos/BAO_he-zSFC37tCSTOf4Zg_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/xxU1rqzUQT2OM70G65RBsQ_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/12833_pagosdelrey_2_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/12833_pagosdelrey_4_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/12833_pagosdelrey_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/12833_pagosdelrey_5_2560x1520.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/14_OCM_logo_SPANISH_2024_2560x1520.png',
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
    <Image
      src={src}
      alt={alt}
      width={1280}
      height={760}
      unoptimized
      className="h-auto w-full rounded-md object-cover"
    />
  );
}

function Paragraph({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px] ${className}`}>{children}</p>;
}

export default function PagosDelReyContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Pagos del Rey logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Pagos del Rey</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>143</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.8</b>
                </span>
                <span className="hidden sm:inline">190,037 total ratings</span>
                <span className="sm:hidden">190,037 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Pagos%20del%20Rey"
              className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs"
            >
              View wines
            </Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row
                label="Country"
                value={
                  <Link href="/product?country=Spain" className="hover:underline">Spain</Link>
                }
                icon={<span>🇪🇸</span>}
              />
              <Row
                label="Winemaker"
                value="Jairo Fernández, Alberto Viyuela y Jose Ángel Delgado"
                icon={<Target size={14} />}
              />
              <Row
                label="Owned by"
                value="Félix Solís Avantis (Félix Solís & Pagos del Rey)"
                icon={<Landmark size={14} />}
              />
            </div>
          </section>

          {/* Contacts Section */}
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white">
            {/* Website */}
            <div className="flex min-w-0 items-center justify-between gap-2 px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <Globe size={14} className="shrink-0 text-[#262626]" />
                <a
                  href="http://www.pagosdelrey.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Website
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Instagram */}
            <div className="flex min-w-0 items-center justify-between gap-2 px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#262626]">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <a
                  href="https://www.instagram.com/pagosdelreywines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Instagram
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Facebook */}
            <div className="flex min-w-0 items-center justify-between gap-2 px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#262626]">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <a
                  href="https://www.facebook.com/pages/pagos-del-rey-sl/252096338145011"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Facebook
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* X */}
            <div className="flex min-w-0 items-center justify-between gap-2 px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#262626]">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <a
                  href="https://twitter.com/pagosdelrey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  X
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:pdr@pagosdelrey.com"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                Winery Email
              </a>
            </div>
          </section>
        </aside>

        {/* Right Content / Story */}
        <article className="space-y-3 rounded-md border border-stone-200 bg-white p-2.5 sm:p-5">
          {/* Hero Image */}
          <div>
            <StoryImage
              src={images.hero}
              alt="Pagos del Rey wooden facade signage with winery crest"
            />
          </div>

          {/* Story Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              Pagos del Rey produces its wines in wineries located within the appellations of La Rioja, Ribera del Duero, Rueda, Toro, and Rías Baixas. The project was founded in 2004 as a natural expansion of Félix Solís Avantis into new wine regions in northern Spain. Its wide range of wines is complemented by the “Pagos del Rey Wine Museum,” one of the most important wine tourism attractions in Spain.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Modern Pagos del Rey Ribera del Duero winery illuminated at dusk"
            />
            <Paragraph>
              The origins of Pagos del Rey are rooted in the aim of crafting wines that express the essence of each terroir. Its journey in Ribera del Duero began in 2002 in Olmedillo de Roa, thanks to established family ties in the area. The winery spans 70,000 m² and has a production capacity of 15 million liters. Grapes are sourced from more than 450 local growers. The aging cellar houses 12,000 French and American oak barrels, where a wide range of quality wines are refined and matured.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Pagos del Rey Rueda winery facade with illuminated PR sculpture at sunset"
            />
            <Paragraph>
              Their passion for white wine led them to Rueda in 2005. The winery currently has a capacity of 14.2 million liters, making it one of the largest and best-equipped in the appellation. Harvesting takes place at night to take advantage of the cooler temperatures, in collaboration with more than 150 local growers across 1,000 hectares of vineyards. Verdejo is the flagship grape, alongside Viura and Sauvignon Blanc. These wines are characterized by their freshness, vibrant aromas, and balanced acidity.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Pagos del Rey Fuenmayor Rioja winery building with modern architecture and sculpture"
            />
            <Paragraph>
              In 2006, the winery in Fuenmayor, La Rioja, was inaugurated. Its excellent strategic location provides access to the diverse vineyards of Rioja Alta and Rioja Alavesa. It has a significant production capacity of 15.5 million liters. The winery collaborates with more than 1,000 growers cultivating 2,500 hectares of vineyards. At its heart lies a spectacular aging cellar with 17,000 barrels. A wide range of wines is produced here, including reds, whites, and rosés, as well as a renowned selection of Crianzas, Reservas, and Gran Reservas.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Underground barrel aging cellar in Morales de Toro with ornate chandeliers"
            />
            <Paragraph>
              The winery was inaugurated in 2008 and is located in Morales de Toro (Zamora). It represents 30% of the total production of the appellation and has a production capacity of 13 million liters. Grapes are sourced from 150 local growers, covering a total of 1,100 hectares, many of which are old bush-trained vines. The winery features an aging cellar with more than 2,000 barrels. Since 2014, it has also been home to the “Wine Museum,” a tribute to wine history and culture, where tradition is celebrated through numerous cultural activities.
            </Paragraph>
          </div>

          {/* Paragraph 6 & Website Link */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              Over the years, Pagos del Rey wineries have received significant recognition in national and international tastings and competitions. Recent highlights include the launch of white wines under the Rías Baixas and Monterrei appellations, further expanding one of the most diverse portfolios in Spain.
            </Paragraph>
            <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">
              You can visit their{' '}
              <a
                href="https://www.pagosdelrey.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ba1628] font-medium hover:underline"
              >
                website
              </a>
            </p>
          </div>

          {/* Bottom EU Banner */}
          <div className="pt-2">
            <StoryImage
              src={images.banner}
              alt="Campagna finanziata ai sensi del reg. UE n. 2021/2115"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
