import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mail, Mountain, Phone, Star, Target } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/5415/logos/G6AAn1adSLShTyV62qAaJA_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/HvKSJM-sTr2P2J1w7v675w_2560x1520.jpeg',
  story1: 'https://images.vivino.com/misc/sponsorships/5415_valenciso/5415_valenciso_1_2560x1520_new.jpg',
  story2: 'https://images.vivino.com/misc/sponsorships/5415_valenciso/5415_valenciso_2_2560x1520_new.jpg',
  story3: 'https://images.vivino.com/misc/sponsorships/5415_valenciso/5415_valenciso_3_2306x2953.jpg',
  story4: 'https://images.vivino.com/misc/sponsorships/5415_valenciso/5415_valenciso_4_2560x1520_new.jpg',
  story5: 'https://images.vivino.com/misc/sponsorships/5415_valenciso/5415_valenciso_5_2560x1520.jpg',
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

export default function ValencisoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="VALENCISO logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">VALENCISO</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>8</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.1</b>
                </span>
                <span className="hidden sm:inline">24,755 total ratings</span>
                <span className="sm:hidden">24,755 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=VALENCISO"
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
                value="Compañía Bodeguera de Valenciso"
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
                  href="http://www.valenciso.es"
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
                  href="https://www.instagram.com/valencisorioja"
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
                  href="https://www.facebook.com/valencisorioja"
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
                  href="https://twitter.com/valencisorioja"
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
                href="tel:(34)941304724"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                (34)941304724
              </a>
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:valenciso@valenciso.com"
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
              alt="VALENCISO winery estate building overlooking vineyards in Ollauri, Rioja Alta"
            />
          </div>

          {/* Story Image 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story1}
              alt="Luis Valentín and Carmen Enciso founders of VALENCISO"
            />
          </div>

          {/* Story Paragraph 1 */}
          <div className="space-y-1">
            <Paragraph>
              Founded in 1998 by Luis Valentin and Carmen Enciso, although they working together for more than 30 years previously in a traditional Rioja winery, they chose the challenging path of starting VALENCISO with the dream of highlighting the essence of Tempranillo: Elegance, delicacy and freshness was the goal.
            </Paragraph>
          </div>

          {/* Story Image 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story2}
              alt="Golden autumn vineyards in Rioja Alta under misty mountains"
            />
          </div>

          {/* Story Paragraph 2 */}
          <div className="space-y-1">
            <Paragraph>
              Following sustainable viticulture, VALENCISO started with 2 hectares of vineyards in Rioja Alta. After all these years, they have 24 hectares divided into 17 plots. All their vineyards are organically farmed and they have incorporated biodynamic practices in order to deliver the true identity of origin and terroir to their wines.
            </Paragraph>
          </div>

          {/* Story Image 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story3}
              alt="High-ceiling winery hall with concrete tanks and arched steel beams"
            />
          </div>

          {/* Story Paragraph 3 */}
          <div className="space-y-1">
            <Paragraph>
              His winemaking philosophy is based on minimal intervention and slow processes. The grapes are selected by hand before fermentation begins in concrete tanks; using this type of tanks allows them to maintain a better longevity in their wines, achieving maximum expression and enhancing the complexity and perfection in all the wines. They are the only winery in the region that only uses concrete for fermentation.
            </Paragraph>
          </div>

          {/* Story Image 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story4}
              alt="Cellar room with round concrete pillars and barrel stacks"
            />
          </div>

          {/* Story Paragraph 4 */}
          <div className="space-y-1">
            <Paragraph>
              When fermentation is finished, all of their wines will age for at least one year in barrels. The time in barrels will deliver complexity helping to a long aging. For VALENCISO the use of the barrel is a complement to the wine so it is fully integrated. After the time in the barrel, the wines will return to the concrete tanks for sedimentation and natural fining, so their wines are not clarified.
            </Paragraph>
          </div>

          {/* Story Image 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.story5}
              alt="Red autumn vineyard rows on hillside with large VALENCISO corkscrew monument against pink-cloud sky"
            />
          </div>

          {/* Story Paragraph 5 */}
          <div className="space-y-1">
            <Paragraph>
              VALENCISO is today recognised as one of the 20 best wineries in Rioja, and one of the best in Spain. They are present in more than 41 countries, always in the most renowned, prestigious and fashionable places. On the other hand, year after year their wines are recognised by the specialized press all over the world, so don&apos;t hesitate to go and visit them!
            </Paragraph>
          </div>

          {/* Bottom link */}
          <div className="pt-2">
            <a
              href="https://valenciso.com/en/content/8-visits"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[11px] font-semibold text-[#ba1628] hover:underline sm:text-xs"
            >
              Valenciso.com
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
