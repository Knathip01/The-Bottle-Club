import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/CdwMRUWTQGy5cZXBRnW8zw_2560x1520.jpeg',
  winery: 'https://vivino.s3.amazonaws.com/misc/sponsorships/4384_piccini_2023/4384_piccini_2023_1_2560x1520.jpg',
  picnic: 'https://vivino.s3.amazonaws.com/misc/sponsorships/4384_piccini_2023/4384_piccini_2023_2_2560x1520.jpg',
  cellar: 'https://vivino.s3.amazonaws.com/misc/sponsorships/4384_piccini_2023/4384_piccini_2023_3_2560x1520.jpg',
  winemaker: 'https://vivino.s3.amazonaws.com/misc/sponsorships/4384_piccini_2023/4384_piccini_2023_4_2560x1520.jpg',
  vineyardRows: 'https://vivino.s3.amazonaws.com/misc/sponsorships/4384_piccini_2023/4384_piccini_2023_5_2560x1520.jpg',
  volcanicEstates: 'https://vivino.s3.amazonaws.com/misc/sponsorships/4384_Piccini/Piccini6_1164x776.png',
  harvest: 'https://vivino.s3.amazonaws.com/misc/sponsorships/4384_Piccini/Piccini7_2000x1275.jpg',
  certBadge: 'https://images.vivino.com/misc/sponsorships/Piccini_OCM_2026.png',
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

export default function PicciniContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://thumbs.vivino.com/wineries/4384/logos/ni-GQv81TlG_nV4Lk4x7cg_500x500.jpeg"
                alt="Piccini logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Piccini</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>257</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Piccini"
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
              <Row label="Owned by" value="Piccini 1882" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.piccini1882.it/en/"
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
              href="https://www.instagram.com/picciniwines/"
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
              href="https://www.facebook.com/picciniwines"
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
              href="https://x.com/picciniwines"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"
            >
              <span className="flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:+39057754011" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              39 0577 54011
            </a>
            <a href="mailto:info@tenutepiccini.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Piccini vineyards in Chianti, Tuscany"
          />
          <Paragraph>
            Our own history gives our wine heart and soul. Chianti is the link between four generations of the Piccini family.
          </Paragraph>
          <Paragraph>
            Angiolo Piccini was born in 1860 as the only son of a merchant family in Poggibonsi, a small town at the crossroads of Florence and Siena. In 1882 he bought 7 hectares of vineyards in Castellina in Chianti and built a small winery in nearby Poggibonsi, starting a family tradition that lasts to today.
          </Paragraph>
          <StoryImage
            src={images.winery}
            alt="Piccini modern winery headquarters and olive tree"
          />
          <Paragraph>
            Angiolo Piccini is an inspiration for his son, Mario, whom he grooms to take over the family business further on, which he does in 1925. Under Mario’s guidance, representing the second generation of the family, the company thrives despite the extremely challenging years of the Great Depression and WWII.
          </Paragraph>
          <StoryImage
            src={images.picnic}
            alt="Piccini Orange Label bottle at a Tuscan picnic"
          />
          <Paragraph>
            Mario’s only son, Pierangelo, takes over the family business in the 1960s and brings dynamic changes to the company. He makes major investments with the acquisition of new vineyards and estates. In the late 1980s, his son Mario and youngest daughter Martina join him. Pierangiolo made it clear there is a big difference between inheriting a family business and building a new one.
          </Paragraph>
          <StoryImage
            src={images.cellar}
            alt="Oak barrels in Piccini wine cellar"
          />
          <h2 className="px-0.5 pt-1.5 text-xs font-bold text-[#1e1e1e] sm:text-base">
            Chianti Legacy
          </h2>
          <Paragraph>
            The Piccini family is rooted in the heart of Chianti and profoundly linked to the region&apos;s rich winemaking culture. Brother and sister teamed up and successfully brought the Chianti to the 21st century with an innovative winemaking approach and the introduction of the Orange Label and Collezione Oro.
          </Paragraph>
          <StoryImage
            src={images.winemaker}
            alt="Mario Piccini inspecting grapes against stone wall"
          />
          <Paragraph>
            Between tradition and intuition, the 4th generation of Piccini family took one of the oldest, most traditional Italian wines and made it contemporary, vibrant, providing a bold and exciting choice for consumers.
          </Paragraph>
          <StoryImage
            src={images.vineyardRows}
            alt="Aerial view of lush green vineyard rows"
          />
          <Paragraph>
            Under the guidance of the 4th generation of the family, Tenute Piccini is one of the most distinctive, dynamic and innovative family-owned Italian wine companies today.
          </Paragraph>
          <h2 className="px-0.5 pt-1.5 text-xs font-bold text-[#1e1e1e] sm:text-base">
            Parallel Project
          </h2>
          <Paragraph>
            100% family-owned and run, Tenute Piccini is among the most prominent wine producers in Tuscany, playing a leading role in the production of the great classic Tuscan wine appellations.
          </Paragraph>
          <StoryImage
            src={images.volcanicEstates}
            alt="Volcanic vineyard terraces overlooking Mount Etna"
          />
          <Paragraph>
            The family also has 5 other standalone properties spread across the top Tuscan wine regions, such as Valiano in the Chianti Classico, Tenuta Moraia in Maremma and Villa al Cortile in Montalcino, as well as the two “volcanic estates”—Torre Mora and Regio Cantina— located respectively on the Etna and Vulture mountains. This is a parallel project to the successful Piccini brand.
          </Paragraph>
          <Paragraph>
            The family’s philosophy behind these boutique estates is very classic: producing wines that reflect the region, focusing on expressiveness of the grape varieties in relation to the area of origin.
          </Paragraph>
          <h2 className="px-0.5 pt-1.5 text-xs font-bold text-[#1e1e1e] sm:text-base">
            Going Organic
          </h2>
          <Paragraph>
            The family estates have been converted to organic farming. This, together with a selection of drought-tolerant rootstocks, lower density trellising systems, indigenous grape varieties replacing some of the less suitable international ones, aim at a holistic approach towards sustainable vine growing practices.
          </Paragraph>
          <StoryImage
            src={images.harvest}
            alt="Harvest team on vineyard hill with cypress trees in Tuscany"
          />
          <div className="pt-2">
            <Image
              src={images.certBadge}
              alt="Campaign financed according to EU reg. and Ministero dell'Agricoltura"
              width={700}
              height={100}
              unoptimized
              className="h-auto w-full max-w-[420px] object-contain"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
