import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star, Target } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/1777/logos/_VV1BN0LQ5qWNoxa6X0Hdg_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/zwhNMdTlScau2a7fQPYGkA_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/1777_marquesdecaceres/1777_Cacares_1.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/1777_marquesdecaceres/1777_Cacares_2.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/1777_marquesdecaceres/1777_Cacares_3.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/1777_marquesdecaceres/1777_Cacares_4.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/1777_marquesdecaceres/1777_Cacares_5.jpg',
  image6: 'https://images.vivino.com/misc/sponsorships/1777_marquesdecaceres/1777_Cacares_6.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/OCM-ES.png',
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

export default function BodegasMarquesDeCaceresContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Bodegas Marqués de Cáceres logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Bodegas Marqués de Cáceres</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>48</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.8</b>
                </span>
                <span className="hidden sm:inline">260,910 total ratings</span>
                <span className="sm:hidden">260,910 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Bodegas%20Marqu%C3%A9s%20de%20C%C3%A1ceres"
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
                value="Marqués de Cáceres"
                icon={<Target size={14} />}
              />
              <Row
                label="Owned by"
                value="Marqués de Cáceres"
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
                  href="http://www.marquesdecaceres.com"
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
                  href="https://www.instagram.com/marques_caceres"
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
                  href="https://www.facebook.com/marquescaceres"
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
                  href="https://twitter.com/Marques_Caceres"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  X
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Phone */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Phone size={14} className="shrink-0 text-[#262626]" />
              <a
                href="tel:+34941455064"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                34941455064
              </a>
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:comunicacion@marquesdecaceres.com"
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
              alt="Bodegas Marqués de Cáceres estate manor house in Cenicero Rioja"
            />
          </div>

          {/* Story Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              The story of Marqués de Cáceres begins with a pioneering vision: to produce Spanish wines capable of competing with the great international benchmarks. Inspired by his experience in Bordeaux, Enrique Forner revolutionized Rioja in 1970 with more refined, expressive, and balanced wines, marking the beginning of a new generation of Spanish wines.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Modern illuminated wine cellar corridor with glass walls and contemporary architecture"
            />
            <Paragraph>
              Today, the winery continues working to express the unique personality of each terroir. The selection of old vines, hand-harvesting, and meticulous care in each plot allow them to produce wines with character, freshness, and an elegance recognized worldwide.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Autumn vineyard rows with golden foliage in Rioja Alta"
            />
            <Paragraph>
              Innovation is part of Marqués de Cáceres&apos; DNA. The winemaking team continuously drives new research, sustainability, and experimentation projects to further explore the potential of each variety and bring the world of wine closer to new generations of consumers.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Large oak oval fermentation vats with red rims in cellar"
            />
            <Paragraph>
              Thanks to the vision of the Forner Family, Marqués de Cáceres has become one of Spain&apos;s most internationally renowned wineries. Present in more than 130 countries, its wines grace tables, restaurants, and moments of enjoyment worldwide.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Rows of French and American oak barrels in the aging cellar beneath Marqués de Cáceres signage"
            />
            <Paragraph>
              The winery currently operates in six designations of origin and has its own vineyards in some of the most prestigious wine regions in Spain, such as Rioja, Rueda and Ribera del Duero, always under a philosophy of quality and respect for the origin.
            </Paragraph>
          </div>

          {/* Story Image 5 & Paragraph 6 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image5}
              alt="Bottle of Marqués de Cáceres Crianza red wine with glasses and culinary table setting"
            />
            <Paragraph>
              In 2023, Bodegas Marqués de Cáceres was recognized for the second consecutive year as one of the 50 most admired wine brands in the world by Drinks International. The winery also maintains a strong commitment to sustainability, digitalization, wine tourism, and innovation as key pillars for continuing to build the future of Spanish wine.
            </Paragraph>
          </div>

          {/* Story Image 6 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image6}
              alt="Visitors strolling through the landscaped estate gardens under mature oak trees"
            />
          </div>

          {/* Bottom EU Banner */}
          <div className="pt-2">
            <StoryImage
              src={images.banner}
              alt="Funded by the European Union"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
