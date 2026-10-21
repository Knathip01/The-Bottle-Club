import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Mail, Star, Phone } from 'lucide-react';

const images = {
  hero: 'https://thumbs.vivino.com/winery_backgrounds/CRGFfmwQT_SiDB0HKlXdaA_2560x1520.jpeg',
  image1: 'https://images.vivino.com/misc/sponsorships/220297_tenutaluce/220297_tenutaluce_1_2560x1520.jpg',
  image2: 'https://images.vivino.com/misc/sponsorships/220297_tenutaluce/220297_tenutaluce_2_2560x1520.jpg',
  image3: 'https://images.vivino.com/misc/sponsorships/220297_tenutaluce/220297_tenutaluce_3_2560x1520.jpg',
  image4: 'https://images.vivino.com/misc/sponsorships/220297_tenutaluce/220297_tenutaluce_4_2560x1520.jpg',
  image5: 'https://images.vivino.com/misc/sponsorships/220297_tenutaluce/220297_tenutaluce_5_2560x1520.jpg',
  image6: 'https://images.vivino.com/misc/sponsorships/220297_tenutaluce/220297_tenutaluce_6_2560x1520.jpg',
  image7: 'https://images.vivino.com/misc/sponsorships/220297_tenutaluce/220297_tenutaluce_7b_2560x1520.jpg',
  image8: 'https://images.vivino.com/misc/sponsorships/220297_tenutaluce/220297_tenutaluce_8b_2560x1520.jpg',
  image9: 'https://images.vivino.com/misc/sponsorships/220297_tenutaluce/220297_tenutaluce_9b_2560x1520.jpg',
  image10: 'https://images.vivino.com/misc/sponsorships/220297_tenutaluce/220297_tenutaluce_10b_2560x1520.jpg',
  banner: 'https://images.vivino.com/misc/sponsorships/1249_Frescobaldi/Frescobaldi_OCM_double.png',
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

export default function TenutaLuceContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14">
              <Image
                src="https://images.vivino.com/wineries/220297/logos/gb3iMyZvRVKxJTgQRJFq-w.jpeg"
                alt="Tenuta Luce logo"
                width={56}
                height={56}
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Tenuta Luce</h1>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628" />
                  <path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified Partner Winery
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs">
                <span><b>7</b> Wines</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                  <b>4.3</b>
                </span>
                <span className="hidden sm:inline">80,777 total ratings</span>
                <span className="sm:hidden">80,777 ratings</span>
              </div>
            </div>
            <Link
              href="/search?q=Tenuta+Luce"
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
                  <a href="https://www.vivino.com/en/explore/regions/tuscany" className="hover:underline">
                    Tuscany
                  </a>
                }
                icon={<Mountain size={17} />}
              />
              <Row label="Owned by" value="Marchesi Frescobaldi" icon={<span className="text-base">◉</span>} />
            </div>
          </section>

          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a
              href="https://www.tenutaluce.com"
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
              href="https://www.instagram.com/tenutaluce/"
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
            <a href="tel:+3905527141" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Phone size={14} />
              +3905527141
            </a>
            <a href="mailto:info@tenutaluce.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold">
              <Mail size={14} />
              Winery Email
            </a>
          </section>
        </aside>

        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <StoryImage
            src={images.hero}
            alt="Historic stone farmhouse and estate of Tenuta Luce in Montalcino"
          />
          <Paragraph>
            Tenuta Luce extends south-west of Montalcino in the heart of the Natural Park of Val d’ Orcia, a rural landscape cleverly and aesthetically redesigned by man in pre-Renaissance times and recognized in 2004 as an Intangible Cultural Heritage Site by UNESCO.
          </Paragraph>
          <StoryImage
            src={images.image1}
            alt="Vineyard rows overlooking Tuscan hills at sunset"
          />
          <Paragraph>
            It is in this extraordinary land, historically known for its high quality wines, that the 249 hectares of Tenuta Luce are found. This pristine and sparsely populated environment is rich in biodiversity and includes a large wooded area, olive trees and 88 hectares of vineyards.
          </Paragraph>
          <Paragraph>
            The bright light due to its particular exposure, the crisp breezes, and the variety of soils and altitudes make of Tenuta Luce a unique place where the balance between all these elements is safeguarded with deep respect. A respect that continues all the way to the winery, where each step is carried out with the utmost care for the enhancement of the precious harmony achieved in the vineyard.
          </Paragraph>
          <StoryImage
            src={images.image2}
            alt="Winemaker using glass wine thief pipette over barrel"
          />
          <Paragraph>
            The philosophy of Tenuta Luce is built upon the idea that wine should be as natural an expression of the place where it is produced as possible, as well as of the specific characteristics of each grape variety, thus achieving a perfect balance between grapevine and terroir. Human intervention is quite limited and always non invasive and has to objective of protecting this natural harmony.
          </Paragraph>
          <Paragraph>
            The wines of Tenuta Luce were born in the early Nineties of this unique terroir and philosophy from the meeting of two great men of wine, Vittorio Frescobaldi and Robert Mondavi. Having chosen Montalcino, they joined their knowledge together to pursue the potential of this terroir, so well-suited for winemaking, in a highly distinctive way.
          </Paragraph>
          <StoryImage
            src={images.image3}
            alt="Vittorio Frescobaldi and Robert Mondavi walking in vineyard"
          />
          <Paragraph>
            Since 2004, when the partnership with Mondavi ended, Lamberto Frescobaldi helms the Tenuta Luce project, supported by an entire team dedicated to the perpetuation of this vision.
          </Paragraph>
          <StoryImage
            src={images.image4}
            alt="Modern entrance to underground Tenuta Luce winery with estate above"
          />
          <Paragraph>
            The winery of Tenuta Luce mirrors and crowns the project’s visions: subterranean, and therefore sustainable and perfectly integrated with the surrounding environment, the estate is an underground temple topped by an old farmhouse and a beautiful Mediterranean garden.
          </Paragraph>
          <StoryImage
            src={images.image5}
            alt="Mediterranean artichoke flowers in foreground with Tenuta Luce farmhouse under the sun"
          />
          <Paragraph>
            Following the winding path through the rooms dedicated to winemaking, one reaches the Historic Cellar, an environment clad in walnut wood, similar to a medieval library, where all the vintages of Luce since its first are kept alongside other wines from the estate.
          </Paragraph>
          <StoryImage
            src={images.image6}
            alt="Tenuta Luce historic cellar with illuminated walnut wood library shelves"
          />
          <Paragraph>
            Luce is the estate&apos;s iconic wine. It was the first wine produced in Montalcino from a blend of Sangiovese and Merlot, born of the idea of introducing the elegant structure of Sangiovese to the soft roundness of Merlot. A choice born from the desire to honor and exalt a land of great wines and traditions in a never seen before interpretation.
          </Paragraph>
          <StoryImage
            src={images.image7}
            alt="Luce iconic wine bottle with golden radiant sun motif"
          />
          <Paragraph>
            Alongside Luce, the estate has added other wines to its collection over the years, each characterized by a unique personality:
          </Paragraph>
          <Paragraph>
            Lucente, whose first vintage was in 1995, is also a blend of Merlot and Sangiovese and is the result of a selection of vineyard lots more suited to the production of a wine with a fruity and very pleasant profile.
          </Paragraph>
          <StoryImage
            src={images.image8}
            alt="Lucente wine bottle standing with silver sun motif"
          />
          <Paragraph>
            Luce Brunello is a tribute to the tradition of Montalcino that begins with the 2003 harvest.
          </Paragraph>
          <StoryImage
            src={images.image9}
            alt="Luce Brunello di Montalcino wine bottle with radiant sun rays"
          />
          <Paragraph>
            And finally Lux Vitis, a rare and distinctive interpretation of the same terroir, which joins blends Cabernet Sauvignon with a small part of Sangiovese.
          </Paragraph>
          <StoryImage
            src={images.image10}
            alt="Lux Vitis bottle with glowing golden vine branch motif"
          />
          <div className="flex justify-center py-2">
            <Image
              src={images.banner}
              alt="Campaign financed according to EU Reg. No. 2021/2115 - Ministero dell'Agricoltura"
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
