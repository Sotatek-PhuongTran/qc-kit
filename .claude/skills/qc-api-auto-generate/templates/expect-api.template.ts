// helpers/api/expect-api.ts — assertion helpers for API specs (contract: api-shared/expected-and-verify-policy.md (v4)).
// Two-tier model: specs assert BEHAVIOR class by default; exact status/message come from the doc or the
// api-baseline (recorded at first run, per-UC living JSON — logical name `api-baseline`). QC/BE edit ONLY
// the `confirmed` field of baseline entries.
import { expect, APIResponse } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import { conventions, atPath } from './api-conventions';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // ESM-safe (package.json has "type": "module")

const ajv = new Ajv({ allErrors: true, strict: false });
const compiled = new Map<string, ReturnType<typeof ajv.compile>>();
const BASELINE_DIR = process.env.API_BASELINE_DIR ?? path.join(__dirname, '..', '..', '..', 'api-baselines');

type BaselineEntry = { status: number; message: string; recordedAt: string; confirmed: boolean };
type Baseline = Record<string, BaselineEntry>;

function baselinePath(uc: string): string { return path.join(BASELINE_DIR, `${uc}_api-baseline.json`); }
function loadBaseline(uc: string): Baseline {
  const p = baselinePath(uc);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
}
function saveBaseline(uc: string, b: Baseline): void {
  fs.mkdirSync(BASELINE_DIR, { recursive: true });
  fs.writeFileSync(baselinePath(uc), JSON.stringify(b, null, 2) + '\n', 'utf8');
}
async function bodyMessage(res: APIResponse): Promise<string> {
  try { return String(atPath(await res.json(), conventions.errorBody.messagePath) ?? ''); }
  catch { return ''; }
}

/** SUCCESS outcome: 2xx (exact status when doc/baseline gives one). Side-effect checks follow separately. */
export async function expectSuccess(res: APIResponse, opts: { uc?: string; tcId?: string; exactStatus?: number } = {}): Promise<void> {
  if (opts.exactStatus !== undefined) { await expectStatus(res, opts.exactStatus); return; }
  await expectViaBaseline(res, { ...opts, klass: 'success' });
}

/** FAILURE outcome: 4xx + error body non-empty. HARD rules: 2xx always fails; 5xx always fails (input not controlled). */
export async function expectFailure(res: APIResponse, opts: { uc?: string; tcId?: string; exactStatus?: number; exactMessage?: string } = {}): Promise<void> {
  const s = res.status();
  expect(s >= 200 && s < 300, `Case thất bại nhưng server trả 2xx (${s}) — function vẫn chạy`).toBe(false);
  expect(s >= 500, `Lỗi input nhưng server trả 5xx (${s}) — ứng viên bug thật (server không kiểm soát input): ${(await res.text()).slice(0, 300)}`).toBe(false);
  if (opts.exactStatus !== undefined) expect(s).toBe(opts.exactStatus);
  const msg = await bodyMessage(res);
  expect(msg.length, 'Error body không có message mô tả lỗi (kiểm tra api-conventions.errorBody paths)').toBeGreaterThan(0);
  if (opts.exactMessage !== undefined) expect(msg).toBe(opts.exactMessage);
  if (opts.exactStatus === undefined && opts.exactMessage === undefined) await expectViaBaseline(res, { ...opts, klass: 'failure', observedMessage: msg });
}

/** Baseline record/assert (policy §4). Record mode: pin observed values. Assert mode: exact match. */
async function expectViaBaseline(res: APIResponse, opts: { uc?: string; tcId?: string; klass: 'success' | 'failure'; observedMessage?: string }): Promise<void> {
  if (!opts.uc || !opts.tcId) return; // class-level only — no baseline requested
  const b = loadBaseline(opts.uc);
  const entry = b[opts.tcId];
  const observed: BaselineEntry = {
    status: res.status(),
    message: opts.observedMessage ?? (opts.klass === 'failure' ? await bodyMessage(res) : ''),
    recordedAt: new Date().toISOString().slice(0, 10),
    confirmed: false,
  };
  if (!entry) { b[opts.tcId] = observed; saveBaseline(opts.uc, b); console.log(`[api-baseline] RECORDED ${opts.tcId}: ${observed.status} "${observed.message}"`); return; }
  expect(res.status(), `${opts.tcId}: status lệch baseline${entry.confirmed ? ' (ĐÃ confirm — ứng viên bug)' : ' (chưa confirm — re-record hoặc hỏi BE)'}`).toBe(entry.status);
  if (opts.klass === 'failure' && entry.message) {
    expect(observed.message, `${opts.tcId}: message lệch baseline${entry.confirmed ? ' (ĐÃ confirm)' : ' (chưa confirm)'}`).toBe(entry.message);
  }
}

/** Relative assertion: two cases MUST answer identically (e.g. chống dò tài khoản) — no content knowledge needed. */
export async function expectSameResponse(res1: APIResponse, res2: APIResponse): Promise<void> {
  expect(res2.status(), 'Hai case phải trả về CÙNG status').toBe(res1.status());
  expect(await bodyMessage(res2), 'Hai case phải trả về CÙNG message').toBe(await bodyMessage(res1));
}

export async function expectStatus(res: APIResponse, status: number): Promise<void> {
  const detail = res.status() === status ? '' : ` — body: ${(await res.text()).slice(0, 300)}`;
  expect(res.status(), `Expected ${status}, got ${res.status()}${detail}`).toBe(status);
}

/** Assert the documented error body: message (verbatim) and/or code, via the project's error paths. */
export async function expectErrorBody(res: APIResponse, opts: { message?: string; code?: string }): Promise<void> {
  const body = await res.json();
  if (opts.message !== undefined) expect(String(atPath(body, conventions.errorBody.messagePath))).toBe(opts.message);
  if (opts.code !== undefined) expect(String(atPath(body, conventions.errorBody.codePath))).toBe(opts.code);
}

/** Validate the response body against runner/schemas/<name>.json (ajv). */
export async function expectSchema(res: APIResponse, schemaName: string): Promise<void> {
  if (!compiled.has(schemaName)) {
    const file = path.join(__dirname, '..', '..', 'schemas', `${schemaName}.json`);
    if (!fs.existsSync(file)) throw new Error(`Schema not found: schemas/${schemaName}.json — chạy lại parse-api-doc --schemas.`);
    compiled.set(schemaName, ajv.compile(JSON.parse(fs.readFileSync(file, 'utf8'))));
  }
  const validate = compiled.get(schemaName)!;
  const body = await res.json();
  expect(validate(body), `Schema "${schemaName}" mismatch: ${JSON.stringify(validate.errors)}`).toBe(true);
}

/** Assert selected fields of a body match the sent payload (side-effect verification). */
export function expectFields(body: any, payload: Record<string, unknown>, fields: string[]): void {
  for (const f of fields) expect(body?.[f], `Field "${f}"`).toEqual(payload[f]);
}
