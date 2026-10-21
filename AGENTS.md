<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:backend-contract-rules -->
# Backend Integration Contract & Security Authority
The authoritative source of truth for the API is `BACKEND_CONTRACT.md` (`https://api.wayneven.uk`).
- Backend is the source of truth for price, stock, and payment states.
- For ecommerce order creation, client unit_price is validated against product.selling_price (PRICE_MISMATCH). Stock is deducted at order creation.
- Protected endpoints require `Authorization: Bearer <access_token>`.
- Orders create/list, transfers, returns require `X-Branch-Id: <int>`.
- Public endpoints: `/health`, `/api/promotions`, `/api/v1/orders/track/{tracking_or_ref}`, `/api/v1/wine-products/`.
<!-- END:backend-contract-rules -->
