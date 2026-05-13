# UC Readiness Review — UC249 Quản lý thông tin tài khoản cá nhân (Mobile)

**Tiêu đề:** Báo cáo audit mức độ sẵn sàng cho thiết kế test case
**Ngày tạo:** 2026-05-12
**Tác giả:** QC Auditor (skill `qc-uc-review-MOBILE`)
**Phiên bản:** v1
**Tài liệu nguồn:** [UC249_QuanLyThongTinTaiKhoanCaNhan.md](../../../BA/SRS-mobile/UC249_QuanLyThongTinTaiKhoanCaNhan/UC249_QuanLyThongTinTaiKhoanCaNhan.md) (v2.2)
**CMR tham chiếu:** [CMR_Mobile.md](../../../BA/SRS-mobile/Common%20rule/CMR_Mobile.md) v1.5
**Wireframes đi kèm:** Xem chi tiết tài khoản cá nhân.png, Xem chi tiết tài khoản cá nhân (1).png, Chỉnh sửa tài khoản.png, Chỉnh sửa tài khoản (1).png

---

## Feature Brief

UC249 cung cấp chức năng quản lý thông tin tài khoản cá nhân trên Mobile App, bao gồm 2 màn hình chính:

- **Xem chi tiết (Read-only):** Hiển thị toàn bộ thông tin tài khoản chia 2 section (Hồ sơ + Thông tin). App Bar có nút Back và nút Edit. Hỗ trợ Pull-to-Refresh.
- **Chỉnh sửa (UC249.1):** Form chỉnh sửa với 2 section collapsible. Cho phép sửa: Họ và tên, Email, SĐT, Quốc gia, Tỉnh/TP, Phường/Xã, Địa chỉ, Mã bưu chính. Các trường định danh (Mã định danh, Ngày cấp, Nơi cấp, MST) là read-only. Cascade dropdown cho địa chỉ. Confirmation dialog khi hủy có thay đổi chưa lưu.

**Đối tượng:** Cá nhân đã đăng nhập. Tài khoản Tổ chức nằm ngoài phạm vi UC này.
**Truy cập:** Sidebar → "Cấu hình tài khoản" → Tap "Thông tin cá nhân".

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| **85.5 / 100** | ⚡ **CONDITIONALLY READY** |

**Lý do:** Tài liệu UC249 v2.2 đã được cải thiện đáng kể qua nhiều vòng Q&A với BA. Preconditions, Postconditions, Acceptance Criteria, Error Flows, Validation Rules đều đầy đủ. Tuy nhiên còn một số gap nhỏ cần giải quyết song song: max length chưa định nghĩa cho 3 trường (Email, Địa chỉ, Mã bưu chính), behavior khi cascade dropdown API fail, và impact analysis khi thay đổi Email/SĐT lên các màn hình khác.

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status |
|---|---|---|---|---|
| 1 | Feature Identity | 5 | 5/5 | ✅ |
| 2 | Objective & Scope | 5 | 5/5 | ✅ |
| 3 | Actors & User Roles | 10 | 9/10 | ✅ |
| 4 | Preconditions & Postconditions | 10 | 10/10 | ✅ |
| 5 | UI Object Inventory & Mapping | 15 | 13/15 | ✅ |
| 6 | Object Attributes & Behavior Definition | 20 | 16/20 | ⚡ |
| 7 | Functional Logic & Workflow Decomposition | 20 | 18/20 | ✅ |
| 8 | Functional Integration Analysis | 10 | 7/10 | ⚡ |
| 9 | Acceptance Criteria | 10 | 9/10 | ✅ |
| 10 | Non-functional Requirements | 5 | 2/5 | ⚡ |
| **Total** | | **110** | **94** | **94/110 → 85.5/100** |

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| UC249 | Quản lý thông tin tài khoản cá nhân trên Mobile | v2.2 (12/05/2026) | In Review |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------|
| han.luong & huy.lai2 | *(chưa ghi)* | 2026-04-29 | 2026-05-12 |

**Lưu ý:** Header tài liệu ghi "Phiên bản: v2.2" nhưng bảng metadata bên trong vẫn ghi "Phiên bản: v2.1" — inconsistency nhỏ cần cập nhật.

---
## 1. Objective & Scope

### 1.1 Objective
Cho phép người dùng (Cá nhân đã đăng nhập) xem toàn bộ thông tin tài khoản cá nhân và chỉnh sửa các trường được phép cập nhật trên ứng dụng di động.

