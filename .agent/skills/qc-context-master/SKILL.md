---
name: qc-context-master
description: Generates and maintains the project's knowledge core — project-context-master.md (10-section project context distilled from common files) and qc-dashboard.md (Feature/UC list with append-only/soft-delete; owns columns Site, ID, Module, name, In scope?). Auto-triggered by qc-project-onboarding after meta-config is set up. Also invoke directly when the user wants to regenerate or update project context, sync the feature list with the WBS, or resolve open questions. Trigger on /qc-context-master, "tổng hợp project context", "update project context", "update feature list", "đồng bộ feature list".
---

# QC Context Master Skill

## Trigger Conditions

- **Auto-triggered** by `qc-project-onboarding` immediately after Steps 1 & 2 complete and pre-flight passes.
- **Manually invoked** when the user:
  - Types `/qc-context-master`.
  - Says "tổng hợp project context", "update project context", "update feature scope", "đồng bộ feature list", "sync feature scope".

## Inputs
Read the `path-registry.md` file to find below files if the path is not already mentioned:
- `High-level-files`
- `requirement-common-files`
- Existing `project-context-master` (if any)
- Existing `qc-dashboard` (if any)
- Existing `project-config` (cross-reference for §1, §4, §8)
- Site abbreviation mapping (auto-managed): `.claude/skills/qc-context-master/state/site-abbreviations.md`
- Template `templates/project-context-template.md`
- Template `.claude/skills/qc-dashboard-sync/templates/qc-dashboard-template.md` (owned by `qc-dashboard-sync`; read here only for handoff-schema reference)

## Outputs
Read the `path-registry.md` file to find below files if the path is not already mentioned:
- `project-context-master`
- `qc-dashboard` — markdown table. This skill writes ONLY columns: `Site`, `<ID label>`, `Module`, `Feature/Use case name`, `In scope?`. Status columns (Specs/WF/Test scenario/Test cases/Execute) are owned by `qc-dashboard-sync` and MUST be left untouched.
- `.claude/skills/qc-context-master/state/site-abbreviations.md` — append-only mapping table.
- `agent-work-log` — append a new row at skill start, update in-place as phases progress (per `workflows/checkpoint-protocol.md` §2).

## Checkpoint & Resume

This skill writes **per-phase checkpoint files** to `.claude/skills/qc-context-master/process-logging/` so that a context-limit / interruption mid-run does NOT force the user to redo finished work. Read `workflows/checkpoint-protocol.md` ONCE at skill start; it defines:

- `process-logging/` directory layout and `progress.md` format
- Worklog update protocol (write-before-work rule)
- Resume detection at Phase 0
- Cleanup at Phase 8

The protocol is referenced by every Phase 5/6/7/8 workflow — do NOT duplicate its rules here.

## Workflow

### Phase 0 — Silent Audit + Resume Detection

> No user-facing output during the silent-audit substep.

1. Read existing `project-context-master` (if any) and `qc-dashboard` (if any).
2. Determine `mode`:
   - **First-time generation** — `project-context-master` does not exist or is empty.
   - **Update run** — file exists with real content.
3. **Resume detection** (per `workflows/checkpoint-protocol.md` §3):
   - Check `process-logging/progress.md`.
   - If found → ask user `Continue from Phase <next>?` or `Restart fresh?`. Branch accordingly.
   - If not found → fresh run.
4. Generate a new `run_id` (read `agent-work-log` for max ID, increment).
5. **Append a new row** to agent-work-log with `Status = Running (Phase 0)`, Input/Output empty, started_at recorded.

### Phase 1 — Pre-flight Check

Update worklog Status → `Running (Phase 1)`.

1. Resolve `High-level-files` logical name. If unconfigured, folder missing, or empty → STOP and output:
   > "Không tìm thấy high-level files (WBS, Product Brief, System Architecture Diagram, Tech Stack, ...) tại `<path>`. Vui lòng chuẩn bị các tài liệu này, sau đó chạy lại `/qc-context-master`."

2. Resolve `qc-dashboard` logical name from path-registry. The file does NOT need to exist yet — it will be created from template in Phase 5 if missing. If the logical name is missing from path-registry, STOP and ask the user to register it.

3. Read templates:
   - `.claude/skills/qc-context-master/templates/project-context-template.md`
   - `.claude/skills/qc-dashboard-sync/templates/qc-dashboard-template.md` (owned by `qc-dashboard-sync`)

Update worklog Status → `Phase 1 done`. (No checkpoint file — Phase 1 is cheap to re-run.)

