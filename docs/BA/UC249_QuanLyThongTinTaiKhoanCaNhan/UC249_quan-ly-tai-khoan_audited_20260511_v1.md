# BÁO CÁO KIỂM TRA SẴN SÀNG YÊU CẦU (UC READINESS REVIEW)

**Tiêu đề:** UC249 — Quản lý thông tin tài khoản cá nhân trên Mobile
**Ngày audit:** 11/05/2026
**Người audit:** BA-audit-SRS-mobile Agent
**Phiên bản tài liệu được audit:** v2
**Phiên bản báo cáo:** v1

---

## 0. Thông tin tài liệu được kiểm tra

| Thuộc tính | Giá trị |
|---|---|
| UC ID | UC249 |
| Tên chức năng | Quản lý thông tin tài khoản cá nhân trên Mobile |
| File input | `UC249_CauHinhTaiKhoan.md` (v2) |
| Wireframe | 4 file PNG (Xem chi tiết × 2, Chỉnh sửa × 2) |
| CMR reference | `CMR_Mobile.md` v1.1 |

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status |
|---|---|---|---|---|
| 1 | Feature Identity | 5 | 5/5 | ✅ |
| 2 | Objective & Scope | 5 | 3/5 | ⚡ |
| 3 | Actors & User Roles | 10 | 6/10 | ⚡ |
| 4 | Preconditions & Postconditions | 10 | 0/10 | ⚠️ |
| 5 | UI Object Inventory & Mapping | 15 | 10/15 | ⚡ |
| 6 | Object Attributes & Behavior Definition | 20 | 12/20 | ⚡ |
| 7 | Functional Logic & Workflow Decomposition | 20 | 12/20 | ⚡ |
| 8 | Functional Integration Analysis | 10 | 4/10 | ⚡ |
| 9 | Acceptance Criteria | 10 | 0/10 | ⚠️ |
| 10 | Non-functional Requirements | 5 | 0/5 | ⚠️ |
| **Tổng** | | **110** | **52/110** | **47.3/100** |

### 🔴 Kết luận: ❌ NOT READY

> **Auto-fail:** Area #4 (Preconditions) và Area #9 (Acceptance Criteria) đều = 0 điểm.
> **Final Score:** round((52/110) × 100, 1) = **47.3 / 100** → Ngưỡng NOT READY (< 70).

---

## Phase 1 — Tổng hợp hiểu biết tính năng

### 1.1 UI Object Inventory & Mapping

#### Màn hình 1: Xem chi tiết (Read-only)

| # | Component | Type | Trong UC? | Trong Wireframe? | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nút Back (←) | Icon Button | ✅ | ✅ | |
| 2 | Tiêu đề "Tài khoản cá nhân" | Label | ✅ | ✅ | |
| 3 | Nút Edit (✏️) | Icon Button | ✅ | ✅ | |
| 4 | Section "Hồ sơ" — Họ và tên | Label | ✅ | ✅ | |
| 5 | Section "Hồ sơ" — Email | Label | ✅ | ✅ | |
| 6 | Section "Hồ sơ" — Số điện thoại | Label | ✅ | ✅ | |
| 7 | Section "Hồ sơ" — Loại tài khoản | Label | ✅ | ✅ | |
| 8 | Section "Thông tin" — Mã định danh | Label | ✅ | ✅ | |
| 9 | Section "Thông tin" — Ngày cấp | Label | ✅ | ✅ | |
| 10 | Section "Thông tin" — Nơi cấp | Label | ✅ | ✅ | |
| 11 | Section "Thông tin" — Mã số thuế | Label | ✅ | ✅ | |
| 12 | Section "Thông tin" — Quốc gia | Label | ✅ | ✅ | |
| 13 | Section "Thông tin" — Tỉnh/Thành phố | Label | ✅ | ✅ | |
| 14 | Section "Thông tin" — Phường/Xã | Label | ✅ | ✅ | |
| 15 | Section "Thông tin" — Địa chỉ | Label | ✅ | ✅ | |
| 16 | Section "Thông tin" — Mã bưu chính | Label | ✅ | ✅ | |

#### Màn hình 2: Chỉnh sửa (UC249.1)

