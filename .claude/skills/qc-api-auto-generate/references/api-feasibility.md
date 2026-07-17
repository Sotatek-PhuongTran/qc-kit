# API Automation Feasibility & Triage Rules

> Title: API Feasibility & Triage Rules | Created: 2026-07-10 | Author: QC Kit (API extension — step 5) | Version: v1
>
> Read at Phase 3 start, BEFORE deciding any TC is "not automatable". Skipping is the LAST resort; every skip survives the checks below and is reported per §5 — never with a grouped one-line reason. (This file is the API twin of the UI branch's `automation-feasibility.md`; the ladder and policies are aligned, adapted to request-level testing.)

## 1. Precondition setup ladder (API-adapted)

Channel detection from `project-config` first (same rule as the UI branch): accounts per portal → L2; API available natively → L1/L3 merge for this branch; DB connection in `.env` → L4. Absent channels are skipped, never blocking. Resolve top-down, stop at the first rung that works:

| Rung | Mechanism | When |
|---|---|---|
| L1 | The API itself | State creatable through documented endpoints this branch already wraps (create a user, transition a state) → setup fixture calling the service functions. The NATIVE rung for API tests — most data states land here |
| L2 | UI of a portal | State only creatable through a UI flow (no endpoint exists) AND the UI branch has the flow/page objects → reuse `portals/<portal>/flows/*` in a browser-setup project. Requires the UI branch to have generated them — else record the dependency (`Cần điều kiện — chờ nhánh UI`) |
| L4 | DB seed | No endpoint and no UI path, DB access configured → reviewed script under `scripts/db-seed/` (connection from `.env`) |
| L5 | MANUAL | No configured channel — same three MANDATORY obligations as the UI branch: still generate the spec; declare a `manual` row in the api data md `## Preconditions` (6-column schema, with a pre-flight `Check` whenever any channel can verify); warn loudly in the Phase 4 report |

Seeded state must not leak: uniquely-named entities per run, or teardown restores.

## 2. API capability map — do NOT misclassify these as manual

| Scenario | Technique |
|---|---|
| Duplicate submission / idempotency | two awaited calls in sequence (or `Promise.all` for a race) — assert the documented policy |
| Concurrent update conflict | `Promise.all([updateA, updateB])` + assert one wins per doc (`409`/`412` when ETag/version exists) |
| Rate limit (N attempts) | plain loop; tag `@slow` |
| Pagination sweep | loop pages until empty; bounded by the digest's documented max |
| File upload endpoints | `multipart` option of APIRequestContext |
| Malformed JSON / wrong Content-Type | `ctx.post(url, { headers, data: '<raw string>' })` — raw body bypasses JSON serialization |
| Async side-effect (queue/job) | `expect.poll` with a bounded timeout |
| Email/OTP retrieval | `helpers/email.ts` (UI branch's helper — reuse) when the mail-testing service is configured |
| Token expiry | ONLY simulable when §7 declares a short-TTL test token or an expired token can be provisioned in `.env` — else the expiry TC is `Thủ công` (malformed-token TCs are always automatable) |

Genuinely manual by default (one triage row EACH): third-party callbacks/webhooks without a sandbox trigger; states requiring actions outside the system (physical device, human approval in an external tool); websocket/streaming endpoints (variant chưa hỗ trợ đợt này → `Cần điều kiện — variant websocket`).

## 3. Fault simulation policy

TCs whose precondition is "a downstream subsystem fails" are NOT automated by default — triage `Thủ công` with the unblock paths recorded: (a) dev provides a test-env fault hook, or (b) QC approves mocking at the HTTP boundary for that UC, noting a mock can only verify THIS service's reaction, not downstream truths.

## 4. Duplicate policy

Skip as `Trùng` ONLY if every assertion the TC demands is already asserted (same endpoint, same verbatim expected, same setup) in another automated TC — the row MUST name the covering TC-ID and assertions. Partial coverage or an own-RTM-row TC under ~10 spec lines → write it anyway (missing IDs create false gaps in test-results/RTM).

## 5. Triage report contract (MANDATORY output of every Generate/Update run)

File: `<UC-ID>_<feature>_api-automation-triage_<YYYYMMDD>_v<N>.md` at logical name `api-automation-triage`. Vietnamese per `qc-writting-rules.md`.

- **ONE ROW PER TC** — grouped reasons FORBIDDEN.
- Columns: TC | Verdict | Reason (self-contained) | Covered by | Unblock condition / next step.
- Verdicts: `Đã có script` / `Sẽ bổ sung` / `Cần điều kiện` (nameable dependency: api-findings #, chờ nhánh UI, variant...) / `Trùng` / `Thủ công` (justified per §2–§3).
- A TC blocked ONLY by an L5 manual precondition is NOT `Thủ công` — its spec exists; verdict suffixed `(chờ precondition manual: <key>)`.
- Summary counts per verdict at the top. The chat report links this file, never replaces it.
