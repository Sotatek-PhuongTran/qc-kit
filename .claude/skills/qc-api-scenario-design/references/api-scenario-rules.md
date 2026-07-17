# API Scenario Design Rules & Templates

> Title: API Scenario Design Rules | Created: 2026-07-10 | Updated: 2026-07-14 (v3 — area 9 An toàn & chống lạm dụng; nguyên tắc phân bổ độ sâu "FE đã ghép"; error guessing thêm wrong-type/biểu diễn thay thế; v2 2026-07-13 — tier per coverage area + owner-only rule + reuse-reference output section) | Version: v3
>
> Referenced by `workflows/design.md`. Single source for techniques, template, coverage areas, output structure, and quality gates of the API branch.

## Design principles

- **Risk-based:** operations that write money/identity/state get extra coverage (invalid transitions, permission, integrity); pure reads stay lean.
- **What-if driven, API flavor:** for every operation ask "what if the CALLER..." — sends the request twice (double-submit / idempotency), sends it out of order (skips a state), sends a stale id, sends extra/unknown fields, omits the field entirely vs sends it null vs empty string, sends the wrong Content-Type, uses another role's token. Each meaningful what-if is its own scenario.
- **BE is the last line of defense:** design as if no client validation exists — every §3 rule must be enforced server-side regardless of what the UI blocks (coverage-rules: validation is covered on BOTH layers deliberately).
- **Phân bổ độ sâu — API đã đi qua vòng ghép FE:** những gì vòng ghép FE chắc chắn chạm (happy contract, luồng chính với dữ liệu hợp lệ) chỉ cần smoke MỎNG — 1 scenario/operation, không mở rộng. Ngân sách scenario dồn vào những gì vòng ghép KHÔNG chạm: server-side guard khi bypass client, gọi thẳng sai role / sai trạng thái / cross-tenant, hostile input & abuse (area 9), tính toàn vẹn dữ liệu khi lỗi giữa chừng, chuỗi operation nhiều bước. Mục tiêu là xác nhận API TUÂN THỦ YÊU CẦU và AN TOÀN — không lặp lại những gì FE ghép đã phát hiện.
- The api-audited is incomplete by default — flag silent branches instead of assuming them away.

## MANDATORY test design techniques (scenario level)

One technique application ≈ one scenario; `qc-api-tc-design` later expands each into atomic cases (every partition/boundary value).

