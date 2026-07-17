// tests/api/<UC-ID>/<resource>.spec.ts — one spec PER RESOURCE; titles carry TC IDs (TC_API_*).
// Requests via service functions; assertions via helpers/api/expect-api; auth via role contexts.
// Outcome asserts are BEHAVIOR-level (expected-and-verify-policy v4): expectSuccess/expectFailure with
// {uc, tcId} record exact status/message into api-baselines/<UC-ID>_api-baseline.json at first run and
// assert them exactly afterwards. Pass exactStatus/exactMessage ONLY when the doc provides the value.
import { test } from '@playwright/test';
import { loadTestData } from '../../../helpers/test-data';
import { ctxFor, ctxNoAuth, disposeAll } from '../../../helpers/api/auth';
import { expectSuccess, expectFailure, expectStatus, expectSchema, expectFields } from '../../../helpers/api/expect-api';
import * as users from '../../../services/users.service';

const UC = 'UC-101';
const { vars } = loadTestData(UC, { api: true });

test.describe('users — UC-101', () => {
  let admin: Awaited<ReturnType<typeof ctxFor>>;

  test.beforeAll(async () => { admin = await ctxFor(UC, 'adminUser'); });
  test.afterAll(async () => { await disposeAll(); });

  test('TC_API_001 — tạo user thành công với payload hợp lệ', { tag: '@P1' }, async () => {
    const d = vars('TC_API_001');
    const res = await users.createUser(admin, d.payloadHopLe);
    // Behavior-level success: first run RECORDS the observed status into the api-baseline; later runs assert it.
    await expectSuccess(res, { uc: UC, tcId: 'TC_API_001' });
    await expectSchema(res, 'User');
    const body = await res.json();
    // side-effect: GET-after-write (expected-and-verify-policy §5) — verify step, not the TC outcome
    const check = await users.getUser(admin, body.id);
    await expectStatus(check, 200);
    expectFields(await check.json(), d.payloadHopLe as Record<string, unknown>, ['email', 'name']);
  });

  test('TC_API_002 — tạo user thất bại khi thiếu trường "email" (bị từ chối, không có bản ghi)', { tag: '@P2' }, async () => {
    const d = vars('TC_API_002');
    const res = await users.createUser(admin, d.payloadThieuEmail);
    // Behavior-level failure: 4xx + error body non-empty; exact status/message pinned by the api-baseline.
    // NEVER assert a UI display text against the API body (policy §3).
    await expectFailure(res, { uc: UC, tcId: 'TC_API_002' });
    // no-change guard (REQUIRED for rejected writes):
    const list = await users.listUsers(admin, { search: String((d.payloadThieuEmail as any).name) });
    await expectStatus(list, 200);
    test.expect((await list.json()).items ?? []).toHaveLength(0);
  });

  test('TC_API_010 — bị chặn khi gọi tạo user không có token', { tag: '@P1' }, async () => {
    const anon = await ctxNoAuth();
    const res = await users.createUser(anon, vars('TC_API_010').payloadHopLe);
    // exactStatus CHỈ khi doc nêu sẵn (vd swagger liệt kê 401 — rung 2); doc không nêu → bỏ exactStatus.
    await expectFailure(res, { uc: UC, tcId: 'TC_API_010', exactStatus: 401 });
    await anon.dispose();
  });

  // … one test() per TC of THIS resource …
});
