# qc-api-auto-generate — Update workflow

> Title: API Auto-generate Update Workflow | Created: 2026-07-10 | Updated: 2026-07-16 (v2 — trigger A baseline invalidation; trigger B routing → tc-design update trước, re-audit chỉ khi đổi nghiệp vụ; naming md chính thức) | Author: QC Kit (API extension — step 5) | Version: v2
>
> Mode: **Update** — API specs already exist for the UC. Regenerate ONLY what changed.

## Phase 0 — Identify + trigger + worklog

1. Resolve `<UC-ID>`; locate existing API specs / services / data md. None found → switch to `generate.md`.
2. Determine trigger(s) — default: detect all:
   - **A — TC md changed** (newer `api-test-cases-md` version — `*_api-testcases_*_v*.md`, highest version): diff TCs → update the affected resource specs only; append new data variables (with §3 seeds) WITHOUT overwriting QC-entered values. **Baseline invalidation:** every TC that is UPDATED, DELETED, or renamed (đổi ID) → delete its entry from `api-baselines/<UC-ID>_api-baseline.json` (list the deleted entries in the Phase 2 report so the QC knows the next run will re-record them).
   - **B — Binding drift** (a run reported 404/405/schema failures, or a fresh digest differs from the services' stamps): re-run `parse-api-doc-script` (digest + `--schemas`), regenerate the affected **service objects** only (specs are unchanged — they call service methods); a drift that contradicts the TC md content itself → `api-findings` row + recommend `/qc-api-tc-design <UC-ID>` update (trigger D — re-binding theo doc mới); recommend `/qc-api-read` re-audit ONLY when the answer changes the BUSINESS behavior (a new/updated doc is NOT a re-audit trigger); do NOT silently rewrite specs against the doc.
   - **C — Data md changed:** only re-compile (`node scripts/build-test-data.mjs <UC-ID> --api`).
   - **D — api-findings answered** (rows `Đã trả lời`): re-probe exactly those endpoints guided by the inline answers → resolved: set the row `Đã giải quyết — <YYYY-MM-DD>`, regenerate the service function, generate the deferred specs; answer says bug / chưa deploy: keep the TC's triage verdict `Cần điều kiện` with that exact reason and STILL set the row `Đã giải quyết — <YYYY-MM-DD>` with the note (`— bug, chờ fix` / `— chưa deploy`). `qc-execute-test-report` gates on every row reaching `Đã giải quyết` — never leave an answered row unmarked.
3. Resume check per the shared protocol; worklog `Running (Phase 1)`.

## Phase 1 — Apply the relevant trigger (incremental)

Touch only what changed: regenerate stale services (B/D); update changed resource specs (A); delete the baseline entries of UPDATED/DELETED/renamed TCs (A); generate previously deferred specs (D); append data variables (A); re-compile JSON (A/C). Reuse everything up-to-date. An endpoint removed from the doc/system but still demanded by a TC → `api-findings` row for the user/BE to answer — do NOT silently delete tests (the TC documents expected behavior; a confirmed removal is a requirements discrepancy to surface via re-audit).

## Phase 2 — Bump + report

Data md edited in place (append only; QC-filled values untouched). Services/specs restamped with the new source versions. Triage file → `v<N+1>` when verdicts changed. Re-run the `request-mapping-rules.md` §9 self-check. Worklog `Done`; cleanup per shared protocol. Vietnamese chat summary: services regenerated vs reused, specs updated/added (incl. deferred now generated), baseline entries deleted (TC UPDATED/DELETED/đổi ID — sẽ re-record ở lần chạy sau), data variables added, api-findings rows resolved vs still awaiting reply, build validation result.
