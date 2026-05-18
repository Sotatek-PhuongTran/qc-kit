---
name: qc-dashboard-sync
description: Owner of qc-dashboard.md. Step 3 of the top-down chain qc-context-master -> qc-site-map -> qc-dashboard-sync. Operates in TWO modes. (1) Top-down — triggered by /qc-dashboard-sync or auto-invoked by qc-site-map. Requires project-context-master.md AND site-map-handoff.md to exist as upstream evidence. Surfaces the gap report already produced by qc-site-map (no duplicate conflict-check), then syncs the feature list from site-map-handoff into qc-dashboard.md and scans the existence/version of 6 artifact types (Specs, WF, Audited, Scenario, TC md, TC xlsx) into a single Files stt column. (2) Bottom-up — auto-invoked by per-UC skills (qc-uc-read, qc-func-scenario-design, qc-func-tc-design) for a single UC ID. Adds a row with In scope? = Need confirm and warns the user that the UC is not present in the current site-map/project-context and asks them to re-run the top-down chain. Does NOT write the process-state columns UC review stt, Scenario design stt, TC design stt — those are owned by the respective review/design skills.
---

# QC Dashboard Sync Skill

## Two operating modes

This skill operates in two modes that are mutually exclusive within a single run:

| Mode | Triggered by | Scope | Gap review | Prerequisite |
|---|---|---|---|---|
| **Top-down** | `/qc-dashboard-sync` (manual) OR auto-invoked by `qc-site-map` | Full feature list + 6-artifact scan for every UC | YES — surfaces site-map's gap tables (Feature-level gaps, Unmapped screens, Dashboard recommendation) and asks user proceed/cancel | `project-context-master.md` AND `.claude/skills/qc-dashboard-sync/inbox/site-map-handoff.md` must both exist |
| **Bottom-up** | Auto-invoked by per-UC skills (`qc-uc-read`, `qc-func-scenario-design`, `qc-func-tc-design`) with a specific UC ID | Single UC: add row with `Need confirm` + run the 6-artifact scan for that UC only | NO | None — runs even if upstream context is missing, but warns the user |

The caller indicates the mode implicitly:
- No UC ID passed → top-down.
- A UC ID passed (`uc_id=<ID>`) → bottom-up for that single ID.

## Trigger Conditions

- **Manual top-down:** `/qc-dashboard-sync`, "sync dashboard", "đồng bộ dashboard", "update dashboard status".
- **Auto-trigger top-down from `qc-site-map`** — at the end of its Phase 9, after writing `site-map-handoff.md`, in Initialization mode (or Update mode when the user accepts the prompt).
- **Auto-trigger bottom-up from per-UC skills** (`qc-uc-read`, `qc-func-scenario-design`, `qc-func-tc-design`) — when the skill operates on a UC ID that is NOT yet a row in the dashboard, it MUST invoke this skill in bottom-up mode BEFORE proceeding so the dashboard always reflects on-disk reality.

`qc-context-master` no longer triggers this skill. The dashboard receives its feature list exclusively via `qc-site-map`'s `site-map-handoff.md`.

## Top-down prerequisites

In top-down mode this skill requires BOTH upstream artifacts to exist:

1. `project-context-master.md` resolved via `path-registry.md`.
2. `.claude/skills/qc-dashboard-sync/inbox/site-map-handoff.md` written by `qc-site-map`.

If either is missing → STOP with the Vietnamese message:

```text
Khong du dieu kien chay top-down sync:
- project-context-master.md: <found | MISSING>
- site-map-handoff.md (tu qc-site-map): <found | MISSING>

Hay chay chuoi theo thu tu: /qc-context-master -> /qc-site-map -> /qc-dashboard-sync.
```

Do not fall through to bottom-up mode automatically — bottom-up is triggered only by per-UC skills with an explicit UC ID.

## Inputs

Resolve via `path-registry.md`:

| Logical name | Role | Used for |
|---|---|---|
| `qc-dashboard` | Dashboard markdown file. Created from template if missing. | Read/write target. |
| `project-context-master` | Project baseline. | **Top-down mode only** — existence check only (evidence that the chain ran in order: qc-context-master → qc-site-map → here). Content is NOT parsed for a competing feature list; the canonical feature list comes from `site-map-handoff.md`. |
| `requirement-files` | Parent folder; per-`<ID>` sub-folders. | Specs + WF scans. |
| `uc-review-report` | Parent folder; per-`<ID>` sub-folders. | Audited scan. |
| `func-test-scenarios` | Parent folder; per-`<ID>` sub-folders. | Scenario scan. |
| `func-test-cases-draft` | Parent folder; per-`<ID>` sub-folders. | TC md scan. |
| `func-test-cases` | Parent folder; per-`<ID>` sub-folders. | TC xlsx scan. |
| `requirement-common-files` | — | **Exclusion path** during orphan scan (its folder is not a UC). |

### Top-down handoff input (from `qc-site-map`)

- **Handoff file** at `.claude/skills/qc-dashboard-sync/inbox/site-map-handoff.md`. REQUIRED in top-down mode. Schema (written by `qc-site-map` Phase 9):

  ```markdown
  ---
  source_skill: qc-site-map
  handoff_type: site-map-feature-coverage
  mode: initialization | update
  generated_at: <ISO-8601 datetime>
  ---

  # Site Map Handoff for Dashboard

  ## Feature-level site map coverage
  | Feature ID | Feature name | Site / Portal | Module | Mapped screen(s) | Site map status | Notes |
  ...

  ## Feature-level gaps
  ## Unmapped screens
  ## Dashboard update recommendation
  ```

  This skill READS the file but does NOT delete it. Lifecycle is owned by `qc-site-map` (which overwrites it on its next run). Only the `Feature-level site map coverage` table provides the canonical feature list — the other tables (`Feature-level gaps`, `Unmapped screens`, `Dashboard update recommendation`) are surfaced to the user in Phase 0.5.

### Bottom-up input (from per-UC skills)

- Single `uc_id` parameter (e.g., `UC-100`). No handoff file. Pure disk scan of that specific UC's folders.

### Template

- `templates/qc-dashboard-template.md` — used to bootstrap the dashboard when it does not exist.

## Schema (10 columns)

| # | Column | Owner | Type |
|---|---|---|---|
| 1 | `Site` | `qc-dashboard-sync` | metadata |
| 2 | `<ID label>` | `qc-dashboard-sync` | metadata |
| 3 | `Module` | `qc-dashboard-sync` | metadata |
| 4 | `Feature/Use case name` | `qc-dashboard-sync` | metadata |
| 5 | `In scope?` | `qc-dashboard-sync` | metadata |
| 6 | `Files stt` | `qc-dashboard-sync` | **file existence** (consolidated 6 file types) |
| 7 | `UC review stt` | `qc-uc-read` | process state — preserved verbatim |
| 8 | `Scenario design stt` | `qc-func-scenario-design` | process state — preserved verbatim |
| 9 | `TC design stt` | `qc-func-tc-design` | process state — preserved verbatim |
| 10 | `Execute stt` | — (pending) | placeholder — preserved verbatim |

## Outputs

- **`qc-dashboard`** — this skill is the **sole owner of the file** (creates + structures it). Writes columns **1, 2, 3, 4, 5, 6**. Preserves columns **7, 8, 9, 10** verbatim.
- Console report: new rows, removed rows, Files-stt updates, summary.
- `agent-work-log` — append a run row per `global-rules.md`.

## `Files stt` cell format

Single-cell, 6 lines joined by `<br>`. One line per artifact type, in this fixed order:

```
Specs: V<N> | Missing
WF: V<N> | Missing
Audited: V<N> | Missing
Scenario: V<N> | Missing
TC md: V<N> | Missing
TC xlsx: V<N> | Missing
```

Rendered example (one cell):
```
Specs: V2<br>WF: V1<br>Audited: Missing<br>Scenario: V1<br>TC md: V2<br>TC xlsx: Missing
```

Use literal string `Missing` when the file is absent. Use `V<N>` (capital V) where `<N>` is the highest version detected.

## Workflow

The workflow below is the **top-down workflow** (Phases 0 → 0.5 → 0.6 → 1 → 2 → 3 → 4 → 5 → 6). For bottom-up, see the dedicated section after Phase 6.

### Phase 0 — Mode detection, prerequisites & input parse

This phase is purely read-only. No dashboard file is created or modified here; that happens in Phase 0.6 after the user reviews the gap report.

