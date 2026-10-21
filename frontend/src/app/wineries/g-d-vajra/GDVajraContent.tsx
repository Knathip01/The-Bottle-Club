import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/c-jGTUsDSb-kIMBlq_4qGg_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/2606_gdvajra/2606_gdvajra_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/2606_gdvajra_2new_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/2606_gdvajra_3new_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/2606_gdvajra_4new2_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/2606_gdvajra_2022/2606_gdvajra_5_NEW_2560x1520.jpg',
  image6: 'https://images.vivino.com/misc/sponsorships/2606_gdvajra_6new_2560x1520.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/OCM_GDVAJRA_LUIGI_BAUDANA_MONTERUSTICO.jpg',
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

export default function GDVajraContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://thumbs.vivino.com/wineries/2606/logos/Pd4LQvLORYmE8s7VGIhZTg_500x500.jpeg"
                alt="G.D. Vajra logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">G.D. Vajra</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>28</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=G.D.+Vajra"
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
              <Row label="Winemaker" value="G.D.Vajra" icon={<span className="text-base">◉</span>} />
              <Row label="Owned by" value="G.D. Vajra" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.gdvajra.it"
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
              href="https://www.instagram.com/gdvajra_barolo/"
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
              href="https://www.facebook.com/gdvajra"
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
            <a href="tel:+39017356257" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              39 0173 56 257
            </a>
            <a href="mailto:welcome@gdvajra.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Scenic view of the Alps and rolling hills of Barolo, Piemonte"
          />
          <StoryImage
            src={images.image1}
            alt="Hands holding fertile vineyard soil at G.D. Vajra"
          />
          <Paragraph>
            High-altitude vineyards. This is the road, arduous and beautiful, that leads us to G.D. Vajra wines where finesses and perfumes blend into one.
          </Paragraph>
          <Paragraph>
            Pioneers in organic farming since 1971, the Vajras adhere to old-school winemaking methods to craft translucent, superbly elegant wines.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Sunset over vineyards in Barolo"
          />
          <Paragraph>
            In 1968 Aldo Vajra, then a fifteen-year-old high school student, found his passion was farming. He bravely decided to quit the comfort of a city life in Torino, to pursue the adventure of reviving his family legacy. It was no easy task: those years were marked by harsh weather and a massive abandonment of the countryside in favor of urbanization. Yet, the passion and stubbornness of Aldo, and of his dreams, prevailed over all other concerns. He was taken in sympathy by the old guard of farmers of his village, who soon started to reveal him the traditions and tricks of tending vines and growing grapes.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Stained glass reflections in the cellar at G.D. Vajra"
          />
          <Paragraph>
            The love for Milena, his wife, led the Vajras to a journey of creations, including preserving the noble, heirloom Freisa, nurturing the biodiversity of Dolcetto, and planting the first-ever Rhine Riesling in Piemonte.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Large traditional oak casks in the G.D. Vajra aging cellar"
          />
          <Paragraph>
            Today, G.D. Vajra is one of the most creative wineries in Barolo. A team of young talents, led by second-generation Giuseppe, Francesca, and Isidoro Vajra, is enthusiastically at work to craft some of the most compelling wines of the Langhe.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Close-up of ripe Nebbiolo grapes on the vine"
          />
          <Paragraph>
            Vineyards have been nurtured, and soil preserved with minimum tillage for almost 50 years now. With an incredible ratio of manual work per hectare, farming at Vajra is a labor of love. Intense research is placed into monitoring and improving the biodiversity of flora and fauna in the vineyards and in the estate fields and forests.
          </Paragraph>
          <StoryImage
            src={images.image6}
            alt="Autumn foliage colors in the Langhe vineyards"
          />
          <Paragraph>
            “The land asks for absolute dedication. It asks to be loved for better or worse, in abundance and scarcity. The land is almost more than a house, it is part of our life and asks to be guarded with the same tenderness that we have for our loved ones. And the amazing thing is that, despite all of the difficulties, to love it does not need any effort.” — Milena Vajra
          </Paragraph>
          <p className="px-0.5 py-1 text-[11px] font-semibold text-[#BA1628] hover:underline sm:text-[13px]">
            <a href="https://youtu.be/efe2ij4avXo" target="_blank" rel="noreferrer">
              Check out our 2024 at G.D Vajra!
            </a>
          </p>
          <div className="flex justify-center py-2">
            <Image
              src={images.banner}
              alt="CAMPAIGN FINANCED ACCORDING TO EU REGULATION N. 2021/2115 - MINISTRY OF AGRICULTURE, FOOD SOVEREIGNTY AND FORESTS"
              width={1280}
              height={760}
              unoptimized
              className="h-auto w-full max-w-[500px] object-contain"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
