# qc-dashboard-sync — Top-down workflow

> **Mode: top-down.** Invoked when no `uc_id` is passed (auto by `qc-site-map`, or manual `/qc-dashboard-sync` with no argument). Mode routing is decided in `../SKILL.md` § "Two modes".
>
> **Shared contracts live in `../references/contracts.md`** — read it first. Throughout this file: "Inputs" → contracts §1, "Schema" → §2, "Scan result / Tài liệu nguồn format" → §3, "Process-log parse contract" → §4, "Done-state derivation" → §5, "Top-down handoff input" → §6a, "Bottom-up output handoff" → §6b, "Sort order directive" → §7. "Top-down prerequisites" → `../SKILL.md`. References to "the dedicated bottom-up section" point to `bottom-up.md`.

## Workflow (Phases 0 → 0.5 → 0.6 → 1 → 2 → 3a → 3b → 4 → 5 → 6)

### Phase 0 — Mode detection, prerequisites & input parse

This phase is purely read-only. No dashboard file is created or modified here; that happens in Phase 0.6 after the user reviews the gap report.

1. Generate a new `run_id` per the worklog protocol. Worklog: append new entry to the device's JSONL with `status = "Running (Phase 0)"`, `input`/`output` empty, `start = now`.
2. **Mode detection:**
   - Caller passed `uc_id=<ID>` → switch to the bottom-up workflow (`bottom-up.md`). Skip the rest of this top-down workflow.
   - Otherwise → top-down.
3. **Top-down prerequisite check:**
   - Resolve `project-context-master` path from `path-registry.md`. Verify the file EXISTS with real content. (Content is not parsed here — its presence is only required as evidence that the top-down chain ran in order. The canonical feature list comes from the site-map handoff.)
   - Verify `.claude/skills/qc-dashboard-sync/inbox/site-map-handoff.md` exists.
   - If either is missing → STOP with the Vietnamese message defined in "Top-down prerequisites" above. Do not fall through to bottom-up.
4. **Parse the site-map handoff file.**
   - Parse the `Feature-level site map coverage` table into `handoffList = Map<FeatureID → { Site, Module, Name, MappedScreens, FolderAliases[], InScope, SiteMapStatus, Notes }>`. The `Feature ID` column maps to FeatureID; `Feature name` to Name; `Site / Portal` to Site; `Module` to Module; `Folder alias(es)` parsed as a comma-separated list (empty list if blank); `In scope?` to InScope (copied verbatim — values `Yes`, `No`, `Need confirm`); `Site map status` to SiteMapStatus (diagnostic; surfaced in Phase 0.5 but NOT written to a dashboard cell).
   - Build `aliasIndex = Map<FolderID → FeatureID>` from the `FolderAliases` lists — for each (FeatureID, alias) pair, record `aliasIndex[alias] = FeatureID`. If a FeatureID has no aliases declared, treat the FeatureID itself as its own folder ID (i.e., `aliasIndex[FeatureID] = FeatureID`). If the same alias appears under two different FeatureIDs → STOP with a Vietnamese error message (`Loi: folder alias <X> duoc khai bao trung lap o site-map-handoff cho ca hai feature <A> va <B>. Vui long sua qc-site-map.md hoac chay lai qc-site-map Mode 3.`).
   - Compute `distinctSites` and `distinctModules` from the coverage table — they drive the optional `Site` / `Module` column injection (Schema, contracts §2) and the sort directive (contracts §7).
   - Parse the `Feature-level gaps`, `Unmapped screens`, and `Dashboard update recommendation` tables — keep them as `siteMapGaps`, `unmappedScreens`, `dashboardRecommendations` for Phase 0.5.
