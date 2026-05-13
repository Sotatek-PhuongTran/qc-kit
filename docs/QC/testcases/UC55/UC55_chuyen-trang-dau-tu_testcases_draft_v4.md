# Test Cases Draft — UC55 Xem chuyên trang đầu tư theo khu vực đầu tư (v4 UPDATE)

**Ngày tạo:** 12/05/2026
**Tác giả:** QC Agent
**Phiên bản:** v4.0 (Update)
**Tài liệu tham chiếu:** UC55_ChuyenTrangDauTu.md (v1.3), UC55_chuyen-trang-dau-tu_audited_20260508_v4.md, UC55_chuyen-trang-dau-tu_scenarios_20260508_v4.md, CMR_Mobile.md (v1.4)
**Trigger:** Loại A — Thay đổi Requirement (audited v4 mới hơn v3 đã dùng tạo TC v3)

---

## IMPACT ANALYSIS (Bước 2A)

### Bảng tác động (Impact Table)

| Thay đổi (Source) | AC/BR/CMR | TC IDs liên kết | Hành động |
|---|---|---|---|
| Null format "--" → "-" (CMR-14 v1.4) | BR-06, BR-09, AC4 | TC_044, TC_045, TC_063–TC_066, TC_068, TC_080–TC_082, TC_086, TC_123 | **CẬP NHẬT** Expected Result |
| 7 sections → 8 sections (CTA explicit) | AC1 | TC_043 (description) | **CẬP NHẬT** mô tả |
| Max 500 ký tự + auto-trim whitespace (Q12 resolved, CMR-01) | CMR-01 | TC_012 | **CẬP NHẬT** Expected Result + thêm TC mới |
| Lỗi 401 handling (Q10 resolved, CMR-07) | CMR-07 | — | **THÊM MỚI** 2 TC |
| Đa ngôn ngữ CMR-17 (5 ngôn ngữ) | CMR-17 | — | **THÊM MỚI** 2 TC |
| Debounce Navigation CMR-18 | CMR-18 | — | **THÊM MỚI** 1 TC |
| Max 500 chars BVA (499/500/501) | CMR-01 | — | **THÊM MỚI** 3 TC |

---

## UPDATED TEST CASES

### TC bị cập nhật (UPDATED)

---

**TC_012 — [Ô tìm kiếm] Kiểm tra tìm kiếm chỉ nhập khoảng trắng [UPDATED — Reason: CMR-01 v1.3 auto-trim whitespace]**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh]
- Steps:
  1. Nhập "   " (3 khoảng trắng) vào ô tìm kiếm
  2. Kiểm tra hiển thị
- Expected:
  2. Hệ thống auto-trim whitespace → coi như input rỗng → KHÔNG trigger API → danh sách trở về trạng thái mặc định (63 tỉnh A–Z)
- Note: Q12 resolved — CMR-01 v1.3 xác nhận auto-trim whitespace

---

**TC_044 — [KPI] Kiểm tra hiển thị KPI khi dữ liệu NULL — thẻ hiển thị "-" [UPDATED — Reason: CMR-14 v1.4 null format]**
- Pre-condition: API trả KPI GRDP = null, các thẻ khác có dữ liệu.
- Steps:
  1. Kiểm tra hiển thị thẻ GRDP
- Expected:
  1. Thẻ GRDP vẫn hiển thị, giá trị số hiển thị là "-" (single dash, theo CMR-14 v1.4)
  - Các thẻ khác hiển thị bình thường

---

**TC_045 — [KPI] Kiểm tra hiển thị khi TẤT CẢ 4 thẻ KPI đều NULL [UPDATED — Reason: CMR-14 v1.4 null format]**
- Pre-condition: API trả cả 4 giá trị KPI = null.
- Steps:
  1. Kiểm tra hiển thị Section 2
- Expected:
  1. Vẫn hiển thị đầy đủ 4 thẻ KPI, tất cả giá trị hiển thị "-" (single dash)
  - Cuộn ngang vẫn hoạt động bình thường

---

**TC_063 — [KPI GRDP] Kiểm tra giá trị = 0 (khác null) [UPDATED — Reason: CMR-14 v1.4 null format]**
- Pre-condition: API trả GRDP = 0.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ GRDP
- Expected:
  1. Hiển thị "0.0%" — giá trị 0 khác null: null → "-", 0 → hiển thị bình thường

---

