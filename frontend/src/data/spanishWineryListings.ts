import type { Winery } from './wineriesData';

type SpanishWineryListing = [
  slug: string,
  name: string,
  region: string,
  rating: number,
  ratings: number,
  wines: number,
  cover: string,
  logo: string,
  coverType?: 'background',
];

const sourceRows: SpanishWineryListing[] = [
  ['felix-solis','Félix Solís','Valdepeñas',3.7,512914,361,'y6u_wwM6R9-iGE7HvasLmw','dUmakiBIQwK48R895gC6gw'],
  ['campo-viejo','Campo Viejo','Rioja',3.7,336307,54,'uzSuqka0StGSqMEhqQUgTg','3M_aV6CvQ2-WXuTax6czXg'],
  ['bodegas-faustino','Bodegas Faustino','Rioja Alavesa',3.8,294387,73,'qg7fmxPjSpW31fSx-8Xrjg','LTPZuMF8SEa_D4uLHA5DQg'],
  ['bodegas-muga','Bodegas Muga','Rioja',4.1,270908,22,'wFUqbTNaQCKIFKx3OsCUug','ehsjllyTQJmZm4LPQXY_mg'],
  ['protos','Protos','Castilla y León',4.0,251214,35,'lX9HJtExTlC-LBCqtoKAdQ','j9jG9DAbSZylcbSYQKVsQA'],
  ['emilio-moro','Emilio Moro','Ribera del Duero',4.1,241869,17,'wg3N7-jSQtuqgEPqavcpBA','Gj_dfpP2TgKZkmgL9d-mtQ'],
  ['bodegas-marques-de-caceres','Bodegas Marqués de Cáceres','Rioja Alta',3.8,260897,48,'zwhNMdTlScau2a7fQPYGkA','_VV1BN0LQ5qWNoxa6X0Hdg'],
  ['pata-negra','Pata Negra','Catalunya',3.6,190066,43,'bl-36qgDTASLUS16FOs5Ww','esPPXKhoSvmdYuX1Bgg1uQ'],
  ['pagos-del-rey','Pagos del Rey','Castilla y León',3.6,190015,143,'xxU1rqzUQT2OM70G65RBsQ','BAO_he-zSFC37tCSTOf4Zg'],
  ['aalto','Aalto','Ribera del Duero',4.4,89085,5,'HdlM_UyNTGa4V49CNKQ3Pw','7SHRsjydTpSfhw1X61Ms0Q'],
  ['bodegas-mauro','Bodegas Mauro','Castilla y León',4.3,80903,11,'gqs5yrUtSLqpqVvLlBHtfg','cyQONVzqQPWnR-4fj-rBqw'],
  ['jaume-serra','Jaume Serra','Catalunya',3.5,90946,91,'PwNwPlsqTCicOEcZuw3YiA','dt7T_3ncSda1vLtwDuWf0g'],
  ['bodegas-piqueras','Bodegas Piqueras','Almansa',3.8,67143,99,'pkcnO3GcR4-5VN2dulnPWA','Z73KN5-uQEWFhiy6XzKODQ'],
  ['bodegas-franco-espanolas','Bodegas Franco-Españolas','Rioja',3.8,67125,55,'-7GdNNpISjeYgLnY2qURZg','Mu7jOm12T1-YgL4DVUcYiA'],
  ['bodega-numanthia','Bodega Numanthia','Toro',4.2,53505,4,'RpD4a18OTKSHI3Q5UMCDww','rPPQQXz8QkKXv4pBVX2gdw'],
  ['alto-moncayo','Alto Moncayo','Campo de Borja',4.3,42889,10,'f54ADhkQToWxhQ5Bdxt11Q','sZAwW6_nRSmaGdcWGPJ1kg'],
  ['bodegas-san-valero','Bodegas San Valero','Cariñena',3.6,39704,131,'gD1SN6LjQxOe7ksUvpUfVw','AbobLb1KS8eByQJT-Mg_Lg'],
  ['antano','Antaño','Castilla y León',3.3,42501,20,'VwZ8TLeeRyis943_QHKyNg','oooQGypySFG4TfEsLQf7HA'],
  ['bodegas-vilano','Bodegas Vilano','Castilla y León',3.9,30499,23,'S7M07FV6S9CIjlwsQn6kDQ','eQD6oAdJTymzPrvu7NVJjw'],
  ['senorio-de-los-llanos','Señorio de Los Llanos','Castilla',3.2,35454,18,'-RHy8dNhT6m0dhKiu8dt2Q','5G66-9Y_QfWGXEJmaSzJ_A'],
  ['pago-de-cirsus','Pago de Cirsus','Navarra',3.8,28639,25,'XUjy-J0FQrmV8bzIcPpA','AW9ZN0c5S7CBkO3kMZz-Dg','background'],
  ['valenciso','VALENCISO','Rioja',4.1,24765,9,'HvKSJM-sTr2P2J1w7v675w','G6AAn1adSLShTyV62qAaJA'],
  ['attis','Attis','Rías Baixas',4.0,24172,36,'c7L7gOsITO-OiCUuNThPoA','1Byj999XSNeQ0gqic_kIDA'],
  ['mayor-de-castilla','Mayor de Castilla','Castilla y León',3.3,24946,14,'H5YWY4HMRsSUL-B2B3X9ww','ZpmLRq59RleWKGtB1A44mw'],
  ['don-luciano','Don Luciano','Castilla y León',3.2,25260,31,'SAwgTuwxS_uod9xPmjb24A','1fvA6YlUTpWfq8tB5ED1RQ','background'],
  ['altavins-viticultors','Altavins Viticultors','Terra Alta',3.8,18689,32,'f7TGGI6DQB6FS8fpYGu7iA','Oyn1KVDeRpqHjF_ZN8ZTJA'],
  ['winery-on-creations','Winery On Creations','Yecla',4.0,17155,20,'ktf_WoBeTZqb-abnSeUwuQ','503kONjwSj6-RpiGTH5fIw'],
  ['castillo-san-simon','Castillo San Simon','Murcia',3.2,20717,24,'2icHjHlLTO-T-UjL930QkQ','a9pZ4DrZQzS_aRRHBCyiYQ'],
  ['murua','Murua','Rioja',4.0,15281,13,'WkUPQVOBQIS0qduZL0WAiQ','MgfzHLghRc6LL8OySI6OfQ'],
  ['pago-de-tharsys','Pago de Tharsys','Valencia',3.7,15022,68,'lKMAaZetTwaScBlIK00MFw','x1vBeXTWRVOvwSgyQkAESw'],
  ['ysios','Ysios','Rioja',4.1,12729,23,'Js696N8NTnqwLeGLiYXEkw','LiuoRvDkSUuOsmP3aN7x4w'],
  ['fillaboa','Fillaboa','Rías Baixas',4.0,11000,6,'NEHdXq02RLuGQxlAQwPOKw','-Vzj_dBPR3GlqFfNAOGBBA'],
  ['altos-de-rioja','Altos de Rioja','Rioja',3.8,10904,18,'-9fxhFzSQyC9lSk7YcXLZw','immS7NRNTta0JsYDHcCi-A','background'],
  ['familia-escudero','Familia Escudero','Rioja',3.8,10555,35,'b5l0OcPeR1C7ddYrsQ5rDw','anEH77ylSxWMZcejWBr80g'],
  ['can-axartell','Can Axartell','Mallorca',4.0,7753,35,'rZ6pVbKbSiSBtLWoSdoNVg','DI6G8wWfT_aLohrMcVE7cg'],
  ['arnaiz','Arnaiz','Castilla y León',3.6,7866,8,'aUK01BxSRZeK14G9nJfdPw','vsXRMrs_RZ6tYYjBh_qz5w','background'],
  ['zifar','Zifar','Castilla y León',3.9,6017,15,'R5w3rwkYS3K3CgnB4fdjyg','JwvXePHhQ5yMm9daTXTeBw','background'],
  ['levitation','Levitation','Jumilla',4.2,5420,16,'6i5YRdklRb-RF9K020iN2A','TLMNZbVQSeandXK-INViyA'],
  ['cornelio-dinastia','Cornelio Dinastía','Rioja',3.9,3326,31,'NzST5hi_Rbqpk4KEyz2bYg','8z2cDlf1R6iVwK5uN6k-Ww'],
  ['la-unica','La Unica','Vino de España',4.3,489,6,'BE5oMAypQ5ShRRbYYXATyg','s0LM1hCNQRKlgKhKVqlNmg'],
  ['loalto','LoAlto','Utiel-Requena',3.9,433,6,'-35WLuHfRtq77lE6_ZHZfQ','TF244xxkShWpVQA-UnABGA'],
  ['finca-valeria','Finca Valeria','Vino de España',4.1,119,2,'tEUBHZw_ToqfqupZogGT0g','CbQvctRqSE-SfU3zuVnvzw'],
  ['pago-de-marinacea','Pago de Marinacea','Toro',4.0,94,6,'07-VYwxbRB617Rh0JJ0DDg','hcDE4FZDRbi0Oktve7ApMQ'],
  ['argeles-winery','Argeles Winery','Priorat',4.1,61,10,'HXMZCfF0SSCVLD2ueECxZA','quCzAyV2RAuDoyz1DRD3hQ'],
];

