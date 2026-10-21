import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/dEOH9eQeRU-VDXMIu5hJiw_2560x1520.jpeg',
  image1: 'https://vivino.s3.amazonaws.com/misc/sponsorships/17203_berlucchi_2023/17203_berlucchi_2023_1_2560x1520.jpg',
  image2: 'https://vivino.s3.amazonaws.com/misc/sponsorships/17203_berlucchi_2023/17203_berlucchi_2023_2_NEW_2560x1520.jpg',
  image3: 'https://vivino.s3.amazonaws.com/misc/sponsorships/17203_berlucchi_2023/17203_berlucchi_2023_3_NEW_2560x1520.jpg',
  image4: 'https://vivino.s3.amazonaws.com/misc/sponsorships/17203_berlucchi_2023/17203_berlucchi_2023_4_2560x1520.jpg',
  image5: 'https://vivino.s3.amazonaws.com/misc/sponsorships/17203_berlucchi_2023/17203_berlucchi_2023_5_2560x1520.jpg',
  image6: 'https://images.vivino.com/misc/sponsorships/17203_berlucchi/17203_berlucchinew_6_2560x1520.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/2025_OCM.png',
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

export default function GuidoBerlucchiContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/17203/logos/ZtanblDuTKawo2noz2-M0A.jpeg"
                alt="Guido Berlucchi logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Guido Berlucchi</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>34</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.9</b>
                </span>
                <span className="hidden sm:inline">57,390 total ratings</span>
                <span className="sm:hidden">57,390 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Guido+Berlucchi"
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
              <Row label="Winemaker" value="Berlucchi" icon={<span className="text-base">◉</span>} />
              <Row label="Owned by" value="Berlucchi" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.berlucchi.it"
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
              href="https://www.facebook.com/berlucchi61franciacorta?ref=ts&fref=ts"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
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
              href="https://x.com/BerlucchiWine"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:+39030984381" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              030 984381
            </a>
            <a href="mailto:info@berlucchi.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Sunset over Guido Berlucchi estate and vineyard in Franciacorta"
          />
          <Paragraph>
            It is nearly impossible to describe the unique character of Franciacorta without mentioning Franco Ziliani, the winemaker who, together with Guido Berlucchi, altered the destiny of an entire region, transforming it into one of the world’s most prestigious sparkling-wine production areas.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Winemaker hand holding bottle of Berlucchi Franciacorta sparkling wine"
          />
          <Paragraph>
            Franco Ziliani intuited that the Franciacorta viticultural area and its distinctive climate offered nonpareil requirements for an unprecedented winemaking project and saw in the refined Guido Berlucchi and his venerable underground cellars the path that could lead to the realisation of his ambitious dream: “And if we were to make a wine in the French manner?” In 1961, Ziliani sealed the first 3,000 bottles of Pinot di Franciacorta, the first classic-method Franciacorta. The results amazed all: here was a sparkling wine with a delicious palate, refined, crisp aromatics, and an obvious capacity for further sensory development.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Sun-drenched vineyards of Guido Berlucchi in Franciacorta"
          />
          <Paragraph>
            Franco Ziliani brought into the new millennium a winery that deeply respects both tradition and innovation, crowning more than sixty years of success. Today his children, Cristina, Arturo, and Paolo, have taken the direction of the winery. Thanks to their collegial leadership, Guido Berlucchi is deeply engaged in wide-ranging cultural initiatives and is firmly committed to total sustainability.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Cristina, Arturo, and Paolo Ziliani at the historic Berlucchi estate"
          />
          <Paragraph>
            It is precisely due to this commitment that the winery published in 2019 its first Sustainability Report, which analyses its entire course of operations over 20 years and spotlights the improvements brought to its local area, ranging from the campaign against soil impoverishment, utilising avant-garde, experimental practices; combatting climate change with new ecologically-based approaches; and to reducing waste of resources. But the vision of Guido Berlucchi winery extends far beyond strictly wine-production matters, embracing complex questions of socio-cultural impacts as well.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Yellow cover crop flowers blooming between vineyard rows for sustainable viticulture"
          />
          <Paragraph>
            The winecellar has become, in fact, a prized destination for wine-lovers from all over the globe, who have brought deep changes to Franciacorta and made it a prestigious tourism attraction. Excavated ten meters below the surface, the historic winecellar continues to amaze and intrigue the visitor, today as always. An extensive complex of galleries and lofty vaulted ceilings radiates from the striking nucleus built in the late 1600s, which still jealously guards the very first bottle of Franciacorta, vintage 1961.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Underground historic cellar of Guido Berlucchi with vaulted ceilings and riddling racks"
          />
          <Paragraph>
            And rising above, Palazzo Lana. Without its sumptuous rooms, there would be today no Franciacorta to savour, for here is its cradle. If you would like to visit the palazzo during a cultural event or with a guided tour, you will personally experience the power of the aura investing its venerable salons.
          </Paragraph>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] sm:text-[13px]">
            <a href="https://www.berlucchi.it/en/" target="_blank" rel="noreferrer" className="font-semibold text-[#ba1628] hover:underline">
              www.berlucchi.com
            </a>
          </p>
          <StoryImage
            src={images.image6}
            alt="Palazzo Lana salon with fireplace, historic paintings, and piano"
          />
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
