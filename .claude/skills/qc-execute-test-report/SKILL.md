---
name: qc-execute-test-report
description: "Records official per-TC execution results (UI + API + MIX + manual) into the UC's living test-results file — one row per TC, one column per run — gated on the UC's findings being resolved; auto-invokes qc-bug-report on failures. Trigger: /qc-execute-test-report <UC-ID>, 'ghi kết quả test', 'report kết quả test'. To analyze failures use qc-bug-report."
---

# Skill: qc-execute-test-report

## Purpose

ONE job (đã thu hẹp — phần phân tích bug tách sang `qc-bug-report`): turn the latest `qc-auto-run` output into the official **execution report** — the per-UC living file where every TC of BOTH branches (and every manual TC) has one row, and every run appends one column. Failures are recorded as plain `Fail` here; classification and Bug IDs are `qc-bug-report`'s job (it stamps the same cells afterwards).

The hard gate guarantees results are only recorded when every findings question (UI crawl-findings + API api-findings) has been resolved AND a run happened after resolution — so recorded results always reflect the post-resolution system.

## Input Contract (resolve via `path-registry.md`)

- `automation-run-summary` + `runner/test-results/results.json` — the latest run covering the UC. Missing → tell the user to run `/qc-auto-run <UC-ID>` first, STOP.
- Latest TC mds — skeleton clone sources: `func-test-cases-md` (UI rows) AND/OR `api-test-cases-md` (API/MIX rows), per `project-context-master` §3.0 Phạm vi test.
- `crawl-findings` files of the UC's pages + `api-findings` files of the UC's resources — THE GATE.
- `automation-triage` + `api-automation-triage` latest — `Cách chạy` values (Tự động / Thủ công) per TC.
- `test-data` / `api-testdata` md — precondition wording for Blocked cells.
- Existing `execution-report` — append, never recreate.

## Output Contract

- `execution-report` — `docs/qc/testcases/<UC-ID>/<UC-ID>_<feature>_test-results.md`, LIVING file. Rows = ALL TCs (UI + API + MIX + manual); run column `Run <N> — <DD/MM> — <ENV> — <trình duyệt|API>`; cells: `Pass` / `Fail` (chưa phân loại — qc-bug-report sẽ stamp) / `Blocked — thiếu <key>` / `Chưa chạy` / `—`. Template: `templates/test-results.template.md`.
- **Hand-off:** run has ≥ 1 `Fail` cell → auto-invoke `/qc-bug-report <UC-ID>` via the Skill tool (đã chốt — chạy thẳng). No Fail → finish with the chat report.
- Chat report + worklog (single-phase, no checkpoint files).

## Workflow

One mode. Execute `workflows/report.md` top to bottom: resolve run → HARD GATE (both findings) → write the execution report → hand off to `qc-bug-report` when failures exist.

## Boundaries

- **Hard gate:** any gated crawl-findings OR api-findings row of the UC not `Đã giải quyết` → print the Vietnamese warning listing every open row and its question, write NOTHING, stop. Gated = every crawl-findings row; api-findings rows only when their UC-qualified `TC bị ảnh hưởng` intersects this UC (report.md §2). Run date older than the newest `Đã giải quyết — <date>` of the gated rows → demand a fresh run, stop.
- Writes ONLY the execution report (new run column + new TC rows). Does NOT write bugs (that is `qc-bug-report`), does NOT classify failures, NEVER touches previous columns, manual-TC cells the QC filled, or Bug-ID stamps added by `qc-bug-report`.
- Never runs tests; never generates scripts; never verifies bugs.
- Auto-invokes ONLY `qc-bug-report`, only when Fail cells exist in the new column.
- Language (qc-writting-rules two-group law): the execution report (test-results) is an official deliverable → project language per `project-context-master` §3.0 "Project language"; chat reports/warnings always Vietnamese. No checkpoint files, worklog only.
