---
name: qc-dashboard-sync
description: Owner of qc-dashboard.md. Scans the docs/ folder structure (via path-registry logical names) and consolidates the existence/version of 6 artifact types — Specs, WF, Audited, Scenario, TC md, TC xlsx — into a single `Files stt` column per feature/UC row. Creates the dashboard from template if missing; auto-adds a row for any UC folder not yet in the dashboard with `In scope? = Need confirm` (and prompts the user); marks rows `In scope? = Removed` when previously-existing docs disappear (with user confirmation). Triggered manually via /qc-dashboard-sync, auto-triggered by qc-context-master after extracting the feature/UC list, and by per-UC skills (qc-uc-read, qc-func-scenario-design, qc-func-tc-design) when they operate on a UC not yet in the dashboard. Does NOT write the process-state columns `UC review stt`, `Scenario design stt`, `TC design stt` — those are owned by the respective review/design skills.
---

# QC Dashboard Sync Skill

## Trigger Conditions

- **Manual:** `/qc-dashboard-sync`, "sync dashboard", "đồng bộ dashboard", "update dashboard status".
- **Auto-trigger from `qc-context-master`** — after it extracts the feature/UC list from WBS, it writes a handoff file and invokes this skill to commit the list into `qc-dashboard.md`. `qc-context-master` itself NEVER writes the dashboard directly.
- **Auto-trigger from per-UC skills** (`qc-uc-read`, `qc-func-scenario-design`, `qc-func-tc-design`) — when the skill operates on a UC ID that is NOT yet a row in the dashboard, it MUST invoke this skill BEFORE proceeding so the dashboard always reflects on-disk reality.

## Inputs

Resolve via `path-registry.md`:

| Logical name | Role | Used for |
|---|---|---|
| `qc-dashboard` | Dashboard markdown file. Created from template if missing. | Read/write target. |
| `requirement-files` | Parent folder; per-`<ID>` sub-folders. | Specs + WF scans. |
| `uc-review-report` | Parent folder; per-`<ID>` sub-folders. | Audited scan. |
| `func-test-scenarios` | Parent folder; per-`<ID>` sub-folders. | Scenario scan. |
| `func-test-cases-draft` | Parent folder; per-`<ID>` sub-folders. | TC md scan. |
| `func-test-cases` | Parent folder; per-`<ID>` sub-folders. | TC xlsx scan. |
| `requirement-common-files` | — | **Exclusion path** during orphan scan (its folder is not a UC). |

Optional input (auto-trigger mode):

- **Handoff file** at `.claude/skills/qc-dashboard-sync/inbox/feature-list-handoff.md`. If present, contains the feature/UC list the caller wants to merge into the dashboard. Schema:

  ```markdown
  ---
  source_skill: <skill-name>     # e.g., qc-context-master
  run_id: <caller-run-id>
  ---

  | ID | Site | Module | Feature/Use case name | In scope? |
  |---|---|---|---|---|
  | <ID> | <Site or blank> | <Module or blank> | <name or blank> | Yes / No / Need confirm |
  ```

  This skill consumes (reads + deletes) the file after Phase 6.

Template:

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

### Phase 0 — Pre-flight & Setup

1. Generate a new `run_id` (read `agent-work-log` for max ID, increment). Append a row with `Status = Running (Phase 0)`, Input/Output empty.
2. Resolve `qc-dashboard` path from `path-registry.md`.
   - **If the file does not exist:** read `templates/qc-dashboard-template.md`. Determine the `<ID label>`:
     - If handoff file is present, scan its `ID` column for the dominant prefix (`UC`, `F`, `FEAT`, ...) and ask the user: `"Tên cột định danh trong dashboard nên là gì? (gợi ý: Use Case ID / Feature ID / Story ID)"`.
     - If no handoff and no existing dashboard → default to `Use Case ID`.
     - Replace placeholder `{{ID_LABEL}}` in the template (header + notes section) with the chosen label.
   - Write the populated template to the resolved path. The body table is empty at this point.
3. Parse the markdown table from the (now-existing) dashboard:
   - Header row → identify `<ID label>` from column 2; remember it verbatim for write-back.
   - Data rows → build `featureIndex = Map<ID → { rowIndex, Site, Module, Name, InScope, FilesStt, UcReviewStt, ScenarioDesignStt, TcDesignStt, ExecuteStt }>`.
   - Capture the notes/ghi-chú block below the table verbatim.
4. **Schema validation** — header must have exactly 10 columns in this order:
   `Site | <ID label> | Module | Feature/Use case name | In scope? | Files stt | UC review stt | Scenario design stt | TC design stt | Execute stt`
   If mismatch → STOP and report the offending header. Do NOT auto-fix.
5. Check for the handoff file. If present, parse into `handoffList = Map<ID → { Site, Module, Name, InScope }>`.

Update worklog: `Status = Phase 0 done`.

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
   - Preserve the header row exactly (including the `<ID label>` value).
   - Row order: existing rows in their original order, then new rows (sorted by Site alphabetical, then by ID).
2. Preserve the ghi-chú/notes block below the table verbatim (do not rewrite from template).
3. Write back to the `qc-dashboard` path. **In-place edit** (per path-registry's versioning exception for meta-config files).

Update worklog: `Status = Phase 5 done`. Add `qc-dashboard.md` to the Output column.

### Phase 6 — Cleanup & Handover

1. If the handoff file was consumed → delete it.
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

## Boundaries

- **OWNER** of `qc-dashboard.md`. Creates the file from template on first run; updates in-place on subsequent runs.
- Writes columns **1, 2, 3, 4, 5, 6**.
- **NEVER writes** columns 7 (`UC review stt`), 8 (`Scenario design stt`), 9 (`TC design stt`), 10 (`Execute stt`). Always preserved verbatim.
- **Soft-delete model:** rows are NEVER physically deleted from the markdown table. `In scope? = Removed` is the soft-delete marker.
- Rows with `In scope? = Removed` are **skipped from Files-stt scanning**; their `Files stt` cell is frozen at the last-known value until `In scope?` is changed back to `Yes` / `Need confirm`.
- The skill does NOT invent values for Site / Module / Feature name — if `qc-context-master` did not pass them via handoff, those cells are left BLANK and the user is told to fill manually.
- Folders matching the exclusion rules (Common, Shared, _template, …) are NEVER added as orphans.
- Schema mismatch → STOP and report. Do NOT auto-fix.
- Handoff file is always consumed (read + delete) — no stale state left behind.

## Cross-skill contract

- **`qc-context-master`** — after extracting the feature/UC list from WBS, MUST:
  1. Write the list to the handoff file path (see Inputs).
  2. Invoke `qc-dashboard-sync` via the Skill tool.
  3. NEVER edit `qc-dashboard.md` directly.

- **`qc-uc-read`** — before reviewing a UC, MUST check whether the UC ID exists as a row in `qc-dashboard.md`. If absent, MUST invoke `qc-dashboard-sync` first (no handoff file needed — pure disk scan picks up the UC folder and adds a row with `Need confirm`). After running, this skill writes its own column 7 (`UC review stt`).

- **`qc-func-scenario-design`** — same precheck contract. Writes column 8 (`Scenario design stt`).

- **`qc-func-tc-design`** — same precheck contract. Writes column 9 (`TC design stt`).

Other skills (e.g., a future `qc-execute` skill) follow the same precheck pattern and own column 10 (`Execute stt`) when they exist.
