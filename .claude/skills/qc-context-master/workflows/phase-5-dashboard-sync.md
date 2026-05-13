# Phase 5 — Site Mapping + Feature List Sync

> **Invoked by:** `SKILL.md` after Phase 4 (Carry-over) completes.
>
> **Prerequisites loaded into memory:** `04_carryover.md` (snapshot of §10 Open Questions), resolved path-registry logical names, templates.
>
> **Deliverable (user-visible):** `qc-dashboard.md` written/updated at the path resolved via `path-registry` → `qc-dashboard`.
>
> **Checkpoint produced:** `process-logging/05_deltas.md` + `progress.md` updated.
>
> **Worklog Status transitions:** `Running (Phase 5)` → `Phase 5 done`.
>
> **Owns columns 1–5 of dashboard** (`Site`, `<ID label>`, `Module`, `Feature/Use case name`, `In scope?`). MUST NOT touch columns 6–10 (status columns owned by `qc-dashboard-sync`).

---

## Step 0 — Worklog: enter phase

Update agent-work-log row: `Status = Running (Phase 5)`. Add any new Input file paths read in this phase.

## Step 1 — Read / initialize site abbreviation mapping

Read `.claude/skills/qc-context-master/state/site-abbreviations.md`. If missing, create with header:

```
# Site Abbreviations

> Auto-managed by qc-context-master. DO NOT edit manually.

| Full name | Abbreviation | First seen |
|---|---|---|
```

## Step 2 — Detect sites from common files

Scan WBS / Product Brief / Architecture Diagram for site/portal mentions (User, Admin, App, Mobile, Web, Vendor, ...). Normalize: trim + Title-case. For each site:
- Already in mapping → use stored abbreviation.
- New site, name ≤ 4 chars → use as-is, append to mapping.
- New site, name > 4 chars → ask user: `"Site '<full name>' viết tắt thành gì? (gợi ý: <first 4 chars>)"`. Append answer to mapping.

Site values from this mapping populate column 1 of the dashboard.

## Step 3 — Sync dashboard (`qc-dashboard.md`)

Schema — exactly 10 columns; this skill OWNS the first 5 columns and MUST NOT touch the last 5:

| # | Column                     | Owner               |
|---|----------------------------|---------------------|
| 1 | `Site`                     | qc-context-master   |
| 2 | `<ID label>`               | qc-context-master   |
| 3 | `Module`                   | qc-context-master   |
| 4 | `Feature/Use case name`    | qc-context-master   |
| 5 | `In scope?`                | qc-context-master   |
| 6 | `Specs stt`                | qc-dashboard-sync   |
| 7 | `WF stt`                   | qc-dashboard-sync   |
| 8 | `Test scenario stt`        | qc-dashboard-sync   |
| 9 | `Test cases stt`           | qc-dashboard-sync   |
| 10| `Execute stt`              | — (pending)         |

### 3.A — First-time creation (dashboard does not exist)

1. Resolve `qc-dashboard` path from path-registry.
2. Detect ID convention from common files: scan for the dominant pattern (`UC-[A-Z]+-\d+`, `F-\d+`, `FEAT-\d+`, ...). If found, ask user to confirm:
   > "Phát hiện dự án dùng định danh dạng `<example>`. Tên cột định danh trong dashboard nên là gì? (gợi ý: `Use Case ID`, `Feature ID`, `Story ID`)"

   If no pattern found, ask both ID format AND column label.
3. Read template `templates/qc-dashboard-template.md`. Replace placeholder `{{ID_LABEL}}` (appears twice — header row + notes section) with the chosen label.
4. Write the populated template to the resolved `qc-dashboard` path. Body table is empty at this point (just header + separator row).
5. Proceed to Step 3.C with an empty existing-row set.

### 3.B — Update run (dashboard exists)

1. Read `qc-dashboard`. Parse the markdown table:
   - Header row → identify `<ID label>` from column 2.
   - Data rows → build `existingIndex = { ID → { row index, Site, Module, Name, In scope? } }`.
   - Capture the notes/ghi-chú block below the table verbatim for later re-render.
2. Validate column count = 10. If schema mismatch (count differs, or header column 2 label changed unexpectedly), STOP and ask user.

### 3.C — Compute deltas

Extract candidates from common files: each is `(Site, ID, Module, Feature/Use case name)`. ID is taken from the common file's own identifier (UC ID / Feature ID — whatever the project uses). If a candidate has no explicit ID in source materials, generate one following the detected convention and bump the counter.

For each candidate:
- `ID` exists in `existingIndex`:
  - If `In scope?` = `Removed` → set to `Yes`, record a re-add note.
  - Else → SKIP (preserve manual edits to Module / Name / Site).
- `ID` is new → append new row: `| <Site> | <ID> | <Module> | <Feature/Use case name> | Yes | | | | | |` (status columns deliberately blank).

For each `existingIndex` row whose ID is NOT in current candidates:
- If `In scope?` = `Yes` → set to `Removed`. Record for delta report.
- Else (`No` or `Removed` already) → leave unchanged.

> The skill NEVER deletes rows. NEVER writes to columns 6–10. Manual edits to columns 1, 3, 4 on existing rows are preserved.

### 3.D — Re-render dashboard

Compose the full markdown file:
- Frontmatter / introductory note block from template (or preserved from existing file).
- Header row with `<ID label>` preserved.
- Separator row.
- Data rows in this order: existing rows (in their original order) → new rows (sorted by Site alphabetical, then by ID).
- Notes/ghi-chú block (preserved verbatim).

Write back to `qc-dashboard` path. This is a full overwrite of the markdown file, but content is preserved row-by-row.

### 3.E — Report deltas to user

If any soft-delete or re-add happened, output a short block:
```
**Dashboard sync:**
- Mới thêm: <N> features (<list IDs>)
- Soft-deleted (In scope? → Removed): <N> features (<list IDs>) — vui lòng kiểm tra xem đây là remove cố ý hay chỉ tạm vắng khỏi WBS.
- Re-added (In scope? → Yes): <N> features (<list IDs>)
```

If none of the above happened, no output for this sub-step.

## Step 4 — Checkpoint write

Per `checkpoint-protocol.md` §4:

1. Write `process-logging/05_deltas.md` capturing the deltas block from Step 3.E plus the detected `<ID label>` and current site abbreviations.
2. Update `process-logging/progress.md` → `last_phase_done: 5`, `next_phase: 6.1`.
3. Update agent-work-log row: `Status = Phase 5 done`. Append `qc-dashboard.md` to Output column if not already present.

## Step 5 — Hand back to SKILL.md

Return control. The next dispatch is `phase-6-extract-interview.md`.
