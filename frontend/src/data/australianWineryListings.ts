import type { Winery } from './wineriesData';

type WineryRow = [slug: string, name: string, region: string, rating: number, ratings: number, wines: number, cover: string, logo: string, coverExtension?: 'png' | 'jpeg'];

const rows: WineryRow[] = [
  ['penfolds','Penfolds','South Australia',4.0,466939,212,'fEuTUVqOQAmngbrObtbaMw','1305/logos/UQo_d14XQCi9iiLfqjdlSg.jpeg'],
  ['jacob-s-creek',"Jacob's Creek",'Barossa',3.5,253375,280,'S98i-Ji1RWSMVcjvl6zpaw','6806/logos/vpFqcEe6STembSQvnr-ctQ.jpeg'],
  ['hardys','Hardys','South Australia',3.5,198454,391,'aEQGH2QlR66VbUh4qlg_qg','8074/logos/aI433mcsRsO4km64yB_DGw.jpeg'],
  ['grant-burge-wines','Grant Burge Wines','Barossa',3.8,111735,217,'2GMv9TmKQ_WgY6Kl9nKbCw','1667/logos/YGrR7mhsQJChpz8j-vuAKQ.jpeg'],
  ['de-bortoli','De Bortoli','New South Wales',3.5,107041,585,'RPZKePKMT62TLIccU2GnJg','2114/logos/gu26zjbjRHCc37zw-eEZLA.jpeg'],
  ['st-hallett','St Hallett','Barossa',3.8,33947,72,'H9aLwkSQQ_q5oV3WJJ1lqw','1924/logos/9HgmSJbIQl6rNKDm4QqDJQ.jpeg'],
  ['st-hugo','St Hugo','Barossa Valley',4.1,24393,44,'Y6s3CnewQiWtf1IAcECBdg','236437/logos/oiz5Z-zPQPGfhwxEnE8uWQ.jpeg'],
  ['little-giant-barossa','Little Giant','Barossa',4.0,17892,32,'634OjjhtQuipqhTIu-H6Yw','261910/logos/iAsahMHsTdG8BeGKyKvINg.jpeg'],
  ['petaluma','Petaluma','Mount Lofty Ranges',3.9,13522,51,'udyrZQ2qQO6cYnjFarPYWQ','1974/logos/qgSzgnBnTQyqf8PbD8swrg.jpeg'],
  ['flavabom','Flavabom','Riverland',4.0,5610,6,'BadDHBNKRq-KkWkfMOA--g','226218/logos/Hz3nHYPiQY-4iW5EybDH4g.jpeg'],
  ['eight-at-the-gate','Eight at the Gate','Wrattonbully',4.2,1520,13,'FMBID9uZSrKUNgyPJSnJyw','272274/logos/H3sYrPA9QI6uOKT9gA8QWw.jpeg'],
  ['the-champion','The Champion','South Eastern Australia',3.9,512,1,'e2ToaiF5Qjukv6XR3VZSBw','242588/logos/pHly9YOgQPynm8xNSg7fsg.png','png'],
  ['boomballou','Boomballou','Riverland',4.1,188,4,'1wqD3bf-QS6S_I9_jvP3gA','321802/logos/083dFkwpQwK5bFpLFuV01g.jpeg'],
];

function makeWinery([slug, name, region, rating, ratings, wines, cover, logo, coverExtension = 'jpeg']: WineryRow, index: number): Winery {
  return {
    id: 600000 + index,
    name,
    seo_name: slug,
    business_name: name,
    description: `${name} winery in ${region}, Australia.`,
    cover_image: `https://thumbs.vivino.com/wineries/sponsorship_cards/${cover}_600x356.${coverExtension}`,
    logo_image: `https://images.vivino.com/wineries/${logo}`,
    ratings_average: rating,
    ratings_count: ratings,
    wines_count: wines,
    labels_count: ratings * 10,
    region_id: index,
    region_name: region,
    country_code: 'au',
    country_name: 'Australia',
    website: `https://www.vivino.com/en/wineries/${slug}`,
    winemaker: '',
    phone: '',
    email: '',
    facebook: '',
    instagram: '',
    is_claimed: false,
    address: { city: region, state: region, country: 'Australia' },
    wines: [],
  };
}

export const AUSTRALIAN_WINERY_LISTINGS = rows.map(makeWinery);
