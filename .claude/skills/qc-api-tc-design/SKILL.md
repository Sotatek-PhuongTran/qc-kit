---
name: qc-api-tc-design
description: "Designs atomic API test cases (official md + xlsx, same base name) from the api-audited report + API scenarios, bound to REAL endpoints from the project's API doc — the doc is a hard requirement. Trigger: /qc-api-tc-design <UC-ID>, 'thiết kế test case api', 'generate api test cases'. For API SCENARIOS use qc-api-scenario-design; for UI test cases use qc-func-tc-design."
---
# API Test Case Design Skill

## Purpose

Read the latest api-audited report + API scenarios and systematically design **atomic API test cases at real-request precision** — exact method, endpoint, params, headers, payload shape, expected status/response/side-effect. **Đây cũng là nơi DUY NHẤT đối chiếu API doc:** binding lần đầu operation nghiệp vụ ↔ endpoint thật (Step 1 — lean), phát hiện lệch doc ↔ requirement, endpoint thiếu (`UNDOCUMENTED_OPERATION`), endpoint thừa/orphan (`ORPHAN_ENDPOINT`) — mọi finding đi qua `qc-qna`, KHÔNG quay lại chấm điểm readiness. Covers: contract/schema, per-param validation (full EP/BVA expansion), business flow & state, permission, data integrity, protocol behaviors, security & abuse app-level (area 9), and MIX (UI↔API consistency — scope Both only). Out of scope: performance/load/pentest tooling, and test scripts (owned by `qc-api-auto-generate`).

## HARD gate — API doc required (đã chốt M2)

Resolve `api-doc-files`. If unconfigured (`docs/???`) or the file does not exist → STOP with a Vietnamese message listing exactly what is needed (Swagger/OpenAPI/Postman JSON + khai path vào dòng `api-doc-files` của path-registry) and how to resume. Precise TCs cannot be written without endpoints/params/headers.

## Input Contract

Resolve via `path-registry.md`:

- `api-audited` — latest version (HARD). §2 operations (khoá claim `resource · action` + vai trò Owner/Reuse), §3 validation matrix (THE value source), §4 flows, §5 permissions, §6 AC. (Api-audited KHÔNG chứa binding — binding lần đầu diễn ra ở Step 1 của skill này.)
- `api-test-scenarios` — latest version (HARD). Every TC traces to a `TS_API_*`.
- `api-doc-digest` — REBUILD via `parse-api-doc-script` at run start (never trust a stale digest; never read the raw doc).
- `func-test-cases-md` (UI TC md, latest version) — ONLY when `project-context-master` §3.0 scope = `Black-box + API`: read TC IDs + titles ONLY (for the cross-link table + anti-duplication). `API only` → skip entirely.
- `project-context-master` §3.0 — the SOLE read source for Phạm vi test + Variant API + Project language (skills never read `project-config` §6 directly). File missing or field blank → STOP and ask. Variant API: `rest` is the supported variant; any variant without a `references/<variant>-technical.md` in this skill is NOT yet supported (generate Step 1.3 guard STOPs).
- `requirement-common-files` — verbatim error codes/messages the TCs must quote.
- References (on demand): `references/api-common-technical.md` (always) + `references/<variant>-technical.md` per declared API variant; `.claude/config/api-shared/coverage-rules.md`, `expected-and-verify-policy.md`, `auth-strategy.md`.
- `api-test-cases` (existing versions) — update mode only.

## Output Contract

- `api-test-cases-md` (.md — `<UC-ID>_<feature>_api-testcases_<variant>_<YYYYMMDD>_v<N>.md`, the OFFICIAL versioned md deliverable (NOT a draft — versioned + immutable), layout per `api-common-technical.md` Part B; written in Phase 1).
- `api-test-cases` (.xlsx — SAME base name as the md, differs only by extension; update mode bumps `v[N+1]` for BOTH; produced in Phase 2 via the SHARED converter `qc-func-tc-design/scripts/md_to_xlsx.py` — same 6-column template).
- TC IDs: `TC_API_NNN`, `TC_MIX_NNN` (per-UC scope, prefix-grouped by the run/report pipeline).
- Cross-link "TC UI liên quan" lives in the md prelude link table (machine-readable for `qc-bug-report`), NOT as an xlsx column.
- `worklog-per-device` per the worklog protocol.

