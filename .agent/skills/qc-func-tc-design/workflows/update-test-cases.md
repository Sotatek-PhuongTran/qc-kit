## Update Test Cases (Design Update Workflow)

> **Scope:** This workflow produces ONLY the updated test case `.md` file. It is fully independent from the `.xlsx` artifact — no script invocation, no xlsx step. Conversion to `.xlsx` (Phase 3) and chat-side reporting (Step C) are orchestrated by `SKILL.md`. Do NOT write a separate summary file in this workflow.
>
> **Trigger conditions:** This workflow is triggered when EITHER of the following occurs:
> 1. **Requirement change**: The audited UC Readiness Report has been updated (new version). Test cases need to be aligned with the changed requirements.
> 2. **User feedback**: The user provides explicit feedback about gaps, errors, or missing coverage in the existing test cases.
>
> **Phase mapping (per `SKILL.md` → "Phase Map"):**
> - **Phase 1 — Analysis & Design Brief** = Steps 1 + 2 below.
> - **Phase 2 — TC Drafting & MD Write** = Steps 3 + 4 below.
> - Phase 3 (MD → XLSX) is handled by `convert-md-to-xlsx.md`, not this file.
>
> **Checkpoint references:** all phase-boundary write/update steps follow `SKILL.md` → "Checkpoint & Resume Protocol" §5. Do NOT duplicate those rules here.

---

## Phase 1 — Analysis & Design Brief

### Status update — Start of Phase 1

Per `SKILL.md` → "Checkpoint & Resume Protocol" §2 (write-before-work rule):

1. **agent-work-log**: update current row Status → `Running (Phase 1)`. Append input file names (excluding `process-logging/`).
2. **qc-dashboard.md**: update the UC's `TC design stt` cell → `Running — Phân tích & Lập đề cương thiết kế` (VI) / `Running — Analysis & Design Brief` (EN). Skip if column missing (graceful degradation). If the UC has no row yet in the dashboard → invoke `qc-dashboard-sync` BEFORE updating.

### Step 1: Input Analysis (MANDATORY)

#### 1.1 — Load Existing Artifacts

- Identify the highest version of the existing `func-test-cases` file.
- Identify the current `uc-review-report` used to originally generate those test cases.
- Identify the latest version of the `uc-review-report` available now.
- Load all three above. Do NOT generate any output files in this step.

#### 1.2 — Determine the Source of Change

Parse the user's invocation to determine **what triggered this update**:

| Trigger Type | Description |
|---|---|
| **A — Requirement Change** | User says the audited file has a new version. OR the latest audited file version is newer than the one used to generate existing test cases. |
| **B — User Feedback** | User provides explicit feedback about test cases (e.g., "missing cases", "wrong expected result", "need to add X"). |
| **C — Both** | Both requirement change and user feedback are provided simultaneously. |

If the trigger type is ambiguous, ask the user:
> _"Bạn muốn cập nhật test cases vì: (A) Requirement đã thay đổi, (B) Có feedback về test cases hiện tại, hay (C) Cả hai?"_

---

### Step 2: Change Impact Analysis (MANDATORY)

This step replaces the open-ended drafting of generate. The agent MUST focus analysis on **what changed** and **how the change impacts existing test cases**.

#### 2A — If Trigger is Type A (Requirement Change)

Perform a **diff analysis** between the previous and latest audited file:

1. **Identify changed ACs**: List all Acceptance Criteria (ACs) that were added, removed, or modified.
2. **Map ACs to existing TCs**: Using the Requirement Traceability Matrix from the previous version's md prelude, find which test cases are linked to each changed AC.
3. **Classify the impact** for each changed AC:

| Change Type | Impact on Test Cases |
|---|---|
| AC added (new requirement) | → Need to **design new TCs** covering this AC. Apply the same 6-phase logic from `generate-test-cases.md`. |
| AC removed | → **Delete TCs** that exclusively cover this AC. If a TC covers multiple ACs and only one is removed, keep the TC and update its coverage. |
| AC modified (wording, logic, constraint changed) | → **Review and update** linked TCs. Recheck: Expected Result, Pre-conditions, Test Steps for accuracy against the new requirement. |
| AC unchanged | → Existing TCs remain valid. Mark as "No change". |

4. Build an **Impact Table**:

```
| AC ID | Change Type | Linked TC IDs | Action Required |
|-------|-------------|---------------|-----------------|
| AC-03 | Modified    | TC_012, TC_013 | Update Expected Result in TC_012, TC_013 |
| AC-07 | Added       | —              | Design new TCs  |
| AC-10 | Removed     | TC_025         | Delete TC_025   |
```

#### 2B — If Trigger is Type B (User Feedback)

Perform a **feedback classification analysis**:

For each feedback item provided by the user, classify it into one of three categories:

