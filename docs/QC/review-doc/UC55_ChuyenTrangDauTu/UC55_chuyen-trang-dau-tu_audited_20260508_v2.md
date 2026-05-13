# BÁO CÁO ĐÁNH GIÁ MỨC ĐỘ SẴN SÀNG — UC55

**Tiêu đề:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư trên Mobile
**Ngày tạo:** 08/05/2026
**Tác giả:** QC Agent
**Phiên bản:** v2 (Re-audit)

| Thuộc tính         | Giá trị                                    |
| ------------------- | -------------------------------------------- |
| UC ID               | UC55                                         |
| Tên chức năng      | Xem chuyên trang đầu tư theo khu vực đầu tư |
| BA phụ trách       | huyen.dinh2                                  |
| Phân hệ            | Ứng dụng Di động (Mobile App)              |
| Phiên bản UC       | v1 — 06/05/2026                              |
| Tài liệu tham chiếu | UC55_ChuyenTrangDauTu.md, CMR_Mobile.md, 4 wireframe images |

---

## PHẦN 0 — FEATURE IDENTITY (Nhận diện tính năng)

| Thuộc tính           | Giá trị                                                                | Trạng thái |
| --------------------- | ------------------------------------------------------------------------ | ----------- |
| UC ID                 | UC55                                                                     | ✅ Complete |
| Tên chức năng        | Xem chuyên trang đầu tư theo khu vực đầu tư trên Mobile               | ✅ Complete |
| Phân hệ              | Ứng dụng Di động (Mobile App)                                          | ✅ Complete |
| Loại chức năng       | Khai thác thông tin đã công bố                                         | ✅ Complete |
| Giao diện             | Màn hình Mobile (Portrait)                                               | ✅ Complete |
| Chức năng đáp ứng UC | UC55 (Phụ lục XIV)                                                       | ✅ Complete |

**Đánh giá:** 5/5 — Thông tin nhận diện đầy đủ, rõ ràng.

---

## PHẦN 1 — OBJECTIVE & SCOPE (Mục tiêu & Phạm vi)

**Mục tiêu:**
Cho phép cá nhân, tổ chức xem thông tin đầu tư chuyên biệt theo từng tỉnh/thành phố: chỉ số kinh tế, tổng quan đầu tư, lĩnh vực khuyến khích, hạ tầng KCN, vị trí địa lý, thông tin liên hệ, và CTA đăng ký tư vấn.

**Phạm vi trong (In-scope):**
- Chọn tỉnh từ danh sách
- Xem chi tiết chuyên trang đầu tư theo tỉnh (Banner, KPI, Tổng quan, Lĩnh vực khuyến khích, Hạ tầng KCN, Vị trí địa lý, Liên hệ, CTA)

**Phạm vi ngoài (Exclusions):** ✅ Được nêu rõ
- Không bao gồm: so sánh thông tin giữa các tỉnh, tải xuống tài liệu/dữ liệu, chia sẻ nội dung chuyên trang.

**Truy cập:** Sidebar → Mục "Khu vực đầu tư"

**Đánh giá:** 5/5 — Mục tiêu, phạm vi trong/ngoài đều rõ ràng.

---

## PHẦN 2 — ACTORS & USER ROLES (Đối tượng sử dụng & Phân quyền)

| Thuộc tính              | Giá trị                                          | Trạng thái |
| ------------------------- | -------------------------------------------------- | ----------- |
| Đối tượng thực hiện    | Cá nhân / Tổ chức                                | ✅ Complete |
| Phân quyền              | Đã đăng nhập                                     | ✅ Complete |
| Phân biệt hành vi       | Hai nhóm đối tượng có cùng hành vi — không phân biệt | ✅ Complete |

**Đánh giá:** 10/10 — Actor và quyền truy cập được xác định rõ ràng. Đặc biệt UC đã nêu rõ hai nhóm đối tượng có cùng hành vi.

---

## PHẦN 3 — PRECONDITIONS & POSTCONDITIONS (Điều kiện tiên quyết & Hậu điều kiện)

| Loại            | Nội dung                                                              | Trạng thái |
| ----------------- | ---------------------------------------------------------------------- | ----------- |
| Preconditions     | Thiết bị có kết nối mạng ổn định, người dùng đã đăng nhập vào hệ thống | ✅ Complete |
| Postconditions    | Hệ thống hiển thị đầy đủ thông tin chuyên trang tỉnh/thành phố      | ✅ Complete |

**Đánh giá:** 10/10 — Điều kiện tiên quyết và hậu điều kiện đầy đủ, rõ ràng.

---

## PHẦN 4 — UI OBJECT INVENTORY & MAPPING

### Wireframe Cross-Check (Mới thêm trong v2)

