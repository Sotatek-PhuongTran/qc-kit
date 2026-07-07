---
name: qc-bug-verify
description: Reads user-updated bug statuses in a UC's bug report, builds a re-test + regression plan (test cases, test type, data) that ALWAYS requires user approval, then runs it via qc-auto-run and concludes each bug (closed / reopened) while appending the run results to the execution report. Trigger on "verify bug", "chạy lại bug đã fix", "/qc-bug-verify <UC-ID>". To record fresh results or report NEW bugs from a normal run, use qc-execute-test-report.
---

# Skill: qc-bug-verify

## Purpose

Close the loop on reported bugs. After the QC/dev updates the "Trạng thái" column in the bug report (`Dev đã fix — chờ verify`, `Không tái hiện được`, `Không còn`, `Không phải bug`), this skill decides which TCs need **re-test** (the bug's own TCs) and **regression** (same screen + shared acceptance criteria), presents the plan for MANDATORY approval, runs it through `qc-auto-run`, and writes the conclusion back into both living documents.

## Input Contract (resolve via `path-registry.md`)

- `bug-report` of the UC — filter bugs by user-set Trạng thái. None pending → say so (Vietnamese), STOP.
- `execution-report` of the UC — run-column count + prior results.
- Latest test-cases md — RTM table (AC ↔ TC) for regression scope.
- `automation-specs` under `runner/tests/<portal>/<UC-ID>/` — same-screen TC lists; `automation-triage` — which TCs are `Thủ công` (manual re-test goes to the QC, not the run).
- `test-data` md — data/accounts the plan will use.

## Output Contract

- `bug-report` updated: per bug `Đã đóng — verified <ngày> — <env>` or `Mở lại`, + one "Lịch sử" row each (never touching user-set statuses of bugs outside the plan).
- `execution-report`: one new run column (same format as qc-execute-test-report §4; TCs outside the plan get `—`).
- Chat: approved plan recap + per-bug conclusion (Vietnamese). Worklog per `docs/qc-lead/agent-work-log.local/README.md`.

## Workflow

One mode. Execute `workflows/verify.md`: select bugs → build plan → **user approval (never skipped)** → run via `qc-auto-run` → conclude bugs → update both documents.

## Boundaries

- NEVER runs anything before the user approves the plan — no exceptions, even if the user asked to "verify ngay".
- Executes tests ONLY through `qc-auto-run` (which keeps its own env confirmation, precondition pre-flight, and non-production refusal) — never invokes Playwright directly.
- Never creates first-time reports (that is `qc-execute-test-report`); MAY append new bug rows for real defects surfaced by the regression run, classified per `qc-execute-test-report/workflows/report.md` §3.
- Never edits specs, page objects, or data files; never touches user-set "Trạng thái" values except to conclude the bugs in the approved plan.
- All user-facing output in Vietnamese per `.claude/rules/qc-writting-rules.md`.
- No checkpoint files (single-phase, re-runnable); worklog only.