const wineryIds: Record<string, number> = {
  'felix-solis':19731,'campo-viejo':2730,'bodegas-faustino':2162,'bodegas-muga':1467,'protos':4848,
  'emilio-moro':1757,'bodegas-marques-de-caceres':1777,'pata-negra':76592,'pagos-del-rey':12833,'aalto':7999,
  'bodegas-mauro':12036,'jaume-serra':13774,'bodegas-piqueras':4696,'bodegas-franco-espanolas':6716,
  'bodega-numanthia':20866,'alto-moncayo':12086,'bodegas-san-valero':14107,'antano':28564,'bodegas-vilano':16294,
  'senorio-de-los-llanos':6096,'pago-de-cirsus':139803,'valenciso':5415,'attis':16843,'mayor-de-castilla':163142,
  'don-luciano':15980,'altavins-viticultors':14198,'winery-on-creations':216203,'castillo-san-simon':116230,
  'murua':11664,'pago-de-tharsys':26132,'ysios':9094,'fillaboa':11665,'altos-de-rioja':34406,
  'familia-escudero':28079,'can-axartell':219363,'arnaiz':13863,'zifar':6135,'levitation':311078,
  'cornelio-dinastia':226418,'la-unica':285871,'loalto':15201,'finca-valeria':322432,
  'pago-de-marinacea':299589,'argeles-winery':253887,
};

