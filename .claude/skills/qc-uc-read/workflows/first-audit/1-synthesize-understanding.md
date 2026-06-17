# First Audit · Phase 1 — Synthesize Requirement Understanding

> **Friendly name (for worklog):** `Synthesizing Requirement Understanding` (EN) / `Tổng hợp hiểu biết requirement` (VI).
>
> **Inputs:** UC document(s), design images, supporting artefacts (API spec, BPMN, etc.), common reference files.
>
> **Output checkpoint:** `process-logging/<UC-ID>/01_synthesis.md` — §A–§E (raw evidence) written at Step 1.7, §F (synthesized 5 sub-sections) appended at Step 2.

---

## Status update — Start

Per `workflows/checkpoint-protocol.md` §2 (write-before-work rule):

1. **Worklog**: rewrite last entry → `status = "Running (Phase 1)"`. Append input file names to `input` (excluding `process-logging/`).

---

## Step 1 — Read Artefacts and Build Review Context

Before scoring, rewriting, or judging anything, read all provided artefacts and build a lightweight review context.

The purpose of this step is to understand where the UC fits in the overall project and to collect supporting evidence for later reconstruction and Phase 2 cross-checks.

Do **not** score, rewrite, or judge the UC in this step.

---

### 1.1 Route input files before reading

Before reading any artefact, determine the input type and use the correct extraction method.

| Input type              | Action                                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| PDF provided            | Invoke the `pdf` skill to extract text, tables, and images first. Do not read the PDF directly as plain text.   |
| DOCX provided           | Invoke the `docx` skill to extract text, tables, and images first. Do not read the DOCX directly as plain text. |
| File path provided      | Read the file using the appropriate tool based on file type.                                                    |
| Image file provided     | Use visual reading and extract visible UI evidence.                                                             |
| HTML prototype provided | Read prototype source and extract observable UI evidence.                                                       |
| Pasted text provided    | Treat it as a document and parse directly from the prompt.                                                      |

Apply this routing rule to every file used in Step 1, including UC files, context files, site-map files, common files, and design artefacts.

---

### 1.2 Read project-level context

Read the `project-context-master` file, resolved via `path-registry.md`.

Use this file to understand the overall project context, including:

* product / business domain
* target users and user groups
* major modules or feature areas
* key business goals
* global assumptions, constraints, and terminology

Keep only the information needed to understand the UC in the broader project picture.

If the file is missing, skip it and warn the user once.

---

### 1.3 Read site-map / screen-flow context, if available

Read the `qc-site-map` file, resolved via `path-registry.md`, to identify:

* screens related to the UC’s feature
* navigation flows touching those screens
* roles allowed to access those screens
* features mapped to those screens

If the site-map file is missing, skip it and warn the user once.

---

### 1.4 Read common input-format rules

Read:

`.claude/skills/qc-uc-read/references/input-files-format.md`

This file lists the structure of all BA input artefacts and — most importantly — the identifier prefixes used across the project (e.g., `COMMON-*`, `BR-*`, `RULE-*`, `BP-*`, `QA-*`, `MSG_*`, `ERR_*`). Use it for two purposes only:

1. **Reference recognition.** Knowing the full prefix list lets Step 1.5 extract every referenced identifier in the UC without missing any prefix family.
2. **Sub-agent A grounding.** Pass the relevant prefix list and common-file structure into Sub-agent A's prompt at 1.6 so it knows what to scan for and how each common file is organized.

Do not score the UC after reading this file.

---

### 1.5 Read the detailed UC document

Read each provided UC file or pasted UC content fully.

At this step, only capture enough information to identify the review target and support later extraction, including:

* UC ID and UC name
* related feature / module
* actors or roles mentioned
* main sections available in the UC
* referenced screens, rules, messages, APIs, data fields, or external artefacts

Do not list, rewrite, or normalize all UC objects here.

Detailed UC objects, flows, rules, messages, validations, and data fields will be reconstructed in later steps.

---

### 1.6 Parallel sub-agent fan-out

Launch the following independent read-only sub-agents in parallel.

Use a **single message with multiple `Agent` tool calls in the same `<function_calls>` block**.
Do **not** await one sub-agent before invoking the next.

