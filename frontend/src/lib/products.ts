import { VIVINO_EXPLORE_PRODUCTS } from '@/data/vivinoExploreWines';
import { WINERIES_DATA } from '@/data/wineriesData';

export type ProductImage = {
  id: number;
  image_url: string;
  created_at: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  color?: string;
  stock: number;
  sub_type?: string;
  type?: string;
  countryCode?: string;
  country_code?: string;
  country?: string;
  region?: string;
  image?: string;
  images?: ProductImage[];
  description?: string;
  vintage?: number | string;
  alcohol?: string;
  designation?: string;
  brand?: string;
  winery?: string;
  wine_name?: string;
  quantity?: string;
  rating?: number;
  ratings_count?: number;
  badge?: string;
  discount?: boolean;
  is_natural?: boolean;
};

export type WineProductQueryParams = {
  search?: string;
  category?: string;
  countries?: string;
  brands?: string;
  page?: number;
  per_page?: number;
  sort?: string;
  token?: string;
  types?: string[];
  max_price?: number;
  min_price?: number;
  min_rating?: number;
  natural_only?: boolean;
  discount_only?: boolean;
};

export type PaginatedProductsResult = {
  products: Product[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
  source?: 'api.wayneven.uk' | 'fallback';
  apiError?: string | null;
};

export type ProductReview = {
  id: number;
  wine_id: number;
  user_id: string;
  username: string;
  rating: number;
  comment: string;
  images?: string[];
  videos?: string[];
  created_at: string;
};

function extractWineArray(rawData: unknown): unknown[] {
  if (Array.isArray(rawData)) return rawData;
  if (rawData && typeof rawData === 'object') {
    const obj = rawData as Record<string, unknown>;
    for (const key of ['wines', 'items', 'results', 'products']) {
      if (Array.isArray(obj[key])) return obj[key] as unknown[];
    }
    if (Array.isArray(obj.data)) return obj.data as unknown[];
    if (obj.data && typeof obj.data === 'object') {
      const dataObj = obj.data as Record<string, unknown>;
      for (const key of ['items', 'wines', 'products', 'results']) {
        if (Array.isArray(dataObj[key])) return dataObj[key] as unknown[];
      }
    }
  }
  return [];
}

let cachedApiToken: string | null = null;
let tokenExpiresAt = 0;
let inFlightTokenPromise: Promise<string | null> | null = null;

export async function getWaynevenApiToken(): Promise<string | null> {
  const now = Date.now();
  if (cachedApiToken && now < tokenExpiresAt - 60000) {
    return cachedApiToken;
  }
  if (inFlightTokenPromise) {
    return inFlightTokenPromise;
  }

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    'https://api.wayneven.uk';

  const username = process.env.API_ADMIN_USER || 'admin';
  const password = process.env.API_ADMIN_PASSWORD || 'admin123';

  inFlightTokenPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ username, password }),
        cache: 'no-store',
      });

      if (!res.ok) {
        console.warn(`[Wayneven Auth] Login status: ${res.status}`);
        return cachedApiToken;
      }

      const data = await res.json();
      const token = data?.data?.access_token || data?.access_token;
      const expiresIn = Number(data?.data?.expires_in || data?.expires_in || 900);

      if (token) {
        cachedApiToken = token;
        tokenExpiresAt = Date.now() + expiresIn * 1000;
        return token;
      }
    } catch (error) {
      console.error('[Wayneven Auth] Failed to fetch token:', error);
    } finally {
      inFlightTokenPromise = null;
    }
    return cachedApiToken;
  })();

  return inFlightTokenPromise;
}

