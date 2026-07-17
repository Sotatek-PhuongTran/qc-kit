# Coverage Rules — UI / API / MIX

> Title: Coverage Rules UI-API-MIX | Created: 2026-07-10 | Updated: 2026-07-16 (v3.1 — rebuild: glob TC md chính thức `*_api-testcases_*_v*.md` (version cao nhất per UC, thay `_draft`); thêm nguồn quét thứ 3 = mục A sổ api-question-backlog (cờ ORPHAN_ENDPOINT / Bug BE); v3 2026-07-14 — ownership chuyển khoá từ endpoint sang OPERATION `resource · action` (req-first, không cần API doc); bộ động từ API chuẩn; coverage map theo operation, cột endpoint lấy từ bảng binding TC md; area 9 an toàn vào tầng endpoint-level; v2 2026-07-13 — endpoint ownership, two test tiers) | Version: v3.1
>
> Shared contract. Consumers: `qc-api-read` (ownership claim + coverage map rebuild), `qc-api-scenario-design`, `qc-api-tc-design` (design-time layering + owner-only rule + binding), `qc-bug-report` (cross-evidence). Controlled by `project-context-master §3.0 Phạm vi test` (nhập tại project-config §6, kế thừa vào §3.0 — skills read §3.0).

## Scope switch

| Phạm vi test (project-context-master §3.0) | Effect |
|---|---|
| `Black-box only` | UI branch only — no API artifact exists anywhere (kit behaves exactly as before this extension) |
| `API only` | API branch only — NO `TC_MIX`, no "TC UI liên quan" column content (column stays, cells `—`) |
| `Black-box + API` | Both branches + MIX + cross-links. Declared once at onboarding; may only change ONE-WAY into `Black-box + API` |

## Layering rules (anti-duplication with intent)

1. **Validation is covered on BOTH layers — deliberately, not redundantly.** Same rule, different subject-under-test and different expected:
   - UI TC: FE validation — on-screen message (verbatim), submit blocked, control states.
   - API TC: BE validation — 4xx + error body (verbatim) + NO side-effect, regardless of what any client would block.
   A missing FE check and a missing BE check are DIFFERENT bugs.
2. **Business flow depth lives on the API layer.** Full EP/BVA matrices, all state transitions, permission matrix, idempotency/pagination, an toàn & chống lạm dụng (area 9) — exhaustive at API (fast, locator-free). The UI layer keeps REPRESENTATIVE user paths (happy + key alternates) plus everything only the UI can show: layout, display states, navigation, interaction, UX messages. Độ sâu API phân bổ theo nguyên tắc "FE đã ghép" (`api-scenario-rules.md §Design principles`): happy path smoke mỏng, dồn vào guard/abuse/toàn vẹn dữ liệu.
3. **MIX = consistency between the two layers** (scope Both only), designed on the API branch as `TC_MIX_*`:
   - UI action → API/GET verifies stored data;
   - API action → UI displays the change correctly.
   MIX cases are few and targeted (one per critical data path), not a third copy of coverage.

## Two test tiers per operation (anti-duplication ACROSS UCs)

API testing của một operation nghiệp vụ (và endpoint mà nó bind tới ở giai đoạn TC) tách thành hai tầng; every scenario/TC belongs to exactly ONE tier:

| Tier | Covers | Coverage areas (api-scenario-rules) | Designed by |
|---|---|---|---|
| **Endpoint-level** | The endpoint defends itself regardless of any business flow: contract & schema; per-param validation (full EP/BVA); permission + token minimum set (`auth-strategy.md`); cross-tenant guard of the endpoint itself; protocol behaviors (method semantics, idempotency/duplicate, pagination/filter/sort bounds); an toàn & chống lạm dụng (hostile input, spam, data exposure) | 1, 2, 5, 7, 9 | The operation's **owner UC only** — designed ONCE for the whole project |
| **Flow-level** | This UC's business usage of the operation: operation chains, state transitions, business side-effects (verify-after-write of the UC's own writes), MIX consistency | 3, 4, 6, 8 | **Every UC** that uses the operation, each for its own flows |

