# Checkpoint Delta — qc-api-read

> Title: Checkpoint Delta qc-api-read | Created: 2026-07-10 | Author: QC Kit (API extension — step 2) | Version: v1

Generic checkpoint/resume rules live in `.claude/config/checkpoint-protocol.md`. Read that ONCE at skill start. This file declares only this skill's delta.

**Scope:** per-UC — checkpoints at `.claude/skills/qc-api-read/process-logging/<UC-ID>/`. `progress.md` additionally records `mode: <first-audit | re-audit>`.

## Checkpoint files

| File | Owner phase | Content |
|---|---|---|
| `progress.md` | all | Resume state (shared format). |
| `01_derivation.md` | First-audit Phase 1 | Full content of template sections §1–§6 (operation catalog, validation matrix, flows, permission matrix, AC). |
| `02_scoring.md` | First-audit Phase 2 | Ownership claim (vai trò per operation) + Issue Register + 5-area scoring table. |

Phase 3 writes the real deliverable (`api-audited v[N].md`) — that IS the final checkpoint; no `03_*.md` file.

**Re-audit** runs as a single uninterrupted flow with NO intermediate checkpoints — the output `api-audited v[N+1].md` IS the checkpoint. If `progress.md` shows `mode: re-audit` with `last_phase_done: 0`, offer only **Restart**.

## Resume load table

| Mode | Resuming at phase | Load |
|---|---|---|
| first-audit | 2 | `01_derivation.md` |
| first-audit | 3 | `01_derivation.md`, `02_scoring.md` |

## Deliverables recorded in worklog `output`

`api-audited v[N].md`, `api-question-backlog` (if updated via `qc-qna` API mode), `qc-api-coverage.md` (rebuilt at the end of EVERY run — coverage-rules v3).