### 1.2 In Scope
- Màn hình Xem chi tiết thông tin tài khoản cá nhân (read-only, 2 section: Hồ sơ + Thông tin)
- Màn hình Chỉnh sửa thông tin tài khoản cá nhân (form, 2 section collapsible)
- Cascade dropdown địa chỉ (Quốc gia → Tỉnh/TP → Phường/Xã)
- Validation, error handling, confirmation dialog

### 1.3 Out of Scope
- Tài khoản loại **Tổ chức** (xử lý ở màn hình riêng, không thuộc UC249)
- Logic xử lý phía server/API (chỉ kiểm tra hành vi client)

**Score: 5/5** ✅ — Scope rõ ràng, exclusion được ghi tường minh.

---

## 2. Actors & User Roles

| Actor | Role | Permissions |
|-------|------|-------------|
| Cá nhân đã đăng nhập | End User | Xem + Chỉnh sửa thông tin tài khoản cá nhân |

**Precondition liên quan:** Session còn hiệu lực. Nếu session hết hạn → refresh token. Nếu refresh token hết hạn → redirect đăng nhập (CMR-07).

**Score: 9/10** ✅ — Trừ 1 điểm: Không nêu rõ behavior khi loại tài khoản không phải "Cá nhân" mà user vẫn cố truy cập UC249 (edge case — guard condition).

---

## 3. Preconditions & Postconditions

### 3.1 Preconditions
- Người dùng đã đăng nhập vào ứng dụng (session còn hiệu lực)
- Loại tài khoản là **Cá nhân**

### 3.2 Postconditions (sau khi cập nhật thành công)
- Thông tin tài khoản được lưu xuống DB với dữ liệu mới nhất
- Session không bị ảnh hưởng (người dùng không bị đăng xuất)
- Màn hình Xem chi tiết tự động hiển thị dữ liệu đã cập nhật mới nhất

**Score: 10/10** ✅ — Đầy đủ, rõ ràng, đủ để setup test environment.

---

## 4. UI Object Inventory & Mapping

### Màn hình 1: Xem chi tiết (Read-only)

| # | Component | Type | In UC? | In Wireframe? | Notes |
|---|---|---|---|---|---|
| 1 | Nút Back (←) | Icon Button | ✅ | ✅ | CMR-06 |
| 2 | Tiêu đề "Tài khoản cá nhân" | Label | ✅ | ✅ | |
| 3 | Nút Edit (✏️) | Icon Button | ✅ | ✅ | Debounce CMR-18 |
| 4 | Section "Hồ sơ" — Họ và tên | Label | ✅ | ✅ | Null → "-" |
| 5 | Section "Hồ sơ" — Email | Label | ✅ | ✅ | Truncate 1 dòng, null → "-" |
| 6 | Section "Hồ sơ" — Số điện thoại | Label | ✅ | ✅ | Format: +84 912 345 678, null → "-" |
| 7 | Section "Hồ sơ" — Loại tài khoản | Label | ✅ | ✅ | Luôn "Cá nhân" |
| 8 | Section "Thông tin" — Mã định danh | Label | ✅ | ✅ | Null → "-" |
| 9 | Section "Thông tin" — Ngày cấp | Label | ✅ | ✅ | DD/MM/YYYY (CMR-12), null → "-" |
| 10 | Section "Thông tin" — Nơi cấp | Label | ✅ | ✅ | Null → "-" |
| 11 | Section "Thông tin" — Mã số thuế | Label | ✅ | ✅ | Null → "-" |
| 12 | Section "Thông tin" — Quốc gia | Label | ✅ | ✅ | Null → "-" |
| 13 | Section "Thông tin" — Tỉnh/Thành phố | Label | ✅ | ✅ | Null → "-" |
| 14 | Section "Thông tin" — Phường/Xã | Label | ✅ | ✅ | Null → "-" |
| 15 | Section "Thông tin" — Địa chỉ | Label | ✅ | ✅ | Null → "-" |
| 16 | Section "Thông tin" — Mã bưu chính | Label | ✅ | ✅ | Null → "-" |

### Màn hình 2: Chỉnh sửa (UC249.1)

