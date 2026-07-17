---
name: qc-api-read
description: "Derives the API-tier BUSINESS design from a PASSED audited UC — operations, per-param validation (EP/BVA), flows, permissions, behavior-level API AC + readiness score. Requirement-first: NEVER reads the API doc (binding belongs to qc-api-tc-design). Trigger: /qc-api-read <UC-ID>, 'audit api', 'review api readiness'. Next: qc-api-scenario-design. For UI readiness use qc-uc-read."
---

# API Readiness Audit Skill

## Positioning (why this skill exists)

Ở giai đoạn này dự án thường CHƯA có API doc (hoặc doc chưa ổn định). Skill này vì vậy làm đúng MỘT việc: tổng hợp phần nghiệp vụ mà tầng API phải phục vụ — đủ để `qc-api-scenario-design` thiết kế scenario. Nó KHÔNG đối chiếu endpoint, KHÔNG soi swagger, KHÔNG hỏi những gì hệ thống chạy sẽ tự trả lời. Đối chiếu API doc + binding endpoint diễn ra ở `qc-api-tc-design` (nơi doc là điều kiện bắt buộc, đúng lúc thông tin chi tiết được ghi vào test case).

## Prerequisite gate (HARD)

The latest `uc-review-report` for the UC must exist. Verdict routing:

- **Not Ready** → STOP: tell the user (Vietnamese) to complete the UC branch first (`/qc-uc-read`, answer backlog, re-audit).
- **Conditionally Ready** → ask the user ONE question: proceed (the api-audited will inherit the known gaps, listed verbatim) or wait?
- **Ready** → proceed silently.

## Input Contract

Resolve via `path-registry.md`:

- `project-context-master` — §3.0 Phạm vi test ONLY (Phase 0 gate; nothing else of that file).
- `uc-review-report` — latest version. Primary source: §4 element inventory (params vocabulary), §6 flows + business rules/validation (verbatim), §2/§5 actors & permissions, §3 pre/postconditions, §8 AC.
- `requirement-common-files` — ONLY the error codes / rule IDs / common functions the UC references (resolve verbatim text; do not read whole files).
- `qc-data-map` — OPTIONAL; entity model to infer CRUD resources + tên resource chuẩn cho khoá claim ownership. Missing → skip, warn once.
- `api-question-backlog` — sổ câu hỏi NHÁNH API cấp portal (1 file/portal, 2 tầng — mục A câu hỏi chung + mục B theo UC). Đọc TOÀN BỘ mục A + section của UC này (mọi trạng thái) TRƯỚC khi đặt bất kỳ câu hỏi mới nào.
- `question-backlog` — sổ per-UC của NHÁNH UI (READ-ONLY): đọc mọi trạng thái của UC này để không hỏi trùng câu nghiệp vụ với nhánh UI — cả hai sổ theo DEDUP GATE tại `expected-and-verify-policy.md` §8.
- `qc-api-coverage` — READ-ONLY, only for the ownership claim step; missing file → every operation unowned. Claim rules: `.claude/config/api-shared/coverage-rules.md §Operation ownership`.
- Shared contracts (read on demand, once): `.claude/config/api-shared/expected-and-verify-policy.md` (before writing §6), `references/api-scoring-rubric.md` (Phase 2), `coverage-rules.md §Operation ownership` (bộ động từ API chuẩn cho khoá claim).
- `.claude/rules/qc-writting-rules.md`.

NOT read: **the API doc (`api-doc-files` / digest) — ở BẤT KỲ mode nào**, the running system, `project-context-master` beyond §3.0, `qc-site-map`, raw requirement files (the audited UC already carries the verbatim extracts).

## Output Contract

