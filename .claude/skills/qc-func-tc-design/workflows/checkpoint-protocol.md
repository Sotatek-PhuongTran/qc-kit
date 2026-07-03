# Checkpoint Delta — qc-func-tc-design

> Title: Checkpoint Delta qc-func-tc-design | Created: 2026-07-02 | Author: Claude (QC Kit v3 rebuild) | Version: v1

Generic checkpoint/resume rules live in `.claude/config/checkpoint-protocol.md`. Read that ONCE at skill start. This file declares only this skill's delta — which is substantial, because this skill has a two-phase verified-transition model, multi-variant scratch recovery, and an approval pause in the update workflow.

**Scope:** per-UC — checkpoints at `.claude/skills/qc-func-tc-design/process-logging/<UC-ID>/`. `progress.md` additionally records `workflow: <generate-test-cases | update-test-cases>`.

**Phase model:** Phase 1 = analysis + design + scratch + final `.md` (per platform variant); Phase 2 = `.md` → `.xlsx` conversion (per variant).

## Checkpoint files

| File | Owner phase | Content |
|---|---|---|
| `progress.md` | all | Resume state (shared format) + `## Phase 1 Summary` block appended at end of Phase 1 (one `### Variant: <name>` sub-block per variant — schema below). Update workflow may also hold a `## Phase 1 Approval Pending` block while paused (§3). |
| `02_designed_tcs_<variant>.md` | Phase 1 | **Source of truth per variant.** Atomic snapshot of the FULL TC list + RTM, written BEFORE the variant's deliverable `.md`. Phase 2 Step 0 uses it to auto-recover a partial/mismatched final md. |
| `pending_update_report.md` | Phase 1, update only | Temporary approval report shown to the user before any update is applied. Rewritten per revision (`R1` → `R2`…). Deleted after apply-and-verify or cancel. |

Phase 2's deliverable `.xlsx` IS its final checkpoint — no extra file.

### `## Phase 1 Summary` block schema

Top line `**Variants in scope:** <list>`, then per variant:

```markdown
### Variant: <variant-name>
**Scope reason:** <UPDATE_EXISTING | ADD_VARIANT>   <!-- update only -->
**Total test cases designed:** <N>
**GUI total:** <a>
**FUNC total:** <b>
**Output language:** <VI | EN>
**Scratch:** <absolute path to 02_designed_tcs_<variant>.md>
**Final MD file(s):** <absolute path(s), one bullet per part>

| Screen | Total | GUI | FUNC |
|---|---|---|---|

**Delta vs v[N]:** +<A> new, ~<U> updated, -<D> deleted   <!-- UPDATE_EXISTING only -->
```

Counts are discrete parseable integers on their own lines; paths are absolute (resolved from `path-registry.md` at write time); "Delta" is ASCII, not `Δ`.

## Verified-transition rule (`last_phase_done` semantics)

`last_phase_done` advances at the moment of TRANSITION to the next phase, not at end of the current phase:

- **End of Phase 1:** write scratches (1a) + final md per variant (1b), then the `## Phase 1 Summary` block (1c). Do NOT touch `last_phase_done`.
- **Start of Phase 2 (Step 0 verification gate):** per variant, compare final md against its summary sub-block (counts + per-screen breakdown). Mismatch → auto-recover from that variant's scratch (overwrite same-version final md), re-verify. Only when ALL variants pass → set `last_phase_done: 1`, `next_phase: 2`.
- **End of Phase 2** (last phase): write `last_phase_done: 2`, `next_phase: -` right after the last variant's `.xlsx` passes self-verification.

Write order at any boundary: `progress.md` first, then worklog JSONL.

## §3 Approval pause (update workflow only)

After impact analysis, the workflow writes `pending_update_report.md`, sends it to the user, and PAUSES. While paused: no scratch, no final md, no xlsx, no `last_phase_done` advance; worklog `status = "Waiting for user approval (Phase 1 update report)"`; `## Phase 1 Approval Pending` block present in `progress.md` (fields: report path, revision, trigger type, variants in scope, impact summary).

- **Revision:** rewrite the SAME report path atomically, bump `R<n>`, re-send, stay paused.
- **Approval:** continue Phase 1 apply steps; after final md write succeeds, delete the report + remove the block.
- **Cancel:** delete the report, remove the block, set `next_phase: -`, worklog `status = "Cancelled by user before applying update"`, stop WITHOUT cleanup (user may restart later).
- **Resume while paused** (block present + report exists on disk): skip the Continue/Restart prompt — re-send the latest revision and wait for the user's response.

## Resume load table

| Resuming at | Load |
|---|---|
| Phase 1 (fresh) | All inputs re-resolved from `path-registry.md`: UC review report, scenarios (optional), `common-technical.md`, per-variant `<variant>-technical.md`, language-matched `Testcase-refer-*.md`. Update: also baseline TC md, old + new audited UC, user feedback. |
| Phase 1 (partial — summary block exists) | Same as fresh, PLUS probe `02_designed_tcs_<variant>.md` per declared variant. Variant with scratch → re-materialize final md from scratch only; without → fresh drafting. Rewrite the summary block after all variants are on disk. |
| Phase 1 (mid-approval, update only) | Same as fresh + the latest `pending_update_report.md`; re-enter pause state. |
| Phase 2 | Per variant in the summary block: its final md (at recorded paths) + its scratch (required for auto-recovery). |

## Skill-specific failure modes (on top of shared §6)

| Symptom | Recovery |
|---|---|
| Summary block missing AND no scratches on disk | Treat Phase 1 as not started; offer Continue (fresh Phase 1) or Restart. |
| Summary block missing BUT scratches exist | Reconstruct the summary block from scratches, rewrite final md per variant from scratch, then run Phase 2 Step 0 normally. |
| Approval block present BUT report file missing | STOP — corrupted approval state. Ask: Restart update, or abandon (remove block, `next_phase: -`). Never silently re-derive the report. |
| Step 0 mismatch, scratch exists | Auto-recover (no prompt): overwrite final md from scratch, re-verify, report the recovery + delta on chat. |
| Step 0 mismatch, scratch missing | STOP — no source of truth; user must Restart. |
| Step 0 still mismatches after recovery | STOP — scratch and summary may both be corrupt; report observed counts, user decides. |
| Converter/xlsx self-verification fails | STOP, no cleanup. Preserved scratch + md allow re-trigger; resume re-runs Phase 2 idempotently. |
