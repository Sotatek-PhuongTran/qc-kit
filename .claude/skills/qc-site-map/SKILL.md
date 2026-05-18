---
name: qc-site-map
description: generates and updates qc-site-map.md as a screen-first QC site map for agentic QC workflows. Step 2 of the top-down chain qc-context-master -> qc-site-map -> qc-dashboard-sync. Use when the user asks to initialize or update site map, map screens to features, analyze navigation, role access, regression impact, or sync site-map coverage into qc-dashboard. Reads project-context-master.md as baseline (HARD REQUIREMENT — stops if missing), derives screen inventory from high-level files and detailed requirement sources when needed. In Initialization mode auto-invokes qc-dashboard-sync after writing. In Update mode suggests the user to run qc-dashboard-sync only if changes are detected.
---

# QC Site Map

## Purpose

Generate and maintain `qc-site-map.md` as the screen-first QC site map for downstream QC Agents.

The site map helps QC Agents understand:

- site / portal / app structure;
- screen / page / modal / tab inventory;
- navigation and screen flow;
- role access by screen;
- screen to feature mapping;
- screen to data / API / integration / state touchpoints;
- regression and impact anchors.

The output must help downstream agents review specs, design function / integration / regression scenarios, design test cases, support execution, and verify bugs with screen-level project understanding.

`qc-site-map.md` must not replace detailed specs, wireframes, API docs, or the project-level context. It adds a screen-first structure layer on top of `project-context-master.md`.

The generated `qc-site-map.md` follows the Vietnamese template and should be written in Vietnamese by default so the QC Lead can review and edit it easily.

---

## Output ownership

| File | Owner | This skill may do |
|---|---|---|
| `qc-site-map` | `qc-site-map` | Create and update directly. |
| `project-context-master` | `qc-context-master` | Read as required baseline. Do not rewrite. |
| `qc-dashboard` | `qc-dashboard-sync` | Do not write directly. Send feature-level handoff only. |
| Spec / wireframe / API docs | BA / BE / Tech Lead | Read for screen evidence only. Do not rewrite. |
| Scenario / test case files | Downstream QC skills | Do not create here. |

`qc-site-map.md` is the QC source for screen structure, navigation, and screen-to-feature mapping.

`qc-dashboard.md` tracks QC workflow status at the feature/spec level, not at the screen level. Therefore, this skill must not create one dashboard row per screen. Aggregate site map findings by feature when handing off to `qc-dashboard-sync`.

---

## Modes

Determine mode from the resolved `qc-site-map.md` path in `path-registry.md`.

| Mode | Condition | Behavior |
|---|---|---|
| Initialization | `qc-site-map.md` does not exist or is empty | Create a new screen-first site map from `project-context-master.md` and available sources. After writing, auto-invoke `qc-dashboard-sync` to continue the chain. |
| Update | `qc-site-map.md` exists with real content | Run version preflight against the existing `Sources consolidated` table. Preserve QC Lead-reviewed content, update changed screen/navigation/mapping information, and report new gaps/conflicts. If output content changes, suggest the user to run `qc-dashboard-sync` next. |

In Update mode, always read the existing `qc-site-map.md` before extracting from new inputs.

## Prerequisite

`project-context-master.md` MUST exist with real content. This skill is step 2 in the top-down chain and refuses to run if step 1 has not produced its output. If `project-context-master.md` is missing, STOP and instruct the user to run `qc-context-master` first.

## Version preflight (Update mode only)

Before re-running the full pipeline, parse the `Sources consolidated` table from the existing `qc-site-map.md`. For each source, scan its parent folder for the latest version (`_v<N>` suffix in filename) and compare with the recorded version.

- If at least one source has a new version, a new file, or a deleted file -> proceed with the full pipeline.
- If no version change is detected on any source, ask the user:

```text
Khong phat hien version moi cua cac source files da consolidated lan truoc:
- <file 1>: v<N> (khong doi)
- <file 2>: v<N> (khong doi)
...

Luu y: co che nay chi detect version qua ten file (regex _v<N>).
Neu ban da sua content ma khong tang version, hay tra loi yes de chay lai.

Ban co muon chay lai khong? [yes/no]
```

- User answers `no` -> exit early without changes, log the skip in the worklog.
- User answers `yes` -> continue with the full pipeline.

---

## Required inputs

Resolve paths from `path-registry.md` whenever possible.

Required:

- `project-config.md`
- `path-registry.md`
- `project-context-master.md`
- `templates/qc-site-map-template.vi.md`
- `references/qc-site-map-writing-guide.md`

Required in Update mode if available:

- existing `qc-site-map.md`
- existing `qc-dashboard.md`

Optional sources:

- high-level BA files;
- official site map / menu / navigation documents;
- feature list;
- wireframe index / screen list;
- user journey / user flow documents;
- role / permission matrix;
- SRS / spec / wireframe folder for fallback derivation;
- release notes / change logs.

