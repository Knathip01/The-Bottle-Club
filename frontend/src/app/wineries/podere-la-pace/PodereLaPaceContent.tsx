import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/53953/logos/mxHrtA9dSw2rpAxubDjx7A_500x500.png',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/k8iBF69jRfKyZo9_UT3jtw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/53953_poderelapace_2.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/53953_poderelapace_3.jpg',
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

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="px-0.5 pt-2 text-xs font-bold leading-snug text-[#1e1e1e] sm:text-base">
      {children}
    </h2>
  );
}

function Paragraph({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px] ${className}`}>{children}</p>;
}

export default function PodereLaPaceContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Podere La Pace logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Podere La Pace</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>10</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.1</b>
                </span>
                <span className="hidden sm:inline">1,557 total ratings</span>
                <span className="sm:hidden">1,557 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Podere%20La%20Pace"
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
                label="Winemaker"
                value="Podere La Pace"
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11.392 22.723c.386.184.579.277.608.277s.222-.093.608-.277C14.777 21.692 22 17.854 22 12.5V8.287c0-.773 0-1.16-.123-1.494a2 2 0 0 0-.519-.777c-.262-.242-.618-.39-1.331-.686L14.28 2.946c-.227-.094-.34-.141-.456-.16a1 1 0 0 0-.314 0c-.117.019-.23.066-.456.16L3.973 5.33c-.713.296-1.07.444-1.331.686a2 2 0 0 0-.519.777C2 7.128 2 7.514 2 8.287V12.5c0 5.354 7.223 9.192 9.392 10.223Z" />
                    <path d="M12 16.9a4.4 4.4 0 1 0 0-8.8 4.4 4.4 0 0 0 0 8.8ZM17.5 12.5h-2.2M8.7 12.5H6.5M12 9.2V7M12 18v-2.2" />
                  </svg>
                }
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.poderelapace.com/en/"
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
              href="https://www.instagram.com/poderelapace/"
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
              href="https://www.facebook.com/poderelapace/"
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
            <a href="tel:+393791840252" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              +39 379 1840252
            </a>
            <a href="mailto:visite@poderelapace.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-2 overflow-hidden rounded-md border border-stone-200 bg-white p-2 sm:space-y-3 sm:p-3">
          {/* Hero Banner Image */}
          <StoryImage
            src={images.hero}
            alt="Podere La Pace modern architecture and signature winery in Massa Marittima"
          />

          {/* Intro Paragraphs */}
          <div className="space-y-1">
            <Paragraph>
              Nestled on the hills of Massa Marittima, overlooking the stunning Gulf of Follonica, lies Podere la Pace. The estate was born from the vision of creating an exceptional winemaking project where modern production technology blends seamlessly with absolute respect for the Tuscan landscape.
            </Paragraph>
            <Paragraph>
              This philosophy is faithfully reflected in the architecture of the signature winery. A contemporary, linear, and light structure characterized by large, bright windows. These transparent walls create a constant, unbreakable visual dialogue between the wine aging spaces and the surrounding nature, standing as a concrete symbol of their production transparency, cleanliness, and meticulous attention to detail.
            </Paragraph>
          </div>

          {/* Story Image 1 */}
          <div className="pt-1">
            <StoryImage
              src={images.image1}
              alt="Lush green vineyards and scenic landscape in Massa Marittima"
            />
          </div>

          {/* Section 1 */}
          <div className="space-y-1">
            <Heading>The Philosophy: Organic and Regenerative Viticulture</Heading>
            <Paragraph>
              The beating heart of Podere la Pace lies in the soil. The agronomic philosophy is founded on certified organic viticulture and the adoption of advanced regenerative practices. The team firmly believes that the soil is a living organism that must be protected and nourished for future generations.
            </Paragraph>
            <Paragraph>
              In the vineyard, they work daily to foster biodiversity, surrounded by woodlands and natural water basins that preserve the ecosystem. In this unique microclimate, where the coastal sun blends with the continuous sea breezes that cool the rows, their vines grow strong and in perfect balance, capable of producing grapes with an exceptional territorial identity—a faithful reflection of a pure and pristine Maremma.
            </Paragraph>
          </div>

          {/* Story Image 2 */}
          <div className="pt-1">
            <StoryImage
              src={images.image2}
              alt="Modern circular barrel cellar with columns and warm lighting at Podere La Pace"
            />
          </div>

          {/* Section 2 */}
          <div className="space-y-1 pb-1">
            <Heading>The Barrel Cellar: The Cradle of Elegance and Time</Heading>
            <Paragraph>
              At the heart of the structure lies the beautiful barrel cellar, a space featuring a modern and circular design. It is here, within this protected environment, that their international wines journey towards their ultimate elegance. Fine oak hosts the fermentation of their whites, imparting complexity, as well as the slow maturation of their reds, which age over time to develop extraordinary fineness and longevity. The clean geometries, the pillars, and the soft lighting reflect the obsessive care the team dedicates to every production phase.
            </Paragraph>
            <Paragraph>
              They do not seek power for its own sake, but rather millimetric balance and the distinctive freshness of Massa Marittima’s soils. A signature touch for a proud and deeply refined Maremma.
            </Paragraph>
          </div>
        </article>
      </div>
    </div>
  );
}