| Feedback Category | Definition | Agent Action |
|---|---|---|
| **Cat 1 — Agent Gap** | The requirement clearly implies this case, but the agent missed it when generating. Example: A validation rule was in the audited file but no TC was created for it. | → Design the missing TC(s). **Also flag this as a skill improvement suggestion** (see Step 2B.3). |
| **Cat 2 — Requirement Gap** | The feedback implies a behavior that is NOT documented in the current audited file. Example: User says "the system should show a warning when X" but X is not in the audited AC list. | → Do NOT design the TC yet. First: **ask the user to confirm and update the audited file** with this new requirement. After confirmation, re-trigger update with the new audited file. |
| **Cat 3 — Factual Correction** | The existing TC has an incorrect expected result, wrong step, or wrong pre-condition — not due to missing requirement, but due to a drafting error. | → Directly fix the existing TC. |

**Step 2B.1 — Analysis output per feedback item:**

For each feedback item, state:
```
Feedback: "[user's feedback text]"
Category: Cat 1 / Cat 2 / Cat 3
Reason: [Explain why you classified it this way, citing the AC ID or noting its absence]
Action: [What the agent will do]
```

**Step 2B.2 — For Cat 2 items:** Ask the user:
> _"Feedback '[summary]' mô tả một hành vi chưa được ghi nhận trong tài liệu requirement (audited file [version]). Để đảm bảo traceability, bạn có thể xác nhận và bổ sung nội dung này vào file audited không? Sau khi cập nhật, tôi sẽ thiết kế test case tương ứng."_

**Step 2B.3 — For Cat 1 items:** After designing the missing TCs, prepare a **Skill Improvement Flag** to surface in the chat report (handed off to `SKILL.md` → Step C). Format:
```
⚠️ SKILL IMPROVEMENT SUGGESTION:
Missing coverage for [type of validation/logic, e.g., "boundary value for max-length field"].
Recommended addition to generate-test-cases.md → Phase 3 (Core Functional Testing):
"[Suggested new rule or checklist item]"
```
Do NOT write this flag into a file — it will be reported on chat.

#### 2C — If Trigger is Type C (Both)

Apply both 2A and 2B analyses sequentially. Consolidate the Impact Table and Feedback Analysis into a unified **Change Analysis Report** held in working memory before proceeding to Phase 2.

### Checkpoint write — End of Phase 1

Per `SKILL.md` → "Checkpoint & Resume Protocol" §5:

1. **Write checkpoint file** `.claude/skills/qc-func-tc-design/process-logging/<UC-ID>/01_analysis.md` containing:
   - Trigger Type (A / B / C).
   - **Impact Table** (if Type A or C) — full table from Step 2A.
   - **Feedback Classification** (if Type B or C) — per-feedback rows with Category + Reason + Action.
   - **Cat 1 Skill Improvement Flags** (if any) — verbatim text to surface in Step C.
   - **Cat 2 open requirement gaps** (if any) — items waiting on user confirmation / audited-file update.
   - Previous TC version + path; current `uc-review-report` version used.
   - Detected output language (VI / EN).
2. **Update `progress.md`** → `last_phase_done: 1`, `next_phase: 2`, `updated_at: <now>`, `workflow: update-test-cases`.
3. **agent-work-log**: update row Status → `Phase 1 done`.
4. **qc-dashboard.md**: update the UC's `TC design stt` cell → `Phân tích & Lập đề cương thiết kế done` (VI) / `Analysis & Design Brief done` (EN). Skip if column missing.

---

## Phase 2 — TC Drafting & MD Write

### Status update — Start of Phase 2

1. **agent-work-log**: update current row Status → `Running (Phase 2)`.
2. **qc-dashboard.md**: update the UC's `TC design stt` cell → `Running — Soạn TC & ghi MD` (VI) / `Running — TC Drafting & MD Write` (EN). Skip if column missing.

### Step 3: Redesign Affected Test Cases (MANDATORY)

Using the same 6-phase design logic as `generate-test-cases.md`, apply it **only to the impacted scope** identified in Phase 1:

- **New TCs**: Design from scratch using the 6-phase logic for the new or changed ACs.
- **Updated TCs**: Rewrite only the affected fields (Steps, Expected Result, Pre-conditions) — keep the TC ID unchanged. Add a note: `[Updated vN — Reason: AC-XX modified]`.
- **Deleted TCs**: Mark as DELETED in the working draft — do NOT renumber remaining TCs to avoid traceability breaks.

**Test Case Writing rules (MANDATORY for new and updated TCs):** Apply all the rules in `qc-func-tc-design/rules/testcase-instruction-rules.md`.

- **Test cases example**: read the language-matched reference — `qc-func-tc-design/references/Testcase-refer-vi.md` for Vietnamese test cases, `qc-func-tc-design/references/Testcase-refer-en.md` for English test cases — and align new/updated TCs to the same structural & writing style (TC ID format, Title phrasing, Pre-condition / Step / Expected Result layout, multi-line bullet style).
- For consistency, updated TCs must match the writing style of unchanged TCs in v[N] (do NOT mix styles).

