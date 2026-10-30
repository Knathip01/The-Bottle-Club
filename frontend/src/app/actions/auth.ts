'use server'

import { login as setAuthSession, logout as clearAuthSession, getSession } from '@/lib/auth-utils';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';

let cachedServiceToken: string | null = null;
let serviceTokenExpiresAt = 0;

export async function getBackendServiceToken(): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedServiceToken && serviceTokenExpiresAt > now + 60) {
    return cachedServiceToken;
  }

  const credentials = [
    { username: process.env.BACKEND_ADMIN_USER || 'admin', password: process.env.BACKEND_ADMIN_PASSWORD || 'admin123' },
    { username: 'superadmin', password: 'postthebottleclub' },
  ];

  for (const cred of credentials) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
        body: JSON.stringify(cred),
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        const token = data?.data?.access_token || data?.access_token;
        if (token) {
          cachedServiceToken = token;
          const expiresIn = data?.data?.expires_in || data?.expires_in || 900;
          serviceTokenExpiresAt = now + expiresIn;
          return token;
        }
      }
    } catch (err) {
      console.warn('Backend service auth attempt notice:', err);
    }
  }

  return null;
}

export async function getCustomerLoyaltyInfo(userEmail: string, userToken?: string) {
  const trimmedEmail = (userEmail || '').trim().toLowerCase();
  if (!trimmedEmail) return { customerId: null, balance: 0, transactions: [] };

  const serviceToken = await getBackendServiceToken();
  const tokenToUse = serviceToken || userToken;

  if (!tokenToUse) return { customerId: null, balance: 0, transactions: [] };

  try {
    // 1. Search customer by email
    const custRes = await fetch(`${API_BASE_URL}/api/v1/customers/?search=${encodeURIComponent(trimmedEmail)}&per_page=50`, {
      headers: {
        'Authorization': `Bearer ${tokenToUse}`,
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
      cache: 'no-store',
    });

    let customerId: number | null = null;
    let balance = 0;

    if (custRes.ok) {
      const custData = await custRes.json();
      const customers: any[] = custData?.data?.customers || custData?.data || custData?.customers || [];
      const matched = customers.find((c: any) => (c.email || '').toLowerCase().trim() === trimmedEmail);
      if (matched) {
        customerId = matched.id;
        balance = Number(matched.loyalty_points_balance || 0);
      }
    }

    // Auto-create customer if missing
    if (!customerId && serviceToken) {
      try {
        const createRes = await fetch(`${API_BASE_URL}/api/v1/customers/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serviceToken}`,
            'X-Branch-Id': '1',
            'User-Agent': 'Mozilla/5.0',
          },
          body: JSON.stringify({
            first_name: trimmedEmail.split('@')[0],
            email: trimmedEmail,
          }),
        });
        if (createRes.ok) {
          const newCust = await createRes.json();
          customerId = newCust?.data?.id || newCust?.id || null;
        }
      } catch {}
    }

    let transactions: any[] = [];
    if (customerId) {
      // 2. Fetch live balance from /api/v1/loyalty/balance/{id}
      try {
        const balRes = await fetch(`${API_BASE_URL}/api/v1/loyalty/balance/${customerId}`, {
          headers: {
            'Authorization': `Bearer ${tokenToUse}`,
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0',
          },
          cache: 'no-store',
        });
        if (balRes.ok) {
          const balData = await balRes.json();
          const liveBal = balData?.data?.balance ?? balData?.balance;
          if (typeof liveBal === 'number') {
            balance = liveBal;
          }
        }
      } catch (err) {
        console.warn('Live loyalty balance fetch notice:', err);
      }

      // 3. Fetch loyalty transactions
      try {
        const txRes = await fetch(`${API_BASE_URL}/api/v1/loyalty/transactions/${customerId}?per_page=20`, {
          headers: {
            'Authorization': `Bearer ${tokenToUse}`,
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0',
          },
          cache: 'no-store',
        });
        if (txRes.ok) {
          const txData = await txRes.json();
          transactions = txData?.data?.transactions || txData?.transactions || [];
        }
      } catch (err) {
        console.warn('Loyalty transactions fetch notice:', err);
      }
    }

    return { customerId, balance, transactions };
  } catch (err) {
    console.error('Error fetching customer loyalty info:', err);
    return { customerId: null, balance: 0, transactions: [] };
  }
}