| Wireframe | UC Match? | Findings |
| --------- | --------- | -------- |
| UC 55. Xem chuyên trang đầu tư theo khu vực đầu tư trên mobile - list chọn tỉnh, thành phố.png | ✅ Phù hợp | Layout danh sách tỉnh: header đỏ, nút back, section title, ô tìm kiếm, list items — khớp với UC55 Section 2.1 |
| UC 55. Xem chi tiết 1 chuyên trang.png | ✅ Phù hợp | Layout chi tiết: header + banner + sections theo scroll dọc — khớp với UC55 Section 2.2 |
| Container các lựa chọn chuyển tab trong 1 chuyên trang.png | ⚠️ Conflict | Wireframe gợi ý cơ chế **tab navigation** trong chi tiết chuyên trang. UC55 mô tả layout **scroll dọc liên tục** không có tab. **→ Q17** |
| Container các mục hiển thị trong chuyên trang.png | ✅ Phù hợp | Wireframe mô tả các mục hiển thị trong chuyên trang — cơ bản khớp với thứ tự sections trong UC55 |

### Màn hình 1: Danh sách chọn tỉnh / thành phố

| # | Component Name                 | Type                        | In UC? | Wireframe? | CMR Ref   | Notes |
| - | ------------------------------ | --------------------------- | ------ | ---------- | --------- | ----- |
| 1 | Nút Quay lại (←)              | Button (Icon)               | ✅     | ✅         | CMR-06    | ✅ Tham chiếu CMR-06 |
| 2 | Tiêu đề Header                | Label                       | ✅     | ✅         | CMR-06    | ✅ "Đầu tư theo khu vực" |
| 3 | Tiêu đề section               | Label                       | ✅     | ✅         | —         | ✅ "Chọn tỉnh / thành phố" |
| 4 | Ô tìm kiếm tỉnh              | Textbox (Search)            | ✅     | ✅         | CMR-01    | ✅ Tham chiếu CMR-01, CMR-14 |
| 5 | Danh sách tỉnh / thành phố   | List Item (Vertical Scroll) | ✅     | ✅         | CMR-13    | ✅ Tham chiếu CMR-13, 63 tỉnh, A–Z, không lazy load |

### Màn hình 2: Chi tiết Chuyên trang đầu tư theo tỉnh

| #  | Component Name                     | Type                           | In UC? | Wireframe? | CMR Ref   | Notes |
| -- | ---------------------------------- | ------------------------------ | ------ | ---------- | --------- | ----- |
| 1  | Nút Quay lại (←)                  | Button (Icon)                  | ✅     | ✅         | CMR-06    | ✅ Tham chiếu CMR-06 |
| 2  | Tiêu đề tỉnh (Header)            | Label                          | ✅     | ✅         | CMR-06    | ✅ Tên tỉnh đã chọn |
| 3  | Ảnh đại diện tỉnh (Banner)       | Image (Full Width)             | ✅     | ✅         | —         | ✅ Có xử lý lỗi ảnh |
| 4  | Thẻ Tăng trưởng GRDP             | Card (Icon + Value + Label)    | ✅     | ✅         | —         | ✅ Format số chi tiết |
| 5  | Thẻ Dân số                        | Card (Icon + Value + Label)    | ✅     | ✅         | —         | ✅ Format rút gọn K/M/B |
| 6  | Thẻ Vốn đầu tư                   | Card (Icon + Value + Label)    | ✅     | ✅         | —         | ✅ Format rút gọn K/M/B + $ |
| 7  | Thẻ Diện tích                     | Card (Icon + Value + Label)    | ✅     | ✅         | —         | ✅ Số nguyên + km² |
| 8  | Tiêu đề "Tổng quan đầu tư"      | Label                          | ✅     | ✅         | —         | ✅ |
| 9  | Nội dung tổng quan                | Text                           | ✅     | ✅         | —         | ✅ Plain text, full text, có empty state |
| 11 | Tiêu đề "Lĩnh vực khuyến khích" | Label                          | ✅     | ✅         | —         | ✅ |
| 12 | Danh sách lĩnh vực               | Chip List (Horizontal Scroll)  | ✅     | ✅         | —         | ✅ Dữ liệu động, có empty state |
| 13 | Tiêu đề "Hạ tầng KCN"           | Label                          | ✅     | ✅         | —         | ✅ |
| 14 | Danh sách KCN                     | List Card (Vertical)           | ✅     | ✅         | CMR-05    | ✅ Badge trạng thái Xanh/Vàng |
| 15 | Tiêu đề "Vị trí địa lý"        | Label                          | ✅     | ✅         | —         | ✅ |
| 16 | Bản đồ tỉnh                      | Map (Static Thumbnail)         | ✅     | ✅         | —         | ✅ Tap → mở ứng dụng bản đồ |
| 17 | Danh sách khoảng cách             | List (Icon + Text + Km)        | ✅     | ✅         | —         | ✅ Số nguyên km, có empty state |
| 18 | Tiêu đề "Liên hệ đầu tư"       | Label                          | ✅     | ✅         | —         | ✅ |
| 19 | Thẻ thông tin liên hệ            | Card (Orange Background)       | ✅     | ✅         | —         | ✅ ĐT + Email, xử lý null |
| 20 | Card CTA                          | Card (Dark Red Background)     | ✅     | ✅         | —         | ✅ Tiêu đề động theo tên tỉnh |
| 21 | Nút "Đăng ký tư vấn ngay"       | Button (Primary)               | ✅     | ✅         | —         | ⚡ Partial — hành vi [TBD] (Q1 — Deferred) |
| 22 | Nút "Cổng thông tin đầu tư"     | Button (Secondary)             | ✅     | ✅         | —         | ✅ Mở link ngoài, ẩn nếu URL null |

