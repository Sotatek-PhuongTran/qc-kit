# API Test Data Contract

> Title: API Test Data Contract | Created: 2026-07-10 | Updated: 2026-07-16 (v1.1 — ví dụ TC ID per-UC file-scoped `TC_API_012`; 4 bảng khớp base contract) | Author: QC Kit (API extension — step 1) | Version: v1.1
>
> Shared contract — a THIN DELTA on top of `qc-func-auto-generate`'s `references/data-and-secrets.md` (the base contract: md is source of truth, build script validates → JSON, secrets policy). Everything not stated here follows the base contract unchanged. Consumers: `qc-api-auto-generate` (writer), `qc-auto-run` (build + pre-flight).

## File

- ONE living file per UC: `<UC-ID>_api_testdata.md` at logical name `api-testdata` (`docs/qc/automation/data/`) — NO date, NO version, edit in-place; QC-filled values never overwritten. Separate from the UI file (`<UC-ID>_testdata.md`) because API payloads ≠ UI inputs — but BOTH draw their EP/BVA values from ONE source: api-audited §3 validation matrix (no hand-copied duplicates; the generate skill fills initial values FROM §3 and stamps the audited version it used).

## Schema deltas vs the base contract

Same four tables (`## Accounts`, `## Variables`, `## Preconditions`, `## Config` — Config unchanged from the base contract) with these differences:

1. **Accounts** — same shape. Keys are the role keys the token manager consumes (`auth-strategy.md`): `| Key | Role (project-config §4) |`.
2. **Variables** — `Value` may be a JSON fragment for payloads (single line, backtick-quoted): 

   ```
   | TC | Variable | Value | Note |
   |---|---|---|---|
   | TC_API_012 | payload | `{"name":"Nguyen Van A"}` | thiếu email — case validate bắt buộc |
   | TC_API_013 | emailMaxLen | `a…a@test.vn` (256 ký tự) | biên trên +1 từ §3 audited |
   ```
3. **Preconditions** — identical schema and field rules (Key / Required state / Seed channel / TCs / Check / Confirmed). API TCs naturally prefer `api:` seed/check channels; `manual` rows gate exactly as in the base contract.

## Build

`scripts/build-test-data.mjs` is EXTENDED (step 5 of the roadmap), not forked: `node scripts/build-test-data.mjs <UC-ID> --api` parses `<UC-ID>_api_testdata.md` → `<UC-ID>_api_testdata.json` (gitignored). Validation rules identical; plus: any `Value` starting with `` `{ `` must parse as JSON (fail loudly with the row). `qc-auto-run` builds BOTH files for a Both-scope UC before running.

## Secrets

Unchanged from the base contract (HARD): no passwords/tokens in the md or JSON; accounts resolve by role at runtime from `project-config §4`; API tokens (when user-supplied) live ONLY in `.env`.
