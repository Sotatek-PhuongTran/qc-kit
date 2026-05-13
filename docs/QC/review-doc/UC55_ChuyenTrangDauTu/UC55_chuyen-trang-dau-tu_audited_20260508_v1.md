# BÁO CÁO ĐÁNH GIÁ MỨC ĐỘ SẴN SÀNG — UC55

**Tiêu đề:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư trên Mobile
**Ngày tạo:** 08/05/2026
**Tác giả:** QC Agent
**Phiên bản:** v1

| Thuộc tính         | Giá trị                                    |
| ------------------- | -------------------------------------------- |
| UC ID               | UC55                                         |
| Tên chức năng      | Xem chuyên trang đầu tư theo khu vực đầu tư |
| BA phụ trách       | huyen.dinh2                                  |
| Phân hệ            | Ứng dụng Di động (Mobile App)              |
| Phiên bản UC       | v1 — 06/05/2026                              |
| Tài liệu tham chiếu | UC55_ChuyenTrangDauTu.md, CMR_Mobile.md     |

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

### Màn hình 1: Danh sách chọn tỉnh / thành phố

| # | Component Name                 | Type                        | In UC? | CMR Ref   | Notes |
| - | ------------------------------ | --------------------------- | ------ | --------- | ----- |
| 1 | Nút Quay lại (←)              | Button (Icon)               | ✅     | CMR-06    | ✅ Tham chiếu CMR-06 |
| 2 | Tiêu đề Header                | Label                       | ✅     | CMR-06    | ✅ "Đầu tư theo khu vực" |
| 3 | Tiêu đề section               | Label                       | ✅     | —         | ✅ "Chọn tỉnh / thành phố" |
| 4 | Ô tìm kiếm tỉnh              | Textbox (Search)            | ✅     | CMR-01    | ✅ Tham chiếu CMR-01, CMR-14 |
| 5 | Danh sách tỉnh / thành phố   | List Item (Vertical Scroll) | ✅     | CMR-13    | ✅ Tham chiếu CMR-13, 63 tỉnh, A–Z, không lazy load |

### Màn hình 2: Chi tiết Chuyên trang đầu tư theo tỉnh

| #  | Component Name                     | Type                           | In UC? | CMR Ref   | Notes |
| -- | ---------------------------------- | ------------------------------ | ------ | --------- | ----- |
| 1  | Nút Quay lại (←)                  | Button (Icon)                  | ✅     | CMR-06    | ✅ Tham chiếu CMR-06 |
| 2  | Tiêu đề tỉnh (Header)            | Label                          | ✅     | CMR-06    | ✅ Tên tỉnh đã chọn |
| 3  | Ảnh đại diện tỉnh (Banner)       | Image (Full Width)             | ✅     | —         | ✅ Có xử lý lỗi ảnh |
| 4  | Thẻ Tăng trưởng GRDP             | Card (Icon + Value + Label)    | ✅     | —         | ✅ Format số chi tiết |
| 5  | Thẻ Dân số                        | Card (Icon + Value + Label)    | ✅     | —         | ✅ Format rút gọn K/M/B |
| 6  | Thẻ Vốn đầu tư                   | Card (Icon + Value + Label)    | ✅     | —         | ✅ Format rút gọn K/M/B + $ |
| 7  | Thẻ Diện tích                     | Card (Icon + Value + Label)    | ✅     | —         | ✅ Số nguyên + km² |
| 8  | Tiêu đề "Tổng quan đầu tư"      | Label                          | ✅     | —         | ✅ |
| 9  | Nội dung tổng quan                | Text                           | ✅     | —         | ✅ Plain text, full text, có empty state |
| 11 | Tiêu đề "Lĩnh vực khuyến khích" | Label                          | ✅     | —         | ✅ |
| 12 | Danh sách lĩnh vực               | Chip List (Horizontal Scroll)  | ✅     | —         | ✅ Dữ liệu động, có empty state |
| 13 | Tiêu đề "Hạ tầng KCN"           | Label                          | ✅     | —         | ✅ |
| 14 | Danh sách KCN                     | List Card (Vertical)           | ✅     | CMR-05    | ✅ Badge trạng thái Xanh/Vàng |
| 15 | Tiêu đề "Vị trí địa lý"        | Label                          | ✅     | —         | ✅ |
| 16 | Bản đồ tỉnh                      | Map (Static Thumbnail)         | ✅     | —         | ✅ Tap → mở ứng dụng bản đồ |
| 17 | Danh sách khoảng cách             | List (Icon + Text + Km)        | ✅     | —         | ✅ Số nguyên km, có empty state |
| 18 | Tiêu đề "Liên hệ đầu tư"       | Label                          | ✅     | —         | ✅ |
| 19 | Thẻ thông tin liên hệ            | Card (Orange Background)       | ✅     | —         | ✅ ĐT + Email, xử lý null |
| 20 | Card CTA                          | Card (Dark Red Background)     | ✅     | —         | ✅ Tiêu đề động theo tên tỉnh |
| 21 | Nút "Đăng ký tư vấn ngay"       | Button (Primary)               | ✅     | —         | ⚡ Partial — hành vi [TBD] |
| 22 | Nút "Cổng thông tin đầu tư"     | Button (Secondary)             | ✅     | —         | ✅ Mở link ngoài, ẩn nếu URL null |