### CMR Cross-Check

| CMR    | Applicable? | UC References? | Status      | Notes |
| ------ | ----------- | -------------- | ----------- | ----- |
| CMR-01 | ✅ Ô tìm kiếm tỉnh | ✅ Có tham chiếu | ⚠️ Partial | UC mô tả "lọc real-time không cần nhấn Enter" nhưng **không đề cập debounce 3 giây**, **không đề cập State Persistence** (Q3, Q4 — Deferred) |
| CMR-04 | ❌ Không áp dụng | ✅ UC nêu rõ "không lazy load" | ✅ OK | UC ghi rõ 63 tỉnh tải 1 lần. Mâu thuẫn với CMR-04 liệt kê UC55 trong scope (Q6 — Deferred) |
| CMR-05 | ✅ Badge KCN | ⚡ Không tham chiếu trực tiếp | ⚠️ Partial | UC tự định nghĩa 2 badge phù hợp CMR-05 nhưng không tham chiếu |
| CMR-06 | ✅ Header | ✅ Có tham chiếu | ✅ OK | Cả 2 màn hình đều tham chiếu CMR-06 |
| CMR-07 | ✅ Xử lý lỗi | ✅ Có tham chiếu | ⚠️ Partial | UC có bảng xử lý lỗi nhưng **không đề cập timeout** (Q5 — Deferred) |
| CMR-13 | ✅ Pull to Refresh | ✅ Có tham chiếu | ⚠️ Partial | Có đề cập Pull to Refresh nhưng **không đề cập quy tắc "Không duplicate"** |
| CMR-14 | ✅ Empty state | ✅ Có tham chiếu | ✅ OK | Các section đều có định nghĩa empty state rõ ràng |
| CMR-16 | ✅ API Performance | ❌ Không tham chiếu | ⚠️ Missing | UC không đề cập thời gian phản hồi tối đa 10 giây (Q5 — Deferred) |

### Wireframe Conflict Summary

| ID | Wireframe | UC Section | Conflict Description | Impact | Status |
| -- | --------- | ---------- | -------------------- | ------ | ------ |
| WC-01 | Container các lựa chọn chuyển tab trong 1 chuyên trang.png | Section 2.2 | Wireframe gợi ý tab navigation, UC55 mô tả scroll dọc liên tục | Nếu có tab, toàn bộ cấu trúc navigation màn hình 2 thay đổi | ⚠️ → Q17 |

**Đánh giá:** 12/15 — UI Inventory đầy đủ. Wireframe analysis xác nhận cơ bản phù hợp với UC, nhưng phát hiện 1 conflict tiềm năng (tab vs scroll). Nút "Đăng ký tư vấn ngay" vẫn TBD. Một số CMR chưa tham chiếu đầy đủ. Các câu hỏi liên quan đã được Deferred.

---

## PHẦN 5 — OBJECT ATTRIBUTES & BEHAVIOR DEFINITION

### Bảng thuộc tính trường dữ liệu

| # | Field                        | Data Type        | Required? | Min | Max         | Format / Display Rule                                              |
| - | ---------------------------- | ---------------- | --------- | --- | ----------- | ------------------------------------------------------------------ |
| 1 | Ô tìm kiếm tỉnh            | Text (Search)    | Không     | —   | ⚠️ Missing  | Placeholder: "Tìm kiếm tỉnh, thành phố..." (Q12 — Deferred)     |
| 2 | Tên tỉnh (list item)        | Text             | —         | —   | ⚠️ Missing  | Sắp xếp A–Z, truncate rule missing (Q7 — Deferred)               |
| 3 | Banner ảnh tỉnh             | Image            | —         | —   | —           | Full width, chiều cao cố định, overlay text tên tỉnh + tagline   |
| 4 | Tăng trưởng GRDP            | Decimal          | —         | —   | —           | 1 chữ số thập phân, đơn vị %, null → "--"                        |
| 5 | Dân số                       | Integer          | —         | —   | —           | Rút gọn K/M/B, 1 chữ số thập phân, null → "--"                   |
| 6 | Vốn đầu tư                  | Decimal          | —         | —   | —           | $, rút gọn K/M/B, 1 chữ số thập phân, null → "--"                |
| 7 | Diện tích                    | Integer          | —         | —   | —           | Số nguyên + dấu phẩy ngăn cách nghìn + km², null → "--"          |
| 8 | Nội dung tổng quan          | Text (Plain)     | —         | —   | ⚠️ Missing  | Plain text, full text, null → "Không có dữ liệu"                 |
| 9 | Lĩnh vực khuyến khích       | Chip[] (Dynamic) | —         | —   | ⚠️ Missing  | Pill chip, viền vàng/cam, rỗng → "Không có dữ liệu" (Q7 — Deferred) |
| 10| Tên KCN                     | Text             | —         | —   | ⚠️ Missing  | Font đậm, truncate rule missing (Q7 — Deferred)                   |
| 11| Diện tích KCN               | Integer          | —         | —   | —           | Số nguyên + đơn vị ha                                              |
| 12| Badge trạng thái KCN        | Badge            | —         | —   | —           | Chỉ 2 loại: Xanh "Sẵn sàng", Vàng "Đang quy hoạch"             |
| 13| Bản đồ tỉnh                 | Image (Static)   | —         | —   | —           | Full width, chiều cao cố định                                      |
| 14| Mô tả địa danh             | Text             | —         | —   | ⚠️ Missing  | Truncate rule missing (Q7 — Deferred)                              |
| 15| Khoảng cách                  | Integer          | —         | —   | —           | Số nguyên + km, làm tròn                                          |
| 16| Số điện thoại               | Text             | —         | —   | —           | Static text, null → "--"                                           |
| 17| Email                        | Text             | —         | —   | —           | Static text, null → "--"                                           |
| 18| URL Cổng thông tin          | URL              | —         | —   | —           | Mở browser, null → ẩn nút                                        |
| 19| Tagline banner              | Text             | —         | —   | ⚠️ Missing  | Xử lý khi null/rỗng chưa xác định (Q9 — Deferred)               |

