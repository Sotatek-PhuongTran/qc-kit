# Shared Checkpoint & Resume Protocol

> Title: Shared Checkpoint & Resume Protocol | Created: 2026-07-02 | Author: Claude (QC Kit v3 rebuild) | Version: v1

**Scope:** THE single checkpoint/resume protocol for every skill in this kit. Skills MUST NOT duplicate these rules — each skill declares only its **delta**: (a) its checkpoint file list, (b) its resume load table, (c) whether its scope is per-UC or singleton.

**Purpose:** Make long runs resilient to context-limit / interruption by (1) persisting per-phase output to disk, (2) updating the device's worklog JSONL at every phase boundary, (3) detecting prior checkpoints on the next run so finished work is never redone.

---

## 1. `process-logging/` directory

All checkpoint files live under the invoking skill's folder:

- **Per-UC skills** (qc-uc-read, qc-func-scenario-design, qc-func-tc-design, qc-func-auto-generate, qc-api-read, qc-api-scenario-design, qc-api-tc-design, qc-api-auto-generate — danh sách minh họa; NGUỒN CHUẨN về scope là delta file `workflows/checkpoint-protocol.md` của từng skill, skill không có delta = không dùng checkpoint): `.claude/skills/<skill>/process-logging/<UC-ID>/` — one subfolder per UC so multiple UCs can run without conflict.
- **Singleton skills** (qc-context-master, qc-site-map): `.claude/skills/<skill>/process-logging/` — flat.

Create lazily on first checkpoint write. This folder is internal scratch — never a deliverable, never committed as project output.

### `progress.md` format (single source of truth for resume)

Overwrite on every checkpoint write:

```markdown
# <skill> progress — <UC-ID or project>

- run_id: run-XXX
- uc_id: <UC-ID>            # per-UC skills only
- mode: <skill-defined>
- started_at: <ISO-8601>
- last_phase_done: <N>
- next_phase: <N>
- status: Running (Phase <N>)
- updated_at: <ISO-8601>

## Notes
<resume-critical scratch: detected language, input versions read, ...>
```

The `status:` line is also read by `qc-dashboard-sync` for in-progress detection — keep the key name exactly `status`.

## 2. Worklog updates

All worklog writes target the device's JSONL under `worklog-per-device` (resolve via `path-registry.md`). Schema, lifecycle (write-before-work), `run_id` generation, terminal states, and cross-platform mutation commands are defined ONCE in `docs/qc-lead/agent-work-log.local/README.md`. Do not duplicate them.

Exclude from `input`/`output` arrays: anything under `process-logging/`, templates, references. Only user-visible deliverables go into `output`.

## 3. Resume detection (Phase 0 of every skill)

1. Check the skill's `progress.md` (per-UC subfolder or flat, per §1).
   - **Not found** → fresh run: generate `run_id`, append worklog entry `Running (Phase 1)`, go to Phase 1.
   - **Found** → prior incomplete run exists; continue below.
2. Read `run_id`, `mode`, `last_phase_done`, `next_phase`.
3. Ask the user ONE blocking question (Vietnamese):

   ```
   Phát hiện checkpoint từ run trước (<skill>, <UC-ID hoặc project>):
   - Run ID: <run_id> | Mode: <mode> | Bắt đầu: <started_at>
   - Đã xong: Phase <last_phase_done>
   1. Continue — tiếp tục từ Phase <next_phase>
   2. Restart — chạy lại từ đầu (xóa checkpoint cũ)
   ```

4. **Continue** → worklog: rewrite prior entry `status = "Resumed by run-<new>"`, append new entry `Running (Phase <next_phase>)`; load the files listed in the skill's resume load table; jump to `next_phase`. Preserve the recorded `mode` — do not re-prompt.
5. **Restart** → delete the checkpoint folder; worklog: rewrite prior entry `status = "Interrupted (last: Phase <last_phase_done>)"`, append fresh entry; start at Phase 1.
6. Always re-resolve `path-registry.md` logical names on resume — paths may have changed.

## 4. Checkpoint write (end of every phase, in order)

1. Write this phase's checkpoint file (or the real deliverable, if this phase produces one — the deliverable IS the checkpoint; no duplicate file).
2. Overwrite `progress.md`: `last_phase_done`, `next_phase`, `status`, `updated_at`.
3. Update worklog entry: `status = "Phase <N> done"`, append new `output` files.

## 5. Cleanup (only after the FINAL phase succeeds AND the chat report is sent)

1. Worklog: rewrite last entry `status = "Done"`, `end = now`, `duration_min`.
2. Delete the skill's checkpoint folder (`process-logging/<UC-ID>/` or `process-logging/`) entirely.

Never clean up mid-run, even on error — an interrupted run must leave its checkpoints for resume.

## 6. Failure modes

| Symptom | Recovery |
|---|---|
| `progress.md` exists but checkpoint files missing | Warn user, delete `progress.md`, treat as fresh run. |
| Checkpoint file referenced by `progress.md` missing | STOP and ask user; do not silently re-derive. |
| Worklog JSONL has no entry for current `run_id` | Append a new entry; do not fail the skill. |
| Path-registry logical name changed between runs | Re-resolve; if path differs, ask user before continuing. |
