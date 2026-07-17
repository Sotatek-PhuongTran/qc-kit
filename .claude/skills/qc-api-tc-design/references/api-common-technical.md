# API Common Technical — drafting passes + field format rules

> Title: API Common Technical | Created: 2026-07-10 | Author: QC Kit (API extension — step 4) | Version: v1
>
> Read BEFORE drafting, together with `.claude/rules/qc-writting-rules.md` and the variant file (`rest-technical.md`, ...). Applies to every API variant.

## Part 0 — Output language

Test cases are OFFICIAL project deliverables (group 2 of the two-group law in `.claude/rules/qc-writting-rules.md`) → write in the **Project language** read from `project-context-master` §3.0 (field "Project language"). Only Vietnamese or English is accepted — field missing/other value → STOP and ask the user to pick one. Never mix languages in one file.

## Part A — Six drafting passes (run ALL, in order, per resource group)

| Pass | Produces | Source |
|---|---|---|
| A1 — Contract & schema | Per operation: happy request → expected THÀNH CÔNG (status cụ thể chỉ khi doc cho) + response schema conformance (schema name from digest, backtick) + required response fields; malformed JSON body; wrong/missing `Content-Type`; unknown extra fields (assert the documented policy: reject or ignore — if undocumented, ladder rung applies) | digest + §2 |
| A2 — Validation per param | ONE TC per EP partition VALUE + ONE per BVA value from api-audited §3 — full expansion, no bundling. Distinguish: field missing vs `null` vs empty string vs whitespace-only — each its own TC when the rule differs | §3 |
| A3 — Business flow & state | Per api-audited §4 (bảng hợp nhất — dòng *Hợp lệ* = chuỗi operation/luồng; dòng *KHÔNG hợp lệ* = chuyển trạng thái không hợp lệ): happy sequence + each alternative/exception branch from the *Hợp lệ* rows (multi-step TC: each step one request); one TC per *KHÔNG hợp lệ* row — invalid transition attempt (expected: rejected status + state unchanged, verified by a GET step) | §4 |
| A4 — Permission | Per operation: the minimum permission-case set per `config/api-shared/auth-strategy.md` § "Minimum permission coverage per operation" (case list lives there — do not re-enumerate) | §5 |
| A5 — Data integrity & side-effect | Per §6 AC's verify method: write-op TCs get explicit verify steps (step 2..n = GET/list/db check per `expected-and-verify-policy.md`); every rejected-request TC from A2/A4 whose operation writes data gets a no-change verify step | §6 |
| A6 — Protocol & error guessing | Variant-file behaviors (idempotency/duplicate submit, pagination/filter/sort bounds, method semantics...); stale/non-existent id; concurrent update; oversized payload. PLUS MIX TCs (scope Both only): one per critical data path — UI action → API check or API action → UI check, linked in the prelude table | variant file + coverage-rules |

Anti-duplication check while drafting (coverage-rules): a TC whose steps are just a UI journey replayed over HTTP adds nothing — its expected must be BE-observable (status/body/side-effect).

## Part B — md layout (converter contract)

- Table columns EXACTLY: `| TC ID | Title | Pre-conditions | Test Steps | Expected Result | Priority |`.
- Sections: `## <Roman>. Resource: <tên>` → `### <Roman>.1. Kiểm tra contract & validation — <tên>` / `### <Roman>.2. Kiểm tra nghiệp vụ & phân quyền — <tên>` / `### <Roman>.3. Kiểm tra MIX — <tên>` (Both only). Prelude uses `#`/`####` only.
- Sort inside sections: happy/contract first → validation (per param, EP then BVA) → flows/states → permission → integrity → protocol. MIX section sorted by data path.
- TC IDs: `TC_API_NNN` (`TC_MIX_NNN` in section .3), sequential per UC file, never reused. Header rows don't consume IDs.

## Part C — Field format rules

> Everything in `qc-writting-rules.md` applies (R1 self-contained, R3 terminology, R5 diacritics). Method/path/schema/status-code/header names are SYSTEM DATA — verbatim, in backticks (`POST /api/v1/users`, `Authorization`, `400`).