### Interaction Matrix

| # | Component                        | Tap Action                                                | State     |
| - | -------------------------------- | --------------------------------------------------------- | --------- |
| 1 | Nút Quay lại (Màn hình 1)       | Quay về màn hình trước (CMR-06)                          | Enabled   |
| 2 | Ô tìm kiếm                      | Focus → nhập text → lọc real-time                        | Enabled   |
| 3 | List item tỉnh                  | Điều hướng đến chi tiết tỉnh                            | Enabled   |
| 4 | Nút Quay lại (Màn hình 2)       | Quay về danh sách tỉnh (CMR-06)                          | Enabled   |
| 5 | Thẻ KPI (4 thẻ)                 | Không tap được                                            | Read-only |
| 6 | Chip lĩnh vực                   | Không tap được                                            | Read-only |
| 7 | Card KCN                         | Không tap được                                            | Read-only |
| 8 | Bản đồ tỉnh                     | Tap → Mở ứng dụng bản đồ mặc định (geo URI)            | Enabled   |
| 9 | Danh sách khoảng cách            | Không tap được                                            | Read-only |
| 10| Thẻ liên hệ                     | Không tap được                                            | Read-only |
| 11| Nút "Đăng ký tư vấn ngay"      | ⚡ **[TBD]** — Chưa xác định (Q1 — Deferred)            | ⚠️ TBD    |
| 12| Nút "Cổng thông tin đầu tư"    | Mở link web ngoài trên browser mặc định                  | Enabled   |

### Edge Case Checklist

**Group A — Extreme Data States:**

| Edge Case                              | UC Coverage | Notes |
| -------------------------------------- | ----------- | ----- |
| Tên tỉnh quá dài (overflow)          | ⚠️ Missing  | Q7 — Deferred |
| Nội dung tổng quan rất dài           | ✅ Covered  | UC nêu "hiển thị full text, không giới hạn số dòng" |
| KPI value = 0                          | ⚠️ Missing  | UC chỉ nêu null → "--", không nêu rõ xử lý khi giá trị = 0 |
| KPI value rất lớn (ví dụ 999.9B)     | ⚠️ Missing  | UC không đề cập giới hạn trên |
| Danh sách KCN = 0 item               | ✅ Covered  | UC nêu rõ "Không có dữ liệu" |
| Danh sách KCN rất nhiều item         | ⚠️ Missing  | UC không nêu giới hạn hiển thị |
| Chip lĩnh vực text rất dài           | ⚠️ Missing  | Q7 — Deferred |
| Tagline banner null                    | ⚠️ Missing  | Q9 — Deferred |
| Tên KCN quá dài                       | ⚠️ Missing  | Q7 — Deferred |
| Mô tả địa danh quá dài              | ⚠️ Missing  | Q7 — Deferred |

**Group B — Network & API States:**

| Edge Case                                          | UC Coverage | Notes |
| -------------------------------------------------- | ----------- | ----- |
| API chậm (> 5s < 10s)                             | ✅ Covered  | UC nêu skeleton loading |
| Timeout (> 10s)                                    | ⚠️ Missing  | Q5 — Deferred |
| Partial API failure (1 section fail, các section khác OK) | ⚠️ Missing | Q8 — Deferred |
| Mất mạng giữa chừng khi đang tải                | ⚠️ Missing  | UC không đề cập |
| Pull to Refresh fail                               | ⚡ Partial  | Tham chiếu CMR-13 nhưng không nêu hành vi cụ thể khi refresh thất bại |

**Group C — Abnormal User Interactions:**