1. Generate a new `run_id` (read `agent-work-log` for max ID, increment). Append a row with `Status = Running (Phase 0)`, Input/Output empty.
2. **Mode detection:**
   - Caller passed `uc_id=<ID>` → switch to bottom-up workflow (see section "Bottom-up workflow"). Skip the rest of Phase 0 in this top-down workflow.
   - Otherwise → top-down.
3. **Top-down prerequisite check:**
   - Resolve `project-context-master` path from `path-registry.md`. Verify the file EXISTS with real content. (Content is not parsed here — its presence is only required as evidence that the top-down chain ran in order. The canonical feature list comes from the site-map handoff.)
   - Verify `.claude/skills/qc-dashboard-sync/inbox/site-map-handoff.md` exists.
   - If either is missing → STOP with the Vietnamese message defined in "Top-down prerequisites" above. Do not fall through to bottom-up.
4. **Parse the site-map handoff file.**
   - Parse the `Feature-level site map coverage` table into `handoffList = Map<ID → { Site, Module, Name, MappedScreens, SiteMapStatus, Notes }>`. The `Feature ID` column maps to ID; `Feature name` to Name; `Site / Portal` to Site; `Module` to Module.
   - Treat `Site map status = Mapped | Partial` as `In scope? = Yes`, `Missing | Conflict | Need confirm` as `In scope? = Need confirm`. Final In-scope value will be confirmed in Phase 4.
   - Parse the `Feature-level gaps`, `Unmapped screens`, and `Dashboard update recommendation` tables — keep them as `siteMapGaps`, `unmappedScreens`, `dashboardRecommendations` for Phase 0.5.
5. Resolve `qc-dashboard` path from `path-registry.md`. **Do NOT create or write the file yet.**
   - If the dashboard file EXISTS: parse it now (header → `existingLabel`; data rows → `featureIndex`; notes block captured verbatim). Run schema validation (10 columns in the canonical order). If mismatch → STOP and report. Do NOT auto-fix.
   - If the dashboard file does NOT exist: skip parsing. `featureIndex` is empty. The `<ID label>` will be determined in Phase 0.6 from the handoff and a user prompt.
6. **Detect ID label mismatch** (only when dashboard already exists):
   - Compute `handoffDominantPrefix` by scanning the `Feature ID` column of `handoffList` — pick the most common prefix among `UC`, `F`, `FEAT`, `STORY`, `S`. Map it to `expectedLabel` (`UC` → `Use Case ID`, `F`/`FEAT` → `Feature ID`, `S`/`STORY` → `Story ID`).
   - Compare `existingLabel` against `expectedLabel`.
   - If they differ → set `labelMigrationNeeded = true` and remember `(existingLabel, expectedLabel)` for Phase 0.6 + Phase 5.
   - Rationale: top-down is the canonical source. If the dashboard was originally bootstrapped by bottom-up with default `Use Case ID` but the handoff uses `F-` IDs, the top-down label wins.

Update worklog: `Status = Phase 0 done`.

### Phase 0.5 — Site-map gap review (top-down only)

`qc-site-map` already performs the upstream consistency analysis (site-map content vs `project-context-master.md`) when it builds its handoff. The gap report and unmapped screens are surfaced verbatim from the handoff — this skill does NOT redo the comparison.

1. Read the three secondary tables captured in Phase 0 step 4: `siteMapGaps`, `unmappedScreens`, `dashboardRecommendations`.
2. If ALL three are empty → skip the prompt, jump to Phase 0.6.
3. Otherwise, present a consolidated report and ask the user to proceed or cancel:

   ```text
   📋 Bao cao tu site-map-handoff.md (do qc-site-map tao):

   **Feature-level gaps (<N> mục):**
   | Feature ID | Feature name | Gap | Impact to QC | Owner | Priority |
   |---|---|---|---|---|---|
   | ... | ... | No mapped screen / unclear navigation / role access missing / source conflict | ... | QC Lead / BA / Tech Lead | High / Medium / Low |

   **Unmapped screens (<N> mục):** (screens chưa map được vào feature nào — sẽ KHÔNG tạo dashboard row)
   | Screen ID | Screen / Page | Why unmapped | Suggested action |
   |---|---|---|---|
   | ... | ... | ... | ... |

   **Dashboard update recommendation (<N> mục):**
   | Feature ID | Recommended note/status | Reason |
   |---|---|---|
   | ... | Site map: Ready / Partial / Missing / Conflict | ... |

   👉 Lua chon:
   - `proceed` — chay sync voi du lieu hien tai. Cac gap nay duoc bao luu trong site-map-handoff.md va qc-site-map.md de QC Lead theo doi rieng; dashboard.md chi giu feature list va Files stt.
   - `cancel` — dung sync. Xem xet sua tai lieu upstream (chay /qc-context-master hoac /qc-site-map) roi chay lai /qc-dashboard-sync.
   ```

