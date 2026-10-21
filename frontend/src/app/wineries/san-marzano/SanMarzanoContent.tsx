import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/81MShXkgSaaFv-CY0oMiVg_2560x1520.jpeg',
  grapes: 'https://images.vivino.com/misc/sponsorships/55648_SanMarzano/55648_SanMarzano_2026_1.jpg',
  growers: 'https://images.vivino.com/misc/sponsorships/55648_SanMarzano/55648_SanMarzano_2026_2.jpg',
  maresco: 'https://images.vivino.com/misc/sponsorships/55648_SanMarzano/55648_SanMarzano_2026_3.jpg',
  event: 'https://images.vivino.com/misc/sponsorships/55648_SanMarzano/55648_SanMarzano_2026_4.jpg',
  lifestyle: 'https://images.vivino.com/misc/sponsorships/55648_SanMarzano/55648_SanMarzano_2026_5.jpg',
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
      className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"
    />
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function SanMarzanoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://thumbs.vivino.com/wineries/55648/logos/03Csbq-cQY2_alfy3jt3QQ_500x500.jpeg"
                alt="San Marzano logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">San Marzano</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>179</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=San%20Marzano"
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
              <Row label="Owned by" value="San Marzano" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.sanmarzanowines.com/"
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
            <a
              href="https://www.instagram.com/sanmarzanowines/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"
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
              href="https://www.facebook.com/sanmarzanowines/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                Facebook
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:+390999576120" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              +39 099 9576120
            </a>
            <a href="mailto:info@cantinesanmarzano.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Just One More Glass Amore Mio - San Marzano"
          />
          <Paragraph>
            The San Marzano winery was founded in 1962 by 19 like-minded grape growers in the Primitivo di Manduria DOC in Taranto province in western Puglia, Southern Italy. Their goal was to pool their resources and increase the quality of their wines by building a modern-day winemaking facility where they could vinify their grapes. Their business model was so successful that today, more than 60 years after its founding, the winery cooperates with more than 1,200 growers.
          </Paragraph>
          <StoryImage
            src={images.grapes}
            alt="Primitivo grape clusters on the vine at San Marzano"
          />
          <Paragraph>
            The area is one of Italy’s most ancient areas for the farming and production of wines made from Primitivo, the most popular Apulian grape variety in the world. Here, iron- and limestone-rich soils and the sea breeze, which constantly flows over the narrow peninsula of Puglia, create the ideal conditions for making wines with extreme freshness, food-friendliness, and aging potential.
          </Paragraph>
          <StoryImage
            src={images.growers}
            alt="Winegrowers with tractor in San Marzano vineyard"
          />
          <Paragraph>
            San Marzano produces wines from a wide variety of local grape varieties, including also Negroamaro, Malvasia Nera, Verdeca, Susumaniello and Maresco, two once forgotten varieties that San Marzano has helped to revive. The wines regularly receive top rankings from Italy’s many wine guides, including the coveted Gambero Rosso Tre Bicchieri award.
          </Paragraph>
          <StoryImage
            src={images.maresco}
            alt="Sulla Maresco San Marzano bottle surrounded by blue flowers"
          />
          <Paragraph>
            The most iconic wine of San Marzano is Sessantanni, a barrel-aged Primitivo di Manduria, symbol of San Marzano’s way of thinking and working. Sessantanni changed the perception of wines from Puglia around the world.
          </Paragraph>
          <StoryImage
            src={images.event}
            alt="San Marzano evening gathering and celebration in Puglia"
          />
          <Paragraph>
            San Marzano bears the pride of its place and its community, and positions itself as more than just a winery. It strives to be a lifestyle brand that embodies Mediterranean culture, joy, and celebration. Consumers simply love San Marzano for its authentic lifestyle and distinct identity. An artsy and experimental style that infuses wines with a unique personality that goes beyond stereotypes, terroir and even Puglia borders.
          </Paragraph>
          <StoryImage
            src={images.lifestyle}
            alt="San Marzano Mediterranean lifestyle and wine"
          />
        </article>
      </div>
    </div>
  );
}
