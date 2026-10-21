import { WINERIES_DATA, type Winery } from '@/data/wineriesData';

export interface CountryInfo {
  nameEn: string;
  nameTh: string;
  flag: string;
  count: number;
  keyRegions: string[];
  keyCities: string[];
  signatureGrapes: string[];
  topWineries: string[];
  descriptionTh: string;
  descriptionEn: string;
}

export const WINE_COUNTRIES: Record<string, CountryInfo> = {
  italy: {
    nameEn: 'Italy',
    nameTh: 'อิตาลี',
    flag: '🇮🇹',
    count: 100,
    keyRegions: ['Toscana (Tuscany)', 'Puglia', 'Veneto', 'Piemonte (Piedmont)', 'Chianti', 'Sicilia'],
    keyCities: ['Firenze (Florence)', 'Montalcino', 'San Marzano di San Giuseppe', 'Alba', 'Verona', 'Barolo'],
    signatureGrapes: ['Sangiovese', 'Primitivo', 'Nebbiolo', 'Negroamaro', 'Glera (Prosecco)', 'Corvina'],
    topWineries: ['San Marzano', 'Tenuta Luce', 'Frescobaldi', 'Ornellaia', 'Castello di Albola', 'Belposto', 'Buglioni', 'Coppi'],
    descriptionTh: 'อิตาลีเป็นหนึ่งในประเทศผู้ผลิตไวน์ที่เก่าแก่และยิ่งใหญ่ที่สุดในโลก โดดเด่นด้วยไวน์ท้องถิ่น (Indigenous Grapes) นับร้อยสายพันธุ์ ตั้งแต่ Chianti และ Brunello di Montalcino ในแคว้นทัสคานี, Primitivo อันเข้มข้นในปูลเยีย ไปจนถึง Barolo ราชาแห่งไวน์แดงในปิเอมอนเต',
    descriptionEn: 'Italy is one of the world\'s oldest and most renowned wine producers, boasting iconic regions like Tuscany, Piedmont, Puglia, and Veneto with beloved wines like Chianti, Brunello, Primitivo, and Barolo.',
  },
  france: {
    nameEn: 'France',
    nameTh: 'ฝรั่งเศส',
    flag: '🇫🇷',
    count: 67,
    keyRegions: ['Bordeaux', 'Champagne', 'Bourgogne (Burgundy)', 'Côtes de Provence', 'Loire Valley', 'Rhône Valley', 'Languedoc'],
    keyCities: ['Reims', 'Épernay', 'Bordeaux', 'Saint-Émilion', 'Chablis', 'Beaune', 'Gassin', 'Sancerre'],
    signatureGrapes: ['Cabernet Sauvignon', 'Merlot', 'Pinot Noir', 'Chardonnay', 'Syrah', 'Sauvignon Blanc'],
    topWineries: ['Moët & Chandon', 'Dom Pérignon', 'Veuve Clicquot', 'Krug', 'Château Cheval Blanc', 'M. Chapoutier', 'Laroche', 'Minuty', 'Château d\'Esclans'],
    descriptionTh: 'ฝรั่งเศสคือศูนย์กลางแห่งมาตรฐานไวน์ระดับโลก มีแหล่งผลิตไวน์ระดับตำนานอย่าง Bordeaux (ไวน์แดงคลาสสิก), Champagne (แชมเปญแท้ระดับโลก), Bourgogne (Pinot Noir & Chardonnay อันประณีต) และ Provence (สุดยอดไวน์โรเซ่)',
    descriptionEn: 'France is the historic benchmark for fine winemaking, featuring celebrated regions such as Bordeaux, Champagne, Burgundy, the Loire Valley, and Provence.',
  },
  us: {
    nameEn: 'United States',
    nameTh: 'สหรัฐอเมริกา',
    flag: '🇺🇸',
    count: 51,
    keyRegions: ['California (Napa Valley, Sonoma County, Paso Robles, Central Coast)', 'Washington (Walla Walla Valley, Columbia Gorge)', 'Oregon (Willamette Valley)'],
    keyCities: ['Napa', 'St. Helena', 'Rutherford', 'Sonoma', 'Paso Robles', 'Walla Walla', 'Healdsburg'],
    signatureGrapes: ['Cabernet Sauvignon', 'Chardonnay', 'Pinot Noir', 'Zinfandel', 'Syrah', 'Merlot'],
    topWineries: ['Cakebread Cellars', 'Francis Ford Coppola', 'Beringer', 'Stag\'s Leap Wine Cellars', 'Viña Loriente', 'Capital Call Vintners', 'Dynamis Estate Wines', 'Dancing'],
    descriptionTh: 'สหรัฐอเมริกาคือผู้นำไวน์โลกใหม่ (New World) อันดับหนึ่ง โด่งดังด้วย Napa Valley และ Sonoma ในแคลิฟอร์เนีย ที่ผลิต Cabernet Sauvignon และ Chardonnay ทรงพลัง หรูหรา พร้อมด้วยแคว้น Washington และ Oregon ที่มีสภาพอากาศและดินชั้นยอด',
    descriptionEn: 'The United States is the premier New World wine nation, led by California\'s Napa Valley, Sonoma, and Paso Robles, alongside Washington and Oregon for world-class Cabernet, Pinot Noir, and Chardonnay.',
  },
  spain: {
    nameEn: 'Spain',
    nameTh: 'สเปน',
    flag: '🇪🇸',
    count: 41,
    keyRegions: ['Rioja', 'Castilla y León', 'Ribera del Duero', 'Catalonia (Penedès)', 'Navarra', 'Campo de Borja'],
    keyCities: ['Haro', 'Logroño', 'Valladolid', 'Peñafiel', 'Oyón', 'Sant Sadurní d\'Anoia'],
    signatureGrapes: ['Tempranillo', 'Garnacha (Grenache)', 'Albariño', 'Verdejo', 'Macabeo (Viura)'],
    topWineries: ['Bodegas Muga', 'Bodegas Faustino', 'Protos', 'Emilio Moro', 'Altos de Rioja', 'Jaume Serra', 'Bodegas San Valero'],
    descriptionTh: 'สเปนเป็นประเทศที่มีพื้นที่ปลูกองุ่นมากที่สุดในโลก โดดเด่นด้วยกรรมวิธีการบ่มไวน์ในถังโอ๊ก (Crianza, Reserva, Gran Reserva) ในแคว้น Rioja และ Ribera del Duero โดยใช้องุ่น Tempranillo เป็นเอกลักษณ์ พร้อมด้วย Cava สปาร์กลิงไวน์สเปน',
    descriptionEn: 'Spain holds the largest vineyard surface in the world, renowned for richly aged Tempranillo in Rioja and Ribera del Duero, vibrant Garnacha, and sparkling Cava.',
  },
  germany: {
    nameEn: 'Germany',
    nameTh: 'เยอรมนี',
    flag: '🇩🇪',
    count: 3,
    keyRegions: ['Nahe', 'Rheinhessen', 'Pfalz'],
    keyCities: ['Niederhausen', 'Westhofen', 'Deidesheim', 'Bechtheim'],
    signatureGrapes: ['Riesling', 'Spätburgunder (Pinot Noir)', 'Grauburgunder (Pinot Gris)'],
    topWineries: ['Gut Hermannsberg', 'Dreissigacker', 'Von Winning'],
    descriptionTh: 'เยอรมนีมีชื่อเสียงระดับโลกในฐานะแหล่งกำเนิดสุดยอดไวน์ขาว Riesling ริมแม่น้ำและหน้าผาหินแร่ธรรมชาติ โดดเด่นด้วยความสดชื่น กรดผลไม้ที่สมดุล และกลิ่นแร่ธาตุ (Minerality) ซับซ้อน มีทั้งแบบ Dry (Trocken) และแบบหวานสดชื่น',
    descriptionEn: 'Germany is internationally celebrated for producing the world\'s finest Riesling, celebrated for its electrifying acidity, mineral complexity, and balance from steep river valley slopes.',
  },
  australia: {
    nameEn: 'Australia',
    nameTh: 'ออสเตรเลีย',
    flag: '🇦🇺',
    count: 1,
    keyRegions: ['South Australia (Barossa Valley, Eden Valley, McLaren Vale)'],
    keyCities: ['Tanunda', 'Adelaide', 'Nuriootpa'],
    signatureGrapes: ['Shiraz (Syrah)', 'Cabernet Sauvignon', 'Chardonnay'],
    topWineries: ['St Hallett', 'Penfolds', 'Grant Burge'],
    descriptionTh: 'ออสเตรเลียขึ้นชื่อเรื่องไวน์ Shiraz และ Cabernet Sauvignon รสชาติเข้มข้น จัดจ้าน หอมกลิ่นเบอร์รีสุกเข้ม เครื่องเทศ และสัมผัสโอ๊กอันอบอุ่นจากไร่องุ่นเก่าแก่ใน Barossa Valley',
    descriptionEn: 'Australia is famous for full-bodied, fruit-forward Shiraz and Cabernet Sauvignon from historic old vines in regions like the Barossa Valley in South Australia.',
  },
};

