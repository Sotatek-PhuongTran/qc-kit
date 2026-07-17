# qc-dashboard-sync — Shared Contracts

> Title: Dashboard Sync Contracts | Created: 2026-07-02 | Updated: 2026-07-10 (v3 — API branch: `API stt` column, 4 API artifact types, both-branch spec count) | Author: Claude (QC Kit v3 rebuild) | Version: v3

Single source of truth for every schema/format/parse contract used by BOTH workflows (`workflows/top-down.md`, `workflows/bottom-up.md`). Read the sections a workflow step points to — do not duplicate these rules elsewhere.

> **v2 changes:** consolidated-display schema (`Tài liệu nguồn` replaces the 6-line `Files stt` cell), `Folder ID` blank-when-equal, `Site`/`Module` became auto-injected optional columns, ALL version-cache / sparse-parse logic removed (every cell is recomputed from disk each run — fixes the stale-cell bug when users delete old versions and regenerate from v1), legacy schema migrations removed (unknown schema → STOP).

## 1. Inputs (resolve via `path-registry.md`)

| Logical name | Role | Used for |
|---|---|---|
| `qc-dashboard` | Dashboard markdown. Created from `templates/qc-dashboard-template.md` if missing. | Read/write target. |
| `project-context-master` | Project baseline. | Top-down only — existence check (evidence the chain ran in order). Content NOT parsed; the canonical feature list comes from the handoff. |
| `requirement-files` | **PRIMARY layout (per `path-registry.md`):** parent of MODULE folders (`docs/03-modules/<MOD-ID>/`), each containing per-UC FILES (`UC-<ABC>-XXX.md`). UC-ID = the UC prefix of the file basename; the UC's source folder = its MODULE folder. Module folders containing ≥1 UC-pattern file are CONTAINERS — never orphans, their names never become Folder IDs. **SECONDARY layout (backward compat):** a sub-folder whose NAME matches the UC pattern is treated as a per-UC folder. Orphan candidates = folders/files matching neither the UC pattern nor the exclusion list. | Specs + WF scans. In the PRIMARY layout the sub-scan looks at the UC file itself + same-folder assets sharing its UC-ID prefix (never sibling UCs' files). |
| `uc-review-report` | Parent folder; per-`<ID>` sub-folders. | Audited scan. |
| `func-test-scenarios` | Parent folder; per-`<ID>` sub-folders. | Scenario scan. |
| `func-test-cases-md` | Parent folder; per-`<ID>` sub-folders. | TC md scan. |
| `func-test-cases` | Parent folder; per-`<ID>` sub-folders. | TC xlsx scan. |
| `api-audited` | Same parent as `uc-review-report` (shared folder; `*_api-audited_*` pattern). | API audit scan. |
| `api-test-scenarios` | Same parent as `func-test-scenarios` (`*_api-scenarios_*` pattern). | API scenario scan. |
| `api-test-cases-md` | Same parent as `func-test-cases-md` (`*_api-testcases_*` pattern). | API TC md scan. |
| `api-test-cases` | Same parent as `func-test-cases` (`*_api-testcases_*` xlsx pattern). | API TC xlsx scan. |
| `automation-specs` | Automation project spec folder (optional). | Automation column scan — only when the automation project exists. |
| `api-specs` + `mix-specs` | Runner API/MIX spec folders (optional). | Automation column scan — API branch. |
| `automation-run-summary` | Latest run summary from `qc-auto-run` (optional). | Execute column scan. |
| `requirement-common-files` | — | Exclusion during orphan scan (its folder/file patterns — e.g. `common-rules.md`, per-module `frd.md` — are not UCs). |

## 2. Dashboard schema

### Baseline (8 columns — always present, in this order)

