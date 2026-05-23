---
name: qc-ui-extract
description: Extracts a lean, automation-ready UI element list (one file per page) from the highest-version audited UC review report. Output is the canonical input for `page-inspection` which later resolves real Playwright locators against a live URL. Trigger when the user says `extract ui`, `trích xuất ui`, `liệt kê element`, `/qc-ui-extract <UC-ID>`, or is auto-suggested by `qc-uc-read` when verdict = Ready. Does NOT duplicate behavior / interaction matrix — that information lives in audited §5 and test cases.
---

# Skill: qc-ui-extract

Bridges the gap between a finalized (Ready) audited UC review report and the automation pipeline. Reads §4 (UI Object Inventory & Mapping) of the highest-version audited file, produces ONE lean `ui-elements` file per page so that `page-inspection` can later attach real Playwright locators against a live URL.

## Input Contract

Read `path-registry.md` to resolve every logical name below:

- `uc-review-report` — **highest `v<N>` of the audited file** for the target UC-ID. HARD REQUIREMENT. If verdict = `Not Ready` the skill still runs but emits a warning that the element list will be drafty (may change after BA answers).
- `project-context-master` — optional. Used only when audited §4 references a page name that needs cross-check with site map.
- `qc-dashboard` — for precheck (Case A/B/C) and for writing column `UI extract stt`.
- `.claude/skills/qc-site-map/inbox/dashboard-orphans.md` — for Case B precheck.
- `.claude/rules/global-rules.md`, `.claude/rules/naming-convention.md` — language, naming, header rules.

Important: always pick the highest `v<N>` audited file by scanning the UC folder, NOT by date.

## Output Contract

Read `path-registry.md` to resolve:

- `ui-elements` — one file per page, lean fields only. Path: `docs/QC/ui-elements/<UC-ID>/<UC-ID>_<page-name>_ui-elements_<YYYYMMDD>_v<N>.md`.
- `qc-dashboard` column `UI extract stt` — format `v<N> (audited v<M>)`. If multiple pages exist for one UC, store the **minimum** version across pages (so the row reflects the least-recently-updated page) and append count: `v<min> (audited v<M>) [Np pages]`.

Versioning rules:

- If no prior `ui-elements` file for this page → `v1`.
- If prior file exists AND maps to same audited `v<M>` → no-op unless user explicitly requested re-extract; if re-extract, bump to `v<N+1>`.
- If prior file exists AND audited has bumped (new `v<M+1>` or higher) → bump to `v<N+1>`, update mapping. Mark previous version as superseded only in dashboard; do NOT delete or edit the previous file.
- NEVER overwrite. NEVER edit a prior version in place.

## Checkpoint & Resume

This skill writes per-page checkpoints to `.claude/skills/qc-ui-extract/process-logging/<UC-ID>/progress.md` so that a context-limit / interruption mid-run does NOT force re-extracting completed pages.

`progress.md` schema:

```yaml
uc_id: UC-VOB-001
audited_source: UC-VOB-001_submit-vendor-registration_audited_20260507_v3.md
audited_version: v3
total_pages: 2
pages:
  - name: step1-basic
    status: done            # pending | in-progress | done
    output: UC-VOB-001_step1-basic_ui-elements_20260522_v1.md
    elements_done: 19
    elements_total: 19
    last_row_idx: 19        # audited §4 row index of last extracted element
  - name: step2-upload
    status: in-progress
    output: null
    elements_done: 7
    elements_total: 14
    last_row_idx: 26
    partial_path: .claude/skills/qc-ui-extract/process-logging/UC-VOB-001/step2-upload.partial.md
run_id: 2026-05-22T10:15:33Z
```

Within a page, batch when `elements_total > 30`: process in chunks of 20, append to `<page>.partial.md`, update `elements_done` + `last_row_idx` after each chunk. On resume, read `progress.md`, continue from `last_row_idx + 1` of the in-progress page.

## Workflow

### Phase 0 — Routing + Resume + Dashboard Precheck

1. **Identify UC-ID** from the user's prompt or filename.
2. **Locate highest-version audited file** under `docs/QC/uc-read/<UC-ID>/`. If none → STOP with `❌ Không tìm thấy audited file cho <UC-ID>. Hãy chạy /qc-uc-read trước.`.
3. **Read audited verdict** from the Readiness Verdict section.
   - `Ready` → proceed normally.
   - `Not Ready` → emit warning `⚠️ Audited verdict = Not Ready. Element list có thể thay đổi sau khi BA trả lời open questions. Tiếp tục? (y/n)` and only proceed on `y`.