5. Resolve `qc-dashboard` path from `path-registry.md`. **Do NOT create or write the file yet.**
   - If the dashboard file EXISTS: parse it now (header → `existingLabel` + the set of optional columns present; data rows → `featureIndex` keyed by canonical ID in the `<ID label>` column; notes block captured verbatim). **Schema validation:** the header must be exactly the baseline 8 columns plus any subset of the optional columns, each in its defined position (contracts §2). ANY other header (unknown column names, wrong order, missing baseline column — including pre-v2 schemas with `Files stt` / `Site` / `Module` as fixed columns) → STOP and report:

     ```text
     Dashboard schema không khớp contracts §2 (schema v2).
     Header hiện tại: <header>
     Header hợp lệ:   [Site] | <ID label> | Folder ID | [Module] | Tên feature/UC | In scope? | Tài liệu nguồn | Review stt | Scenario stt | TC stt | [API stt] | [Automation stt] | [Execute stt]

     Skill không tự sửa schema. Cách xử lý: đổi tên file dashboard cũ (giữ làm tham khảo) rồi chạy lại /qc-dashboard-sync để bootstrap file mới từ template.
     ```

     Existing cell values in valid-schema dashboards are NOT reused as caches — every status cell is recomputed from disk this run (contracts §5). Only `Execute stt` may retain its previous value per its §5 rule, and `In scope?` / user-edited identity cells are preserved per the Phase 2 bucket rules.
   - If the dashboard file does NOT exist: skip parsing. `featureIndex` is empty. The `<ID label>` will be determined in Phase 0.6 from the handoff and a user prompt.

   Build `folderIDIndex = Map<EffectiveFolderID → FeatureID>` from `featureIndex` (effective Folder ID per contracts §2: `Folder ID` cell if non-blank, else the `<ID label>` cell) so Phase 1 can match observed folders back to existing rows even when the on-disk folder uses an alias.
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
   - `proceed` — chay sync voi du lieu hien tai. Cac gap nay duoc bao luu trong site-map-handoff.md va qc-site-map.md de QC Lead theo doi rieng; dashboard.md chi giu feature list va cac cot trang thai.
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
4. Write the populated template to the resolved `qc-dashboard` path. The body table is empty at this point (baseline 8 columns; optional columns are injected later in Phase 5 when their conditions hold).
5. Re-parse the freshly written dashboard so `featureIndex` is initialized (empty map) and `<ID label>` is captured verbatim for write-back. Run schema validation.

**B. Dashboard EXISTS with `labelMigrationNeeded == true` — relabel:**

1. Do NOT prompt the user. Top-down is canonical: silently migrate.
2. In-memory only (the actual write happens in Phase 5):
   - Set `<ID label>` to `expectedLabel`.
   - Append a migration note to be inserted into the ghi-chú block in Phase 5:

     ```text
     > **<YYYY-MM-DD> — ID label migration**: dashboard duoc re-label tu `<existingLabel>` sang `<expectedLabel>` do site-map-handoff dung prefix `<handoffDominantPrefix>` lam canonical. Cac row pre-existing co ID o dang cu duoc giu nguyen (khong auto-rename). Neu can map sang ID prefix moi, QC Lead vui long doi chieu manual voi qc-site-map.md hoac project-context-master.md. Co the ghi tracking note dang `(orig: <old-ID>)` ngay sau cot `Tên feature/UC` cua row tuong ung.
     ```
3. `featureIndex` (parsed in Phase 0 step 5) is kept as-is; existing rows retain their original ID values in the `<ID label>` column. Phase 1 disk scan + Phase 2 reconcile will still pick up new handoff rows correctly using the handoff's own IDs.

**C. Dashboard EXISTS with `labelMigrationNeeded == false`:** skip Phase 0.6 entirely.

Update worklog: `Status = Phase 0.6 done`.

### Phase 1 — Disk Scan (collect observed IDs)

1. Resolve the parent folders of these 5 path-registry logical names — these are the on-disk sources for orphan detection:
   - `requirement-files` (covers Specs + WF) — **layout differs**: per the registry, its parent contains MODULE folders (`<MOD-ID>/`) holding per-UC FILES (`UC-<ABC>-XXX.md`); handled in Step 2c (contracts §1).
   - `uc-review-report` (covers Audited)
   - `func-test-scenarios` (covers Scenario)
   - `func-test-cases-md` (covers TC md)
   - `func-test-cases` (covers TC xlsx; skip if same parent as `func-test-cases-md`)
   The four QC sources use per-`<UC-ID>` sub-folders (portion before `<UC-ID>` = the parent). For each existing parent folder, list immediate sub-folder names.

