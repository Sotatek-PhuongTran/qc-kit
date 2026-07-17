# qc-api-read — Re-Audit workflow

> Title: API Re-Audit Workflow | Created: 2026-07-10 | Updated: 2026-07-14 (v3 — REQ-FIRST THUẦN: bỏ change-source "API doc" (doc thuộc qc-api-tc-design); ownership theo operation; DEDUP GATE policy §8; v2.1 2026-07-13 — question gate; v2 — endpoint ownership) | Version: v3
>
> Single uninterrupted flow, NO intermediate checkpoints — the output `api-audited v[N+1]` IS the checkpoint. Friendly name: `Phân tích thay đổi và cập nhật báo cáo API`.

## When re-audit runs

The UC already has an `api-audited v[N]` and at least one of: BE/BA answered questions in the backlog; the audited UC (`uc-review-report`) has a new version; the user gives feedback on the previous api-audited; `qc-api-tc-design` phát hiện lệch doc ↔ suy diễn làm thay đổi NGHIỆP VỤ (thiếu operation, rule khác) và đã có câu trả lời của BE/BA.

**API doc mới/cập nhật KHÔNG phải trigger của skill này** — doc chỉ được đọc ở `qc-api-tc-design` (binding + đối chiếu). Chỉ khi kết quả binding kéo theo câu trả lời làm đổi NGHIỆP VỤ đã suy diễn thì mới re-audit (nguồn 1).

## Step 0 — Identify the change source

If the user's prompt already states it, skip the question. Otherwise ask (Vietnamese):

```text
Để chạy re-audit đúng phạm vi, thay đổi lần này đến từ nguồn nào?

1. BE/BA đã trả lời câu hỏi (trong sổ API portal hoặc sổ UI per-UC)
2. Audited UC (uc-review-report) có version mới
3. Bạn feedback về báo cáo api-audited cũ
4. Nhiều loại thay đổi cùng lúc
```

## Step 1 — Scoped reading (do NOT re-read everything)

| Change source | Read |
|---|---|
| Backlog answers | `api-audited v[N]` + sổ API portal (`api-question-backlog`): dòng đã trả lời của UC này ở CẢ mục A (câu hỏi chung) lẫn section UC + sổ nhánh UI của UC (`question-backlog` per-UC, READ-ONLY): answer của câu UI mà báo cáo cũ đã tham chiếu `→ Q-x (sổ UI)` hoặc cùng chủ đề nội dung API |
| Audited UC new version | `api-audited v[N]` + the NEW `uc-review-report` — focus on its change log + sections that feed §2/§3/§4/§5/§6 |
| User feedback | `api-audited v[N]` + the feedback text; verify against sources only where the feedback requires it |
| Mixed | Union of the above |

If the change can add or remove operations in §2 (new audited UC version; feedback touching operations), ALSO read `qc-api-coverage` — READ-ONLY, to apply the ownership rules in `.claude/config/api-shared/coverage-rules.md §Operation ownership` (missing file → every operation unowned). A backlog-answers-only run that touches no operation row skips this read.

## Step 2 — Apply changes

1. Update the affected sections only. Typical effects: answers → resolve gaps, unmark `Chưa xác nhận` ACs (record the answer as the expected's source, rung 3); new audited UC → re-derive only the operations/params touched by its change log; feedback → correct the derivation and note it.
2. Ownership column ("Vai trò", rules in `coverage-rules.md §Operation ownership`, khoá `resource · action`): PRESERVE existing verdicts on untouched §2 rows. New operation → claim per the rules (operation unowned → `Owner`; owned by another UC → `Reuse → UC-X`). Removed operation that was `Owner` → note the release in §10 (the rebuild will surface the operation as unowned for QC to reassign). Feedback resolving an ownership conflict (QC quyết) → apply the new verdict to the column and cite the decision in §10.
3. NEW gaps discovered while applying → new §8 questions via `qc-qna` API mode — the sync runs HERE, BEFORE Step 3 writes the immutable `v[N+1]`, so the §8 table carries the assigned `Q-API-NNN` book IDs (never blank/placeholder IDs). Every new question passes BOTH gates first, in order: QUESTION GATE (`expected-and-verify-policy.md` §7 — never ask exact codes/messages/schemas/payload shape) then DEDUP GATE (policy §8 — đối chiếu sổ UI per-UC + sổ API portal, tham chiếu thay vì hỏi trùng; sổ chưa tồn tại → coi như rỗng; sổ UI per-UC chưa tồn tại → dedup trực tiếp với §10.1 của audited UC). Answered rows → `qc-qna` syncs backlog status. Existing questions that violate gate §7 → close them (Resolved — policy §7, api-baseline/probe records the values) and re-express any surviving behavioral half as a NEW question or a relative-assertion AC; existing questions trùng chủ đề với câu đã có ở UC khác → yêu cầu `qc-qna` hợp nhất (promote lên mục A sổ API portal).
4. Re-score per `references/api-scoring-rubric.md` — full 5-area table (scores may move in either direction).
5. Update the change log section (§10) with a dated entry per change source — ≤ 2 lines per entry (lean rule: details live in the report body, never re-summarized here). Also apply the first-audit lean-output rules when rewriting sections.

## Step 3 — Write + report

1. Run the `qc-writting-rules.md` §5 gate → write `api-audited v[N+1]` (never overwrite v[N]).
2. Rebuild the coverage map per `coverage-rules.md §Coverage map`: scan ALL `*_api-audited_*` files under the uc-read root (latest version per UC) + các bảng binding trong TC md hiện có + mục A của các sổ `<PORTAL>_api-question-backlog.md` (dòng cờ `ORPHAN_ENDPOINT` / kết luận `Bug BE`), regenerate `qc-api-coverage` from `templates/qc-api-coverage-template.vi.md` and OVERWRITE the whole file. This runs at the END of EVERY re-audit run, even when §2 did not change (self-healing derived view).
3. Chat report (Vietnamese): what changed per section, score delta + new verdict, remaining `Chưa xác nhận` count, ownership delta — operations this UC claims/reuses + any `⚠ Xung đột` / `⏳ Chưa có chủ` rows the rebuild surfaced (QC decides; if an operation's owner changed, recommend re-running scenario/TC design for BOTH affected UCs), and downstream advice — if §2/§3/§4/§5/§6 content changed, recommend re-running `/qc-api-scenario-design <UC-ID>` and `/qc-api-tc-design <UC-ID>` (update mode).
4. Worklog terminal `Done` per shared protocol §5 (no checkpoint folder to delete if none was created).
