# Test Cases Summary — UC69: Tra cứu văn bản pháp luật trên Mobile

**Ngày tạo:** 11/05/2026  
**Tác giả:** QC Test Case Design Agent  
**Phiên bản:** v1

---

## ✅ Hoàn tất thiết kế kiểm thử

| Sản phẩm | Tệp | Số lượng |
|---|---|---|
| Test Cases Draft | UC69_tra-cuu-van-ban-phap-luat_testcases_draft.md | 127 test cases |
| Test Cases (.xlsx) | UC69_tra-cuu-van-ban-phap-luat_testcases_20260511_v1.xlsx | 127 test cases (28 UI + 51 FUNC + 48 Common) |
| Test Scenarios | ../scenarios/UC69/UC69_tra-cuu-van-ban-phap-luat_scenarios_20260511.md | 87 scenarios |

---

## Phân bổ theo màn hình

| # | Màn hình | Check UI/UX | Check Function | Check Common | Tổng |
|---|---|---|---|---|---|
| 1 | Màn hình Danh sách Văn bản pháp luật | 9 | 20 | 16 | 45 |
| 2 | Bottom Sheet Bộ lọc tìm kiếm | 1 | 21 | 16 | 38 |
| 3 | Màn hình Chi tiết văn bản | 7 | 21 | 16 | 44 |
| **Tổng** | | **17** | **62** | **48** | **127** |

---

## Ma trận truy xuất nguồn gốc yêu cầu (RTM)

| AC ID | Tiêu chí chấp nhận | Test Cases liên kết | Trạng thái |
|---|---|---|---|
| AC1 | Tìm kiếm realtime theo Tên VB, kết hợp phạm vi | TC_010, TC_011, TC_012, TC_013, TC_017, TC_028 | ✅ Đã bao phủ |
| AC2 | Bottom Sheet bộ lọc 6 trường, kết hợp ô tìm kiếm | TC_046–TC_067 | ✅ Đã bao phủ |
| AC3 | Chi tiết hiển thị đúng format | TC_086, TC_087, TC_088 | ✅ Đã bao phủ |
| AC4 | Tải văn bản + Xem PDF | TC_089–TC_094 | ✅ Đã bao phủ |
| AC5 | Văn bản liên quan | TC_101–TC_106 | ✅ Đã bao phủ |
| AC6 | Nội dung toàn văn scroll | TC_099, TC_100 | ✅ Đã bao phủ |
| AC7 | Mục lục collapse/expand/scroll | TC_095–TC_098 | ✅ Đã bao phủ |
| AC8 | Debounce 3 giây | TC_011 | ✅ Đã bao phủ |
| AC9 | State Persistence | TC_027 | ✅ Đã bao phủ |
| AC10 | Sắp xếp theo ngày ban hành mới nhất | TC_001, TC_015 | ✅ Đã bao phủ |
| AC11 | Chuyển radio reset trang, giữ keyword/filter | TC_017, TC_018 | ✅ Đã bao phủ |
| AC12 | Partial API failure | TC_107 | ✅ Đã bao phủ |
| AC13 | Rapid tap debounce | TC_025 | ✅ Đã bao phủ |
| AC14 (implicit) | Active filter indicator | TC_008, TC_009 | ✅ Đã bao phủ |
| AC15 (implicit) | Searchable dropdown | TC_050–TC_053 | ✅ Đã bao phủ |
| AC16 (implicit) | Full-screen loading first-load | TC_006 | ✅ Đã bao phủ |
| AC17 (implicit) | Date Range CMR-15 + ngày tương lai | TC_057–TC_061 | ✅ Đã bao phủ |
| AC18 (implicit) | Deep navigation VB liên quan | TC_105, TC_106 | ✅ Đã bao phủ |
| AC19 (implicit) | Đa ngôn ngữ | TC_109, TC_110 | ✅ Đã bao phủ |

**Tổng kết RTM:** 19/19 AC đã được bao phủ 100%.

---

## Kỹ thuật thiết kế test áp dụng

| Kỹ thuật | Test Cases áp dụng |
|---|---|
| Boundary Value Analysis (BVA) | TC_013, TC_014 (500 chars search), TC_055, TC_056 (500 chars textbox), TC_060 (date range validation) |
| Equivalence Partitioning (EP) | TC_005 (5 trạng thái badge), TC_066 (5 trạng thái dropdown) |
| Decision Table | TC_048, TC_049 (multi-filter combination), TC_028 (search + filter) |
| State Transition | TC_017, TC_018 (radio switch), TC_095–TC_097 (mục lục collapse/expand) |
| Error Guessing | TC_016 (ký tự đặc biệt), TC_029, TC_108 (mất mạng), TC_093, TC_094 (file lỗi) |

---

## Out-of-scope items

| Lĩnh vực | Lý do | Khuyến nghị |
|---|---|---|
| Performance testing (response < 10s) | NFR: PERFORMANCE | Defer to performance specialist |
| Security testing (injection, XSS) | NFR: SECURITY | Defer to security specialist |
| Load testing (concurrent users) | NFR: LOAD | Defer to load testing specialist |
| Accessibility (screen reader, contrast) | NFR: ACCESSIBILITY | Defer to accessibility specialist |
| Q9 — Vị trí lưu file, quyền storage | Chưa có thông tin từ BA | Bổ sung TC khi BA trả lời |

---

## Ghi chú

- Tất cả TC Check common (16 TC/màn hình) tuân thủ đúng template bắt buộc (8 UI/UX common + 8 tương tác thiết bị)
- TC pull-to-refresh và scroll-to-load-more ghi N/A cho Bottom Sheet và Chi tiết (không hỗ trợ)
- App chỉ hỗ trợ Portrait → TC chế độ ngang ghi expected "App không xoay"
- Deep navigation không giới hạn depth (Q10 confirmed)
- Date Range cho phép ngày tương lai (Q11 confirmed)
