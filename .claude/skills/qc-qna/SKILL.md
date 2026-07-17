---
name: qc-qna
description: "Sole writer of both question books: the per-UC UI backlog (synced from the audited report's §10.1) and the per-portal API book api-question-backlog (two tiers, content-level dedup). Auto-triggered by qc-uc-read, qc-api-read and qc-api-tc-design. Trigger: /qc-qna <UC-ID>, 'transfer questions', 'chuyển câu hỏi cho BA'."
---
# QC Q&A — Question Backlog Sync Skill

## Purpose

Maintain one **Question Backlog** file per UC so Business Analysts (BAs) can track, answer, and confirm missing information found during UC review. The backlog mirrors the audited report's `### 10.1 Bảng gap và câu hỏi cần xác nhận` table (under `## 10. Gap, mâu thuẫn và câu hỏi mở` — template `UC_readiness_review_template_v4.md`) — the canonical source of question content and status.

This skill is the **SOLE writer** of `question-backlog` files. Other skills (including `qc-uc-read`) MUST delegate every backlog edit here — they never touch the file directly. In **API mode** it is likewise the SOLE writer of the portal-level `api-question-backlog` files.

## File rules (HARD — summary)

- **UI mode:** exactly ONE living file per UC, fixed name `[UC-ID]_[feature-name]_question-backlog.md` — no date, no version, edited in-place (declared exception in `naming-convention.md` + `path-registry.md`). Full rule + legacy migration: `workflows/ui-mode.md` §Backlog file rule.
- **API mode:** exactly ONE living file per PORTAL, fixed name `[PORTAL]_api-question-backlog.md` — two tiers (mục A chung / mục B theo UC), IDs `Q-API-NNN`, content-level dedup. Full rule + portal derivation/validation + one-time migration: `workflows/api-mode.md` §File rule.

## Trigger Conditions

- **Auto-trigger (first audit):** `qc-uc-read` first-audit Phase 3 Step 6 invokes this skill right after writing `uc-review-report v[N].md`.
- **Auto-trigger (re-audit):** `qc-uc-read` re-audit Step 10 invokes this skill right after writing the new audited version.
- **Auto-trigger (API branch):** `qc-api-read` / `qc-api-tc-design` invoke this skill to push their questions/findings into the portal backlog.
- **Manual:** `/qc-qna <UC-ID>`, or phrases such as "transfer questions for UC-X", "chuyển câu hỏi cho BA", "update question backlog".

## Input Contract

Resolve via `path-registry.md`:

- **UI mode:**
  - `uc-review-report` — the audited UC file. The caller may pass an explicit file path (auto-trigger mode); otherwise locate the **highest-version** audited file for `<UC-ID>` in the resolved folder.
  - `question-backlog` — the UC's fixed-name backlog file, if any (plus legacy dated/versioned files for one-time migration).
  - Template: `.claude/skills/qc-qna/templates/question-backlog_template.md` — clone source when no backlog exists yet.
- **API mode:**
  - Caller's question source (api-audited §8 table / tc-design finding list, passed in the invocation).
  - `api-question-backlog` — the portal's fixed-name book, if any.
  - `question-backlog` per-UC — READ-ONLY, for dedup/reference only.
  - Template: `.claude/skills/qc-qna/templates/api-question-backlog_template.md`.

## Output Contract

- **UI mode: `question-backlog`** — the single fixed-name file per UC (see File rules). Created from template if missing; otherwise edited in-place. NEVER a new version, NEVER a new date-stamped filename.
- **API mode: `api-question-backlog`** — the single fixed-name file per portal, same living-file rules.
- **`worklog-per-device`** — log per the protocol at `docs/qc-lead/agent-work-log.local/README.md`. Do NOT touch the master `agent-work-log`.

## Mode detection (caller-based)

| Caller / context | Mode |
|---|---|
| `qc-uc-read` (first-audit Phase 3 Step 6 / re-audit Step 10), manual `/qc-qna <UC-ID>`, or UI-branch phrasing | **UI mode** |
| `qc-api-read` / `qc-api-tc-design`, or the prompt explicitly names the API branch | **API mode** |

UI mode is the historical per-UC flow — behavior unchanged from earlier kit versions (running projects are not affected). API mode writes only the portal book and changes NO UI-mode rule.

## Routing table

| Mode | Workflow file | Contents |
|---|---|---|
| UI mode | `workflows/ui-mode.md` | Backlog file rule (HARD) + legacy migration; Phase 0 Setup → Phase 1 Read audited (§10.1 parse, column map, legacy-heading fallback) → Phase 2 Reconcile → Phase 3 Write in-place → Phase 4 Return |
| API mode | `workflows/api-mode.md` | File rule (HARD) + portal derivation/validation + one-time migration (`Đã chuyển` marking); Sync flow (bootstrap clone, column maps, DEDUP gate, status mirror, write + summary); API-mode boundaries |

## Boundaries

- SOLE writer of `question-backlog` files (UI mode) and `api-question-backlog` files (API mode). Other skills (incl. `qc-uc-read`) MUST delegate backlog edits here.
- ONE fixed-name file per UC (UI) / per portal (API), edited in-place — never versioned, never date-stamped (hard exception to versioning rules, declared in `naming-convention.md` + `path-registry.md`).
- Does NOT modify the audited file (`uc-review-report`).
- Does NOT decide question statuses or invent answers — it only MIRRORS the audited report's §10.1 table (`Bảng gap và câu hỏi cần xác nhận`); status decisions belong to `qc-uc-read` re-audit, which updates that table first.
- Does NOT create new question IDs — only transfers IDs that exist in the audited table. (API mode là ngoại lệ có chủ đích: cấp ID sổ `Q-API-NNN` cho file portal — xem `workflows/api-mode.md`.)
- If the audited table is empty, exit with a one-line note. Do NOT touch the backlog file.
- The backlog is an internal review document → ALWAYS Vietnamese per `rules/qc-writting-rules.md` (question text and Why-It-Matters content are copied **verbatim** from the audited table; the backlog's existing EN column headers stay unchanged).
