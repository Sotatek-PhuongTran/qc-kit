# qc-func-auto-generate — Update workflow

> Title: Auto-generate Update Workflow | Created: 2026-07-02 | Updated: 2026-07-03 (trigger D — crawl-findings answers) | Author: Claude (QC Kit v3 rebuild) | Version: v2
>
> Mode: **Update** — specs already exist for the UC. Regenerate ONLY what changed.

## Phase 0 — Identify + trigger + worklog

1. Resolve `<UC-ID>` + portal; locate existing specs / data / page objects. None found → switch to `generate.md`.
2. Determine trigger(s) — default: detect all:
   - **A — Test cases changed** (newer `func-test-cases-md` version — `*_testcases_*_v*.md`, highest version): diff TCs → update the affected screen specs only; append new data variables (with seeds) WITHOUT overwriting user-entered values.
   - **B — UI changed / locators drift** (newer audited version with §4 changes, OR a run reported locator failures): re-crawl the affected page(s) — full interaction inventory per `mapping-rules.md` §0 — and regenerate those **page objects** only; re-learn the portal's `notification-channels.ts` idioms if message lookups failed. Specs are unchanged (they call page-object methods / detectors).
   - **C — Data md changed:** only re-compile the JSON (`node scripts/build-test-data.mjs <UC-ID>`).
   - **D — Crawl-findings answered** (rows `Đã trả lời` in `crawl-findings/<portal>_<page>_crawl-findings.md`): re-crawl exactly those elements guided by the inline answers → resolved: mark the row `Đã giải quyết`, regenerate the page object, and generate the specs that were deferred pending those elements; answer says bug / not deployed: update the TC's triage verdict with that exact reason. EITHER branch ends with the row's Trạng thái set to `Đã giải quyết — <YYYY-MM-DD>` (bug/not-deployed rows get the note `— bug, chờ fix` / `— chưa deploy` next to it instead of a locator change) — `qc-execute-test-report` gates on every row of the UC's pages reaching `Đã giải quyết`, so never leave an answered row unmarked.
3. Resume check per the shared checkpoint protocol; worklog `Running (Phase 1)`.

## Phase 1 — Apply the relevant trigger (incremental)

Touch only what changed: regenerate stale page objects (B/D — crawl per `dom-channels.md` + `locator-strategy.md`); update changed screen specs (A — per `mapping-rules.md`); generate previously deferred specs (D); append data variables (A); re-compile JSON (A/C). Reuse everything up-to-date. An element removed from the live UI but still referenced by a TC → record it in the page's `crawl-findings` file (mapping-rules §0) for the user to answer inline; do NOT silently delete tests — the test documents expected behavior and a confirmed removal is a requirements/UI discrepancy to surface.

## Phase 2 — Bump + report

Data md is a LIVING file — edit `data/<UC-ID>_testdata.md` in place (append new variables/preconditions; NEVER overwrite QC-filled values; history = git). Specs and page objects are in-place code files restamped with the new source version. Update the triage file to a new version (`v<N+1>`) when verdicts changed. Re-run the §10 self-check. Worklog `Done`; cleanup per shared protocol. Print the Vietnamese change summary: page objects regenerated vs reused, screen specs updated/added (incl. previously deferred specs now generated), data variables added, crawl-findings rows resolved vs still awaiting reply, validation result.
