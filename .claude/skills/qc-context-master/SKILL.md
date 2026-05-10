---
name: qc-context-master
description: Generates and maintains the project's knowledge core — project-context-master.md (10-section project context distilled from common files) and feature-scope.xlsx (Feature list with append-only/soft-delete + Input readiness row 2). Auto-triggered by qc-project-onboarding after meta-config is set up. Also invoke directly when the user wants to regenerate or update project context, sync feature list with WBS, or resolve open questions. Trigger on /qc-context-master, "tổng hợp project context", "update project context", "update feature scope", "đồng bộ feature list".
---

# QC Context Master Skill

## Trigger Conditions

- **Auto-triggered** by `qc-project-onboarding` immediately after Steps 1 & 2 complete and pre-flight passes.
- **Manually invoked** when the user:
  - Types `/qc-context-master`.
  - Says "tổng hợp project context", "update project context", "update feature scope", "đồng bộ feature list", "sync feature scope".

## Inputs
Read the `path-registry.md` file to find below files if the path is not already mentioned:
- `High-level-files`
- `requirement-common-files`
- Existing `config/project-context-master.md` (if any)
- Existing `feature-scope`
- Existing `config/project-config.md` (cross-reference for §1, §4, §8)
- Site abbreviation mapping (auto-managed): `.claude/skills/qc-context-master/state/site-abbreviations.md`
- Template `/skills/qc-context-master/templates/project-context-template.md`

## Outputs
Read the `path-registry.md` file to find below files if the path is not already mentioned:
- `project-context-master`
- `feature-scope`
- `skills/qc-context-master/state/site-abbreviations.md`: Append-only mapping table.

## Workflow

### Phase 0 — Silent Audit (NO user-facing output)

Run silently — do NOT print any audit table.

1. Read existing `project-context-master` (if any) and `feature-scope` (if any).
2. Determine `mode`:
   - **First-time generation** — `project-context-master` does not exist or is empty.
   - **Update run** — file exists with real content.
3. Proceed directly to Phase 1.

### Phase 1 — Pre-flight Check

1. Resolve `High-level-files` logical name. If unconfigured, folder missing, or empty → STOP and output:
   > "Không tìm thấy High-level files (WBS, Product Brief, System Architecture Diagram, Tech Stack, ...) tại `<path>`. Vui lòng chuẩn bị các tài liệu này, sau đó chạy lại `/qc-context-master`."

2. Resolve `feature-scope` logical name. If file does not exist, → STOP and output:
   > "Không tìm thấy Feature Scope tại `<path>`. Vui lòng chạy cung cấp file sau đó chạy lại `/qc-context-master`."

3. Read template `.claude/skills/qc-context-master/templates/project-context-template.md`.

### Phase 2 — Greeting

Output exactly ONE of the two greeting blocks below (verbatim — hard-coded):

#### Greeting A — First-time generation

```
Bắt đầu tổng hợp tri thức dự án.

Tôi sẽ:
1. Đọc common files (WBS, Product Brief, System Architecture Diagram, Tech Stack, ...) tại `<High-level-files path>`.
2. Trích xuất 10 mục cho `project-context-master.md`.
3. Đồng bộ `feature-scope.xlsx`: thêm features mới từ WBS, soft-delete features đã bị remove.
4. Hỏi bạn các điểm còn thiếu — phần nào không trả lời được sẽ ghi vào Open Questions.

Bắt đầu...
```

#### Greeting B — Update run

```
Đồng bộ tri thức dự án.

Tôi sẽ:
1. Re-read common files để check cập nhật.
2. Carry-over Open Questions từ lần trước, resolve những câu giờ đã có data.
3. Đồng bộ `feature-scope.xlsx`: append features mới, soft-delete features bị remove, re-add nếu cần.
4. Refresh các mục `project-context-master.md` từ nội dung mới nhất.

Bắt đầu...
```

### Phase 3 — Detect Output Language

Follow `global-rules.md` to define the `project-context-master.md` language (keep template headers as-is in English).

