# BÁO CÁO KIỂM TRA SẴN SÀNG YÊU CẦU (UC READINESS REVIEW) — RE-AUDIT

**Tiêu đề:** UC249 — Quản lý thông tin tài khoản cá nhân trên Mobile
**Ngày audit:** 11/05/2026
**Người audit:** BA-audit-SRS-mobile Agent
**Phiên bản tài liệu được audit:** v2 (sau khi cập nhật theo BA Q&A)
**Phiên bản báo cáo:** v2 (Re-audit từ v1)

---

## 0. Thông tin tài liệu được kiểm tra

| Thuộc tính | Giá trị |
|---|---|
| UC ID | UC249 |
| Tên chức năng | Quản lý thông tin tài khoản cá nhân trên Mobile |
| File input | `UC249_CauHinhTaiKhoan.md` (v2 sau Q&A) |
| Wireframe | 4 file PNG (Xem chi tiết × 2, Chỉnh sửa × 2) |
| CMR reference | `CMR_Mobile.md` v1.1 |
| Audit trước | `UC249_quan-ly-tai-khoan_audited_20260511_v1.md` |

---

## 📊 Re-Audit Summary

| # | Knowledge Area | Max Pts | Score (v1) | Score (v2) | Delta | Status |
|---|---|---|---|---|---|---|
| 1 | Feature Identity | 5 | 5/5 | 5/5 | = | ✅ |
| 2 | Objective & Scope | 5 | 3/5 | 5/5 | ▲+2 | ✅ |
| 3 | Actors & User Roles | 10 | 6/10 | 9/10 | ▲+3 | ✅ |
| 4 | Preconditions & Postconditions | 10 | 0/10 | 10/10 | ▲+10 | ✅ |
| 5 | UI Object Inventory & Mapping | 15 | 10/15 | 13/15 | ▲+3 | ✅ |
| 6 | Object Attributes & Behavior Definition | 20 | 12/20 | 17/20 | ▲+5 | ✅ |
| 7 | Functional Logic & Workflow Decomposition | 20 | 12/20 | 18/20 | ▲+6 | ✅ |
| 8 | Functional Integration Analysis | 10 | 4/10 | 7/10 | ▲+3 | ⚡ |
| 9 | Acceptance Criteria | 10 | 0/10 | 9/10 | ▲+9 | ✅ |
| 10 | Non-functional Requirements | 5 | 0/5 | 2/5 | ▲+2 | ⚡ |
| **Tổng** | | **110** | **52/110 → 47.3/100** | **95/110 → 86.4/100** | ▲+39 | |

### ⚡ Kết luận: **CONDITIONALLY READY** — Score: **86.4 / 100**

> QA **có thể bắt đầu** thiết kế test case cho các khu vực đã rõ ràng. Các mục còn lại (Q-NEW-01, Q-NEW-02) cần được giải quyết song song.

---

## Lý giải điểm số

**#2 Objective & Scope (5/5):** Scope exclusion Tổ chức đã được ghi rõ. ✅

**#3 Actors & User Roles (9/10):** Phân quyền rõ ràng — Cá nhân đã đăng nhập. Trừ 1 điểm vì chưa nêu rõ behavior khi session expire mid-screen (có mô tả error flow nhưng chưa là explicit precondition). ✅

**#4 Preconditions & Postconditions (10/10):** Đầy đủ và rõ ràng. ✅

**#5 UI Object Inventory & Mapping (13/15):** Tất cả components đã mapped. Trừ 2 điểm vì: Wireframe ghi "Mã số ththuế" (lỗi đánh máy) chưa được ghi nhận chính thức; country code dropdown (danh sách quốc gia) chưa được liệt kê là component riêng với behavior đầy đủ. ✅

**#6 Object Attributes & Behavior Definition (17/20):** Validation rules đầy đủ cho tất cả field. Trừ 3 điểm: (a) Max length cho Email, Địa chỉ, SĐT chưa được định nghĩa; (b) Skeleton/placeholder khi dropdown đang load (Quốc gia, Tỉnh/TP, Phường/Xã) chưa có; (c) Trường Họ và tên max 100 ký tự có block nhập hay chỉ báo lỗi sau khi nhập? ✅

**#7 Functional Logic & Workflow Decomposition (18/20):** Error flows đầy đủ theo CMR-07. Confirmation dialog rõ ràng. Trừ 2 điểm: (a) Android Back button mid-edit được xử lý theo nút Back (←) nhưng chưa được tường minh hóa; (b) Flow load dropdown khi cascade chưa có loading indicator. ✅

