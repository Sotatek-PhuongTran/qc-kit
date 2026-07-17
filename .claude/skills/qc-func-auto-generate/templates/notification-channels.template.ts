// notification-channels.ts — per-portal CHANNEL MAP (mapping-rules §3.0).
// Learned ONCE during the crawl's state tour (drive a validation error + an auth error where safely
// possible) — then QC-EDITABLE by hand. This is the ONLY notification "locator" maintained for the
// portal: fix one line here, every spec benefits. Channels not learnable at crawl (state unreachable)
// are recorded in the page's crawl-findings file.
// source: <state tour — date + env URL>   // TODO: stamp when learned

import type { ChannelMap } from '../../helpers/expect-outcome';

export const channels: ChannelMap = {
  // TODO: replace with this portal's REAL idioms discovered at crawl. Examples below are common defaults.
  inline: { group: '.field',  selector: '[role="alert"]' },       // lỗi tại chỗ trong cùng nhóm field với ô nhập
  banner: { selector: '[role="alert"].banner' },                  // chú thích cảnh báo mức thẻ/trang
  toast:  { selector: '[role="status"]', autoHideMs: 4000 },      // thông báo nổi (tự đóng)
  dialog: { selector: '[role="dialog"]' },
};
