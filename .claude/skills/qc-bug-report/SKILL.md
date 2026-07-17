---
name: qc-bug-report
description: "Analyzes the failed TCs of the latest recorded run, classifies root cause per the shared taxonomy (UI↔API counter-evidence), writes verified bugs and stamps Bug IDs into test-results. Trigger: /qc-bug-report <UC-ID>, 'phân tích bug', 'viết bug' — or auto-invoked by qc-execute-test-report. To verify FIXED bugs use qc-bug-verify."
---

# Skill: qc-bug-report

## Purpose

Turn the `Fail` cells of the latest recorded run into **classified conclusions**: real defects become bugs with a **Root cause** (`Lỗi BE` / `Lỗi FE` / `Lỗi tích hợp`) and cross-branch evidence; non-defects (`Lỗi script` / `Lỗi môi trường` / `Lỗi data test` / `Tài liệu lỗi thời` / mismatch với api-baseline entry `confirmed=false` → stamp `Chưa chốt — baseline chưa confirm`, per expected-and-verify-policy §4) become `Chưa chốt — <lý do>` cells with concrete follow-ups — never bugs. The core instrument is the **counter-evidence matrix**: a failing TC is judged against its linked TC on the other branch (the "TC UI liên quan" table of the API TC md) before any conclusion.

Taxonomy, decision matrix, one-sided-evidence rule, and evidence requirements live in `.claude/config/api-shared/root-cause-taxonomy.md` — read it ONCE at start; this skill never restates it.

## Input Contract (resolve via `path-registry.md`)

- `execution-report` — the latest run column's `Fail` cells (no Bug ID yet) of AUTOMATION TCs. No such cells → report "không có TC fail cần phân tích", STOP.
- `automation-run-summary` + `runner/test-results/results.json` — error lines; **open trace/response files ONLY for the failing TCs** (token rule 9.4).
- `api-test-cases-md` prelude (latest = highest version) — the "Liên kết TC UI" table (cross-links); `func-test-cases-md` — titles of linked UI TCs only.
- `automation-triage` + `api-automation-triage` latest — verdict context (deferred reasons).
- Answered `crawl-findings` / `api-findings` rows of the UC — the "đã kiểm chứng" grounding.
- Existing `bug-report` — append/update, never recreate; dedupe against open bugs.

## Output Contract

- `bug-report` — LIVING file per UC (template: `templates/bug-report.template.md`): summary table + detail sections, **Root cause** column/row, IDs `BUG-<UC-suffix>-<NN>` sequential. TCs failing from ONE root cause → ONE bug listing all of them.
- `execution-report` — stamps the LATEST run column's analyzed cells: `Fail` → `Fail — BUG-<...>` or `Chưa chốt — <lý do>`. Touches NOTHING else in that file.
- Chat report + worklog (single-phase, no checkpoint files).

## Trigger

Auto-invoked by `qc-execute-test-report` when Fail cells exist (đã chốt: chạy thẳng), or manually `/qc-bug-report <UC-ID>` (e.g. after answering findings, or to re-analyze).

## Workflow

One mode — execute `workflows/analyze.md` top to bottom.

## Boundaries

- **Manual TCs are OUT of scope** (đã chốt): QC hand-writes manual-TC bugs into the bug file's dedicated section `## Bug từ TC thủ công (QC tự ghi)` — this skill never analyzes manual Fail cells and never edits that section.
- Never runs tests. Missing counter-evidence → apply the one-sided rule (report from available evidence + state it explicitly) and RECOMMEND the counterpart run in chat — never execute it.
- Writer of bug rows/details + the analyzed result cells ONLY. NEVER edits: the bug "Trạng thái" column once user/dev set it, previous run columns, manual-TC cells, the QC manual-bug section.
- A failure becomes a bug ONLY via the taxonomy's decision rules; uncertain classification → ask the user, never guess silently.
- Reproduction steps come from the TC md + observed error — never invented. Language (qc-writting-rules two-group law): the bug report is an official deliverable → project language per `project-context-master` §3.0 "Project language"; chat reports always Vietnamese; status/stamp vocabulary (Root cause values, `Chưa chốt — <lý do>`) stays verbatim per the taxonomy contract. Self-check §5 before save; system messages verbatim.
