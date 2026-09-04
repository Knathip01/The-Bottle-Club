import { Pool } from 'pg';

// ── Next.js Hot-Reload Safe Singleton ─────────────────────────────────────────
// In Next.js dev mode, modules are re-evaluated on every hot reload.
// Using a module-level `let pool` would create a new Pool on every reload,
// causing "Connection terminated unexpectedly" errors on the old pool's connections.
// The fix: store the Pool on the `global` object, which persists across reloads.
declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

function createPool(): Pool {
  if (!process.env.DATABASE_URL) {
    // No DB configured — return a dummy pool that throws on use
    console.warn('[DB] DATABASE_URL is not set. DB queries will fail gracefully.');
  }

  const newPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('localhost')
      ? false
      : { rejectUnauthorized: false }, // Required for Render / managed PostgreSQL
    max: 5,                     // keep pool small to avoid exhausting Render's limits
    idleTimeoutMillis: 30000,   // release idle connections after 30s
    connectionTimeoutMillis: 8000, // give up connecting after 8s
    allowExitOnIdle: false,
  });

  newPool.on('error', (err) => {
    // Swallow pool-level errors so they don't crash Next.js dev server
    console.warn('[DB Pool] Idle client error (safe to ignore in dev):', err.message);
  });

  return newPool;
}

function getPool(): Pool {
  // In production: module is loaded once, singleton is fine
  // In dev: reuse pool from global to survive hot reloads
  if (process.env.NODE_ENV === 'production') {
    if (!global.__pgPool) {
      global.__pgPool = createPool();
    }
    return global.__pgPool;
  }

  // Dev: always use global singleton
  if (!global.__pgPool) {
    global.__pgPool = createPool();
  }
  return global.__pgPool;
}

/**
 * Execute a parameterised query with automatic retry on transient errors.
 * If DATABASE_URL is not set, throws immediately so callers can catch and fallback.
 */
export async function query(text: string, params?: any[]) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured');
  }

  const p = getPool();

  try {
    return await p.query(text, params);
  } catch (err: any) {
    const isTransient =
      err?.code === 'ECONNRESET' ||
      err?.code === 'ECONNREFUSED' ||
      err?.code === '57P01' ||            // admin_shutdown (Render restarts)
      err?.message?.includes('Connection terminated') ||
      err?.message?.includes('connection terminated') ||
      err?.message?.includes('Client was closed') ||
      err?.message?.includes('terminating connection');

    if (isTransient) {
      console.warn('[DB] Transient connection error, waiting 500ms then retrying:', err.message);

      // Wait briefly before retry to let the pool recover
      await new Promise<void>((resolve) => setTimeout(resolve, 500));

      try {
        return await getPool().query(text, params);
      } catch (retryErr: any) {
        // Retry also failed — throw a clean error so callers can fallback gracefully
        console.warn('[DB] Retry failed, giving up:', retryErr.message);
        throw retryErr;
      }
    }

    throw err;
  }
}

export default getPool();
