import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/z6OiNCz0T7STDaMrp7qcDA_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/11861_albinoarmani_2024_EN/11861_albinoarmani_2025_EN_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/11861_albinoarmani_2024_EN/11861_albinoarmani_2025_EN_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/11861_albinoarmani_2024_EN/11861_albinoarmani_2025_EN_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/11861_albinoarmani_2024_EN/11861_albinoarmani_2025_EN_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/11861_albinoarmani_2024_EN/11861_albinoarmani_2025_EN_5_2560x1520.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/ocm_logo_2025.png',
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

export default function AlbinoArmaniContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/11861/logos/7RJmP0W6TRm3BT4BkQLFww.jpeg"
                alt="Albino Armani logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Albino Armani</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>79</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.9</b>
                </span>
                <span className="hidden sm:inline">62,905 total ratings</span>
                <span className="sm:hidden">62,905 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Albino+Armani"
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
              <Row label="Winemaker" value="Albino Armani" icon={<span className="text-base">◉</span>} />
              <Row label="Owned by" value="Albino Armani" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.albinoarmani.com/en/"
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
              href="https://www.instagram.com/albinoarmani_1607/"
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
              href="https://www.facebook.com/albinoarmani1607"
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
              href="https://twitter.com/albinoarmani"
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
            <a href="tel:+390457290033" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              +390457290033
            </a>
            <a href="mailto:dario@albinoarmani.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Entrance gate and driveway to Albino Armani estate in Dolcè, Adige Valley"
          />
          <StoryImage
            src={images.image1}
            alt="Aerial view of Albino Armani estate along the winding Adige river"
          />
          <Paragraph>
            The name ‘Albino Armani’ has its roots in 400 years of history, winegrowing and passion for wine. A dynamic reality, which since its inception has looked favorably on growth and development, but also on conservation. Today, the ambitious family project boasts five privately owned estates, composing a total of 400 hectares of vineyards. The family vineyards are situated in three major Italian winegrowing regions: Veneto, Trentino and Friuli-Venezia Giulia.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Historical notarised parchment document from December 7, 1607 signed by Domenico Armani"
          />
          <Paragraph>
            The story begins in the Trentino part of Vallagarina, precisely on December 7, 1607, when Domenico Armani signed a notarized document (now at the Historical Archive of Trento), according to which his father Simone bequeathed land with &quot;trees and vineyards&quot; to him.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Terraced vineyards overlooking the Adige valley and soaring mountain peaks"
          />
          <Paragraph>
            Today, &quot;Albino Armani Viticoltori dal 1607&quot; means territory, or rather territories. The historic property in Dolcè, in the Adige Valley, works together with other estates in Veneto (Valpolicella Classica and the Marca Trevigiana), and with those situated in Trentino and Friuli-Venezia Giulia.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Albino Armani celebrating with red suspenders and wine glass with friends"
          />
          <Paragraph>
            The traditional production of the company underwent a change in the late 1980s, when current owner Albino Armani (born in ‘59) joined his eclectic and far-sighted father Antonio and began to bottle wines of excellent Adige Valley autochthonous grape varieties. Father and son were motivated by the desire to restore the strong identity of the valley and to experiment with new styles of wine.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Vineyard hillside terraces with stone cottage beneath mountain cliffs"
          />
          <Paragraph>
            Today enjoying undisputed international appreciation, Albino Armani has always succeeded to perfectly combine multi-figure production with the desire to further the culture and agronomy of Trentino Vallagarina mountain dwellers. Their traditional growing methods are characterized by resilience and by people who live their calling with dedication and ethics, ignoring ephemeral fashions.
          </Paragraph>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] sm:text-[13px]">
            <a href="https://www.albinoarmani.com/en/" target="_blank" rel="noreferrer" className="font-semibold text-[#ba1628] hover:underline">
              Website
            </a>
          </p>
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