**TC_064 — [KPI Dân số] Kiểm tra giá trị = 0 (khác null) [UPDATED — Reason: CMR-14 v1.4 null format]**
- Pre-condition: API trả Dân số = 0.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ Dân số
- Expected:
  1. Hiển thị "0" — giá trị 0 khác null: null → "-", 0 → hiển thị bình thường

---

**TC_065 — [KPI Vốn đầu tư] Kiểm tra giá trị = 0 (khác null) [UPDATED — Reason: CMR-14 v1.4 null format]**
- Pre-condition: API trả Vốn đầu tư = 0.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ Vốn đầu tư
- Expected:
  1. Hiển thị "$0" — giá trị 0 khác null: null → "-", 0 → hiển thị bình thường

---

**TC_066 — [KPI Diện tích] Kiểm tra giá trị = 0 (khác null) [UPDATED — Reason: CMR-14 v1.4 null format]**
- Pre-condition: API trả Diện tích = 0.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ Diện tích
- Expected:
  1. Hiển thị "0 km²" — giá trị 0 khác null: null → "-", 0 → hiển thị bình thường

---

**TC_080 — [Liên hệ] Kiểm tra số điện thoại NULL [UPDATED — Reason: CMR-14 v1.4 null format]**
- Pre-condition: API trả số điện thoại = null.
- Steps:
  1. Kiểm tra hiển thị thẻ liên hệ
- Expected:
  1. Nhãn "Điện thoại" vẫn hiển thị, giá trị hiển thị "-" (single dash)

---

**TC_081 — [Liên hệ] Kiểm tra email NULL [UPDATED — Reason: CMR-14 v1.4 null format]**
- Pre-condition: API trả email = null.
- Steps:
  1. Kiểm tra hiển thị thẻ liên hệ
- Expected:
  1. Nhãn "Email" vẫn hiển thị, giá trị hiển thị "-" (single dash)

---

**TC_082 — [Liên hệ] Kiểm tra cả ĐT và Email đều NULL [UPDATED — Reason: CMR-14 v1.4 null format]**
- Pre-condition: API trả cả số điện thoại và email = null.
- Steps:
  1. Kiểm tra hiển thị thẻ liên hệ
- Expected:
  1. Thẻ liên hệ vẫn hiển thị, 2 nhãn + 2 giá trị "-". Thẻ không bị ẩn.

---

**TC_123 — [KPI] Tất cả 4 thẻ NULL đồng thời — 4 thẻ vẫn hiển thị "-" [UPDATED — Reason: CMR-14 v1.4 null format]**
- Pre-condition: API trả null cho cả 4 KPI.
- Steps:
  1. Kiểm tra hiển thị Section KPI
- Expected:
  1. Hiển thị đủ 4 thẻ với giá trị "-" cho tất cả. Layout cuộn ngang không bị vỡ.

---

## NEW TEST CASES (TC_124 – TC_132)

---

### [Section Group] 1. Màn hình Danh sách tỉnh — NEW TCs

---

**TC_124 — [Ô tìm kiếm] Kiểm tra nhập đúng 500 ký tự — BVA at max (CMR-01) [NEW — Q12 resolved]**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh]
- Steps:
  1. Tap vào ô tìm kiếm
  2. Nhập chuỗi ký tự dài đúng 500 ký tự
  3. Kiểm tra hiển thị ô tìm kiếm
- Expected:
  2. Ô tìm kiếm chấp nhận toàn bộ 500 ký tự
  3. Hệ thống auto-trim whitespace đầu/cuối, thực hiện lọc bình thường (hiển thị "Không tìm thấy kết quả." nếu không khớp)

---

**TC_125 — [Ô tìm kiếm] Kiểm tra nhập 501 ký tự — BVA over max (CMR-01) [NEW — Q12 resolved]**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh]
- Steps:
  1. Tap vào ô tìm kiếm
  2. Nhập chuỗi ký tự dài 501 ký tự (cố nhập thêm ký tự thứ 501)
  3. Kiểm tra hiển thị ô tìm kiếm
- Expected:
  2. Ô tìm kiếm chặn ký tự thứ 501 — chỉ chứa tối đa 500 ký tự
  3. Không hiển thị lỗi, chỉ ngăn nhập thêm

---

**TC_126 — [Ô tìm kiếm] Kiểm tra nhập 499 ký tự — BVA below max (CMR-01) [NEW — Q12 resolved]**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh]
- Steps:
  1. Tap vào ô tìm kiếm
  2. Nhập chuỗi ký tự dài 499 ký tự
  3. Thử nhập thêm 1 ký tự nữa (ký tự thứ 500)
  4. Kiểm tra hiển thị