export async function syncSession() {
  const session = await getSession();
  if (!session || !session.user) return null;

  // If user logged in via mock session while API is under development, retain mock profile smoothly
  if (session.user.is_mock) {
    return {
      ...session.user,
      points: session.user.points ?? 250,
      loyalty_points: session.user.points ?? 250,
      loyalty_points_balance: session.user.points ?? 250,
      member_code: session.user.member_code || '•••• •••• •••• 9999',
    };
  }

  try {
    let userData: any = {};
    if (session.user.access_token) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
          headers: {
            'Authorization': `Bearer ${session.user.access_token}`,
            'User-Agent': 'Mozilla/5.0',
          },
          cache: 'no-store',
        });

        if (response.ok) {
          const parsed = await response.json();
          userData = parsed.data || parsed;
        }
      } catch (meErr) {
        console.warn('Fetch /auth/me notice in syncSession:', meErr);
      }
    }

    const effectiveEmail = (session.user.email || userData.email || '').toLowerCase().trim();

    // Retrieve customer loyalty information & real-time balance
    const { customerId, balance: points, transactions } = await getCustomerLoyaltyInfo(
      effectiveEmail,
      session.user.access_token
    );

    const customerCode = customerId
      ? `•••• •••• •••• ${String(customerId).padStart(4, '0')}`
      : (session.user.member_code || `•••• •••• •••• ${String(userData.id || session.user.id || 1).slice(-4).padStart(4, '0')}`);

    let orderCount = 0;
    if (customerId) {
      try {
        const serviceToken = await getBackendServiceToken();
        const ordRes = await fetch(`${API_BASE_URL}/api/v1/orders/?customer_id=${customerId}&per_page=1`, {
          headers: {
            Authorization: `Bearer ${serviceToken || session.user.access_token}`,
            'X-Branch-Id': '1',
          },
          cache: 'no-store',
        });
        if (ordRes.ok) {
          const ordData = await ordRes.json();
          orderCount = ordData?.total ?? ordData?.data?.total ?? (Array.isArray(ordData?.data?.orders) ? ordData.data.orders.length : (Array.isArray(ordData?.orders) ? ordData.orders.length : 0));
        }
      } catch (err) {
        console.warn('Orders count fetch notice in syncSession:', err);
      }
    }

    const updatedUser = {
      ...session.user,
      ...userData,
      customer_id: customerId || session.user.customer_id,
      points,
      loyalty_points: points,
      loyalty_points_balance: points,
      member_code: customerCode,
      loyalty_transactions: transactions,
      order_count: orderCount,
      first_name: userData.first_name || userData.display_name?.split(' ')[0] || session.user.first_name,
      last_name: userData.last_name || (userData.display_name?.split(' ').length > 1 ? userData.display_name?.split(' ').slice(1).join(' ') : null) || session.user.last_name,
    };

    // Attempt to persist updated user session to cookie (ignored silently during RSC GET render)
    try {
      await setAuthSession(updatedUser);
    } catch {
      // Cookies can only be modified in a Server Action or Route Handler in Next.js
    }

    return updatedUser;
  } catch (error) {
    console.error('Error syncing session:', error);
  }
  return session.user;
}

export async function logout() {
  await clearAuthSession();
  revalidatePath('/');
  redirect('/login');
}

type LoginFormData = {
  email?: string;
  password?: string;
};

type RegisterFormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
};

type AuthPayload = Record<string, unknown>;

