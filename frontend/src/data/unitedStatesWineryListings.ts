import type { Winery } from './wineriesData';

type WineryRow = [slug: string, name: string, region: string, rating: number, ratings: number, wines: number, cover: string, logo: string, coverType?: 'vivino' | 'sponsorship'];

const rows: WineryRow[] = [
  ['francis-ford-coppola-winery','Francis Ford Coppola Winery','Sonoma County',3.9,341417,177,'MksYqncySRKTitDky6EpSg','1500/logos/eSfKi57iSvSOAWDystqCJQ.jpeg'],
  ['beringer','Beringer','St. Helena',3.9,277051,157,'mqOsY64DTfiqrJVfz5StBA','1306/logos/rpHcAG3uRYON2T8a7pSNmQ.jpeg'],
  ['stag-s-leap-wine-cellars',"Stag's Leap Wine Cellars",'Napa Valley',4.3,195836,75,'scIVWH0GQeWe6FNIVJHFYw','3310/logos/nP5IceeJTfSNkLGClmNKtQ.jpeg'],
  ['j-lohr-vineyards-wines','J. Lohr Vineyards & Wines','Central Coast',4.0,196571,55,'4NxEc8xESVSzTG6NlQHidg','1626/logos/CnywfPSlR1aftKsjusjmBg.jpeg'],
  ['daou','DAOU','Paso Robles',4.1,183248,85,'HeOPdF0xRnSpoeXrIx5B2A','18673/logos/YsRc6m_3RbKqhzSSwC3lAw.jpeg'],
  ['stags-leap',"Stags' Leap",'Napa Valley',4.2,155466,40,'Bo01eGhtQZmIJ5vgzpPa3Q','11184/logos/IcrWWrCMT5GF-381Z_9buw.jpeg'],
  ['wente-family-vineyards','Wente Family Vineyards','Livermore Valley',3.9,134407,150,'cKH-7THZRge7jeK2yrDnmw','2045/logos/OErLRuDVRfuN3Gh3XwNXCQ.png'],
  ['joseph-phelps-vineyards','Joseph Phelps Vineyards','Napa Valley',4.4,109697,62,'3K4d703hR9GxKCE7vCxKYA','1296/logos/GKDTQ0a5SLuYTUGPaHxrfQ.jpeg'],
  ['cakebread','Cakebread','Rutherford',4.3,94379,46,'NZjPXmPoT7qyq8qbc3ivpA','193/logos/ILKSKundTieGBgavTdB73Q.jpeg'],
  ['frank-family','Frank Family','Calistoga',4.3,76080,46,'YMfjT059SHCjrjeSQckyDw','1482/logos/3tAYOtbBTtC2LzSOkGjZNQ.jpeg'],
  ['beaulieu-vineyard-bv','Beaulieu Vineyard (BV)','Rutherford',4.1,79111,115,'W6GoGiLHTKyy6dX3lO9wdA','1334/logos/Arv-tt_STS2zKaRkEJNddg.jpeg'],
  ['shafer','Shafer','Napa Valley',4.4,63430,16,'-SjEu7YYTMmmv2frmtzIVA','1320/logos/Xm146wWUSGyToxFbpFv8Mw.jpeg'],
  ['chappellet','Chappellet','St. Helena',4.3,56060,48,'4nJoKQ6ZSdamK0AVsPxh9w','1453/logos/cHZK1jmjQZO6yrsnAfkAsg.jpeg'],
  ['chandon-california','CHANDON California','Napa Valley',3.8,35512,100,'8P9bBgn-TxSre1IEyOrUmw','1780/logos/2F4IgfiYRu-4CiZlKtr9eg.jpeg'],
  ['round-pond-estate','Round Pond Estate','Rutherford',4.2,30881,33,'44ii30BsQL2VJxJkUGTfdg','2854/logos/i5FuqNZ0R0CLl6dQh5eVGA.jpeg'],
  ['del-dotto','Del Dotto','St. Helena',4.5,28171,132,'JYcPyqotRhOJVp9kCfQNtw','1193/logos/RFVbD9VgTAOx6S6CYLysSQ.jpeg'],
  ['bernardus','Bernardus','Central Coast',4.2,30105,26,'XL3kP39IRHycEbrRt0XzhA','163/logos/z-ABIn87R--86CoMdCkQ7g.jpeg'],
  ['alpha-omega','Alpha Omega','St. Helena',4.4,27984,93,'g4UT1B7BQKmIdUP5gZXwEg','2375/logos/X9BdCJQqQEmd7Xw1mL1_jQ.jpeg'],
  ['biltmore-winery','Biltmore Winery','North Carolina',3.9,29880,148,'kVivjWb_QAWyeb5SmmwDrw','808/logos/tlT9TDDpSASomcLmnDpgnw.jpeg'],
  ['delille-cellars','DeLille Cellars','Washington',4.2,25561,63,'fT9NL5UHS9qYiEoD0veb0A','1424/logos/7jUHCSmaSF-NVervImmxSg.jpeg'],
  ['ozv','OZV','California',3.9,26549,5,'1SJWYmanS0qsNfYATO4pOg','247404/logos/r8aaTS3fQKmbyJmpt0tAjQ.jpeg'],
  ['long-shadows','Long Shadows','Columbia Valley',4.2,21433,17,'bCRNJ_yhSsmo9nh8il5lYg','1498/logos/1AIEg747TbWiSKjyZE9o9w.jpeg'],
  ['newton','Newton','St. Helena',4.2,17489,30,'R2R76UMET5yYldKpxygK9A','1445/logos/nnRmT8Q5SqCRDLhChprfBA.jpeg'],
  ['old-soul','Old Soul','Lodi',3.9,17334,8,'Ebv0FCU_QAuBbpqnWvzhiw','42791/logos/OWJciS3bS5Of5ADyiDteew.jpeg'],
  ['brown-estate','Brown Estate','St. Helena',4.3,12748,48,'HYH8btVnRPqaJqgtTuFuTA','11306/logos/HdDYM5J7SimDv3fDWZwhow.png'],

  ['muirwood','Muirwood','Arroyo Seco',3.7,13980,12,'k4t-6RBMT7mV0xQFnh4JeA','13474/logos/4FUkGkOVT9qzIhnyxqIL4A.jpeg'],
  ['san-simeon-wines','San Simeon Wines','California',4.0,12264,15,'ZgsOC_CARXu2xP7CXZ5U8Q','5854/logos/-p_FCSxBSQ6GnDykVZwFbQ.png'],
  ['jarvis-napa-valley','Jarvis','Napa Valley',4.5,10130,21,'njf2WfpBRWibQu2aqCuFoA','1699/logos/x-FavvZ6SPq1hAibskVl9A.jpeg'],
  ['pike-road','Pike Road','Willamette Valley',3.8,8815,32,'QMlOISuvRtem_3mtbwFLWA','45969/logos/gF8CYs8GQRWWXUpgTPV9dw.png'],
  ['priest-ranch','Priest Ranch','Yountville',4.1,7417,26,'815A7GldQ6Krnxc_51zuUA','34156/logos/U2eLbOXwQpC9-UYCVW506A.jpeg'],
  ['meadowcroft-wines','Meadowcroft Wines','Sonoma County',4.1,5967,59,'96NNbqEmQDqNdCzHesUoOg','26051/logos/I4MQM0YoQ_-AR0WGjhZ2OA.jpeg'],
  ['gamble-estates','Gamble Estates','Napa Valley',4.2,5772,22,'y-66fLUYSs21aaGQYbvvzA','27436/logos/BMFaIhz2SbuOpePtOa5tKw.jpeg'],
  ['lloyd-cellars','Lloyd Cellars','Napa Valley',4.2,5700,9,'sCJUDdzpTAicB5bXreVnGg','36013/logos/QzQxsBqFR52y3k79npGz7w.jpeg'],
  ['maddalena-wines','Maddalena Wines','Central Coast',3.8,6073,12,'g8xHeSuoT6eM1o4UL6odMA','4823/logos/wJIKIxG8S6uWlPf3tLB_Fw.png'],
  ['massican','Massican','Napa Valley',4.1,4768,19,'WhNu-yboRdGMkxByfxr4BQ','57053/logos/Qbzkk_p5R4eIcx66bkNTSQ.jpeg'],
  ['saddleback','Saddleback','Napa Valley',4.2,4618,61,'kBPreUcoRxiF0aYt7Yb16A','1861/logos/onxS5N3dTeiy-OgoCLVX2w.jpeg'],
  ['highlands-41','Highlands 41','Paso Robles',3.9,4850,4,'dlyMOus2QQ-r_htBXKXcQA','259661/logos/1gl8Pg9CTx6akibskzyzMQ.png'],
  ['opaque','Opaque','Paso Robles',4.1,3110,13,'JQH0mlEdT-KfLMSxgSxgVg','166561/logos/_8WY0DshShapMSaO0d4Dag.png'],
  ['jada-vineyard-winery','Jada Vineyard & Winery','Central Coast',4.2,2962,21,'kYfGB6CYQcq-H40hErpSMA','11974/logos/yk3xhJUjQ-yyAY_9qls3pw.png'],
  ['kukeri','Kukeri','North Coast',4.3,2551,22,'yqgm-4kHSY68Ss1lF8_9Eg','138644/logos/JOayMElcTT6cfIJKLS7RYA.jpeg'],
  ['knights-bridge','Knights Bridge','Calistoga',4.3,2096,25,'EpxOzWBWTkK2KTecmWiKHg','39365/logos/005QyyZXT2CencgAQqWNOg.jpeg'],
  ['byington-vineyard-and-winery','Byington Vineyard and Winery','Central Coast',4.1,1962,61,'St0mgWkYSBKgHxYozOvi0Q','190/logos/5CB4TeuQRweJM7FdSj_cMw.jpeg'],
  ['domaine-helena','Domaine Helena','Lake County',4.1,459,9,'2Cuoc294SJSDOxrgkrXK3Q','316555/logos/pLKUUxiIRfGi36-MBidfPg.jpeg'],
  ['tirriddis','Tirriddis','Washington',4.1,335,18,'21G00anLRV-vvxnVwYdc-Q','299986/logos/RnM4a7gnSOqb4bOxq1M0KQ.jpeg'],
  ['pius-estates','Pius Estates','Paso Robles',4.5,305,11,'2ALK3NOcRk6M9Ls5E2lSgQ','317893/logos/2Y45WHjdQfGrioYe_MzTOA.png'],
  ['bayernmoor-cellars','Bayernmoor Cellars','Puget Sound',4.2,288,19,'wineglasses.webp','262202/logos/PUwnddyuTSujzXErUgY-Eg.png','vivino'],
  ['gratsi','Gratsi','Texas',3.9,265,3,'oaLLErdTTH6r6UOxVN6LPw','278760/logos/xbSopk_ASMeEBMb9eM2vPQ.png'],
  ['capital-call-vintners','Capital Call Vintners','Washington',4.4,165,32,'3j7IJvTbSc6Fyw1uUaf-Hg','301071/logos/ShSJkLmGSE27gpjNmh77zA.jpeg'],
  ['dynamis-estate-wines','Dynamis Estate Wines','Swan Creek',4.1,167,12,'hTWYUdAmRa6kpxxATOIGbQ','310040/logos/8SOqQsUyR9ihSfDGai7jLQ.jpeg'],
  ['dancing','Dancing','Sonoma County',4.3,16,5,'gRMlkfImTNefCqJcisc9Dw','322135/logos/_tpbEqUWREOyX9MSzrr8SQ.jpeg'],

  ['vina-loriente','Viña Loriente','California',4.6,12,2,'lf8Y7seVTjqVKXVoDF3FRg','322849/logos/xC_clfeKTqCxqiT7u9qF-w.jpeg'],
];

function makeWinery([slug, name, region, rating, ratings, wines, coverId, logoPath, coverType = 'sponsorship']: WineryRow, index: number): Winery {
  const coverImage = coverType === 'vivino'
    ? `https://www.vivino.com/images/wineries/${coverId}`
    : `https://thumbs.vivino.com/wineries/sponsorship_cards/${coverId}_600x356.jpeg`;
  return {
    id: 500000 + index,
    name,
    seo_name: slug,
    business_name: name,
    description: `${name} winery in ${region}, United States.`,
    cover_image: coverImage,
    logo_image: `https://images.vivino.com/wineries/${logoPath}`,
    ratings_average: rating,
    ratings_count: ratings,
    wines_count: wines,
    labels_count: ratings * 10,
    region_id: index,
    region_name: region,
    country_code: 'us',
    country_name: 'United States',
    website: `https://www.vivino.com/en/wineries/${slug}`,
    winemaker: '',
    phone: '',
    email: '',
    facebook: '',
    instagram: '',
    is_claimed: false,
    address: { city: region, state: region, country: 'United States' },
    wines: [],
  };
}

export const UNITED_STATES_WINERY_LISTINGS = rows.map(makeWinery);