### CMR Cross-Check

| CMR    | Applicable? | UC References? | Status      | Notes |
| ------ | ----------- | -------------- | ----------- | ----- |
| CMR-01 | ✅ Ô tìm kiếm tỉnh | ✅ Có tham chiếu | ⚠️ Partial | UC mô tả "lọc real-time không cần nhấn Enter" nhưng **không đề cập debounce 3 giây**, **không đề cập State Persistence** (giữ trạng thái tìm kiếm khi quay lại) |
| CMR-04 | ❌ Không áp dụng | ✅ UC nêu rõ "không lazy load" | ✅ OK | UC ghi rõ 63 tỉnh tải 1 lần, phù hợp với việc không dùng lazy load. Tuy nhiên CMR-04 liệt kê UC55 trong scope |
| CMR-05 | ✅ Badge KCN | ⚡ Không tham chiếu trực tiếp | ⚠️ Partial | UC tự định nghĩa 2 badge (Xanh lá "Sẵn sàng", Vàng "Đang quy hoạch") — phù hợp quy tắc CMR-05 nhưng không tham chiếu |
| CMR-06 | ✅ Header | ✅ Có tham chiếu | ✅ OK | Cả 2 màn hình đều tham chiếu CMR-06 |
| CMR-07 | ✅ Xử lý lỗi | ✅ Có tham chiếu | ⚠️ Partial | UC có bảng xử lý lỗi (mạng, 500, 404) nhưng **không đề cập timeout** (CMR-07 quy định timeout 10 giây + thông báo + nút Thử lại). CMR-16 cũng áp dụng |
| CMR-13 | ✅ Pull to Refresh | ✅ Có tham chiếu | ⚠️ Partial | Có đề cập Pull to Refresh cho cả 2 màn hình, nhưng **không đề cập quy tắc "Không duplicate"** khi đang loading |
| CMR-14 | ✅ Empty state | ✅ Có tham chiếu | ✅ OK | Các section đều có định nghĩa empty state rõ ràng |
| CMR-16 | ✅ API Performance | ❌ Không tham chiếu | ⚠️ Missing | UC không đề cập thời gian phản hồi tối đa 10 giây cho API |

**Đánh giá:** 12/15 — UI Inventory đầy đủ, tuy nhiên có một số điểm chưa tham chiếu đầy đủ CMR và nút "Đăng ký tư vấn ngay" còn TBD.

---

## PHẦN 5 — OBJECT ATTRIBUTES & BEHAVIOR DEFINITION

### Bảng thuộc tính trường dữ liệu

