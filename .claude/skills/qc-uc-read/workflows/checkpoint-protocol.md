# Checkpoint & Resume Protocol

> **Scope:** Shared rules referenced by all `qc-uc-read` workflow phase files. Read this once at skill start.
>
> **Purpose:** Make the skill resilient to context-limit / interruption mid-run by:
> (1) persisting per-phase intermediate output to disk, (2) updating the `agent-work-log` row in-place at every phase boundary, (3) updating the UC's row in `qc-dashboard.md` (Review stt column) at every phase boundary, and (4) detecting prior checkpoints on the next run so the user does not redo finished work.

---

## 1. `process-logging/` directory

All checkpoint files live in `.claude/skills/qc-uc-read/process-logging/<UC-ID>/`. Create the folder lazily — when the first checkpoint is written. One subfolder per UC so the skill can run for multiple UCs concurrently without conflict.

### File layout

| File                        | Owner phase           | Content                                                                                       |
| --------------------------- | --------------------- | --------------------------------------------------------------------------------------------- |
| `progress.md`               | All phases            | State machine — current run metadata + last completed phase                                   |
| `01_synthesis.md`           | First audit Phase 1   | 5 synthesis sections + Section 4 inventory with `Delta = 0` coverage verified                 |
| `02_scoring.md`             | First audit Phase 2   | Scoring table (10 KA) + cross-artefact conflicts + blocker list                               |
| `01_applied-answers.md`     | Re-audit Phase 1      | Updated synthesis sections after BA answers integrated + image re-scan delta verified         |
| `02_recalculated.md`        | Re-audit Phase 2      | Updated scoring table + backlog status changes (resolved / new open questions)                |

Phase 3 in both workflows writes the **real deliverable** (`uc-review-report v[N].md`) to the output folder — this IS the final checkpoint. No separate `03_*.md` file needed.

### `progress.md` format

Single source of truth for resume. Overwrite on every checkpoint write.

```markdown
# qc-uc-read progress — <UC-ID>

- run_id: run-XXX
- uc_id: UC-XXX
- mode: <first-audit | re-audit>
- started_at: <ISO-8601 datetime>
- last_phase_done: <phase-number>   # 0, 1, 2, 3
- next_phase: <phase-number>
- updated_at: <ISO-8601 datetime>

## Notes
<any per-run scratch data — e.g. detected output language, version of input read, ...>
```

---

## 2. agent-work-log update protocol

The `agent-work-log` row is the **user-visible** status. The skill is allowed to update its **own** row in-place (columns `Status`, `Input`, `Output`, `Duration`). See `docs/qc-lead/agent-work-log.md` for column schema.

### Lifecycle

| When                                | Action                                                                                                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Skill start (after Phase 0 routing) | **Append** a new row: `Status = Running (Phase 1)`, Input/Output empty, Duration empty.                                                                      |
| Before entering Phase N             | **Update Status** → `Running (Phase <N>)`. Update `Input` with any new files read in this phase.                                                            |
| After Phase N done                  | **Update Status** → `Phase <N> done`. Update `Output` with any user-visible files written.                                                                  |
| After final phase done              | **Update Status** → `Done`. Update `Duration` = now − started_at, rounded to 1 decimal.                                                                      |
| Resume detection (next run)         | **Append a new row** for the new run; if prior row's Status was `Running (...)`, update prior row's Status → `Interrupted (last: Phase <N>)`.              |

### Files excluded from Input/Output columns

- Anything under `process-logging/` — internal scratchpad, not a deliverable.
- `progress.md` — internal.
- Templates and references (`.claude/skills/.../templates/*`, `.claude/skills/.../references/*`).

User-visible deliverables that DO go into Output: `uc-review-report v[N].md`, `question-backlog` (if updated).

### Write-before-work rule

Update `agent-work-log` Status **before** starting a phase, not after. If interruption happens mid-phase, the worklog already reflects the last "in progress" state, and the resume logic can recognize it.

---

## 3. qc-dashboard update protocol

`qc-uc-read` owns ONE column in `qc-dashboard.md`: **`Review stt`** (Review status). The UC's row is identified by matching the `<ID_LABEL>` column (column 2) against the UC-ID being audited.

> **Graceful degradation:** If the `Review stt` column does NOT exist in the current `qc-dashboard.md`, skip dashboard update (worklog update still happens). Log a one-line warning in the agent's user-facing output: *"Cột `Review stt` chưa tồn tại trong qc-dashboard.md — bỏ qua update dashboard. Thêm cột này để bật tracking."*

### Status values

| When                            | Value to write into `Review stt` cell                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Before entering Phase N         | `Running — <phase friendly name>` (e.g., `Running — Synthesizing Requirement Understanding`)               |
| After Phase N done              | `<phase friendly name> done` (e.g., `Synthesizing Requirement Understanding done`)                          |
| After final phase done          | `<Verdict> v<N> (Score <X>/100)` (e.g., `Conditionally Ready v2 (Score 73.1/100)`, `Not Ready v1 (Score 45/100)`) |
| Resume after interruption       | Overwrite the stale `Running — ...` value with the new run's `Running — ...` value (no Interrupted state needed in dashboard) |

### Phase friendly names

