# Checkpoint Delta — qc-api-auto-generate

> Title: Checkpoint Delta qc-api-auto-generate | Created: 2026-07-10 | Author: QC Kit (API extension — step 5) | Version: v1

Generic rules: `.claude/config/checkpoint-protocol.md` — read ONCE at skill start. This file declares only the delta.

**Scope:** per-UC — `.claude/skills/qc-api-auto-generate/process-logging/<UC-ID>/`. `progress.md` additionally records `workflow: <generate | update>` and whether the probe ran.

## Checkpoint files

| File | Owner phase | Content |
|---|---|---|
| `progress.md` | all | Resume state (shared format). Its `status:` line feeds the dashboard in-progress display. |
| `01_probe_<resource>.md` | Phase 2 | Per-resource probe result: endpoint → status observed + verdict (OK / finding #N). Written after each resource so an interrupted multi-resource probe resumes per resource. Unverifiable endpoints are NOT parked here — they go straight to `api-findings`. |

Generated code files (services, specs, data md, api-conventions.ts) are deliverables — their own checkpoints; no duplicates in process-logging.

## Resume load table

| Resuming at | Load |
|---|---|
| Phase 2 (mid-probe) | `01_probe_<resource>.md` for resources already probed — skip re-probing them. |
| Phase 3 | All `01_probe_*.md` + the TC md + existing services + `api-findings` of the touched resources. |

## Skill-specific notes

- Cleanup only after the final report is sent (dashboard reads `progress.md` existence as in-progress).
- Never store tokens, credentials, or full auth responses in any checkpoint file — probe checkpoints record status codes and element names only.
