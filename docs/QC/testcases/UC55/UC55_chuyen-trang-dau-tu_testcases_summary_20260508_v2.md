# Test Cases Summary — UC55 (v2)

**Tiêu đề:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư trên Mobile
**Ngày tạo:** 08/05/2026
**Tác giả:** QC Agent
**Phiên bản:** v2

---

## ✅ Hoàn tất cập nhật Test Cases

### Bối cảnh cập nhật
- **Kích hoạt:** Loại A — Thay đổi Requirement (audited v3 mới hơn v2 đã dùng tạo TC v1)
- **Phiên bản trước:** UC55_chuyen-trang-dau-tu_testcases_20260508_v1.xlsx (121 cases)
- **Phiên bản mới:** UC55_chuyen-trang-dau-tu_testcases_20260508_v2.xlsx (122 cases)
- **File audited đã dùng (trước):** UC55_chuyen-trang-dau-tu_audited_20260508_v2.md
- **File audited đã dùng (mới):** UC55_chuyen-trang-dau-tu_audited_20260508_v3.md
- **File scenarios:** UC55_chuyen-trang-dau-tu_scenarios_20260508_v3.md (129 active scenarios)

---

### Tóm tắt thay đổi

| Chỉ số | Số lượng |
|---|---|
| Tổng TC trong phiên bản trước | 121 |
| TC đã xóa | -1 |
| TC đã cập nhật (sửa đổi) | ~8 |
| TC đã thêm mới | +2 |
| **Tổng TC trong phiên bản mới** | **122** |

---

### Bảng tác động (Impact Table)

| Thay đổi (Source) | AC/BR | TC IDs liên kết | Hành động |
|---|---|---|---|
| CTA "Đăng ký tư vấn ngay" bỏ (Q1) | BR-CTA removed | TC_087 | **XÓA** TC_087 |
| CTA title động — vẫn giữ card CTA | — | TC_099 | **CẬP NHẬT** — bỏ mention "Đăng ký tư vấn ngay", chỉ giữ card title |
| KPI NULL → 4 thẻ luôn hiển thị (Q2) | BR-06, AC4 | TC_063–TC_066 | **CẬP NHẬT** — xóa note "Ref Q2", xác nhận expected result |
| Debounce 3s confirmed (Q3) | CMR-01 | TC_007, TC_014 | **CẬP NHẬT** — thêm note debounce 3s confirmed |
| State Persistence confirmed (Q4) | CMR-01 | TC_023 | **CẬP NHẬT** — unblock, xóa note "chờ BA" |
| Timeout confirmed (Q5) | CMR-07 | TC_020, TC_094 | **CẬP NHẬT** — unblock, xóa note "chờ BA" |
| Portrait lock (Q13) | NFR | TC_109–TC_111 | **CẬP NHẬT** — TC_110, TC_111 expected = N/A (khóa portrait) |
| Map fallback browser (Q15) | AC2 | — | **THÊM MỚI** TC_122 |
| KPI format UC55-specific (Q16) | BR-11 | Không thay đổi | Xác nhận — TC hiện có đã đúng |
| All 4 KPI NULL đồng thời (Q2) | BR-06 | — | **THÊM MỚI** TC_123 |

---

#### Test Cases đã xóa

| TC ID | Tiêu đề | Lý do |
|---|---|---|
| TC_087 | [Nút Đăng ký tư vấn ngay] Kiểm tra tap nút — [TBD] | BA xác nhận bỏ CTA khỏi scope (Q1 — Answered) |

#### Test Cases đã cập nhật

| TC ID | Tiêu đề | Mô tả thay đổi |
|---|---|---|
| TC_007 | [Ô tìm kiếm] Tìm kiếm tỉnh — có kết quả | Thêm note: debounce 3s confirmed (Q3) |
| TC_014 | [Ô tìm kiếm] Tìm kiếm với 1 ký tự | Thêm note: lọc sau debounce 3s (Q3) |
| TC_020 | [Timeout] Kiểm tra timeout danh sách tỉnh | Unblock — xóa "chờ BA", xác nhận CMR-07 áp dụng |
| TC_023 | [State Persistence] Giữ trạng thái tìm kiếm khi back | Unblock — xóa "chờ BA", xác nhận CMR-01 State Persistence |
| TC_063–TC_066 | [KPI] value = 0 (4 thẻ) | Xóa note "Ref Q2", xác nhận: 0 hiển thị bình thường, 4 thẻ luôn hiển thị |
| TC_094 | [Timeout] Kiểm tra timeout chi tiết tỉnh | Unblock — xóa "chờ BA", xác nhận CMR-07 áp dụng |
| TC_099 | [CTA tên tỉnh động] | Cập nhật: bỏ mention "Đăng ký tư vấn ngay", chỉ giữ card title + nút "Cổng thông tin" |
| TC_110 | Kiểm tra hiển thị chế độ ngang | Expected = N/A — ứng dụng khóa portrait (Q13) |
| TC_111 | Kiểm tra chuyển đổi dọc/ngang | Expected = N/A — ứng dụng khóa portrait (Q13) |

#### Test Cases mới

| TC ID | Tiêu đề | AC/BR liên kết |
|---|---|---|
| TC_122 | [Bản đồ] Fallback mở browser khi không có app bản đồ | AC2, Q15 |
| TC_123 | [KPI] Tất cả 4 thẻ NULL đồng thời — 4 thẻ vẫn hiển thị "--" | BR-06, AC4, Q2 |

---

### Ma trận truy xuất nguồn gốc yêu cầu đã cập nhật (RTM)

