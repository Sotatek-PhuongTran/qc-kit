---
name: qc-uc-read
description: "Reviews a use case document set for test-design readiness — verdict (Ready / Conditionally Ready / Not Ready), 0–100 score, gap report. UI/requirement tier only. Trigger: /qc-uc-read <UC-ID>, 'review uc', 'review requirement', 'UC này test được chưa'. For the API-tier readiness audit use qc-api-read."
---
# Requirements Readiness Review Skill

## Purpose

Analyse **one or more requirement artefacts** (use case docs, design specs, wireframes, business process docs, screen mockups, etc.) **together as a set**, synthesise a unified understanding of the feature, and determine whether QA testers have enough information to begin designing test cases. Raw API docs are NEVER read by this skill — the API branch belongs to `qc-api-read`.

**Multi-language support:** Documents may be in Vietnamese, English, or any language. Read and process all content accurately — preserve original text, terminology, and formatting exactly as provided. Do NOT translate or paraphrase content during extraction or review.

Documentation-quality issues are classified ONLY per the issue types in `references/scoring-rubric.md` §5 — this skill defines no separate audit framework.

## Input Contract

Read the `path-registry.md` file to find the below file's location:

- `.claude/skills/qc-uc-read/references/input-files-format.md` — per-project living description of the input files (the kit ships a skeleton). Its body is written ONLY by this skill via the FORMAT CHECK GATE (first-audit Phase 1 Step 1.4; re-audit reuses it by pointer); the user edits ONLY the flag line `> **Trạng thái khớp thực tế:**` (setting `Cần check lại` when the BA changes the document format).
- `project-context-master`
- `qc-site-map`
- `requirement-common-files` — read first; resolve any code/ID reference (error codes, business rule IDs, common function names) appearing in the UC to its exact text from these files and inline that text into the audit output (see Common Reference Resolution rule in the phase files).
- `requirement-files`
- `question-backlog` (awareness only — first-audit does not read it; re-audit reconciles it via `qc-qna`)
- `.claude/rules/qc-writting-rules.md`
- Important: Check the input directory for existing versions, read the highest version of the files.
- Note: entries starting with `.claude/` (`input-files-format.md`, `qc-writting-rules.md`) are kit-internal files at the literal path shown — read them directly; they are NOT `path-registry.md` lookups, and a missing registry entry for them is not a STOP condition.

## Output Contract

Read the `path-registry.md` file to find the below file's location:

- `uc-review-report` — versioned artifact: check the output directory for existing versions; if `v[N]` exists, write `v[N+1]`. Never overwrite an existing version.
- `question-backlog` — ONE living file per UC with the FIXED name `[UC-ID]_[feature-name]_question-backlog.md` (no date, no version), edited in-place. This skill NEVER writes it directly — every backlog edit is delegated to `qc-qna` (first-audit Phase 3 Step 6; re-audit Step 10).
- `.claude/skills/qc-uc-read/references/input-files-format.md` — kit-internal living file (no registry lookup), updated in-place by the FORMAT CHECK GATE when its flag is empty or `Cần check lại`.

## Checkpoint & Resume

Follow `.claude/config/checkpoint-protocol.md` (shared rules: directory layout, `progress.md` format, worklog, resume, cleanup) + `workflows/checkpoint-protocol.md` (this skill's delta: checkpoint file list, resume load table, re-audit single-flow rule). Read both ONCE at skill start — do NOT duplicate their rules anywhere.

## Shared References

- **Scoring rubric** (5 scoring areas, max points, auto-cap, auto-fail, thresholds, conflict check, blocked artefact protocol, common gap patterns): `references/scoring-rubric.md`. The rubric is referenced by both first-audit Phase 2 and re-audit Phase 2 — update it ONCE to change scoring rules everywhere.
- **UC Readiness Review Template:** `templates/UC_readiness_review_template_v4.md`.
- **Input file format description:** `references/input-files-format.md` (per-project living file — see Input Contract).

## Workflow

### Phase 0 — Routing + Resume Detection

> No user-facing output during the silent-audit substep

1. **Identify the UC-ID** from the user's prompt or from the requirement file name. This is treated as the on-disk Folder ID.

2. **Resume detection** (per shared protocol §3):
   - Check `.claude/skills/qc-uc-read/process-logging/<UC-ID>/progress.md`.
   - **Found** → ask the user `Continue from Phase <next>?` or `Restart fresh?`. Branch accordingly. If user picks Continue, prefer the stored mode and skip the Determine mode section, unless they explicitly Restart.
   - **Not found** → fresh run.

3. **Determine `mode`:** check the UC-ID folder for the existence of `uc-review-report` file.
   - **If the file exists** → `mode = re-audit`.
   - **If the file does not exist** → `mode = first-audit`.

4. Generate a new `run_id` per the worklog protocol.

5. **Append a new entry** to the device's worklog JSONL with `status = "Running (Phase 1)"`, `input`/`output` empty, `start = now`. (For resume, follow the shared resume protocol in `.claude/config/checkpoint-protocol.md` §3.)

### Phase 1 — 3 (per workflow)

Dispatch to the appropriate workflow folder based on `mode`:

#### First Audit

| Phase | File                                                            | Friendly Name                                |
| ----- | --------------------------------------------------------------- | -------------------------------------------- |
| 1     | `workflows/first-audit/1-synthesize-understanding.md`           | Đọc hiểu và phân tích yêu cầu       |
| 2     | `workflows/first-audit/2-score-and-identify-gaps.md`            | Xác định Gaps, mâu thuẫn và đánh giá điểm theo scoring-rubric |
| 3     | `workflows/first-audit/3-generate-review-report.md`             | Viết báo cáo                      |

#### Re-Audit

| Phase | File                                                            | Friendly Name                                |
| ----- | --------------------------------------------------------------- | -------------------------------------------- |
| 1     | `workflows/re-audit/re-audit.md`                      | Phân tích thông tin mới, câu trả lời, áp dụng thay đổi                  |

Each phase file is self-contained: it includes its own Start status update, work steps, end-of-phase checkpoint write, and hand-off pointer to the next phase. After Phase 3 finishes, cleanup runs per shared protocol §5.

## Boundaries

- You ONLY review and audit, DO NOT edit the input files.
- SOLE writer of the BODY of `references/input-files-format.md` (per-project input-format file) — updated only through the FORMAT CHECK GATE; the user edits ONLY its flag line. Kit-internal path — never resolved via `path-registry.md`.
- Every finding MUST cite the specific source section, page, or paragraph.
- Do NOT fabricate or assume requirements that are not in the document.
- When uncertain, explicitly state uncertainty and ask the user — never guess.
- Do NOT opine on implementation approach — leave architecture decisions to the development team.
