import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Star } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/SpcZ0cHtTx-VULxclERVIQ_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/5607_luigibaudana/5607_luigibaudana_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/5607_luigibaudana_2new_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/5607_luigibaudana_3new_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/5607_luigibaudana_4new_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/5607_luigibaudana_2022/5607_luigibaudana_5new2025feb_2560x1520.jpg',
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
      className="h-auto w-full rounded-md object-cover"
    />
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function LuigiBaudanaContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/5607/logos/ET5IyPEEQhaRcUiob6CK6w.jpeg"
                alt="Luigi Baudana logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Luigi Baudana</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>11</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.1</b>
                </span>
                <span className="hidden sm:inline">13,840 total ratings</span>
                <span className="sm:hidden">13,840 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Luigi%20Baudana"
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
                  <a href="https://www.vivino.com/en/explore/regions/langhe" className="hover:underline">
                    Langhe
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row
                label="Winemaker"
                value="Luigi Baudana"
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
                value={
                  <Link href="/wineries/g-d-vajra" className="hover:underline">
                    G.D. Vajra
                  </Link>
                }
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
              href="https://www.baudana.it/en/"
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
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Fermentation vats and steel winemaking equipment at Luigi Baudana"
          />
          <StoryImage
            src={images.image1}
            alt="Luigi and Fiorina Baudana black and white portrait"
          />
          <Paragraph>
            The Baudana’s story is rooted in such a remote time that many details have been lost. Suffice to say, Baudana is the name of the hamlet, of a renowned single vineyard of Barolo, and -of course- of Luigi and Fiorina’s family.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Sloping vineyard rows on the hills of Barolo at Luigi Baudana"
          />
          <Paragraph>
            Luigi grew up to be a blacksmith - a craft he still excels in, today. At the end of the ‘70s, thanks to the love and encouragement of his wife Fiorina, Luigi decided to break free from the traders who used to buy his family’s grapes. That moment marked the beginning of a very intimate production of wine, entirely carried by hand in a tiny and humble cellar underneath the vaults of the Baudana’s house.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Freshly harvested Nebbiolo grape clusters in a harvest container"
          />
          <Paragraph>
            Luigi and Fiorina have always been as close-knit in life as at work: together they tended the vines and worked in the cellar for almost 30 years, producing bottles that still remain in the memory of those who had the chance to enjoy them.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Large oak maturation barrels resting in the aging cellar"
          />
          <Paragraph>
            On the verge of retirement, the Baudanas identified three siblings, Francesca, Isidoro, and Giuseppe of the Vajra family, as those who could have carried the torch forward. A vineyard visit after the other, a barrel tasting at the time, both families matured a deep mutual esteem and the desire to join forces in carrying the winery forward.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Italian flag hoisted in the vineyard overlooking misty Barolo hills"
          />
          <Paragraph>
            Luigi Baudana remains a garagiste production, dreaming of providing a ‘voice’ to the intense and mesmerizing personality of the Barolos of Serralunga d’Alba.
          </Paragraph>
          <div className="flex justify-center border-t border-stone-100 py-3">
            <Image
              src={images.banner}
              alt="Campaign financed according to EU regulation N. 2021/2115 - Ministry of Agriculture, Food Sovereignty and Forests"
              width={800}
              height={140}
              unoptimized
              className="h-auto max-h-36 w-auto object-contain"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