| # | Component | Type | In UC? | In Wireframe? | Notes |
|---|---|---|---|---|---|
| 1 | Nút Back (←) | Icon Button | ✅ | ✅ | Confirmation dialog nếu có thay đổi |
| 2 | Tiêu đề "Tài khoản cá nhân" | Label | ✅ | ✅ | |
| 3 | Section "Hồ sơ" toggle (^) | Collapsible Header | ✅ | ✅ | Mặc định mở |
| 4 | Section "Thông tin" toggle (^) | Collapsible Header | ✅ | ✅ | Mặc định mở |
| 5 | Họ và tên (*) | Textbox | ✅ | ✅ | Max 100 ký tự, block input |
| 6 | Email (*) | Textbox (email) | ✅ | ✅ | Bắt buộc |
| 7 | Số điện thoại + Country Code | Textbox (tel) + Prefix | ✅ | ✅ | Mặc định 🇻🇳 +84 |
| 8 | Loại tài khoản | Label (Read-only) | ✅ | ✅ | "Cá nhân", không sửa được |
| 9 | Mã định danh | Textbox (Read-only, nền xám) | ✅ | ✅ | |
| 10 | Ngày cấp | Textbox (Read-only, nền xám) | ✅ | ✅ | |
| 11 | Nơi cấp | Textbox (Read-only, nền xám) | ✅ | ✅ | |
| 12 | Mã số thuế | Textbox (Read-only, nền xám) | ✅ | ✅ | Wireframe: "Mã số ththuế" (typo) |
| 13 | Quốc gia (*) | Dropdown | ✅ | ✅ | Cascade trigger |
| 14 | Tỉnh/Thành phố (*) | Dropdown | ✅ | ✅ | Spinner + disabled khi loading |
| 15 | Phường/Xã (*) | Dropdown | ✅ | ✅ | Spinner + disabled khi loading |
| 16 | Địa chỉ (*) | Textbox | ✅ | ✅ | Cho phép ký tự đặc biệt |
| 17 | Mã bưu chính | Textbox | ✅ | ✅ | Alphanumeric |
| 18 | Nút "Lưu thay đổi" | Button Primary (full-width) | ✅ | ✅ | Disabled/Enabled, debounce |
| 19 | Nút "Hủy" | Button Secondary (full-width) | ✅ | ✅ | Confirmation dialog |
| 20 | Country Code Selector (cờ + mã) | Dropdown/Picker | ✅ (mô tả) | ✅ | ⚡ Chưa liệt kê behavior đầy đủ |

### CMR Cross-Check

| CMR | Nội dung | Áp dụng? | Trạng thái |
|---|---|---|---|
| CMR-03 | Dropdown / Combobox | Có | ✅ Tham chiếu đúng — cascade, searchable, API danh mục |
| CMR-06 | Header & Điều hướng | Có | ✅ Nút Back, tiêu đề đúng |
| CMR-07 | Xử lý lỗi chung | Có | ✅ Error flows đầy đủ (5xx, timeout, mất mạng, 401) |
| CMR-09 | Form nhập liệu | Có | ✅ Validation on blur, inline error, trường bắt buộc (*) |
| CMR-10 | Confirmation Dialog | Có | ✅ Dialog khi Hủy/Back có thay đổi chưa lưu |
| CMR-12 | Định dạng thời gian | Có | ✅ Ngày cấp: DD/MM/YYYY |
| CMR-13 | Pull-to-Refresh | Có | ✅ Màn hình Xem chi tiết |
| CMR-14 | Empty State (null field) | Có | ✅ Null → "-" (single dash) |
| CMR-16 | API Performance (timeout 10s) | Có | ✅ Tham chiếu trong error flows |
| CMR-17 | Đa ngôn ngữ | Có | ✅ Section 3.5 — 5 ngôn ngữ |
| CMR-18 | Debounce Navigation | Có | ✅ Nút Edit + Lưu thay đổi |

**Score: 13/15** ✅ — Trừ 2 điểm: (a) Country code selector chưa được mô tả đầy đủ như component riêng (danh sách quốc gia, search, behavior khi chọn); (b) Wireframe typo "Mã số ththuế" chưa được ghi nhận chính thức trong UC.

---
## 5. Object Attributes & Behavior Definition

### Field Attribute Table — Màn hình Chỉnh sửa

