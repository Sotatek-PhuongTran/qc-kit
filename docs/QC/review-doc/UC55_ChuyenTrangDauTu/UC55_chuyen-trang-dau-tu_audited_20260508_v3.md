# BÁO CÁO ĐÁNH GIÁ MỨC ĐỘ SẴN SÀNG — UC55

**Tiêu đề:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư trên Mobile
**Ngày tạo:** 08/05/2026
**Tác giả:** QC Agent
**Phiên bản:** v3 (Re-audit sau khi BA trả lời)

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
| Giao diện             | Màn hình Mobile (Portrait only — khóa xoay)                            | ✅ Complete |
| Chức năng đáp ứng UC | UC55 (Phụ lục XIV)                                                       | ✅ Complete |

**Đánh giá:** 5/5 — Thông tin nhận diện đầy đủ, rõ ràng. Đã xác nhận portrait-only (Q13).

---

## PHẦN 1 — OBJECTIVE & SCOPE (Mục tiêu & Phạm vi)

**Mục tiêu:**
Cho phép cá nhân, tổ chức xem thông tin đầu tư chuyên biệt theo từng tỉnh/thành phố: chỉ số kinh tế, tổng quan đầu tư, lĩnh vực khuyến khích, hạ tầng KCN, vị trí địa lý, và thông tin liên hệ.

**Phạm vi trong (In-scope):**
- Chọn tỉnh từ danh sách
- Xem chi tiết chuyên trang đầu tư theo tỉnh (Banner, KPI, Tổng quan, Lĩnh vực khuyến khích, Hạ tầng KCN, Vị trí địa lý, Liên hệ)

**Phạm vi ngoài (Exclusions):** ✅ Được nêu rõ
- Không bao gồm: so sánh thông tin giữa các tỉnh, tải xuống tài liệu/dữ liệu, chia sẻ nội dung chuyên trang.
- **[v3] CTA "Đăng ký tư vấn ngay" đã bị loại khỏi scope** (Q1 — BA xác nhận bỏ).

**Truy cập:** Sidebar → Mục "Khu vực đầu tư"

**Đánh giá:** 5/5 — Mục tiêu, phạm vi trong/ngoài đều rõ ràng. CTA đã được loại bỏ rõ ràng.

---

## PHẦN 2 — ACTORS & USER ROLES (Đối tượng sử dụng & Phân quyền)

| Thuộc tính              | Giá trị                                          | Trạng thái |
| ------------------------- | -------------------------------------------------- | ----------- |
| Đối tượng thực hiện    | Cá nhân / Tổ chức                                | ✅ Complete |
| Phân quyền              | Đã đăng nhập                                     | ✅ Complete |
| Phân biệt hành vi       | Hai nhóm đối tượng có cùng hành vi — không phân biệt | ✅ Complete |

**Đánh giá:** 10/10 — Actor và quyền truy cập được xác định rõ ràng.

---

## PHẦN 3 — PRECONDITIONS & POSTCONDITIONS (Điều kiện tiên quyết & Hậu điều kiện)

| Loại            | Nội dung                                                              | Trạng thái |
| ----------------- | ---------------------------------------------------------------------- | ----------- |
| Preconditions     | Thiết bị có kết nối mạng ổn định, người dùng đã đăng nhập vào hệ thống | ✅ Complete |
| Postconditions    | Hệ thống hiển thị đầy đủ thông tin chuyên trang tỉnh/thành phố      | ✅ Complete |

**Đánh giá:** 10/10 — Điều kiện tiên quyết và hậu điều kiện đầy đủ, rõ ràng.

---

## PHẦN 4 — UI OBJECT INVENTORY & MAPPING

### Wireframe Cross-Check

| Wireframe | UC Match? | Findings |
| --------- | --------- | -------- |
| UC 55. Xem chuyên trang đầu tư theo khu vực đầu tư trên mobile - list chọn tỉnh, thành phố.png | ✅ Phù hợp | Layout danh sách tỉnh: header đỏ, nút back, section title, ô tìm kiếm, list items — khớp với UC55 Section 2.1 |
| UC 55. Xem chi tiết 1 chuyên trang.png | ✅ Phù hợp | Layout chi tiết: header + banner + sections theo scroll dọc — khớp với UC55 Section 2.2 |
| Container các lựa chọn chuyển tab trong 1 chuyên trang.png | ✅ Resolved | **[v3]** BA xác nhận: Container là UI element cố định giữa màn hình, KHÔNG phải cơ chế tab navigation. Không có conflict với scroll dọc (Q17 — Answered). |
| Container các mục hiển thị trong chuyên trang.png | ✅ Phù hợp | Wireframe mô tả các mục hiển thị trong chuyên trang — cơ bản khớp với thứ tự sections trong UC55 |

### Màn hình 1: Danh sách chọn tỉnh / thành phố