| Edge Case                                         | UC Coverage | Notes |
| ------------------------------------------------- | ----------- | ----- |
| Double tap vào tỉnh (rapid consecutive taps)     | ⚠️ Missing  | Q11 — Deferred |
| Physical Back button (Android)                    | ⚠️ Missing  | UC không đề cập |
| Screen rotation (landscape)                       | ⚠️ Missing  | Q13 — Deferred |

**Group D — Permissions & Session:**

| Edge Case                             | UC Coverage | Notes |
| ------------------------------------- | ----------- | ----- |
| Session hết hạn khi đang xem        | ⚠️ Missing  | Q10 — Deferred |
| Mở lại app sau force-close           | ⚠️ Missing  | UC không đề cập |
| Người dùng chưa đăng nhập cố truy cập | ⚠️ Missing | UC nêu precondition nhưng không nêu xử lý |

**Đánh giá:** 14/20 — Thuộc tính và hành vi cơ bản mô tả khá tốt. Các câu hỏi về edge cases đã được Deferred — điểm số giữ nguyên do không có câu trả lời mới từ BA.

---

## PHẦN 6 — FUNCTIONAL LOGIC & WORKFLOW DECOMPOSITION

### Function 1: Xem danh sách tỉnh

**MAIN FLOW (Happy Path):**
1. Người dùng vào Sidebar → Mục "Khu vực đầu tư"
2. Hệ thống gọi API danh mục → Hiển thị skeleton loading
3. API phản hồi thành công → Hiển thị danh sách 63 tỉnh/thành phố, sắp xếp A–Z
4. Người dùng cuộn danh sách, tap vào tỉnh → Điều hướng sang chi tiết

**ALTERNATIVE FLOWS:**
- [Alt-1] Tìm kiếm: Nhập từ khóa → Lọc real-time → Hiển thị kết quả phù hợp
- [Alt-2] Xóa từ khóa tìm kiếm → Danh sách trở về đầy đủ
- [Alt-3] Pull to Refresh → Gọi lại API danh mục → Cập nhật danh sách

**EXCEPTION & ERROR FLOWS:**
- [Err-1] Lỗi mạng → "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + Nút "Thử lại"
- [Err-2] Lỗi API 500 → "Hệ thống đang bận. Vui lòng thử lại sau."
- [Err-3] Tìm kiếm không có kết quả → "Không tìm thấy kết quả." (CMR-14)

**BUSINESS RULES:**
- BR-01: Danh sách tỉnh lấy từ danh mục hệ thống, không hard-code
- BR-02: Tải toàn bộ 63 tỉnh trong 1 lần, không lazy load
- BR-03: Sắp xếp A–Z
- BR-04: Tìm kiếm real-time, không cần Enter (CMR-01) — debounce behavior chưa xác nhận (Q3 — Deferred)

**UI/UX FEEDBACK:**
- Loading: Skeleton loading khi tải danh sách
- Empty state tìm kiếm: "Không tìm thấy kết quả."

**Trạng thái:** ✅ Luồng cơ bản đầy đủ

### Function 2: Xem chi tiết chuyên trang tỉnh

**MAIN FLOW (Happy Path):**
1. Người dùng tap vào tỉnh từ danh sách → Điều hướng sang chi tiết
2. Hệ thống gọi API chi tiết theo mã tỉnh → Skeleton loading từng section
3. API phản hồi → Hiển thị: Banner → KPI → Tổng quan → Lĩnh vực → KCN → Vị trí → Liên hệ → CTA
4. Người dùng cuộn dọc để xem toàn bộ nội dung

**ALTERNATIVE FLOWS:**
- [Alt-1] Tap bản đồ → Mở ứng dụng bản đồ mặc định qua geo URI
- [Alt-2] Tap "Cổng thông tin đầu tư" → Mở link web trên browser mặc định
- [Alt-3] Tap "Đăng ký tư vấn ngay" → **[TBD]** (Q1 — Deferred)
- [Alt-4] Pull to Refresh → Gọi lại API chi tiết → Làm mới tất cả section
- [Alt-5] Tap Quay lại → Quay về danh sách tỉnh

**EXCEPTION & ERROR FLOWS:**
- [Err-1] Lỗi mạng → "Không thể kết nối..." + Nút "Thử lại"
- [Err-2] Lỗi API 500 → "Hệ thống đang bận..."
- [Err-3] HTTP 404 → "Nội dung không tồn tại hoặc đã bị xóa." → Quay lại danh sách
- [Err-4] Ảnh banner không load được → Hiển thị hình loading + overlay text vẫn hiển thị

**BUSINESS RULES:**
- BR-05: Dữ liệu KPI, KCN, lĩnh vực, khoảng cách là dữ liệu động theo tỉnh, lấy từ API
- BR-06: KPI null → hiển thị "--"
- BR-07: Section rỗng (tổng quan, lĩnh vực, KCN) → hiển thị "Không có dữ liệu"
- BR-08: Danh sách khoảng cách rỗng → ẩn hoàn toàn (bản đồ vẫn hiển thị)
- BR-09: Liên hệ thiếu ĐT hoặc email → hiển thị nhãn + "--"
- BR-10: URL Cổng thông tin null → ẩn hoàn toàn nút
- BR-11: Format số KPI theo quy tắc riêng (GRDP: %, Dân số/Vốn: K/M/B, Diện tích: số nguyên km²) — xung đột với CMR-11 (Q16 — Deferred)
- BR-12: Thẻ KPI cuộn ngang
- BR-13: Badge KCN chỉ có 2 loại: "Sẵn sàng" (xanh), "Đang quy hoạch" (vàng)