| # | Field                        | Data Type        | Required? | Min | Max         | Format / Display Rule                                              |
| - | ---------------------------- | ---------------- | --------- | --- | ----------- | ------------------------------------------------------------------ |
| 1 | Ô tìm kiếm tỉnh            | Text (Search)    | Không     | —   | ⚠️ Missing  | Placeholder: "Tìm kiếm tỉnh, thành phố..."                      |
| 2 | Tên tỉnh (list item)        | Text             | —         | —   | ⚠️ Missing  | Sắp xếp A–Z, không đề cập truncate nếu tên dài                  |
| 3 | Banner ảnh tỉnh             | Image            | —         | —   | —           | Full width, chiều cao cố định, overlay text tên tỉnh + tagline   |
| 4 | Tăng trưởng GRDP            | Decimal          | —         | —   | —           | 1 chữ số thập phân, đơn vị %, null → "--"                        |
| 5 | Dân số                       | Integer          | —         | —   | —           | Rút gọn K/M/B, 1 chữ số thập phân, null → "--"                   |
| 6 | Vốn đầu tư                  | Decimal          | —         | —   | —           | $, rút gọn K/M/B, 1 chữ số thập phân, null → "--"                |
| 7 | Diện tích                    | Integer          | —         | —   | —           | Số nguyên + dấu phẩy ngăn cách nghìn + km², null → "--"          |
| 8 | Nội dung tổng quan          | Text (Plain)     | —         | —   | ⚠️ Missing  | Plain text, full text, không bold/link/list, null → "Không có dữ liệu" |
| 9 | Lĩnh vực khuyến khích       | Chip[] (Dynamic) | —         | —   | ⚠️ Missing  | Pill chip, viền vàng/cam, rỗng → "Không có dữ liệu"             |
| 10| Tên KCN                     | Text             | —         | —   | ⚠️ Missing  | Font đậm, không đề cập truncate                                   |
| 11| Diện tích KCN               | Integer          | —         | —   | —           | Số nguyên + đơn vị ha                                              |
| 12| Badge trạng thái KCN        | Badge            | —         | —   | —           | Chỉ 2 loại: Xanh "Sẵn sàng", Vàng "Đang quy hoạch"             |
| 13| Bản đồ tỉnh                 | Image (Static)   | —         | —   | —           | Full width, chiều cao cố định                                      |
| 14| Mô tả địa danh             | Text             | —         | —   | ⚠️ Missing  | Không đề cập truncate nếu text dài                                |
| 15| Khoảng cách                  | Integer          | —         | —   | —           | Số nguyên + km, làm tròn                                          |
| 16| Số điện thoại               | Text             | —         | —   | —           | Static text, null → "--"                                           |
| 17| Email                        | Text             | —         | —   | —           | Static text, null → "--"                                           |
| 18| URL Cổng thông tin          | URL              | —         | —   | —           | Mở browser, null → ẩn nút                                        |

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
| 11| Nút "Đăng ký tư vấn ngay"      | ⚡ **[TBD]** — Chưa xác định luồng đăng ký tư vấn      | ⚠️ TBD    |
| 12| Nút "Cổng thông tin đầu tư"    | Mở link web ngoài trên browser mặc định                  | Enabled   |

### Edge Case Checklist

**Group A — Extreme Data States:**

| Edge Case                              | UC Coverage | Notes |
| -------------------------------------- | ----------- | ----- |
| Tên tỉnh quá dài (overflow)          | ⚠️ Missing  | UC không đề cập quy tắc truncate/wrap cho tên tỉnh trong list item hoặc header |
| Nội dung tổng quan rất dài           | ✅ Covered  | UC nêu "hiển thị full text, không giới hạn số dòng" |
| KPI value = 0                          | ⚠️ Missing  | UC chỉ nêu null → "--", không nêu rõ xử lý khi giá trị = 0 |
| KPI value rất lớn (ví dụ 999.9B)     | ⚠️ Missing  | UC không đề cập giới hạn trên hoặc cách xử lý giá trị cực lớn |
| Danh sách KCN = 0 item               | ✅ Covered  | UC nêu rõ "Không có dữ liệu" |
| Danh sách KCN rất nhiều item         | ⚠️ Missing  | UC không nêu giới hạn hiển thị hoặc lazy load cho danh sách KCN |
| Chip lĩnh vực text rất dài           | ⚠️ Missing  | UC không đề cập truncate cho chip text dài |
| Tagline banner null                    | ⚠️ Missing  | UC nêu overlay text gồm tên tỉnh + tagline, nhưng không nêu xử lý khi tagline null |
| Tên KCN quá dài                       | ⚠️ Missing  | UC không đề cập truncate cho tên KCN |
| Mô tả địa danh quá dài              | ⚠️ Missing  | UC không đề cập truncate cho mô tả địa danh trong danh sách khoảng cách |

