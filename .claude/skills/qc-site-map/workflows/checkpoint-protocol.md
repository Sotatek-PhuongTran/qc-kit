# Checkpoint Delta — qc-site-map

> Title: Checkpoint Delta qc-site-map | Created: 2026-07-02 | Author: Claude (QC Kit v3 rebuild) | Version: v1

Generic checkpoint/resume rules live in `.claude/config/checkpoint-protocol.md`. Read that ONCE at skill start. This file declares only this skill's delta.

**Scope:** singleton — checkpoints at `.claude/skills/qc-site-map/process-logging/` (flat). This skill checkpoints per **workflow** (not per phase): `progress.md` uses `last_workflow_done` / `next_workflow` instead of phase numbers.

## Checkpoint files

| File | Owner workflow | Purpose |
|---|---|---|
| `progress.md` | all | Resume state (shared format; workflow-keyed). Records `mode: Initialization / Update / Mode3-ConfirmOrphans / Skipped`. |
| `00_run_control.md` | Workflow 0 | Resolved paths, mode decision, prerequisites, version preflight, source audit. |
| `01_site_map_model.md` | Workflow 1 | Screen-first site-map model (staged, pre-render). |
| `02_data_map_model.md` | Workflow 2 | Data-entity-first data-map model (staged, pre-render). |
| `03_commit_handoff_cleanup.md` | Workflow 3 | Render/commit status, semantic-change comparison, handoff decision. |
| `mode_3_confirm_orphans.md` | Mode 3 only | Orphan reconciliation decisions. |

Every checkpoint must record: run id, mode, workflow name, inputs used, output produced, changed/unmodified state, gaps/conflicts/assumptions, next workflow.

## Resume load table

| Resuming at workflow | Load |
|---|---|
| 1 | `00_run_control.md` |
| 2 | `00_run_control.md`, `01_site_map_model.md` |
| 3 | `00_run_control.md`, `01_site_map_model.md`, `02_data_map_model.md` |
| Mode 3 | `mode_3_confirm_orphans.md` (if present) + `.claude/skills/qc-site-map/inbox/dashboard-orphans.md` |

Do not re-prompt mode on resume — preserve the mode recorded by the interrupted run.

## Skill-specific cleanup conditions

Cleanup (delete `process-logging/`) only after ALL of:

- `qc-site-map.md` written successfully or confirmed unchanged;
- `qc-data-map.md` written, confirmed unchanged, or explicitly skipped with a reason;
- dashboard handoff written, preserved, or explicitly skipped with a reason;
- final handover summary produced.
