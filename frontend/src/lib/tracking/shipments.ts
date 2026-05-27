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
  us: { coords: [40.6413, -73.7781], nameTh: 'นิวยอร์ก (JFK) — สหรัฐอเมริกา', nameEn: 'JFK Airport — New York, USA' },
  eu: { coords: [50.0379, 8.5622], nameTh: 'แฟรงก์เฟิร์ต — เยอรมนี (ยุโรป)', nameEn: 'Frankfurt — Germany, Europe' },
};

function lerpRoute(points: [number, number][], steps = 8): [number, number][] {
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
    [12.0, 102.0],
    [15.0, 108.0],
    [20.0, 114.0],
    [25.0, 118.0],
  ]),
  jp_air: buildExportRoute(BKK_AIRPORT, DESTINATIONS.jp.coords, [
    [18.0, 110.0],
    [24.0, 118.0],
    [30.0, 128.0],
  ]),
  gb_air: buildExportRoute(BKK_AIRPORT, DESTINATIONS.gb.coords, [
    [20.0, 95.0],
    [30.0, 70.0],
    [40.0, 50.0],
  ]),
  ru_air: buildExportRoute(BKK_AIRPORT, DESTINATIONS.ru.coords, [
    [22.0, 92.0],
    [35.0, 75.0],
    [48.0, 55.0],
  ]),
  us_air: buildExportRoute(BKK_AIRPORT, DESTINATIONS.us.coords, [
    [25.0, 120.0],
    [40.0, 150.0],
    [45.0, -160.0],
    [42.0, -110.0],
  ]),
  eu_air: buildExportRoute(BKK_AIRPORT, DESTINATIONS.eu.coords, [
    [20.0, 85.0],
    [35.0, 60.0],
    [48.0, 30.0],
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
  { id: 'us', flag: '🇺🇸', labelTh: 'สหรัฐอเมริกา', labelEn: 'United States' },
  { id: 'eu', flag: '🇪🇺', labelTh: 'เยอรมนี (ยุโรป)', labelEn: 'Germany (Europe)' },
];

export const DEMO_TRACKING_IDS: { id: string; labelTh: string; labelEn: string }[] = [
  { id: 'TBC-DOM-LOCAL-TH-001', labelTh: 'DHL Express · ในประเทศ', labelEn: 'DHL Express · Domestic' },
  { id: 'TBC-EXP-AIR-US-002', labelTh: 'FedEx Premium · สหรัฐอเมริกา', labelEn: 'FedEx Premium · USA' },
  { id: 'TBC-EXP-AIR-EU-003', labelTh: 'UPS Worldwide · ยุโรป', labelEn: 'UPS Worldwide · Europe' },
  { id: 'TBC-EXP-SEA-CN-001', labelTh: 'Cainiao Logistics · จีน (เรือ)', labelEn: 'Cainiao Logistics · China (sea)' },
  { id: 'TBC-EXP-AIR-JP-001', labelTh: 'Thailand Post EMS · ญี่ปุ่น', labelEn: 'Thailand Post EMS · Japan' },
  { id: 'TBC-EXP-AIR-GB-001', labelTh: 'YunExpress · สหราชอาณาจักร', labelEn: 'YunExpress · United Kingdom' },
];

const SHIPMENT_CATALOG: Record<string, Shipment> = {
  'TBC-DOM-LOCAL-TH-001': {
    id: 'TBC-DOM-LOCAL-TH-001',
    direction: 'domestic',
    mode: 'local',
    destinationCountry: 'th',
    route: TH_LOCAL_ROUTE,
    originName: 'คลังสินค้า The Bottle Club (กรุงเทพฯ)',
    originNameEn: 'The Bottle Club Warehouse (Bangkok)',
    destinationName: 'บ้านคุณลูกค้า (กรุงเทพฯ)',
    destinationNameEn: 'Customer Residence (Bangkok)',
    carrier: 'DHL Express',
    carrierEn: 'DHL Express',
    itemCount: 2,
    etaUnit: 'minutes',
    etaTotal: 25,
    progressSpeed: 0.015,
    insuranceStatus: '฿15,000 Insured Coverage',
    customsStatus: 'none',
    deliveryAttempt: '1st Attempt in Progress',
    timeline: [
      { key: 'tracking.status.order_received', time: '08:00' },
      { key: 'tracking.status.processing', time: '08:30' },
      { key: 'tracking.status.in_warehouse', time: '09:00' },
      { key: 'tracking.status.departed_origin', time: '09:15' },
      { key: 'tracking.status.in_transit', time: '10:00' },
      { key: 'tracking.status.out_for_delivery', time: 'tracking.live' },
      { key: 'tracking.status.delivered', time: '—' },
    ],
  },
  'TBC-EXP-AIR-US-002': {
    id: 'TBC-EXP-AIR-US-002',
    direction: 'export',
    mode: 'air',
    destinationCountry: 'us',
    route: EXPORT_ROUTES.us_air,
    originName: 'สนามบินสุวรรณภูมิ (BKK)',
    originNameEn: 'Suvarnabhumi Airport (BKK)',
    destinationName: DESTINATIONS.us.nameTh,
    destinationNameEn: DESTINATIONS.us.nameEn,
    carrier: 'FedEx API',
    carrierEn: 'FedEx API',
    itemCount: 6,
    etaUnit: 'hours',
    etaTotal: 22,
    progressSpeed: 0.008,
    insuranceStatus: '฿75,000 Global Wine Cover',
    customsStatus: 'cleared',
    deliveryAttempt: 'Scheduled Delivery',
    timeline: [
      { key: 'tracking.status.order_received', time: 'Yesterday 14:00' },
      { key: 'tracking.status.processing', time: 'Yesterday 16:30' },
      { key: 'tracking.status.in_warehouse', time: 'Yesterday 21:00' },
      { key: 'tracking.status.departed_origin', time: 'Today 02:00' },
      { key: 'tracking.status.customs_clearance', time: 'Today 06:00' },
      { key: 'tracking.status.in_transit', time: 'tracking.live' },
      { key: 'tracking.status.arrived_dest', time: '—' },
      { key: 'tracking.status.out_for_delivery', time: '—' },
      { key: 'tracking.status.delivered', time: '—' },
    ],
  },
  'TBC-EXP-AIR-EU-003': {
    id: 'TBC-EXP-AIR-EU-003',
    direction: 'export',
    mode: 'air',
    destinationCountry: 'eu',
    route: EXPORT_ROUTES.eu_air,
    originName: 'สนามบินสุวรรณภูมิ (BKK)',
    originNameEn: 'Suvarnabhumi Airport (BKK)',
    destinationName: DESTINATIONS.eu.nameTh,
    destinationNameEn: DESTINATIONS.eu.nameEn,
    carrier: 'UPS API',
    carrierEn: 'UPS API',
    itemCount: 4,
    etaUnit: 'hours',
    etaTotal: 16,
    progressSpeed: 0.012,
    insuranceStatus: '฿45,000 UPS Secure Protection',
    customsStatus: 'pending',
    deliveryAttempt: 'Border Clearance',
    timeline: [
      { key: 'tracking.status.order_received', time: 'Yesterday 18:00' },
      { key: 'tracking.status.processing', time: 'Yesterday 20:00' },
      { key: 'tracking.status.in_warehouse', time: 'Today 01:00' },
      { key: 'tracking.status.departed_origin', time: 'Today 04:30' },
      { key: 'tracking.status.in_transit', time: 'tracking.live' },
      { key: 'tracking.status.customs_clearance', time: '—' },
      { key: 'tracking.status.arrived_dest', time: '—' },
      { key: 'tracking.status.delivered', time: '—' },
    ],
  },
  'TBC-EXP-SEA-CN-001': {
    id: 'TBC-EXP-SEA-CN-001',
    direction: 'export',
    mode: 'sea',
    destinationCountry: 'cn',
    route: EXPORT_ROUTES.cn_sea,
    originName: 'ท่าเรือกรุงเทพฯ (คลองเตย)',
    originNameEn: 'Bangkok Port (Klong Toey)',
    destinationName: DESTINATIONS.cn.nameTh,
    destinationNameEn: DESTINATIONS.cn.nameEn,
    carrier: 'Cainiao (Alibaba Group)',
    carrierEn: 'Cainiao (Alibaba Group)',
    itemCount: 12,
    etaUnit: 'days',
    etaTotal: 14,
    progressSpeed: 0.005,
    insuranceStatus: '฿120,000 Enterprise Marine Insured',
    customsStatus: 'cleared',
    deliveryAttempt: 'Sea Transit Protocol',
    timeline: [
      { key: 'tracking.status.order_received', time: 'May 18, 10:00' },
      { key: 'tracking.status.processing', time: 'May 18, 14:00' },
      { key: 'tracking.status.in_warehouse', time: 'May 19, 09:00' },
      { key: 'tracking.status.departed_origin', time: 'May 20, 16:00' },
      { key: 'tracking.status.in_transit', time: 'tracking.live' },
      { key: 'tracking.status.customs_clearance', time: '—' },
      { key: 'tracking.status.arrived_dest', time: '—' },
      { key: 'tracking.status.delivered', time: '—' },
    ],
  },
  'TBC-EXP-AIR-JP-001': {
    id: 'TBC-EXP-AIR-JP-001',
    direction: 'export',
    mode: 'air',
    destinationCountry: 'jp',
    route: EXPORT_ROUTES.jp_air,
    originName: 'คลังคัดแยกสินค้าไปรษณีย์ไทย',
    originNameEn: 'Thailand Post Sorting Hub',
    destinationName: DESTINATIONS.jp.nameTh,
    destinationNameEn: DESTINATIONS.jp.nameEn,
    carrier: 'Thailand Post EMS',
    carrierEn: 'Thailand Post EMS',
    itemCount: 3,
    etaUnit: 'days',
    etaTotal: 4,
    progressSpeed: 0.010,
    insuranceStatus: '฿20,000 Standard Post Cover',
    customsStatus: 'cleared',
    deliveryAttempt: 'Fast Express Airmail',
    timeline: [
      { key: 'tracking.status.order_received', time: 'May 24, 08:00' },
      { key: 'tracking.status.processing', time: 'May 24, 11:30' },
      { key: 'tracking.status.in_warehouse', time: 'May 24, 17:00' },
      { key: 'tracking.status.departed_origin', time: 'May 25, 01:00' },
      { key: 'tracking.status.in_transit', time: 'tracking.live' },
      { key: 'tracking.status.customs_clearance', time: '—' },
      { key: 'tracking.status.arrived_dest', time: '—' },
      { key: 'tracking.status.delivered', time: '—' },
    ],
  },
  'TBC-EXP-AIR-GB-001': {
    id: 'TBC-EXP-AIR-GB-001',
    direction: 'export',
    mode: 'air',
    destinationCountry: 'gb',
    route: EXPORT_ROUTES.gb_air,
    originName: 'คลังส่งออก YunExpress (กรุงเทพฯ)',
    originNameEn: 'YunExpress Export Facility (BKK)',
    destinationName: DESTINATIONS.gb.nameTh,
    destinationNameEn: DESTINATIONS.gb.nameEn,
    carrier: 'YunExpress API',
    carrierEn: 'YunExpress API',
    itemCount: 8,
    etaUnit: 'days',
    etaTotal: 7,
    progressSpeed: 0.007,
    insuranceStatus: '฿50,000 Yun Premium Secured',
    customsStatus: 'cleared',
    deliveryAttempt: 'Direct Freight Carrier',
    timeline: [
      { key: 'tracking.status.order_received', time: 'May 22, 09:00' },
      { key: 'tracking.status.processing', time: 'May 22, 13:00' },
      { key: 'tracking.status.in_warehouse', time: 'May 23, 11:00' },
      { key: 'tracking.status.departed_origin', time: 'May 24, 05:00' },
      { key: 'tracking.status.in_transit', time: 'tracking.live' },
      { key: 'tracking.status.customs_clearance', time: '—' },
      { key: 'tracking.status.arrived_dest', time: '—' },
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

  const match = normalized.match(/^TBC-(DOM|EXP)-(SEA|AIR|LOCAL)-(TH|CN|JP|GB|RU|US|EU)-/i);
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
      US: 'us',
      EU: 'eu',
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
  if (!c) return country.toUpperCase();
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
