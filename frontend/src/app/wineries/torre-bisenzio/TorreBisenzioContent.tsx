import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone, Star } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/219446/logos/AREzp_a4T7C7Mne-gjQr_Q_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/oWxD_hxHT_C-a6-xR2BFBg_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/219446_torrebisenzio_2_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/219446_torrebisenzio_3_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/219446_torrebisenzio_4_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/219446_torrebisenzio_5_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/219446_torrebisenzio_6_2560x1520.jpg',
  image6: 'https://images.vivino.com/misc/sponsorships/219446_torrebisenzio_7_2560x1520.jpg',
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

export default function TorreBisenzioContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Torre Bisenzio logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Torre Bisenzio</h1>
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
                  <b>3.9</b>
                </span>
                <span className="hidden sm:inline">264 total ratings</span>
                <span className="sm:hidden">264 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Torre%20Bisenzio"
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
                  href="https://www.torrebisenzio.com/"
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
                  href="https://www.instagram.com/torrebisenzio"
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
                  href="https://www.facebook.com/torrebisenzio"
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
                  href="https://twitter.com/TorreBisenzio"
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
                href="tel:+390763495500"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                +39 0763 495 500
              </a>
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:wines@torrebisenzio.com"
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
              alt="Historic stone tower and farmhouse of Torre Bisenzio atop Umbrian hills"
            />
          </div>

          {/* Paragraph 1 */}
          <div>
            <Paragraph>
              Between the hills of Fabro and Allerona, in an area of Umbria that still preserves a strong rural identity and rich biodiversity, Torre Bisenzio stands as an example of contemporary viticulture capable of blending tradition and innovation.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Modern wine tasting room and bar at Torre Bisenzio overlooking countryside"
            />
            <Paragraph>
              The geographic setting—defined by heterogeneous soils, varying exposures, and distinct microclimates—offers an ideal environment for wine production focused on quality and respect for the land. Within this context, the estate has developed its production approach, guided by four core principles: tradition, authenticity, quality, and innovation.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Cozy rustic dining room with wooden table and terracotta tiled floors"
            />
            <Paragraph>
              The winery has been rebuilt within a historic farmhouse, preserving its original layout and enhancing its integration into the surrounding agricultural landscape.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Lounge chairs positioned by large arched window with panoramic view of Umbrian hills"
            />
            <Paragraph>
              Inside, elements that recall age-old practices coexist with tools of modern enology. The parallel use of amphorae and stainless-steel vats, combined with the calibrated use of French oak barriques, makes it possible to interpret different grape varieties with precision and to express the wines&apos; territorial identity in a distinctive way.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Wine cellar with wooden barrels, barriques, and terracotta amphora"
            />
            <Paragraph>
              The estate operates under certified organic standards—a choice that translates into continuous attention to vineyard balance and soil fertility. The grapes are harvested exclusively by hand, a practice that allows careful selection of clusters and preserves their integrity until they reach the winery.
            </Paragraph>
          </div>

          {/* Story Image 5 & Paragraph 6 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image5}
              alt="Wine glasses and bottle on outdoor terrace table with scenic valley view"
            />
            <Paragraph>
              At the same time, Torre Bisenzio uses the latest technologies to monitor agronomic and enological parameters, using data to support decision-making at every stage of production. This integrated approach avoids unnecessary intervention and makes it possible to enhance the unique characteristics of each vintage.
            </Paragraph>
          </div>

          {/* Story Image 6 & Paragraph 7, 8 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image6}
              alt="Dining table set with wine bottles, glasses, appetizers, and charcuterie"
            />
            <Paragraph>
              The result is a wine production philosophy committed to conveying, in every glass, the identity of the environment it comes from, while maintaining consistent quality and respect for the raw material.
            </Paragraph>
            <Paragraph>
              In an area that is attracting growing attention for its winemaking and environmental potential, Torre Bisenzio has established itself as a producer committed to promoting a thoughtful, resource-conscious form of viticulture—one that interprets the bond between landscape, technique, and local history.
            </Paragraph>
          </div>
        </article>
      </div>
    </div>
  );
}
