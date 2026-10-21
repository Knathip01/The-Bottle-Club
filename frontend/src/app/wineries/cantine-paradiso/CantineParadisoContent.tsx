import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/m5MV1MU-Q9yOMbB6AU9jiA_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/10945_CantineParadiso/10945_CantineParadiso_1.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/10945_CantineParadiso/10945_CantineParadiso_2.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/10945_CantineParadiso/10945_CantineParadiso_3.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/10945_CantineParadiso/10945_CantineParadiso_4.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/10945_CantineParadiso/10945_CantineParadiso_5.jpg',
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

export default function CantineParadisoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/10945/logos/3iJDbWKSTYOl8o07NvMW8w.jpeg"
                alt="Cantine Paradiso logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Cantine Paradiso</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>58</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Cantine%20Paradiso"
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
              <Row label="Winemaker" value="Angelo Paradiso" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.cantineparadiso.it"
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
              href="https://www.instagram.com/cantineparadiso/"
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
              href="https://www.facebook.com/cantineparadiso"
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
            <a href="tel:+390885428720" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              39 0885 428 720
            </a>
            <a href="mailto:info@cantineparadiso.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="White scooter with a bottle of Cantine Paradiso wine in vineyard rows"
          />
          <Paragraph>
            For three generations, the Paradiso family has been cultivating vines in Puglia, a land of ancient winemaking traditions. In 1954, grandfather Angelo, a farmer like many who then populated the Apulian countryside, would wake up at night and, in the darkness of early dawn, begin his workday, which ended only at sunset. Together with his four children, he fulfilled his dream: a winery that still today represents the central nucleus around which the entire company has developed.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Bottle of 1954 Cantine Paradiso wine resting on an engraved wooden barrel head"
          />
          <Paragraph>
            Our vineyards stretch across the Daunia area, in the Basso Tavoliere, framed to the North by the Gargano promontory and to the West by the Subappennino Dauno mountains, while being shielded to the east by the Gulf of Manfredonia, which softens the cold winds blowing from the Balkans.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Smiling vineyard worker joyfully holding large cluster of ripe black grapes during harvest"
          />
          <Paragraph>
            Vines have thrived on this land since ancient times. Legend has it that Diomedes, the Greek hero of the Trojan War, landed in Daunia and planted vine cuttings brought from Asia Minor, giving rise to Nero di Troia, the quintessential native Apulian grape variety. In the 19th century, Cerignola exported Nero di Troia to France, conquering the wine market.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Vast expanse of lush green vineyards cultivated with traditional pergola pugliese method"
          />
          <Paragraph>
            A vast expanse of vineyards, cultivated with the pergola pugliese system—the most widespread method, as it protects the vines from the sun’s rays—colors much of the Daunia territory. The grape varieties most dedicated to bottling are the native ones: Nero di Troia, Negroamaro, and Primitivo.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Vintage scooter parked between vineyard rows with Cantine Paradiso wine bottle on seat"
          />
          <Paragraph>
            Wine means conviviality. It is the desire to pour it first into others’ glasses and only then into your own, when gathered around a table. It is the gift we love to bring when invited to dinner: a true passe-partout for happiness. On special occasions we uncork a bottle, aware that this gesture will mark the beginning of a series of joyful events. After all, in ancient Rome the convivium was a banquet, a true feast where wine was the undisputed protagonist. Today we revive that same ritual—because it makes us happy.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Red wine swirling in a Cantine Paradiso branded wine glass"
          />
          <div className="pt-2">
            <Image
              src={images.banner}
              alt="Campaign financed according to EU Reg. N. 2021/2115 - Ministero dell'Agricoltura"
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
