import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/BRP8rWe4Rr-aMsV-XW3r8g_2560x1520.jpeg',
  sunsetVineyard: 'https://images.vivino.com/misc/sponsorships/7941_Ornellaia/7941_ornellaia_1_2560x1520.jpg',
  soil: 'https://images.vivino.com/misc/sponsorships/7941_Ornellaia/7941_ornellaia_1.jpg',
  harvestAerial: 'https://images.vivino.com/misc/sponsorships/7941_Ornellaia/7941_ornellaia_3_2560x1520.jpg',
  cellarArchitecture: 'https://vivino.s3.amazonaws.com/misc/sponsorships/7941_Ornellaia/7941_ornellaia_4_2560x1520.jpg',
  artGallery: 'https://vivino.s3.amazonaws.com/misc/sponsorships/7941_Ornellaia/7941_ornellaia_5_2560x1520.jpg',
  bottles: 'https://vivino.s3.amazonaws.com/misc/sponsorships/7941_ornellaia_new_6.jpg',
  certBadge: 'https://images.vivino.com/misc/sponsorships/1249_Frescobaldi/Frescobaldi_OCM_double.png',
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

export default function OrnellaiaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://thumbs.vivino.com/wineries/7941/logos/ZlMbZTeuRL6QLQE8Ot0Zng_500x500.jpeg"
                alt="Ornellaia logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Ornellaia</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>33</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.2</b>
                </span>
                <span className="hidden sm:inline">253,754 total ratings</span>
                <span className="sm:hidden">253,754 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Ornellaia"
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
              <Row label="Owned by" value="Marchesi Frescobaldi" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.ornellaia.com/en/"
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
              href="https://www.instagram.com/ornellaiawinery/"
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
            <a href="tel:+39056571811" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              39 0565 718 11
            </a>
            <a href="mailto:info@ornellaia.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Tenuta dell'Ornellaia winery building nestled in Bolgheri foothills"
          />
          <Paragraph>
            The Ornellaia estate lies hidden in the foothills that face the Mediterranean coast close to Bolgheri. The majority of the Ornellaia vineyards are situated on the hillside around the village.
          </Paragraph>
          <Paragraph>
            The vineyards benefit from the reflection of the light on the sea nearby and an exceptional microclimate that enhances the Mediterranean character of the wines.
          </Paragraph>
          <StoryImage
            src={images.sunsetVineyard}
            alt="Ornellaia vineyard and ancient olive tree at sunset"
          />
          <Paragraph>
            A total of 134 hectares in production is divided into a mosaic of more than 70 different plots according to soil type, exposition, and varietal. The great variability of the soils – marine, alluvial, or volcanic origins – combines with the lay of the land to create a highly diversified patchwork of micro-terroirs.
          </Paragraph>
          <StoryImage
            src={images.soil}
            alt="Hands holding rich Mediterranean terroir soil of Bolgheri"
          />
          <Paragraph>
            The team&apos;s goal is to capture the estate’s great terroir in the complexity of all its facets. Reinterpreting tradition requires an extraordinary level of attention to detail and dedication in the vineyard. This pursuit of excellence is the central pillar of our production philosophy.
          </Paragraph>
          <Paragraph>
            At Ornellaia, they firmly believe that a great wine can only be made with grapes picked precisely at the right time within the conditions of each specific vintage.
          </Paragraph>
          <Paragraph>
            In the cellar, each vineyard is treated as an individual, vinified separately, with the objective to express the specific character of its site. The base wines mature in small French oak barrels, before being selected and blended to achieve a subtle balance: expressing the specific character of the vintage while keeping Ornellaia’s voluptuous elegance.
          </Paragraph>
          <StoryImage
            src={images.harvestAerial}
            alt="Harvest team working in Ornellaia vineyards"
          />
          <Paragraph>
            Sustainable viticulture is an integral part of the production philosophy and blends with the longevity of the local economy, quality production, and an appreciation of the history, culture, and landscape in the Bolgheri area.
          </Paragraph>
          <Paragraph>
            Ornellaia is a blend of nature and musing. Complex ancient soils converse through human wisdom with a delicate microclimate that is echoed and reflected in the Mediterranean Sea. Prolonged ageing accompanies the estate’s fine wine in achieving its utmost expression, revealing all its finesse and generosity over time.
          </Paragraph>
          <Paragraph>
            In 2017, the Architects Magni &amp; Guicciardini designed the cellar in which Ornellaia keeps its older vintages.
          </Paragraph>
          <StoryImage
            src={images.cellarArchitecture}
            alt="Historic cellar designed by Magni &amp; Guicciardini holding older vintages"
          />
          <StoryImage
            src={images.artGallery}
            alt="Vendemmia d'Artista contemporary art and wine gallery at Ornellaia"
          />
          <Paragraph>
            Since the release of Ornellaia 2006, an internationally famous contemporary artist has created a work of art for the estate and a series of limited-edition labels, inspired by the character identified by the winemaker to describe the particular features of the new vintage.
          </Paragraph>
          <Paragraph>
            Since 2019, a longstanding relationship connects Ornellaia and the Solomon R. Guggenheim Foundation, and profits from the Vendemmia d’Artista project have benefited accessibility programs at the Solomon R. Guggenheim Foundation.
          </Paragraph>
          <Paragraph>
            At present, Ornellaia continues to support the Foundation by contributing to the conservation of key collection works.
          </Paragraph>
          <StoryImage
            src={images.bottles}
            alt="Bottles of Ornellaia Bolgheri Superiore"
          />
          <Paragraph>
            In addition to the iconic wine, the estate produces two reds, Le Serre Nuove dell&apos;Ornellaia, which is a true second vin, and Le Volte dell&apos; Ornellaia. Its production also includes two white wines: the historical Poggio alle Gazze dell&apos; Ornellaia and Ornellaia Bianco.
          </Paragraph>
          <div className="pt-2">
            <Image
              src={images.certBadge}
              alt="Campaign financed according to EU Reg. No. 2021/2115 &amp; Ministero dell'Agricoltura"
              width={700}
              height={120}
              unoptimized
              className="h-auto w-full max-w-[420px] object-contain"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
