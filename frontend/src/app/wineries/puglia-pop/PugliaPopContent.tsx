import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/287175/logos/mQ5kfATxT7OGt9o4ieWS-w_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/ZxQuKmetTYyDFjJobycb_Q_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/287175_pugliapop/287175_pugliapop_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/287175_pugliapop/287175_pugliapop_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/287175_pugliapop/287175_pugliapop_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/287175_pugliapop/287175_pugliapop_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/287175_pugliapop/287175_pugliapop_5_2560x1520.jpg',
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

function Paragraph({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px] ${className}`}>{children}</p>;
}

export default function PugliaPopContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Puglia Pop logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Puglia Pop</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>5</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Puglia%20Pop"
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
              <Row
                label="Winemaker"
                value="Puglia Pop"
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11.392 22.723c.386.184.579.277.608.277s.222-.093.608-.277C14.777 21.692 22 17.854 22 12.5V8.287c0-.773 0-1.16-.123-1.494a2 2 0 0 0-.519-.777c-.262-.242-.618-.39-1.331-.686L14.28 2.946c-.227-.094-.34-.141-.456-.16a1 1 0 0 0-.314 0c-.117.019-.23.066-.456.16L3.973 5.33c-.713.296-1.07.444-1.331.686a2 2 0 0 0-.519.777C2 7.128 2 7.514 2 8.287V12.5c0 5.354 7.223 9.192 9.392 10.223Z" />
                    <path d="M12 16.9a4.4 4.4 0 1 0 0-8.8 4.4 4.4 0 0 0 0 8.8ZM17.5 12.5h-2.2M8.7 12.5H6.5M12 9.2V7M12 18v-2.2" />
                  </svg>
                }
              />
              <Row
                label="Owned by"
                value={
                  <a href="http://www.cignomoro.it/eng/home_eng.html" target="_blank" rel="noreferrer" className="hover:underline">
                    Cignomoro
                  </a>
                }
                icon={
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9.783c0-.288 0-.431.037-.563a1 1 0 0 1 .159-.326c.082-.11.195-.198.422-.374l7.4-5.756c.351-.273.527-.41.72-.462a1 1 0 0 1 .523 0c.194.052.37.189.721.462l7.4 5.756c.227.176.34.264.422.374a1 1 0 0 1 .159.326c.037.132.037.275.037.563V19.4c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437C20.24 21 19.96 21 19.4 21H4.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C3 20.24 3 19.96 3 19.4V9.783Z" />
                  </svg>
                }
              />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.pugliapop.com/en/"
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
              href="https://www.instagram.com/pugliapop/"
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
              href="https://www.facebook.com/pugliapopwines"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:+393341219936" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              +39 3341219936
            </a>
            <a href="mailto:hello@pugliapop.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1.5 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          {/* Hero Banner Image */}
          <StoryImage
            src={images.hero}
            alt="Puglia Pop colorful pop art wine bottles on display"
          />

          {/* Story Image 1 & Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="Puglia Pop iconic colorful bottles on architectural pedestal against blue sky"
            />
            <Paragraph>
              Apulia is a feeling. It is an expression of mood. It is joy, carefree. It is warmth and colour of its Mediterranean soul. The Puglia Pop project was born in this land and envisaged as a way to break with the conventional world of wine. It is the story of dream and determination through an unprecedented version of Apulia that, as Tommaso Fiore used to say, “forms like in an ant-hill where, however, men rebels are created”.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 2 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image2}
              alt="Blue Puglia Pop bottle with innovative wine presentation"
            />
            <Paragraph>
              Technique, innovation, design and attention to detail, but also a simple language that frees wine from its often self-celebratory “simulacrum”. This winery tells about a predominantly agricultural and traditional region that has believed in its identity and turned it into something more: a project, a contemporary art piece. That’s why its wines are the perfect combination of that tradition that comes from ancient know-how and modernity with its new techniques.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 3 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image3}
              alt="Hand holding pink Puglia Pop bottle surrounded by creative appetizers"
            />
            <Paragraph>
              Puglia Pop was born with four different wines that represent a portion of the soul of Apulia and its most important vines. There is Primitivo di Manduria and Susumaniello, both red wines; Verdeca that comes from the Itria Valley and Negroamaro that is vinified rosé at its peak. Also the names and the design evoke the Apulian territory, but in its most colourful, cheerful and popular way. A great story of wine that has the courage to embrace modernity also by exploring the use of bottles that turn into signature items.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 4 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image4}
              alt="Red Puglia Pop bottle surrounded by fresh figs, fig leaves and balsamic reduction"
            />
            <Paragraph>
              The cellar is located in the middle of the vineyards in Contrada Ferrari in Martina Franca. Six hundred square meters are destined to production and storage and they are added to those created to host conviviality and being together on fantastic terraces overlooking the Itria Valley. All of this immersed in the amazing atmosphere of the vineyards surrounded by trulli, dry stone walls and prickly pears.
            </Paragraph>
          </div>

          {/* Story Image 5 */}
          <div className="pt-2 pb-1">
            <StoryImage
              src={images.image5}
              alt="Green Puglia Pop bottle with wild white flowers and sea sponge"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
