"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSimulatedProgress = getSimulatedProgress;
exports.shipmentToApiResponse = shipmentToApiResponse;
exports.trackShipment = trackShipment;
exports.apiResponseToShipment = apiResponseToShipment;
const shipments_1 = require("./shipments");
function hashProgressSeed(trackingNumber) {
    let h = 0;
    for (let i = 0; i < trackingNumber.length; i++) {
        h = (h + trackingNumber.charCodeAt(i) * (i + 1)) % 1000;
    }
    return h / 1000;
}
function getSimulatedProgress(trackingNumber) {
    const base = 0.35 + hashProgressSeed(trackingNumber) * 0.45;
    const drift = ((Date.now() / 120000) % 1) * 0.08;
    return Math.min(0.97, base + drift);
}
function deriveStatus(progress) {
    if (progress >= 0.95)
        return 'delivered';
    if (progress >= 0.75)
        return 'out_for_delivery';
    if (progress >= 0.5)
        return 'customs';
    if (progress >= 0.15)
        return 'in_transit';
    return 'processing';
}
function shipmentToApiResponse(shipment, progress = getSimulatedProgress(shipment.id)) {
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
            // Dynamic completion calculation based on progress
            const stepFraction = index / (timelineLen - 1);
            const completed = progress >= stepFraction || index === 0;
            const active = progress >= stepFraction && (index === timelineLen - 1 || progress < (index + 1) / (timelineLen - 1));
            return {
                key: step.key,
                time: step.time,
                completed,
                active,
            };
        }),
        updated_at: new Date().toISOString(),
        provider: 'local',
        insurance_status: shipment.insuranceStatus || '฿10,000 Standard Transit Protection',
        customs_status: shipment.customsStatus || 'cleared',
        delivery_attempt: shipment.deliveryAttempt || '1st Attempt',
    };
}
function normalizeExternalPayload(raw, fallbackId) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const tracking_number = String(raw.tracking_number || raw.trackingNumber || fallbackId);
    const route = (raw.route || raw.path);
    if (!(route === null || route === void 0 ? void 0 : route.length))
        return null;
    const progress = Number((_a = raw.progress) !== null && _a !== void 0 ? _a : 0.5);
    const mode = (raw.transport_mode || raw.transportMode || 'air');
    const destination = (raw.destination_country ||
        raw.destinationCountry ||
        'jp');
    const etaUnitRaw = (_b = raw.eta) === null || _b === void 0 ? void 0 : _b.unit;
    return {
        tracking_number,
        status: raw.status || deriveStatus(progress),
        direction: raw.direction || 'export',
        origin_country: 'th',
        destination_country: destination,
        transport_mode: mode,
        origin: {
            name: String(((_c = raw.origin) === null || _c === void 0 ? void 0 : _c.name) || 'Bangkok, Thailand'),
            name_en: String(((_d = raw.origin) === null || _d === void 0 ? void 0 : _d.name_en) || 'Bangkok, Thailand'),
            coordinates: route[0],
        },
        destination: {
            name: String(((_e = raw.destination) === null || _e === void 0 ? void 0 : _e.name) || ''),
            name_en: String(((_f = raw.destination) === null || _f === void 0 ? void 0 : _f.name_en) || ''),
            coordinates: route[route.length - 1],
        },
        route,
        carrier: {
            name: String(((_g = raw.carrier) === null || _g === void 0 ? void 0 : _g.name) || 'Carrier'),
            name_en: String(((_h = raw.carrier) === null || _h === void 0 ? void 0 : _h.name_en) || 'Carrier'),
        },
        item_count: Number(raw.item_count || raw.itemCount || 1),
        progress,
        eta: {
            unit: etaUnitRaw === 'days' ? 'days' : etaUnitRaw === 'minutes' ? 'minutes' : 'hours',
            total: Number(((_j = raw.eta) === null || _j === void 0 ? void 0 : _j.total) || 24),
            remaining: Number(((_k = raw.eta) === null || _k === void 0 ? void 0 : _k.remaining) || 12),
        },
        timeline: Array.isArray(raw.timeline)
            ? raw.timeline
            : [],
        updated_at: String(raw.updated_at || new Date().toISOString()),
        provider: 'external',
        insurance_status: String(raw.insurance_status || raw.insuranceStatus || '฿10,000 Standard Transit Protection'),
        customs_status: (raw.customs_status || raw.customsStatus || 'cleared'),
        delivery_attempt: String(raw.delivery_attempt || raw.deliveryAttempt || '1st Attempt'),
    };
}
function fetchExternalTracking(trackingNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const baseUrl = (_a = process.env.SHIPPING_API_URL) === null || _a === void 0 ? void 0 : _a.replace(/\/$/, '');
        if (!baseUrl)
            return null;
        const headers = { Accept: 'application/json' };
        const apiKey = process.env.SHIPPING_API_KEY;
        if (apiKey)
            headers['Authorization'] = `Bearer ${apiKey}`;
        try {
            const url = `${baseUrl}/track/${encodeURIComponent(trackingNumber)}`;
            const res = yield fetch(url, { headers, cache: 'no-store' });
            if (!res.ok)
                return null;
            const data = (yield res.json());
            return normalizeExternalPayload(data, trackingNumber);
        }
        catch (_b) {
            return null;
        }
    });
}
function trackShipment(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const trackingNumber = input.trackingNumber.trim();
        if (!trackingNumber)
            return null;
        const external = yield fetchExternalTracking(trackingNumber);
        if (external)
            return external;
        const shipment = (0, shipments_1.resolveShipment)(trackingNumber, input.transportMode, input.destinationCountry, input.direction);
        if (!shipment)
            return null;
        return shipmentToApiResponse(shipment, getSimulatedProgress(shipment.id));
    });
}
function apiResponseToShipment(data) {
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
        progressSpeed: data.transport_mode === 'local' ? 0.008 : data.transport_mode === 'air' ? 0.006 : 0.003,
        timeline: data.timeline.map((t) => ({ key: t.key, time: t.time })),
        insuranceStatus: data.insurance_status,
        customsStatus: data.customs_status,
        deliveryAttempt: data.delivery_attempt,
    };
}
