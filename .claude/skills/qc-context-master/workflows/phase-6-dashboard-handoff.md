# Phase 6 - Dashboard Handoff

Goal: send feature/use case inventory to `qc-dashboard-sync`, which owns `qc-dashboard.md`.

## Inputs

- `02_feature_inventory.md`
- `05_context_rendered.md`
- existing `qc-dashboard.md` in Update mode if available

## Handoff path

Write:

`.claude/skills/qc-dashboard-sync/inbox/feature-list-handoff.md`

## Handoff format

```markdown
---
source_skill: qc-context-master
mode: <initialization|update>
generated_at: <ISO-8601 datetime>
---

# Feature/UC list handoff

| ID | Site | Module | Feature/Use case name | In scope? | Notes |
|---|---|---|---|---|---|
| <ID> | <Site> | <Module> | <name> | Yes / Need confirm | <source/gap note> |
```

## Handoff rules

1. Include new candidates.
2. Include re-add candidates.
3. Include derived candidates that need confirmation.
4. Do not include unchanged existing dashboard rows unless the sync skill requires them.
5. If no candidates exist, do not generate fake rows. Mark dashboard handoff as blocked.
6. Do not write `qc-dashboard.md` directly.

## Trigger sync

Invoke `qc-dashboard-sync` after writing the handoff file.

Expected behavior from `qc-dashboard-sync`:

1. Read the handoff file.
2. Initialize `qc-dashboard.md` if missing.
3. Update `qc-dashboard.md` if it exists.
4. Preserve manual edits and process-state columns.
5. Report rows that need QC Lead confirmation.

## Checkpoint

Write `process-logging/06_dashboard_handoff.md`:

```markdown
# Dashboard Handoff

- handoff path:
- handoff written: yes/no
- qc-dashboard-sync invoked: yes/no
- dashboard sync blocked: yes/no
- block reason:

## Candidate summary
- new:
- derived:
- re-add:
- need confirmation:
- not found in current source:

## Sync result summary
<summary returned by qc-dashboard-sync, if any>
```

Then update `progress.md`:

- `last_phase_done: 6`
- `next_phase: 7`
