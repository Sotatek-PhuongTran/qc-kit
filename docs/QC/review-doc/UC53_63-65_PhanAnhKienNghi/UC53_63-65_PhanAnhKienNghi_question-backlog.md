# Question Backlog

> Generated: 2026-05-11
> Updated: 2026-05-12 (Re-audit v2)
> Source files: UC53_63-65_PhanAnhKienNghi_audited_20260511_v1.md, UC53_63-65_PhanAnhKienNghi_audited_20260512_v2.md

---

## Open Questions

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q2 | High | Section 2.4.6 "Nút Lưu nháp" | Khi user tap "Lưu nháp" thành công, App phản hồi gì? (Toast message? Quay về danh sách hay ở lại form?) Trạng thái bản nháp trong danh sách là gì? Có thể mở lại và chỉnh sửa bản nháp không? | Thiếu postcondition cho Lưu nháp → không thể thiết kế test case đầy đủ cho flow này | Open |
| Q8 | Medium | Section 2.4.5 "Upload file" | Tối đa bao nhiêu file có thể upload? UC doc chỉ nêu "Multi File Upload" nhưng không giới hạn số lượng file. (Dung lượng đã rõ: 10MB/file theo UC doc.) | Ảnh hưởng đến test case upload file — cần boundary value | Open |
| Q9 | Low | Section 2.2.1 "Icon thông báo" trên Header Chi tiết | UC63 Header có "Icon thông báo" → Tap → Điều hướng sang UC258-259. Đây có phải phạm vi test của UC53/63-65 không? | Xác định scope test cho navigation cross-UC | Open |
| Q10 | Low | Section 2.1 | Trường "Đơn vị xử lý" trên card danh sách có quy tắc "wrap text, không truncate". Có giới hạn số dòng wrap không? | Ảnh hưởng đến UI test trên thiết bị màn hình nhỏ | Open |

Priority: H = High (blocks design), M = Medium (affects scope), L = Low (nice to know)
Status: Open | Answered | Deferred

---

## Answered Questions

| ID | Priority | Ref | Question | Answer | Answered By | Date | Status |
|----|----------|-----|----------|--------|-------------|------|--------|
| Q1 | High | Section 2.1 + 2.3 | Tab trạng thái vs Dropdown Trạng thái trong bộ lọc — xung đột? | CMR-01 v1.4: Search áp dụng toàn bộ tab, kết quả hiển thị trên tab "Tất cả". Bộ lọc = filter nâng cao riêng biệt (Bottom Sheet). Hai cơ chế hoạt động song song. | UC doc v2.2 + CMR v1.5 | 2026-05-12 | Resolved |
| Q3 | High | Section 2.4.6 | Nút Gửi phản ánh: Disabled by default hay luôn Enabled? | UC §2.4.6 v2.2: Mặc định Disabled; Enabled khi toàn bộ field bắt buộc hợp lệ; real-time trigger mỗi khi field thay đổi (CMR-09). | UC doc v2.2 | 2026-05-12 | Resolved |
| Q4 | Medium | Section 2.4.2/2.4.3 | SĐT validation pattern cụ thể? | Prefix +84: đúng 9 chữ số sau prefix. Chỉ cho phép ký tự số (0-9). Không cho phép nhập quá 9 số. Prefix khác: validate theo format quốc gia. | UC doc v2.2 | 2026-05-12 | Resolved |
| Q5 | Medium | Section 1 | UC65 implement ở đâu? | UC65 = ô tìm kiếm trên danh sách với placeholder "Tìm kiếm theo mã phản ánh..." | UC doc v2.2 §2.1 | 2026-05-12 | Resolved |
| Q6 | Medium | Section 2.4 | Out of Scope? | UC §1.1 v2.2: Không hỗ trợ sửa/xóa phản ánh đã gửi. Chỉ cho phép hủy bỏ ở trạng thái "Chờ tiếp nhận" / "Chờ bổ sung". | UC doc v2.2 | 2026-05-12 | Resolved |
| Q7 | Medium | Section 2.4.2/2.4.3 | Max length các trường? | Họ tên: 200; Địa chỉ: 500; Người đại diện: 500; Chức vụ: 500; Tên tổ chức: 255; Tiêu đề: 200; Nội dung: 10.000 | UC doc v2.2 | 2026-05-12 | Resolved |
| Q11 | Medium | Section 2.4.1 | Chuyển đổi đối tượng — data bị xóa? Confirm dialog? | Dữ liệu giữ nguyên khi chuyển tab; restore đầy đủ khi quay lại; chỉ xóa khi rời Form hoặc submit thành công. Không có confirm dialog. | UC doc v2.2 | 2026-05-12 | Resolved |
| Q12 | Medium | Section 2.4.2/2.4.3 | Cascading dropdown: Đổi Tỉnh → Xã/Phường reset? | Đổi Tỉnh → Xã/Phường tự động clear về blank (yêu cầu chọn lại Xã/Phường thuộc Tỉnh mới). | UC doc v2.2 | 2026-05-12 | Resolved |
