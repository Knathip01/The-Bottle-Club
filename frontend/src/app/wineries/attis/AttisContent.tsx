import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mail, Mountain, Phone, Star, Target } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/16843/logos/1Byj999XSNeQ0gqic_kIDA_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/c7L7gOsITO-OiCUuNThPoA_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/16843_attis2025_1_2560x1520.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/16843_attis2025_2_2560x1520.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/16843_attis2025_3_2560x1520.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/16843_attis2025_4_2560x1520.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/16843_attis2025_5_2560x1520.jpg',
  euBanner: 'https://images.vivino.com/misc/sponsorships/16843_attis2025_9_2560x1520.png',
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

export default function AttisContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Attis logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Attis</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>28</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.0</b>
                </span>
                <span className="hidden sm:inline">24,170 total ratings</span>
                <span className="sm:hidden">24,170 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Attis"
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
                value="Bodegas Attis"
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
                  href="http://www.attisbyv.es/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Website
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
                  href="https://www.facebook.com/attisbodegas/"
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
                  href="https://twitter.com/attisbyv"
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
                href="tel:(34)986744790"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                (34)986744790
              </a>
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:info@attisbyv.com"
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
              alt="Fishing vessels and coastal bay at sunset in Val do Salnés, Rías Baixas"
            />
          </div>

          {/* Story Image 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story1}
              alt="Brothers Baldomero and Robustiano Fariña inspecting grape clusters in the vineyard"
            />
          </div>

          {/* Story Paragraph 1 */}
          <div className="space-y-1">
            <Paragraph>
              ATTIS Bodega y Viñedos is, without a doubt, an idealistic project, led by brothers Baldomero and Robustiano Fariña. They represent two profiles deeply rooted in the Val do Salnés, where they combine their lives between working at sea—farming mussels in the Arousa estuary—and tending the vineyards that produce a wide range of wines.
            </Paragraph>
          </div>

          {/* Story Image 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story2}
              alt="Artisanal winemakers operating traditional wooden basket press"
            />
          </div>

          {/* Story Paragraph 2 */}
          <div className="space-y-1">
            <Paragraph>
              Their restless nature and nonconformist spirit, along with the legacy of two previous generations, have driven them to delve deeper into their understanding of a unique environment, full of nuances and possibilities. This desire to learn has led them to explore both traditional and innovative winemaking techniques, always with respect for their land and their roots.
            </Paragraph>
          </div>

          {/* Story Image 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story3}
              alt="Winemaker smiling behind large terracotta clay amphorae"
            />
          </div>

          {/* Story Paragraph 3 */}
          <div className="space-y-1">
            <Paragraph>
              The diversity of wines they produce is the result of a constant quest to express a specific variety or plot of land in its most authentic way, drawing on different winemaking concepts. Their philosophy, deeply committed to the local, artisanal, and sustainable, is reflected in the creation of great Atlantic wines imbued with the ATTIS hallmark: tradition, character, and dedication.
            </Paragraph>
          </div>

          {/* Story Image 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story4}
              alt="Fariña brothers on a boat holding a bottle of ATTIS Mar aged underwater in the Arousa estuary"
            />
          </div>

          {/* Story Paragraph 4 */}
          <div className="space-y-1">
            <Paragraph>
              One of their most unique offerings is ATTIS Mar, an Albariño aged underwater in the waters of the Arousa estuary for six months. This bold undertaking was born as a crossover between the Fariña family&apos;s seafaring roots and their passion for wine, resulting in a unique sensorial experience.
            </Paragraph>
          </div>

          {/* Story Image 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story5}
              alt="Vineyard worker carrying bucket down lush vineyard rows"
            />
          </div>

          {/* Story Paragraph 5 */}
          <div className="space-y-2">
            <Paragraph>
              The wine routes led the Fariña brothers beyond the Galician Atlantic to the neighboring region of El Bierzo, where they continue the family legacy through SANGARIDA. A new terroir, a different landscape, and new challenges enrich the history of ATTIS with a new dimension.
            </Paragraph>
            <Paragraph>
              ATTIS is not just a winery, but a project of people, of a team… of a family. Each member contributes their essence to a philosophy that can be summed up in three words: AUTHENTIC, ARTISANAL, and ATLANTIC.
            </Paragraph>
          </div>

          {/* EU Funding Banner */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="overflow-hidden">
              <Image
                src={images.euBanner}
                alt="Financiado por la Unión Europea"
                width={600}
                height={150}
                unoptimized
                className="h-auto max-h-12 w-auto object-contain"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
