import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/1Kk6NL2YS0WroY4PAHfV9Q_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/2359_planeta2023/2359_planeta2023_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/2359_planeta2023/2359_planeta2023_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/2359_planeta2023/2359_planeta2023_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/2359_planeta2023/2359_planeta2023_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/2359_planeta2023/2359_planeta2023_5_2560x1520.jpg',
  image6: 'https://images.vivino.com/misc/sponsorships/2359_planeta2023/2359_planeta2023_6_2560x1520.jpg',
  image7: 'https://images.vivino.com/misc/sponsorships/2359_planeta2023/2359_planeta2023_7_2560x1520.jpg',
  euBanner: 'https://images.vivino.com/misc/sponsorships/13197_tenutagorghitondi/13197_tenutagorghitondi_8_2560x1520.jpg',
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

export default function PlanetaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://thumbs.vivino.com/wineries/2359/logos/sxBUk7CXTUmuWaVK_aNxlw_500x500.jpeg"
                alt="Planeta logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Planeta</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>38</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>3.8</b>
                </span>
                <span className="hidden sm:inline">201,242 total ratings</span>
                <span className="sm:hidden">201,242 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Planeta"
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
                  <a href="https://www.vivino.com/en/explore/regions/terre-siciliane" className="hover:underline">
                    Terre Siciliane
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row label="Winemaker" value="Planeta" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://planeta.it/en"
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
              href="https://www.facebook.com/planetawinery"
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
              href="https://x.com/PlanetaWinery"
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
            <a href="tel:+39092580009" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              39 0925 80009
            </a>
            <a href="mailto:planeta@planeta.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Planeta estate overlooking Lake Arancio, Sicily"
          />
          <Paragraph>
            Between the late 1980s and the early 1990s, visionary Diego Planeta planted his first vineyards, next to the fortress in Ulmo, on laying the hills embracing Lake Arancio in the town of Sambuca di Sicilia, thus establishing the family winemaking operation.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Bottles of Planeta wine"
          />
          <Paragraph>
            The first wines, which arrived in the marketplace in 1995, included non-native varieties, in particular Chardonnay. Today, it has become a much-celebrated icon, but in those years, Chardonnay was a Planeta pioneer that opened the world&apos;s doors to the winery and those of Sicily to non-native grapes.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Planeta Ulmo wine cellar estate in Sambuca di Sicilia"
          />
          <Paragraph>
            That same year saw the opening in Ulmo of the very first Planeta wine cellar, designed to reflect local traditions and to meld harmoniously into its surrounding countryside. It also marked the launch of an ambitious project, Viaggio in Sicilia, a journey of exploration into the island&apos;s most exceptional winegrowing areas, a Planeta cultural programme that today boasts seven destinations: seven wineries in five markedly different terroirs.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Vibrant rows of grapevines on Planeta estate"
          />
          <Paragraph>
            While Chardonnay, Merlot, and Syrah, both as mono-varietals and in blends, occupy pride of place in Menfi, with the main Sicilian indigenous grapes Nero d&apos;Avola, Grillo, and Grecanico, Vittoria spotlights the native Frappato and Nero d&apos;Avola varieties, which go to compose Cerasuolo, Sicily&apos;s sole DOCG. The typical classics Moscato and Nero d&apos;Avola hold sway at Noto, but Etna nods to foreign grapes as well, with Nerello Mascalese and Carricante joining Pinot Noir and Riesling Renano (White Riesling) complementing Carricante. Vittoria&apos;s ancient traditions are most evident at Capo Milazzo, with the revival of Mamertino, a union of Nocera and Nero d&apos;Avola, and recovery of near-extinct &quot;relict varieties&quot; such as Vitovoska, Lucignola, and Catanese Nera.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Inside the wine cellar at Planeta"
          />
          <Paragraph>
            Finally, the 2022 harvest inaugurated the Monte Cirami winecellar in Sambuca di Sicilia, exclusively dedicated to organically-based production of four Planeta Highland wines: Didacus Cabernet Franc, Sondala, Vanzaredi, and Sito dell&apos;Ulmo.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Aerial view of coastal olive groves and vineyards at Planeta"
          />
          <Paragraph>
            Today’s Planeta, helmed by Alessio Planeta, assisted by Francesca and Santi, and by 270 team members, offers over 30 wines from 5 different growing areas. Its production also includes olive oil from 101 hectares of olive trees surrounding the estate olive-oil mill, almonds, and durum wheat, all cultivated organically. Each separate Planeta estate, in fact, is a microcosm of biodiversity and unique terroirs, as well as an individual constellation of unique experiences inspired by cuisine, nature, and culture. The entire surface area dedicated to vines, olive trees, almonds, and grain is under certified organic cultivation, and since 2014 all agricultural activities have been in accord with the rigorous SOStain® sustainability protocols. The agricultural activities are complemented by a high-value wine tourism programme of cultural and hospitality offerings reflecting the positive values guiding the winery and serving as guideposts for guests in the complex universe of Planeta. This values-based system embraces the entire island, from West to East, from Palermo to Menfi and Sambuca di Sicilia, from Vittoria to Noto, and from Etna to Capo Milazzo.
          </Paragraph>
          <StoryImage
            src={images.image6}
            alt="Sciaranuova estate courtyard featured in The White Lotus"
          />
          <Paragraph>
            Planeta&apos;s Sciaranuova winecellar in Castiglione di Sicilia, near Catania, served as the venue for some scenes in the second season of The White Lotus, the TV miniseries created, scripted, and directed by Mike White, 2023 Emmy award winner as the best production of the season and recipient of two 2023 Golden Globes. The actors are here strolling on the Sciaranuova estate, a luxuriant vineyard at the foot of Mount Etna, after which they enjoy one of the estate&apos;s most iconic wines, Planeta Etna Bianco 2020.
          </Paragraph>
          <StoryImage
            src={images.image7}
            alt="Outdoor wine tasting under a pergola at Planeta"
          />
          <StoryImage
            src={images.euBanner}
            alt="CAMPAIGN FINANCED ACCORDING TO EU REG. NO. 1308/2013"
          />
        </article>
      </div>
    </div>
  );
}
