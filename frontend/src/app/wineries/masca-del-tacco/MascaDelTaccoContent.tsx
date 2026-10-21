import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/A3-aXZb9Ryu3lt1diE7WJA_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/185893_mascadeltacco_NEW/185893_mascadeltacco_2_NEW_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/185893_mascadeltacco_NEW/185893_mascadeltacco_3_NEW_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/185893_mascadeltacco_NEW/185893_mascadeltacco_4_NEW_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/185893_mascadeltacco_NEW/185893_mascadeltacco_5_NEW_2560x1520.jpg',
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

export default function MascaDelTaccoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://thumbs.vivino.com/wineries/185893/logos/4rMqb2ClQoujtRrnV7V1Ug_500x500.png"
                alt="Masca del Tacco logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Masca del Tacco</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>22</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.2</b>
                </span>
                <span className="hidden sm:inline">92,297 total ratings</span>
                <span className="sm:hidden">92,297 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Masca+del+Tacco"
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
              <Row label="Owned by" value="I Vignaioli Felice & Armando Mergè" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.mascadeltacco.com"
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
              href="https://www.facebook.com/pages/masca-del-tacco/978965305494211"
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
            <a href="tel:+390831759786" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              +390831759786
            </a>
            <a href="mailto:info@poggiolevolpi.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Historic stone building and olive groves at Masca del Tacco in Puglia"
          />
          <Paragraph>
            Masca del Tacco, nestled in the heart of Apulia, Italy, has quickly gained a reputation for crafting wines that capture the unique spirit of the Salento region. Established in 2010 by Felice Mergè, the winery occupies a historic building that once housed the Communal Cooperative of Erchie&apos;s producers, dating back to 1949. Felice, along with the expertise of his father Armando, restored this site with a mix of innovation and respect for tradition, transforming it into a modern winery that preserves the original rustic charm.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Traditional stone trullo structure in the vineyard"
          />
          <Paragraph>
            What sets Masca del Tacco apart is its commitment to showcasing native Italian grape varieties, particularly those that thrive under the intense Mediterranean sun and in the mineral-rich soils of Apulia. This dedication is evident in their flagship wines, such as Primitivo Old Vines, a deep, bold red known for its complex flavors of dark fruits, spice, and earthy undertones. Another standout is Susumaniello, a rare varietal that’s becoming increasingly popular among wine enthusiasts for its vibrant acidity and elegant structure.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Lineup of Masca del Tacco wine bottles"
          />
          <Paragraph>
            For wine lovers who appreciate a taste of Italian heritage with a contemporary twist, Masca del Tacco&apos;s Anniversario Cuvée delivers a remarkable experience. This carefully crafted blend represents the pinnacle of the winery&apos;s artistry, combining the rich, full-bodied character of Primitivo with the finesse of other traditional varietals. Each sip reflects the care and precision with which Masca del Tacco approaches winemaking.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Piano Chiuso Riserva award-winning wine showcase"
          />
          <Paragraph>
            Masca del Tacco has also gained recognition on the international stage, with awards from prestigious wine competitions like the Berliner Wine Trophy and Mundus Vini. The winery&apos;s focus on quality has earned it a loyal following both in Italy and abroad, with high ratings across wine review platforms.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Large oak barrels in Masca del Tacco aging cellar"
          />
          <Paragraph>
            For those exploring Vivino, Masca del Tacco offers a journey into the flavors of southern Italy—a perfect balance of tradition and innovation that captures the essence of Apulia in every bottle.
          </Paragraph>
        </article>
      </div>
    </div>
  );
}
