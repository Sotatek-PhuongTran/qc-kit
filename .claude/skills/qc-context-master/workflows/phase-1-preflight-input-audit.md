# Phase 1 - Preflight and Input Audit

Goal: resolve paths, determine mode, verify mandatory inputs, and classify available high-level sources.

## Required reads

- `path-registry.md`
- `project-config.md` if available
- `templates/project-context-master-template.vi.md`
- `references/project-context-master-writing-guide.md`

## Steps

1. Resolve logical paths from `path-registry.md`:
   - `High-level-files`
   - `requirement-common-files`
   - `project-context-master`
   - `qc-dashboard`
   - `project-config`
2. Verify `High-level-files` exists and is not empty.
3. If `High-level-files` is missing or empty, stop the skill.
4. Determine mode:
   - if `project-context-master.md` is missing or empty, mode is `initialization`;
   - otherwise, mode is `update`.
5. In Update mode, read the existing `project-context-master.md` and existing `qc-dashboard.md` if available.
6. Inventory available files in `High-level-files` and classify likely document groups:
   - feature inventory / WBS / scope;
   - product or business brief;
   - architecture / tech overview / integration;
   - business rules / data / state;
   - release note / change log;
   - NFR / security / compliance / legal;
   - site map / module list.
7. Record missing document groups. Missing groups are not always blockers.

## Checkpoint

Write `process-logging/01_input_audit.md` with:

```markdown
# Input Audit

- run_id:
- mode:
- project-context-master path:
- qc-dashboard path:
- high-level-files path:
- requirement-common-files path:
- high-level-files status: OK | Missing | Empty

## Documents found
| Path | Detected type | Notes |
|---|---|---|

## Missing document groups
| Group | Status | Impact | Suggested owner |
|---|---|---|---|

## Blockers
| Blocker | Action needed |
|---|---|
```

Then update `progress.md`:

- `last_phase_done: 1`
- `next_phase: 2`
