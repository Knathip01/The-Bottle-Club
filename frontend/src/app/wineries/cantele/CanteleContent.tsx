import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/3Q1Lkz_8Sauw98nNRz2nRQ_2560x1520.jpeg',
  cellar: 'https://vivino.s3.amazonaws.com/misc/sponsorships/5087_Cantele/5087_cantele_header+(2).jpg',
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="px-0.5 pt-2 pb-0.5 text-[11px] font-bold text-[#1e1e1e] sm:text-[14px]">{children}</h2>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

export default function CanteleContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/5087/logos/V6Ukb4fMRtqp9l7D0jkULQ.jpeg"
                alt="Cantele logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Cantele</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>51</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Cantele"
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
              <Row label="Winemaker" value="Cantele" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.cantele.it"
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
              href="https://www.instagram.com/cantelewinery/"
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
              href="https://www.facebook.com/cantelevini"
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
            <a href="tel:+390832705010" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              39 0832 705 010
            </a>
            <a href="mailto:cantele@cantele.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Cantele winery modern estate illuminated at dusk in Salento, Puglia"
          />
          <SectionHeading>Origins</SectionHeading>
          <Paragraph>
            The Cantele Winery story began quietly, shaped by movement across regions, people, and generations. Its roots trace back to northern Italy, where Giovanni Battista Cantele met Teresa Manara. After the war, they chose to move south, settling in Salento, Puglia—then a modest land with hidden potential.
          </Paragraph>
          <SectionHeading>Early Vision</SectionHeading>
          <Paragraph>
            Giovanni entered the wine trade, sourcing bulk wine in Puglia and selling it in the north. Through frequent travel, he built relationships with local growers and gained a deep understanding of the land. When Teresa first visited Salento, she immediately recognized its promise. Their children grew up blending northern discipline with southern intuition.
          </Paragraph>
          <SectionHeading>Foundation</SectionHeading>
          <Paragraph>
            In the 1970s, Augusto Cantele, trained in enology in Conegliano, returned to Puglia with a focus on quality winemaking, including white wines—rare for the region at the time. Alongside his brother Domenico, who brought economic expertise, and their father Giovanni, he founded the winery in 1979. Initially working with selected growers, the family later acquired vineyards and defined a clear production identity.
          </Paragraph>
          <StoryImage
            src={images.cellar}
            alt="Oak barrels lined up in rows inside Cantele winery cellar"
          />
          <SectionHeading>Today</SectionHeading>
          <Paragraph>
            Now led by the third generation, the winery combines heritage with a forward-looking vision. Gianni, Paolo, Umberto, and Luisa continue to refine the family philosophy, balancing technical precision with respect for place, while responding to market evolution, climate challenges, and changing wine culture.
          </Paragraph>
          <SectionHeading>Sustainable Approach</SectionHeading>
          <Paragraph>
            The winery’s agronomic philosophy is built on collaboration, research, and innovation. Precision viticulture tools, satellite mapping, and AI-driven decision systems support sustainable practices. Synthetic insecticides have been replaced with biological methods, while renewable energy powers production. Partnerships with institutions such as the University of Milan and the National Research Council reinforce a long-term commitment to environmental responsibility and continuous improvement.
          </Paragraph>
        </article>
      </div>
    </div>
  );
}
