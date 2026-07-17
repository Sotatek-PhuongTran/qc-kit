# Workflow — Analyze failures → root cause → verified bugs

> Title: qc-bug-report Analyze Workflow | Created: 2026-07-10 | Author: QC Kit (API extension — step 8) | Version: v1
> Single phase, strict order. Taxonomy/decision rules: `.claude/config/api-shared/root-cause-taxonomy.md` (read ONCE at §0).

## §0 — Setup

1. Scope = the UC named in the command / hand-off. Resolve paths via `path-registry.md`; read the taxonomy contract; worklog `Running (Phase 1)`.
2. Load the UC's `execution-report` → the LATEST run column. Collect **work list** = cells exactly `Fail` (no Bug ID, not `Chưa chốt`, not manual rows — `Cách chạy = Thủ công` rows are skipped per the manual policy). Empty work list → chat "không có TC fail cần phân tích ở Run <N>", worklog `Done`, STOP.

## §1 — Gather evidence (failing TCs ONLY)

For each TC in the work list:
1. `results.json` error line + trace/screenshot/response paths (open only these TCs' artifacts).
2. Triage row (deferred history?), and any answered findings row touching its element/endpoint.
3. **Counterpart lookup:** API/MIX TC → its "TC UI liên quan" from the api TC md prelude; UI TC → reverse-lookup the same table. Counterpart's result = its cell in the SAME run column (Pass / Fail / Blocked / `—` / not existing).

## §2 — Classify (taxonomy contract)

Assign EXACTLY one root cause per TC using, in order: (a) the counter-evidence matrix (both-branch results), (b) the error signature (locator debt → `Lỗi script`; 401-token/env outage → `Lỗi môi trường`; wrong seed value → `Lỗi data test`; findings answer says doc/UC outdated → `Tài liệu lỗi thời`; expect-api baseline-mismatch assertion — message dạng `<TC-ID>: status lệch baseline (chưa confirm — re-record hoặc hỏi BE)` hoặc `<TC-ID>: message lệch baseline (chưa confirm)` → baseline chưa confirm, xem rule dưới), (c) trace/response content vs the TC's expected + its ladder rung.

- **Baseline rule (expected-and-verify-policy §4):** a failure caused by a mismatch against an api-baseline entry with `confirmed=false` is NOT a bug — the pinned value was never confirmed by QC/BE. Stamp the cell `Chưa chốt — baseline chưa confirm`; follow-up = QC/BE confirm the entry (set `confirmed=true` — mismatch then becomes a bug candidate) OR delete the entry to re-record intentionally. Only a mismatch against a `confirmed=true` entry is a regression signal eligible for `Lỗi BE`.

- Counterpart missing/not-run → **one-sided rule**: classify from available evidence; the bug MUST carry the line "kết luận dựa trên 1 phía đối chứng — TC đối chứng chưa chạy/không tồn tại"; add a chat recommendation to run the counterpart (`/qc-auto-run <UC-ID> --grep "<TC>"`) — NEVER run it yourself.
- Same root cause across TCs (even across branches) → merge into ONE bug candidate.
- Uncertain between two classes → ask the user with both hypotheses + evidence; never guess.

## §3 — Write the bug report

- File missing → create from `../templates/bug-report.template.md`.
- For each bug candidate with root cause `Lỗi BE` / `Lỗi FE` / `Lỗi tích hợp`:
  - Dedupe: an OPEN bug already covering the same defect → append ONE history row (`vẫn tái hiện ở Run <N>`), do not create a duplicate, do NOT touch its Trạng thái.
  - New → next `BUG-<UC-suffix>-<NN>`: summary row (with **Root cause**) + detail section — all fields self-contained (verbatim expected/actual; evidence paths; **Đối chứng** row = the counter-evidence used, or the one-sided line; **Căn cứ đã kiểm chứng** = findings answer / stable reproduction).
- Non-bug classes write NO bug — they surface as cells + follow-ups (§4).

## §4 — Stamp the execution report + follow-ups

In the LATEST run column only: `Fail` → `Fail — BUG-<...>` (bug classes) or `Chưa chốt — lỗi script | lỗi môi trường | lỗi data test | chờ cập nhật UC/TC | baseline chưa confirm` (non-bug classes). Follow-up per non-bug class: script → `/qc-func-auto-generate` hoặc `/qc-api-auto-generate` (Update); môi trường → nêu đích danh sự cố; data → QC sửa data md; tài liệu lỗi thời → `/qc-uc-read` / `/qc-api-read` re-audit → tc-design update; baseline chưa confirm → đề nghị QC/BE confirm entry baseline (hoặc xoá entry để re-record) rồi chạy lại.

## §5 — Chat report (Vietnamese) + worklog

Bug mới (ID + Root cause + 1 dòng + TC gộp); bug cũ còn tái hiện; bảng `Chưa chốt` theo lý do + follow-up; các kết luận 1 phía + lệnh chạy đối chứng đề xuất; nhắc: gửi bug cho dev, cập nhật cột "Trạng thái", rồi `/qc-bug-verify <UC-ID>`; nhắc TC thủ công Fail (nếu thấy) là phần QC tự viết bug vào section riêng. Worklog terminal `Done`.

## Self-check before saving (qc-writting-rules §5)

- [ ] Mỗi bug có Root cause + Đối chứng (hoặc dòng 1 phía) + evidence path thật.
- [ ] Không mã trần trong câu cho người đọc; message verbatim trong "..."; tiếng Việt đủ dấu.
- [ ] Mọi ô `Fail` của work list đã được stamp đúng MỘT kết luận.
