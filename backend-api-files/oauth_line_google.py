# ==============================================================================
# 🍷 THE BOTTLE CLUB - LINE & GOOGLE OAUTH2 ROUTER
# File: oauth_line_google.py (or add to app/routers/oauth.py)
# ==============================================================================

import os
import httpx
from fastapi import APIRouter, Depends, HTTPException, Query, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import jwt

# ปรับแก้ import ตามโครงสร้างโปรเจกต์เดิมของเพื่อน
# from app.db.session import get_db
# from app.core.config import settings

router = APIRouter(prefix="/api/v1/auth/oauth", tags=["OAuth Authentication"])

# Configuration (ตั้งค่าผ่าน .env หรือ settings)
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
LINE_CLIENT_ID = os.getenv("LINE_CLIENT_ID", "")
LINE_CLIENT_SECRET = os.getenv("LINE_CLIENT_SECRET", "")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"


def create_access_token(data: dict, expires_delta: timedelta = timedelta(days=7)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)


def sync_user_and_customer(db: Session, email: str, display_name: str, avatar: str, provider: str):
    """
    ฟังก์ชันเชื่อมโยงระหว่างตาราง users (Auth) และ customers (CRM & Loyalty)
    หากยังไม่มี ให้สร้างใหม่ พร้อมมอบแต้มต้อนรับ 50 PTS ฟรีทันที!
    """
    # 1. จัดการชื่อ
    name_parts = display_name.strip().split(" ", 1)
    first_name = name_parts[0]
    last_name = name_parts[1] if len(name_parts) > 1 else ""

    # 2. ตรวจสอบตาราง users
    # สมมติฐานคิวรี: user = db.query(User).filter(User.email == email).first()
    # หากไม่มี ให้สร้าง User ใหม่
    user_id = None
    try:
        user_row = db.execute(
            "SELECT id FROM users WHERE email = :email LIMIT 1",
            {"email": email}
        ).fetchone()

        if user_row:
            user_id = user_row[0]
        else:
            insert_user = db.execute(
                """
                INSERT INTO users (username, email, display_name, status, is_active, role_id, created_at)
                VALUES (:username, :email, :display_name, 'active', true, 4, NOW())
                RETURNING id
                """,
                {"username": email.split("@")[0], "email": email, "display_name": display_name}
            ).fetchone()
            user_id = insert_user[0]
            db.commit()
    except Exception as e:
        print(f"User sync error: {e}")

    # 3. ตรวจสอบตาราง customers (CRM & Loyalty)
    customer_id = None
    try:
        cust_row = db.execute(
            "SELECT id FROM customers WHERE email = :email LIMIT 1",
            {"email": email}
        ).fetchone()

        if cust_row:
            customer_id = cust_row[0]
        else:
            # สร้าง Customer ใหม่ พร้อม 50 คะแนนต้อนรับ
            insert_cust = db.execute(
                """
                INSERT INTO customers (first_name, last_name, email, loyalty_points_balance, created_at)
                VALUES (:first_name, :last_name, :email, 50, NOW())
                RETURNING id
                """,
                {"first_name": first_name, "last_name": last_name, "email": email}
            ).fetchone()
            customer_id = insert_cust[0]

            # บันทึกประวัติแต้มต้อนรับใน loyalty_transactions
            db.execute(
                """
                INSERT INTO loyalty_transactions (customer_id, type, points, balance_after, description, created_at)
                VALUES (:customer_id, 'welcome', 50, 50, 'โบนัสแต้มต้อนรับสมาชิกใหม่ (Welcome Bonus)', NOW())
                """,
                {"customer_id": customer_id}
            )
            db.commit()
    except Exception as e:
        print(f"Customer sync error: {e}")

    # 4. ออก JWT Token
    token_payload = {
        "sub": str(user_id or customer_id),
        "id": user_id or customer_id,
        "email": email,
        "name": display_name,
        "display_name": display_name,
        "first_name": first_name,
        "last_name": last_name,
        "avatar": avatar,
        "provider": provider,
        "role": "customer"
    }
    return create_access_token(token_payload)


# ── 1. Google OAuth2 Endpoint ────────────────────────────────────────────────
@router.get("/google")
async def google_auth_callback(
    code: Optional[str] = Query(None),
    redirect_uri: str = Query("http://localhost:3001/auth/success"),
    db: Session = Depends(lambda: None)  # แทนที่ด้วย Depends(get_db)
):
    """
    รับ Code จาก Google OAuth2 หรือแลกเปลี่ยน Token เพื่อเข้าสู่ระบบ
    """
    if not code:
        # Redirect ไปยังหน้า Google Login
        google_url = (
            f"https://accounts.google.com/o/oauth2/v2/auth?"
            f"response_type=code&client_id={GOOGLE_CLIENT_ID}&"
            f"redirect_uri={redirect_uri}&scope=openid%20profile%20email"
        )
        return RedirectResponse(url=google_url)

    # แลกเปลี่ยน code เป็น token
    async with httpx.AsyncClient() as client:
        token_res = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": redirect_uri,
                "grant_type": "authorization_code"
            }
        )
        token_data = token_res.json()
        access_token = token_data.get("access_token")

        # ดึง Profile
        userinfo_res = await client.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        userinfo = userinfo_res.json()

    email = userinfo.get("email")
    name = userinfo.get("name") or email.split("@")[0]
    picture = userinfo.get("picture")

    jwt_token = sync_user_and_customer(db, email, name, picture, "google")
    return RedirectResponse(url=f"{redirect_uri}?token={jwt_token}")


# ── 2. LINE OAuth2 Endpoint ──────────────────────────────────────────────────
@router.get("/line")
async def line_auth_callback(
    code: Optional[str] = Query(None),
    redirect_uri: str = Query("http://localhost:3001/auth/success"),
    db: Session = Depends(lambda: None)  # แทนที่ด้วย Depends(get_db)
):
    """
    รับ Code จาก LINE Login และเข้าสู่ระบบ
    """
    if not code:
        line_url = (
            f"https://access.line.me/oauth2/v2.1/authorize?"
            f"response_type=code&client_id={LINE_CLIENT_ID}&"
            f"redirect_uri={redirect_uri}&state=bottleclub&scope=profile%20openid%20email"
        )
        return RedirectResponse(url=line_url)

    async with httpx.AsyncClient() as client:
        token_res = await client.post(
            "https://api.line.me/oauth2/v2.1/token",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            data={
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": redirect_uri,
                "client_id": LINE_CLIENT_ID,
                "client_secret": LINE_CLIENT_SECRET,
            }
        )
        token_data = token_res.json()
        id_token = token_data.get("id_token")

        # ถอดข้อมูล LINE ID Token
        profile_res = await client.post(
            "https://api.line.me/oauth2/v2.1/verify",
            data={"id_token": id_token, "client_id": LINE_CLIENT_ID}
        )
        profile = profile_res.json()

    line_user_id = profile.get("sub")
    name = profile.get("name") or "LINE User"
    picture = profile.get("picture")
    email = profile.get("email") or f"{line_user_id}@line.me"

    jwt_token = sync_user_and_customer(db, email, name, picture, "line")
    return RedirectResponse(url=f"{redirect_uri}?token={jwt_token}")