**Group B — Network & API States:**

| Edge Case                                          | UC Coverage | Notes |
| -------------------------------------------------- | ----------- | ----- |
| API chậm (> 5s < 10s)                             | ✅ Covered  | UC nêu skeleton loading |
| Timeout (> 10s)                                    | ⚠️ Missing  | UC không đề cập timeout, CMR-07 và CMR-16 quy định 10 giây |
| Partial API failure (1 section fail, các section khác OK) | ⚠️ Missing | UC mô tả lỗi ở cấp màn hình, không nêu rõ xử lý khi chỉ 1 API call fail |
| Mất mạng giữa chừng khi đang tải                | ⚠️ Missing  | UC không đề cập xử lý khi mất mạng giữa lúc tải dữ liệu |
| Network loss mid-load (dữ liệu đã tải 1 phần)   | ⚠️ Missing  | UC không nêu rõ có giữ dữ liệu đã tải hay reset toàn bộ |
| Pull to Refresh fail                               | ⚡ Partial  | Tham chiếu CMR-13 nhưng không nêu hành vi cụ thể khi refresh thất bại |

**Group C — Abnormal User Interactions:**

| Edge Case                                         | UC Coverage | Notes |
| ------------------------------------------------- | ----------- | ----- |
| Double tap vào tỉnh (rapid consecutive taps)     | ⚠️ Missing  | UC không nêu debounce/chặn điều hướng trùng lặp |
| Physical Back button (Android)                    | ⚠️ Missing  | UC không đề cập xử lý nút Back vật lý |
| Screen rotation (landscape)                       | ⚠️ Missing  | UC chỉ ghi "Portrait" nhưng không nêu rõ khóa portrait hay cho phép xoay |

**Group D — Permissions & Session:**

| Edge Case                             | UC Coverage | Notes |
| ------------------------------------- | ----------- | ----- |
| Session hết hạn khi đang xem        | ⚠️ Missing  | UC yêu cầu đăng nhập nhưng không nêu xử lý khi session hết hạn |
| Mở lại app sau force-close           | ⚠️ Missing  | UC không nêu rõ quay về màn hình nào |
| Người dùng chưa đăng nhập cố truy cập | ⚠️ Missing | UC nêu precondition "đã đăng nhập" nhưng không nêu xử lý khi chưa đăng nhập |

**Group E — Internationalization (i18n):**

| Edge Case                             | UC Coverage | Notes |
| ------------------------------------- | ----------- | ----- |
| Đổi ngôn ngữ trên màn hình         | ⚠️ Missing  | UC không đề cập đa ngôn ngữ |

**Đánh giá:** 14/20 — Thuộc tính và hành vi cơ bản được mô tả khá tốt. Tuy nhiên thiếu nhiều edge case quan trọng: truncate rules, debounce, timeout, partial API failure, session expiry.

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
- BR-04: Tìm kiếm real-time, không cần Enter (CMR-01)

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
- [Alt-3] Tap "Đăng ký tư vấn ngay" → **[TBD]**
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
- BR-11: Format số KPI theo quy tắc riêng (GRDP: %, Dân số/Vốn: K/M/B, Diện tích: số nguyên km²)
- BR-12: Thẻ KPI cuộn ngang
- BR-13: Badge KCN chỉ có 2 loại: "Sẵn sàng" (xanh), "Đang quy hoạch" (vàng)

**UI/UX FEEDBACK:**
- Loading: Skeleton loading từng section
- Empty state: "Không có dữ liệu" cho các section rỗng

**Trạng thái:** ⚡ Partial — Luồng cơ bản tốt, nhưng thiếu timeout handling, partial failure, nút CTA [TBD]

**Đánh giá:** 16/20 — Luồng chính và phụ mô tả chi tiết. Trừ điểm vì: nút "Đăng ký tư vấn ngay" [TBD], thiếu timeout flow, thiếu partial API failure response.

---