**UI/UX FEEDBACK:**
- Loading: Skeleton loading từng section
- Empty state: "Không có dữ liệu" cho các section rỗng

**Trạng thái:** ⚡ Partial — Luồng cơ bản tốt, nhưng thiếu timeout handling, partial failure, nút CTA [TBD]. Các câu hỏi đã Deferred.

**Đánh giá:** 16/20 — Luồng chính và phụ mô tả chi tiết. Trừ điểm vì: nút "Đăng ký tư vấn ngay" [TBD], thiếu timeout flow, thiếu partial API failure response. Điểm giữ nguyên do không có câu trả lời mới.

---

## PHẦN 7 — FUNCTIONAL INTEGRATION ANALYSIS

| Liên kết                     | UC liên quan | Mô tả                                                    | Trạng thái |
| ----------------------------- | ------------- | ---------------------------------------------------------- | ----------- |
| Đăng nhập (Precondition)     | UC256         | Người dùng phải đăng nhập trước khi truy cập UC55        | ✅ Đề cập  |
| Sidebar Navigation           | UC1 (*)       | Truy cập từ Sidebar → "Khu vực đầu tư"                  | ⚡ Partial — không tham chiếu tường minh UC nào quản lý Sidebar |
| Danh mục tỉnh (Catalog API)  | Hệ thống chung | Dữ liệu tỉnh lấy từ API danh mục, dùng chung           | ✅ Đề cập  |
| Đăng ký tư vấn (CTA)         | ⚠️ Unknown   | Nút "Đăng ký tư vấn ngay" → [TBD] (Q1 — Deferred)      | ⚠️ Missing |
| Cổng thông tin đầu tư        | External link | Mở website ngoài, URL lấy từ API theo mã tỉnh           | ✅ Đề cập  |
| Ứng dụng bản đồ              | External app  | Geo URI scheme → mở app bản đồ mặc định thiết bị        | ✅ Đề cập  |

**Đánh giá:** 7/10 — Phân tích liên kết cơ bản đầy đủ. Trừ điểm vì CTA chưa xác định UC đích, Sidebar navigation không tham chiếu rõ ràng. Điểm giữ nguyên.

---

## PHẦN 8 — ACCEPTANCE CRITERIA (Tiêu chí chấp nhận)

| AC  | Nội dung                                                                                                             | Testable? | Notes |
| --- | -------------------------------------------------------------------------------------------------------------------- | --------- | ----- |
| AC1 | Dữ liệu hiển thị (tổng quan, KPI, lĩnh vực, KCN, khoảng cách, liên hệ) phải khớp 100% với API cho từng tỉnh. Nội dung tổng quan full text. | ✅ Yes    | Đo lường được, cần có API response để verify |
| AC2 | Bấm vào bản đồ phải mở ứng dụng bản đồ mặc định và hiển thị đúng tọa độ tỉnh.                               | ✅ Yes    | Cần xác nhận tọa độ trung tâm từ API |
| AC3 | Thẻ KPI hiển thị định dạng số đúng luật (K, M, B; dấu phẩy ngăn cách).                                        | ✅ Yes    | Có quy tắc format cụ thể |
| AC4 | Các section empty state hiển thị "Không có dữ liệu" hoặc "--" theo thiết kế nếu API không trả dữ liệu.       | ✅ Yes    | Có quy tắc rõ ràng cho từng section |

**Nhận xét:**
- AC đã có nhưng chỉ có 4 AC, thiếu AC cho: tìm kiếm tỉnh, pull to refresh, xử lý lỗi, nút CTA, navigation back, loading states.
- Các AC hiện tại đều testable và đo lường được.

**Đánh giá:** 7/10 — AC hiện tại chất lượng tốt, đo lường được. Tuy nhiên số lượng AC chưa đủ bao phủ toàn bộ luồng chức năng. Điểm giữ nguyên.

---

## PHẦN 9 — NON-FUNCTIONAL REQUIREMENTS (Yêu cầu phi chức năng)

| NFR              | UC Coverage | Notes |
| ---------------- | ----------- | ----- |
| Performance      | ⚠️ Missing  | Không đề cập thời gian phản hồi (Q5 — Deferred) |
| Security         | ⚡ Partial  | Yêu cầu đăng nhập, nhưng không nêu cơ chế bảo mật API |
| Compatibility    | ⚡ Partial  | Nêu "Portrait" nhưng không nêu min OS, min screen size (Q13 — Deferred) |
| Accessibility    | ⚠️ Missing  | Không đề cập accessibility |
| Offline support  | ⚠️ Missing  | Không đề cập cache/offline viewing |
| Deep linking     | ⚠️ Missing  | Q14 — Deferred |