These sub-agents have no data dependency on each other.

Only after all launched sub-agents return, continue to Step 1.7.

#### Sub-agent A — Resolve common rules and messages

Run this sub-agent if `requirement-common-files` exists.

If common files are missing, skip this sub-agent and warn the user once.

Call the `Agent` tool with:

* `subagent_type: "Explore"`
* `description: "Resolve common rules and messages for <UC-ID>"`
* `prompt`:

```text
You are a read-only lookup agent. Do not infer, rewrite, translate, or summarize. Extract only verbatim evidence.

1. Read the detailed UC file at:
   <absolute path to the requirement file for UC-ID>

2. Extract every referenced identifier or named reference, including:
   - error codes, for example E001, E123, ERR_*
   - message IDs, for example MSG_*
   - business rule IDs, for example BR-*, BR001, RULE_*
   - notification names
   - email / SMS / push template names
   - validation message names
   - Vietnamese or English message names written in quotation marks
   - any common rule, common message, or shared configuration reference

3. Search all files under:
   <absolute path to requirement-common-files>

4. When multiple versions of the same common file exist, use the latest file by version suffix, for example:
   - error-codes_v3.md is newer than error-codes_v2.md
   - business-rules_v10.md is newer than business-rules_v9.md

5. For each UC mention, return a Markdown table in exactly this format:

| UC mention | Common file | Section | Verbatim content |
|---|---|---|---|
| E001 | error-codes_v3.md | §2.1 | "Tài khoản không tồn tại" |

6. If a mention cannot be found, write `NOT_FOUND` in the "Common file" column.

7. Do not invent missing content.
8. Do not translate.
9. Do not explain.
10. Keep the report under 400 lines. If the result is too long, prioritize mentions that appear in the UC’s main flow, alternate flows, validation rules, and exception flows.
```

---

#### Sub-agent B — Extract UI evidence from HTML prototype

Run this sub-agent if HTML prototype files are provided.

Call the `Agent` tool with:

* `subagent_type: "Explore"`
* `description: "Extract UI evidence from prototype for <UC-ID>"`
* `prompt`:

```text
You are a UI evidence extraction agent. Do not evaluate quality. Do not infer hidden requirements. Extract only observable UI evidence.

1. Read the detailed UC file at:
   <absolute path to the requirement file for UC-ID>

2. Identify screens, dialogs, forms, and UI states mentioned by the UC.

3. Inspect the HTML prototype files at:
   <absolute path to prototype files>

4. For each relevant screen or state, capture every UI element as raw evidence — **do not classify it**. For each element record these observable facts (the three in **bold** are what later classification depends on, always fill them):
   - label / visible text (verbatim)
   - element type (button, link, input, dropdown, checkbox, toggle, tab, text, image, badge, toast, banner, dialog, spinner, scrollbar, …)
   - **interactive?** — Y if the user can click / type / toggle / select / focus / navigate it; N otherwise
   - **content** — `static` (fixed text/asset) or `dynamic` (bound to data: tokens like `{name}`, record values, real-time indicators)
   - **visibility** — `always` (rendered with the screen) or `conditional` (only in a state, e.g. hidden/disabled by default), plus the trigger/condition
   - default value, placeholder, options/enum, required — if observable in the prototype, else `—`
   - belongs to — parent element if nested (e.g. a button inside a banner/dialog)
Make sure to cover: visible text; buttons and actions; input fields; placeholder text; tooltip/helper text; inline validation messages; error/warning/success/notification messages; empty, loading, disabled, readonly, or selected states; modal/popup/confirmation dialog content; navigation actions; table columns, cards, badges, statuses, or displayed data.

5. Return the result as Markdown:
## Prototype UI Evidence for <UC-ID>
 
### Screen: <screen/page name>
- Source: <file or route>
- Entry / trigger: <how this screen/state is reached, if observable>
- States / regions seen: <distinct states/frames; note any that are mutually exclusive>
- Related UC section(s): <section names if identifiable>
| # | Label / text | Element type | Interactive? | Content (static/dynamic) | Visibility | Trigger / condition | Default | Placeholder | Options / enum | Required? | Belongs to | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
 
## Prototype Coverage Notes
 
| UC reference | Prototype evidence | Status |
|---|---|---|
| <UC screen/field/action> | <matching prototype source> | FOUND / NOT_FOUND / UNCLEAR |

6. Do not judge whether FOUND or NOT_FOUND is a defect.
7. Do not suggest improvements.
8. Do not translate UI text.
9. Do not invent states that are not present.
10. Keep the report under 500 lines.
```

