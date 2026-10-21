import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/YOIYDl27RlqeXA2dWiPbzg_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/82979_masseto/82979_masseto_2_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/82979_masseto/82979_masseto_3_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/82979_masseto/82979_masseto_4_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/82979_masseto/82979_masseto_5_2560x1520.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/1249_Frescobaldi/Frescobaldi_OCM_double.png',
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

export default function MassetoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/82979/logos/55efgrQ1RVKPJvZJPF09uQ.jpeg"
                alt="Masseto logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Masseto</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>2</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.7</b>
                </span>
                <span className="hidden sm:inline">21,893 total ratings</span>
                <span className="sm:hidden">21,893 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Masseto"
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
                  <a href="https://www.vivino.com/en/explore/regions/tuscany" className="hover:underline">
                    Toscana
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row
                label="Owned by"
                value="Marchesi Frescobaldi"
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
              href="https://www.masseto.com"
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
              href="https://www.instagram.com/massetowinery/"
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
            <a href="mailto:info@masseto.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Masseto winery estate surrounded by vineyards in Bolgheri, Tuscany"
          />
          <Paragraph>
            Masseto is anchored in the mists of geological time and bears witness to the age-old convulsions of land and sea in the heart of the Mediterranean area. Masseto belongs to that geography that is a geology first and foremost. Rooted in the depths of its blue clays.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="View of Masseto vineyards with ancient blue clay soil overlooking the Tyrrhenian sea"
          />
          <Paragraph>
            The clay’s mineral structure allows the soil to absorb its own weight in water. It nourishes the vine roots, keeping them cool and slightly hydrated, even during the hottest summers. Alongside gentle coastal breezes, bright Mediterranean sun and reflected sea light, this terroir provides perfect conditions for the slow and gentle ripening of the grapes.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Close-up of Masseto grape cluster on the vine"
          />
          <Paragraph>
            As a tribute to the energy, depth and the unique soil from which it originates, Masseto was named after the rock-hard clusters of blue clay called ‘massi’ that form on the vineyard’s surface after the summer ploughing before melting, like snow, in the winter rain.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Architectural modern winery building integrated into the Bolgheri hillside"
          />
          <Paragraph>
            Built to incorporate a gravity-flow winemaking process, and benefiting from the blue clay’s natural insulation, the structure of the winery is symbiotic with the hills and vineyard that surround it.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Hand harvesting grapes in Masseto vineyard with sea view"
          />
          <Paragraph>
            Since its creation, the estate has embraced a philosophy where nature, humanity and creativity combine to produce wines of exceptional quality. A viticulture of patience, precision and detail is inspired by the daily observation of the terroir. Vintage after vintage, the team is seeking to reveal this terroir&#39;s singularity, from vineyards to the cellar.
          </Paragraph>
          <div className="pt-2">
            <Image
              src={images.banner}
              alt="Campaign financed according to EU Reg. N. 2021/2115 - Frescobaldi OCM"
              width={800}
              height={160}
              unoptimized
              className="h-auto w-full max-w-[420px] object-contain"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
