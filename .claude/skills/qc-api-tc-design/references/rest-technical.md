# REST Technical — variant additions (default variant)

> Title: REST Technical | Created: 2026-07-10 | Author: QC Kit (API extension — step 4) | Version: v1
>
> Loaded when `project-context-master` §3.0 Variant API includes `rest`. ADDS to `api-common-technical.md` — never repeats it. Assert documented behavior first (ladder rung 1–2); where the doc is silent, these are the default REST expectations — mark such TCs' expected source accordingly and raise a question when the behavior matters.

## R1 — Method semantics

| Check | TC to draft |
|---|---|
| GET is safe | GET never changes data — verify-after-GET on a mutable resource (no side-effect) |
| PUT/DELETE idempotent | Same PUT twice → same end state; DELETE twice → 2nd call `404` (or documented `204`) and no error side-effect |
| POST non-idempotent / duplicate policy | Same POST twice → duplicate created OR documented rejection (409 / idempotency-key) — assert the DOCUMENTED policy; undocumented → question |
| Method not allowed | Unsupported method on a known path → `405` (or documented) |

## R2 — Resource id handling

- Non-existent id → `404` + documented error body (not `200` with empty body, not `500`).
- Malformed id (wrong type/format) → `400` or `404` per doc — one TC per documented case.
- Another tenant's/org's id with a valid token → authorization check (`403`/`404` per doc) — pair with A4 permission TCs, don't duplicate.

## R3 — List operations (pagination / filter / sort)

- Bounds per digest params: `page`/`offset` = 0, negative, beyond last; `limit`/`size` = 0, 1, max, max+1.
- Empty result page → `200` + empty array (not `404`), total/paging fields consistent.
- Unknown filter/sort field → documented behavior (400 vs ignored) — assert it; combined filters per the Decision Table technique (`qc-api-scenario-design/references/api-scenario-rules.md` technique 3).
- Ordering stability: sort by the documented default when unspecified.

## R4 — Headers & content negotiation

- `Authorization` per `auth-strategy.md` (covered by A4 — do not redraft here).
- `Content-Type` wrong/missing on write ops → `415`/`400` per doc.
- `Accept-Language` (only if the system localizes messages): message language switches, codes stay stable — Medium.

## R5 — Status & error body consistency

- Every 4xx TC asserts the documented error body SHAPE (schema from digest, e.g. `ErrorResponse`) in addition to the message — one consistency TC per resource is enough (Medium), not per error case.
- 5xx is never an accepted expected for a client-input case — a doc that maps input errors to 5xx is a `DOC_REQ_MISMATCH` question.

## R6 — Concurrency (only when the doc exposes it)

- `ETag`/`If-Match` or version fields present in the digest → stale-version update TC (expected `409`/`412` per doc). Absent → do NOT invent; concurrent-update risk goes to a question if the business requires it (audited UC §7 — "Phân tích liên kết giữa các chức năng"; KHÔNG phải api-audited §7).
