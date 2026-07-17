# Generate API Test Cases (Design Workflow)

> Title: API TC Generate Workflow | Created: 2026-07-10 | Updated: 2026-07-14 (v3 — Step 1.4 trở thành BINDING LEAN lần đầu: OP ↔ endpoint + 3 loại finding doc qua qc-qna + bảng binding trong prelude; api-audited không còn §7; v2 2026-07-13 — owner-only gate, reuse-reference prelude table) | Version: v3
>
> **Scope:** produces ONLY the API test case `.md` file(s). No separate summary file. Checkpoint boundary steps follow `workflows/checkpoint-protocol.md`.

## Phase 1 — Analysis & Design

### Status update — Start of Phase 1

**Worklog**: rewrite last entry → `status = "Running (Phase 1)"`; append input names to `input`.

### Step 1: Input Analysis (MANDATORY)

1. **HARD gate (SKILL.md):** resolve `api-doc-files` — missing/unconfigured → STOP with the required-items message. Otherwise **rebuild the digest**: `node <parse-api-doc-script> <api-doc-file> --uc <UC-ID> --filter <resource keywords in the API DOC's language> --out-dir <api-doc-digest dir>`; read the digest (0 matches → re-run once without `--filter`). **Filter-keyword rule:** the `--filter` keywords MUST be in the API doc's own language (usually English), NOT the Vietnamese resource names from api-audited §2 — derive the English/doc-language nouns from each operation's `resource` claim (e.g. resource "người dùng" → keyword `user`, "đơn hàng" → `order`).
2. Read the latest `api-audited` (verdict gate: Not Ready → STOP and advise re-audit path) and the latest `api-test-scenarios`. Record each OP's §2 "Vai trò" + khoá claim `resource · action` — it drives the owner-only gate in Step 2 and the binding in Step 4.
3. **Resolve API variant(s)** from `project-context-master` §3.0 (Variant API — the SOLE read source; never read `project-config` §6 directly). Also record §3.0's Phạm vi test (drives item 5) and Project language (drives output language per `api-common-technical.md` Part 0). File/field missing or blank → STOP and ask the user to run `/qc-context-master` (after onboarding). For EACH variant load `references/<variant>-technical.md` — **guard: if `references/<variant>-technical.md` does NOT exist → STOP and report (Vietnamese) that variant `<X>` is not yet supported by the kit (a technical reference must be added to this skill's `references/` first); do NOT design TCs for it.** Always load `references/api-common-technical.md`. Multi-variant → a SEPARATE TC md per variant (same rule as func-tc; separate scratch, separate deliverable, `_<variant>` segment in the filename).
4. **BINDING OP ↔ endpoint (lần đầu, lean — đây là bước đối chiếu API doc DUY NHẤT của kit):** với MỖI §2 operation trong scope của scenarios:
   - Tìm endpoint ứng viên trong digest (match theo resource + action + params). Khớp → ghi `method + path` + tên param thật; tên param nghiệp vụ của api-audited §3 ánh xạ sang tên wire tại đây (dùng trong TC, KHÔNG sửa api-audited).
   - Không có endpoint ứng viên → finding `UNDOCUMENTED_OPERATION`: question via `qc-qna`, TC group của OP đó `deferred — chờ BE`, continue with the rest.
   - Endpoint có nhưng MÂU THUẪN requirement/audited (param thiếu, rule khác, kiểu dữ liệu trái CRULE) → finding `DOC_REQ_MISMATCH`: question via `qc-qna` (mô tả đủ trong câu hỏi); phần TC không phụ thuộc điểm lệch vẫn thiết kế tiếp. LƯU Ý: doc không liệt kê status/message/schema KHÔNG phải mismatch (probe/api-baseline ghi ở lần chạy đầu — policy §7).
   - **Định nghĩa "digest scope":** một endpoint trong digest thuộc scope UC CHỈ KHI resource của nó khớp resource của ít nhất một operation của UC (theo khoá claim `resource · action` trong bảng Binding). Endpoint có trong digest nhưng thuộc resource KHÁC (lọt vào do filter rộng hoặc lần chạy lại không `--filter`) → ghi chú `ngoài scope UC — bỏ qua` (một dòng dưới bảng Binding), KHÔNG phải finding.
   - Endpoint khớp resource của một operation UC nhưng KHÔNG operation nào nhận nó → finding `ORPHAN_ENDPOINT` (CHỈ fire trong trường hợp khớp-resource này): câu hỏi CHUNG qua `qc-qna` API mode (mục A sổ API portal `api-question-backlog` — "endpoint thừa hay thiếu UC?"; đây là nơi trả lời mục tiêu "không dư thừa/thiếu API").
   - Kết quả ghi thành bảng **"Binding OP ↔ endpoint"** trong prelude (mẫu bên dưới). Mọi question qua đủ 2 cổng của policy (§7 + §8 DEDUP). NEVER guess a binding.