| Field | Data Type | Required? | Min | Max | Format | Null Handling | Validation Error |
|---|---|---|---|---|---|---|---|
| Họ và tên | Text | ✅ | — | 100 ký tự (block input) | Không số, không ký tự đặc biệt | "-" (view) | "Họ và tên là bắt buộc." / "Không nhập số, ký tự đặc biệt." |
| Email | Email | ✅ | — | ❓ **Chưa định nghĩa** | Định dạng email chuẩn | "-" (view) | "Email là bắt buộc." / "Sai định dạng." |
| Số điện thoại | Tel | — | — | ❓ **Theo chuẩn quốc tế** | Theo quốc gia được chọn | "-" (view) | "Sai định dạng." |
| Loại tài khoản | Label | — | — | — | — | "Cá nhân" (luôn có) | — |
| Mã định danh | Text (R/O) | — | — | — | — | "-" (view) | — |
| Ngày cấp | Date (R/O) | — | — | — | DD/MM/YYYY (CMR-12) | "-" (view) | — |
| Nơi cấp | Text (R/O) | — | — | — | — | "-" (view) | — |
| Mã số thuế | Text (R/O) | — | — | — | — | "-" (view) | — |
| Quốc gia | Dropdown | ✅ | — | — | API danh mục (CMR-03) | "-" (view) | "Quốc gia là bắt buộc." |
| Tỉnh/Thành phố | Dropdown | ✅ | — | — | API theo Quốc gia | "-" (view) | "Tỉnh/Thành phố là bắt buộc." |
| Phường/Xã | Dropdown | ✅ | — | — | API theo Tỉnh/TP | "-" (view) | "Phường/Xã là bắt buộc." |
| Địa chỉ | Text | ✅ | — | ❓ **Chưa định nghĩa** | Cho phép ký tự đặc biệt | "-" (view) | "Địa chỉ là bắt buộc." |
| Mã bưu chính | Text | — | — | ❓ **Chưa định nghĩa** | Alphanumeric (chữ + số) | "-" (view) | "Không chấp nhận ký tự đặc biệt." |

### Edge Case Analysis

**Group A — Extreme Data States:**
- ✅ Họ và tên: max 100 ký tự, block input (không cho nhập thêm)
- ❓ Email: max length chưa định nghĩa → không thể test boundary
- ❓ Địa chỉ: max length chưa định nghĩa → không thể test boundary
- ❓ Mã bưu chính: max length chưa định nghĩa → không thể test boundary
- ✅ Null handling: tất cả field null → hiển thị "-" (CMR-14)
- ✅ Email truncate: tối đa 1 dòng, quá dài truncate (...)

**Group B — Network & API States:**
- ✅ API fail (5xx): Toast lỗi, giữ nguyên dữ liệu đã nhập
- ✅ Timeout (>10s): Toast + nút "Thử lại"
- ✅ Mất mạng: Toast + nút "Thử lại"
- ✅ Cascade dropdown loading: spinner trong dropdown + disabled
- ❓ Cascade dropdown API fail: behavior khi API load Tỉnh/TP hoặc Phường/Xã thất bại chưa được mô tả

**Group C — Abnormal User Interactions:**
- ✅ Double-tap nút Edit / Lưu thay đổi: debounce (CMR-18)
- ✅ Back khi có thay đổi chưa lưu: Confirmation Dialog
- ✅ Android Back button: xử lý tương tự nút Back (←) — có đề cập trong mục 3.3

**Group D — Permissions & Session:**
- ✅ Session hết hạn: refresh token → nếu hết hạn → redirect đăng nhập + toast
- ✅ Force close: giữ session (CMR-18)
- ✅ Scope: chỉ Cá nhân, Tổ chức ngoài phạm vi

**Group E — Internationalization (i18n):**
- ✅ 5 ngôn ngữ (VI, EN, ZH, JA, KO) cho text cứng
- ✅ Nội dung dữ liệu người dùng giữ nguyên
- ✅ Lưu ngôn ngữ trên server (CMR-17)

**Score: 16/20** ⚡ — Trừ 4 điểm: (a) Max length Email chưa định nghĩa (-1); (b) Max length Địa chỉ chưa định nghĩa (-1); (c) Max length Mã bưu chính chưa định nghĩa (-1); (d) Cascade dropdown API failure behavior chưa mô tả (-1).

---

## 6. Functional Logic & Workflow Decomposition

### Flow 1 — Xem chi tiết thông tin tài khoản cá nhân (3.1)

