# Automation Feasibility & Triage Rules

> Title: Auto-generate Feasibility & Triage Rules | Created: 2026-07-03 | Author: Claude (from QC review feedback — Chris) | Version: v2 (seed-channel detection, DB rung, manual-precondition declarations)

Read at Phase 3 start, BEFORE deciding any TC is "not automatable". Skipping a TC is the LAST resort — every skip must survive the checks below and be reported per §6. Never skip with a grouped one-line reason.

## 1. Precondition setup ladder (extends mapping-rules §4)

A precondition that is not about the screen under test is NOT automatically manual.

**Channel detection first.** Projects differ: some provide API docs (Swagger/OpenAPI), some provide database access, some both, some neither. At generation start, read `project-config` to detect which seed channels THIS project has: §4 accounts per portal → UI channels (L1/L2); §2 API docs link + auth (account login via API, or token in `.env`) → API channel (L3); a configured DB connection (project-config environments table / `.env` — credentials NEVER committed) → DB channel (L4). Rungs whose channel is not configured are simply skipped — never STOP just because a channel is absent.

Resolve top-down; stop at the first rung that works:

| Rung | Mechanism | When | Where it lives |
|---|---|---|---|
| L1 | UI of the screen under test | Steps performable on the same screen | `beforeEach` / inline steps |
| L2 | UI of ANOTHER feature or portal | State creatable through any UI of the system (e.g. suspend an account via the Admin Portal; create an org / a patient record). Requires an account for that portal in `project-config §4` | setup flow in `portals/<portal>/flows/setup.flows.ts`, called from `beforeAll` or a Playwright setup project |
| L3 | API call | The UI path does not exist (feature has no UI / not deployed) AND `project-config §2` lists API docs with usable auth | Playwright `request` context in a setup fixture |
| L4 | DB seed | No UI and no API endpoint for the state, but DB access is configured. Direct inserts bypass business logic — riskiest automated channel; keep scripts minimal and reviewed | seed script under `scripts/db-seed/`, connection from `.env` |
| L5 | MANUAL | No configured channel can produce the state (feature not built yet, no API, no DB access) — also real fault injection (§3) | WARN the user + machine-readable declaration (below) |

**L5 (manual) obligations — all three are MANDATORY:**

1. **Still generate the spec** when the test's own steps are UI-automatable — only the precondition is manual, not the test.
2. **Declare machine-readably**: a row in the data md `## Preconditions` with `Seed channel = manual`, the dependent TC list, and a pre-flight `Check` whenever any channel allows verification (schema: `data-and-secrets.md`). This declaration is what `qc-auto-run` reads before running: check passes → the TCs run; check fails or unconfirmed → those TCs are reported "Blocked — thiếu precondition <key>" (not Failed) while the rest of the suite runs normally.
3. **Warn loudly**: the Phase 4 chat report prints a prominent Vietnamese warning block — "TRƯỚC KHI CHẠY — cần tạo tay các trạng thái sau trên môi trường test:" — one line per manual precondition: required state (self-contained), how to create it, and the dependent TC IDs.

Notes:
- **App-persisted browser state is L1, not "browser-specific"**: state the app itself writes to browser storage (e.g. remembered language choice) is reproduced by driving the UI, then reopening the page in the SAME browser context (or persisting/reusing `storageState`). Only real browser-native features (password-manager autofill, true zoom, OS dialogs) are out of scope (§2).
- Seeded state must not leak across tests: seed uniquely-named entities per run, or restore the state in teardown (e.g. re-activate the account that was suspended for the test).

## 2. Playwright capability map — do NOT misclassify these as manual

| Scenario in the TC | Technique |
|---|---|
| Reload / F5 | `page.reload()` |
| Browser Back | `page.goBack()` |
| New tab / multi-tab shared session | `context.newPage()` (same context = shared storage/session) |
| Keyboard focus order (Tab / Shift+Tab) | `page.keyboard.press('Tab')` + `toBeFocused()` per stop |
| "Watch the Network tab" | `page.on('request')` / `page.waitForRequest` — count and inspect outgoing requests directly |
| Slow server (observe locked/processing state) | intercept with `page.route`, delay before `route.continue()` — widens the transient state deterministically |
| State remembered across sessions | same-context reopen, or save + reuse `storageState` |
| Timers / auto-close after N seconds | `page.clock` virtual clock — exact, no real waiting, no flakiness |
| Double-submit race | two rapid clicks + request counting via a route/request listener |
| N repeated attempts (rate-limit checks) | plain loop; tag the test `@slow` |
| Hover style (cursor, underline) | `hover()` + computed-style check via `evaluate` |

Genuinely out of automation reach (default manual — still one triage row EACH): real password-manager autofill (clean automation profiles have no saved credentials); true browser zoom (viewport scaling is NOT equivalent); OS-level dialogs; pixel position/alignment checks — the latter belong to visual-regression specs (mapping-rules §7), not functional specs.

## 3. Fault simulation policy (project decision, 2026-07-03)

TCs whose precondition is "a server/subsystem is simulated to fail" are NOT automated by default; they go to the triage report as manual. Record the unblock paths in the report: (a) dev provides a test-env fault hook (flag/endpoint), or (b) QC explicitly approves browser-boundary mocking (`page.route` returning 5xx) for that UC — noting that a mock verifies the FRONTEND reaction only; backend truths (e.g. "no session was created") still require the real backend to fail.

## 4. Fragility policy

"Fragile" = the assertion depends on catching a transient state whose lifetime the test cannot control → intermittent false FAILs that erode trust in the suite. A TC may be marked fragile-manual ONLY if BOTH hold:

1. The transient state is purely frontend-internal (no network request involved, so a route delay cannot widen it) or the measurement is inherently nondeterministic; AND
2. No technique in §2 (route delay, virtual clock, `toBeFocused`, `expect.poll`) stabilises it.

Deterministic fill/press/assert cases (Enter on a disabled form, boundary values, error message clearing) are NEVER fragile.

## 5. Duplicate policy

Skip a TC as a duplicate ONLY if every observable assertion it demands is already asserted (same verbatim message / same state, same setup path) inside another automated test. The triage row MUST name the covering TC-ID and the exact assertions that cover it. If coverage is partial, or the TC is its own RTM row and costs fewer than ~10 spec lines, write it anyway — run results map back to test cases by TC-ID, so missing IDs create false coverage gaps in the dashboard/RTM.

## 6. Triage report contract (MANDATORY output of every Generate/Update run)

File: `<UC-ID>_<feature>_automation-triage_<YYYYMMDD>_v<N>.md` at logical name `automation-triage` (resolve via `path-registry.md`). Body in Vietnamese per `qc-writting-rules.md` (header block, glossary table, self-contained sentences).

- **ONE ROW PER TC** — grouped reasons ("cần seed backend: TC_x, TC_y…") are FORBIDDEN.
- Columns: TC | Verdict | Reason (self-contained per R1: subject + condition + why) | Covered by (TC-ID + which assertions) | Unblock condition / next step.
- Verdicts: `Đã có script` / `Sẽ bổ sung` (automatable now, queued for next generation) / `Cần điều kiện` (blocked on a nameable dependency — e.g. an unconfirmed channel) / `Trùng` (covering TC named per §5) / `Thủ công` (justified per §2–§4).
- A TC whose ONLY blocker is a manual-seed precondition (L5) is NOT `Thủ công` — its spec is generated and the verdict is suffixed `(chờ precondition manual: <key>)`.
- Summary counts per verdict at the top.
- The chat report only summarises counts and links this file; it never replaces it.
