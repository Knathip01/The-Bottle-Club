import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/318309/logos/9El50TRLS5CgpicU3HId-g_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/NFJJem1bSIKXOUS6HfU2lg_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/318309_tenutamaryamado_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/318309_tenutamaryamado_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/318309_tenutamaryamado_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/318309_tenutamaryamado_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/318309_tenutamaryamado_5_2560x1520.jpg',
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

export default function TenutaMaryamadoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Tenuta Maryamado logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Tenuta Maryamado</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>4</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Tenuta%20Maryamado"
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
            {/* Website */}
            <div className="flex min-w-0 items-center justify-between gap-2 px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <Globe size={14} className="shrink-0 text-[#262626]" />
                <a
                  href="https://www.maryamado.com/"
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
                  href="https://www.instagram.com/tenutamaryamado"
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
                  href="https://www.facebook.com/tenutamaryamado"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Facebook
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
              alt="Aerial view of Tenuta Maryamado villa and vineyards in San Casciano in Val di Pesa"
            />
          </div>

          {/* Paragraph 1 */}
          <div>
            <Paragraph>
              Tenuta Maryamado stands at the highest point of a natural amphitheatre, nestled among the hills of San Casciano in Val di Pesa. Here, a new vision of Nature takes shape: one where tradition, craftsmanship, and viticulture intertwine to honour the legacy of this land through agricultural mastery and a contemporary outlook.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="The historic Villa Bonorlo estate building surrounded by lush trees and manicured lawns"
            />
            <Paragraph>
              Tenuta Maryamado is the expression of a forward-thinking vision: to restore the original splendour of Villa Bonorlo, once the estate of the Guicciardini family, and its surrounding landscape through a project that harmoniously blends agriculture, architectural restoration, and the cultural heritage of the land. A reimagined Tuscan estate where nature, knowledge, and beauty engage in a sophisticated and contemporary dialogue.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Harvester in blue gloves carefully cutting grape clusters from vineyard canopy"
            />
            <Paragraph>
              The vineyards of Tenuta Maryamado unfold along a hillside ridge, rooted in Pliocene soils rich in clay and pebbles. The varied exposures and unique microclimate make this land particularly well-suited to the cultivation of elegant, structured red wines — from native varieties such as Sangiovese, Colorino, and Canaiolo, complemented by Cabernet and Merlot.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Winemaker drawing wine sample with glass pipette from oak barrel"
            />
            <Paragraph>
              The winery is a technological gem, featuring temperature-controlled stainless steel vats, dedicated spaces for amphora vinification, and an ageing cellar with barriques, tonneaux, and large casks. A place conceived to preserve, innovate, and enhance the unique identity of each wine.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Tenuta Maryamado wine collection: three red wines and one rosé bottle"
            />
            <Paragraph>
              The wines are the result of unwavering care and a genuine devotion to the land. Each label reflects the terroir and the winemaking savoir-faire, following a meticulous journey from vineyard to cellar — where time, soil, and passion converge in the pursuit of excellence.
            </Paragraph>
          </div>

          {/* Story Image 5 & Paragraph 6 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image5}
              alt="Ripe green olives on the olive tree branches"
            />
            <Paragraph>
              The artisanal products are born from ancestral knowledge and sustainable practices, guided by the same dedication that drives the approach to viticulture. In addition to seven distinct varieties of extra virgin olive oil, the range includes pasta, honey, and a limited selection of saffron and truffles.
            </Paragraph>
          </div>
        </article>
      </div>
    </div>
  );
}