Stop if `project-context-master.md` is missing. Continue as Partial if official sitemap/screen sources are missing but enough module/feature context exists to create a skeleton.

---

## Required supporting files

Before generating or updating the site map, read:

- `templates/qc-site-map-template.vi.md`
- `references/qc-site-map-writing-guide.md`

Use the template as the output structure. Use the writing guide as the operational rules.

For long runs, read:

- `workflows/checkpoint-protocol.md`

Then follow the workflow files in order.

---

## Core workflow

1. Follow `workflows/phase-0-audit-resume.md` to detect existing checkpoints, resume safely, and run version preflight in Update mode.
2. Follow `workflows/phase-1-preflight-input-audit.md` to resolve paths, detect mode, verify the `project-context-master.md` prerequisite, audit inputs, and record source versions.
3. Follow `workflows/phase-2-project-context-baseline.md` to extract baseline from `project-context-master.md`.
4. Follow `workflows/phase-3-source-inventory.md` to classify sitemap-related sources and confidence.
5. Follow `workflows/phase-4-screen-inventory.md` to create screen/page/modal/tab inventory.
6. Follow `workflows/phase-5-navigation-map.md` to build the screen-first tree and navigation flows.
7. Follow `workflows/phase-6-mapping-access.md` to map screens to features, roles, data/API/integration/state, and regression anchors.
8. Follow `workflows/phase-7-gap-readiness.md` to classify missing information, conflicts, assumptions, and readiness.
9. Follow `workflows/phase-8-render-site-map.md` to write `qc-site-map.md` including the `Sources consolidated` table.
10. Follow `workflows/phase-9-dashboard-handoff.md` to write the `site-map-handoff.md` inbox file and either auto-invoke `qc-dashboard-sync` (Initialization) or suggest the user to run it (Update with changes).
11. Follow `workflows/phase-10-handover-cleanup.md` to summarize completion and delete the entire process-logging folder on success.

Each phase must write a checkpoint before moving to the next phase.

---

## Screen-first rule

The site map is screen-first.

Start from:

```text
System / Site / Portal
  -> Area / Module
    -> Screen / Page
      -> Sub-screen / Tab / Modal / Action
```

Then map each screen to:

- related feature/spec;
- role/access;
- navigation flow;
- data/API/integration/state;
- regression/impact notes.

Do not start from feature-first structure. Feature list belongs to `project-context-master.md` and dashboard. `qc-site-map.md` contributes the screen/navigation layer.

---

## Dashboard relationship

This skill is the SOLE upstream source of the feature list used by `qc-dashboard-sync` in top-down mode. `qc-context-master` no longer writes its own handoff to `qc-dashboard-sync`; the feature list flows: `project-context-master.md` -> read by this skill -> aggregated by feature with screen mapping -> written to `site-map-handoff.md` -> consumed by `qc-dashboard-sync`.

When handing off to `qc-dashboard-sync`, aggregate by feature.

Send:

- mapped screens per feature;
- site map status per feature;
- site map gaps per feature;
- role/access/navigation issues that affect each feature;
- regression/impact notes if relevant.

Do not create one dashboard row per screen. If a screen cannot be mapped to any feature, report it as an unmapped screen in the handoff notes, but do not create a dashboard feature row unless QC Lead confirms it represents a real feature/spec.

Invocation mode:
- Initialization (no existing `qc-dashboard.md` OR no existing `qc-site-map.md` before this run) -> auto-invoke `qc-dashboard-sync` after writing handoff.
- Update with content change -> suggest the user to run `qc-dashboard-sync`.
- Update with no content change -> no downstream action.

---

## Stop conditions

Stop and ask the user only when:

1. `project-context-master.md` is missing or unreadable. STOP and instruct the user to run `qc-context-master` first.
2. `path-registry.md` cannot resolve where to write `qc-site-map.md`.
3. There is no usable project/module/feature/screen context at all.
4. In Initialization mode, `qc-dashboard-sync` cannot be found or invoked.
5. A required existing file path has changed in a way that may overwrite user work.
6. A conflict blocks safe writing of `qc-site-map.md`.
7. Version preflight returned no detected changes and the user answered `no`.

Otherwise, continue with available information, mark gaps, and report what needs confirmation.

---

## Final response

Return a concise Vietnamese summary:

- Mode: Initialization / Update / Skipped (when version preflight returned no change and user declined).
- `qc-site-map.md`: created / updated / unchanged.
- Sources consolidated: count of files, count with new version since last run.
- Source quality: official / derived / partial.
- Screen count and mapped feature count.
- Dashboard handoff status:
  - Initialization → `qc-dashboard-sync` auto-invoked.
  - Update with changes → handoff written, user suggested to run `/qc-dashboard-sync`.
  - Update no change → handoff not written, no downstream action.
- Major gaps/conflicts/assumptions.
- Suggested next action for QC Lead.

Do not paste the full generated file into chat unless the user asks.
