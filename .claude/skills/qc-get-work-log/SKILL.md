---
name: qc-get-work-log
description: "Aggregates the per-device JSONL worklogs into the master agent-work-log.md (per-device tables, append-only; Legacy section never touched). Trigger: /qc-get-work-log, 'tổng hợp work log', 'sync work log', or after pulling teammates' commits to refresh the master log."
---

# QC Get Work Log — Aggregator Skill

## Purpose

Read all per-device JSONL worklog files and rebuild the **Per-device tables** section of the master `agent-work-log.md`. The Legacy section (frozen pre-2026-05-19 data) is preserved verbatim and never modified.

This is the **sole writer** of the per-device tables in `agent-work-log.md`. No other skill should write into that section.

## Trigger Conditions

- **Manual (primary):** `/qc-get-work-log`, or natural-language phrases like "tổng hợp work log", "sync work log", "rebuild agent-work-log", "gom worklog các máy".
- **After git pull:** typically run by the QC Lead after pulling teammates' per-device JSONL commits.
- **NOT auto-triggered** by any other skill. Aggregation is a Lead-side operation.

## Input Contract

Resolve via `path-registry.md`:

- `worklog-per-device` — folder `docs/qc-lead/agent-work-log.local/`, files matching `worklog_*.jsonl`. Read all files in the folder. Each file is one device's append-log.
- `agent-work-log` — master file `docs/qc-lead/agent-work-log.md`. Used as the dedup source: rows already present in per-device tables are NEVER overwritten (pure append).

### Folder + README bootstrap

The project README `docs/qc-lead/agent-work-log.local/README.md` is the single source of truth for the JSONL schema, lifecycle, `run_id` format, terminal states, and mutation commands (referenced by `.claude/config/checkpoint-protocol.md` §2 and `rules/global-rules.md`). Its **shipped source is the kit template `templates/agent-work-log.local-README.template.md`**. If the `agent-work-log.local/` folder or its README is missing, THIS skill — or any skill that hits the missing folder when it tries to log (per `rules/global-rules.md` § Agent Work Log) — bootstraps them: create the folder, copy the README from the kit template, then create the device's JSONL file.

## Output Contract

- **`agent-work-log`** — rewrite only the `## Per-device tables` section. Preserve everything above it (title, intro blockquote, `## Legacy ...` section).
- **`worklog-per-device`** — read-only. Never edit, never delete. User manually deletes per-device files when desired.
- **Dedup key:** composite `(device, start)` — NOT `run_id`. Rationale + full rule: `workflows/aggregate.md` § Dedup Rule.

## Schema

The per-device JSONL entry schema (fields, timestamps, `run_id` format) is defined ONCE in the README template `templates/agent-work-log.local-README.template.md` (bootstrapped into `docs/qc-lead/agent-work-log.local/README.md`) — per `.claude/config/checkpoint-protocol.md` §2, skills MUST NOT duplicate it. The master's per-device table render format + column rules live in `workflows/aggregate.md` § Render format.

## Workflow routing

Follow `workflows/aggregate.md` end to end. Flow summary:

1. **Phase 1** — bootstrap this run's own JSONL log entry.
2. **Phase 2** — parse the master for the existing `(device, start)` dedup set; preserve already-ingested rows verbatim.
3. **Phase 3** — scan all `worklog_*.jsonl` files; collect new rows only.
4. **Phase 4** — merge + sort (per device, `start` ascending) and rewrite the `## Per-device tables` section.
5. **Phase 5** — finalize the log entry + print the chat summary.

Edge cases (missing master → bootstrap from skeleton, malformed lines, duplicate `start`, ...) are in `workflows/aggregate.md` § Edge cases.

## Boundaries

- **Owns**: `## Per-device tables` section of `agent-work-log.md`. Generates `worklog_<device>.jsonl` for itself (like every other skill).
- **Reads**: all `worklog_*.jsonl` files; master `agent-work-log.md`.
- **Never touches**: Legacy section, intro blockquote, other JSONL files (read-only consumer).
- **Never deletes**: per-device JSONL files. User-managed.
- **Never converts timezones**: preserves `+07:00` offset verbatim.
