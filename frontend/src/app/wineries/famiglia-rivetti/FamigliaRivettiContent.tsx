import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/313204/logos/9DcplDZnRIWJKtQ8UAWDrg_500x500.png',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/BsmNu-o9R5S8CmDLPltCYw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/313204_famigliarivetti/313204_famigliarivetti_1_2560x1520.png',
  image2: 'https://images.vivino.com/misc/sponsorships/313204_famigliarivetti/313204_famigliarivetti_2_2560x1520.png',
  image3: 'https://images.vivino.com/misc/sponsorships/313204_famigliarivetti/313204_famigliarivetti_3_2560x1520.png',
  image4: 'https://images.vivino.com/misc/sponsorships/313204_famigliarivetti/313204_famigliarivetti_4_2560x1520.png',
  image5: 'https://images.vivino.com/misc/sponsorships/313204_famigliarivetti/313204_famigliarivetti_5_2560x1520.png',
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

export default function FamigliaRivettiContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Famiglia Rivetti logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Famiglia Rivetti</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>4</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.1</b>
                </span>
                <span className="hidden sm:inline">392 total ratings</span>
                <span className="sm:hidden">392 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Famiglia%20Rivetti"
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

          {/* Contacts Section */}
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white">
            <div className="flex min-w-0 items-center justify-between gap-2 px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <Globe size={14} className="shrink-0 text-[#262626]" />
                <a
                  href="https://www.famigliarivettiwines.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Website
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>
          </section>
        </aside>

        {/* Right Content / Story */}
        <article className="space-y-3 rounded-md border border-stone-200 bg-white p-2.5 sm:p-5">
          {/* Hero Image */}
          <div>
            <StoryImage
              src={images.hero}
              alt="Vineyard hills of Barbaresco Piedmont"
            />
          </div>

          {/* Paragraph 1 */}
          <div>
            <Paragraph>
              Famiglia Rivetti was born from a shared dream between three brothers to create their own take on the family&apos;s wines, while honoring five generations of tradition. What started as local farming has grown into something celebrated around the world, all rooted in the hills of Piedmont.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Rivetti winemaker leaning on vineyard trellis post"
            />
            <Paragraph>
              The Rivetti brothers grew up surrounded by vines. They knew the land, the grapes, and the stories. Today, they&apos;re putting their own spin on it—crafting wines that respect the past but speak to the present, all with the same care their family has shown the land for generations.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Winemaker walking down vineyard row under cloudy sky"
            />
            <Paragraph>
              In the heart of Barbaresco and Barolo, the Rivetti family farms organically—growing Barbera, Nebbiolo, Arneis, and more. They&apos;ve worked this land for five generations, always with the same goal: to make honest wines that reflect the beauty and soul of their region.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Lush green vineyard rows under summer sky"
            />
            <Paragraph>
              The vineyards are alive with over 20 types of herbs growing between the rows. No harsh chemicals, no shortcuts—just an organic system that supports the vines and the earth. It&apos;s all about balance, sustainability, and letting nature do what it does best.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Historic vines pruned and budding in spring"
            />
            <Paragraph>
              These wines aren&apos;t just delicious—they tell a story. You&apos;ll taste the richness of the soil, the strength of tradition, and the passion of a family that&apos;s all in. Whether it&apos;s a bold Barbaresco or a bright Arneis, every bottle captures the unique spirit of Piedmont.
            </Paragraph>
          </div>

          {/* Story Image 5 */}
          <div className="pt-1 pb-1">
            <StoryImage
              src={images.image5}
              alt="Famiglia Rivetti wine bottle served with assorted cheese board, bread, and nuts"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
