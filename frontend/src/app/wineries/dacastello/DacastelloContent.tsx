import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  logo: 'https://thumbs.vivino.com/wineries/47756/logos/Qx49lBsEQ6OaImtJEMs_BQ_500x500.jpeg',
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/OjClzOpGQACdjcIfl7qESQ_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/47756_dacastellovini/47756_dacastellovini_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/47756_dacastellovini/47756_dacastellovini_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/47756_dacastellovini/47756_dacastellovini_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/47756_dacastellovini/47756_dacastellovini_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/47756_dacastellovini/47756_dacastellovini_5_2560x1520.jpg',
  image6: 'https://images.vivino.com/misc/sponsorships/47756_dacastellovini/47756_dacastellovini_6_2560x1520.jpg',
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

export default function DacastelloContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src={images.logo}
                alt="Dacastello logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Dacastello</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>133</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Dacastello"
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
                label="Owned by"
                value="Dacastello"
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
              href="http://www.dacastellovini.com/en/"
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
              href="https://www.instagram.com/dacastellovini"
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
              href="https://www.facebook.com/dacastello/"
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
            <a href="tel:+390173509748" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              +39 0173 509748
            </a>
            <a href="mailto:info@dacastellovini.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
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
            alt="Dacastello modern winery headquarters and Corten steel sign"
          />

          {/* Story Image 1 & Paragraph 1 */}
          <div className="space-y-1 pt-1">
            <StoryImage
              src={images.image1}
              alt="The Dacastello team and family members standing together at exhibition stand"
            />
            <Paragraph>
              Dacastello Vini Pregiati has been showcasing Italian wineries for over twenty years, offering a wide range of wines that are deeply rooted in their native Italian territory. With a careful selection, it brings together an assortment of over one hundred types of wine that best represent the value of Italian winemaking, the local character of each label, and accessibility to a diversified consumer base.
            </Paragraph>
          </div>

          {/* Story Image 2 & Paragraph 2 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image2}
              alt="Swirling rich red wine in a Dacastello etched wine glass"
            />
            <Paragraph>
              Dacastello Vini Pregiati has become an important intersection between Italy’s native wines and the national and international markets, thanks to the conception of a variety of collections and to distribution and marketing on a vast scale.
            </Paragraph>
          </div>

          {/* Story Image 3 & Paragraph 3 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image3}
              alt="Dacastello brothers discussing wine on the staircase"
            />
            <Paragraph>
              Dacastello Vini is the story of two brothers born on a Piedmontese hill surrounded by vineyards stretching as far as the eye can see, who after traveling around the world decided to return to Italy to enhance the wine excellence of their country. “It was the early 2000s and we were guided by a vision, a challenge and the strength of our origins. We conceived our first labels and added our first wines to the catalogue, with determination. In spite of the many obstacles, we continued to have faith in our project. Perseverance has been our strength”. This is how the Dacastello Fine Wines was born.
            </Paragraph>
          </div>

          {/* Story Image 4 & Paragraph 4 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image4}
              alt="Next generation team members smiling and holding bottles of Dacastello wines"
            />
            <Paragraph>
              “In the meantime, our children grew up, completed their studies and joined us. Their skills, our experience and technology have come together. Together, we are working to develop our vision”.
            </Paragraph>
          </div>

          {/* Story Image 5 & Paragraph 5 */}
          <div className="space-y-1 pt-2">
            <StoryImage
              src={images.image5}
              alt="Dacastello team member in vineyard looking out over lush green rows"
            />
            <Paragraph>
              Believing in innovation and raising the quality of its products, Dacastello Vini is now present in Europe, the United States, Central America, North Africa, Australia, New Zeland, Ucraine, Japan, India, Malta, Brasil… with three different ranges of wines, capable of meeting the requirements of the most diverse clientele. Punctuality, flexibility and rigour are the watchwords for the logistics of Dacastello Vini, guaranteeing a complete service of transport, shipment and distribution thanks to a network of qualified partners consolidated over time. Present on the national and international market, Dacastello Vini is the reference company for exporting authentic Italian wines to the world.
            </Paragraph>
          </div>

          {/* Story Image 6 */}
          <div className="pt-2 pb-1">
            <StoryImage
              src={images.image6}
              alt="Dacastello wine tasting and pouring at trade show"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
