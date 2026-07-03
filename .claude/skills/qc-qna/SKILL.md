---
name: qc-qna
description: Sole writer of the per-UC Question Backlog. Syncs the backlog against the audited report's "Unified Gap & Question Report" (transfer new Open questions, mirror status updates) so BAs can track and answer them. Auto-triggered by qc-uc-read (first-audit Phase 3 Step 4, re-audit Step 10). Also user-invokable via /qc-qna <UC-ID> or phrases like "transfer questions", "chuyển câu hỏi cho BA".
---
# QC Q&A — Question Backlog Sync Skill

## Purpose

Maintain one **Question Backlog** file per UC so Business Analysts (BAs) can track, answer, and confirm missing information found during UC review. The backlog mirrors the audited report's `### 📋 Unified Gap & Question Report` table — the canonical source of question content and status.

This skill is the **SOLE writer** of `question-backlog` files. Other skills (including `qc-uc-read`) MUST delegate every backlog edit here — they never touch the file directly.

## Backlog file rule (HARD)

- **Exactly ONE file per UC, fixed name, edited in-place:**
  ```
  [UC-ID]_[feature-name]_question-backlog.md
  ```
  `[feature-name]` = the same kebab-case feature segment used by the UC's audited filename.
- **NO date segment, NO `v<N>` version suffix — EVER.** The backlog is a living document; history lives in its own `Update history` block, not in the filename. This is an explicit, intended exception to `naming-convention.md` versioning (declared in both `naming-convention.md` and `path-registry.md`).
- **Legacy migration:** if no fixed-name file exists but old dated/versioned backlog files do (`*_question-backlog_<YYYYMMDD>_v<N>.md`), read the HIGHEST version, write its full content to the fixed-name file (append an `Update history` line noting the migration), and from then on ignore the legacy files. Report the legacy filenames to the user for manual deletion — do not delete them yourself.

## Trigger Conditions

- **Auto-trigger (first audit):** `qc-uc-read` first-audit Phase 3 Step 4 invokes this skill right after writing `uc-review-report v[N].md`.
- **Auto-trigger (re-audit):** `qc-uc-read` re-audit Step 10 invokes this skill right after writing the new audited version.
- **Manual:** `/qc-qna <UC-ID>`, or phrases such as "transfer questions for UC-X", "chuyển câu hỏi cho BA", "update question backlog".

## Input Contract

Resolve via `path-registry.md`:

- `uc-review-report` — the audited UC file. The caller may pass an explicit file path (auto-trigger mode); otherwise locate the **highest-version** audited file for `<UC-ID>` in the resolved folder.
- `question-backlog` — the UC's fixed-name backlog file, if any (plus legacy dated/versioned files for one-time migration).
- Template: `.claude/skills/qc-qna/templates/question-backlog_template.md` — clone source when no backlog exists yet.

## Output Contract

- **`question-backlog`** — the single fixed-name file per UC (see Backlog file rule). Created from template if missing; otherwise edited in-place. NEVER a new version, NEVER a new date-stamped filename.
- **`worklog-per-device`** — log per the protocol at `docs/qc-lead/agent-work-log.local/README.md`. Do NOT touch the master `agent-work-log`.

## Workflow

### Phase 0 — Setup

1. Extract `<UC-ID>` from caller args / user prompt / audited filename. If multiple UCs share the audited file (group review), resolve `<UC-ID>` to the canonical group ID used in the dashboard.
2. Worklog: append new entry with `status = "Running (Phase 1)"`, `input = [<audited file path>]`, `start = now` (per the protocol).
3. Resolve the audited file: explicit path from caller if given, else the highest-version `uc-review-report` for `<UC-ID>`.

### Phase 1 — Read Audited File

1. Open the audited file. Locate the section heading `Unified Gap & Question Report`.
2. Parse the FULL table (all statuses, not only Open) into an in-memory list:
   ```
   { ID, Priority, Ref, Question, "Why It Matters", Status, Answer (if any) }
   ```
3. If the table is empty or absent, jump to Phase 4 with summary "No questions to sync."

### Phase 2 — Reconcile with Existing Backlog

1. Resolve the backlog file per the **Backlog file rule** (fixed name; run legacy migration first if needed).
2. **If the backlog does NOT exist (and no legacy files):**
   - Clone `.claude/skills/qc-qna/templates/question-backlog_template.md` to the fixed-name file in the same folder as the audited file.
   - Populate the header (UC-ID, created date, author from `userEmail` context if available).
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

## Boundaries

- SOLE writer of `question-backlog` files. Other skills (incl. `qc-uc-read`) MUST delegate backlog edits here.
- ONE fixed-name file per UC, edited in-place — never versioned, never date-stamped (hard exception to versioning rules, declared in `naming-convention.md` + `path-registry.md`).
- Does NOT modify the audited file (`uc-review-report`).
- Does NOT decide question statuses or invent answers — it only MIRRORS the audited report's Unified Gap & Question Report (status decisions belong to `qc-uc-read` re-audit, which updates that table first).
- Does NOT create new question IDs — only transfers IDs that exist in the audited table.
- If the audited table is empty, exit with a one-line note. Do NOT touch the backlog file.
- Output language follows source-input language per `global-rules.md`. Question text and Why-It-Matters content are copied **verbatim**.
