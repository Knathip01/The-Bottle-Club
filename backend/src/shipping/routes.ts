import { Router } from 'express';
import { trackShipment } from '../../../frontend/src/lib/tracking/shipping-service';
import type {
  ShipmentDirection,
  TrackingCountry,
  TransportMode,
} from '../../../frontend/src/lib/tracking/types';

export const shippingRouter = Router();

shippingRouter.get('/track/:trackingNumber', async (req, res) => {
  try {
    const result = await trackShipment({
      trackingNumber: req.params.trackingNumber,
      transportMode: req.query.transport_mode as TransportMode | undefined,
      destinationCountry: req.query.destination_country as TrackingCountry | undefined,
      direction: req.query.direction as ShipmentDirection | undefined,
    });

    if (!result) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    return res.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Tracking failed';
    return res.status(500).json({ error: message });
  }
});

shippingRouter.post('/track', async (req, res) => {
  try {
    const trackingNumber = String(req.body?.tracking_number || req.body?.trackingNumber || '').trim();
    if (!trackingNumber) {
      return res.status(400).json({ error: 'tracking_number is required' });
    }

    const result = await trackShipment({
      trackingNumber,
      transportMode: req.body?.transport_mode,
      destinationCountry: req.body?.destination_country,
      direction: req.body?.direction,
    });

    if (!result) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    return res.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Tracking failed';
    return res.status(500).json({ error: message });
  }
});

shippingRouter.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    provider: process.env.SHIPPING_API_URL ? 'external+local' : 'local',
    origin: 'th',
    destinations: ['cn', 'jp', 'gb', 'ru', 'th'],
    modes: ['sea', 'air', 'local'],
  });
});