| # | Component Name                 | Type                        | In UC? | Wireframe? | CMR Ref   | Notes |
| - | ------------------------------ | --------------------------- | ------ | ---------- | --------- | ----- |
| 1 | Nút Quay lại (←)              | Button (Icon)               | ✅     | ✅         | CMR-06    | ✅ Tham chiếu CMR-06 |
| 2 | Tiêu đề Header                | Label                       | ✅     | ✅         | CMR-06    | ✅ "Đầu tư theo khu vực" |
| 3 | Tiêu đề section               | Label                       | ✅     | ✅         | —         | ✅ "Chọn tỉnh / thành phố" |
| 4 | Ô tìm kiếm tỉnh              | Textbox (Search)            | ✅     | ✅         | CMR-01    | ✅ **[v3]** CMR-01 áp dụng đầy đủ: debounce 3s + State Persistence (Q3, Q4 — Answered) |
| 5 | Danh sách tỉnh / thành phố   | List Item (Vertical Scroll) | ✅     | ✅         | CMR-13    | ✅ 63 tỉnh, A–Z, không lazy load (ngoại lệ có chủ đích — Q6 Answered) |

### Màn hình 2: Chi tiết Chuyên trang đầu tư theo tỉnh

| #  | Component Name                     | Type                           | In UC? | Wireframe? | CMR Ref   | Notes |
| -- | ---------------------------------- | ------------------------------ | ------ | ---------- | --------- | ----- |
| 1  | Nút Quay lại (←)                  | Button (Icon)                  | ✅     | ✅         | CMR-06    | ✅ Tham chiếu CMR-06 |
| 2  | Tiêu đề tỉnh (Header)            | Label                          | ✅     | ✅         | CMR-06    | ✅ Tên tỉnh đã chọn |
| 3  | Ảnh đại diện tỉnh (Banner)       | Image (Full Width)             | ✅     | ✅         | —         | ✅ Có xử lý lỗi ảnh |
| 4  | Thẻ Tăng trưởng GRDP             | Card (Icon + Value + Label)    | ✅     | ✅         | —         | ✅ Format số chi tiết. **[v3]** NULL → "--", 4 thẻ luôn hiển thị (Q2) |
| 5  | Thẻ Dân số                        | Card (Icon + Value + Label)    | ✅     | ✅         | —         | ✅ Format rút gọn K/M/B. **[v3]** NULL → "--", 4 thẻ luôn hiển thị (Q2) |
| 6  | Thẻ Vốn đầu tư                   | Card (Icon + Value + Label)    | ✅     | ✅         | —         | ✅ Format rút gọn K/M/B + $. **[v3]** NULL → "--", 4 thẻ luôn hiển thị (Q2) |
| 7  | Thẻ Diện tích                     | Card (Icon + Value + Label)    | ✅     | ✅         | —         | ✅ Số nguyên + km². **[v3]** NULL → "--", 4 thẻ luôn hiển thị (Q2) |
| 8  | Tiêu đề "Tổng quan đầu tư"      | Label                          | ✅     | ✅         | —         | ✅ |
| 9  | Nội dung tổng quan                | Text                           | ✅     | ✅         | —         | ✅ Plain text, full text, có empty state |
| 11 | Tiêu đề "Lĩnh vực khuyến khích" | Label                          | ✅     | ✅         | —         | ✅ |
| 12 | Danh sách lĩnh vực               | Chip List (Horizontal Scroll)  | ✅     | ✅         | —         | ✅ Dữ liệu động, có empty state |
| 13 | Tiêu đề "Hạ tầng KCN"           | Label                          | ✅     | ✅         | —         | ✅ |
| 14 | Danh sách KCN                     | List Card (Vertical)           | ✅     | ✅         | CMR-05    | ✅ Badge trạng thái Xanh/Vàng |
| 15 | Tiêu đề "Vị trí địa lý"        | Label                          | ✅     | ✅         | —         | ✅ |
| 16 | Bản đồ tỉnh                      | Map (Static Thumbnail)         | ✅     | ✅         | —         | ✅ Tap → mở ứng dụng bản đồ. **[v3]** Fallback: mở browser nếu không có app (Q15) |
| 17 | Danh sách khoảng cách             | List (Icon + Text + Km)        | ✅     | ✅         | —         | ✅ Số nguyên km, có empty state |
| 18 | Tiêu đề "Liên hệ đầu tư"       | Label                          | ✅     | ✅         | —         | ✅ |
| 19 | Thẻ thông tin liên hệ            | Card (Orange Background)       | ✅     | ✅         | —         | ✅ ĐT + Email, xử lý null |
| 20 | Card CTA                          | Card (Dark Red Background)     | ✅     | ✅         | —         | ✅ Tiêu đề động theo tên tỉnh |
| ~~21~~ | ~~Nút "Đăng ký tư vấn ngay"~~ | ~~Button (Primary)~~        | —      | —          | —         | **[v3] ĐÃ XÓA** — BA xác nhận bỏ CTA này khỏi scope (Q1 — Answered) |
| 22 | Nút "Cổng thông tin đầu tư"     | Button (Secondary)             | ✅     | ✅         | —         | ✅ Mở link ngoài, ẩn nếu URL null |

### CMR Cross-Check

