// tests/<portal>/<UC-ID>/<screen>.spec.ts — one spec PER SCREEN; groups the screen's test cases into a suite.
// Interactions go through page-object methods (crawled locators); EXPECTED results go through channel
// detectors (mapping-rules §3.0) — specificity follows the TC: TC names a position/channel → keep it;
// TC silent → channel 'loose'.
import { test, expect } from '@playwright/test';
import { loadTestData } from '../../../helpers/test-data';
import { outcome } from '../../../helpers/expect-outcome';
import { channels } from '../../../portals/org/notification-channels';
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
    // precondition-data: activeOrgUserAccount (declared in the data md ## Preconditions)
    await forgot.requestReset(d.validEmail);                       // interaction via page object
    // expected via CHANNEL DETECTOR — the TC names the toast channel, so the channel is enforced:
    await outcome(page, channels).expectMessage({ channel: 'toast', text: 'Hệ thống đã gửi liên kết đặt lại mật khẩu.' });
  });

  // … one test() per test case of THIS screen; interactions via forgot.* methods, expecteds via detectors …
});
