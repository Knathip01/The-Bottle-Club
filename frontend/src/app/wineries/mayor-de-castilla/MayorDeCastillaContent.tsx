import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/163142/logos/ZpmLRq59RleWKGtB1A44mw_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/H5YWY4HMRsSUL-B2B3X9ww_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/163142_mdc_2.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/163142_mdc_3.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/163142_mdc_4.jpg',
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
    <div className="overflow-hidden rounded-md">
      <Image
        src={src}
        alt={alt}
        width={1280}
        height={760}
        unoptimized
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

function Paragraph({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px] ${className}`}>{children}</p>;
}

export default function MayorDeCastillaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Mayor de Castilla logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Mayor de Castilla</h1>
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
                  <b>3.5</b>
                </span>
                <span className="hidden sm:inline">24,048 total ratings</span>
                <span className="sm:hidden">24,048 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Mayor%20de%20Castilla"
              className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs"
            >
              View wines
            </Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row
                label="Country"
                value={
                  <Link href="/product?country=Spain" className="hover:underline">Spain</Link>
                }
                icon={<span>🇪🇸</span>}
              />
              <Row
                label="Owned by"
                value="J. García Carrión"
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
                  href="https://garciacarrion.com/"
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
                  href="https://www.instagram.com/garciacarrionesp/"
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#262626]">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                <a
                  href="https://www.facebook.com/GarciaCarrionESP/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Facebook
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Phone */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Phone size={14} className="shrink-0 text-[#262626]" />
              <a
                href="tel:914185537"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                (34)914185537
              </a>
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:atcliente@jgc.es"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                Winery Email
              </a>
            </div>
          </section>
        </aside>

        {/* Right Content / Story Article */}
        <article className="space-y-3 rounded-md border border-stone-200 bg-white p-2.5 sm:p-5">
          {/* Hero Image */}
          <div>
            <StoryImage
              src={images.hero}
              alt="Low bushy vines across rolling fields at golden sunset in Castilla y León"
            />
          </div>

          {/* Paragraph 1 */}
          <div className="space-y-1">
            <Paragraph>
              Mayor de Castilla is a journey through one of Spain’s great wine regions: Castilla y León. Rather than being defined by a single style, the collection explores different landscapes, grapes, and winemaking traditions across this historic part of northern Spain.
            </Paragraph>
          </div>

          {/* Story Image 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story1}
              alt="Glass of red wine next to bottle of Mayor de Castilla Reserva Ribera del Duero"
            />
          </div>

          {/* Paragraph 2 */}
          <div className="space-y-1">
            <Paragraph>
              Ribera del Duero is at the heart of the range. Here, Tempranillo — locally known as Tinta del País — produces expressive red wines combining ripe fruit, structure, and the character brought by oak ageing. Mayor de Castilla explores this style through Roble, Crianza, Reserva, and Gran Reserva wines.
            </Paragraph>
          </div>

          {/* Story Image 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story2}
              alt="Bottle of Mayor de Castilla Verdejo Rueda chilling in a bowl of ice"
            />
          </div>

          {/* Paragraph 3 & 4 */}
          <div className="space-y-2">
            <Paragraph>
              But Castilla y León is not only about red wine. Rueda brings a completely different personality to Mayor de Castilla, with Verdejo at the centre: fresh, aromatic white wines that show another side of the region and its winemaking diversity.
            </Paragraph>
            <Paragraph>
              The journey also reaches Toro, another historic wine region where Tempranillo takes on a more powerful expression. Different soils, climates and traditions allow the same family of grapes to reveal very different personalities across Castilla y León.
            </Paragraph>
          </div>

          {/* Story Image 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story3}
              alt="Lush green vineyard rows in Castilla y León"
            />
          </div>

          {/* Paragraph 5 */}
          <div className="space-y-1">
            <Paragraph>
              Behind Mayor de Castilla is García Carrión, a Spanish family wine company whose roots date back to 1890. Today, Mayor de Castilla brings together this experience with the diversity of Castilla y León — from fresh whites to oak-aged reds — offering different ways to discover the wines of the region.
            </Paragraph>
          </div>
        </article>
      </div>
    </div>
  );
}
