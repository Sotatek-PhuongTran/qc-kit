---
name: qc-context-master
description: generates and updates compact project-level qc context for agentic qc workflows. use when the user asks to initialize or update project context, summarize high-level ba documents, prepare shared project understanding for qc agents, or sync project context with the qc dashboard. supports initialization when project-context-master.md does not exist and update when it exists. produces project-context-master.md and sends feature/use case inventory handoff to qc-dashboard-sync, which owns qc-dashboard.md.
---
# QC Context Master

## Purpose

Generate and maintain `project-context-master.md` as the compact project-level context layer for the QC Agentic workflow.

This context helps downstream QC Agents understand the whole project before they read detailed function-level documents. It supports high-level BA document review, site map / feature list / dashboard alignment, function-level spec review, scenario design at function / integration / regression levels, test case design, test execution support, and bug verification.

`project-context-master.md` must not replace detailed source documents such as specs, wireframes, API docs, use case details, or technical documents from BA / BE / Tech Lead. It should summarize only project-level context needed to orient downstream QC Agents.

The generated `project-context-master.md` follows the Vietnamese template and should be written in Vietnamese by default so the QC Lead can review and edit it easily.

## Modes

Determine mode from the resolved `project-context-master` path in `path-registry.md`.

| Mode           | Condition                                                | Behavior                                                                                                                                      |
| -------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Initialization | `project-context-master.md` does not exist or is empty | Create new project-level context and initialize dashboard handoff data.                                                                       |
| Update         | `project-context-master.md` exists with real content   | Preserve QC Lead-reviewed content, re-read current inputs, update changed context, report gaps/conflicts, and refresh dashboard handoff data. |

In Update mode, always read the existing `project-context-master.md` before extracting from new inputs.

## Inputs

Resolve paths from `path-registry.md` whenever possible.

Required or expected inputs:

- `High-level-files` folder from BA.
- `requirement-common-files` folder from BA.
- `project-config.md`.
- `path-registry.md`.
- Existing `project-context-master.md` in Update mode.
- Existing `qc-dashboard.md` in Update mode.
- `templates/project-context-master-template.vi.md`.
- `references/project-context-master-writing-guide.md`.

`High-level-files` may contain any available project-level BA documents such as site map, feature list, WBS, project plan, scope document, Product Brief, high-level BRD/PRD, system architecture, tech overview, integration overview, business rules, data model, state diagrams, release notes, change logs, NFR, security, compliance, or legal documents. Not all document types are required. If this folder is missing or empty, stop the skill.

## Outputs

This skill produces:

1. `project-context-master.md` directly.
2. `.claude/skills/qc-dashboard-sync/inbox/feature-list-handoff.md` for `qc-dashboard-sync`.
3. `qc-dashboard.md` indirectly through `qc-dashboard-sync`.

This skill must not write `qc-dashboard.md` directly.

## Workflow overview

Follow these workflow files in order. Each workflow must write its checkpoint before moving to the next workflow.

1. `workflows/phase-0-audit-resume.md`
2. `workflows/phase-1-preflight-input-audit.md`
3. `workflows/phase-2-feature-inventory.md`
4. `workflows/phase-3-project-context-extract.md`
5. `workflows/phase-4-gap-readiness.md`
6. `workflows/phase-5-render-context.md`
7. `workflows/phase-6-dashboard-handoff.md`
8. `workflows/phase-7-handover-cleanup.md`

Also read `workflows/checkpoint-protocol.md` at skill start.

## Required reading before extraction

Before drafting project context, read:

- `templates/project-context-master-template.vi.md`
- `references/project-context-master-writing-guide.md`

Use the template as the output structure. Use the writing guide as the operational rule set for source selection, section writing, deduplication, missing information, assumptions, and conflict handling.

## Missing high-level information policy

When high-level information is incomplete, classify the gap:

1. `QC-fillable`: QC Lead can manually provide or confirm it. Continue, mark `TBD` or `Assumption`, and add an Open Question.
2. `Derivable from detailed requirement docs`: mainly feature/use case inventory can be inferred from SRS/spec folders. Continue, mark source as derived, and require QC Lead confirmation.
3. `Needs BA/Tech Lead source`: architecture, integration behavior, data model, state lifecycle, NFR, security, compliance, or legal constraints. Do not infer or invent. Mark `Missing` or `Partial` and ask the owner.
4. `Blocking`: no high-level files, no writable output path, or no usable project-level context. Stop.

## Feature inventory fallback

Feature/use case inventory is critical for `qc-dashboard.md`, impact analysis, and regression support.

Extract feature candidates in this order:

1. Explicit feature list / WBS / scope table from `High-level-files`.
2. Site map or module list from `High-level-files`.
3. `requirement-common-files` or SRS/spec folder by scanning file names, folder names, headings, UC IDs, feature IDs, or story IDs.

If derived from detailed docs:

- Mark source as `derived from requirement-common-files`.
- Do not treat derived items as official until confirmed.
- Use temporary IDs such as `TMP-001` only when no official ID exists.
- Mark temporary IDs as `Need confirm`.

If no feature candidates can be extracted, write `project-context-master.md` with a clear gap and do not call `qc-dashboard-sync` unless the sync skill intentionally supports empty handoff.

## Stop conditions

Stop and ask the user only when:

1. `High-level-files` folder is missing or empty.
2. `path-registry.md` cannot resolve where to write `project-context-master.md`.
3. No usable project-level information can be extracted from any source.
4. `qc-dashboard-sync` cannot be found or invoked and dashboard creation/update is required in the same run.
5. A required existing file path changed in a way that may overwrite user work.
6. A conflict blocks safe writing of `project-context-master.md`.

Otherwise, continue with available information, mark gaps, and report what needs confirmation.

## Final response

At completion, respond in Vietnamese with:

- Mode: Initialization or Update.
- `project-context-master.md`: created or updated.
- Dashboard handoff: created and sent to `qc-dashboard-sync`, or blocked with reason.
- Feature candidates summary: new, derived, need confirmation, not found in current source.
- Highest-impact missing context.
- Suggested next action for QC Lead.

Do not paste the full generated file into chat unless the user asks.