**Đánh giá:** 2/5 — Chỉ có phân quyền đăng nhập cơ bản, thiếu phần lớn NFR. Điểm giữ nguyên.

---

## 📊 AUDIT SUMMARY

| #      | Knowledge Area                             | Max Pts | v1 Score | v2 Score | Status     |
| ------ | ------------------------------------------ | ------- | -------- | -------- | ---------- |
| 1      | Feature Identity                           | 5       | 5/5      | 5/5      | ✅ Complete |
| 2      | Objective & Scope                          | 5       | 5/5      | 5/5      | ✅ Complete |
| 3      | Actors & User Roles                        | 10      | 10/10    | 10/10    | ✅ Complete |
| 4      | Preconditions & Postconditions             | 10      | 10/10    | 10/10    | ✅ Complete |
| 5      | UI Object Inventory & Mapping              | 15      | 12/15    | 12/15    | ⚡ Partial  |
| 6      | Object Attributes & Behavior Definition    | 20      | 14/20    | 14/20    | ⚡ Partial  |
| 7      | Functional Logic & Workflow Decomposition  | 20      | 16/20    | 16/20    | ⚡ Partial  |
| 8      | Functional Integration Analysis            | 10      | 7/10     | 7/10     | ⚡ Partial  |
| 9      | Acceptance Criteria                        | 10      | 7/10     | 7/10     | ⚡ Partial  |
| 10     | Non-functional Requirements                | 5       | 2/5      | 2/5      | ⚡ Partial  |
| **Total** |                                         | **110** |  **88/110** | **88/110** | **80.0/100** |

**Verdict:** ⚡ **CONDITIONALLY READY** (80.0/100)

> Điểm số v2 giữ nguyên so với v1 (88/110 = 80.0/100) do tất cả 16 câu hỏi đều được Deferred — không có câu trả lời mới từ BA để cải thiện điểm. Wireframe analysis xác nhận cơ bản phù hợp với UC nhưng phát hiện thêm 1 conflict mới (Q17: tab vs scroll).
>
> QA có thể tiếp tục thiết kế test case cho các luồng đã rõ ràng. Các mục flagged cần được BA giải quyết song song.

---

## 📋 UNIFIED GAP & QUESTION REPORT

| ID  | Priority | Ref | Question | Why It Matters | Status |
| --- | -------- | --- | -------- | -------------- | ------ |
| Q1  | High     | Section 2.2, #21 | Nút "Đăng ký tư vấn ngay" [TBD]. Luồng/màn hình đích? | CTA chính, không thể thiết kế test case | Deferred |
| Q2  | High     | Section 2.2, #7 | KPI NULL → hiển thị 4 thẻ đầy đủ hay chỉ thẻ có dữ liệu? | UI layout cho KPI empty state | Deferred |
| Q3  | Medium   | CMR-01 vs UC55 §2.1 #4 | Debounce 3 giây vs "lọc real-time"? | Mâu thuẫn UC vs CMR | Deferred |
| Q4  | Medium   | CMR-01 vs UC55 | State Persistence cho ô tìm kiếm tỉnh? | Navigation back & state management | Deferred |
| Q5  | Medium   | CMR-07/CMR-16 vs UC55 §3.3 | Timeout handling khi API > 10 giây? | Thiếu timeout scenario | Deferred |
| Q6  | Medium   | CMR-04 vs UC55 §2.1 #5 | CMR-04 liệt kê UC55 nhưng UC55 "không lazy load"? | Mâu thuẫn CMR-04 vs UC55 | Deferred |
| Q7  | Medium   | Section 2.2 | Quy tắc truncate/wrap cho text overflow? | Vỡ layout trên thiết bị nhỏ | Deferred |
| Q8  | Medium   | Section 2.2 | Partial API failure — per-section hay toàn màn hình? | UX và test design | Deferred |
| Q9  | Medium   | Section 2.2, #3 | Tagline banner null → xử lý overlay thế nào? | Banner empty state | Deferred |
| Q10 | Medium   | N/A (Missing) | Session hết hạn khi đang xem → xử lý? | Session timeout behavior | Deferred |
| Q11 | Medium   | Section 2.1, #5 | Chặn double-tap vào item tỉnh? | Rapid tap → crash/navigation lỗi | Deferred |
| Q12 | Low      | Section 2.1, #4 | Max length ô tìm kiếm? CMR-11: 500 ký tự? | Input validation boundary | Deferred |
| Q13 | Low      | N/A (Missing) | Khóa portrait hay cho phép landscape? | Testing trên thiết bị xoay | Deferred |
| Q14 | Low      | N/A (Missing) | Deep link vào chuyên trang tỉnh? | Integration & notification linking | Deferred |
| Q15 | Low      | Section 2.2, #16 | Không có app bản đồ → xử lý thế nào? | Android không có Google Maps | Deferred |
| Q16 | Low      | Section 2.2: KPI format | UC55 format riêng vs CMR-11 format? | Expected result chính xác | Deferred |
| Q17 | Medium   | Wireframe "Container tab" vs UC55 §2.2 | **[MỚI]** Wireframe gợi ý tab navigation, UC55 mô tả scroll dọc liên tục. Design cuối cùng? | Thay đổi toàn bộ cấu trúc navigation màn hình 2 | Open |

