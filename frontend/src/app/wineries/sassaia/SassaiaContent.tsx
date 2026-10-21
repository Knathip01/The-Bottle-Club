import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/249559/logos/HGjjVMKxR92Xy9GFBqPrNg_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/5lLqb9f-SpuWL0AX71zMjQ_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/249559_Sassaia/249559_Sassaia_1.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/249559_Sassaia/249559_Sassaia_2.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/249559_Sassaia/249559_Sassaia_3.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/249559_Sassaia/249559_Sassaia_4.jpg',
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="px-0.5 pt-2 text-xs font-bold leading-snug text-[#1e1e1e] sm:text-base">
      {children}
    </h2>
  );
}

function Paragraph({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px] ${className}`}>{children}</p>;
}

export default function SassaiaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Sassaia logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Sassaia</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>24</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.1</b>
                </span>
                <span className="hidden sm:inline">1,292 total ratings</span>
                <span className="sm:hidden">1,292 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Sassaia"
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
                  <a href="https://www.vivino.com/en/explore/regions/monferrato" className="hover:underline">
                    Monferrato
                  </a>
                }
                icon={<Mountain size={17} />}
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.sassaia.com/"
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
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1.5 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          {/* Hero Banner Image */}
          <StoryImage
            src={images.hero}
            alt="Estate building on hilltop overlooking green vineyard rows"
          />

          {/* Section 1: A Pioneer of Burgundy-Style Timorasso */}
          <div className="space-y-1 pt-1">
            <SectionHeading>A Pioneer of Burgundy-Style Timorasso</SectionHeading>
            <Paragraph>
              Sassaia is a pioneering winery in Monferrato, bringing experimentation and a modern winemaking perspective to one of Italy’s oldest wine regions. At the heart of that work is Sassaia’s role as a pioneer of Burgundy-style Timorasso, using barrel fermentation and Burgundian-inspired winemaking techniques to explore a distinct expression of this historic Piedmontese grape. Timorasso is an ancient native Piedmontese grape that had nearly disappeared by the late 20th century before being revived through the work of Walter Massa and other producers in the Colli Tortonesi.
            </Paragraph>
            <Paragraph>
              Timorasso matters because it is not a trendy grape. It is a comeback story. The variety almost vanished and is now proving that Piedmont can produce white wines with real depth, structure, and aging power.
            </Paragraph>
            <Paragraph>
              Known for its structure, freshness, complexity, and ability to evolve with age, Timorasso has emerged as one of Piedmont’s most exciting white wines. Sassaia explores a distinct expression of the grape through Burgundian-inspired winemaking techniques and the character of Piedmontese terroir.
            </Paragraph>
            <Paragraph>
              Sassaia’s Derthona Platinum Timorasso earned 93 points in Falstaff’s 2021 Trophy Piemont White.
            </Paragraph>
          </div>

          {/* Story Image 1 */}
          <div className="pt-1">
            <StoryImage
              src={images.image1}
              alt="Panoramic view of Sassaia vineyards and hills in Piedmont"
            />
          </div>

          {/* Section 2: Built to Experiment */}
          <div className="space-y-1 pt-1">
            <SectionHeading>Built to Experiment</SectionHeading>
            <Paragraph>
              Wine evolves because winemakers continue to question, learn, and experiment.
            </Paragraph>
            <Paragraph>
              That spirit has shaped Sassaia’s approach to Timorasso.
            </Paragraph>
            <Paragraph>
              Enrico de Alessandrini collaborated with Walter Massa, widely credited with reviving Timorasso, and Pierre Naigeon, a fifth-generation winemaker from Gevrey-Chambertin, to explore a different expression of this historic Piedmontese grape.
            </Paragraph>
            <Paragraph>
              The result is a wine that speaks two languages at once: the precision and texture associated with Burgundy, and the energy and identity of Piedmont.
            </Paragraph>
            <Paragraph>
              Sassaia helped pioneer this Burgundy-style approach to Timorasso through techniques including fermentation in French oak, harvesting in small containers, spontaneous fermentation, and extended aging in barrel.
            </Paragraph>
          </div>

          {/* Story Image 2 */}
          <div className="pt-1">
            <StoryImage
              src={images.image2}
              alt="Winemaker in cap and vest overlooking the vineyard landscape"
            />
          </div>

          {/* Section 3: Love White Burgundy? Discover Timorasso. */}
          <div className="space-y-1 pt-1">
            <SectionHeading>Love White Burgundy? Discover Timorasso.</SectionHeading>
            <Paragraph>
              For drinkers of white Burgundy, Timorasso offers a compelling point of discovery.
            </Paragraph>
            <Paragraph>
              Those drawn to texture, tension, depth, and wines that evolve in the glass will find familiar qualities in Sassaia’s expression of Timorasso.
            </Paragraph>
            <Paragraph>
              Sassaia’s Timorasso delivers the structure and layered complexity associated with Burgundy, but through a completely different grape and landscape. The result is familiar in feel, but new in origin.
            </Paragraph>
            <Paragraph>
              It is not Burgundy. It is an expression of what happens when Burgundian-inspired ideas are applied to Piedmont.
            </Paragraph>
          </div>

          {/* Story Image 3 */}
          <div className="pt-1">
            <StoryImage
              src={images.image3}
              alt="Lush golden-green cluster of ripe Timorasso grapes on the vine"
            />
          </div>

          {/* Section 4: Precision Starts in the Vineyard */}
          <div className="space-y-1 pt-1">
            <SectionHeading>Precision Starts in the Vineyard</SectionHeading>
            <Paragraph>
              Everything begins in the vineyard.
            </Paragraph>
            <Paragraph>
              Grapes are harvested by hand in the cool morning hours and transported to the winery in small 6 kg crates designed to preserve freshness and integrity.
            </Paragraph>
            <Paragraph>
              They are chilled before pressing and undergo 24 to 48 hours of cold maceration, followed by careful hand selection. After sorting, the fruit is gently pressed to protect purity and detail.
            </Paragraph>
          </div>

          {/* Section 5: A Burgundian-Inspired Approach in the Cellar */}
          <div className="space-y-1 pt-1">
            <SectionHeading>A Burgundian-Inspired Approach in the Cellar</SectionHeading>
            <Paragraph>
              From the press, the juice is moved gently into French Chassin oak for slow, low-temperature spontaneous fermentation.
            </Paragraph>
            <Paragraph>
              Barrel fermentation is central to Sassaia’s pioneering Burgundy-style approach to Timorasso, bringing another dimension of texture and complexity while allowing the character of the grape and vineyard to remain at the forefront.
            </Paragraph>
            <Paragraph>
              Throughout the process, technology is used to monitor the vineyard, fermentation, and aging, supporting a minimalist approach in the cellar rather than replacing it.
            </Paragraph>
            <Paragraph>
              This is what defines Sassaia today: a focus on precision, a respect for Piedmontese terroir, and a willingness to push how far it can be interpreted.
            </Paragraph>
          </div>

          {/* Story Image 4 */}
          <div className="pt-1 pb-1">
            <StoryImage
              src={images.image4}
              alt="Enrico de Alessandrini and partner smiling in the vineyards with Monferrato hills behind"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
