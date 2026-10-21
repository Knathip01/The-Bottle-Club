import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/mJBFpOFqR52TFRWsgnsf5w_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/1574_avignonesi/1574_Avignonesi_1.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/1574_avignonesi/1574_Avignonesi_2.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/1574_avignonesi/1574_Avignonesi_3.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/1574_avignonesi/1574_Avignonesi_4.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/1574_avignonesi/1574_Avignonesi_5.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/1574_avignonesi/1574_Avignonesi_6_OCM.png',
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

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="px-0.5 pt-2 text-xs font-bold text-[#1e1e1e] sm:text-sm">{children}</h2>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function AvignonesiContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/1574/logos/EnHeXvLKSAyMEWc0lsZ-1A.jpeg"
                alt="Avignonesi logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Avignonesi</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>54</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.1</b>
                </span>
                <span className="hidden sm:inline">81,487 total ratings</span>
                <span className="sm:hidden">81,487 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Avignonesi"
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
              <Row label="Winemaker" value="Avignonesi" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.avignonesi.it"
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
              href="https://www.facebook.com/avignonesi"
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
            <a
              href="https://twitter.com/avignonesi"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:+390578724304" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              39 0578 724304
            </a>
            <a href="mailto:info@avignonesi.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Avignonesi estate villa and courtyard in Montepulciano, Tuscany"
          />
          <Paragraph>
            Avignonesi is in the heart of Tuscany, between the historic towns of Montepulciano and Cortona. It is surrounded by rolling hills, vineyards, and olive groves, with beautiful views over the Tuscan countryside and nearby medieval villages.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Rolling hills, vineyards, and olive groves overlooking the Tuscan countryside"
          />
          <Heading>Ecological Transition</Heading>
          <Paragraph>
            In 2009, the estate was acquired by Virginie Saverys, who immediately began the transition to biodynamic farming and, over the years, nearly tripled the size of the property. Her vision challenged the status quo: she was one of the first in Italy to take this path.
          </Paragraph>
          <Paragraph>
            Today, Avignonesi aims to become a thought leader in the industry — embracing both the depth and the lightness of wine.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Vineyard floor and cypress tree silhouette bathed in warm golden sunset light"
          />
          <Heading>A Heritage, a Philosophy</Heading>
          <Paragraph>
            For us, agriculture comes before everything else.
          </Paragraph>
          <Paragraph>
            All our vineyards are estate-owned and certified biodynamic, covering over 170 hectares. Our wines are not “manufactured”, they are rather an expression of a time, a season, and a place. Today, we are an agricultural, human, and cultural ecosystem making honest wines — because there’s no beauty without goodness. We aim to be good ancestors, leaving better soil, land, and industry. Not a heritage, but an in-heritance brand.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Historic wrought-iron estate gates opening to cypress avenue and villa"
          />
          <Heading>Biodiversity, The only choice</Heading>
          <Paragraph>
            Good wine starts with good agriculture. We didn’t build a story around it; we simply practiced it.
          </Paragraph>
          <Paragraph>
            Today, that vision lives in La Stella: a vineyard regenerated for the future. Still not in production, it’s a resilient ecosystem — with agroforestry, geese for weed control, and biodiversity corridors. In 2024, its impact became clear: 25 butterfly species and the first presence of bats, key signs of a healthy, living environment.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Avignonesi wooden beehives with active bees promoting vineyard biodiversity"
          />
          <Heading>“Cura” Is our method</Heading>
          <Paragraph>
            Everything we do starts with attention - timing, materials, and what the vineyard is asking for. Over time, that attention has become a method: clear, steady, repeatable. We plant cover crops to rebalance the soil, use natural preparations to support microbial life, harvest by hand, prune with care, and let fermentations take the time they need.
          </Paragraph>
          <Paragraph>
            &quot;Cura&quot;, for us, is simply the daily way of doing things properly... and the only way of doing things.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Vineyard worker tending grapevines by hand in front of tall Tuscan cypress grove"
          />
          <div className="flex justify-center py-2">
            <Image
              src={images.banner}
              alt="Campaign financed according to EU Reg. N. 2021/2115 - Ministero dell'Agricoltura"
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