| CMR    | Applicable? | UC References? | Status      | Notes |
| ------ | ----------- | -------------- | ----------- | ----- |
| CMR-01 | ✅ Ô tìm kiếm tỉnh | ✅ Có tham chiếu | ✅ OK | **[v3]** BA xác nhận: áp dụng debounce 3 giây + State Persistence. "Real-time" = không cần Enter, vẫn có debounce (Q3, Q4 — Answered) |
| CMR-04 | ❌ Không áp dụng | ✅ UC nêu rõ "không lazy load" | ✅ OK | **[v3]** BA xác nhận: ngoại lệ có chủ đích. 63 tỉnh tải 1 lần. CMR-04 liệt kê UC55 là lỗi trong CMR (Q6 — Answered) |
| CMR-05 | ✅ Badge KCN | ⚡ Không tham chiếu trực tiếp | ⚠️ Partial | UC tự định nghĩa 2 badge phù hợp CMR-05 nhưng không tham chiếu |
| CMR-06 | ✅ Header | ✅ Có tham chiếu | ✅ OK | Cả 2 màn hình đều tham chiếu CMR-06 |
| CMR-07 | ✅ Xử lý lỗi | ✅ Có tham chiếu | ✅ OK | **[v3]** BA xác nhận: áp dụng timeout 10 giây theo CMR-07. Hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + nút "Thử lại" (Q5 — Answered) |
| CMR-13 | ✅ Pull to Refresh | ✅ Có tham chiếu | ⚠️ Partial | Có đề cập Pull to Refresh nhưng không đề cập quy tắc "Không duplicate" |
| CMR-14 | ✅ Empty state | ✅ Có tham chiếu | ✅ OK | Các section đều có định nghĩa empty state rõ ràng |
| CMR-16 | ✅ API Performance | ✅ Áp dụng qua CMR-07 | ✅ OK | **[v3]** Timeout 10 giây đã được xác nhận áp dụng (Q5 — Answered) |

### Wireframe Conflict Summary

| ID | Wireframe | UC Section | Conflict Description | Impact | Status |
| -- | --------- | ---------- | -------------------- | ------ | ------ |
| WC-01 | Container các lựa chọn chuyển tab trong 1 chuyên trang.png | Section 2.2 | ~~Wireframe gợi ý tab navigation~~ | — | ✅ **[v3] Resolved** — BA xác nhận container là UI element cố định giữa màn hình, không liên quan đến scroll (Q17) |

**Đánh giá:** 14/15 — UI Inventory đầy đủ. Wireframe conflict đã resolved. CTA "Đăng ký tư vấn ngay" đã bị loại bỏ rõ ràng. CMR-01 và CMR-07/16 đã xác nhận áp dụng đầy đủ. Chỉ trừ 1 điểm vì CMR-05 không tham chiếu trực tiếp.

---

## PHẦN 5 — OBJECT ATTRIBUTES & BEHAVIOR DEFINITION

### Bảng thuộc tính trường dữ liệu

| # | Field                        | Data Type        | Required? | Min | Max         | Format / Display Rule                                              |
| - | ---------------------------- | ---------------- | --------- | --- | ----------- | ------------------------------------------------------------------ |
| 1 | Ô tìm kiếm tỉnh            | Text (Search)    | Không     | —   | ⚠️ Missing  | Placeholder: "Tìm kiếm tỉnh, thành phố..." **[v3]** Debounce 3s, State Persistence áp dụng (Q3, Q4). Max length chưa xác nhận (Q12 — Deferred) |
| 2 | Tên tỉnh (list item)        | Text             | —         | —   | ⚠️ Missing  | Sắp xếp A–Z, truncate rule missing (Q7 — Deferred)               |
| 3 | Banner ảnh tỉnh             | Image            | —         | —   | —           | Full width, chiều cao cố định, overlay text tên tỉnh + tagline   |
| 4 | Tăng trưởng GRDP            | Decimal          | —         | —   | —           | 1 chữ số thập phân, đơn vị %, null → "--". **[v3]** 4 thẻ luôn hiển thị đủ dù null (Q2) |
| 5 | Dân số                       | Integer          | —         | —   | —           | Rút gọn K/M/B, 1 chữ số thập phân, null → "--". **[v3]** 4 thẻ luôn hiển thị (Q2) |
| 6 | Vốn đầu tư                  | Decimal          | —         | —   | —           | $, rút gọn K/M/B, 1 chữ số thập phân, null → "--". **[v3]** 4 thẻ luôn hiển thị (Q2) |
| 7 | Diện tích                    | Integer          | —         | —   | —           | Số nguyên + dấu phẩy ngăn cách nghìn + km², null → "--". **[v3]** 4 thẻ luôn hiển thị (Q2) |
| 8 | Nội dung tổng quan          | Text (Plain)     | —         | —   | ⚠️ Missing  | Plain text, full text, null → "Không có dữ liệu"                 |
| 9 | Lĩnh vực khuyến khích       | Chip[] (Dynamic) | —         | —   | ⚠️ Missing  | Pill chip, viền vàng/cam, rỗng → "Không có dữ liệu" (Q7 — Deferred) |
| 10| Tên KCN                     | Text             | —         | —   | ⚠️ Missing  | Font đậm, truncate rule missing (Q7 — Deferred)                   |
| 11| Diện tích KCN               | Integer          | —         | —   | —           | Số nguyên + đơn vị ha                                              |
| 12| Badge trạng thái KCN        | Badge            | —         | —   | —           | Chỉ 2 loại: Xanh "Sẵn sàng", Vàng "Đang quy hoạch"             |
| 13| Bản đồ tỉnh                 | Image (Static)   | —         | —   | —           | Full width, chiều cao cố định. **[v3]** Fallback mở browser nếu không có app bản đồ (Q15) |
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
| 2 | Ô tìm kiếm                      | Focus → nhập text → lọc real-time (debounce 3s)         | Enabled   |
| 3 | List item tỉnh                  | Điều hướng đến chi tiết tỉnh                            | Enabled   |
| 4 | Nút Quay lại (Màn hình 2)       | Quay về danh sách tỉnh (CMR-06). **[v3]** State Persistence: ô tìm kiếm giữ keyword (Q4) | Enabled   |
| 5 | Thẻ KPI (4 thẻ)                 | Không tap được                                            | Read-only |
| 6 | Chip lĩnh vực                   | Không tap được                                            | Read-only |
| 7 | Card KCN                         | Không tap được                                            | Read-only |
| 8 | Bản đồ tỉnh                     | Tap → Mở ứng dụng bản đồ mặc định (geo URI). **[v3]** Fallback: mở browser nếu không có app (Q15) | Enabled   |
| 9 | Danh sách khoảng cách            | Không tap được                                            | Read-only |
| 10| Thẻ liên hệ                     | Không tap được                                            | Read-only |
| 11| Nút "Cổng thông tin đầu tư"    | Mở link web ngoài trên browser mặc định                  | Enabled   |

