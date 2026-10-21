import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/2f9m-mAATfuMqi6Atg3cbw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/15376_CaBolani/CaBolani_+15376_1.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/15376_CaBolani/CaBolani_+15376_2.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/15376_CaBolani/CaBolani_+15376_3.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/15376_CaBolani/CaBolani_+15376_4.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/15376_CaBolani/CaBolani_+15376_5.jpg',
  image6: 'https://images.vivino.com/misc/sponsorships/15376_CaBolani/CaBolani_+15376_6.jpg',
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

export default function CaBolaniContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/15376/logos/oGWrNNgDRrOBA2Xb-IPBDg.jpeg"
                alt="Ca' Bolani logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Ca&#39; Bolani</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>38</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Ca%27%20Bolani"
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
                value="Zonin1821"
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
              href="http://www.cabolani.it"
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
              href="https://www.facebook.com/tenutacabolani"
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
            <a href="tel:39043132670" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              39043132670
            </a>
            <a href="mailto:info@cabolani.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Outdoor tasting table beside the tranquil Molin di Ponte pond at Ca' Bolani"
          />
          <Paragraph>
            The estate overlooks the Lagoon of Grado and extends north to Aquileia, Cervignano del Friuli, and the historic fortress of Palmanova.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Summer harvest table laden with fresh vegetables, bread, wine, and glasses under leafy arbor"
          />
          <Paragraph>
            The estate enjoy an ideal microclimate: the temperate breezes from the Adriatic moderate the hot summers, while the warmth of the sun promotes optimal grape ripening. The cool night temperatures enhance the primary aromas of the fruit, giving the wines a unique personality.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Long scenic avenue of cypress trees running alongside verdant Friuli vineyards"
          />
          <Paragraph>
            Ca&#39; Bolani is characterized by a landscape featuring a mosaic of vineyards with over ten varieties of both native and international grapevines, including Glera (for Prosecco), Pinot Grigio, Sauvignon Blanc, Merlot, and Refosco dal Penduncolo Rosso.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Two bottles of Ca' Bolani white wine and glasses in front of autumnal ivy wall"
          />
          <StoryImage
            src={images.image4}
            alt="Bottle of Ca' Bolani red wine with wine glasses and blanket set on an outdoor rustic bench"
          />
          <Paragraph>
            The soil is rich and deep, divided into 90 distinct parcels, each treated separately to highlight its unique characteristics. This approach, which combines respect for nature withtechnical expertise, is based on innovation as the foundation for sustainable development. Among the viticultural practices in use are cover cropping between the rows, which keeps the soil healthy and promotes biodiversity, green manuring to naturally nourish the land, and sexual confusion, an eco-friendly technique to limit the spread of harmful insects.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Bottle of sparkling wine on table decorated with seasonal grapes, pumpkins, and walnuts"
          />
          <Paragraph>
            The Parco della Vite (Garden of Vines) offers visitors a unique experience: they can stroll through the vineyards, surrounded by centuries-old trees, and admire the Molin di Ponte pond, fed by the purest spring water. In this untouched corner of nature, visitors can taste the finest local wines and enjoy the tranquility of a paradisiacal environment. Ca&#39; Bolani is the place where every moment is perfect.
          </Paragraph>
          <div className="py-1 text-center text-[10px] text-stone-500 sm:text-xs">
            <a href="https://www.linkedin.com/company/ca-bolani" target="_blank" rel="noreferrer" className="text-[#a11a1a] hover:underline">LinkedIn</a>
            <span className="mx-2 text-stone-300">|</span>
            <a href="https://www.instagram.com/cabolani/" target="_blank" rel="noreferrer" className="text-[#a11a1a] hover:underline">Instagram</a>
            <span className="mx-2 text-stone-300">|</span>
            <a href="https://www.facebook.com/CaBolani/" target="_blank" rel="noreferrer" className="text-[#a11a1a] hover:underline">Facebook</a>
          </div>
          <StoryImage
            src={images.image6}
            alt="Bottle of Ca' Bolani Sauvignon Blanc flat lay surrounded by eucalyptus leaves, dark grapes, and wine glasses"
          />
        </article>
      </div>
    </div>
  );
}
