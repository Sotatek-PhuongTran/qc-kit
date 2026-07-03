# qc-dashboard-sync — Shared Contracts

> Title: Dashboard Sync Contracts | Created: 2026-07-02 | Author: Claude (QC Kit v3 rebuild) | Version: v1

Single source of truth for every schema/format/parse contract used by BOTH workflows (`workflows/top-down.md`, `workflows/bottom-up.md`). Read the sections a workflow step points to — do not duplicate these rules elsewhere.

## 1. Inputs (resolve via `path-registry.md`)

| Logical name | Role | Used for |
|---|---|---|
| `qc-dashboard` | Dashboard markdown. Created from `templates/qc-dashboard-template.md` if missing. | Read/write target. |
| `project-context-master` | Project baseline. | Top-down only — existence check (evidence the chain ran in order). Content NOT parsed; the canonical feature list comes from the handoff. |
| `requirement-files` | Parent folder; per-`<ID>` sub-folders. | Specs + WF scans. |
| `uc-review-report` | Parent folder; per-`<ID>` sub-folders. | Audited scan. |
| `func-test-scenarios` | Parent folder; per-`<ID>` sub-folders. | Scenario scan. |
| `func-test-cases-draft` | Parent folder; per-`<ID>` sub-folders. | TC md scan. |
| `func-test-cases` | Parent folder; per-`<ID>` sub-folders. | TC xlsx scan. |
| `automation-specs` | Automation project spec folder (optional). | Automation column scan — only when the automation project exists. |
| `automation-run-summary` | Latest run summary from `qc-auto-run` (optional). | Execute column scan. |
| `requirement-common-files` | — | Exclusion path during orphan scan (its folder is not a UC). |

## 2. Dashboard schema

### Baseline (10 columns — always present)

| # | Column | Data source |
|---|---|---|
| 1 | `Site` | handoff (top-down) / blank (bottom-up) |
| 2 | `<ID label>` | handoff canonical ID / folder ID (bottom-up, unreconciled) |
| 3 | `Folder ID` | on-disk folder name extraction |
| 4 | `Module` | handoff (top-down) / blank (bottom-up) |
| 5 | `Feature/Use case name` | handoff (top-down) / blank (bottom-up) |
| 6 | `In scope?` | handoff verbatim (top-down) / `Need confirm` (bottom-up new row) |
| 7 | `Files stt` | disk scan (6 artifact types) |
| 8 | `UC review stt` | in-progress check → sparse parse of latest audited file |
| 9 | `Scenario design stt` | in-progress check → derived from Files stt `Scenario: V<N>` |
| 10 | `TC design stt` | in-progress check → derived from Files stt `TC xlsx`/`TC md` version |

`qc-dashboard-sync` is the SOLE writer of all columns.

### Optional columns (auto-injected only when the automation project exists)

| Order | Column | Data source |
|---|---|---|
| 11 | `Automation stt` | (in-progress) `qc-auto-generate/process-logging/<UC-ID>/progress.md` `status:` line / (done) count of `.spec.ts` files for the UC in `automation-specs` → `<K> spec(s)`; blank if none. |
| 12 | `Execute stt` | Latest `automation-run-summary` row for the UC → `<pass>/<total> pass — <YYYY-MM-DD>`; blank if the UC never ran. |

Injection rule: in Phase 5, if the automation project folder (resolve `automation-specs` parent via `path-registry.md`) exists AND the column is missing from the header → inject it. Manual-only projects never see these columns. Valid column counts: 10, 11, or 12.

### `Folder ID` semantics (column 3)

Link between a dashboard row and the on-disk folder name. REQUIRED per row. Disk scans always match folder → row via `Folder ID`, never via `<ID label>`. Two rows MUST NOT share a `Folder ID`.

| Row origin | Col 2 `<ID label>` | Col 3 `Folder ID` |
|---|---|---|
| Top-down, normal | Canonical Feature ID (handoff) | Same as col 2 |
| Top-down, reconciled alias | Canonical Feature ID (handoff) | Original folder-extracted ID, from handoff `Folder alias(es)` |
| Bottom-up, freshly added | Folder-extracted ID | Folder-extracted ID |
| Bottom-up, later reconciled (map to existing) | Canonical ID from updated handoff | Folder-extracted ID (verbatim) |
| Bottom-up, later reconciled (new feature) | New canonical ID minted by site-map | Folder-extracted ID (verbatim) |

## 3. `Files stt` cell format (column 7)

Single cell. List ONLY artifact types found on disk (absent types omitted), joined by `<br>`, in this fixed order: `Specs: V<N>`, `WF: V<N>`, `Audited: V<N>`, `Scenario: V<N>`, `TC md: V<N>`, `TC xlsx: V<N>`. `<N>` = highest version detected, capital `V`. If NOTHING found: literal `No files yet`.

## 4. In-progress detection (process-log parse)

For each row + each per-UC skill, with `<UC-ID>` = the row's `Folder ID`:

1. Check `.claude/skills/<skill>/process-logging/<UC-ID>/progress.md`:
   - `qc-uc-read` → col 8; `qc-func-scenario-design` → col 9; `qc-func-tc-design` → col 10; `qc-auto-generate` → col 11 (when present).
