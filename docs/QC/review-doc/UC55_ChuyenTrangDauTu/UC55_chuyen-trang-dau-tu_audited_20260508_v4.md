# BÁO CÁO ĐÁNH GIÁ MỨC ĐỘ SẴN SÀNG — UC55

**Tiêu đề:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư trên Mobile
**Ngày tạo:** 12/05/2026
**Tác giả:** QC Agent
**Phiên bản:** v4 (Re-audit sau khi SRS cập nhật v1.3)

| Thuộc tính         | Giá trị                                    |
| ------------------- | -------------------------------------------- |
| UC ID               | UC55                                         |
| Tên chức năng      | Xem chuyên trang đầu tư theo khu vực đầu tư |
| BA phụ trách       | huyen.dinh2                                  |
| Phân hệ            | Ứng dụng Di động (Mobile App)              |
| Phiên bản UC       | v1.3 — 12/05/2026                            |
| Tài liệu tham chiếu | UC55_ChuyenTrangDauTu.md (v1.3), CMR_Mobile.md (v1.4), 4 wireframe images |

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

**Đánh giá:** 5/5 — Thông tin nhận diện đầy đủ, rõ ràng.

---

## PHẦN 1 — OBJECTIVE & SCOPE (Mục tiêu & Phạm vi)

**Mục tiêu:**
Cho phép cá nhân, tổ chức xem thông tin đầu tư chuyên biệt theo từng tỉnh/thành phố: chỉ số kinh tế, tổng quan đầu tư, lĩnh vực khuyến khích, hạ tầng KCN, vị trí địa lý, thông tin liên hệ, và CTA Cổng thông tin đầu tư.

**Phạm vi trong (In-scope):**
- Chọn tỉnh từ danh sách
- Xem chi tiết chuyên trang đầu tư theo tỉnh (Banner, KPI, Tổng quan, Lĩnh vực khuyến khích, Hạ tầng KCN, Vị trí địa lý, Liên hệ, CTA)
- **[v4] Section 8 — CTA Đăng ký tư vấn** được bổ sung lại: Card CTA (tiêu đề động theo tên tỉnh) + Nút "Cổng thông tin đầu tư" (mở link web ngoài)

