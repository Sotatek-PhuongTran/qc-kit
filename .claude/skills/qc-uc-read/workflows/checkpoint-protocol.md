# Checkpoint Delta — qc-uc-read

> Title: Checkpoint Delta qc-uc-read | Created: 2026-07-02 | Author: Claude (QC Kit v3 rebuild) | Version: v1

Generic checkpoint/resume rules live in `.claude/config/checkpoint-protocol.md`. Read that ONCE at skill start. This file declares only this skill's delta.

**Scope:** per-UC — checkpoints at `.claude/skills/qc-uc-read/process-logging/<UC-ID>/`. `progress.md` additionally records `mode: <first-audit | re-audit>`.

## Checkpoint files

| File | Owner phase | Content |
|---|---|---|
| `progress.md` | all | Resume state (shared format). |
| `01_synthesis.md` | First-audit Phase 1 | 5 synthesis sections + Section 4 inventory with `Delta = 0` coverage verified. |
| `02_scoring.md` | First-audit Phase 2 | Scoring table (10 KA) + cross-artefact conflicts + blocker list. |

Phase 3 writes the real deliverable (`uc-review-report v[N].md`) — that IS the final checkpoint; no `03_*.md` file.

**Re-audit** runs as a single uninterrupted flow with NO intermediate checkpoints — the output `uc-review-report v[N+1].md` IS the checkpoint. If `progress.md` shows `mode: re-audit` with `last_phase_done: 0`, offer only **Restart** (no partial state exists).

## Resume load table

| Mode | Resuming at phase | Load |
|---|---|---|
| first-audit | 2 | `01_synthesis.md` |
| first-audit | 3 | `01_synthesis.md`, `02_scoring.md` |

## Deliverables recorded in worklog `output`

`uc-review-report v[N].md`, `question-backlog` (if updated via `qc-qna`).
