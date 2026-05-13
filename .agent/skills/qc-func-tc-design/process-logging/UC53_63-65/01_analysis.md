# Phase 1 — Analysis & Design Brief — UC53_63-65

## UC Summary
Chức năng "Phản ánh kiến nghị" trên Mobile App cho phép cá nhân/tổ chức đã đăng nhập: tra cứu danh sách phản ánh (UC53), xem chi tiết (UC63), tạo mới phản ánh (UC64 — 2 loại đối tượng: Cá nhân & Tổ chức/DN), và tra cứu trạng thái theo mã (UC65 — qua ô search). Truy cập: Sidebar → "Phản ánh kiến nghị".

**Source files:**
- UC Review Report: UC53_63-65_PhanAnhKienNghi_audited_20260512_v2.md (Score 87/100 — READY)
- UC Document: UC53_63-65_PhanAnhKienNghi.md (v2.2)
- Common Rules: CMR_Mobile.md (v1.5)
- Scenarios: Không có

## Acceptance Criteria (suy luận từ UC doc)

| AC-ID | AC Summary |
|-------|-----------|
| AC-01 | Hiển thị danh sách phản ánh kiến nghị dạng Card, lazy load 20/lần, empty state |
| AC-02 | Tìm kiếm theo mã phản ánh (debounce 3s, auto-trim, search toàn bộ tab, kết quả hiển thị tab "Tất cả") |
| AC-03 | Bộ lọc nâng cao (Trạng thái dropdown, Date Range ×2, Áp dụng, Nhập lại) |
| AC-04 | Tab trạng thái (Tất cả / Đang xử lý / Đã trả lời / Đã đóng / Nháp) |
| AC-05 | Xem chi tiết phản ánh (UC63) — read-only, 6 block thông tin, null → "-" |
| AC-06 | Tạo mới phản ánh Cá nhân (UC64) — form validation: Họ tên (max 200), Tỉnh/TP, Xã/Phường, Địa chỉ (max 500), SĐT (+84 = 9 số), Email |
| AC-07 | Tạo mới phản ánh Tổ chức/DN (UC64) — form validation: Tên tổ chức (max 255), Người đại diện (max 500), Chức vụ (max 500), Tỉnh/TP, Xã/Phường, Địa chỉ (max 500), SĐT, Email |
| AC-08 | Block Nội dung phản ánh — Chủ đề, Đơn vị tiếp nhận, Tiêu đề (max 200), Loại nội dung, Nội dung (max 10000) |
| AC-09 | Upload file (PDF/DOC/DOCX/JPG/PNG, max 10MB/file) |
| AC-10 | Chuyển đổi đối tượng phản ánh — giữ dữ liệu, restore khi quay lại |
| AC-11 | Cascading dropdown Tỉnh → Xã/Phường (auto clear khi đổi Tỉnh) |
| AC-12 | Nút Gửi phản ánh (Disabled by default, Enabled khi valid, real-time) |
| AC-13 | Nút Lưu nháp (không validate bắt buộc) |
| AC-14 | Gửi phản ánh thành công → Toast + mã + quay về danh sách + auto refresh |
| AC-15 | Hủy bỏ phản ánh (Enable khi "Chờ tiếp nhận"/"Chờ bổ sung", confirmation dialog, trạng thái "Đã hủy") |
| AC-16 | Xử lý lỗi (mạng, 500, timeout 10s, 401 + refresh token 15 ngày) |
| AC-17 | Pull-to-refresh danh sách |
| AC-18 | NFR: Performance (≤3s danh sách, ≤2s chi tiết), Accessibility, Responsive portrait |

## UI Inventory

### Màn hình I: Danh sách Phản ánh kiến nghị (UC53 + UC65)
- Header: Tiêu đề "Phản ánh kiến nghị"
- Search box: Placeholder "Tìm kiếm theo mã phản ánh...", max 500 ký tự
- Nút Lọc (icon filter) → Bottom Sheet bộ lọc
- Tab trạng thái: Tất cả | Đang xử lý | Đã trả lời | Đã đóng | Nháp
- Nút FAB "Gửi phản ánh" (+) → mở Form UC64
- Card list: Tiêu đề, Ngày gửi (DD/MM/YYYY), Đơn vị xử lý, Badge trạng thái
- Lazy load 20/lần, loading indicator, pull-to-refresh
- Empty state: "Không có dữ liệu." / "Không tìm thấy kết quả."

### Màn hình II: Bộ lọc tìm kiếm (Bottom Sheet)
- Trạng thái (Dropdown single-select, default "Tất cả")
- Ngày tạo (Date Range Picker)
- Ngày hẹn trả (Date Range Picker)
- Nút "Nhập lại" (Reset)
- Nút "Áp dụng" (Apply + close)
- Nút X đóng

### Màn hình III: Chi tiết phản ánh kiến nghị (UC63)
- Header: Nút quay lại, Mã phản ánh, Icon thông báo
- Block "Thông tin chung": Mã, Trạng thái, Ngày gửi, Chủ đề, Đơn vị xử lý
- Block "Người gửi": Loại đối tượng, Họ tên, SĐT, Email
- Block "Nội dung phản ánh": Tiêu đề, Loại nội dung, Nội dung chi tiết
- Block "Tài liệu đính kèm": List file (icon + tên + dung lượng + action)
- Block "Kết quả xử lý": Trạng thái xử lý, Ngày phản hồi, Nội dung phản hồi
- Block "Lịch sử xử lý": Timeline dọc (mới nhất → cũ nhất)
- Nút "Hủy bỏ" (Sticky, Enable/Disable theo trạng thái)

### Màn hình IV: Tạo mới Phản ánh kiến nghị (UC64)
- Header: Nút quay lại, Tiêu đề
- Block "Đối tượng phản ánh": Radio Card (Cá nhân / Tổ chức)
- Block "Thông tin cá nhân": 6 fields (Họ tên, Tỉnh/TP, Xã/Phường, Địa chỉ, SĐT, Email)
- Block "Thông tin tổ chức": 8 fields (Tên tổ chức, Người đại diện, Chức vụ, Tỉnh/TP, Xã/Phường, Địa chỉ, SĐT, Email)
- Block "Nội dung phản ánh": 6 items (Chủ đề, Đơn vị tiếp nhận, Tiêu đề, Loại nội dung, Nội dung, Ghi chú)
- Block "Tài liệu đính kèm": Upload file
- Nút "Lưu nháp" (Sticky, Secondary)
- Nút "Gửi phản ánh" (Sticky, Primary, Disabled/Enabled)

## Planned TC Scope

| Màn hình | GUI TCs (ước lượng) | FUNC TCs (ước lượng) | Tổng |
|----------|--------------------|--------------------|------|
| I. Danh sách PAKN | ~15 | ~20 | ~35 |
| II. Bộ lọc (Bottom Sheet) | ~8 | ~10 | ~18 |
| III. Chi tiết PAKN | ~12 | ~10 | ~22 |
| IV. Tạo mới PAKN | ~25 | ~40 | ~65 |
| **Tổng** | **~60** | **~80** | **~140** |

## Detected Output Language
**VI** (Vietnamese) — UC document viết bằng tiếng Việt.

## Open Gaps (from audited report)
- Q2 (High): Postcondition cho Lưu nháp — thiếu mô tả phản hồi sau khi lưu thành công
- Q8 (Medium): Max file upload count — chưa có giới hạn số lượng file
- Q9 (Low): Icon thông báo UC63 → scope test cross-UC?
- Q10 (Low): Wrap text "Đơn vị xử lý" — giới hạn số dòng?
