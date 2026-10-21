import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Globe, Mountain, Phone, Mail } from 'lucide-react';

const storyBase = 'https://images.vivino.com/misc/sponsorships/103023_ClosdeCaille/';

function Row({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5"><div className="w-5 shrink-0 text-[#262626]">{icon}</div><div className="min-w-0"><div className="text-[10px] leading-3 text-stone-500">{label}</div><div className="truncate text-[11px] font-semibold leading-4 text-[#1e1e1e]">{value}</div></div></div>;
}

function VerifiedBadge() {
  return <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1e1e1e]"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.5 14 4v4c0 3.2-3.2 5.7-6 6.5C5.2 13.7 2 11.2 2 8V4l6-2.5Z" fill="#BA1628"/><path d="m5.3 8 1.8 1.8 3.7-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Verified Partner Winery</div>;
}

function StoryImage({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} width={1280} height={760} unoptimized className="h-auto max-h-[300px] w-full rounded-md object-cover sm:max-h-[420px]"/>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="px-0.5 py-1 text-[10px] leading-[1.45] text-[#242424] sm:text-[13px]">{children}</p>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="px-0.5 pt-1 text-[11px] font-bold text-[#242424] sm:text-sm">{children}</h2>;
}

export default function ClosDeCailleWineryContent() {
  return (
    <div className="mx-auto max-w-[1120px] px-3 py-3 sm:px-5 lg:py-6">
      <div className="grid grid-cols-[minmax(112px,0.38fr)_minmax(0,1fr)] items-start gap-2 sm:grid-cols-[minmax(210px,0.38fr)_minmax(0,1fr)] sm:gap-5">
        <aside className="sticky top-3 space-y-2">
          <section className="space-y-2 rounded-md border border-stone-200 bg-white p-2.5 sm:p-4">
            <div className="mx-auto flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-stone-200 sm:mx-0 sm:h-14 sm:w-14"><Image src="https://images.vivino.com/wineries/103023/logos/jvN9nx6VQ3iK_ffUFV5zsg.jpeg" alt="Clos de Caille logo" width={56} height={56} unoptimized /></div>
            <div><h1 className="text-sm font-bold leading-tight text-[#1e1e1e] sm:text-xl">Clos de Caille</h1><VerifiedBadge/><div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[10px] text-stone-700 sm:text-xs"><span><b>9</b> Wines</span></div></div>
            <Link href="/search?q=Clos%20de%20Caille" className="block rounded-full bg-[#1e1e1e] px-2 py-2 text-center text-[10px] font-bold text-white hover:bg-black sm:text-xs">View wines</Link>
            <div className="divide-y divide-stone-200 rounded-md border border-stone-200">
              <Row label="Country" value={<Link href="/product?country=France" className="hover:underline">France</Link>} icon={<span>🇫🇷</span>}/>
            </div>
          </section>
          <section className="divide-y divide-stone-200 rounded-md border border-stone-200 bg-white text-[10px] sm:text-xs">
            <a href="https://www.closdecaille.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span className="flex items-center gap-2"><Globe size={14}/>Website</span><ExternalLink size={11}/></a>
            <a href="https://www.instagram.com/Clos_de_Caille" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-1 px-2.5 py-2.5 font-semibold"><span>Instagram</span><ExternalLink size={11}/></a>
            <a href="tel:+330988663844" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Phone size={14}/>+33 (0)9 88 66 38 44</a>
            <a href="mailto:info@closdecaille.com" className="flex items-center gap-2 px-2.5 py-2.5 font-semibold"><Mail size={14}/>Winery Email</a>
          </section>
        </aside>
        <article className="min-w-0 space-y-1 overflow-hidden rounded-md border border-stone-200 bg-white p-1.5 sm:space-y-2 sm:p-2">
          <Image src="https://thumbs.vivino.com/wineries/sponsorship_cards/5eCAO4kGQEmPLwLyE701XQ_2560x1520.jpeg" alt="Aerial view of Clos de Caille vineyards in Provence" width={1280} height={760} unoptimized priority className="h-auto max-h-[240px] w-full rounded-md object-cover sm:max-h-[360px]" />
          <Paragraph>Clos de Caille’s story begins in the 12th century, when Cistercian monks from Thoronet Abbey established vines on this land. The vineyard has been cultivated across the centuries.</Paragraph>
          <Paragraph>Since the 2021 vintage, the Mariotti family has brought new energy to the estate, working to reveal the character and abundance of its distinctive terroir.</Paragraph>
          <Paragraph>Mass selection and plot-by-plot winemaking meet in a winery designed by architect Rudy Ricciotti. Under technical director Matthieu Cosse, each vintage is crafted with precision, family heritage and the sunny finesse of Provence in mind.</Paragraph>

          <StoryImage src="https://images.vivino.com/misc/sponsorships/103023_closdecaille_header.jpg" alt="The Clos de Caille family estate and garden" />
          <SectionHeading>A Family Legacy</SectionHeading>
          <Paragraph>Jean-Pierre and Simona Mariotti acquired this special family retreat in 1992 and began a new chapter for the estate.</Paragraph>
          <Paragraph>At the time, the property covered seven hectares, with only two hectares planted to vines. The family believed in the potential of the terroir and set out to make outstanding wines.</Paragraph>
          <Paragraph>They gradually restructured and expanded the vineyard, seeing the quality of the vines as the foundation of success. They waited to make wine until Clos de Caille had its own cellar.</Paragraph>
          <Paragraph>Construction of the “Chai d’Œuvre”, designed by Rudy Ricciotti, began in 2019. It opened with the 2021 vintage, bringing together architecture and practical winemaking equipment.</Paragraph>
          <Paragraph>In 2024, the family acquired neighbouring Domaine des Bruguières. The combined estate now covers close to 160 hectares, including 40 hectares of certified organic vines.</Paragraph>

          <StoryImage src="https://images.vivino.com/misc/sponsorships/103023_closdecaille_1_2560x1520.jpg" alt="Vineyard landscape at Clos de Caille" />
          <SectionHeading>Geography</SectionHeading>
          <Paragraph>Between Entrecasteaux and Saint-Antonin-du-Var, about 35 kilometres northwest of the Gulf of Saint-Tropez, the estate sits across Provence Verte, Dracénie and the heart of the Var.</Paragraph>
          <Paragraph>Detailed soil studies mapped the estate’s varied geology and confirmed its suitability for producing distinctive wines. Mediterranean influence brings a temperate climate, while the site’s 200-metre altitude creates notable day-to-night temperature variation.</Paragraph>
          <Paragraph>Gentle, continuous slopes offer good sun exposure and drainage. The hills are formed from ancient limestone, 200 to 250 million years old, later shaped by the tectonic movements that formed the Alps. Silty limestone soils also contain silica.</Paragraph>
          <Paragraph>Hillsides, valleys, microclimates and diverse soils combine to give Clos de Caille a distinctive terroir for expressive wines.</Paragraph>

          <StoryImage src={`${storyBase}103023_ClosdeCaille_3.jpg`} alt="The modern Clos de Caille winery cellar" />
          <SectionHeading>The Vineyard</SectionHeading>
          <Paragraph>From its first vintage, the estate chose mass selection, a way of preserving genetic diversity by choosing vines suited to their terroir and changing climate.</Paragraph>
          <Paragraph>The approach builds resilient, authentic vines and supports consistent quality. Nursery grower Lilian Bérillon has praised the family’s commitment to preserving vine identity and the character of the wines.</Paragraph>
          <Paragraph>Clos de Caille is certified organic and works toward sustainable viticulture that respects the vines and soil. A skilled team tends the vineyard with careful, traditional methods, while ongoing organic practices protect the surrounding environment.</Paragraph>

          <StoryImage src={`${storyBase}103023_ClosdeCaille_9.jpg`} alt="Sunset over the Clos de Caille vineyards" />
          <SectionHeading>The harvest</SectionHeading>
          <Paragraph>Harvest generally begins at the end of August and continues for three to four weeks as each plot reaches maturity. Picking takes place late at night, when grapes are cool, helping preserve the berries and prepare them for pressing, maceration and settling.</Paragraph>
          <Paragraph>Local harvesters pick by hand. The finest bunches are chosen at phenolic maturity, carried quickly to the cellar in small crates and handled gently to avoid crushing.</Paragraph>
          <Paragraph>Mechanical harvesting is also used, with a selective sorting system following the same quality standards.</Paragraph>

          <StoryImage src="https://images.vivino.com/misc/sponsorships/103023_ClosdeCaille/103023_ClosdeCaille_8+(1).jpg" alt="A grower inspecting vines at Clos de Caille" />
          <StoryImage src="https://images.vivino.com/misc/sponsorships/103023_ClosdeCaille_10.jpg" alt="Sunlit rows and soil in the Clos de Caille vineyard" />
          <SectionHeading>Vinification</SectionHeading>
          <Paragraph>Designed by Rudy Ricciotti and built in the vineyard’s centre, the cellar combines traditional knowledge with modern equipment, keeping the time between picking and winemaking short.</Paragraph>
          <Paragraph>The team follows a “Grands Crus” approach, selecting plots carefully and harvesting each at optimal maturity. Every plot is fermented and aged separately in its own tank.</Paragraph>
          <Paragraph>Gravity helps receive the grapes gently and preserve their integrity. Avoiding unnecessary mechanical handling allows each plot to express its finesse, while separate ageing lets the winemakers understand its individual character.</Paragraph>
          <Paragraph>By tasting the aromatic and flavour differences between plots, the team can assemble balanced blends. The Mariotti family works with oenologist Matthieu Cosse and an experienced technical team to shape each vintage.</Paragraph>
          <StoryImage src="https://images.vivino.com/misc/sponsorships/103023_ClosdeCaille/103023_ClosdeCaille_7.jpg" alt="Oak barrels in the Clos de Caille wine cellar" />
        </article>
      </div>
    </div>
  );
}
