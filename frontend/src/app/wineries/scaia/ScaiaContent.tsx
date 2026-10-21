import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/dgYlUrzjRZ-CGd4bxmCRFg_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/308515_Scaia/308515_Scaia_1.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/308515_Scaia/308515_Scaia_2.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/308515_Scaia/308515_Scaia_3.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/308515_Scaia/308515_Scaia_4.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/308515_Scaia/308515_Scaia_5.jpg',
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

export default function ScaiaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/308515/logos/JaJZCG1MSxyXjDhOp1jwUA.jpeg"
                alt="Scaia logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Scaia</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>9</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.0</b>
                </span>
                <span className="hidden sm:inline">72,030 total ratings</span>
                <span className="sm:hidden">72,030 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Scaia"
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
                  <a href="https://www.vivino.com/en/explore/regions/veneto" className="hover:underline">
                    Veneto
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row label="Owned by" value="Famiglia Castagnedi" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.scaiawine.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"
            >
              <span className="flex items-center gap-2">
                <Globe size={14} />
                Website
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:+390457650383" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              0039 045 7650383
            </a>
            <a href="mailto:info@tenutasantantonio.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Aerial view of Scaia estate and lush Valpolicella vineyards in Veneto"
          />
          <Paragraph>
            SCAIA was born from a daring vision: to reinterpret Verona’s winemaking heritage with a contemporary spirit, creating wines that place pleasure, versatility and accessibility at the heart of every glass.
          </Paragraph>
          <Paragraph>
            Created by the Castagnedi family, owners of Tenuta Sant’Antonio in Valpolicella, SCAIA represents a freer and more modern expression of the territory. The philosophy is simple: respect where wine comes from, while having the courage to explore where it can go.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Winemaker inspecting ripe white grapes under the traditional pergola canopy"
          />
          <Paragraph>
            Native grapes meet international varieties and innovative winemaking techniques, resulting in a collection of white, red and rosé wines that are fresh, distinctive and effortlessly enjoyable. SCAIA is designed to move naturally from an aperitif to dinner, from an informal gathering with friends to a special occasion.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="The Castagnedi family and winemaking team at the estate doors"
          />
          <Paragraph>
            Every detail reflects this approach. Carefully selected vineyards, distinctive stylistic choices and the brand’s signature glass stopper come together with a strong, contemporary visual identity to create wines that are as recognizable as they are approachable.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Hands holding rich mineral soil, limestone fragments, and fresh berries"
          />
          <Paragraph>
            SCAIA speaks to curious, social and mindful wine lovers who seek quality without unnecessary complexity. People who enjoy discovering new expressions of wine, sharing experiences and choosing differently – with confidence, curiosity and an open mind.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Lush green vine rows cascading down the sunny hills of Valpolicella"
          />
          <Paragraph>
            For SCAIA, wine is not about following rules. It is about enjoying the moment, connecting with others and celebrating the simple pleasures of life. A modern Italian wine brand with deep roots in Valpolicella, SCAIA is made to be shared, discovered and remembered.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Historic wayside shrine marking the entrance to the Scaia vineyard rows"
          />
        </article>
      </div>
    </div>
  );
}
