# qc-func-scenario-design — Update workflow

> Title: Scenario Update Workflow | Created: 2026-07-16 | Author: Claude (QC Kit fix round, spec S14/G2) | Version: v1
>
> Runs when scenarios already exist for the UC and a NEWER audited version is available (routing: SKILL.md §Workflow). Techniques, template, coverage rules, and quality gates stay in `../references/scenario-rules.md`. Checkpointing per `.claude/config/checkpoint-protocol.md` (per-UC scope; the deliverable IS the final checkpoint; `progress.md` only).

## Trigger

- A `func-test-scenarios` file `[UC-ID]_*_scenarios_*_v[N].md` already exists for `<UC-ID>`, AND
- the latest `uc-review-report` version for `<UC-ID>` is NEWER than the audited version recorded in the scenarios file header (`> Source:` line).
- If the recorded audited version is already the latest → nothing to update; report to the user and stop.

## Phase 0 — Setup

1. Identify `<UC-ID>`; resolve the HIGHEST-version scenarios file `v[N]` and the highest-version `uc-review-report`.
2. **Worklog:** append entry `status = "Running (Phase 1)"`, `input = [<scenarios v[N] path>, <new audited path>]`, `start = now`.
3. **Verdict gate (same as design mode):** if the new audited Verdict is `NOT READY` → STOP and ask whether to proceed. Never silently continue.

## Phase 1 — Diff analysis

1. Read the old scenarios file `v[N]` fully (every TS ID + content + Out-of-Scope Flags).
2. Read the NEW audited report. Use its Section 11 Change log (and Section 10.1 status changes) to target the changed areas first; where the change log is not specific enough, compare the affected audited sections against the scenario content directly.
3. Read `project-context-master` §3.0 (Variant kiểm thử + Project language). Missing file / blank fields → STOP and ask (same gate as design mode).
4. Build the change list — classify every impact as:
   - **Added** — new or changed audited content (flow, rule, AC, state, role) with no covering scenario;
   - **Modified** — an existing scenario whose intent / trace / expected condition changed;
   - **Removed** — an existing scenario whose source content no longer exists in the new audited version.
5. **Checkpoint:** `progress.md` → `last_phase_done: 1`; worklog → `status = "Phase 1 done"`.

## Phase 2 — Apply updates (ID rules — HARD)

- **Existing TS IDs are STABLE:** never renumber, never reassign, never reuse an ID.
- **Added** → draft new scenarios per `scenario-rules.md` (mandatory techniques + template), taking the NEXT sequential `TS_[UC-ID]_NNN` after the highest ID ever used in the file.
- **Modified** → keep the same TS ID; rewrite the scenario body from the new audited content.
- **Removed** → keep the scenario block and its ID; mark the title `[Removed — v[N+1]]` + one line stating the reason (which audited content disappeared/changed). Do NOT delete the block, do NOT free the ID.
- Unchanged scenarios are copied verbatim. Re-run the quality checks and Out-of-Scope Flags rules from `scenario-rules.md` on the full result.

## Phase 3 — Change log & write v[N+1]

1. Append (or extend) a section at the end of the file:

   ```markdown
   ## Change log v[N] → v[N+1]

   > Source: <new uc-review-report v[M] path> · Date: <YYYY-MM-DD>

   | Type | TS ID | What changed / why (audited trace) |
   |---|---|---|
   | Added / Modified / Removed | TS_[UC-ID]_NNN | ... |
   ```
2. Update the file header: `> Source:` → the new audited version; `> Generated:` → today.
3. Write the deliverable as `[UC-ID]_[feature-name]_scenarios_[YYYYMMDD]_v[N+1].md` — never overwrite `v[N]`.

## Phase 4 — Finalize

1. **Worklog:** rewrite last entry → `status = "Done"`, `end`, `duration_min`, `output = [<scenarios v[N+1] path>]`.
2. **Cleanup** per shared protocol §5 (delete `process-logging/<UC-ID>/`).
3. **Chat report** (Vietnamese): Added / Modified / Removed counts + affected TS IDs, and **recommend running `/qc-func-tc-design <UC-ID>` (update mode)** so the test cases follow the scenario changes.