## PHẦN 7 — FUNCTIONAL INTEGRATION ANALYSIS

| Liên kết                     | UC liên quan | Mô tả                                                    | Trạng thái |
| ----------------------------- | ------------- | ---------------------------------------------------------- | ----------- |
| Đăng nhập (Precondition)     | UC256         | Người dùng phải đăng nhập trước khi truy cập UC55        | ✅ Đề cập  |
| Sidebar Navigation           | UC1 (*)       | Truy cập từ Sidebar → "Khu vực đầu tư"                  | ⚡ Partial — không tham chiếu tường minh UC nào quản lý Sidebar |
| Danh mục tỉnh (Catalog API)  | Hệ thống chung | Dữ liệu tỉnh lấy từ API danh mục, dùng chung           | ✅ Đề cập  |
| Đăng ký tư vấn (CTA)         | ⚠️ Unknown   | Nút "Đăng ký tư vấn ngay" → [TBD] chưa xác định UC đích | ⚠️ Missing |
| Cổng thông tin đầu tư        | External link | Mở website ngoài, URL lấy từ API theo mã tỉnh           | ✅ Đề cập  |
| Ứng dụng bản đồ              | External app  | Geo URI scheme → mở app bản đồ mặc định thiết bị        | ✅ Đề cập  |

**Đánh giá:** 7/10 — Phân tích liên kết cơ bản đầy đủ. Trừ điểm vì CTA "Đăng ký tư vấn ngay" chưa xác định UC đích, và Sidebar navigation không tham chiếu rõ ràng.

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

**Đánh giá:** 7/10 — AC hiện tại chất lượng tốt, đo lường được. Tuy nhiên số lượng AC chưa đủ bao phủ toàn bộ luồng chức năng.

---

## PHẦN 9 — NON-FUNCTIONAL REQUIREMENTS (Yêu cầu phi chức năng)

| NFR              | UC Coverage | Notes |
| ---------------- | ----------- | ----- |
| Performance      | ⚠️ Missing  | Không đề cập thời gian phản hồi (CMR-16 quy định 10s timeout) |
| Security         | ⚡ Partial  | Yêu cầu đăng nhập, nhưng không nêu cơ chế bảo mật API |
| Compatibility    | ⚡ Partial  | Nêu "Portrait" nhưng không nêu rõ min OS version, min screen size |
| Accessibility    | ⚠️ Missing  | Không đề cập accessibility (screen reader, contrast, font size) |
| Offline support  | ⚠️ Missing  | Không đề cập cache/offline viewing |
| Deep linking     | ⚠️ Missing  | Không đề cập deep link vào chuyên trang tỉnh cụ thể |

**Đánh giá:** 2/5 — Chỉ có phân quyền đăng nhập cơ bản, thiếu phần lớn NFR.

---

## 📊 AUDIT SUMMARY

| #      | Knowledge Area                             | Max Pts | Score | Status     |
| ------ | ------------------------------------------ | ------- | ----- | ---------- |
| 1      | Feature Identity                           | 5       | 5/5   | ✅ Complete |
| 2      | Objective & Scope                          | 5       | 5/5   | ✅ Complete |
| 3      | Actors & User Roles                        | 10      | 10/10 | ✅ Complete |
| 4      | Preconditions & Postconditions             | 10      | 10/10 | ✅ Complete |
| 5      | UI Object Inventory & Mapping              | 15      | 12/15 | ⚡ Partial  |
| 6      | Object Attributes & Behavior Definition    | 20      | 14/20 | ⚡ Partial  |
| 7      | Functional Logic & Workflow Decomposition  | 20      | 16/20 | ⚡ Partial  |
| 8      | Functional Integration Analysis            | 10      | 7/10  | ⚡ Partial  |
| 9      | Acceptance Criteria                        | 10      | 7/10  | ⚡ Partial  |
| 10     | Non-functional Requirements                | 5       | 2/5   | ⚡ Partial  |
| **Total** |                                         | **110** | **88/110** | **80.0/100** |

**Verdict:** ⚡ **CONDITIONALLY READY** (80.0/100)

> QA có thể bắt đầu thiết kế test case cho các luồng đã rõ ràng. Các mục flagged cần được BA giải quyết song song.

