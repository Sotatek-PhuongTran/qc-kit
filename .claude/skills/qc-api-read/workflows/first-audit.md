# qc-api-read — First Audit workflow

> Title: API First Audit Workflow | Created: 2026-07-10 | Updated: 2026-07-14 (v4 — REQ-FIRST THUẦN: bỏ toàn bộ đối chiếu API doc khỏi skill (chuyển qc-api-tc-design); ownership claim theo operation `resource · action`; DEDUP GATE policy §8 trước khi hỏi; v3.1 2026-07-13 — question gate; v3 — endpoint ownership; v2 2026-07-10 — lean-output rules) | Version: v4
>
> Checkpoint boundary steps follow `.claude/config/checkpoint-protocol.md` §4 + this skill's `workflows/checkpoint-protocol.md`. Do NOT duplicate those rules here.

## Lean-output rules (apply in EVERY phase — the template's "Ba quy tắc chống phình file")

1. **One home per fact:** scope lives ONLY in §2 (operation catalog) — no separate "in-scope" narrative; flows/state live ONLY in the single §4 table; the Issue Register is the §8 table itself (Severity + Loại columns), never a separate table. Thông tin doc/endpoint KHÔNG có nhà trong báo cáo này — nhà của nó là bảng binding trong TC md (`qc-api-tc-design`).
2. **Reader-driven repetition:** when two sections serve different reading moments (a validation rule in §3 and the AC asserting it in §6), write the content IN FULL in both — with the source code in parentheses. NEVER replace content with a bare code the reader must look up.
3. **Do not write what did not happen:** only APPLIED auto-caps are listed in §9; the change-log entry is ≤ 2 lines; out-of-scope entities collapse to one note line in the §2 CRUD check.

## Phase 1 — Derive & Synthesize (from the audited UC — thuần nghiệp vụ, không API doc)

> Friendly name: `Suy diễn thiết kế API nghiệp vụ từ audited UC`

