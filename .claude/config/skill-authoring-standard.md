# Skill Authoring Standard (QC Kit v3)

> Title: Skill Authoring Standard | Created: 2026-07-02 | Author: Claude (QC Kit v3 rebuild) | Version: v1

Rules for writing/maintaining every skill in this kit. Applies to authors (human or agent) editing `.claude/skills/`.

## Skeleton (mandatory)

```
<skill>/
  SKILL.md          # ≤ ~1,500 words. ONLY: purpose, triggers, input/output contract,
                    # mode detection, routing table to workflows, boundaries.
  workflows/        # step-by-step execution, one file per mode or phase group
  references/       # stable knowledge loaded on demand (formats, rubrics, mappings)
  templates/        # output file templates
```

- SKILL.md must NOT contain detailed algorithms, regexes, schemas, or step lists — those live in `workflows/` or `references/`. SKILL.md routes; workflow files execute.
- No duplicated content between SKILL.md and workflow files. A contract lives in exactly ONE file; everything else links to it.
- Checkpoint/resume: reference `.claude/config/checkpoint-protocol.md`. A skill only declares its checkpoint file list + resume load table.
- Workflow file naming: `<mode>.md` for mode-routed skills (e.g. `generate.md`, `update.md`, `top-down.md`); `phase-<N>-<name>.md` only when one mode has many phases. Never keep legacy alias files — delete and fix referrers.
- References must be text (md/yaml). No binary xlsx/docx as agent-readable references.
- No `.DS_Store`, `__pycache__`, editor junk. No persona blocks ("You are an outstanding...") — state concrete behavioral rules instead.

## Frontmatter

```yaml
---
name: <kebab-case, matches folder>
description: <see below>
---
```

- `description` ≤ ~400 characters, third person, English. Formula: **what it does** (1 clause) + **when to trigger** (explicit phrases + implicit situations). NO mechanism details (parsing strategy, token optimizations, internal file names).
- Trigger boundaries must be mutually exclusive across skills — when two skills are adjacent in the pipeline, each description names the OTHER skill for the out-of-scope case.

## Language

- SKILL.md, workflows, references: English.
- All user-facing chat messages and generated outputs: Vietnamese, per `.claude/rules/qc-writting-rules.md`.
- Output files follow `.claude/rules/naming-convention.md` + header (title, date, author, version).

## Cross-skill communication

- Handoff via inbox files: `.claude/skills/<consumer>/inbox/<name>.md` with frontmatter (`source_skill`, `handoff_type`, `generated_at`). Writer and deleter must be named in both skills' Boundaries sections.
- Never write another skill's output file. Sole-writer ownership is declared in the owner's SKILL.md Boundaries.
- Resolve ALL paths via `.claude/config/path-registry.md` logical names. Never hard-code paths.