### Phase 4 — Carry-over from Previous Run

If `project-context-master.md` exists:
1. Read Section 10 `Open Questions` table.
2. For each row with status `Open`, attempt to resolve from current common files.
3. Resolved → set status to `Resolved` (DO NOT delete the row — preserve audit trail).
4. Still unresolved → keep status `Open`; will re-ask in Phase 6.
5. Question IDs: keep originals (Q-001, Q-002, ...). New questions continue from `max(ID) + 1`.

### Phase 5 — Site Mapping + Feature List Sync

#### 5.1 Read / initialize site abbreviation mapping

Read `.claude/skills/qc-context-master/state/site-abbreviations.md`. If missing, create with header:

```
# Site Abbreviations

> Auto-managed by qc-context-master. DO NOT edit manually.

| Full name | Abbreviation | First seen |
|---|---|---|
```

#### 5.2 Detect sites from common files

Scan WBS / Product Brief / Architecture Diagram for site/portal mentions (User, Admin, App, Mobile, Web, Vendor, ...). Normalize: trim + Title-case. For each site:
- Already in mapping → use stored abbreviation.
- New site, name ≤ 4 chars → use as-is, append to mapping.
- New site, name > 4 chars → ask user: `"Site '<full name>' viết tắt thành gì? (gợi ý: <first 4 chars>)"`. Append answer to mapping.

The mapping is the source of truth for Feature ID prefixes in 5.3.

#### 5.3 Update Feature list sheet

Schema (15 columns A–O — DO NOT alter):
| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Feature ID | Site | Module | Screen name | API | Feature | Actor / Role | Requirement Refs | Wireframe Refs | Priority | Risk Level | Complexity | In Scope? | Confidence | Notes / Assumptions |

Logic:

1. **Read existing rows.** Compute `max_id_number` = highest XXX across all existing Feature IDs (regardless of site prefix).

2. **Extract candidates** (site, feature) pairs from WBS / Product Brief / Architecture.

3. **Match against existing rows** by `(Site, Feature)` (case-insensitive normalized).

4. **For each candidate:**
   - Already exists → SKIP (preserve manual edits).
   - New → reserve Feature ID = `<site-abbr>-<XXX>` where XXX = `max_id_number + 1` (then increment `max_id_number`). Fill 15 columns best-effort from common files. Default M = `Yes`. For any column where info is missing, leave blank and add a corresponding row to Section 10 Open Questions (e.g., `"User-005 — missing Risk Level"`).

5. **Group new rows by site, then append.** Sort the batch of new rows by Site (alphabetical) before appending to the bottom of the sheet. Do NOT reshuffle existing rows.

6. **Soft-delete sweep:** for every existing row with `M = "Yes"` whose `(Site, Feature)` is NO LONGER present in current common files:
   - Set `M = "No"`.
   - Append note to `O`: `"[YYYY-MM-DD] Removed from WBS — soft-deleted."`. Preserve any prior note text (newline-append).

7. **Re-add sweep:** for every existing row with `M = "No"` whose `(Site, Feature)` IS present again:
   - Set `M = "Yes"`.
   - Append note to `O`: `"[YYYY-MM-DD] Re-added to WBS."`.

> The skill NEVER deletes rows. Manual edits in any column EXCEPT M (and append-only on O when soft-delete/re-add fires) are preserved.

### Phase 6 — Extract project-context Sections + Interview

#### 6.1 Extraction priority

For each section, follow this priority: `High-level-files` → `requirement-common-files` → `project-config.md` → ask user.