/**
 * Searches the 970+ wineries dataset for matches on query
 */
export function searchWineryByName(query: string): Winery | null {
  const cleanQ = query.trim().toLowerCase();
  if (cleanQ.length < 3) return null;

  // Exact seo_name match
  const exactSeo = WINERIES_DATA.find((w) => w.seo_name.toLowerCase() === cleanQ);
  if (exactSeo) return exactSeo;

  // Exact name match
  const exactName = WINERIES_DATA.find((w) => w.name.toLowerCase() === cleanQ);
  if (exactName) return exactName;

  // Name inclusion
  const partial = WINERIES_DATA.find((w) => {
    const wName = w.name.toLowerCase();
    return cleanQ.includes(wName) || (wName.length >= 4 && cleanQ.includes(wName));
  });
  if (partial) return partial;

  // Check if query contains major winery keywords
  const specialMap: Record<string, string> = {
    'vina loriente': 'vina-loriente',
    'loriente': 'vina-loriente',
    'san marzano': 'san-marzano',
    'marzano': 'san-marzano',
    'dom perignon': 'dom-perignon',
    'moet': 'moet-chandon',
    'chandon': 'moet-chandon',
    'veuve': 'veuve-clicquot',
    'cheval blanc': 'chateau-cheval-blanc',
    'krug': 'krug',
    'cakebread': 'cakebread',
    'coppola': 'francis-ford-coppola-winery',
    'beringer': 'beringer',
    'dancing': 'dancing',
    'dynamis': 'dynamis-estate-wines',
    'capital call': 'capital-call-vintners',
    'fontezoppa': 'fontezoppa',
    'argeles': 'argeles-winery',
    'hermannsberg': 'gut-hermannsberg',
    'st hallett': 'st-hallett',
    'muga': 'bodegas-muga',
    'faustino': 'bodegas-faustino',
    'frescobaldi': 'frescobaldi',
    'tenuta luce': 'tenuta-luce',
    'ornellaia': 'ornellaia',
  };

  for (const [key, seo] of Object.entries(specialMap)) {
    if (cleanQ.includes(key)) {
      const match = WINERIES_DATA.find((w) => w.seo_name === seo);
      if (match) return match;
    }
  }

  return null;
}

/**
 * Handles city/region inquiries
 */
