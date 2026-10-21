import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/yNplLE6iS62h4NpZsZ4BtA_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/62608_torremora/62608_torremora_1_2560x1520.jpeg',
  image2: 'https://images.vivino.com/misc/sponsorships/62608_torremora/62608_torremora_2_2560x1520.jpeg',
  image3: 'https://images.vivino.com/misc/sponsorships/62608_torremora/62608_torremora_3_2560x1520.jpeg',
  image4: 'https://images.vivino.com/misc/sponsorships/62608_torremora/62608_torremoraNEW_4_2560x1520.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/13197_tenutagorghitondi/13197_tenutagorghitondi_8_2560x1520.jpg',
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

export default function TorreMoraContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/62608/logos/Phssxlb-SDKz2uL7-MF6wA.jpeg"
                alt="Torre Mora logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Torre Mora</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>12</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.9</b>
                </span>
                <span className="hidden sm:inline">12,207 total ratings</span>
                <span className="sm:hidden">12,207 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Torre%20Mora"
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
                  <a href="https://www.vivino.com/en/explore/regions/etna" className="hover:underline">
                    Etna
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row
                label="Winemaker"
                value="Alessandro Barabesi"
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                }
              />
              <Row
                label="Owned by"
                value="Generazione Vigneti"
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13.765 11.585S15 12.554 15 14v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6c0-1.446 1.235-2.415 1.235-2.415.6-.503.578-1.062.578-1.062V7h2.374v3.524s-.021.559.578 1.061Z" />
                    <path d="M3 9.783c0-.288 0-.431.037-.563a1 1 0 0 1 .159-.326c.082-.11.195-.198.422-.374l7.4-5.756c.351-.273.527-.41.72-.462a1 1 0 0 1 .523 0c.194.052.37.189.721.462l7.4 5.756c.227.176.34.264.422.374a1 1 0 0 1 .159.326c.037.132.037.275.037.563V19.4c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437C20.24 21 19.96 21 19.4 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C3 20.24 3 19.96 3 19.4V9.783Z" />
                  </svg>
                }
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.piccini1882.it/en/family-estates/torre-mora/#azienda"
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
              href="https://www.instagram.com/Torre_mora"
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
              href="https://www.facebook.com/Torremorawines"
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
            <a href="mailto:info@torremora.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Terraced vineyards of Torre Mora under the shadow of Mount Etna"
          />
          <StoryImage
            src={images.image1}
            alt="Ancient stone palmento with giant wooden press at Torre Mora"
          />
          <Paragraph>
            Mountain Etna in Sicily is an exceptional place for wine-growing: complex microclimate with a significant excursion between day and night, extremely fertile volcanic soils, high altitude. All these characteristics contribute in making this small production area one of a kind in the wine world. Such a unique place calls for its very own grapes which have adapted to these extreme conditions over the centuries. For the red varieties, Nerello Mascalase is the main grape variety, then comes Nerello Cappuccio. As for the white varieties, the local Carricante expresses its full potential in this extreme territory.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Aging wine bottles stacked neatly on metal cellar racks"
          />
          <Paragraph>
            The philosophy of Torre Mora is one grape variety, one territory. We are inspired by the perfect match between the native varieties and mountain Etna, together with our passion in making wines, the result is a wine that inspires with every sip, narrating the history of ancient native grapes that flourish on the slopes of an active volcano. The property includes a centennial traditional Palmento (Millstone) featuring a giant wooden press with tanks and drainage channels hand-carved in volcanic rocks. The vines are mostly head trained bush and naturally low yielding.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Winemaker tasting wine from a barrel in the cellar at Torre Mora"
          />
          <Paragraph>
            Torre Mora belongs to the prominent Italian wine producer, the Piccini Family. The estate is divided between three plots and extends over 13 ha located at 650 and 700m ASL in Contrada Dafara Galluzzo and Contrada Moscamento, in Rovittello, and Contrada Alboretto Chiuse del Signore, in the village of Linguaglossa. Torre Mora aims to achieve the highest quality with a sustainable and precise boutique approach in winemaking.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Head-trained vines with wooden supports under clear blue skies at Torre Mora"
          />
          <div className="flex justify-center border-t border-stone-100 py-3">
            <Image
              src={images.banner}
              alt="Campaign financed according to EU Reg. No. 1308/2013"
              width={800}
              height={100}
              unoptimized
              className="h-auto max-h-12 w-auto object-contain"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
