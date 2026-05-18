# Phase 0 - Audit, Resume, and Version Preflight

## Goal

Detect whether this is a new run or a resume run, and in Update mode run the version preflight to short-circuit when no source change is detected.

## Steps

1. Check `process-logging/qc-site-map/progress.md`.
2. If found, read the last completed phase and next phase.
3. Check whether required checkpoint files exist.
4. Resume from the next safe phase.
5. If no progress file exists, start from Phase 1.
6. **Version preflight (Update mode only — when the resolved `qc-site-map.md` already exists with real content):**
   1. Read the existing `qc-site-map.md`.
   2. Parse the `Sources consolidated` table (Section 2). Build `prevSources = [{ file, version }]`.
   3. For each entry in `prevSources`, resolve its parent folder (from `path-registry.md` logical names — typically project-context-master, high-level-files, wireframe folder, etc.) and scan for the highest version of files with the same base name (regex `_v(\d+)` on filename; if missing, treat as `no-version`).
   4. Classify per source: `same` / `upgraded` / `new-file` / `deleted` (same definitions as in qc-context-master Phase 0).
   5. If at least one source has status other than `same` → proceed to Phase 1 with the full pipeline.
   6. If ALL sources are `same` → ask the user:

      ```text
      Khong phat hien version moi cua cac source files da consolidated lan truoc:
      - <file 1>: v<N> (khong doi)
      - <file 2>: v<N> (khong doi)
      ...

      Luu y: co che nay chi detect version qua ten file (regex _v<N>).
      Neu ban da sua content ma khong tang version, hay tra loi yes de chay lai.

      Ban co muon chay lai khong? [yes/no]
      ```

   7. User answer `no` → JUMP TO Phase 10 cleanup (do NOT exit immediately). Phase 10 will: (a) delete the entire `process-logging/qc-site-map/` folder to clear any stale checkpoints from previous partial runs, (b) write the worklog row with `Status = Skipped (preflight no-change)`, (c) print the Vietnamese summary `Mode: Skipped`. Do NOT delete the existing `qc-site-map.md` output (the file stays valid).
   8. User answer `yes` → proceed to Phase 1.

## Output checkpoint

Update or create:

```text
process-logging/qc-site-map/progress.md
```

Minimum content:

```md
# QC Site Map Progress

- run_id:
- mode: Unknown / Initialization / Update / Skipped
- last_phase_done: 0
- next_phase: 1
- status: Running
- notes:
```

If Phase 0 stopped due to preflight `no`, set `status: Skipped` and `next_phase: —`.
