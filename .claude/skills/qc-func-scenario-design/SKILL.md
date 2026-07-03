---
name: qc-func-scenario-design
description: Designs test SCENARIOS (intent-level, not atomic test cases) from a finalized, reviewed UC requirement document. Trigger when the user says "design test scenarios", "thiết kế test scenario", "/qc-func-scenario-design <UC-ID>", or shares an audited uc-review-report and asks for the next test-design step WITHOUT naming test cases. For atomic TEST CASES, use qc-func-tc-design instead.
---
# Test Scenario Design Skill

## Purpose

Transform a finalized UC requirement (reviewed by `qc-uc-read`) into ready-to-use **test scenarios** grouped by UC, covering Functional / Integration / UI / End-to-End / Acceptance testing. One scenario = one distinct test intent — the bridge between an audited requirement and atomic test cases (which belong to `qc-func-tc-design`).

## Input Contract

Resolve via `path-registry.md`:

- `project-context-master` — §1 Product Platform Type (informs interaction phrasing: Tap vs Click, Hardware back vs browser back...).
- `qc-site-map` (optional) — §6 Navigation, §7 Role/access, §8 Screen↔Feature mapping, §9 Touchpoints, §10 Regression anchors. If missing → skip site-map-derived scenarios and warn once.
- `uc-review-report` — latest audited version for `<UC-ID>`.
- `requirement-common-files` — verbatim business rules, error codes/messages, common functions referenced by the UC.

## Output Contract

- `func-test-scenarios` (.md) — one file per UC (or per UC group), versioned per `naming-convention.md`: `[UC-ID]_[feature-name]_scenarios_[YYYYMMDD]_v[N].md`.
- `worklog-per-device` — per `docs/qc-lead/agent-work-log.local/README.md`.

## Checkpoint & Resume

Follow `.claude/config/checkpoint-protocol.md` — per-UC scope at `.claude/skills/qc-func-scenario-design/process-logging/<UC-ID>/`, `progress.md` only (the deliverable is the final checkpoint; no intermediate files).

## Workflow

Follow `workflows/design.md` end-to-end (Phase 0 Setup → Phase 1 Analysis & Coverage Matrix → Phase 2 Drafting → Phase 3 Finalize). Techniques, template, coverage rules, and quality gates live in `references/scenario-rules.md`.

## Boundaries

- ONLY designs test scenarios — atomic, executable test cases belong to `qc-func-tc-design`.
- ONLY Functional / Integration / UI / E2E / Acceptance. Performance / load / security beyond functional auth → flag in Out-of-Scope, never generate.
- Never edits input files. Never fabricates scenarios for content the audited report flagged as Missing/Partial — those go to Out-of-Scope Flags with a `qc-qna` recommendation.
- Every scenario traces to a UC via `TS_[UC-ID]_NNN` — no orphans.
- Output language follows source-input language (Vietnamese audited UC → Vietnamese scenarios).
- ONE file per UC (or per bundled UC group) — never sharded across files.
