# Request Mapping Rules — API test case (md) → service/spec code

> Title: API Auto-generate Mapping Rules | Created: 2026-07-10 | Updated: 2026-07-16 (v2 — §3 rewritten per expected-and-verify-policy v4: behavior-level expecteds + api-baseline record/assert) | Version: v2
>
> Input TCs are already request-precise (endpoint/method verbatim from the digest, logical data variables) with BEHAVIOR-level expecteds (outcome + side-effect; exact status/message only when the doc provides them — `api-shared/expected-and-verify-policy.md` v4). Code is organized as: **services** (request wrappers per resource) + **helpers/api** (auth, assertions, conventions) + thin **specs**. No intermediate representation.

## 0. Service object — ONE per resource, incremental

`services/<resource>.service.ts`: one exported async function per operation the TCs use — signature `(ctx: APIRequestContext, args)`, body = the ONE request, returns the raw `APIResponse`. NO assertions, NO auth logic inside services (auth lives in the context passed in).

- Function names from the operation (lowerCamelCase): `createUser(ctx, payload)`, `getUser(ctx, id)`, `listUsers(ctx, query)`.
- Endpoint + method VERBATIM from the TC md (which bound them from the digest). Path params interpolated from args.
- **Header stamp:** `// source: api-audited v<N> | digest: <YYYY-MM-DD>` — used for staleness (update trigger B).
- Regenerate ONLY if: stamp older than the current api-audited/digest, an answered api-findings row touches it, or a new operation is needed. Otherwise reuse.

## 1. Step mapping

| TC step pattern | Code |
|---|---|
| `Gửi <METHOD> \`<endpoint>\` với <mô tả> (<var>)` | `const res = await <service>.<fn>(ctx, d.<var>)` |
| `Gửi GET \`<endpoint>\` kiểm tra <điều gì>` (verify step) | `const check = await <service>.get<X>(ctx, id)` + §3 field assertions |
| MIX — UI verbs (`Nhấn`, `Nhập`, `Tải lại trang`...) | page-object methods per the UI branch's `mapping-rules.md` §1 (action-verbs table) — MIX specs import BOTH layers |

Values ALWAYS come from data variables (`vars('<TC-ID>')`); payload fragments are objects in the compiled JSON (build `--api` parses backtick JSON). Never hardcode; never emit `<...>` placeholders — unknown-at-generate-time = fixture/config key.

## 2. Auth — contexts per role (contract: `.claude/config/api-shared/auth-strategy.md`)

- `helpers/api/auth.ts` exposes `ctxFor(uc, roleKey)`: resolves the account by role (data md `## Accounts` → `project-config §4` at runtime), authenticates per `api-conventions.ts` (login endpoint / `.env` token / cookie), caches the context per role for the run. Refuses a prod-looking `API_BASE_URL`.
- Permission cases use dedicated contexts: `ctxNoAuth()` (no token), `ctxInvalid()` (malformed token), `ctxFor(uc, '<wrong role>')`. Expired-token cases exist only when the TC/triage said they are simulable.
- Tokens live in memory (or `.env`) ONLY — never in specs, data, logs, checkpoints, or reports.

## 3. Expected → assertions (helpers in `helpers/api/expect-api.ts` — contract: `api-shared/expected-and-verify-policy.md` v4)

TC expecteds are BEHAVIOR-level (policy §1). Exact status/message come from the doc when it provides them (rung 1/2) or from the **api-baseline** (`api-baselines/<UC-ID>_api-baseline.json`, policy §4): calling `expectSuccess`/`expectFailure` with `{uc, tcId}` RECORDS the observed values at first run (console `[api-baseline] RECORDED ...`, entry `confirmed=false`) and asserts them EXACTLY from the next run. Never invent a status/message; never ask BE for one.

