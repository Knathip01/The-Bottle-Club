import Image from 'next/image';
import Link from 'next/link';
import { Mountain, Star } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/bLEHi4iiQkCrvO4KGhPCbA_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/241927_granappasso_NEW/241927_granappasso_2_NEW_2560x1520.png',
  image2: 'https://images.vivino.com/misc/sponsorships/241927_granappasso_NEW/241927_granappasso_3_NEW_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/241927_granappasso_NEW/241927_granappasso_4_NEW_2560x1520.jpg',
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

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function GranAppassoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/241927/logos/NQhqiHhsQxuWrrvRRX3mBQ.png"
                alt="Gran Appasso logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Gran Appasso</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>13</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.1</b>
                </span>
                <span className="hidden sm:inline">37,590 total ratings</span>
                <span className="sm:hidden">37,590 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Gran+Appasso"
              className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs"
            >
              View wines
            </Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row
                label="Country"
                value={
                  <a href="https://www.vivino.com/en/explore/countries/italy" className="hover:underline">
                    Italy
                  </a>
                }
                icon={<span>🇮🇹</span>}
              />
              <Row
                label="Region"
                value={
                  <a href="https://www.vivino.com/en/explore/regions/puglia" className="hover:underline">
                    Puglia
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row
                label="Owned by"
                value={
                  <span title="I Viticoltori Felice e Armando Mergè">
                    I Viticoltori Felice e Armando Mergè
                  </span>
                }
                icon={<span className="text-base">◉</span>}
              />
            </div>
          </section>

          <section className="rounded-md border border-stone-200 bg-white p-2.5 text-[10px] sm:text-xs min-h-[32px]">
            <div className="text-stone-400 text-center text-[10px]">Puglia, Italy</div>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Hands with pruning shears holding a basket overflowing with freshly harvested dark grapes"
          />
          <Paragraph>
            The <strong>Gran Appasso</strong> line from <strong>I Viticoltori Felice e Armando Mergè</strong> is presented as a collection of wines celebrating Puglia&apos;s winemaking tradition. It employs various techniques, including appassimento (the natural drying of grapes), to create rich, structured, and long-lasting wines. Each bottle combines local enological heritage with eye-catching design and remarkable versatility, standing out as one of the most representative ranges of the winery.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Gran Appasso dark banner with grapes and official EU sponsorship logo"
          />
          <Paragraph>
            Among the most iconic wines are the <strong>Gran Appasso Primitivo Appassimento</strong>, the top-tier wine, and the <strong>Gran Appasso Primitivo Collezione</strong>. These wines are distinguished by their intense, bright ruby-red color, with balsamic aromas and notes of berries, black cherry, red currant, blue flowers, and sweet spices. On the palate, they are powerful yet elegant, smooth, well-balanced, and with surprising persistence.
          </Paragraph>
          <Paragraph>
            Another standout is the <strong>Gran Appasso Rosso - Aged in Oak</strong>, crafted from dried grapes. This wine features a rich aromatic profile of berries, red flowers, Mediterranean herbs, and cocoa, with an enveloping and balanced taste, perfect for pairing with meats and aged cheeses.
          </Paragraph>
          <Paragraph>
            The <strong>Gran Appasso Susumaniello</strong> also shines as an internationally appealing wine, along with another Primitivo in a simpler version.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Vast green vineyard landscape under blue sky with EU sponsorship banner"
          />
          <Paragraph>
            Rounding out the collection are the <strong>Gran Appasso Pinot Grigio</strong>, offering freshness with aromas of apple and white flowers; the <strong>Gran Appasso Rosato</strong>, with its pale pink hue and floral and strawberry notes; and the <strong>Gran Appasso Chardonnay-Fiano</strong>, which blends white fruit with aromatic herbs. These international varieties further enrich the authenticity of Poggio Le Volpi.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Full lineup of eleven Gran Appasso wine bottles with EU sponsorship banner"
          />
          <Paragraph>
            The Poggio Le Volpi winery is the result of years of research and dedication to quality. Every wine it produces is designed to tell a story: that of a family committed to shaping the future of Puglia’s wines while preserving respect for its traditions.
          </Paragraph>
        </article>
      </div>
    </div>
  );
}
