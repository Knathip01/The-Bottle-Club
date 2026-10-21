import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Phone, Star, Target } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/26319/logos/dZX4BgqzS_mK8BEWeyL9cA_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/mPY_-RDGS0qgmLnxaqYVlg_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/26319_dreissigacker/26319_dreissigacker_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/26319_dreissigacker/26319_dreissigacker_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/26319_dreissigacker/26319_dreissigacker_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/26319_dreissigacker/26319_dreissigacker_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/26319_dreissigacker/26319_dreissigacker_5_2560x1520.jpg',
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

export default function DreissigackerContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Dreissigacker logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Dreissigacker</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>53</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.8</b>
                </span>
                <span className="hidden sm:inline">20,538 total ratings</span>
                <span className="sm:hidden">20,538 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Dreissigacker"
              className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs"
            >
              View wines
            </Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row
                label="Country"
                value={
                  <Link href="/product?country=Germany" className="hover:underline">Germany</Link>
                }
                icon={<span>🇩🇪</span>}
              />
              <Row
                label="Winemaker"
                value="Dreissigacker"
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
                  href="http://www.dreissigacker-wein.de"
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
                  href="https://www.facebook.com/weingut-dreissigacker-663200253823156/?pnref=story"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
                >
                  Facebook
                </a>
              </div>
              <ExternalLink size={12} className="shrink-0 text-stone-400" />
            </div>

            {/* Phone */}
            <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
              <Phone size={14} className="shrink-0 text-[#262626]" />
              <a
                href="tel:+4962422425"
                className="truncate text-[11px] font-semibold text-[#1e1e1e] hover:underline"
              >
                +4962422425
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
              alt="Dreissigacker winery estate and vineyards at sunset"
            />
          </div>

          {/* Story Image 1 & Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Jochen Dreissigacker portrait"
            />
            <Paragraph>
              For more than 20 years, Jochen Dreissigacker, his family and his team have been cultivating vineyards in Bechtheim and Westhofen. During this time, there have been exceptional and challenging years, because nature follows its own rules.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Winemakers inspecting organic compost soil in the vineyard"
            />
            <Paragraph>
              As a winemaker, one adapts to these rules and strives to prepare the vineyards and vines as effectively as possible for whatever may come. In the belief that only healthy and robust plants can withstand changing weather conditions, the majority of our efforts are invested in the management of our vineyards.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Grey harvest bin stamped with DREISSIGACKER full of freshly picked grapes"
            />
            <Paragraph>
              Dreissigacker devotes almost 1000 hours of manual labour per hectare each year. Time is our priority. After all, it is time that brings out the best in their Rieslings.
            </Paragraph>
          </div>

          {/* Story Image 4 & Link */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Hand harvesting golden Riesling grapes with pruning shears in the warm sunlight"
            />
            <div className="py-0.5">
              <a
                href="https://dreissigacker-wein.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#BA1628] hover:underline sm:text-xs"
              >
                Dreissigacker-wein.de
              </a>
            </div>
          </div>

          {/* Story Image 5 */}
          <div className="pt-1 pb-1">
            <StoryImage
              src={images.image5}
              alt="Holding a bottle of Dreissigacker wine with glass in background"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