### Edge Case Checklist

**Group A — Extreme Data States:**

| Edge Case                              | UC Coverage | Notes |
| -------------------------------------- | ----------- | ----- |
| Tên tỉnh quá dài (overflow)          | ⚠️ Missing  | Q7 — Deferred |
| Nội dung tổng quan rất dài           | ✅ Covered  | UC nêu "hiển thị full text, không giới hạn số dòng" |
| KPI value = 0                          | ✅ Covered  | **[v3]** BA xác nhận: hiển thị giá trị 0 bình thường (khác null → "--"). 4 thẻ luôn hiển thị (Q2) |
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
| Timeout (> 10s)                                    | ✅ Covered  | **[v3]** BA xác nhận: áp dụng CMR-07 timeout 10s + thông báo + nút Thử lại (Q5) |
| Mất mạng giữa chừng khi đang tải                | ⚠️ Missing  | UC không đề cập |
| Pull to Refresh fail                               | ⚡ Partial  | Tham chiếu CMR-13 nhưng không nêu hành vi cụ thể khi refresh thất bại |

**Group C — Abnormal User Interactions:**

| Edge Case                                         | UC Coverage | Notes |
| ------------------------------------------------- | ----------- | ----- |
| Physical Back button (Android)                    | ⚠️ Missing  | UC không đề cập |
| Không có app bản đồ trên thiết bị               | ✅ Covered  | **[v3]** BA xác nhận: fallback mở browser (Q15) |

**Group D — Permissions & Session:**

| Edge Case                             | UC Coverage | Notes |
| ------------------------------------- | ----------- | ----- |
| Session hết hạn khi đang xem        | ⚠️ Missing  | Q10 — Deferred |
| Mở lại app sau force-close           | ⚠️ Missing  | UC không đề cập |
| Người dùng chưa đăng nhập cố truy cập | ⚠️ Missing | UC nêu precondition nhưng không nêu xử lý |

**Đánh giá:** 16/20 — Thuộc tính và hành vi mô tả tốt hơn v2. Cải thiện nhờ: KPI NULL behavior rõ ràng (Q2), debounce/state persistence xác nhận (Q3/Q4), timeout covered (Q5), map fallback covered (Q15). Vẫn còn thiếu truncate rules (Q7), tagline null (Q9), max length search (Q12).

---

## PHẦN 6 — FUNCTIONAL LOGIC & WORKFLOW DECOMPOSITION

### Function 1: Xem danh sách tỉnh

**MAIN FLOW (Happy Path):**
1. Người dùng vào Sidebar → Mục "Khu vực đầu tư"
2. Hệ thống gọi API danh mục → Hiển thị skeleton loading
3. API phản hồi thành công → Hiển thị danh sách 63 tỉnh/thành phố, sắp xếp A–Z
4. Người dùng cuộn danh sách, tap vào tỉnh → Điều hướng sang chi tiết

**ALTERNATIVE FLOWS:**
- [Alt-1] Tìm kiếm: Nhập từ khóa → **[v3]** Debounce 3 giây (CMR-01) → Lọc danh sách → Hiển thị kết quả phù hợp
- [Alt-2] Xóa từ khóa tìm kiếm → Danh sách trở về đầy đủ
- [Alt-3] Pull to Refresh → Gọi lại API danh mục → Cập nhật danh sách
- **[v3]** [Alt-4] Quay lại từ chi tiết → State Persistence: ô tìm kiếm giữ nguyên keyword, danh sách giữ trạng thái lọc (Q4 — CMR-01)

