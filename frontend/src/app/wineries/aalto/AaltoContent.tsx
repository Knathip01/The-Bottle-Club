import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mail, Mountain, Phone, Star, Target } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/7999/logos/7SHRsjydTpSfhw1X61Ms0Q_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/HdlM_UyNTGa4V49CNKQ3Pw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/7999_aalto/7999_aalto_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/7999_aalto/7999_aalto_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/7999_aalto/7999_aalto_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/7999_aalto/7999_aalto_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/7999_aalto/7999_aalto_5_2560x1520.jpg',
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

export default function AaltoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Aalto logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Aalto</h1>
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
                  <b>4.4</b>
                </span>
                <span className="hidden sm:inline">89,000 total ratings</span>
                <span className="sm:hidden">89,000 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Aalto"
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
                value="Aalto"
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
                  href="http://www.aalto.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Website
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
                  href="https://www.facebook.com/AALTO-Bodegas-y-Viñedos-902235409793333/"
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
                  href="https://twitter.com/aalto_winery"
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
                href="tel:+34983036949"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                +34 983 036 949
              </a>
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:aalto@aalto.es"
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
              alt="Modern Aalto winery architecture reflected in shallow water pool"
            />
          </div>

          {/* Story Image 1 & Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Aalto winery exterior building with reflection pool under clear blue sky"
            />
            <Paragraph>
              The AALTO project was launched in 1999 by Mariano García, who was the winemaker at Vega Sicilia for 30 years, and by Javier Zaccagnini. It is one of the most original of the modern era in Ribera del Duero and one update of the best traditions in this region. It is based on a range of high quality and style vines located in several places in Ribera del Duero whose altitudes range from 750m to 920m that allow assembling wines with different tints and thus ensuring a great complexity.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Fermentation cellar with large oak and stainless steel vats"
            />
            <Paragraph>
              This is AALTO: not just an exceptional plot, but a panoply of exceptional plots in different terroirs. In addition, the respectful work to the integrity of the grapes in a model winery has placed it in a differentiated and preference place among the great Spanish wineries.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Vast subterranean barrel aging cellar with symmetrical rows of oak barriques"
            />
            <Paragraph>
              The winery is in a beautiful valley, near Quintanilla de Arriba (Valladolid) with a modern building that hosts 5 different levels and a lineal and harmonic design with minimalistic, elegant, and comfortable details. The production of our wines is carried out by using gravity.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Modern wine tasting and reception salon with wooden beam ceilings and designer chairs"
            />
            <Paragraph>
              The winery currently controls 130 hectares of old, bush vines of indigenous clones of Tinto Fino, scattered in more than 200 plots located in 9 different locations of Ribera del Duero Appellation. Each vineyard, owned or rented, is grown up without herbicides nor chemical fertilizers, short pruning and with all growing operations focused on quality. The age of the vineyards ranges between 40 and 100 years old with a low yield and exceptional quality.
            </Paragraph>
          </div>

          {/* Story Image 5 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image5}
              alt="Centenary Tinto Fino bush vine gnarled trunk with young shoots in Ribera del Duero"
            />
            <Paragraph>
              Mariano García controls the yields, respecting the grapes as much as possible and his philosophy of minimum intervention searching for the maximum expression of the terroir in each plot. His wines unite the power and structure with elegance and complexity.
            </Paragraph>
          </div>
        </article>
      </div>
    </div>
  );
}