| # | Component | Type | Trong UC? | Trong Wireframe? | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nút Back (←) | Icon Button | ✅ | ✅ | |
| 2 | Tiêu đề "Tài khoản cá nhân" | Label | ✅ | ✅ | |
| 3 | Section "Hồ sơ" toggle (^) | Collapsible Header | ✅ | ✅ | |
| 4 | Section "Thông tin" toggle (^) | Collapsible Header | ✅ | ✅ | |
| 5 | Họ và tên | Textbox | ✅ | ✅ | UC: Được sửa=x, Bắt buộc=— |
| 6 | Email (*) | Textbox | ✅ | ✅ | Wireframe có dấu * |
| 7 | Số điện thoại (với prefix +84 🇻🇳) | Textbox + Country Code | ✅ | ✅ | |
| 8 | Loại tài khoản (Read-only) | Label | ✅ | ✅ | |
| 9 | Mã định danh (Read-only, nền xám) | Textbox Read-only | ✅ | ✅ | |
| 10 | Ngày cấp (Read-only, nền xám) | Textbox Read-only | ✅ | ✅ | |
| 11 | Nơi cấp (Read-only, nền xám) | Textbox Read-only | ✅ | ✅ | |
| 12 | Mã số thuế (Read-only, nền xám) | Textbox Read-only | ✅ | ✅ | Wireframe ghi "Mã số ththuế" — lỗi đánh máy |
| 13 | Quốc gia (*) | Dropdown | ✅ | ✅ | |
| 14 | Tỉnh/Thành phố (*) | Dropdown | ✅ | ✅ | |
| 15 | Phường/Xã (*) | Dropdown | ✅ | ✅ | |
| 16 | Địa chỉ (*) | Textbox | ✅ | ✅ | |
| 17 | Mã bưu chính | Textbox | ✅ | ✅ | |
| 18 | Nút "Lưu thay đổi" (full-width) | Button Primary | ✅ | ✅ | |
| 19 | Nút "Hủy" (full-width) | Button Secondary | ✅ | ✅ | |

**CMR Cross-Check:**

| CMR | Nội dung | Áp dụng cho UC249? | Trạng thái |
|---|---|---|---|
| CMR-06 | Header & Điều hướng (Nút Back, Tiêu đề) | Có | ⚠️ Partial — UC có mô tả nhưng không tham chiếu CMR-06 |
| CMR-07 | Xử lý lỗi (API fail, timeout, session) | Có | ⚠️ Missing — Không có error flow nào tham chiếu CMR-07 |
| CMR-09 | Form nhập liệu (validation on blur, nút Submit disabled) | Có | ⚠️ Partial — UC mô tả on blur nhưng thiếu quy tắc disabled button, không tham chiếu CMR-09 |
| CMR-10 | Confirmation Dialog khi Hủy | Có thể áp dụng | ⚠️ Missing — Không đề cập dialog xác nhận khi hủy có thay đổi chưa lưu |
| CMR-12 | Định dạng thời gian (Ngày cấp: DD/MM/YYYY) | Có | ⚠️ Partial — UC ghi "DD/MM/YYYY" nhưng không tham chiếu CMR-12 |
| CMR-13 | Pull-to-Refresh | Có (màn hình chi tiết) | ⚠️ Missing — Không đề cập |
| CMR-14 | Empty State (khi field null từ API) | Có | ⚠️ Missing — Không xử lý trường hợp field null |
| CMR-17 | Đa ngôn ngữ | Có | ⚠️ Missing — Không tham chiếu |
| CMR-18 | Debounce Navigation (nút Edit ✏️) | Có | ⚠️ Missing — Không đề cập |

### 1.2 Object Attributes & Behavior Definition

**Field Attribute Table — Màn hình Chỉnh sửa:**

| Field | Data Type | Required? | Min | Max | Format | Null handling |
|---|---|---|---|---|---|---|
| Họ và tên | Text | — | — | ❓ | ❓ | ❓ |
| Email | Email | x | — | ❓ | Định dạng email | ❓ |
| Số điện thoại | Tel | — | — | ❓ | Theo quốc gia | ❓ |
| Quốc gia | Dropdown | x | — | — | Catalog API | ❓ |
| Tỉnh/Thành phố | Dropdown | x | — | — | Catalog API | ❓ |
| Phường/Xã | Dropdown | x | — | — | Catalog API | ❓ |
| Địa chỉ | Text | x | — | ❓ | ❓ | ❓ |
| Mã bưu chính | Text/Number | — | — | ❓ | ❓ | ❓ |

> ❓ = Không có thông tin trong UC doc — cần bổ sung

**Edge Case Gaps:**

- **Group A:** Không có quy tắc truncate/wrap cho Họ tên (Max length?). Không có placeholder khi field null từ API. Không định nghĩa hiển thị khi Mã số thuế / Nơi cấp / Ngày cấp = null.
- **Group B:** Loading state khi gọi API xem chi tiết không được đề cập (CMR-07: first-load = full-screen overlay). API fail khi lưu không có error flow.
- **Group C:** Android Back button khi đang edit có thay đổi chưa lưu → hành vi không xác định. Double-tap nút Edit (✏️) không có debounce rule (CMR-18). Double-tap "Lưu thay đổi" không có debounce rule.
- **Group D:** Session hết hạn khi đang trên màn hình edit → không được xử lý (CMR-07).
- **Group E:** Ngôn ngữ không được đề cập (CMR-17).