---

## 🟢 WHAT'S GOOD

1. **Mô tả giao diện chi tiết:** UC55 cung cấp bảng mô tả UI rất chi tiết cho cả 2 màn hình, với đầy đủ kiểu trường, giá trị mặc định, và quy tắc hiển thị/hành động.
2. **Format số KPI rõ ràng:** Quy tắc rút gọn số K/M/B được định nghĩa cụ thể cho từng thẻ KPI với ví dụ minh họa.
3. **Empty state đầy đủ:** Mỗi section đều có quy tắc xử lý khi dữ liệu rỗng.
4. **Xử lý lỗi ảnh:** Trường hợp ảnh banner không load được có xử lý rõ ràng.
5. **Exclusions rõ ràng:** Phạm vi ngoài UC được liệt kê cụ thể.
6. **Tham chiếu CMR tốt:** UC tham chiếu CMR-01, CMR-06, CMR-07, CMR-13, CMR-14 tại các điểm phù hợp.
7. **Dữ liệu động:** UC nhấn mạnh rõ ràng việc lấy dữ liệu từ API, không hard-code.
8. **[v2] Wireframe cơ bản phù hợp:** 3/4 wireframe xác nhận layout khớp với UC55. Chỉ 1 wireframe có potential conflict.

---

## 🧪 TESTABILITY OUTLOOK

**What CAN be tested now:**
- Luồng xem danh sách tỉnh (hiển thị 63 tỉnh, sắp xếp A–Z, skeleton loading)
- Tìm kiếm tỉnh (lọc real-time, xóa từ khóa, không có kết quả)
- Luồng xem chi tiết chuyên trang (navigation, hiển thị 8 sections)
- Format số KPI (GRDP %, Dân số K/M/B, Vốn $K/M/B, Diện tích km²)
- Empty state cho tất cả sections
- Banner ảnh + overlay text + fallback khi ảnh lỗi
- Badge trạng thái KCN (Sẵn sàng / Đang quy hoạch)
- Tap bản đồ → mở ứng dụng bản đồ
- Nút "Cổng thông tin đầu tư" → mở link ngoài (+ ẩn khi URL null)
- Thẻ liên hệ (ĐT + Email, xử lý null → "--")
- Navigation back (CMR-06)
- Pull to Refresh cả 2 màn hình
- Lỗi mạng, API 500, 404

**What CANNOT be tested yet (blocked by gaps):**
- Nút "Đăng ký tư vấn ngay" (Q1 — Deferred)
- Timeout scenario (Q5 — Deferred)
- Partial API failure (Q8 — Deferred)
- Session expiry behavior (Q10 — Deferred)
- Tab vs Scroll navigation (Q17 — Open, mới phát hiện từ wireframe)

---

## 📌 SUMMARY & RECOMMENDATION

**Verdict:** ⚡ **CONDITIONALLY READY — 80.0/100** (không thay đổi so với v1)

UC55 vẫn ở trạng thái CONDITIONALLY READY với 80.0/100. Điểm số không thay đổi do tất cả 16 câu hỏi từ v1 đều được Deferred — BA chưa cung cấp câu trả lời.

**Thay đổi chính trong v2:**
- **Wireframe analysis:** Đã phân tích 4 wireframe images. 3/4 wireframe xác nhận layout phù hợp với UC55.
- **Phát hiện mới:** 1 wireframe ("Container các lựa chọn chuyển tab") gợi ý cơ chế tab navigation, trong khi UC55 mô tả scroll dọc liên tục → Thêm Q17 (Medium, Open).
- **Question backlog:** 16 câu hỏi cũ → Deferred. 1 câu hỏi mới (Q17) → Open. Tổng: 17 câu hỏi (16 Deferred + 1 Open).

**Khuyến nghị:** Tiếp tục thiết kế test case cho các phần đã rõ ràng (~80% chức năng). Ưu tiên BA giải đáp: Q1 (CTA flow), Q17 (tab vs scroll — mới), Q3 (debounce), Q5 (timeout), Q7 (truncate), Q8 (partial failure).

---

## 📝 CHANGELOG

| Version | Date       | Changes |
| ------- | ---------- | ------- |
| v1      | 08/05/2026 | First audit — Score 88/110 (80.0/100), CONDITIONALLY READY. 16 open questions (Q1–Q16). |
| v2      | 08/05/2026 | Re-audit (Defer all). Wireframe analysis added (4 images). Wireframe Cross-Check table added to PHẦN 4. Wireframe Conflict Summary added. Q1–Q16 deferred. New Q17 added (tab vs scroll conflict from wireframe). UI Inventory updated with Wireframe column. Score unchanged: 88/110 (80.0/100). |
