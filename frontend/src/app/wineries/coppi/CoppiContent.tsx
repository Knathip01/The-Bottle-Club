import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/Y2hjH7bOTqiZzL5mWRqvHg_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/7906_coppi_2024/7906_coppi_1_2024_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/7906_coppi_2024/7906_coppi_2_2024_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/7906_coppi_2024/7906_coppi_3_2024_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/7906_coppi_2024/7906_coppi_4_2024_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/7906_coppi_2024/7906_coppi_5_2024_2560x1520.jpg',
  image6: 'https://images.vivino.com/misc/sponsorships/7906_coppi_2024/7906_coppi_6_2024_2560x1520.jpg',
  image7: 'https://images.vivino.com/misc/sponsorships/7906_coppi_2024/7906_coppi_7_2024_2560x1520.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/7906_coppi_2024/7906_coppi_NEW_OCM_IT_2025_2560x1520.jpg',
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

export default function CoppiContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/7906/logos/XRTNyNcdQMCImhMqZdZ-Kw.jpeg"
                alt="Coppi logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Coppi</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>26</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Coppi"
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
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.vinicoppi.it"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <Globe size={14} />
                Website
              </span>
              <ExternalLink size={11} />
            </a>
            <a
              href="https://www.facebook.com/vinicoppi/?ref=bookmarks"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </span>
              <ExternalLink size={11} />
            </a>
            <a
              href="https://twitter.com/Vinicoppi1"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:390808915049" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              39 080 8915049
            </a>
            <a href="mailto:info@vinicoppi.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Casa Vinicola Coppi winery building with terrace and stairs"
          />
          <StoryImage
            src={images.image1}
            alt="Coppi family and winery workers in the vineyard rows"
          />
          <Paragraph>
            The history of Casa Vinicola Coppi is an ancient one, it’s the history of a family devoted for decades to wine production on the hills of the “Murgia dei Trulli”, in Puglia. It is the land of the prestigious Primitivo DOC Gioia del Colle wine, unique in its elegance, freshness, and balance, thanks to the stony, hilly soils. This is a wine denomination that has been growing steadily on world markets for several years, both in terms of quality and territorial marketing.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Father and son examining ripe grape clusters in the Coppi vineyards"
          />
          <Paragraph>
            It all began back in 1882. This is the date of birth of the ancient cellar. The owner of the time, Antonio Zaccheo, commissioned the well-known architect Francesco Schettini to restructure the company spaces in limestone as they can still be visited today. At the end of the 60s, the oenologist Antonio Coppi started his professional collaboration in the cellar.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Family members tending to the grapevines at Casa Vinicola Coppi"
          />
          <Paragraph>
            Coppi wines owe their birth and their history to him, who, in 1972, purchased the cellar and transformed it into his life&#39;s mission: restoring dignity and prestige to a the Apulian wine area, very little known back in the days. Everything stems from the careful attention to production, starting from the cultivation in the hundred hectares vineyards of the family, with Primitivo, Aleatico, Malvasia, Verdeca, Negroamaro, and Falanghina vines.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Stainless steel fermentation tanks at Casa Vinicola Coppi"
          />
          <Paragraph>
            Moreover, Antonio is the founder of the “Consorzio di Tutela del Primitivo Doc Gioia del Colle”, the first of the Primitivo denominations of origin to be recognized in Puglia, not by chance in the Murgia dei Trulli area, a land devoted for millennia to viticulture. The passion and knowledge of Antonio Coppi&#39;s wines is soon transmitted in a very natural way to his daughters and son, Lisia, Miriam and Doni; because the love for wine is first of all love for their own land, it is a visceral link to it, to that piece of Puglia where a whole family was born and raised.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Rosé wine bottling line in motion at Coppi winery"
          />
          <Paragraph>
            Living in sync with the seasons and the cycles of nature, among the scents of the vineyards and in the exciting atmosphere of the harvest: this is how childhood and youth of the Coppi siblings went by, strengthening the union with the cellars, their wines, the Apulian Land. Today Coppi wines are known all over the world.
          </Paragraph>
          <Paragraph>
            The constancy and perseverance of Antonio and his children made this brand become synonymous with quality. But, above all, they have triggered a process of rediscovering the territory and enhancing its products, making Coppi wines one of the excellences of the Apulian wine production. It is no coincidence that one of Coppi wines, the Vanitoso Riserva 1999, was the first Primitivo doc Gioia del Colle wine ever to obtain a Grand Gold Medal at Vinitaly 2006, an award that definitively established the entry of this vine into the Olympus of the great aged still red wines.
          </Paragraph>
          <StoryImage
            src={images.image6}
            alt="Bottle of Coppi Senatore wine alongside a branded wine glass"
          />
          <Paragraph>
            After that event, Coppi won numerous awards, including the “Three Glasses” Gambero Rosso 2017, 2018, 2019, 2021, 2022, 2023, 2024 for its “Senatore” and 2020 for its “Don Antonio”, over-90 points Wine Enthusiast, over-90 points Wine Spectator, over-90 points James Suckling, Best Primitivo at &quot;5 stars Vinitaly 2017&quot;, 96 points on the Wine Guide by Luca Maroni, Decanter, Double Gold Medal at CWSA, Gold Medal al Berliner Wine Trophy, Falstaff, Wine Hunter, and many other national and international accolades.
          </Paragraph>
          <StoryImage
            src={images.image7}
            alt="Winemaker topping up oak wine barrels in the cellar"
          />
          <div className="flex justify-center border-t border-stone-100 py-3">
            <Image
              src={images.banner}
              alt="Campaign financed according to EU Reg. N. 2021/2115 - Ministero dell'Agricoltura"
              width={800}
              height={140}
              unoptimized
              className="h-auto max-h-24 w-auto object-contain"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