### 1.3 Functional Logic & Workflow Decomposition

**Flow 1 — Xem chi tiết (3.1):**

```
MAIN FLOW: Tap "Thông tin cá nhân" → [Loading?] → Hiển thị 2 section read-only → Tap ✏️ → Mở màn hình Chỉnh sửa

ALTERNATIVE FLOWS: Không có

EXCEPTION & ERROR FLOWS:
❌ THIẾU: API fail khi load → hiển thị gì?
❌ THIẾU: Timeout → hiển thị gì? (CMR-07)
❌ THIẾU: Loading state (CMR-07: first-load = full-screen overlay)

BUSINESS RULES: Không có
UI/UX FEEDBACK: Không có
```

**Flow 2 — Cập nhật thông tin (3.3):**

```
MAIN FLOW: Chỉnh sửa → Tap "Lưu thay đổi" → Validate → API cập nhật → Toast "Cập nhật thông tin thành công." → Quay về Xem chi tiết

ALTERNATIVE FLOWS:
❌ THIẾU: User chưa thay đổi gì → Tap "Lưu thay đổi" → Hệ thống xử lý thế nào?
❌ THIẾU: User tap "Hủy" khi có thay đổi chưa lưu → Dialog xác nhận? (CMR-10)
❌ THIẾU: Android Back khi có thay đổi chưa lưu

EXCEPTION & ERROR FLOWS:
❌ THIẾU: API cập nhật fail → Toast lỗi nội dung gì? Giữ hay mất dữ liệu đã nhập?
❌ THIẾU: Timeout khi lưu → CMR-07
❌ THIẾU: Duplicate tap "Lưu thay đổi" → debounce?

BUSINESS RULES:
❌ THIẾU: Max length cho từng trường
❌ THIẾU: Exact error message per field
❌ THIẾU: Nút "Lưu thay đổi" disabled khi form invalid? (CMR-09)
❌ THIẾU: Collapsible section tự expand khi có lỗi validation trong section đó?
```

**Flow 3 — Cascade Dropdown (3.4):**
> ✅ Được mô tả tốt. Chỉ thiếu: Loading indicator khi load danh sách từ API sau khi chọn.

### 1.4 Functional Integration Analysis

