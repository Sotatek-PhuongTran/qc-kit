# Checkpoint Delta — qc-func-scenario-design

> Title: Checkpoint Delta qc-func-scenario-design | Created: 2026-07-16 | Author: Claude (QC Kit fix) | Version: v1

Generic rules live in `.claude/config/checkpoint-protocol.md` — read ONCE at skill start. This skill's delta:

- **Scope:** per-UC — `.claude/skills/qc-func-scenario-design/process-logging/<UC-ID>/`.
- **Checkpoint files:** `progress.md` ONLY — no numbered checkpoint files; the deliverable (`scenarios v[N].md`) IS the final checkpoint.
- **Resume load table:** resuming at Phase 2 → re-read the Input Contract sources (uc-review-report, project-context-master §3.0, qc-site-map if any); no intermediate checkpoint file exists to load.
