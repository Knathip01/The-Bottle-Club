import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/22282/logos/we1ggPhQTbCAubIY0rt9lA_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/dYZ_JYFORTSVmW9RUqhjYQ_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/22282_Valpanera/22282_Valpanera_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/22282_Valpanera/22282_Valpanera_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/22282_Valpanera/22282_Valpanera_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/22282_Valpanera/22282_Valpanera_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/22282_Valpanera/22282_Valpanera_5_2560x1520.jpg',
  euBanner: 'https://images.vivino.com/misc/sponsorships/13_OCM_logo_2024_2560x1520.png',
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

export default function ValpaneraContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Valpanera logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Valpanera</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>23</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Valpanera"
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
              href="http://www.valpanera.it"
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
            <a href="mailto:valpanera@valpanera.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
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
            alt="Cantina Valpanera estate and surrounding vineyards in Aquileia"
          />

          {/* Story Image 1 & Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Vineyards nestled in lush greenery at Valpanera estate"
            />
            <Paragraph>
              A glimpse of the vineyards nestled in lush greenery. The vibrant rows of vines reflect the dedication to quality and the natural beauty of the land, showcasing the serene landscape where the wines begin their journey from grape to glass.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 2 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image2}
              alt="Rows of oak barrels in Cantina Valpanera barrel aging cellar"
            />
            <Paragraph>
              A detail of the barrel room, where the reserve wines are age. The photo captures the warm, inviting atmosphere of the cellar, with rows of oak barrels meticulously arranged. Here, the wines mature slowly, developing rich and complex flavors that reflect a commitment to quality and tradition. It&apos;s a glimpse into the heart of Cantina Valpanera, where craftsmanship meets passion.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 3 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image3}
              alt="Front view of Cantina Valpanera with Borgo Pacco vineyards in foreground"
            />
            <Paragraph>
              A front view of Cantina Valpanera, with the Borgo Pacco vineyards in the foreground. The photo highlights the picturesque setting of the winery, surrounded by lush red grape vineyards.The well-maintained rows of vines showcase the dedication to quality, with the backdrop of the winery reflecting the harmony between their winemaking tradition and the vibrant landscape.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 4 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image4}
              alt="Aerial top-down view of organized Cortona vineyard rows and gravelly soil"
            />
            <Paragraph>
              The Cortona vineyards, showcasing white grape varieties. The image highlights the gravelly terrain, ideal for white wines. The well-drained soil and organized rows of vines demonstrate the region&apos;s suitability for producing crisp, aromatic white wines.
            </Paragraph>
          </div>

          {/* Story Image 5 & Paragraph 5 & Link */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image5}
              alt="Hands-on grape harvesting and careful cluster selection at Valpanera"
            />
            <Paragraph>
              The careful, hands-on processing of grapes is evident, with each cluster receiving meticulous attention. The scene reflects the dedication and craftsmanship involved at every step, underscoring their commitment to quality and the artisanal care that goes into creating their wines.
            </Paragraph>
            <div className="px-0.5 pt-0.5">
              <a
                href="https://valpanera.it/it/"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-medium text-[#ba1628] underline hover:text-[#90111e] sm:text-[13px]"
              >
                Website
              </a>
            </div>
          </div>

          {/* EU / OCM Sponsorship Banner */}
          <div className="pt-3 pb-1">
            <Image
              src={images.euBanner}
              alt="Campagna finanziata ai sensi del reg. UE n. 2021/2115 - Campaign financed according to reg. EU n. 2021/2115"
              width={1280}
              height={180}
              unoptimized
              className="h-auto w-full object-contain"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
