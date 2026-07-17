---
name: qc-api-auto-generate
description: "Generates Playwright API test scripts (service layer per resource, MIX UI↔API specs) from the API test-case md — no DOM channel needed; an optional non-prod probe feeds api-findings. Trigger: /qc-api-auto-generate <UC-ID>, 'tạo automation api', 'generate api test script'. To RUN tests use qc-auto-run; for UI scripts use qc-func-auto-generate."
---

# Skill: qc-api-auto-generate

## Purpose

Turn finalized API test cases into maintainable **Playwright `APIRequestContext` specs** inside the SAME runner as the UI branch (one runner → one run command, one summary, MIX specs can use both layers). Structure mirrors the UI branch: **service objects** per resource (the API analog of page objects — request wrappers, no assertions), shared `helpers/api/` (token manager per role, schema validator, expect helpers, QC-editable API conventions), thin per-UC specs whose titles carry TC IDs.

The TC md is already bound to real endpoints (M2 gate at design time) — so there is NO crawl and NO binding step here. An optional **API probe** (non-prod only) verifies the bindings live before mass generation; mismatches go to the `api-findings` living log (the API twin of crawl-findings) and the affected specs are deferred — never invented, never blocking the session.

## Input Contract

Resolve via `path-registry.md`:

- `api-test-cases-md` — latest md (`*_api-testcases_<variant>_<YYYYMMDD>_v<N>.md`, highest version; never the xlsx). Machine-readable source: endpoints/methods verbatim, logical data variables, behavior-level expected (outcome/side-effect; exact status/message only when the doc provides them).
- `api-audited` — latest, for §3 seed values when initializing the data md; stamp = api-audited version + digest build date (binding/endpoint nằm ở bảng "Binding OP ↔ endpoint" trong prelude TC md, không còn ở api-audited).
- `project-context-master` — §3.0 Phạm vi test ONLY (must include API; file missing / field blank → STOP and ask).
- `project-config` — §3 `<ENV> - API` base URL (verified NON-production — the skill REFUSES production); §4 accounts per role; **§7 Auth API** (login endpoint / token qua `.env` / cookie — contract: `.claude/config/api-shared/auth-strategy.md`).
- `api-findings` — answered rows (`Đã trả lời`) guide this run (update trigger D).
- `.env` — existence check only for `API_TOKEN_<ROLEKEY>` keys (ROLEKEY = Key trong bảng `## Accounts` của data md) when §7 says user-supplied tokens; values are NEVER read into context or files.
- Shared contracts on demand: `api-testdata-contract.md`, `auth-strategy.md`, `api-findings-contract.md`.

## Output Contract (same automation root `docs/qc/automation/`)

```
data/<UC-ID>_api_testdata.md        LIVING file — accounts (role keys), per-TC variables (payload JSON fragments),
                                    Preconditions (6-column schema, shared with the UI branch contract)
api-findings/<resource>_api-findings.md   LIVING doc per resource (contract: api-shared/api-findings-contract.md)
api-baselines/<UC-ID>_api-baseline.json   LIVING — exact status/message recorded at first run per TC (expected-and-verify-policy (v4) §4);
                                    machine-written; QC/BE edit ONLY the `confirmed` field
triage/<UC-ID>_<feature>_api-automation-triage_<YYYYMMDD>_v<N>.md   per-TC verdicts (references/api-feasibility.md §5)
runner/
├── playwright.config.ts            scaffold-if-missing from the SHARED template qc-func-auto-generate/templates/
│                                   playwright.config.template.ts — scaffolded once by whichever generate skill runs
│                                   first (unified: per-portal UI projects + api/mix dirs, all filtered by existence
│                                   — UI-only projects see no change)
├── package.json / helpers/test-data.ts / scripts/build-test-data.mjs   scaffold-if-missing (shared with UI branch —
│                                   package.json from qc-func-auto-generate/templates/package.template.json;
│                                   build script supports --api)
├── helpers/api/auth.ts             token manager per role (cache per run; refuses prod; never logs tokens)
├── helpers/api/expect-api.ts       expectSuccess / expectFailure ({uc, tcId} — api-baseline record/assert) /
│                                   expectSameResponse / expectSchema (ajv) / expectFields helpers
├── helpers/api/api-conventions.ts  QC-EDITABLE per-project idioms: login endpoint + token path + auth header +
│                                   error-body paths (the API twin of notification-channels.ts)
├── schemas/<Name>.json             build output của parse-api-doc-script --schemas (regenerate, not hand-edit)
├── services/<resource>.service.ts  SOLE writer; incremental (stamped api-audited version + digest date)
└── tests/api/<UC-ID>/<resource>.spec.ts + tests/mix/<UC-ID>/<flow>.spec.ts
```

Plus `worklog-per-device` per the worklog protocol.

## Modes

| Mode | Signal | Workflow |
|---|---|---|
| **Generate** | No spec under `tests/api/<UC-ID>/` | `workflows/generate.md` |
| **Update** | Specs exist — TC md changed, bindings drifted, data md changed, or api-findings answered | `workflows/update.md` |

## Checkpoint & Resume

Follow `.claude/config/checkpoint-protocol.md` + `workflows/checkpoint-protocol.md` (per-UC scope; per-resource probe checkpoints).

## References (read on demand)

- `references/request-mapping-rules.md` — TC md → service/spec code contract (steps→requests, expected→assertions, auth fixtures, MIX structure, self-check).
- `references/api-feasibility.md` — API triage: precondition ladder (API-adapted), capability map (token expiry, callbacks, async jobs...), fault/duplicate policies, triage report contract.

## Boundaries

- Standalone except ONE read: `project-context-master` §3.0 (Phạm vi test) — nothing else of that file. Never reads `qc-site-map`, `qc-dashboard`, or the UI branch's audited/TC files (MIX specs reuse existing page objects/flows as CODE, not as documents).
- SOLE writer of: `services/`, `helpers/api/`, `schemas/`, `tests/api/`, `tests/mix/`, `data/*_api_testdata.md` (QC edits values), `api-findings/` question columns, its own triage files. `api-baselines/` entries are written by the RUNTIME helper at first run (expect-api.ts) — QC/BE edit only `confirmed`. NEVER touches: page objects, flows, UI specs, UI data md, `crawl-findings/`, `notification-channels.ts`.
- The ONLY shared file it may edit is `playwright.config.ts` — and only to insert/refresh the marked `api`/`mix` block (idempotent); scaffold-if-missing uses the unified template.
- Never probes or targets production; never writes tokens/passwords into any generated file, checkpoint, or log.
- Never invents an endpoint — a TC whose endpoint fails the probe (404/405/auth-shape mismatch) goes to `api-findings` with the concrete request+response, its spec is deferred, the rest proceed.
- Every non-automated TC gets its own triage row (api-feasibility §5). Does NOT run tests — that is `qc-auto-run`.
- Versioning: triage versioned `v<N>`; code files + data md are in-place exceptions (git-tracked; QC-filled values never overwritten).