4. **Resume detection** — check `.claude/skills/qc-ui-extract/process-logging/<UC-ID>/progress.md`.
   - **Found AND `audited_version` matches current highest v** → ask `Continue from page <next-in-progress>?` or `Restart fresh?`.
   - **Found AND `audited_version` is stale** (audited has bumped since last run) → warn `Audited has bumped from <old> → <new>. Restart recommended.`; default = Restart.
   - **Not found** → fresh run.
5. **Dashboard precheck** — follow the Case A/B/C contract per `qc-dashboard-sync` SKILL.md (same pattern as `qc-uc-read` Phase 0 step 4). Resolve `qc-dashboard.md` by UC-ID, branch on:
   - **Case A** (UC not in dashboard) → offer `site-map first` / `continue`. On `continue`, invoke `qc-dashboard-sync` bottom-up.
   - **Case B** (UC in dashboard BUT in dashboard-orphans.md) → offer `site-map first` / `continue`.
   - **Case C** → proceed silently.
6. **Generate `run_id`** and append a worklog JSONL entry (`status = "Running (Phase 1)"`) per `docs/qc-lead/agent-work-log.local/README.md`.

### Phase 1 — Page Boundary Detection

> One file per page. A UC = 1 page in most cases (single URL/route). Wizard UCs may span ≥ 2 pages.

1. **Parse audited §4 table** into rows.
2. **Group rows into pages** using these signals (ordered, first hit wins):
   - Explicit URL / Route mentioned in audited §1 or §6 → use that count.
   - Wizard step transitions in audited §6 (e.g., "navigate Step 2") → each post-navigation surface = separate page.
   - `Screen / Section` column groupings that share a common page prefix (e.g., `Header / Top bar`, `Body / Step indicator`, `Body / Form group` all belong to ONE form page).
3. **Propose page list to user** with element counts:

   ```
   Audited <UC-ID> v<M> có 19 elements, đề xuất chia thành các page sau:
     1. step1-basic   — 19 elements (rows 1-19)

   Xác nhận / chỉnh sửa tên page / merge / split? (mặc định: chấp nhận)
   ```

   - Page-name format: lowercase-kebab-case, max 4 words. If user does not override, derive from the feature-name in audited filename (drop UC-ID prefix). For multi-page wizards, append a discriminator (`-step1`, `-step2`).
4. **Skip declared-out-of-scope rows.** If a row in §4 has `test scope = visibility-only per Q15` or similar markers, KEEP it in the list (page-inspection still needs the locator), but record `Out of scope?` = `visibility-only` so test-script-design knows not to write interaction assertions.
5. **Write `progress.md`** with the confirmed page list, `status = pending` for all pages.

### Phase 2 — Per-Page Element Extraction

For each page in `progress.md` (in order):

1. **Mark page `status = in-progress`** in progress.md.
2. **Extract elements** from audited §4 rows belonging to this page. Map to the Lean field set (see Output Template below). Field-by-field rules:
   - **Element name**: copy verbatim from audited §4 `Label (verbatim)`. Preserve quotes. Multi-language labels (Korean/Japanese/etc.) MUST stay in original; append `(English: ...)` in parentheses if and only if the audited file does the same.
   - **Type**: copy from audited §4 `Type` column. Normalize trailing parentheticals like `(Q13 — same control type as #9)` → strip the audit-clarification suffix; keep the bare type.
   - **Required**: copy from `Required` column. Normalize `N/A` (visual-only elements like logos, headers) AS-IS.
   - **Default**: copy from `Default`. Empty → `(empty)`.
   - **Placeholder**: copy from `Placeholder`. Empty → `—`.
   - **Enum**: copy from `Enum values`. `N/A` → `—`.
   - **Visible when**: derive from `Description / Constraint`. Look for visibility phrasing like "Visible only when X", "Hidden when Y", "Always visible". If no condition stated → `always`. Be conservative — do NOT invent conditions.
   - **Audited §4 ref**: literal back-reference `§4 #<row-number>`.
   - **Out of scope?**: `visibility-only` if audited marks the row as design-pending / Q15-style; otherwise blank.
   - **Locator**: ALWAYS write `TBD` in this skill's output. `page-inspection` is the only skill that fills this column.
3. **Batch checkpoint** (when page > 30 elements): after every 20 elements, append rows to `<page>.partial.md`, update `elements_done` + `last_row_idx` in `progress.md`.
4. **Finalize page**: when all rows for the page are extracted, write the final `<UC-ID>_<page-name>_ui-elements_<YYYYMMDD>_v<N>.md` using the template below. Delete the `.partial.md`. Set page `status = done`, record `output` filename.
5. **Append a worklog phase-boundary entry** at the end of each page (`status = "Running (Phase 2 — page <N>/<total> done)"`).

### Phase 3 — Finalize + Dashboard + Cleanup