### C1 — Title
Pattern: `Động từ kiểm tra + operation/nghiệp vụ + TRẠNG THÁI/ĐIỀU KIỆN (+ kết quả class)`. State/condition is near-mandatory.
- ✅ `Kiểm tra tạo tài khoản admin thất bại khi thiếu trường "email"` (status cụ thể chỉ đưa vào title khi doc đã cho)
- ✅ `Kiểm tra vai trò Org User bị chặn khi gọi thao tác xóa admin (403, dữ liệu không đổi)`
- ❌ `Kiểm tra POST /users` (no condition, bare endpoint as the subject)

### C2 — Pre-conditions
One condition per line (`<br>`): auth state (`Đã có token vai trò "Admin"`), data state (precondition Key from the data md + mô tả), environment assumptions. Independently checkable each.

### C3 — Test Steps
One request (or one verify action) per step. Pattern: `Gửi <METHOD> \`<endpoint>\` với <mô tả payload bằng biến logic>`. Verify steps: `Gửi GET \`<endpoint>\` kiểm tra <điều gì>`.
- Endpoint + method VERBATIM from the digest — never paraphrased, never invented.
- Payload described via logical variables declared in the data md (`payloadThieuEmail`, `emailMaxLen`) with an inline example in parentheses when helpful — values themselves live in the data md (api-testdata-contract), NOT hardcoded here (except tiny inline examples).
- ✅ `Gửi POST \`/api/v1/users\` với payload thiếu trường "email" (payloadThieuEmail)`

### C4 — Expected Result
Starts with the step number. Written at BEHAVIOR level (expected-and-verify-policy (v4)): success = `thành công + <side-effect>`; failure = `bị từ chối (không thành công; 5xx cho lỗi input là bug) + body có message báo lỗi + <no-change guard>`. Exact status ONLY when the doc provides it; the API body's exact message is NEVER written at design tier (UI text belongs to the UI branch — the api-baseline pins exact values at script tier). Schema conformance (`đúng schema \`ErrorResponse\``) and side-effects stay explicit. SELF-CONTAINED — no `như TC_...`.

### C5 — Data & codes
No real credentials/tokens/URLs of environments. No bare requirement codes (`CRULE-`, `AC-API-`, `OP-`, `Q-`) inside Title/Pre/Steps/Expected — behavior in words; codes live ONLY in the RTM/link tables of the prelude. (System data — endpoint, header, status, schema, JSON field names — is NOT a code: keep verbatim.)

### C6 — Priority (Critical / High / Medium / Low)
Kit-wide 4-level scale — canonical definitions live in `qc-func-tc-design/rules/testcase-instruction-rules.md` C6. Spread required — not everything Critical/High. Critical: happy path of core write ops, permission bypass, data-integrity failures (the Critical set = the smoke set). High: main validation rules, documented error codes, invalid transitions. Medium: pagination/filter/sort, secondary flows, i18n message variants. Low: rare boundary values, oversized payloads, header edge cases, format tolerances with no business logic impact.

## Part D — Self-check gate (run BEFORE every md write, after qc-writting-rules §5)

- [ ] Every endpoint/method appears in the digest (grep-verify) — zero invented bindings.
- [ ] Every expected cites a ladder rung in the RTM row; rung-4 expecteds carry `Chưa xác nhận` in the TC's Ghi chú/RTM — their exact values are pinned by the api-baseline at SCRIPT tier on first run, NEVER asked to BA/BE as backlog questions (QUESTION GATE — `expected-and-verify-policy` §7 BANNED #1/#2).
- [ ] Pre-conditions one per `<br>` line; no `;`-merged conditions.
- [ ] No cross-TC references; every message verbatim.
- [ ] No bare requirement codes in the 5 content fields.
- [ ] Every write-op rejection TC has a no-change verify step.
- [ ] Priority spread across Critical/High/Medium/Low.
- [ ] MIX TCs only under scope Both; each appears in the prelude link table.
