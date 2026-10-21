import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/0asv-gKvSk6-xh9okmRaVw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/17215_panizzi_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/17215_panizzi_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/17215_panizzi_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/17215_panizzi_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/17215_panizzi_5_2560x1520.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/ocm_logo_2025.png',
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

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function PanizziContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/17215/logos/2KuZh9rIS_2kc4xtDlPUNA.jpeg"
                alt="Panizzi logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Panizzi</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>19</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.9</b>
                </span>
                <span className="hidden sm:inline">12,211 total ratings</span>
                <span className="sm:hidden">12,211 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Panizzi"
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
                  <a href="https://www.vivino.com/en/explore/regions/tuscany" className="hover:underline">
                    Tuscany
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row
                label="Winemaker"
                value="Walter Sovran"
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                }
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.panizzi.it"
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
              href="https://www.instagram.com/panizziwines"
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
              href="https://www.facebook.com/panizziwines/"
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
            <a
              href="https://twitter.com/panizziwines"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:+390577941576" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              +39 0577 941576
            </a>
            <a href="mailto:panizzi@panizzi.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Wine bottle wrapped in paper with cork at Panizzi winery"
          />
          <Paragraph>
            Sustainable practices and decades of expertise ensure authentic, terroir-driven wines that showcase San Gimignano&#39;s unique character. Discover why wine lovers and critics treasure Panizzi wines.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Wine glasses and bottles lined up with San Gimignano towers in the background"
          />
          <Paragraph>
            Pioneers of Vernaccia di San Gimignano and Pinot Noir, Panizzi focuses on identity and quality in viticulture and olive growing. Determined and uncompromising, the winery crafts authentic, organic, and sustainable wines that express the terroir with great aging potential.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Olive trees and vineyard rows facing the historic skyline of San Gimignano"
          />
          <Paragraph>
            Panizzi vineyards are located at 400 m elevation, emerging from ancient seabeds where fossil-rich soils and San Gimignano&#39;s microclimate create wines of unique minerality and freshness. That salty tang in your glass? It&#39;s millions of years of geological history speaking.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Sweeping panoramic view of Tuscan hills and vineyards around San Gimignano"
          />
          <Paragraph>
            Panizzi’s 55 ha of San Gimignano vineyards thrive amidst olive groves, forests, and crops — a mosaic landscape that boosts biodiversity. The forests shelter wildlife, while the winery preserves this unique ecosystem, protecting its identity and sense of place.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Bottle of Panizzi wine resting beside a vintage pocket watch on a stone slab"
          />
          <Paragraph>
            These small-lot, limited-production wines reflect a deep understanding — offering unexpected aging potential and distinctive character in every bottle. At the centre of Panizzi’s portfolio are four expressions of Vernaccia, each contributing in a specific way to a deeper understanding of the grape’s character and potential: from the stainless steel-fermented Green Label to the skin-macerated Evoé, by way of the single-vineyard Vigna Santa Margherita and the flagship Vernaccia Riserva.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Bottle of Panizzi red wine set horizontally against rustic bark texture"
          />
          <Paragraph>
            While Panizzi’s core range remains dedicated to the different, nuanced expressions of Vernaccia di San Gimignano, the winery’s team has also conducted important research into the potential of local terroirs to produce superior reds. The same conditions that allow Vernaccia to deliver wines of incredible precision—with a fine mineral backbone, subtle acid line, and poised texture—are also conducive to creating filigreed red wines, namely of the fussy Pinot Noir variety.
          </Paragraph>
          <div className="flex justify-center border-t border-stone-100 py-3">
            <Image
              src={images.banner}
              alt="Campaign financed according to EU Reg. N. 2021/2115 - Ministero dell'Agricoltura"
              width={800}
              height={100}
              unoptimized
              className="h-auto max-h-12 w-auto object-contain"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
