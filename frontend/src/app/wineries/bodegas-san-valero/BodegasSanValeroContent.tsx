import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Landmark, Mail, Mountain, Phone, Star, Target } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/14107/logos/AbobLb1KS8eByQJT-Mg_Lg_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/gD1SN6LjQxOe7ksUvpUfVw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/14107_sv_2.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/14107_sv_3.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/14107_sv_4.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/14107_sv_5.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/14107_sv_ocm_logo.jpg',
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

export default function BodegasSanValeroContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Bodegas San Valero logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Bodegas San Valero</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>131</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.6</b>
                </span>
                <span className="hidden sm:inline">39,705 total ratings</span>
                <span className="sm:hidden">39,705 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Bodegas%20San%20Valero"
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
                label="Winemaker"
                value="El Chocolatero"
                icon={<Target size={14} />}
              />
              <Row
                label="Owned by"
                value="Bodegas San Valero"
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
                  href="https://www.sanvalero.com"
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
                  href="https://www.instagram.com/bodegasanvalero/"
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
                  href="https://www.facebook.com/bodegaSanValero"
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
                  href="https://x.com/bodegasanvalero"
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
                href="tel:+34976620400"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                976 62 04 00
              </a>
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:bsv@sanvalero.com"
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
              alt="Bodegas San Valero outdoor wine storage tanks labeled B, S, V under blue sky"
            />
          </div>

          {/* Heading */}
          <div className="pt-1">
            <h2 className="text-xs font-bold leading-snug text-[#1e1e1e] sm:text-base">
              Bodegas San Valero: The Heart of Cariñena Since 1944
            </h2>
          </div>

          {/* Paragraph 1 */}
          <div className="space-y-1">
            <Paragraph>
              Founded in 1944, Bodegas San Valero has grown alongside the land and the people who have shaped Cariñena, one of Spain’s most historic wine regions. What began as a shared project among local winegrowers has become one of the leading wineries in the appellation, while remaining true to its roots.
            </Paragraph>
          </div>

          {/* Story Image 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Gnarled old vine trunk in stony arid Cariñena soil under overcast sky"
            />
          </div>

          {/* Paragraph 2 & Paragraph 3 */}
          <div className="space-y-2">
            <Paragraph>
              Today, more than 500 winegrowing families care for 3,500 hectares of vineyards, many of them located just a few minutes from the winery. Some of these plots have been passed down through generations, preserving a unique knowledge of the vineyards and a deep respect for the land.
            </Paragraph>
            <Paragraph>
              The strength of Bodegas San Valero lies in this connection between people and place. Thanks to more than 80 years of history, the winery has access to some of Cariñena’s most remarkable vineyards, where old vines thrive in a landscape shaped by altitude, sunshine, and the Cierzo, the iconic wind that defines the region’s character.
            </Paragraph>
          </div>

          {/* Story Image 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Winemakers testing and sampling wine with glass pipette in cellar barrel room"
            />
          </div>

          {/* Paragraph 4 & Paragraph 5 */}
          <div className="space-y-2">
            <Paragraph>
              Every wine begins with a simple idea: to express the authenticity of its origin. That is why we craft wines that reflect the character of our vineyards in a way that is approachable, balanced, and enjoyable—whether for a special occasion or shared around a table with family and friends.
            </Paragraph>
            <Paragraph>
              Looking ahead is just as important to us as honoring our past. Innovation and sustainability are at the heart of our commitment to preserving Cariñena’s winegrowing heritage and ensuring that future generations can continue to enjoy the richness of this unique region.
            </Paragraph>
          </div>

          {/* Story Image 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Hand resting on antique open manuscript book"
            />
          </div>

          {/* Paragraph 6 */}
          <div className="space-y-1">
            <Paragraph>
              Every bottle of Bodegas San Valero tells a story of collective effort, tradition, and pride in a remarkable land. It is the story of hundreds of families who, since 1944, have worked together to bring the essence of Cariñena to wine lovers around the world.
            </Paragraph>
          </div>

          {/* Story Image 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Red harvest crate filled with fresh ripe grapes in sunny vineyard"
            />
          </div>

          {/* Paragraph 7 */}
          <div className="space-y-1">
            <Paragraph>
              More than a winery, we are a community united by a passion for wine and a desire to share everything that makes Cariñena special. Because our greatest legacy is not only found in our vineyards, but also in the people who care for them every single day.
            </Paragraph>
          </div>

          {/* Bottom EU Banner */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="max-w-[260px]">
              <Image
                src={images.banner}
                alt="Financiado por la Unión Europea"
                width={260}
                height={65}
                unoptimized
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