export function searchWineryByCityOrRegion(query: string): {
  type: 'city' | 'region';
  name: string;
  country: CountryInfo;
  wineries: Winery[];
} | null {
  const cleanQ = query.trim().toLowerCase();

  const regionsMap: Record<string, { name: string; countryKey: string }> = {
    bordeaux: { name: 'Bordeaux (บอร์โด)', countryKey: 'france' },
    บอร์โด: { name: 'Bordeaux (บอร์โด)', countryKey: 'france' },
    champagne: { name: 'Champagne (ชองปาญ)', countryKey: 'france' },
    ชองปาญ: { name: 'Champagne (ชองปาญ)', countryKey: 'france' },
    reims: { name: 'Reims (แร็งส์)', countryKey: 'france' },
    แร็งส์: { name: 'Reims (แร็งส์)', countryKey: 'france' },
    burgundy: { name: 'Burgundy / Bourgogne (เบอร์กันดี)', countryKey: 'france' },
    bourgogne: { name: 'Burgundy / Bourgogne (เบอร์กันดี)', countryKey: 'france' },
    เบอร์กันดี: { name: 'Burgundy / Bourgogne (เบอร์กันดี)', countryKey: 'france' },
    chablis: { name: 'Chablis (ชาบลีส์)', countryKey: 'france' },
    ชาบลีส์: { name: 'Chablis (ชาบลีส์)', countryKey: 'france' },
    provence: { name: 'Provence (โพรวองซ์)', countryKey: 'france' },
    โพรวองซ์: { name: 'Provence (โพรวองซ์)', countryKey: 'france' },
    loire: { name: 'Loire Valley (ลุ่มแม่น้ำลัวร์)', countryKey: 'france' },
    ลัวร์: { name: 'Loire Valley (ลุ่มแม่น้ำลัวร์)', countryKey: 'france' },
    sancerre: { name: 'Sancerre (ซ็องแซร์)', countryKey: 'france' },

    tuscany: { name: 'Toscana (ทัสคานี)', countryKey: 'italy' },
    toscana: { name: 'Toscana (ทัสคานี)', countryKey: 'italy' },
    ทัสคานี: { name: 'Toscana (ทัสคานี)', countryKey: 'italy' },
    chianti: { name: 'Chianti (เคียนติ)', countryKey: 'italy' },
    เคียนติ: { name: 'Chianti (เคียนติ)', countryKey: 'italy' },
    firenze: { name: 'Firenze (ฟลอเรนซ์)', countryKey: 'italy' },
    ฟลอเรนซ์: { name: 'Firenze (ฟลอเรนซ์)', countryKey: 'italy' },
    florence: { name: 'Firenze (ฟลอเรนซ์)', countryKey: 'italy' },
    montalcino: { name: 'Montalcino (มอนตัลชีโน)', countryKey: 'italy' },
    puglia: { name: 'Puglia (ปูลเยีย)', countryKey: 'italy' },
    ปูลเยีย: { name: 'Puglia (ปูลเยีย)', countryKey: 'italy' },
    veneto: { name: 'Veneto (เวเนโต)', countryKey: 'italy' },
    เวเนโต: { name: 'Veneto (เวเนโต)', countryKey: 'italy' },
    verona: { name: 'Verona (เวโรนา)', countryKey: 'italy' },
    piemonte: { name: 'Piemonte (ปิเอมอนเต)', countryKey: 'italy' },
    piedmont: { name: 'Piemonte (ปิเอมอนเต)', countryKey: 'italy' },
    ปิเอมอนเต: { name: 'Piemonte (ปิเอมอนเต)', countryKey: 'italy' },
    barolo: { name: 'Barolo (บาโรโล)', countryKey: 'italy' },
    alba: { name: 'Alba (อัลบา)', countryKey: 'italy' },

    napa: { name: 'Napa Valley (นาปา แวลลีย์)', countryKey: 'us' },
    นาปา: { name: 'Napa Valley (นาปา แวลลีย์)', countryKey: 'us' },
    sonoma: { name: 'Sonoma County (โซโนมา)', countryKey: 'us' },
    โซโนมา: { name: 'Sonoma County (โซโนมา)', countryKey: 'us' },
    'paso robles': { name: 'Paso Robles (ปาโซ โรเบิลส์)', countryKey: 'us' },
    'st. helena': { name: 'St. Helena (เซนต์เฮเลนา)', countryKey: 'us' },
    'st helena': { name: 'St. Helena (เซนต์เฮเลนา)', countryKey: 'us' },
    rutherford: { name: 'Rutherford (รัทเทอร์ฟอร์ด)', countryKey: 'us' },
    california: { name: 'California (แคลิฟอร์เนีย)', countryKey: 'us' },
    แคลิฟอร์เนีย: { name: 'California (แคลิฟอร์เนีย)', countryKey: 'us' },
    washington: { name: 'Washington State (วอชิงตัน)', countryKey: 'us' },
    วอชิงตัน: { name: 'Washington State (วอชิงตัน)', countryKey: 'us' },
    oregon: { name: 'Oregon (โอเรกอน)', countryKey: 'us' },
    โอเรกอน: { name: 'Oregon (โอเรกอน)', countryKey: 'us' },
    'walla walla': { name: 'Walla Walla (วัลลา วัลลา)', countryKey: 'us' },

    rioja: { name: 'Rioja (ริโอฮา)', countryKey: 'spain' },
    ริโอฮา: { name: 'Rioja (ริโอฮา)', countryKey: 'spain' },
    'ribera del duero': { name: 'Ribera del Duero (ริเบรา เดล ดูเอโร)', countryKey: 'spain' },
    catalonia: { name: 'Catalonia / Penedès (คาตาโลเนีย)', countryKey: 'spain' },
    cava: { name: 'Cava / Penedès (คาว่า)', countryKey: 'spain' },

    nahe: { name: 'Nahe (นาเฮอ)', countryKey: 'germany' },
    rheinhessen: { name: 'Rheinhessen (ไรน์เฮสเซน)', countryKey: 'germany' },
    pfalz: { name: 'Pfalz (พฟัลซ์)', countryKey: 'germany' },
    mosel: { name: 'Mosel (โมเซล)', countryKey: 'germany' },

    barossa: { name: 'Barossa Valley (บารอสซา แวลลีย์)', countryKey: 'australia' },
    บารอสซา: { name: 'Barossa Valley (บารอสซา แวลลีย์)', countryKey: 'australia' },
  };

  for (const [key, info] of Object.entries(regionsMap)) {
    if (cleanQ.includes(key)) {
      const country = WINE_COUNTRIES[info.countryKey];
      // Filter wineries in this region or city
      const matchedWineries = WINERIES_DATA.filter((w) => {
        const rName = (w.region_name || '').toLowerCase();
        const cName = (w.address?.city || '').toLowerCase();
        return rName.includes(key) || cName.includes(key);
      }).slice(0, 6);

      return {
        type: 'region',
        name: info.name,
        country,
        wineries: matchedWineries,
      };
    }
  }

  return null;
}