Use these names verbatim in both `agent-work-log` (`Status` column) and `qc-dashboard` (`Review stt` column). They are output in the **input UC document's language** (if Vietnamese UC → Vietnamese names; otherwise English).

| Workflow      | Phase | English name                              | Vietnamese name                                          |
| ------------- | ----- | ----------------------------------------- | -------------------------------------------------------- |
| first-audit   | 1     | Synthesizing Requirement Understanding    | Tổng hợp hiểu biết requirement                           |
| first-audit   | 2     | Scoring & Identifying Gaps                | Chấm điểm & xác định gap                                  |
| first-audit   | 3     | Generating Review Report                  | Tạo báo cáo review                                       |
| re-audit      | 1     | Applying BA Answers                       | Áp dụng câu trả lời BA                                    |
| re-audit      | 2     | Recalculating Score & Updating Backlog    | Tính lại điểm & cập nhật backlog                          |
| re-audit      | 3     | Generating Updated Report v[N+1]          | Tạo báo cáo cập nhật v[N+1]                              |

---

## 4. Resume detection (runs at Phase 0)

At skill start, after the routing decision is made (first-audit vs re-audit) and `<UC-ID>` is determined:

1. Check `.claude/skills/qc-uc-read/process-logging/<UC-ID>/progress.md`.
   - **Not found** → fresh run. Generate new `run_id` (read `agent-work-log` for max ID, increment). Skip to Phase 1.
   - **Found** → there is a prior incomplete run. Continue to step 2.
2. Read `last_phase_done`, `next_phase`, and `mode`.
3. Ask the user (ONE message, blocking):
   ```
   Phát hiện checkpoint từ run trước cho UC <UC-ID>:
   - Run ID: <run_id>
   - Mode: <first-audit | re-audit>
   - Bắt đầu lúc: <started_at>
   - Đã hoàn thành: Phase <last_phase_done> (<phase friendly name>)

   Bạn muốn:
   1. **Continue** — tiếp tục từ Phase <next_phase>
   2. **Restart** — chạy lại từ đầu (xoá toàn bộ checkpoint cũ)
   ```
4. If user picks **Continue**:
   - Set the prior `agent-work-log` row Status → `Resumed by run-<new>` (one-time edit).
   - Append a new `agent-work-log` row for the new run with `Status = Running (Phase <next_phase>)`.
   - Load required checkpoint files (see "Resume load table" below).
   - Jump to `next_phase` workflow file.
5. If user picks **Restart**:
   - Delete `.claude/skills/qc-uc-read/process-logging/<UC-ID>/` folder entirely.
   - Set the prior `agent-work-log` row Status → `Interrupted (last: Phase <last_phase_done>)`.
   - Append new `agent-work-log` row, start fresh from Phase 1.

### Resume load table

When resuming, load these files INTO MEMORY before executing the next phase:

| Mode          | Resuming at Phase | Files to load from `process-logging/<UC-ID>/`                      |
| ------------- | ----------------- | -------------------------------------------------------------------- |
| first-audit   | 2                 | `01_synthesis.md`                                                    |
| first-audit   | 3                 | `01_synthesis.md`, `02_scoring.md`                                   |
| re-audit      | 2                 | `01_applied-answers.md` + previous `uc-review-report v[N].md`        |
| re-audit      | 3                 | `01_applied-answers.md`, `02_recalculated.md` + previous `uc-review-report v[N].md` |

Also re-resolve all `path-registry` logical names — paths may have changed since the last run.

---

## 5. Checkpoint write protocol (used by every phase)

After completing a phase, the workflow MUST execute these 4 steps **in order, atomically as possible**:

1. **Write the checkpoint file** for this phase (markdown, full content as defined per phase workflow). For Phase 3, this step is the actual deliverable write (`uc-review-report v[N].md`).
2. **Update `process-logging/<UC-ID>/progress.md`** — set `last_phase_done`, `next_phase`, `updated_at`.
3. **Update the `agent-work-log` row** — set Status to `Phase <N> done`, append any new Input/Output files (excluding `process-logging/`).
4. **Update the `qc-dashboard.md` `Review stt` cell** for this UC — set to `<phase friendly name> done` (or the final verdict if Phase 3).

---

## 6. Cleanup

After the final phase (Phase 3) finishes successfully:

1. Set `agent-work-log` Status → `Done`. Final Duration calculation.
2. Set `qc-dashboard.md` `Review stt` cell → `<Verdict> v<N> (Score <X>/100)`.
3. **Delete the entire `.claude/skills/qc-uc-read/process-logging/<UC-ID>/` folder.** It is scratch — not part of project deliverables.

Cleanup must NOT happen mid-run, even on error. Only on successful Phase 3 completion.

---

## 7. Failure modes

| Symptom                                                  | Recovery                                                                         |
| -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `progress.md` exists but no checkpoint files             | Treat as fresh run; warn user and delete `progress.md`.                          |
| Checkpoint file referenced by `progress.md` missing      | STOP and ask user; do not silently re-derive.                                    |
| `agent-work-log` row missing for current `run_id`        | Append a new row; do not fail the skill.                                         |
| Path-registry logical name changed between runs          | Re-resolve from current registry; if path differs, ask user before continuing.   |
| `Review stt` column missing in qc-dashboard.md           | Skip dashboard update; warn user once (see §3 Graceful degradation).             |