- `api-audited` — versioned `v[N]`, never overwrite; template: `templates/api-audited-template.vi.md`.
- `qc-api-coverage` — project-level OPERATION ownership map (`docs/qc-lead/qc-api-coverage.md`): DERIVED VIEW rebuilt as a FULL overwrite at the end of EVERY run (template `templates/qc-api-coverage-template.vi.md`; algorithm: coverage-rules §Coverage map). SOLE writer: this skill. Cột endpoint của map lấy từ bảng binding trong TC md (khi UC chủ đã chạy `qc-api-tc-design`) — có thể trễ một nhịp, nguồn tức thời là chính bảng binding.
- `api-question-backlog` — every gap/question goes through `qc-qna` API mode (this skill never writes any backlog directly; sổ UI per-UC không bị ghi).
- `worklog-per-device` per `docs/qc-lead/agent-work-log.local/README.md`.

## Checkpoint & Resume

Follow `.claude/config/checkpoint-protocol.md` + `workflows/checkpoint-protocol.md` (per-UC scope; checkpoint file list; re-audit single-flow rule). Read both ONCE at skill start.

## Workflow

### Phase 0 — Routing + Resume Detection

1. **Scope gate:** read `project-context-master` §3.0 Phạm vi test. Scope does NOT include API (`Black-box only`) → STOP: tell the user (Vietnamese) the skill has nothing to do on this project. File missing / field blank → STOP and ask the user to run `/qc-context-master` first.
2. Identify the UC-ID from the invocation (= on-disk Folder ID). Unclear → ASK.
3. Resume detection per shared protocol §3.
4. Determine `mode`: `api-audited` exists for the UC → `re-audit`; else → `first-audit`.
5. Generate `run_id`, append worklog entry per the worklog protocol.

### Phase dispatch

| Mode | Workflow | Friendly name |
|---|---|---|
| first-audit | `workflows/first-audit.md` (Phases 1–3) | Suy diễn thiết kế API nghiệp vụ từ audited UC, chấm điểm, viết báo cáo |
| re-audit | `workflows/re-audit.md` (single flow) | Phân tích thay đổi (câu trả lời BE/BA, audited UC mới, feedback) và cập nhật báo cáo |

After the final phase, cleanup per shared protocol §5.

## Boundaries

- NEVER fabricates operations, params, or expected results. Every derived operation is traced to the audited UC; anything unconfirmed is marked `Dự đoán` (tên gọi tạm) or becomes a question (§8 via `qc-qna`).
- **KHÔNG đọc API doc ở bất kỳ mode nào.** Đối chiếu doc, binding endpoint, phát hiện thừa/thiếu/lệch endpoint là việc của `qc-api-tc-design` (binding lean ở Step 1 của nó). Readiness của skill này đo MỘT thứ: đã đủ thông tin nghiệp vụ để thiết kế scenario chưa.
- Only reads inputs — never edits the audited UC or common files.
- Expected sources follow the ladder in `expected-and-verify-policy.md`.
- **Mọi câu hỏi phải qua 2 cổng theo thứ tự:** QUESTION GATE (policy §7 — cấm hỏi mã/message/schema/payload-shape) rồi DEDUP GATE (policy §8 — đối chiếu sổ UI per-UC của UC + sổ API portal; không hỏi trùng câu nhánh UI đã hỏi, không hỏi trùng UC khác).
- Does NOT design scenarios or test cases — those belong to `qc-api-scenario-design` / `qc-api-tc-design`.
- Ownership: fills §2 "Vai trò" per coverage-rules §Operation ownership — khoá claim là `resource · action` (resource theo data-map/audited UC, action theo bộ động từ API trong coverage-rules), KHÔNG phụ thuộc endpoint; NEVER edits the coverage map row-by-row (full rebuild only); 2 UCs claiming one operation surface as `⚠ Xung đột` for QC — never silently resolved.
- Output files follow `qc-writting-rules.md` (self-check gate §5 before every write) and `naming-convention.md`. Output là tài liệu review nội bộ → LUÔN tiếng Việt (luật 2 nhóm, `qc-writting-rules.md` § Ngôn ngữ output).
