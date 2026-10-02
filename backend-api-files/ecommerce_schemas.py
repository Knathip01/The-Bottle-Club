# ==============================================================================
# 🍷 THE BOTTLE CLUB - PYDANTIC V2 SCHEMAS
# File: ecommerce_schemas.py (or add to app/schemas/ecommerce.py)
# ==============================================================================

from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Any, Dict
from datetime import datetime, date, time
from decimal import Decimal


# --- 1. Order & Checkout Schemas ---
class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(gt=0, description="จำนวนสินค้า")
    unit_price: Decimal = Field(ge=0, description="ราคาต่อขวด")


class OrderEcommerceCreate(BaseModel):
    customer_id: int
    recipient_name: str
    recipient_phone: str
    shipping_address: str
    delivery_note: Optional[str] = None
    payment_method: str = "transfer"  # transfer, promptpay, cod
    coupon_code: Optional[str] = None
    shipping_fee: Decimal = Decimal("0.00")
    order_source: str = "ecommerce"
    items: List[OrderItemCreate]


class OrderTrackingUpdate(BaseModel):
    carrier_name: str
    tracking_number: str


class OrderEcommerceResponse(BaseModel):
    id: int
    order_number: str
    customer_id: Optional[int] = None
    recipient_name: Optional[str] = None
    recipient_phone: Optional[str] = None
    shipping_address: Optional[str] = None
    subtotal: Decimal
    discount_amount: Decimal
    shipping_fee: Decimal
    total_amount: Decimal
    status: str
    payment_method: str
    order_source: str
    tracking_number: Optional[str] = None
    carrier_name: Optional[str] = None
    slip_url: Optional[str] = None
    slip_verified: bool = False
    created_at: datetime

    class Config:
        from_attributes = True


# --- 2. Slip Verification Schemas ---
class SlipResponse(BaseModel):
    id: int
    order_id: int
    customer_id: Optional[int] = None
    image_url: str
    transfer_amount: Decimal
    transfer_date: date
    transfer_time: time
    bank_name: str
    status: str
    admin_note: Optional[str] = None
    verified_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True


class SlipApprovalAction(BaseModel):
    admin_note: Optional[str] = None


class SlipRejectAction(BaseModel):
    reason: str


# --- 3. Customer Address Schemas ---
class CustomerAddressCreate(BaseModel):
    customer_id: int
    recipient_name: str
    phone: Optional[str] = None
    address_line: str
    subdistrict: Optional[str] = None
    district: Optional[str] = None
    province: Optional[str] = None
    postal_code: Optional[str] = None
    country: str = "Thailand"
    is_default: bool = False


class CustomerAddressUpdate(BaseModel):
    recipient_name: Optional[str] = None
    phone: Optional[str] = None
    address_line: Optional[str] = None
    subdistrict: Optional[str] = None
    district: Optional[str] = None
    province: Optional[str] = None
    postal_code: Optional[str] = None
    is_default: Optional[bool] = None


class CustomerAddressResponse(BaseModel):
    id: int
    customer_id: int
    recipient_name: str
    phone: Optional[str] = None
    address_line: str
    subdistrict: Optional[str] = None
    district: Optional[str] = None
    province: Optional[str] = None
    postal_code: Optional[str] = None
    country: str
    is_default: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# --- 4. Loyalty & VIP Schemas ---
class LoyaltyBalanceResponse(BaseModel):
    customer_id: int
    customer_name: str
    balance: int
    tier: str
    member_code: str
    pending_expiring: int = 0


class LoyaltyTransactionResponse(BaseModel):
    id: int
    customer_id: int
    order_id: Optional[int] = None
    type: str
    points: int
    balance_after: int
    description: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class LoyaltyEarnRequest(BaseModel):
    customer_id: int
    order_id: Optional[int] = None
    points: int
    description: Optional[str] = None


# --- 5. Wine Product Schemas ---
class WineProductUpdateSchema(BaseModel):
    name: Optional[str] = None
    price: Optional[Decimal] = None
    cost_price: Optional[Decimal] = None
    quantity: Optional[str] = None  # e.g. "1L", "75 cl"
    alcohol: Optional[str] = None   # e.g. "12.5%"
    vintage: Optional[str] = None   # e.g. "2019"
    grape_variety: Optional[str] = None
    country: Optional[str] = None
    region: Optional[str] = None
    in_stock: Optional[int] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None


# --- 6. Coupon Schemas ---
class CouponValidateRequest(BaseModel):
    code: str
    subtotal: Decimal
    customer_id: Optional[int] = None


class CouponValidateResponse(BaseModel):
    valid: bool
    code: str
    discount_type: str  # percentage, fixed
    discount_value: Decimal
    discount_amount: Decimal
    final_total: Decimal
    message: str


# --- 7. Product Review Schemas ---
class ProductReviewCreate(BaseModel):
    product_id: int
    customer_name: str
    rating: int = Field(ge=1, le=5)
    comment: Optional[str] = None


class ProductReviewResponse(BaseModel):
    id: int
    product_id: int
    customer_id: Optional[int] = None
    customer_name: str
    rating: int
    comment: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# --- 8. Store Settings & Dashboard ---
class EcommerceSettingsSchema(BaseModel):
    shipping: Dict[str, Any]
    bank_account: Dict[str, Any]
    loyalty_rules: Dict[str, Any]


class DashboardMetricsResponse(BaseModel):
    sales_today: Decimal
    sales_this_month: Decimal
    pending_orders_count: int
    pending_slips_count: int
    total_members: int
    recent_orders: List[Dict[str, Any]]
    top_selling_wines: List[Dict[str, Any]]
