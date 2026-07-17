# qc-api-auto-generate — Generate workflow

> Title: API Auto-generate Generate Workflow | Created: 2026-07-10 | Updated: 2026-07-17 (v3 — A4/B10: scaffold từ template DÙNG CHUNG của qc-func-auto-generate; A6: findings clone từ template; B9: API_TOKEN_<ROLEKEY>) | Author: QC Kit (API extension — step 5) | Version: v3
>
> Mode: **Generate** — no API specs exist yet for the UC. Shared contracts live in `../references/` + `.claude/config/api-shared/`. This file only sequences them.

## Phase 0 — Identify + prerequisites + worklog

1. Resolve `<UC-ID>`. **Hard prerequisites** (missing → STOP, Vietnamese message naming exactly what is missing):
   - `project-context-master` §3.0 Phạm vi test includes API (else this skill has nothing to do; file missing / field blank → STOP and ask the user to run `/qc-context-master` first).
   - `api-test-cases-md` latest md (`*_api-testcases_*_v*.md` — highest version).
   - `project-config` §3 has an `<ENV> - API` row (non-prod — REFUSE production) + §4 accounts for the roles the TCs use + §7 Auth API filled (mode, login endpoint / token qua `.env`).
2. **Auth readiness check**: §7 = login endpoint → OK. §7 = user-supplied tokens → verify `.env` HAS `API_TOKEN_<ROLEKEY>` keys (ROLEKEY = Key trong bảng `## Accounts` của data md) for the roles in scope (existence only — never read values). Missing keys → list them, continue generating, and WARN that `qc-auto-run` will need them.
3. Read `api-audited` latest (stamp source) + the answered rows of the UC's `api-findings` files (if any — they guide deferred-spec generation like update trigger D).
4. Resume check per the shared protocol; worklog `Running (Phase 1)`. Confirm mode = Generate (no spec under `tests/api/<UC-ID>/`), else → `update.md`.

## Phase 1 — Scaffold (create-if-missing, never overwrite)

