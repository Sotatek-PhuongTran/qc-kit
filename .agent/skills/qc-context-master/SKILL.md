---
name: qc-context-master
description: Generates and maintains the project's knowledge core — project-context-master.md (10-section project context distilled from common files) and qc-dashboard.md (Feature/UC list with append-only/soft-delete; owns columns Site, ID, Module, name, In scope?). Auto-triggered by qc-project-onboarding after meta-config is set up. Also invoke directly when the user wants to regenerate or update project context, sync the feature list with the WBS, or resolve open questions. Trigger on /qc-context-master, "tổng hợp project context", "update project context", "update feature list", "đồng bộ feature list".
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
- Existing `project-context-master` (if any)
- Existing `qc-dashboard` (if any)
- Existing `config/project-config.md` (cross-reference for §1, §4, §8)
- Site abbreviation mapping (auto-managed): `.claude/skills/qc-context-master/state/site-abbreviations.md`
- Template `templates/project-context-template.md`
- Template `templates/qc-dashboard-template.md`

## Outputs
Read the `path-registry.md` file to find below files if the path is not already mentioned:
- `project-context-master`
- `qc-dashboard` — markdown table. This skill writes ONLY columns: `Site`, `<ID label>`, `Module`, `Feature/Use case name`, `In scope?`. Status columns (Specs/WF/Test scenario/Test cases/Execute) are owned by `qc-dashboard-sync` and MUST be left untouched.
- `.claude/skills/qc-context-master/state/site-abbreviations.md` — append-only mapping table.

## Workflow

### Phase 0 — Silent Audit (NO user-facing output)

Run silently — do NOT print any audit table.

1. Read existing `project-context-master` (if any) and `qc-dashboard` (if any).
2. Determine `mode`:
   - **First-time generation** — `project-context-master` does not exist or is empty.
   - **Update run** — file exists with real content.
3. Proceed directly to Phase 1.

### Phase 1 — Pre-flight Check

1. Resolve `High-level-files` logical name. If unconfigured, folder missing, or empty → STOP and output:
   > "Không tìm thấy high-level files (WBS, Product Brief, System Architecture Diagram, Tech Stack, ...) tại `<path>`. Vui lòng chuẩn bị các tài liệu này, sau đó chạy lại `/qc-context-master`."

2. Resolve `qc-dashboard` logical name from path-registry. The file does NOT need to exist yet — the skill will create it from template in Phase 5 if missing. Just verify the path is registered; if the logical name is missing from path-registry, STOP and ask the user to register it.

3. Read templates:
   - `.claude/skills/qc-context-master/templates/project-context-template.md`
   - `.claude/skills/qc-context-master/templates/qc-dashboard-template.md`

### Phase 2 — Greeting

Output exactly ONE of the two greeting blocks below (verbatim — hard-coded):

#### Greeting A — First-time generation

```
Bắt đầu tổng hợp tri thức dự án.

Tôi sẽ:
1. Đọc common files (WBS, Product Brief, System Architecture Diagram, Tech Stack, ...) tại `<High-level-files path>`.
2. Trích xuất 10 mục cho `project-context-master.md`, kèm confidence score + evidence cho mỗi mục.
3. Đồng bộ `qc-dashboard.md`: tạo file từ template nếu chưa có; thêm features mới từ WBS; soft-delete (`In scope? = Removed`) features đã bị remove. Không touch các cột status.
4. Phỏng vấn nhiều lượt (Pass A confirm → Pass B refine → Pass C direct Q&A) — mỗi lượt đều có option `skip`. Mục bị skip sẽ giữ tag `[AI-proposed]` và đẩy câu hỏi high-level vào Open Questions.

Bắt đầu...
```

#### Greeting B — Update run

