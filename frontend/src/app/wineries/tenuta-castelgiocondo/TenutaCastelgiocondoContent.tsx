import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/8MnO83buTquPyfZ422M31A_2560x1520.jpeg',
  image1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/1249_Frescobaldi/Frescobaldi1_5760x3840.jpg',
  image2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/1249_Frescobaldi/1249_Frescobaldi_cellar.jpg',
  image3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/1249_Frescobaldi/1249_Frescobaldi_final_new.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/1249_Frescobaldi/frescobaldi_8_2560x1520.png',
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
      height={1520}
      unoptimized
      className="h-auto w-full rounded-md object-cover"
    />
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function TenutaCastelgiocondoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/175980/logos/tNxeNcbQTsGVCnRO9tbjkg.jpeg"
                alt="Tenuta CastelGiocondo logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Tenuta CastelGiocondo</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>10</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Tenuta+CastelGiocondo"
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
              href="https://www.frescobaldi.com/"
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
              href="https://www.instagram.com/marchesifrescobaldi/"
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
            <a href="tel:+3905527141" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              +39 05 52 71 41
            </a>
            <a href="mailto:info@frescobaldi.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Tenuta CastelGiocondo vineyards in Montalcino, Tuscany"
          />
          <Paragraph>
            The history of the Frescobaldi family begins more than a thousand years ago and is intimately connected to the history of Tuscany. At the times of medieval Florence, the Frescobaldis extended their influence as bankers, becoming patrons of important works in Florence such as the Santa Trinita bridge and the basilica of Santo Spirito.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="View over historic Florence and the Arno River at dusk"
          />
          <Paragraph>
            Frescobaldi&apos;s uniqueness stems greatly from the representation of this diversity, its nine estates and wines that express a kaleidoscope of aromas and sensations, characteristics of each individual terroir. The estates are located in prestigious areas of Tuscany and each one tells its own story, made up of nature, terroir and people.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Wine cellar with oak barrels and glass tasting pipettes"
          />
          <Paragraph>
            From Tenuta Castiglioni, where the family&apos;s 700-year winemaking history began, to CastelGiocondo in the hills of Montalcino, to the eternity of Castello Nipozzano, the sensuality of Castello Pomino, the new horizons on the sea of Tenuta Ammiraglia, the natural amphitheater of Tenuta Perano in the heart of Chianti Classico, the social project of Gorgona, the convivial Tuscan-ness of Rèmole to the land of the famous Nobile di Montepulciano with Tenuta Calimaia.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Winemaker tossing fresh grapes in a hillside Tuscan vineyard"
          />
          <Paragraph>
            Behind every Frescobaldi wine there is the heart of people, agronomists and winemakers who live the vineyard and the terroir to capture every detail. Their art, creating quality wines, requires the rule of respect. Respect for tradition together with innovation. Respect for Tuscany, a living land, to be cultivated in balance and harmony. Respect for each individual terroir, which, thanks to its unique combination of soils, altitudes and microclimates, gives us wines with their own, unrepeatable personality.
          </Paragraph>
          <div className="flex justify-center py-2">
            <Image
              src={images.banner}
              alt="CAMPAIGN FINANCED ACCORDING TO EU REG. NO. 1308/2013"
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
