---
name: qc-auto-run
description: "Runs the Playwright suite across UI / API / MIX branches (by UC, screen, resource, tag or TC) with scope pre-checks and a precondition pre-flight that Blocks missing data-states; TC-mapped run summary; auto-triggers qc-execute-test-report when gates are clean. Trigger: /qc-auto-run <UC-ID>, 'chạy test', 'chạy automation'. To GENERATE scripts use qc-func-auto-generate / qc-api-auto-generate."
---

# Skill: qc-auto-run

## Purpose

Run the automation tests and record results. Automation root: `docs/qc/automation/` (user-facing folders); code + raw run output live under the runner root `docs/qc/automation/runner/` (resolve via `path-registry.md` if different). Run ALL npm/npx commands from the runner root. This skill ONLY runs tests and reports — it never generates or edits scripts (that is `qc-func-auto-generate` / `qc-api-auto-generate`).

## Input / Output Contract

**Inputs** (resolve via `path-registry.md`):

- `project-context-master` §3.0 Phạm vi test — decides the branch scope (file missing / field blank → STOP, ask the user to run `/qc-context-master` first).
- `project-config` — §3 env URLs per portal + `<ENV> - API`, §4 accounts per role, §7 Auth API. URLs and accounts are NEVER read from `.env` — the single source is `project-config`; `.env` holds only external-service secrets + optional `API_TOKEN_<ROLEKEY>` (user-filled; ROLEKEY = Key trong bảng `## Accounts` của data md — existence check only, values never read).
- Test-case md globs + `tests/` dirs + prior `reports/` — Phase 0 cheap checks only (never open spec/TC contents).
- `data/<UC-ID>_testdata.md` / `data/<UC-ID>_api_testdata.md` (+ compiled json) — test-data build + precondition pre-flight.
- `crawl-findings` / `api-findings` living files — the auto-trigger gate (run.md step 10).

**Outputs**: `reports/summary-latest.md` (overwrite in-place; prior copy → `reports/history/summary_<YYYYMMDD-HHmm>.md`; built from `templates/run-summary.template.md`), Vietnamese chat report, worklog entry. Auto-invokes `/qc-execute-test-report <UC-ID>` per UC when its findings gates are clean (run.md step 10).

## Phase 0 — Scope & branch check (summary)

Cheap checks ONLY (one project-context-master section + file globs — never open spec/TC contents): §3.0 Phạm vi test decides the branch(es); a Both-scope UC without API TCs runs UI only. Scripts missing for BOTH branches → STOP and send the user to the generate skills first; missing for ONE → confirm with the user (run the existing branch, or generate the missing one then run both). Prior run results exist → confirm the rerun scope. The user's own explicit scope in the invocation always wins and skips the confirm stops — Phase 0 then only validates that the requested branch has scripts. Full decision tree (0.1–0.4, incl. the THIẾU CẢ 2 stop): `workflows/run.md` Phase 0.

## Routing

| When | Read |
|---|---|
| Every run (single mode) | `workflows/run.md` — Phase 0 decision tree + steps 1–11 (env checks & auto-install, environment resolve + CONFIRM, test-data build, precondition pre-flight, run with env-var injection, run summary incl. baseline section, chat report, gate check + auto-trigger, worklog) + failure guidance |

## Boundaries

- Never runs against production (any of BASE_URL_* / API_BASE_URL matching prod → refuse).
- Never stores URLs or accounts in `.env` (single source = `project-config`); never prints passwords or tokens.
- SOLE writer of `reports/`. Never edits specs, services, page objects, or data files (the `Confirmed` mark is the QC's edit, not this skill's).
- Pre-flight checks are READ-ONLY — this skill never seeds or mutates environment data.
- Phase 0 confirm stops are skipped only by an explicit user scope in the same message; the env CONFIRM (run.md step 4) has its own skip rule.
- Auto-trigger: ONLY `qc-execute-test-report`, ONLY when the findings gates are clean; never `qc-bug-report`; never for verify-scoped runs invoked by `qc-bug-verify` (run.md step 10 exception).
- No checkpoint files (single-phase, re-runnable); worklog only.