**EXCEPTION & ERROR FLOWS:**
- [Err-1] Lỗi mạng → "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + Nút "Thử lại"
- [Err-2] Lỗi API 500 → "Hệ thống đang bận. Vui lòng thử lại sau."
- [Err-3] Tìm kiếm không có kết quả → "Không tìm thấy kết quả." (CMR-14)
- **[v3]** [Err-4] Timeout > 10 giây → "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + Nút "Thử lại" (CMR-07, Q5)

**BUSINESS RULES:**
- BR-01: Danh sách tỉnh lấy từ danh mục hệ thống, không hard-code
- BR-02: Tải toàn bộ 63 tỉnh trong 1 lần, không lazy load — **[v3]** ngoại lệ có chủ đích, CMR-04 liệt kê UC55 là lỗi (Q6)
- BR-03: Sắp xếp A–Z
- BR-04: Tìm kiếm real-time, không cần Enter (CMR-01) — **[v3]** có debounce 3 giây (Q3), có State Persistence (Q4)

**UI/UX FEEDBACK:**
- Loading: Skeleton loading khi tải danh sách
- Empty state tìm kiếm: "Không tìm thấy kết quả."

**Trạng thái:** ✅ Luồng đầy đủ — tất cả câu hỏi liên quan đã được giải đáp

### Function 2: Xem chi tiết chuyên trang tỉnh

**MAIN FLOW (Happy Path):**
1. Người dùng tap vào tỉnh từ danh sách → Điều hướng sang chi tiết
2. Hệ thống gọi API chi tiết theo mã tỉnh → Skeleton loading từng section
3. API phản hồi → Hiển thị: Banner → KPI → Tổng quan → Lĩnh vực → KCN → Vị trí → Liên hệ → CTA (chỉ nút "Cổng thông tin đầu tư")
4. Người dùng cuộn dọc để xem toàn bộ nội dung

**ALTERNATIVE FLOWS:**
- [Alt-1] Tap bản đồ → Mở ứng dụng bản đồ mặc định qua geo URI. **[v3]** Nếu không có app bản đồ → fallback mở browser (Q15)
- [Alt-2] Tap "Cổng thông tin đầu tư" → Mở link web trên browser mặc định
- [Alt-3] Pull to Refresh → Gọi lại API chi tiết → Làm mới tất cả section
- [Alt-4] Tap Quay lại → Quay về danh sách tỉnh (State Persistence giữ nguyên trạng thái search)

**EXCEPTION & ERROR FLOWS:**
- [Err-1] Lỗi mạng → "Không thể kết nối..." + Nút "Thử lại"
- [Err-2] Lỗi API 500 → "Hệ thống đang bận..."
- [Err-3] HTTP 404 → "Nội dung không tồn tại hoặc đã bị xóa." → Quay lại danh sách
- [Err-4] Ảnh banner không load được → Hiển thị hình loading + overlay text vẫn hiển thị
- **[v3]** [Err-5] Timeout > 10 giây → "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + Nút "Thử lại" (CMR-07, Q5)

**BUSINESS RULES:**
- BR-05: Dữ liệu KPI, KCN, lĩnh vực, khoảng cách là dữ liệu động theo tỉnh, lấy từ API
- BR-06: KPI null → hiển thị "--". **[v3]** 4 thẻ KPI luôn hiển thị đủ, không ẩn thẻ nào (Q2)
- BR-07: Section rỗng (tổng quan, lĩnh vực, KCN) → hiển thị "Không có dữ liệu"
- BR-08: Danh sách khoảng cách rỗng → ẩn hoàn toàn (bản đồ vẫn hiển thị)
- BR-09: Liên hệ thiếu ĐT hoặc email → hiển thị nhãn + "--"
- BR-10: URL Cổng thông tin null → ẩn hoàn toàn nút
- BR-11: Format số KPI theo quy tắc riêng UC55 (GRDP: %, Dân số/Vốn: K/M/B, Diện tích: số nguyên km²) — **[v3]** KHÔNG follow CMR-11, áp dụng theo docs UC55 (Q16)
- BR-12: Thẻ KPI cuộn ngang
- BR-13: Badge KCN chỉ có 2 loại: "Sẵn sàng" (xanh), "Đang quy hoạch" (vàng)

**UI/UX FEEDBACK:**
- Loading: Skeleton loading từng section
- Empty state: "Không có dữ liệu" cho các section rỗng

**Trạng thái:** ✅ Luồng đầy đủ — CTA "Đăng ký tư vấn ngay" đã bị loại bỏ (Q1), timeout đã xác nhận (Q5), KPI layout đã rõ ràng (Q2).

**Đánh giá:** 19/20 — Luồng chính và phụ mô tả chi tiết, đầy đủ. Cải thiện đáng kể so với v2: CTA TBD đã resolved (bỏ), timeout flow đã thêm, debounce/state persistence đã xác nhận, KPI null behavior rõ ràng. Chỉ trừ 1 điểm vì CMR-13 pull-to-refresh fail behavior chưa chi tiết.

---

## PHẦN 7 — FUNCTIONAL INTEGRATION ANALYSIS

