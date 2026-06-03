---
name: qc-uc-read
description: Reviews a use case (UC) document to determine whether it is ready for test design. Produces a readiness verdict (Ready / Not Ready), a completeness score (0–100%), and a detailed gap report with missing sections, unclear items, and concrete suggestions to fix each issue. Use this skill whenever a user say `review uc`, `review requirement`.
---
# Requirements Readiness Review Skill

## Input Contract

Read the `path-registry.md` file to find the below file's location:

- `.claude/skills/qc-uc-read/references/input-files-format.md` — for file format description of the input files
- `project-context-master`
- `qc-site-map` (optional) — if present, read §5/§6/§7/§8 for screen-coverage cross-check and reverse traceability (see Phase 1 Step 1 + scoring-rubric Cross-Artefact Conflict Check). If missing, skip cross-check and warn once.
- `requirement-common-files` — read first; resolve any code/ID reference (error codes, business rule IDs, common function names) appearing in the UC to its exact text from these files and inline that text into the audit output (see Common Reference Resolution rule in the phase files).
- `requirement-files`
- `question-backlog`
- Important: Check the input directory for existing versions, read the highest version of the files.

## Output Contract

Read the `path-registry.md` file to find the below file's location:

- `uc-review-report`
- `question-backlog`
- Important: Check the output directory for existing versions. If `v[N]` exists, increment the version to `v[N+1]`. Never overwrite existing files.

## Checkpoint & Resume

This skill writes **per-phase checkpoint files** to `.claude/skills/qc-uc-read/process-logging/<UC-ID>/` so that a context-limit / interruption mid-run does NOT force the user to redo finished work. Read `workflows/checkpoint-protocol.md` ONCE at skill start; it defines:

- `process-logging/<UC-ID>/` directory layout and `progress.md` format
- Worklog update protocol — defers to `docs/qc-lead/agent-work-log.local/README.md` (write-before-work rule)
- `qc-dashboard.md` `UC review stt` column update protocol (with graceful degradation if column missing)
- Resume detection at Phase 0
- Cleanup at the end of Phase 3

The protocol is referenced by every phase file — do NOT duplicate its rules here.

## Shared References

- **Scoring rubric** (10 knowledge areas, max points, auto-cap, auto-fail, thresholds, conflict check, blocked artefact protocol, common gap patterns): `references/scoring-rubric.md`. The rubric is referenced by both first-audit Phase 2 and re-audit Phase 2 — update it ONCE to change scoring rules everywhere.
- **UC Readiness Review Template:** `templates/UC_readiness_review_template_v3.md`.
- **Input file format description:** `references/input-files-format.md`.

## Workflow

### Phase 0 — Routing + Resume Detection + Dashboard Precheck

> No user-facing output during the silent-audit substep, EXCEPT the dashboard precheck warning if Case A applies.

1. **Identify the UC-ID** from the user's prompt or from the requirement file name. This is treated as the on-disk Folder ID; the dashboard precheck below may resolve it to a different canonical ID if a Mode 3 alias mapping exists.

2. **Resume detection** (per `workflows/checkpoint-protocol.md` §4):
   - Check `.claude/skills/qc-uc-read/process-logging/<UC-ID>/progress.md`.
   - **Found** → ask the user `Continue from Phase <next>?` or `Restart fresh?`. Branch accordingly. If user picks Continue, prefer the stored mode and skip the Determine mode section, unless they explicitly Restart.
   - **Not found** → fresh run.

3. **Determine `mode`:** check the UC-ID folder for the existence of `uc-review-report` file.
   - **If the file exists** → `mode = re-audit`.
   - **If the file does not exist** → `mode = first-audit`.

4. **Dashboard precheck (Case A per `qc-dashboard-sync` SKILL.md "Per-UC skill precheck contract"):** runs BEFORE generating `run_id` so a user `site-map first` answer does not pollute the worklog.
   - Resolve `qc-dashboard.md`. Parse `featureIndex` (by column 2 `<ID label>`) + `folderIDIndex` (by column 3 `Folder ID`).
   - **Case A — UC NOT in dashboard:**

     ```text
     ⚠️ UC `<UC-ID>` chưa có trong qc-dashboard.md và sẽ được thêm mới (Folder ID = <UC-ID>, In scope? = Need confirm).
     Đây là dấu hiệu UC này chưa được phát hiện hoặc matching với site-map.

     Bạn muốn:
     1. `site-map first` — Dừng lại. Chạy /qc-site-map (Mode 3) trước, rồi quay lại chạy review.
     2. `continue` — Tiếp tục. Bottom-up sẽ add row vào dashbord đồng thời ghi vào dashboard-orphans.md; bạn có thể chạy /qc-site-map sau để update.
     ```

     - `site-map first` → STOP. Print `Đã dừng. Vui lòng chạy /qc-site-map (Mode 3) rồi chạy lại /qc-uc-read.`
     - `continue` → invoke `qc-dashboard-sync` bottom-up with `uc_id=<UC-ID>` via the Skill tool. Wait for it to return.

   - **Case B — UC in dashboard:** proceed silently.

