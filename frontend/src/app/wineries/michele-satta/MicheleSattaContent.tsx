import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/hEXMcp93So2eFv1vwHX5oA_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/11502_MicheleSatta/11502_MicheleSatta_1.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/11502_MicheleSatta/11502_MicheleSatta_2.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/11502_MicheleSatta/11502_MicheleSatta_3.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/11502_MicheleSatta/11502_MicheleSatta_4.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/11502_MicheleSatta/11502_MicheleSatta_5.jpg',
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

export default function MicheleSattaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/11502/logos/tGTyd2B9Qtm4D4VMFapfIQ.jpeg"
                alt="Michele Satta logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Michele Satta</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>14</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.0</b>
                </span>
                <span className="hidden sm:inline">28,596 total ratings</span>
                <span className="sm:hidden">28,596 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Michele%20Satta"
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
                  <a href="https://www.vivino.com/en/explore/regions/tuscany" className="hover:underline">
                    Toscana
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row label="Winemaker" value="Michele Satta" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.michelesatta.com/"
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
            <a href="tel:+390565763613" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              (+39) 0565763613
            </a>
            <a href="mailto:visite@michelesatta.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Rolling green vineyard landscape under blue sky in Bolgheri, Tuscany"
          />
          <Paragraph>
            There are stories born out of belonging, and others born out of choice. Michele Satta’s belongs to the second category. Having arrived in Bolgheri in the 1970s from Varese, with Sardinian blood and the mind of an agronomist, Michele looked at these lands through different eyes: not those of someone who inherits a name, but those of someone who decides to stay to write a new story.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Winemaker tasting red wine from a glass while standing among oak aging barrels"
          />
          <Paragraph>
            In 1983, he turned a gamble into reality, founding a winery driven by an idea as simple as it was revolutionary: wine shouldn&#39;t cater to the market, it must tell the story of the land.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Hands holding rich fertile vineyard soil in Bolgheri"
          />
          <Paragraph>
            As one of the founding fathers of the DOC, Satta dared to defy convention, producing with Piastraia one of the first Bolgheri Superiore DOCs in history and planting Sangiovese and Syrah in a temple dominated by Bordeaux varieties. A vision against the grain, born of someone who does not fear the loneliness of the pioneer.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Worker checking fermentation vessels and wine vessels in modern winery cellar"
          />
          <Paragraph>
            Today, the soul of the estate vibrates with the energy of Giacomo and Benedetta. With a team almost entirely under 35, the winery manages 25 hectares of its own vineyards, translating each harvest into roughly 150,000 bottles that are true fragments of the land.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Young Michele Satta harvest team gathered smiling on winery terrace"
          />
          <Paragraph>
            In the cellar, the motto is &quot;strip away&quot;: less artifice, more truth. Spontaneous fermentations that respect the imprint of the vintage. Minimal intervention, letting the grapes speak for themselves. Concrete and amphorae, tools chosen to preserve the purity of the fruit without masking it. Michele Satta’s wines are not made to seek easy consensus or follow passing trends. They are wines born to be faithful to the place.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Vineyard rows blooming with wildflowers under sunny skies"
          />
        </article>
      </div>
    </div>
  );
}