**#8 Functional Integration Analysis (7/10):** Sau khi lưu → Xem chi tiết refresh rõ ràng. PTR rõ ràng. Trừ 3 điểm: (a) Impact lên các màn hình khác trong app khi Email/SĐT thay đổi chưa được đề cập; (b) Behavior khi API cascade dropdown fail chưa có. ⚡

**#9 Acceptance Criteria (9/10):** AC đầy đủ, measurable, có pass condition rõ ràng. Trừ 1 điểm: AC chưa bao gồm test case cho Pull-to-Refresh fail. ✅

**#10 Non-functional Requirements (2/5):** Có tham chiếu CMR-16 (timeout 10s). Chưa có: security (sensitive data display policy), accessibility, compatibility (iOS/Android versions). ⚡

---

## 📋 Unified Gap & Question Report (Sau Re-audit)

### Câu hỏi đã giải quyết (Resolved)

| ID | Priority | Câu hỏi | Trả lời BA | Status |
|---|---|---|---|---|
| Q1 | High | Preconditions? | User đã đăng nhập | ✅ Resolved |
| Q2 | High | Postconditions? | Dữ liệu lưu DB, session không bị ảnh hưởng | ✅ Resolved |
| Q3 | High | Acceptance Criteria? | Đã bổ sung vào UC doc | ✅ Resolved |
| Q4 | High | Loading state? | Có áp dụng CMR-07 | ✅ Resolved |
| Q5 | High | Error flows API? | Áp dụng CMR-07 | ✅ Resolved |
| Q6 | High | Confirmation khi Hủy? | Có dialog: "Dữ liệu chưa được lưu. Bạn có chắc muốn tiếp tục?" / Đồng ý / Hủy | ✅ Resolved |
| Q7 | Medium | Họ và tên validation? | Max 100 ký tự, không chứa số/ký tự đặc biệt, bắt buộc | ✅ Resolved |
| Q8 | Medium | Email exact error message? | Sai định dạng: "Sai định dạng." / Để trống: theo CMR-09 | ✅ Resolved |
| Q9 | Medium | SĐT quốc tế? | Đổi country code → áp dụng rule độ dài theo quốc gia đó | ✅ Resolved |
| Q10 | Medium | Địa chỉ validation? | Cho phép ký tự đặc biệt, bắt buộc theo CMR-09 | ✅ Resolved |
| Q11 | Medium | Mã bưu chính? | Alphanumeric, không ký tự đặc biệt → "Không chấp nhận ký tự đặc biệt." | ✅ Resolved |
| Q12 | Medium | Nút "Lưu thay đổi" disabled? | Disabled khi chưa có thay đổi, Enabled khi có thay đổi bất kỳ | ✅ Resolved |
| Q13 | Medium | Auto-expand khi lỗi trong section collapsed? | Có auto-expand | ✅ Resolved |
| Q14 | Medium | Pull-to-Refresh? | Có áp dụng CMR-13 | ✅ Resolved |
| Q15 | Medium | Debounce double-tap? | Có áp dụng CMR-18 | ✅ Resolved |
| Q16 | Medium | Refresh sau update? | Back về Xem chi tiết + load lại data mới nhất | ✅ Resolved |
| Q17 | Medium | Loại tài khoản Tổ chức? | Tổ chức xử lý ở màn khác, ngoài phạm vi UC249 | ✅ Resolved |
| Q18 | Medium | Null field display? | Hiển thị "--" | ✅ Resolved |
| Q19 | Low | Lưu khi không có thay đổi? | Button Disabled khi chưa có thay đổi | ✅ Resolved |
| Q20 | Low | Masking dữ liệu nhạy cảm? | Không cần masking | ✅ Resolved |
| Q21 | Low | Visibility nút Edit? | Hiển thị với mọi tài khoản Cá nhân | ✅ Resolved |

### Câu hỏi mới phát sinh (New Open)

| ID | Priority | Ref | Question | Why It Matters | Status |
|---|---|---|---|---|---|
| Q-NEW-01 | Medium | Mục 2.2 — Trường "Họ và tên" — "Max length: 100 ký tự" | Khi người dùng đạt 100 ký tự: hệ thống **block** không cho nhập thêm hay chỉ **báo lỗi sau khi blur**? Hai cách xử lý UX khác nhau. | Test case boundary 100 ký tự phụ thuộc vào cách block/alert. | Open |
| Q-NEW-02 | Low | Mục 3.4 — Cascade Dropdown | Khi API load danh sách Tỉnh/TP hoặc Phường/Xã (sau khi đổi Quốc gia/Tỉnh) đang chạy: dropdown hiển thị trạng thái loading thế nào? (spinner trong dropdown, disabled dropdown, hay placeholder?) | UX state của dropdown trong khi chờ API cần rõ để test. | Open |

