# Workflow — Report execution results + verified bugs

> Title: qc-execute-test-report Report Workflow | Created: 2026-07-07 | Author: Claude | Version: v1
> Single phase. Steps run strictly in order; §2 is a HARD GATE — on failure print the warning and STOP without writing.

## §0 — Setup

1. Scope = the UC named in the command (`/qc-execute-test-report <UC-ID>`). No UC → ask.
2. Resolve all paths via `path-registry.md`. Worklog: append `Running (Phase 1)` entry.
3. Load: `automation-run-summary` (`docs/qc/automation/reports/summary-latest.md`) + `docs/qc/automation/runner/test-results/results.json`; latest test-cases md; latest triage; `test-data` md; existing `execution-report` / `bug-report` if present.

## §1 — Resolve the run

- The summary must cover this UC. Missing / different UC / results.json absent → tell the user (Vietnamese) to run `/qc-auto-run <UC-ID>` first, STOP.
- Extract run metadata for the new column header: run date (`Run at`), environment (env name only, e.g. `DEV`), browser per Playwright project (portal project → engine, e.g. `Chromium`). Run number `<N>` = number of existing run columns in the execution report + 1 (first run = 1).

## §2 — HARD GATE (crawl-findings resolved + fresh run)

1. UC pages = spec files under `runner/tests/<portal>/<UC-ID>/` → screen names → matching `crawl-findings/<portal>_<page>_crawl-findings.md` files.
2. Every row in every matching file must have Trạng thái = `Đã giải quyết — <YYYY-MM-DD>`.
   - Rows `Chờ trả lời` → warning (Vietnamese): for each row print file, mã `D<x>`, phần tử, trạng thái đã lái, and the exact question awaiting an answer; ask the user to fill "Trả lời của QC/dev" + set `Đã trả lời`. STOP.
   - Rows `Đã trả lời` (answered but not yet processed) → instruct: run `/qc-auto-generate <UC-ID>` (Update mode, trigger D re-crawls per the answers and marks `Đã giải quyết`), then `/qc-auto-run <UC-ID>`. STOP.
3. Freshness: run date (§1) must be ≥ the newest `Đã giải quyết — <date>` across the UC's pages — the recorded results must reflect the POST-resolution system. Otherwise → demand `/qc-auto-run <UC-ID>` and re-invoke this skill. STOP.

## §3 — Classify every non-pass TC

For each TC in the run that is not Pass, assign exactly ONE class using results.json error + summary line + triage + the answered crawl-findings:

| Class | Signals | Consequence |
|---|---|---|
| **Bug thật** | Expected result per TC md is confirmed correct (crawl-findings answer upholds the UC, or failure is unrelated to any D-item); actual behavior deviates | Bug row (§5) + cell `Fail — BUG-<...>` |
| **Chờ cập nhật UC/TC** | The crawl-findings answer says the UC/TC text is outdated (requirement changed) but audited/TC not yet updated | NO bug. Cell `Chưa chốt — chờ cập nhật UC/TC`; add follow-up: update audited (`qc-uc-read`) + TC (`qc-func-tc-design`) |
| **Lỗi script** | PROVISIONAL locator stamp, first-run snapshot baseline, channel-map idiom miss, selector drift | NO bug. Cell `Chưa chốt — lỗi script`; follow-up: `/qc-auto-generate <UC-ID>` (Update) |
| **Lỗi môi trường/data** | Wrong/missing test data, env outage, flaky external service | NO bug. Cell `Chưa chốt — lỗi môi trường/data`; name the concrete cause |
| **Blocked** | Already Blocked in the summary (missing precondition) | Cell `Blocked — thiếu <key>` (wording from the data md `Required state`) |

Group TCs failing from the SAME root cause into ONE bug (e.g. one wrong `maxlength` → all boundary TCs it breaks). Uncertain class → ask the user, never guess silently.

## §4 — Write the execution report

- Missing → create from `../templates/test-results.template.md`: one row per TC cloned from the test-cases md (TC ID, tiêu đề, ưu tiên, loại GUI/FUNC), `Cách chạy` from the triage verdict (`Tự động` / `Thủ công`).
- Append the new run column `Run <N> — <DD/MM> — <ENV> — <trình duyệt>`. Cells: `Pass` / `Fail — BUG-<...>` / `Blocked — thiếu <key>` / `Chưa chốt — <lý do>` / `Chưa chạy` (manual TC, QC hand-fills later) / `—` (outside the run's scope).
- Update the header's "Cập nhật lần cuối" line. NEVER touch cells of previous columns; NEVER overwrite a QC-hand-filled manual cell.
- Existing TC set changed vs the md (new version added TCs) → add the missing rows, keep old rows.

## §5 — Write the bug report

- Missing → create from `../templates/bug-report.template.md`.
- New defects → next sequential ID `BUG-<UC-suffix>-<NN>`, one summary row + one detail section each, all fields self-contained per `qc-writting-rules` (verbatim expected/actual messages; evidence = `runner/test-results/<...>` paths; "Căn cứ đã kiểm chứng" = the crawl-findings answer or run evidence that proves it is a real bug).
- Defect already reported and still failing → append ONE history row (`vẫn tái hiện ở Run <N>`); do NOT change its Trạng thái.
- NEVER edit a Trạng thái the user/dev has set (`Dev đã fix — chờ verify`, `Không tái hiện được`, `Không còn`, `Không phải bug`) — that is `qc-bug-verify` input.

## §6 — Chat report (Vietnamese) + worklog

Report: pass/fail/blocked/chưa chốt totals; bug mới (ID + 1 dòng mô tả) và bug cũ còn tái hiện; các TC `Chưa chốt` kèm lý do + follow-up; nhắc: cập nhật cột "Trạng thái" trong bug report khi dev xử lý xong, rồi chạy `/qc-bug-verify <UC-ID>`. Worklog terminal `Done` (or `Stopped (<reason>)` when gated).

## Self-check before saving (qc-writting-rules §5)

- [ ] No bare codes in reader-facing sentences (TC/BUG/D/SCR names carry a human-readable name first).
- [ ] All system messages quoted verbatim in `"..."`.
- [ ] Every bug's steps + expected + actual readable standalone without opening the UC.
- [ ] No English jargon outside verbatim UI labels (translate per the §3 table of qc-writting-rules).
- [ ] Vietnamese diacritics intact.