/**
 * Main AI handler for Winery and Country/City questions
 */
export function matchWineryAIResponse(query: string, language: string): string | null {
  const q = query.trim().toLowerCase();
  const isTh = language === 'th';

  // 1. General Country & Winery overview check
  const isGeneralCountryQuery =
    q.includes('ประเทศผลิต') ||
    q.includes('ประเทศที่ผลิต') ||
    q.includes('ผลิตจากประเทศ') ||
    q.includes('จากประเทศ') ||
    q.includes('ประเทศอะไร') ||
    q.includes('ประเทศไหน') ||
    q.includes('มีประเทศ') ||
    q.includes('กี่ประเทศ') ||
    q.includes('ไวน์มาจากไหน') ||
    q.includes('ไวน์ประเทศไหน') ||
    q.includes('ไวน์ประเทศอะไร') ||
    (q.includes('ประเทศ') && (q.includes('ไวน์') || q.includes('มี') || q.includes('อะไร') || q.includes('ไหน') || q.includes('บ้าง'))) ||
    q.includes('wine country') ||
    q.includes('wine countries') ||
    q.includes('what countries') ||
    q.includes('countries produce');

  const isGeneralWineryQuery =
    q.includes('โรงผลิต') ||
    q.includes('โรงไวน์') ||
    q.includes('โรงงานไวน์') ||
    q.includes('winery') ||
    q.includes('wineries') ||
    q.includes('รายชื่อโรงไวน์') ||
    q.includes('มีโรงไวน์กี่ที่') ||
    q.includes('มีโรงไวน์อะไร') ||
    q.includes('wine estates');

  const isGeneralCityQuery =
    q.includes('เมืองผลิต') ||
    q.includes('เมืองที่ผลิต') ||
    q.includes('แคว้นผลิต') ||
    q.includes('มีเมืองอะไร') ||
    q.includes('เมืองไหน') ||
    q.includes('แคว้นไหน') ||
    q.includes('แคว้นอะไร') ||
    (q.includes('เมือง') && (q.includes('ไวน์') || q.includes('ผลิต') || q.includes('มี') || q.includes('อะไร') || q.includes('บ้าง'))) ||
    q.includes('wine regions') ||
    q.includes('wine cities');

  // Check specific winery by name first
  const specificWinery = searchWineryByName(q);
  if (specificWinery) {
    if (isTh) {
      return (
        `🏰 **ข้อมูลโรงผลิตไวน์: ${specificWinery.name}**\n\n` +
        `🌍 **ประเทศ:** ${specificWinery.country_name}\n` +
        `📍 **เมือง / แคว้น:** ${specificWinery.address?.city || specificWinery.region_name}, ${specificWinery.region_name}\n` +
        `⭐ **คะแนนเรตติ้ง:** ${specificWinery.ratings_average.toFixed(1)} / 5.0 (${specificWinery.ratings_count.toLocaleString()} รีวิว)\n\n` +
        `📖 **เรื่องราวโรงบ่ม:**\n${specificWinery.description || 'หนึ่งในโรงไวน์พันธมิตรคุณภาพที่ได้รับการรับรองจาก The Bottle Club'}\n\n` +
        `👉 ดูเรื่องราวและภาพถ่ายโรงไวน์ได้ที่: [${specificWinery.name}](http://localhost:3000/wineries/${specificWinery.seo_name})\n` +
        `🍷 ต้องการดูไวน์ของโรงนี้ สามารถกดได้ที่ปุ่ม **"View wines"** ในหน้าโรงผลิต หรือค้นหาได้ที่ [/search?q=${encodeURIComponent(specificWinery.name)}](http://localhost:3000/search?q=${encodeURIComponent(specificWinery.name)}) ค่ะ`
      );
    } else {
      return (
        `🏰 **Winery Profile: ${specificWinery.name}**\n\n` +
        `🌍 **Country:** ${specificWinery.country_name}\n` +
        `📍 **City / Region:** ${specificWinery.address?.city || specificWinery.region_name}, ${specificWinery.region_name}\n` +
        `⭐ **Rating:** ${specificWinery.ratings_average.toFixed(1)} / 5.0 (${specificWinery.ratings_count.toLocaleString()} ratings)\n\n` +
        `📖 **About the Estate:**\n${specificWinery.description || 'Verified partner winery at The Bottle Club.'}\n\n` +
        `👉 Discover the estate story: [${specificWinery.name}](http://localhost:3000/wineries/${specificWinery.seo_name})\n` +
        `🍷 To browse bottles from this winery, click **"View wines"** on the estate page or visit [/search?q=${encodeURIComponent(specificWinery.name)}](http://localhost:3000/search?q=${encodeURIComponent(specificWinery.name)})`
      );
    }
  }

  // Check specific city / region query
  const cityRegionMatch = searchWineryByCityOrRegion(q);
  if (cityRegionMatch) {
    const { name, country, wineries } = cityRegionMatch;
    const wineryListStr =
      wineries.length > 0
        ? wineries.map((w) => `• [${w.name}](http://localhost:3000/wineries/${w.seo_name}) (${w.address?.city || w.region_name})`).join('\n')
        : country.topWineries.slice(0, 5).map((w) => `• ${w}`).join('\n');

    if (isTh) {
      return (
        `📍 **แคว้นและเมืองผลิตไวน์: ${name}**\n\n` +
        `🌍 **ประเทศ:** ${country.flag} ${country.nameTh} (${country.nameEn})\n` +
        `🍇 **สายพันธุ์องุ่นเด่น:** ${country.signatureGrapes.join(', ')}\n\n` +
        `🏰 **โรงผลิตไวน์ชื่อดังในพื้นที่นี้:**\n${wineryListStr}\n\n` +
        `คุณสามารถเข้าชมรายชื่อโรงไวน์และภาพถ่ายไร่องุ่นทั้งหมดได้ที่หน้า [Wineries | The Bottle Club](http://localhost:3000/wineries) หรือกดปุ่ม "View wines" ในแต่ละโรงเพื่อดูรายการไวน์ค่ะ`
      );
    } else {
      return (
        `📍 **Wine Region & City: ${name}**\n\n` +
        `🌍 **Country:** ${country.flag} ${country.nameEn}\n` +
        `🍇 **Key Grape Varieties:** ${country.signatureGrapes.join(', ')}\n\n` +
        `🏰 **Top Wineries in this Area:**\n${wineryListStr}\n\n` +
        `Explore full estate profiles and vineyard photography at [Wineries | The Bottle Club](http://localhost:3000/wineries), and click "View wines" on any winery card to explore their bottles.`
      );
    }
  }

  // Check country specific query
  const checkCountry = (names: string[]) => names.some((n) => q.includes(n));

  if (checkCountry(['ฝรั่งเศส', 'france', 'french', 'bordeaux', 'champagne', 'burgundy'])) {
    const c = WINE_COUNTRIES.france;
    if (isTh) {
      return (
        `🇫🇷 **โรงผลิตไวน์ในประเทศฝรั่งเศส (${c.nameEn})**\n\n` +
        `The Bottle Club มีโรงผลิตไวน์พันธมิตรจากฝรั่งเศสทั้งหมด **${c.count} แห่ง** ครอบคลุมแคว้นและเมืองสำคัญระดับตำนาน:\n\n` +
        `📍 **เมืองและแคว้นสำคัญ:**\n` +
        `• **Bordeaux (บอร์โด):** แหล่งกำเนิด Bordeaux Blend ยอดนิยมระดับโลก (Cabernet Sauvignon & Merlot)\n` +
        `• **Champagne (ชองปาญ - Reims, Épernay):** ดินแดนแห่งแชมเปญแท้ชั้นเลิศ\n` +
        `• **Bourgogne (เบอร์กันดี - Beaune, Chablis):** แหล่งปลูก Pinot Noir และ Chardonnay อันล้ำค่า\n` +
        `• **Côtes de Provence (โพรวองซ์):** สุดยอดไวน์โรเซ่สีชมพูสว่างสดชื่น\n` +
        `• **Loire Valley (ลุ่มแม่น้ำลัวร์):** แดนสวรรค์ของ Sauvignon Blanc และ Chenin Blanc\n\n` +
        `🏰 **ตัวอย่างโรงผลิตไวน์ชื่อดัง:**\n` +
        `Moët & Chandon, Dom Pérignon, Veuve Clicquot, Krug, Château Cheval Blanc, M. Chapoutier, Laroche, Minuty\n\n` +
        `👉 เข้าชมข้อมูลเรื่องราวและภาพไร่องุ่นทั้งหมดได้ที่: [Wineries | The Bottle Club](http://localhost:3000/wineries)`
      );
    } else {
      return (
        `🇫🇷 **Wineries in France**\n\n` +
        `The Bottle Club features **${c.count} partner wineries** across France's most iconic regions:\n\n` +
        `📍 **Key Regions & Cities:**\n` +
        `• **Bordeaux:** Famous for world-class Cabernet Sauvignon and Merlot blends.\n` +
        `• **Champagne (Reims, Épernay):** The birthplace of authentic luxury Champagne.\n` +
        `• **Burgundy (Beaune, Chablis):** Unrivaled terroir for Pinot Noir and Chardonnay.\n` +
        `• **Provence:** The benchmark for premium dry Rosé.\n` +
        `• **Loire Valley:** Renowned for crisp Sauvignon Blanc and Chenin Blanc.\n\n` +
        `🏰 **Top Partner Wineries:**\n` +
        `Moët & Chandon, Dom Pérignon, Veuve Clicquot, Krug, Château Cheval Blanc, M. Chapoutier, Laroche, Minuty\n\n` +
        `👉 Explore all estate profiles at [Wineries | The Bottle Club](http://localhost:3000/wineries)`
      );
    }
  }

  if (checkCountry(['อิตาลี', 'italy', 'italian', 'ทัสคานี', 'tuscany', 'toscana', 'puglia', 'piemonte'])) {
    const c = WINE_COUNTRIES.italy;
    if (isTh) {
      return (
        `🇮🇹 **โรงผลิตไวน์ในประเทศอิตาลี (${c.nameEn})**\n\n` +
        `The Bottle Club มีโรงผลิตไวน์พันธมิตรจากอิตาลีมากที่สุดถึง **${c.count} แห่ง** ครอบคลุมเมืองและแคว้นสำคัญ:\n\n` +
        `📍 **เมืองและแคว้นสำคัญ:**\n` +
        `• **Toscana (ทัสคานี - Firenze, Montalcino, Chianti):** แหล่งกำเนิด Sangiovese, Chianti Classico และ Brunello di Montalcino\n` +
        `• **Puglia (ปูลเยีย - San Marzano):** แดนผลิตไวน์แดงรสเข้มข้น นุ่มลึก Primitivo di Manduria และ Negroamaro\n` +
        `• **Veneto (เวเนโต - Verona, Valpolicella):** แหล่งผลิต Amarone della Valpolicella และ Prosecco\n` +
        `• **Piemonte (ปิเอมอนเต - Alba, Barolo, Barbaresco):** ราชาแห่งไวน์แดงองุ่น Nebbiolo\n\n` +
        `🏰 **ตัวอย่างโรงผลิตไวน์ชื่อดัง:**\n` +
        `San Marzano, Tenuta Luce, Frescobaldi, Ornellaia, Castello di Albola, Belposto, Buglioni, Coppi\n\n` +
        `👉 เลือกชมรายละเอียดโรงบ่มไวน์ได้ที่: [Wineries | The Bottle Club](http://localhost:3000/wineries)`
      );
    } else {
      return (
        `🇮🇹 **Wineries in Italy**\n\n` +
        `The Bottle Club features **${c.count} partner wineries** across Italy's premier wine territories:\n\n` +
        `📍 **Key Regions & Cities:**\n` +
        `• **Tuscany (Florence, Montalcino, Chianti):** Home of Chianti Classico, Brunello, and Super Tuscans.\n` +
        `• **Puglia (San Marzano, Salento):** Renowned for velvety, rich Primitivo and Negroamaro.\n` +
        `• **Veneto (Verona, Valpolicella):** Famous for Amarone and refreshing Prosecco.\n` +
        `• **Piedmont (Alba, Barolo):** King of Italian reds with noble Nebbiolo wines.\n\n` +
        `🏰 **Featured Wineries:**\n` +
        `San Marzano, Tenuta Luce, Frescobaldi, Ornellaia, Castello di Albola, Belposto, Buglioni, Coppi\n\n` +
        `👉 Discover Italian estates at [Wineries | The Bottle Club](http://localhost:3000/wineries)`
      );
    }
  }

  if (checkCountry(['สหรัฐ', 'อเมริกา', 'united states', 'usa', 'america', 'california', 'napa', 'oregon', 'washington'])) {
    const c = WINE_COUNTRIES.us;
    if (isTh) {
      return (
        `🇺🇸 **โรงผลิตไวน์ในประเทศสหรัฐอเมริกา (${c.nameEn})**\n\n` +
        `The Bottle Club มีโรงผลิตไวน์พันธมิตรจากสหรัฐอเมริกา **${c.count} แห่ง** จากแคว้นผลิตไวน์ชั้นนำ:\n\n` +
        `📍 **เมืองและแคว้นสำคัญ:**\n` +
        `• **Napa Valley (แคลิฟอร์เนีย - St. Helena, Rutherford):** สุดยอดหุบเขาไวน์ระดับโลกสำหรับ Cabernet Sauvignon\n` +
        `• **Sonoma County (แคลิฟอร์เนีย - Healdsburg, Russian River):** ดินแดนสำหรับ Pinot Noir และ Chardonnay สไตล์หรูหรา\n` +
        `• **Paso Robles (Central Coast แคลิฟอร์เนีย):** เด่นเรื่องไวน์ฟูลบอดี้ Rhône blends & Cabernet\n` +
        `• **Washington (Walla Walla Valley):** สภาพอากาศแห้งและดินภูเขาไฟ สร้างสรรค์ไวน์ Syrah และ Cabernet ทรงพลัง\n` +
        `• **Oregon (Willamette Valley):** อากาศเย็นสบาย ให้ไวน์ Pinot Noir ที่ละเอียดอ่อน\n\n` +
        `🏰 **ตัวอย่างโรงผลิตไวน์ชื่อดัง:**\n` +
        `Cakebread Cellars, Francis Ford Coppola, Beringer, Stag's Leap Wine Cellars, Viña Loriente, Capital Call Vintners, Dynamis, Dancing\n\n` +
        `👉 ดูข้อมูลโรงผลิตไวน์ในอเมริกาได้ที่: [Wineries | The Bottle Club](http://localhost:3000/wineries)`
      );
    } else {
      return (
        `🇺🇸 **Wineries in the United States**\n\n` +
        `The Bottle Club partners with **${c.count} premium wineries** across American wine regions:\n\n` +
        `📍 **Key Regions & Cities:**\n` +
        `• **Napa Valley (St. Helena, Rutherford):** Benchmark terroir for robust, collectible Cabernet Sauvignon.\n` +
        `• **Sonoma County (Healdsburg, Russian River):** Acclaimed for elegant Pinot Noir and buttery Chardonnay.\n` +
        `• **Paso Robles:** Sunny Central Coast home to bold Rhône and Bordeaux style blends.\n` +
        `• **Washington (Walla Walla):** High-altitude vineyards crafting intense Syrah and Cabernet.\n` +
        `• **Oregon (Willamette Valley):** World-class cool-climate Pinot Noir.\n\n` +
        `🏰 **Featured Wineries:**\n` +
        `Cakebread Cellars, Francis Ford Coppola, Beringer, Stag's Leap, Viña Loriente, Capital Call Vintners, Dynamis, Dancing\n\n` +
        `👉 Explore US wineries at [Wineries | The Bottle Club](http://localhost:3000/wineries)`
      );
    }
  }

  if (checkCountry(['สเปน', 'spain', 'spanish', 'rioja', 'cava'])) {
    const c = WINE_COUNTRIES.spain;
    if (isTh) {
      return (
        `🇪🇸 **โรงผลิตไวน์ในประเทศสเปน (${c.nameEn})**\n\n` +
        `The Bottle Club มีโรงผลิตไวน์พันธมิตรจากสเปน **${c.count} แห่ง** มีชื่อเสียงเรื่องการบ่มโอ๊กอันมีเสน่ห์:\n\n` +
        `📍 **เมืองและแคว้นสำคัญ:**\n` +
        `• **Rioja (ริโอฮา - Haro, Logroño, Oyón):** แคว้นไวน์ชั้นสูงอันดับ 1 ของสเปน โดดเด่นด้วยองุ่น Tempranillo บ่มในถังไม้โอ๊กอเมริกันและฝรั่งเศส\n` +
        `• **Ribera del Duero (Valladolid, Peñafiel):** ไวน์แดง Tempranillo ที่เข้มข้น โครงสร้างหนักแน่น\n` +
        `• **Catalonia (Penedès):** แหล่งกำเนิด Cava สปาร์กลิงไวน์วิธีดั้งเดิม\n` +
        `• **Castilla y León & Navarra:** แหล่งผลิตไวน์แดงและขาวคุณภาพเยี่ยม\n\n` +
        `🏰 **ตัวอย่างโรงผลิตไวน์ชื่อดัง:**\n` +
        `Bodegas Muga, Bodegas Faustino, Protos, Emilio Moro, Altos de Rioja, Jaume Serra, Bodegas Vilano\n\n` +
        `👉 ดูข้อมูลโรงผลิตไวน์สเปนทั้งหมดได้ที่: [Wineries | The Bottle Club](http://localhost:3000/wineries)`
      );
    } else {
      return (
        `🇪🇸 **Wineries in Spain**\n\n` +
        `The Bottle Club partners with **${c.count} wineries** throughout Spain's classic wine regions:\n\n` +
        `📍 **Key Regions & Cities:**\n` +
        `• **Rioja (Haro, Logroño):** Spain's most iconic DO for barrel-aged Tempranillo (Crianza, Reserva, Gran Reserva).\n` +
        `• **Ribera del Duero (Peñafiel):** Powerful, concentrated red wines along the Duero river.\n` +
        `• **Catalonia (Penedès):** The traditional home of sparkling Cava.\n\n` +
        `🏰 **Featured Wineries:**\n` +
        `Bodegas Muga, Bodegas Faustino, Protos, Emilio Moro, Altos de Rioja, Jaume Serra\n\n` +
        `👉 Explore Spanish estates at [Wineries | The Bottle Club](http://localhost:3000/wineries)`
      );
    }
  }

  if (checkCountry(['เยอรมัน', 'เยอรมนี', 'germany', 'german', 'riesling', 'นาเฮอ', 'ไรน์เฮสเซน'])) {
    const c = WINE_COUNTRIES.germany;
    if (isTh) {
      return (
        `🇩🇪 **โรงผลิตไวน์ในประเทศเยอรมนี (${c.nameEn})**\n\n` +
        `เยอรมนีขึ้นชื่อเรื่องสุดยอดไวน์ขาว **Riesling** ที่ดีที่สุดแห่งหนึ่งของโลก:\n\n` +
        `📍 **เมืองและแคว้นสำคัญ:**\n` +
        `• **Nahe (นาเฮอ - Niederhausen):** แหล่งหินแร่ภูเขาไฟเก่าแก่ ให้ไวน์ขาว Riesling ระดับ VDP.GROSSES GEWÄCHS ที่มีรสสัมผัสแร่ธาตุลุ่มลึก\n` +
        `• **Rheinhessen (ไรน์เฮสเซน):** แหล่งผลิตไวน์ออร์แกนิกและไวน์ธรรมชาติรุ่นใหม่\n` +
        `• **Pfalz (พฟัลซ์):** สภาพอากาศอบอุ่น ให้ไวน์ขาวและแดงรสชาติกลมกล่อม\n\n` +
        `🏰 **โรงผลิตไวน์พันธมิตร:**\n` +
        `Gut Hermannsberg, Dreissigacker, Von Winning\n\n` +
        `👉 ดูข้อมูลโรงไวน์เยอรมันได้ที่: [Wineries | The Bottle Club](http://localhost:3000/wineries)`
      );
    } else {
      return (
        `🇩🇪 **Wineries in Germany**\n\n` +
        `Celebrated worldwide for transcendent **Riesling**:\n\n` +
        `📍 **Key Regions:**\n` +
        `• **Nahe (Niederhausen):** Steep volcanic rock slopes producing top VDP.GROSSES GEWÄCHS Rieslings.\n` +
        `• **Rheinhessen & Pfalz:** Vibrant organic viticulture with mineral precision.\n\n` +
        `🏰 **Partner Wineries:**\n` +
        `Gut Hermannsberg, Dreissigacker, Von Winning\n\n` +
        `👉 Explore at [Wineries | The Bottle Club](http://localhost:3000/wineries)`
      );
    }
  }

  if (checkCountry(['ออสเตรเลีย', 'australia', 'australian', 'shiraz', 'บารอสซา', 'barossa'])) {
    const c = WINE_COUNTRIES.australia;
    if (isTh) {
      return (
        `🇦🇺 **โรงผลิตไวน์ในประเทศออสเตรเลีย (${c.nameEn})**\n\n` +
        `ออสเตรเลียขึ้นชื่อเรื่องความเข้มข้น ทรงพลังขององุ่น **Shiraz** และ **Cabernet Sauvignon**:\n\n` +
        `📍 **เมืองและแคว้นสำคัญ:**\n` +
        `• **Barossa Valley (บารอสซา - Tanunda):** หุบเขาไวน์ใน South Australia ที่มีต้นองุ่นเก่าแก่อายุกว่า 100 ปี ให้ไวน์ฟูลบอดี้ที่เข้มข้น มีกลิ่นช็อกโกแลตและเครื่องเทศ\n` +
        `• **Eden Valley:** แหล่งผลิตไวน์ขาว Riesling และ Shiraz บนพื้นที่สูงที่มีลมเย็น\n\n` +
        `🏰 **โรงผลิตไวน์พันธมิตร:**\n` +
        `St Hallett (ผู้เชี่ยวชาญด้าน Barossa Shiraz มาตั้งแต่ปี 1944), Penfolds, Grant Burge\n\n` +
        `👉 ชมรายละเอียดได้ที่: [Wineries | The Bottle Club](http://localhost:3000/wineries)`
      );
    } else {
      return (
        `🇦🇺 **Wineries in Australia**\n\n` +
        `World-famous for full-bodied, expressive **Shiraz** and **Cabernet Sauvignon**:\n\n` +
        `📍 **Key Regions:**\n` +
        `• **Barossa Valley (Tanunda):** Historic century-old vines delivering intense fruit, spice, and dark chocolate notes.\n` +
        `• **Eden Valley:** High-altitude cool-climate elegance.\n\n` +
        `🏰 **Featured Wineries:**\n` +
        `St Hallett, Penfolds, Grant Burge\n\n` +
        `👉 Explore at [Wineries | The Bottle Club](http://localhost:3000/wineries)`
      );
    }
  }

  // General Country, Region, or Winery query
  if (isGeneralCountryQuery || isGeneralWineryQuery || isGeneralCityQuery) {
    if (isTh) {
      return (
        `🏰 **ข้อมูลประเทศและเมืองผลิตไวน์ที่ The Bottle Club**\n\n` +
        `The Bottle Club คัดสรรโรงผลิตไวน์ระดับโลก (Wineries) มากกว่า **260+ โรงผลิตพันธมิตร** จาก 6 ประเทศผู้ผลิตไวน์ชั้นนำ:\n\n` +
        `1. 🇮🇹 **อิตาลี (100 โรงไวน์):** แคว้น Toscana (Firenze, Montalcino), Puglia (San Marzano), Veneto (Verona), Piemonte (Alba, Barolo)\n` +
        `2. 🇫🇷 **ฝรั่งเศส (67 โรงไวน์):** แคว้น Bordeaux, Champagne (Reims, Épernay), Bourgogne (Beaune, Chablis), Provence, Loire\n` +
        `3. 🇺🇸 **สหรัฐอเมริกา (51 โรงไวน์):** แคว้น California (Napa Valley, Sonoma, Paso Robles), Washington (Walla Walla), Oregon\n` +
        `4. 🇪🇸 **สเปน (41 โรงไวน์):** แคว้น Rioja (Haro, Logroño), Ribera del Duero, Catalonia (Cava)\n` +
        `5. 🇩🇪 **เยอรมนี:** แคว้น Nahe, Rheinhessen, Pfalz (ขึ้นชื่อเรื่อง Riesling)\n` +
        `6. 🇦🇺 **ออสเตรเลีย:** แคว้น Barossa Valley, South Australia (ขึ้นชื่อเรื่อง Shiraz)\n\n` +
        `👉 **เข้าชมข้อมูลและภาพถ่ายของแต่ละโรงบ่มได้ที่:**\n` +
        `[Wineries | The Bottle Club](http://localhost:3000/wineries)\n\n` +
        `💡 คุณสามารถพิมพ์ถามเจาะจงชื่อประเทศ เมือง หรือชื่อโรงไวน์ที่ต้องการ เช่น *"ไวน์ฝรั่งเศส"*, *"เมือง Bordeaux"*, หรือ *"โรงไวน์ San Marzano"* ได้เลยค่ะ!`
      );
    } else {
      return (
        `🏰 **Wine Producing Countries & Cities at The Bottle Club**\n\n` +
        `The Bottle Club brings you verified world-class estates across 6 premier wine-making nations:\n\n` +
        `1. 🇮🇹 **Italy (100 Wineries):** Tuscany (Florence, Montalcino), Puglia (San Marzano), Veneto, Piedmont (Alba, Barolo)\n` +
        `2. 🇫🇷 **France (67 Wineries):** Bordeaux, Champagne (Reims, Épernay), Burgundy (Beaune, Chablis), Provence, Loire\n` +
        `3. 🇺🇸 **United States (51 Wineries):** California (Napa Valley, Sonoma, Paso Robles), Washington, Oregon\n` +
        `4. 🇪🇸 **Spain (41 Wineries):** Rioja (Haro), Ribera del Duero, Catalonia\n` +
        `5. 🇩🇪 **Germany:** Nahe, Rheinhessen, Pfalz (World-class Riesling)\n` +
        `6. 🇦🇺 **Australia:** Barossa Valley, South Australia (Iconic Shiraz)\n\n` +
        `👉 **Discover all estates, stories, and vineyard photos at:**\n` +
        `[Wineries | The Bottle Club](http://localhost:3000/wineries)\n\n` +
        `💡 You can ask me anytime about a specific country, region, or estate name!`
      );
    }
  }

  return null;
}