- Expected:
  2. Ô tìm kiếm chấp nhận 499 ký tự
  3. Cho phép nhập thêm 1 ký tự (tổng = 500)
  4. Lọc hoạt động bình thường

---

**TC_127 — [Ô tìm kiếm] Kiểm tra auto-trim whitespace đầu/cuối khi có keyword hợp lệ (CMR-01) [NEW — Q12 resolved]**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh]
- Steps:
  1. Nhập "  An Giang  " (có khoảng trắng đầu/cuối) vào ô tìm kiếm
  2. Đợi debounce 3s
  3. Kiểm tra kết quả lọc
- Expected:
  3. Hệ thống auto-trim → lọc theo "An Giang" → hiển thị "An Giang" trong kết quả

---

**TC_128 — [Debounce Navigation] Kiểm tra double-tap item tỉnh — chỉ navigate 1 lần (CMR-18) [NEW — CMR-18]**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh], danh sách 63 tỉnh đã hiển thị.
- Steps:
  1. Double-tap (tap nhanh 2 lần liên tiếp) vào item "An Giang"
  2. Kiểm tra hiển thị
- Expected:
  2. Hệ thống chỉ navigate 1 lần đến màn hình [Chi tiết chuyên trang An Giang]
  - Không xảy ra push 2 màn hình chồng lên nhau (duplicate navigation)
  - Áp dụng debounce navigation theo CMR-18

---

### [Section Group] 2. Màn hình Chi tiết — NEW TCs

---

**TC_129 — [Lỗi 401] Kiểm tra auto refresh token thành công (CMR-07) [NEW — Q10 resolved]**
- Pre-condition: Access token đã hết hạn, refresh token còn hạn (≤15 ngày). Đang ở màn hình [Danh sách tỉnh].
- Steps:
  1. Tap vào item tỉnh "An Giang"
  2. Kiểm tra hiển thị
- Expected:
  1. API trả 401 → hệ thống tự động gọi refresh token → lấy access token mới → retry API chi tiết
  2. Người dùng KHÔNG bị gián đoạn, KHÔNG thấy lỗi — màn hình chi tiết hiển thị bình thường

---

**TC_130 — [Lỗi 401] Kiểm tra refresh token hết hạn → redirect đăng nhập (CMR-07) [NEW — Q10 resolved]**
- Pre-condition: Access token đã hết hạn, refresh token cũng đã hết hạn (>15 ngày).
- Steps:
  1. Tap vào item tỉnh "An Giang"
  2. Kiểm tra hiển thị
- Expected:
  1. API trả 401 → hệ thống gọi refresh token → refresh token hết hạn
  2. Hệ thống redirect về màn hình [Đăng nhập] + hiển thị toast "Phiên đăng nhập hết hạn."
  - Session bị xóa, người dùng phải đăng nhập lại

---

**TC_131 — [Đa ngôn ngữ] Kiểm tra text cứng hiển thị đúng ngôn ngữ đã chọn (CMR-17) [NEW — CMR-17]**
- Pre-condition: Đăng nhập thành công. Thiết bị/app đã chuyển sang ngôn ngữ English.
- Steps:
  1. Truy cập "Khu vực đầu tư" (hoặc tên tương ứng bằng tiếng Anh)
  2. Kiểm tra hiển thị text cứng trên MH1 (header, placeholder, section title)
  3. Tap vào 1 tỉnh → kiểm tra text cứng trên MH2 (nhãn section, label KPI, nút CTA, thông báo lỗi)
- Expected:
  2. Tất cả text cứng hiển thị bằng tiếng Anh (header, placeholder tìm kiếm, tiêu đề section)
  3. Tất cả text cứng trên MH2 hiển thị bằng tiếng Anh — không có text bị hardcode tiếng Việt
- Note: Áp dụng cho 5 ngôn ngữ: Việt, Anh, Hàn, Nhật, Trung (CMR-17)

---

**TC_132 — [Đa ngôn ngữ] Kiểm tra nội dung API giữ nguyên không dịch (CMR-17) [NEW — CMR-17]**
- Pre-condition: Đăng nhập thành công. Thiết bị/app đã chuyển sang ngôn ngữ English.
- Steps:
  1. Truy cập danh sách tỉnh
  2. Kiểm tra tên tỉnh trong danh sách
  3. Tap vào 1 tỉnh → kiểm tra nội dung dynamic (tên tỉnh, mô tả tổng quan, tên KCN, thông tin liên hệ)
