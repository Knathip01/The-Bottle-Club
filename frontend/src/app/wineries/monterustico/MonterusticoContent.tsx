import Image from 'next/image';
import Link from 'next/link';
import { Mountain, Star } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/7ZfSnlfdS4CIvXPxu09SjA_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/224604_monterustico_1new_2560x3040.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/224604_monterustico_2new_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/224604_monterustico_3new_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/OCM_GDVAJRA_LUIGI_BAUDANA_MONTERUSTICO.jpg',
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

function StoryImage({ src, alt, width = 1280, height = 760 }: { src: string; alt: string; width?: number; height?: number }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      className="h-auto w-full rounded-md object-cover"
    />
  );
}

function Paragraph({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px] ${className}`}>{children}</p>;
}

export default function MonterusticoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/224604/logos/GY8Nv6ZlQSuYUzlQHVkXHQ.jpeg"
                alt="Monterustico logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Monterustico</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>7</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.8</b>
                </span>
                <span className="hidden sm:inline">1,542 total ratings</span>
                <span className="sm:hidden">1,542 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Monterustico"
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
                  <a href="https://www.vivino.com/en/explore/regions/piemonte" className="hover:underline">
                    Piedmont
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row
                label="Owned by"
                value={
                  <Link href="/wineries/g-d-vajra" className="hover:underline">
                    GD Vajra
                  </Link>
                }
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13.765 11.585S15 12.554 15 14v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6c0-1.446 1.235-2.415 1.235-2.415.6-.503.578-1.062.578-1.062V7h2.374v3.524s-.021.559.578 1.061Z" />
                    <path d="M3 9.783c0-.288 0-.431.037-.563a1 1 0 0 1 .159-.326c.082-.11.195-.198.422-.374l7.4-5.756c.351-.273.527-.41.72-.462a1 1 0 0 1 .523 0c.194.052.37.189.721.462l7.4 5.756c.227.176.34.264.422.374a1 1 0 0 1 .159.326c.037.132.037.275.037.563V19.4c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437C20.24 21 19.96 21 19.4 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C3 20.24 3 19.96 3 19.4V9.783Z" />
                  </svg>
                }
              />
            </div>
          </section>

          {/* Bottom Box matching screenshot */}
          <section className="h-6 rounded-md border border-stone-200 bg-white" />
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1.5 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          {/* Hero Banner Image */}
          <StoryImage
            src={images.hero}
            alt="Rolling vineyard hills in Farigliano, Piedmont under warm sun"
          />

          {/* Story Image 1 & Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="High-angle view of curved path cutting through lush green vineyard rows in Farigliano"
              width={1280}
              height={1520}
            />
            <Paragraph>
              Monterustico is a dramatic hill, tucked in Farigliano, ten miles away south of Barolo and the Langhe hills. The vineyards here enjoy the proximity of the Tanaro river, only a few hundred feet away, and face the iconic peak of Monviso and the Alpine range, directly to the west.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 2 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image2}
              alt="Viticulturist tending and tying vines on high wooden posts"
            />
            <Paragraph>
              There is no shortage of challenges in this land. The untamed landscape and the old farming legacy have been threatened over the years, and many vineyards have already been ripped out.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 3 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image3}
              alt="Historic arched stone bridge over Tanaro river amidst green rolling hills"
            />
            <Paragraph>
              Impressed by the potential of this terroir, the Vajras stepped in with a dream to preserve and revive the local heritage and craft true, enticing wines.
            </Paragraph>
          </div>

          {/* EU OCM Banner Image */}
          <div className="pt-2 pb-1">
            <StoryImage
              src={images.image4}
              alt="Campaign financed according to EU regulation N. 2021/2115 - Ministry of Agriculture, Food Sovereignty and Forests"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