4. User answers `cancel` → STOP. Worklog: `Status = Cancelled (Phase 0.5 gap review)`. **No dashboard file was created or modified in Phase 0**, so nothing to roll back.
5. User answers `proceed` → continue to Phase 0.6. The dashboard schema does NOT have a Notes column; gap data is informational at this prompt only.

Update worklog: `Status = Phase 0.5 done`.

### Phase 0.6 — Bootstrap or relabel dashboard

Only executed AFTER Phase 0.5 user proceeds. Splitting this out of Phase 0 ensures a cancelled run never leaves an empty dashboard on disk.

Two sub-cases:

**A. Dashboard MISSING — bootstrap:**

1. Read `templates/qc-dashboard-template.md`.
2. Determine the `<ID label>`: use `expectedLabel` derived from handoff dominant prefix (computed in Phase 0 step 6). Confirm with the user: `"Ten cot dinh danh trong dashboard nen la gi? (mac dinh: <expectedLabel>. Goi y khac: Use Case ID / Feature ID / Story ID)"`. Accept user's override.
3. Replace placeholder `{{ID_LABEL}}` in the template (header + notes section) with the chosen label.
4. Write the populated template to the resolved `qc-dashboard` path. The body table is empty at this point.
5. Re-parse the freshly written dashboard so `featureIndex` is initialized (empty map) and `<ID label>` is captured verbatim for write-back. Run schema validation.

**B. Dashboard EXISTS with `labelMigrationNeeded == true` — relabel:**

1. Do NOT prompt the user. Top-down is canonical: silently migrate.
2. In-memory only (the actual write happens in Phase 5):
   - Set `<ID label>` to `expectedLabel`.
   - Append a migration note to be inserted into the ghi-chú block in Phase 5:

     ```text
     > **<YYYY-MM-DD> — ID label migration**: dashboard duoc re-label tu `<existingLabel>` sang `<expectedLabel>` do site-map-handoff dung prefix `<handoffDominantPrefix>` lam canonical. Cac row pre-existing co ID o dang cu duoc giu nguyen (khong auto-rename). Neu can map sang ID prefix moi, QC Lead vui long doi chieu manual voi qc-site-map.md hoac project-context-master.md. Co the ghi tracking note dang `(orig: <old-ID>)` ngay sau cot `Feature/Use case name` cua row tuong ung.
     ```
3. `featureIndex` (parsed in Phase 0 step 5) is kept as-is; existing rows retain their original ID values in column 2. Phase 1 disk scan + Phase 2 reconcile will still pick up new handoff rows correctly using the handoff's own IDs.

**C. Dashboard EXISTS with `labelMigrationNeeded == false`:** skip Phase 0.6 entirely.

Update worklog: `Status = Phase 0.6 done`.

### Phase 1 — Disk Scan (collect observed IDs)

1. Resolve the parent folders (portion before `<UC-ID>`) of these 5 path-registry logical names — these are the on-disk sources for orphan detection:
   - `requirement-files` (covers Specs + WF)
   - `uc-review-report` (covers Audited)
   - `func-test-scenarios` (covers Scenario)
   - `func-test-cases-draft` (covers TC md)
   - `func-test-cases` (covers TC xlsx; skip if same parent as `func-test-cases-draft`)
   For each existing parent folder, list immediate sub-folder names.

