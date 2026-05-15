# Phase 9 - Dashboard Handoff

## Goal

Create a feature-level handoff for `qc-dashboard-sync`.

## Handoff path

Default:

```text
.claude/skills/qc-dashboard-sync/inbox/site-map-handoff.md
```

## Handoff format

```md
---
source_skill: qc-site-map
handoff_type: site-map-feature-coverage
mode: initialization / update
generated_at: <ISO-8601 datetime>
---

# Site Map Handoff for Dashboard

## Feature-level site map coverage

| Feature ID | Feature name | Site / Portal | Module | Mapped screen(s) | Site map status | Notes |
|---|---|---|---|---|---|---|
|  |  |  |  |  | Mapped / Partial / Missing / Conflict / Need confirm |  |

## Feature-level gaps

| Feature ID | Feature name | Gap | Impact to QC | Owner | Priority |
|---|---|---|---|---|---|
|  |  | No mapped screen / unclear navigation / role access missing / source conflict |  | QC Lead / BA / Tech Lead | High / Medium / Low |

## Unmapped screens

| Screen ID | Screen / Page | Why unmapped | Suggested action |
|---|---|---|---|
|  |  |  |  |

## Dashboard update recommendation

| Feature ID | Recommended dashboard note/status | Reason |
|---|---|---|
|  | Site map: Ready / Partial / Missing / Conflict |  |
```

## Rules

- Do not send one row per screen as dashboard rows.
- Aggregate by feature/spec.
- If no feature-level mapping exists, write the handoff but mark dashboard update as blocked/partial.
- Invoke `qc-dashboard-sync` after writing the handoff when available.

## Output checkpoint

Write:

```text
process-logging/qc-site-map/09_dashboard_handoff.md
```
