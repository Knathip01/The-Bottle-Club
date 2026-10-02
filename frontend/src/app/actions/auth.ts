'use server'

import { login as setAuthSession, logout as clearAuthSession, getSession } from '@/lib/auth-utils';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';

export async function syncSession() {
  const session = await getSession();
  if (!session || !session.user || !session.user.access_token) return null;

  try {
    // Exclusively query /api/v1/auth/me (FastAPI Wayneven Swagger endpoint)
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
      headers: {
        'Authorization': `Bearer ${session.user.access_token}`,
      },
      cache: 'no-store',
    });

    if (response.ok) {
      const parsed = await response.json();
      const userData = parsed.data || parsed;
      let points = Number(userData.points ?? userData.loyalty_points ?? userData.loyalty_points_balance ?? session.user.points ?? 0);

      // Attempt to fetch fresh loyalty points from /api/v1/loyalty/balance/{id}
      const customerId = userData.id || session.user.id;
      if (customerId) {
        try {
          const loyaltyRes = await fetch(`${API_BASE_URL}/api/v1/loyalty/balance/${customerId}`, {
            headers: {
              'Authorization': `Bearer ${session.user.access_token}`,
            },
            cache: 'no-store',
          });
          if (loyaltyRes.ok) {
            const loyaltyData = await loyaltyRes.json();
            if (loyaltyData && typeof loyaltyData.balance === 'number') {
              points = loyaltyData.balance;
            }
          }
        } catch {
          // ignore error if customer loyalty record doesn't exist yet
        }
      }

      const updatedUser = {
        ...session.user,
        ...userData,
        points,
        loyalty_points: points,
        first_name: userData.first_name || userData.display_name?.split(' ')[0] || session.user.first_name,
        last_name: userData.last_name || userData.display_name?.split(' ')[1] || session.user.last_name,
      };
      return updatedUser;
    }
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
    console.error('Registration error:', error);
    return { error: 'Could not contact the server. Please try again.' };
  }

  redirect('/login?registered=true');
}

export async function login(formData: LoginFormData) {
  const { email, password } = formData;

  if (!email || !password) {
    return { error: 'Please enter your email and password.' };
  }

  try {
    // Exclusively query /api/v1/auth/login (Swagger/FastAPI endpoint)
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password
      }),
    });

    let data: AuthPayload;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const parsed = await response.json();
      data = isRecord(parsed) ? parsed : {};
    } else {
      const text = await response.text();
      console.error('Login API Non-JSON Response:', text);
      return { error: 'Login failed: invalid server response.' };
    }

    if (!response.ok) {
      return { error: getApiMessage(data, 'Invalid email or password.') };
    }

    let sessionUser: any = normalizeAuthSession(data, email);
    const token = getAuthToken(data);

    // Fetch full profile info from /api/v1/auth/me if available
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
            points: profile.points || sessionUser.points || 0,
          };
        }
      } catch (err) {
        console.warn('Could not fetch user profile from /api/v1/auth/me:', err);
      }
    }

    await setAuthSession(sessionUser);
    revalidatePath('/');
    return { success: true, token };
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    console.error('Login error:', error);
    return { error: 'Could not contact the server. Please try again.' };
  }
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
  const customerId = session.user.id;

  try {
    if (token && customerId) {
      // 1. Update customer in FastAPI CRM
      try {
        await fetch(`${API_BASE_URL}/api/v1/customers/${customerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
      try {
        await fetch(`${API_BASE_URL}/api/v1/users/${customerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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

    // 3. Update session cookie
    const updatedUser = {
      ...session.user,
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
