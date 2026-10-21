import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star, Target } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/76592/logos/esPPXKhoSvmdYuX1Bgg1uQ_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/bl-36qgDTASLUS16FOs5Ww_2560x1520.jpeg',
  image1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/76592_patanegra/76592_patanegra_1.jpg',
  image2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/76592_patanegra/76592_patanegra_2.jpg',
  image3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/76592_patanegra/76592_patanegra_3.jpg',
  image4: 'https://vivino.s3.amazonaws.com/misc/sponsorships/76592_patanegra/76592_patanegra_4.jpg',
  banner: 'https://vivino.s3.amazonaws.com/misc/sponsorships/Jaume_en.jpg',
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

export default function PataNegraContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Pata Negra logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Pata Negra</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>43</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.6</b>
                </span>
                <span className="hidden sm:inline">190,075 total ratings</span>
                <span className="sm:hidden">190,075 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Pata%20Negra"
              className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs"
            >
              View wines
            </Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row
                label="Country"
                value={
                  <a href="https://www.vivino.com/en/explore/countries/spain" className="hover:underline">
                    Spain
                  </a>
                }
                icon={<span>🇪🇸</span>}
              />
              <Row
                label="Region"
                value={
                  <a href="https://www.vivino.com/en/explore/regions/catalunya" className="hover:underline">
                    Catalunya
                  </a>
                }
                icon={<Mountain size={14} />}
              />
              <Row
                label="Winemaker"
                value="García Carrión"
                icon={<Target size={14} />}
              />
              <Row
                label="Owned by"
                value="J. García Carrión"
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
                  href="https://garciacarrion.com"
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
                  href="https://www.instagram.com/vinos_patanegramx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Instagram
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Phone */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Phone size={14} className="shrink-0 text-[#262626]" />
              <a
                href="tel:914185537"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                914 185 537
              </a>
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:atcliente@jgc.es"
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
              alt="Pata Negra vineyard landscape with rolling vines under sunny sky"
            />
          </div>

          {/* Story Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              Pata Negra Fauna is a tribute to the bold landscapes and vibrant character of Spain’s most iconic wine regions—Rioja, Toro, Rueda, and La Mancha. Each bottle celebrates the wildlife (“fauna”) that roams these lands, and the unique personality of the wines born there.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Pata Negra Fauna collection map of Spain with featured bottles"
            />
            <Paragraph>
              From the red soils of Toro to the golden plains of La Mancha, each region has its own rhythm and energy. The Fauna Collection captures that diversity, expressing the spirit of each terroir through character-driven wines that feel alive.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Green grapevine leaves in front of rugged mountain peaks"
            />
            <Paragraph>
              Every Fauna wine tells a story. Rioja brings elegance and soft spice; Toro delivers power and depth; Rueda bursts with fresh, vibrant fruit; La Mancha offers warm, generous flavours. Different regions, different grapes—yet all united by the Pata Negra signature: approachable, expressive, unmistakably Spanish.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Historic Spanish winery estate building and vineyards"
            />
            <Paragraph>
              Pata Negra has always believed that great wine shouldn’t be complicated. Fauna is made for real moments—dinners at home, long conversations, weekends away. These wines are bold enough to stand out, yet easy enough to enjoy any day of the week.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Animals symbolizing wine spirits: Bull Strong, Lynx Clever, Wolf Fast, Fox Fast"
            />
            <Paragraph>
              The animals featured on each label symbolise the spirit of their region—strength, elegance, freedom. Fauna is more than a collection of wines; it’s an invitation to explore Spain through its landscapes, its people, and its wild, expressive soul.
            </Paragraph>
          </div>

          {/* Bottom EU Banner */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="max-w-[280px]">
              <Image
                src={images.banner}
                alt="Funded by the European Union"
                width={280}
                height={60}
                unoptimized
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
