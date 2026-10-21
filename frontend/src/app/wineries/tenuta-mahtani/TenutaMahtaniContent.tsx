import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/307890/logos/opwYBzU5SimcBCHWw3jYaA_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/neWcRX0ZQx-TrgsjNr6x2g_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/307890_tenutamahtani/307890_tenutamahtani_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/307890_tenutamahtani/307890_tenutamahtani_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/307890_tenutamahtani/307890_tenutamahtani_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/307890_tenutamahtani/307890_tenutamahtani_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/307890_tenutamahtani/307890_tenutamahtani_5_2560x1520.jpg',
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

export default function TenutaMahtaniContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Tenuta Mahtani logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Tenuta Mahtani</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>4</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.3</b>
                </span>
                <span className="hidden sm:inline">66 total ratings</span>
                <span className="sm:hidden">66 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Tenuta%20Mahtani"
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
                  <a href="https://www.vivino.com/en/explore/regions/toscana" className="hover:underline">
                    Toscana
                  </a>
                }
                icon={<Mountain size={14} />}
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
                  href="https://www.tenutamahtani.it/"
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
                  href="https://www.instagram.com/tenutamahtani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Instagram
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Winery Email */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Mail size={14} className="shrink-0 text-[#262626]" />
              <a
                href="mailto:info@ninestarsintl.com"
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
              alt="Cypress trees standing in scenic vineyard rows at Tenuta Mahtani"
            />
          </div>

          {/* Story Image 1 & Caption 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="The main building at Tenuta Mahtani with pink flowers in the foreground"
            />
            <Paragraph>
              The main building at Tenuta Mahtani from a distance showing the magical floral arrangements that adorn the vineyard.
            </Paragraph>
          </div>

          {/* Story Image 2 & Caption 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Sunlight shining through lush vineyard vines at sunset"
            />
            <Paragraph>
              The vines from within the vines. The vines are exposed to a lot of sunlight leading to extremely expressive fruit.
            </Paragraph>
          </div>

          {/* Story Image 3 & Caption 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Worker in straw hat emptying bucket of harvested grapes into bin"
            />
            <Paragraph>
              The lush vegetation in and around the region of Maremma.
            </Paragraph>
          </div>

          {/* Story Image 4 & Caption 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Cypress trees and vineyard rows in Tuscany"
            />
            <Paragraph>
              The sheer focus and concentration behind every moment of every harvest.
            </Paragraph>
          </div>

          {/* Story Image 5 & Caption 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image5}
              alt="Close up of hand holding freshly picked cluster of ripe dark grapes"
            />
            <Paragraph>
              That expressive bold fruit that makes Tenuta Mahtani wines stand out.
            </Paragraph>
          </div>
        </article>
      </div>
    </div>
  );
}