- Sau khi cập nhật thành công, màn hình Xem chi tiết refresh → ✅ có đề cập ("dữ liệu đã được làm mới")
- **Thiếu:** Sau khi cập nhật, màn hình Cấu hình tài khoản (Hub) — card thông tin tóm tắt có refresh không?
- **Thiếu:** Nếu Email/SĐT thay đổi → ảnh hưởng đến các màn hình khác trong app không?
- **Thiếu:** Pull-to-Refresh trên màn hình Xem chi tiết (CMR-13)

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|---|---|---|---|---|---|
| Q1 | **High** | N/A (Missing) | Preconditions hoàn toàn thiếu. Điều kiện tiên quyết để vào UC249 là gì? (VD: User đã đăng nhập, tài khoản có dữ liệu hồ sơ, v.v.) | Nếu không có preconditions, QA không biết setup test environment như thế nào. | Open |
| Q2 | **High** | N/A (Missing) | Postconditions hoàn toàn thiếu. Sau khi cập nhật thành công, trạng thái hệ thống là gì? (VD: dữ liệu được lưu xuống DB, session không bị ảnh hưởng) | QA không thể verify expected state sau khi test. | Open |
| Q3 | **High** | N/A (Missing) | Acceptance Criteria hoàn toàn thiếu. Tiêu chí chấp nhận cho từng chức năng là gì? | Không có AC → không thể xác định pass/fail cho test case. | Open |
| Q4 | **High** | Mục 3.1 — "Hệ thống gọi API lấy thông tin tài khoản" | Loading state khi gọi API xem chi tiết không được đề cập. Theo CMR-07: first-load phải dùng full-screen loading overlay. UC249 có áp dụng không? | Test case loading state không thể thiết kế. | Open |
| Q5 | **High** | Mục 3.1, 3.3 | Không có error flow khi API fail hoặc timeout. Khi API load thông tin thất bại: hiển thị gì? Khi API lưu thất bại: toast lỗi nội dung gì? Dữ liệu đã nhập có bị mất không? | Test case lỗi mạng/API không thể thiết kế. | Open |
| Q6 | **High** | Mục 2.2 — "Tap → Quay về màn hình Xem chi tiết, không lưu thay đổi" (Nút Hủy) | Khi user đã thay đổi dữ liệu và tap "Hủy" (hoặc nhấn Android Back button), có hiển thị Confirmation Dialog không? (CMR-10 áp dụng cho hành động không thể hoàn tác) | Nếu không có dialog xác nhận, user có thể mất dữ liệu đã nhập. Test case UX không thể thiết kế. | Open |
| Q7 | **Medium** | Mục 2.2 — Section "Hồ sơ" — Trường "Họ và tên" | Họ và tên: Max length? Ký tự cho phép (có chấp nhận số, ký tự đặc biệt không)? Nếu bắt buộc=— thì có được phép để trống không? Nếu để trống thì validation xử lý thế nào? | Không có validation rule → không thể thiết kế boundary test case. | Open |
| Q8 | **Medium** | Mục 2.2 — Trường "Email" | Exact error message khi email sai định dạng là gì? Khi để trống là gì? (CMR-09 quy định format error và required error là 2 message khác nhau) | QA cần exact message để verify. | Open |
| Q9 | **Medium** | Mục 2.2 — Trường "Số điện thoại" | Khi chọn quốc gia không phải Việt Nam, validation format SĐT áp dụng rule gì? Max length? Min length? | Test case SĐT quốc tế không thể thiết kế. | Open |
| Q10 | **Medium** | Mục 2.2 — Trường "Địa chỉ" | Địa chỉ: Max length? Ký tự đặc biệt cho phép? Exact error message khi để trống? | Thiếu constraint → thiếu boundary test case. | Open |
| Q11 | **Medium** | Mục 2.2 — Trường "Mã bưu chính" | Mã bưu chính: Data type (số thuần / alphanumeric)? Max/min length? Validation rule? | Không có constraint → không thể test validation. | Open |
| Q12 | **Medium** | Mục 2.2 — Nút "Lưu thay đổi" | Nút "Lưu thay đổi" có bị Disabled khi form chưa hợp lệ không? (CMR-09: "Nút Submit Disabled khi form chưa hợp lệ") | Test case button state không thể thiết kế. | Open |
| Q13 | **Medium** | Mục 3.2 — "Trạng thái thu gọn/mở rộng không ảnh hưởng đến dữ liệu đã nhập" | Khi section bị thu gọn (collapsed) và có field validation lỗi bên trong, hệ thống có tự động expand section đó để hiển thị lỗi không? | Nếu không auto-expand, user sẽ không thấy lỗi ở section đang collapse. | Open |
| Q14 | **Medium** | N/A (Missing) | Pull-to-Refresh có áp dụng cho màn hình Xem chi tiết không? (CMR-13 áp dụng cho tất cả màn hình có nội dung cần cập nhật) | Test case PTR không thể thiết kế. | Open |
| Q15 | **Medium** | N/A (Missing) | Double-tap nút Edit (✏️) hoặc nút "Lưu thay đổi" có cơ chế debounce không? (CMR-18) | Nếu không có debounce, user có thể navigate 2 lần hoặc gọi API 2 lần. | Open |
| Q16 | **Medium** | N/A (Missing) | Màn hình Cấu hình tài khoản (Hub) ở UC cũ có Card tóm tắt (Họ tên, Mã định danh, Email). Sau khi cập nhật thành công từ UC249, card đó có được refresh tự động không? | Data consistency sau khi cập nhật. | Open |
| Q17 | **Medium** | N/A (Missing) | Loại tài khoản = "Tổ chức" — form chỉnh sửa có khác gì so với "Cá nhân" không? Wireframe chỉ thể hiện Cá nhân. Tổ chức có thêm/bớt trường nào? | UC nói áp dụng cho cả Cá nhân và Tổ chức nhưng không phân biệt. | Open |
| Q18 | **Medium** | Mục 2.1 — "[Từ hệ thống]" / "[Từ tài khoản]" | Khi một field có giá trị null từ API (VD: Mã số thuế chưa có, Mã bưu chính chưa nhập), màn hình Xem chi tiết hiển thị gì? Placeholder "—"? Ẩn trường? Hiển thị trống? | CMR-14 Empty State áp dụng cho field null. | Open |
| Q19 | **Low** | Mục 3.3 — "Tap 'Lưu thay đổi' → Validate" | User tap "Lưu thay đổi" khi chưa thay đổi gì (dữ liệu giống dữ liệu gốc) — hệ thống có gọi API không? Hay bỏ qua? | Optimize không cần thiết nhưng ảnh hưởng test. | Open |
| Q20 | **Low** | N/A (Missing) | Dữ liệu nhạy cảm (CMND/CCCD, Mã số thuế) trên màn hình Xem chi tiết có bị masking một phần không? (VD: 001203****25) | Security concern — cần xác nhận để thiết kế test case bảo mật. | Open |
| Q21 | **Low** | N/A (Missing) | Nút Edit (✏️) trên màn hình Xem chi tiết — hiển thị với mọi loại tài khoản hay chỉ một số role? | Role-based visibility chưa rõ. | Open |