---

#### Sub-agent C — Extract UI evidence from image designs

Run this sub-agent if image design files are provided, such as PNG, JPG, JPEG, or screenshots.

Call the `Agent` tool with:

* `subagent_type: "Explore"`
* `description: "Extract UI evidence from image designs for <UC-ID>"`
* `prompt`:

```text
You are a UI evidence extraction agent. Analyze the provided design images visually. Do not evaluate quality. Do not infer hidden requirements. Extract only visible UI evidence.

1. Read the detailed UC file at:
   <absolute path to the requirement file for UC-ID>

2. Identify screens, dialogs, forms, and UI states mentioned by the UC.

3. Read the image design files at:
   <absolute path to image design files>

4. For each relevant image, capture every visible UI element as raw evidence — **do not classify it**. For each element record these observable facts (the three in **bold** are what later classification depends on, always fill them):
   - visible text / label (verbatim)
   - element type (button, link, input, dropdown, checkbox, toggle, tab, text, image, badge, toast, banner, dialog, stepper, breadcrumb, …)
   - **interactive?** — Y if it appears actionable (button, link, input, toggle, tab, nav control); N otherwise
   - **content** — `static` (fixed text/asset) or `dynamic` (looks bound to data: tokens like `{name}`, record values, sample data)
   - **visibility** — `always` (part of the base screen) or `conditional` (the image depicts a specific state, e.g. error/empty/loading), plus the state/trigger this image represents
   - default value, placeholder, options/enum, required — if visible in the image, else `—`
   - belongs to — parent element if nested (e.g. a button inside a banner/dialog)
Make sure to cover: visible text; buttons and actions; input fields; placeholder text; tooltip/helper text; inline validation messages; error/warning/success/notification messages; empty, disabled, readonly, selected, or loading states; modal/popup/confirmation dialog content; navigation actions; table columns, cards, badges, statuses, or displayed data; flow indicators such as breadcrumbs, tabs, steppers, or arrows.

5. Return the result as Markdown:
## Image UI Evidence for <UC-ID>
 
### Image: <file name>
- Related screen: <screen/page name>
- State depicted: <which UI state this image shows, if identifiable>
- Related UC section(s): <section names if identifiable>
| # | Visible text / label | Element type | Interactive? | Content (static/dynamic) | Visibility | State / trigger | Default | Placeholder | Options / enum | Required? | Belongs to | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
 
## Image Coverage Notes
 
| UC reference | Image evidence | Status |
|---|---|---|
| <UC screen/field/action> | <matching image/file> | FOUND / NOT_FOUND / UNCLEAR |

6. Do not judge whether FOUND or NOT_FOUND is a defect.
7. Do not suggest improvements.
8. Do not translate UI text.
9. Do not invent invisible content.
10. If text is unclear or unreadable, write `UNCLEAR_TEXT`.
11. Keep the report under 500 lines.
```

---

#### Design artefact handling rules

* If both HTML prototype and image design files are provided, run both Sub-agent B and Sub-agent C in parallel.
* If only HTML prototype is provided, run only Sub-agent B.
* If only image design files are provided, run only Sub-agent C.
* If no design or wireframe artefact is provided, skip design extraction and warn the user once.
* Do not treat missing design artefacts as a blocker.

---

### 1.7 Write Step 1 output to the checkpoint file

Write §A–§E directly to `.claude/skills/qc-uc-read/process-logging/<UC-ID>/01_synthesis.md`. **Always overwrite** if the file exists (first-audit is idempotent on re-run).

Use this exact structure:

````markdown
# Phase 1 Synthesis — <UC-ID>

## Working notes
- UC-ID / name / input language
- Source files with version
- Blocked or missing artefacts (or `none`)
- Generated at <ISO timestamp> by qc-uc-read · first-audit · Phase 1

