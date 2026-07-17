# qc-api-scenario-design — Update workflow

> Title: API Scenario Update Workflow | Created: 2026-07-16 | Author: Claude (QC Kit fix round, spec S14/G2) | Version: v1
>
> Runs when API scenarios already exist for the UC and a NEWER api-audited version is available (routing: SKILL.md §Workflow). Techniques, template, coverage areas, and quality gates stay in `../references/api-scenario-rules.md`. Checkpointing per `.claude/config/checkpoint-protocol.md` (per-UC scope; the deliverable IS the final checkpoint; `progress.md` only).

## Trigger

- An `api-test-scenarios` file `[UC-ID]_*_api-scenarios_*_v[N].md` already exists for `<UC-ID>`, AND
- the latest `api-audited` version for `<UC-ID>` is NEWER than the audited version recorded in the scenarios file header (`> Source:` line).
- If the recorded api-audited version is already the latest → nothing to update; report to the user and stop.

## Phase 0 — Setup

1. Identify `<UC-ID>`; resolve the HIGHEST-version scenarios file `v[N]` and the highest-version `api-audited`.
2. **Worklog:** append entry `status = "Running (Phase 1)"`, `input = [<scenarios v[N] path>, <new api-audited path>]`, `start = now`.
3. **Verdict gate (same as design mode):** if the new api-audited verdict is `Not Ready` → STOP and ask whether to proceed. Never silently continue.

## Phase 1 — Diff analysis

1. Read the old scenarios file `v[N]` fully (every TS ID + content + "Tham chiếu endpoint-level" rows + Out-of-Scope Flags).
2. Read the NEW api-audited. Use its §10 Change log (and §8 status changes) to target the changed areas first; where the change log is not specific enough, compare the affected sections (§2 operations & roles, §3 validation, §4 bảng hợp nhất, §5 permissions, §6 AC) against the scenario content directly.
3. Read `project-context-master` §3.0 → Phạm vi test (+ Project language). Missing file / blank fields → STOP and ask (same gate as design mode). Re-record `mix_in_scope`.
4. Build the change list — classify every impact as:
   - **Added** — new/changed audited content (operation, §3 rule, §4 flow/transition, §5 cell, AC) with no covering scenario;
   - **Modified** — an existing scenario whose intent / trace / expected condition changed;
   - **Removed** — an existing scenario whose source content no longer exists in the new api-audited version.
   A §2 "Vai trò" flip (Owner ↔ Reuse) is a change: apply the owner-only rule from design mode — endpoint-level scenarios of an OP that became `Reuse` are marked Removed and replaced by a "Tham chiếu endpoint-level" row; an OP that became `Owner` gets new endpoint-level scenarios.
5. **Checkpoint:** `progress.md` → `last_phase_done: 1`; worklog → `status = "Phase 1 done"`.

## Phase 2 — Apply updates (ID rules — HARD)

- **Existing TS IDs are STABLE:** never renumber, never reassign, never reuse an ID.
- **Added** → draft new scenarios per `api-scenario-rules.md` (mandatory techniques + template + owner-only rule), taking the NEXT sequential `TS_API_[UC-ID]_NNN` after the highest ID ever used in the file.
- **Modified** → keep the same TS ID; rewrite the scenario body from the new audited content.
- **Removed** → keep the scenario block and its ID; mark the title `[Removed — v[N+1]]` + one line stating the reason. Do NOT delete the block, do NOT free the ID.
- Unchanged scenarios are copied verbatim. Refresh the "Tham chiếu endpoint-level" section, re-run the quality checks from `api-scenario-rules.md` and the `qc-writting-rules.md` §5 gate on the full result.

## Phase 3 — Change log & write v[N+1]

1. Append (or extend) a section at the end of the file:

   ```markdown
   ## Change log v[N] → v[N+1]

   > Source: <new api-audited v[M] path> · Date: <YYYY-MM-DD>

   | Type | TS ID | What changed / why (audited trace) |
   |---|---|---|
   | Added / Modified / Removed | TS_API_[UC-ID]_NNN | ... |
   ```
2. Update the file header: `> Source:` → the new api-audited version; `> Generated:` → today; `> Phạm vi test:` if §3.0 changed.
3. Write the deliverable as `[UC-ID]_[feature-name]_api-scenarios_[YYYYMMDD]_v[N+1].md` — never overwrite `v[N]`.

## Phase 4 — Finalize

1. **Worklog:** rewrite last entry → `status = "Done"`, `end`, `duration_min`, `output = [<scenarios v[N+1] path>]`.
2. **Cleanup** per shared protocol §5 (delete `process-logging/<UC-ID>/`).
3. **Chat report** (Vietnamese): Added / Modified / Removed counts + affected TS IDs, and **recommend running `/qc-api-tc-design <UC-ID>` (update mode)** so the API test cases follow the scenario changes.