| AC ID | Tiêu chí chấp nhận | Test Cases liên kết | Trạng thái |
|---|---|---|---|
| AC1 | Dữ liệu hiển thị khớp 100% với API cho từng tỉnh | TC_043, TC_067, TC_069, TC_072, TC_076, TC_079, TC_096 | ✅ Đã bao phủ |
| AC2 | Bản đồ mở ứng dụng mặc định + đúng tọa độ. Fallback mở browser | TC_077, TC_097, **TC_122 [NEW]** | ✅ Đã bao phủ |
| AC3 | KPI format số đúng luật UC55 (K/M/B, dấu phẩy) | TC_047–TC_066 (20 TC) | ✅ Đã bao phủ |
| AC4 | Empty state "Không có dữ liệu" / "--". 4 thẻ KPI luôn hiển thị | TC_044, TC_045, TC_063–TC_066, TC_068, TC_070, TC_075, TC_078, TC_080–TC_082, TC_086, **TC_123 [NEW]** | ✅ Đã bao phủ |

### Business Rules Traceability (Updated)

| BR | Mô tả | Test Cases | Trạng thái |
|---|---|---|---|
| BR-01 | Dữ liệu từ API, không hard-code | TC_003 | ✅ |
| BR-02 | 63 tỉnh tải 1 lần, không lazy load (ngoại lệ có chủ đích) | TC_002 | ✅ [UPDATED note] |
| BR-03 | Sắp xếp A–Z | TC_002 | ✅ |
| BR-04 | Tìm kiếm real-time + debounce 3s + State Persistence (CMR-01) | TC_007, TC_014, TC_023 [UPDATED] | ✅ |
| BR-05 | Dữ liệu dynamic theo tỉnh | TC_085, TC_098, TC_099 [UPDATED] | ✅ |
| BR-06 | KPI null → "--", 4 thẻ luôn hiển thị đủ | TC_044, TC_045, TC_123 [NEW] | ✅ |
| BR-07 | Section rỗng → "Không có dữ liệu" | TC_068, TC_070, TC_075 | ✅ |
| BR-08 | Khoảng cách rỗng → ẩn | TC_078 | ✅ |
| BR-09 | Liên hệ null → "--" | TC_080–TC_082 | ✅ |
| BR-10 | URL null → ẩn nút | TC_086 | ✅ |
| BR-11 | UC55 KPI format riêng (không CMR-11) | TC_047–TC_062 | ✅ |
| BR-12 | KPI cuộn ngang | TC_046 | ✅ |
| BR-13 | Badge KCN 2 loại | TC_073, TC_074 | ✅ |

### CMR Traceability (Updated)

| CMR | Test Cases | Trạng thái |
|---|---|---|
| CMR-01 (Search + Debounce 3s + State Persistence) | TC_007–TC_014, TC_023 [UPDATED] | ✅ |
| CMR-05 (Badge) | TC_073, TC_074 | ✅ |
| CMR-06 (Header/Nav) | TC_004, TC_088 | ✅ |
| CMR-07 (Error + Timeout 10s) | TC_017–TC_020 [UPDATED], TC_090–TC_094 [UPDATED] | ✅ |
| CMR-13 (Pull to Refresh) | TC_015, TC_016, TC_089, TC_095 | ✅ |
| CMR-14 (Empty State) | TC_008, TC_068, TC_070, TC_075 | ✅ |
| CMR-16 (API Timeout) | TC_020 [UPDATED], TC_094 [UPDATED] | ✅ |

---

### Phân bố theo Section Group (Updated)

| Section Group | Check UI/UX | Check Function | Check common | Tổng |
|---|---|---|---|---|
| 1. Màn hình Danh sách tỉnh | 1 TC | 22 TC | 16 TC | 39 TC |
| 2. Màn hình Chi tiết chuyên trang | 1 TC | 66 TC (+2 new, -1 deleted) | 16 TC | 83 TC |
| **Tổng** | **2 TC** | **88 TC** | **32 TC** | **122 TC** |

---

### Blocked Test Cases — RESOLVED

| TC | Previously Blocked By | Resolution |
|---|---|---|
| TC_087 | Nút "Đăng ký tư vấn ngay" [TBD] (Q1) | **DELETED** — CTA bỏ khỏi scope |
| TC_023 | State Persistence search (Q4) | **UNBLOCKED** — CMR-01 confirmed |
| TC_063–TC_066 | KPI value = 0 vs null (Q2) | **UNBLOCKED** — 0 hiển thị bình thường |
| TC_020, TC_094 | Timeout handling (Q5) | **UNBLOCKED** — CMR-07 confirmed |

### Blocked Test Cases — Remaining: NONE

Tất cả test cases đã unblocked. Không còn TC nào bị blocked.

---

### Out-of-Scope Items

| Scenario Area | Reason | Recommended Action |
|---|---|---|
| Thời gian phản hồi API < 2 giây | NFR: PERFORMANCE | Defer to performance testing |
| Load test nhiều người dùng đồng thời | NFR: LOAD | Defer to load testing |
| Bảo mật API endpoint (SQL injection, XSS, token bypass) | NFR: SECURITY | Defer to security testing |
| Accessibility (screen reader, color contrast, font scaling) | NFR: ACCESSIBILITY | Defer to accessibility testing |

---

### Notes

- Tham chiếu tài liệu: UC55_chuyen-trang-dau-tu_audited_20260508_v3.md, UC55_chuyen-trang-dau-tu_scenarios_20260508_v3.md, CMR_Mobile.md
- v2 cập nhật dựa trên 10 câu trả lời BA (Q1–Q6, Q13, Q15–Q17)
- TC_087 là TC duy nhất bị DELETED (CTA bỏ)
- 2 TC mới: TC_122 (map fallback browser), TC_123 (all 4 KPI NULL)
- Check common giữ nguyên 32 TC (16 TC/màn hình)
- TC_110, TC_111 cập nhật expected = N/A do portrait lock
