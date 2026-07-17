# Workflow — Verify bugs (re-test + regression)

> Title: qc-bug-verify Verify Workflow | Created: 2026-07-07 | Updated: 2026-07-10 (v2 — regression scope theo Root cause; nhánh API/MIX; bug mới từ regression phân tích qua qc-bug-report) | Version: v2
> Single phase. §2 approval is MANDATORY — never run §3 without an explicit OK.

## §0 — Setup + select bugs

1. Scope = the UC named in the command. Resolve paths via `path-registry.md`; read `root-cause-taxonomy.md` (mapping table); worklog `Running (Phase 1)`.
2. Read the UC's `bug-report` (skill-written sections only). Partition by user-set Trạng thái:
   - **Cần chạy xác nhận:** `Dev đã fix — chờ verify`, `Không tái hiện được`.
   - **Đóng không cần chạy:** `Không phải bug` → `Đã đóng — <ngày> — không phải bug` + history row; `Không còn` → `Đã đóng — <ngày> — yêu cầu đã thay đổi` + history row + WARNING: các TC gắn bug này có thể lỗi thời — đề xuất soát bằng tc-design (update) của nhánh tương ứng.
   - QC manual-bug section has OPEN bugs → note for the §5 chat reminder (not processed here).
   - Nothing pending → report (Vietnamese), worklog `Done`, STOP.

## §1 — Build the plan (per bug in "Cần chạy xác nhận")

- **Re-test** = the bug's linked TCs (both branches, from "TC / tiêu chí liên quan").
- **Regression — scoped by the bug's Root cause** (đã chốt):

| Root cause | Regression set |
|---|---|
| `Lỗi BE` | automated `TC_API_*` of the SAME resource (same service/spec file) + `TC_MIX_*` linked to the re-test TCs + UI TCs sharing an acceptance criterion (fix BE có thể đổi hành vi UI) |
| `Lỗi FE` | automated UI TCs in the same spec file(s) (same screen) + `TC_MIX_*` linked + TCs sharing an AC |
| `Lỗi tích hợp` | union of both rows above for the touched screen/resource (sửa lớp ghép nối chạm cả hai phía) |
| (Bug cũ chưa có Root cause) | fallback như v1: same screen + shared AC |

  Deduplicate; exclude TCs already in re-test; cap materialization at the spec-file level (never pull another UC's specs).
- **Baseline pre-check — bug Root cause = `Lỗi BE` trên nhánh API:** for each re-test `TC_API_*` / `TC_MIX_*`, look up its entry in `api-baselines/<UC-ID>_api-baseline.json`. If an entry pins the AT-BUG behavior (status/message recorded while the defect was live), the verify run would assert the OLD wrong values and fail against the fix for the wrong reason → the plan MUST include the line "xoá / re-record entry baseline của <TC> (đang pin hành vi lúc bug)" — executed only after user approval (§2) and BEFORE the run (§3), so first run re-records the fixed behavior (`confirmed=false`, chờ QC/BE confirm). Never delete an entry silently.
- Manual TCs in either set → plan line "QC chạy tay + tự điền kết quả", not in the automated run.
- Data/accounts: from the branch's data md (never print passwords/tokens); environment default = data md `Environment`; browser per project / `API` cho TC_API.

## §2 — Present the plan, WAIT for approval

Print (Vietnamese) one table per bug: mã bug + tiêu đề + Root cause | TC re-test | TC regression (kèm LÝ DO chọn: cùng resource / cùng màn hình / chung tiêu chí / MIX liên quan) | loại chạy (tự động / QC chạy tay) | data & account key | môi trường + trình duyệt/API. User may add/remove TCs or drop a bug. Re-print if edited. NEVER proceed without an explicit OK.

## §3 — Run

Invoke `qc-auto-run` scoped to the approved automated TC list (`--grep "TC_x|TC_API_y|TC_MIX_z|..."`). `qc-auto-run` keeps its own env confirmation + pre-flight; its Phase 0 confirm stops are skipped (explicit scope); its auto-trigger of execute-report does NOT apply to a verify-scoped run — this workflow writes the results itself (§4).

## §4 — Conclude + write back

1. **Execution report:** append one run column (format per `qc-execute-test-report`); manual plan lines get `Chưa chạy`; TCs outside the plan get `—`.
2. **Per bug:** all re-test TCs Pass → `Đã đóng — verified <YYYY-MM-DD> — <env>` + history row. Any re-test TC still failing → `Mở lại` + history row citing the failing TC(s) + fresh evidence (trace/response paths) — for `Không tái hiện được` bugs this fresh evidence is the whole point. Any re-test TC Blocked → do NOT conclude; history row `chưa verify được — thiếu <key>`.
3. **Regression failures** not explained by an existing bug → invoke `/qc-bug-report <UC-ID>` to analyze/classify them (it stamps cells + writes any new bugs with Root cause); do NOT classify inline.
4. **Baseline check (bug `Lỗi BE` nhánh API):** confirm every baseline entry the approved plan marked for deletion was actually removed and re-recorded during the run (console `[api-baseline] RECORDED <TC>` in the run output; new entries are `confirmed=false`) — remind the user QC/BE should confirm the re-recorded entries. An entry still pinning the AT-BUG behavior → the re-test result is not trustworthy; do NOT conclude that bug, history row `chưa verify được — baseline chưa re-record`.
5. Update "Verify gần nhất" in the summary table for every bug touched.

## §5 — Chat report (Vietnamese) + worklog

Per bug: kết luận + 1 dòng căn cứ; bug mới từ regression (qua qc-bug-report, nếu có); TC thủ công chờ QC điền; NHẮC các bug đang mở trong mục "Bug từ TC thủ công" (QC tự verify + tự cập nhật Trạng thái); vòng tiếp theo nếu còn `Mở lại`. Worklog terminal `Done` / `Stopped (<reason>)`.

## Self-check before saving (qc-writting-rules §5)

- [ ] Plan + kết luận tự chứa, không mã trần; message verbatim; không password/token; tiếng Việt đủ dấu.
- [ ] Mỗi bug trong plan có đúng 1 kết luận hoặc 1 dòng "chưa verify được"; cột run mới không đụng ô cũ.