2. **Exclude + extract ID from each sub-folder name.** Different sources may name the same UC differently — e.g., BA uses compound names like `UC1_TrangChuDashboard`, `UC258_UC259_ThongBaoHeThong`, while QC uses bare IDs like `UC1`, `UC258_UC259`. The skill MUST extract a canonical ID from each folder name and map disparate folders to the same row. For each sub-folder name `<folderName>`:
   - **Exclude** the folder if it satisfies ANY of:
     - Equals the basename (or any path segment) of the `requirement-common-files` resolved path.
     - Starts with `Common`, `Shared`, `_template`, `Old`, `Archive`, `_`, `.` (case-insensitive).
   - **Extract ID prefix** — apply the regex derived from the `<ID label>` to the START of `<folderName>` and take **capture group 1**. The regex is greedy on the ID portion and stops at the first segment that is not an ID continuation (i.e., the first segment that starts with a non-digit / non-`UC`-prefixed letter):
     - Default (`Use Case ID`): `^(UC\d+(?:[-_](?:UC)?\d+)*)`
       - Examples: `UC1_TrangChuDashboard` → `UC1` · `UC42-44_QuanLyDatLich` → `UC42-44` · `UC53_63-65_PhanAnhKienNghi` → `UC53_63-65` · `UC258_UC259_ThongBaoHeThong` → `UC258_UC259` · `UC56-57_66_68_TinTuc` → `UC56-57_66_68` · `UC1` → `UC1`.
     - Feature ID: `^(F(?:EAT)?[\-_]?\d+(?:[-_]\d+)*)`
     - Story ID: `^(S(?:TORY)?[\-_]?\d+(?:[-_]\d+)*)`
     - Otherwise: ask the user during Phase 0 to confirm an ID-extraction regex (must contain exactly one capture group); store as one-shot for this run.
   - If the regex does NOT match → skip the folder (treat as non-UC).
   - If it matches → record the mapping in `sourceFolderMap[<sourceArtifact>][<extractedID>] = <full folder path>`. `<sourceArtifact>` is one of `requirement-files | uc-review-report | func-test-scenarios | func-test-cases-draft | func-test-cases`. The same `<extractedID>` may legitimately resolve to different folder paths across sources (e.g., `requirement-files/UC1_TrangChuDashboard/` and `uc-review-report/UC1/` both map to ID `UC1`).
   - If two folders within the SAME source extract to the same ID → warn in the run report and pick the first encountered (lexicographic order); user must resolve manually.

3. Build `observedIDs = Set<ID>` deduplicated as the union of `<extractedID>` keys across all 5 source maps.

Update worklog: `Status = Phase 1 done`.

### Phase 2 — Reconcile Buckets

Classify every ID in `featureIndex.keys() ∪ observedIDs ∪ handoffList.keys()` into one bucket:

| Bucket | Condition | Action |
|---|---|---|
| **MATCH-IN-SCOPE** | ID ∈ featureIndex AND ID ∈ observedIDs AND `In scope? ≠ Removed`. | Enter Phase 3 → compute new `Files stt`. May surface a transition (Existed → Missing) → bucket **DOC-DISAPPEARED**. |
| **NEW-ORPHAN** | ID ∉ featureIndex AND ID ∈ observedIDs. | **Create a new row.** Fill cols 1/3/4 from `handoffList[ID]` if present, else **blank**. `In scope? = Need confirm`. Run Phase 3. Add to **confirmation queue** (Type A — new orphan). |
| **HANDOFF-ONLY** | ID ∈ handoffList AND ID ∉ featureIndex AND ID ∉ observedIDs. | **Create a new row** from handoff values. `Files stt` = all 6 lines as `Missing`. `In scope?` = handoff value if provided; else `Need confirm`. No confirmation prompt unless `In scope? = Need confirm`. |
| **REMOVED-STILL-GONE** | ID ∈ featureIndex with `In scope? = Removed` AND ID ∉ observedIDs. | **Skip entirely** — no scan, no update. `Files stt` frozen as last known. |
| **REMOVED-REAPPEARED** | ID ∈ featureIndex with `In scope? = Removed` AND ID ∈ observedIDs. | Set `In scope? = Need confirm`. `Files stt` frozen (no scan until user confirms). Add to **confirmation queue** (Type B — folder reappeared). |
| **DASHBOARD-ONLY** | ID ∈ featureIndex with `In scope? ≠ Removed` AND ID ∉ observedIDs. | Enter Phase 3 — all 6 file types will resolve to `Missing`. If the previous `Files stt` had ANY `V<N>` entry (= folder used to have content) → this is a folder-deletion → bucket **DOC-DISAPPEARED**. Else just record all-Missing (no `In scope?` change). |
| **DOC-DISAPPEARED** | Detected during Phase 3 — at least one item in `Files stt` flipped from `V<N>` → `Missing`. | Set `In scope? = Removed` (pending). Add to **confirmation queue** (Type C — doc disappeared). |

