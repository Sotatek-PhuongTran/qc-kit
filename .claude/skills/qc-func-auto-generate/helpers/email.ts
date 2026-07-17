// email.ts — test-email adapter. Fetches emails from a testing inbox and extracts the reset link,
// so dynamic values (reset token/link) are obtained at RUNTIME, never stored as literals.
//
// Adapter pattern: specs/fixtures depend on EmailClient; swap the impl to change tools.
// Current impl = Mailtrap "Email Testing" (sandbox) API. Config via env (.env, gitignored):
//   MAILTRAP_API_TOKEN, MAILTRAP_ACCOUNT_ID, MAILTRAP_INBOX_ID
// Env is read LAZILY (on first call) so importing this file never throws when creds are absent.

export interface EmailClient {
  getLatestEmailHtml(toEmail: string, opts?: { timeoutMs?: number }): Promise<string>;
  getLatestResetLink(toEmail: string, opts?: { timeoutMs?: number }): Promise<string>;
}

class MailtrapClient implements EmailClient {
  private base = 'https://mailtrap.io/api';

  async getLatestEmailHtml(toEmail: string, opts: { timeoutMs?: number } = {}): Promise<string> {
    const { account, inbox } = env();
    const deadline = Date.now() + (opts.timeoutMs ?? 15000);
    while (Date.now() < deadline) {
      const msgs = await this.api(`/accounts/${account}/inboxes/${inbox}/messages`);
      const mine = (msgs as any[])
        .filter(m => (m.to_email ?? '').toLowerCase() === toEmail.toLowerCase())
        .sort((a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime());
      if (mine.length) {
        return this.api(`/accounts/${account}/inboxes/${inbox}/messages/${mine[0].id}/body.html`, true);
      }
      await sleep(1000);
    }
    throw new Error(`No email for ${toEmail} within timeout.`);
  }

  async getLatestResetLink(toEmail: string, opts: { timeoutMs?: number } = {}): Promise<string> {
    const link = extractResetLink(await this.getLatestEmailHtml(toEmail, opts));
    if (!link) throw new Error(`Reset email for ${toEmail} has no reset link.`);
    return link;
  }

  private async api(path: string, raw = false): Promise<any> {
    const res = await fetch(this.base + path, { headers: { 'Api-Token': env().token } });
    if (!res.ok) throw new Error(`Mailtrap API ${res.status}: ${path}`);
    return raw ? res.text() : res.json();
  }
}

/** Extract the reset link from email HTML — the CTA "Đặt mật khẩu" / a set-new-password URL. */
export function extractResetLink(html: string): string | null {
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  return hrefs.find(h => /set-new-password|reset|token=/.test(h)) ?? null;
}

export const email: EmailClient = new MailtrapClient();
export const getLatestResetLink = (to: string, opts?: { timeoutMs?: number }) => email.getLatestResetLink(to, opts);
export const getLatestEmailHtml = (to: string, opts?: { timeoutMs?: number }) => email.getLatestEmailHtml(to, opts);

function env() {
  return {
    token: requireEnv('MAILTRAP_API_TOKEN'),
    account: requireEnv('MAILTRAP_ACCOUNT_ID'),
    inbox: requireEnv('MAILTRAP_INBOX_ID'),
  };
}
function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name} (set it in .env for the email-testing tool).`);
  return v;
}
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