| Liên kết                     | UC liên quan | Mô tả                                                    | Trạng thái |
| ----------------------------- | ------------- | ---------------------------------------------------------- | ----------- |
| Đăng nhập (Precondition)     | UC256         | Người dùng phải đăng nhập trước khi truy cập UC55        | ✅ Đề cập  |
| Sidebar Navigation           | UC1 (*)       | Truy cập từ Sidebar → "Khu vực đầu tư"                  | ⚡ Partial — không tham chiếu tường minh UC nào quản lý Sidebar |
| Danh mục tỉnh (Catalog API)  | Hệ thống chung | Dữ liệu tỉnh lấy từ API danh mục, dùng chung           | ✅ Đề cập  |
| Cổng thông tin đầu tư        | External link | Mở website ngoài, URL lấy từ API theo mã tỉnh           | ✅ Đề cập  |
| Ứng dụng bản đồ              | External app  | Geo URI scheme → mở app bản đồ mặc định thiết bị. **[v3]** Fallback: mở browser (Q15) | ✅ Đề cập  |

**Đánh giá:** 8/10 — Phân tích liên kết cải thiện so với v2. CTA "Đăng ký tư vấn ngay" đã bị loại bỏ nên không còn integration gap. Map fallback đã rõ ràng. Chỉ trừ vì Sidebar navigation không tham chiếu rõ ràng UC quản lý.

---

## PHẦN 8 — ACCEPTANCE CRITERIA (Tiêu chí chấp nhận)

| AC  | Nội dung                                                                                                             | Testable? | Notes |
| --- | -------------------------------------------------------------------------------------------------------------------- | --------- | ----- |
| AC1 | Dữ liệu hiển thị (tổng quan, KPI, lĩnh vực, KCN, khoảng cách, liên hệ) phải khớp 100% với API cho từng tỉnh. Nội dung tổng quan full text. | ✅ Yes    | Đo lường được, cần có API response để verify |
| AC2 | Bấm vào bản đồ phải mở ứng dụng bản đồ mặc định và hiển thị đúng tọa độ tỉnh. **[v3]** Fallback mở browser nếu không có app (Q15). | ✅ Yes    | Cần xác nhận tọa độ trung tâm từ API |
| AC3 | Thẻ KPI hiển thị định dạng số đúng luật UC55 (K, M, B; dấu phẩy ngăn cách). **[v3]** Không follow CMR-11 (Q16). | ✅ Yes    | Có quy tắc format cụ thể |
| AC4 | Các section empty state hiển thị "Không có dữ liệu" hoặc "--" theo thiết kế nếu API không trả dữ liệu. **[v3]** 4 thẻ KPI luôn hiển thị đủ (Q2). | ✅ Yes    | Có quy tắc rõ ràng cho từng section |

**Nhận xét:**
- AC đã có nhưng chỉ có 4 AC, thiếu AC cho: tìm kiếm tỉnh, pull to refresh, xử lý lỗi, navigation back, loading states.
- Các AC hiện tại đều testable và đo lường được.
- **[v3]** AC đã được bổ sung thông tin từ BA answers (fallback, KPI format, KPI layout).

**Đánh giá:** 7/10 — AC hiện tại chất lượng tốt, đo lường được. Tuy nhiên số lượng AC chưa đủ bao phủ toàn bộ luồng chức năng. Điểm giữ nguyên vì số lượng AC không thay đổi.

---

## PHẦN 9 — NON-FUNCTIONAL REQUIREMENTS (Yêu cầu phi chức năng)

| NFR              | UC Coverage | Notes |
| ---------------- | ----------- | ----- |
| Performance      | ✅ Covered  | **[v3]** BA xác nhận timeout 10 giây theo CMR-07 (Q5) |
| Security         | ⚡ Partial  | Yêu cầu đăng nhập, nhưng không nêu cơ chế bảo mật API |
| Compatibility    | ✅ Covered  | **[v3]** Portrait only — khóa xoay (Q13). Min OS/screen size chưa nêu nhưng đây là quy định chung app |
| Accessibility    | ⚠️ Missing  | Không đề cập accessibility |
| Offline support  | ⚠️ Missing  | Không đề cập cache/offline viewing |

**Đánh giá:** 3/5 — Cải thiện so với v2 nhờ xác nhận timeout (Q5) và portrait lock (Q13). Vẫn thiếu accessibility và offline support.

---

## AUDIT SUMMARY

| #      | Knowledge Area                             | Max Pts | v1 Score | v2 Score | v3 Score | Status     |
| ------ | ------------------------------------------ | ------- | -------- | -------- | -------- | ---------- |
| 1      | Feature Identity                           | 5       | 5/5      | 5/5      | 5/5      | ✅ Complete |
| 2      | Objective & Scope                          | 5       | 5/5      | 5/5      | 5/5      | ✅ Complete |
| 3      | Actors & User Roles                        | 10      | 10/10    | 10/10    | 10/10    | ✅ Complete |
| 4      | Preconditions & Postconditions             | 10      | 10/10    | 10/10    | 10/10    | ✅ Complete |
| 5      | UI Object Inventory & Mapping              | 15      | 12/15    | 12/15    | 14/15    | ⚡ Partial  |
| 6      | Object Attributes & Behavior Definition    | 20      | 14/20    | 14/20    | 16/20    | ⚡ Partial  |
| 7      | Functional Logic & Workflow Decomposition  | 20      | 16/20    | 16/20    | 19/20    | ✅ Near-Complete |
| 8      | Functional Integration Analysis            | 10      | 7/10     | 7/10     | 8/10     | ⚡ Partial  |
| 9      | Acceptance Criteria                        | 10      | 7/10     | 7/10     | 7/10     | ⚡ Partial  |
| 10     | Non-functional Requirements                | 5       | 2/5      | 2/5      | 3/5      | ⚡ Partial  |
| **Total** |                                         | **110** | **88/110** | **88/110** | **97/110** | **88.2/100** |

