# Workflow — Record execution results

> Title: qc-execute-test-report Report Workflow | Created: 2026-07-07 | Updated: 2026-07-10 (v2 — thu hẹp vai trò: chỉ ghi kết quả; phân loại + bug tách sang qc-bug-report; gate mở rộng api-findings; hàng TC 2 nhánh) | Version: v2
> Single phase. §2 is a HARD GATE — on failure print the warning and STOP without writing.

## §0 — Setup

1. Scope = the UC named in the command / hand-off from `qc-auto-run`. No UC → ask.
2. Resolve paths via `path-registry.md`. Worklog: append `Running (Phase 1)`.
3. Load: `automation-run-summary` + `runner/test-results/results.json`; latest TC md of EACH branch in scope (`func-test-cases-md`, `api-test-cases-md` — highest version per the canonical pattern `<UC>_<feature>_[api-]testcases_<variant>_<YYYYMMDD>_v<N>.md`; branches per `project-context-master` §3.0 Phạm vi test — file missing or field blank → STOP and ask); latest triage file(s); data md(s); existing `execution-report` if present.
4. **Triage file(s) missing → STOP:** the latest triage of EVERY branch in scope is required for the `Cách chạy` mapping (§3). Thiếu triage của nhánh nào → STOP và yêu cầu user chạy skill generate tương ứng trước: `/qc-func-auto-generate <UC-ID>` (nhánh UI — `automation-triage`) / `/qc-api-auto-generate <UC-ID>` (nhánh API — `api-automation-triage`).

## §1 — Resolve the run

- The summary must cover this UC; else → `/qc-auto-run <UC-ID>` first, STOP.
- New column header: run number `<N>` (existing run columns + 1), date, env, browser per Playwright project — API-only scope ghi `API` thay cho trình duyệt; mixed scope ghi `<trình duyệt>+API`.

## §2 — HARD GATE (findings resolved + fresh run)

1. UC pages = spec files under `runner/tests/<portal>/<UC-ID>/` → matching `crawl-findings/<portal>_<page>_crawl-findings.md`. UC resources = spec files under `runner/tests/api/<UC-ID>/` + `runner/tests/mix/<UC-ID>/` → matching `api-findings/<resource>_api-findings.md`.
2. Determine the GATED rows per finding kind:
   - **crawl-findings (UI):** EVERY row in every matching file is gated (unchanged — pages belong to the UC).
   - **api-findings (API):** a row is gated ONLY when its `TC bị ảnh hưởng` cell INTERSECTS this UC — the cell is UC-qualified per `api-findings-contract` (`UC-xxx/TC_API_NNN`, nhiều TC phân cách `, `); gated = it lists ≥ 1 TC qualified with THIS UC-ID. Rows listing only other UCs' TCs do NOT block (resources are shared across UCs).
   Every gated row must be `Đã giải quyết — <YYYY-MM-DD>`:
   - Rows `Chờ trả lời` → warning (Vietnamese): per row print file, `#`, phần tử/endpoint, phát hiện, and the question awaiting an answer; ask the user to answer inline + set `Đã trả lời`. STOP.
   - Rows `Đã trả lời` → instruct: run `/qc-func-auto-generate <UC-ID>` (trigger D) và/hoặc `/qc-api-auto-generate <UC-ID>` (trigger D) để xử lý câu trả lời, rồi `/qc-auto-run <UC-ID>`. STOP.
   - **Vacuous pass:** findings file(s) missing, or the matching files contain NO gated rows → the gate is CLEAN for that side (NOT a block) — continue. Only existing gated rows can block.
3. Freshness: run date (§1) ≥ the newest `Đã giải quyết — <date>` across the GATED rows only (all crawl-findings rows + the intersecting api-findings rows; resolution dates of non-intersecting api-findings rows are ignored; no gated rows → freshness check is vacuously satisfied). Otherwise → demand `/qc-auto-run <UC-ID>`, STOP.

## §3 — Write the execution report

- Missing → create from `../templates/test-results.template.md`. Rows cloned from the TC mds of EVERY branch in scope: TC ID, tiêu đề, ưu tiên, `Loại` (GUI / FUNC / API / MIX — theo section + tiền tố TC-ID), `Cách chạy` mapped from the branch's triage verdict per this table (sole home of the mapping — feasibility references point here):

  | Triage verdict | `Cách chạy` |
  |---|---|
  | `Đã có script` | `Tự động` |
  | `Trùng` | `Tự động` (ghi chú `cover bởi <TC>` — TC phủ lấy từ triage) |
  | `Sẽ bổ sung` / `Cần điều kiện` / `Thủ công` | `Thủ công` |

  > Match verdicts by PREFIX — suffixed forms like `Đã có script (chờ precondition manual: <key>)` map by their prefix (here: `Đã có script` → `Tự động`).

- Language: the execution report (test-results) is an OFFICIAL deliverable → written in the project language per `project-context-master` §3.0 "Project language" (qc-writting-rules two-group law). Chat reports/warnings stay Vietnamese.
- Append the new run column. Cells: `Pass` / **`Fail`** (plain — KHÔNG phân loại, KHÔNG mã bug; `qc-bug-report` sẽ stamp) / `Blocked — thiếu <key>` (wording from the data md) / `Chưa chạy` (manual TC — QC điền tay) / `—` (ngoài phạm vi lần chạy).
- Update the header "Cập nhật lần cuối". NEVER touch previous columns, QC-filled manual cells, or existing Bug-ID stamps.
- TC set changed vs the mds (new versions) → add missing rows, keep old rows.

## §4 — Hand off to qc-bug-report (đã chốt — chạy thẳng)

New column has ≥ 1 `Fail` cell (automation rows) → invoke `/qc-bug-report <UC-ID>` via the Skill tool immediately. No Fail → skip.

## §5 — Chat report (Vietnamese) + worklog

Totals per branch (Pass/Fail/Blocked/Chưa chạy); nhắc QC điền tay các ô `Chưa chạy` (và tự viết bug thủ công vào mục riêng của bug report nếu manual Fail); nếu đã hand-off → nói rõ "qc-bug-report đang phân tích các TC Fail". Worklog terminal `Done` (or `Stopped (<reason>)` when gated).

## Self-check before saving (qc-writting-rules §5)

- [ ] Đúng 1 cột run mới; không ô cũ nào bị đổi.
- [ ] Mọi TC của run có đúng 1 giá trị ô; TC ngoài phạm vi = `—`.
- [ ] Header cột đủ số run + ngày + env + trình duyệt/API; tiếng Việt đủ dấu.