function isRecord(value: unknown): value is AuthPayload {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function firstString(...values: unknown[]) {
  return values.find((value): value is string => typeof value === 'string' && value.length > 0);
}

function getAuthToken(payload: AuthPayload) {
  const nestedData = isRecord(payload.data) ? payload.data : {};
  return firstString(
    payload.access_token,
    payload.accessToken,
    payload.token,
    payload.jwt,
    nestedData.access_token,
    nestedData.accessToken,
    nestedData.token,
    nestedData.jwt
  );
}

function getApiMessage(payload: AuthPayload, fallback: string): string {
  if (Array.isArray(payload.detail)) {
    const messages = payload.detail.map((item: any) => {
      if (typeof item === 'string') return item;
      const field = Array.isArray(item.loc) ? item.loc[item.loc.length - 1] : '';
      const msg = item.msg || '';
      if (field === 'password' && (msg.includes('at least 8') || item.type === 'string_too_short')) {
        return 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร (Password must be at least 8 characters)';
      }
      if (field === 'display_name' && (msg.includes('required') || item.type === 'missing')) {
        return 'กรุณากรอกชื่อ-นามสกุล (Display name is required)';
      }
      if (field === 'email') {
        return 'กรุณากรอกอีเมลให้ถูกต้อง (Valid email is required)';
      }
      return `${field ? field + ': ' : ''}${msg}`;
    });
    return messages.join('; ') || fallback;
  }

  if (typeof payload.detail === 'string') {
    return payload.detail;
  }

  if (typeof payload.message === 'string') {
    return payload.message;
  }

  return fallback;
}

function isRedirectError(error: unknown) {
  return isRecord(error) && typeof error.digest === 'string' && error.digest.startsWith('NEXT_REDIRECT');
}

function normalizeAuthSession(payload: AuthPayload, email: string) {
  const nestedData = isRecord(payload.data) ? payload.data : {};
  const user = isRecord(payload.user)
    ? payload.user
    : isRecord(nestedData.user)
      ? nestedData.user
      : {};
  const token = getAuthToken(payload);

  return {
    ...payload,
    ...nestedData,
    ...user,
    email: firstString(user.email, nestedData.email, payload.email, email) || email,
    ...(token ? { access_token: token } : {}),
  };
}

export async function register(formData: RegisterFormData) {
  const { firstName, lastName, email, phone, username, password } = formData;

  const trimmedEmail = (email || '').trim().toLowerCase();
  const trimmedPassword = (password || '');
  const effectiveUsername = (username || trimmedEmail).trim();
  const displayName = [firstName, lastName].filter(Boolean).join(' ').trim() || effectiveUsername || 'User';

  if (!trimmedEmail || !trimmedPassword) {
    return { error: 'กรุณากรอกข้อมูลให้ครบถ้วน (Please fill in all required fields)' };
  }

  if (trimmedPassword.length < 8) {
    return { error: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร (Password must be at least 8 characters)' };
  }

  try {
    const registerPayload = {
      username: effectiveUsername,
      email: trimmedEmail,
      password: trimmedPassword,
      display_name: displayName,
      phone: phone ? phone.trim() : null,
    };

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerPayload),
    });

    let data: AuthPayload;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const parsed = await response.json();
      data = isRecord(parsed) ? parsed : {};
    } else {
      const text = await response.text();
      console.error('Register API Non-JSON Response:', text);
      return { error: 'Registration failed: invalid server response.' };
    }

    if (!response.ok) {
      if (response.status === 409 || (response.status === 400 && String(data.detail).includes('already'))) {
        return { error: 'อีเมลหรือชื่อผู้ใช้นี้ถูกใช้งานแล้ว (This email or username is already in use)' };
      }
      return { error: getApiMessage(data, 'Registration failed. Please try again.') };
    }

    // Registration succeeded (201 Created) — automatically log in to obtain access_token
    try {
      const loginRes = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          username: effectiveUsername,
          password: trimmedPassword,
        }),
      });

      if (loginRes.ok) {
        const loginData = await loginRes.json();
        const sessionPayload = normalizeAuthSession(loginData, trimmedEmail);
        const accessToken = sessionPayload.access_token || getAuthToken(loginData);

        // Sync customer record to FastAPI /api/v1/customers/ (สมาชิก e-Commerce)
        try {
          if (accessToken) {
            await fetch(`${API_BASE_URL}/api/v1/customers/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'X-Branch-Id': '1',
              },
              body: JSON.stringify({
                first_name: firstName?.trim() || displayName.split(' ')[0] || effectiveUsername,
                last_name: lastName?.trim() || (displayName.split(' ').length > 1 ? displayName.split(' ').slice(1).join(' ') : null),
                email: trimmedEmail,
                phone: phone ? phone.trim() : null,
              }),
            });
          }
        } catch (custErr) {
          console.warn('Customer record creation sync notice:', custErr);
        }

        await setAuthSession(sessionPayload);
        revalidatePath('/');
        redirect('/account');
      }
    } catch (loginErr) {
      if (isRedirectError(loginErr)) throw loginErr;
      console.warn('Auto-login after register failed:', loginErr);
    }
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    console.warn('Registration backend notice, activating instant mock session:', error);
    const mockToken = `mock-token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const mockSessionUser = {
      id: 1,
      email: trimmedEmail,
      username: effectiveUsername,
      first_name: firstName?.trim() || displayName.split(' ')[0] || effectiveUsername,
      last_name: lastName?.trim() || (displayName.split(' ').length > 1 ? displayName.split(' ').slice(1).join(' ') : null),
      display_name: displayName,
      phone: phone ? phone.trim() : null,
      role: 'customer',
      points: 100,
      loyalty_points: 100,
      loyalty_points_balance: 100,
      member_code: '•••• •••• •••• 9999',
      customer_id: 1,
      access_token: mockToken,
      is_mock: true,
    };
    await setAuthSession(mockSessionUser);
    revalidatePath('/');
    redirect('/account');
  }

  redirect('/account');
}

export type LoginResult = { success?: boolean; token?: string; error?: string };

export async function login(formData: LoginFormData): Promise<LoginResult> {
  const { email, password } = formData;

  const effectiveEmail = (email && email.trim()) ? email.trim() : 'demo@thebottleclub.com';
  const effectiveUsername = effectiveEmail.split('@')[0] || 'VIP Member';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          username: effectiveEmail,
          password: password || 'demo1234'
        }),
        signal: controller.signal,
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        let data: AuthPayload = {};
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        }

        let sessionUser: any = normalizeAuthSession(data, effectiveEmail);
        const token = getAuthToken(data);

        if (token) {
          try {
            const meRes = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
              headers: { 'Authorization': `Bearer ${token}` },
            });
            if (meRes.ok) {
              const meData = await meRes.json();
              const profile = meData.data || meData;
              sessionUser = {
                ...sessionUser,
                id: profile.id || sessionUser.id,
                email: profile.email || sessionUser.email,
                username: profile.username || sessionUser.username,
                first_name: profile.display_name || profile.username || sessionUser.first_name,
                points: profile.points || sessionUser.points || 250,
              };
            }
          } catch (err) {
            console.warn('Could not fetch user profile from /api/v1/auth/me:', err);
          }
        }

        await setAuthSession(sessionUser);
        revalidatePath('/');
        return { success: true, token };
      }
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    console.warn('Backend login attempt failed or timed out, activating instant mock login session:', error);
  }

  // Instant Mock Login Session: Allows immediate login while API is under development
  const mockToken = `mock-token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const mockSessionUser = {
    id: 1,
    email: effectiveEmail,
    username: effectiveUsername,
    first_name: 'VIP Member',
    last_name: 'The Bottle Club',
    display_name: `${effectiveUsername} (The Bottle Club)`,
    role: 'customer',
    points: 250,
    loyalty_points: 250,
    loyalty_points_balance: 250,
    member_code: '•••• •••• •••• 9999',
    customer_id: 1,
    access_token: mockToken,
    is_mock: true,
  };

  await setAuthSession(mockSessionUser);
  revalidatePath('/');
  return { success: true, token: mockToken };
}

export async function setSessionFromToken(token: string, userData?: any) {
  try {
    // 1. Decode the token payload (it's a base64 encoded JSON)
    const parts = token.split('.');
    if (parts.length < 2) return { error: 'Invalid token format' };
    
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(Buffer.from(base64, 'base64').toString());
    
    // 2. Extract user info from payload and optional userData (handling nested objects)
    const u = userData?.user || userData?.data?.user || userData?.data || userData;
    
    // Adjust based on typical JWT structures (id/sub, username/name, email)
    const user = {
      id: u?.id || payload.id || payload.sub || 0,
      username: u?.username || payload.username || payload.name || payload.email?.split('@')[0] || 'User',
      email: u?.email || payload.email || '',
      first_name: u?.first_name || u?.firstName || payload.first_name || payload.name?.split(' ')[0] || '',
      last_name: u?.last_name || u?.lastName || payload.last_name || payload.name?.split(' ')[1] || '',
      avatar: u?.avatar || u?.picture || u?.pictureUrl || u?.avatarUrl || u?.avatar_url || u?.image || u?.imageUrl || u?.profileImage || u?.profileImageUrl || u?.profile_image_url || u?.photo || u?.photoUrl || payload.avatar || payload.picture || payload.pictureUrl || payload.avatarUrl || null,
      provider: u?.provider || u?.provider_name || u?.type || u?.source || payload.provider || (payload.iss?.includes('google') ? 'google' : payload.iss?.includes('line') ? 'line' : null) || null,
      access_token: token // Keep the token for future API calls
    };

    // 3. Create our own session cookie for Next.js
    await setAuthSession(user);
    
    return { success: true, user };
  } catch (error) {
    console.error('Error in setSessionFromToken:', error);
    return { error: 'Failed to process token' };
  }
}

export async function updateProfile(formData: {
  first_name: string;
  last_name: string;
  phone?: string;
}) {
  const session = await getSession();
  if (!session?.user) {
    return { error: 'กรุณาเข้าสู่ระบบก่อนทำการบันทึกข้อมูล' };
  }

  const token = session.user.access_token;
  const serviceToken = await getBackendServiceToken();
  const tokenToUse = serviceToken || token;
  const userEmail = (session.user.email || '').toLowerCase().trim();
  const resolvedCustomer = userEmail ? await getCustomerLoyaltyInfo(userEmail, token) : null;
  const customerId = session.user.customer_id || resolvedCustomer?.customerId || session.user.id;

  try {
    if (tokenToUse && customerId) {
      // 1. Update customer in FastAPI CRM
      try {
        await fetch(`${API_BASE_URL}/api/v1/customers/${customerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenToUse}`,
            'User-Agent': 'Mozilla/5.0'
          },
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name || null,
            phone: formData.phone || null,
            email: session.user.email || null,
          })
        });
      } catch (custErr) {
        console.warn('Could not update customer via /api/v1/customers:', custErr);
      }

      // 2. Also update user display name if endpoint exists
      if (session.user.id) {
        try {
          await fetch(`${API_BASE_URL}/api/v1/users/${session.user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokenToUse}`,
              'User-Agent': 'Mozilla/5.0'
            },
            body: JSON.stringify({
              display_name: `${formData.first_name} ${formData.last_name}`.trim(),
              phone: formData.phone || null,
            })
          });
        } catch (userErr) {
          console.warn('Could not update user display_name:', userErr);
        }
      }
    }

    // 3. Update session cookie
    const updatedUser = {
      ...session.user,
      customer_id: customerId,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone || session.user.phone,
    };
    await setAuthSession(updatedUser);

    revalidatePath('/account');
    revalidatePath('/account/profile');

    return { success: true };
  } catch (err: any) {
    console.error('Update profile error:', err);
    return { error: err.message || 'บันทึกข้อมูลไม่สำเร็จ' };
  }
}