5. **Scope Both only (per §3.0 Phạm vi test):** read the latest `func-test-cases-md` (highest version) — extract TC IDs + titles ONLY (for the link table and anti-duplication per `coverage-rules.md`). `API only` → skip; the link table cells become `—`.
6. Read once: `.claude/config/api-shared/expected-and-verify-policy.md`, `auth-strategy.md`, `coverage-rules.md` (if not already in memory from this run).

### Step 2: Detailed Drafting (MANDATORY)

Apply the 6 drafting passes of `references/api-common-technical.md` Part A, then the variant file's additions, expanding every scenario (`TS_API_*`) into atomic TCs:

- **owner-only gate (coverage-rules §Two test tiers):** the per-param EP/BVA expansion, permission-cell cases, protocol cases, and area-9 security/abuse cases below apply ONLY to OPs whose §2 role is `Owner`; for `Reuse` OPs generate ONLY flow/state/side-effect/MIX TCs and fill the prelude's "Tham chiếu endpoint-level" table (owner UC + its TC file/IDs, or "chưa có — chờ UC-X" when the owner has not designed yet);
- one TC per EP partition VALUE and per BVA value of api-audited §3 (the scenario declared the family; here it becomes N atomic cases);
- one TC per permission cell case (auth-strategy minimum set);
- one TC per state transition (valid + invalid);
- side-effect TCs per §6 AC verify method (GET-after-write steps written explicitly as steps 2..n);
- MIX TCs (scope Both): few, per critical data path, cross-referencing the UI TC in the link table.

**Writing rules (MANDATORY):** `references/api-common-technical.md` Part C (C1–C6) + `.claude/rules/qc-writting-rules.md`. Every TC: self-contained, real endpoint/method from the digest in backticks, logical data variables (consistent with `api-testdata-contract.md`), expected status + verbatim error text + side-effect, priority spread across Critical/High/Medium/Low (C6). Run BOTH self-check gates before persisting.

### Step 3: Traceability + Coverage Audits (MANDATORY — fix drafting before proceeding)

1. **RTM:** map every api-audited §6 AC-API to TC IDs — 100% coverage required. The RTM carries a `TS liên quan` column — positioned between `Linked TCs` and `Status` — mapping AC/TC ↔ `TS_API_[UC-ID]_NNN` (scenarios are a HARD input, so the column is always present; an AC that maps to no TS gets `—` in that cell). Self-check: every `TS_API_*` has ≥ 1 TC, or its skip reason is recorded (blocked/deferred rows cite their Q-ID).
2. **Validation-matrix audit:** every §3 row → every declared EP partition and BVA value has ≥ 1 TC (scope: OPs with §2 role `Owner`; §3 rows of `Reuse` OPs are covered by the owner UC — verify the reference table instead).
3. **Permission audit:** every §5 operation×role cell → the auth-strategy minimum set is present (same owner-only scope).
4. **Scenario audit:** every `TS_API_*` (not blocked/deferred) → ≥ 1 TC traces to it.
5. **Link table (scope Both):** every TC covering a rule that a UI TC also touches has its "TC UI liên quan" row filled.

### Step 3.5: Persist to Scratch (MANDATORY — atomic single Write per variant)

Same safety-net rule as func-tc: compose the FULL deliverable content (prelude + all sections) in memory, then ONE atomic Write per variant to `.claude/skills/qc-api-tc-design/process-logging/<UC-ID>/02_designed_api_tcs_<V>.md`. Never build a scratch incrementally; never modify scratches later in the run.

