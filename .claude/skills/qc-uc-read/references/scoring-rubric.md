# UC Readiness Scoring Rubric

> Shared rubric referenced by both `first-audit` and `re-audit` workflows. Update this file ONCE to change scoring rules everywhere.

## Status Markers

Mark each knowledge area as:

- ✅ **Clear** — explicitly stated and unambiguous (full marks)
- ⚠️ **Partial** — present but vague, incomplete, or only inferred (half marks)
- ❌ **Missing** — absent from all provided artefacts (zero marks)

Additional status markers used throughout the report:

- ✅ **Complete** — explicitly stated and unambiguous
- ⚡ **Partial** — present but vague, incomplete, or only inferred (half marks)
- ⚠️ **Missing** — absent from all provided artefacts (zero marks)
- *(inferred)* — the reviewer inferred information rather than finding it explicitly; these are candidates for confirmation before test design begins

## Knowledge Areas Checklist

Score the **combined artefact set** against these knowledge areas. A tester needs all of these to design complete test cases.

| #   | Knowledge Area                            | Max Pts | Critical? | What to look for                                                                                                                                                                                                                                                                                                                                                                                                       |
| --- | ----------------------------------------- | ------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Feature Identity (title, ID, context)     | 5       | Yes       | Is it clear what this feature is and where it fits in the system?                                                                                                                                                                                                                                                                                                                                                  |
| 2   | Objective & Scope                         | 5       | Yes       | Why does this feature exist? What is in/out of scope?                                                                                                                                                                                                                                                                                                                                                                |
| 3   | Actors & User Roles                       | 10      | Yes       | Who triggers the feature? What roles/permissions are involved?                                                                                                                                                                                                                                                                                                                                                       |
| 4   | Preconditions & Postconditions            | 10      | Yes       | What must be true before? What is the system state after success?                                                                                                                                                                                                                                                                                                                                                    |
| 5   | UI Object Inventory & Mapping             | 15      | Yes       | Every atomic UI element listed as its own row with label/type/required/default/placeholder/enum values. **Auto-cap rules:** if any row collapses ≥ 2 atomic elements (e.g., "9 API fields", "(4 values)"), max score = 8/15. If any design image has < 80% of its visible elements enumerated, max score = 5/15. If any design image is referenced but no element from it appears in Section 4, max score = 0/15. |
| 6   | Object Attributes & Behavior Definition   | 20      | Yes       | Determine the state and response of each UI object based on specific system conditions. **1-to-1 rule:** every row in Section 4 must have ≥ 1 corresponding row here. If < 80% of Section-4 rows are covered, max score = 10/20.                                                                                                                                                                                |
| 7   | Functional Logic & Workflow Decomposition | 20      | Yes       | Analyze in detail the business processes of each function available on the feature screen. Duplicate the block below for each major sub-function (e.g., View List, Create Record).                                                                                                                                                                                                                                |
| 8   | Functional Integration Analysis           | 20      | Yes       | Analyze and evaluate the linkages and influences between the cataloged functions, acting as an integration check between functions.                                                                                                                                                                                                                                                                                |
| 9   | Acceptance Criteria                       | 20      | Yes       | Measurable, verifiable pass/fail statements.                                                                                                                                                                                                                                                                                                                                                                          |
| 10  | Non-functional Requirements               | 5       | No        | Performance, security, compatibility, accessibility.                                                                                                                                                                                                                                                                                                                                                                  |

**Total: 130 points → Normalise to 100 for the final score.**

## Normalization Formula

`Final Score = round((Raw Score / 130) × 100, 1)`

> Example: Raw score 88 / 130 → Final Score = round((88 / 130) × 100, 1) = **67.7 / 100**
> Example: Raw score 95 / 130 → Final Score = round((95 / 130) × 100, 1) = **73.1 / 100**

## Auto-fail Rule

If any Critical knowledge area scores 0, verdict = NOT READY regardless of total score.

- **Critical areas** (rows marked "Yes"): Areas #1–#9. If ANY of these score 0, the verdict is automatically NOT READY regardless of total score.
- **Non-critical areas** (rows marked "No"): Area #10. Scoring 0 here reduces the total but does not trigger auto-fail.

## Readiness Thresholds

| Score   | Verdict                       | Meaning                                                              |
| ------- | ----------------------------- | -------------------------------------------------------------------- |
| 90–100  | ✅ **READY**                  | QA can begin test design immediately                                 |
| 70–89   | ⚠️ **CONDITIONALLY READY**   | QA can start on clear areas; flagged items must be fixed in parallel |
| 0–69    | ❌ **NOT READY**             | Too many gaps; do not begin test design                              |

**Auto-fail:** Any Critical knowledge area scoring 0 → ❌ NOT READY regardless of total.

## Cross-Artefact Conflict Check

After scoring, check for **conflicts between artefacts**:

- Does the UC doc describe a flow that contradicts the wireframe?
- Does the API spec define fields not mentioned in requirements?
- Are there UI elements in the design with no corresponding business rule?
- Are labels/field names inconsistent across documents?

List all conflicts found — they are automatic Warnings.

## Blocked Artefact Protocol

If a referenced artefact (wireframe, API spec, supporting doc) is **unavailable or inaccessible**:

- Mark the dependent knowledge area(s) as `[BLOCKED: artefact name not accessible]`
- Score those areas as 0
- Since blocked artefacts almost always affect Critical knowledge areas (#1–#9), surface each blocked area as a 🔴 **Blocker** in the report under the "Blockers" section
- Do NOT infer or assume content from unavailable artefacts

## Common Gap Patterns

| Gap Pattern                                  | Impact on Test Design                         |
| -------------------------------------------- | --------------------------------------------- |
| No preconditions stated                      | Tester can't set up test data correctly       |
| Vague actor ("the user")                     | Can't determine which role/permission to test |
| Missing field validation rules               | Can't write boundary value or negative tests  |
| No error messages specified                  | Can't verify error handling behaviour         |
| Acceptance criteria use "should" / "can"     | Not verifiable; can't define pass/fail        |
| Error UI state not described                 | Can't verify UI error behaviour               |
| API error codes not listed                   | Can't verify API error handling               |
| Design shows fields not in requirements      | Ambiguous scope and validation rules          |
| Flows reference other features without links | Can't trace test dependencies                 |
