---
name: qc-auto-generate
description: Generates a professional Playwright + TypeScript automation project (Page Object Model, shared common layer) directly from the audited UC report and the test-case md — no action library or separate locator step needed. Crawls the running system for stable locators. Trigger on "generate test script", "viết test script", "tạo automation", "/qc-auto-generate <UC-ID>". To RUN tests, use qc-auto-run.
---

# Skill: qc-auto-generate

## Purpose

Turn finalized test cases into a maintainable **Playwright + TypeScript project** using the **Page Object Model**. The automation module is standalone and optional: it needs NO project context, site map, or action library — its only inputs are the audited UC report (element vocabulary, §4), the test-case md (what to automate), and `project-config` (environment URL + test accounts).

One shared project (`docs/qc/automation/`) with a portal-shared common layer (page objects, flow helpers, fixtures) reused across UCs; each UC only adds short per-screen specs + a test-data file. Page objects cover the page's **full INTERACTION inventory** from audited §4 (inputs/buttons/links — outcome elements are resolved at runtime by channel detectors, mapping-rules §3.0): **one live-crawl session per page**, cached across UCs, re-crawled only when the audited version changes, a run reports locator failures, or a crawl-findings answer arrives (non-production ONLY).

There is no intermediate representation — specs are generated directly from the TC md (`references/mapping-rules.md` is the deterministic contract). Every TC gets a feasibility verdict BEFORE any skip decision (`references/automation-feasibility.md` is the triage contract).

## Input Contract

Resolve via `path-registry.md`:

- `uc-review-report` — latest audited version. §4 = element vocabulary; §6 = workflows (flow-helper candidates).
- `func-test-cases-draft` — latest `.md` (never the xlsx — md is the machine-readable source).
- `project-config` — §3 Environment URL (verified NON-production; the skill REFUSES production) + §4 test accounts by role, including other portals' accounts when preconditions must be seeded through their UI (feasibility ladder L2). Optional seed channels detected here: §2 API docs + auth → L3 (API); configured DB access (connection secrets in `.env`) → L4 (DB). Absent channels are skipped, never blocking. May fill a missing env URL / test account in-place with user confirmation; never writes production credentials.
- A DOM channel for the live crawl — resolved per `references/dom-channels.md` (automation MCP / Claude in Chrome / sandbox Playwright / user-run snippet).

## Output Contract (project layout at `docs/qc/automation/`)

```
playwright.config.ts            scaffolded once (use.baseURL per portal, json+junit reporters)
package.json                    scaffolded once (build:testdata script)
helpers/                        base-page.ts, test-data.ts, email.ts (dynamic email data), expect-outcome.ts (channel detectors — expected results are resolved by TYPE at runtime, never pre-crawled)
portals/<portal>/notification-channels.ts   per-portal channel map (inline/banner/toast/dialog idioms) — learned once at crawl, QC-editable
scripts/build-test-data.mjs     data md → validated JSON compiler
scripts/db-seed/                reviewed DB seed scripts (feasibility L4; connection from .env) — only when the project provides DB access
portals/<portal>/pages/         page objects — SOLE writer; incremental (stamped with audited version + crawl date)
portals/<portal>/flows/         flow helpers + setup flows (L2 precondition seeding) — incremental
portals/<portal>/fixtures.ts
tests/<portal>/<UC-ID>/<screen>.spec.ts   one spec per screen; each test titled with its TC ID
data/<UC-ID>_testdata.md                  LIVING file (no date/version, edited in-place) — human-editable source (+ compiled .json — gitignored build output, rebuilt by qc-auto-run each run)
triage/<UC-ID>_<feature>_automation-triage_<date>_v<N>.md   per-TC feasibility triage (contract: references/automation-feasibility.md §6)
crawl-findings/<portal>_<page>_crawl-findings.md   LIVING doc (no date/version) — elements not found at crawl; user replies inline, next run re-crawls guided
```

Plus `worklog-per-device` per `docs/qc-lead/agent-work-log.local/README.md`.

## Modes

| Mode | Signal | Workflow |
|---|---|---|
| **Generate** | No spec exists under `tests/<portal>/<UC-ID>/` | `workflows/generate.md` |
| **Update** | Specs exist — TC md changed, UI/locators drifted, or data md changed | `workflows/update.md` |

## Checkpoint & Resume

Follow `.claude/config/checkpoint-protocol.md` + `workflows/checkpoint-protocol.md` (per-UC scope; per-page crawl checkpoints).

## References (read on demand)

- `references/mapping-rules.md` — TC md → POM code contract (verb table, assertions, preconditions, data variables, spec structure, self-check).
- `references/automation-feasibility.md` — feasibility triage: precondition setup ladder (UI → other-feature UI → API), Playwright capability map, fault-simulation / fragility / duplicate policies, per-TC triage report contract.
- `references/locator-strategy.md` — locator preference order, multi-locator rule, stability tiers.
- `references/dom-channels.md` — tool-agnostic DOM channel resolution + safety.
- `references/data-and-secrets.md` — test-data md schema incl. the `## Preconditions` table (seed channel, dependent TCs, pre-flight check — the gate `qc-auto-run` reads), build script contract, secrets policy (passwords ONLY from `project-config §4` at runtime; API tokens / DB connections ONLY in `.env`).

## Boundaries

- Standalone: never reads `project-context-master`, `qc-site-map`, or `qc-dashboard`. Dashboard visibility comes from `qc-dashboard-sync` reading this skill's `progress.md` + counting specs — read-only on their side.
- SOLE writer of everything under `docs/qc/automation/` except: `data/*_testdata.md` values (QC edits), `portals/*/notification-channels.ts` (QC may hand-edit), the "Trả lời của QC/dev" column in `crawl-findings/` (user fills), `.env` (user-owned), `reports/` (owned by `qc-auto-run`).
- Never crawls or runs against production; never stores passwords in any generated file or checkpoint.
- Never invents locators or elements — an element not found at crawl NEVER stops the session: it goes to the page's `crawl-findings` living file (with the concrete driven state), the affected specs are deferred, the user replies inline, and the next run re-crawls guided by the answers.
- Never skips a TC with a grouped one-line reason — every non-automated TC gets its own triage row (feasibility §6).
- Does NOT run tests — that is `qc-auto-run`.
- Versioning: triage reports stay versioned `v<N>`; generated code files AND the test-data md are in-place exceptions (git-tracked; test-data md is ONE living file per UC — QC-filled values are never overwritten).
