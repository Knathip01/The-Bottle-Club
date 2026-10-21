import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/20866/logos/rPPQQXz8QkKXv4pBVX2gdw_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/RpD4a18OTKSHI3Q5UMCDww_2560x1520.jpeg',
  image1a: 'https://images.vivino.com/misc/sponsorships/20866_numanthia/20866_numanthia_1a_2560x1520.jpg',
  image1: 'https://images.vivino.com/misc/sponsorships/20866_numanthia/20866_numanthia_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/20866_numanthia/20866_numanthia_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/20866_numanthia/20866_numanthia_3_2667x4000.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/20866_numanthia/20866_numanthia_4_NEW_2560x1520.jpg',
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

function Caption({ children }: { children: React.ReactNode }) {
  return <h6 className="px-0.5 pt-1 pb-0.5 text-[10px] font-medium leading-snug text-stone-600 sm:text-xs">{children}</h6>;
}

export default function BodegaNumanthiaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Bodega Numanthia logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Bodega Numanthia</h1>
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
                  <b>4.2</b>
                </span>
                <span className="hidden sm:inline">53,507 total ratings</span>
                <span className="sm:hidden">53,507 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Bodega%20Numanthia"
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
                  <a href="https://www.vivino.com/en/explore/regions/toro" className="hover:underline">
                    Toro
                  </a>
                }
                icon={<Mountain size={14} />}
              />
              <Row
                label="Owned by"
                value="Moët Hennessy"
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
                  href="http://www.numanthia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Website
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Phone */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Phone size={14} className="shrink-0 text-[#262626]" />
              <a
                href="tel:+34980699147"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                34 980 69 91 47
              </a>
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:contact@numanthia.com"
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
              alt="Bodega Numanthia winery estate building under blue sky"
            />
          </div>

          {/* Story Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              On the banks of the Duero River, deep within the Spanish province of Zamora, stretches the Toro wine region at the heart of which lies Bodega Numanthia.
            </Paragraph>
          </div>

          {/* Story Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              Bodega Numanthia is the renowned guardian of a unique Spanish winemaking heritage. It is born from a history of resilience and is a living tribute to the ancient city of Numancia whose inhabitants chose death over surrender in the face of Roman invasion. The Estate’s Tinta de Toro vines, among the world’s oldest, range from 30 to 200 years old.
            </Paragraph>
          </div>

          {/* Story Image 1a & Caption */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1a}
              alt="Lucas Löwi, Bodega Numanthia CEO beside terracotta amphora"
            />
            <Caption>Lucas Löwi, Bodega Numanthia CEO</Caption>
          </div>

          {/* Story Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              Sculpted by time, these pre-phylloxera vineyards of ungrafted vines have miraculously survived decades of climatic extremes, enduring harsh winters and blistering summers. They yield wines of extraordinary depth and complexity.
            </Paragraph>
          </div>

          {/* Story Image 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Ancient bush vines growing in dry rocky terroir of Toro"
            />
          </div>

          {/* Story Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              We manage a patchwork of more than 200 parcels across the Toro appellation, located on either bank of the Duero River. The diversity of these scattered vineyards, which include all 8 of the region’s terroir types, makes Bodega Numanthia the only winery in Toro to represent the area’s diversity so fully.
            </Paragraph>
          </div>

          {/* Story Image 2 & Caption */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Alejandro Vicente, Vineyard Manager and Leopoldo Queipo Sevillano, historical winegrower of Bodega Numanthia"
            />
            <Caption>Alejandro Vicente, Vineyard Manager and Leopoldo Queipo Sevillano, historical winegrower of Bodega Numanthia.</Caption>
          </div>

          {/* Story Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              Embracing our responsibility to preserve the terroir and its legacy for future generations, we encourage biodiversity and have adopted sustainable viticulture practices. We have never used pesticide or herbicide and our very low plant density allows us to avoid irrigation. Today, 100% of our Estate-owned vineyards are certified organic and are working to support our grower partners to achieve the same. We also own 16 hectares of forest surrounding our 200 plots, which we protect as a biodiversity reserve to safeguard the natural habitat of indigenous flora and fauna. When you taste a wine from Bodega Numanthia, savor the inimitable texture, vibrant character and beauty born from the ancient vines of this diverse terroir.
            </Paragraph>
          </div>

          {/* Story Image 3 & Caption */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Jesús Jiménez, Technical Director of Bodega Numanthia"
            />
            <Caption>Jesús Jiménez, Technical Director of Bodega Numanthia</Caption>
          </div>

          {/* Story Paragraph 6 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              Unique fruit requires unique winemaking. Our approach involves infusion, rather than extraction, allowing the grapes to reveal their full potential, and ensuring the unique balance of elegance and power so characteristic of Bodega Numanthia. Our wines are aged in French oak barrels or casks, terracotta amphoras or concrete tanks, for an optimal maturation.
            </Paragraph>
          </div>

          {/* Story Image 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Three bottles of Bodega Numanthia wines: Termes, Numanthia and Termanthia"
            />
          </div>

          {/* Story Paragraph 7 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              From a single grape variety: Tinta de Toro, we create three expressions, each profoundly different: Termes, Numanthia and Termanthia.
            </Paragraph>
          </div>
        </article>
      </div>
    </div>
  );
}
