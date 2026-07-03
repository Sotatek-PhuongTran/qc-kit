# qc-dashboard-sync — Top-down workflow

> **Mode: top-down.** Invoked when no `uc_id` is passed (auto by `qc-site-map`, or manual `/qc-dashboard-sync` with no argument). Mode routing is decided in `../SKILL.md` § "Two modes".
>
> **Shared contracts live in `../references/contracts.md`** — read it first. Throughout this file: "Inputs" → contracts §1, "Schema" → §2, "Files stt cell format" → §3, "Process-log parse contract" → §4, "Done-state derivation" → §5, "Top-down handoff input" → §6a, "Bottom-up output handoff" → §6b, "Sort order directive" → §7. "Top-down prerequisites" → `../SKILL.md`. References to "the dedicated bottom-up section after Phase 6" point to `bottom-up.md`.

## Workflow (Phases 0 → 0.5 → 0.6 → 1 → 2 → 3a → 3b → 4 → 5 → 6)

### Phase 0 — Mode detection, prerequisites & input parse

This phase is purely read-only. No dashboard file is created or modified here; that happens in Phase 0.6 after the user reviews the gap report.

1. Generate a new `run_id` per the worklog protocol. Worklog: append new entry to the device's JSONL with `status = "Running (Phase 0)"`, `input`/`output` empty, `start = now`.
2. **Mode detection:**
   - Caller passed `uc_id=<ID>` → switch to bottom-up workflow (see section "Bottom-up workflow"). Skip the rest of Phase 0 in this top-down workflow.
   - Otherwise → top-down.
3. **Top-down prerequisite check:**
   - Resolve `project-context-master` path from `path-registry.md`. Verify the file EXISTS with real content. (Content is not parsed here — its presence is only required as evidence that the top-down chain ran in order. The canonical feature list comes from the site-map handoff.)
   - Verify `.claude/skills/qc-dashboard-sync/inbox/site-map-handoff.md` exists.
   - If either is missing → STOP with the Vietnamese message defined in "Top-down prerequisites" above. Do not fall through to bottom-up.
4. **Parse the site-map handoff file.**
   - Parse the `Feature-level site map coverage` table into `handoffList = Map<FeatureID → { Site, Module, Name, MappedScreens, FolderAliases[], InScope, SiteMapStatus, Notes }>`. The `Feature ID` column maps to FeatureID; `Feature name` to Name; `Site / Portal` to Site; `Module` to Module; `Folder alias(es)` parsed as a comma-separated list (empty list if blank); `In scope?` to InScope (copied verbatim — values `Yes`, `No`, `Need confirm`); `Site map status` to SiteMapStatus (diagnostic; surfaced in Phase 0.5 but NOT written to a dashboard cell).
   - Build `aliasIndex = Map<FolderID → FeatureID>` from the `FolderAliases` lists — for each (FeatureID, alias) pair, record `aliasIndex[alias] = FeatureID`. If a FeatureID has no aliases declared, treat the FeatureID itself as its own folder ID (i.e., `aliasIndex[FeatureID] = FeatureID`). If the same alias appears under two different FeatureIDs → STOP with a Vietnamese error message (`Loi: folder alias <X> duoc khai bao trung lap o site-map-handoff cho ca hai feature <A> va <B>. Vui long sua qc-site-map.md hoac chay lai qc-site-map Mode 3.`).
   - Parse the `Feature-level gaps`, `Unmapped screens`, and `Dashboard update recommendation` tables — keep them as `siteMapGaps`, `unmappedScreens`, `dashboardRecommendations` for Phase 0.5.
