# Phase 0 - Audit and Resume Detection

Goal: determine whether this is a fresh run or a resumed run.

## Steps

1. Read `workflows/checkpoint-protocol.md`.
2. Check `.claude/skills/qc-context-master/process-logging/progress.md`.
3. If no progress file exists, continue as a fresh run.
4. If progress exists, read `run_id`, `mode`, `last_phase_done`, and `next_phase`.
5. Ask the user whether to continue from `next_phase` or restart.
6. If the user chooses restart, delete `process-logging/` and continue to Phase 1.
7. If the user chooses continue, load checkpoint files based on the resume load table and continue from `next_phase`.

## Output

No checkpoint is required for a fresh run in Phase 0. If resuming, update `progress.md` with the new run ID and continue.

## User-facing message on resume

Use Vietnamese:

```text
Phat hien checkpoint tu run truoc:
- Run ID: <run_id>
- Da hoan thanh: Phase <last_phase_done>
- Phase tiep theo: <next_phase>

Ban muon:
1. Continue - tiep tuc tu phase tiep theo
2. Restart - chay lai tu dau va xoa checkpoint cu
```
