# Dashboard Handoff

- handoff path: .claude/skills/qc-dashboard-sync/inbox/feature-list-handoff.md
- handoff written: yes
- qc-dashboard-sync invoked: no (chưa tự động invoke trong run này — chờ QC Lead trigger `/qc-dashboard-sync` hoặc auto từ các per-UC skill kế tiếp)
- dashboard sync blocked: no
- block reason: -

## Candidate summary
- new: (không có row hoàn toàn mới)
- derived: UC58, UC59, UC62, UC67, UC73, UC87, UC88, UC89, UC91, UC92, UC93, UC94, UC95 — đều là UC con của file UC55-68 hoặc UC87-95 mà UC_LIST liệt kê, dashboard chưa có row riêng
- re-add: (không có)
- need confirmation: 13 row Need confirm như trên (đặc biệt UC73 ↔ UC70 nghi ngờ nhầm; UC92 nên tách row do permission khác phần còn lại của UC87-95)
- not found in current source: UC70 (vẫn giữ trạng thái `Removed`); UC41 (chờ BA — không sync)

## Sync result summary
Chưa invoke `qc-dashboard-sync` trong run này. Handoff đã ghi xong, sẵn sàng để:
1. QC Lead chạy `/qc-dashboard-sync` để merge.
2. Hoặc bất kỳ per-UC skill nào (`qc-uc-read`, `qc-func-scenario-design`, `qc-func-tc-design`) gọi tới một UC chưa có trong dashboard sẽ tự động trigger sync.