**Verdict:** ⚡ **CONDITIONALLY READY** (88.2/100) — Cải thiện +9 điểm so với v2

> Điểm số v3 tăng đáng kể từ 88/110 (80.0/100) lên 97/110 (88.2/100) nhờ BA giải đáp 10 câu hỏi quan trọng, bao gồm cả 2 câu High-priority (Q1: bỏ CTA, Q2: KPI layout). Wireframe conflict duy nhất (Q17) cũng đã resolved.
>
> Còn 4 câu hỏi Deferred (Q7, Q9, Q10, Q12) — tất cả đều Medium/Low priority, không block test case design cho luồng chính.

---

## UNIFIED GAP & QUESTION REPORT

### Resolved in v3 (10 questions)

| ID  | Priority | Question | Resolution | Resolved By | Date |
| --- | -------- | -------- | ---------- | ----------- | ---- |
| Q1  | High     | Nút "Đăng ký tư vấn ngay" [TBD] | **Bỏ CTA** — Xóa nút #21 và toàn bộ hành vi liên quan khỏi scope UC55 | BA | 08/05/2026 |
| Q2  | High     | KPI NULL → hiển thị 4 thẻ đầy đủ hay chỉ thẻ có dữ liệu? | **4 thẻ vẫn hiển thị đủ**, không break UI. NULL → "--" | BA | 08/05/2026 |
| Q3  | Medium   | Debounce 3 giây vs "lọc real-time"? | **Có áp dụng debounce 3s** theo CMR-01. "Real-time" = không cần Enter | BA | 08/05/2026 |
| Q4  | Medium   | State Persistence cho ô tìm kiếm tỉnh? | **Có áp dụng** theo CMR-01. Quay lại → giữ keyword + trạng thái lọc | BA | 08/05/2026 |
| Q5  | Medium   | Timeout handling khi API > 10 giây? | **Giống CMR-07.** Timeout 10s + thông báo + nút "Thử lại" | BA | 08/05/2026 |
| Q6  | Medium   | CMR-04 liệt kê UC55 nhưng UC55 "không lazy load"? | **Ngoại lệ có chủ đích.** CMR-04 liệt kê UC55 là lỗi trong CMR | BA | 08/05/2026 |
| Q13 | Low      | Khóa portrait hay cho phép landscape? | **Không áp dụng landscape.** Khóa portrait | BA | 08/05/2026 |
| Q15 | Low      | Không có app bản đồ → xử lý thế nào? | **Mở browser.** Fallback mở bản đồ trên trình duyệt | BA | 08/05/2026 |
| Q16 | Low      | UC55 format riêng vs CMR-11? | **Áp dụng theo docs UC55**, không follow CMR-11 | BA | 08/05/2026 |
| Q17 | Medium   | Wireframe "Container tab" vs UC55 scroll dọc? | **Container nằm ở giữa màn hình**, không liên quan đến scroll. Không có conflict | BA | 08/05/2026 |

### Removed (3 questions — BA xác nhận không test)

| ID  | Priority | Reason for Removal |
| --- | -------- | ------------------ |
| Q8  | Medium   | BA: "Không test API nên xoá" — Partial API failure không nằm trong scope testing |
| Q11 | Medium   | BA: "Không test nên xoá" — Double-tap chặn không nằm trong scope testing |
| Q14 | Low      | BA: "Không test nên xoá" — Deep link không nằm trong scope testing |

### Still Open / Deferred (4 questions)

| ID  | Priority | Ref | Question | Why It Matters | Status |
| --- | -------- | --- | -------- | -------------- | ------ |
| Q7  | Medium   | Section 2.2 | Quy tắc truncate/wrap cho text overflow? | Vỡ layout trên thiết bị nhỏ | Deferred |
| Q9  | Medium   | Section 2.2, #3 | Tagline banner null → xử lý overlay thế nào? | Banner empty state | Deferred |
| Q10 | Medium   | N/A (Missing) | Session hết hạn khi đang xem → xử lý? | Session timeout behavior | Deferred |
| Q12 | Low      | Section 2.1, #4 | Max length ô tìm kiếm? CMR-11: 500 ký tự? | Input validation boundary | Deferred |

---

## WHAT'S GOOD