## Operation ownership (Owner / Reuse) — khoá claim KHÔNG cần API doc

1. **Khoá claim = `resource · action`.** `resource` = tên entity theo `qc-data-map` (hoặc tên nghiệp vụ trong audited UC khi data-map chưa có — chuẩn hoá về một tên); `action` = MỘT động từ trong bộ động từ API chuẩn dưới đây. Hai UC suy ra cùng cặp `resource · action` ⟹ cùng MỘT operation dùng chung — đây là cơ chế chống trùng cross-UC, hoạt động từ giai đoạn chưa có API doc.

   **Bộ động từ API chuẩn (đóng — QC Lead duyệt mới được thêm):** `Tạo` (create) · `Đọc` (read one) · `Danh sách` (list/search/filter) · `Cập nhật` (update) · `Xoá` (delete) · `Chuyển trạng thái` (state transition — kèm tên trạng thái nếu cần phân biệt) · `Đăng nhập` · `Đăng xuất` · `Xác thực` (verify/validate token, OTP...) · `Đặt lại` (reset) · `Xuất` (export) · `Nhập` (import) · `Tải lên` (upload). Thiếu động từ → chọn từ tiếng Việt thông dụng, đánh dấu "động từ ngoài bộ" trong chat report, đề xuất QC Lead bổ sung.

2. **Every operation has AT MOST ONE owner UC.** Owner = the UC whose PRIMARY business action the operation serves (usually the CRUD UC of the resource). Using an operation as a verify-helper or auxiliary step does NOT make a UC its owner.
3. **Owner duty:** endpoint-level design covers the WHOLE operation — every param, method semantics, an toàn... — kể cả khía cạnh narrative của UC chủ không nhắc (khi đã có digest ở giai đoạn TC, cite source `digest — endpoint-level`). This closes the "missing case" gap.
4. **Non-owner (Reuse) duty:** flow-level only. NEVER re-designs endpoint-level cases; its scenario/TC output REFERENCES the owner UC's IDs (reuse reference table). This closes the "duplicate TC" gap.
5. **Where the verdict lives:** api-audited §2, cột **"Vai trò"** — per operation, closed value list:
   - `Owner` — UC này sở hữu operation.
   - `Reuse → UC-X` — operation đã có chủ là UC-X (claimed on disk).
   - `Reuse → UC-X (dự kiến)` — natural owner identified but UC-X has no api-audited yet.
   - `Reuse — chưa rõ owner` — auxiliary use, natural owner unknown; the rebuild flags it for QC.
6. **Who writes what:** ONLY `qc-api-read` claims (fills the §2 column) and rebuilds the coverage map. `qc-api-scenario-design` / `qc-api-tc-design` take the verdict from api-audited §2 — they NEVER open the coverage map file.
7. **Claim procedure** (`qc-api-read`, per §2 operation, Phase 2; coverage map read READ-ONLY, missing file → every operation unowned):
   - map shows another UC as owner of the same `resource · action` → `Reuse → UC-X`;
   - unowned + the operation serves THIS UC's primary business → `Owner`;
   - unowned + auxiliary use → `Reuse → UC-X (dự kiến)` when the natural owner is identifiable (data-map, module map), else `Reuse — chưa rõ owner`.
8. **Ownership change (release / transfer)** happens ONLY by editing the involved UC's api-audited through a re-audit run (change source: user feedback = QC decision) — the next rebuild reflects it. Nobody edits the coverage map by hand.
9. **Conflict:** a rebuild finding 2+ Owners for one `resource · action` flags the row `⚠ Xung đột — QC quyết`. QC resolves via rule 8 on one of the UCs. Conflicts are DETECTED and surfaced — never silently overwritten. Hai tên resource/action khác nhau nhưng thực chất là một (đặt tên lệch) → QC hợp nhất bằng re-audit đổi khoá claim của một UC.

## Coverage map — derived view + rebuild algorithm