5. Generate a new `run_id` per the worklog protocol.

6. **Append a new entry** to the device's worklog JSONL with `status = "Running (Phase 1)"`, `input`/`output` empty, `start = now`. (For resume, follow the resume protocol in §4.)

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

Each phase file is self-contained: it includes its own Start status update, work steps, end-of-phase checkpoint write, and hand-off pointer to the next phase. After Phase 3 finishes, cleanup runs per `checkpoint-protocol.md` §6.

## Purpose
You operate by **YAGNI**, **KISS**, and **DRY**. Requirements should be minimal enough to build what's needed, clear enough to test, and free of duplication.

**Multi-language support:** Documents may be in Vietnamese, English, or any language. Read and process all content accurately — preserve original text, terminology, and formatting exactly as provided. Do NOT translate or paraphrase content during extraction or review.

Analyse **one or more requirement artefacts** (use case docs, design specs, wireframes, API docs, business process docs, screen mockups, etc.) **together as a set**, synthesise a unified understanding of the feature, and determine whether QA testers have enough information to begin designing test cases.

## Core Competencies

- **Zero-Trust Analysis:** Treat all input requirements as incomplete. Your first task is to identify logical contradictions, missing edge cases, and architectural risks.
- **Multi-Layer Validation:** For every feature, perform a 3-layer assessment:
  - **Business Layer:** Does it fulfill the "Domain Logic" (e.g., Fintech compliance, Crypto transaction finality)?
  - **System Layer:** How does it affect Microservices, Kafka events, and Database consistency?
  - **User Layer:** Is the UX resilient to "chaotic" user behavior?
- **Shift-Left:** Identify missing requirements and architectural risks early in the SDLC.

### Requirement Analysis & Taxonomy

Distinguish and audit all requirement types:

- **Business Requirements** — the "why" (business goals, objectives)
- **Functional Requirements** — the "what" (system behaviors, use cases)
- **Non-Functional Requirements (NFR)** — performance, security, scalability, accessibility constraints
- **User Stories** — As a [role] / I want [feature] / So that [benefit] — validate each has clear Acceptance Criteria
- **Transition Requirements** — migration, training, or rollout conditions
- **Constraints** — regulatory, technical, or budgetary boundaries

Flag any requirement that doesn't fit a recognized type as "Unclassified — requires clarification".

### Audit Framework (5 Pillars)

1. **Completeness** — Missing requirements, undefined behaviors, uncovered edge cases, missing NFRs
2. **Clarity** — Ambiguous language ("should", "may", "fast", "easy"), single-interpretation validation, undefined terms
3. **Consistency** — Internal contradictions, conflict between sections, inconsistent terminology
4. **Testability** — Every requirement must be independently verifiable; reject vague acceptance criteria
5. **Traceability** — Map each requirement to a business objective; flag orphan requirements with no business justification

### Domain Knowledge

- **SDLC methodology awareness:** Agile (Scrum/Kanban), Waterfall, SAFe, hybrid models
- **Process modeling:** Read and evaluate BPMN process flows, use case diagrams, data flow diagrams, sequence diagrams
- **Standards awareness:** IEEE 830 (SRS), BABOK v3 (IIBA), ISO/IEC 25010 (quality model)
- **API & integration requirements:** Identify integration points, data contracts, and system-to-system dependencies
- **Regulatory context:** Flag requirements with potential compliance implications (GDPR, PCI-DSS, HIPAA, etc.) for further review

## Boundaries

- You ONLY review and audit, DO NOT edit the input files.
- Every finding MUST cite the specific source section, page, or paragraph.
- Do NOT fabricate or assume requirements that are not in the document.
- When uncertain, explicitly state uncertainty and ask the user — never guess.
- Do NOT opine on implementation approach — leave architecture decisions to the development team.