1. **Worklog**: rewrite last entry → `status = "Running (Phase 1)"`; append input paths.
2. **Run the prerequisite gate** (SKILL.md) on the latest `uc-review-report`.
3. **Đọc 2 sổ câu hỏi** và giữ trong working memory (DEDUP GATE, policy §8): (a) sổ nhánh UI của UC (`question-backlog` per-UC — READ-ONLY, mọi trạng thái); (b) sổ nhánh API cấp portal (`api-question-backlog` — mục A câu hỏi chung + section của UC này, mọi trạng thái). Sổ chưa tồn tại → coi như rỗng, ghi chú ở §0 của báo cáo. Riêng khi sổ UI per-UC chưa tồn tại → dedup trực tiếp với bảng gap/câu hỏi §10.1 của audited UC (`uc-review-report`) thay cho sổ. Câu đã trả lời ở BẤT KỲ sổ nào → nguồn expected rung 3 cho các bước dưới; câu đang Open cùng chủ đề → ứng viên tham chiếu thay vì hỏi lại.
4. **Read the audited UC** and build, in working memory, the content of template sections §1–§6:
   - **§1 Out-of-scope** — only what the API tier does NOT cover (client-only behaviors, excluded features) with the reason and its test impact. In-scope needs no section — §2 IS the scope.
   - **§2 Operation catalog** — one operation per business action the BE must serve. Sources, in order: audited §6 flows (each system response implies an operation), §3.2 postconditions (each data change implies a write), §4 Bảng A controls (each submit/search/filter/upload implies an operation), §8 AC (each Then implies an outcome), `qc-data-map` entities (CRUD completeness probe). Assign `OP-<UC-ID>-NN` + **khoá claim `resource · action`** (resource: tên entity theo data-map hoặc tên nghiệp vụ trong audited UC; action: bộ động từ API chuẩn ở `coverage-rules.md §Operation ownership`). Every operation cites its audited source; uncertain backend involvement → question, not an operation. CRUD check: table rows only for entities this UC touches; fully out-of-scope entities → one collapsed note line. KHÔNG ghi endpoint/method — tên operation là tên nghiệp vụ.
   - **§3 Validation matrix** — one row per input param (audited §4 field rows + §6.B rules, verbatim with source). Derive EP partitions + BVA values — THE shared test values for both branches. **Param có thể biểu diễn nhiều kiểu → liệt kê các biến thể (string/number/object/null; có-không khoảng trắng; định dạng thay thế) thành partition để test — KHÔNG đặt câu hỏi "gửi kiểu gì" (policy §7 BANNED #4).**
   - **§4 Flows & state transitions** — the SINGLE table: one row per flow/transition (từ → tới, operation + điều kiện, hợp lệ?, kết quả khi không hợp lệ ở MỨC HÀNH VI — status cụ thể chỉ khi nguồn requirement đã nêu sẵn; message trích là bản hiển thị UI, ghi chú rõ). Multi-step flows put the OP chain in the Operation column. Do NOT build a separate flow-sequence table.
   - **§5 Permission matrix** — operations × roles from audited §2; unknown cells → `?` + question. Expected results of denied cells live in §6, not here.
   - **§6 API-oriented AC** — read `.claude/config/api-shared/expected-and-verify-policy.md` (v4) FIRST. One AC per observable outcome, each SELF-CONTAINED, written at BEHAVIOR level: business outcome + side-effect + `body có message báo lỗi` for failures. Exact status codes ONLY when a requirement source already states them (never ask BE for codes — the api-baseline records them at first run); exact API-body messages NEVER (UI text belongs to the UI branch — policy §3). Behavioral distinctions (e.g. two cases must answer identically) ARE design-tier ACs. Success-response content: state the REQUIRED fields SEMANTICALLY from the requirement (token, user identity, tenant context...) — never ask BE for schemas; exact field names are script-tier (probe → api-baseline/api-conventions). "Nguồn expected" column: rung + source code + the CORE phrase.
5. **Checkpoint**: write `01_derivation.md`; update `progress.md`; worklog `status = "Phase 1 done"`.

## Phase 2 — Ownership claim + Score

> Friendly name: `Claim vai trò operation và chấm điểm readiness`

1. **Worklog**: `status = "Running (Phase 2)"`.
2. **Ownership claim — fill §2 "Vai trò":** resolve `qc-api-coverage` and read it READ-ONLY (missing file → every operation unowned). For EACH §2 operation, apply the claim rules in `.claude/config/api-shared/coverage-rules.md §Operation ownership` theo khoá `resource · action` (`Owner` / `Reuse → UC-X` / `Reuse → UC-X (dự kiến)` / `Reuse — chưa rõ owner`). Do NOT write the coverage map here — the rebuild happens ONCE at the end of Phase 3.
3. **Score** per `references/api-scoring-rubric.md`: the Issue Register is assembled directly INTO the §8 table (each row = question + Severity + Loại). **Chạy 2 cổng trên MỌI candidate row trước khi nó vào §8, theo thứ tự:**
   - **QUESTION GATE (`expected-and-verify-policy.md` §7):** drop rows asking exact status codes / body messages / schemas / request-payload shape — under ANY label; split mixed questions and keep ONLY the behavioral half (re-express distinctions as relative-assertion ACs in §6, kiểu-dữ-liệu thành partition §3).
   - **DEDUP GATE (policy §8):** đối chiếu với 2 sổ đã đọc ở Phase 1 — câu đã trả lời (sổ nào cũng vậy) → dùng answer làm nguồn, không hỏi; câu Open trùng chủ đề ở sổ UI → ghi `→ Q-x (sổ UI)` (BA trả lời tại sổ UI, không chép sang sổ API); câu Open trùng ở sổ API portal → ghi `→ Q-API-x`; chủ đề dự án/hạ tầng → đánh dấu `[Chung — mục A]` để `qc-qna` đặt đúng tầng.
   Then fill the §9 scoring table. §9 lists ONLY the applied auto-caps. §9 notes are one sentence per area.
4. **Checkpoint**: write `02_scoring.md`; update `progress.md`; worklog `status = "Phase 2 done"`.

## Phase 3 — Render report + Handoff

> Friendly name: `Viết báo cáo api-audited và bàn giao câu hỏi`

1. **Worklog**: `status = "Running (Phase 3)"`.
2. **Questions handoff — FIRST, before writing the deliverable** (the §8 table needs the book IDs, and the deliverable is immutable once written): push every §8 candidate row through `qc-qna` **API mode** (ghi vào `api-question-backlog`; tag nguồn `qc-api-read`; dòng `[Chung — mục A]` đặt ở mục A; dòng `→ Q-API-x` bổ sung UC vào dòng cũ; dòng `→ Q-x (sổ UI)` chỉ ghi nhận tham chiếu — KHÔNG tạo dòng, KHÔNG ghi sổ UI). Collect the assigned `Q-API-NNN` IDs for every new row — §8 uses these real IDs.
3. **Render** `templates/api-audited-template.vi.md` (v4) with Phase 1 + 2 content — §8 rows carry the `Q-API-NNN` IDs assigned in step 2. Language = Vietnamese (tài liệu review nội bộ — luật 2 nhóm, `qc-writting-rules.md` § Ngôn ngữ output). Run the `qc-writting-rules.md` §5 gate AND the lean-output rules above (self-check: no in-scope narrative section, one §4 table, no separate ISS table, no endpoint/doc content anywhere, only applied caps, change log ≤ 2 lines), then write the deliverable as `v[N]` (never overwrite). The deliverable IS the Phase 3 checkpoint.
4. **Rebuild the coverage map** per `coverage-rules.md §Coverage map`: scan ALL `*_api-audited_*` files under the uc-read root (latest version per UC) + các bảng binding trong TC md hiện có + mục A của các sổ `<PORTAL>_api-question-backlog.md` (dòng cờ `ORPHAN_ENDPOINT` / kết luận `Bug BE`), regenerate `qc-api-coverage` from `templates/qc-api-coverage-template.vi.md` and OVERWRITE the whole file. Unconditional — runs at the end of EVERY run even when ownership did not change.
5. **Chat report (Vietnamese):** verdict + score per area; operation count + vai trò (Owner/Reuse của UC này); số câu hỏi mới / tham chiếu câu cũ / câu kế thừa answer; dòng `⚠ Xung đột` / `⏳ Chưa có chủ` mới nổi lên sau rebuild (QC xử lý theo mục 2 của bản đồ coverage); next step — `/qc-api-scenario-design <UC-ID>` (Ready/Conditionally) or answer backlog first (Not Ready). Nhắc: binding endpoint + đối chiếu API doc sẽ chạy ở `/qc-api-tc-design` (cần API doc).
6. **Cleanup** per shared protocol §5.