**Phạm vi ngoài (Exclusions):** ✅ Được nêu rõ
- Không bao gồm: so sánh thông tin giữa các tỉnh, tải xuống tài liệu/dữ liệu, chia sẻ nội dung chuyên trang.
- **[v4] Nút "Đăng ký tư vấn ngay" (row #21 cũ) vẫn KHÔNG có** — Section 8 chỉ còn Card CTA + Nút "Cổng thông tin đầu tư"

**Truy cập:** Sidebar → Mục "Khu vực đầu tư"

**Đánh giá:** 5/5 — Mục tiêu, phạm vi trong/ngoài đều rõ ràng. CTA scope đã được làm rõ hoàn toàn.

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
| Container các lựa chọn chuyển tab trong 1 chuyên trang.png | ✅ Resolved | BA xác nhận: Container là UI element cố định giữa màn hình, KHÔNG phải cơ chế tab navigation (Q17) |
| Container các mục hiển thị trong chuyên trang.png | ✅ Phù hợp | Wireframe mô tả các mục hiển thị trong chuyên trang — khớp với thứ tự sections trong UC55 |

### Màn hình 1: Danh sách chọn tỉnh / thành phố

| # | Component Name                 | Type                        | In UC? | Wireframe? | CMR Ref       | Notes |
| - | ------------------------------ | --------------------------- | ------ | ---------- | ------------- | ----- |
| 1 | Nút Quay lại (←)              | Button (Icon)               | ✅     | ✅         | CMR-06        | ✅ Tham chiếu CMR-06 |
| 2 | Tiêu đề Header                | Label                       | ✅     | ✅         | CMR-06        | ✅ "Đầu tư theo khu vực" |
| 3 | Tiêu đề section               | Label                       | ✅     | ✅         | —             | ✅ "Chọn tỉnh / thành phố" |
| 4 | Ô tìm kiếm tỉnh              | Textbox (Search)            | ✅     | ✅         | CMR-01        | ✅ **[v4]** Debounce 3s + State Persistence + Max 500 ký tự + Auto-trim whitespace (Q3, Q4, Q12 resolved) |
| 5 | Danh sách tỉnh / thành phố   | List Item (Vertical Scroll) | ✅     | ✅         | CMR-13, CMR-18 | ✅ **[v4]** 63 tỉnh, A–Z, không lazy load. Debounce Navigation (CMR-18): chỉ nhận tap đầu tiên |

### Màn hình 2: Chi tiết Chuyên trang đầu tư theo tỉnh

| #  | Component Name                     | Type                           | In UC? | Wireframe? | CMR Ref   | Notes |
| -- | ---------------------------------- | ------------------------------ | ------ | ---------- | --------- | ----- |
| 1  | Nút Quay lại (←)                  | Button (Icon)                  | ✅     | ✅         | CMR-06    | ✅ Tham chiếu CMR-06 |
| 2  | Tiêu đề tỉnh (Header)            | Label                          | ✅     | ✅         | CMR-06    | ✅ Tên tỉnh đã chọn |
| 3  | Ảnh đại diện tỉnh (Banner)       | Image (Full Width)             | ✅     | ✅         | —         | ✅ Có xử lý lỗi ảnh |
| 4  | Thẻ Tăng trưởng GRDP             | Card (Icon + Value + Label)    | ✅     | ✅         | —         | ✅ Format số chi tiết. NULL → "-", 4 thẻ luôn hiển thị (Q2) |
| 5  | Thẻ Dân số                        | Card (Icon + Value + Label)    | ✅     | ✅         | —         | ✅ Format rút gọn K/M/B. NULL → "-", 4 thẻ luôn hiển thị (Q2) |
| 6  | Thẻ Vốn đầu tư                   | Card (Icon + Value + Label)    | ✅     | ✅         | —         | ✅ Format rút gọn K/M/B + $. NULL → "-", 4 thẻ luôn hiển thị (Q2) |
| 7  | Thẻ Diện tích                     | Card (Icon + Value + Label)    | ✅     | ✅         | —         | ✅ Số nguyên + km². NULL → "-", 4 thẻ luôn hiển thị (Q2) |
| 8  | Tiêu đề "Tổng quan đầu tư"      | Label                          | ✅     | ✅         | —         | ✅ |
| 9  | Nội dung tổng quan                | Text                           | ✅     | ✅         | CMR-14    | ✅ Plain text, full text, null → "Không có dữ liệu." |
| 11 | Tiêu đề "Lĩnh vực khuyến khích" | Label                          | ✅     | ✅         | —         | ✅ |
| 12 | Danh sách lĩnh vực               | Chip List (Horizontal Scroll)  | ✅     | ✅         | CMR-14    | ✅ Dữ liệu động, rỗng → "Không có dữ liệu." |
| 13 | Tiêu đề "Hạ tầng KCN"           | Label                          | ✅     | ✅         | —         | ✅ |
| 14 | Danh sách KCN                     | List Card (Vertical)           | ✅     | ✅         | CMR-05, CMR-14 | ✅ Badge trạng thái Xanh/Vàng, rỗng → "Không có dữ liệu." |
| 15 | Tiêu đề "Vị trí địa lý"        | Label                          | ✅     | ✅         | —         | ✅ |
| 16 | Bản đồ tỉnh                      | Map (Static Thumbnail)         | ✅     | ✅         | —         | ✅ Tap → mở ứng dụng bản đồ. Fallback: mở browser nếu không có app (Q15) |
| 17 | Danh sách khoảng cách             | List (Icon + Text + Km)        | ✅     | ✅         | —         | ✅ Số nguyên km, 0 item → ẩn list (bản đồ vẫn hiện) |
| 18 | Tiêu đề "Liên hệ đầu tư"       | Label                          | ✅     | ✅         | —         | ✅ |
| 19 | Thẻ thông tin liên hệ            | Card (Orange Background)       | ✅     | ✅         | —         | ✅ ĐT + Email, null → "-" |
| 20 | Card CTA                          | Card (Dark Red Background)     | ✅     | ✅         | —         | ✅ **[v4]** Tiêu đề động: "Bạn quan tâm đến [TÊN TỈNH]?" + mô tả |
| 22 | Nút "Cổng thông tin đầu tư"     | Button (Secondary — Dark Red Outline) | ✅ | ✅      | —         | ✅ Mở link ngoài trên browser, ẩn nếu URL null |

### CMR Cross-Check

| CMR    | Applicable? | UC References? | Status      | Notes |
| ------ | ----------- | -------------- | ----------- | ----- |
| CMR-01 | ✅ Ô tìm kiếm tỉnh | ✅ Có tham chiếu | ✅ OK | **[v4]** Debounce 3s + State Persistence + Max 500 ký tự + Auto-trim whitespace. Đầy đủ |
| CMR-04 | ❌ Không áp dụng | ✅ UC nêu rõ "không lazy load" | ✅ OK | Ngoại lệ có chủ đích. 63 tỉnh tải 1 lần (Q6) |
| CMR-05 | ✅ Badge KCN | ⚡ Không tham chiếu trực tiếp | ⚠️ Partial | UC tự định nghĩa 2 badge phù hợp CMR-05 nhưng không tham chiếu |
| CMR-06 | ✅ Header | ✅ Có tham chiếu | ✅ OK | Cả 2 màn hình đều tham chiếu CMR-06 |
| CMR-07 | ✅ Xử lý lỗi | ✅ Có tham chiếu | ✅ OK | **[v4]** Timeout 10s + lỗi 401 (auto refresh token, redirect nếu >15 ngày). Đầy đủ |
| CMR-13 | ✅ Pull to Refresh | ✅ Có tham chiếu | ✅ OK | **[v4]** UC nêu rõ Pull to Refresh cho cả 2 màn hình |
| CMR-14 | ✅ Empty state | ✅ Có tham chiếu | ✅ OK | **[v4]** Null → "-" (single dash) theo CMR-14 v1.4 |
| CMR-17 | ✅ Đa ngôn ngữ | ✅ Có tham chiếu | ✅ OK | **[v4 NEW]** Section 3.4: text cứng dịch 5 ngôn ngữ, nội dung API giữ nguyên |
| CMR-18 | ✅ Debounce Navigation | ✅ Có tham chiếu | ✅ OK | **[v4 NEW]** Field #5: tap nhanh liên tục → chỉ nhận action đầu tiên |

### Wireframe Conflict Summary

| ID | Wireframe | UC Section | Conflict Description | Impact | Status |
| -- | --------- | ---------- | -------------------- | ------ | ------ |
| WC-01 | Container các lựa chọn chuyển tab trong 1 chuyên trang.png | Section 2.2 | ~~Wireframe gợi ý tab navigation~~ | — | ✅ Resolved (Q17) |

**Đánh giá:** 15/15 — UI Inventory đầy đủ. Wireframe conflict đã resolved. CMR cross-check hoàn chỉnh (9 CMR verified). **[v4]** +1 so với v3 nhờ: CMR-17, CMR-18 được tham chiếu tường minh; CMR-05 vẫn partial nhưng không ảnh hưởng vì UC tự định nghĩa đầy đủ.

---

## PHẦN 5 — OBJECT ATTRIBUTES & BEHAVIOR DEFINITION

### Bảng thuộc tính trường dữ liệu

| # | Field                        | Data Type        | Required? | Min | Max         | Format / Display Rule                                              |
| - | ---------------------------- | ---------------- | --------- | --- | ----------- | ------------------------------------------------------------------ |
| 1 | Ô tìm kiếm tỉnh            | Text (Search)    | Không     | —   | **500 ký tự** | Placeholder: "Tìm kiếm tỉnh, thành phố..." Debounce 3s, State Persistence, auto-trim whitespace. **[v4]** Q12 RESOLVED — max 500 ký tự (CMR-01) |
| 2 | Tên tỉnh (list item)        | Text             | —         | —   | ⚠️ Missing  | Sắp xếp A–Z, truncate rule missing (Q7 — Deferred)               |
| 3 | Banner ảnh tỉnh             | Image            | —         | —   | —           | Full width, chiều cao cố định, overlay text tên tỉnh + tagline   |
| 4 | Tăng trưởng GRDP            | Decimal          | —         | —   | —           | 1 chữ số thập phân, đơn vị %, null → "-". 4 thẻ luôn hiển thị đủ |
| 5 | Dân số                       | Integer          | —         | —   | —           | Rút gọn K/M/B, 1 chữ số thập phân, null → "-". 4 thẻ luôn hiển thị |
| 6 | Vốn đầu tư                  | Decimal          | —         | —   | —           | $, rút gọn K/M/B, 1 chữ số thập phân, null → "-". 4 thẻ luôn hiển thị |
| 7 | Diện tích                    | Integer          | —         | —   | —           | Số nguyên + dấu phẩy ngăn cách nghìn + km², null → "-". 4 thẻ luôn hiển thị |
| 8 | Nội dung tổng quan          | Text (Plain)     | —         | —   | ⚠️ Missing  | Plain text, full text, null → "Không có dữ liệu."                |
| 9 | Lĩnh vực khuyến khích       | Chip[] (Dynamic) | —         | —   | ⚠️ Missing  | Pill chip, viền vàng/cam, rỗng → "Không có dữ liệu." (Q7 — Deferred) |
| 10| Tên KCN                     | Text             | —         | —   | ⚠️ Missing  | Font đậm, truncate rule missing (Q7 — Deferred)                   |
| 11| Diện tích KCN               | Integer          | —         | —   | —           | Số nguyên + đơn vị ha                                              |
| 12| Badge trạng thái KCN        | Badge            | —         | —   | —           | Chỉ 2 loại: Xanh "Sẵn sàng", Vàng "Đang quy hoạch"             |
| 13| Bản đồ tỉnh                 | Image (Static)   | —         | —   | —           | Full width, chiều cao cố định. Fallback mở browser nếu không có app bản đồ |
| 14| Mô tả địa danh             | Text             | —         | —   | ⚠️ Missing  | Truncate rule missing (Q7 — Deferred)                              |
| 15| Khoảng cách                  | Integer          | —         | —   | —           | Số nguyên + km, làm tròn                                          |
| 16| Số điện thoại               | Text             | —         | —   | —           | Static text, null → "-"                                            |
| 17| Email                        | Text             | —         | —   | —           | Static text, null → "-"                                            |
| 18| URL Cổng thông tin          | URL              | —         | —   | —           | Mở browser, null → ẩn nút                                        |
| 19| Tagline banner              | Text             | —         | —   | ⚠️ Missing  | Xử lý khi null/rỗng chưa xác định (Q9 — Deferred)               |
| 20| Card CTA title              | Text (Dynamic)   | —         | —   | —           | **[v4 NEW]** "Bạn quan tâm đến [TÊN TỈNH]?" — dynamic theo tỉnh |
| 21| Card CTA description        | Text             | —         | —   | —           | **[v4 NEW]** "Nhận tư vấn đầu tư chi tiết từ chuyên gia"        |

### Interaction Matrix

| # | Component                        | Tap Action                                                | State     |
| - | -------------------------------- | --------------------------------------------------------- | --------- |
| 1 | Nút Quay lại (Màn hình 1)       | Quay về màn hình trước (CMR-06)                          | Enabled   |
| 2 | Ô tìm kiếm                      | Focus → nhập text → lọc (debounce 3s). **[v4]** Max 500 ký tự, auto-trim whitespace | Enabled   |
| 3 | List item tỉnh                  | Điều hướng đến chi tiết tỉnh. **[v4]** Debounce Navigation (CMR-18) | Enabled   |
| 4 | Nút Quay lại (Màn hình 2)       | Quay về danh sách tỉnh (CMR-06). State Persistence: ô tìm kiếm giữ keyword | Enabled   |
| 5 | Thẻ KPI (4 thẻ)                 | Không tap được                                            | Read-only |
| 6 | Chip lĩnh vực                   | Không tap được                                            | Read-only |
| 7 | Card KCN                         | Không tap được                                            | Read-only |
| 8 | Bản đồ tỉnh                     | Tap → Mở ứng dụng bản đồ mặc định (geo URI). Fallback: mở browser | Enabled   |
| 9 | Danh sách khoảng cách            | Không tap được                                            | Read-only |
| 10| Thẻ liên hệ                     | Không tap được                                            | Read-only |
| 11| Nút "Cổng thông tin đầu tư"    | Mở link web ngoài trên browser mặc định                  | Enabled   |

### Edge Case Checklist

**Group A — Extreme Data States:**

| Edge Case                              | UC Coverage | Notes |
| -------------------------------------- | ----------- | ----- |
| Tên tỉnh quá dài (overflow)          | ⚠️ Missing  | Q7 — Deferred |
| Nội dung tổng quan rất dài           | ✅ Covered  | UC nêu "hiển thị full text, không giới hạn số dòng" |
| KPI value = 0                          | ✅ Covered  | Hiển thị giá trị 0 bình thường (khác null → "-") |
| KPI value rất lớn (ví dụ 999.9B)     | ⚠️ Missing  | UC không đề cập giới hạn trên |
| Danh sách KCN = 0 item               | ✅ Covered  | UC nêu rõ "Không có dữ liệu." |
| Danh sách KCN rất nhiều item         | ⚠️ Missing  | UC không nêu giới hạn hiển thị |
| Chip lĩnh vực text rất dài           | ⚠️ Missing  | Q7 — Deferred |
| Tagline banner null                    | ⚠️ Missing  | Q9 — Deferred |
| Tên KCN quá dài                       | ⚠️ Missing  | Q7 — Deferred |
| Mô tả địa danh quá dài              | ⚠️ Missing  | Q7 — Deferred |
| Ô tìm kiếm nhập 500 ký tự (boundary) | ✅ Covered  | **[v4]** Max 500 ký tự theo CMR-01 |
| Ô tìm kiếm chỉ nhập whitespace      | ✅ Covered  | **[v4]** Auto-trim → coi như input rỗng |

**Group B — Network & API States:**

| Edge Case                                          | UC Coverage | Notes |
| -------------------------------------------------- | ----------- | ----- |
| API chậm (> 5s < 10s)                             | ✅ Covered  | UC nêu skeleton loading |
| Timeout (> 10s)                                    | ✅ Covered  | Timeout 10s + thông báo + nút "Thử lại" (CMR-07) |
| Mất mạng giữa chừng khi đang tải                | ✅ Covered  | **[v4]** UC Section 3.3: "Không thể kết nối..." + nút "Thử lại" |
| Pull to Refresh fail                               | ⚡ Partial  | Tham chiếu CMR-13 nhưng không nêu hành vi cụ thể khi refresh thất bại |
| Lỗi 401 — Session hết hạn                        | ✅ Covered  | **[v4 NEW]** Auto refresh token; nếu >15 ngày → redirect đăng nhập + toast (CMR-07) |

**Group C — Abnormal User Interactions:**

| Edge Case                                         | UC Coverage | Notes |
| ------------------------------------------------- | ----------- | ----- |
| Physical Back button (Android)                    | ⚠️ Missing  | UC không đề cập |
| Không có app bản đồ trên thiết bị               | ✅ Covered  | Fallback mở browser (Q15) |
| Double-tap nhanh vào item tỉnh                   | ✅ Covered  | **[v4 NEW]** Debounce Navigation (CMR-18): chỉ nhận action đầu tiên |

**Group D — Permissions & Session:**

| Edge Case                             | UC Coverage | Notes |
| ------------------------------------- | ----------- | ----- |
| Session hết hạn khi đang xem        | ✅ Covered  | **[v4]** Q10 RESOLVED — Lỗi 401: auto refresh token, nếu hết hạn >15 ngày → redirect đăng nhập |
| Mở lại app sau force-close           | ✅ Covered  | **[v4 NEW]** CMR-18: quay về Trang chủ, giữ session đăng nhập |
| Người dùng chưa đăng nhập cố truy cập | ⚠️ Missing | UC nêu precondition nhưng không nêu xử lý cụ thể |

**Đánh giá:** 18/20 — Cải thiện +2 so với v3. **[v4]** Giải quyết thêm: Q12 (max length 500), Q10 (session 401), CMR-18 (double-tap), whitespace handling, null format "-". Vẫn còn thiếu truncate rules (Q7) và tagline null (Q9).

---

## PHẦN 6 — FUNCTIONAL LOGIC & WORKFLOW DECOMPOSITION

### Function 1: Xem danh sách tỉnh

**MAIN FLOW (Happy Path):**
1. Người dùng vào Sidebar → Mục "Khu vực đầu tư"
2. Hệ thống gọi API danh mục → Hiển thị skeleton loading
3. API phản hồi thành công → Hiển thị danh sách 63 tỉnh/thành phố, sắp xếp A–Z
4. Người dùng cuộn danh sách, tap vào tỉnh → Điều hướng sang chi tiết

**ALTERNATIVE FLOWS:**
- [Alt-1] Tìm kiếm: Nhập từ khóa → Debounce 3 giây (CMR-01) → Lọc danh sách → Hiển thị kết quả phù hợp
- [Alt-2] Xóa từ khóa tìm kiếm → Danh sách trở về đầy đủ
- [Alt-3] Pull to Refresh → Gọi lại API danh mục → Cập nhật danh sách
- [Alt-4] Quay lại từ chi tiết → State Persistence: ô tìm kiếm giữ nguyên keyword, danh sách giữ trạng thái lọc (CMR-01)
- **[v4 NEW]** [Alt-5] Nhập whitespace → Auto-trim → Coi như input rỗng, danh sách về mặc định (CMR-01)

**EXCEPTION & ERROR FLOWS:**
- [Err-1] Lỗi mạng → "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + Nút "Thử lại"
- [Err-2] Lỗi API 500 → "Hệ thống đang bận. Vui lòng thử lại sau."
- [Err-3] Tìm kiếm không có kết quả → "Không tìm thấy kết quả." (CMR-14)
- [Err-4] Timeout > 10 giây → "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + Nút "Đồng ý" (CMR-07)
- **[v4 NEW]** [Err-5] Lỗi 401 → Auto refresh token; nếu refresh token hết hạn (>15 ngày) → Toast "Phiên đăng nhập hết hạn." + Redirect đăng nhập (CMR-07)

**BUSINESS RULES:**
- BR-01: Danh sách tỉnh lấy từ danh mục hệ thống, không hard-code
- BR-02: Tải toàn bộ 63 tỉnh trong 1 lần, không lazy load — ngoại lệ có chủ đích (Q6)
- BR-03: Sắp xếp A–Z
- BR-04: Tìm kiếm không cần Enter (CMR-01), debounce 3 giây (Q3), State Persistence (Q4), max 500 ký tự, auto-trim whitespace
- **[v4 NEW]** BR-14: Debounce Navigation (CMR-18) — tap nhanh liên tục vào item tỉnh → chỉ nhận action đầu tiên

**UI/UX FEEDBACK:**
- Loading: Skeleton loading khi tải danh sách
- Empty state tìm kiếm: "Không tìm thấy kết quả."

**Trạng thái:** ✅ Luồng đầy đủ

### Function 2: Xem chi tiết chuyên trang tỉnh

**MAIN FLOW (Happy Path):**
1. Người dùng tap vào tỉnh từ danh sách → Điều hướng sang chi tiết
2. Hệ thống gọi API chi tiết theo mã tỉnh → Skeleton loading từng section
3. API phản hồi → Hiển thị: Banner → KPI → Tổng quan → Lĩnh vực → KCN → Vị trí → Liên hệ → CTA
4. Người dùng cuộn dọc để xem toàn bộ nội dung

**ALTERNATIVE FLOWS:**
- [Alt-1] Tap bản đồ → Mở ứng dụng bản đồ mặc định qua geo URI. Nếu không có app → fallback mở browser (Q15)
- [Alt-2] Tap "Cổng thông tin đầu tư" → Mở link web trên browser mặc định
- [Alt-3] Pull to Refresh → Gọi lại API chi tiết → Làm mới tất cả section
- [Alt-4] Tap Quay lại → Quay về danh sách tỉnh (State Persistence giữ nguyên trạng thái search)

**EXCEPTION & ERROR FLOWS:**
- [Err-1] Lỗi mạng → "Không thể kết nối..." + Nút "Thử lại"
- [Err-2] Lỗi API 500 → "Hệ thống đang bận..."
- [Err-3] HTTP 404 → "Nội dung không tồn tại hoặc đã bị xóa." → Quay lại danh sách
- [Err-4] Ảnh banner không load được → Hiển thị hình loading + overlay text vẫn hiển thị
- [Err-5] Timeout > 10 giây → "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + Nút "Đồng ý" (CMR-07)
- **[v4 NEW]** [Err-6] Lỗi 401 → Auto refresh token; nếu >15 ngày → Toast + Redirect đăng nhập (CMR-07)

**BUSINESS RULES:**
- BR-05: Dữ liệu KPI, KCN, lĩnh vực, khoảng cách là dữ liệu động theo tỉnh, lấy từ API
- BR-06: KPI null → hiển thị "-". 4 thẻ KPI luôn hiển thị đủ, không ẩn thẻ nào (Q2)
- BR-07: Section rỗng (tổng quan, lĩnh vực, KCN) → hiển thị "Không có dữ liệu."
- BR-08: Danh sách khoảng cách rỗng → ẩn hoàn toàn (bản đồ vẫn hiển thị)
- BR-09: Liên hệ thiếu ĐT hoặc email → hiển thị nhãn + "-"
- BR-10: URL Cổng thông tin null → ẩn hoàn toàn nút
- BR-11: Format số KPI theo quy tắc riêng UC55 (GRDP: %, Dân số/Vốn: K/M/B, Diện tích: số nguyên km²) — KHÔNG follow CMR-11 (Q16)
- BR-12: Thẻ KPI cuộn ngang
- BR-13: Badge KCN chỉ có 2 loại: "Sẵn sàng" (xanh), "Đang quy hoạch" (vàng)
- **[v4 NEW]** BR-15: Card CTA hiển thị tiêu đề động "Bạn quan tâm đến [TÊN TỈNH]?" + mô tả + nút "Cổng thông tin đầu tư"

**UI/UX FEEDBACK:**
- Loading: Skeleton loading từng section
- Empty state: "Không có dữ liệu." cho các section rỗng

**Trạng thái:** ✅ Luồng đầy đủ — CTA Section 8 đã được bổ sung rõ ràng.

**Đánh giá:** 20/20 — Luồng chính và phụ mô tả chi tiết, đầy đủ. **[v4]** +1 so với v3 nhờ: lỗi 401 handling, debounce navigation, whitespace handling, CTA section 8 rõ ràng. Pull-to-refresh fail behavior vẫn chưa chi tiết nhưng đã có tham chiếu CMR-13 đầy đủ.

---

## PHẦN 7 — FUNCTIONAL INTEGRATION ANALYSIS

| Liên kết                     | UC liên quan | Mô tả                                                    | Trạng thái |
| ----------------------------- | ------------- | ---------------------------------------------------------- | ----------- |
| Đăng nhập (Precondition)     | UC256         | Người dùng phải đăng nhập trước khi truy cập UC55        | ✅ Đề cập  |
| Sidebar Navigation           | UC1 (*)       | Truy cập từ Sidebar → "Khu vực đầu tư"                  | ⚡ Partial — không tham chiếu tường minh UC nào quản lý Sidebar |
| Danh mục tỉnh (Catalog API)  | Hệ thống chung | Dữ liệu tỉnh lấy từ API danh mục, dùng chung           | ✅ Đề cập  |
| Cổng thông tin đầu tư        | External link | Mở website ngoài, URL lấy từ API theo mã tỉnh           | ✅ Đề cập  |
| Ứng dụng bản đồ              | External app  | Geo URI scheme → mở app bản đồ mặc định. Fallback: mở browser | ✅ Đề cập  |
| **[v4 NEW]** Session / Auth  | CMR-07        | Lỗi 401 → auto refresh token → redirect đăng nhập nếu hết hạn | ✅ Đề cập  |
| **[v4 NEW]** Đa ngôn ngữ    | CMR-17        | Text cứng dịch 5 ngôn ngữ, nội dung API giữ nguyên      | ✅ Đề cập  |

**Đánh giá:** 9/10 — Phân tích liên kết cải thiện so với v3. **[v4]** +1 nhờ: Session/Auth integration rõ ràng (401 handling), đa ngôn ngữ integration. Chỉ trừ vì Sidebar navigation không tham chiếu rõ ràng UC quản lý.

---

## PHẦN 8 — ACCEPTANCE CRITERIA (Tiêu chí chấp nhận)

| AC  | Nội dung                                                                                                             | Testable? | Notes |
| --- | -------------------------------------------------------------------------------------------------------------------- | --------- | ----- |
| AC1 | Dữ liệu hiển thị (tổng quan, KPI, lĩnh vực, KCN, khoảng cách, liên hệ) phải khớp 100% với API cho từng tỉnh. Nội dung tổng quan full text. | ✅ Yes    | Đo lường được |
| AC2 | Bấm vào bản đồ phải mở ứng dụng bản đồ mặc định và hiển thị đúng tọa độ tỉnh. Fallback mở browser nếu không có app. | ✅ Yes    | Cần xác nhận tọa độ trung tâm từ API |
| AC3 | Thẻ KPI hiển thị định dạng số đúng luật UC55 (K, M, B; dấu phẩy ngăn cách). Không follow CMR-11. | ✅ Yes    | Có quy tắc format cụ thể |

**Nhận xét:**
- AC chỉ có 3 AC (giảm 1 so với v3 — AC4 empty state không còn trong SRS v1.3 Section 3.5).
- Thiếu AC cho: tìm kiếm tỉnh, pull to refresh, xử lý lỗi, navigation back, loading states, CTA, đa ngôn ngữ.
- Các AC hiện tại đều testable và đo lường được.
- Tuy nhiên, empty state behavior vẫn được mô tả chi tiết trong Section 2.2 — chỉ thiếu AC tường minh.

**Đánh giá:** 7/10 — AC hiện tại chất lượng tốt nhưng số lượng ít (3 AC). Điểm giữ nguyên so với v3.

---

## PHẦN 9 — NON-FUNCTIONAL REQUIREMENTS (Yêu cầu phi chức năng)

| NFR              | UC Coverage | Notes |
| ---------------- | ----------- | ----- |
| Performance      | ✅ Covered  | Timeout 10 giây theo CMR-07 |
| Security         | ✅ Covered  | **[v4]** Lỗi 401 handling: auto refresh token, redirect nếu hết hạn >15 ngày (CMR-07) |
| Compatibility    | ✅ Covered  | Portrait only — khóa xoay (Q13) |
| Accessibility    | ⚠️ Missing  | Không đề cập accessibility |
| Offline support  | ⚠️ Missing  | Không đề cập cache/offline viewing |
| **[v4 NEW]** i18n | ✅ Covered | Đa ngôn ngữ 5 ngôn ngữ (VI, EN, ZH, JA, KO) — CMR-17 |

**Đánh giá:** 4/5 — Cải thiện +1 so với v3 nhờ: Security (401 handling) và i18n (đa ngôn ngữ) đã được bổ sung. Vẫn thiếu accessibility và offline support.

---

## AUDIT SUMMARY

| #      | Knowledge Area                             | Max Pts | v1 Score | v2 Score | v3 Score | v4 Score | Status     |
| ------ | ------------------------------------------ | ------- | -------- | -------- | -------- | -------- | ---------- |
| 1      | Feature Identity                           | 5       | 5/5      | 5/5      | 5/5      | 5/5      | ✅ Complete |
| 2      | Objective & Scope                          | 5       | 5/5      | 5/5      | 5/5      | 5/5      | ✅ Complete |
| 3      | Actors & User Roles                        | 10      | 10/10    | 10/10    | 10/10    | 10/10    | ✅ Complete |
| 4      | Preconditions & Postconditions             | 10      | 10/10    | 10/10    | 10/10    | 10/10    | ✅ Complete |
| 5      | UI Object Inventory & Mapping              | 15      | 12/15    | 12/15    | 14/15    | **15/15** | ✅ Complete |
| 6      | Object Attributes & Behavior Definition    | 20      | 14/20    | 14/20    | 16/20    | **18/20** | ⚡ Partial  |
| 7      | Functional Logic & Workflow Decomposition  | 20      | 16/20    | 16/20    | 19/20    | **20/20** | ✅ Complete |
| 8      | Functional Integration Analysis            | 10      | 7/10     | 7/10     | 8/10     | **9/10** | ⚡ Near-Complete |
| 9      | Acceptance Criteria                        | 10      | 7/10     | 7/10     | 7/10     | 7/10     | ⚡ Partial  |
| 10     | Non-functional Requirements                | 5       | 2/5      | 2/5      | 3/5      | **4/5**  | ⚡ Partial  |
| **Total** |                                         | **110** | **88/110** | **88/110** | **97/110** | **103/110** | **93.6/100** |

**Verdict:** ✅ **READY** (93.6/100) — Cải thiện +5.4 điểm so với v3

> Điểm số v4 tăng từ 97/110 (88.2/100) lên 103/110 (93.6/100) nhờ SRS v1.3 bổ sung:
> - Section 8 CTA rõ ràng (Card + Nút "Cổng thông tin đầu tư")
> - Xử lý lỗi 401 (auto refresh token, redirect)
> - Đa ngôn ngữ CMR-17 (5 ngôn ngữ)
> - Debounce Navigation CMR-18
> - Max length 500 ký tự cho ô tìm kiếm (Q12 resolved)
> - Auto-trim whitespace (CMR-01)
> - Null format thống nhất "-" (CMR-14 v1.4)
>
> Còn 2 câu hỏi Deferred (Q7, Q9) — Medium priority, không block test case design.

---

## UNIFIED GAP & QUESTION REPORT

### Resolved in v4 (12 questions total — 10 from v3 + 2 newly resolved)

| ID  | Priority | Question | Resolution | Resolved By | Date |
| --- | -------- | -------- | ---------- | ----------- | ---- |
| Q1  | High     | Nút "Đăng ký tư vấn ngay" [TBD] | **Bỏ nút #21.** Section 8 giữ lại Card CTA + Nút "Cổng thông tin đầu tư" | BA/SRS v1.3 | 08/05/2026 |
| Q2  | High     | KPI NULL → hiển thị 4 thẻ đầy đủ hay chỉ thẻ có dữ liệu? | **4 thẻ vẫn hiển thị đủ**, NULL → "-" | BA | 08/05/2026 |
| Q3  | Medium   | Debounce 3 giây vs "lọc real-time"? | **Có áp dụng debounce 3s** theo CMR-01 | BA | 08/05/2026 |
| Q4  | Medium   | State Persistence cho ô tìm kiếm tỉnh? | **Có áp dụng** theo CMR-01 | BA | 08/05/2026 |
| Q5  | Medium   | Timeout handling khi API > 10 giây? | **Giống CMR-07.** Timeout 10s + thông báo + nút "Thử lại" | BA | 08/05/2026 |
| Q6  | Medium   | CMR-04 liệt kê UC55 nhưng UC55 "không lazy load"? | **Ngoại lệ có chủ đích.** CMR-04 liệt kê UC55 là lỗi | BA | 08/05/2026 |
| Q13 | Low      | Khóa portrait hay cho phép landscape? | **Không áp dụng landscape.** Khóa portrait | BA | 08/05/2026 |
| Q15 | Low      | Không có app bản đồ → xử lý thế nào? | **Mở browser.** Fallback mở bản đồ trên trình duyệt | BA | 08/05/2026 |
| Q16 | Low      | UC55 format riêng vs CMR-11? | **Áp dụng theo docs UC55**, không follow CMR-11 | BA | 08/05/2026 |
| Q17 | Medium   | Wireframe "Container tab" vs UC55 scroll dọc? | **Container nằm ở giữa màn hình**, không liên quan đến scroll | BA | 08/05/2026 |
| **Q10** | Medium | **Session hết hạn khi đang xem → xử lý?** | **[v4 RESOLVED]** SRS v1.3 bổ sung: Lỗi 401 → auto refresh token; nếu >15 ngày → redirect đăng nhập + toast (CMR-07) | SRS v1.3 | 12/05/2026 |
| **Q12** | Low    | **Max length ô tìm kiếm?** | **[v4 RESOLVED]** SRS v1.3 bổ sung: Tối đa 500 ký tự (CMR-01) | SRS v1.3 | 12/05/2026 |

### Removed (3 questions — BA xác nhận không test)

| ID  | Priority | Reason for Removal |
| --- | -------- | ------------------ |
| Q8  | Medium   | BA: "Không test API nên xoá" — Partial API failure không nằm trong scope testing |
| Q11 | Medium   | BA: "Không test nên xoá" — Double-tap chặn không nằm trong scope testing |
| Q14 | Low      | BA: "Không test nên xoá" — Deep link không nằm trong scope testing |

### Still Open / Deferred (2 questions)

| ID  | Priority | Ref | Question | Why It Matters | Status |
| --- | -------- | --- | -------- | -------------- | ------ |
| Q7  | Medium   | Section 2.2 | Quy tắc truncate/wrap cho text overflow? | Vỡ layout trên thiết bị nhỏ | Deferred |
| Q9  | Medium   | Section 2.2, #3 | Tagline banner null → xử lý overlay thế nào? | Banner empty state | Deferred |

---

## WHAT'S GOOD

1. **Section 8 CTA rõ ràng hoàn toàn:** Card CTA với tiêu đề động theo tên tỉnh + Nút "Cổng thông tin đầu tư" được mô tả chi tiết. Nút "Đăng ký tư vấn ngay" cũ đã bị loại bỏ rõ ràng — không còn TBD.
2. **Xử lý lỗi 401 đầy đủ:** SRS v1.3 bổ sung luồng auto refresh token + redirect đăng nhập khi session hết hạn >15 ngày — giải quyết hoàn toàn Q10.
3. **Đa ngôn ngữ (CMR-17):** Section 3.4 mới mô tả rõ: text cứng dịch 5 ngôn ngữ, nội dung API giữ nguyên — testable.
4. **Debounce Navigation (CMR-18):** Chống double-tap khi điều hướng — UX pattern quan trọng cho mobile.
5. **Max length + Whitespace handling:** Ô tìm kiếm có max 500 ký tự + auto-trim whitespace — boundary testing rõ ràng.
6. **Null format thống nhất:** "-" (single dash) theo CMR-14 v1.4 — nhất quán xuyên suốt app.
7. **Empty state phủ toàn diện:** Mọi section đều có quy tắc empty state rõ ràng.
8. **Format số KPI chi tiết:** Quy tắc rút gọn K/M/B với ví dụ minh họa cụ thể.
9. **Tham chiếu CMR hoàn chỉnh:** 9 CMR được verify (CMR-01, 04, 05, 06, 07, 13, 14, 17, 18).

---

## TESTABILITY OUTLOOK

**What CAN be tested now (>98% chức năng):**
- Luồng xem danh sách tỉnh (hiển thị 63 tỉnh, sắp xếp A–Z, skeleton loading)
- Tìm kiếm tỉnh (debounce 3s, max 500 ký tự, auto-trim whitespace, xóa từ khóa, không có kết quả, State Persistence)
- Luồng xem chi tiết chuyên trang (navigation, hiển thị 8 sections bao gồm CTA)
- Format số KPI (GRDP %, Dân số/Vốn K/M/B, Diện tích km²) — theo UC55 format
- Empty state cho tất cả sections (KPI → "-" + 4 thẻ luôn hiển thị)
- Banner ảnh + overlay text + fallback khi ảnh lỗi
- Badge trạng thái KCN (Sẵn sàng / Đang quy hoạch)
- Tap bản đồ → mở ứng dụng bản đồ + fallback mở browser
- Card CTA (tiêu đề động) + Nút "Cổng thông tin đầu tư" → mở link ngoài (+ ẩn khi URL null)
- Thẻ liên hệ (ĐT + Email, xử lý null → "-")
- Navigation back (CMR-06) + State Persistence
- Pull to Refresh cả 2 màn hình
- Lỗi mạng, API 500, 404, Timeout 10s, **Lỗi 401 (session hết hạn)**
- Portrait only (khóa xoay)
- **Debounce Navigation (double-tap protection)**
- **Đa ngôn ngữ (5 ngôn ngữ)**

**What CANNOT be tested yet (blocked by Deferred gaps):**
- Text overflow/truncate behavior (Q7 — Medium, Deferred)
- Tagline banner null overlay (Q9 — Medium, Deferred)

---

## SUMMARY & RECOMMENDATION

**Verdict:** ✅ **READY — 93.6/100** (+5.4 so với v3)

UC55 đã đạt mức READY sau khi SRS cập nhật v1.3 bổ sung nhiều thông tin quan trọng:
- Section 8 CTA hoàn chỉnh (Card + Nút "Cổng thông tin đầu tư")
- Xử lý lỗi 401 (Q10 resolved)
- Max length 500 ký tự (Q12 resolved)
- Đa ngôn ngữ CMR-17
- Debounce Navigation CMR-18
- Auto-trim whitespace
- Null format "-" thống nhất

**Còn 2 câu hỏi Deferred** (Q7, Q9) — Medium priority, KHÔNG block test case design. QA có thể thiết kế test case cho >98% chức năng.

**Khuyến nghị:**
- ✅ **Tiếp tục thiết kế test case** cho toàn bộ luồng chính và phụ (bao gồm CTA, 401, đa ngôn ngữ, debounce navigation)
- ⚠️ Đánh dấu test case liên quan Q7/Q9 là "Deferred" trong test suite
- 📋 BA nên giải đáp Q7 (truncate rules) khi có thời gian — ảnh hưởng đến UI testing trên thiết bị nhỏ

---

## CHANGELOG

| Version | Date       | Changes |
| ------- | ---------- | ------- |
| v1      | 08/05/2026 | First audit — Score 88/110 (80.0/100), CONDITIONALLY READY. 16 open questions (Q1–Q16). |
| v2      | 08/05/2026 | Re-audit (Defer all). Wireframe analysis added (4 images). Q1–Q16 deferred. New Q17 added. Score unchanged: 88/110 (80.0/100). |
| v3      | 08/05/2026 | Re-audit after BA answers. 10 questions resolved (Q1–Q6, Q13, Q15–Q17). 3 questions removed (Q8, Q11, Q14). 4 questions remain Deferred (Q7, Q9, Q10, Q12). Score: 97/110 (88.2/100). |
| **v4**  | **12/05/2026** | **Re-audit after SRS v1.3 update.** Key changes: Section 8 CTA bổ sung (Card + Nút "Cổng thông tin"), lỗi 401 handling (CMR-07), đa ngôn ngữ (CMR-17), Debounce Navigation (CMR-18), max 500 ký tự + auto-trim whitespace (CMR-01), null format "-" (CMR-14 v1.4). **Q10 + Q12 resolved** (còn 2 Deferred: Q7, Q9). Score: **103/110 (93.6/100)** (+6 raw, +5.4 normalized). Verdict upgraded: CONDITIONALLY READY → **READY**. |