1. **Equivalence Partitioning (EP)** — one scenario per valid/invalid partition family of a §3 param (atomic per-value cases come later).
2. **Boundary Value Analysis (BVA)** — one scenario per constrained param declaring the boundary set from §3 (`min−1, min, max, max+1`).
3. **Decision Table** — rules that combine (role × state × payload condition) get matrix scenarios; never test an interacting condition in isolation.
4. **State Transition** — one scenario per valid transition (§4 bảng hợp nhất — cột "Trạng thái từ → tới" trên dòng *Hợp lệ*) + one per INVALID transition attempt (§4 dòng *KHÔNG hợp lệ* = chuyển trạng thái không hợp lệ; expected: rejected, state unchanged).
5. **Use Case Testing** — happy sequence per §4 flow (bảng hợp nhất — dòng *Hợp lệ* = chuỗi operation/luồng) + each alternative/exception branch.
6. **Error Guessing (API-specific)** — malformed JSON body; wrong/missing `Content-Type`; unknown extra fields; null vs missing vs empty-string; **wrong type / biểu diễn thay thế của cùng giá trị** (string vs number vs object; có/không khoảng trắng; `+84` vs `0` — thiết kế đủ biến thể thay vì hỏi trước "gửi kiểu gì", policy §7 BANNED #4); oversized payload; duplicate submission; concurrent update on the same resource; stale/non-existent resource id; boundary page/limit values on list operations.

## Scenario template

```
### Scenario ID: TS_API_[UC-ID]_[NNN]
**Scenario Title:** [short, states the intent AND the condition]
**Operation:** [tên operation (OP-<UC-ID>-NN)]
**Trace:** [AC-API-# / §3 param+rule / §4 dòng luồng hoặc chuyển trạng thái (bảng hợp nhất) / §5 cell]
**Test Type:** [Contract | Validation | Business flow | Permission | Data integrity | Protocol | Security | MIX]
**Description:** [1–2 sentences — what condition is verified, expected outcome class (2xx/4xx + side-effect)]
**Test Focus:** [Happy path | Invalid input | Boundary | State transition | Role/Permission | Side-effect | Idempotency/Duplicate | Hostile input | Abuse/Spam | Data exposure | Consistency UI↔API]
```

## Coverage areas (matrix columns)

| # | Area | Source in api-audited | Minimum |
|---|---|---|---|
| 1 | Contract & schema | §2 output | 1 happy contract scenario per operation |
| 2 | Validation per param | §3 matrix | ≥ 1 scenario per param's invalid family + 1 boundary scenario per constrained param |
| 3 | Business flow | §4 (bảng hợp nhất) — dòng *Hợp lệ* = chuỗi operation/luồng | happy + each alternative/exception branch |
| 4 | State transition | §4 (bảng hợp nhất) — dòng *KHÔNG hợp lệ* = chuyển trạng thái không hợp lệ (+ cột trạng thái của dòng *Hợp lệ*) | every valid transition + ≥ 1 invalid attempt per state |
| 5 | Permission | §5 matrix + `auth-strategy.md` minimum set | per operation: theo `config/api-shared/auth-strategy.md` §Minimum permission coverage per operation |
| 6 | Data integrity / side-effect | §6 AC (Cách verify) | every write operation: verify-after-write + rejected-request-no-change |
| 7 | Protocol behaviors | operation kind | idempotency/duplicate for writes; pagination/filter/sort bounds for lists |
| 8 | MIX — consistency UI↔API | §6 + UI branch (scope Both ONLY) | few and targeted: one per critical data path (coverage-rules) — UI action → API state check; API action → UI display check |
| 9 | An toàn & chống lạm dụng (app-level) | §3 params (chuỗi/tự do), loại operation, rule dữ liệu nhạy cảm trong audited UC/common files | per Owner OP: (a) ≥ 1 scenario **hostile input** cho nhóm param chuỗi tự do — bộ giá trị hiểm (chuỗi SQL/NoSQL injection, script tag như DATA, payload quá khổ/lồng sâu) → bị từ chối có kiểm soát: `4xx` không `5xx`, KHÔNG side-effect; (b) operation nhạy cảm (auth, đổi/đặt mật khẩu, ghi tiền/danh tính) → ≥ 1 scenario **abuse/spam** (double-submit, gọi lặp nhanh) — expected theo rule rate-limit nếu requirement có, chưa có → ghi nhận hành vi quan sát làm finding, không chặn thiết kế; (c) operation trả/nhận dữ liệu nhạy cảm → ≥ 1 scenario **data exposure**: response/error KHÔNG echo password/token, field nhạy cảm được che theo yêu cầu (vd. PDPL) |

**Tier per area (coverage-rules §Two test tiers):** areas 1, 2, 5, 7, 9 are ENDPOINT-LEVEL — designed only by the OP's owner UC (§2 role `Owner`); areas 3, 4, 6, 8 are FLOW-LEVEL — designed by every UC for its own flows. For `Reuse` OPs mark cells of areas 1/2/5/7/9 `reuse — UC-X` and record the reference in the output's "Tham chiếu endpoint-level" section — never re-design the owner's intents.

**Ranh giới area 9:** đây là an toàn MỨC ỨNG DỤNG, black-box, không cần tool chuyên dụng — kiểm chứng server tự vệ trước input hiểm và lạm dụng cơ bản. Pentest có tool (fuzzing chuyên sâu, scan CVE, DDoS), load/performance vẫn là Out-of-Scope → chuyển specialist.

Do not skip an area because the api-audited is brief — mark the cell `blocked` and flag it instead.

## Output file structure

```markdown
# API Test Scenarios — [UC ID] [Feature Name]

> Source: <api-audited v[N] path>
> Generated: <YYYY-MM-DD>
> Phạm vi test: <Black-box + API | API only>  (MIX: <in scope | n/a>)

## [OP-ID] — [Tên operation]

### Scenario ID: TS_API_[UC ID]_001
...

---

## Tham chiếu endpoint-level (OP Reuse)

[Section chỉ xuất hiện khi UC có ≥ 1 OP Reuse. Mỗi OP Reuse MỘT dòng — tham chiếu, không thiết kế lại.]

| OP | UC chủ (endpoint-level nằm ở đó) | Ghi chú |
|---|---|---|
| [OP-ID] | UC-X | [— hoặc: UC chủ dự kiến, chưa audit — endpoint-level CHƯA tồn tại ở đâu, QC cân nhắc thứ tự audit] |

---

## ⚠️ Out-of-Scope Flags

| Scenario Area | Reason | Recommended Action |
|---|---|---|
| [Description] | [NFR: PERFORMANCE / LOAD / PENTEST-TOOLING (fuzzing chuyên sâu, CVE scan) | BLOCKED: <gap> — chờ BE/BA] | Defer to specialist / Resolve via qc-qna + re-audit |
```

## Quality checks (run before writing the file)

- [ ] Every §2 operation has ≥ 1 scenario (or an Out-of-Scope / "Tham chiếu endpoint-level" row explaining why not).
- [ ] Every `to-cover` matrix cell has ≥ 1 scenario.
- [ ] Every scenario has a unique `TS_API_[UC-ID]_NNN`, cites a real `OP-*` and a real trace — no orphans.
- [ ] Test Type from the closed list only; MIX scenarios exist ONLY when scope is Both.
- [ ] Boundary scenarios exist for every constrained param in §3 belonging to an `Owner` OP (params of `Reuse` OPs live with the owner UC).
- [ ] Permission scenarios cover the `auth-strategy.md` minimum set for every `Owner` operation.
- [ ] Every write operation has a side-effect scenario AND a rejected-request-no-change scenario.
- [ ] Area 9 minimums per Owner OP: hostile-input scenario cho nhóm param chuỗi tự do; abuse/spam scenario cho operation nhạy cảm; data-exposure scenario cho operation chạm dữ liệu nhạy cảm.
- [ ] Happy contract / luồng chính chỉ có smoke mỏng (1 scenario/op) — không mở rộng phần vòng ghép FE đã phủ (design principle "Phân bổ độ sâu").
- [ ] No scenario merely re-walks a UI journey over HTTP (coverage-rules self-check) — its outcome must be BE-observable.
- [ ] Verbatim error text from common files is inlined wherever the api-audited cites a message/rule code.
- [ ] No endpoint-level scenario (areas 1/2/5/7/9) exists for a `Reuse` OP; every `Reuse` OP has its row in "Tham chiếu endpoint-level".
- [ ] File header carries `> Source: <api-audited v[N] path>` (update mode depends on it) plus `> Generated:` and `> Phạm vi test:` per §Output file structure.
