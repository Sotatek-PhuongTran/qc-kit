# Test Cases Summary — UC55

**Tiêu đề:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư trên Mobile
**Ngày tạo:** 08/05/2026
**Tác giả:** QC Agent
**Phiên bản:** v1

---

## ✅ Hoàn tất thiết kế kiểm thử

| Sản phẩm | Tệp | Số lượng |
|---|---|---|
| Test Cases Draft | UC55_chuyen-trang-dau-tu_testcases_draft.md | 121 test cases |
| Test Cases | UC55_chuyen-trang-dau-tu_testcases_20260508_v1.xlsx | 121 test cases |

### Phân bố theo Section Group:

| Section Group | Check UI/UX | Check Function | Check common | Tổng |
|---|---|---|---|---|
| 1. Màn hình Danh sách tỉnh | 1 TC | 22 TC | 16 TC (8 UI/UX + 8 thiết bị) | 39 TC |
| 2. Màn hình Chi tiết chuyên trang | 1 TC | 65 TC | 16 TC (8 UI/UX + 8 thiết bị) | 82 TC |
| **Tổng** | **2 TC** | **87 TC** | **32 TC** | **121 TC** |

### Phân bố theo Giai đoạn (trong Check Function):

| Giai đoạn | Mô tả | Số lượng |
|---|---|---|
| Giai đoạn 1 | Khởi tạo màn hình (trạng thái tĩnh) | 10 TC |
| Giai đoạn 2 | Tương tác thành phần | 3 TC |
| Giai đoạn 3 | Chức năng cốt lõi + Xử lý lỗi | 61 TC |
| Giai đoạn 4 | Tích hợp chức năng | 7 TC |
| Giai đoạn 5 | Phi chức năng mức UI | 6 TC |

### Test Design Techniques Applied:

| Kỹ thuật | Áp dụng tại | Số lượng |
|---|---|---|
| Equivalence Partitioning (EP) | KPI value 0 vs null (4 thẻ riêng), badge KCN, search keyword types | 12 TC |
| Boundary Value Analysis (BVA) | KPI format K/M/B/% boundaries, Diện tích dấu phẩy | 14 TC |
| Decision Table | KPI null/0/valid combinations, Liên hệ null fields | 6 TC |
| Use Case Testing | Main flow, alternative flows, error flows | 35 TC+ |
| Error Guessing | Special chars search, rapid pull-to-refresh, timeout | 8 TC |

---

### Ma trận truy xuất nguồn gốc yêu cầu (RTM)

| AC ID | Tiêu chí chấp nhận | Test Cases liên kết | Trạng thái |
|---|---|---|---|
| AC1 | Dữ liệu hiển thị khớp 100% với API cho từng tỉnh | TC_043, TC_067, TC_069, TC_072, TC_076, TC_079, TC_096 | ✅ Đã bao phủ |
| AC2 | Bản đồ mở ứng dụng mặc định + đúng tọa độ | TC_077, TC_097 | ✅ Đã bao phủ |
| AC3 | KPI format số đúng luật (K/M/B, dấu phẩy) | TC_047–TC_066 (20 TC) | ✅ Đã bao phủ |
| AC4 | Empty state "Không có dữ liệu" / "--" | TC_044, TC_045, TC_063–TC_066, TC_068, TC_070, TC_075, TC_078, TC_080–TC_082, TC_086 | ✅ Đã bao phủ |

### Business Rules Traceability

| BR | Mô tả | Test Cases | Trạng thái |
|---|---|---|---|
| BR-01 | Dữ liệu từ API, không hard-code | TC_003 | ✅ |
| BR-02 | 63 tỉnh tải 1 lần, không lazy load | TC_002 | ✅ |
| BR-03 | Sắp xếp A–Z | TC_002 | ✅ |
| BR-04 | Tìm kiếm real-time (CMR-01) | TC_007, TC_014 | ✅ |
| BR-05 | Dữ liệu dynamic theo tỉnh | TC_085, TC_098, TC_099 | ✅ |
| BR-06 | KPI null → "--" | TC_044, TC_045 | ✅ |
| BR-07 | Section rỗng → "Không có dữ liệu" | TC_068, TC_070, TC_075 | ✅ |
| BR-08 | Khoảng cách rỗng → ẩn | TC_078 | ✅ |
| BR-09 | Liên hệ null → "--" | TC_080–TC_082 | ✅ |
| BR-10 | URL null → ẩn nút | TC_086 | ✅ |
| BR-11 | UC55 KPI format riêng | TC_047–TC_062 | ✅ |
| BR-12 | KPI cuộn ngang | TC_046 | ✅ |
| BR-13 | Badge KCN 2 loại | TC_073, TC_074 | ✅ |

### CMR Traceability

| CMR | Test Cases | Trạng thái |
|---|---|---|
| CMR-01 (Search) | TC_007–TC_014, TC_023 | ✅ |
| CMR-05 (Badge) | TC_073, TC_074 | ✅ |
| CMR-06 (Header/Nav) | TC_004, TC_088 | ✅ |
| CMR-07 (Error) | TC_017–TC_020, TC_090–TC_094 | ✅ |
| CMR-13 (Pull to Refresh) | TC_015, TC_016, TC_089, TC_095 | ✅ |
| CMR-14 (Empty State) | TC_008, TC_068, TC_070, TC_075 | ✅ |
| CMR-16 (API Timeout) | TC_020, TC_094 | ✅ |

---

### Blocked Test Cases (chờ BA)

| TC | Blocked By | Question Ref | Notes |
|---|---|---|---|
| TC_087 | Nút "Đăng ký tư vấn ngay" [TBD] | Q1 (High) | Chờ xác định luồng/màn hình đích |
| TC_023 | State Persistence search | Q4 (Medium) | Chờ xác nhận CMR-01 State Persistence |
| TC_063–TC_066 | KPI value = 0 vs null | Q2 (High) | UC không phân biệt rõ |
| TC_020, TC_094 | Timeout handling | Q5 (Medium) | UC không đề cập, áp dụng CMR-07/16 |

### Out-of-Scope Items

| Scenario Area | Reason | Recommended Action |
|---|---|---|
| Thời gian phản hồi API < 2 giây | NFR: PERFORMANCE | Defer to performance testing |
| Load test nhiều người dùng đồng thời | NFR: LOAD | Defer to load testing |
| Bảo mật API endpoint (SQL injection, XSS, token bypass) | NFR: SECURITY | Defer to security testing |
| Accessibility (screen reader, color contrast, font scaling) | NFR: ACCESSIBILITY | Defer to accessibility testing |

### Notes

- Tham chiếu tài liệu: UC55_ChuyenTrangDauTu.md (v1), UC55_chuyen-trang-dau-tu_audited_20260508_v2.md, UC55_chuyen-trang-dau-tu_scenarios_20260508_v2.md, CMR_Mobile.md
- BVA đã áp dụng cho tất cả ranh giới KPI format (K/M/B, %, dấu phẩy)
- Check common gồm 32 TC cố định (16 TC/màn hình) theo quy tắc skill
- 2 TC ghi N/A: scroll-down-to-load-more (UC55 không lazy load)
- TC_087 (Nút "Đăng ký tư vấn ngay") là test case duy nhất BLOCKED hoàn toàn do Q1