### Step 4: Write the deliverable md (MANDATORY)

Re-materialize each variant's scratch to the `api-test-cases-md` path (single file or `_partN` files, atomic Writes). **Naming (per `rules/naming-convention.md`):** `<UC-ID>_<feature>_api-testcases_<variant>_<YYYYMMDD>_v<N>.md` — this md is the OFFICIAL deliverable (NOT a draft; never re-written in place): versioned + immutable, SAME base name as the Phase-2 xlsx (they differ only by extension). `<YYYYMMDD>` = the day this version is created; generate mode is normally `v1`. Multi-part files append `_partN` after `_v<N>` (the converter strips it).

**Required prelude** (heading levels `#`/`####` ONLY — skipped by the converter):

```markdown
# API Test Cases — [UC-ID] [feature] [— <variant>]

**Total test cases:** X (Contract & validation: A, Business & permission: B, MIX: C)
**Variant:** rest | ...
**Source api-audited:** <file + version>   **Source scenarios:** <file + version>
**Source digest:** <UC-ID>_endpoints-digest.md — build <YYYY-MM-DD> từ <api-doc file>
**Output language:** VI | EN

#### Binding OP ↔ endpoint (Step 1.4 — nguồn endpoint cho coverage map)
| OP | Khoá claim (resource · action) | Endpoint (method + path) | Trạng thái | Ghi chú / Q-ID |
|---|---|---|---|---|
| [OP-ID] | | `METHOD /path` hoặc `—` | Khớp / Lệch — đã hỏi / Không có — deferred | [finding + Q-ID sổ nếu có] |

#### Requirement Traceability Matrix
| AC-API | Nội dung | Linked TCs | TS liên quan | Status |
|---|---|---|---|---|

(Cột `TS liên quan` nằm giữa `Linked TCs` và `Status`, map AC/TC ↔ `TS_API_[UC-ID]_NNN`; AC không map tới TS nào → ô ghi `—`. Self-check Step 3.1: mọi `TS_API_*` có ≥ 1 TC hoặc ghi lý do bỏ qua ở dòng dưới bảng.)

#### Coverage audit
| Audit | Result | Uncovered |
|---|---|---|
| Validation matrix (§3 — mọi partition/boundary) | Pass/Fail | — |
| Permission matrix (§5 × auth-strategy) | Pass/Fail | — |
| Scenario trace (mọi TS_API) | Pass/Fail | — |
| RTM (mọi AC-API) | Pass/Fail | — |

#### Liên kết TC UI (scope Both; API only → bảng ghi N/A)
| TC API/MIX | TC UI liên quan | Rule chung |
|---|---|---|

#### Tham chiếu endpoint-level (OP Reuse)
| OP | Endpoint | UC chủ | TC endpoint-level tham chiếu |
|---|---|---|---|

#### Deferred — chờ binding/re-audit
| OP | Lý do | Q-ID |
|---|---|---|
```

**Body structure** (converter contract — `##` and `###` ONLY as below):

- `## <Roman>. Resource: <tên resource>` — one per resource/operation group
- `### <Roman>.1. Kiểm tra contract & validation — <resource>`
- `### <Roman>.2. Kiểm tra nghiệp vụ & phân quyền — <resource>`
- `### <Roman>.3. Kiểm tra MIX — <resource>` (scope Both only, only where MIX TCs exist)

TC tables use EXACTLY the converter's 6 columns: `| TC ID | Title | Pre-conditions | Test Steps | Expected Result | Priority |`.

### Checkpoint write — End of Phase 1

Per `workflows/checkpoint-protocol.md`: append the consolidated `## Phase 1 Summary` block to `progress.md` (per-variant totals per section, language, scratch path, deliverable paths); worklog `status = "Phase 1 done"` + outputs. `last_phase_done: 1` is written at the START of Phase 2 only after its verification gate passes (see `convert-md-to-xlsx.md` Step 0).

## Hand-off to Phase 2

Next file: `workflows/convert-md-to-xlsx.md` — auto-triggered by the orchestrator (SKILL.md Step B).
