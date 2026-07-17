# API Auth Strategy

> Title: API Auth Strategy | Created: 2026-07-10 | Updated: 2026-07-17 (v2 — A3: đánh dấu NHÀ CHÍNH bộ case quyền tối thiểu) | Author: QC Kit (API extension — step 1) | Version: v2
>
> Shared contract. Consumers: `qc-api-tc-design` (permission TC set), `qc-api-auto-generate` (token manager scaffold), `qc-auto-run` (runtime resolve). The API branch NEVER inherits the UI login session — independent auth is a precondition for permission testing.

## Resolution order (runtime)

1. **API login endpoint** declared in `project-config §7 Auth API` → the token manager (`runner/helpers/api/auth.ts`) logs in per role and caches the token **in memory for the duration of the run**. Accounts resolve by role exactly like the UI branch: data md `Accounts.Key` → role name → `project-config §4` row (credentials read at runtime only).
2. **No login API** → static tokens supplied by the user in `.env` as `API_TOKEN_<ROLEKEY>` (per-env prefix allowed, e.g. `QA_API_TOKEN_ADMIN`; unprefixed = shared). `qc-api-auto-generate` scaffolds the placeholders in `.env.example`.
3. **Neither available** → STOP and ask the user (Vietnamese). Never guess, never scrape a token from a browser session.

On `401` mid-run: refresh once (rung 1) or fail the affected tests with the message "token hết hạn — cập nhật `.env` rồi chạy lại" (rung 2). Never loop retries.

## Cookie-session systems

If the system authenticates API calls by session cookie instead of bearer token, rung 1 still applies: the token manager performs the LOGIN API call itself and holds the cookie jar for `APIRequestContext`. It still does NOT reuse the UI browser's storageState — the API branch owns its own sessions per role.

## Secrets policy (inherits data-and-secrets.md — HARD)

- Passwords: ONLY read from `project-config §4` at runtime. Tokens: ONLY in `.env` (gitignored) or in memory.
- Tokens/passwords MUST NOT appear in: generated specs, service objects, data md/json, triage, findings, worklog, checkpoint files, or any chat confirmation output.
- Production URLs/credentials are refused — same rule as the whole automation tier.

## Minimum permission coverage per operation (design-time rule for qc-api-tc-design)

> NHÀ CHÍNH của bộ case quyền tối thiểu — mọi file khác trỏ về đây ("per auth-strategy.md minimum set"), không chép lại danh sách case.

For every operation in api-audited §2, the TC set MUST include at least:

| Case | Expected (typical) |
|---|---|
| Correct role | Operation succeeds per AC |
| Wrong role (each role forbidden by §5 matrix — at least one representative) | `403` + error body, NO side-effect |
| No token | `401`, NO side-effect |
| Invalid/expired token | `401`, NO side-effect — include only if simulable (malformed token always is; true expiry only when TTL is short or an expired token can be provisioned; otherwise mark the TC `manual`) |

Deviations (system returns 404 instead of 403 by design, etc.) are recorded in api-audited §6 with their source, and TCs assert the documented behavior.