```
Đồng bộ tri thức dự án.

Tôi sẽ:
1. Re-read common files để check cập nhật.
2. Carry-over Open Questions từ lần trước, resolve những câu giờ đã có data.
3. Đồng bộ `qc-dashboard.md`: append features mới, soft-delete (`In scope? = Removed`) features bị remove, re-add (`In scope? = Yes`) nếu cần.
4. Refresh các mục `project-context-master.md` từ nội dung mới nhất, re-score confidence; phỏng vấn nhiều lượt (Pass A/B/C, có `skip`) cho các mục còn thiếu hoặc còn tag `[AI-proposed]` từ lần trước.

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

Site values from this mapping populate column 1 of the dashboard.

#### 5.3 Sync dashboard (qc-dashboard.md)

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
| 10 | `Execute stt`             | — (pending)         |

##### 5.3.A First-time creation (dashboard does not exist)

1. Resolve `qc-dashboard` path from path-registry.
2. Detect ID convention from common files: scan for the dominant pattern (`UC-[A-Z]+-\d+`, `F-\d+`, `FEAT-\d+`, ...). If found, ask user to confirm:
   > "Phát hiện dự án dùng định danh dạng `<example>`. Tên cột định danh trong dashboard nên là gì? (gợi ý: `Use Case ID`, `Feature ID`, `Story ID`)"

   If no pattern found, ask both ID format AND column label.
3. Read template `templates/qc-dashboard-template.md`. Replace placeholder `{{ID_LABEL}}` (appears twice — header row + notes section) with the chosen label.
4. Write the populated template to the resolved `qc-dashboard` path. Body table is empty at this point (just header + separator row).
5. Proceed to 5.3.C with an empty existing-row set.

##### 5.3.B Update run (dashboard exists)

1. Read `qc-dashboard`. Parse the markdown table:
   - Header row → identify `<ID label>` from column 2.
   - Data rows → build `existingIndex = { ID → { row index, Site, Module, Name, In scope? } }`.
   - Capture the notes/ghi-chú block below the table verbatim for later re-render.
2. Validate column count = 10. If schema mismatch (count differs, or header column 2 label changed unexpectedly), STOP and ask user.

##### 5.3.C Compute deltas

Extract candidates from common files: each is `(Site, ID, Module, Feature/Use case name)`. ID is taken from the common file's own identifier (UC ID / Feature ID — whatever the project uses). If a candidate has no explicit ID in source materials, generate one following the detected convention and bump the counter.

For each candidate:
- `ID` exists in `existingIndex`:
  - If `In scope?` = `Removed` → set to `Yes`, record a re-add note for the user report.
  - Else → SKIP (preserve manual edits to Module / Name / Site).
- `ID` is new → append new row: `| <Site> | <ID> | <Module> | <Feature/Use case name> | Yes | | | | | |` (status columns deliberately blank).

For each `existingIndex` row whose ID is NOT in current candidates:
- If `In scope?` = `Yes` → set to `Removed`. Record for user report.
- Else (`No` or `Removed` already) → leave unchanged.

> The skill NEVER deletes rows. NEVER writes to columns 6–10 (status + execute). Manual edits to columns 1, 3, 4 on existing rows are preserved.

##### 5.3.D Re-render dashboard

Compose the full markdown file:
- Frontmatter / introductory note block from template (or preserved from existing file).
- Header row with `<ID label>` preserved.
- Separator row.
- Data rows in this order: existing rows (in their original order) → new rows (sorted by Site alphabetical, then by ID).
- Notes/ghi-chú block (preserved verbatim).

Write back to `qc-dashboard` path. This is a full overwrite of the markdown file, but content is preserved row-by-row.

##### 5.3.E Report to user

If any soft-delete or re-add happened, output a short block before continuing to Phase 6:
```
**Dashboard sync:**
- Mới thêm: <N> features (<list IDs>)
- Soft-deleted (In scope? → Removed): <N> features (<list IDs>) — vui lòng kiểm tra xem đây là remove cố ý hay chỉ tạm vắng khỏi WBS.
- Re-added (In scope? → Yes): <N> features (<list IDs>)
```

If none of the above happened, no output for this sub-phase.

### Phase 6 — Extract, Propose, and Interview

#### 6.1 Extraction priority

For each section, follow this priority: `High-level-files` → `requirement-common-files` → `project-config.md` → ask user.

| § | Section | Primary source | Required? |
|---|---|---|---|
| 1 | Project Identity (project name, ID, product name, release version, project type, domain) | project-config.md §1 + common files | ✅ Required |
| 2 | Business Goal (goal, problem/pain point, success criteria) | Product Brief, WBS | ✅ Required |
| 3 | Scope Summary (in scope, out of scope, assumptions, dependencies) | WBS, Product Brief, common rules | ✅ Required |
| 4 | Users and Roles (table: role, description, permissions, workflows) | Architecture, common files, project-config.md §5 | ✅ Required |
| 5 | System Overview (architecture summary; embed Sites table from mapping; link to qc-dashboard file) | Architecture, Tech Stack | ✅ Required |
| 6 | Requirement Sources (table: PRD/BRD, wireframe, API spec, business rules, change log) | path-registry.md + ask user | ✅ Required |
| 7 | Quality Context (critical flows, high-risk areas, NFR notes, known constraints) | common files | ✅ Required |
| 8 | Environment Context (platform coverage, test environments) | project-config.md §4 + common files | ✅ Required |
| 9 | QC Process Notes (test levels, entry/exit criteria, defect workflow, reporting) | common files | ✅ Required |
| 10 | Open Questions | populated dynamically from gaps in §1–§9 | — |

For Section 5 specifically:
- Embed the `Sites` sub-table from the site-abbreviations mapping (just `Full name | Abbreviation`).
- End with a line linking to the qc-dashboard file using the path resolved from path-registry.

#### 6.2 Confidence scoring per section

After drafting each §1–§9:

1. Score `confidence` based on coverage of required sub-items from sources:
   - **High (≥70%)** — most sub-items backed by explicit source references.
   - **Medium (40–69%)** — partial source coverage; some sub-items inferred from context.
   - **Low (1–39%)** — mostly inferred from indirect signals; minimal source backing.
   - **Empty (0%)** — no source data found at all.
2. Collect `evidence`: list of `<file> §<section/line>` references that back the draft. Empty sections have no evidence.
3. Append the tag at the END of the section's content (before the next `##` header):
   ```
   _[AI-proposed | confidence: NN% | evidence: <file §x.y>, <file §a.b>]_
   ```
   Empty sections use `evidence: —`.

