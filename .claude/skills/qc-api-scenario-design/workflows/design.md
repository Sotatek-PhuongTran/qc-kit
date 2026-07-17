# qc-api-scenario-design — Design workflow

> Title: API Scenario Design Workflow | Created: 2026-07-10 | Updated: 2026-07-13 (v2 — owner-only rule in the coverage matrix, reuse-reference section) | Version: v2
>
> Rules, techniques, template, coverage rules, and quality gates live in `../references/api-scenario-rules.md` — read it before Phase 2. Checkpointing per `.claude/config/checkpoint-protocol.md` (per-UC scope; the deliverable IS the final checkpoint; `progress.md` only).

## Phase 0 — Setup

1. **Identify `<UC-ID>`** from the invocation or the api-audited filename. Unclear → ASK, do not guess.
2. **Resume detection** per shared protocol §3 (`progress.md` only; on resume offer Restart if Phase 1 incomplete, Continue to Phase 2 if Phase 1 recorded done).
3. **Worklog:** append entry `status = "Running (Phase 1)"`, `input = [<api-audited path>]`, `start = now`.

## Phase 1 — Analysis & Coverage Matrix

Read fully before writing anything.

1. Read the highest-version `api-audited` for `<UC-ID>`. **Verdict gate:** `Not Ready` → STOP and ask whether to proceed (scenarios will inherit known gaps). Never silently continue.
2. Read `project-context-master` §3.0 → Phạm vi test (+ Project language for the deliverable). If the file is missing or the §3.0 fields are blank → STOP and ask the user (run `/qc-context-master` first) — never guess. Record `mix_in_scope = (Black-box + API)`.
3. Read `.claude/config/api-shared/coverage-rules.md` — the layering rules govern what belongs to this branch (deep logic here; representative journeys stay on the UI branch; MIX = consistency only).
4. **Build the coverage matrix** in working memory: rows = §2 operations (`OP-*`); columns = the 9 coverage areas (api-scenario-rules §Coverage areas). Mark each cell `to-cover` / `n/a` (area does not apply to this operation — note why) / `blocked` (api-audited gap or `Chưa xác nhận` AC — surface in Out-of-Scope Flags, do NOT fabricate) / `out-of-scope` (performance/load/pentest có tool). The MIX column exists only when `mix_in_scope`. **Owner-only rule (coverage-rules §Two test tiers):** for an OP whose §2 "Vai trò" is any `Reuse` value, mark the endpoint-level area cells (1 Contract, 2 Validation, 5 Permission, 7 Protocol, 9 Security & abuse) as `reuse — UC-X` (NOT to-cover); flow-level areas (3, 4, 6, 8) follow the normal rules. Role `Reuse → UC-X (dự kiến)` or `Reuse — chưa rõ owner` → same marking + one "Tham chiếu endpoint-level" row flagging that the endpoint-level design does not exist anywhere yet.
5. **Checkpoint:** update `progress.md` (`last_phase_done: 1`); worklog → `status = "Phase 1 done"`.

## Phase 2 — Scenario Drafting

For every `to-cover` cell, draft scenarios per the template + MANDATORY techniques in `api-scenario-rules.md`. Reuse OPs: fill the "Tham chiếu endpoint-level" section per api-scenario-rules §Output file structure — reference only, never re-draft the owner UC's intents. Each scenario MUST: have a unique `TS_API_[UC-ID]_NNN` ID; cite its `OP-*` and the AC-API / §3 rule it verifies; map to exactly ONE Test Type from the closed list; carry a Test Focus tag; represent ONE meaningfully different test intent (atomic expansion — every partition/boundary value — belongs to `qc-api-tc-design`).

Render the WHOLE output file per `api-scenario-rules.md` §Output file structure — including the file header lines (`> Source: <api-audited v[N] path>`, `> Generated: <YYYY-MM-DD>`, `> Phạm vi test: ...`), the per-OP scenario sections, the "Tham chiếu endpoint-level" section (only when the UC has ≥ 1 Reuse OP), and the Out-of-Scope Flags table. Update mode depends on the `> Source:` header line to detect a newer api-audited version — never omit it.

Run the quality checklist (`api-scenario-rules.md` §Quality checks), run the `qc-writting-rules.md` §5 gate, then write the deliverable to the resolved `api-test-scenarios` path:

```
[UC-ID]_[feature-name]_api-scenarios_[YYYYMMDD]_v[N].md
```

The deliverable IS the Phase 2 checkpoint.

## Phase 3 — Finalize

1. **Worklog:** rewrite last entry → `status = "Done"`, `end`, `duration_min`, `output = [<scenarios file path>]`.
2. **Cleanup** per shared protocol §5 (delete `process-logging/<UC-ID>/`).
3. **Chat report** (Vietnamese, no separate summary file):

   ```
   ## ✅ API Scenario Design Complete

   | Artifact | File | Count |
   |---|---|---|
   | API Test Scenarios | <resolved path> | X scenarios across Y operations |

   ### Coverage theo Test Type
   - Contract / Validation / Business flow / Permission / Data integrity / Protocol / Security / MIX: X mỗi loại

   ### Notes
   - Ô blocked (chờ BE/BA): <list | none>
   - Endpoint-level tham chiếu (OP Reuse → UC chủ): <list | none>
   - Out-of-scope: <list | none>
   - Bước tiếp theo: /qc-api-tc-design <UC-ID> (cần API doc — thiếu sẽ dừng chờ)
   ```
