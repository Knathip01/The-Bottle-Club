import { resolveShipment } from './shipments';
import type {
  Shipment,
  TrackShipmentInput,
  TrackingApiResponse,
  TransportMode,
  TrackingCountry,
} from './types';

function hashProgressSeed(trackingNumber: string): number {
  let h = 0;
  for (let i = 0; i < trackingNumber.length; i++) {
    h = (h + trackingNumber.charCodeAt(i) * (i + 1)) % 1000;
  }
  return h / 1000;
}

export function getSimulatedProgress(trackingNumber: string): number {
  const base = 0.35 + hashProgressSeed(trackingNumber) * 0.45;
  const drift = ((Date.now() / 120000) % 1) * 0.08;
  return Math.min(0.97, base + drift);
}

function deriveStatus(progress: number): TrackingApiResponse['status'] {
  if (progress >= 0.95) return 'delivered';
  if (progress >= 0.75) return 'out_for_delivery';
  if (progress >= 0.5) return 'customs';
  if (progress >= 0.15) return 'in_transit';
  return 'processing';
}

export function shipmentToApiResponse(
  shipment: Shipment,
  progress = getSimulatedProgress(shipment.id)
): TrackingApiResponse {
  const route = shipment.route;
  const origin = route[0];
  const destination = route[route.length - 1];
  const remaining = Math.max(1, Math.ceil((1 - progress) * shipment.etaTotal));
  const timelineLen = shipment.timeline.length;

  return {
    tracking_number: shipment.id,
    status: deriveStatus(progress),
    direction: shipment.direction,
    origin_country: 'th',
    destination_country: shipment.destinationCountry,
    transport_mode: shipment.mode,
    origin: {
      name: shipment.originName,
      name_en: shipment.originNameEn,
      coordinates: origin,
    },
    destination: {
      name: shipment.destinationName,
      name_en: shipment.destinationNameEn,
      coordinates: destination,
    },
    route: shipment.route,
    carrier: { name: shipment.carrier, name_en: shipment.carrierEn },
    item_count: shipment.itemCount,
    progress,
    eta: {
      unit: shipment.etaUnit,
      total: shipment.etaTotal,
      remaining,
    },
    timeline: shipment.timeline.map((step, index) => {
      const completed = index < timelineLen - 2;
      const active = index === timelineLen - 2;
      return {
        key: step.key,
        time: step.time,
        completed,
        active,
      };
    }),
    updated_at: new Date().toISOString(),
    provider: 'local',
  };
}

function normalizeExternalPayload(
  raw: Record<string, unknown>,
  fallbackId: string
): TrackingApiResponse | null {
  const tracking_number = String(raw.tracking_number || raw.trackingNumber || fallbackId);
  const route = (raw.route || raw.path) as [number, number][] | undefined;
  if (!route?.length) return null;

  const progress = Number(raw.progress ?? 0.5);
  const mode = (raw.transport_mode || raw.transportMode || 'air') as TransportMode;
  const destination = (raw.destination_country ||
    raw.destinationCountry ||
    'jp') as TrackingCountry;
  const etaUnitRaw = (raw.eta as { unit?: string })?.unit;

  return {
    tracking_number,
    status: (raw.status as TrackingApiResponse['status']) || deriveStatus(progress),
    direction: (raw.direction as TrackingApiResponse['direction']) || 'export',
    origin_country: 'th',
    destination_country: destination,
    transport_mode: mode,
    origin: {
      name: String((raw.origin as { name?: string })?.name || 'Bangkok, Thailand'),
      name_en: String((raw.origin as { name_en?: string })?.name_en || 'Bangkok, Thailand'),
      coordinates: route[0],
    },
    destination: {
      name: String((raw.destination as { name?: string })?.name || ''),
      name_en: String((raw.destination as { name_en?: string })?.name_en || ''),
      coordinates: route[route.length - 1],
    },
    route,
    carrier: {
      name: String((raw.carrier as { name?: string })?.name || 'Carrier'),
      name_en: String((raw.carrier as { name_en?: string })?.name_en || 'Carrier'),
    },
    item_count: Number(raw.item_count || raw.itemCount || 1),
    progress,
    eta: {
      unit:
        etaUnitRaw === 'days' ? 'days' : etaUnitRaw === 'minutes' ? 'minutes' : 'hours',
      total: Number((raw.eta as { total?: number })?.total || 24),
      remaining: Number((raw.eta as { remaining?: number })?.remaining || 12),
    },
    timeline: Array.isArray(raw.timeline)
      ? (raw.timeline as TrackingApiResponse['timeline'])
      : [],
    updated_at: String(raw.updated_at || new Date().toISOString()),
    provider: 'external',
  };
}

async function fetchExternalTracking(
  trackingNumber: string
): Promise<TrackingApiResponse | null> {
  const baseUrl = process.env.SHIPPING_API_URL?.replace(/\/$/, '');
  if (!baseUrl) return null;

  const headers: HeadersInit = { Accept: 'application/json' };
  const apiKey = process.env.SHIPPING_API_KEY;
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

  try {
    const url = `${baseUrl}/track/${encodeURIComponent(trackingNumber)}`;
    const res = await fetch(url, { headers, cache: 'no-store' });
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, unknown>;
    return normalizeExternalPayload(data, trackingNumber);
  } catch {
    return null;
  }
}

export async function trackShipment(input: TrackShipmentInput): Promise<TrackingApiResponse | null> {
  const trackingNumber = input.trackingNumber.trim();
  if (!trackingNumber) return null;

  const external = await fetchExternalTracking(trackingNumber);
  if (external) return external;

  const shipment = resolveShipment(
    trackingNumber,
    input.transportMode,
    input.destinationCountry,
    input.direction
  );

  if (!shipment) return null;
  return shipmentToApiResponse(shipment, getSimulatedProgress(shipment.id));
}

export function apiResponseToShipment(data: TrackingApiResponse): Shipment {
  return {
    id: data.tracking_number,
    direction: data.direction,
    mode: data.transport_mode,
    destinationCountry: data.destination_country,
    route: data.route,
    originName: data.origin.name,
    originNameEn: data.origin.name_en,
    destinationName: data.destination.name,
    destinationNameEn: data.destination.name_en,
    carrier: data.carrier.name,
    carrierEn: data.carrier.name_en,
    itemCount: data.item_count,
    etaUnit: data.eta.unit,
    etaTotal: data.eta.total,
    progressSpeed:
      data.transport_mode === 'local' ? 0.008 : data.transport_mode === 'air' ? 0.006 : 0.003,
    timeline: data.timeline.map((t) => ({ key: t.key, time: t.time })),
  };
}
