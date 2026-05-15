# Phase 5 - Render and Write Project Context

Goal: merge section checkpoints and write `project-context-master.md`.

## Inputs

- `templates/project-context-master-template.vi.md`
- all `03_context_section_*.md`
- `04_gap_readiness.md`
- existing `project-context-master.md` in Update mode

## Render rules

1. Use the Vietnamese template as the structure.
2. Keep section headers from the template.
3. Write body content in Vietnamese by default.
4. Merge Sections 1-8 from section checkpoints.
5. Merge Section 9 and Section 10 from `04_gap_readiness.md`.
6. In Update mode, preserve QC Lead-reviewed content when still valid.
7. Clearly mark `TBD`, `Assumption`, and `Conflict`.
8. Do not include detailed scenarios, test cases, endpoint schemas, field validations, or long source excerpts.

## Write rules

1. Resolve the output path through `path-registry.md` logical name `project-context-master`.
2. If the path cannot be resolved, stop and ask the user.
3. Write the rendered file to disk.
4. Overwrite the previous file only after the final render is complete.

## Checkpoint

Write `process-logging/05_context_rendered.md`:

```markdown
# Context Rendered

- output path:
- mode:
- written: yes/no
- sections rendered:
- unresolved TBD count:
- assumptions count:
- conflicts count:
- open questions count:

## Final rendered content
<copy of rendered markdown or path to written file>
```

Then update `progress.md`:

- `last_phase_done: 5`
- `next_phase: 6`
