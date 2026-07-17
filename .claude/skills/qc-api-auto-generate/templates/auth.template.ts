// helpers/api/auth.ts — role-based API auth contexts (contract: .claude/config/api-shared/auth-strategy.md).
// Tokens live in memory for the run (or come from .env) — NEVER logged, NEVER written to files.
import { request, APIRequestContext } from '@playwright/test';
import { loadTestData } from '../test-data';
import { conventions, atPath } from './api-conventions';

const cache = new Map<string, APIRequestContext>();

function apiBaseURL(): string {
  const url = process.env.API_BASE_URL;
  if (!url) throw new Error('API_BASE_URL chưa được inject — chạy qua qc-auto-run, hoặc export API_BASE_URL (non-prod).');
  if (/prod/i.test(url)) throw new Error('API_BASE_URL looks like production — refusing.');
  return url;
}

/** Portal base URL for MIX specs (test.use({ baseURL: portalUrl('ORG') })). */
export function portalUrl(portal: string): string {
  const url = process.env[`BASE_URL_${portal.toUpperCase()}`];
  if (!url) throw new Error(`BASE_URL_${portal.toUpperCase()} chưa được inject — chạy qua qc-auto-run.`);
  if (/prod/i.test(url)) throw new Error(`BASE_URL_${portal.toUpperCase()} looks like production — refusing.`);
  return url;
}

/** Authenticated context for a role key from the api data md ## Accounts (cached per run). */
export async function ctxFor(uc: string, roleKey: string): Promise<APIRequestContext> {
  const cacheKey = `${uc}:${roleKey}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;
  const { account } = loadTestData(uc, { api: true });
  const { auth } = conventions;
  let ctx: APIRequestContext;

  if (auth.mode === 'env-token') {
    const token = process.env[`API_TOKEN_${roleKey.toUpperCase()}`];
    if (!token) throw new Error(`Thiếu API_TOKEN_${roleKey.toUpperCase()} trong .env — xem project-config §7.`);
    ctx = await request.newContext({ baseURL: apiBaseURL(), extraHTTPHeaders: auth.header(token) });
  } else {
    const { username, password } = account(roleKey); // credentials resolved at runtime from project-config §4
    const login = await request.newContext({ baseURL: apiBaseURL() });
    const res = await login.post(auth.loginEndpoint, { data: auth.loginBody(username, password) });
    if (!res.ok()) throw new Error(`Login API thất bại cho role "${roleKey}" (${res.status()}) — kiểm tra project-config §4/§7.`);
    if (auth.mode === 'cookie') {
      ctx = login; // session cookie sống trong chính context này
    } else {
      const token = String(atPath(await res.json(), auth.tokenPath) ?? '');
      await login.dispose();
      if (!token) throw new Error(`Không tìm thấy token tại "${auth.tokenPath}" trong response login — sửa helpers/api/api-conventions.ts.`);
      ctx = await request.newContext({ baseURL: apiBaseURL(), extraHTTPHeaders: auth.header(token) });
    }
  }
  cache.set(cacheKey, ctx);
  return ctx;
}

/** Unauthenticated context (permission cases: no token). */
export async function ctxNoAuth(): Promise<APIRequestContext> {
  return request.newContext({ baseURL: apiBaseURL() });
}

/** Malformed-token context (permission cases: invalid token). */
export async function ctxInvalid(): Promise<APIRequestContext> {
  return request.newContext({ baseURL: apiBaseURL(), extraHTTPHeaders: conventions.auth.header('invalid.token.value') });
}

export async function disposeAll(): Promise<void> {
  await Promise.all([...cache.values()].map(c => c.dispose().catch(() => {})));
  cache.clear();
}