| § | Section | Primary source | Required? |
|---|---|---|---|
| 1 | Project Identity (project name, ID, product name, release version, project type, domain) | project-config.md §1 + common files | ✅ Required |
| 2 | Business Goal (goal, problem/pain point, success criteria) | Product Brief, WBS | ✅ Required |
| 3 | Scope Summary (in scope, out of scope, assumptions, dependencies) | WBS, Product Brief, common rules | ✅ Required |
| 4 | Users and Roles (table: role, description, permissions, workflows) | Architecture, common files, project-config.md §5 | ✅ Required |
| 5 | System Overview (architecture summary; embed Sites table from mapping; link to feature-scope file) | Architecture, Tech Stack | ✅ Required |
| 6 | Requirement Sources (table: PRD/BRD, wireframe, API spec, business rules, change log) | path-registry.md + ask user | ✅ Required |
| 7 | Quality Context (critical flows, high-risk areas, NFR notes, known constraints) | common files | ✅ Required |
| 8 | Environment Context (platform coverage, test environments) | project-config.md §4 + common files | ✅ Required |
| 9 | QC Process Notes (test levels, entry/exit criteria, defect workflow, reporting) | common files | ✅ Required |
| 10 | Open Questions | populated dynamically from gaps in §1–§9 | — |

For Section 5 specifically:
- Embed the `Sites` sub-table from the site-abbreviations mapping (just `Full name | Abbreviation`).
- End with a line linking to the feature-scope file using the path resolved from path-registry.

#### 6.2 Show consolidated gap table + ask user

Show the user ONE table of GAPS (sections where common files do not provide enough info), then ask:

```
**Tổng hợp project-context — các điểm cần bạn cung cấp / xác nhận:**

| § | Mục | Thông tin còn thiếu |
|---|---|---|
| 2 | Business Goal | Success criteria chưa rõ trong Product Brief. |
| 4 | Users and Roles | Permissions của role 'Vendor' chưa nêu. |
| ... |

👉 Bạn cung cấp ngay được mục nào? Trả lời theo định dạng:
- §<N>: <nội dung> hoặc "chưa có" hoặc "để sau"
```

Behavior per answer:
- User provides text → fill that section directly; if there is a corresponding Open Question carried over, mark it `Resolved`.
- "chưa có" / "để sau" → leave a placeholder in that section + add a row to Section 10 Open Questions with status `Open` (new ID continuing the sequence).

All 10 sections are required, but unresolvable info is acceptable as Open Questions — do NOT block the skill.

### Phase 7 — Update Input readiness Row 2

Schema (6 columns A–F — DO NOT alter):
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Feature ID | Input Needed | Status | Current status | Next Action | Owner |

Row 2 is the dedicated row for `project-context-master.md` readiness. The skill ONLY updates columns C, D, E. Do NOT touch A2 (blank), B2 (`"Project context"`), F2 (`"QC"`).

Determine status:
- **All 10 sections fully filled, no Open Questions with status `Open`:**
  - C2 = `"Ready"`
  - D2 = `"Completed with full content for all sections."`
  - E2 = `"—"`
- **Some sections placeholder OR ≥1 Open Question still `Open`:**
  - C2 = `"Partial"`
  - D2 = comma-separated list of section §s with gaps (e.g. `"§2 (Business Goal), §7 (Quality Context)"`)
  - E2 = short next action (e.g. `"User to provide Business Goal success criteria; finalize NFR list."`)

The skill does NOT add or modify any other rows in `Input readiness`.

### Phase 8 — Write project-context-master.md

1. Render the populated template into `config/project-context-master.md`. Overwrite if exists.
2. Section 10 Open Questions table format: `| ID | Question | Impact | Owner | Status |`. Status ∈ {`Open`, `Resolved`}. IDs continue sequence; do NOT renumber resolved questions.
3. Preserve original-language labels for non-Vietnamese/English sources with English annotations in parentheses, per global-rules.

### Phase 9 — Handover

Output:

```
✅ **Tổng hợp tri thức dự án hoàn tất.**

**Tóm tắt:**
- `project-context-master.md`: <created / updated> — sections filled: <count>/10, open questions: <open count> open / <resolved count> resolved
- `feature-scope.xlsx`:
  - `Feature list`: +<N> rows mới | soft-delete: <N> | re-add: <N>
  - `Input readiness` row 2: status = <Ready / Partial>
- Site abbreviations: <list>

➡️ **Bước tiếp theo gợi ý:** chạy `qc-uc-read` để review use case đầu tiên.
```
