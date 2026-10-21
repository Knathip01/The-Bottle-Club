import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/OWFRC9a1RgKFKbp1KL-KHw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/292902_terraalpina/292902_terraalpina_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/292902_terraalpina/292902_terraalpina_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/292902_terraalpina/292902_terraalpina_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/292902_terraalpina/292902_terraalpina_4_2560x1520.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/2399_alois/2399_OCM_AloisLageder_TerraAlpina.png',
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

export default function TerraAlpinaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/292902/logos/cywf3YBSQM2vT-2-4O3XjQ.jpeg"
                alt="Terra Alpina logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Terra Alpina</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>6</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Terra%20Alpina"
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
              <Row
                label="Owned by"
                value={
                  <Link href="/wineries/alois-lageder" className="hover:underline">
                    Alois Lageder
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

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.terraalpina.eu/"
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
              href="https://www.instagram.com/terra.alpina/"
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
            <a href="tel:+390471809500" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              +39 0471 809 500
            </a>
            <a href="mailto:info@terraalpina.eu" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
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
            alt="Majestic Dolomites mountain wall in golden evening sunlight"
          />

          {/* Intro Section */}
          <div className="space-y-1 pt-1">
            <h3 className="px-0.5 font-semibold text-[#1e1e1e] text-[11px] sm:text-[13px]">
              Wines from the power of nature
            </h3>
            <Paragraph>
              Have you ever experienced the thrill of standing right in front of a majestic rock wall? Feeling the tension of power and beauty, liveliness and tranquility, danger and grace. This is what we want to capture in our wines. This is TERRA ALPINA.
            </Paragraph>
          </div>

          {/* Section 1: TERRA ALPINA SELECTION */}
          <div className="space-y-1 pt-2">
            <h2 className="px-0.5 text-xs font-bold tracking-wider text-[#1e1e1e] sm:text-sm">
              TERRA ALPINA SELECTION
            </h2>
            <h4 className="px-0.5 font-medium text-stone-600 text-[10px] sm:text-[12px]">
              Vibrant wines from the foothills of the Dolomites
            </h4>
            <StoryImage
              src={images.image1}
              alt="Hand holding bottle of Terra Alpina Selection against mountain forest greenery"
            />
            <Paragraph>
              The TERRA ALPINA Selection wines are characterized by a unique interplay of rough Alpine and warm Mediterranean influences in the Dolomites. This mountain range represents a combination of contrasting natural elements—hot and cold, valleys and peaks, limestone and porphyry—not found anywhere else in the world.
            </Paragraph>
          </div>

          {/* Section 1 Sub-part: Partners & Lageder */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image2}
              alt="Alois Lageder and wine-growing partners in Dolomiti vineyard"
            />
            <Paragraph>
              The Alois Lageder Winery works together with wine-growing partners from the Dolomiti area to create fresh and vibrant wines that reflect their unique origin—the Dolomites.
            </Paragraph>
          </div>

          {/* Section 2: TERRA ALPINA VOYAGE */}
          <div className="space-y-1 pt-2">
            <h2 className="px-0.5 text-xs font-bold tracking-wider text-[#1e1e1e] sm:text-sm">
              TERRA ALPINA VOYAGE
            </h2>
            <h4 className="px-0.5 font-medium text-stone-600 text-[10px] sm:text-[12px]">
              Crossing borders in the alpine terroir
            </h4>
            <StoryImage
              src={images.image3}
              alt="Hand holding bottle of Terra Alpina Voyage against green alpine backdrop"
            />
            <Paragraph>
              TERRA ALPINA Voyage crosses borders and combines organic grapes from European wine growing regions, which are all influenced by the alpine terroir: fresh, lively and full of tension.
            </Paragraph>
          </div>

          {/* Section 2 Sub-part: Helena & Clemens Lageder */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image4}
              alt="Helena and Clemens Lageder portrait in Alto Adige"
            />
            <Paragraph>
              TERRA ALPINA Voyage was initiated by Helena and Clemens Lageder. The family has worked as winegrowers in Alto Adige, in the heart of the Dolomites, for almost 200 years and has always been fascinated by the alpine terroir. This was the motivation to discover other European regions, which are characterized by similar conditions and connect them into one wine. The focus doesn&#39;t lie on political borders, but on the unifying landscape—the mountains. Both wines are organic certified.
            </Paragraph>
          </div>

          {/* EU OCM Banner */}
          <div className="pt-2 pb-1">
            <StoryImage
              src={images.banner}
              alt="Campaign financed according to EU regulation N. 2021/2115 - Ministero dell'Agricoltura della Sovranità Alimentare e delle Foreste"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
