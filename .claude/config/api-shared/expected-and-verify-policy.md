# Expected Source Ladder & Verify Policy

> Title: Expected & Verify Policy | Created: 2026-07-10 | Updated: 2026-07-14 (v4 — §7 BANNED #4: cấm hỏi hình dạng request payload, biến thể kiểu dữ liệu là EP partition; §8 DEDUP GATE nhánh API: đối chiếu sổ UI per-UC + sổ API portal trước khi hỏi; v3 2026-07-13 — §7 QUESTION GATE: hard filter banning exact-code/message/schema questions in ANY form; v2 2026-07-10 — behavior-level expected + api-baseline) | Version: v4
>
> Shared contract. Consumers: `qc-api-read` (§6 AC), `qc-api-tc-design` (per-TC expected), `qc-api-auto-generate` (baseline mechanics), `qc-bug-report` (judging failures). One rule set — referenced, never restated.

## 1. The two-tier rule (locked with the kit owner)

**Design tier** (api-audited AC + test cases) states WHAT must happen — business outcome + side-effect. **Script tier** (test scripts) states the EXACT values — discovered from the running system and pinned as a baseline. Missing exact status codes or message texts NEVER blocks design and NEVER generates questions to BE (the api-baseline answers them automatically at first run).

| Tier | Expected says | Exact status code? | Exact message? |
|---|---|---|---|
| api-audited §6 AC / TC md | `thành công + <side-effect>` or `bị từ chối + body có message báo lỗi + <no-change/side-effect>` | ONLY if the doc already provides it (never ask) | NEVER for the API body (see §3) |
| Test script | Asserts exact values | From doc if given, else from the **api-baseline** (recorded at first run) | Same |

**Success-response CONTENT follows the same two-tier rule:** design tier states the REQUIRED content derived from the requirement (e.g. login → token + user identity + tenant context, per the business rule that demands them) — semantically, without field names. Exact field names/paths are discovered at probe/first run: the login token path is written into `api-conventions.ts` (`auth.tokenPath`), other observed paths are recorded alongside the baseline. NEVER ask BE for a response schema unless the REQUIRED CONTENT itself cannot be derived from any requirement source.

Exceptions that DO belong at design tier, because they are behavior, not numbers: (a) doc-provided values (swagger lists `401` → write it); (b) **behavioral distinctions** — e.g. "hai case sai email / sai mật khẩu phải trả về CÙNG status + CÙNG message" (chống dò tài khoản) — assertable by comparing two responses without knowing their content.

## 2. Expected source ladder (per fact, highest available rung wins)

| Rung | Source | Gives |
|---|---|---|
| 1 | Dedicated API doc / design doc | Behavior + exact contract, verbatim |
| 2 | Swagger/OpenAPI/Postman | Structure: documented status codes, schema, required/enum, auth scheme |
| 3 | Business rules in audited UC / common files | Behavior: logic, permissions, state transitions |
| 4 | **api-baseline** (observed at probe/first run) | Exact status/message pinned for regression; `confirmed=false` until BE/QC confirms — a mismatch against an UNCONFIRMED baseline is a finding to re-record or confirm, not automatically a bug |

Never fabricate an expected. No rung at all for the BEHAVIOR → the TC is not writable; the gap goes to the backlog (nhánh API: `api-question-backlog` qua `qc-qna` API mode).

## 3. Messages — UI text vs API body (do NOT mix)

Messages in requirement/common files (e.g. `"Email hoặc mật khẩu không đúng..."`) are **UI display text** — owned by the UI branch's TCs, asserted verbatim on screen. The API body's message (e.g. `"Invalid credentials"`) is a DIFFERENT string chosen by BE; FE maps between them. Therefore:

- API design-tier expected: `body có message báo lỗi` (non-empty, per the project's error-body paths in `api-conventions.ts`) — never the UI text.
- API script-tier: exact body message from the api-baseline.
- Asserting a UI message verbatim against an API body is a design error — flag it during review.

## 4. The api-baseline (script-tier memory)

- ONE living file per UC: `api-baselines/<UC-ID>_api-baseline.json` (logical name `api-baseline`) — git-tracked, machine-written. Entries: `{ "<TC-ID>": { "status": 401, "message": "<observed>", "recordedAt": "<date — run/probe>", "confirmed": false } }`.
- **Record mode** (entry absent): the spec asserts behavior-class only — success = `2xx` + side-effect; failure = `4xx` + error body non-empty + no-change guard — and RECORDS the observed status/message. The run report lists newly recorded entries for QC review.
- **Assert mode** (entry present): the spec asserts the exact recorded values. A later mismatch = regression signal — `confirmed=true` → candidate bug; `confirmed=false` → finding: re-record intentionally or ask BE, never silently overwrite.
- QC/BE edit ONLY the `confirmed` field (and may correct values when BE states the intended ones — that upgrades the entry to rung 1).
- HARD class rules regardless of baseline: a failure case answering `2xx` is ALWAYS a failed assertion; an input-error case answering `5xx` is ALWAYS a failed assertion (and per `root-cause-taxonomy.md` a real-bug candidate — 5xx means the server did not control the input).

## 5. Side-effect verify policy (unchanged — the PRIMARY oracle)

Because status/message may start class-level, the side-effect check is the strongest oracle and is REQUIRED:

| Operation type | Default verify |
|---|---|
| Create | GET the created resource → fields match payload |
| Update | GET → changed fields new, untouched unchanged |
| Delete | GET → absent / documented soft-delete state |
| State transition | GET → new state; forbidden transitions leave state unchanged |
| Rejected request | GET/list → NO record created / NO change (no-change guard) |
| Pure read / computation | Response-only is sufficient |

DB check replaces/augments GET-after-write only when the project grants DB access (`.env`, feasibility L4). Async side-effects: bounded `expect.poll`; beyond bounds → manual-verify triage.

## 6. Assertion baseline (what every generated API test asserts)

1. Outcome class (success `2xx` / failure `4xx` — plus the §4 hard class rules) — upgraded to the exact status by doc or baseline.
2. Response schema (ajv, `runner/schemas/`) when a schema exists.
3. Error body non-empty via `api-conventions.ts` paths — upgraded to the exact message by doc or baseline.
4. Business assertions from the TC (field values) + the §5 side-effect.
5. Relative assertions where the TC demands consistency (e.g. two cases must return identical responses).

## 7. QUESTION GATE (hard filter — every question, every label, both audit modes)

Added v3 after early pilot first-audits leaked exact-code questions under new labels ("hỏi song song để BE thống nhất", `MISSING (contract)`, `MISSING (server-guard error body)`). Before ANY question reaches §8 or the `question-backlog`, test it here. The gate applies to EVERY issue-type label and EVERY phrasing — "confirm in parallel" is still asking.

**BANNED — drop, never send to BE:**

1. *Which exact status code does <case> return?* — the api-baseline records it at first run (§4).
2. *What is the exact body message / error text?* — same (§3 + §4).
3. *What is the response schema / error-body path (`error.message` vs `detail` vs `errors[0].message`...)?* — probe/first run writes it into `api-conventions.ts` + api-baseline (§1); QC/BE confirm THERE, not via the backlog.
4. *Request payload/DTO gửi theo kiểu gì — tên field wire, kiểu dữ liệu, cấu trúc object?* — requirement đã định nghĩa DỮ LIỆU nghiệp vụ (rung 3 — vd. CRULE nói "chuỗi số 10 ký tự"); hình dạng wire thật do probe/first-run ghi nhận vào `api-conventions.ts` / `api-testdata`; còn lệch swagger ↔ requirement là finding của bước binding trong `qc-api-tc-design` — không phải câu hỏi readiness. Nhu cầu test đúng: liệt kê các BIẾN THỂ kiểu/biểu diễn của cùng giá trị thành EP partition trong §3 của api-audited (string vs number vs object vs null; có/không khoảng trắng; `+84` vs `0`) — mọi biểu diễn sai phải bị từ chối có kiểm soát (`4xx`, không bao giờ `5xx` — §4).

**Mixed questions — split; only the behavioral half survives:**

| Real need behind the question | Correct re-expression |
|---|---|
| FE must DISTINGUISH two failure cases (different warnings/messages) | Design-tier AC: "case A và case B phải TRẢ VỀ PHÂN BIỆT ĐƯỢC (khác status hoặc khác body)" — relative assertion, comparable without knowing values (§1 exception b). Exact values: baseline. |
| Two cases must be IDENTICAL (anti-enumeration) | Same relative-assertion AC form ("trả về GIỐNG HỆT NHAU"). |
| Side-effect semantics (token invalidated? write rolled back? before or after the response?) | BEHAVIOR — legitimate question when no requirement source answers it. |
| Missing OPERATION nghiệp vụ; missing validation RULE (e.g. max length); verify channel / test environment | Legitimate questions — unaffected by this gate. |
| Không rõ một object nên GỬI theo kiểu/biểu diễn nào (string vs object...) | Không hỏi — thiết kế partition đủ các biểu diễn ở §3, hành vi từng biểu diễn do baseline ghi. CHỈ hỏi khi RULE nghiệp vụ của dữ liệu (định dạng chuẩn hoá, bộ ký tự, đơn vị) không có ở BẤT KỲ nguồn requirement nào — và khi đó hỏi về RULE, không hỏi về payload. |

**Litmus test:** if the answer is a NUMBER or STRING the running system will reveal at first run → do not ask. If the answer changes WHAT the system must do → ask.

## 8. DEDUP GATE — đối chiếu sổ câu hỏi trước khi hỏi (NHÁNH API; mọi candidate ĐÃ QUA cổng §7)

> Consumers: `qc-api-read`, `qc-api-tc-design`. Gate này KHÔNG thay đổi quy trình nhánh UI — `qc-uc-read` và sổ `question-backlog` per-UC giữ nguyên như các version kit trước.

Câu hỏi về RULE nghiệp vụ (validation, hành vi, side-effect, chính sách) là câu hỏi CHUNG của feature/dự án — không thuộc riêng nhánh nào, không thuộc riêng một UC. Trước khi một candidate đi vào §8 của báo cáo hay sổ, PHẢI đối chiếu HAI nguồn theo thứ tự:

1. **Sổ nhánh UI của UC (`question-backlog` per-UC — READ-ONLY, mọi trạng thái):**
   - Trùng câu đã **Answered/Resolved** → KHÔNG hỏi lại; dùng câu trả lời làm nguồn expected (rung 3, ghi "BA trả lời <ngày> — Q-x sổ UI").
   - Trùng câu đang **Open** → KHÔNG tạo câu mới; báo cáo ghi tham chiếu `→ Q-x (sổ UI)` — BA trả lời MỘT lần tại sổ UI, nhánh API kế thừa answer ở lần re-audit. KHÔNG chép câu hỏi sang sổ API.
2. **Sổ nhánh API cấp portal (`api-question-backlog` — mục A câu hỏi chung + section của MỌI UC):**
   - Trùng câu đã trả lời → dùng answer làm nguồn (rung 3).
   - Trùng câu Open → tham chiếu `→ Q-API-x`; `qc-qna` bổ sung UC hiện tại vào cột "UC áp dụng" của dòng cũ — không tạo dòng mới.
   - Chủ đề mang tính dự án/hạ tầng (chính sách password, kênh verify nhật ký kiểm toán, fault injection, chính sách rollback/tính nguyên tử, rate-limit...) → đánh dấu `[Chung — mục A]` để `qc-qna` đặt ở mục A, BA/BE trả lời MỘT lần cho cả portal.

So khớp "cùng chủ đề" dựa trên đối tượng + rule + hành vi được hỏi (không so chuỗi máy móc); phân vân → coi là TRÙNG và tham chiếu, kèm ghi chú khác biệt nếu có.