```
MAIN FLOW (Happy Path):
1. Tap "Thông tin cá nhân" từ Cấu hình tài khoản
2. Hiển thị full-screen loading overlay (CMR-07)
3. Gọi API lấy thông tin → Ẩn loading
4. Hiển thị 2 section Hồ sơ + Thông tin (read-only)
5. Field null → hiển thị "-"
6. Tap nút Edit (✏️) → Chuyển sang Chỉnh sửa

ALTERNATIVE FLOWS:
[Alt-1] Pull-to-Refresh: Kéo xuống → Spinner → Gọi API → Cập nhật dữ liệu
[Alt-2] PTR thất bại: Giữ nguyên dữ liệu cũ + Toast lỗi (CMR-07)

EXCEPTION & ERROR FLOWS:
[Err-1] API fail (5xx) → Toast: "Hệ thống đang bận. Vui lòng thử lại sau."
[Err-2] Timeout (>10s) → Toast: "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + Nút "Thử lại"
[Err-3] Mất mạng → Toast: "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + Nút "Thử lại"
[Err-4] Session hết hạn (401) → Refresh token → Nếu refresh hết hạn → Redirect đăng nhập + Toast: "Phiên đăng nhập hết hạn."

UI/UX FEEDBACK:
- Loading: Full-screen overlay (first load), spinner (PTR)
- Debounce: Nút Edit (✏️) — CMR-18
```

### Flow 2 — Chỉnh sửa thông tin tài khoản cá nhân (3.3)

```
MAIN FLOW (Happy Path):
1. Màn hình mở → Nút "Lưu thay đổi" = Disabled
2. Chỉnh sửa ≥1 trường → Nút "Lưu thay đổi" = Enabled
3. Tap "Lưu thay đổi" (debounce CMR-18)
4. Validate toàn bộ form (on submit)
5. Validate OK → Loading indicator cục bộ → Gọi API cập nhật
6. Thành công → Toast: "Cập nhật thông tin thành công." → Quay về Xem chi tiết (data mới nhất)

ALTERNATIVE FLOWS:
[Alt-1] Hủy khi CHƯA có thay đổi: Tap Hủy/Back → Quay về Xem chi tiết ngay (không dialog)
[Alt-2] Hủy khi CÓ thay đổi: Tap Hủy/Back/Android Back → Confirmation Dialog
  - "Đồng ý" → Hủy thay đổi, quay về Xem chi tiết
  - "Hủy" → Đóng dialog, ở lại Chỉnh sửa (focus mặc định vào "Hủy" — CMR-10)

EXCEPTION & ERROR FLOWS:
[Err-1] Validation fail → Inline error dưới trường lỗi + Auto-expand section collapsed có lỗi
[Err-2] API lưu fail (5xx) → Giữ nguyên dữ liệu đã nhập + Toast lỗi
[Err-3] Timeout khi lưu → Giữ nguyên dữ liệu + Toast + Nút "Thử lại"
[Err-4] Mất mạng khi lưu → Giữ nguyên dữ liệu + Toast lỗi
[Err-5] Session hết hạn → Redirect đăng nhập + Toast

BUSINESS RULES:
BR-01: Họ và tên — bắt buộc, max 100 (block), không số/ký tự đặc biệt
BR-02: Email — bắt buộc, đúng format email
BR-03: SĐT — nếu nhập, đúng format theo quốc gia
BR-04: Quốc gia, Tỉnh/TP, Phường/Xã, Địa chỉ — bắt buộc
BR-05: Mã bưu chính — nếu nhập, chỉ alphanumeric
BR-06: Validation on blur cho tất cả textbox
BR-07: Auto-trim whitespace trước khi validate (CMR-09)

UI/UX FEEDBACK:
- Nút "Lưu thay đổi": Disabled → Enabled khi có thay đổi
- Loading: Indicator cục bộ khi gọi API lưu
- Toast: Thành công / Lỗi
- Debounce: Nút "Lưu thay đổi" — CMR-18
```

### Flow 3 — Cascade Dropdown địa chỉ (3.4)

```
MAIN FLOW:
1. Đổi Quốc gia → Reset Tỉnh/TP + Phường/Xã → Load danh sách Tỉnh/TP mới
2. Đổi Tỉnh/TP → Reset Phường/Xã → Load danh sách Phường/Xã mới
3. Trong khi API đang load: spinner bên trong dropdown + dropdown disabled

EXCEPTION & ERROR FLOWS:
❓ THIẾU: Khi API load danh sách Tỉnh/TP hoặc Phường/Xã thất bại → client hiển thị gì?
```

### Flow 4 — Thu gọn / Mở rộng Section (3.2)

