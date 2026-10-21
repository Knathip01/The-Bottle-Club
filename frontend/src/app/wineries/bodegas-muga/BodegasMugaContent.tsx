import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone, Star, Target } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/1467/logos/ehsjllyTQJmZm4LPQXY_mg_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/wFUqbTNaQCKIFKx3OsCUug_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/1467_muga_2024/1467_muga_2024_new_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/1467_BodegasMuga/1467_BodegasMuga_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/1467_muga_2024/1467_muga_2024_new_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/1467_BodegasMuga/1467_BodegasMuga_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/1467_BodegasMuga/1467_BodegasMuga_5_2560x1520.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/14_OCM_logo_SPANISH_2024_2560x1520.png',
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

export default function BodegasMugaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Bodegas Muga logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Bodegas Muga</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>22</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.1</b>
                </span>
                <span className="hidden sm:inline">270,024 total ratings</span>
                <span className="sm:hidden">270,024 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Bodegas%20Muga"
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
                  <a href="https://www.vivino.com/en/explore/regions/rioja" className="hover:underline">
                    Rioja
                  </a>
                }
                icon={<Mountain size={14} />}
              />
              <Row
                label="Winemaker"
                value="Bodegas Muga"
                icon={<Target size={14} />}
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
                  href="http://www.bodegasmuga.com"
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
                  href="https://www.instagram.com/bodegasmuga/"
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
                  href="https://www.facebook.com/bodegasmuga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Facebook
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* X */}
            <div className="flex min-w-0 items-center justify-between gap-2 px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#262626]">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <a
                  href="https://twitter.com/bodegasmuga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  X
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Phone */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Phone size={14} className="shrink-0 text-[#262626]" />
              <a
                href="tel:+34941306060"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                +941306060
              </a>
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:marketing@bodegasmuga.com"
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
              alt="Bodegas Muga winery and vintage steam locomotive in Barrio de la Estacion at dusk"
            />
          </div>

          {/* Story Image 1 & Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Cellar master rolling an oak barrel in the barrel aging cellar"
            />
            <Paragraph>
              What sets Bodegas Muga apart is its ability to blend tradition with time-honored techniques such as egg white fining and gravity-fed racking, methods that preserve the authenticity of their wines. Their commitment to oak throughout the winemaking process is unmatched—they are the only winery in Spain with their own cooperage, where a master cooper and three barrel-makers handcraft their barrels and vats.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Large oak fermentation vats lined in cellar"
            />
            <Paragraph>
              In 2024, Muga was ranked #23 in the World&apos;s Best Vineyards, placing it among the finest wineries globally. Additionally, their Muga Reserva 2020 vintage was named the best Spanish wine by the renowned Wine Spectator magazine, solidifying their reputation for excellence. And this is just the beginning; their website showcases more awards and recognitions that highlight their global prestige.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Awards graphic: World's Best Vineyards 2024 No. 23 Bodegas Muga and Wine Spectator Top 100 Wines of the Year"
            />
            <Paragraph>
              Muga doesn&apos;t just produce wine; they create experiences, honoring their family heritage while embracing a forward-looking vision. This perfect balance between past and present allows them to continue making a difference with every bottle they produce.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 4 & Link */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Master cooper handcrafting wooden barrels in the winery cooperage"
            />
            <Paragraph>
              For more about their story and achievements, be sure to visit their website and discover what makes Bodegas Muga truly exceptional.
            </Paragraph>
            <div className="py-0.5">
              <a
                href="https://www.bodegasmuga.com/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#BA1628] hover:underline sm:text-xs"
              >
                Get in touch with us
              </a>
            </div>
          </div>

          {/* Story Image 5 */}
          <div className="pt-1">
            <StoryImage
              src={images.image5}
              alt="Scenic view of autumn vineyards and mountains in Rioja"
            />
          </div>

          {/* EU Funding Banner */}
          <div className="pt-2 pb-1">
            <StoryImage
              src={images.banner}
              alt="EU and Spanish agricultural promotion funding banner"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
