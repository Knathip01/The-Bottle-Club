import type { Shipment, ShipmentDirection, TrackingCountry, TransportMode } from './types';

const BKK_WH: [number, number] = [13.7367, 100.5231];
const BKK_AIRPORT: [number, number] = [13.69, 100.7501];
const BKK_HOME: [number, number] = [13.752, 100.543];

const DESTINATIONS: Record<
  Exclude<TrackingCountry, 'th'>,
  { coords: [number, number]; nameTh: string; nameEn: string }
> = {
  cn: { coords: [31.2304, 121.4737], nameTh: 'เซี่ยงไฮ้ — จีน', nameEn: 'Shanghai — China' },
  jp: { coords: [35.772, 140.393], nameTh: 'โตเกียว (นาริตะ) — ญี่ปุ่น', nameEn: 'Narita — Tokyo, Japan' },
  gb: { coords: [51.47, -0.4543], nameTh: 'ลอนดอน (ฮีทโธรว์) — UK', nameEn: 'Heathrow — London, UK' },
  ru: { coords: [55.7558, 37.6173], nameTh: 'มอสโก — รัสเซีย', nameEn: 'Moscow — Russia' },
};

function lerpRoute(points: [number, number][], steps = 6): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

function buildExportRoute(
  origin: [number, number],
  dest: [number, number],
  midpoints: [number, number][]
): [number, number][] {
  return lerpRoute([origin, ...midpoints, dest]);
}

export const TH_LOCAL_ROUTE = lerpRoute([BKK_WH, [13.738, 100.525], [13.748, 100.539], BKK_HOME]);

const EXPORT_ROUTES = {
  cn_sea: buildExportRoute(BKK_WH, DESTINATIONS.cn.coords, [
    [12, 102],
    [15, 108],
    [20, 114],
    [25, 118],
  ]),
  jp_air: buildExportRoute(BKK_AIRPORT, DESTINATIONS.jp.coords, [
    [18, 110],
    [24, 118],
    [30, 128],
  ]),
  gb_air: buildExportRoute(BKK_AIRPORT, DESTINATIONS.gb.coords, [
    [20, 95],
    [30, 70],
    [40, 50],
  ]),
  ru_air: buildExportRoute(BKK_AIRPORT, DESTINATIONS.ru.coords, [
    [22, 92],
    [35, 75],
    [48, 55],
  ]),
};

export const DELIVERY_ROUTE = TH_LOCAL_ROUTE;

export const EXPORT_DESTINATION_COUNTRIES: {
  id: Exclude<TrackingCountry, 'th'>;
  flag: string;
  labelTh: string;
  labelEn: string;
}[] = [
  { id: 'cn', flag: '🇨🇳', labelTh: 'จีน', labelEn: 'China' },
  { id: 'jp', flag: '🇯🇵', labelTh: 'ญี่ปุ่น', labelEn: 'Japan' },
  { id: 'gb', flag: '🇬🇧', labelTh: 'อังกฤษ', labelEn: 'United Kingdom' },
  { id: 'ru', flag: '🇷🇺', labelTh: 'รัสเซีย', labelEn: 'Russia' },
];

export const DEMO_TRACKING_IDS: { id: string; labelTh: string; labelEn: string }[] = [
  { id: 'TBC-DOM-LOCAL-TH-001', labelTh: 'ไทย · ส่งในประเทศ', labelEn: 'Thailand · Domestic' },
  { id: 'TBC-EXP-SEA-CN-001', labelTh: 'ส่งออก · จีน (เรือ)', labelEn: 'Export · China (sea)' },
  { id: 'TBC-EXP-AIR-JP-001', labelTh: 'ส่งออก · ญี่ปุ่น (เครื่องบิน)', labelEn: 'Export · Japan (air)' },
  { id: 'TBC-EXP-AIR-GB-001', labelTh: 'ส่งออก · UK (เครื่องบิน)', labelEn: 'Export · UK (air)' },
  { id: 'TBC-EXP-AIR-RU-001', labelTh: 'ส่งออก · รัสเซีย (เครื่องบิน)', labelEn: 'Export · Russia (air)' },
];