---

## 🟢 What's Good (Re-audit)

- **Cải thiện vượt trội:** Score tăng từ 47.3 → 86.4 (+39 điểm) sau một vòng Q&A.
- **Preconditions & Postconditions** rõ ràng, ngắn gọn, đủ để setup test environment.
- **Error flows** đầy đủ và tham chiếu đúng CMR-07 cho tất cả scenarios (API fail, timeout, mất mạng, session hết hạn).
- **Acceptance Criteria** có pass condition cụ thể, measurable, bao gồm cả happy path, validation, error scenarios.
- **Confirmation Dialog** có content cụ thể, focus behavior đúng CMR-10.
- **Validation rules** rõ ràng cho từng field với exact error messages.
- **Scope exclusion** Tổ chức được ghi rõ → loại bỏ ambiguity.
- **Null display rule** ("--") nhất quán cho tất cả fields.

---

## 🧪 Testability Outlook

**Có thể test ngay:**
- Toàn bộ flow Xem chi tiết: loading, display, PTR, error handling
- Toàn bộ flow Chỉnh sửa: validation per field, nút disabled/enabled, auto-expand, confirmation dialog
- Cascade dropdown (Quốc gia → Tỉnh/TP → Phường/Xã)
- Error flows: API fail, timeout, mất mạng, session hết hạn
- Acceptance Criteria AC-01 và AC-02 (11 tiêu chí)
- CMR compliance: CMR-06, CMR-07, CMR-09, CMR-10, CMR-12, CMR-13, CMR-16, CMR-18

**Cần resolve trước khi test đầy đủ:**
- Boundary behavior trường Họ và tên tại 100 ký tự (Q-NEW-01) — ảnh hưởng test case boundary
- Loading state trong cascade dropdown (Q-NEW-02) — ảnh hưởng UI state test

---

## 📌 Summary & Recommendation

Sau vòng Q&A đầy đủ, UC249 đã được cải thiện từ **NOT READY (47.3/100)** lên **CONDITIONALLY READY (86.4/100)**. Tài liệu hiện có đủ preconditions, postconditions, validation rules chi tiết, error flows theo CMR, confirmation dialog, và acceptance criteria rõ ràng.

**QA CÓ THỂ BẮT ĐẦU** thiết kế test case cho toàn bộ các chức năng chính. Trong khi đó, BA cần trả lời thêm **2 câu hỏi mới (Q-NEW-01, Q-NEW-02)** để QA hoàn thiện test case boundary và UI state.

---

## Changelog (so với v1)

| Nội dung | Kết quả |
|---|---|
| Bổ sung Preconditions & Postconditions | ✅ Đã cập nhật vào UC doc |
| Bổ sung Acceptance Criteria (11 tiêu chí) | ✅ Đã cập nhật vào UC doc |
| Bổ sung Loading state (CMR-07) vào flow 3.1 | ✅ Đã cập nhật vào UC doc |
| Bổ sung Error flows đầy đủ (API fail, timeout, mất mạng, session) | ✅ Đã cập nhật vào UC doc |
| Bổ sung Confirmation Dialog khi Hủy/Back có thay đổi chưa lưu | ✅ Đã cập nhật vào UC doc |
| Cập nhật validation Họ và tên (max 100, no số/ký tự đặc biệt, required) | ✅ Đã cập nhật vào UC doc |
| Cập nhật exact error messages cho Email, SĐT, Địa chỉ, Mã bưu chính | ✅ Đã cập nhật vào UC doc |
| Cập nhật nút "Lưu thay đổi" — Disabled khi chưa có thay đổi | ✅ Đã cập nhật vào UC doc |
| Bổ sung auto-expand section khi validation lỗi trong section collapsed | ✅ Đã cập nhật vào UC doc |
| Bổ sung Pull-to-Refresh (CMR-13) cho màn hình Xem chi tiết | ✅ Đã cập nhật vào UC doc |
| Bổ sung Debounce (CMR-18) cho nút Edit và Lưu thay đổi | ✅ Đã cập nhật vào UC doc |
| Bổ sung null field display rule ("--") | ✅ Đã cập nhật vào UC doc |
| Xác nhận scope exclusion: Tổ chức không thuộc UC249 | ✅ Đã cập nhật vào UC doc |
| 2 câu hỏi mới (Q-NEW-01, Q-NEW-02) phát sinh từ re-audit | ⏳ Chờ BA trả lời |

---

*Báo cáo được tạo bởi: BA-audit-SRS-mobile Agent | Re-audit ngày 11/05/2026*
