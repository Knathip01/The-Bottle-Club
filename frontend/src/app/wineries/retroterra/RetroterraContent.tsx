import Image from 'next/image';
import Link from 'next/link';
import { Mountain, Star, User } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/319679/logos/Ih9X6gAiT2itRtFvLcJffg_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/cSId7wqtTQG7ExbboOpKFA_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/319679_retroterra_2.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/319679_retroterra_3.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/319679_retroterra_4.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/319679_retroterra_5.jpg',
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

export default function RetroterraContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Retroterra logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Retroterra</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>5</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.8</b>
                </span>
                <span className="hidden sm:inline">103 total ratings</span>
                <span className="sm:hidden">103 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Retroterra"
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
              <Row
                label="Owned by"
                value={
                  <a
                    href="https://www.femarvini.com/eng/index.asp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    I Viticoltori Felice e Armando Mergè
                  </a>
                }
                icon={<User size={14} />}
              />
            </div>
          </section>
        </aside>

        {/* Right Content / Story */}
        <article className="space-y-3 rounded-md border border-stone-200 bg-white p-2.5 sm:p-5">
          {/* Hero Image */}
          <div>
            <StoryImage
              src={images.hero}
              alt="Close-up of ripe purple wine grapes on the vine"
            />
          </div>

          {/* Paragraph 1 */}
          <div>
            <Paragraph>
              Retroterra is a story of return: the way of looking back in order to move forward. It is where memory meets land, and international grape varieties meet Mediterranean roots. Each wine reflects a simple idea: to build the future, you must deeply understand where you came from.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Sandy beach and calm blue Mediterranean sea in Puglia"
            />
            <Paragraph>
              In Puglia, where light, wind, and soil shape every detail, Retroterra works with respect and intention. The vineyards are carefully selected, and each grape is harvested at its optimal moment to preserve freshness, balance, and authenticity.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Vast vineyard rows stretching across red Puglia soil"
            />
            <Paragraph>
              The philosophy is clear: clean, respectful, and conscious winemaking. From Pinot Grigio to Primitivo, each bottle represents a balance between technique and tradition — expressive, accessible, and true to its origin.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Clusters of dark grapes hanging along vineyard rows"
            />
            <Paragraph>
              Retroterra does not aim to surprise, but to stay. These are wines designed to accompany everyday life — recognizable, consistent, and capable of telling a quiet story of place, patience, and identity.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Poster featuring Retroterra wine bottles: Pinot Grigio, Primitivo, Vermentino, Pinot Nero, and Sauvignon Blanc"
            />
            <Paragraph>
              From vineyard to bottle, every step follows one principle: let the terroir speak. The result is a versatile and sincere collection, where beauty begins with what keeps us grounded.
            </Paragraph>
          </div>
        </article>
      </div>
    </div>
  );
}
