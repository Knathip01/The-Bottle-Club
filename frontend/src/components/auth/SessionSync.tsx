'use client';

import { useEffect } from 'react';

interface SessionSyncProps {
  accessToken?: string;
}

/**
 * Syncs the server-side session access_token into localStorage
 * so client components (checkout, product detail, etc.) can read it.
 * Renders nothing visible.
 */
export default function SessionSync({ accessToken }: SessionSyncProps) {
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    } else {
      localStorage.removeItem('access_token');
    }
  }, [accessToken]);

  return null;
}
