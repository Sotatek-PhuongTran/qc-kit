# Checkpoint & Resume Protocol

> **Scope:** Shared rules referenced by all `qc-context-master` workflows. Read this once at skill start.
>
> **Purpose:** Make the skill resilient to context-limit / interruption mid-run by:
> (1) persisting per-phase intermediate output to disk, (2) updating the worklog row in-place at every phase boundary, and (3) detecting prior checkpoints on the next run so the user does not redo finished work.

---

## 1. `process-logging/` directory

All checkpoint files live in `.claude/skills/qc-context-master/process-logging/`. Create the folder lazily — when the first checkpoint is written.

### File layout

| File                          | Owner phase | Content                                                                 |
|-------------------------------|-------------|-------------------------------------------------------------------------|
| `progress.md`                 | Phase 0+    | State machine — current run metadata + last completed phase             |
| `04_carryover.md`             | Phase 4     | Snapshot of §10 Open Questions after resolve attempt                    |
| `05_deltas.md`                | Phase 5     | Dashboard sync summary (new / soft-deleted / re-added rows)             |
| `06_1_draft.md`               | Phase 6.1   | Full 10-section draft with `_[AI-proposed | confidence: NN% | evidence: ...]_` tags |
| `06_3a_after_passA.md`        | Phase 6.3.A | Draft after Pass A (sections accepted/modified)                         |
| `06_3b_passB_§<N>.md`         | Phase 6.3.B | Per-section checkpoint after each Pass B interaction                    |
| `06_3c_passC_§<N>.md`         | Phase 6.3.C | Per-section checkpoint after each Pass C Q&A                            |

### `progress.md` format

Single source of truth for resume. Overwrite on every checkpoint write.

```markdown
# qc-context-master progress

- run_id: run-XXX
- mode: <first-time | update>
- started_at: <ISO-8601 datetime>
- last_phase_done: <phase-id>   # e.g. 0, 1, 4, 5, 6.1, 6.3a, 6.3b:§3, 6.3c:§7, 7
- next_phase: <phase-id>
- updated_at: <ISO-8601 datetime>

## Notes
<any per-run scratch data — e.g. detected ID label, site abbreviations to add, ...>
```

---

## 2. Worklog update protocol

The `agent-work-log` row is the **user-visible** status. The skill is allowed to update its **own** row in-place (cột `Status`, `Input`, `Output`, `Duration`). See `docs/qc-lead/agent-work-log.md` for column schema.

### Lifecycle

| When                                | Action                                                                                          |
|-------------------------------------|-------------------------------------------------------------------------------------------------|
| Skill start (after pre-flight pass) | **Append** a new row: `Status = Running (Phase 0)`, Input/Output empty, Duration empty.        |
| Before entering Phase N             | **Update Status** → `Running (Phase <N>)`. Update `Input` with any new files read in this phase. |
| After Phase N done                  | **Update Status** → `Phase <N> done`. Update `Output` with any user-facing files written.        |
| After Phase 7 done                  | **Update Status** → `Done`. Update `Duration` = now − started_at, rounded to 1 decimal.        |
| Resume detection (next run)         | **Append a new row** for the new run; if prior row's Status was `Running (...)`, update prior row's Status → `Interrupted (last: Phase <N>)`. |

### Files excluded from Input/Output columns

- Anything under `process-logging/` — internal scratchpad, not a deliverable.
- `progress.md` — internal.
- Templates and state files (`.claude/skills/.../templates/*`, `.claude/skills/.../state/*`).

User-visible deliverables that DO go into Output: `project-context-master.md`, `qc-dashboard.md`.

### Write-before-work rule

Update worklog Status **before** starting a phase, not after. If interruption happens mid-phase, the worklog already reflects the last "in progress" state, and the resume logic can recognize it.

---

## 3. Resume detection (runs at Phase 0)

At skill start, after Phase 0 silent audit:

1. Check `process-logging/progress.md`.
   - **Not found** → fresh run. Generate new `run_id`. Skip to Phase 1.
   - **Found** → there is a prior incomplete run. Continue to step 2.
2. Read `last_phase_done` and `next_phase`.
3. Ask the user (ONE message, blocking):
   ```
   Phát hiện checkpoint từ run trước:
   - Run ID: <run_id>
   - Bắt đầu lúc: <started_at>
   - Đã hoàn thành: Phase <last_phase_done>

   Bạn muốn:
   1. **Continue** — tiếp tục từ Phase <next_phase>
   2. **Restart** — chạy lại từ đầu (xoá toàn bộ checkpoint cũ)
   ```
4. If user picks Continue:
   - Set the prior worklog row Status → `Resumed by run-<new>` (one-time edit).
   - Append a new worklog row for the new run with `Status = Running (Phase <next_phase>)`.
   - Load required checkpoint files (see "Resume load table" below).
   - Jump to `next_phase`.
5. If user picks Restart:
   - Delete `process-logging/` folder entirely.
   - Set the prior worklog row Status → `Interrupted (last: Phase <last_phase_done>)`.
   - Append new worklog row, start fresh from Phase 1.

### Resume load table

When resuming, load these files INTO MEMORY before executing the next phase:

| Resuming at Phase | Files to load from process-logging/                                                  |
|-------------------|---------------------------------------------------------------------------------------|
| 5                 | `04_carryover.md`                                                                     |
| 6.1               | `04_carryover.md`, `05_deltas.md`                                                     |
| 6.3.A             | `06_1_draft.md`                                                                       |
| 6.3.B             | `06_3a_after_passA.md` (or `06_1_draft.md` if Pass A was skipped)                    |
| 6.3.C             | Latest `06_3b_passB_§<N>.md` (highest §N), else `06_3a_after_passA.md`               |
| 7                 | Latest `06_3c_passC_§<N>.md`, else latest `06_3b_passB_§<N>.md`, else `06_3a_after_passA.md` |

Also re-resolve all `path-registry` logical names — paths may have changed since the last run.

---

## 4. Checkpoint write protocol (used by every phase)

After completing a phase, the workflow MUST execute these 3 steps **in order, atomically as possible**:

1. **Write the checkpoint file** for this phase (markdown, full content as defined per-workflow).
2. **Update `process-logging/progress.md`** — set `last_phase_done`, `next_phase`, `updated_at`.
3. **Update the agent-work-log row** — set Status to `Phase <N> done`, append any new Input/Output files (excluding process-logging).

If a phase writes a real deliverable to disk (Phase 5 → `qc-dashboard.md`, Phase 7 → `project-context-master.md`), do that FIRST, then do steps 1–3.

---

## 5. Cleanup

After Phase 8 (Handover) finishes successfully:

1. Set worklog Status → `Done`. Final Duration calculation.
2. **Delete the entire `process-logging/` folder.** It is scratch — not part of project deliverables.

Cleanup must NOT happen mid-run, even on error. Only on successful Phase 8 completion.

---

## 6. Failure modes

| Symptom                                                  | Recovery                                                                         |
|----------------------------------------------------------|----------------------------------------------------------------------------------|
| `progress.md` exists but no checkpoint files             | Treat as fresh run; warn user and delete `progress.md`.                          |
| Checkpoint file referenced by `progress.md` missing      | STOP and ask user; do not silently re-derive.                                    |
| Worklog row missing for current `run_id`                 | Append a new row; do not fail the skill.                                         |
| Path-registry logical name changed between runs          | Re-resolve from current registry; if path differs, ask user before continuing.   |
