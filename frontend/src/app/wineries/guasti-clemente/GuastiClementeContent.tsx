import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/uRTcgzUcSKSHCnPx4hMztg_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/6724_Guasti/6724_Guasti_1.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/6724_Guasti/6724_Guasti_2.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/6724_Guasti/6724_Guasti_3.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/6724_Guasti/6724_Guasti_4.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/6724_Guasti/6724_Guasti_5.jpg',
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

export default function GuastiClementeContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/6724/logos/yD9ft8Y8SrqfNc7S9yAh1g.jpeg"
                alt="Guasti Clemente logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Guasti Clemente</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>47</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Guasti%20Clemente"
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
              href="http://www.guasti.it"
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
              href="https://www.instagram.com/guasticlementewines"
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
              href="https://www.facebook.com/vinoitaliabarbera/"
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
            <a href="tel:+393358025368" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              +393358025368
            </a>
            <a href="mailto:info@clemente.guasti.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
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
            alt="Guasti Clemente historic winery building in Nizza Monferrato"
          />

          {/* Paragraph 1 & 2 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              A pioneer of single-vineyard Barbera since 1946, Guasti Clemente is rooted in the heart of Nizza Monferrato — a UNESCO heritage land where tradition meets innovation. From historic underground cellars to limited-production cru wines, every bottle tells the story of a family legacy three generations strong. Tap to discover our world.
            </Paragraph>
            <Paragraph>
              Founded in 1946 in Nizza Monferrato, this family winery began with Clemente Guasti’s bold vision: to elevate Barbera by producing <strong>100% pure varietal wines</strong> from individual vineyards, long before it became a trend.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 3 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image1}
              alt="Historic black and white photo of Bar e Bottiglieria in Nizza Monferrato"
            />
            <Paragraph>
              Today, led by Enrico Piantato, the third generation cultivates oldvine Barbera, Nebbiolo, Timorasso, Cortese, Moscato and some international varieties like Chardonnay and Cabernet Sauvignon.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 4 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image2}
              alt="Enrico Piantato standing proudly in the Guasti Clemente vineyard"
            />
            <Paragraph>
              Enrico believe each vineyard holds a story—its soil, microclimate and vine age—all echoed in our wine. Their underground cellar, rescued and restored, houses centuryold barrels alongside modern stainless steel, blending heritage with precision.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 5 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image3}
              alt="Monferrato vineyard landscape under golden sunset sky"
            />
            <Paragraph>
              Visitors tell the tasting experience surprises them: bottles you recognise, but vintages that speak of patience, authenticity and terroir. The doors are open to share not just wine, but the family’s passion — because every bottle carries a story, an home, a promise.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 6 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image4}
              alt="Large traditional oak barrels in the underground historic cellar"
            />
            <Paragraph>
              Tap through to explore our singlevineyard labels, meet the vines and taste what it means when tradition, place and curiosity converge.
            </Paragraph>
          </div>

          {/* Story Image 5 */}
          <div className="pt-2 pb-1">
            <StoryImage
              src={images.image5}
              alt="Visitors tasting wine and smiling in Guasti Clemente underground cellar"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
