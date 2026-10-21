import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/252214/logos/uli_A_5STyeJ_rcaEkwYvg_500x500.png',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/td-CZRp9QRWR_ir7LeiZhg_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/52214_fantone_2_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/52214_fantone_3_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/52214_fantone_4_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/52214_fantone_5_2560x1520.jpg',
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

export default function IlFantoneContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Il Fantone Società Agricola logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Il Fantone Società Agricola</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>5</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Il%20Fantone%20Societ%C3%A0%20Agricola"
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
                  href="https://www.fantone.it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Website
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Phone */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Phone size={14} className="shrink-0 text-[#262626]" />
              <a
                href="tel:+393468085834"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                +39 346 808 58 34
              </a>
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:sergey.fantone@gmail.com"
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
              alt="Tuscan stone farmhouse of Il Fantone surrounded by cypress and green hills"
            />
          </div>

          {/* Paragraph 1 */}
          <div>
            <Paragraph>
              In the southern part of Tuscany, in the Maremma area, at an altitude of 370 meters above sea level, lie the vineyards of the Il Fantone estate. It is a compact winemaking enterprise where the introduction of modern technologies is combined with the preservation of local winemaking traditions.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Vineyard on gentle slope surrounded by forest and green Tuscan hills"
            />
            <Paragraph>
              The vineyards of Il Fantone belong to the geographic area of Scansano, where the Morellino di Scansano appellation, based on Sangiovese, is produced. A significant part of the land is classified as &ldquo;disadvantaged terrain,&rdquo; areas with reduced agricultural suitability. This determined the development strategy of the estate: choosing alternative grape varieties with higher potential, imported directly from France. In 2014, the first hectare of vineyards was planted.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3, 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Crates stacked full of harvested green grapes in winery facility"
            />
            <Paragraph>
              The total vineyard area is 7 hectares. Each plot has a distinct terroir identity. The soil profile of the Il Fantone hills includes calcareous-clay substrates, stony zones, and areas with softer loamy soils. This heterogeneity ensures optimal conditions for the differentiated development of grape varieties and allows control over vegetative processes and grape ripening.
            </Paragraph>
            <Paragraph>
              On the red soils, Cabernet Franc, Cabernet Sauvignon, Merlot, and Syrah are cultivated, producing base wines with high phenolic content, pronounced tannin structure, and a strong concentration of aromatic compounds. On the lighter, well-drained, and sunnier plots, the white varieties Vermentino, Sauvignon Blanc, and Chardonnay are grown, forming the basis for wines with fresh acidity, a vibrant aromatic profile, and the typical marine minerality of the Maremma.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Oak wine barrels stacked in cellar at Il Fantone"
            />
            <Paragraph>
              Il Fantone is a boutique winery in the Maremma, creating limited batches of wines from Syrah, Merlot, and Cabernet grown on the hills of Scansano.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 6, 7 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Lineup of six Il Fantone wine bottles displayed on outdoor table"
            />
            <Paragraph>
              Their style is the purity of the terroir, precision in their work, and the pursuit of expressiveness. In each wine, the depth of clay-limestone soils, the sea breeze, and the energy of southern Tuscany. They do not strive for volume. They strive for a taste that is unforgettable.
            </Paragraph>
            <Paragraph>
              Il Fantone — a modern interpretation of the Maremma in a glass.
            </Paragraph>
          </div>
        </article>
      </div>
    </div>
  );
}
