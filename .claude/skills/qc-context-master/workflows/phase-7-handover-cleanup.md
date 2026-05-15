# Phase 7 - Handover and Cleanup

Goal: report completion to the user and clean up internal checkpoints after success.

## Inputs

- `05_context_rendered.md`
- `06_dashboard_handoff.md` if available
- written `project-context-master.md`
- `qc-dashboard.md` status if returned by `qc-dashboard-sync`

## User-facing handover

Respond in Vietnamese with a concise summary:

```text
Hoan tat <Initialization|Update> project context.

- project-context-master.md: created/updated at <path>
- qc-dashboard handoff: sent/blocked
- feature candidates: <counts>
- derived / need confirm: <counts>
- important missing context: <top items>
- conflicts: <count or none>
- suggested next action: <action>
```

Do not paste the full `project-context-master.md` into chat unless the user asks.

## Checkpoint

Write `process-logging/07_handover.md`:

```markdown
# Handover

- final status:
- project-context-master path:
- dashboard handoff status:
- cleanup status:

## User summary
<message sent to user>
```

## Cleanup

After the handover checkpoint and any worklog update succeeds, delete `.claude/skills/qc-context-master/process-logging/`.

If cleanup fails, report it as a non-blocking issue. The deliverables are still valid.