function filterProducts(products: Product[], query?: string): Product[] {
  if (!query || query.trim() === '') return products;
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name?.toLowerCase().includes(lowerQuery) ||
      p.winery?.toLowerCase().includes(lowerQuery) ||
      p.wine_name?.toLowerCase().includes(lowerQuery) ||
      p.country?.toLowerCase().includes(lowerQuery) ||
      p.type?.toLowerCase().includes(lowerQuery) ||
      p.sub_type?.toLowerCase().includes(lowerQuery) ||
      p.region?.toLowerCase().includes(lowerQuery)
  );
}

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Château Margaux Premier Grand Cru Classé',
    price: 24500,
    originalPrice: 28000,
    color: 'red',
    stock: 12,
    type: 'Red Wine',
    sub_type: 'Grand Cru',
    countryCode: 'fr',
    country: 'France',
    country_code: 'fr',
    region: 'Bordeaux, France',
    image: '/images/wine_red.png',
    description: 'ไวน์แดงคลาสสิกระดับพรีเมียมจากบอร์โดซ์ กลิ่นหอมซับซ้อนของบลูเบอร์รี ดอกไวโอเล็ต และซิการ์บ็อกซ์ แทนนินนุ่มละมุนติดลึกยาวนาน',
    vintage: 2015,
    alcohol: '13.5%',
    winery: 'Château Margaux',
    brand: 'Château Margaux',
    wine_name: 'Premier Grand Cru Classé',
    rating: 4.9,
    ratings_count: 58,
    discount: true,
  },
  {
    id: 2,
    name: 'Dom Pérignon Vintage Champagne',
    price: 13900,
    originalPrice: 15500,
    color: 'white',
    stock: 8,
    type: 'Sparkling',
    sub_type: 'Vintage Champagne',
    countryCode: 'fr',
    country: 'France',
    country_code: 'fr',
    region: 'Champagne, France',
    image: '/images/wine_sparkling.png',
    description: 'แชมเปญสปาร์กลิ้งระดับตำนาน ฟองละเอียดนุ่มละมุน กลิ่นหอมของผลไม้สีขาว อัลมอนด์คั่ว และขนมปังบริออช สดชื่นประทับใจ',
    vintage: 2012,
    alcohol: '12.5%',
    winery: 'Dom Pérignon',
    brand: 'Dom Pérignon',
    wine_name: 'Vintage Brut',
    rating: 4.9,
    ratings_count: 124,
    discount: true,
  },
  {
    id: 3,
    name: 'Cloudy Bay Sauvignon Blanc',
    price: 2190,
    originalPrice: 2490,
    color: 'white',
    stock: 25,
    type: 'White Wine',
    sub_type: 'Sauvignon Blanc',
    countryCode: 'nz',
    country: 'New Zealand',
    country_code: 'nz',
    region: 'Marlborough, New Zealand',
    image: '/images/wine_white.png',
    description: 'ไวน์ขาวชื่อดังจากนิวซีแลนด์ กลิ่นหอมสดชื่นของแพชชันฟรุต เสาวรส กะเพรา และเลมอน แอซิดิตี้ดีเยี่ยม ดื่มง่ายในทุกโอกาส',
    vintage: 2022,
    alcohol: '13.0%',
    winery: 'Cloudy Bay',
    brand: 'Cloudy Bay',
    wine_name: 'Sauvignon Blanc',
    rating: 4.6,
    ratings_count: 88,
    discount: true,
  },
  {
    id: 4,
    name: 'Whispering Angel Rosé Côtes de Provence',
    price: 1850,
    originalPrice: 2100,
    color: 'rose',
    stock: 18,
    type: 'Rose Wine',
    sub_type: 'Provence Rosé',
    countryCode: 'fr',
    country: 'France',
    country_code: 'fr',
    region: 'Provence, France',
    image: '/images/wine_rose.png',
    description: 'ไวน์โรเซ่ยอดนิยมระดับโลก รสสัมผัสสดชื่น กลิ่นหอมของสตรอว์เบอร์รี พีช และส้มแมนดาริน เหมาะดื่มสังสรรค์ชิลๆ',
    vintage: 2023,
    alcohol: '13.0%',
    winery: "Château d'Esclans",
    brand: 'Whispering Angel',
    wine_name: 'Rosé Côtes de Provence',
    rating: 4.5,
    ratings_count: 67,
    discount: true,
  },
  {
    id: 5,
    name: 'Penfolds Grange Shiraz 2018',
    price: 32000,
    originalPrice: 35000,
    color: 'red',
    stock: 6,
    type: 'Red Wine',
    sub_type: 'Shiraz',
    countryCode: 'au',
    country: 'Australia',
    country_code: 'au',
    region: 'South Australia',
    image: '/images/wine_red.png',
    description: 'ไวน์แดงระดับไอคอนของออสเตรเลีย รสชาติทรงพลัง กลิ่นหอมของแบล็กเบอร์รี เครื่องเทศ และโอ๊กสไตล์เข้มข้น แทนนินแน่นยาวนาน',
    vintage: 2018,
    alcohol: '14.5%',
    winery: 'Penfolds',
    brand: 'Penfolds',
    wine_name: 'Grange Shiraz',
    rating: 4.9,
    ratings_count: 45,
    discount: true,
  },
  {
    id: 6,
    name: "Château d'Yquem Premier Cru Supérieur",
    price: 18500,
    originalPrice: 21000,
    color: 'white',
    stock: 5,
    type: 'Dessert Wine',
    sub_type: 'Sauternes',
    countryCode: 'fr',
    country: 'France',
    country_code: 'fr',
    region: 'Sauternes, Bordeaux, France',
    image: '/images/wine_white.png',
    description: 'ไวน์หวานระดับโลกที่มีชื่อเสียงที่สุด กลิ่นหอมของแอปริคอตแห้ง น้ำผึ้ง วานิลลา และดอกส้ม หวานฉ่ำลงตัวพร้อมความสดชื่น',
    vintage: 2016,
    alcohol: '14.0%',
    winery: "Château d'Yquem",
    brand: "Château d'Yquem",
    wine_name: 'Premier Cru Supérieur',
    rating: 4.9,
    ratings_count: 36,
    discount: true,
  },
  {
    id: 7,
    name: 'Royal Tokaji 5 Puttonyos Aszú',
    price: 3800,
    originalPrice: 4200,
    color: 'white',
    stock: 10,
    type: 'Dessert Wine',
    sub_type: 'Tokaji',
    countryCode: 'hu',
    country: 'Hungary',
    country_code: 'hu',
    region: 'Tokaj, Hungary',
    image: '/images/wine_white.png',
    description: 'ไวน์หวานชั้นเลิศจากฮังการี ผลิตจากองุ่นบ่มโบทรีติส รสหวานกลมกล่อม มีชีวิตชีวาด้วยแอซิดิตี้สูง กลิ่นพีชสุกและขิงอบ',
    vintage: 2017,
    alcohol: '11.5%',
    winery: 'Royal Tokaji',
    brand: 'Royal Tokaji',
    wine_name: '5 Puttonyos Aszú',
    rating: 4.7,
    ratings_count: 29,
    discount: true,
  },
  {
    id: 8,
    name: "Taylor's 20 Year Old Tawny Port",
    price: 4600,
    originalPrice: 5200,
    color: 'red',
    stock: 14,
    type: 'Fortified Wine',
    sub_type: 'Tawny Port',
    countryCode: 'pt',
    country: 'Portugal',
    country_code: 'pt',
    region: 'Douro Valley, Portugal',
    image: '/images/wine_red.png',
    description: 'ไวน์พอร์ตเสริมแอลกอฮอล์บ่มถังโอ๊กกว่า 20 ปี กลิ่นถั่วคั่ว แยมแบล็กเคอร์แรนท์ มะเดื่อ และบัตเตอร์สก็อตช์ นุ่มนวลละมุนลิ้น',
    vintage: 2003,
    alcohol: '20.0%',
    winery: "Taylor's",
    brand: "Taylor's",
    wine_name: '20 Year Old Tawny Port',
    rating: 4.8,
    ratings_count: 53,
    discount: true,
  },
  {
    id: 9,
    name: 'Lustau San Emilio Pedro Ximénez Sherry',
    price: 2600,
    originalPrice: 2950,
    color: 'red',
    stock: 12,
    type: 'Fortified Wine',
    sub_type: 'Sherry',
    countryCode: 'es',
    country: 'Spain',
    country_code: 'es',
    region: 'Jerez, Spain',
    image: '/images/wine_red.png',
    description: 'เชอร์รี่สีน้ำตาลเข้มข้น รสหวานล้ำลึก กลิ่นลูกเกด ลูกพรุน อินทผลัม และกาแฟคั่ว เหมาะดื่มคู่ของหวานหรือราดบนไอศกรีม',
    vintage: 2019,
    alcohol: '17.0%',
    winery: 'Bodegas Lustau',
    brand: 'Lustau',
    wine_name: 'Pedro Ximénez Sherry',
    rating: 4.6,
    ratings_count: 31,
    discount: true,
  },
  {
    id: 10,
    name: 'Moët & Chandon Impérial Brut',
    price: 3200,
    originalPrice: 3600,
    color: 'white',
    stock: 30,
    type: 'Sparkling',
    sub_type: 'Brut Champagne',
    countryCode: 'fr',
    country: 'France',
    country_code: 'fr',
    region: 'Champagne, France',
    image: '/images/wine_sparkling.png',
    description: 'แชมเปญอันเป็นเอกลักษณ์ระดับสากล รสชาติสดชื่นและมีชีวิตชีวา โดดเด่นด้วยกลิ่นผลไม้สด ดอกไม้ขาว และขนมปังสดใหม่',
    vintage: 2021,
    alcohol: '12.0%',
    winery: 'Moët & Chandon',
    brand: 'Moët & Chandon',
    wine_name: 'Impérial Brut',
    rating: 4.7,
    ratings_count: 142,
    discount: true,
  },
  {
    id: 11,
    name: 'Sassicaia Tenuta San Guido 2019',
    price: 14500,
    originalPrice: 16800,
    color: 'red',
    stock: 15,
    type: 'Red Wine',
    sub_type: 'Super Tuscan',
    countryCode: 'it',
    country: 'Italy',
    country_code: 'it',
    region: 'Bolgheri, Tuscany, Italy',
    image: '/images/wine_red.png',
    description: 'สุดยอดซูเปอร์ทัสคันระดับตำนานของอิตาลี กลิ่นหอมเชอร์รี่ป่า ซีดาร์ สมุนไพรเมดิเตอร์เรเนียน และกลิ่นยาสูบ รสชาติสมดุลกลมกล่อม',
    vintage: 2019,
    alcohol: '14.0%',
    winery: 'Tenuta San Guido',
    brand: 'Sassicaia',
    wine_name: 'Bolgheri Sassicaia',
    rating: 4.9,
    ratings_count: 85,
    discount: true,
  },
  {
    id: 12,
    name: 'Opus One Napa Valley 2018',
    price: 18900,
    originalPrice: 22000,
    color: 'red',
    stock: 10,
    type: 'Red Wine',
    sub_type: 'Bordeaux Blend',
    countryCode: 'us',
    country: 'United States',
    country_code: 'us',
    region: 'Napa Valley, California, USA',
    image: '/images/wine_red.png',
    description: 'ความร่วมมือระดับตำนานระหว่าง Baron Philippe de Rothschild และ Robert Mondavi กลิ่นแบล็กเคอร์แรนท์ มอคค่า และไวโอเล็ต ละมุนล้ำลึก',
    vintage: 2018,
    alcohol: '14.5%',
    winery: 'Opus One Winery',
    brand: 'Opus One',
    wine_name: 'Proprietary Red Blend',
    rating: 4.9,
    ratings_count: 94,
    discount: true,
  },
  {
    id: 13,
    name: 'Louis Roederer Cristal Brut Champagne 2014',
    price: 16500,
    originalPrice: 19000,
    color: 'white',
    stock: 7,
    type: 'Sparkling',
    sub_type: 'Prestige Cuvée',
    countryCode: 'fr',
    country: 'France',
    country_code: 'fr',
    region: 'Champagne, France',
    image: '/images/wine_sparkling.png',
    description: 'แชมเปญพรีสติจขวดคริสตัลใสอันเลอค่า สร้างสรรค์แด่จักรพรรดิซาร์แห่งรัสเซีย ฟองละเอียดอ่อนนุ่ม กลิ่นซีตรัส ผลไม้สีเหลือง และแร่ธาตุ',
    vintage: 2014,
    alcohol: '12.0%',
    winery: 'Louis Roederer',
    brand: 'Cristal',
    wine_name: 'Brut Champagne',
    rating: 4.9,
    ratings_count: 62,
    discount: true,
  },
  {
    id: 14,
    name: 'Château Lafite Rothschild Premier Grand Cru Classé 2016',
    price: 36000,
    originalPrice: 42000,
    color: 'red',
    stock: 4,
    type: 'Red Wine',
    sub_type: 'Pauillac Grand Cru',
    countryCode: 'fr',
    country: 'France',
    country_code: 'fr',
    region: 'Pauillac, Bordeaux, France',
    image: '/images/wine_red.png',
    description: 'หนึ่งใน 5 ไวน์บอร์โดซ์ระดับเฟิร์สโกรว์ธอันทรงเกียรติที่สุดในประวัติศาสตร์ กลิ่นพลัม ซีดาร์ ทรัฟเฟิล และดินป่า นุ่มนวลสง่างามยากจะเทียบเคียง',
    vintage: 2016,
    alcohol: '13.0%',
    winery: 'Château Lafite Rothschild',
    brand: 'Lafite Rothschild',
    wine_name: 'Pauillac Premier Grand Cru Classé',
    rating: 5.0,
    ratings_count: 110,
    discount: true,
  },
  {
    id: 15,
    name: 'Tignanello Marchesi Antinori 2020',
    price: 6900,
    originalPrice: 7800,
    color: 'red',
    stock: 22,
    type: 'Red Wine',
    sub_type: 'Super Tuscan',
    countryCode: 'it',
    country: 'Italy',
    country_code: 'it',
    region: 'Tuscany, Italy',
    image: '/images/wine_red.png',
    description: 'ไวน์ผู้บุกเบิกการผสมผสานองุ่น Sangiovese กับพันธุ์สากลในทัสคานี กลิ่นหอมเชอร์รี่สีแดง ดาร์กช็อกโกแลต และสมุนไพร กลิ่นอายคลาสสิกอิตาเลียน',
    vintage: 2020,
    alcohol: '14.0%',
    winery: 'Marchesi Antinori',
    brand: 'Tignanello',
    wine_name: 'Toscana IGT',
    rating: 4.8,
    ratings_count: 98,
    discount: true,
  },
  {
    id: 16,
    name: 'Meursault Premier Cru Charmes Louis Jadot 2020',
    price: 4900,
    originalPrice: 5600,
    color: 'white',
    stock: 14,
    type: 'White Wine',
    sub_type: 'Chardonnay',
    countryCode: 'fr',
    country: 'France',
    country_code: 'fr',
    region: 'Burgundy, France',
    image: '/images/wine_white.png',
    description: 'ไวน์ขาวชาร์ดอนเนย์ระดับพรีเมียร์ครูจากเบอร์กันดี รสสัมผัสครีมมี่เนยสด ถั่วฮาเซลนัท แอปเปิ้ลเขียว และแร่ธาตุหินปูน มีพลังและติดทนนาน',
    vintage: 2020,
    alcohol: '13.5%',
    winery: 'Maison Louis Jadot',
    brand: 'Louis Jadot',
    wine_name: 'Meursault 1er Cru Charmes',
    rating: 4.7,
    ratings_count: 44,
    discount: true,
  },
  {
    id: 17,
    name: 'Miraval Côtes de Provence Rosé 2023',
    price: 1450,
    originalPrice: 1700,
    color: 'rose',
    stock: 35,
    type: 'Rose Wine',
    sub_type: 'Provence Rosé',
    countryCode: 'fr',
    country: 'France',
    country_code: 'fr',
    region: 'Côtes de Provence, France',
    image: '/images/wine_rose.png',
    description: 'โรเซ่สีชมพูกลีบกุหลาบอ่อนหวานจากโพรวองซ์ กลิ่นผลไม้สีแดงสด ดอกไม้ป่า และเลมอน สดชื่นละมุนละไม ดื่มง่ายเหมาะกับทุกมื้ออาหาร',
    vintage: 2023,
    alcohol: '12.5%',
    winery: 'Château Miraval',
    brand: 'Miraval',
    wine_name: 'Côtes de Provence Rosé',
    rating: 4.6,
    ratings_count: 83,
    discount: true,
  },
  {
    id: 18,
    name: 'Armand de Brignac Ace of Spades Brut Gold',
    price: 19800,
    originalPrice: 23000,
    color: 'white',
    stock: 9,
    type: 'Sparkling',
    sub_type: 'Brut Champagne',
    countryCode: 'fr',
    country: 'France',
    country_code: 'fr',
    region: 'Champagne, France',
    image: '/images/wine_sparkling.png',
    description: 'แชมเปญขวดทองสัญลักษณ์เอซโพธิ์ดำอันโด่งดัง ผลิตด้วยมือแบบดั้งเดิมทุกขั้นตอน รสชาติซับซ้อนด้วยผลไม้เชื่อม ดอกส้ม และขนมอบฝรั่งเศส',
    vintage: 'N.V.',
    alcohol: '12.5%',
    winery: 'Champagne Cattier',
    brand: 'Armand de Brignac',
    wine_name: 'Brut Gold (Ace of Spades)',
    rating: 4.9,
    ratings_count: 77,
    discount: true,
  },
  {
    id: 19,
    name: 'Caymus Vineyards Cabernet Sauvignon 2020',
    price: 4800,
    originalPrice: 5500,
    color: 'red',
    stock: 20,
    type: 'Red Wine',
    sub_type: 'Cabernet Sauvignon',
    countryCode: 'us',
    country: 'United States',
    country_code: 'us',
    region: 'Napa Valley, California, USA',
    image: '/images/wine_red.png',
    description: 'คาแบร์เนต์ โซวินญง สไตล์นาปาแวลลีย์ยอดนิยม รสสัมผัสเข้มข้นเนียนนุ่ม กลิ่นแบล็กเบอร์รี วานิลลา คาคาว และไม้โอ๊คอเมริกันหอมหวาน',
    vintage: 2020,
    alcohol: '14.8%',
    winery: 'Caymus Vineyards',
    brand: 'Caymus',
    wine_name: 'Napa Valley Cabernet Sauvignon',
    rating: 4.8,
    ratings_count: 105,
    discount: true,
  },
  {
    id: 20,
    name: 'Gaja Barbaresco DOCG 2019',
    price: 12800,
    originalPrice: 14500,
    color: 'red',
    stock: 11,
    type: 'Red Wine',
    sub_type: 'Nebbiolo',
    countryCode: 'it',
    country: 'Italy',
    country_code: 'it',
    region: 'Piedmont, Italy',
    image: '/images/wine_red.png',
    description: 'ผลงานชิ้นเอกของ Angelo Gaja จากแคว้นพีดมอนต์ องุ่นเนบบิโอโล 100% กลิ่นกุหลาบแห้ง เชอร์รี่ทาร์ต น้ำมันดิน และเครื่องเทศ กลิ่นหอมฟุ้งล้ำลึก',
    vintage: 2019,
    alcohol: '14.0%',
    winery: 'Gaja',
    brand: 'Gaja',
    wine_name: 'Barbaresco DOCG',
    rating: 4.9,
    ratings_count: 51,
    discount: true,
  },
];

