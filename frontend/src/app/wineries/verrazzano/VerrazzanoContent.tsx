import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/E5q06vRmRXq3NvG9c60gbw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/3348_castellodiverrazzano/2024_update/3348_verrazzano_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/3348_castellodiverrazzano/2024_update/3348_verrazzano_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/3348_castellodiverrazzano/2024_update/3348_verrazzano_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/3348_castellodiverrazzano/2024_update/3348_verrazzano_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/3348_castellodiverrazzano/2024_update/3348_verrazzano_5_2560x1520.jpg',
  image6: 'https://images.vivino.com/misc/sponsorships/3348_castellodiverrazzano/2024_update/3348_verrazzano_6_2560x1520.jpg',
  image7: 'https://images.vivino.com/misc/sponsorships/3348_castellodiverrazzano/2024_update/3348_verrazzano_7_2560x1520.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/3348_castellodiverrazzano/2024_update/3348_verrazzano_8_400x200.jpg',
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

export default function VerrazzanoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/3348/logos/F_-bX1K3R4GN2l2_qbeieQ.jpeg"
                alt="Verrazzano logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Verrazzano</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>25</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Verrazzano"
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
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.verrazzano.com"
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
              href="https://www.instagram.com/verrazzanopeople"
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
              href="https://www.facebook.com/castellodiverrazzano/"
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
            <a
              href="https://x.com/staffverrazzano"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
              </span>
              <ExternalLink size={11} />
            </a>
            <a href="tel:+39055854243" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              39 055 854 243
            </a>
            <a href="mailto:info@verrazzano.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Aerial panoramic view of Castello di Verrazzano and surrounding Tuscan vineyards"
          />
          <StoryImage
            src={images.image1}
            alt="Aerial view of Castello di Verrazzano nestled in the hills of Chianti Classico"
          />
          <Paragraph>
            The Castle was built in the 7th century and it has been owned by the Cappellini family since 1958.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Historical stone castle tower and manor of Castello di Verrazzano in golden sunlight"
          />
          <Paragraph>
            Verrazzano is the birthplace of Giovanni da Verrazzano, the navigator who discovered New York Bay in 1524.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Person reading ancient historical document under focused desk light"
          />
          <Paragraph>
            The wine-growing activity here dates back to 1170. Nowadays traditional-style and organic-certified DOCG Chianti Classico and IGT Toscana wines areproduced with sustainable viticulture that respects the environment and the soil and enhances the characteristics of Sangiovese grapes cultivated in this area.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Tuscan vineyard farmer gently inspecting Sangiovese grape clusters on the vine"
          />
          <Paragraph>
            Further farm products include extra-virgin olive oil, fine kinds of vinegar, and cold cuts from the wild boars in the estate woods.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Overhead bird-eye perspective of grape harvest wooden box filled with freshly picked grapes"
          />
          <Paragraph>
            The property, which extends for 570 acres and includes 170 acres of vineyards, has remained within the same boundaries since 1000years. At the center of the estate stands the manor house, with a stone tower and Renaissance gardens, that are available to visit, besides the historical cellars.
          </Paragraph>
          <StoryImage
            src={images.image6}
            alt="Historic brick cellar corridor flanked with large oak aging casks"
          />
          <Paragraph>
            From the top of the hill, you can sip a glass of Chianti Classico enjoying the amazing panoramic views of the Greve Valley.
          </Paragraph>
          <StoryImage
            src={images.image7}
            alt="Castello di Verrazzano manor house and cypress trees with panoramic valley views"
          />
          <div className="pt-2">
            <Image
              src={images.banner}
              alt="Campaign financed according to EU Reg. N. 2021/2115"
              width={400}
              height={200}
              unoptimized
              className="h-auto w-auto max-w-[220px] object-contain sm:max-w-[260px]"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
