// tests/mix/<UC-ID>/<flow>.spec.ts — MIX: UI↔API consistency (TC_MIX_*, scope Both only).
// UI layer = the portal's EXISTING page objects/flows (built by qc-func-auto-generate — never built here);
// API layer = services + expect-api. Portal baseURL bound per-spec via test.use + portalUrl().
import { test, expect } from '@playwright/test';
import { loadTestData } from '../../../helpers/test-data';
import { ctxFor, portalUrl, disposeAll } from '../../../helpers/api/auth';
import { expectSuccess } from '../../../helpers/api/expect-api';
import * as users from '../../../services/users.service';
import { UserListPage } from '../../../portals/admin/pages/user-list.page';

const UC = 'UC-101';
const { vars } = loadTestData(UC, { api: true });

test.use({ baseURL: portalUrl('ADMIN') });

test.describe('MIX users — UC-101', () => {
  test.afterAll(async () => { await disposeAll(); });

  test('TC_MIX_001 — user tạo qua API hiển thị đúng trên danh sách UI', { tag: '@P2' }, async ({ page }) => {
    const d = vars('TC_MIX_001');
    const admin = await ctxFor(UC, 'adminUser');

    // API action — outcome mức hành vi (expected-and-verify-policy v4): baseline ghi status thật ở lần chạy đầu.
    const res = await users.createUser(admin, d.payloadHopLe);
    await expectSuccess(res, { uc: UC, tcId: 'TC_MIX_001' });
    const created = await res.json();

    // UI verification (page object của nhánh UI):
    const list = new UserListPage(page);
    await list.open();
    await list.searchByName(String((d.payloadHopLe as any).name));
    await expect(list.rowByIdentity(created.email)).toBeVisible();
  });

  // Chiều ngược lại (UI action → API check): thao tác qua page object rồi gọi service GET so từng trường.
});
