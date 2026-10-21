import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/85kXFQwqS4yW85_oprlZwA_2560x1520.jpeg',
  team: 'https://images.vivino.com/misc/sponsorships/27015_guthermannsberg_2024/27015_guthermannsberg_1_2560x1520_2024.jpg',
  slopes: 'https://images.vivino.com/misc/sponsorships/27015_guthermannsberg_2024/27015_guthermannsberg_2_2560x1520_2024.jpg',
  slate: 'https://images.vivino.com/misc/sponsorships/27015_guthermannsberg_2024/27015_guthermannsberg_3_2560x1520_2024.jpg',
  bottles: 'https://images.vivino.com/misc/sponsorships/27015_guthermannsberg_2024/27015_guthermannsberg_4_2560x1520_2024.jpg',
  panoramic: 'https://images.vivino.com/misc/sponsorships/27015_guthermannsberg_2024/27015_guthermannsberg_5_2560x1520_2024.jpg',
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

export default function GutHermannsbergContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://thumbs.vivino.com/wineries/27015/logos/SWu9zBmVQzaRHtK7cggMKg_500x500.jpeg"
                alt="Gut Hermannsberg logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Gut Hermannsberg</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>73</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.0</b>
                </span>
                <span className="hidden sm:inline">18,066 total ratings</span>
                <span className="sm:hidden">18,066 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Gut%20Hermannsberg"
              className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs"
            >
              View wines
            </Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row
                label="Country"
                value={
                  <a href="https://www.vivino.com/en/explore/countries/germany" className="hover:underline">
                    Germany
                  </a>
                }
                icon={<span>🇩🇪</span>}
              />
              <Row
                label="Region"
                value={
                  <a href="https://www.vivino.com/en/explore/regions/nahe" className="hover:underline">
                    Nahe
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row label="Winemaker" value="Hermannsberg" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://gut-hermannsberg.de/"
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
              href="https://www.instagram.com/gut_hermannsberg/?hl=de"
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
              href="https://www.facebook.com/gut-hermannsberg-699681060140643/"
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
              href="https://x.com/rieslingisking"
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
            <a href="tel:+49675892500" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              +49 (0) 67 58-92 50-0
            </a>
            <a href="mailto:info@gut-hermannsberg.de" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Gut Hermannsberg estate overlooking the valley of the Middle Nahe"
          />
          <StoryImage
            src={images.team}
            alt="Jasper Reidel, Karsten Peter, and Achim Kirchner at Gut Hermannsberg"
          />
          <Paragraph>
            Gut Hermannsberg, once the &quot;Royal Prussian Wine Estate,&quot; has majestically stood on a picturesque slope overlooking the valley of the Middle Nahe since 1902. Founded as a pure Riesling estate, it not only shaped the wine history of the Nahe region but also profoundly influenced German winemaking as a whole. After a brief period of decline in the 1990s under state management, privatization took place in 1998. However, it wasn&apos;t until 2009, when the Reidel family recognised its potential and acquired the estate, that a new era began. Renamed &quot;Gut Hermannsberg,&quot; in reference to one of the best vineyards in the Nahe, the winery now stands once again for the highest quality and tradition. Today, Jasper Reidel, along with cellar master Karsten Peter and Achim Kirchner, leads the operation.
          </Paragraph>
          <StoryImage
            src={images.slopes}
            alt="Steep slopes and vineyards of Gut Hermannsberg"
          />
          <Paragraph>
            Committed to its heritage, the entire team of the winery rejects methods that could diminish the unique character of its wines. The cool microclimate of the Middle Nahe and the diverse soil create ideal conditions for perfect wines. The estate operates in seven individual vineyards totaling 30 hectares, all classified in the highest category VDP.GROSSE LAGE®, including legendary steep slopes such as the Kupfergrube and the Monopole vineyard Hermannsberg. The wines, characterized by exceptional minerality, radiate a unique brilliance.
          </Paragraph>
          <StoryImage
            src={images.slate}
            alt="Hands holding slate rocks from Gut Hermannsberg vineyards"
          />
          <Paragraph>
            This situation is unique in German viticulture and underscores the enormous potential for excellent Rieslings. The team has made it their mission to showcase this potential in their wines, thereby honoring the unique conditions provided by nature.
          </Paragraph>
          <StoryImage
            src={images.bottles}
            alt="Gut Hermannsberg VDP.GROSSES GEWÄCHS Riesling bottles in wooden box"
          />
          <Paragraph>
            The team led by the Reidel family primarily cultivates Riesling grapes, with a focus on dry top wines, the VDP.GROSSES GEWÄCHS®. The wines are natural, sometimes almost rustic, with significant aging potential. They are distinguished by a unique complexity and depth, with a strong terroir character.
          </Paragraph>
          <StoryImage
            src={images.panoramic}
            alt="Panoramic views of Gut Hermannsberg vineyards in the Nahe valley"
          />
          <Paragraph>
            Today, Gut Hermannsberg ranks among the most exciting Riesling wineries in Germany. It is nestled between rugged rocks and wooded mountains, offering a perfect environment for relaxation. The stylish guesthouse with 11 rooms and suites, as well as the Fine Dine & Wine Restaurant HERMANNS, attract wine lovers from around the world, just an hour away from Frankfurt Airport.
          </Paragraph>
          <div className="pt-1">
            <a
              href="https://www.gut-hermannsberg.de/en"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-semibold text-[#BA1628] hover:underline sm:text-xs"
            >
              Learn more
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