1. **Mô tả giao diện chi tiết:** UC55 cung cấp bảng mô tả UI rất chi tiết cho cả 2 màn hình, với đầy đủ kiểu trường, giá trị mặc định, và quy tắc hiển thị/hành động.
2. **Format số KPI rõ ràng:** Quy tắc rút gọn số K/M/B được định nghĩa cụ thể cho từng thẻ KPI với ví dụ minh họa. **[v3]** Đã xác nhận áp dụng theo UC55, không follow CMR-11.
3. **Empty state đầy đủ:** Mỗi section đều có quy tắc xử lý khi dữ liệu rỗng. **[v3]** KPI NULL → "--" + 4 thẻ luôn hiển thị.
4. **Xử lý lỗi ảnh:** Trường hợp ảnh banner không load được có xử lý rõ ràng.
5. **Exclusions rõ ràng:** Phạm vi ngoài UC được liệt kê cụ thể. **[v3]** CTA "Đăng ký tư vấn ngay" đã bị loại bỏ rõ ràng.
6. **Tham chiếu CMR tốt:** UC tham chiếu CMR-01, CMR-06, CMR-07, CMR-13, CMR-14 tại các điểm phù hợp. **[v3]** CMR-01 (debounce + state persistence) và CMR-07 (timeout) đã xác nhận áp dụng đầy đủ.
7. **Dữ liệu động:** UC nhấn mạnh rõ ràng việc lấy dữ liệu từ API, không hard-code.
8. **Wireframe phù hợp:** 4/4 wireframe đã xác nhận phù hợp với UC55 (conflict duy nhất đã resolved).
9. **[v3] Scope rõ ràng:** Sau khi BA trả lời, scope UC55 hoàn toàn rõ ràng — không còn TBD nào.

---

## TESTABILITY OUTLOOK

**What CAN be tested now (>95% chức năng):**
- Luồng xem danh sách tỉnh (hiển thị 63 tỉnh, sắp xếp A–Z, skeleton loading)
- Tìm kiếm tỉnh (lọc real-time, debounce 3s, xóa từ khóa, không có kết quả, State Persistence)
- Luồng xem chi tiết chuyên trang (navigation, hiển thị 7 sections — CTA đã bỏ)
- Format số KPI (GRDP %, Dân số K/M/B, Vốn $K/M/B, Diện tích km²) — theo UC55 format
- Empty state cho tất cả sections (KPI → "--" + 4 thẻ luôn hiển thị)
- Banner ảnh + overlay text + fallback khi ảnh lỗi
- Badge trạng thái KCN (Sẵn sàng / Đang quy hoạch)
- Tap bản đồ → mở ứng dụng bản đồ + fallback mở browser
- Nút "Cổng thông tin đầu tư" → mở link ngoài (+ ẩn khi URL null)
- Thẻ liên hệ (ĐT + Email, xử lý null → "--")
- Navigation back (CMR-06) + State Persistence
- Pull to Refresh cả 2 màn hình
- Lỗi mạng, API 500, 404, Timeout 10s
- Portrait only (khóa xoay)

**What CANNOT be tested yet (blocked by Deferred gaps):**
- Text overflow/truncate behavior (Q7 — Medium, Deferred)
- Tagline banner null overlay (Q9 — Medium, Deferred)
- Session expiry behavior (Q10 — Medium, Deferred)
- Max length ô tìm kiếm (Q12 — Low, Deferred)

---

## SUMMARY & RECOMMENDATION

**Verdict:** ⚡ **CONDITIONALLY READY — 88.2/100** (+8.2 so với v2)

UC55 đã cải thiện đáng kể từ 80.0/100 lên 88.2/100 sau khi BA giải đáp 10/17 câu hỏi. Cả 2 câu hỏi High-priority đều đã resolved:
- Q1 (CTA "Đăng ký tư vấn ngay"): **Bỏ khỏi scope** → loại bỏ hoàn toàn blocker lớn nhất
- Q2 (KPI NULL layout): **4 thẻ luôn hiển thị** → UI behavior rõ ràng

**Còn 4 câu hỏi Deferred** (Q7, Q9, Q10, Q12) — tất cả Medium/Low priority, KHÔNG block test case design cho luồng chính. QA có thể thiết kế test case cho >95% chức năng.

**Khuyến nghị:**
- ✅ **Tiếp tục thiết kế test case** cho toàn bộ luồng chính và phụ
- ⚠️ Đánh dấu test case liên quan Q7/Q9/Q10/Q12 là "Deferred" trong test suite
- 📋 BA nên giải đáp Q7 (truncate rules) khi có thời gian — ảnh hưởng đến UI testing trên thiết bị nhỏ

---

## CHANGELOG

| Version | Date       | Changes |
| ------- | ---------- | ------- |
| v1      | 08/05/2026 | First audit — Score 88/110 (80.0/100), CONDITIONALLY READY. 16 open questions (Q1–Q16). |
| v2      | 08/05/2026 | Re-audit (Defer all). Wireframe analysis added (4 images). Q1–Q16 deferred. New Q17 added. Score unchanged: 88/110 (80.0/100). |
| v3      | 08/05/2026 | Re-audit after BA answers. **10 questions resolved** (Q1–Q6, Q13, Q15–Q17). **3 questions removed** (Q8, Q11, Q14). 4 questions remain Deferred (Q7, Q9, Q10, Q12). Key changes: CTA removed from scope, KPI layout confirmed, CMR-01/07/16 fully applied, wireframe conflict resolved, portrait locked, map fallback to browser, UC55 KPI format independent. Score improved: **97/110 (88.2/100)** (+9 raw, +8.2 normalized). |