```
MAIN FLOW:
1. Mặc định: cả 2 section đều mở (expand)
2. Tap tiêu đề section / icon ^ → Toggle collapse/expand
3. Dữ liệu đã nhập không bị ảnh hưởng khi collapse

AUTO-EXPAND RULE:
- Khi validate lỗi + section đang collapsed + có field lỗi bên trong → Tự động expand
```

**Score: 18/20** ✅ — Trừ 2 điểm: (a) Cascade dropdown API failure behavior chưa mô tả (-1); (b) Android Back button được đề cập nhưng chỉ bằng cách tham chiếu chung, không tường minh hóa riêng (-1).

---
## 7. Functional Integration Analysis

| # | Tích hợp | Mô tả trong UC? | Trạng thái |
|---|---|---|---|
| 1 | Sau khi lưu → Xem chi tiết refresh | ✅ "Quay về Xem chi tiết với dữ liệu mới nhất" | ✅ Rõ ràng |
| 2 | Pull-to-Refresh → Reload data | ✅ CMR-13, trigger gọi lại API | ✅ Rõ ràng |
| 3 | Session hết hạn → Redirect đăng nhập | ✅ CMR-07, refresh token flow | ✅ Rõ ràng |
| 4 | Đổi Quốc gia → Cascade reset Tỉnh/TP + Phường/Xã | ✅ Section 3.4 | ✅ Rõ ràng |
| 5 | Sau khi cập nhật Email/SĐT → Impact lên màn hình khác? | ❓ Không đề cập | ⚡ Gap |
| 6 | Sau khi cập nhật → Hub screen (card tóm tắt) refresh? | ❓ Không đề cập | ⚡ Gap |
| 7 | Cascade dropdown API fail → Client behavior? | ❓ Không đề cập | ⚡ Gap |

**Score: 7/10** ⚡ — Trừ 3 điểm: (a) Impact lên các màn hình khác khi Email/SĐT thay đổi (-1); (b) Hub screen refresh sau update (-1); (c) Cascade dropdown API failure handling (-1).

---

## 8. Acceptance Criteria

| # | AC ID | Tiêu chí | Pass Condition | Đánh giá |
|---|---|---|---|---|
| 1 | AC-01-1 | Màn hình tải thành công | Full-screen loading → 2 section hiển thị đúng | ✅ Measurable |
| 2 | AC-01-2 | Field null hiển thị đúng | Null → "-" | ✅ Measurable |
| 3 | AC-01-3 | Tất cả fields read-only | Không cho phép chỉnh sửa trên Xem chi tiết | ✅ Measurable |
| 4 | AC-01-4 | Nút Edit hiển thị và hoạt động | ✏️ hiển thị, tap → mở Chỉnh sửa | ✅ Measurable |
| 5 | AC-01-5 | Pull-to-Refresh hoạt động | Kéo xuống → spinner → data mới | ✅ Measurable |
| 6 | AC-01-6 | Xử lý lỗi API | Đúng message theo CMR-07 | ✅ Measurable |
| 7 | AC-02-1 | Trạng thái nút "Lưu thay đổi" | Disabled khi chưa thay đổi, Enabled khi có thay đổi | ✅ Measurable |
| 8 | AC-02-2 | Validation Họ và tên | Đúng error messages | ✅ Measurable |
| 9 | AC-02-3 | Validation Email | Đúng error messages | ✅ Measurable |
| 10 | AC-02-4 | Validation SĐT | "Sai định dạng." | ✅ Measurable |
| 11 | AC-02-5 | Validation Mã bưu chính | "Không chấp nhận ký tự đặc biệt." | ✅ Measurable |
| 12 | AC-02-6 | Auto-expand khi lỗi | Section collapsed + field lỗi → auto expand | ✅ Measurable |
| 13 | AC-02-7 | Lưu thành công | Toast + quay về Xem chi tiết + data mới | ✅ Measurable |
| 14 | AC-02-8 | Confirmation Dialog khi Hủy | Đúng nội dung dialog | ✅ Measurable |
| 15 | AC-02-9 | Xử lý lỗi khi lưu | Giữ data + toast lỗi | ✅ Measurable |
| 16 | AC-02-10 | Cascade Dropdown | Reset đúng logic phân cấp | ✅ Measurable |
| 17 | AC-02-11 | Debounce | Double-tap không trigger 2 lần | ✅ Measurable |

**Score: 9/10** ✅ — Trừ 1 điểm: Thiếu AC cho Pull-to-Refresh failure scenario (PTR thất bại → giữ data cũ + toast lỗi).

---

## 9. Non-functional Requirements

