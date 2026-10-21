import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/ObnnJt8cTGabCFciuEaHCg_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/2399_aloislageder_2023/2399_aloislageder_2023_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/2399_aloislageder_2023/2399_aloislageder_2023_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/2399_aloislageder_2023/2399_aloislageder_2023_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/2399_aloislageder_2023/2399_aloislageder_2023_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/2399_aloislageder_2023/2399_aloislageder_2023_5_2560x1520.jpg',
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

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function AloisLagederContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/2399/logos/24wZq3rmQUSHobJW5CnkXQ.jpeg"
                alt="Alois Lageder logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Alois Lageder</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>108</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.9</b>
                </span>
                <span className="hidden sm:inline">73,120 total ratings</span>
                <span className="sm:hidden">73,120 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Alois+Lageder"
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
                  <a href="https://www.vivino.com/en/explore/regions/alto-adige" className="hover:underline">
                    Südtirol - Alto Adige
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row label="Winemaker" value="Jo Pfisterer, Paola Tenaglia, Marion Pedron" icon={<span className="text-base">◉</span>} />
              <Row label="Owned by" value="Alois Lageder" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.aloislageder.eu"
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
              href="https://www.instagram.com/alois.lageder/"
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
              href="https://www.facebook.com/weinguttenutaaloislageder"
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
            <a href="tel:+390471809500" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              39 0471 809 500
            </a>
            <a href="mailto:info@aloislageder.eu" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Alois Lageder vineyard rows overlooking snowy Alpine peaks of Alto Adige"
          />
          <StoryImage
            src={images.image1}
            alt="Alois Clemens and Helena Lageder, sixth generation family owners"
          />
          <Paragraph>
            The Alois Lageder family winery produces lively and crisp wines from Alto Adige. Founded in 1823, today the winery is in the hands of the family’s sixth generation.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Panoramic mountain landscape and Alpine valley in Alto Adige"
          />
          <Paragraph>
            With creativity and an experimental spirit, Alois Lageder creates wines that reflect the diversity of Alto Adige. The winery is committed to biodynamic agriculture and has been farming the 135 acres family-owned vineyards biodynamically since 2004.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Alpine cow grazing among the vineyard rows as part of the living ecosystem"
          />
          <Paragraph>
            To create a living vineyard with a diversity of plants and animals, cows and oxen are grazing in the vineyards during the autumn and winter months. The winery keeps pigs and cultivates a vegetable garden with a wide variety of vegetables, fruits, herbs and cereals.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Experimental biodynamic vineyard rows with Alpine mountain backdrop"
          />
          <Paragraph>
            The Alois Lageder Winery collaborates with around 75 grape growers in Alto Adige to optimally exploit the diversity of the region. The goal is to motivate those partners to organic and biodynamic farming.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Alois Lageder viticulturist in vineyard trellis"
          />
          <Paragraph>
            In the vineyard and in the cellar, the winery is researching ways to respond to climate change and produce fresh and sustainable wines also in the future.
          </Paragraph>
          <div className="flex justify-center py-2">
            <Image
              src={images.banner}
              alt="Campaign financed according to EU Reg. No. 2021/2115 - Ministero dell'Agricoltura"
              width={1280}
              height={760}
              unoptimized
              className="h-auto w-full max-w-[420px] object-contain"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
