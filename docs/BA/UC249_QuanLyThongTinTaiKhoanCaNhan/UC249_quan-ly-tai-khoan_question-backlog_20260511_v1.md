# QUESTION BACKLOG — UC249 Quản lý thông tin tài khoản cá nhân

**Tiêu đề:** Danh sách câu hỏi chờ BA trả lời
**Ngày tạo:** 11/05/2026
**Cập nhật:** 11/05/2026 — Re-audit, đóng 21 câu đã trả lời, bổ sung 2 câu mới
**Nguồn:** UC249_quan-ly-tai-khoan_audited_20260511_v2.md
**Phiên bản:** v1

---

## Hướng dẫn

- BA vui lòng điền vào cột **Trả lời** cho từng câu hỏi.
- Sau khi trả lời đầy đủ, thông báo để Agent thực hiện **Re-audit**.
- Priority: 🔴 High = Blocker | 🟡 Medium = Cần trả lời trước khi test | 🟢 Low = Cải thiện chất lượng

---

## ✅ Câu hỏi đã giải quyết (Resolved — 11/05/2026)

### Nhóm 1: Blocker

| ID | Priority | Câu hỏi | Trả lời | Status |
|---|---|---|---|---|
| Q1 | 🔴 High | Preconditions? | User đã đăng nhập | ✅ Resolved |
| Q2 | 🔴 High | Postconditions? | Dữ liệu lưu DB, session không bị ảnh hưởng | ✅ Resolved |
| Q3 | 🔴 High | Acceptance Criteria? | Đã bổ sung vào UC doc (Section 4) | ✅ Resolved |
| Q4 | 🔴 High | Loading state? | Có áp dụng CMR-07 | ✅ Resolved |
| Q5 | 🔴 High | Error flows API? | Áp dụng CMR-07 cho tất cả cases | ✅ Resolved |
| Q6 | 🔴 High | Confirmation khi Hủy? | Có dialog: "Dữ liệu chưa được lưu. Bạn có chắc muốn tiếp tục?" / Đồng ý / Hủy | ✅ Resolved |

---

### Nhóm 2: Validation & Field Rules

| ID | Priority | Câu hỏi | Trả lời | Status |
|---|---|---|---|---|
| Q7 | 🟡 Medium | Họ và tên: max length, ký tự cho phép, validation? | Max 100 ký tự; không nhận số/ký tự đặc biệt → "Không nhập số, ký tự đặc biệt."; bắt buộc theo CMR-09 | ✅ Resolved |
| Q8 | 🟡 Medium | Email exact error message? | Sai định dạng: "Sai định dạng."; để trống: theo CMR-09 | ✅ Resolved |
| Q9 | 🟡 Medium | SĐT quốc tế validation? | Đổi country code → áp dụng rule độ dài chuẩn quốc tế của quốc gia đó | ✅ Resolved |
| Q10 | 🟡 Medium | Địa chỉ validation? | Cho phép ký tự đặc biệt; để trống → theo CMR-09 | ✅ Resolved |
| Q11 | 🟡 Medium | Mã bưu chính? | Alphanumeric; nhập ký tự đặc biệt → "Không chấp nhận ký tự đặc biệt." | ✅ Resolved |
| Q12 | 🟡 Medium | Nút "Lưu thay đổi" disabled? | Disabled khi chưa có thay đổi; Enabled khi có ít nhất 1 field thay đổi; click khi invalid → báo lỗi | ✅ Resolved |
| Q13 | 🟡 Medium | Auto-expand section khi có lỗi? | Có tự động expand | ✅ Resolved |

---

### Nhóm 3: CMR Compliance & UX

| ID | Priority | Câu hỏi | Trả lời | Status |
|---|---|---|---|---|
| Q14 | 🟡 Medium | Pull-to-Refresh cho Xem chi tiết? | Có áp dụng CMR-13 | ✅ Resolved |
| Q15 | 🟡 Medium | Debounce double-tap? | Có áp dụng CMR-18 | ✅ Resolved |
| Q16 | 🟡 Medium | Refresh sau update? | Back về Xem chi tiết + tự động load data mới nhất | ✅ Resolved |
| Q17 | 🟡 Medium | Loại tài khoản Tổ chức? | Tổ chức xử lý ở màn khác, ngoài phạm vi UC249 | ✅ Resolved |
| Q18 | 🟡 Medium | Null field display? | Hiển thị "--" | ✅ Resolved |

### Nhóm 4: Low Priority

| ID | Priority | Câu hỏi | Trả lời | Status |
|---|---|---|---|---|
| Q19 | 🟢 Low | Lưu khi không có thay đổi? | Button Disabled khi chưa có thay đổi → không thể tap | ✅ Resolved |
| Q20 | 🟢 Low | Masking dữ liệu nhạy cảm? | Không cần masking | ✅ Resolved |
| Q21 | 🟢 Low | Visibility nút Edit? | Hiển thị với mọi tài khoản Cá nhân | ✅ Resolved |

---

## 🆕 Câu hỏi mới phát sinh từ Re-audit (11/05/2026) — Đã được Resolved

| ID | Priority | Câu hỏi | Trả lời | Status |
|---|---|---|---|---|
| Q-NEW-01 | 🟡 Medium | **Họ và tên — Block hay Alert tại max length 100 ký tự?** Khi người dùng nhập đến 100 ký tự: hệ thống **block** không cho nhập thêm ký tự thứ 101, hay chỉ **báo lỗi sau khi blur**? | Block input — không cho phép nhập ký tự thứ 101 | ✅ Resolved |
| Q-NEW-02 | 🟢 Low | **Cascade Dropdown loading state:** Khi API load danh sách Tỉnh/TP hoặc Phường/Xã đang chạy (sau khi đổi Quốc gia/Tỉnh), dropdown hiển thị trạng thái loading thế nào? (spinner trong dropdown, disabled dropdown, hay placeholder "Đang tải..."?) | Spinner bên trong dropdown + dropdown disabled khi đang load | ✅ Resolved |

---

*File tạo bởi: BA-audit-SRS-mobile Agent | Cập nhật: 11/05/2026*