> Rows where the user does NOT answer in Phase 4 keep `Need confirm` / `Removed` written into the dashboard. User can edit manually later. Re-running the skill will surface them again only if folder state changes.

Update worklog: `Status = Phase 2 done`.

### Phase 3 — `Files stt` Computation + Transition Detection

Skip rows in buckets `REMOVED-STILL-GONE` and `REMOVED-REAPPEARED` (Files stt frozen until user confirms `In scope?`).

For each remaining row with ID `<X>`, run all 6 sub-scans. Each sub-scan looks inside the folder path recorded for `<X>` in `sourceFolderMap[<sourceArtifact>][<X>]` (from Phase 1). If no folder path was recorded for that source (the source has no folder matching `<X>` — e.g., BA has `UC1_TrangChuDashboard` but QC never created `UC1/` in `func-test-scenarios`) → that sub-scan returns `Missing` without attempting to read disk. Otherwise the sub-scan returns `V<max-N>` or `Missing` based on file contents of the recorded folder.

| Item | Source artifact (folder via `sourceFolderMap`) | Match | Version detection |
|---|---|---|---|
| `Specs` | `requirement-files` | `.md`, `.docx`, `.pdf` — EXCLUDE files with `_extracted_` in name; EXCLUDE image extensions | `_v<N>` (case-insensitive) in filename; absent → treat as v1 |
| `WF` | `requirement-files` | `.png`, `.jpg`, `.jpeg`, `.fig`, `.figma`, `.svg`, `.gif`, `.webp`, `.xd` | Same |
| `Audited` | `uc-review-report` | filename contains `_audited_` AND ends `.md` | Same |
| `Scenario` | `func-test-scenarios` | filename contains `_scenarios_` | Same |
| `TC md` | `func-test-cases-draft` | filename matches `_testcases_*.md` (covers both `_testcases_draft.md` and `_testcases_*_v<N>.md`) | Same |
| `TC xlsx` | `func-test-cases` | filename matches `_testcases_*_v<N>.xlsx` | Same |

Compose `newFilesStt` string in the fixed order, joined by `<br>`:
```
Specs: <V or Missing><br>WF: <V or Missing><br>Audited: <V or Missing><br>Scenario: <V or Missing><br>TC md: <V or Missing><br>TC xlsx: <V or Missing>
```

**Transition detection** — parse the row's previous `Files stt` cell (split on `<br>`, split each line on `:` to get type → value). Compare per-item to the new value:
- Any item that was `V<N>` and is now `Missing` → mark the row as **DOC-DISAPPEARED**, add to confirmation queue Type C with the list of disappearing items.
- Upgrades (`Missing` → `V<N>`) and version bumps (`V1` → `V2`) → applied without confirmation.

Update worklog: `Status = Phase 3 done`.

### Phase 4 — Confirmation Prompts (interactive)

If the confirmation queue is empty → skip to Phase 5.

Otherwise, present ONE consolidated prompt (omit empty sub-tables):

```
⚠️ **Cần xác nhận `In scope?` cho các row sau:**

**A. Folder mới phát hiện — đề xuất `Need confirm`:**
| ID | Folder phát hiện | Files stt phát hiện | Site/Module/Name | Đề xuất |
|---|---|---|---|---|
| <ID> | <path(s)> | Specs: V1<br>WF: Missing<br>... | <values or blank> | Need confirm |

**B. Folder của row đã Removed quay lại — đề xuất `Need confirm`:**
| ID | Folder phát hiện | Đề xuất |
|---|---|---|
| <ID> | <path(s)> | Need confirm |

**C. Doc đã biến mất khỏi folder — đề xuất `Removed`:**
| ID | Item nào biến mất | Đề xuất |
|---|---|---|
| <ID> | Specs (V2 → Missing), WF (V1 → Missing), ... | Removed |

👉 Trả lời theo MỘT trong các định dạng (có thể combine):
- `accept all` — apply tất cả đề xuất mặc định.
- `<ID>: <Yes | No | Removed | Need confirm>` — override per row (vd: `UC100: Yes`).
- `skip` — không trả lời lần này; rows giữ giá trị đề xuất. User có thể chỉnh manual sau.
- `cancel` — dừng skill, KHÔNG ghi gì.
```