const SHIPMENT_CATALOG: Record<string, Shipment> = {
  'TBC-DOM-LOCAL-TH-001': {
    id: 'TBC-DOM-LOCAL-TH-001',
    direction: 'domestic',
    mode: 'local',
    destinationCountry: 'th',
    route: TH_LOCAL_ROUTE,
    originName: 'คลัง The Bottle Club — กรุงเทพฯ',
    originNameEn: 'The Bottle Club Warehouse — Bangkok',
    destinationName: 'บ้านลูกค้า — กรุงเทพฯ',
    destinationNameEn: 'Customer address — Bangkok',
    carrier: 'TBC Express · รถส่งในประเทศ',
    carrierEn: 'TBC Express · Local delivery',
    itemCount: 2,
    etaUnit: 'minutes',
    etaTotal: 18,
    progressSpeed: 0.008,
    timeline: [
      { key: 'tracking.status.processing', time: '08:30' },
      { key: 'tracking.status.shipped', time: '10:15' },
      { key: 'tracking.status.delivering', time: 'tracking.live' },
      { key: 'tracking.status.delivered', time: '—' },
    ],
  },
  'TBC-EXP-SEA-CN-001': {
    id: 'TBC-EXP-SEA-CN-001',
    direction: 'export',
    mode: 'sea',
    destinationCountry: 'cn',
    route: EXPORT_ROUTES.cn_sea,
    originName: 'ท่าเรือกรุงเทพฯ / คลัง TBC',
    originNameEn: 'Bangkok Port / TBC Warehouse',
    destinationName: DESTINATIONS.cn.nameTh,
    destinationNameEn: DESTINATIONS.cn.nameEn,
    carrier: 'TBC Maritime · COSCO Partner',
    carrierEn: 'TBC Maritime · COSCO Partner',
    itemCount: 12,
    etaUnit: 'days',
    etaTotal: 16,
    progressSpeed: 0.003,
    timeline: [
      { key: 'tracking.export.ready', time: 'Day 0' },
      { key: 'tracking.sea.departed', time: 'Day 2' },
      { key: 'tracking.sea.ocean', time: 'Day 8' },
      { key: 'tracking.export.arrived_dest', time: 'tracking.live' },
      { key: 'tracking.status.delivered', time: '—' },
    ],
  },
  'TBC-EXP-AIR-JP-001': {
    id: 'TBC-EXP-AIR-JP-001',
    direction: 'export',
    mode: 'air',
    destinationCountry: 'jp',
    route: EXPORT_ROUTES.jp_air,
    originName: 'สนามบินสุวรรณภูมิ — กรุงเทพฯ',
    originNameEn: 'Suvarnabhumi Airport — Bangkok',
    destinationName: DESTINATIONS.jp.nameTh,
    destinationNameEn: DESTINATIONS.jp.nameEn,
    carrier: 'Thai Cargo · TG6402',
    carrierEn: 'Thai Cargo · TG6402',
    itemCount: 4,
    etaUnit: 'hours',
    etaTotal: 6,
    progressSpeed: 0.006,
    timeline: [
      { key: 'tracking.export.ready', time: '06:00' },
      { key: 'tracking.air.departed', time: '08:00' },
      { key: 'tracking.air.in_flight', time: 'tracking.live' },
      { key: 'tracking.export.arrived_dest', time: '—' },
      { key: 'tracking.status.delivered', time: '—' },
    ],
  },
  'TBC-EXP-AIR-GB-001': {
    id: 'TBC-EXP-AIR-GB-001',
    direction: 'export',
    mode: 'air',
    destinationCountry: 'gb',
    route: EXPORT_ROUTES.gb_air,
    originName: 'สนามบินสุวรรณภูมิ — กรุงเทพฯ',
    originNameEn: 'Suvarnabhumi Airport — Bangkok',
    destinationName: DESTINATIONS.gb.nameTh,
    destinationNameEn: DESTINATIONS.gb.nameEn,
    carrier: 'TBC Air Cargo · BA6911',
    carrierEn: 'TBC Air Cargo · BA6911',
    itemCount: 8,
    etaUnit: 'hours',
    etaTotal: 14,
    progressSpeed: 0.005,
    timeline: [
      { key: 'tracking.export.ready', time: '20:00' },
      { key: 'tracking.air.departed', time: '22:30' },
      { key: 'tracking.air.in_flight', time: 'tracking.live' },
      { key: 'tracking.export.arrived_dest', time: '—' },
      { key: 'tracking.status.delivered', time: '—' },
    ],
  },
  'TBC-EXP-AIR-RU-001': {
    id: 'TBC-EXP-AIR-RU-001',
    direction: 'export',
    mode: 'air',
    destinationCountry: 'ru',
    route: EXPORT_ROUTES.ru_air,
    originName: 'สนามบินสุวรรณภูมิ — กรุงเทพฯ',
    originNameEn: 'Suvarnabhumi Airport — Bangkok',
    destinationName: DESTINATIONS.ru.nameTh,
    destinationNameEn: DESTINATIONS.ru.nameEn,
    carrier: 'TBC Air Cargo · SU271',
    carrierEn: 'TBC Air Cargo · SU271',
    itemCount: 5,
    etaUnit: 'hours',
    etaTotal: 12,
    progressSpeed: 0.005,
    timeline: [
      { key: 'tracking.export.ready', time: '12:00' },
      { key: 'tracking.air.departed', time: '14:00' },
      { key: 'tracking.air.in_flight', time: 'tracking.live' },
      { key: 'tracking.export.arrived_dest', time: '—' },
      { key: 'tracking.status.delivered', time: '—' },
    ],
  },
};

function buildFromSelection(
  direction: ShipmentDirection,
  mode: TransportMode,
  destinationCountry: TrackingCountry
): Shipment | null {
  const found = Object.values(SHIPMENT_CATALOG).find(
    (s) =>
      s.direction === direction &&
      s.mode === mode &&
      s.destinationCountry === destinationCountry
  );
  return found ? { ...found } : null;
}