## Checkpoint & Resume

Follow `.claude/config/checkpoint-protocol.md` + `workflows/checkpoint-protocol.md` (per-UC scope, per-variant scratch files, Phase 1 Summary block, update-mode approval pause).

## Workflows

### Step A — Phase 0: Routing + Resume Detection

1. Identify the UC-ID (= on-disk Folder ID). 2. Resume detection per shared protocol §3. 3. Determine `mode`: `api-test-cases` exists for the UC → `update`; else → `generate`. 4. Generate `run_id` + worklog entry.

### Step B — Run Phases 1 → 2

| Mode | Phase 1 | Phase 2 |
|---|---|---|
| generate | `workflows/generate-api-test-cases.md` | `workflows/convert-md-to-xlsx.md` |
| update | `workflows/update-api-test-cases.md` (impact analysis, approval pause) | `workflows/convert-md-to-xlsx.md` |

### Step C — Chat-side Reporting (no summary file)

After Phase 2 succeeds, report on chat (Vietnamese): artifact paths (md + xlsx); totals with breakdown per section (Contract & validation / Business & permission / MIX); coverage audit results; update mode: new/updated/deleted counts + trigger type; noteworthy items (mismatches sent to qc-qna, blocked areas, out-of-scope). Suggest next step: `/qc-api-auto-generate <UC-ID>` (if automation tier is used) or manual execution via the binding info in each TC.

### Step D — Cleanup

Per shared protocol §5 — only after Phase 2 success AND the chat report is sent.

## Boundaries

- NEVER invents an endpoint, param, header, or status — everything binds to the digest; an operation with no candidate endpoint → `UNDOCUMENTED_OPERATION`: TC group deferred with a question via `qc-qna`, never guessed.
- Binding findings (Step 1) đi qua `qc-qna` API mode (ghi vào `api-question-backlog`) với đúng 3 phân loại: `UNDOCUMENTED_OPERATION` (thiếu endpoint cho operation), `DOC_REQ_MISMATCH` (doc mâu thuẫn requirement/audited — param thiếu, rule khác; KHÔNG tính việc doc không liệt kê status/message/schema — probe/baseline ghi), `ORPHAN_ENDPOINT` (endpoint trong scope không operation nào nhận — câu hỏi CHUNG, mục A của sổ API portal). Do not silently pick a side; nếu answer làm đổi NGHIỆP VỤ đã suy diễn → recommend re-audit `/qc-api-read`.
- Question gates áp dụng đầy đủ: QUESTION GATE (policy §7 — không hỏi mã/message/schema/payload-shape) + DEDUP GATE (policy §8 — đối chiếu sổ UI per-UC + sổ API portal trước khi hỏi).
- Never edits input files; never writes scenarios (that is `qc-api-scenario-design`).
- MIX TCs exist ONLY when scope is Both; they are few and targeted per `coverage-rules.md`.
- Owner-only rule (coverage-rules §Two test tiers): endpoint-level TC groups (contract/schema, per-param EP/BVA, permission set, protocol, security & abuse area 9) are generated ONLY for OPs whose api-audited §2 "Vai trò" is `Owner`. `Reuse` OPs get flow/state/side-effect/MIX TCs only + a row in the prelude's "Tham chiếu endpoint-level" table pointing to the owner UC's TCs (owner not yet designed → the row says "chưa có — chờ UC-X"); never duplicated locally.
- Writing rules: `qc-writting-rules.md` + `references/api-common-technical.md` Part C — self-check gates run before every md write. Output language: test cases are OFFICIAL project deliverables (group 2 of the two-group law in `qc-writting-rules.md`) → follow the Project language from `project-context-master` §3.0 (Vietnamese or English only).
- Test data: logical variables per `.claude/config/api-shared/api-testdata-contract.md`; values sourced from api-audited §3. No real tokens/passwords anywhere.