---

## 📋 UNIFIED GAP & QUESTION REPORT

| ID  | Priority | Ref                                                                                             | Question                                                                                                                                                                            | Why It Matters                                                                                             | Status |
| --- | -------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------ |
| Q1  | High     | Section 2.2, #21: "Tap → **[TBD]** Màn hình/luồng đăng ký tư vấn chưa được xác định"       | Nút "Đăng ký tư vấn ngay" hiện đang **[TBD]**. Luồng/màn hình đích khi tap vào nút này là gì? Có phải điều hướng đến một form hay một UC khác? Khi nào sẽ xác định?            | Đây là CTA chính của chuyên trang, không thể thiết kế test case cho luồng này nếu chưa xác định hành vi    | Open   |
| Q2  | High     | Section 2.2, #7: "Quy tắc hiển thị chung 4 thẻ: Cuộn ngang"                                | Khi **một hoặc nhiều thẻ KPI bị NULL** và hiển thị "--", 4 thẻ vẫn hiển thị đầy đủ hay chỉ hiển thị thẻ có dữ liệu? Bố cục cuộn ngang có thay đổi không?                        | Ảnh hưởng đến test case UI layout cho empty state của KPI section                                           | Open   |
| Q3  | Medium   | CMR-01: "debounce 3 giây"; UC55 Section 2.1, #4: "lọc ngay lập tức (real-time)"            | UC55 mô tả tìm kiếm "lọc real-time ngay lập tức" nhưng CMR-01 quy định **debounce 3 giây**. Hai mô tả này mâu thuẫn. UC55 có áp dụng debounce 3 giây không?                     | Mâu thuẫn giữa UC và CMR, không thể xác định hành vi chính xác khi testing                                 | Open   |
| Q4  | Medium   | CMR-01: "State Persistence"; UC55 không đề cập                                               | CMR-01 quy định "sau khi tìm kiếm, vào chi tiết rồi quay lại, danh sách giữ trạng thái tìm kiếm trước đó". UC55 có áp dụng State Persistence cho ô tìm kiếm tỉnh không?         | Ảnh hưởng đến test case navigation back & state management                                                  | Open   |
| Q5  | Medium   | CMR-07: "Timeout 10 giây" + CMR-16; UC55 Section 3.3 không đề cập timeout                   | UC55 có bảng xử lý lỗi nhưng **không đề cập trường hợp timeout**. Khi API vượt quá 10 giây (theo CMR-07, CMR-16), hành vi xử lý có giống CMR-07 không (thông báo + nút "Thử lại")? | Thiếu test case cho timeout scenario — một edge case phổ biến trên mobile                                  | Open   |
| Q6  | Medium   | CMR-04 liệt kê UC55 trong scope; UC55 Section 2.1, #5: "không áp dụng lazy load"            | CMR-04 (Lazy Load) liệt kê UC55 trong danh sách UC áp dụng, nhưng UC55 nêu rõ "không lazy load, tải 63 tỉnh 1 lần". Đây có phải là **ngoại lệ có chủ đích** hay lỗi trong CMR-04? | Mâu thuẫn giữa CMR-04 và UC55 cần làm rõ để tránh hiểu lầm khi phát triển                                | Open   |
| Q7  | Medium   | Section 2.2: nhiều trường text (tên tỉnh, tên KCN, mô tả địa danh, chip text)              | UC không định nghĩa **quy tắc truncate/wrap** cho các trường text có khả năng overflow: tên tỉnh trong header/list item, tên KCN, mô tả địa danh, text trong chip lĩnh vực. Xử lý thế nào khi text vượt quá chiều rộng? | Thiếu quy tắc truncate có thể gây vỡ layout trên thiết bị nhỏ                                              | Open   |
| Q8  | Medium   | Section 2.2, Chi tiết chuyên trang: nhiều API call cho từng section                          | Khi màn hình chi tiết gọi **nhiều API** cho từng section, nếu **chỉ 1 API fail** (ví dụ: API KCN lỗi nhưng API KPI thành công), hệ thống xử lý thế nào? Hiển thị lỗi toàn màn hình hay chỉ section lỗi hiển thị "retry"? | Partial failure là edge case quan trọng trên mobile — ảnh hưởng đến UX và test design                       | Open   |
| Q9  | Medium   | Section 2.2, #3: "Overlay text gồm: Tên tỉnh + tagline mô tả ngắn"                        | Khi **tagline mô tả ngắn** của tỉnh là null hoặc rỗng từ API, overlay trên banner xử lý thế nào? Chỉ hiển thị tên tỉnh hay ẩn luôn overlay?                                      | Ảnh hưởng đến test case cho banner empty state                                                              | Open   |
| Q10 | Medium   | N/A (Missing)                                                                                  | UC yêu cầu "đã đăng nhập" nhưng **không nêu xử lý khi session hết hạn** trong lúc người dùng đang xem chuyên trang. Hệ thống xử lý thế nào? Redirect về đăng nhập hay hiện thông báo? | Mobile app thường có session timeout — cần xác định hành vi để test                                         | Open   |
| Q11 | Medium   | Section 2.1, #5: Tap vào item → Điều hướng                                                   | UC không đề cập **chặn double-tap** khi người dùng tap liên tục nhanh vào item tỉnh. Hệ thống có debounce/chặn mở 2 màn hình chi tiết cùng lúc không?                              | Rapid tap là lỗi UX phổ biến trên mobile, có thể gây crash hoặc navigation stack lỗi                       | Open   |
| Q12 | Low      | Section 2.1, #4: Ô tìm kiếm                                                                 | UC không nêu **max length** cho ô tìm kiếm tỉnh. Có giới hạn ký tự tối đa không? CMR-11 quy định mặc định 500 ký tự, có áp dụng cho search box không?                            | Cần xác định boundary cho test case input validation                                                        | Open   |
| Q13 | Low      | N/A (Missing)                                                                                  | UC ghi giao diện "Portrait" nhưng không nêu rõ ứng dụng có **khóa orientation** hay cho phép xoay sang landscape. Khi xoay ngang, layout có bị vỡ không?                           | Ảnh hưởng đến testing trên các thiết bị và tư thế sử dụng khác nhau                                       | Open   |
| Q14 | Low      | N/A (Missing)                                                                                  | UC không đề cập **deep link** vào chuyên trang của một tỉnh cụ thể. Có hỗ trợ chia sẻ link trực tiếp đến tỉnh không (dù Exclusions nêu "không chia sẻ nội dung")?                | Có thể ảnh hưởng đến test case integration và notification linking                                         | Open   |
| Q15 | Low      | Section 2.2, #16: "Tap vào bản đồ → geo URI scheme"                                         | Nếu thiết bị **không có ứng dụng bản đồ nào** được cài đặt, khi tap vào bản đồ, hệ thống xử lý thế nào? Hiển thị lỗi hay mở browser?                                             | Edge case trên một số thiết bị Android không có Google Maps pre-installed                                   | Open   |
| Q16 | Low      | Section 2.2: KPI format                                                                        | Quy tắc format số KPI của UC55 (rút gọn K/M/B, 1 chữ số thập phân) **khác với CMR-11** (dấu phẩy ngăn cách nghìn, tối đa 3 chữ số thập phân). UC55 có quy tắc riêng cho KPI hay tuân theo CMR-11? | Cần xác định rõ để viết expected result chính xác trong test case                                           | Open   |

