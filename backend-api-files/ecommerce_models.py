# ==============================================================================
# 🍷 THE BOTTLE CLUB - SQLALCHEMY ORM MODELS
# File: ecommerce_models.py (or add to app/models/ecommerce.py)
# ==============================================================================

from sqlalchemy import (
    Column, Integer, String, Text, Numeric, Boolean,
    ForeignKey, DateTime, Date, Time, func
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from datetime import datetime

# สมมติฐานว่าใน Backend มี Base = declarative_base() อยู่แล้ว
# from app.db.base_class import Base
# หาก import จากระบบเดิม ให้ใช้: from app.db.base import Base

try:
    from app.db.base_class import Base
except ImportError:
    from sqlalchemy.ext.declarative import declarative_base
    Base = declarative_base()


class CustomerAddress(Base):
    __tablename__ = "customer_addresses"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id", ondelete="CASCADE"), nullable=False, index=True)
    recipient_name = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    address_line = Column(Text, nullable=False)
    subdistrict = Column(String(255), nullable=True)
    district = Column(String(255), nullable=True)
    province = Column(String(255), nullable=True)
    postal_code = Column(String(20), nullable=True)
    country = Column(String(100), default="Thailand")
    is_default = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())


class SlipVerification(Base):
    __tablename__ = "slip_verifications"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id", ondelete="SET NULL"), nullable=True)
    image_url = Column(Text, nullable=False)
    transfer_amount = Column(Numeric(10, 2), nullable=False)
    transfer_date = Column(Date, nullable=False)
    transfer_time = Column(Time, nullable=False)
    bank_name = Column(String(100), nullable=False)
    status = Column(String(30), default="pending", index=True)  # pending, approved, rejected
    admin_note = Column(Text, nullable=True)
    verified_by_user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    verified_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now())


class LoyaltyTransaction(Base):
    __tablename__ = "loyalty_transactions"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id", ondelete="CASCADE"), nullable=False, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="SET NULL"), nullable=True)
    type = Column(String(20), nullable=False)  # earn, redeem, adjust, expire, welcome
    points = Column(Integer, nullable=False)
    balance_after = Column(Integer, nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now())


class ProductReview(Base):
    __tablename__ = "product_reviews"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, nullable=False, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id", ondelete="SET NULL"), nullable=True)
    customer_name = Column(String(255), nullable=False)
    rating = Column(Integer, nullable=False)  # 1-5
    comment = Column(Text, nullable=True)
    status = Column(String(20), default="pending", index=True)  # pending, approved, rejected
    created_at = Column(DateTime(timezone=True), default=func.now())


class EcommerceSetting(Base):
    __tablename__ = "ecommerce_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, nullable=False, index=True)
    value = Column(JSONB, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())
