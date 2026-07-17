# API Readiness Scoring Rubric

> Shared rubric for `qc-api-read` first-audit and re-audit. Mirrors the structure of `qc-uc-read/references/scoring-rubric.md`; update BOTH only when the shared concepts change.
>
> Updated: 2026-07-14 (v2 — REQ-FIRST THUẦN: bỏ mọi phụ thuộc API doc — issue type doc-facing + auto-cap DOC_REQ_MISMATCH chuyển sang bước binding của `qc-api-tc-design`; Area 5 chấm thuần chất lượng suy diễn; thêm cap thiếu vai trò ownership.)

## 1. Core policy

Score only the UC currently under review, from the API perspective. Build the Issue Register FIRST; the scoring table is a short summary of it, not a long report. The Issue Register is RENDERED as the Severity + Loại columns of the §8 question table — never as a separate table (template rule 1). Do not penalize product-wide or architecture issues unless they directly affect this UC's API behavior, validation, permissions, state, or the Agent/tester's understanding.

**Req-first thuần:** skill này KHÔNG đọc API doc, nên readiness KHÔNG BAO GIỜ phụ thuộc trạng thái/chất lượng doc. Điểm số trả lời đúng một câu hỏi: *"đã đủ thông tin NGHIỆP VỤ để thiết kế API scenario chưa?"* Mọi phát hiện lệch/thừa/thiếu endpoint thuộc bước binding của `qc-api-tc-design` — không tạo issue, không cap, không chặn verdict ở đây.

## 2. Status markers, severity, issue types

Status markers (✅ Clear / ⚠️ Partial / ❌ Missing / 🚫 Blocked) and severity levels (Blocker / Major / Minor / Note): identical to `qc-uc-read/references/scoring-rubric.md` §3–§4 — do not redefine. Issue types: reuse that rubric's §5 list. Các issue type doc-facing cũ (`DOC_REQ_MISMATCH`, `ORPHAN_ENDPOINT`, `UNDOCUMENTED_OPERATION`) KHÔNG còn dùng ở skill này — chúng là phân loại finding của bước binding trong `qc-api-tc-design` (đi qua `qc-qna`, không đi vào chấm điểm readiness).

**Gate note (applies to EVERY issue type, existing and future):** an undocumented exact status code, body message, response schema, or request-payload shape is NOT an issue under ANY label. The api-baseline/probe records those values at first run; creating a §8 question for them violates the QUESTION GATE (`expected-and-verify-policy.md` §7). Một câu hỏi trùng chủ đề với câu đã có ở sổ UI per-UC hoặc sổ API portal (bất kể UC nào) cũng KHÔNG phải issue mới — tham chiếu theo DEDUP GATE (policy §8). Register an issue only when the BEHAVIOR itself is unknown or contradicted.

## 3. Scoring areas

Total: **100 points**.

| # | Area | Section | Max | Critical? | What to evaluate |
|---:|---|---|---:|---|---|
| 1 | Operation catalog | §2 | 20 | Yes | Operations are atomic, complete vs the audited UC's flows/postconditions/controls, each with actor, input, output/side-effect, source trace AND khoá claim `resource · action` + vai trò ownership. CRUD completeness per owned entity is addressed (in scope or explicitly out). |
| 2 | Validation matrix | §3 | 25 | Yes | Every input param has its rule (verbatim + source), required flag, type/format, EP partitions (kể cả biến thể kiểu/biểu diễn khi có), and BVA values. This is the shared value source for both branches — gaps here propagate everywhere. |
| 3 | Flows, states & permissions | §4 + §5 | 20 | Yes | Operation sequences match the audited flows; the state machine lists valid AND invalid transitions; the permission matrix has a value (or a question) for every operation × role cell. |
| 4 | API-oriented AC | §6 | 20 | Yes | Every AC is pass/fail testable at the API level at BEHAVIOR level: business outcome + side-effect + error-body presence, a verify method, and an expected-source rung. Missing exact status/message is NEVER penalized (script-tier concern — api-baseline). |
| 5 | Chất lượng suy diễn & truy vết | overall | 15 | Yes | Derivation is traceable — no untraced behavior, no internal inconsistency; mọi operation có vai trò ownership (hoặc câu hỏi); questions are concrete, self-contained, và đã qua đủ 2 cổng (§7 + §8 của policy). |

## 4. Score guide

| Band | Meaning |
|---|---|
| 90–100% of max | Clear — minor or no issues. |
| 60–89% | Partial — usable with known gaps/questions. |
| 1–59% | Weak — significant missing logic or conflicts. |
| 0 | Missing or blocked. |

## 5. Auto-cap rules

| Condition | Cap |
|---|---|
| The audited UC used as baseline is Conditionally Ready | Total capped at 85; inherited gaps listed in the Issue Register with source `audited UC`. |
| §3 covers < 80% of the input params implied by audited §4 + §6.B | Area 2 max 15/25. |
| §4 lists only happy sequences (no invalid transitions) | Area 3 max 12/20. |
| §5 has unresolved cells (no value, no question) for > 20% of operations × roles | Area 3 max 12/20. |
| Any §6 AC lacks a verify method or an expected-source rung | Area 4 max 12/20. |
| Any derived operation/param/AC has no source trace and no `Dự đoán`/`Suy luận` marker, HOẶC any §2 operation thiếu vai trò ownership (không giá trị, không câu hỏi) | Area 5 max 8/15. |
| Any §8 question vi phạm cổng §7 hoặc trùng chủ đề chưa tham chiếu (vi phạm cổng §8) | Area 5 max 8/15 — sửa câu hỏi trước khi phát hành báo cáo. |

## 6. Final verdict

| Score | Verdict | Meaning |
|---:|---|---|
| 90–100 | Ready | Scenario design can proceed with high confidence. TC design still requires the API doc (M2 gate — separate from this verdict; binding & doc reconciliation happen there). |
| 70–89 | Conditionally Ready | Scenario design may proceed; open items must be resolved in parallel. |
| 0–69 | Not Ready | Too many gaps/conflicts — answer the backlog and re-audit first. |

Auto-fail: any critical area = 0, or any unresolved Blocker → Not Ready regardless of total.