| NFR Category | Có trong UC? | Chi tiết |
|---|---|---|
| Performance | ✅ Partial | Timeout 10s (CMR-16) |
| Security | ❌ | Không đề cập sensitive data display policy (CMND/CCCD, MST) — đã xác nhận không cần masking |
| Accessibility | ❌ | Không đề cập screen reader, contrast, touch target |
| Compatibility | ❌ | Không đề cập minimum iOS/Android versions |
| i18n | ✅ | 5 ngôn ngữ, lưu trên server (CMR-17) |

**Score: 2/5** ⚡ — Chỉ có timeout và i18n. Thiếu accessibility và compatibility.

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|---|---|---|---|---|---|
| Q1 | Medium | Mục 2.2 — Trường "Email" | **Max length cho Email chưa định nghĩa.** Trường Email hiện chỉ có validation format và required, nhưng không có giới hạn ký tự tối đa. Cần xác định max length (VD: 254 ký tự theo RFC 5321?) và cách xử lý (block input hay báo lỗi?). | Không thể thiết kế boundary test case cho Email. Nếu không có max length, user có thể nhập email cực dài gây lỗi UI/API. | Open |
| Q2 | Medium | Mục 2.2 — Trường "Địa chỉ" | **Max length cho Địa chỉ chưa định nghĩa.** Trường Địa chỉ bắt buộc nhập nhưng không có giới hạn ký tự. Cần xác định max length và cách xử lý khi vượt quá. | Không thể thiết kế boundary test case. Địa chỉ dài có thể gây overflow UI hoặc lỗi API. | Open |
| Q3 | Medium | Mục 2.2 — Trường "Mã bưu chính" | **Max length cho Mã bưu chính chưa định nghĩa.** Trường chỉ ghi "Alphanumeric" nhưng không có min/max length. Mã bưu chính Việt Nam có 6 chữ số, quốc tế có thể khác. Cần xác định constraint. | Không thể thiết kế boundary test case. Cần biết max length để test validation. | Open |
| Q4 | Medium | Mục 3.4 — Cascade Dropdown | **Behavior khi API load danh sách Tỉnh/TP hoặc Phường/Xã thất bại.** UC mô tả loading state (spinner + disabled) nhưng không mô tả khi API trả lỗi. Client hiển thị gì? Dropdown trống? Toast lỗi? Nút retry? | Không thể thiết kế test case cho cascade dropdown error scenario. Đây là scenario thực tế khi mạng yếu. | Open |
| Q5 | Medium | Mục 3.3 — Sau khi cập nhật thành công | **Impact lên các màn hình khác khi Email/SĐT thay đổi.** Sau khi cập nhật Email hoặc SĐT thành công, các màn hình khác trong app (Hub card tóm tắt, Sidebar, header) có tự động refresh không? Hay chỉ màn hình Xem chi tiết được cập nhật? | Data consistency — nếu Hub screen vẫn hiển thị email cũ sau khi user đã cập nhật, đây là bug UX. Cần biết expected behavior để test. | Open |
| Q6 | Low | Header vs. Bảng metadata | **Version inconsistency:** Header tài liệu ghi "Phiên bản: v2.2" nhưng bảng thuộc tính bên trong vẫn ghi "Phiên bản: v2.1". Cần đồng bộ. | Traceability — QA cần biết chính xác version nào đang được test. | Open |
| Q7 | Low | N/A (Missing) | **Accessibility:** Không có thông tin về hỗ trợ screen reader (VoiceOver/TalkBack), contrast ratio, minimum touch target size (48dp). Có yêu cầu accessibility cho UC này không? | Nếu có yêu cầu accessibility, cần bổ sung để QA thiết kế test case tương ứng. | Open |
| Q8 | Low | N/A (Missing) | **Compatibility:** Không ghi rõ minimum iOS/Android version được hỗ trợ. App hỗ trợ từ iOS bao nhiêu / Android bao nhiêu? | Ảnh hưởng đến test matrix — cần biết phạm vi thiết bị/OS để test. | Open |

---

## 🟢 What's Good

