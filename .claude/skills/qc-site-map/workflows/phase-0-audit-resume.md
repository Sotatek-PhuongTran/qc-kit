# Phase 0 - Audit and Resume

## Goal

Detect whether this is a new run or a resume run.

## Steps

1. Check `process-logging/qc-site-map/progress.md`.
2. If found, read the last completed phase and next phase.
3. Check whether required checkpoint files exist.
4. Resume from the next safe phase.
5. If no progress file exists, start from Phase 1.

## Output checkpoint

Update or create:

```text
process-logging/qc-site-map/progress.md
```

Minimum content:

```md
# QC Site Map Progress

- run_id:
- mode: Unknown / Initialization / Update
- last_phase_done: 0
- next_phase: 1
- status: Running
- notes:
```
