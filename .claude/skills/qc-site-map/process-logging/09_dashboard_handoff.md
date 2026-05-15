# Phase 9 — Dashboard Handoff

- run_id: qc-site-map-001
- phase: Phase 9
- mode: Initialization

## Handoff file

`docs/../.claude/skills/qc-dashboard-sync/inbox/site-map-handoff.md` — written.

## Aggregation

- 33 feature/UC rows.
- 5 unmapped screens (SCR-050 UC41 chưa có row + SCR-090..093 cross-cutting).
- Conflict flagged: UC73 vs UC70.
- Partial: UC2, UC55.
- Need confirm: UC58/59/62/67, UC87/88/89/91/93/94/95 (gom row Q-013).

## Auto-trigger qc-dashboard-sync

Không tự gọi `qc-dashboard-sync` ở phase này. Lý do:

1. Handoff file đã được ghi vào inbox theo contract.
2. Site map chỉ ảnh hưởng note/cross-check, không thay đổi cột mà `qc-dashboard-sync` sở hữu (Site / UC ID / Module / Name / In scope? / Files stt).
3. Việc thêm row UC41 phụ thuộc BA cấp content (AI-UC-01) → khuyến nghị QC Lead chạy thủ công `/qc-dashboard-sync` sau khi BA hoàn tất.

## Next phase

Phase 10 — Handover & cleanup.
