import Image from 'next/image';
import Link from 'next/link';
import { Landmark, Mountain, Star } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/28564/logos/oooQGypySFG4TfEsLQf7HA_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/VwZ8TLeeRyis943_QHKyNg_2560x1520.jpeg',
  image1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/28564_anta%C3%B1o/28564_antan%CC%83o_1.jpg',
  image2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/28564_anta%C3%B1o/28564_antan%CC%83o_2.jpg',
  image3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/28564_anta%C3%B1o/28564_antan%CC%83o_3.jpg',
  image4: 'https://vivino.s3.amazonaws.com/misc/sponsorships/28564_anta%C3%B1o/28564_antan%CC%83o_4.jpg',
  banner: 'https://vivino.s3.amazonaws.com/misc/sponsorships/Jaume_en.jpg',
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

export default function AntanoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Antaño logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Antaño</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>20</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.3</b>
                </span>
                <span className="hidden sm:inline">42,503 total ratings</span>
                <span className="sm:hidden">42,503 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Anta%C3%B1o"
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
                label="Owned by"
                value="J. García Carrión"
                icon={<Landmark size={14} />}
              />
            </div>
          </section>

          {/* Empty Contacts Card matching Vivino layout */}
          <div className="rounded-md border border-stone-200 bg-white p-3 min-h-[38px]"></div>
        </aside>

        {/* Right Content / Story */}
        <article className="space-y-3 rounded-md border border-stone-200 bg-white p-2.5 sm:p-5">
          {/* Hero Image */}
          <div>
            <StoryImage
              src={images.hero}
              alt="Six bottles of Antaño Rioja wines on white background"
            />
          </div>

          {/* Story Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <Paragraph>
              Our winery is located in Labastida, a historic village in Rioja Alavesa. Here, we craft Antaño within old stone walls that have witnessed centuries of winemaking. The landscape, the climate, and the deep-rooted traditions make this area a unique place to grow grapes with true character.
            </Paragraph>
          </div>

          {/* Story Image 1 & Paragraph 2 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Antaño winery building facade with timber frame and wine barrels mural"
            />
            <Paragraph>
              Our winery spans 35,000 m², with the capacity to produce and bottle millions of bottles each year. Our wines rest in thousands of American and French oak barrels, where they develop their smoothness, structure, and the distinctive character that defines a great Rioja.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 3 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image2}
              alt="Green lush vineyard rows on hillside overlooking valley"
            />
            <Paragraph>
              Antaño knows how to balance tradition and modernity. We offer classic wines designed to age with elegance, as well as fresher, more immediate styles for those who want to enjoy their wine today. This makes our wines ideal both for cellaring and for opening right now.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 4 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image3}
              alt="Cellar room with Rioja sign and rows of barrels under wooden ceiling"
            />
            <Paragraph>
              We craft our wines using grapes such as Tempranillo, the emblematic variety of Rioja, which produces wines with body, fruit, balance, and that classic touch many recognize as “traditional Spanish wine.” These are wines with character, yet they remain approachable and easy to enjoy at home, with friends, over meals, or in everyday moments.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 5 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image4}
              alt="Vast barrel aging hall with thousands of stacked oak barrels under warm ceiling lighting"
            />
            <Paragraph>
              Antaño is more than a wine - it is an invitation to share. To enjoy tradition, to celebrate with simplicity and flavor. Every bottle is a connection to the land, to the generations who loved wine before us, and to those with whom we raise a glass today.
            </Paragraph>
          </div>

          {/* Bottom EU Banner */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="max-w-[280px]">
              <Image
                src={images.banner}
                alt="Funded by the European Union"
                width={280}
                height={60}
                unoptimized
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
