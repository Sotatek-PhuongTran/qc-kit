// expect-outcome.ts — semantic CHANNEL DETECTORS for expected results (mapping-rules §3.0).
// Outcome elements (messages/banners/toasts/records) are NEVER pre-crawled: locate by CHANNEL at
// runtime, then compare CONTENT verbatim. Channel idioms live in the per-portal channel map
// (portals/<portal>/notification-channels.ts) — QC-editable: fix one line, every spec benefits.
// Scaffolded once by qc-auto-generate.

import { expect, type Page, type Locator } from '@playwright/test';

export type ChannelMap = {
  /** group = field wrapper selector; selector = message element inside the group */
  inline: { group: string; selector: string };
  banner: { selector: string };
  toast:  { selector: string; autoHideMs?: number };
  dialog: { selector: string };
};

export function outcome(page: Page, channels: ChannelMap) {
  const api = {
    /** Inline message anchored to a field (TC says "dưới ô X"):
     *  the message inside the SAME field group that contains the anchor input — relational, no guessed containers. */
    inlineMessage(anchor: Locator): Locator {
      return page.locator(channels.inline.group).filter({ has: anchor }).locator(channels.inline.selector);
    },
    banner: (): Locator => page.locator(channels.banner.selector),
    toast:  (): Locator => page.locator(channels.toast.selector),
    dialog: (): Locator => page.locator(channels.dialog.selector),
    /** TC states NO position → loose verbatim content match (project decision 2026-07-04). */
    anyMessage: (text: string): Locator => page.getByText(text, { exact: true }),

    /** Assert a message on a channel with VERBATIM content.
     *  channel/anchor specificity MUST follow the TC wording (mapping-rules §3.0). */
    async expectMessage(opts: {
      channel: 'inline' | 'banner' | 'toast' | 'dialog' | 'loose';
      text: string;
      anchor?: Locator;             // required for channel 'inline'
    }): Promise<void> {
      if (opts.channel === 'loose') { await expect(api.anyMessage(opts.text)).toBeVisible(); return; }
      const target = opts.channel === 'inline' ? api.inlineMessage(opts.anchor!) : api[opts.channel]();
      await expect(target).toBeVisible();
      await expect(target).toContainText(opts.text); // verbatim comes from the TC; wrong text = real finding
    },

    /** Toast auto-hide behavior (TC says "tự đóng sau ~N giây").
     *  Prefer page.clock in the spec for exact timing; this helper asserts hide within tolerance. */
    async expectToastAutoHides(text: string, ms = channels.toast.autoHideMs ?? 4000, toleranceMs = 1500): Promise<void> {
      const t = api.toast().filter({ hasText: text });
      await expect(t).toBeVisible();
      await expect(t).toBeHidden({ timeout: ms + toleranceMs });
    },

    /** Verify a record by DATA IDENTITY (mapping-rules §3.2): find it on the list (search box or
     *  row scan by unique identity), optionally open detail and compare each field verbatim. */
    async expectRecord(opts: {
      identity: string;                                  // unique id/name from test data
      searchBox?: Locator;                               // if the list has search — fill + Enter first
      row?: (identity: string) => Locator;               // default: any table row containing the identity
      openDetail?: (row: Locator) => Promise<void>;      // e.g. row.click() or a detail link inside the row
      fields?: Record<string, string>;                   // detail: label -> expected value (verbatim)
      fieldValue?: (label: string) => Locator;           // default: element next to the label text
    }): Promise<void> {
      if (opts.searchBox) { await opts.searchBox.fill(opts.identity); await opts.searchBox.press('Enter'); }
      const row = (opts.row ?? ((id: string) => page.getByRole('row').filter({ hasText: id })))(opts.identity);
      await expect(row).toHaveCount(1);
      if (opts.openDetail && opts.fields) {
        await opts.openDetail(row);
        for (const [label, value] of Object.entries(opts.fields)) {
          const holder = opts.fieldValue
            ? opts.fieldValue(label)
            : page.getByText(label, { exact: true }).locator('xpath=following-sibling::*[1]');
          await expect(holder).toContainText(value);
        }
      }
    },
  };
  return api;
}
