import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Target, User } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/2162/logos/LTPZuMF8SEa_D4uLHA5DQg_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/qg7fmxPjSpW31fSx-8Xrjg_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/2162_BodegasFaustino/2162_BodegasFaustino_1_1.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/2162_BodegasFaustino/2162_BodegasFaustino_2.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/2162_BodegasFaustino/2162_BodegasFaustino_3.jpg',
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

export default function BodegasFaustinoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Bodegas Faustino logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Bodegas Faustino</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>75</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Bodegas%20Faustino"
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
                value="Juan José Díez González"
                icon={<Target size={14} />}
              />
              <Row
                label="Owned by"
                value={
                  <a
                    href="https://familiamartinezzabala.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Familia Martínez Zabala
                  </a>
                }
                icon={<User size={14} />}
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
                  href="https://www.bodegasfaustino.com/"
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
                  href="https://www.instagram.com/faustinobodegas/"
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
                  href="https://www.facebook.com/faustinowines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Facebook
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:info@bodegasfaustino.es"
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
              alt="Bodegas Faustino Foster and Partners timber pavilion winery at sunset"
            />
          </div>

          {/* Paragraph 1, 2 */}
          <div className="space-y-1">
            <Paragraph>
              Bodegas Faustino, located in Oyón, Rioja Alavesa, and named 2025 &ldquo;European Winery of the Year&rdquo; by Wine Enthusiast, enjoys international renown earned through more than 160 years of producing premium wines.
            </Paragraph>
            <Paragraph>
              We are four generations inspired by the vineyards: yesterday, today, and forever. Our dedication is reflected in our 750 hectares of vineyards, located in the best areas of Rioja. As the largest vineyard owners in the region, our commitment to sustainability begins in every plot and extends throughout our entire production process.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 3, 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Landscape of Bodegas Faustino with modern pavilion and vineyard tractor (Photo by Nigel Young)"
            />
            <Paragraph>
              Bodegas Faustino has gained international renown in the most prestigious category of the DOCa Rioja, with Faustino I being the best-selling Gran Reserva of Rioja worldwide. THERE ARE FACES YOU NEVER FORGET, and Faustino is one of them. Our wines, featuring the unmistakable portrait on their label, are a symbol of quality and tradition that have established us as one of the 15 most admired wine brands in the world, according to the prestigious British magazine Drinks International.
            </Paragraph>
            <Paragraph>
              Bodegas Faustino is notable for its constant evolution and dedication to excellence. We work with the unique style of Faustino I Gran Reserva, with a blend that represents the highest expression of quality. A wine that not only reflects our dedication but also offers an extensive collection of old vintages, available for sale since the harvest of 1955.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 5, 6 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Underground brick-vaulted bottle aging cellar"
            />
            <Paragraph>
              Legado Bodegas Faustino, awarded the Best of Wine Tourism International 2025, is the new wine tourism project (Planet 1.0 and &apos;energy plus&apos;), created by the fourth generation of Familia Martínez Zabala in collaboration with Foster &amp; Partners. A project focused on providing a unique experience to our visitors, allowing guests to immerse themselves in a comprehensive and exclusive array of activities centered around wine, vineyards, architecture, culture, gastronomy and sustainability.
            </Paragraph>
            <Paragraph>
              At Legado Bodegas Faustino, we offer unique and multidisciplinary spaces, making it possible to carry out activities simultaneously, creating a wide range of possibilities and experiences and allowing each person who visits us to feel their own universe within our treasured world of wine. A place that offers a wide range of wine tourism and gastronomic options, including a wine bar where visitors can enjoy a glass of wine with tapas without having a reservation beforehand.
            </Paragraph>
          </div>

          {/* Story Image 3 */}
          <div className="pt-1 pb-1">
            <StoryImage
              src={images.image3}
              alt="Wooden arch pavilion over vineyard rows (Photo by Nigel Young)"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
