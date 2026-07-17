---
name: qc-bug-verify
description: "Reads user-updated bug statuses, builds a root-cause-scoped re-test + regression plan (ALWAYS user-approved), runs it via qc-auto-run, then closes or reopens each bug and appends results to the execution report. Trigger: /qc-bug-verify <UC-ID>, 'verify bug', 'chạy lại bug đã fix'. For NEW failures use qc-bug-report."
---

# Skill: qc-bug-verify

## Purpose

Close the loop on reported bugs. After the QC/dev updates the "Trạng thái" column (`Dev đã fix — chờ verify`, `Không tái hiện được`, `Không còn`, `Không phải bug`), this skill decides which TCs need **re-test** (the bug's own TCs — both branches) and **regression** (scoped by the bug's **Root cause**, see workflows/verify.md §1), presents the plan for MANDATORY approval, runs it through `qc-auto-run`, and writes the conclusion back into both living documents.

## Input Contract (resolve via `path-registry.md`)

- `bug-report` of the UC — filter bugs by user-set Trạng thái (skill-written sections only; the QC manual-bug section is never processed — see Boundaries). None pending → say so (Vietnamese), STOP.
- `execution-report` of the UC — run-column count + prior results.
- Latest TC mds — `func-test-cases-md` RTM (AC ↔ TC) + `api-test-cases-md` RTM và bảng "Liên kết TC UI" (latest = highest version) — regression scope sources.
- `automation-specs` / `api-specs` / `mix-specs` — same-screen / same-resource TC lists; triage files — which TCs are `Thủ công`.
- `test-data` / `api-testdata` md — data/accounts the plan will use.
- `.claude/config/api-shared/root-cause-taxonomy.md` — the Root cause → regression mapping (read once).

## Output Contract

- `bug-report` updated: per bug `Đã đóng — verified <ngày> — <env>` or `Mở lại`, + one "Lịch sử" row each (never touching user-set statuses of bugs outside the plan).
- `execution-report`: one new run column (format per qc-execute-test-report; TCs outside the plan get `—`).
- Chat: approved plan recap + per-bug conclusion (Vietnamese); reminder list of OPEN bugs in the QC manual-bug section (QC verifies those by hand). Worklog per the worklog protocol.

## Workflow

One mode. Execute `workflows/verify.md`: select bugs → build plan (Root-cause-scoped) → **user approval (never skipped)** → run via `qc-auto-run` → conclude bugs → update both documents.

## Boundaries

- NEVER runs anything before the user approves the plan — no exceptions.
- Executes tests ONLY through `qc-auto-run` — never invokes Playwright directly.
- **QC manual-bug section:** never concluded, never edited by this skill — it only REMINDS the user in chat when that section has open bugs. Manual TCs inside an automated bug's plan are listed as "QC chạy tay + tự điền".
- MAY append new bug rows for real defects surfaced by regression — classified via `qc-bug-report`'s taxonomy (invoke `/qc-bug-report <UC-ID>` for the analysis instead of classifying inline).
- Never edits specs, services, page objects, or data files; never touches user-set "Trạng thái" values except to conclude the bugs in the approved plan.
- Language (qc-writting-rules two-group law): verify plans and chat reports are internal review output → always Vietnamese; rows/conclusions written into the bug report and execution report follow those files' language — official deliverables per `project-context-master` §3.0 "Project language" (status vocabulary stays verbatim per contract). No checkpoint files; worklog only.