This tag is the source of truth for which sections go into which interview pass and which remain pending review.

#### 6.3 Multi-pass interview

Run THREE passes in order. Each pass MUST offer a `skip` option; skipping never blocks the skill.

##### Pass A — High-confidence review (sections with confidence ≥70%)

Show ONE consolidated table:

```
**Pass A — Đề xuất confidence cao (xác nhận nhanh):**

| § | Section | Tóm tắt đề xuất (1 dòng) | Confidence | Evidence |
|---|---|---|---|---|
| 1 | Project Identity | <summary> | 90% | project-config §1; Product Brief §2 |
| 5 | System Overview | <summary> | 85% | Architecture diagram §3; Tech Stack §2 |

👉 Trả lời:
- `accept all` — chấp nhận toàn bộ.
- `modify §<N>: <nội dung sửa>` — sửa từng mục (lặp lại cho nhiều mục).
- `skip §<N>` — bỏ qua mục đó (giữ tag `[AI-proposed]`; đẩy high-level question vào §10).
- `skip all` — bỏ qua toàn bộ pass.
```

##### Pass B — Medium + Low confidence refinement (sections 1–69%)

For EACH affected section, show a block (one at a time or grouped — choose based on count; if >3 sections, group):

```
**Pass B — §<N> <Section name>** (confidence: NN%)

*Đề xuất hiện tại:*
> <content draft, 3–8 dòng>

*Evidence:* <refs>
*Còn thiếu:* <bullet list các sub-items chưa có nguồn>

👉 Trả lời:
- `<nội dung bổ sung>` — Agent merge vào draft và remove tag.
- `accept` — giữ draft hiện tại (giữ tag `[AI-proposed]`).
- `skip` — bỏ qua (giữ tag; đẩy gap thành high-level question vào §10).
```

##### Pass C — Direct Q&A for empty sections (confidence = 0%)

For EACH empty section, ask 2–4 TARGETED questions (không hỏi chung chung):