- **Cấu trúc tài liệu xuất sắc:** 2 màn hình được mô tả chi tiết với bảng field attributes rõ ràng, phân biệt read-only vs editable nhất quán.
- **Validation rules đầy đủ:** Mỗi field có exact error message, validation timing (on blur), và behavior rõ ràng (block input vs inline error).
- **Error flows toàn diện:** Bao phủ 4 scenarios (API fail, timeout, mất mạng, session hết hạn) cho cả 2 flow (xem + lưu), tham chiếu đúng CMR-07.
- **Confirmation Dialog chi tiết:** Nội dung dialog, 2 nút, focus behavior (CMR-10) đều được mô tả.
- **Cascade Dropdown logic rõ ràng:** Reset phân cấp + loading state (spinner + disabled) được mô tả tường minh.
- **Acceptance Criteria measurable:** 17 tiêu chí với pass condition cụ thể, bao gồm happy path, validation, error, UX.
- **CMR compliance tốt:** Tham chiếu đúng 11 CMR rules (CMR-03, 06, 07, 09, 10, 12, 13, 14, 16, 17, 18).
- **Preconditions & Postconditions** ngắn gọn, đủ để setup test environment.
- **Scope exclusion** Tổ chức được ghi rõ → loại bỏ ambiguity.
- **Đa ngôn ngữ** được mô tả rõ: text cứng dịch 5 ngôn ngữ, data người dùng giữ nguyên.

---

## 🧪 Testability Outlook

**Có thể test ngay:**
- Happy path: Xem chi tiết → Edit → Chỉnh sửa → Lưu thành công → Quay về Xem chi tiết
- Validation per field: Họ và tên (required, no số/ký tự đặc biệt, max 100 block), Email (required, format), SĐT (format theo quốc gia), Mã bưu chính (alphanumeric)
- Nút "Lưu thay đổi" state: Disabled → Enabled
- Confirmation Dialog: Hủy/Back khi có/không có thay đổi
- Auto-expand section khi validation lỗi trong section collapsed
- Cascade dropdown: Quốc gia → Tỉnh/TP → Phường/Xã (reset + loading state)
- Error flows: API fail, timeout, mất mạng, session hết hạn (cả xem + lưu)
- Pull-to-Refresh: thành công + thất bại
- Debounce: nút Edit + Lưu thay đổi
- Null display: tất cả field null → "-"
- Read-only fields: không thể chỉnh sửa (Mã định danh, Ngày cấp, Nơi cấp, MST)
- Collapsible sections: expand/collapse, giữ data
- CMR compliance: CMR-03, 06, 07, 09, 10, 12, 13, 14, 16, 17, 18

**Chưa thể test đầy đủ (blocked by gaps):**
- Boundary test Email (Q1) — max length chưa xác định
- Boundary test Địa chỉ (Q2) — max length chưa xác định
- Boundary test Mã bưu chính (Q3) — max/min length chưa xác định
- Cascade dropdown API failure (Q4) — client behavior chưa mô tả
- Data consistency sau update (Q5) — impact lên màn hình khác chưa rõ

**Suggested test focus areas (sau khi gaps resolved):**
- Happy path: Xem chi tiết → Edit → Lưu thành công (end-to-end)
- Alternative scenarios: Hủy có/không thay đổi, Back button, Android Back
- Boundary & validation: Max length mỗi trường, format SĐT quốc tế, email format edge cases
- Error & exception: API fail khi load, API fail khi lưu, timeout, mất mạng, session hết hạn mid-edit
- CMR compliance: Verify tất cả 11 CMR rules được áp dụng đúng
- Edge cases: Section collapsed + lỗi, double-tap Save, whitespace-only input (CMR-09 trim)
- Cascade dropdown: Đổi quốc gia → reset chain, loading state, API failure
- i18n: Đổi ngôn ngữ → text cứng thay đổi, data giữ nguyên

---

## 📌 Summary & Recommendation

Tài liệu UC249 v2.2 đạt mức **CONDITIONALLY READY (85.5/100)** — đã qua nhiều vòng Q&A và cải thiện đáng kể. Preconditions, Postconditions, Validation Rules, Error Flows, Acceptance Criteria đều đầy đủ và rõ ràng. QA **có thể bắt đầu** thiết kế test case cho toàn bộ các chức năng chính (chiếm ~85% coverage). Song song đó, BA cần trả lời **8 câu hỏi** (5 Medium + 3 Low) để QA hoàn thiện boundary test cases và integration test cases.

**Hành động tiếp theo:**
1. BA trả lời Q1–Q5 (Medium) để QA hoàn thiện boundary + integration tests
2. BA cập nhật version metadata (Q6)
3. Q7–Q8 (Low) có thể giải quyết sau, không block test design

---

*Báo cáo được tạo bởi: QC Auditor (skill qc-uc-review-MOBILE) | 12/05/2026*
