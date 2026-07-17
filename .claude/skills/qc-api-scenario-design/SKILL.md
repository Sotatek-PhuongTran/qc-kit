---
name: qc-api-scenario-design
description: "Designs intent-level API test SCENARIOS (TS_API IDs, design + update modes) from a finalized api-audited report. Trigger: /qc-api-scenario-design <UC-ID>, 'thiết kế scenario api', 'design api scenarios'. For atomic API TEST CASES use qc-api-tc-design; for UI scenarios use qc-func-scenario-design."
---
# API Test Scenario Design Skill

## Purpose

Transform a finalized api-audited report (from `qc-api-read`) into ready-to-use **API test scenarios** — one scenario = one distinct test intent at the API level. The bridge between the api-audited report and atomic API test cases (which belong to `qc-api-tc-design`). Needs NO API doc and NO running system — scenarios are intent-level, written straight from the audit.

## Input Contract

Resolve via `path-registry.md`:

- `api-audited` — latest version for `<UC-ID>` (HARD requirement). §2 operations = coverage rows; §3 validation, §4 flows/states, §5 permissions, §6 AC = coverage sources. §2 column "Vai trò" = the Owner/Reuse verdict driving the owner-only rule (coverage-rules §Two test tiers) — this skill NEVER opens the coverage map file.
- `project-context-master` §3.0 — Phạm vi test (+ Project language for the deliverable). `Black-box + API` → MIX intents in scope; `API only` → NO MIX intents. If the file is missing or the §3.0 fields are blank → STOP and ask the user (run `/qc-context-master` first) — never guess.
- `requirement-common-files` — ONLY error codes / rule texts the api-audited cites, when verbatim inlining is needed.
- `.claude/config/api-shared/coverage-rules.md` — layering rules (read once before drafting).
- `.claude/rules/qc-writting-rules.md`.

## Output Contract

- `api-test-scenarios` (.md) — one file per UC, versioned per `naming-convention.md`: `[UC-ID]_[feature-name]_api-scenarios_[YYYYMMDD]_v[N].md`.
- `worklog-per-device` — per `docs/qc-lead/agent-work-log.local/README.md`.

## Checkpoint & Resume

Follow `.claude/config/checkpoint-protocol.md` + this skill's delta `workflows/checkpoint-protocol.md` — per-UC scope at `.claude/skills/qc-api-scenario-design/process-logging/<UC-ID>/`, `progress.md` only (the deliverable is the final checkpoint; no intermediate files).

## Workflow

**Mode detection (before dispatch):** resolve the `api-test-scenarios` folder for `<UC-ID>` and check for existing scenarios files.

| Condition | Mode | Workflow |
|---|---|---|
| No api-scenarios file exists for the UC | design (first run) | `workflows/design.md` (Phase 0 Setup → Phase 1 Analysis & Coverage Matrix → Phase 2 Drafting → Phase 3 Finalize) |
| Scenarios file exists AND the latest api-audited version is NEWER than the version recorded in the scenarios header | update | `workflows/update.md` (diff → stable TS IDs → Change log → write v[N+1]) |
| Scenarios file exists and the recorded api-audited version is already the latest | — | Nothing to do — report to the user and stop |

Techniques, template, coverage areas, and quality gates live in `references/api-scenario-rules.md` (both modes).

## Boundaries

- ONLY designs API-branch scenarios — atomic API test cases belong to `qc-api-tc-design`; UI scenarios belong to `qc-func-scenario-design`.
- Functional API testing + an toàn app-level: contract, validation, business flow/state, permission (functional authz), data integrity, protocol behaviors (idempotency, pagination), security & abuse (area 9 — hostile input, spam/double-submit, bảo vệ dữ liệu nhạy cảm), MIX consistency. Performance / load / pentest có tool (fuzzing chuyên sâu, CVE scan) → Out-of-Scope Flags, never generated.
- Never edits input files. Never fabricates scenarios for content the api-audited flagged as gap/`Dự đoán`-blocked — those go to Out-of-Scope Flags with a `qc-qna` recommendation.
- Every scenario traces to an operation (`OP-*`) and carries `TS_API_[UC-ID]_NNN` — no orphans. MIX intents ONLY when the project scope is `Black-box + API`.
- Owner-only rule (coverage-rules §Two test tiers): endpoint-level intents (areas 1 Contract, 2 Validation, 5 Permission, 7 Protocol) are designed ONLY for OPs whose §2 role is `Owner`. `Reuse` OPs get flow-level intents only (areas 3, 4, 6, 8) + a row in the output's "Tham chiếu endpoint-level" section pointing to the owner UC. Owner not yet audited (`dự kiến` / `chưa rõ`) → flag it there — never design endpoint-level on another UC's behalf.
- Scenarios are an OFFICIAL project deliverable → written in the project language read from `project-context-master` §3.0 "Project language" (Vietnamese or English only, per `rules/qc-writting-rules.md`). ONE file per UC — never sharded.
