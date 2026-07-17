# qc-qna · UI mode — per-UC Question Backlog sync

> Routed from `SKILL.md` (Mode detection). Toàn bộ flow trong file này là **UI mode** — sổ per-UC, hành vi GIỮ NGUYÊN như các version kit trước (dự án đang chạy không bị ảnh hưởng). Nhánh API dùng **API mode** với sổ riêng cấp portal — xem `workflows/api-mode.md`; API mode KHÔNG thay đổi bất kỳ luật nào của UI mode.

## Backlog file rule (HARD)

- **Exactly ONE file per UC, fixed name, edited in-place:**
  ```
  [UC-ID]_[feature-name]_question-backlog.md
  ```
  `[feature-name]` = the same kebab-case feature segment used by the UC's audited filename.
- **NO date segment, NO `v<N>` version suffix — EVER.** The backlog is a living document; history lives in its own `Update history` block, not in the filename. This is an explicit, intended exception to `naming-convention.md` versioning (declared in both `naming-convention.md` and `path-registry.md`).
- **Legacy migration:** if no fixed-name file exists but old dated/versioned backlog files do (`*_question-backlog_<YYYYMMDD>_v<N>.md`), read the HIGHEST version, write its full content to the fixed-name file (append an `Update history` line noting the migration), and from then on ignore the legacy files. Report the legacy filenames to the user for manual deletion — do not delete them yourself.

## Workflow

### Phase 0 — Setup

1. Extract `<UC-ID>` from caller args / user prompt / audited filename. If multiple UCs share the audited file (group review), resolve `<UC-ID>` to the canonical group ID used in the dashboard.
2. Worklog: append new entry with `status = "Running (Phase 1)"`, `input = [<audited file path>]`, `start = now` (per the protocol).
3. Resolve the audited file: explicit path from caller if given, else the highest-version `uc-review-report` for `<UC-ID>`.

### Phase 1 — Read Audited File

1. Open the audited file. Locate the section heading `### 10.1 Bảng gap và câu hỏi cần xác nhận` (under `## 10. Gap, mâu thuẫn và câu hỏi mở`). **Backward compatibility:** if no `### 10.1` heading is found, look for the legacy heading `Unified Gap & Question Report` (older audited files) and parse its table instead — UI-mode behavior stays unchanged for old projects.
2. Parse the FULL table (all statuses, not only Open) into an in-memory list:
   ```
   { ID, Priority, Ref, Question, "Why It Matters", Status, Answer (if any) }
   ```
   **Column map — source §10.1 (VI, 8 columns) → backlog columns (backlog schema UNCHANGED):**

   | Cột nguồn §10.1 | Cột backlog | Ghi chú |
   |---|---|---|
   | `ID` | `ID` | verbatim (`Q1`, `Q2`…) — never renumber |
   | `Mức ưu tiên` | `Priority` | `High` → `H`, `Medium` → `M`, `Low` → `L` |
   | `Loại vấn đề` | — | not carried (backlog stays 6 columns) |
   | `Tham chiếu nguồn` | `Ref` | verbatim |
   | `Nội dung vấn đề / câu hỏi cần xác nhận` | `Question` | verbatim |
   | `Vì sao quan trọng` | `Why It Matters` | verbatim |
   | `Owner đề xuất` | — | not carried |
   | `Trạng thái` | `Status` | mirrored as-is (audited is canonical) |

   **`Answer` source (explicit — §10.1 has no Answer column):** answer text, when the re-audit records one alongside the status change (in or next to the §10.1 row), is carried into the backlog's `Answer` cell (Answered Questions section); if the source row carries no answer text, leave the `Answer` cell blank.
3. If the table is empty or absent, jump to Phase 4 with summary "No questions to sync."

### Phase 2 — Reconcile with Existing Backlog

1. Resolve the backlog file per the **Backlog file rule** (fixed name; run legacy migration first if needed).
2. **If the backlog does NOT exist (and no legacy files):**
   - Clone `.claude/skills/qc-qna/templates/question-backlog_template.md` to the fixed-name file in the same folder as the audited file.
   - Populate the header (UC-ID, created date, author from `userEmail` context if available).
   - After cloning, remove any remaining sample/placeholder rows from the tables before appending real questions.
3. **If the backlog EXISTS:** for each ID in the audited table:
   - **NEW ID** (not in any backlog section) with `Status = Open` → APPEND to `## Open Questions`.
   - **Existing ID, audited status differs from backlog status** → mirror the audited status into the backlog (move the row to the matching section / update its `Status` cell), attaching the stakeholder answer when the audited table carries one. The audited report is canonical — this skill never decides statuses itself.
   - **Existing ID, same status** → no-op.
   - **Conflict — audited says `Open` but backlog says `Answered`/`Resolved`** (BA answered but the UC has not been re-audited yet) → SKIP and WARN:
     *"⚠️ Q`<ID>` đã được BA trả lời nhưng audited report mới nhất vẫn để Open. UC này cần re-audit qua `/qc-uc-read` để đồng bộ trạng thái."*
   - Backlog rows whose ID is absent from the audited table → **leave alone** (the BA may still answer them; the next re-audit reconciles).

> ID Handling: keep original IDs from the audited report (e.g., `Q1`, `Q2`) verbatim. They are stable across UC versions. Do NOT renumber.

### Phase 3 — Write (in-place)

1. If appending rows, remove any placeholder line `_(No open questions — all resolved.)_` from `## Open Questions`.
2. Apply appends + status mirrors, preserving column order:
   ```
   | ID | Priority | Ref | Question | Why It Matters | Status |
   ```
3. Append ONE line to the file's `Update history` block: date + what changed (transferred / status-mirrored / migrated).
4. Save to the SAME fixed-name file. Never create a new filename, never bump a version, never add a date to the name.

### Phase 4 — Return

1. Worklog: rewrite last entry → `status = "Done"`, `output = [<backlog file path>]`, `end = now`, `duration_min = computed`.
2. Return a short summary to the caller (`qc-uc-read` or the user):
   ```
   ✅ Question backlog sync complete.
   - Backlog file: <path>
   - New questions appended: N (Q<id>, ...)
   - Statuses mirrored from audited: M
   - Already-pending (skipped): K
   - Conflicts (audited Open vs backlog Answered): C  →  ⚠️ recommend re-audit
   - Legacy files migrated: <list | none> (user may delete manually)
   ```
   If nothing changed: *"No changes — backlog already reflects the audited report."*
