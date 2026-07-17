// services/<resource>.service.ts — request wrappers for ONE resource (the API analog of a page object).
// NO assertions, NO auth logic here — contexts come in authenticated (helpers/api/auth.ts).
// source: api-audited v<N> | digest: <YYYY-MM-DD>          ← staleness stamp (update trigger B)
import { APIRequestContext, APIResponse } from '@playwright/test';

// Endpoints are RELATIVE paths, VERBATIM from the API test-case md (bound from the digest).

export function createUser(ctx: APIRequestContext, payload: Record<string, unknown>): Promise<APIResponse> {
  return ctx.post('/api/v1/users', { data: payload });
}

export function getUser(ctx: APIRequestContext, id: string): Promise<APIResponse> {
  return ctx.get(`/api/v1/users/${id}`);
}

export function listUsers(ctx: APIRequestContext, query: Record<string, string | number> = {}): Promise<APIResponse> {
  return ctx.get('/api/v1/users', { params: query });
}

// Raw-body variant for malformed-JSON / wrong-Content-Type cases (api-feasibility §2):
export function createUserRaw(ctx: APIRequestContext, rawBody: string, contentType = 'application/json'): Promise<APIResponse> {
  return ctx.post('/api/v1/users', { headers: { 'Content-Type': contentType }, data: rawBody });
}