- File: `qc-api-coverage` (path-registry) = `docs/qc-lead/qc-api-coverage.md`. Template: `qc-api-read/templates/qc-api-coverage-template.vi.md`. **SOLE writer: `qc-api-read`.** Output language: Vietnamese.
- **Derived view:** the data lives in the per-UC api-audited files (vai trò + khoá claim) và bảng binding trong TC md (endpoint); delete the map at any time and the next rebuild restores it fully. NEVER hand-edited, never updated row-by-row.
- **Rebuild runs UNCONDITIONALLY at the END of EVERY `qc-api-read` run** (first-audit AND re-audit), even when §2 did not change — it is cheap, idempotent, and self-healing.
- **Algorithm:** scan every `*_api-audited_*` file under the uc-read root → keep the LATEST version per UC → collect per UC: khoá claim + vai trò của từng §2 operation. THEN scan các bảng "Binding OP ↔ endpoint" trong prelude của file TC md chính thức `*_api-testcases_*_v*.md` (lấy file version CAO NHẤT per UC, nếu có) → gắn endpoint đã bind vào operation tương ứng. THEN (nguồn quét thứ 3) scan mục A của từng sổ `<PORTAL>_api-question-backlog.md`: dòng mang cờ `ORPHAN_ENDPOINT` → sinh dòng map trạng thái `? Chưa rõ`; dòng kết luận `Bug BE` (endpoint không được phép tồn tại/public) → sinh dòng map trạng thái `⛔ Bug BE` — nhờ đó 2 trạng thái này của template không bao giờ mồ côi nguồn. Regenerate the WHOLE map from scratch and overwrite the file.
- **Operation universe** = mọi operation các api-audited đã khai. Cột endpoint chỉ điền khi UC nào đó đã chạy `qc-api-tc-design` — có thể TRỄ MỘT NHỊP so với TC md (nguồn tức thời là chính bảng binding); rebuild kế tiếp tự cập nhật.
- **Legacy reports** (api-audited viết theo template cũ — cột "Vai trò với endpoint" hoặc thiếu khoá claim): map ghi trạng thái `⏳ Chưa khai khoá claim — cần re-audit UC-X`. The rebuild never guesses.
- **Concurrency:** two parallel runs may both rebuild; the later overwrite wins with NO data loss (truth lives in per-UC files, which parallel runs never share). Two runs claiming the same operation simultaneously surface as a `⚠ Xung đột` row at the next rebuild (rule 9) — visible, not silent.

## Cross-link rule

- Every `TC_API_*` covering a rule that a UI TC also touches carries that UI TC's ID in the **"TC UI liên quan"** column. Filled at API TC design time by reading the UI TC md; the UI file is NEVER edited for this.
- Purpose: counter-evidence for root cause (see `root-cause-taxonomy.md`) — when one side fails, run/read the other side's result to localize FE vs BE.

## Self-check for qc-api-tc-design (quality gate before delivery)

- [ ] Bảng "Binding OP ↔ endpoint" trong prelude đầy đủ: mỗi OP một dòng với trạng thái (Khớp / Lệch — đã hỏi / Không có endpoint — deferred).
- [ ] Every §3 validation-matrix row of api-audited has API TCs for each partition/boundary — **for OPs whose §2 role is `Owner`**; Reuse OPs appear in the reuse reference table instead.
- [ ] Every §5 permission-matrix cell has its minimum set per `auth-strategy.md` — same owner-only scope.
- [ ] Area-9 minimums (hostile input / abuse / data exposure) present for every `Owner` OP per `api-scenario-rules.md` — same owner-only scope.
- [ ] No API TC merely repeats a UI TC's journey through HTTP (that is duplication, not layering) — its expected must be BE-observable (status/body/side-effect).
- [ ] No endpoint-level TC exists for a `Reuse` OP (that is cross-UC duplication — the owner UC already has it).
- [ ] MIX TCs exist only for critical data paths and only in scope Both.
- [ ] Every TC traces to a `TS_API_*` scenario; every expected cites its ladder rung.
