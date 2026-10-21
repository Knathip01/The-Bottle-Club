import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/70881/logos/oCCcU1afRhC20e56Ipo15g_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/FbOUD0u0T3eOH9RYv4bFJw_2560x1520.jpeg',
  image1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/70881_ilponte/70881_agricola_1.jpg',
  image2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/70881_ilponte/70881_agricola_2.jpg',
  image3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/70881_ilponte/70881_agricola_3.jpg',
  image4: 'https://vivino.s3.amazonaws.com/misc/sponsorships/70881_ilponte/70881_agricola_4.jpg',
  image5: 'https://vivino.s3.amazonaws.com/misc/sponsorships/70881_ilponte/70881_agricola_5.jpg',
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

export default function IlPonteContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Il Ponte logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Il Ponte</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>8</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.9</b>
                </span>
                <span className="hidden sm:inline">1,176 total ratings</span>
                <span className="sm:hidden">1,176 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Il%20Ponte"
              className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs"
            >
              View wines
            </Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row
                label="Country"
                value={
                  <Link href="/product?country=Italy" className="hover:underline">Italy</Link>
                }
                icon={<span>🇮🇹</span>}
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.agricolailponte.com/it"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <Globe size={14} />
                Website
              </span>
              <ExternalLink size={11} />
            </a>
            <a
              href="https://www.instagram.com/ilpontecapalbio"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                Instagram
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:+393334843966" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              +39 333 4843966
            </a>
            <a href="mailto:capalbio@agricolailponte.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1.5 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          {/* Hero Banner Image */}
          <StoryImage
            src={images.hero}
            alt="Aerial view over lush green vineyards in Maremma, Capalbio"
          />

          {/* Paragraph 1 */}
          <div className="pt-1">
            <Paragraph>
              Il Ponte Winery in Capalbio was born from a simple idea: to take care of the land and let it tell its story through wine and oil. Nestled in the countryside of Capalbio, in the heart of the Maremma, the company has grown thanks to family passion rather than industrial logic, maintaining an authentic and consistent dimension over time.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Wine barrel architecture overlooking rolling hills in Capalbio"
            />
            <Paragraph>
              The days begin with checking the vineyards, observing the condition of the plants and the progress of the season. Quality starts here: from respect for the environment, continuity with tradition, and the daily commitment of those who work in the fields.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Close-up of young vine shoots and fresh green grape leaves"
            />
            <Paragraph>
              In the cellar, the same approach guides every choice, without chasing trecends but focusing on a recognizable style that is faithful to the territory. Each harvest thus becomes a moment of shared work, made up of dedication, experience, and collaboration.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Hands holding a bottle of Il Ponte Asher wine and natural wooden cork"
            />
            <Paragraph>
              In Maremma, the varieties that best express this identity are Vermentino, Ansonica, and Sangiovese. These grapes are linked to local history and produce balanced, authentic wines. Alongside these, there are also some international varieties, which blend in harmoniously and enrich production without ever losing sight of the identity of the place.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Vine row label Vigna Gentili Cabernet Sauvignon at Il Ponte"
            />
            <Paragraph>
              What makes Il Ponte special is its human dimension: each bottle tells a story of real hands, sincere choices, and a deep connection with this corner of Tuscany.
            </Paragraph>
          </div>

          {/* Story Image 5 */}
          <div className="pt-1 pb-1">
            <StoryImage
              src={images.image5}
              alt="Wine tasting glasses on branded Il Ponte Capalbio tasting mat"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
