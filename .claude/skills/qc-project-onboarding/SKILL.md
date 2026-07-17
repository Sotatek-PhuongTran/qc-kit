---
name: qc-project-onboarding
description: "Onboards the QC Kit into a project — interviews the QC Lead to fill project-config.md (incl. test scope + variants) and the group-A rows of path-registry.md, then auto-triggers qc-context-master when inputs are ready. Trigger ONLY on explicit invoke: /qc-project-onboarding, 'onboard dự án', 'cấu hình kit cho dự án'."
---

# QC Project Onboarding Skill

## Purpose

Interview the QC Lead to validate and populate the two meta-config files (`project-config.md`, `path-registry.md` group-A rows), including the test-scope/variant declaration in Section 6, then auto-trigger `qc-context-master` when the pre-flight check passes.

## Trigger Conditions

- Run ONLY when the user explicitly invokes the skill (e.g., `/qc-project-onboarding`).
- Do NOT auto-trigger on natural-language phrases — onboarding is a deliberate action by the QC Lead.

## Inputs

| Input | Source |
|---|---|
| Existing `project-config.md` | `docs/qc-lead/project-config.md` (resolved via `project-config` logical-name) |
| Existing `path-registry.md` | `.claude/config/path-registry.md` |
| User answers during interview | Interactive |

## Outputs

| Output  | Versioning |
|---|---|
| `project-config.md` | In-place. Header `Version` bumps `v1 → v2 → v3 …` ONLY if content actually changed. |
| `path-registry.md` | In-place. Bumps version if a header version field exists; else just updates content. |

> **Versioning exception:** both files have fixed paths because every downstream skill references them. Filename and path do NOT change; only the `Version` header field is bumped.

> **Indirect outputs (via auto-trigger):** when pre-flight passes, this skill invokes `qc-context-master`, which produces `project-context-master.md`. `qc-dashboard.md` is bootstrapped only via the Initialization chain (`qc-context-master` → `qc-site-map` → `qc-dashboard-sync`); in Update mode `qc-context-master` only SUGGESTS running that follow-up chain. This skill itself NEVER writes those artifacts directly.

## Mode detection (init / update)

Determined by a silent audit of both meta-config files (no user-facing output):

- **First-time mode** — BOTH files entirely empty/placeholder.
- **Update mode** — at least one file has real content.

A section counts as missing-content when it still uses placeholder tokens (`[Insert ...]`, `docs/???`, a scope table with NO box checked `[x]`, etc.) — full heuristic list in `workflows/interview.md` Phase 0.

## Workflow routing

Follow `workflows/interview.md` end to end — it carries the full interview script (verbatim greetings, display blocks, Section 6 selection flow, refusal messages, pre-flight + auto-trigger details). Flow summary:

1. **Phase 0** — silent audit of both files → mode.
2. **Phase 1** — greeting (A/B per mode) + Step 1 interview over all 7 sections of `project-config.md` (Mục 1 & 6 mandatory; API-conditional questions when scope has API).
3. **Phase 2** — Step 2 interview over the group-A rows of `path-registry.md`.
4. **Phase 3** — write back both files + version bumps.
5. **Phase 4** — pre-flight check on `High-level-files` (path concrete + at least ONE declared folder exists with ≥1 file) → PASS: auto-invoke `qc-context-master`; FAIL: instruct the user to prepare inputs and run `/qc-context-master` manually.


## Boundaries

- This skill ONLY edits `docs/qc-lead/project-config.md` and `.claude/config/path-registry.md`. It MUST NOT directly create or edit `project-context-master.md`, `qc-dashboard.md`, or any other artifact — those belong to `qc-context-master` (exception: `qc-api-coverage.md` belongs to `qc-api-read`, its sole writer).
- It edits ONLY group-A rows of `path-registry.md`; group-B rows are kit-defined and may only be corrected when the real file location differs from the registry (outside onboarding).
- Section 6 `Phạm vi test` may only WIDEN to `Black-box + API` — never narrow. Section 6 values come from the fixed selection lists only — never free text. API variant: ONLY `rest` is offered; unsupported variants (graphql/grpc/websocket/other) get the refusal message and are NEVER written into Section 6.
- Section 6 is the single ENTRY point for scope/variant; downstream skills read these values from `project-context-master` §3.0 (inherited verbatim by `qc-context-master`), never from `project-config.md` §6 directly.
- It MUST NOT invent project information. If user does not provide a value, leave the placeholder untouched.
- For Section 4 of `project-config.md` (test account credentials), the skill MAY collect passwords (test-only). It MUST refuse to record any credential the user identifies as production. It never records API tokens anywhere (tokens live only in `.env`).
- Auto-trigger of `qc-context-master` happens ONLY when pre-flight passes; otherwise the skill instructs the user to run it manually.
- Output language follows source-input language per `global-rules.md`. SKILL.md itself is in English.