const pngLogos = new Set(['don-luciano', 'la-unica', 'zifar', 'finca-valeria']);

function makeWinery(row: SpanishWineryListing, index: number): Winery {
  const [slug, name, region, rating, ratings, wines, coverId, logoId, coverType = 'sponsorship_cards'] = row;
  const coverImage = coverType === 'background'
    ? `https://thumbs.vivino.com/winery_backgrounds/${coverId}_1280x760.jpeg`
    : `https://thumbs.vivino.com/wineries/sponsorship_cards/${coverId}_600x356.jpeg`;
  return {
    id: 400000 + index,
    name,
    seo_name: slug,
    business_name: name,
    description: `${name} winery in ${region}, Spain.`,
    cover_image: coverImage,
    logo_image: `https://images.vivino.com/wineries/${wineryIds[slug]}/logos/${logoId}.${pngLogos.has(slug) ? 'png' : 'jpeg'}`,
    ratings_average: rating,
    ratings_count: ratings,
    wines_count: wines,
    labels_count: ratings * 10,
    region_id: index,
    region_name: region,
    country_code: 'es',
    country_name: 'Spain',
    website: `https://www.vivino.com/en/wineries/${slug}`,
    winemaker: '',
    phone: '',
    email: '',
    facebook: '',
    instagram: '',
    is_claimed: false,
    address: { city: region, state: region, country: 'Spain' },
    wines: [],
  };
}

export const SPANISH_WINERY_LISTINGS = sourceRows.map(makeWinery);
