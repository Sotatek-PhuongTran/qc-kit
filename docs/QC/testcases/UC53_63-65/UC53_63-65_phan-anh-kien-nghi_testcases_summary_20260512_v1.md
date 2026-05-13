# ✅ Hoàn tất thiết kế kiểm thử — UC53/63-65: Phản ánh kiến nghị trên Mobile

**Ngày tạo:** 2026-05-12  
**Người thiết kế:** QC Agent (Claude)  
**Phiên bản:** v1  

---

## Sản phẩm đầu ra

| Sản phẩm | Tệp | Số lượng |
|---|---|---|
| Test Cases Draft | UC53_63-65_phan-anh-kien-nghi_testcases_draft_v1.md | 120 TC chính + 48 TC common |
| Test Cases (.xlsx) | UC53_63-65_phan-anh-kien-nghi_testcases_20260512_v1.xlsx | 162 TC (4 màn hình × Check UI/UX + Check Function + Check common) |
| Test Scenarios | ../scenarios/UC53_63-65/UC53_63-65_phan-anh-kien-nghi_scenarios_20260512.md | 68 scenarios |

---

## Phân bổ theo màn hình

| # | Màn hình | Check UI/UX | Check Function | Check Common | Tổng |
|---|----------|:-----------:|:--------------:|:------------:|:----:|
| 1 | Danh sách Phản ánh kiến nghị | 6 | 25 | 16 | 47 |
| 2 | Bộ lọc tìm kiếm (Bottom Sheet) | 1 | 11 | 16 | 28 |
| 3 | Chi tiết Phản ánh kiến nghị | 3 | 25 | 16 | 44 |
| 4 | Tạo mới Phản ánh (Form UC64) | 1 | 29 | 16 | 46 |
| **Tổng** | | **11** | **90** | **64** | **165** |

---

## Kỹ thuật thiết kế test áp dụng

| Kỹ thuật | Áp dụng tại |
|----------|-------------|
| **BVA (Boundary Value Analysis)** | Max length: 200, 255, 500, 10.000 ký tự; SĐT: 8/9/10 số; File: 10MB/10.01MB; Search: 500 ký tự |
| **EP (Equivalence Partitioning)** | File formats (PDF/DOC/JPG/PNG valid vs .exe/.zip/.txt invalid); Trạng thái Enable/Disable nút Hủy |
| **Decision Table** | Search + Filter combinations; Multi-filter (Trạng thái + Ngày tạo + Ngày hẹn trả) |
| **State Transition** | Nút Gửi (Disabled ↔ Enabled); Nút Hủy bỏ (Enable/Disable theo trạng thái phản ánh) |

---

## Ma trận truy xuất nguồn gốc yêu cầu (RTM)

| Req-ID | Tiêu chí | Test Cases | Trạng thái |
|--------|----------|------------|------------|
| UC53 - Tải danh sách | Lazy load 20/lần, sắp xếp giảm dần | TC_007-TC_009 | ✅ Đã bao phủ |
| UC53 - Tìm kiếm | Debounce 3s, trim, 500 chars, toàn bộ tab | TC_012-TC_018 | ✅ Đã bao phủ |
| UC53 - Bộ lọc | Trạng thái + Date Range × 2, AND logic | TC_033-TC_043 | ✅ Đã bao phủ |
| UC63 - Chi tiết | Read-only, 6 blocks, null → "-" | TC_044-TC_060 | ✅ Đã bao phủ |
| UC63 - File đính kèm | Xem PDF/JPG, tải DOC, format không hỗ trợ | TC_051-TC_056 | ✅ Đã bao phủ |
| UC64 - Form validation | Max length, SĐT +84=9 số, email, dropdown | TC_120-TC_135 | ✅ Đã bao phủ |
| UC64 - Upload file | Format, size 10MB, ưu tiên check format | TC_136-TC_139 | ✅ Đã bao phủ |
| UC64 - Nút Gửi | Disabled/Enabled real-time | TC_140-TC_141 | ✅ Đã bao phủ |
| UC64 - Cascading dropdown | Đổi Tỉnh → clear Xã/Phường | TC_124 | ✅ Đã bao phủ |
| UC64 - Data persist | Giữ dữ liệu khi chuyển đối tượng | TC_119 | ✅ Đã bao phủ |
| UC65 - Hủy bỏ | Enable/Disable, Dialog, state change | TC_093-TC_100 | ✅ Đã bao phủ |
| CMR-01 | Search debounce, trim, persistence | TC_012-TC_022 | ✅ Đã bao phủ |
| CMR-04 | Lazy load, retry 3 lần | TC_008-TC_009, TC_023 | ✅ Đã bao phủ |
| CMR-07 | Error handling (mạng, 500, timeout, 401) | TC_024-TC_028, TC_145-TC_146 | ✅ Đã bao phủ |
| CMR-09 | Form validation, trim, inline error | TC_120-TC_135 | ✅ Đã bao phủ |
| CMR-14 | Empty state, null → "-" | TC_002, TC_005, TC_045 | ✅ Đã bao phủ |
| CMR-18 | Debounce navigation | TC_029 | ✅ Đã bao phủ |

---

## Out-of-scope items

| Hạng mục | Lý do | Đề xuất |
|----------|-------|---------|
| Performance (≤3s danh sách, ≤2s chi tiết) | NFR: PERFORMANCE | Defer to performance testing specialist |
| Security (HTTPS, secure storage) | NFR: SECURITY | Defer to security testing specialist |
| Load testing (lazy load hàng nghìn bản ghi) | NFR: LOAD | Defer to performance testing specialist |
| Accessibility (Dynamic Type, Font size) | NFR: ACCESSIBILITY | Defer to accessibility testing specialist |

---

## Ghi chú

- Q2 (Lưu nháp postcondition) chưa được BA trả lời → TC_144 chỉ verify action "lưu" nhưng chưa verify postcondition (toast, navigation)
- Q8 (Max file count) chưa rõ → không có TC boundary cho số lượng file upload
- Tất cả TC đều có thể thực hiện và quan sát được trên thiết bị (không test API/backend)