---

## 🟢 WHAT'S GOOD

1. **Mô tả giao diện chi tiết:** UC55 cung cấp bảng mô tả UI rất chi tiết cho cả 2 màn hình, với đầy đủ kiểu trường, giá trị mặc định, và quy tắc hiển thị/hành động.
2. **Format số KPI rõ ràng:** Quy tắc rút gọn số K/M/B được định nghĩa cụ thể cho từng thẻ KPI với ví dụ minh họa.
3. **Empty state đầy đủ:** Mỗi section đều có quy tắc xử lý khi dữ liệu rỗng ("--" cho KPI, "Không có dữ liệu" cho section, ẩn cho danh sách khoảng cách).
4. **Xử lý lỗi ảnh:** Trường hợp ảnh banner không load được có xử lý rõ ràng (hiển thị loading + overlay vẫn hiện).
5. **Exclusions rõ ràng:** Phạm vi ngoài UC được liệt kê cụ thể (so sánh, tải xuống, chia sẻ).
6. **Tham chiếu CMR tốt:** UC tham chiếu CMR-01, CMR-06, CMR-07, CMR-13, CMR-14 tại các điểm phù hợp.
7. **Dữ liệu động:** UC nhấn mạnh rõ ràng việc lấy dữ liệu từ API, không hard-code.

