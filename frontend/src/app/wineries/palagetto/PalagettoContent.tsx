import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/arbL0y8_Q_CSqMC964BioQ_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/27381_palagetto_mtw_2.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/27381_palagetto_mtw_3.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/27381_palagetto_mtw_4.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/27381_palagetto_mtw_5.jpg',
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

export default function PalagettoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/27381/logos/nHSUskGTR9GAbhFZZnDt6A.png"
                alt="Palagetto logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Palagetto</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>39</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.7</b>
                </span>
                <span className="hidden sm:inline">18,479 total ratings</span>
                <span className="sm:hidden">18,479 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Palagetto"
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
                  <a href="https://www.vivino.com/en/explore/regions/chianti" className="hover:underline">
                    Chianti
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row
                label="Winemaker"
                value="NICOLA BERTI"
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                }
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.palagetto.it/"
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
              href="https://www.instagram.com/palagetto"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
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
              href="https://www.facebook.com/palagettosrl"
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
            <a href="tel:390577943090" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              39 0577 943090
            </a>
            <a href="mailto:EXPORTWINE@PALAGETTO.IT" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Bottles of Palagetto wine and wine decanters set on an outdoor tasting table"
          />
          <Paragraph>
            The Niccolai family are natives of San Gimignano and has always lived in this cradle of art and nature. Their love of the fruits of the earth has been passed down through generations. It was their grandfather, Luano Niccolai, who expanded the family farm, planting vineyards and olive groves. The family&#39;s dream is to continue living and working in this beautiful place, offering the products of their land, and refined hospitality, available in various forms at their agriturismo for a holiday immersed in their concept of &quot;good living.&quot;
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Panoramic aerial view of San Gimignano towers and surrounding rolling vineyard hills"
          />
          <Paragraph>
            Luano Niccolai, founder of Tenute Niccolai, is at the heart of the Palagetto estate. From the first few hectares of vineyards at Santa Chiara, near today&#39;s winery, the estate has grown to over 60 hectares, primarily planted with vineyards and olive groves. San Gimignano is the homeland of a wine that breaks with the traditional image of Tuscany as a land of red wines: Vernaccia di San Gimignano, the white queen of Tuscan grapes, surrounded by noble reds.
          </Paragraph>
          <Paragraph>
            Documented since the thirteenth century, and the only wine mentioned in Dante&#39;s Divine Comedy, Vernaccia is a fresh, mineral wine with aging potential, reflecting the spirit of the region&#39;s people. Alongside Vernaccia, Palagetto produces a wide selection of wines, born from the creativity of the family and the expertise of the illustrious oenologists they have worked with.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Modern stainless steel fermentation tanks in the Palagetto vinification cellar"
          />
          <Paragraph>
            The winery, in its current form, was built in 2003 and has been continuously expanded and modernized to meet the estate&#39;s evolving needs. It is a modern facility employing the latest oenological technologies for top-quality production. The impressive barrel cellar contains more than 100 barriques, 10 tonneaux, and 5 large barrels, all visible to visitors next to the winery shop.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Winemaker hand opening a tank valve with rich ruby red wine flowing"
          />
          <Paragraph>
            Palagetto owns properties across San Gimignano, primarily planted with grapevines and olive trees. Approximately 42 of the estate&#39;s 62 hectares are vineyards, including Sangiovese, Vernaccia di San Gimignano, Merlot, Cabernet, Syrah, Sauvignon Blanc, and Chardonnay. Thirteen hectares are dedicated to olive groves, with over 3,000 trees producing Palagetto&#39;s extra virgin olive oil and two monovarietal selections: Frantoio and Correggiolo.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Long candlelit tasting table set between rows of oak barrels in Palagetto barrel cellar"
          />
        </article>
      </div>
    </div>
  );
}
