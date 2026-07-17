# Checkpoint Delta — qc-context-master

> Title: Checkpoint Delta qc-context-master | Created: 2026-07-02 | Author: Claude (QC Kit v3 rebuild) | Version: v1

Generic checkpoint/resume rules (directory, `progress.md` format, worklog, resume prompt, write order, cleanup, failure modes) live in `.claude/config/checkpoint-protocol.md`. Read that ONCE at skill start. This file declares only this skill's delta.

**Scope:** singleton — checkpoints at `.claude/skills/qc-context-master/process-logging/` (flat).

## Checkpoint files

| File | Owner phase | Purpose |
|---|---|---|
| `progress.md` | all | Resume state (shared format). |
| `01_input_audit.md` | Phase 1 | Resolved paths, mode, source inventory, missing document groups. |
| `02_feature_inventory.md` | Phase 2 | Feature/use case candidates and inventory delta. |
| `03_context_section_01.md` … `03_context_section_08.md` | Phase 3 | Draft content, sources, gaps, assumptions, confidence per section. |
| `04_gap_readiness.md` | Phase 4 | Gap classification, readiness section, open questions. |
| `05_context_rendered.md` | Phase 5 | Final rendered context (with `Sources consolidated` table) + write status. |
| `06_sitemap_handoff.md` | Phase 6 | Site-map handoff decision: auto-invoked / suggested / none. |

## Resume load table

| Resuming at phase | Load |
|---|---|
| 1 | `progress.md` only |
| 2 | `01_input_audit.md` |
| 3 | `01_input_audit.md`, `02_feature_inventory.md` |
| 4 | all `03_context_section_*.md` + `02_feature_inventory.md` |
| 5 | all section checkpoints + `04_gap_readiness.md` |
| 6 | `05_context_rendered.md`, `02_feature_inventory.md` |
| 7 | `05_context_rendered.md`, `06_sitemap_handoff.md` (if present) |

## Skill-specific notes

- Deliverable: only `project-context-master.md`. Downstream files (`qc-site-map.md`, `qc-dashboard.md`) are owned by their skills — never written here.
- Cleanup after Phase 7 success, including on `Skipped` Phase 0 outcomes (clears stale checkpoints from prior partial runs).