5. Resolve `qc-dashboard` path from `path-registry.md`. **Do NOT create or write the file yet.**
   - If the dashboard file EXISTS: parse it now (header → `existingLabel`; data rows → `featureIndex` keyed by canonical ID in column 2; notes block captured verbatim). Detect the schema variant and apply auto-migration when needed:

     | Detected schema | Action |
     |---|---|
     | **Baseline 10 cols** (`Site | <ID> | Folder ID | Module | Name | In scope? | Files stt | UC review stt | Scenario design stt | TC design stt`) | Proceed normally. Existing stt cells (cols 8/9/10) are KEPT (cached values needed for sparse-parse comparisons in Phase 3b); they will be OVERWRITTEN in Phase 5 only when the corresponding source has a newer version. |
     | **11 cols** = baseline + (`Automation stt` OR `Execute stt`) after `TC design stt` | Proceed normally. Both columns' cached values kept for re-derivation in Phase 3b. |
     | **12 cols** = baseline + both `Automation stt` and `Execute stt` (in that order) after `TC design stt` | Proceed normally. |
     | **Legacy v2-kit** (header contains `Action & UI extract stt`) | AUTO-MIGRATE: DROP the `Action & UI extract stt` column entirely (the ui-act-collector pipeline is retired in kit v3). Append migration note: `> **<YYYY-MM-DD> — Schema migration v2→v3**: cot 'Action & UI extract stt' da duoc go bo (pipeline ui-act-collector khong con trong kit v3). Cot 'Automation stt' se duoc inject tu dong khi project automation ton tai.` Then re-classify the remaining header against the rows above. |
     | **Legacy v10** (10 cols WITHOUT `Folder ID`, header `Site | <ID> | Module | …`) | AUTO-MIGRATE: insert `Folder ID` at position 3 = column 2 self-reference; shift rest right. |
     | **Legacy v11-old** (header contains `Specs stt`, `WF stt`, `Test scenario stt`, `Test cases stt` as separate columns — typical pre-consolidation shape: `Site | <ID> | Module | Name | In scope? | Specs stt | WF stt | Test scenario stt | Test cases stt | [Action & UI extract stt] | [Execute stt]`) | AUTO-MIGRATE per "Legacy v11-old → new" steps below. |
     | **Other** (wrong header order, unknown column names, can't classify) | STOP and report. Do NOT auto-fix. |

     **Legacy v10 → new** migration steps (in-memory):
     1. Insert `Folder ID` column at position 3 in the header.
     2. For every data row, insert cell at position 3 = column 2's value (self-reference).
     3. Append migration note:
        ```text
        > **<YYYY-MM-DD> — Schema migration v10→new**: cot `Folder ID` da duoc them tu dong, gia tri = cot `<ID label>` (self-reference). Mode 3 cua qc-site-map se update gia tri khi reconcile orphan voi alias mapping khac.
        ```
     4. Print: `Da auto-migrate dashboard: them Folder ID = self-reference cho <N> row.`

     **Legacy v11-old → new** migration steps (in-memory, purely STRUCTURAL — values of the 4 file cols are DROPPED, not transformed, because the new `Files stt` format requires a fresh disk scan):
     1. Header transformation:
        - Insert `Folder ID` at position 3.
        - Replace the 4 cols (`Specs stt`, `WF stt`, `Test scenario stt`, `Test cases stt`) with a single `Files stt` column at position 7.
        - Insert `UC review stt`, `Scenario design stt`, `TC design stt` at positions 8, 9, 10.
        - Drop `Action & UI extract stt` if present (retired in kit v3).
        - Preserve `Execute stt` if present (becomes col 11 or 12 per contracts §2).
     2. For every data row:
        - Insert col 3 = col 2 (self-reference).
        - Set col 7 `Files stt` = EMPTY (force next sync to populate via fresh scan).
        - Set cols 8, 9, 10 = EMPTY (no prior process-state values existed).
        - Carry over `Execute stt` value if column existed (`Action & UI extract stt` values are dropped).
     3. Append migration note:
        ```text
        > **<YYYY-MM-DD> — Schema migration v11-old→new**: hop nhat 4 cot (`Specs stt`, `WF stt`, `Test scenario stt`, `Test cases stt`) thanh `Files stt` (cell trong, se duoc populate bang next sync); them `Folder ID`, `UC review stt`, `Scenario design stt`, `TC design stt`. Cac cot stt se duoc populate tu in-progress check + sparse done-state derivation o Phase 3b. Cot `Execute stt` neu co duoc giu lai verbatim. Gia tri 4 cot file cu duoc DROP (khong transform) vi format moi yeu cau scan lai.
        ```
     4. Print: `Da auto-migrate dashboard tu v11-old sang schema moi (<N> row, <K> cot optional duoc giu).`
     5. Continue Phase 0 with the migrated in-memory state. The actual file write happens in Phase 5.

   - If the dashboard file does NOT exist: skip parsing. `featureIndex` is empty. The `<ID label>` will be determined in Phase 0.6 from the handoff and a user prompt.

   Build `folderIDIndex = Map<FolderID → FeatureID>` from `featureIndex` (column 3 → column 2) so Phase 1 can match observed folders back to existing rows even when the on-disk folder uses an alias.
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

2. **Exclude + extract Folder ID from each sub-folder name** using a regex list built dynamically from the project's actual ID patterns. Different sources may name the same UC differently — e.g., BA uses compound names like `UC-CLY-005_LoyaltyRules` or `UC1_TrangChuDashboard`, while QC uses bare IDs like `UC-CLY-005` or `UC1`. A single dự án may use multiple ID formats simultaneously (e.g., `UC-CLY-005` for new modules + legacy `F-100`). The skill MUST extract a `Folder ID` and use it as the link to the dashboard row (column 3).

   **Step 2a — Build `regexList` (dynamic pattern detection):**
   - Source IDs for pattern detection:
     - Top-down: all `Feature ID` values from `handoffList` (Phase 0 step 4) PLUS all column 2 values from existing `featureIndex`.
     - Bottom-up: the single `uc_id` passed by caller.
   - For each source ID, compute its **shape signature**:
     - Split the ID by `-` and `_` into tokens.
     - Classify each token as `L` (all-letters), `N` (all-digits), or `M` (mixed — rare; treat as `L`).
     - Signature = tokens joined by their original separator (vd: `UC-CLY-005` → `L-L-N`; `UC1` → `LN` (no separator merges adjacent classes); `F-100` → `L-N`; `UC258_UC259` → `LN_LN`).
   - Group source IDs by signature; for each distinct signature, build ONE regex with **capture group 1** = the canonical ID portion:
     - `L`, `M` tokens → `[A-Z]+` (case-insensitive match).
     - `N` tokens → `\d+`.
     - Separators preserved verbatim (`-` or `_`).
     - Optional trailing continuation segments (to handle compound disk names like `UC1_61_TrangChu`): append `(?:[-_]\d+)*` ONLY when the LAST token is `N`. Don't append for IDs that end with letters.
     - Examples produced: `L-L-N` → `^([A-Z]+-[A-Z]+-\d+(?:[-_]\d+)*)`; `L-N` → `^([A-Z]+-\d+(?:[-_]\d+)*)`; `LN` → `^([A-Z]+\d+(?:[-_]\d+)*)`; `LN_LN` → `^([A-Z]+\d+_[A-Z]+\d+(?:[-_]\d+)*)`.
   - Sort `regexList` by **specificity descending** (longer signatures first, more separators first) so a compound-prefix regex matches before its shorter superset.
   - If `regexList` is empty (no source IDs at all — bootstrap edge case): fall back to a single permissive regex `^([A-Z]+[-_]?\d+(?:[-_]\d+)*)`. Continue with whole-name fallback for non-matches.

   **Step 2b — For each sub-folder name `<folderName>`:**
   - **Exclude** the folder if it satisfies ANY of:
     - Equals the basename (or any path segment) of the `requirement-common-files` resolved path.
     - Starts with `Common`, `Shared`, `_template`, `Old`, `Archive`, `_`, `.` (case-insensitive).
   - **Extract Folder ID** — try each regex in `regexList` order (first match wins); take capture group 1.
   - If NO regex matches → fall back to `Folder ID = <folderName>` verbatim. Do NOT silently skip — these folders are exactly the orphans that `qc-site-map` Mode 3 needs to reconcile.
   - Record the mapping in `sourceFolderMap[<sourceArtifact>][<folderID>] = <full folder path>`. `<sourceArtifact>` is one of `requirement-files | uc-review-report | func-test-scenarios | func-test-cases-draft | func-test-cases`. The same `<folderID>` may legitimately resolve to different folder paths across sources (e.g., `requirement-files/UC-CLY-005_LoyaltyRules/` and `uc-review-report/UC-CLY-005/` both map to Folder ID `UC-CLY-005`).
   - If two folders within the SAME source extract to the same Folder ID → warn in the run report and pick the first encountered (lexicographic order); user must resolve manually.

3. Build `observedFolderIDs = Set<FolderID>` deduplicated as the union of `<folderID>` keys across all 5 source maps.

4. **Resolve Folder ID → canonical Feature ID** for each observed folder, using this lookup chain (first match wins):
   - `aliasIndex[folderID]` (from handoff `Folder alias(es)`)
   - `folderIDIndex[folderID]` (from existing dashboard rows' column 3)
   - handoff `FeatureID == folderID` (direct match — top-down's default top-down case where Folder ID equals Feature ID)
   - existing dashboard `featureIndex[folderID]` (legacy direct match)
   - **No match → orphan**: this folder is not yet linked to any canonical ID. Treat its canonical ID as the Folder ID itself (`canonicalID := folderID`) and mark this row for inclusion in the bottom-up-style orphan handoff (see Phase 4).

   Persist the mapping as `folderToFeature = Map<FolderID → CanonicalFeatureID>` and the inverse `featureToFolder = Map<CanonicalFeatureID → FolderID>` (one folder per feature in the current scan; if a feature has multiple aliases on disk, only one folder is scanned this run — additional aliases stay in handoff but produce no disk scan).

Update worklog: `Status = Phase 1 done`.

### Phase 2 — Reconcile Buckets

The reconciliation operates over THREE sets:
- `existingFeatures = featureIndex.keys()` (canonical Feature IDs in current dashboard)
- `handoffFeatures = handoffList.keys()` (canonical Feature IDs in fresh handoff)
- `observedFolderIDs` (folder IDs seen on disk in Phase 1)

For each `observedFolderID`, `folderToFeature[observedFolderID]` is the canonical Feature ID it resolves to (Phase 1 Step 4). The reconciliation classifies every `(canonicalID, folderID?)` pair into one of the buckets below. **There are NO user confirmation prompts in this skill** — every bucket auto-applies its action.

| Bucket | Condition | Action |
|---|---|---|
| **MATCH-WITH-FOLDER** | canonicalID ∈ (handoffFeatures ∪ existingFeatures) AND ∃ folderID with `folderToFeature[folderID] = canonicalID`. | Update row (creating it if only in handoff). Column 3 `Folder ID` = the matched folderID. Run Phase 3 disk scan over that folderID's paths → write `Files stt`. Copy `In scope?` from handoff if present, else preserve existing value. |
| **HANDOFF-ONLY** | canonicalID ∈ handoffFeatures AND no observed folder maps to it. | Create row from handoff values. Column 3 `Folder ID` = first alias in handoff `Folder alias(es)`; if none, default to canonicalID. `Files stt` = all 6 lines `Missing`. `In scope?` from handoff. |
| **EXISTING-NO-FOLDER** | canonicalID ∈ existingFeatures AND canonicalID ∉ handoffFeatures AND no observed folder maps to it. | Preserve row as-is. Run Phase 3 over that row's existing Folder ID (column 3) — typically all `Missing`. Files stt updated. **In scope? NOT auto-changed**; user can manually edit if the feature is truly gone. Surface row in Phase 6 report under "Features no longer in handoff" so user is aware. |
| **ORPHAN-FOLDER** | folderID ∈ observedFolderIDs AND `folderToFeature[folderID] = folderID` (= no canonical match found). | Create row with column 2 `<ID label>` = folderID, column 3 `Folder ID` = folderID, `In scope? = Need confirm`. Run Phase 3 disk scan → write `Files stt`. **Add folderID to `orphanQueue`** for Phase 4 export to `dashboard-orphans.md`. |

Notes:
- A folder that appeared on disk for a feature whose `In scope?` was previously `No` is still scanned — Files stt always reflects disk reality regardless of scope. The user keeps full control of `In scope?` via manual edit.
- "Folder fully removed" (canonicalID was in existingFeatures with a Folder ID but no folder matches it now) is the **EXISTING-NO-FOLDER** bucket above. Surface in report, do not auto-change scope.

Update worklog: `Status = Phase 2 done`.

### Phase 3a — `Files stt` Computation (disk scan)

For each row, run all 6 sub-scans against its `Folder ID` (column 3). Each sub-scan looks inside the folder path recorded for that Folder ID in `sourceFolderMap[<sourceArtifact>][<folderID>]` (from Phase 1). If no folder path was recorded for that source (the source has no folder matching the Folder ID — e.g., BA has `UC1_TrangChuDashboard` but QC never created `UC1/` in `func-test-scenarios`) → that sub-scan returns no result (artifact absent) without attempting to read disk. Otherwise the sub-scan returns `V<max-N>` when matching files are found, or no result when none.

| Item | Source artifact (folder via `sourceFolderMap`) | Match | Version detection |
|---|---|---|---|
| `Specs` | `requirement-files` | `.md`, `.docx`, `.pdf` — EXCLUDE files with `_extracted_` in name; EXCLUDE image extensions | `_v<N>` (case-insensitive) in filename; absent → treat as v1 |
| `WF` | `requirement-files` | `.png`, `.jpg`, `.jpeg`, `.fig`, `.figma`, `.svg`, `.gif`, `.webp`, `.xd` | Same |
| `Audited` | `uc-review-report` | filename contains `_audited_` AND ends `.md` | Same |
| `Scenario` | `func-test-scenarios` | filename contains `_scenarios_` | Same |
| `TC md` | `func-test-cases-draft` | filename matches `_testcases_*.md` (covers both `_testcases_draft.md` and `_testcases_*_v<N>.md`) | Same |
| `TC xlsx` | `func-test-cases` | filename matches `_testcases_*_v<N>.xlsx` | Same |

Compose `newFilesStt`:
- Walk the 6 artifact types in the fixed order (Specs, WF, Audited, Scenario, TC md, TC xlsx) and keep only the ones whose sub-scan returned `V<N>`.
- Format each kept item as `<Type>: V<N>` and join with `<br>`.
- If NO item is found across all 6 types → set the cell to the literal string `No files yet`.

Do NOT compare against the previous `Files stt` value; this skill no longer tracks transitions (upgrades/regressions). The new cell always reflects current disk reality verbatim.

Update worklog: `Status = Phase 3a done`.

### Phase 3b — stt columns Computation (in-progress check + sparse done-state derivation)

This phase populates columns 8 (`UC review stt`), 9 (`Scenario design stt`), 10 (`TC design stt`), and — when the automation project exists — 11 (`Automation stt`) and 12 (`Execute stt`). The strategy minimizes token cost by parsing audited reports only when their version is newer than the cached value already in the cell.

For every dashboard row (`<UC-ID>` = the row's `Folder ID`), and for each applicable stt column:

#### Step 1 — In-progress check

Check whether `.claude/skills/<owner-skill>/process-logging/<UC-ID>/progress.md` exists (`<owner-skill>` per the "Process-logging inputs" table). If yes → read it, extract `status:` line per the "Process-log parse contract" parse algorithm, and set the cell to the raw status string. SKIP step 2 for this column.

#### Step 2 — Done-state derivation (only when in-progress file is absent)

Apply the per-column rule from the "Done-state derivation" table:

- **`UC review stt`:**
  1. From the row's Files stt, extract `currentAuditedVer` (digit after `Audited: V`). If no Audited line → cell BLANK; skip.
  2. From the row's existing cell value, extract `cachedAuditedVer` via regex `(?:Ready|Conditionally Ready|Not Ready)\s+v(\d+)\s*\(Score`. If no match → `cachedAuditedVer = 0`.
  3. If `currentAuditedVer <= cachedAuditedVer` → keep cell verbatim (NO PARSE — token saving).
  4. Else → locate the highest-version audited file at `<uc-review-report>/<UC-ID>/*_audited_*_v<currentAuditedVer>.md`. Use `grep -n "Tổng điểm"` to find the scoring line, then targeted-read 1 line. Extract `score` + `verdict` via the regex in "Done-state derivation" → audited file parse contract. Compose new cell value `<verdict> v<currentAuditedVer> (Score <score>/100)`.
  5. If grep fails (no scoring row found in file) → emit warning + keep cell verbatim.

- **`Scenario design stt`:**
  1. From the row's Files stt, extract `scenarioVer` (digit after `Scenario: V`). If no Scenario line → cell BLANK.
  2. Else → cell = `v<scenarioVer> generated` (no file parse).

- **`TC design stt`:**
  1. From the row's Files stt, extract `tcXlsxVer` and `tcMdVer`.
  2. If `tcXlsxVer` present → cell = `v<tcXlsxVer> generated`.
  3. Else if `tcMdVer` present → cell = `v<tcMdVer> draft`.
  4. Else → cell BLANK.

- **`Automation stt`** (only when the automation project exists — contracts §2):
  1. In-progress check uses `qc-auto-generate/process-logging/<UC-ID>/progress.md` (Step 1 above).
  2. Done-state: count `.spec.ts` files for the UC under `automation-specs` (resolve via `path-registry`). Cell = `<K> spec(s)`; folder absent or zero files → cell BLANK. Cheap `ls` — no content parse.

- **`Execute stt`** (only when the automation project exists):
  1. Resolve `automation-run-summary` via `path-registry`. If missing → keep cell verbatim (may hold user edits).
  2. Parse the summary's date; if not newer than the date cached in the cell (`—\s*(\d{4}-\d{2}-\d{2})$`) → keep cell verbatim.
  3. Else → read the UC's row in the summary table → cell = `<pass>/<total> pass — <YYYY-MM-DD>`. UC absent from summary → cell unchanged.

#### Step 3 — Automation column auto-injection check

If the automation project folder exists (parent of `automation-specs`) AND the dashboard header lacks `Automation stt` and/or `Execute stt` → mark `injectAutomationColumns = true`. Phase 5 inserts the missing column(s) at positions 11/12 per contracts §2.

#### Step 4 — Store results

Store the computed values in `stttCells[<rowID>][<columnName>] = formattedValue`. Phase 5 writes them into the rendered table.

**Idempotency note:** Phase 3b reads at most: (a) the per-UC subfolder progress.md files (small, fast), (b) one grep + targeted read per UC that has a NEWER audited version than its cached cell, and (c) one summary-table read when the run summary is newer. Steady-state → near-ZERO file reads.

Update worklog: `Status = Phase 3b done`.

### Phase 4 — Export orphan handoff (no user prompt)

This skill is non-interactive after Phase 0.5. Phase 4 performs ONE write outside of `qc-dashboard.md`: it exports the `orphanQueue` (from Phase 2's `ORPHAN-FOLDER` bucket) to the inbox of `qc-site-map`.

1. If `orphanQueue` is empty → skip the file write and continue to Phase 5.
2. Otherwise, resolve the output path `.claude/skills/qc-site-map/inbox/dashboard-orphans.md`.
3. **Append + dedupe semantics:**
   - If the file does NOT exist → create it from the schema in "Bottom-up output handoff" above. Write each orphan as one row.
   - If the file EXISTS → parse its existing table. For each Folder ID in `orphanQueue`:
     - If the Folder ID already has a row → update only the `Detected at` cell to the current ISO timestamp; do NOT duplicate.
     - Else → append a new row.
   - Preserve frontmatter; update `generated_at` to the latest run timestamp.
4. Record `orphanQueue` count for the Phase 6 report.

Update worklog: `Status = Phase 4 done`.

### Phase 5 — Compose sort + write Dashboard

This skill is the SOLE writer of every column in the dashboard. Phase 5 composes the final row order via the `Sorting:` directive, writes all cells (including stt columns from Phase 3b), and persists to disk.

#### Step 1 — Optional column injection check

- If Phase 3b set `injectAutomationColumns = true` → insert the missing `Automation stt` / `Execute stt` column(s) at positions 11/12 per contracts §2. Pre-existing rows get blank values until Phase 3b finds entries for them.
- Otherwise preserve the header as-is.

#### Step 2 — Compute sort order

Apply the algorithm in "Sort order directive" section above:

1. Compute `distinctSites` and `distinctModules`.
2. Read any pre-existing `Sorting:` line from the in-memory parsed dashboard.
3. Decide the sort level + the `userSortList` per the re-run logic. If no pre-existing line OR re-run logic triggers fresh generation → auto-generate alphabetical ascending of the chosen level.
4. Record the final `sortLevel` (`Site` | `Module` | `None`) and `sortList`.
5. If `sortLevel == None` (single-portal single-module case) and a pre-existing `Sorting:` line is present → mark it for removal with a notice in Phase 6 output.

#### Step 3 — Apply sort to rows

1. Group rows by their value at `sortLevel`:
   - For each group in the order given by `sortList`, append the group's rows.
   - Append any rows whose level-value is not in `sortList` last, alphabetical ascending.
2. Within each group, sort by the next-lower level alphabetically (`Site` → sub-sort by `Module` ascending; then by canonical ID ascending). If `sortLevel == Module`, sub-sort by canonical ID ascending. If `sortLevel == None`, sort all rows by canonical ID ascending.

#### Step 4 — Render the table

For every row, write ALL columns:

- Columns **1, 2, 3, 4, 5, 6, 7** with the values computed in Phases 0–3a (per the bucket rules in Phase 2 and the disk scan in Phase 3a).
  - Column 2 `<ID label>` = canonical Feature ID.
  - Column 3 `Folder ID` = folder-name ID linking the row to disk. NEVER blank — for top-down rows without an alias, equals column 2.
  - Column 6 `In scope?` = copied from handoff (top-down) or `Need confirm` (ORPHAN-FOLDER bucket) or preserved (EXISTING-NO-FOLDER bucket).
- Columns **8, 9, 10** with the values from Phase 3b's `stttCells` map. If no value was computed → BLANK.
- Optional columns (`Automation stt`, `Execute stt`) — values from Phase 3b's `stttCells` map; BLANK if no entry; `Execute stt` keeps its previous value when the run summary is not newer (user edits preserved).
- Preserve the header row, applying label migration if `labelMigrationNeeded` was set in Phase 0.6 case B.

#### Step 5 — Write `Sorting:` directive

- If `sortLevel != None` → write the line `Sorting: <v1> >> <v2> >> ...` immediately above the table header. Place it on its own line with one blank line on each side.
- If `sortLevel == None` AND a pre-existing `Sorting:` line was present → remove it.
- If `sortLevel == None` AND no pre-existing line → write nothing.

#### Step 6 — Preserve notes block + write file

- Preserve the ghi-chú/notes block below the table verbatim (do not rewrite from template). If a label migration note or v10/v11-old migration note was prepared earlier, append it to the END of the ghi-chú block as a new bullet — do not overwrite existing notes.
- Write back to the `qc-dashboard` path. In-place edit.

Update worklog: `Status = Phase 5 done`. Add `qc-dashboard.md` to the Output column. If `orphanQueue` was non-empty in Phase 4, also append `dashboard-orphans.md` to the Output column.

### Phase 6 — Cleanup & Handover

1. **Do NOT delete `site-map-handoff.md`.** Lifecycle ownership rule: `qc-site-map` is the sole writer and deleter (it overwrites the file at the start of its own Phase 9). Leaving the file in place means the user can manually re-run `/qc-dashboard-sync` after editing artifacts on disk, without being forced to re-run the entire top-down chain.
2. **Do NOT delete `dashboard-orphans.md`.** Lifecycle ownership rule: `qc-site-map` Mode 3 is the sole deleter (it removes the file after reconciling every entry). Top-down may have appended new entries this run; those persist until Mode 3 runs.
3. Output the summary:
   ```
   ✅ **Dashboard sync hoàn tất.**

   **Thay đổi:**
   - New rows added (top-down handoff):           <N>  (<list canonical IDs>)
   - Orphan folders appended to site-map inbox:   <N>  (<list Folder IDs>)
   - Features in dashboard không còn trong handoff (cần user review): <N>  (<list canonical IDs>)
   - stt cells updated (in-progress hoặc sparse-parse done): <N>  (<list "col:UC-ID" entries, max 10 then "... và <K> mục khác">)
   - Audited file re-parses (token cost):          <N>  (<list "UC-ID v<old>→v<new>" entries>)
   - Automation columns auto-injected:        <Yes (Automation stt / Execute stt) | No>

   **Sort order:**
   - Sort level:    <Site | Module | None — single module>
   - Sorting line:  <`Sorting: ...` written | removed | unchanged | auto-generated>

   Dashboard tại: `<resolved path>`
   Orphan inbox: `<inbox path>` (<orphanQueue count> entries this run; total <total dedup count> trong file)
   ```
4. **Next-step reminder.**
   - If `orphanQueue` count > 0:
     ```
     📋 **Cần chạy tiếp:** Có <N> folder UC không khớp site-map đã được ghi vào `dashboard-orphans.md`. Hãy chạy `/qc-site-map` (chọn Mode 3 khi được hỏi) để reconcile các orphan này thành mapped feature hoặc feature mới.
     ```
   - If any new row has blank Site/Module/Name OR any row at `Need confirm`:
     ```
     📋 **Cần user xử lý manual:**
     - <N> row mới có cột Site / Module / Feature name TRỐNG — vui lòng cập nhật trực tiếp trong dashboard.
     - <N> row đang ở `Need confirm` — sẽ tự resolve sau khi `qc-site-map` Mode 3 chạy, hoặc bạn có thể edit thủ công thành Yes / No.
     ```
5. Update worklog: `Status = Done`. Fill Duration.
