# Bản đồ sở hữu operation API — [tên dự án]

> **File máy sinh (derived view) — KHÔNG sửa tay.** Nguồn sự thật: cột "Vai trò" + khoá claim trong §2 của từng báo cáo api-audited; endpoint lấy từ bảng "Binding OP ↔ endpoint" trong prelude TC md (khi UC chủ đã chạy `qc-api-tc-design`). `qc-api-read` quét toàn bộ nguồn và **ghi đè nguyên file này ở cuối MỖI lần chạy**. Muốn đổi Owner/Reuse: chạy re-audit UC liên quan (nguồn thay đổi = feedback — quyết định của QC), không sửa file này.
>
> Quy tắc 2 tầng test (endpoint-level / flow-level) + luật Owner/Reuse theo khoá `resource · action`: `.claude/config/api-shared/coverage-rules.md`. Operation có chủ (Owner) là nơi DUY NHẤT thiết kế endpoint-level testing (contract, validation từng param, phân quyền, protocol, an toàn); các UC khác dùng operation chỉ thiết kế flow-level và tham chiếu test case của UC chủ.

**Lần rebuild gần nhất:** [YYYY-MM-DD HH:MM (+07:00)] — run `[run_id]`, sau khi audit [UC-ID]. Nguồn quét: [N] báo cáo api-audited + [M] bảng binding TC (file `*_api-testcases_*_v*.md` version cao nhất per UC) + mục A của [K] sổ api-question-backlog (cờ `ORPHAN_ENDPOINT` / kết luận `Bug BE`).

---

## 1. Bảng sở hữu operation

> Mỗi operation (khoá `resource · action`) MỘT dòng, gom theo resource. Bảng chỉ chứa operation mà ít nhất một báo cáo api-audited đã khai — bản đồ lớn dần khi audit thêm UC. Cột endpoint chỉ có giá trị khi UC nào đó đã binding ở giai đoạn TC (có thể trễ một nhịp so với TC md).

| Resource · Action | Tên nghiệp vụ | UC chủ (Owner) | UC sử dụng (Reuse — vai trò trong flow) | Endpoint (từ binding TC) | Trạng thái | Nguồn |
|---|---|---|---|---|---|---|
| `user-profile · Cập nhật` | Cập nhật hồ sơ cá nhân | UC-XXX-NNN | UC-YYY-NNN (bước verify sau ghi) | `PATCH /api/...` hoặc `—` | ✓ Có chủ — đã audit | api-audited UC-XXX v[N] §2 |

**Giá trị cột Trạng thái (danh sách đóng):**

- `✓ Có chủ — đã audit` — UC chủ đã nhận vai trò Owner trong api-audited; endpoint-level testing thuộc UC đó.
- `⏳ Chưa có chủ — dự kiến UC-X` — đã xác định UC đích tự nhiên nhưng UC đó chưa audit nhánh API; endpoint-level testing CHƯA tồn tại ở đâu.
- `⏳ Chưa khai khoá claim — cần re-audit UC-X` — báo cáo của UC-X viết theo template cũ (trước cơ chế khoá claim `resource · action`); chạy re-audit UC-X để khai.
- `⚠ Xung đột — QC quyết` — từ 2 UC trở lên cùng nhận Owner một khoá claim; QC chọn 1 UC giữ Owner rồi chạy re-audit UC còn lại đổi thành Reuse.
- `⛔ Bug BE` — endpoint không được phép tồn tại/public (finding từ bước binding của `qc-api-tc-design`, kết luận ghi ở mục A sổ `api-question-backlog` — rebuild đọc từ đó); không thiết kế test, trừ 1 case negative giữ làm regression nếu team quyết định.
- `? Chưa rõ` — operation/endpoint xuất hiện nhưng chưa xác định được UC đích (vd dòng cờ `ORPHAN_ENDPOINT` ở mục A sổ `api-question-backlog`); QC phân loại khi có thông tin.

---

## 2. Việc QC cần xử lý

> Chỉ liệt kê dòng đang cần hành động (xung đột, chưa có chủ, chưa khai khoá, bug BE, nghi trùng khoá do đặt tên lệch). Không có → ghi "Không có".

| Việc | Operation | Hành động đề xuất |
|---|---|---|
|  |  |  |

---

## 3. Thống kê

| Tổng operation đã ghi nhận | Có chủ | Chưa có chủ / chưa khai | Xung đột | Đã bind endpoint | Bug BE / chưa rõ |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

---

*Bản đồ sở hữu operation — SOLE writer `qc-api-read`; rebuild toàn bộ từ disk mỗi lần chạy (coverage-rules v3.1 — khoá claim `resource · action`, endpoint từ binding TC md version cao nhất, cờ ORPHAN_ENDPOINT / Bug BE từ mục A sổ api-question-backlog).*
