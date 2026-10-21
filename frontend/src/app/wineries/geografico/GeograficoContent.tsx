import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/wineries/sponsorship_cards/oLD6g9_6S6uN2IKzA457Hw_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/3707_geografico_2023/3707_geografico_2023_1_2560x1520.JPG',
  image2: 'https://images.vivino.com/misc/sponsorships/3707_geografico_2023/3707_geografico_2023_2_2560x1520.JPG',
  image3: 'https://images.vivino.com/misc/sponsorships/3707_geografico_2023/3707_geografico_2023_3_2560x1520.JPG',
  image4: 'https://images.vivino.com/misc/sponsorships/3707_geografico_2023/3707_geografico_2023_4_2560x1520.JPG',
  image5: 'https://images.vivino.com/misc/sponsorships/3707_geografico_2023/3707_geografico_2023_5_2560x1520.JPG',
  banner: 'https://images.vivino.com/misc/sponsorships/Piccini_OCM_2026.png',
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

export default function GeograficoContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        {/* Left Sidebar */}
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/3707/logos/4tcqfb2LROmgvfwzx-94Xg.jpeg"
                alt="Geografico logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Geografico</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>74</b> Wines</span>
              </div>
            </div>
            <Link
              href="/search?q=Geografico"
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
              <Row label="Winemaker" value="Geografico" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="http://www.chiantigeografico.it"
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
              href="https://www.instagram.com/geografico_wines/?hl=it"
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
              href="https://www.facebook.com/agricoltori.geografico/"
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
            <a href="tel:+390577749489" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Phone size={14} />
              39-0577-749-489
            </a>
            <a href="mailto:info@chiantigeografico.it" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold text-[#1e1e1e] hover:bg-stone-50">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        {/* Right Article */}
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Rolling panoramic Chianti Classico hills with cypress road"
          />
          <StoryImage
            src={images.image1}
            alt="Winemaker hands inspecting ripe Chianti Sangiovese grapes on the vine"
          />
          <Paragraph>
            Chianti Geografico has an ancient story with deep roots in the land. It all began back in 1961, against the backdrop of the gorgeous Chianti Classico hills, when 17 far-sighted farmers decided to join forces in defense of the immense Tuscan wine heritage. Thus, the cooperative of the &quot;Agricoltori del Chianti Geografico&quot; was born, which underlined the strong bond with Radda, Castellina and Gaiole, the lands of the Chianti Classico.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Traditional red-rimmed large oak wine casks lined up in Geografico cellar"
          />
          <Paragraph>
            Thanks to an innovative approach, summarized in the &quot;Geographic Method,&quot; the cooperative achieved success, relaunching the local economy. A few years after the foundation, &quot;Agricoltori del Chianti Geografico&quot; began to attract the attention of other local winemakers who joined the cause. The turnover grew so rapidly that it became necessary, in 1970, to build a new winery in Gaiole in Chianti, followed, in 1989, by the winery in San Gimignano. At the end of the millennium, the cooperative represented one of the most solid realities in Chianti, with a commercial network that touched every corner of the globe.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Symmetrical lush vineyard rows extending towards Tuscan hills"
          />
          <Paragraph>
            After its unstoppable march, the cooperative entered the 2000s with renewed energy and passion. However, the uncertainty that paralyzed the markets in those years made its weight felt. To support the cooperative, in the darkest moment of its history, the Piccini family arrived, first taking over the management and then acquiring it definitively in 2018.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Mario Piccini, owner of Piccini 1882 group, in front of vineyards"
          />
          <Paragraph>
            &quot;We are very proud of the acquisition of the Geografico,&quot; declares Mario Piccini, owner of the Piccini 1882 group. &quot;It was a great operation with which we managed to save not only the renowned Geografico brand but also, and above all, the company with employees and suppliers.&quot; Aware of the Geografico prestige, the Piccini family immediately did their best to maintain the production philosophy that animated the cooperative, respecting its legacy and constant commitment to enhance the territory and its farmers.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Three bottles of Geografico Contessa di Radda wine collection on table"
          />
          <Paragraph>
            Following the path traced by a 60-year tradition, &quot;Agricoltori del Chianti Geografico&quot; offers wines that preserve the true essence of Chianti, telling the authenticity of these hills with each sip. The pride of Geografico is the Contessa di Radda line, a prestigious exaltation of Tuscan wine. Its bottles celebrate the ancient past of the area, displaying on the label the face of the noble medieval lady Willa of Tuscany, who lived over a millennium ago in the Chianti area. With its sublime aromas, Contessa di Radda is a tender love poem dedicated to our past and to the beauty that has been surrounding us for ages.
          </Paragraph>
          <p className="px-0.5 py-1 text-[10px] leading-[1.45] sm:text-[13px]">
            <a href="https://chiantigeografico.it/#sectionAnchor1/3" target="_blank" rel="noreferrer" className="font-semibold text-[#ba1628] hover:underline">
              www.geografico.com
            </a>
          </p>
          <div className="flex justify-center py-2">
            <Image
              src={images.banner}
              alt="Campaign financed according to EU Reg. N. 2021/2115 - Ministero dell'Agricoltura"
              width={1280}
              height={760}
              unoptimized
              className="h-auto w-full max-w-[420px] object-contain"
            />
          </div>
        </article>
      </div>
    </div>
  );
}
