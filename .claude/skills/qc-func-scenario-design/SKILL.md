---
name: qc-func-scenario-design
description: "Designs intent-level UI test SCENARIOS from a finalized audited UC report (design + update modes, stable TS IDs). Trigger: /qc-func-scenario-design <UC-ID>, 'thiết kế test scenario', 'design test scenarios'. For atomic UI TEST CASES use qc-func-tc-design; for API scenarios use qc-api-scenario-design."
---
# Test Scenario Design Skill

## Purpose

Transform a finalized UC requirement (reviewed by `qc-uc-read`) into ready-to-use **test scenarios** grouped by UC, covering Functional / Integration / UI / End-to-End / Acceptance testing. One scenario = one distinct test intent — the bridge between an audited requirement and atomic test cases (which belong to `qc-func-tc-design`).

## Input Contract

Resolve via `path-registry.md`:

- `project-context-master` — §3.0 (Phạm vi test, Variant & Ngôn ngữ dự án): Variant kiểm thử (informs interaction phrasing: Tap vs Click, Hardware back vs browser back...) + Project language for the deliverable. If the file is missing or the §3.0 fields are blank → STOP and ask the user (run `/qc-context-master` first) — never guess.
- `qc-site-map` (optional) — §6 Navigation, §7 Role/access, §8 Screen↔Feature mapping, §9 Touchpoints, §10 Regression anchors. If missing → skip site-map-derived scenarios and warn once.
- `uc-review-report` — latest audited version for `<UC-ID>`.
- `requirement-common-files` — verbatim business rules, error codes/messages, common functions referenced by the UC.

## Output Contract

- `func-test-scenarios` (.md) — one file per UC (or per UC group), versioned per `naming-convention.md`: `[UC-ID]_[feature-name]_scenarios_[YYYYMMDD]_v[N].md`.
- `worklog-per-device` — per `docs/qc-lead/agent-work-log.local/README.md`.

## Checkpoint & Resume

Follow `.claude/config/checkpoint-protocol.md` + this skill's delta `workflows/checkpoint-protocol.md` — per-UC scope at `.claude/skills/qc-func-scenario-design/process-logging/<UC-ID>/`, `progress.md` only (the deliverable is the final checkpoint; no intermediate files).

## Workflow

**Mode detection (before dispatch):** resolve the `func-test-scenarios` folder for `<UC-ID>` and check for existing scenarios files.

| Condition | Mode | Workflow |
|---|---|---|
| No scenarios file exists for the UC | design (first run) | `workflows/design.md` (Phase 0 Setup → Phase 1 Analysis & Coverage Matrix → Phase 2 Drafting → Phase 3 Finalize) |
| Scenarios file exists AND the latest audited version is NEWER than the version recorded in the scenarios header | update | `workflows/update.md` (diff → stable TS IDs → Change log → write v[N+1]) |
| Scenarios file exists and the recorded audited version is already the latest | — | Nothing to do — report to the user and stop |

Techniques, template, coverage rules, and quality gates live in `references/scenario-rules.md` (both modes).

## Boundaries

- ONLY designs test scenarios — atomic, executable test cases belong to `qc-func-tc-design`.
- ONLY Functional / Integration / UI / E2E / Acceptance. Performance / load / security beyond functional auth → flag in Out-of-Scope, never generate.
- Never edits input files. Never fabricates scenarios for content the audited report flagged as Missing/Partial — those go to Out-of-Scope Flags with a `qc-qna` recommendation.
- Every scenario traces to a UC via `TS_[UC-ID]_NNN` — no orphans.
- Scenarios are an OFFICIAL project deliverable → written in the project language read from `project-context-master` §3.0 "Project language" (Vietnamese or English only, per `rules/qc-writting-rules.md`).
- ONE file per UC (or per bundled UC group) — never sharded across files.