2. **Exclude + extract Folder ID from each sub-folder name (QC sources) / UC-file basename (`requirement-files`, Step 2c)** using a regex list built dynamically from the project's actual ID patterns. Different sources may name the same UC differently — e.g., BA uses compound names like `UC-CLY-005_LoyaltyRules` or `UC1_TrangChuDashboard`, while QC uses bare IDs like `UC-CLY-005` or `UC1`. A single dự án may use multiple ID formats simultaneously (e.g., `UC-CLY-005` for new modules + legacy `F-100`). The skill MUST extract a Folder ID and use it as the link to the dashboard row (effective Folder ID, contracts §2).

   **Step 2a — Build `regexList` (dynamic pattern detection):**
   - Source IDs for pattern detection:
     - Top-down: all `Feature ID` values from `handoffList` (Phase 0 step 4) PLUS all `<ID label>` column values from existing `featureIndex`.
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

   **Step 2b — For each sub-folder name `<folderName>` of the four QC sources (`uc-review-report`, `func-test-scenarios`, `func-test-cases-md`, `func-test-cases`):**
   - **Exclude** the folder if it satisfies ANY of (this exclusion list is shared with Step 2c):
     - Equals the basename (or any path segment) of the `requirement-common-files` resolved path.
     - Starts with `Common`, `Shared`, `_template`, `Old`, `Archive`, `_`, `.` (case-insensitive).
   - **Extract Folder ID** — try each regex in `regexList` order (first match wins); take capture group 1.
   - If NO regex matches → fall back to `Folder ID = <folderName>` verbatim. Do NOT silently skip — these folders are exactly the orphans that `qc-site-map` Mode 3 needs to reconcile.
   - Record the mapping in `sourceFolderMap[<sourceArtifact>][<folderID>] = <full folder path>`. `<sourceArtifact>` is one of `requirement-files | uc-review-report | func-test-scenarios | func-test-cases-md | func-test-cases`. The same `<folderID>` may legitimately resolve to different folder paths across sources (e.g., `requirement-files/AUTH/` (module folder holding `UC-CLY-005.md`) and `uc-review-report/UC-CLY-005/` both map to Folder ID `UC-CLY-005`).
   - If two folders within the SAME source extract to the same Folder ID → warn in the run report and pick the first encountered (lexicographic order); user must resolve manually.

   **Step 2c — `requirement-files` layout handling (contracts §1):** for each immediate sub-folder `<folderName>` of the `requirement-files` parent, after applying the Step 2b exclusion list:
   - **Folder name matches a `regexList` pattern → SECONDARY per-UC-folder layout (backward compat):** treat exactly like Step 2b — extract the Folder ID from the folder name (capture group 1) and record `sourceFolderMap[requirement-files][<folderID>] = <folder path>`.
   - **Otherwise → PRIMARY layout — scan the folder's FILES:** every file whose basename matches a `regexList` pattern is one UC; capture group 1 = the UC-ID (e.g., `UC-AUTH-001.md` → `UC-AUTH-001`, `UC-AUTH-001_login.md` → `UC-AUTH-001`). Skip files matching the `requirement-common-files` patterns (`frd.md`, `common-rules.md`) or the Step 2b exclusion prefixes. Record `sourceFolderMap[requirement-files][<UC-ID>] = <MODULE folder path>` — the UC's source folder is its MODULE folder (also remember the matched UC file for Phase 3a). A module folder containing ≥1 UC-pattern file is a **CONTAINER**: it is NEVER an orphan candidate and its own name (e.g., `AUTH`) is NEVER recorded as a Folder ID.
   - **Orphan candidates** = items matching neither the UC pattern nor the exclusion list: a sub-folder that matches no regex AND contains no UC-pattern file → `Folder ID = <folderName>` verbatim (as in Step 2b); a loose non-excluded file matching no regex → `Folder ID = <file basename without extension>`. Do NOT silently skip — these are exactly the orphans `qc-site-map` Mode 3 reconciles.

