---
name: qc-auto-run
description: Runs the Playwright automation suite (by UC, screen, tag, or test case), auto-installing Node/Playwright dependencies if missing, with a precondition pre-flight that blocks (not fails) tests whose required data-state is missing, then writes a run summary mapping pass/fail/blocked back to each TC ID. Trigger on "run test", "chạy test", "chạy automation", "/qc-auto-run <UC-ID>". To GENERATE or fix test scripts, use qc-auto-generate.
---

# Skill: qc-auto-run

Run the automation tests and record results. Project root: `docs/qc/automation/` (resolve via `path-registry.md` if different). Run all commands from that root. This skill ONLY runs tests and reports — it never generates or edits scripts (that is `qc-auto-generate`).

## Steps

1. **Go to the project root:** `cd docs/qc/automation`.

2. **Node check:** `node -v`. Missing → tell the user (Vietnamese) to install Node.js ≥ 18, then stop.

3. **Playwright check + AUTO-INSTALL:**
   - `node_modules/@playwright/test` missing OR `npx playwright --version` fails → `npm install`.
   - Browsers → `npx playwright install`. On Linux missing system libs → `npx playwright install-deps` (needs sudo — if it fails, tell the user to run it manually).
   - Tell the user what is being installed before doing it.

4. **Environment resolve + CONFIRM (every run):** URLs and accounts are NEVER read from `.env` — the single source is `project-config` (`.env` holds only external-service secrets, user-filled).
   - **Target env**: taken from the user's command ("chạy trên QA/DEV/STG" — must match an env name in `project-config §3`); not stated → default to the `Environment` in the UC's data md, and say so.
   - **Resolve**: from §3 collect the `<ENV> - <portal>` rows of the target env → one URL per portal; from §4 the accounts for the roles the UC's fixture uses. Missing row → ask the user to fill `project-config`, then stop. REFUSE production (env name or URL matching prod).
   - **Confirm before running (Vietnamese)**: print target env, URL per portal, account usernames per role — NEVER print passwords — and wait for the user's OK. Skip the prompt only if the user already named the env AND asked to run without confirmation in the same message.

5. **Build test data:** `npm run build:testdata -- <UC-ID>`. Validation failure → show the exact error and stop.

6. **Precondition pre-flight (MANDATORY before running):** read `preconditions` from `data/<UC-ID>_testdata.json` (schema: qc-auto-generate `references/data-and-secrets.md`). For each row:
   - **Has a `check`** (`api:` / `db:` / `ui:`) → execute it read-only against the configured environment (base URL + auth from project-config / `.env`; DB connection from `.env`). Check passes → precondition satisfied. Check fails → precondition MISSING.
   - **`manual` with `check = none`** → `confirmed` filled (`yes — <date> — <name>`) → treat as satisfied; empty → ASK the user (Vietnamese): "Precondition `<key>` — `<required state>` — đã được tạo trên môi trường `<env>` chưa?". Yes → proceed for this run and remind the QC to write `Confirmed` into the data md (this skill NEVER edits data files); No / unattended run → precondition MISSING.
   - **MISSING** → its dependent TCs (the row's `TCs` list) are **Blocked**: exclude them from the run scope (e.g. `--grep-invert "TC_059|TC_060"`), record `Blocked — thiếu precondition <key>` for each. The REST of the suite still runs — never abort the whole run for a missing precondition.
   - **Empty `TCs` list** (legacy data md format): the row cannot be blocked precisely — WARN the user (Vietnamese) that the missing state puts the WHOLE UC's results at risk, ask whether to proceed, and recommend migrating the data md to the v2 Preconditions schema.
   - Automated seed channels (`ui:`/`api:`/`db:`) are executed by the suite's own setup fixtures during the run — the pre-flight only verifies declared checks, it never seeds.

7. **Run** (scope per the user's ask; default = the named UC, minus Blocked TCs). Inject the resolved URLs as process env vars — `playwright.config.ts` maps them onto per-portal `projects`; specs keep relative routes: `BASE_URL_ORG=<org url> BASE_URL_ADMIN=<admin url> npx playwright test ...`
   - All: `npx playwright test`
   - One UC: `npx playwright test tests/**/<UC-ID>/`
   - One screen: `npx playwright test <spec path>`
   - By priority: `npx playwright test --grep "@P1"`
   - One test case: `npx playwright test --grep "<TC-ID>"` (if that TC is Blocked → report the missing precondition instead of running)
   - Watch: `--headed`; interactive: `--ui`.

8. **Write the run summary** — `reports/summary-latest.md` (overwrite in-place; this file is the versioning exception — history lives in `reports/history/summary_<YYYYMMDD-HHmm>.md`, copied before overwrite). Build it from `test-results/results.json` (titles carry TC IDs) using `templates/run-summary.template.md`. Blocked TCs are listed with their missing precondition — they count in Total but NOT in Pass and NOT as Failed. This file is the source of the dashboard `Execute stt` column (read by `qc-dashboard-sync`).

9. **Report on chat (Vietnamese):** pass/fail/blocked totals per UC; failed TC IDs with one-line reasons; **Blocked TC IDs with the exact missing precondition and how to create it** (from the data md `Required state` cell); point to `test-results/results.json` / `results.xml` and `npx playwright show-trace <trace.zip>` for failure replay.

10. **Worklog** per `docs/qc-lead/agent-work-log.local/README.md` (single-phase run: start entry → terminal `Done`/`Stopped`).

## Failure guidance

- Locator failures on the real UI → suggest `/qc-auto-generate <UC-ID>` (Update mode re-crawls the affected page objects), then re-run.
- Data validation failures → the QC edits `data/<UC-ID>_testdata_*.md`, then re-run.
- Blocked — thiếu precondition → the QC creates the state described in the data md `Required state` cell (and writes `Confirmed` for manual rows without a check), then re-runs; only the Blocked TCs need re-running.

## Boundaries

- Never runs against production.
- Never stores URLs or accounts in `.env` (single source = `project-config`); never prints passwords when confirming the run target.
- SOLE writer of `reports/`. Never edits specs, page objects, or data files (the `Confirmed` mark is the QC's edit, not this skill's).
- Pre-flight checks are READ-ONLY — this skill never seeds or mutates environment data.
- No checkpoint files (single-phase, re-runnable); worklog only.
