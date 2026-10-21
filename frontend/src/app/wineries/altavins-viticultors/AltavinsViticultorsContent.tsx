import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mail, Mountain, Phone, Star, Target } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/14198/logos/Oyn1KVDeRpqHjF_ZN8ZTJA_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/f7TGGI6DQB6FS8fpYGu7iA_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/14198_Altavins/14198_Altavins_1.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/14198_Altavins/14198_Altavins_2.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/14198_Altavins/14198_Altavins_3.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/14198_Altavins/14198_Altavins_4.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/14198_Altavins/14198_Altavins_5.jpg',
  story6: 'https://images.vivino.com/misc/sponsorships/14198_Altavins/14198_Altavins_6.jpg',
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

export default function AltavinsViticultorsContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Altavins Viticultors logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Altavins Viticultors</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>22</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.8</b>
                </span>
                <span className="hidden sm:inline">19,001 total ratings</span>
                <span className="sm:hidden">19,001 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Altavins%20Viticultors"
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
                  <a href="https://www.vivino.com/en/explore/regions/terra-alta" className="hover:underline">
                    Terra Alta
                  </a>
                }
                icon={<Mountain size={14} />}
              />
              <Row
                label="Winemaker"
                value="Joan Arrufí"
                icon={<Target size={14} />}
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
                  href="http://www.altavins.com"
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
                  href="https://www.instagram.com/altavinsviticultors"
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#262626]">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                <a
                  href="https://www.facebook.com/altavinsviticultors"
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
                  href="https://twitter.com/altavins"
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
                href="tel:+34977430596"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                (+34)977420806
              </a>
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:altavins@altavins.com"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                Winery Email
              </a>
            </div>
          </section>
        </aside>

        {/* Right Content / Story Article */}
        <article className="space-y-3 rounded-md border border-stone-200 bg-white p-2.5 sm:p-5">
          {/* Hero Image */}
          <div>
            <StoryImage
              src={images.hero}
              alt="Altavins Viticultors winery building and terrace in Batea, Terra Alta at sunset"
            />
          </div>

          {/* Paragraph 1 */}
          <div className="space-y-1">
            <Paragraph>
              Altavins is a small winery located in Batea, Catalonia, in northeastern Spain, within the Terra Alta Designation of Origin—a wine region with thousands of years of winemaking tradition. Terra Alta is a spectacular landscape that embodies the essence of the inland Mediterranean.
            </Paragraph>
          </div>

          {/* Story Image 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story1}
              alt="Joan Arrufí sitting in the vineyard holding a glass of wine surrounded by chickens"
            />
          </div>

          {/* Paragraph 2 */}
          <div className="space-y-1">
            <Paragraph>
              The project was founded in 2001 by Joan Arrufí. His passion and determination gave rise to wines that truly express the character and unique qualities of Terra Alta. Year after year, the winery has grown and established a recognised name in the global wine market.
            </Paragraph>
          </div>

          {/* Story Image 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story2}
              alt="Aerial panoramic view of vineyard terraces under the morning sun in Terra Alta"
            />
          </div>

          {/* Paragraph 3 */}
          <div className="space-y-1">
            <Paragraph>
              The winery&apos;s philosophy is simple: identity, honesty, and Mediterranean soul. These values are reflected in its wines, which stand out for their structure, character, and authenticity.
            </Paragraph>
          </div>

          {/* Story Image 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story3}
              alt="Close-up of ripening Garnacha grapes hanging on the vine in Terra Alta"
            />
          </div>

          {/* Paragraph 4 */}
          <div className="space-y-1">
            <Paragraph>
              At Altavins, strict quality standards are applied, with special attention paid to the age and care of the vineyards, while yields are limited to ensure the highest quality grapes. All grapes are harvested by hand, preserving their integrity and ensuring that every wine faithfully reflects its origin.
            </Paragraph>
          </div>

          {/* Story Image 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story4}
              alt="Winemaker adjusting valve on stainless steel fermentation tank at Altavins"
            />
          </div>

          {/* Paragraph 5 */}
          <div className="space-y-2">
            <Paragraph>
              Terra Alta is famous for its Garnacha varieties (white, &ldquo;peluda&rdquo; and red). It accounts for 33% of global production of white Garnacha, 75% of Spanish production and 90% of Catalan production.
            </Paragraph>
            <Paragraph>
              They take the utmost care when working with the grapes to capture all their virtues, and through minimal intervention, they harness their full potential.
            </Paragraph>
            <Paragraph>
              Their goal is to achieve excellence in their wines and to express the true essence of the region through them.
            </Paragraph>
          </div>

          {/* Story Image 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story5}
              alt="Underground barrel room at Altavins with stacked oak barrels"
            />
          </div>

          {/* Story Image 6 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story6}
              alt="Terracotta clay amphorae jars in Altavins aging cellar"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
