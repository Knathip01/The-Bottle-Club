export type TransportMode = 'sea' | 'air' | 'local';
export type TrackingCountry = 'th' | 'cn' | 'jp' | 'gb' | 'ru' | 'us' | 'eu';
export type ShipmentDirection = 'domestic' | 'export';

export type Shipment = {
  id: string;
  direction: ShipmentDirection;
  mode: TransportMode;
  destinationCountry: TrackingCountry;
  route: [number, number][];
  originName: string;
  originNameEn: string;
  destinationName: string;
  destinationNameEn: string;
  carrier: string;
  carrierEn: string;
  itemCount: number;
  etaUnit: 'minutes' | 'hours' | 'days';
  etaTotal: number;
  progressSpeed: number;
  timeline: { key: string; time: string }[];
  // Premium extra features:
  insuranceStatus?: string;
  customsStatus?: 'cleared' | 'pending' | 'review' | 'none';
  deliveryAttempt?: string;
};

export type TrackingApiResponse = {
  tracking_number: string;
  status: 'processing' | 'in_transit' | 'customs' | 'out_for_delivery' | 'delivered';
  direction: ShipmentDirection;
  origin_country: 'th';
  destination_country: TrackingCountry;
  transport_mode: TransportMode;
  origin: { name: string; name_en: string; coordinates: [number, number] };
  destination: { name: string; name_en: string; coordinates: [number, number] };
  route: [number, number][];
  carrier: { name: string; name_en: string };
  item_count: number;
  progress: number;
  eta: {
    unit: 'minutes' | 'hours' | 'days';
    total: number;
    remaining: number;
  };
  timeline: Array<{
    key: string;
    time: string;
    completed: boolean;
    active: boolean;
  }>;
  updated_at: string;
  provider: 'local' | 'external';
  // Premium extra features:
  insurance_status?: string;
  customs_status?: 'cleared' | 'pending' | 'review' | 'none';
  delivery_attempt?: string;
};

export type TrackShipmentInput = {
  trackingNumber: string;
  transportMode?: TransportMode;
  destinationCountry?: TrackingCountry;
  direction?: ShipmentDirection;
};

