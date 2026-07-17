// source: audited <UC-ID>_..._audited_..._v<N>.md §4 | crawled: <YYYY-MM-DD> <env URL>  ← incremental stamp: regen only when audited §4 changed, locators drift on the live UI, or a crawl-findings answer arrives
// Verification: every getter is resolved on the live UI and carries `| verified: <date> <env>` — page objects are ONLY generated from a live crawl (no DOM channel → stop per references/dom-channels.md).
import { BasePage } from '../../../helpers/base-page';

// One page object per page — INTERACTION elements only (mapping-rules §0): inputs, buttons, links, toggles.
// Outcome elements (messages/banners/toasts/records) are NEVER crawled — specs resolve them at runtime via
// channel detectors (helpers/expect-outcome.ts + portals/<portal>/notification-channels.ts, mapping-rules §3.0).
// A convenience getter MAY delegate to a detector, but never holds a crawled locator for an outcome element.
export class ForgotPasswordPage extends BasePage {
  // --- interaction locators (Element name -> getter; alt locator kept as comment) ---
  emailInput   = () => this.page.getByLabel('Email');                                   // "Trường nhập email" (alt: locator('#email')) | verified: <date> <env>
  submitButton = () => this.page.getByRole('button', { name: 'Gửi liên kết đặt lại' }); // "Nút chính — Gửi liên kết đặt lại" | verified: <date> <env>

  // --- common actions (derived from composites / repeated steps on this page) ---
  async open()                      { await this.goto('/forgot-password'); }
  async requestReset(email: string) { await this.emailInput().fill(email); await this.submitButton().click(); }
}