- Expected:
  2. Tên tỉnh giữ nguyên tiếng Việt (từ API) — KHÔNG bị dịch sang tiếng Anh
  3. Nội dung dynamic từ API giữ nguyên ngôn ngữ gốc — chỉ text cứng (label, placeholder, button) mới thay đổi theo ngôn ngữ

---

## UPDATED REQUIREMENT TRACEABILITY MATRIX (RTM)

| AC ID | Tiêu chí chấp nhận | Test Cases liên kết | Trạng thái |
|---|---|---|---|
| AC1 | Dữ liệu hiển thị khớp 100% với API cho từng tỉnh | TC_043 [UPDATED], TC_067, TC_069, TC_072, TC_076, TC_079, TC_096 | ✅ Đã bao phủ |
| AC2 | Bản đồ mở ứng dụng mặc định + đúng tọa độ. Fallback mở browser | TC_077, TC_097, TC_122 | ✅ Đã bao phủ |
| AC3 | KPI format số đúng luật UC55 (K/M/B, 1 thập phân) | TC_047–TC_062 (16 TC) | ✅ Đã bao phủ |
| AC4 | Empty state "-" / "Không có dữ liệu". 4 thẻ KPI luôn hiển thị | TC_044 [UPDATED], TC_045 [UPDATED], TC_063–TC_066 [UPDATED], TC_068, TC_070, TC_075, TC_078, TC_080–TC_082 [UPDATED], TC_086, TC_123 [UPDATED] | ✅ Đã bao phủ |

### Business Rules Traceability (Updated v4)

| BR | Mô tả | Test Cases | Trạng thái |
|---|---|---|---|
| BR-01 | Dữ liệu từ API, không hard-code | TC_003 | ✅ |
| BR-02 | 63 tỉnh tải 1 lần, không lazy load | TC_002 | ✅ |
| BR-03 | Sắp xếp A–Z | TC_002 | ✅ |
| BR-04 | Tìm kiếm real-time + debounce 3s + State Persistence + max 500 chars + auto-trim | TC_007, TC_014, TC_023, TC_012 [UPDATED], TC_124–TC_127 [NEW] | ✅ |
| BR-05 | Dữ liệu dynamic theo tỉnh | TC_085, TC_098, TC_099 | ✅ |
| BR-06 | KPI null → "-", 4 thẻ luôn hiển thị đủ | TC_044 [UPDATED], TC_045 [UPDATED], TC_123 [UPDATED] | ✅ |
| BR-07 | Section rỗng → "Không có dữ liệu" | TC_068, TC_070, TC_075 | ✅ |
| BR-08 | Khoảng cách rỗng → ẩn | TC_078 | ✅ |
| BR-09 | Liên hệ null → "-" | TC_080–TC_082 [UPDATED] | ✅ |
| BR-10 | URL null → ẩn nút | TC_086 | ✅ |
| BR-11 | UC55 KPI format riêng (không CMR-11) | TC_047–TC_062 | ✅ |
| BR-12 | KPI cuộn ngang | TC_046 | ✅ |
| BR-13 | Badge KCN 2 loại | TC_073, TC_074 | ✅ |

### CMR Traceability (Updated v4)

| CMR | Test Cases | Trạng thái |
|---|---|---|
| CMR-01 (Search + Debounce 3s + State Persistence + Max 500 + Auto-trim) | TC_007–TC_014, TC_023, TC_012 [UPDATED], TC_124–TC_127 [NEW] | ✅ |
| CMR-05 (Badge) | TC_073, TC_074 | ✅ |
| CMR-06 (Header/Nav) | TC_004, TC_088 | ✅ |
| CMR-07 (Error + Timeout 10s + 401 handling) | TC_017–TC_020, TC_090–TC_094, TC_129 [NEW], TC_130 [NEW] | ✅ |
| CMR-13 (Pull to Refresh) | TC_015, TC_016, TC_089, TC_095 | ✅ |
| CMR-14 (Empty State + Null format "-") | TC_008, TC_044 [UPDATED], TC_045 [UPDATED], TC_068, TC_070, TC_075, TC_080–TC_082 [UPDATED] | ✅ |
| CMR-16 (API Timeout) | TC_020, TC_094 | ✅ |
| CMR-17 (Đa ngôn ngữ 5 languages) | TC_131 [NEW], TC_132 [NEW] | ✅ [NEW] |
| CMR-18 (Debounce Navigation) | TC_128 [NEW] | ✅ [NEW] |