## §A. Project & site-map context
- A.1 Project context (from Step 1.2) — scoped to this UC
- A.2 Site-map context (from Step 1.3) — related screens, navigation, roles, mapped features

## §B. UC identity & raw reference list (from Step 1.5)
- UC ID / UC name
- Input language
- Source UC file(s)
- Related feature / module
- Artefacts detected for this UC: common files / API / BPMN / design / prototype / site-map
- Notes for downstream extraction: none / <only routing notes>

## §C. Resolved common rules & messages (Sub-agent A — verbatim table, includes NOT_FOUND rows)

## §D. HTML prototype UI evidence (Sub-agent B — verbatim)

## §E. Image design UI evidence (Sub-agent C — verbatim)
````

For any section whose source did not run or is missing, write `Not applicable — <reason>.` Do not omit the heading.

Leave a trailing `---` after §E so Step 2 can append §F cleanly. Do not write §F here.

---

### 1.8 Step 1 guardrails

During Step 1:

* Do not score the UC.
* Do not rewrite the UC.
* Do not judge whether a gap or conflict is a defect.
* Do not infer missing requirements.
* Do not translate source content unless explicitly requested.
* Do not invent common rules, messages, UI states, or design behavior.
* Warn only once for each missing optional artefact type.
* Use `synthesize`, not `synthesise`, for spelling consistency.

---

## Step 2: Synthesize a Feature Understanding

Append §F to `01_synthesis.md` (file created in Step 1.7). Do not overwrite §A–§E. Do not create a new file.

Follow `qc-writting-rules.md` (MANDATORY). Re-number Section 1–5 below as §F.1–§F.5 in the output.

### §F.1 UI Element Extraction, Classification, and Cataloging
 
Catalog every UI element from the raw evidence reported by Sub-agent B (HTML prototype) and Sub-agent C (image design), reconcile with the use case document, and classify each element. **§F.1 is listing + classification only — no behavior analysis (that is §F.2).** Output goes into Section 4 of the template.
 
**Granularity (MANDATORY):** Every basic UI element gets its **own row**. Do not group multiple fields/buttons/columns into one row (DO NOT write "9 API fields" or "(N values)" — list each individually). For each element capture:
- **Exact label** — verbatim (VN/EN), no paraphrase. On design-vs-UC mismatch, prioritize the design label and flag the discrepancy.
- **Component type** — Text Input / Password / Dropdown / Date Picker / Radio / Checkbox / Toggle / Button / Link / Tab / Icon / Table column / Tooltip / Alert / Banner / Toast / Popup / etc.
- **Mandatory** (`*` in design = mandatory), **Default value**, **Placeholder**, **Enumerated values** (list all exact options).
- **Visibility & trigger** — always shown, or conditional + the trigger (exception code, event, data threshold).
- **Section / sub-section group**, and **discrepancies / missing** vs the UC.
**Classification (core of this step):** assign each element to exactly **one** group by the first matching question:
1. User can act on it directly (click / type / toggle / select / focus / navigation link)? → **Group 1 — Control**
2. (else) Shows a value/data that changes with state or record? → **Group 2 — Data display**
3. (else) A message/status shown conditionally (inline error, toast, banner, empty state, success)? → **Group 3 — Notification**
4. (else) Static & always present (logo, title, footer) or a system aid carrying no data (spinner, scrollbar)? → **Group 4 — Static / auxiliary**
Route the result into two tables **per screen**: Group 1 → **Table A (interactive)**; Groups 2/3/4 → **Table B (verification & auxiliary)**.
 
**Composite objects (table / list / card / dialog):** never one row. Decompose and classify each part:
- data region / cell values → Group 2; static column headers → Group 4 (Group 1 if sortable)
- row checkboxes, row action icons (Edit/Delete/View/Export…), in-cell links, pagination controls → Group 1
- pagination info text ("1–10 / 57") → Group 2
- empty-state text → Group 3, mutually exclusive with the populated data region (record the exact design text)
- scrollbar / loading spinner / skeleton → Group 4, visibility conditional on data volume / overflow
**Nesting:** when a Group-3 object contains a Group-1 object (e.g. banner with a button), output two rows and record the parent in the "belongs to" field.
**Mutual exclusion:** regions that never display together (default form / error banner / empty state / data region) must be recorded as exclusive.
 
