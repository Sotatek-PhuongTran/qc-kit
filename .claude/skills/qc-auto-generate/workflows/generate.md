# qc-auto-generate — Generate workflow

> Title: Auto-generate Generate Workflow | Created: 2026-07-02 | Updated: 2026-07-03 (feasibility triage) | Author: Claude (QC Kit v3 rebuild) | Version: v2
>
> Mode: **Generate** — no specs exist yet for the UC. Shared contracts live in `../references/` (mapping-rules, locator-strategy, dom-channels, data-and-secrets, automation-feasibility). This file only sequences them.

## Phase 0 — Identify + prerequisites + worklog

1. Resolve `<UC-ID>` and the **portal** (from the audited report's screen IDs / site-map portal, or ask the user on first run).
2. **Hard prerequisites** (resolve via `path-registry.md`); missing → STOP with a Vietnamese message naming exactly what is missing:
   - `uc-review-report` latest version (element vocabulary §4 + workflows §6).
   - `func-test-cases-draft` latest `.md` (NOT the xlsx — md is the machine-readable source).
   - `project-config` §3 Environment URL (non-prod — REFUSE production) + §4 test account for the roles the TCs use (including other portals' accounts when L2 seeding flows are needed — see `../references/automation-feasibility.md` §1).
3. **Seed-channel detection** (not a hard prerequisite — absence never STOPs): from `project-config`, record which channels this project has — other-portal accounts (L2), API docs + auth (L3), DB access (L4). The ladder in Phase 3 uses only the detected channels; anything uncoverable becomes an L5 manual declaration + warning.
4. Resume check per the shared checkpoint protocol; worklog `Running (Phase 1)`. Confirm mode = Generate (no spec exists for the UC under `tests/<portal>/<UC-ID>/`), else → `update.md`.

## Phase 1 — Scaffold the automation project (first run only)

If `docs/qc/automation/` lacks the base infra, scaffold from `../templates/` + `../scripts/` + `../helpers/`:

```
playwright.config.ts        (from template; use.baseURL from project-config §3; json+junit reporters)
package.json                (with build:testdata script)
helpers/base-page.ts
helpers/test-data.ts
scripts/build-test-data.mjs
```

If any flow needs dynamic email data (reset link / OTP) → also scaffold `helpers/email.ts`. Existing files are never overwritten. Multi-portal projects get one Playwright `project` entry per portal.

## Phase 2 — Ensure the portal common layer (INCREMENTAL)

For each page the UC's test cases touch:

1. **Page object** `portals/<portal>/pages/<page>.page.ts`:
   - FIRST: read the page's `crawl-findings` file (if it exists) — rows `Đã trả lời` guide this session's re-crawl (mapping-rules §0).
   - If missing OR its `// source:` stamp references an older audited version OR answered findings exist → (re)generate:
     a. Collect the **FULL element list of the page** from audited §4 (mapping-rules §0 — the page object represents the whole page; later UCs reuse it with no re-crawl).
     b. **Live crawl** the page ONCE on the configured non-prod environment: pick a DOM channel per `dom-channels.md`; resolve each element per `locator-strategy.md` (primary + 1 alternative, stability tier). Elements gated behind a state: drive the UI to that state first.
     c. Write the page object per `mapping-rules.md` §0 using `page-object.template.ts` (getters + small action methods + stamp).
   - Otherwise **reuse — do not rewrite**.
   - Unresolvable elements NEVER stop the session: record each in the page's `crawl-findings` living file (concrete driven-state description, per mapping-rules §0) and continue; specs of the TCs referencing them are deferred with triage verdict `Cần điều kiện`.
2. **Flow helpers** `portals/<portal>/flows/<area>.flows.ts`: ensure recurring sequences used by this UC exist as functions (`mapping-rules.md` §2); (re)generate only stale/missing ones from `flow.template.ts`.
3. **Setup for seeded preconditions** (`automation-feasibility.md` §1): when the triage (Phase 3 step 2) requires seeded state, ensure the chosen channel's artifact exists — L2: setup + teardown functions in `portals/<portal>/flows/setup.flows.ts` (may require page objects for that other portal, built the same way as step 1); L3: a `request`-context setup fixture using the documented API; L4: a reviewed seed script under `scripts/db-seed/` reading its connection from `.env`.
4. Ensure `portals/<portal>/fixtures.ts` exists (from `fixtures.template.ts`).

Report which page objects/flows were (re)generated vs reused.

## Phase 3 — Feasibility triage + per-screen specs + test data (directly from the TC md — no IR)

1. **Parse the TC md:** for each screen section, list its TCs (ID, title, priority, preconditions, steps, expected results).
2. **Feasibility triage (MANDATORY, before writing any spec):** assign every TC a verdict per `../references/automation-feasibility.md` — `Đã có script` / `Sẽ bổ sung` / `Cần điều kiện` / `Trùng` / `Thủ công`. Apply the precondition setup ladder (§1, using the channels detected in Phase 0), the capability map (§2 — never misclassify reload/back/tabs/keyboard/network/clock/storage scenarios as manual), the fault-simulation policy (§3), the fragility policy (§4) and the duplicate policy (§5). TCs whose seed dependency is satisfiable NOW (L2/L3/L4 channel available) are generated in this run — loop back to Phase 2 step 3 for their setup artifacts. TCs blocked ONLY by an L5 manual precondition still get their spec + a `manual` row in the data md `## Preconditions` (with dependent TCs + pre-flight check per `data-and-secrets.md`).
3. **Classify preconditions** of the TCs being generated into setup-steps vs precondition-data (`mapping-rules.md` §4); extract data variables + seeds (§5).
4. **Specs (one per screen):** write `tests/<portal>/<UC-ID>/<screen>.spec.ts` from `spec.template.ts` per `mapping-rules.md` §6 (+§1 verb mapping, §3 assertions). Each test title starts with its TC ID; tag `@P<priority>` (+`@slow` where feasibility §2 says so).
5. **Test-data md:** write `data/<UC-ID>_testdata_<YYYYMMDD>_v1.md` from `test-data.template.md` (Environment, accounts-by-role, per-TC variables with seeds, preconditions, config keys). NO passwords (see `data-and-secrets.md`).
6. **Compile + validate:** `node scripts/build-test-data.mjs <UC-ID>`; on validation error → report the exact line and STOP.
7. **Self-check** per `mapping-rules.md` §10; fix before finishing.

Checkpoint after this phase per the shared protocol.

## Phase 4 — Report + cleanup

1. **Triage report (MANDATORY file):** write `<UC-ID>_<feature>_automation-triage_<YYYYMMDD>_v<N>.md` at logical name `automation-triage` (path-registry), per `../references/automation-feasibility.md` §6 — one row per TC, Vietnamese, self-contained reasons, covering-TC references, unblock conditions. Never replace it with a chat summary.
2. Worklog `Done`; delete `process-logging/<UC-ID>/`. Print the Vietnamese chat report:
   - **Manual-precondition WARNING block first** (if any L5 rows exist): "TRƯỚC KHI CHẠY — cần tạo tay các trạng thái sau trên môi trường test:" — one line per `manual` precondition: required state, how to create it, dependent TC IDs, and whether a pre-flight check exists. State explicitly that `qc-auto-run` will Block these TCs until the state exists.
   - Verdict counts (from the triage file) + link to the triage file.
   - Specs per screen + TC counts; page objects/setup flows/seed scripts (re)generated vs reused.
   - Data variables written + blanks needing QC input.
   - **Crawl findings**: elements not found on the live UI (+ link to the `crawl-findings` file) — ask the user to reply inline in the file; list the deferred TCs waiting on each element.
   - Next commands: `npm run build:testdata -- <UC-ID>` → `/qc-auto-run <UC-ID>`.
