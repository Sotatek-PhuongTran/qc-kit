# qc-func-scenario-design — Design workflow

> Title: Scenario Design Workflow | Created: 2026-07-02 | Author: Claude (QC Kit v3 rebuild) | Version: v1

Rules, techniques, template, coverage rules, and quality gates live in `../references/scenario-rules.md` — read it before Phase 2. Checkpointing per `.claude/config/checkpoint-protocol.md` (per-UC scope; the deliverable IS the final checkpoint — no intermediate checkpoint files; `progress.md` only).

## Phase 0 — Setup

1. **Identify `<UC-ID>`** from the user invocation or the audited filename. If unclear, ASK — do NOT guess.
2. **Resume detection** per shared protocol §3 (this skill has only `progress.md`; on resume, offer Restart when Phase 1 was incomplete, Continue to Phase 2 when Phase 1 is recorded done).
3. **Worklog:** append entry `status = "Running (Phase 1)"`, `input = [<uc-review-report path>]`, `start = now`.

## Phase 1 — Analysis & Coverage Matrix

Read fully before writing anything.

1. `project-context-master.md` §3.0 → Variant kiểm thử + Project language. If the file is missing or the §3.0 fields are blank → STOP and ask the user (run `/qc-context-master` first) — never guess. Load the interaction vocabulary matching the variant (web/desktop: Click/Hover/Right-click; mobile native: Tap/Long-press/Swipe/Pinch/Hardware-back).
2. **If `qc-site-map.md` exists**, read §6/§7/§8/§9/§10: §8 enumerates screens touched by this UC's feature (coverage-matrix rows); §6 → pre-/post-condition states for E2E; §7 → role/permission scenarios; §9 → integration + data-state edge cases; §10 → risk-based emphasis. If missing → skip and warn once.
3. Read the highest-version `uc-review-report` for `<UC-ID>`: UC IDs + names in scope, functions per UC, main/alternative/exception flows, business rules + validations (verbatim wording), acceptance criteria (§8), actors/roles/permissions, pre/postconditions, UI states.
4. Read `requirement-common-files` only for error codes / rule IDs / common functions cited by the UC — inline the exact message text into scenario descriptions.
5. **Build the coverage matrix** in working memory: rows = UCs in scope; columns = the 9 coverage areas (scenario-rules §Coverage rules). Mark each cell `to-cover` / `blocked` / `out-of-scope` (performance/load/security). A cell is `blocked` ONLY when a SPECIFIC open gap/question/issue in the audited report (an open §10.1 row or §10.2 dependency — i.e. an Issue Register finding carried into the report) directly touches the content that cell would cover (the exact flow, rule, field, role, or state); surface it in Out-of-Scope Flags and do NOT fabricate. A ⚠️/❌/🚫 status on a related scoring area alone does NOT block the whole coverage area — design the unaffected content normally. Mapping (which of the 5 scoring areas each of the 9 coverage areas draws on): Happy/Alternative/Exception flows + role/permission → area 3 (F.3); business rules/validation + boundary values → area 2 (F.2); UI state transitions → areas 1–2 (F.1/F.2); API contract/integration → area 4 (F.4); acceptance criteria → audited §8 (non-scored).
6. If the audited Verdict is `Not Ready` (compare case-insensitively; the verdict lives in the audited report §10.3 Audit Summary, `**Tổng điểm**` row, 3rd column) → STOP and ask whether to proceed (scenarios will inherit known gaps). Never silently continue.
7. **Checkpoint:** update `progress.md` (`last_phase_done: 1`); worklog → `status = "Phase 1 done"`.

> If a UC ID or function name is not explicit in the document, infer it from the feature name and note the inference clearly in the output.

## Phase 2 — Scenario Drafting

For every `to-cover` cell, draft scenarios per the template + MANDATORY techniques in `scenario-rules.md`. Each scenario MUST: have a unique `TS_[UC-ID]_NNN` ID; cite a Req-ID; map to exactly ONE Test Type; carry a Test Focus tag; represent ONE meaningfully different test intent (atomic expansion belongs to `qc-func-tc-design`).

Run the quality checklist (`scenario-rules.md` §Quality checks), then write the deliverable to the resolved `func-test-scenarios` path:

```
[UC-ID]_[feature-name]_scenarios_[YYYYMMDD]_v[N].md
```

The deliverable IS the Phase 2 checkpoint.

## Phase 3 — Finalize

1. **Worklog:** rewrite last entry → `status = "Done"`, `end`, `duration_min`, `output = [<scenarios file path>]`.
2. **Cleanup** per shared protocol §5 (delete `process-logging/<UC-ID>/`).
3. **Chat report** (Vietnamese, no separate summary file):

   ```
   ## ✅ Test Scenario Design Complete

   | Artifact | File | Count |
   |---|---|---|
   | Test Scenarios | <resolved path> | X scenarios across Y UCs |

   ### Coverage breakdown by Test Type
   - Functional / Integration / UI / End-to-End / Acceptance: X mỗi loại

   ### Notes
   - Inferred UC IDs / function names: <list | none>
   - Blocked coverage cells (need BA): <list | none>
   - Out-of-scope items flagged: <list | none>
   ```
