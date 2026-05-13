# UC54 — Question Backlog

| Thông tin | Chi tiết |
| --- | --- |
| **Tài liệu** | Question Backlog |
| **UC** | UC54 — Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên Mobile |
| **Ngày tạo** | 08/05/2026 |
| **Cập nhật** | 08/05/2026 (Re-audit v2) |
| **Tác giả** | Claude Agent (QC Review) |
| **Phiên bản** | v2 |
| **Nguồn** | Trích xuất từ UC54_BaoCaoDaNop_audited_v2.md |

---

## Hướng dẫn sử dụng

- **Status**: `Open` = chưa trả lời, `Answered` = đã có câu trả lời từ BA, `Resolved` = đã giải quyết và phản ánh vào UC spec.
- Khi BA trả lời, cập nhật cột **Answer** và đổi Status thành `Answered`.
- Sau khi câu trả lời được phản ánh vào UC spec, đổi Status thành `Resolved`.

---

## Open Questions

### 🔴 High Priority

| ID | Question | Ref | Status | Answer |
| --- | --- | --- | --- | --- |
| Q1 | **Badge Trạng thái vẫn thiếu mapping màu sắc.** §2.1 dòng 113 vẫn ghi "Màu sắc dựa theo UI design: - " với danh sách trống. CMR-05 định nghĩa: Green=positive, Yellow=pending, Red=negative, Gray=neutral. Cần xác nhận mapping cụ thể: Đã nộp→?, Đang xử lý→Vàng?, Đã duyệt→Xanh lá?, Yêu cầu bổ sung→?, Từ chối→Đỏ? | §2.1 dòng 113 | Answered | Theo bảng Stat Banner §2.1 trong UC54 doc, mapping màu sắc badge: **Đã nộp** → Xanh dương (nền xanh dương nhạt); **Đang xử lý** → Vàng (nền vàng nhạt); **Đã duyệt** → Xanh lá (nền xanh lá nhạt); **Yêu cầu bổ sung** → Cam (nền cam nhạt); **Từ chối** → Đỏ (nền đỏ nhạt). Badge chỉ hiển thị text + màu nền, không có icon. |

### 🟡 Medium Priority

| ID | Question | Ref | Status | Answer |
| --- | --- | --- | --- | --- |
| Q5 | **Thiếu mapping trường theo loại báo cáo.** §2.2 dòng 125 ghi "tùy thuộc vào loại báo cáo" (Định kỳ, Đột xuất...) nhưng không có bảng mapping section/trường nào ẩn/hiện theo loại nào. QA có thể test default case (hiển thị tất cả) nhưng cần mapping để test đầy đủ. | §2.2 dòng 125 | Open | |

### 🟢 Low Priority

| ID | Question | Ref | Status | Answer |
| --- | --- | --- | --- | --- |
| Q12 | **Thiếu postcondition.** Không mô tả trạng thái hệ thống sau khi hoàn thành flow. Có ghi audit log? Có đánh dấu "đã xem"? | N/A (Missing) | Open | |
| Q14 | **Accessibility.** Không đề cập screen reader, minimum touch target size, font scaling, contrast ratio. | N/A (Missing) | Open | |
| Q15 | **Device/OS compatibility.** Không đề cập iOS/Android minimum version, tablet layout, landscape mode. | N/A (Missing) | Open | |
| Q16 | **Active filter indicator (CMR-02).** CMR-02 v1.1 yêu cầu hiển thị icon indicator màu xanh lá cây khi có filter active, nhưng UC54 §2.1 không đề cập cụ thể. Xác nhận UC54 có áp dụng rule này không? | CMR-02 vs §2.1 | Open | |
| Q17 | **Phiên bản không nhất quán.** Header ghi "v2.2" nhưng bảng thuộc tính ghi "v2.1". Cần sửa cho nhất quán. | §header dòng 5 vs §bảng dòng 15 | Open | |

---

## Resolved Questions (from v1 audit)

| ID | Question | Resolved in | How |
| --- | --- | --- | --- |
| Q2 | Mâu thuẫn "lọc theo Năm" vs không có trường Năm | UC54 v2.1 | BA xóa rule "mặc định lọc theo năm" trong §3.1 |
| Q3 | AC5 "Nút Download" không tồn tại trong UI | UC54 v2.1 | BA xóa AC5 cũ, thay bằng AC5 mới (Modal Lịch sử) |
| Q4 | Reference đến "tab" không tồn tại | UC54 v2.1 | BA sửa thành "mục khác trên Sidebar (Left Sidebar)" |
| Q6 | Real-time sync thiếu fallback | UC54 v2.1 | BA bổ sung §1: mất kết nối → CMR-07, khôi phục → CMR-13 |
| Q7 | Timeline 5 bước chưa rõ | UC54 v2.2 | BA đơn giản hóa: 3 trường, sắp xếp giảm dần, xóa bảng ví dụ cứng |
| Q8 | Quy tắc viết tắt K/M thiếu chi tiết | UC54 v2.1 | BA delegate cho CMR-11 |
| Q9 | Section default state không rõ | UC54 v2.1 | BA bổ sung: "tất cả section ở trạng thái mở" |
| Q10 | Stat Banner tap behavior không rõ | UC54 v2.1 | BA bổ sung: "read-only, không thể tap (unclickable)" |
| Q11 | Khác biệt Cá nhân vs Tổ chức | UC54 v2.1 | BA bổ sung: "giống nhau, không có khác biệt" |
| Q13 | Double-tap behavior | UC54 v2.2 | BA bổ sung debounce navigation theo CMR-18 |