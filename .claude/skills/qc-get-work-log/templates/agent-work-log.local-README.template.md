# Per-device Agent Work Log (JSONL) — README

> Title: Per-device Worklog README | Author: QC Kit (`qc-get-work-log`) | Version: v1
> Shipped source: `.claude/skills/qc-get-work-log/templates/agent-work-log.local-README.template.md`. Bootstrapped into `docs/qc-lead/agent-work-log.local/README.md` by the first skill that finds the folder missing (see `rules/global-rules.md` § Agent Work Log).
> This README is the SINGLE source of truth for the worklog schema, lifecycle, `run_id` format, terminal states, and mutation commands (referenced by `.claude/config/checkpoint-protocol.md` §2). Skills MUST NOT duplicate these rules.

## File naming — one file per machine

- `worklog_<device>.jsonl` in this folder, where `<device>` = the machine's hostname (`$env:COMPUTERNAME` on Windows / `hostname` on Unix).
- Every skill appends ONLY to its own device's file. Teammates' files (pulled via git) are read-only.
- The master `docs/qc-lead/agent-work-log.md` is written ONLY by `qc-get-work-log` — no other skill may touch it.

## JSONL schema (one JSON object per line)

```json
{
  "run_id": "run-20260519-143022-<slug>",
  "device": "DESKTOP-ABC123",
  "git_user_name": "<git user.name>",
  "git_user_email": "<git user.email>",
  "branch": "mbfs",
  "commit": "f7d673a",
  "skill": "qc-uc-read",
  "status": "Running (Phase 2)",
  "input": ["docs/BA/UC1/UC1.md"],
  "output": [],
  "issue": null,
  "start": "2026-05-19T14:30:22+07:00",
  "end": null,
  "duration_min": null
}
```

- `run_id` = `run-<YYYYMMDD>-<HHMMSS>-<slug>` (local time; `<slug>` = the part of `git_user_email` before `@`, lowercased, non-alphanumeric stripped).
- All timestamps are ISO 8601 with offset `+07:00` — never convert timezones.
- `duration_min` = (end − start) in minutes, 1 decimal. `end` and `duration_min` stay `null` while the run is in progress.
- `input` / `output` = arrays of user-visible deliverable paths (never `process-logging/`, templates, or references).

## Lifecycle — write-before-work

1. **Phase start:** APPEND a new entry with `status = "Running (Phase <N>)"`, `start = now`, `end = null`, `duration_min = null` — BEFORE doing the phase's work.
2. **Phase boundary:** REWRITE the last entry (`status = "Phase <N> done"` / `"Running (Phase <N+1>)"`, extend `input`/`output`).
3. **Run end:** REWRITE the last entry to a terminal state and fill `end` + `duration_min`.
4. **Terminal states:** `Done` / `Failed (<reason>)` / `Aborted (<reason>)`. A leftover `Running (...)` entry means an interrupted run — the next run rewrites it per `.claude/config/checkpoint-protocol.md` §3.

## Mutation commands (cross-platform)

With `$ENTRY` = the entry as ONE compact JSON line and `$FILE` = `worklog_<device>.jsonl`:

- **Append an entry:**
  - Unix / Git Bash: `cat >> "$FILE"` (heredoc/pipe the line), or `printf '%s\n' "$ENTRY" >> "$FILE"`.
  - PowerShell: `Add-Content -Path $FILE -Value $ENTRY`.
- **Rewrite the LAST line** (status update / terminal state) = delete the last line, then append the updated entry:
  - Unix / Git Bash: `sed -i '$d' "$FILE"` (macOS/BSD: `sed -i '' '$d' "$FILE"`), then append as above.
  - PowerShell: `$l = Get-Content $FILE; $l[0..($l.Count-2)] | Set-Content $FILE`, then `Add-Content`.

Rules: only the LAST line may ever be rewritten; entries already in a terminal state are history — append-only, never edited. Never edit another device's file.

## Master log rule

The master `docs/qc-lead/agent-work-log.md` is written ONLY by `qc-get-work-log` (it aggregates all `worklog_*.jsonl` files into per-device tables). Every other skill writes ONLY its device's JSONL file in this folder.
