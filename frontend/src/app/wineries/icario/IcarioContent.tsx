import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/16387/logos/2_Lu2n0gRuevSsMpPiuabA_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/pqQ_vsFRRz2PUAPh7Xm5sw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/16387_icario_2.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/16387_icario_3.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/16387_icario_4.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/16387_icario_5.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/16387_icario_6.jpg',
  euBanner: 'https://images.vivino.com/misc/sponsorships/ocm_logo_2025.png',
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

export default function IcarioContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Icario logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Icario</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>12</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.0</b>
                </span>
                <span className="hidden sm:inline">6,757 total ratings</span>
                <span className="sm:hidden">6,757 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Icario"
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
                  <a href="https://www.vivino.com/en/explore/regions/toscana" className="hover:underline">
                    Tuscany
                  </a>
                }
                icon={<Mountain size={17} />}
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.icario.it/it/home/"
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
              href="https://www.instagram.com/icariowinery/"
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
              href="https://www.facebook.com/icario.cantina"
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
            <a href="tel:+390578758845" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              +39 0578 75 88 45
            </a>
            <a href="mailto:Info@icario.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
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
            alt="Icario modern winery architecture and cypresses in Montepulciano"
          />

          {/* Section 1 */}
          <div className="space-y-1">
            <Heading>Where Tuscany feels like home</Heading>
            <Paragraph>
              In the heart of Tuscany, just outside Montepulciano, Icario is surrounded by vineyards, rolling hills and the timeless landscape that makes this corner of Italy so special. The estate is home to 27 hectares of vineyards, where Sangiovese takes centre stage and expresses the character of this unique territory.
            </Paragraph>
            <div className="pt-1">
              <StoryImage
                src={images.image1}
                alt="Icario estate vineyards and rolling hills with lavender in Tuscany"
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-1">
            <Heading>A modern vision of Vino Nobile</Heading>
            <Paragraph>
              Icario was created with a simple idea: to bring a fresh, contemporary vision to one of Tuscany’s most historic wines. The winery combines modern architecture and winemaking with a deep respect for the land, creating wines that are elegant, balanced, and unmistakably Tuscan.
            </Paragraph>
            <div className="pt-1">
              <StoryImage
                src={images.image2}
                alt="Modern Icario barrel cellar with rows of wooden barriques and oval casks"
              />
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-1">
            <Heading>Where the wines begin</Heading>
            <Paragraph>
              The vineyards lie between 300 and 420 metres above sea level, with different soils and exposures that shape the character of the wines. This natural diversity gives the freedom to create wines with freshness, elegance and depth, while staying true to Montepulciano.
            </Paragraph>
            <div className="pt-1">
              <StoryImage
                src={images.image3}
                alt="Ripening Sangiovese grapes on the vine at Icario"
              />
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-1">
            <Heading>A family with a vision</Heading>
            <Paragraph>
              Icario is owned by the Rothenberger family, who discovered in Montepulciano the perfect place to combine their passion for Tuscany, wine and hospitality. Their vision has shaped Icario into a winery where contemporary design, respect for the land and a warm welcome come together.
            </Paragraph>
            <div className="pt-1">
              <StoryImage
                src={images.image4}
                alt="Winemaker examining wine in glass in front of Icario bottle display"
              />
            </div>
          </div>

          {/* Section 5 */}
          <div className="space-y-1">
            <Heading>A taste of recognition</Heading>
            <Paragraph>
              The passion for Vino Nobile has also brought international recognition. In 2026, the Vino Nobile di Montepulciano was awarded Best in Show at the Decanter World Wine Awards — an extraordinary achievement that Icario is proud to share with the people who visit the estate and enjoy its wines around the world. But perhaps the best way to discover Icario is still the simplest one: come to Montepulciano, walk through the vineyards, and raise a glass to the wines that call this land home.
            </Paragraph>
            <div className="pt-1">
              <StoryImage
                src={images.image5}
                alt="Icario Vino Nobile di Montepulciano 2021 awarded 97 points Best in Show at Decanter World Wine Awards"
              />
            </div>
          </div>

          {/* EU / OCM Sponsorship Banner */}
          <div className="pt-3 pb-1">
            <Image
              src={images.euBanner}
              alt="Campaign financed according to EU regulation N. 2021/2115 - Ministero dell'Agricoltura della Sovranità Alimentare e delle Foreste"
              width={1280}
              height={140}
              unoptimized
              className="h-auto w-full object-contain"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
