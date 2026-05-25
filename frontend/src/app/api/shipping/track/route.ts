import { NextResponse } from 'next/server';
import { trackShipment } from '@/lib/tracking/shipping-service';
import type {
  ShipmentDirection,
  TrackingCountry,
  TransportMode,
} from '@/lib/tracking/types';

function parseQuery(request: Request) {
  const { searchParams } = new URL(request.url);
  return {
    trackingNumber: searchParams.get('tracking_number') || searchParams.get('id') || '',
    transportMode: searchParams.get('transport_mode') as TransportMode | null,
    destinationCountry: searchParams.get('destination_country') as TrackingCountry | null,
    direction: searchParams.get('direction') as ShipmentDirection | null,
  };
}

export async function GET(request: Request) {
  const q = parseQuery(request);
  if (!q.trackingNumber) {
    return NextResponse.json({ error: 'tracking_number is required' }, { status: 400 });
  }

  const result = await trackShipment({
    trackingNumber: q.trackingNumber,
    transportMode: q.transportMode || undefined,
    destinationCountry: q.destinationCountry || undefined,
    direction: q.direction || undefined,
  });

  if (!result) {
    return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
  }

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const trackingNumber = String(body.tracking_number || body.trackingNumber || '').trim();
    if (!trackingNumber) {
      return NextResponse.json({ error: 'tracking_number is required' }, { status: 400 });
    }

    const result = await trackShipment({
      trackingNumber,
      transportMode: body.transport_mode || body.transportMode,
      destinationCountry: body.destination_country || body.destinationCountry,
      direction: body.direction,
    });

    if (!result) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