**Sorting rules:** See `qc-func-tc-design/rules/testcase-instruction-rules.md`
- Layout
- Sorting
- Encoding

**TC ID continuity rule:**
- New TCs must continue from the highest existing TC ID (e.g., if TC_025 was the last, new TCs start at TC_026).
- NEVER reuse a deleted TC's ID.

---

### Step 4: Write the Updated .md File (MANDATORY)

Write the COMPLETE updated test case list into a NEW version of the `.md` at the path defined in `path-registry.md` for `func-test-cases-draft`. Naming follows `rules/naming-convention.md` (immutable versions — increment v[N] → v[N+1], never overwrite).

The md must contain ALL test cases — unchanged, updated, and newly added — in their final form. Deleted TCs are excluded from the md body.

**At the TOP of the md (or top of `part1` if multi-part), include the following required prelude:**

```markdown
# Test Cases — [UC-ID] [feature-name] (v[N+1])

**Total test cases:** Y (Δ vs v[N]: +A new, ~U updated, -D deleted)
**GUI / FUNC counts:** y_gui / y_func
**Source UC (previous version):** [audited_filename_vX]
**Source UC (current version):** [audited_filename_vY]
**Update trigger:** [Type A — Requirement Change / Type B — User Feedback / Type C — Both]
**Output language:** [VI / EN]

#### Updated Requirement Traceability Matrix

| AC ID | Acceptance Criteria | Linked Test Cases       | Status          |
|---    |---                  |---                      |---              |
| AC-01 | …                   | TC_001, TC_002          | Covered         |
| AC-07 | …                   | TC_026                  | Covered [NEW]   |
| AC-10 | …                   | —                       | Removed         |

---
```

**Heading-level rules (MANDATORY — they govern what does and does not appear in the xlsx):**
- The prelude MUST use only `#` (h1) and `####` (h4) heading levels — these are skipped by the converter, so the prelude does NOT leak into the xlsx.
- Use `##` (h2) ONLY for screen headers (e.g., `## I. Màn hình: …` / `## I. Screen: …`).
- Use `###` (h3) ONLY for GUI / FUNC section headers (e.g., `### I.1. …` / `### I.2. …`).

**Inline annotations on changed TCs in the body:**
- `[NEW — AC-XX]` next to the title of newly added TCs.
- `[UPDATED — Reason: AC-XX modified]` next to the title of modified TCs.
- Do NOT include deleted TCs in the md body — their removal is reflected in the Updated RTM (`Removed` status).

**Layout / Sorting / Encoding requirements (still apply when redrafting the v[N+1] md — see `qc-func-tc-design/rules/testcase-instruction-rules.md` → "Sheet Layout & Section Headers"):**
- Preserve the existing screen / GUI / FUNC section headers from v[N].
- Place new TCs **inside the correct section block** for their screen and type — GUI new cases below the matching `<RomanNumeral>.1.` header, FUNC new cases below `<RomanNumeral>.2.`. Do NOT append at the end of the md.
- When the latest audited file adds a new screen, insert a new screen header block (next Roman numeral with its `.1` / `.2` sub-headers) at the appropriate position.
- Sorting within a section: GUI before Functional. Within GUI: Screen Initialization → Item Interactions → Common UI cases → UI elements verify. Within FUNC: Happy path → Validation → Error/Exception.
- Encoding (Rules 0a–0d): UTF-8 md, preserve dấu, no `unicodedata.normalize` / `unidecode` / Latin-1.

**Do NOT write a separate summary file.** The md (with its prelude) is the only design artifact this workflow produces. Detailed change tables (deleted / updated / new TCs), Cat 1 skill improvement flags, Cat 2 open requirement gaps, and out-of-scope items will be reported on chat by the orchestrator (`SKILL.md` → Step C).

### Checkpoint write — End of Phase 2

Per `SKILL.md` → "Checkpoint & Resume Protocol" §5:

1. **The deliverable updated `.md` (written in Step 4 above) IS the Phase 2 checkpoint.** Do NOT write a separate file in `process-logging/`.
2. **Update `progress.md`** → `last_phase_done: 2`, `next_phase: 3`, `updated_at: <now>`.
3. **agent-work-log**: update row Status → `Phase 2 done`. Append the `.md` path(s) to the Output column (excluding `process-logging/`).
4. **qc-dashboard.md**: update the UC's `TC design stt` cell → `Soạn TC & ghi MD done` (VI) / `TC Drafting & MD Write done` (EN). Skip if column missing.

---

## Hand-off to Phase 3

Next file: `workflows/convert-md-to-xlsx.md`. The orchestrator (`SKILL.md` → Step B) auto-triggers it after Phase 2 finishes successfully.