const LEGACY_ID_MAP: Record<string, string> = {
  'TBC-TH-LOCAL-001': 'TBC-DOM-LOCAL-TH-001',
  'TBC-SEA-CN-001': 'TBC-EXP-SEA-CN-001',
  'TBC-AIR-JP-001': 'TBC-EXP-AIR-JP-001',
  'TBC-AIR-GB-001': 'TBC-EXP-AIR-GB-001',
  'TBC-AIR-RU-001': 'TBC-EXP-AIR-RU-001',
};

export function resolveShipment(
  trackingId: string,
  mode?: TransportMode,
  destinationCountry?: TrackingCountry,
  direction?: ShipmentDirection
): Shipment | null {
  let normalized = trackingId.trim().toUpperCase();
  if (LEGACY_ID_MAP[normalized]) normalized = LEGACY_ID_MAP[normalized];

  if (SHIPMENT_CATALOG[normalized]) {
    return { ...SHIPMENT_CATALOG[normalized] };
  }

  const match = normalized.match(/^TBC-(DOM|EXP)-(SEA|AIR|LOCAL)-(TH|CN|JP|GB|RU)-/i);
  if (match) {
    const parsedDirection: ShipmentDirection =
      match[1].toUpperCase() === 'EXP' ? 'export' : 'domestic';
    const parsedMode: TransportMode =
      match[2].toUpperCase() === 'SEA'
        ? 'sea'
        : match[2].toUpperCase() === 'AIR'
          ? 'air'
          : 'local';
    const countryMap: Record<string, TrackingCountry> = {
      TH: 'th',
      CN: 'cn',
      JP: 'jp',
      GB: 'gb',
      RU: 'ru',
    };
    const parsedDest = countryMap[match[3].toUpperCase()];
    const found = Object.values(SHIPMENT_CATALOG).find(
      (s) =>
        s.direction === parsedDirection &&
        s.mode === parsedMode &&
        s.destinationCountry === parsedDest
    );
    if (found) return { ...found, id: normalized };
  }

  if (direction && mode && destinationCountry) {
    const built = buildFromSelection(direction, mode, destinationCountry);
    if (built) {
      return { ...built, id: normalized && normalized !== 'PREVIEW' ? normalized : built.id };
    }
  }

  return null;
}

export function getDestinationLabel(country: TrackingCountry, lang: 'th' | 'en') {
  if (country === 'th') return lang === 'th' ? 'ไทย' : 'Thailand';
  const c = EXPORT_DESTINATION_COUNTRIES.find((x) => x.id === country);
  if (!c) return country;
  return lang === 'th' ? c.labelTh : c.labelEn;
}

export function getModeLabel(mode: TransportMode, lang: 'th' | 'en') {
  const labels: Record<TransportMode, { th: string; en: string }> = {
    sea: { th: 'เรือ', en: 'Sea freight' },
    air: { th: 'เครื่องบิน', en: 'Air freight' },
    local: { th: 'ส่งในประเทศ', en: 'Local delivery' },
  };
  return lang === 'th' ? labels[mode].th : labels[mode].en;
}

export function getOnTheWayLabel(
  mode: TransportMode,
  direction: ShipmentDirection,
  lang: 'th' | 'en'
) {
  if (direction === 'export') {
    if (mode === 'sea') return lang === 'th' ? 'กำลังส่งออกทางเรือ' : 'Export in transit (sea)';
    if (mode === 'air') return lang === 'th' ? 'กำลังส่งออกทางอากาศ' : 'Export in transit (air)';
  }
  if (mode === 'sea') return lang === 'th' ? 'กำลังขนส่งทางเรือ' : 'In transit by sea';
  if (mode === 'air') return lang === 'th' ? 'กำลังบินระหว่างทาง' : 'In flight';
  return lang === 'th' ? 'กำลังจัดส่ง' : 'Out for delivery';
}

export function formatEta(
  progress: number,
  shipment: Shipment,
  lang: 'th' | 'en'
): { primary: string; secondary: string } {
  const remaining = Math.max(0.02, 1 - progress);
  const value = Math.max(1, Math.ceil(remaining * shipment.etaTotal));

  if (shipment.etaUnit === 'minutes') {
    const d = new Date();
    d.setMinutes(d.getMinutes() + value);
    const time = d.toLocaleTimeString(lang === 'th' ? 'th-TH' : 'en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return {
      primary: time,
      secondary: lang === 'th' ? `~${value} นาที` : `~${value} mins`,
    };
  }

  if (shipment.etaUnit === 'hours') {
    return {
      primary: lang === 'th' ? `${value} ชม.` : `${value} hrs`,
      secondary: lang === 'th' ? 'ส่งออกทางอากาศ' : 'Export by air',
    };
  }

  return {
    primary: lang === 'th' ? `${value} วัน` : `${value} days`,
    secondary: lang === 'th' ? 'ส่งออกทางเรือ' : 'Export by sea',
  };
}

/** @deprecated use getDestinationLabel */
export const getCountryLabel = getDestinationLabel;

export type {
  Shipment,
  ShipmentDirection,
  TrackingCountry,
  TransportMode,
  TrackingApiResponse,
  TrackShipmentInput,
} from './types';
