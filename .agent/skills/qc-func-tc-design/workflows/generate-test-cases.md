## Generate Test Cases (Design Workflow)

> **Scope:** This workflow produces ONLY the test case `.md` file(s). It is fully independent from the `.xlsx` artifact — no script invocation, no xlsx step. Conversion to `.xlsx` and chat-side reporting are orchestrated by `SKILL.md` → "Skill Execution Steps" (Steps B and C). Do NOT write a separate summary file in this workflow.

### Step 1: Input Analysis (MANDATORY)

- Identify the highest version of all the input files (UC Readiness Report, Scenarios). Always select the highest version number available.
- Read the provided documents and comprehend the use case in preparation for test case design.

### Step 2: Detailed Drafting (MANDATORY)

Apply the following 6 distinct phases to design test cases. The result of this step is the test case content that will be written to the `.md` in Step 4.

#### Phase 1: Screen Initialization (Static States)

The agent must verify the landing state of the screen before any user interaction occurs.

- Empty State (No Data): Verify the visibility and specific default attributes of every object on the screen.
  - Explicitly describe placeholders, empty-state icons, or "No Data" messages.
- Populated State (With Data): Verify the default appearance of all items.
  - Describe the default state (Enabled/Disabled) of all components relative to the data present.

#### Phase 2: Item Interactions (Component States)

Verify the behavior of individual UI components without triggering core business logic.

- Navigation & Reset: Check 'X' icons, 'Cancel' buttons, and 'Close' controls to ensure they exit or reset the view as intended.
- Screen Initialization Triggers: Verify that clicking functional buttons correctly opens or initializes the relevant sub-functions or popups.
- Component Verification:
  - Dropdowns: Verify clickability and ensure the correct list of values is displayed.
  - Textboxes/Buttons: Verify states (Clickable, Disabled, Read-only) based on the design or business rules.
- Navigation Tools: Check pagination behavior (Active page, Next/Prev arrows).

#### Phase 3: Core Functional Testing (Logic Analysis)

Apply systematic testing techniques for every specific function available on the screen:

- Happy Path: Execute the successful flow using valid inputs.
- Validation: * Required Fields: Ensure the system blocks saving if mandatory fields are empty.
  - Format: Check Email, Phone, Date, or specific data formats.
  - Range: Check character length or numeric limits.
  - Boundary Value Analysis (BVA): Test at the limits (Min, Max, Min-1, Max+1).
- Exception/Error Handling: Trigger and verify system responses to invalid logic or external errors.

#### Phase 4: Functional Integration

Verify the synergy between different functions on the same screen.

- Example: How a 'Search' action affects 'Pagination', or how 'Deleting' an item updates the list count in real-time.

#### Phase 5: UI-Level Non-Functional Testing

- Security: Check for sensitive data masking (passwords) and input sanitization (SQL Injection/XSS) in UI fields.
- UX/Loading: Verify the presence of loading indicators (spinners) during data fetching and button debounce to prevent double-clicks.

#### Phase 6: GUI & Visual Compliance (Design-to-Code)

This phase focuses exclusively on visual fidelity:

- Design Alignment: Compare every object against the design file (Figma/Mockup) regarding position, color (HEX codes), spacing, and font sizes.
- Responsive Design: Verify the UI rendering across various screen resolutions and aspect ratios.

**Test Case Writing rules (MANDATORY):** Apply all the rules in `qc-func-tc-design/rules/testcase-instruction-rules.md` (Layout, Sorting, Encoding, etc.).

- **Test cases example**: read the language-matched reference — `qc-func-tc-design/references/Testcase-refer-vi.md` for Vietnamese test cases, `qc-func-tc-design/references/Testcase-refer-en.md` for English test cases — and align new TCs to the same structural & writing style (TC ID format, Title phrasing, Pre-condition / Step / Expected Result layout, multi-line bullet style).

### Step 3: Build the Requirement Traceability Matrix

- Build the `Requirement Traceability Matrix` mapping every Acceptance Criterion of the audited UC to the drafted Test Case IDs.
- Verify 100% coverage. If any AC has no linked TCs, fix the drafting in Step 2 before proceeding.
- The RTM will be embedded in the md prelude (Step 4), not in a separate file.

### Step 4: Write the .md File (MANDATORY)

Write the designed test cases into `.md` file(s) at the path defined in `path-registry.md` for `func-test-cases-draft`. Use a single file or multi-part files (`*_part1.md`, `*_part2.md`, …) depending on volume.

**At the TOP of the md (or top of `part1` if multi-part), include the following required prelude:**

```markdown
# Test Cases — [UC-ID] [feature-name]

**Total test cases:** X (GUI: Y, FUNC: Z)
**Source UC:** [audited filename + version]
**Source scenarios (if any):** [scenarios filename + version]
**Output language:** [VI / EN]

#### Requirement Traceability Matrix

| AC ID | Acceptance Criteria | Linked Test Cases | Status |
|---|---|---|---|
| AC-01 | …                   | TC_001, TC_002    | Covered |
| …     | …                   | …                 | …       |

---
```

**Heading-level rules (MANDATORY — they govern what does and does not appear in the xlsx):**
- The prelude MUST use only `#` (h1) and `####` (h4) heading levels — these are skipped by the converter, so the prelude does NOT leak into the xlsx.
- Use `##` (h2) ONLY for screen headers (e.g., `## I. Màn hình: …` / `## I. Screen: …`).
- Use `###` (h3) ONLY for GUI / FUNC section headers (e.g., `### I.1. …` / `### I.2. …`).

After the prelude, write all screen / GUI / FUNC sections with their test case tables, following the layout and sorting rules in `qc-func-tc-design/rules/testcase-instruction-rules.md`.

**Do NOT write a separate summary file.** The md (with its prelude) is the only design artifact this workflow produces. Anything noteworthy beyond the prelude (e.g., out-of-scope items, requirement gaps observed during drafting) will be reported on chat by the orchestrator (`SKILL.md` → Step C).