| TC expected | Assertion |
|---|---|
| Thành công (success outcome — behavior class) | `await expectSuccess(res, { uc: UC, tcId: '<TC-ID>' })` — first run records the observed status into the api-baseline; later runs assert it exactly |
| Bị từ chối / thất bại (failure outcome — behavior class) | `await expectFailure(res, { uc: UC, tcId: '<TC-ID>' })` — asserts 4xx + error body non-empty via `api-conventions.ts` paths (HARD rules: 2xx always fails; 5xx always fails) + records/asserts exact status & message via the api-baseline |
| Doc-provided exact status (rung 1/2 ONLY) | add `exactStatus: <code>` to the same options — never pass a status the doc does not state |
| Doc-provided exact API-body message (rung 1/2 ONLY) | add `exactMessage: '<verbatim doc text>'` — NEVER paste UI display text into an API-body assertion (policy §3: UI messages belong to the UI branch's TCs; asserting them here is a design error) |
| Hai case phải trả về giống hệt nhau (relative assertion — policy §1 exception b) | `await expectSameResponse(res1, res2)` |
| Schema conformance | `await expectSchema(res, 'User')` — ajv against `runner/schemas/<Name>.json` |
| Side-effect (created/updated) | follow-up service GET + `expectFields(body, d.payload, ['email','name'])` |
| No-change guard (rejected writes) | follow-up GET/list → assert absent/unchanged — REQUIRED whenever the TC's expected says "không có bản ghi/không đổi" |
| Async side-effect | `expect.poll(async () => (await get(...)).status(), { timeout })` — bounded; beyond bounds the TC was triaged manual-verify |

Assertions are positive-first; `not.*` only as a supplementary guard. A later mismatch against a baseline entry with `confirmed=false` is a FINDING (QC/BE confirm or re-record — `qc-auto-run` lists it in the run summary's baseline section), NOT automatically a bug; against `confirmed=true` it is a regression candidate (`root-cause-taxonomy.md`).

## 4. Preconditions → setup (ladder: `../references/api-feasibility.md` §1)

Auth-state pre-conditions → `test.beforeAll` context creation (§2). Data-state pre-conditions resolve through the ladder; API tests seed natively through their own services (setup fixtures calling `createX`/state-transition functions), uniquely-named per run or restored in teardown. EVERY precondition — automated or manual — gets a `## Preconditions` row in the api data md (shared 6-column schema — `qc-auto-run` gates on `manual` rows).

## 5. Spec structure — ONE spec per resource

`tests/api/<UC-ID>/<resource>.spec.ts`:
- `import` the resource's service + `helpers/api` + `loadTestData(UC, { api: true })`.
- `test.describe('<resource> — <UC-ID>')`; contexts prepared in `beforeAll`.
- One `test('<TC-ID> — <title>', { tag: '@P<priority>' }, ...)` per TC — **title MUST start with the TC ID** (`TC_API_...`). Body: service call(s) + expect helpers. Keep specs short — requests in services, idioms in conventions.

## 6. MIX spec structure

`tests/mix/<UC-ID>/<flow>.spec.ts`: `test.use({ baseURL: portalUrl('<PORTAL>') })` (helper that reads `BASE_URL_<PORTAL>` and refuses prod); imports the portal's page objects/flows (UI layer — MUST already exist; never built here) + the resource services; title starts `TC_MIX_...`. UI part follows the UI branch's mapping-rules; API part follows §1–§3 above.

## 7. URLs

API requests go through contexts created by `auth.ts` with `baseURL = process.env.API_BASE_URL` (injected by `qc-auto-run`; refuse prod). Endpoints in services are RELATIVE paths. Never concat base URLs manually.

## 8. Deferred TCs (probe/finding)

A TC whose endpoint has an open `api-findings` row: spec NOT generated (or commented out if partially written); triage verdict `Cần điều kiện — chờ xác nhận endpoint, xem api-findings #<n>`. Generated on update trigger D after the row resolves.

## 9. Self-check before finishing

- [ ] No hardcoded URL/credential/token anywhere; no `<...>` placeholders (grep `<[a-zA-Z]` in generated `.ts`).
- [ ] Every test title starts with its TC ID; tags `@P<priority>` present.
- [ ] Every outcome assertion uses `expectSuccess`/`expectFailure` with `{uc, tcId}`; `exactStatus`/`exactMessage` appear ONLY with a doc citation; no UI display text asserted against an API body (§3).
- [ ] Every rejected-write TC has its no-change guard assertion.
- [ ] Every service function stamped; every spec's endpoints exist in the TC md (grep-verify — zero invented bindings).
- [ ] MIX specs import ONLY existing page objects; every MIX TC absent a page object is triaged `Cần điều kiện`.
- [ ] Triage file written — one row per TC (api-feasibility §5).