---

## 🧪 TESTABILITY OUTLOOK

**What CAN be tested now:**
- Luồng xem danh sách tỉnh (hiển thị 63 tỉnh, sắp xếp A–Z, skeleton loading)
- Tìm kiếm tỉnh (lọc real-time, xóa từ khóa, không có kết quả)
- Luồng xem chi tiết chuyên trang (navigation, hiển thị 8 sections)
- Format số KPI (GRDP %, Dân số K/M/B, Vốn $K/M/B, Diện tích km²)
- Empty state cho tất cả sections (KPI "--", section "Không có dữ liệu", khoảng cách ẩn)
- Banner ảnh + overlay text + fallback khi ảnh lỗi
- Badge trạng thái KCN (Sẵn sàng / Đang quy hoạch)
- Tap bản đồ → mở ứng dụng bản đồ
- Nút "Cổng thông tin đầu tư" → mở link ngoài (+ ẩn khi URL null)
- Thẻ liên hệ (ĐT + Email, xử lý null → "--")
- Navigation back (CMR-06)
- Pull to Refresh cả 2 màn hình
- Lỗi mạng, API 500, 404

**What CANNOT be tested yet (blocked by gaps):**
- Nút "Đăng ký tư vấn ngay" (Q1 — [TBD], chưa có luồng đích)
- Timeout scenario (Q5 — không nêu trong UC)
- Partial API failure (Q8 — chưa xác định hành vi per-section)
- Session expiry behavior (Q10 — chưa xác định)

**Suggested test focus areas (once gaps are resolved):**
- **Happy path:** Xem danh sách → chọn tỉnh → xem chi tiết → verify tất cả section → back
- **Alternative scenarios:** Tìm kiếm tỉnh, Pull to Refresh, tap bản đồ, tap Cổng thông tin
- **Boundary & validation:** Format số KPI (boundary K/M/B transitions: 999 → 1K, 999K → 1M, 999M → 1B), text overflow
- **Error & exception:** Lỗi mạng, API 500, 404, timeout, partial failure
- **UI-specific:** Cuộn ngang KPI, cuộn ngang chip, cuộn dọc KCN, banner overlay, responsive trên nhiều kích thước màn hình
- **CMR compliance:** CMR-01 (debounce + state persistence), CMR-06 (header), CMR-07 (error + timeout), CMR-13 (pull to refresh + no duplicate), CMR-14 (empty state), CMR-16 (API performance)
- **Edge case:** Double-tap navigation, app force-close & reopen, no map app installed, KPI value = 0

---

## 📌 SUMMARY & RECOMMENDATION

**Verdict:** ⚡ **CONDITIONALLY READY — 80.0/100**

UC55 là một tài liệu yêu cầu có chất lượng khá tốt với mô tả giao diện chi tiết, quy tắc format dữ liệu rõ ràng, và xử lý empty state đầy đủ cho hầu hết các section. Tuy nhiên, có **1 blocker quan trọng** (nút "Đăng ký tư vấn ngay" [TBD]) và **một số mâu thuẫn với CMR** (debounce 3 giây vs real-time, CMR-04 liệt kê UC55 nhưng UC55 không dùng lazy load). QA có thể bắt đầu thiết kế test case cho các luồng đã rõ ràng (khoảng 80% chức năng), nhưng cần BA giải quyết song song 16 câu hỏi mở — đặc biệt Q1 (CTA flow), Q3 (debounce conflict), Q5 (timeout), Q7 (truncate rules), và Q8 (partial API failure) để hoàn thiện bộ test case.

**Khuyến nghị:** Tiến hành thiết kế test case cho các phần đã rõ, đồng thời chuyển 16 câu hỏi cho BA giải đáp song song.
