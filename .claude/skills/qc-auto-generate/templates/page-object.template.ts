// source: audited <UC-ID>_..._audited_..._v<N>.md §4 | crawled: <YYYY-MM-DD> <env URL>  ← incremental stamp: regen only when audited §4 changed or locators drift on the live UI
import { BasePage } from '../../../helpers/base-page';

// One page object per page. Locators are resolved by live crawl (see references/locator-strategy.md); alt locator kept as comment.
export class ForgotPasswordPage extends BasePage {
  // --- locators (Element name -> getter) ---
  emailInput   = () => this.page.getByLabel('Email');                                   // "Trường nhập email" (alt: locator('#email'))
  submitButton = () => this.page.getByRole('button', { name: 'Gửi liên kết đặt lại' }); // "Nút chính — Gửi liên kết đặt lại"
  sentToast    = () => this.page.getByText('Hệ thống đã gửi liên kết đặt lại mật khẩu.');// assertion target (on SCR-001)

  // --- common actions (derived from composites / repeated steps on this page) ---
  async open()                      { await this.goto('/forgot-password'); }
  async requestReset(email: string) { await this.emailInput().fill(email); await this.submitButton().click(); }
}
