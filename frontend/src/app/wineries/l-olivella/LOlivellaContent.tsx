import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/71855/logos/L9M3mxjET0uKkFQtgo2UWQ_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/j1XWmkD_T2KmwKUMCKQdGA_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/71855_lOlivella/71855_lOlivella_1.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/71855_lOlivella/71855_lOlivella_2.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/71855_lOlivella/71855_lOlivella_3.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/71855_lOlivella/71855_lOlivella_4.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/71855_lOlivella/71855_lOlivella_5.jpg',
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

export default function LOlivellaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="l'Olivella logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">l&apos;Olivella</h1>
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
                  <b>3.8</b>
                </span>
                <span className="hidden sm:inline">2,850 total ratings</span>
                <span className="sm:hidden">2,850 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=L%27Olivella"
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
                value="L'Olivella"
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
              href="https://www.olivella.it/"
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
              href="https://www.instagram.com/aziendaagricolaolivella/"
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
              href="https://www.facebook.com/AziendaAgricolaOlivella/"
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
            <a href="tel:+39069409403" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              +39 069409403
            </a>
            <a href="mailto:export@olivella.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
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
            alt="L'Olivella sunset vineyard landscape in Frascati"
          />

          {/* Section 1 */}
          <div className="space-y-1">
            <Heading>Foundation &amp; Identity</Heading>
            <Paragraph>
              Founded in 1986 by Umberto Notarnicola and Bruno Violo, L’Olivella is Frascati’s first organic winery and a symbol of excellence in the region’s winemaking tradition. From the very beginning, the founders envisioned a winery that honors nature while producing wines of elegance, depth, and character—making L’Olivella a pioneer in sustainable viticulture.
            </Paragraph>
            <div className="pt-1">
              <StoryImage
                src={images.image1}
                alt="Portrait of L'Olivella founder Umberto Notarnicola"
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-1">
            <Heading>Location &amp; Terroir</Heading>
            <Paragraph>
              Nestled in the heart of the Colli Albani, between Monteporzio and Frascati, L’Olivella benefits from a privileged position on volcanic hills just south of Rome along the historic Via Tuscolana. Its volcanic soils, rich in potassium, calcium, magnesium, and phosphorus, create wines of exceptional complexity and minerality. Low nitrogen levels and natural acidity ensure optimal grape maturation, resulting in flavors of intensity, finesse, and balance.
            </Paragraph>
            <div className="pt-1">
              <StoryImage
                src={images.image2}
                alt="Panoramic view of lush green vineyards with wooden fence in Colli Albani"
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-1">
            <Heading>Tradition &amp; History</Heading>
            <Paragraph>
              Frascati’s winemaking heritage stretches back to Roman times, when Tuscolo’s hills produced renowned wines. L’Olivella celebrates this legacy while adding a contemporary vision, crafting wines that reflect centuries of tradition. Each bottle tells a story of terroir, history, and dedication, connecting past and present in every sip.
            </Paragraph>
            <div className="pt-1">
              <StoryImage
                src={images.image3}
                alt="Historic rustic stone vineyard building in winter vineyards"
              />
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-1">
            <Heading>Cultivation &amp; Innovation</Heading>
            <Paragraph>
              The winery combines time-honored practices with modern innovation. High-density planting and the double Guyot training system ensure careful cultivation of each vine, maximizing quality and expression. Organic farming techniques respect the environment while highlighting the natural character of the grapes, producing wines that are both refined and authentic.
            </Paragraph>
            <div className="pt-1">
              <StoryImage
                src={images.image4}
                alt="Harvesting fresh grapes in golden autumn sunlight"
              />
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-1 pb-1">
            <Heading>Philosophy &amp; Quality</Heading>
            <Paragraph>
              At L’Olivella, every wine embodies passion, respect for the land, and a commitment to excellence. From vineyard to bottle, the winery captures the unique personality of the volcanic hills, delivering wines of elegance, intensity, and authenticity. Each sip invites wine lovers to experience the spirit of Frascati and the enduring vision of L’Olivella.
            </Paragraph>
            <div className="pt-1">
              <StoryImage
                src={images.image5}
                alt="Scenic sunset over rolling hills of L'Olivella estate in Lazio"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
