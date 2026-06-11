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
exports.shippingRouter = void 0;
const express_1 = require("express");
const shipping_service_1 = require("../../../frontend/src/lib/tracking/shipping-service");
exports.shippingRouter = (0, express_1.Router)();
exports.shippingRouter.get('/track/:trackingNumber', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, shipping_service_1.trackShipment)({
            trackingNumber: req.params.trackingNumber,
            transportMode: req.query.transport_mode,
            destinationCountry: req.query.destination_country,
            direction: req.query.direction,
        });
        if (!result) {
            return res.status(404).json({ error: 'Shipment not found' });
        }
        return res.json(result);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Tracking failed';
        return res.status(500).json({ error: message });
    }
}));
exports.shippingRouter.post('/track', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const trackingNumber = String(((_a = req.body) === null || _a === void 0 ? void 0 : _a.tracking_number) || ((_b = req.body) === null || _b === void 0 ? void 0 : _b.trackingNumber) || '').trim();
        if (!trackingNumber) {
            return res.status(400).json({ error: 'tracking_number is required' });
        }
        const result = yield (0, shipping_service_1.trackShipment)({
            trackingNumber,
            transportMode: (_c = req.body) === null || _c === void 0 ? void 0 : _c.transport_mode,
            destinationCountry: (_d = req.body) === null || _d === void 0 ? void 0 : _d.destination_country,
            direction: (_e = req.body) === null || _e === void 0 ? void 0 : _e.direction,
        });
        if (!result) {
            return res.status(404).json({ error: 'Shipment not found' });
        }
        return res.json(result);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Tracking failed';
        return res.status(500).json({ error: message });
    }
}));
exports.shippingRouter.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        provider: process.env.SHIPPING_API_URL ? 'external+local' : 'local',
        origin: 'th',
        destinations: ['cn', 'jp', 'gb', 'ru', 'th'],
        modes: ['sea', 'air', 'local'],
    });
});