3. Build `observedFolderIDs = Set<FolderID>` deduplicated as the union of `<folderID>` keys across all 5 source maps.

4. **Resolve Folder ID → canonical Feature ID** for each observed folder, using this lookup chain (first match wins):
   - `aliasIndex[folderID]` (from handoff `Folder alias(es)`)
   - `folderIDIndex[folderID]` (from existing dashboard rows' effective Folder ID)
   - handoff `FeatureID == folderID` (direct match — the default case where the folder is named by the canonical ID)
   - existing dashboard `featureIndex[folderID]` (legacy direct match)
   - **No match → orphan**: this folder is not yet linked to any canonical ID. Treat its canonical ID as the Folder ID itself (`canonicalID := folderID`) and mark this row for inclusion in the orphan handoff (see Phase 4).

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
| **MATCH-WITH-FOLDER** | canonicalID ∈ (handoffFeatures ∪ existingFeatures) AND ∃ folderID with `folderToFeature[folderID] = canonicalID`. | Update row (creating it if only in handoff). `Folder ID` cell = the matched folderID if it differs from canonicalID, else BLANK (contracts §2). Run Phase 3a scan over that folderID's paths → `scanResult` → `Tài liệu nguồn`. Copy `In scope?` from handoff if present, else preserve existing value. |
| **HANDOFF-ONLY** | canonicalID ∈ handoffFeatures AND no observed folder maps to it. | Create row from handoff values. `Folder ID` cell = first alias in handoff `Folder alias(es)` if any (differs from canonicalID), else BLANK. `Tài liệu nguồn` = `Chưa có tài liệu` (nothing on disk). `In scope?` from handoff. |
| **EXISTING-NO-FOLDER** | canonicalID ∈ existingFeatures AND canonicalID ∉ handoffFeatures AND no observed folder maps to it. | Preserve row as-is. Run Phase 3a over the row's effective Folder ID — typically nothing found → `Chưa có tài liệu`, status cells blank per §5. **In scope? NOT auto-changed**; user can manually edit if the feature is truly gone. Surface row in Phase 6 report under "Features no longer in handoff" so user is aware. |
| **ORPHAN-FOLDER** | folderID ∈ observedFolderIDs AND `folderToFeature[folderID] = folderID` (= no canonical match found). | Create row with `<ID label>` = folderID, `Folder ID` cell = BLANK (equal to col 1), `In scope? = Need confirm`. Run Phase 3a scan → `Tài liệu nguồn`. **Add folderID to `orphanQueue`** for Phase 4 export to `dashboard-orphans.md`. |

Notes:
- A folder that appeared on disk for a feature whose `In scope?` was previously `No` is still scanned — the status cells always reflect disk reality regardless of scope. The user keeps full control of `In scope?` via manual edit.
- "Folder fully removed" (canonicalID was in existingFeatures with a folder but no folder matches it now) is the **EXISTING-NO-FOLDER** bucket above. Surface in report, do not auto-change scope. Because status cells are recomputed from disk every run (contracts §5), the row's Review/Scenario/TC cells go blank on their own — no stale values survive.

Update worklog: `Status = Phase 2 done`.

### Phase 3a — Disk scan per row (`scanResult` + `Tài liệu nguồn`)

For each row, run the artifact sub-scans (6 UI + 4 API khi parent folder tồn tại — contracts §3) against its effective Folder ID. Each sub-scan looks inside the folder path recorded for that Folder ID in `sourceFolderMap[<sourceArtifact>][<folderID>]` (from Phase 1). If no folder path was recorded for that source (the source has no folder matching the Folder ID — e.g., BA has `UC1_TrangChuDashboard` but QC never created `UC1/` in `func-test-scenarios`) → that sub-scan returns no result (artifact absent) without attempting to read disk. Otherwise the sub-scan returns `V<max-N>` when matching files are found, or no result when none.

**`requirement-files` PRIMARY layout (UC = file in a module folder, Phase 1 Step 2c):** the recorded path is the MODULE folder — restrict the `Specs`/`WF` matches to the UC file itself plus same-folder files whose basename starts with the row's UC-ID (e.g., `UC-AUTH-001_wireframe.png`). Sibling UCs' files in the same module folder are NEVER counted. The UC's spec file itself (e.g., `UC-AUTH-001.md`) counts as `Specs` (version per the table below; no `_v<N>` suffix → v1) — a row whose UC file exists must never render `Chưa có tài liệu`.

| Item | Source artifact (folder via `sourceFolderMap`) | Match | Version detection |
|---|---|---|---|
| `Specs` | `requirement-files` | `.md`, `.docx`, `.pdf` — EXCLUDE files with `_extracted_` in name; EXCLUDE image extensions | `_v<N>` (case-insensitive) in filename; absent → treat as v1 |
| `WF` | `requirement-files` | `.png`, `.jpg`, `.jpeg`, `.fig`, `.figma`, `.svg`, `.gif`, `.webp`, `.xd` | Same |
| `Audited` | `uc-review-report` | filename contains `_audited_` AND ends `.md` | Same |
| `Scenario` | `func-test-scenarios` | filename contains `_scenarios_` | Same |
| `TC md` | `func-test-cases-md` | filename matches the canonical pattern `<UC>_<feature>_testcases_<variant>_<YYYYMMDD>_v<N>.md` (latest = highest version; the `_testcases_` glob never matches `_api-testcases_` — `api-` is prefix-attached, no `_` before `testcases`) | Same |
| `TC xlsx` | `func-test-cases` | filename matches `_testcases_*_v<N>.xlsx` | Same |

Store the results in `scanResult[<effectiveFolderID>]` (contracts §3). `V<N>` is always the highest version present on disk **right now** — the scan never compares against previous cell values, so deletions and downgrades are reflected immediately.

Compose the `Tài liệu nguồn` cell from `scanResult` — cell value/format per contracts §3 (Specs/WF only). The `Audited` / `Scenario` / `TC md` / `TC xlsx` results are NOT rendered here — they feed Phase 3b.

Update worklog: `Status = Phase 3a done`.

### Phase 3b — Status columns (in-progress check + done-state, no caching)

This phase populates `Review stt`, `Scenario stt`, `TC stt`, `API stt` (when API design artifacts exist), and — when the automation project exists — `Automation stt` and `Execute stt`. **Every value is recomputed from disk this run** (contracts §5); there is no version cache and no sparse-parse shortcut. This is what keeps the dashboard correct when users delete old artifact versions and regenerate from v1.

For every dashboard row (`<UC-ID>` = the row's effective Folder ID), and for each applicable status column:

#### Step 1 — In-progress check

Check whether `.claude/skills/<owner-skill>/process-logging/<UC-ID>/progress.md` exists (owner-skill mapping in contracts §4). If yes → read it, extract the `status:` line per the contracts §4 parse algorithm, and set the cell to the raw status string. SKIP step 2 for this column.

#### Step 2 — Done-state derivation (only when in-progress file is absent)

Apply the per-column rule from contracts §5 using `scanResult` from Phase 3a — cell value/format for EVERY column: per contracts §5, per column. Operational order:

- **`Review stt` / `Scenario stt` / `TC stt`** — from the UI results in `scanResult` (only `Review stt` parses file content, via the contracts §5 audited parse contract).
- **`API stt`** (only when API design artifacts exist) — from the API artifact scan; the audited part uses the contracts §5 api-audited parse contract (the parse contract lives ONLY there).
- **`Automation stt` / `Execute stt`** (only when the automation project exists) — spec count / run-summary read per contracts §5 (`Execute stt` keeps its previous cell when the summary is missing or lacks the UC).

Any grep/parse failure → the contracts §5 fallback cell + a warning collected for the Phase 6 report.

#### Step 3 — Optional column injection check

- If `automation-root` (resolved via `path-registry.md` — `docs/qc/automation/`) exists AND the dashboard header lacks `Automation stt` and/or `Execute stt` → mark them for injection.
- If any file matching `*_api-audited_*` or `*_api-testcases_*` exists in any per-`<ID>` folder AND the header lacks `API stt` → mark it for injection.
- If `distinctSites` (Phase 0 step 4) has >1 value AND the header lacks `Site` → mark `Site` for injection.
- If `distinctModules` has >1 value AND the header lacks `Module` → mark `Module` for injection.
- Collect the marks as `columnsToInject` for Phase 5. Columns already present are never removed, even if their condition no longer holds.

#### Step 4 — Store results

Store the computed values in `statusCells[<rowID>][<columnName>] = formattedValue`. Phase 5 writes them into the rendered table.

**Cost note:** negligible — per the contracts §5 cost note; plus the per-UC `progress.md` checkpoint reads (small) and one summary-table read when the automation project exists. No full-report parses.

Update worklog: `Status = Phase 3b done`.

### Phase 4 — Export orphan handoff (no user prompt)

This skill is non-interactive after Phase 0.5. Phase 4 performs ONE write outside of `qc-dashboard.md`: it exports the `orphanQueue` (from Phase 2's `ORPHAN-FOLDER` bucket) to the inbox of `qc-site-map`.

1. If `orphanQueue` is empty → skip the file write and continue to Phase 5.
2. Otherwise, resolve the output path `.claude/skills/qc-site-map/inbox/dashboard-orphans.md`.
3. **Append + dedupe semantics:**
   - If the file does NOT exist → create it from the contracts §6b schema. Write each orphan as one row; its `Files stt` cell uses the full 6-type multi-line format from `scanResult` (contracts §3, orphan-handoff consumer).
   - If the file EXISTS → parse its existing table. For each Folder ID in `orphanQueue`:
     - If the Folder ID already has a row → update only the `Detected at` cell to the current ISO timestamp; do NOT duplicate.
     - Else → append a new row.
   - Preserve frontmatter; update `generated_at` to the latest run timestamp.
4. Record `orphanQueue` count for the Phase 6 report.

Update worklog: `Status = Phase 4 done`.

### Phase 5 — Compose sort + write Dashboard

This skill is the SOLE writer of every column in the dashboard. Phase 5 injects any pending optional columns, composes the final row order via the `Sorting:` directive, writes all cells, and persists to disk.

#### Step 1 — Optional column injection

For each column in `columnsToInject` (Phase 3b Step 3), insert it at its contracts §2 position (`Site` before `<ID label>`; `Module` after `Folder ID`; `API stt` after `TC stt`; `Automation stt` after `API stt` (or `TC stt`); `Execute stt` last). Pre-existing rows get blank cells in freshly injected columns; `Site`/`Module` values for rows present in the handoff are filled from `handoffList` in Step 4.

#### Step 2 — Compute sort order

Apply the contracts §7 algorithm:

1. Use `distinctSites` / `distinctModules` (Phase 0 step 4) and the set of columns now present.
2. Read any pre-existing `Sorting:` line from the in-memory parsed dashboard.
3. Decide the sort level + the `userSortList` per the §7 re-run logic. If no pre-existing line OR re-run logic triggers fresh generation → auto-generate alphabetical ascending of the chosen level.
4. Record the final `sortLevel` (`Site` | `Module` | `None`) and `sortList`.
5. If `sortLevel == None` (single-portal single-module case) and a pre-existing `Sorting:` line is present → mark it for removal with a notice in Phase 6 output.

#### Step 3 — Apply sort to rows

1. Group rows by their value at `sortLevel`:
   - For each group in the order given by `sortList`, append the group's rows.
   - Append any rows whose level-value is not in `sortList` last, alphabetical ascending.
2. Within each group, sort by the next-lower level alphabetically (`Site` → sub-sort by `Module` ascending when that column exists; then by canonical ID ascending). If `sortLevel == Module`, sub-sort by canonical ID ascending. If `sortLevel == None`, sort all rows by canonical ID ascending.

#### Step 4 — Render the table

For every row, write ALL columns:

- Identity columns (`Site` / `<ID label>` / `Folder ID` / `Module` / `Tên feature/UC` / `In scope?`) with the values computed in Phases 0–2 (bucket rules) — `Site`/`Module` from `handoffList` where available.
  - `<ID label>` = canonical Feature ID.
  - `Folder ID` = BLANK when the on-disk folder ID equals the canonical ID; otherwise the folder-extracted ID verbatim (contracts §2).
  - `In scope?` = copied from handoff (top-down) or `Need confirm` (ORPHAN-FOLDER bucket) or preserved (EXISTING-NO-FOLDER bucket).
- `Tài liệu nguồn` from Phase 3a.
- Status columns from Phase 3b's `statusCells` map. No value computed → BLANK (`Execute stt`: previous value kept per contracts §5).
- Preserve the header row, applying label migration if `labelMigrationNeeded` was set in Phase 0.6 case B.

#### Step 5 — Write `Sorting:` directive

- If `sortLevel != None` → write the line `Sorting: <v1> >> <v2> >> ...` immediately above the table header. Place it on its own line with one blank line on each side.
- If `sortLevel == None` AND a pre-existing `Sorting:` line was present → remove it.
- If `sortLevel == None` AND no pre-existing line → write nothing.

#### Step 6 — Preserve notes block + write file

- Preserve the ghi-chú/notes block below the table verbatim (do not rewrite from template). If a label migration note was prepared in Phase 0.6, append it to the END of the ghi-chú block as a new bullet — do not overwrite existing notes.
- Write back to the `qc-dashboard` path. In-place edit.

Update worklog: `Status = Phase 5 done`. Add `qc-dashboard.md` to the Output column. If `orphanQueue` was non-empty in Phase 4, also append `dashboard-orphans.md` to the Output column.

### Phase 6 — Cleanup & Handover

1. **Do NOT delete `site-map-handoff.md`.** Lifecycle ownership rule: `qc-site-map` is the sole writer and deleter (it overwrites the file in its own Workflow 3 (§3.6)). Leaving the file in place means the user can manually re-run `/qc-dashboard-sync` after editing artifacts on disk, without being forced to re-run the entire top-down chain.
2. **Do NOT delete `dashboard-orphans.md`.** Lifecycle ownership rule: `qc-site-map` Mode 3 is the sole deleter (it removes the file after reconciling every entry). Top-down may have appended new entries this run; those persist until Mode 3 runs.
3. Output the summary:
   ```
   ✅ **Dashboard sync hoàn tất.**

   **Thay đổi:**
   - New rows added (top-down handoff):           <N>  (<list canonical IDs>)
   - Orphan folders appended to site-map inbox:   <N>  (<list Folder IDs>)
   - Features in dashboard không còn trong handoff (cần user review): <N>  (<list canonical IDs>)
   - Status cells changed so với lần sync trước:  <N>  (<list "col:UC-ID" entries, max 10 then "... và <K> mục khác">)
   - Cột optional auto-inject lần này:            <None | Site / Module / API stt / Automation stt / Execute stt>
   - Cảnh báo (checkpoint không đọc được, audited/api-audited thiếu dòng Tổng điểm hoặc Verdict, folder trùng ID...): <N> (<list>)

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
   - If any new row has blank Site/Module/Tên OR any row at `Need confirm`:
     ```
     📋 **Cần user xử lý manual:**
     - <N> row mới có cột Site / Module / Tên feature/UC TRỐNG — vui lòng cập nhật trực tiếp trong dashboard.
     - <N> row đang ở `Need confirm` — sẽ tự resolve sau khi `qc-site-map` Mode 3 chạy, hoặc bạn có thể edit thủ công thành Yes / No.
     ```
5. Update worklog: `Status = Done`. Fill Duration.