1. Verify every page has `status = done`.
2. **Update `qc-dashboard.md`** column `UI extract stt` for the UC's row:
   - Locate row by Use Case ID.
   - Cell value: `v<min-N> (audited v<M>)`. If `total_pages > 1`, append ` [<total_pages>p]`. Examples: `v1 (audited v3)` for single page; `v2 (audited v3) [2p]` for two pages min-version v2.
   - **Stale handling**: NOT this skill's job to mark stale. Stale is computed lazily by readers (compare cell `audited v<M>` against the actual highest audited v).
   - If column `UI extract stt` is missing from the dashboard (legacy dashboards), warn ONCE in the user output and skip the write — do NOT inject the column.
3. **Worklog final entry** — close the run with `status = "Completed"`, `output = <list of generated ui-elements files>`.
4. **Cleanup checkpoint**: delete `progress.md` (and any leftover `.partial.md`) on success. On failure, leave them intact for next-run resume.
5. **Print summary**:

   ```
   ✅ qc-ui-extract done — <UC-ID>
   Audited source: <filename> (v<M>)
   Pages: <N>
     - <page-name>: v<N> · <count> elements · <output-path>
   Dashboard UI extract stt: v<min> (audited v<M>) [<N>p]
   Next: chạy /page-inspection <page-name> <URL> để gán locator thật.
   ```

## Output Template

```markdown
---
UC ID: <UC-ID>
Page name: <page-name>
Source audited: <audited filename>
Source audited version: v<M>
Generated: <YYYY-MM-DD>
Generated by: qc-ui-extract
Version: v<N>
Total elements: <count>
---

# UI Elements — <UC-ID> · <page-name>

> **Purpose**: canonical input for `/page-inspection`. Lists every UI element on this page with identification fields only.
> **What's NOT here**: interaction matrix, state machine, assertion behavior. Those live in audited §5 + test cases.
> **Locator column**: filled by `/page-inspection` against a live URL — leave as `TBD` here.

## Page Context

- **URL / Route**: TBD — set by `/page-inspection` on first scan.
- **Audited source**: `<audited filename>`
- **Audited §4 row range**: `<first>-<last>`
- **Audited version mapped**: v<M>

## Element list

| # | Element name | Type | Required | Default | Placeholder | Enum | Visible when | Out of scope? | Audited §4 ref | Locator |
|---|--------------|------|----------|---------|-------------|------|--------------|---------------|----------------|---------|
| 1 | "MultiVendor Platform" Logo | Brand / Logo | N/A | — | — | — | always | visibility-only | §4 #1 | TBD |
| 2 | "Help" link | Navigation Link | N/A | — | — | — | always |  | §4 #2 | TBD |
<!-- … repeat per element … -->

## Cross-references

- Audited §4 source rows: <UC-ID> v<M> rows <range>.
- Audited §5 (behavior / state) — NOT copied. Read directly from audited when writing assertions.
- Test cases — see `func-test-cases` for `<UC-ID>` when interpreting expected behavior.
```

## Decision rules

- **Never copy interaction / behavior into this file.** That information has TWO authoritative sources: audited §5 (per-element state machine) and `func-test-cases` (per-scenario steps). Duplicating creates a third drift point and re-derives test-case content. The Lean list is identification-only.
- **Never invent fields not in audited.** If audited §4 lacks `Placeholder`, write `—`. Do not guess from screenshots, wireframes, or related UCs.
- **Locator is always TBD.** This skill produces a name list. Resolving real locators against the DOM is `page-inspection`'s job — even if a stable testid is mentioned in audited §4 Description, do not promote it to the Locator column here. (Optional improvement: append it to a `Notes` cell if added later, but never to `Locator`.)
- **Multi-language labels**: preserve original. Do not translate inside the table.
- **`visibility-only` rows still get a locator request.** Even when audited marks design as pending, page-inspection still needs to locate the element to assert visibility. Keep the row.
- **Stale detection is read-time, not write-time.** Do not modify older `ui-elements` files when audited bumps. Just update the dashboard cell on the next extract run.

## Interaction with other skills

- **Input from**: `qc-uc-read` (audited Section 4) — auto-suggested when audited verdict = `Ready`.
- **Consumed by**: `page-inspection` (looks up element names → fills Locator column in its own catalog file — does NOT modify this file).
- **Re-trigger**: when audited bumps to a new `v<M+1>`, or when a tester reports a missing element name during script writing.
- **Does NOT** consume from: `func-test-scenarios`, `func-test-cases`, `qc-site-map` (they describe behavior / flow, not page-level element inventory).

## Boundaries

- Read-only on audited files. Never modify the source UC review report.
- Never write to columns other than `UI extract stt` in qc-dashboard.
- Never call `page-inspection` directly. Suggest it in the final summary; the user invokes it explicitly with a real URL.
- If audited §4 is empty or malformed → STOP with a clear error message; do not fabricate elements.
