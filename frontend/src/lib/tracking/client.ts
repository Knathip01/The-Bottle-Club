import { apiResponseToShipment } from './shipping-service';
import type { TrackShipmentInput, TrackingApiResponse, Shipment } from './types';

export type TrackResult = {
  api: TrackingApiResponse;
  shipment: Shipment;
};

export async function fetchTracking(input: TrackShipmentInput): Promise<TrackResult | null> {
  const params = new URLSearchParams();
  params.set('tracking_number', input.trackingNumber.trim());
  if (input.transportMode) params.set('transport_mode', input.transportMode);
  if (input.destinationCountry) params.set('destination_country', input.destinationCountry);
  if (input.direction) params.set('direction', input.direction);

  const res = await fetch(`/api/shipping/track?${params.toString()}`, { cache: 'no-store' });
  if (!res.ok) return null;

  const api = (await res.json()) as TrackingApiResponse;
  return { api, shipment: apiResponseToShipment(api) };
}
