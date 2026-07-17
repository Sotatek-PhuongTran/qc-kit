---
name: qc-dashboard-sync
description: "Sole writer of qc-dashboard.md — syncs the feature list and per-UC status columns from disk scans and upstream handoffs. Step 3 of the context chain. Trigger: /qc-dashboard-sync (top-down), /qc-dashboard-sync <UC-ID> (bottom-up), 'sync dashboard', 'cập nhật dashboard', or auto-invoked by qc-site-map."
---

# QC Dashboard Sync

## Purpose

Maintain `qc-dashboard.md` — the QC Lead's per-feature status board: which UCs exist, whether each has been reviewed (version + score), and whether scenarios / test cases / test scripts exist and ran. This skill is the **SOLE writer of every column**. It combines three data sources: the feature list handed off by `qc-site-map`, a disk scan of per-UC artifact folders, and per-UC skill checkpoints (for in-progress status).

**Every status cell is recomputed from disk on every run — there is no version cache.** If the user deletes old artifact versions and regenerates from v1, the next sync reflects that immediately.

All detailed schemas, formats, parse contracts, and handoff specs live in `references/contracts.md` — the workflows reference its sections by number. Checkpointing follows `.claude/config/checkpoint-protocol.md`.

## Two modes

| Mode | Invoked by | Scope |
|---|---|---|
| **Top-down** | Auto-invoked by `qc-site-map` (Initialization + after Mode 3), or manually via `/qc-dashboard-sync` with no argument | Full feature list from handoff + disk scan + status columns for every UC. Includes gap review (user proceed/cancel). |
| **Bottom-up** | Manually via `/qc-dashboard-sync <UC-ID>` | That UC only: add row (`In scope? = Need confirm`) if missing, rescan its files + status; append orphan to `qc-site-map`'s inbox if the folder is unknown to the site-map. No gap review. |

**Mode detection:** caller passed `uc_id` → bottom-up → `workflows/bottom-up.md`. Otherwise → top-down → `workflows/top-down.md`. Never fall through from one mode to the other.

**Top-down prerequisites (STOP check, enforced at top-down Phase 0):** both `project-context-master.md` (via `path-registry.md`) AND `.claude/skills/qc-dashboard-sync/inbox/site-map-handoff.md` must exist. If either is missing, STOP with:

```text
Không đủ điều kiện chạy top-down sync:
- project-context-master.md: <found | MISSING>
- site-map-handoff.md (từ qc-site-map): <found | MISSING>

Hãy chạy lại chuỗi theo thứ tự: /qc-context-master -> /qc-site-map -> /qc-dashboard-sync.
```

Bottom-up has no prerequisites — it runs even if upstream context is missing.

## Inputs / Outputs

- **Inputs:** see `references/contracts.md` §1 (logical names), §4 (per-UC checkpoint files, read-only), §6a (site-map handoff, read-only).
- **Outputs:**
  - `qc-dashboard` — all columns + the `Sorting:` directive line (contracts §2, §7).
  - `dashboard-orphans.md` at `.claude/skills/qc-site-map/inbox/` — append + dedupe (contracts §6b).
  - Console report (Vietnamese): new rows, status updates, orphans appended, sort decision, summary.
  - Worklog per `docs/qc-lead/agent-work-log.local/README.md`.

## Scope decision boundary

This skill never decides `In scope?` business value: top-down copies it verbatim from the handoff (authoritative); bottom-up sets `Need confirm` on new rows and forwards the orphan to `qc-site-map` Mode 3 for reconciliation. No interactive `In scope?` prompts; the user may edit any cell manually at any time.

## Optional columns (auto-injected)

The baseline dashboard has **8 columns** (contracts §2). Up to 5 more are injected automatically when their condition holds, and never auto-removed once present:

- `Site` / `Module` — injected by top-down when the handoff has >1 distinct Site / Module. Single-portal single-module projects never see them.
- `API stt` — injected when any file matching `*_api-audited_*` / `*_api-testcases_*` exists in the per-`<ID>` folders (API artifacts share the UI branch's folders). Owners: `qc-api-read` / `qc-api-scenario-design` / `qc-api-tc-design` — this skill only reads their outputs.
- `Automation stt` / `Execute stt` — injected when the automation project folder exists. Owners of automation artifacts: `qc-func-auto-generate` / `qc-api-auto-generate` (specs, per branch) and `qc-auto-run` (run summaries) — this skill only reads them.

## Boundaries

- SOLE writer of `qc-dashboard.md` (creates from `templates/qc-dashboard-template.md` on first run). No other skill may open it for writing; per-UC skills must not read it either.
- Reads but never writes: per-UC `progress.md` checkpoints, audited reports, automation specs/summaries, `site-map-handoff.md` (lifecycle owned by `qc-site-map`).
- Writes but never deletes: `dashboard-orphans.md` (deleted by `qc-site-map` Mode 3 after reconciliation).
- Never invents `Site` / `Module` / `Tên feature/UC` — top-down takes them from the handoff; bottom-up leaves them blank on new rows and preserves them on existing rows.
- Never auto-sets `In scope? = Removed` (legal user-edit value only). Rows whose folder disappeared keep their scope; the status cells go blank on their own because everything is recomputed from disk.
- Exclusion folders (Common, Shared, `_template`, …) are never added as rows. Module CONTAINER folders (holding ≥1 UC-pattern file — the registry's primary `requirement-files` layout, e.g. `AUTH/`) are never orphans either: their UC files become the rows. Non-ID-pattern folders with no UC-pattern file inside (e.g. `TrangChuDashboard`) ARE added — they are exactly the orphans Mode 3 reconciles.
- Dashboard schema mismatch → STOP and report. **No auto-fix, no legacy-schema migration** (pre-v2 dashboards: rename the old file and re-bootstrap). The only silent migration is the ID-label relabel in top-down Phase 0.6.
- Interactive prompts: ONLY top-down Phase 0.5 gap review (proceed/cancel) and Phase 0.6 ID-label confirmation on first bootstrap.

## Cross-skill contract

- `qc-context-master` (step 1) writes `project-context-master.md` only; never invokes this skill.
- `qc-site-map` (step 2) writes `site-map-handoff.md` and auto-invokes this skill in Initialization and after Mode 3; in Update mode it suggests the user run `/qc-dashboard-sync`. Its handoff is the sole feature-list source; its `Folder alias(es)` column is the sole source of non-trivial `Folder ID` aliases.
- Per-UC skills (`qc-uc-read`, `qc-func-scenario-design`, `qc-func-tc-design`, `qc-api-read`, `qc-api-scenario-design`, `qc-api-tc-design`, `qc-func-auto-generate`, `qc-api-auto-generate`) never touch the dashboard; they expose status via their checkpoint `progress.md` (in-progress) and versioned output files (done) — both read-only to this skill.
- A future skill can join the dashboard the same way: keep a per-UC `progress.md` + produce a versioned, scannable output file.