2. Missing → fall through to done-state derivation (§5).
3. Present → extract the `status:` line via regex `^[-*]?\s*status\s*:\s*(.+)$` (case-insensitive) → cell = captured string verbatim.
4. Present but no `status:` line → cell = `Running (status không xác định)` + warning in the end report. Parse failure → `Running (parse failed)` + warning.

File semantics: owner skills delete their `<UC-ID>/` checkpoint folder on successful completion (shared checkpoint protocol §5), so file present = active/interrupted run; absent = never-started or fully done. This skill NEVER writes those files.

## 5. Done-state derivation (sparse-parse, token-efficient)

Only parse an output file when its on-disk version is NEWER than the version cached in the existing cell.

| Column | Source | Sparse condition |
|---|---|---|
| `UC review stt` | Latest audited file — extract verdict + score from the `Tổng điểm` row | Parse only when Files stt `Audited: V<N>` > cached `v<M>` in the cell. Equal → keep cell verbatim. No audited file → blank. |
| `Scenario design stt` | Files stt `Scenario: V<N>` directly | Never parses file content. Format `v<N> generated`. None → blank. |
| `TC design stt` | Files stt `TC xlsx`/`TC md` version | Never parses file content. `v<N> generated`; xlsx missing but md present → `v<N> draft`. Neither → blank. |
| `Automation stt` | `.spec.ts` count for the UC in `automation-specs` | Re-count each run (cheap `ls`). Format `<K> spec(s)`. |
| `Execute stt` | UC row in `automation-run-summary` | Parse only when the summary file's date is newer than the date cached in the cell. |

**Cache extraction regex (existing cell):** `UC review stt` → `(?:Ready|Conditionally Ready|Not Ready)\s+v(\d+)\s*\(Score` (no match → cached version 0, forces re-parse). `Scenario/TC design stt` → `^v(\d+)\s+(generated|updated|draft)`. `Execute stt` → `—\s*(\d{4}-\d{2}-\d{2})$`.

**Audited parse contract:** the scoring row matches `\|\s*\*+Tổng điểm\*+\s*\|\s*\*+(\d+(?:\.\d+)?)/100\*+\s*\|\s*\*+(Ready|Conditionally Ready|Not Ready)\*+\s*\|`. Locate via `grep -n "Tổng điểm" <file>` then read just that line — do NOT load the whole report. Composed cell: `<verdict> v<auditedVersion> (Score <score>/100)`.

## 6. Handoff schemas

### 6a. Top-down input — `site-map-handoff.md`

Location: `.claude/skills/qc-dashboard-sync/inbox/site-map-handoff.md`. Written by `qc-site-map`; REQUIRED in top-down mode. This skill READS it only — `qc-site-map` owns its lifecycle (overwrites on next run).

```markdown
---
source_skill: qc-site-map
handoff_type: site-map-feature-coverage
mode: initialization | update
generated_at: <ISO-8601>
---
# Site Map Handoff for Dashboard
## Feature-level site map coverage
| Feature ID | Feature name | Site / Portal | Module | Mapped screen(s) | Folder alias(es) | In scope? | Site map status | Notes |
## Feature-level gaps
## Unmapped screens
## Dashboard update recommendation
```

- `Feature ID` → dashboard col 2. `Folder alias(es)`: empty = folder ID equals Feature ID; non-empty = Mode 3 reconciled a prior orphan (dashboard updates matching `Folder ID` rows to the canonical ID, keeping `Folder ID` as the alias).
- `In scope?` (`Yes`/`No`/`Need confirm`) is authoritative — copied verbatim to col 6.
- `Site map status` (`Mapped|Partial|Missing|Conflict|Need confirm`) is surfaced to the user in the gap review, NOT written to any cell.
- Only the coverage table feeds the feature list; the other three tables are surfaced in the Phase 0.5 gap review.

### 6b. Bottom-up output — `dashboard-orphans.md`

Location: `.claude/skills/qc-site-map/inbox/dashboard-orphans.md`. This skill is sole WRITER (append + dedupe by `Folder ID` — on duplicate, update `Detected at` only); `qc-site-map` Mode 3 is sole consumer + DELETER. Written when bottom-up adds a brand-new row OR top-down detects an orphan folder.

```markdown
---
source_skill: qc-dashboard-sync
handoff_type: dashboard-orphan-uc-list
generated_at: <ISO-8601>
---
# Dashboard Orphan UC List for Site Map
| Folder ID | Folder paths (per source) | Files stt | Detected at |
|---|---|---|---|
```

## 7. `Sorting:` directive

Single line above the table header: `Sorting: <v1> >> <v2> >> <v3>`. User-editable; runs honor edits.

**Auto-generation (first write):** if >1 distinct `Site` → sort level = Site; else if >1 distinct `Module` → Module; else no directive (rows sort by canonical ID ascending; remove any stale directive with a notice). Values: alphabetical ascending.

**Re-run:** parse `^Sorting:\s*(.+)$` above the header; split by `>>`. Determine level by majority-match of tokens against distinct Sites vs Modules (ties → Site). Respect the user's level even if auto would pick differently. Missing values on disk → append alphabetically + notice. Tokens no longer on disk → drop + notice. Zero matches → warn + regenerate. Apply: group rows by directive order; sub-sort by next-lower level alphabetically, then canonical ID ascending. Levels below the sort level are never written into the directive.