| # | Column | Data source |
|---|---|---|
| 1 | `<ID label>` | handoff canonical ID (top-down) / folder ID (bottom-up, unreconciled) |
| 2 | `Folder ID` | on-disk folder name extraction — **blank when equal to column 1** (see semantics below) |
| 3 | `Tên feature/UC` | handoff (top-down) / blank (bottom-up) |
| 4 | `In scope?` | handoff verbatim (top-down) / `Need confirm` (bottom-up new row) |
| 5 | `Tài liệu nguồn` | disk scan — Specs + WF only (§3) |
| 6 | `Review stt` | in-progress check (§4) → audited-file parse (§5) |
| 7 | `Scenario stt` | in-progress check (§4) → scan result (§5) |
| 8 | `TC stt` | in-progress check (§4) → scan result (§5) |

`qc-dashboard-sync` is the SOLE writer of all columns.

### Optional columns (auto-injected; never auto-removed once present)

| Column | Position when injected | Injection condition | Data source |
|---|---|---|---|
| `Site` | Before `<ID label>` | Top-down: handoff has >1 distinct `Site / Portal` value AND column missing | handoff (top-down) / blank (bottom-up) |
| `Module` | After `Folder ID` | Top-down: handoff has >1 distinct `Module` value AND column missing | handoff (top-down) / blank (bottom-up) |
| `API stt` | After `TC stt` | Any file matching `*_api-audited_*` or `*_api-testcases_*` exists in any per-`<ID>` folder (API artifacts share the UI branch's folders — patterns are disjoint: `_audited_` never matches `_api-audited_`) AND column missing | §4 in-progress → API version scan (§5) |
| `Automation stt` | After `API stt` (or `TC stt` if no `API stt`) | `automation-root` (`docs/qc/automation/`) exists AND column missing | §4 in-progress → `.spec.ts` count, both branches (§5) |
| `Execute stt` | After `Automation stt` (or `TC stt` if no `Automation stt`) | `automation-root` (`docs/qc/automation/`) exists AND column missing | latest `automation-run-summary` row (§5) |

Injection happens in write phase (top-down Phase 5 / bottom-up step 9 — automation columns only; bottom-up never injects `Site`/`Module` because it has no handoff data). Pre-existing rows get blank cells in a freshly injected column until data is found for them. Schema validation accepts any combination of baseline + optional columns in the positions above; ANY other header → STOP and report (no auto-fix, no legacy migration).

### `Folder ID` semantics

Link between a dashboard row and the on-disk folder name. **Effective Folder ID** of a row = the `Folder ID` cell if non-blank, else the `<ID label>` cell. (Name-based — absolute positions shift when the optional `Site` column is injected.) Disk scans always match folder → row via effective Folder ID, never via canonical ID alone. Two rows MUST NOT share an effective Folder ID.

| Row origin | `<ID label>` | `Folder ID` |
|---|---|---|
| Top-down, folder name == canonical ID | Canonical Feature ID (handoff) | **blank** |
| Top-down, reconciled alias | Canonical Feature ID (handoff) | Original folder-extracted ID, from handoff `Folder alias(es)` |
| Bottom-up, freshly added | Folder-extracted ID | **blank** (equal to col 1) |
| Bottom-up, later reconciled (map to existing / new feature) | Canonical ID from updated handoff | Folder-extracted ID (verbatim) |

## 3. Disk scan result & `Tài liệu nguồn` cell format (column 5)

Each row is scanned for **up to 10 artifact types** (6 UI + 4 API — the API types only when their parent folders exist) (folder lookup per effective Folder ID; matching rules in top-down Phase 3a). The scan result is held in memory as `scanResult[<effectiveFolderID>] = { Specs: <N|absent>, WF: <N|absent>, Audited: <N|absent>, Scenario: <N|absent>, TCmd: <N|absent>, TCxlsx: <N|absent>, ApiAudited: <N|absent>, ApiScenario: <N|absent>, ApiTCmd: <N|absent>, ApiTCxlsx: <N|absent> }` where `<N>` = highest version detected on disk **right now** (deleted versions no longer count — the scan never compares against previous cell values).

Consumers of `scanResult`:

- **`Tài liệu nguồn` cell** renders ONLY `Specs` and `WF`, single line, joined by ` · `, capital `V`: e.g. `Specs V2 · WF V1`, `Specs V1`. Both absent → literal `Chưa có tài liệu`. Row never scanned yet → blank.
- **Status columns** (§5) consume `Audited`, `Scenario`, `TCmd`, `TCxlsx`; **`API stt`** consumes `ApiAudited`, `ApiScenario`, `ApiTCmd`, `ApiTCxlsx` — none of these versions are rendered in `Tài liệu nguồn`.
- **Orphan handoff** (§6b) renders the 6 UI types only (format unchanged — API types are not part of the orphan handoff) in its `Files stt` column, old multi-line format `<Type>: V<N>` joined by `<br>` in fixed order (Specs, WF, Audited, Scenario, TC md, TC xlsx); nothing found → `No files yet`.

## 4. In-progress detection (process-log parse)

For each row + each per-UC skill, with `<UC-ID>` = the row's effective Folder ID:

1. Check `.claude/skills/<skill>/process-logging/<UC-ID>/progress.md`:
   - `qc-uc-read` → `Review stt`; `qc-func-scenario-design` → `Scenario stt`; `qc-func-tc-design` → `TC stt`; `qc-api-read` / `qc-api-scenario-design` / `qc-api-tc-design` → `API stt` (when present; if several are in progress, the latest in the chain wins: tc-design > scenario-design > read); `qc-func-auto-generate` / `qc-api-auto-generate` → `Automation stt` (when present).
2. Missing → fall through to done-state derivation (§5).
3. Present → extract the `status:` line via regex `^[-*]?\s*status\s*:\s*(.+)$` (case-insensitive) → cell = captured string verbatim.
4. Present but no `status:` line → cell = `Running (status không xác định)` + warning in the end report. Parse failure → `Running (parse failed)` + warning.

File semantics: owner skills delete their `<UC-ID>/` checkpoint folder on successful completion (shared checkpoint protocol §5), so file present = active/interrupted run; absent = never-started or fully done. This skill NEVER writes those files.

## 5. Done-state derivation (recomputed from disk EVERY run — no caching)

> There is NO version cache and NO sparse-parse condition. Every cell always reflects current disk state, including downgrades (v3 deleted, regenerated as v1) and same-version regeneration (v1 deleted, new v1 with a different score). The cost is at most one `grep` + one-line read per UC with an audited file, plus two more (`Tổng điểm` + `Verdict:`) per UC with an api-audited file — negligible.

| Column | Rule |
|---|---|
| `Review stt` | No `Audited` in `scanResult` → blank. Else locate the highest-version audited file (`*_audited_*_v<N>.md` under `uc-review-report/<folder>/`), `grep -n "Tổng điểm"` it, read just that line, extract score + verdict via the parse contract below. Cell = `<verdict> v<N> · <score>/100`. Grep/parse failure → cell = `v<N> (chưa đọc được điểm)` + warning in the end report. |
| `Scenario stt` | `Scenario` in `scanResult` → `v<N>`; absent → blank. Never parses file content. |
| `TC stt` | `TCxlsx` present → `v<N>` (its version). Else `TCmd` present → `v<N> (chưa có xlsx)` (md là bản chính thức; chỉ thiếu bản Excel). Neither → blank. Never parses file content. |
| `API stt` | No API artifact in `scanResult` → blank. Else join the found parts with ` · `, in this order: **audited part** (ApiAudited present) = `<verdict> v<N> · <score>/100` parsed from the highest-version api-audited file's §9 — same grep-one-line mechanism as `Review stt`, per the api-audited parse contract below; grep/parse failure → audited part = `audit v<N> (chưa đọc được điểm)` + warning in the end report — + `scen v<M>` (ApiScenario) + `TC v<K>` (ApiTCxlsx; else ApiTCmd → `TC v<K> (chưa có xlsx)`). Only the audited part parses file content. |
| `Automation stt` | Count `.spec.ts` files for the UC in `automation-specs` + `api-specs` + `mix-specs` (cheap `ls`, every run). Cell = `<K> specs` (tổng cả 2 nhánh); zero/absent → blank. |
| `Execute stt` | `automation-run-summary` missing → keep cell verbatim (may hold user edits / last known result). Present → read the UC's row in the `Per-UC results` table: found → cell = the summary's `Result cell` value copied verbatim (producer format: `<pass>/<total> pass — <YYYY-MM-DD>`); UC absent from summary → keep cell verbatim. |

**Audited parse contract:** the scoring row matches `\|\s*\*+Tổng điểm\*+\s*\|\s*\*+(\d+(?:\.\d+)?)/100\*+\s*\|\s*\*+(Ready|Conditionally Ready|Not Ready)\*+\s*\|`. Locate via `grep -n "Tổng điểm" <file>` then read just that line — do NOT load the whole report.

**API-audited parse contract (feeds the `API stt` audited part):** locate the highest-version `*_api-audited_*_v<N>.md` in the UC's folder. Score: `grep -n "Tổng điểm" <file>` then read just that line — the §9 total row matches `\|\s*\*+Tổng điểm\*+\s*\|[^|]*\|\s*\*{0,2}(\d+(?:\.\d+)?)\*{0,2}\s*\|` (capture 1 = score; the cell before it is the Max `100`). Verdict: `grep -n "Verdict:" <file>` then read just that line — first match of `Ready|Conditionally Ready|Not Ready`. Same targeted-read mechanism as the audited parse — do NOT load the whole report. Audited part rendered as `<verdict> v<N> · <score>/100`; if either grep/parse fails → `audit v<N> (chưa đọc được điểm)` + warning in the end report.

## 6. Handoff schemas

### 6a. Top-down input — `site-map-handoff.md`

Location: `.claude/skills/qc-dashboard-sync/inbox/site-map-handoff.md`. Written by `qc-site-map`; REQUIRED in top-down mode. This skill READS it only — `qc-site-map` owns its lifecycle (overwrites on next run).

```markdown
---
source_skill: qc-site-map
handoff_type: site-map-feature-coverage
mode: initialization | update | mode-3-confirm-orphans
generated_at: <ISO-8601>
---
# Site Map Handoff for Dashboard
## Feature-level site map coverage
| Feature ID | Feature name | Site / Portal | Module | Mapped screen(s) | Folder alias(es) | In scope? | Site map status | Notes |
## Feature-level gaps
## Unmapped screens
## Dashboard update recommendation
```

- `Feature ID` → the dashboard `<ID label>` column. `Folder alias(es)`: empty = folder ID equals Feature ID (dashboard `Folder ID` stays blank); non-empty = Mode 3 reconciled a prior orphan (dashboard updates rows whose effective Folder ID matches, writing the canonical ID to `<ID label>` and keeping the alias in `Folder ID`).
- `Site / Portal` and `Module` values also drive the §2 injection condition for the optional `Site` / `Module` columns.
- `In scope?` (`Yes`/`No`/`Need confirm`) is authoritative — copied verbatim to the `In scope?` column.
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

`Files stt` here uses the full 6-type multi-line format defined in §3 (orphan-handoff consumer) — it intentionally shows more detail than the dashboard's `Tài liệu nguồn` cell, so Mode 3 reviewers see everything found on disk.

## 7. `Sorting:` directive

Single line above the table header: `Sorting: <v1> >> <v2> >> <v3>`. User-editable; runs honor edits.

**Auto-generation (first write):** if the `Site` column is present with >1 distinct value → sort level = Site; else if the `Module` column is present with >1 distinct value → Module; else no directive (rows sort by canonical ID ascending; remove any stale directive with a notice). Values: alphabetical ascending. (Because `Site`/`Module` are injected exactly when they have >1 distinct value, "column present" and "worth sorting by" coincide on first write; on later runs values may have collapsed to 1 — the directive then falls back per the re-run rules.)

**Re-run:** parse `^Sorting:\s*(.+)$` above the header; split by `>>`. Determine level by majority-match of tokens against distinct Sites vs Modules (ties → Site). Respect the user's level even if auto would pick differently. Missing values on disk → append alphabetically + notice. Tokens no longer on disk → drop + notice. Zero matches → warn + regenerate. Apply: group rows by directive order; sub-sort by next-lower level alphabetically, then canonical ID ascending. Levels below the sort level are never written into the directive.
