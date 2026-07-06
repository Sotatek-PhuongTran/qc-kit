# Checkpoint Delta — qc-auto-generate

> Title: Checkpoint Delta qc-auto-generate | Created: 2026-07-02 | Updated: 2026-07-04 (crawl-findings + channel map) | Author: Claude (QC Kit v3 rebuild) | Version: v2

Generic rules live in `.claude/config/checkpoint-protocol.md`. Read that ONCE at skill start. This file declares only this skill's delta.

**Scope:** per-UC — checkpoints at `.claude/skills/qc-auto-generate/process-logging/<UC-ID>/`. `progress.md` additionally records `workflow: <generate | update>`, the chosen DOM channel, and the portal.

## Checkpoint files

| File | Owner phase | Content |
|---|---|---|
| `progress.md` | all | Resume state (shared format). Its `status:` line feeds the dashboard `Automation stt` in-progress display. |
| `01_crawl_<page>.md` | Phase 2 | Per-page crawl result: interaction element → primary/alt locator + stability tier + verified/PROVISIONAL mark; channel-map idioms learned in this session. Unresolved elements are NOT parked here — they go straight to the page's `crawl-findings` living file. Written after each page's crawl so an interrupted multi-page crawl resumes per page. |

Generated code files (page objects, specs, data md, notification-channels.ts) are deliverables — they are their own checkpoints; no duplicates in process-logging.

## Resume load table

| Resuming at | Load |
|---|---|
| Phase 2 (mid-crawl) | `01_crawl_<page>.md` for pages already crawled — skip re-crawling them. |
| Phase 3 | All `01_crawl_*.md` + the TC md + existing page objects + `crawl-findings` files of the touched pages. |

## Skill-specific notes

- Cleanup (delete `process-logging/<UC-ID>/`) only after the final report is sent — dashboard-sync reads `progress.md` existence as "in progress".
- Never store credentials or session tokens in any checkpoint file.