export function sanitizeProductsForAuth(products: Product[], isAuth: boolean): Product[] {
  return products.map((p) => {
    let img = p.image;
    if (!isAuth) {
      img = '/images/bottle-silhouette.svg';
    } else {
      if (!img || img === '/images/bottle-silhouette.svg') {
        img = `/images/wine_${p.color || 'red'}.png`;
      }
    }
    return {
      ...p,
      image: img,
      images: isAuth ? (p.images ?? []) : [],
    };
  });
}

export function mapWineItemToProduct(
  item: any,
  isAuth: boolean = false,
  apiBaseUrl: string = 'https://api.wayneven.uk'
): Product {
  const ensureString = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val.name || val.title || val.product_name || '';
    }
    return String(val);
  };

  const rawName = ensureString(item.product_name || item.name) || 'Fine Wine';
  const wineType = ensureString(item.categories_en || item.wine_type || item.type || rawName);
  let color = 'red';

  const lowerType = wineType.toLowerCase();
  const lowerName = rawName.toLowerCase();

  if (
    lowerType.includes('white') ||
    lowerType.includes('blanc') ||
    lowerType.includes('chardonnay') ||
    lowerType.includes('sauvignon') ||
    lowerType.includes('riesling') ||
    lowerType.includes('pinot grigio') ||
    lowerType.includes('chenin') ||
    lowerName.includes('blanc') ||
    lowerName.includes('white')
  ) {
    color = 'white';
  } else if (
    lowerType.includes('rose') ||
    lowerType.includes('rosé') ||
    lowerType.includes('pink') ||
    lowerName.includes('rose') ||
    lowerName.includes('rosé')
  ) {
    color = 'rose';
  } else if (
    lowerType.includes('sparkling') ||
    lowerType.includes('champagne') ||
    lowerType.includes('prosecco') ||
    lowerType.includes('cava') ||
    lowerType.includes('brut') ||
    lowerName.includes('champagne') ||
    lowerName.includes('brut')
  ) {
    color = 'sparkling';
  } else {
    color = 'red';
  }

  // Handle multiple images from API
  let images: ProductImage[] = [];
  if (Array.isArray(item.images) && item.images.length > 0) {
    images = item.images
      .filter((img: any) => img?.image_url)
      .map((img: any, idx: number) => {
        const path = String(img.image_url);
        const image_url = path.startsWith('http')
          ? path
          : `${apiBaseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
        return {
          id: img.id || idx + 1,
          image_url,
          created_at: img.created_at || new Date().toISOString(),
        };
      });
  }

  if (images.length === 0 && item.image_url) {
    const path = String(item.image_url);
    const image_url = path.startsWith('http')
      ? path
      : `${apiBaseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
    images.push({ id: 1, image_url, created_at: item.created_at || new Date().toISOString() });
  }

  if (item.image_small_url && item.image_small_url !== item.image_url) {
    const path = String(item.image_small_url);
    const image_url = path.startsWith('http')
      ? path
      : `${apiBaseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
    images.push({ id: 2, image_url, created_at: item.created_at || new Date().toISOString() });
  }

  const defaultWineImg = `/images/wine_${color === 'sparkling' ? 'sparkling' : color}.png`;
  const primaryImageUrl = images.length > 0 ? images[0].image_url : defaultWineImg;

  const itemId = Number(item.id) || 1;
  const basePrice = Number(item.selling_price) || Number(item.price) || (890 + ((itemId * 73) % 2900));
  const originalPrice =
    Number(item.price && item.selling_price && Number(item.price) > Number(item.selling_price) ? item.price : 0) ||
    (basePrice > 1500 ? Math.round(basePrice * 1.15) : undefined);
  const stock = item.stock !== undefined && item.stock !== null ? Number(item.stock) : (10 + (itemId % 40));

  const subType = ensureString(item.brands || item.wine_type || item.sub_type) || 'Classic';
  const region = ensureString(item.origins_en || item.region || (item.countries_en ? `${item.countries_en}` : ''));
  const rawCountry = ensureString(item.countries_en || item.country || 'France');

  const countryMap: Record<string, string> = {
    US: 'us',
    UnitedStates: 'us',
    'United States': 'us',
    France: 'fr',
    Italy: 'it',
    Spain: 'es',
    Australia: 'au',
    Chile: 'cl',
    Argentina: 'ar',
    Germany: 'de',
    NewZealand: 'nz',
    'New Zealand': 'nz',
    Portugal: 'pt',
    SouthAfrica: 'za',
    'South Africa': 'za',
    Austria: 'at',
    Thailand: 'th',
  };

  const countryCode = countryMap[rawCountry] || rawCountry.toLowerCase().slice(0, 2) || 'fr';

  let alcohol = ensureString(item.alcohol_100g || item.alcohol);
  if (alcohol) {
    const alcNum = parseFloat(alcohol);
    if (!isNaN(alcNum)) {
      alcohol = alcNum > 25 ? `${(11 + (itemId % 4)).toFixed(1)}%` : `${alcNum.toFixed(1)}%`;
    }
  } else {
    alcohol = '12.5%';
  }

  let displayType = 'Wine';
  if (lowerType.includes('champagne')) displayType = 'Champagne';
  else if (lowerType.includes('sparkling')) displayType = 'Sparkling Wine';
  else if (color === 'red') displayType = 'Red Wine';
  else if (color === 'white') displayType = 'White Wine';
  else if (color === 'rose') displayType = 'Rosé Wine';

  return {
    id: itemId,
    name: rawName,
    price: basePrice,
    originalPrice,
    stock,
    color,
    type: displayType,
    sub_type: subType,
    region: region || 'Selected Vineyard',
    image: primaryImageUrl,
    images: images.length > 0 ? images : [{ id: 1, image_url: primaryImageUrl, created_at: new Date().toISOString() }],
    description:
      ensureString(item.ingredients_text || item.description) ||
      `ไวน์ชั้นเลิศคัดสรรพิเศษสำหรับสมาชิก The Bottle Club แบรนด์ ${subType}`,
    vintage: item.vintage ? Number(item.vintage) : (2018 + (itemId % 6)),
    alcohol,
    designation: ensureString(item.brands || item.winery || item.designation) || subType,
    countryCode,
    brand: ensureString(item.brands) || undefined,
    quantity: ensureString(item.quantity) || '75 cl',
  };
}

/**
 * Winery catalog products converted to Product format for /product showcase and reviews
 */
export const WINERY_PRODUCTS: Product[] = WINERIES_DATA.flatMap((winery) => {
  if (!winery.wines || !Array.isArray(winery.wines)) return [];
  return winery.wines.map((wine, idx) => {
    const numericId = typeof winery.id === 'number'
      ? winery.id * 100 + (idx + 1)
      : 800000 + idx;

    const wineTitle = wine.name.toLowerCase().includes(winery.name.toLowerCase())
      ? `${wine.name}${wine.vintage ? ` ${wine.vintage}` : ''}`
      : `${winery.name} ${wine.name}${wine.vintage ? ` ${wine.vintage}` : ''}`;

    const wineColor = (wine.type || '').toLowerCase().includes('white')
      ? 'white'
      : (wine.type || '').toLowerCase().includes('sparkling') || (wine.type || '').toLowerCase().includes('champagne')
      ? 'sparkling'
      : (wine.type || '').toLowerCase().includes('rose') || (wine.type || '').toLowerCase().includes('rosé')
      ? 'rose'
      : 'red';

    return {
      id: numericId,
      name: wineTitle,
      winery: winery.name,
      brand: winery.name,
      wine_name: wine.name,
      vintage: wine.vintage,
      price: wine.price || 2800,
      originalPrice: wine.price ? Math.round(wine.price * 1.15) : 3200,
      color: wineColor,
      type: wine.type || 'Red',
      sub_type: 'Classic Estate',
      country: winery.country_name || 'Selected Vineyard',
      country_code: winery.country_code || 'us',
      countryCode: winery.country_code || 'us',
      region: winery.region_name || winery.address?.city || '',
      image: wine.image || winery.logo_image || winery.cover_image || '/images/wine_red.png',
      stock: 18,
      rating: wine.rating || winery.ratings_average || 4.5,
      ratings_count: wine.ratings_count || winery.ratings_count || 5,
      description: winery.description || '',
    };
  });
});

export const MOCK_PRODUCTS_POOL: Product[] = [
  ...FALLBACK_PRODUCTS,
  ...VIVINO_EXPLORE_PRODUCTS,
  ...WINERY_PRODUCTS,
];

export async function getProductReviewStatsMap(): Promise<Map<number, { count: number; avgRating: number }>> {
  const map = new Map<number, { count: number; avgRating: number }>();
  if (typeof window !== 'undefined') return map;

  const productRatings: Record<number, number[]> = {};

  try {
    const fs = await import('fs');
    const path = await import('path');
    const SHARED_REVIEWS_FILE = path.resolve('C:\\ProjectbottleClub1\\shared\\reviews.json');
    if (fs.existsSync(SHARED_REVIEWS_FILE)) {
      const data = fs.readFileSync(SHARED_REVIEWS_FILE, 'utf8');
      const list = JSON.parse(data) || [];
      if (Array.isArray(list)) {
        for (const r of list) {
          const pid = Number(r.product_id ?? r.productId ?? r.wine_id);
          if (pid && !isNaN(pid)) {
            const rating = Number(r.rating) || 5;
            if (!productRatings[pid]) productRatings[pid] = [];
            productRatings[pid].push(rating);
          }
        }
      }
    }
  } catch (err) {
    console.warn('[getProductReviewStatsMap] Failed reading reviews file:', err);
  }

  try {
    const { query } = await import('@/lib/db');
    const res = await query(
      `SELECT product_id, rating FROM product_reviews WHERE (is_approved IS NULL OR is_approved = true)`
    );
    if (res?.rows && Array.isArray(res.rows)) {
      for (const row of res.rows) {
        const pid = Number(row.product_id);
        if (pid && !isNaN(pid)) {
          const rating = Number(row.rating) || 5;
          if (!productRatings[pid]) productRatings[pid] = [];
          productRatings[pid].push(rating);
        }
      }
    }
  } catch {}

  for (const [pidStr, ratings] of Object.entries(productRatings)) {
    const pid = Number(pidStr);
    const count = ratings.length;
    const avgRating = Number((ratings.reduce((a, b) => a + b, 0) / count).toFixed(1));
    map.set(pid, { count, avgRating });
  }

  return map;
}

/**
 * Look up a wine product in /product to get real customer reviews & rating stats
 */
export async function lookupProductReviewForWine(wineName: string, producer?: string) {
  const reviewStats = await getProductReviewStatsMap();

  const cleanName = (wineName || '').toLowerCase().trim();
  const cleanProducer = (producer || '').toLowerCase().trim();

  // Combine Vivino explore wines and winery catalog wines
  const allPool = [...VIVINO_EXPLORE_PRODUCTS, ...WINERY_PRODUCTS];

  // Try exact or close match
  let matched = allPool.find((p) => {
    const pName = (p.name || '').toLowerCase();
    const pWinery = (p.winery || p.brand || '').toLowerCase();
    const pWineName = (p.wine_name || '').toLowerCase();

    if (cleanProducer && (pWinery.includes(cleanProducer) || cleanProducer.includes(pWinery))) {
      if (cleanName.includes(pWineName) || pName.includes(cleanName) || cleanName.includes(pName)) {
        return true;
      }
    }
    if (pName === cleanName || pName.includes(cleanName) || cleanName.includes(pName)) {
      return true;
    }
    return false;
  });

  // If not matched, try token-based matching
  if (!matched && cleanName) {
    const words = cleanName.split(/\s+/).filter((w) => w.length > 2);
    matched = allPool.find((p) => {
      const pName = (p.name || '').toLowerCase();
      const matchCount = words.filter((w) => pName.includes(w)).length;
      return matchCount >= Math.min(2, words.length);
    });
  }

  if (matched) {
    const stats = reviewStats.get(Number(matched.id));
    return {
      found: true,
      productId: matched.id,
      productName: matched.name,
      rating: stats ? stats.avgRating : (matched.rating || 4.5),
      ratingsCount: stats ? stats.count : (matched.ratings_count || 5),
      hasCustomerReviews: !!stats && stats.count > 0,
      source: 'product_reviews' as const,
    };
  }

  return {
    found: false,
    rating: 0,
    ratingsCount: 0,
    hasCustomerReviews: false,
    source: 'none' as const,
  };
}

export async function getWineProducts(params: WineProductQueryParams = {}): Promise<PaginatedProductsResult> {
  const {
    search,
    category,
    countries,
    brands,
    page = 1,
    per_page = 24,
    sort,
    token,
  } = params;

  const reviewStats = await getProductReviewStatsMap();
  const applyReviewStats = (p: Product): Product => {
    const stats = reviewStats.get(Number(p.id));
    return {
      ...p,
      rating: stats ? stats.avgRating : (p.rating || 0),
      ratings_count: stats ? stats.count : (p.ratings_count || 0),
      badge: undefined,
    };
  };

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    'https://api.wayneven.uk';

  const queryParams = new URLSearchParams();
  queryParams.set('page', String(page));
  queryParams.set('per_page', String(per_page));

  if (search && search.trim()) {
    queryParams.set('search', search.trim());
  }
  if (category && category !== 'all') {
    queryParams.set('category', category.trim());
  }
  if (countries && countries !== 'all') {
    queryParams.set('countries', countries.trim());
  }
  if (brands && brands !== 'all') {
    queryParams.set('brands', brands.trim());
  }

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token.replace(/^Bearer\s+/i, '')}`;
    headers['X-Branch-Id'] = '1';
  }

  const isServer = typeof window === 'undefined';
  const url = `${API_BASE_URL}/api/v1/wine-products/?${queryParams.toString()}`;

  let apiErrorDetail: string | null = null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    let response: Response;
    try {
      response = await fetch(url, {
        headers,
        signal: controller.signal,
        ...(isServer ? { next: { revalidate: 60 } } : { cache: 'no-store' }),
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (response.ok) {
      const json = await response.json();
      const dataObj = json?.data || {};
      const rawItems = Array.isArray(dataObj.items)
        ? dataObj.items
        : (Array.isArray(json?.data) ? json.data : []);

      // If backend actually has items, map and return them; otherwise smoothly fall through to MOCK_PRODUCTS_POOL
      if (rawItems && rawItems.length > 0) {
        const total = Number(dataObj.total ?? json?.meta?.total ?? rawItems.length);
        const currentPage = Number(dataObj.page ?? json?.meta?.page ?? page);
        const currentPerPage = Number(dataObj.per_page ?? json?.meta?.per_page ?? per_page);
        const totalPages = Number(dataObj.pages ?? Math.ceil(total / (currentPerPage || 1)) ?? 1);

        let products: Product[] = rawItems
          .map((item: any) => mapWineItemToProduct(item, !!token, API_BASE_URL))
          .map(applyReviewStats);

        if (params.min_rating && params.min_rating > 0) {
          products = products.filter((p) => (p.rating || 0) >= params.min_rating!);
        }
        if (params.max_price && params.max_price > 0) {
          products = products.filter((p) => p.price <= params.max_price!);
        }
        if (params.min_price && params.min_price > 0) {
          products = products.filter((p) => p.price >= params.min_price!);
        }
        if (params.types && params.types.length > 0) {
          products = products.filter((p) => {
            const prodType = (p.type || '').toLowerCase();
            const color = (p.color || '').toLowerCase();
            return params.types!.some((t) => {
              const lowerT = t.toLowerCase();
              if (lowerT === 'rosé' || lowerT === 'rose') {
                return prodType.includes('rosé') || prodType.includes('rose') || color === 'rose';
              }
              if (lowerT === 'sparkling') {
                return prodType.includes('sparkling') || prodType.includes('champagne') || color === 'sparkling';
              }
              if (lowerT === 'red') {
                return prodType.includes('red') || color === 'red';
              }
              if (lowerT === 'white') {
                return prodType.includes('white') || color === 'white';
              }
              return prodType.includes(lowerT);
            });
          });
        }

        if (sort === 'rating' || sort === 'highest-rated') {
          products.sort((a: Product, b: Product) => (b.rating || 0) - (a.rating || 0));
        } else if (sort === 'popular') {
          products.sort((a: Product, b: Product) => (b.ratings_count || 0) - (a.ratings_count || 0));
        } else if (sort === 'price-asc') {
          products.sort((a: Product, b: Product) => a.price - b.price);
        } else if (sort === 'price-desc') {
          products.sort((a: Product, b: Product) => b.price - a.price);
        } else if (sort === 'name') {
          products.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
        }

        return {
          products,
          total,
          page: currentPage,
          per_page: currentPerPage,
          pages: totalPages,
          source: 'api.wayneven.uk',
          apiError: null,
        };
      }
    } else {
      try {
        const errJson = await response.json();
        apiErrorDetail = `HTTP ${response.status} (${errJson.code || 'ERROR'}): ${errJson.detail || response.statusText}`;
      } catch {
        apiErrorDetail = `HTTP ${response.status}: ${response.statusText}`;
      }
      console.warn(`[getWineProducts] API ${url} returned error:`, apiErrorDetail);
    }
  } catch (error) {
    if (!apiErrorDetail) {
      apiErrorDetail = error instanceof Error ? error.message : String(error);
    }
    console.warn('[getWineProducts] API fetch failed or timed out:', error);
  }

  // Fallback to rich MOCK_PRODUCTS_POOL (130+ iconic wines) when API is pending or empty
  const pool = MOCK_PRODUCTS_POOL.map(applyReviewStats);
  let filtered = filterProducts(pool, search);
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.type?.toLowerCase().includes(category.toLowerCase()));
  }
  if (params.types && params.types.length > 0) {
    filtered = filtered.filter((p) => {
      const prodType = (p.type || '').toLowerCase();
      const color = (p.color || '').toLowerCase();
      return params.types!.some((t) => {
        const lowerT = t.toLowerCase();
        if (lowerT === 'rosé' || lowerT === 'rose') {
          return prodType.includes('rosé') || prodType.includes('rose') || color === 'rose';
        }
        if (lowerT === 'sparkling') {
          return prodType.includes('sparkling') || prodType.includes('champagne') || color === 'sparkling';
        }
        if (lowerT === 'red') {
          return prodType.includes('red') || color === 'red';
        }
        if (lowerT === 'white') {
          return prodType.includes('white') || color === 'white';
        }
        return prodType.includes(lowerT);
      });
    });
  }
  if (countries && countries !== 'all') {
    filtered = filtered.filter((p) =>
      p.country?.toLowerCase().includes(countries.toLowerCase()) ||
      p.country_code?.toLowerCase() === countries.toLowerCase() ||
      p.countryCode?.toLowerCase() === countries.toLowerCase()
    );
  }
  if (params.min_rating && params.min_rating > 0) {
    filtered = filtered.filter((p) => (p.rating || 0) >= params.min_rating!);
  }
  if (params.max_price && params.max_price > 0) {
    filtered = filtered.filter((p) => p.price <= params.max_price!);
  }
  if (params.min_price && params.min_price > 0) {
    filtered = filtered.filter((p) => p.price >= params.min_price!);
  }
  if (params.natural_only) {
    filtered = filtered.filter((p) => p.is_natural);
  }
  if (params.discount_only) {
    filtered = filtered.filter((p) => p.discount || (p.originalPrice && p.originalPrice > p.price));
  }
  if (sort === 'rating' || sort === 'highest-rated') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }
  const total = filtered.length;
  const startIndex = (page - 1) * per_page;
  const paginated = filtered.slice(startIndex, startIndex + per_page);

  return {
    products: paginated,
    total,
    page,
    per_page,
    pages: Math.ceil(total / per_page) || 1,
    source: 'fallback',
    apiError: apiErrorDetail,
  };
}

export async function getProducts(query?: string, token?: string): Promise<Product[]> {
  const result = await getWineProducts({
    search: query,
    per_page: 50,
    token,
  });
  return result.products;
}

export async function getProductById(id: number, token?: string): Promise<Product | null> {
  const isAuth = !!token;
  const reviewStats = await getProductReviewStatsMap();
  const stats = reviewStats.get(Number(id));

  const applyStats = (p: Product): Product => ({
    ...p,
    rating: stats ? stats.avgRating : (p.rating || 4.7),
    ratings_count: stats ? stats.count : (p.ratings_count || 18),
    badge: undefined,
  });

  const poolFound = MOCK_PRODUCTS_POOL.find((p) => p.id === Number(id));
  if (poolFound) {
    return applyStats(poolFound);
  }

  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.API_URL ||
      'https://api.wayneven.uk';

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token.replace(/^Bearer\s+/i, '')}`;
      headers['X-Branch-Id'] = '1';
    }

    try {
      // 1. Fetch by id from Wayneven Wine Products (public endpoint)
      const res = await fetch(`${API_BASE_URL}/api/v1/wine-products/${id}`, {
        headers,
        cache: 'no-store',
      });

      if (res.ok) {
        const raw = await res.json();
        const item = raw?.data || raw;
        if (item && (item.id || item.product_name || item.name)) {
          return applyStats(mapWineItemToProduct(item, isAuth, API_BASE_URL));
        }
      }

      // 2. Fetch by id from Wayneven Catalog Products (fallback with token)
      const effectiveToken = token || (await getWaynevenApiToken());
      if (effectiveToken) {
        const catHeaders: Record<string, string> = {
          Accept: 'application/json',
          Authorization: `Bearer ${effectiveToken.replace(/^Bearer\s+/i, '')}`,
          'X-Branch-Id': '1',
        };
        const catRes = await fetch(`${API_BASE_URL}/api/v1/catalog/products/${id}`, {
          headers: catHeaders,
          cache: 'no-store',
        });
        if (catRes.ok) {
          const raw = await catRes.json();
          const item = raw?.data || raw;
          if (item && (item.id || item.product_name || item.name)) {
            return applyStats(mapWineItemToProduct(item, isAuth, API_BASE_URL));
          }
        }
      }
    } catch (err) {
      console.warn(`Could not fetch wine by id ${id} from Wayneven API:`, err);
    }

    // Fallback to VIVINO_EXPLORE_PRODUCTS or FALLBACK_PRODUCTS
    const fallbackExplore = VIVINO_EXPLORE_PRODUCTS.find((p) => p.id === Number(id));
    if (fallbackExplore) {
      return applyStats(fallbackExplore);
    }
    const fallbackFound = FALLBACK_PRODUCTS.find((p) => p.id === Number(id));
    if (fallbackFound) {
      const sanitized = sanitizeProductsForAuth([fallbackFound], isAuth)[0];
      return sanitized ? applyStats(sanitized) : null;
    }

    // Check local database if running server-side
    if (typeof window === 'undefined') {
      try {
        const { query } = await import('@/lib/db');
        const dbRes = await query('SELECT * FROM products WHERE id = $1 LIMIT 1', [Number(id)]);
        if (dbRes.rows && dbRes.rows.length > 0) {
          const r = dbRes.rows[0];
          const dbProduct: Product = {
            id: Number(r.id),
            name: String(r.name),
            price: Number(r.price) || 0,
            stock: Number(r.stock) || 0,
            color: 'red',
            type: 'Wine',
            sub_type: 'Classic',
            region: 'Selected Vineyard',
            countryCode: 'fr',
            description: 'ไวน์ชั้นเลิศคัดสรรพิเศษสำหรับสมาชิก The Bottle Club',
            image: '/images/wine_red.png',
          };
          const sanitized = sanitizeProductsForAuth([dbProduct], isAuth)[0];
          return sanitized ? applyStats(sanitized) : null;
        }
      } catch {
        // non-fatal
      }
    }

    // Safe fallback to any mock product so no product page ever breaks while API is pending
    const safeFallback = MOCK_PRODUCTS_POOL[Math.abs(Number(id) || 1) % MOCK_PRODUCTS_POOL.length];
    return applyStats(safeFallback);
  } catch (error) {
    console.error('Failed to fetch product by id, using mock fallback:', error);
    const safeFallback = MOCK_PRODUCTS_POOL[Math.abs(Number(id) || 1) % MOCK_PRODUCTS_POOL.length];
    return applyStats(safeFallback);
  }
}

export async function getReviews(wineId: number): Promise<ProductReview[]> {
  try {
    if (typeof window === 'undefined') {
      try {
        const { query } = await import('@/lib/db');
        const res = await query(
          `SELECT pr.id, pr.product_id, pr.user_id, pr.user_name, pr.rating, pr.comment, pr.created_at
           FROM product_reviews pr
           WHERE pr.product_id = $1 AND (pr.is_approved IS NULL OR pr.is_approved = true)
           ORDER BY pr.created_at DESC`,
          [wineId]
        );
        return (res.rows || []).map((r: any) => ({
          id: r.id,
          wine_id: r.product_id,
          user_id: r.user_id,
          username: r.user_name || 'Member',
          rating: r.rating,
          comment: r.comment,
          images: [],
          videos: [],
          created_at: r.created_at?.toISOString ? r.created_at.toISOString() : String(r.created_at),
        }));
      } catch {
        return [];
      }
    }

    const response = await fetch(`/api/reviews?wine_id=${wineId}`, { cache: 'no-store' });
    if (!response.ok) return [];
    const data = await response.json();
    const rawList = Array.isArray(data) ? data : data.reviews ?? data.data ?? [];
    return rawList.map((r: any) => ({
      id: r.id,
      wine_id: r.wine_id ?? r.product_id ?? r.productId ?? wineId,
      user_id: r.user_id ?? r.userId ?? 'member',
      username: r.username || r.user_name || r.userName || r.customer_name || 'ลูกค้าสมาชิก',
      rating: Number(r.rating) || 5,
      comment: r.comment || '',
      images: Array.isArray(r.images) ? r.images : [],
      videos: Array.isArray(r.videos) ? r.videos : [],
      created_at: r.created_at || r.createdAt || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return [];
  }
}

export type CreateReviewResult =
  | { ok: true; review: ProductReview }
  | { ok: false; status: number; message: string };

export async function createReview(
  payload: {
    wine_id: number;
    user_id: string;
    username: string;
    rating: number;
    comment: string;
    product_name?: string;
    images?: string[];
    videos?: string[];
  }
): Promise<CreateReviewResult> {
  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wine_id: Number(payload.wine_id),
        user_id: payload.user_id,
        username: payload.username,
        rating: Number(payload.rating),
        comment: payload.comment,
        product_name: payload.product_name,
        images: payload.images ?? [],
        videos: payload.videos ?? [],
      }),
    });

    if (response.ok) {
      const review: ProductReview = await response.json();
      return { ok: true, review };
    }

    let message = 'เกิดข้อผิดพลาด กรุณาลองใหม่';
    try {
      const err = await response.json();
      message = err?.detail || err?.message || message;
    } catch {/* ignore */}

    return { ok: false, status: response.status, message };
  } catch (error) {
    console.error('Failed to create review:', error);
    return { ok: false, status: 0, message: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้' };
  }
}