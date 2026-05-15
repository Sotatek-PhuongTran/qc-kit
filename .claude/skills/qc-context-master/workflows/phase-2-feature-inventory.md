# Phase 2 - Feature Inventory

Goal: create a feature/use case candidate list for dashboard handoff and impact/regression context.

## Inputs

- `01_input_audit.md`
- `High-level-files`
- `requirement-common-files` when fallback is needed
- existing `qc-dashboard.md` in Update mode

## Extraction priority

Extract feature candidates in this order:

1. Explicit feature list, WBS, scope table, use case list, story list, or module list from `High-level-files`.
2. Site map or module list from `High-level-files`.
3. `requirement-common-files` or SRS/spec folder if no reliable high-level inventory exists.

## Candidate fields

| Field | Rule |
|---|---|
| `ID` | Prefer official source ID. If missing, use `TMP-001`, `TMP-002`, etc. and mark `Need confirm`. |
| `Site` | Use source site/portal/app. If unknown, use `TBD`. |
| `Module` | Use source module/business area. If unknown, use `TBD`. |
| `Feature/Use case name` | Short name from source title, heading, file name, or folder name. |
| `In scope?` | `Yes` if explicitly current; `Need confirm` if unclear. |
| `Source type` | `official high-level`, `derived from requirement-common-files`, or `existing dashboard`. |
| `Notes` | Include confirmation needs, missing IDs, or source ambiguity. |

## Update mode delta rules

When `qc-dashboard.md` exists:

1. Preserve existing dashboard rows and manual edits.
2. Do not include unchanged existing rows in the handoff unless the sync skill requires them.
3. Mark new candidates as `new`.
4. Mark existing removed rows that appear again as `re-add candidate`.
5. Mark existing rows not found in current sources as `not found in current source`; do not silently remove them.
6. Let `qc-dashboard-sync` decide how to merge, preserve columns, and propose removal.

## If no candidates can be extracted

Do not invent fake features. Continue the project context workflow, but mark dashboard handoff as blocked by missing feature inventory. Add a high-priority open question for QC Lead/BA.

## Checkpoint

Write `process-logging/02_feature_inventory.md` with:

```markdown
# Feature Inventory

## Extraction summary
- source strategy:
- official candidates:
- derived candidates:
- temporary IDs:
- blocked: yes/no

## Feature candidates
| ID | Site | Module | Feature/Use case name | In scope? | Source | Source type | Confidence | Notes |
|---|---|---|---|---|---|---|---|---|

## Dashboard delta candidates
- new:
- existing unchanged:
- re-add candidates:
- not found in current source:
- need confirmation:

## Gaps for project context
| Gap | Type | Impact | Suggested owner |
|---|---|---|---|
```

Then update `progress.md`:

- `last_phase_done: 2`
- `next_phase: 3`
