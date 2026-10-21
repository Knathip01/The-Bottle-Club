import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, User } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/2730/logos/3M_aV6CvQ2-WXuTax6czXg_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/uzSuqka0StGSqMEhqQUgTg_2560x1520.jpeg',
  image1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/2730_Campo+Viejo/CV1_1172x780.png',
  image2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/2730_Campo+Viejo/CV2_4096x2731.JPG',
  image3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/2730_Campo+Viejo/CV3_4096x2731.JPG',
  image4: 'https://vivino.s3.amazonaws.com/misc/sponsorships/2730_Campo+Viejo/CV4_3072x1959.JPG',
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

export default function CampoViejoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Campo Viejo logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Campo Viejo</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>54</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Campo%20Viejo"
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
                value={
                  <a
                    href="https://vinarchy.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Vinarchy
                  </a>
                }
                icon={<User size={14} />}
              />
            </div>
          </section>

          {/* Contacts Section */}
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white">
            <div className="flex min-w-0 items-center justify-between gap-2 px-3 py-2.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <Globe size={14} className="shrink-0 text-[#262626]" />
                <a
                  href="http://www.campoviejo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Website
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>
          </section>
        </aside>

        {/* Right Content / Story */}
        <article className="space-y-3 rounded-md border border-stone-200 bg-white p-2.5 sm:p-5">
          {/* Hero Image */}
          <div>
            <StoryImage
              src={images.hero}
              alt="Campo Viejo vineyard pathway leading to modern winery building"
            />
          </div>

          {/* Paragraph 1 */}
          <div>
            <Paragraph>
              In other words, we&apos;re obsessive about our grapes and the progressive techniques we use to deliver undeniably fresh flavor.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Person walking through colorful autumn vineyard in Rioja under blue sky"
            />
            <Paragraph>
              From modern twists on traditional winemaking to creating dynamic new styles, we&apos;re proud to fill your glasses with memorable wines fit for every palate and occasion.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Illuminated architectural arch gateway of Campo Viejo winery at twilight"
            />
            <Paragraph>
              The Campo Viejo winery opened its door in 2001 with a design that is a harmonious balance between oenology, architecture and sustainability.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Grand underground aging cellar filled with rows of oak barrels"
            />
            <Paragraph>
              These elements have come together to create a winemaking temple that remains on the cutting edge of the international wine industry today.
            </Paragraph>
          </div>

          {/* Story Image 4 */}
          <div className="pt-1 pb-1">
            <StoryImage
              src={images.image4}
              alt="Glass of red wine on windowsill overlooking the scenic Rioja landscape"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