---

## 🟢 What's Good

- **Feature Identity** rõ ràng: UC ID, tên chức năng, BA phụ trách, phân hệ, ngày tạo đầy đủ.
- **UI Object Inventory** được trình bày dạng bảng rõ ràng cho cả 2 màn hình, mapping đầy đủ với wireframe.
- **Cấu trúc 2-section** (Hồ sơ + Thông tin) nhất quán giữa màn hình Xem chi tiết và Chỉnh sửa.
- **Cascade Dropdown địa chỉ** (3.4) được mô tả rõ logic reset phân cấp Quốc gia → Tỉnh/TP → Phường/Xã.
- **Phân biệt read-only vs editable** rõ ràng, nhất quán với wireframe (nền xám = read-only).
- **Country Code Prefix** cho SĐT được mô tả đúng theo wireframe.

---

## 🧪 Testability Outlook

**Có thể test ngay:**
- Hiển thị 2 section Hồ sơ + Thông tin trên màn hình Xem chi tiết (read-only)
- Tap nút Edit (✏️) → mở màn hình Chỉnh sửa
- Tap nút Back (←) → quay về màn hình trước
- Collapsible section (expand/collapse, không mất dữ liệu)
- Validation email (định dạng hợp lệ) — mức cơ bản
- Cascade dropdown (đổi Quốc gia → reset Tỉnh/TP → reset Phường/Xã)
- Trường read-only không thể chỉnh sửa (Mã định danh, Ngày cấp, Nơi cấp, MST)
- Toast "Cập nhật thông tin thành công." sau khi lưu thành công

**Chưa thể test (blocked by gaps):**
- Loading state / skeleton screen (Q4)
- Error flows: API fail, timeout khi load và khi lưu (Q5)
- Confirmation Dialog khi Hủy có thay đổi chưa lưu (Q6)
- Validation boundary: Max length, exact error messages (Q7-Q11)
- Nút "Lưu thay đổi" disabled state (Q12)
- Auto-expand section khi có lỗi validation bên trong section collapsed (Q13)
- Pull-to-Refresh (Q14)
- Debounce double-tap (Q15)
- Null data display per field (Q18)
- Behavior khi Tổ chức vs Cá nhân (Q17)

**Suggested test focus areas (sau khi gaps resolved):**
- Happy path: Xem chi tiết → Edit → Lưu thành công
- Alternative: Xem chi tiết → Edit → Hủy (có/không có thay đổi)
- Boundary: Max length mỗi trường, định dạng SĐT/email
- Error: API fail khi load, API fail khi lưu, timeout, mất mạng giữa chừng
- CMR compliance: CMR-06 (Header), CMR-07 (Error), CMR-09 (Form), CMR-10 (Confirm dialog), CMR-13 (PTR), CMR-18 (Debounce)
- Edge cases: Section collapsed + có lỗi, double-tap Save, Android Back với unsaved changes
- Data: Null field display, sensitive data masking (CMND/MST)

---

## 📌 Summary & Recommendation

Tài liệu UC249 v2 đã có bước tiến rõ rệt so với v1: cấu trúc 2 màn hình đầy đủ, mapping chính xác với wireframe, cascade dropdown địa chỉ được mô tả tốt. Tuy nhiên, tài liệu **CHƯA SẴN SÀNG cho QA** vì thiếu 3 thành phần cốt lõi:

1. **Preconditions & Postconditions** — hoàn toàn thiếu (Critical auto-fail)
2. **Acceptance Criteria** — hoàn toàn thiếu (Critical auto-fail)
3. **Error flows & loading states** — không có xử lý lỗi API, timeout, session hết hạn

**Khuyến nghị:** BA cần bổ sung 21 câu hỏi trong Question Backlog (ưu tiên Q1–Q6 là blockers). Sau khi BA trả lời và cập nhật tài liệu, tiến hành **Re-audit** để đánh giá lại.

---

*Báo cáo được tạo bởi: BA-audit-SRS-mobile Agent | 11/05/2026*
