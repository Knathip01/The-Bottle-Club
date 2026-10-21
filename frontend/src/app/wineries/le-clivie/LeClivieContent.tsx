import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/98255/logos/hvnKztAvQ1mX0vzK08u4ug_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/VvKbBjI3Sb6MSnBqBfXtXA_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/98255_leclivie/98255_leclivie_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/98255_leclivie/98255_leclivie_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/98255_leclivie/98255_leclivie_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/98255_leclivie/98255_leclivie_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/98255_leclivie/98255_leclivie_5_2560x1520.jpg',
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

export default function LeClivieContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Le Clivie logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Le Clivie</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>30</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Le%20Clivie"
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
                value="Dacastello"
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9.783c0-.288 0-.431.037-.563a1 1 0 0 1 .159-.326c.082-.11.195-.198.422-.374l7.4-5.756c.351-.273.527-.41.72-.462a1 1 0 0 1 .523 0c.194.052.37.189.721.462l7.4 5.756c.227.176.34.264.422.374a1 1 0 0 1 .159.326c.037.132.037.275.037.563V19.4c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437C20.24 21 19.96 21 19.4 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C3 20.24 3 19.96 3 19.4V9.783Z" />
                  </svg>
                }
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.dacastellovini.com/linee-vino/le-clivie/"
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
              href="https://www.instagram.com/dacastellovini"
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
            <a
              href="https://www.facebook.com/dacastellovinipregiati"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="mailto:info@dacastellovini.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
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
            alt="Dacastello modern winery headquarters and Corten steel sign"
          />

          {/* Story Image 1 & Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Le Clivie branded wooden wine box with shadow of wine glass"
            />
            <Paragraph>
              The <strong>Le Clivie</strong> collection is Dacastello Vini’s most prestigious brand, a name that represents <strong>excellence on the Italian wine scene</strong>. The company is distinguished by the meticulous attention it pays to identifying and selecting areas of wine excellence, working carefully to respect the territory and tradition.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 2 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image2}
              alt="Panoramic view of lush vineyards across Piedmont hills"
            />
            <Paragraph>
              Each wine in the Le Clivie collection is the result of a relentless search for the perfect harmony between <strong>terroir, grape variety</strong> and <strong>vinification</strong>. The vineyards are all located in favourable areas and benefit from an ideal microclimate, which gives the wines a distinctive character and a complex structure. The company works in full harmony with the local producers best suited to viticulture, optimising the supply chain in terms of quality and of economic and environmental sustainability.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 3 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image3}
              alt="Le Clivie prestige wine bottles displayed in wooden crates"
            />
            <Paragraph>
              <strong>Le Clivie’s portfolio</strong> includes labels ranging from fresh, fragrant white wines to reds of impressive structure and longevity, to fine sparkling wines. Each bottle tells a story of passion and dedication, with the aim of offering unique sensory experiences to satisfy the most demanding palates.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 4 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image4}
              alt="Le Clivie red wine bottle on festive dinner table with decorative glasses and candle"
            />
            <Paragraph>
              The <strong>quality</strong> of Le Clivie wines is the expression of a constant commitment to perfection, thanks to the selection of the finest grapes and a winemaking process that respects tradition while also promoting innovation. This approach has also enabled Le Clivie wines to earn a prominent role in the <strong>restaurant</strong> world. Top restaurants and bars seeking products that embody excellence Made in Italy choose Le Clivie for its ability to offer unique sensory experiences that can enrich their wine lists and satisfy the most refined palates.
            </Paragraph>
          </div>

          {/* Story Image 5 & Paragraph 5 */}
          <div className="space-y-1 pt-2 pb-1">
            <StoryImage
              src={images.image5}
              alt="Woman holding bottle of Le Clivie wine beside classic red telephone box"
            />
            <Paragraph>
              Dacastello Vini is present with Le Clivie on the <strong>national</strong> and <strong>international</strong> markets, offering 20 types of wine that fully represent the territorial character and oenological value of Italy.
            </Paragraph>
          </div>
        </article>
      </div>
    </div>
  );
}
