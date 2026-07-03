---
name: qc-func-tc-design
description: Designs atomic, executable test cases (md draft + xlsx deliverable) from a finalized, reviewed UC requirement document, optionally guided by a designed scenarios file. Trigger when the user says "generate test cases", "thiết kế test case", "/qc-func-tc-design <UC-ID>", or asks to proceed with TEST CASES. For higher-level test SCENARIOS, use qc-func-scenario-design instead.
---
# Test Case Design Skill

## Purpose

Read the latest audited UC review report (and test scenarios, if available) and systematically design test cases in 6 phases, covering both UI states and functional logic. Test types in scope: Functional, UI, Functional/E2E, and non-functional cases reachable through the UI. Out of scope: performance/load/security tooling, and automation scripts (owned by `qc-auto-generate`).

## Input Contract

Resolve via `path-registry.md`:

- `.claude/rules/qc-writting-rules.md`
- `.claude/skills/qc-func-tc-design/references/design-technical/common-technical.md`
- `references/design-technical/<variant>-technical.md` — supported variants: web (`web-responsive`, `web-static`), mobile (`mobile-native`, `mobile-hybrid`), desktop (`desktop-native`). If a project declares multiple variants, the skill drafts a SEPARATE test-case `.md` per variant.
- `uc-review-report` — read the latest version. Its §4 UI inventory is the SOLE source of element names quoted in test steps (see `rules/testcase-instruction-rules.md` C3).
- (Optional) `func-test-scenarios` — read the latest version.
- `requirement-common-files`
- `func-test-cases` (if any) — for update-test-cases mode.

No per-project action library or ui-elements files are required — element vocabulary comes directly from the audited report's §4; step verbs come from the FIXED kit-level table `.claude/config/action-verbs.md` (canonical only, aliases never written).

## Output Contract

Resolve via `path-registry.md`:

- `func-test-cases-draft` (.md, new version, written in Phase 1)
- `func-test-cases` (.xlsx, new version, produced in Phase 2 by auto-triggered conversion)

## Checkpoint & Resume

Follow `.claude/config/checkpoint-protocol.md` (shared rules) + `workflows/checkpoint-protocol.md` (this skill's delta: per-UC scope, scratch files, Phase 1 Summary, approval pause, verified transitions). Read both ONCE at skill start.

## Workflows

### Step A — Phase 0: Routing + Resume Detection

1. **Identify the UC-ID** from the user invocation or filename (= on-disk Folder ID).
2. **Resume detection** per the shared protocol §3, using this skill's checkpoint folder.
3. **Determine `mode`:** `func-test-cases` file exists for the UC → `update-test-case`; otherwise → `generate-test-case`.
4. **Generate `run_id`** and append the worklog entry per the worklog protocol.

### Step B — Run Phases 1 → 2

| Mode | Phase 1 | Phase 2 |
|---|---|---|
| generate-test-cases | `workflows/generate-test-cases.md` — analyze input, design, write md | `workflows/convert-md-to-xlsx.md` — export xlsx |
| update-test-cases | `workflows/update-test-cases.md` — impact analysis, approval pause, write md | `workflows/convert-md-to-xlsx.md` — export xlsx |

Each phase file is self-contained (start status update, work steps, end-of-phase checkpoint, hand-off pointer). After Phase 2, cleanup runs per the shared protocol §5.

### Step C — Chat-side Reporting (no summary file)

After Phase 2 succeeds, report on chat (Vietnamese, NOT in a file):

- Final artifact paths (`.md` + `.xlsx`).
- Total test cases with GUI / FUNC breakdown.
- For update mode: new / updated / deleted counts vs the previous version + trigger type (A — Requirement Change / B — User Feedback / C — Add variants / D — Mix).
- Noteworthy items: open requirement gaps, skill-improvement suggestions from feedback, out-of-scope items.

### Step D — Cleanup

Per shared protocol §5 — only after Phase 2 success AND the chat report is sent.

## Test design rules (MANDATORY)

Cover all scenario categories for every feature: Happy Path, Alternative Path, Exception/Edge (boundary, invalid, null/empty/overflow), GUI (layout, states, validation, accessibility basics), Functional (business logic, data, integration, state transitions).

Apply these techniques systematically — not intuitively:

- **Equivalence Partitioning (EP):** one case per valid/invalid partition.
- **Boundary Value Analysis (BVA):** at, just below, and just above every numeric/date/length constraint.
- **Decision Table Testing:** map condition combinations to outcomes for complex rules.
- **State Transition Testing:** every valid and invalid transition.
- **Use Case Testing:** derive from main / alternative / exception flows.
- **Error Guessing:** target defect-prone areas from domain experience.

Working style: trace every TC to a specific requirement before writing it; each TC independently executable; run the self-review checklist (`rules/testcase-instruction-rules.md` + `qc-writting-rules.md` §5) before delivery; surface requirement gaps instead of assuming.