### Phase 2 — Greeting

Update worklog Status → `Running (Phase 2)`.

Output exactly ONE of the two greeting blocks below (verbatim — hard-coded):

#### Greeting A — First-time generation

```
Bắt đầu tổng hợp tri thức dự án.

Tôi sẽ:
1. Đọc common files (WBS, Product Brief, System Architecture Diagram, Tech Stack, ...) tại `<High-level-files path>`.
2. Trích xuất 10 mục cho `project-context-master.md`, kèm confidence score + evidence cho mỗi mục.
3. Đồng bộ `qc-dashboard.md`: tạo file từ template nếu chưa có; thêm features mới từ WBS; soft-delete (`In scope? = Removed`) features đã bị remove. Không touch các cột status.
4. Phỏng vấn nhiều lượt (Pass A confirm → Pass B refine → Pass C direct Q&A) — mỗi lượt đều có option `skip`. Mục bị skip sẽ giữ tag `[AI-proposed]` và đẩy câu hỏi high-level vào Open Questions.

Tiến độ sẽ được lưu sau mỗi phase vào `process-logging/` — nếu bị gián đoạn, lần chạy sau có thể tiếp tục từ phase cuối cùng đã hoàn thành.

Bắt đầu...
```

#### Greeting B — Update run

```
Đồng bộ tri thức dự án.

Tôi sẽ:
1. Re-read common files để check cập nhật.
2. Carry-over Open Questions từ lần trước, resolve những câu giờ đã có data.
3. Đồng bộ `qc-dashboard.md`: append features mới, soft-delete (`In scope? = Removed`) features bị remove, re-add (`In scope? = Yes`) nếu cần.
4. Refresh các mục `project-context-master.md` từ nội dung mới nhất, re-score confidence; phỏng vấn nhiều lượt (Pass A/B/C, có `skip`) cho các mục còn thiếu hoặc còn tag `[AI-proposed]` từ lần trước.

Tiến độ sẽ được lưu sau mỗi phase vào `process-logging/` — nếu bị gián đoạn, lần chạy sau có thể tiếp tục từ phase cuối cùng đã hoàn thành.

Bắt đầu...
```

Update worklog Status → `Phase 2 done`.

### Phase 3 — Detect Output Language

Update worklog Status → `Running (Phase 3)`.

Follow `global-rules.md` to define the `project-context-master.md` language (keep template headers as-is in English).

Update worklog Status → `Phase 3 done`.

### Phase 4 — Carry-over from Previous Run

Update worklog Status → `Running (Phase 4)`.

If `project-context-master.md` exists:
1. Read Section 10 `Open Questions` table.
2. For each row with status `Open`, attempt to resolve from current common files.
3. Resolved → set status to `Resolved` (DO NOT delete the row — preserve audit trail).
4. Still unresolved → keep status `Open`; will re-ask in Phase 6.
5. Question IDs: keep originals (Q-001, Q-002, ...). New questions continue from `max(ID) + 1`.

If `project-context-master.md` does not exist, skip this phase's logic but still write the empty checkpoint.

**Checkpoint write** (per `workflows/checkpoint-protocol.md` §4):
1. Write `process-logging/04_carryover.md` capturing the resolved/open §10 question states (or an empty snapshot for first-time run).
2. Update `process-logging/progress.md` → `last_phase_done: 4`, `next_phase: 5`.
3. Update worklog Status → `Phase 4 done`.

### Phase 5 — Site Mapping + Feature List Sync

→ Dispatch to **`workflows/phase-5-dashboard-sync.md`**.

The workflow handles: site detection, dashboard create-or-update, delta computation, write, deltas report, checkpoint, and worklog update. Control returns here after `qc-dashboard.md` is written and `05_deltas.md` checkpoint is saved.

### Phase 6 — Extract, Propose, and Interview

→ Dispatch to **`workflows/phase-6-extract-interview.md`**.

The workflow handles: extraction of 10 sections with confidence scoring (Phase 6.1), the three interview passes (Pass A consolidated review, Pass B per-section refinement, Pass C per-section Q&A), per-section checkpointing, and worklog updates. Control returns here after the last Pass C section is processed.

### Phase 7 + 8 — Finalize & Handover

→ Dispatch to **`workflows/phase-7-8-finalize.md`**.

The workflow handles: final render of `project-context-master.md`, write to disk, handover summary output, final worklog update (`Status = Done`, Duration), and `process-logging/` cleanup.