1. **Runner base** absent (API-only project or automation never used): scaffold from the SHARED UI-branch templates in `qc-func-auto-generate/templates/` — scaffolded once by whichever generate skill runs first: `playwright.config.ts` from `playwright.config.template.ts` (unified template: per-portal UI projects + `api`/`mix` dirs, ALL filtered by directory existence), `package.json` from `package.template.json`, plus `helpers/test-data.ts` + `scripts/build-test-data.mjs` (copies of the UI branch's shared versions).
2. **Runner exists** (UI branch scaffolded it): do NOT touch existing files, EXCEPT `playwright.config.ts` — if it lacks the marked `// [qc-api] extra dirs` block, insert it (idempotent, only that block).
3. **API helpers** (from `../templates/`): `helpers/api/auth.ts`, `helpers/api/expect-api.ts`, and `helpers/api/api-conventions.ts` — conventions is generated ONCE from `project-config §7` (login endpoint, login BODY field names — template default is `{username, password}`; projects using e.g. `{email, password}` must be reflected here, token JSON path, auth header format) + the error-body paths inferred from the digest's error schema (e.g. `ErrorResponse.message`); mark inferred values `// TODO: xác nhận` for QC. QC-editable thereafter — regenerations never overwrite it.
4. **Schemas**: run `parse-api-doc-script <api-doc-file> --uc <UC-ID> --filter <resources> --schemas --out-dir <api-doc-digest dir per path-registry> --schemas-dir <api-schemas dir per path-registry>` — the digest md lands at its `api-doc-digest` registry path (`docs/qc/uc-read/<UC-ID>/`), while the `api-schemas` registry path (`docs/qc/automation/runner/schemas/`) holds the response schemas the specs assert.
5. **`.env.example` scaffold/update (placeholders only — NEVER values):** ensure `.env.example` at the runner root lists `API_TOKEN_<ROLEKEY>` keys for every role KEY in the data md `## Accounts` table that the TCs use (auth-strategy rung 2; key uppercased — matches `helpers/api/auth.ts`, which reads `API_TOKEN_` + `roleKey.toUpperCase()` from `process.env`). NO URLs — URLs never go in `.env` (single source = `project-config §3`, injected by `qc-auto-run`). Append missing keys only; never overwrite existing lines, never write a secret.

## Phase 2 — Service layer (INCREMENTAL) + optional probe

For each resource the UC's TCs touch:

1. **Service object** `services/<resource>.service.ts`: if missing OR its `// source:` stamp references an older api-audited version/digest date OR answered findings exist → (re)generate from `service.template.ts`: one function per operation used by the TCs (method + endpoint from the TC md verbatim), returning the raw `APIResponse` — NO assertions inside services. Header stamp: `// source: api-audited v<N> | digest: <date>`. Otherwise **reuse — do not rewrite**.
2. **API probe (optional — run when the non-prod env URL + auth are available now):** for each endpoint used, send ONE cheap authenticated request — documented GET where one exists; for write-only endpoints an intentionally-invalid minimal body (expected: any 4xx EXCEPT 404/405). The probe ALSO records the success-response shape: fills `api-conventions.auth.tokenPath` (login mode) and notes observed field paths for the semantic content the TCs require (expected-and-verify-policy v4 — response content). Probe results per resource go to the checkpoint `01_probe_<resource>.md`. A 404/405/auth-shape mismatch → row in `api-findings/<resource>_api-findings.md` (file findings mới clone từ `../templates/api-findings.template.md` rồi điền theo contract `api-shared/api-findings-contract.md`; concrete request + response; `TC bị ảnh hưởng` UC-qualified — `UC-101/TC_API_001`), the TCs on that endpoint are DEFERRED (`Cần điều kiện — chờ xác nhận endpoint, xem api-findings`), the session continues. No env/auth available → skip the probe entirely and note in the report that the first `qc-auto-run` acts as the probe.

## Phase 3 — Feasibility triage + specs + test data

1. **Parse the TC md** (per resource section: ID, title, priority, pre-conditions, steps, expected).
2. **Triage (MANDATORY before any spec):** verdict per `../references/api-feasibility.md` for every TC — `Đã có script` / `Sẽ bổ sung` / `Cần điều kiện` / `Trùng` / `Thủ công`. Apply the precondition ladder (§1), the API capability map (§2), fault policy (§3), duplicate policy (§4). L5-manual preconditions still get their spec + a `manual` row in the data md.
3. **Specs:** `tests/api/<UC-ID>/<resource>.spec.ts` from `api-spec.template.ts` per `request-mapping-rules.md` (§1 steps→service calls, §2 auth fixtures per role, §3 expected→assert helpers). Outcome asserts follow expected-and-verify-policy (v4): `expectSuccess`/`expectFailure` with `{uc, tcId}` so exact status/message are RECORDED into `api-baselines/<UC-ID>_api-baseline.json` at first run and asserted exactly afterwards; pass `exactStatus`/`exactMessage` only when the doc provides them. The run report lists newly recorded baseline entries for QC/BE review (`confirmed` field). MIX TCs (only if the TC md has a MIX section): `tests/mix/<UC-ID>/<flow>.spec.ts` from `mix-spec.template.ts` — MIX requires the referenced page objects to EXIST (UI branch generated them); missing → verdict `Cần điều kiện — chờ nhánh UI generate page object <page>`, never build page objects here.
4. **Test-data md:** write `data/<UC-ID>_api_testdata.md` from `api-testdata.template.md` — living file; per-TC variables with seed values FROM api-audited §3 (EP/BVA), payload fragments as single-line backtick JSON; Preconditions rows per the shared 6-column schema. NO tokens/passwords.
5. **Compile + validate:** `node scripts/build-test-data.mjs <UC-ID> --api`; validation error → exact line, STOP.
6. **Self-check** per `request-mapping-rules.md` §9; fix before finishing.

## Phase 4 — Report + cleanup

1. **Triage file (MANDATORY):** `<UC-ID>_<feature>_api-automation-triage_<YYYYMMDD>_v<N>.md` at `api-automation-triage` — one row per TC, Vietnamese, self-contained.
2. Worklog `Done`; delete `process-logging/<UC-ID>/`. Vietnamese chat report:
   - Manual-precondition WARNING block first (if any L5 rows).
   - Verdict counts + triage link; specs per resource + TC counts; services (re)generated vs reused; probe result (or skipped).
   - **api-findings**: endpoints lệch/không tồn tại (+ file link) — user/BE trả lời inline; deferred TC list per finding.
   - Data variables written + blanks needing QC; missing `API_TOKEN_<ROLEKEY>` keys (if any).
   - Next: `npm run build:testdata -- <UC-ID> --api` → `/qc-auto-run <UC-ID>`.