```
**Pass C — §<N> <Section name>** (chưa có dữ liệu từ common files)

Để hoàn thiện mục này, cần biết:
1. <câu hỏi cụ thể 1>
2. <câu hỏi cụ thể 2>
3. <câu hỏi cụ thể 3>

👉 Trả lời:
- Trả lời từng câu (đánh số) — Agent compose nội dung section từ answers và remove tag.
- Trả lời một phần — Agent fill phần có; phần còn lại đẩy vào §10.
- `skip` — bỏ qua mục này (placeholder `_<Pending — see Q-XXX>_`; high-level question vào §10).
```

#### 6.4 Tag lifecycle

| User action | Tag handling |
|---|---|
| `accept` toàn bộ / từng mục | **Remove** tag — content trở thành user-owned. |
| `modify §<N>: ...` (Pass A) | **Remove** tag — content user-owned sau khi merge. |
| Bổ sung nội dung (Pass B) | **Remove** tag — content user-owned sau khi merge. |
| Trả lời Q&A (Pass C) | **Remove** tag — content được compose từ answers. |
| Trả lời một phần (Pass C) | **Keep** tag với confidence cập nhật + evidence bao gồm "user input <date>"; phần còn thiếu đẩy vào §10. |
| `skip` (mọi pass) | **Keep** tag nguyên trạng — signal pending review cho run sau. |

Trong run kế tiếp (update mode), section nào còn tag `[AI-proposed]` sẽ được re-evaluate (re-score, có thể lên Pass A/B/C lại tùy confidence mới).

#### 6.5 Open Questions §10 — scope rule

Section 10 chỉ chứa câu hỏi **high-level / tổng quan** để track, KHÔNG phải mọi gap chi tiết. Detail gaps được resolve in-flow ở Pass B/C.

Ví dụ câu hỏi đủ điều kiện vào §10:
- "Stakeholder nào sẽ review/ký duyệt §<N> sau khi Agent đề xuất?"
- "Roadmap sau v1.0 đã có chưa? (ảnh hưởng scope và §2 Business Goal)"
- "Defect SLA và severity thresholds chưa được định nghĩa — cần input từ ai?"
- "Có thêm role/persona nào ngoài danh sách hiện tại không? (kéo theo cập nhật §4)"

KHÔNG đưa vào §10:
- "Permission cụ thể của role Vendor là gì?" (→ Pass B/C resolve trực tiếp).
- "Field `email` có bắt buộc không?" (→ thuộc UC detail, ngoài scope project-context).

All 10 sections are required; unresolvable info is acceptable as `[AI-proposed]` tag still present + high-level Q in §10 — do NOT block the skill.

### Phase 7 — Write project-context-master.md

1. Render the populated template into the `project-context-master` path. Overwrite if exists.
2. Section 10 Open Questions table format: `| ID | Question | Impact | Owner | Status |`. Status ∈ {`Open`, `Resolved`}. IDs continue sequence; do NOT renumber resolved questions.
3. Preserve original-language labels for non-Vietnamese/English sources with English annotations in parentheses, per global-rules.
4. Persist the `_[AI-proposed | confidence: NN% | evidence: ...]_` tag verbatim at the end of any section that user did not confirm (skipped or partially answered). Sections that were `accept`-ed, `modify`-ed, supplemented, or fully answered in Q&A MUST NOT carry the tag.

### Phase 8 — Handover

Output:

```
✅ **Tổng hợp tri thức dự án hoàn tất.**

**Tóm tắt:**
- `project-context-master.md`: <created / updated> — sections filled: <count>/10 | user-confirmed: <N>/10 | còn tag `[AI-proposed]`: <N> (§<list>) | open questions: <open count> open / <resolved count> resolved
- `qc-dashboard.md`: <created / updated> — +<N> rows mới | soft-delete (→ Removed): <N> | re-add (→ Yes): <N>
- Site abbreviations: <list>

➡️ **Bước tiếp theo gợi ý:** chạy `/qc-dashboard-sync` để đồng bộ trạng thái tài liệu, hoặc `/qc-uc-read` để review use case đầu tiên.
```