**Self-verification:** for each design image/prototype, count visible elements; rows mapped to that source must be ≥ the visual count. Flag and expand any collapsed/grouped rows.
 
### §F.2 Object State and Behavior Analysis
 
Analyze the dynamic behavior of **interactive objects only — Group 1** from §F.1. Output goes into Section 5 of the template. Reference §F.1 IDs; do not re-list static attributes.
 
**Scope (MANDATORY):** at least one row for **every Group-1 element** in §F.1. **Exclude Groups 2/3/4** — they are expected results already covered in Section 4 Table B. Do **not** create filler "no behavior" rows for non-interactive elements. The behavior of a Group-2 object (e.g. a rule indicator updating in real time) is described in the **response column of the control that drives it**, not as its own row. Never group multiple controls into one row.
 
**Content extraction (MANDATORY):** replace rule codes / validation / error messages with the specific content reported by Sub-agent A. If Sub-agent A returns `NOT_FOUND`, keep the original UC code and append `(NOT_FOUND in common files)` — do not invent content.
 
For each Group-1 object define:
- **System state** — default state (Enabled / Disabled / Hidden / Read-only / Loading) and the variables driving it (permissions, input/data conditions, current data state).
- **Interaction matrix** — possible user actions and the system response for each, using vocabulary from the UC: Click, Hover, Drag-and-drop, Right-click, Keyboard shortcuts; for native mobile: Tap, Long Press, Swipe, Pull to Refresh, Pinch to Zoom, Hardware Back (Android), Edge Swipe Back (iOS).
- **Object behavior** — how the object reacts to data/state changes, including its effect on related objects (reference the affected Group-2/3/4 element by ID, e.g. "→ shows error <ID>", "→ indicator <ID> updates").
- **Branch type** — tag each response Happy / Alternative / Exception, so the row seeds test cases directly and no declared exception branch is missed.

### §F.3 Functional Logic & Workflow Decomposition

Analyze in detail the business processes of each function available on the feature screen, such as view list, filter, search, create, view detail, edit, delete, export, etc.

- **Workflows:**
  - **Main Flow (Happy Path):** The correct execution flow that produces no errors or exceptions.
  - **Alternative Flows:** Alternative execution paths that lead to a successful outcome.
  - **Exception & Error Flows:** Scenarios involving system errors or invalid data.
- **Business Rules & Validations:** Synthesize the business rules regarding format constraints, value ranges, and mandatory fields.
- **UI/UX Feedback:** Specify system notifications (Toast messages), error codes, and loading states corresponding to each process.

### §F.4 Functional Integration Analysis

Analyze and evaluate the linkages and influences between the cataloged functions, acting as an integration check between functions.

- **Impact Analysis:** Determine whether a change in state or data within one function directly or indirectly affects other functions.
- **Data Consistency:** Verify the synchronization of data across all related UI components after a function is executed.

### §F.5 Acceptance Criteria Candidates for User Confirmation

Purpose:
- Synthesize testable AC candidates from §F.1–§F.4.
- Use these AC candidates as a review aid only.
- Do not treat synthesized AC as source requirement.
- Do not use absence of source AC as a scoring penalty in Phase 2.

Each row must include:
- AC candidate
- Type: UI / Functional / Integration
- Trace: §F.X + source artefact
- Confirmation status: Needs user confirmation
- Source status: Verbatim from UC / Synthesized from understanding

Each AC row should be self-contained per `qc-writting-rules.md` C2 and include the source tag.

---

## Checkpoint write — End of Phase 1

Per `workflows/checkpoint-protocol.md` §4:

1. Verify `01_synthesis.md` contains §A through §F. If §F is missing, Step 2 did not complete — do not proceed.
2. Update `progress.md` → `last_phase_done: 1`, `next_phase: 2`, `updated_at: <now>`.
3. Worklog: rewrite last entry → `status = "Phase 1 done"`.

---

## Hand-off to Phase 2

Next file: `workflows/first-audit/2-score-and-identify-gaps.md`. It reads `01_synthesis.md` from the checkpoint folder and scores the 10 knowledge areas using the rubric in `references/scoring-rubric.md`.



