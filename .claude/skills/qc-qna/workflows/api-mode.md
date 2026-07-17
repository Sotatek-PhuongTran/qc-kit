# qc-qna · API mode — sổ câu hỏi NHÁNH API cấp portal (`api-question-backlog`)

> Routed from `SKILL.md` (Mode detection). Chạy khi caller là `qc-api-read` / `qc-api-tc-design`. Mode này ghi vào MỘT file riêng — KHÔNG đụng sổ `question-backlog` per-UC của nhánh UI (chỉ đọc nó READ-ONLY để tham chiếu). API mode KHÔNG thay đổi bất kỳ luật nào của UI mode (`workflows/ui-mode.md`).

## File rule (HARD)

- **Exactly ONE file per PORTAL:** `[PORTAL]_api-question-backlog.md` tại thư mục gốc uc-read (path-registry `api-question-backlog`). `[PORTAL]` = portal segment trong UC-ID (vd. `ORGUSER` từ `UC-ORGUSER-001`); segment suy ra PHẢI thuộc danh sách portal trong `project-context-master` §2/§5 — không khớp (vd. segment là tên MODULE) → hỏi user MỘT lần và ghi cách map vào đầu file (khớp `naming-convention.md`); không có segment portal → `ALL`; không suy ra được → hỏi user MỘT lần, ghi cách map vào đầu file.
- Living file — no date, no version; history in `Update history`. Template: `templates/api-question-backlog_template.md`.
- **Two tiers:** Mục A — câu hỏi chung (portal/dự án/hạ tầng: chính sách password, kênh verify nhật ký, fault injection, chính sách rollback, rate-limit...; có cột "UC áp dụng"). Mục B — theo UC (`### <UC-ID> — <feature>`).
- **ID:** `Q-API-NNN` — một dãy duy nhất cho cả file, cấp lúc append, không đổi, không tái sử dụng. Cột "Nguồn" giữ tham chiếu báo cáo gốc (vd. `UC-004 api-audited §8`). Promote B→A giữ nguyên ID.
- **Migration (one-time):** file portal chưa có → quét sổ `question-backlog` per-UC của mọi UC thuộc portal, TÁCH các dòng nhánh API (ID `Q-API-*`) sang file portal (cấp ID mới, ID cũ vào cột Nguồn; nhóm câu trùng chủ đề giữa các UC thành 1 dòng mục A, giữ answer nếu có). Dòng nhánh UI GIỮ NGUYÊN tại sổ per-UC. Trên sổ per-UC được phép ĐÚNG HAI chỉnh sửa, chỉ trong migration: (1) đổi `Status` của từng dòng `Q-API-*` đã tách thành `Đã chuyển → Q-API-<id mới>` (một lần; không đụng ô nào khác của dòng); (2) ghi 1 dòng Update history ("câu hỏi API chuyển sang <file portal>"). Báo bảng map ID cũ → mới trong chat.

## Sync flow (per caller report)

0. **Bootstrap:** sổ portal chưa tồn tại (và migration ở File rule không tìm thấy gì để tách) → clone `templates/api-question-backlog_template.md` thành file portal, điền `{PORTAL}`/`{DATE}`.
1. Parse bảng câu hỏi nguồn (api-audited §8 / danh sách finding của tc-design) — mọi trạng thái, kèm cờ caller đã đánh (`→ Q-...` tham chiếu / `[Chung — mục A]`).

   **Map cột nguồn api-audited §8 → cột sổ (schema sổ KHÔNG đổi):**

   | Cột nguồn §8 | Cột sổ | Ghi chú |
   |---|---|---|
   | `ID` | — | ID sổ do qc-qna cấp (`Q-API-NNN`); ID/cờ nguồn dùng cho dedup |
   | `Mức ưu tiên` (High/Medium/Low) | `Priority` | `High` → `H`, `Medium` → `M`, `Low` → `L` |
   | `Tham chiếu` | `Ref` | verbatim |
   | `Nội dung câu hỏi (tự chứa, chỉ rõ ảnh hưởng đến test)` | `Câu hỏi` | verbatim |
   | phần "ảnh hưởng đến test" tách từ câu hỏi tự chứa | `Vì sao quan trọng` | không tách được → `—` |
   | `Trạng thái` | `Trạng thái` | mirror (report canonical) |
   | — | `Nguồn` | `<UC-ID> api-audited §8` |
   | — | `UC áp dụng` (chỉ dòng mục A) | UC-ID của caller; khi dedup-merge vào dòng mục A có sẵn → APPEND thêm UC-ID vào ô |
   | `Severity` / `Loại vấn đề (rubric)` / `Owner đề xuất` | — | không chuyển vào sổ |

   **Finding từ `qc-api-tc-design` — schema tối thiểu caller PHẢI gửi:** `{nội dung câu hỏi tự chứa, Ref (OP/endpoint), loại finding, cờ [Chung — mục A] nếu có}`. Map: nội dung → `Câu hỏi` (phần "ảnh hưởng đến test" trong đó → `Vì sao quan trọng`, không tách được → `—`); Ref → `Ref`; `Nguồn` = `<UC-ID> tc-design finding (<loại finding>)`; `Priority` = mức caller gửi kèm nếu có, không có → `—`.
2. **DEDUP (policy `expected-and-verify-policy.md` §8) — bắt buộc, theo thứ tự:**
   - Cờ tham chiếu sổ UI (`→ Q-x (sổ UI)`) → KHÔNG tạo dòng; ghi nhận trong summary (BA trả lời tại sổ UI, nhánh API kế thừa qua re-audit).
   - Khi đối chiếu sổ UI per-UC: BỎ QUA các dòng `Q-API-*` đã mang trạng thái `Đã chuyển → Q-API-<id>` — chúng đã được tách sang sổ portal trong migration; dòng portal là bản chính, dedup theo dòng portal.
   - Quét mục A rồi TOÀN BỘ mục B tìm câu cùng chủ đề (đối tượng + rule + hành vi; phân vân → coi là trùng): trùng mục A → bổ sung UC vào "UC áp dụng"; trùng mục B của UC KHÁC → PROMOTE dòng đó lên mục A (giữ ID, điền UC áp dụng); trùng mục B của chính UC (same nguồn) → mirror status.
   - Không trùng → APPEND với ID `Q-API-NNN` kế tiếp: cờ `[Chung — mục A]` / chủ đề dự án-hạ tầng → mục A; còn lại → section UC (tạo nếu chưa có).
3. **Status mirror:** như UI mode (report canonical cho câu của chính nó; conflict Open-vs-Answered → SKIP + WARN đề nghị re-audit). Dòng mục A dùng chung nhiều UC: answer/status do BA ghi trong sổ hoặc re-audit xác nhận; một UC không đơn phương re-open câu Resolved của cả portal.
4. Write in-place + 1 dòng Update history. Summary trả về: câu mới (mục A/B), tham chiếu (sổ UI / dòng có sẵn), promote, mirror, conflict, migration.

## Boundaries (API mode)

- Ghi DUY NHẤT file `api-question-backlog`; sổ `question-backlog` per-UC là READ-ONLY (ngoại lệ — CHỈ trong migration: đánh dấu `Đã chuyển → Q-API-<id mới>` trên các dòng `Q-API-*` đã tách + 1 dòng Update history).
- Không quyết status, không bịa answer, không đổi/tái sử dụng ID; dedup theo NỘI DUNG là bắt buộc.
