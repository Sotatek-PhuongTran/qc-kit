# Checkpoint Delta — qc-api-tc-design

> Title: Checkpoint Delta qc-api-tc-design | Created: 2026-07-10 | Author: QC Kit (API extension — step 4) | Version: v1

Generic rules: `.claude/config/checkpoint-protocol.md` — read ONCE at skill start. This file declares only the delta.

**Scope:** per-UC — `.claude/skills/qc-api-tc-design/process-logging/<UC-ID>/`. `progress.md` additionally records `mode: <generate | update>` and, in update mode, `status: Awaiting approval` during the Step 2 pause.

## Checkpoint files

| File | Owner | Content |
|---|---|---|
| `progress.md` | all | Resume state + `## Phase 1 Summary` block (per-variant: totals per section, language, scratch path, deliverable md paths). |
| `02_designed_api_tcs_<V>.md` | Phase 1 Step 3.5 | Full deliverable content per variant — atomic single Write; auto-recovery source for Phase 2 Step 0. |
| `01_update_plan.md` | Update Step 2 | The approved impact plan (NEW/UPDATED/DELETED per TC) — written at approval time. |

Phase 2's xlsx is a derived artifact — the md deliverable is the durable checkpoint.

## Resume load table

| Mode | Resuming at | Load |
|---|---|---|
| generate | Phase 1 Step 3.5+ | nothing (redo from inputs) — scratch absent means Phase 1 incomplete |
| generate/update | Phase 2 | `02_designed_api_tcs_<V>.md` (all variants) + `## Phase 1 Summary` |
| update | Step 2 pause (`Awaiting approval`) | `01_update_plan.md` — re-present the plan, wait again |

## Verified-transition rule

`last_phase_done: 1` is written ONLY by Phase 2 Step 0 after the scratch↔deliverable comparison passes for ALL variants — a partial md can never be silently accepted on resume.

## Deliverables recorded in worklog `output`

Per-variant `*_api-testcases_<variant>_<YYYYMMDD>_v<N>.md` (+ parts), `*_api-testcases_<variant>_<YYYYMMDD>_v<N>.xlsx` (same base name).
