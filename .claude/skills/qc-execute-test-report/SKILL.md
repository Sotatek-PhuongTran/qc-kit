---
name: qc-execute-test-report
description: Records official per-TC execution results into the UC's living test-results file and writes VERIFIED bug reports, hard-gated on every crawl-findings row of the UC's pages being resolved (Đã giải quyết) and on a run executed after resolution. Trigger on "report kết quả test", "ghi kết quả test case", "report bug", "/qc-execute-test-report <UC-ID>". To RUN tests use qc-auto-run; to verify fixed bugs use qc-bug-verify.
---

# Skill: qc-execute-test-report

## Purpose

Turn the latest `qc-auto-run` output into two official, per-UC living documents: an **execution report** (one row per TC, one column per run — including manual TCs) and a **bug report** (only verified defects, grouped by root cause). The hard gate guarantees every reported bug has been cross-checked against the answered crawl-findings — so a "bug" is never just an unconfirmed discrepancy between UC text and live UI.

This skill never runs tests and never edits code — it only reads run output and writes the two documents.

## Input Contract (resolve via `path-registry.md`)

- `automation-run-summary` + `runner/test-results/results.json` — the latest run for the UC. No run covering the UC → tell the user to run `/qc-auto-run <UC-ID>` first, STOP.
- Latest test-cases md of the UC (`func-test-cases-draft`, or the newest `*_testcases_*_v<N>.md`) — clone source for the execution report skeleton + RTM (AC ↔ TC) table.
- `crawl-findings` files of the UC's pages — THE GATE (see workflows/report.md §2).
- `automation-triage` latest version — per-TC verdicts (`Thủ công` rows, deferred reasons) + fail-classification aid.
- `test-data` md — precondition wording for Blocked cells.
- Existing `execution-report` / `bug-report` — append/update, never recreate.

## Output Contract

- `execution-report` — `docs/qc/testcases/<UC-ID>/<UC-ID>_<feature>_test-results.md`, LIVING file (no date/version). One row per TC (ALL TCs, manual included); each run appends ONE column titled `Run <N> — <DD/MM> — <ENV> — <trình duyệt>`; cell = result (+ Bug ID). Template: `templates/test-results.template.md`.
- `bug-report` — `docs/qc/automation/bugs/<UC-ID>_<feature>_bug-report.md`, LIVING file. Summary table + one detail section per bug, IDs `BUG-<UC-suffix>-<NN>`. Template: `templates/bug-report.template.md`.
- Chat report + worklog per `docs/qc-lead/agent-work-log.local/README.md` (single-phase, like qc-auto-run).

## Workflow

One mode. Execute `workflows/report.md` top to bottom: resolve run → HARD GATE on crawl-findings → classify every non-pass TC → write execution report → write bug report → chat summary.

## Boundaries

- **Hard gate:** any crawl-findings row of the UC's pages not `Đã giải quyết` → print the Vietnamese warning listing every open row and its question, write NOTHING, stop. Run date older than the newest `Đã giải quyết — <date>` mark → demand a fresh run, stop.
- Never runs tests (that is `qc-auto-run`); never generates or fixes scripts (that is `qc-auto-generate`); never verifies fixed bugs (that is `qc-bug-verify`).
- Writer of `execution-report` and `bug-report` EXCEPT: manual-TC result cells (QC hand-fills) and the bug "Trạng thái" column once the user/dev has set it — NEVER overwrite either.
- A failed TC becomes a bug ONLY after classification (workflows/report.md §3); script debt, environment issues, and confirmed requirement changes are never reported as bugs. One bug may group many TCs; every grouped TC is listed on the bug.
- Reproduction steps are taken from the TC md steps + the observed error — never invented.
- All file/chat output in Vietnamese per `.claude/rules/qc-writting-rules.md`; system messages quoted verbatim.
- No checkpoint files (single-phase, re-runnable); worklog only.
