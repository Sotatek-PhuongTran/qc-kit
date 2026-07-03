// tests/<portal>/<UC-ID>/<screen>.spec.ts — one spec PER SCREEN; groups the screen's test cases into a suite.
import { test, expect } from '@playwright/test';
import { loadTestData } from '../../../helpers/test-data';
import { ForgotPasswordPage } from '../../../portals/org/pages/forgot-password.page';

const UC = 'UC-ORGUSER-002';
const { vars, account } = loadTestData(UC);

test.describe('Màn quên mật khẩu (nhập email)', () => {
  let forgot: ForgotPasswordPage;

  test.beforeEach(async ({ page }) => {
    forgot = new ForgotPasswordPage(page);
    await forgot.open();   // relative route — use.baseURL comes from playwright.config (never concat baseURL manually)
  });

  // Title MUST start with the TC ID -> the run report maps results back to the test case by TC ID.
  test('TC_021 — phản hồi trung lập khi email khớp tài khoản đang hoạt động', { tag: '@P1' }, async ({ page }) => {
    const d = vars('TC_021');
    // precondition-data: activeOrgUserAccount must be seeded in the environment
    await forgot.requestReset(d.validEmail);
    await expect(forgot.sentToast()).toBeVisible();
    await expect(forgot.sentToast()).toContainText('Hệ thống đã gửi liên kết đặt lại mật khẩu.');
  });

  // … one test() per test case of THIS screen; reuse forgot.* methods, never inline locators …
});
