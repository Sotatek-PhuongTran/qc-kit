# Update API Test Cases (Impact-analysis Workflow)

> Title: API TC Update Workflow | Created: 2026-07-10 | Updated: 2026-07-14 (v3 — trigger D "API doc mới" chuyển về đây từ qc-api-read re-audit: re-binding theo generate Step 1.4; v2 2026-07-13 — ownership role change handled as trigger A) | Version: v3
>
> Runs when `api-test-cases` already exists for the UC. Produces a NEW md/xlsx version — never edits the old one. All drafting/writing/audit rules are the SAME as `generate-api-test-cases.md` — this file defines only the delta flow.

## Step 0 — Identify the trigger

From the user's prompt (ask if unclear, Vietnamese):

| Trigger | Typical source |
|---|---|
| A — Requirement/audit change | `api-audited` has a new version (BE answers, UC update, ownership role change Owner↔Reuse) |
| B — User feedback | QC reviews the xlsx and requests changes |
| C — New variant | `project-context-master` §3.0 adds an API variant (guard: no `references/<variant>-technical.md` → STOP, variant not yet supported — generate Step 1.3) |
| D — API doc mới/cập nhật | Swagger/OpenAPI/Postman đổi version → rebuild digest, RE-BINDING theo generate Step 1.4 (endpoint mất/đổi param → finding + TC group deferred; endpoint mới → binding mới); cập nhật bảng "Binding OP ↔ endpoint" trong prelude |
| E — Mix | more than one of the above |

## Step 1 — Scoped input

Latest `api-test-cases-md` (highest version — baseline, gồm bảng binding trong prelude) + the changed inputs ONLY: trigger A → new `api-audited` (read its §10 change log first); trigger B → the feedback text; trigger C → the new variant technical file; trigger D → rebuilt digest + diff với bảng binding cũ. HARD gate (API doc) and digest rebuild apply exactly as in generate Step 1.

## Step 2 — Impact analysis + APPROVAL PAUSE (MANDATORY)

1. Diff the change against the baseline TC set → classify every affected TC: `NEW` / `UPDATED (what changes)` / `DELETED (why)` / `UNCHANGED`. Trace each to the driving change (audited §, feedback item). An ownership flip marks whole endpoint-level TC groups: `Owner → Reuse` → those groups `DELETED (endpoint-level chuyển về UC chủ mới — ghi rõ UC-X)` + a new reuse-reference row; `Reuse → Owner` → the full endpoint-level expansion is `NEW`.
2. Present the plan on chat (Vietnamese): counts + per-TC one-liners for NEW/UPDATED/DELETED + which coverage audits will re-run. **WAIT for the user's approval. Never write before approval.** The pause state is checkpointed (`progress.md` `status: Awaiting approval`) so an interrupted run resumes at the pause, not before it.
3. User may add/remove items; apply their edits to the plan.

## Step 3 — Apply + re-audit + write

1. Apply the approved plan following ALL generate-workflow rules (drafting passes, C1–C6, self-check gates).
2. Re-run the coverage audits (generate Step 3) on the FULL resulting set — an update must never silently break existing coverage. Preserve the RTM's `TS liên quan` column (remap AC/TC ↔ `TS_API_*` against the latest scenarios version; re-run its self-check).
3. Scratch per variant (generate Step 3.5) → deliverable md written as a NEW version per `naming-convention.md`: `<UC-ID>_<feature>_api-testcases_<variant>_<YYYYMMDD>_v[N+1].md` — NEVER edit or overwrite the old version in place (versions are immutable; in-place re-write semantics no longer exist for this artifact). The Phase-2 xlsx gets the SAME base name + `.xlsx` (version always matches the md). Annotate changed rows' Title with `[NEW]` / `[UPDATED]` / `[DELETED — giữ dòng, gạch nội dung]` markers (the converter strips them in the xlsx).
4. Checkpoint end-of-phase per the delta file; hand off to `workflows/convert-md-to-xlsx.md`.