Apply the user response:
- `accept all` → apply suggested value for each row.
- Per-ID overrides → apply user's value.
- `skip` → apply default suggested values (`Need confirm` for A/B, `Removed` for C).
- `cancel` → STOP. Roll back any in-memory changes. Worklog: `Status = Cancelled (Phase 4)`. Exit without writing.

Special handling: if a row in queue Type C ends up with `In scope? = Yes` (user override), the new `Files stt` is still written (reflecting the disappearance as `Missing`); this is intentional so the file state stays truthful.

Update worklog: `Status = Phase 4 done`.

### Phase 5 — Write Dashboard

1. Re-render the markdown table:
   - For every row, write columns **1, 2, 3, 4, 5, 6** with the values computed above.
   - **Columns 7 (`UC review stt`), 8 (`Scenario design stt`), 9 (`TC design stt`), 10 (`Execute stt`) are preserved verbatim** from `featureIndex[ID]` (blank for new rows).
   - Preserve the header row, **applying label migration if `labelMigrationNeeded` was set in Phase 0.6 case B**: replace `<existingLabel>` with `<expectedLabel>` in column 2 of the header. Otherwise keep the header verbatim.
   - Row order: existing rows in their original order, then new rows (sorted by Site alphabetical, then by ID).
2. Preserve the ghi-chú/notes block below the table verbatim (do not rewrite from template). **If a label migration note was prepared in Phase 0.6 case B, append it to the END of the ghi-chú block as a new bullet line** — do not overwrite existing notes.
3. Write back to the `qc-dashboard` path. **In-place edit** (per path-registry's versioning exception for meta-config files).

Update worklog: `Status = Phase 5 done`. Add `qc-dashboard.md` to the Output column.

### Phase 6 — Cleanup & Handover

1. **Do NOT delete `site-map-handoff.md`.** Lifecycle ownership rule: `qc-site-map` is the sole writer and deleter (it overwrites the file at the start of its own Phase 9). Leaving the file in place means the user can manually re-run `/qc-dashboard-sync` after editing artifacts on disk, without being forced to re-run the entire top-down chain. The handoff content stays accurate as long as `qc-site-map` has not been re-run with changes.
2. Output the summary:
   ```
   ✅ **Dashboard sync hoàn tất.**

   **Thay đổi:**
   - New rows added:                                <N>  (<list IDs>)
   - Rows soft-deleted (→ Removed):               <N>  (<list IDs>)
   - Rows re-activated (Removed → Need confirm):  <N>  (<list IDs>)
   - Rows with `Files stt` changes:               <N>  (<list IDs>)

   **User confirmation:**
   - Accepted defaults:  <N>
   - Overridden:         <N>
   - Skipped (kept Need confirm / Removed):  <N>

   Dashboard tại: `<resolved path>`
   ```
3. **Manual-update reminder.** If any new row has blank Site/Module/Name, or any row is still at `Need confirm`, append:
   ```
   📋 **Cần user xử lý manual:**
   - <N> row mới có cột Site / Module / Feature name TRỐNG — vui lòng cập nhật trực tiếp trong dashboard.
   - <N> row đang ở `Need confirm` — vui lòng quyết định Yes / No / Removed cụ thể.
   ```
4. Update worklog: `Status = Done`. Fill Duration.

## Bottom-up workflow

Triggered by per-UC skills (`qc-uc-read`, `qc-func-scenario-design`, `qc-func-tc-design`) when they encounter a UC ID that is not yet a row in `qc-dashboard.md`. The caller passes `uc_id=<ID>`.

### Bottom-up steps

1. Generate `run_id` and append worklog row `Status = Running (bottom-up, uc_id=<ID>)`.
2. Resolve `qc-dashboard` path. If the file does not exist → create it from `templates/qc-dashboard-template.md` with `<ID label> = Use Case ID` (default) so the per-UC skill can proceed; do NOT prompt for the label here (top-down handles the prompt; in bottom-up the default is safe).
3. Parse the existing dashboard (header + featureIndex). Schema validation: if mismatch → STOP and report.
4. **Single-UC scope check:**
   - If `<ID>` is already in `featureIndex` → exit early. Report `<ID> da co trong dashboard, khong can add`.
   - Otherwise → continue.
5. Run the 6-artifact sub-scans for `<ID>` only (same logic as top-down Phase 3 but limited to a single ID; resolve the folder path inside `requirement-files/<ID>/`, `uc-review-report/<ID>/`, etc., applying the same ID-extraction regex on sub-folder names).
6. Add a new row to `featureIndex`:
   - `Site / Module / Feature name` → leave BLANK (no upstream context to fill them).
   - `In scope?` → `Need confirm`.
   - `Files stt` → composed from step 5.
   - Process-state columns (7-10) → blank.
7. **Optional upstream alignment check:**
   - If `project-context-master.md` exists, read its feature list. If `<ID>` is NOT present → set a warning flag.
   - If `site-map-handoff.md` exists in inbox, read it. If `<ID>` is NOT present → set a warning flag.
8. Write the dashboard back (in-place).
9. Emit the user message:

   ```text
   ✅ Da them row moi cho <ID> vao qc-dashboard.md (In scope? = Need confirm).

   ⚠️ Canh bao: <ID> KHONG ton tai trong cac tai lieu upstream hien tai:
   - project-context-master.md: <CO | KHONG CO | KHONG TIM THAY FILE>
   - site-map-handoff.md (qc-site-map): <CO | KHONG CO | KHONG TIM THAY FILE>

   De dong bo day du, hay chay lai chuoi top-down:
   1. /qc-context-master  (cap nhat project context neu can)
   2. /qc-site-map        (re-map feature/screen)
   3. /qc-dashboard-sync  (sync dashboard tu site-map-handoff)
   ```

   Suppress the warning when both upstream files contain `<ID>`.

10. Worklog: `Status = Done (bottom-up)`. Append `qc-dashboard.md` as the Output.

### Bottom-up boundaries

- Bottom-up does NOT delete or consume any handoff file.
- Bottom-up does NOT run the site-map gap review (Phase 0.5 is top-down only).
- Bottom-up does NOT prompt the user during the run (per-UC skills run within a larger flow; an extra prompt would derail them); the warning is emitted as text only.
- Bottom-up may create the dashboard file from template if missing, with the default ID label.

## Boundaries

- **OWNER** of `qc-dashboard.md`. Creates the file from template on first run; updates in-place on subsequent runs.
- Writes columns **1, 2, 3, 4, 5, 6**.
- **NEVER writes** columns 7 (`UC review stt`), 8 (`Scenario design stt`), 9 (`TC design stt`), 10 (`Execute stt`). Always preserved verbatim.
- **Soft-delete model:** rows are NEVER physically deleted from the markdown table. `In scope? = Removed` is the soft-delete marker.
- Rows with `In scope? = Removed` are **skipped from Files-stt scanning**; their `Files stt` cell is frozen at the last-known value until `In scope?` is changed back to `Yes` / `Need confirm`.
- The skill does NOT invent values for Site / Module / Feature name — in top-down mode they come from the site-map handoff; in bottom-up they remain BLANK.
- Folders matching the exclusion rules (Common, Shared, _template, …) are NEVER added as orphans.
- Schema mismatch → STOP and report. Do NOT auto-fix.
- Site-map handoff file (top-down) is consumed (read only). This skill does NOT delete it — `qc-site-map` overwrites it on its next run with changes.

## Cross-skill contract

- **`qc-context-master`** — Step 1 of the top-down chain. Writes `project-context-master.md` only. NEVER writes any handoff file for this skill. NEVER invokes this skill directly. In Initialization mode it invokes `qc-site-map`; in Update mode it suggests the user to run `qc-site-map`.

- **`qc-site-map`** — Step 2 of the top-down chain. Writes `qc-site-map.md` + `.claude/skills/qc-dashboard-sync/inbox/site-map-handoff.md`. In Initialization mode it invokes this skill directly. In Update mode it suggests the user to run `/qc-dashboard-sync`. The handoff file it writes is the SOLE upstream feature list source for top-down sync.

- **`qc-uc-read`** — before reviewing a UC, MUST check whether the UC ID exists as a row in `qc-dashboard.md`. If absent, MUST invoke this skill in BOTTOM-UP mode (pass `uc_id=<ID>`). After running, `qc-uc-read` writes its own column 7 (`UC review stt`).

- **`qc-func-scenario-design`** — same bottom-up precheck contract. Writes column 8 (`Scenario design stt`).

- **`qc-func-tc-design`** — same bottom-up precheck contract. Writes column 9 (`TC design stt`).

Other skills (e.g., a future `qc-execute` skill) follow the same bottom-up precheck pattern and own column 10 (`Execute stt`) when they exist.
