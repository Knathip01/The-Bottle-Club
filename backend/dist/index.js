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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const stripe_1 = __importDefault(require("stripe"));
const routes_1 = require("./shipping/routes");
const db_1 = __importDefault(require("./db"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Ensure upload directory exists
const uploadDir = 'public/uploads/slips';
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
// Multer configuration
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf/;
        const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only images and PDFs are allowed'));
    }
});
const VALID_ORDER_TYPES = new Set(['online', 'pos']);
const VALID_PAYMENT_METHODS = new Set([
    'cash',
    'transfer',
    'credit_card',
    'promptpay',
    'alipay',
    'wechat_pay',
    'line_pay',
    'shopee_pay',
    'true_wallet',
]);
const VALID_ONLINE_SHIPPING_METHODS = new Set(['standard', 'express']);
function roundMoney(value) {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}
function getJwtUserId(authHeader) {
    const token = authHeader.slice('Bearer '.length).trim();
    const payload = token.split('.')[1];
    if (!payload) {
        return 'user_placeholder';
    }
    try {
        const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
        const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
        const decoded = JSON.parse(Buffer.from(padded, 'base64').toString('utf8'));
        return String(decoded.sub || decoded.user_id || decoded.id || decoded.email || 'user_placeholder');
    }
    catch (_a) {
        return 'user_placeholder';
    }
}
function normalizeOrderType(value) {
    return typeof value === 'string' && VALID_ORDER_TYPES.has(value)
        ? value
        : null;
}
function normalizePaymentMethod(value) {
    return typeof value === 'string' && VALID_PAYMENT_METHODS.has(value)
        ? value
        : null;
}
function normalizeItems(value) {
    if (!Array.isArray(value) || value.length === 0) {
        return { items: [], error: 'Items are required' };
    }
    const totalsByProduct = new Map();
    for (const rawItem of value) {
        if (!rawItem || typeof rawItem !== 'object' || Array.isArray(rawItem)) {
            return { items: [], error: 'Each item must be an object' };
        }
        const item = rawItem;
        const productId = Number(item.product_id);
        const quantity = Number(item.quantity);
        if (!Number.isInteger(productId) || productId <= 0) {
            return { items: [], error: 'Each item requires a valid product_id' };
        }
        if (!Number.isInteger(quantity) || quantity <= 0) {
            return { items: [], error: 'Each item requires a positive integer quantity' };
        }
        totalsByProduct.set(productId, (totalsByProduct.get(productId) || 0) + quantity);
    }
    const items = Array.from(totalsByProduct.entries())
        .map(([productId, quantity]) => ({ productId, quantity }))
        .sort((a, b) => a.productId - b.productId);
    return { items };
}
function normalizeTaxInvoice(body) {
    const isFullTaxInvoice = body.is_full_tax_invoice === true;
    const useShippingAsTaxAddress = body.use_shipping_as_tax_address !== false;
    if (!isFullTaxInvoice) {
        return {
            data: {
                isFullTaxInvoice: false,
                taxId: null,
                taxBusinessName: null,
                useShippingAsTaxAddress,
                taxAddress: null,
            },
        };
    }
    const taxId = typeof body.tax_id === 'string' ? body.tax_id.trim() : '';
    const taxBusinessName = typeof body.tax_business_name === 'string' ? body.tax_business_name.trim() : '';
    if (!/^\d{13}$/.test(taxId)) {
        return {
            data: {
                isFullTaxInvoice,
                taxId: null,
                taxBusinessName: null,
                useShippingAsTaxAddress,
                taxAddress: null,
            },
            error: 'Tax ID must be 13 digits',
        };
    }
    if (!taxBusinessName) {
        return {
            data: {
                isFullTaxInvoice,
                taxId,
                taxBusinessName: null,
                useShippingAsTaxAddress,
                taxAddress: null,
            },
            error: 'Tax business name is required',
        };
    }
    let taxAddress = null;
    if (!useShippingAsTaxAddress) {
        if (!body.tax_address || typeof body.tax_address !== 'object' || Array.isArray(body.tax_address)) {
            return {
                data: {
                    isFullTaxInvoice,
                    taxId,
                    taxBusinessName,
                    useShippingAsTaxAddress,
                    taxAddress: null,
                },
                error: 'Tax address is required when not using shipping address',
            };
        }
        taxAddress = body.tax_address;
    }
    return {
        data: {
            isFullTaxInvoice,
            taxId,
            taxBusinessName,
            useShippingAsTaxAddress,
            taxAddress,
        },
    };
}
function calculateShipping(orderType, requestedMethod, subtotal) {
    if (orderType === 'pos') {
        return { method: 'pos', fee: 0 };
    }
    const method = typeof requestedMethod === 'string' ? requestedMethod : 'standard';
    if (!VALID_ONLINE_SHIPPING_METHODS.has(method)) {
        return {
            method: 'standard',
            fee: 0,
            error: 'Shipping method must be standard or express for online orders',
        };
    }
    const onlineMethod = method;
    if (onlineMethod === 'express') {
        return { method: onlineMethod, fee: 250 };
    }
    return { method: onlineMethod, fee: subtotal >= 2000 ? 0 : 100 };
}
// Initialize Stripe Client
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2023-10-16',
});
app.use((0, cors_1.default)());
// Need raw body for stripe webhooks
app.use((req, res, next) => {
    if (req.originalUrl === '/api/webhooks/stripe') {
        next();
    }
    else {
        express_1.default.json()(req, res, next);
    }
});
// Basic health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});
app.use('/api/shipping', routes_1.shippingRouter);
// Serve static files for uploaded slips
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../public/uploads')));
// Product Reviews API
app.get('/api/products/:id/reviews', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
        res.status(400).json({ error: 'Invalid product_id' });
        return;
    }
    const client = yield db_1.default.connect();
    try {
        const result = yield client.query('SELECT id, product_id, user_name, rating, comment, created_at FROM product_reviews WHERE product_id = $1 ORDER BY created_at DESC', [productId]);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Fetch reviews error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        client.release();
    }
}));
app.post('/api/products/:id/reviews', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const productId = Number(req.params.id);
    const { rating, comment, user_name } = req.body;
    if (isNaN(productId)) {
        res.status(400).json({ error: 'Invalid product_id' });
        return;
    }
    if (!rating || rating < 1 || rating > 5) {
        res.status(400).json({ error: 'Rating must be between 1 and 5' });
        return;
    }
    const userId = getJwtUserId(authHeader);
    const client = yield db_1.default.connect();
    try {
        // Try to get user's name from database
        let userName = 'Anonymous';
        const userRes = yield client.query('SELECT first_name, last_name FROM users WHERE id::text = $1 OR email = $1', [userId]);
        if (userRes.rows.length > 0) {
            const user = userRes.rows[0];
            userName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Customer';
        }
        const result = yield client.query('INSERT INTO product_reviews (product_id, user_id, user_name, rating, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *', [productId, userId, userName, rating, comment]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Create review error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        client.release();
    }
}));
// ── GET /api/users/me/reviews — fetch all reviews by the current user ──────
app.get('/api/users/me/reviews', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const userId = getJwtUserId(authHeader);
    if (userId === 'user_placeholder') {
        res.status(401).json({ error: 'Invalid or missing user identity in token' });
        return;
    }
    const client = yield db_1.default.connect();
    try {
        const result = yield client.query(`SELECT
        pr.id,
        pr.product_id,
        pr.user_id,
        pr.user_name   AS username,
        pr.rating,
        pr.comment,
        pr.created_at,
        p.name         AS product_name
       FROM product_reviews pr
       LEFT JOIN products p ON p.id = pr.product_id
       WHERE pr.user_id::text = $1::text
       ORDER BY pr.created_at DESC`, [userId]);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Fetch user reviews error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        client.release();
    }
}));
// Payment Confirmation API
app.post('/api/orders/:id/confirm-payment', upload.single('slip'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const orderId = Number(req.params.id);
    if (isNaN(orderId)) {
        res.status(400).json({ error: 'Invalid order_id' });
        return;
    }
    if (!req.file) {
        res.status(400).json({ error: 'Payment slip is required' });
        return;
    }
    const userId = getJwtUserId(authHeader);
    const client = yield db_1.default.connect();
    try {
        // Check if order belongs to user
        const orderCheck = yield client.query('SELECT user_id FROM orders WHERE id = $1', [orderId]);
        if (orderCheck.rows.length === 0) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }
        if (String(orderCheck.rows[0].user_id) !== String(userId)) {
            res.status(403).json({ error: 'Unauthorized to confirm this order' });
            return;
        }
        const slipUrl = `/uploads/slips/${req.file.filename}`;
        yield client.query('UPDATE orders SET status = $1, payment_slip_url = $2 WHERE id = $3', ['paid_pending_review', slipUrl, orderId]);
        res.json({ message: 'Payment confirmed successfully', slip_url: slipUrl });
    }
    catch (error) {
        console.error('Confirm payment error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        client.release();
    }
}));
// Order Creation API
app.post('/api/orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const body = req.body || {};
    const orderType = normalizeOrderType(body.order_type);
    const paymentMethod = normalizePaymentMethod(body.payment_method);
    const normalizedItems = normalizeItems(body.items);
    const taxInvoice = normalizeTaxInvoice(body);
    const addressId = body.address_id === undefined || body.address_id === null ? null : Number(body.address_id);
    if (!orderType) {
        res.status(400).json({ error: 'order_type must be online or pos' });
        return;
    }
    if (!paymentMethod) {
        res.status(400).json({ error: 'Unsupported payment_method' });
        return;
    }
    if (normalizedItems.error) {
        res.status(400).json({ error: normalizedItems.error });
        return;
    }
    if (orderType === 'online' && (addressId === null || !Number.isInteger(addressId) || addressId <= 0)) {
        res.status(400).json({ error: 'address_id is required for online orders' });
        return;
    }
    if (taxInvoice.error) {
        res.status(400).json({ error: taxInvoice.error });
        return;
    }
    const receivedAmount = body.received_amount === undefined || body.received_amount === null
        ? null
        : Number(body.received_amount);
    const changeAmount = body.change_amount === undefined || body.change_amount === null ? null : Number(body.change_amount);
    if (receivedAmount !== null && (!Number.isFinite(receivedAmount) || receivedAmount < 0)) {
        res.status(400).json({ error: 'received_amount must be a positive number' });
        return;
    }
    if (changeAmount !== null && (!Number.isFinite(changeAmount) || changeAmount < 0)) {
        res.status(400).json({ error: 'change_amount must be a positive number' });
        return;
    }
    const client = yield db_1.default.connect();
    let transactionStarted = false;
    try {
        yield client.query('BEGIN');
        transactionStarted = true;
        let subtotalAmount = 0;
        const orderItems = [];
        const productIds = normalizedItems.items.map((item) => item.productId);
        // 1. Stock check and price fetch. Rows are locked until COMMIT to prevent over-selling.
        const productRes = yield client.query('SELECT id, name, price, stock FROM products WHERE id = ANY($1::int[]) ORDER BY id FOR UPDATE', [productIds]);
        const productsById = new Map(productRes.rows.map((product) => [Number(product.id), product]));
        for (const item of normalizedItems.items) {
            const product = productsById.get(item.productId);
            if (!product) {
                yield client.query('ROLLBACK');
                transactionStarted = false;
                res.status(400).json({ error: `Product with ID ${item.productId} not found` });
                return;
            }
            if (product.stock < item.quantity) {
                yield client.query('ROLLBACK');
                transactionStarted = false;
                res.status(400).json({ error: `Insufficient stock for product: ${product.name}` });
                return;
            }
            const unitPrice = Number(product.price);
            const itemTotal = roundMoney(unitPrice * item.quantity);
            subtotalAmount = roundMoney(subtotalAmount + itemTotal);
            orderItems.push({
                product_id: product.id,
                quantity: item.quantity,
                price: unitPrice,
            });
        }
        const shipping = calculateShipping(orderType, body.shipping_method, subtotalAmount);
        if (shipping.error) {
            yield client.query('ROLLBACK');
            transactionStarted = false;
            res.status(400).json({ error: shipping.error });
            return;
        }
        // 2. Update stock only after every requested item has passed validation.
        for (const item of normalizedItems.items) {
            yield client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [
                item.quantity,
                item.productId,
            ]);
        }
        const totalAmount = roundMoney(subtotalAmount + shipping.fee);
        const userId = getJwtUserId(authHeader);
        const orderRes = yield client.query(`INSERT INTO orders (
        user_id, subtotal_amount, shipping_fee, total_amount, status, order_type, payment_method,
        shipping_method, address_id, received_amount, change_amount, is_full_tax_invoice,
        tax_id, tax_business_name, use_shipping_as_tax_address, tax_address
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12,
        $13, $14, $15, $16
      ) RETURNING *`, [
            userId,
            subtotalAmount,
            shipping.fee,
            totalAmount,
            'pending',
            orderType,
            paymentMethod,
            shipping.method,
            orderType === 'online' ? addressId : null,
            receivedAmount,
            changeAmount,
            taxInvoice.data.isFullTaxInvoice,
            taxInvoice.data.taxId,
            taxInvoice.data.taxBusinessName,
            taxInvoice.data.useShippingAsTaxAddress,
            taxInvoice.data.taxAddress ? JSON.stringify(taxInvoice.data.taxAddress) : null,
        ]);
        const order = orderRes.rows[0];
        // 4. Create order items
        for (const item of orderItems) {
            yield client.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)', [order.id, item.product_id, item.quantity, item.price]);
        }
        // 5. Update user points (25 THB = 1 point)
        if (userId && userId !== 'user_placeholder') {
            const earnedPoints = Math.floor(subtotalAmount / 25);
            if (earnedPoints > 0) {
                // Try to update by id (numeric) first, then by email
                if (!isNaN(Number(userId))) {
                    yield client.query('UPDATE users SET points = COALESCE(points, 0) + $1 WHERE id = $2', [
                        earnedPoints,
                        Number(userId),
                    ]);
                }
                else {
                    yield client.query('UPDATE users SET points = COALESCE(points, 0) + $1 WHERE email = $2', [
                        earnedPoints,
                        userId,
                    ]);
                }
            }
        }
        yield client.query('COMMIT');
        transactionStarted = false;
        res.status(201).json({
            id: order.id,
            subtotal_amount: order.subtotal_amount,
            shipping_method: order.shipping_method,
            shipping_fee: order.shipping_fee,
            total_amount: order.total_amount,
            status: order.status,
            order_type: order.order_type,
            payment_method: order.payment_method,
            is_full_tax_invoice: order.is_full_tax_invoice,
            earned_points: Math.floor(subtotalAmount / 25),
        });
        return;
    }
    catch (error) {
        if (transactionStarted) {
            yield client.query('ROLLBACK').catch((rollbackError) => {
                console.error('Order rollback error:', rollbackError);
            });
        }
        console.error('Order creation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        client.release();
    }
}));
// Fetch my orders
app.get('/api/orders/my', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const userId = getJwtUserId(authHeader);
    if (userId === 'user_placeholder') {
        res.status(401).json({ error: 'Invalid or missing user identity in token' });
        return;
    }
    const client = yield db_1.default.connect();
    try {
        const result = yield client.query(`SELECT 
        o.id,
        o.status,
        o.total_amount as total_price,
        o.created_at,
        o.is_full_tax_invoice,
        o.tax_id,
        o.tax_business_name,
        o.use_shipping_as_tax_address,
        o.tax_address,
        o.payment_method,
        o.shipping_method,
        o.shipping_fee,
        o.subtotal_amount,
        COALESCE(
          json_agg(
            json_build_object(
              'product', json_build_object('id', p.id, 'name', p.name, 'price', p.price),
              'quantity', oi.quantity,
              'price', oi.price
            )
          ) FILTER (WHERE oi.id IS NOT NULL),
          '[]'
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id::text = $1::text
      GROUP BY o.id
      ORDER BY o.created_at DESC`, [userId]);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Fetch my orders error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        client.release();
    }
}));
// Fetch single order
app.get('/api/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const userId = getJwtUserId(authHeader);
    const orderId = req.params.id;
    if (userId === 'user_placeholder') {
        res.status(401).json({ error: 'Invalid or missing user identity in token' });
        return;
    }
    const client = yield db_1.default.connect();
    try {
        const result = yield client.query(`SELECT 
        o.id,
        o.status,
        o.total_amount as total_price,
        o.created_at,
        o.is_full_tax_invoice,
        o.tax_id,
        o.tax_business_name,
        o.use_shipping_as_tax_address,
        o.tax_address,
        o.payment_method,
        o.shipping_method,
        o.shipping_fee,
        o.subtotal_amount,
        COALESCE(
          json_agg(
            json_build_object(
              'product', json_build_object('id', p.id, 'name', p.name, 'price', p.price),
              'quantity', oi.quantity,
              'price', oi.price
            )
          ) FILTER (WHERE oi.id IS NOT NULL),
          '[]'
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.id = $1 AND o.user_id::text = $2::text
      GROUP BY o.id`, [orderId, userId]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Fetch single order error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        client.release();
    }
}));
// Fetch current user profile
app.get('/api/users/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const userId = getJwtUserId(authHeader);
    if (userId === 'user_placeholder') {
        res.status(401).json({ error: 'Invalid or missing user identity in token' });
        return;
    }
    const client = yield db_1.default.connect();
    try {
        let result;
        if (!isNaN(Number(userId))) {
            result = yield client.query(`SELECT u.id, u.first_name, u.last_name, u.email, u.points, 
                (SELECT COUNT(*) FROM orders WHERE user_id::text = u.id::text) as order_count 
         FROM users u WHERE u.id = $1`, [Number(userId)]);
        }
        else {
            result = yield client.query(`SELECT u.id, u.first_name, u.last_name, u.email, u.points, 
                (SELECT COUNT(*) FROM orders WHERE user_id::text = u.email::text) as order_count 
         FROM users u WHERE u.email = $1`, [userId]);
        }
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Fetch user me error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        client.release();
    }
}));
// Create Stripe Checkout Session
app.post('/api/checkout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items, successUrl, cancelUrl } = req.body;
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ['card', 'promptpay'],
            line_items: items.map((item) => ({
                price_data: {
                    currency: 'thb',
                    product_data: {
                        name: item.name,
                        images: item.image ? [item.image] : [],
                    },
                    unit_amount: item.price * 100, // Stripe expects amounts in cents/satang
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
        });
        res.json({ id: session.id, url: session.url });
    }
    catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ error: error.message });
    }
}));
app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
