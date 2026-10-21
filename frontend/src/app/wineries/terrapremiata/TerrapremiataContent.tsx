import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/276633/logos/_QWVgPJoT2mR4zD42KSVSQ_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/K_udzDKwR3Cr0veZ92AkFw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/276633_Terrapremiata/276633_Terrapremiata_1.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/276633_Terrapremiata/276633_Terrapremiata_2.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/276633_Terrapremiata/276633_Terrapremiata_3.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/276633_Terrapremiata/276633_Terrapremiata_4.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/276633_Terrapremiata/276633_Terrapremiata_header.jpg',
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

export default function TerrapremiataContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Terrapremiata logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Terrapremiata</h1>
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
                <span className="hidden sm:inline">479 total ratings</span>
                <span className="sm:hidden">479 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Terrapremiata"
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
                  <a href="https://www.vivino.com/en/explore/regions/marche" className="hover:underline">
                    Marche
                  </a>
                }
                icon={<Mountain size={17} />}
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.terrapremiata.it/"
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
              href="https://www.facebook.com/terrapremiata/"
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
            <a href="mailto:info@terrapremiata.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
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
            alt="Terrapremiata winery architecture nestled in the rolling hills of Marche"
          />

          {/* Paragraph 1 */}
          <div className="pt-1">
            <Paragraph>
              TerraPremiata is a boutique winery set among the rolling hills of Marche in central Italy. Surrounded by vineyards, olive groves, and landscapes shaped by the Adriatic Sea, the estate produces wines that reflect their origin through attentive vineyard work, measured cellar practices, and a close connection to the region&apos;s agricultural heritage.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Oak barrel heads in the cellar marked with TERRAPREMIATA and chalk vintage details"
            />
            <Paragraph>
              The winery grew from a family vision combining a longstanding entrepreneurial tradition with a passion for agriculture and wine. It represents a natural extension of the family&apos;s connection to Marche, where respect for the land, craftsmanship, and attention to detail have guided projects across generations.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Pouring red wine into glass overlooking vineyards from winery terrace"
            />
            <Paragraph>
              The vineyards lie between the Adriatic Sea and the Apennine Mountains. Warm days, cool nights, steady ventilation, and well-drained soils support balanced ripening, freshness, and aromatic definition. Sustainable farming practices help preserve the landscape&apos;s natural character and promote the long-term health of the vineyards.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Outdoor terrace seating with two chairs and table overlooking rolling vineyard hills"
            />
            <Paragraph>
              TerraPremiata follows a precise, restrained approach to winemaking. Grapes are harvested at optimal ripeness and vinified to preserve varietal character and express the nuances of each vintage. Careful maturation supports wines with balance, clarity, elegance, and a recognizable sense of place.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Modern architectural curved bronze exterior wall of Terrapremiata"
            />
            <Paragraph>
              The winery&apos;s philosophy begins in the vineyard. Each stage of production is guided by authenticity, craftsmanship, and respect for the surrounding environment. TerraPremiata seeks to express the identity of Marche through wines defined by freshness, balance, and a lasting connection to their origin.
            </Paragraph>
          </div>

          {/* Story Image 5 */}
          <div className="pt-1 pb-1">
            <StoryImage
              src={images.image5}
              alt="Sunset view over the modern Terrapremiata winery estate and vineyard rows"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
