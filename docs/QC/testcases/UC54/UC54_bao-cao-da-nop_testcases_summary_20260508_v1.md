# UC54 — Test Cases Summary

| Thông tin | Chi tiết |
| --- | --- |
| **UC** | UC54 — Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên Mobile |
| **Ngày tạo** | 08/05/2026 |
| **Tác giả** | Claude Agent (QC TC Design) |
| **Phiên bản** | v1 |
| **UC Spec** | v2.2 |
| **Audit** | v2 (89.1/100 — CONDITIONALLY READY) |
| **Scenarios** | v2 (93 scenarios) |

---

## Tổng quan

| Metric | Giá trị |
| --- | --- |
| Tổng số Test Cases | 98 |
| Section Groups | 2 |
| Check UI/UX | 11 TCs (7 + 4) |
| Check Function | 55 TCs (40 + 15) |
| Check Common | 32 TCs (16 + 16) |

---

## Phân bổ theo Section Group

### Section Group 1: Màn hình Danh sách báo cáo đã nộp (TC_001 → TC_063)

| Loại kiểm tra | Số lượng | TC IDs |
| --- | --- | --- |
| Check UI/UX | 7 | TC_001 → TC_007 |
| Check Function | 40 | TC_008 → TC_047 |
| Check Common (UI/UX phổ biến) | 8 | TC_048 → TC_055 |
| Check Common (Tương tác thiết bị) | 8 | TC_056 → TC_063 |

### Section Group 2: Màn hình Chi tiết báo cáo (TC_064 → TC_098)

| Loại kiểm tra | Số lượng | TC IDs |
| --- | --- | --- |
| Check UI/UX | 4 | TC_064 → TC_067 |
| Check Function | 15 | TC_068 → TC_082 |
| Check Common (UI/UX phổ biến) | 8 | TC_083 → TC_090 |
| Check Common (Tương tác thiết bị) | 8 | TC_091 → TC_098 |

---

## Phân bổ theo Test Focus

| Test Focus | Số lượng |
| --- | --- |
| UI/UX Layout & Design | 11 |
| Navigation & Routing | 8 |
| Search (CMR-01) | 6 |
| Filter (CMR-02) | 11 |
| State Persistence | 2 |
| Lazy Load (CMR-04) | 2 |
| Error Handling (CMR-07) | 5 |
| Real-time Sync | 3 |
| Session & Auth (CMR-18) | 4 |
| Detail Screen Sections | 10 |
| Modal Lịch sử | 2 |
| Common Mobile Interactions | 32 |
| Permission/Data Isolation | 1 |
| Badge Color Mapping (CMR-05) | 1 |

---

## Requirement Traceability Matrix (RTM)

### Acceptance Criteria Coverage

| AC ID | Tiêu chí chấp nhận | Test Cases | Trạng thái |
| --- | --- | --- | --- |
| AC1 | Stat Banner hiển thị đúng 6 chỉ số, count + format CMR-11 | TC_003, TC_008, TC_011, TC_012 | ✅ Covered |
| AC2 | Card hiển thị đầy đủ: Mã BC, Badge, Dự án, NĐT, Metadata | TC_005, TC_006, TC_031, TC_034, TC_035 | ✅ Covered |
| AC3 | Tap card → Chi tiết | TC_033, TC_034 | ✅ Covered |
| AC4 | Chi tiết hiển thị 7 section | TC_067, TC_069 → TC_076 | ✅ Covered |
| AC5 | Modal Lịch sử hiển thị đúng | TC_078, TC_079 | ✅ Covered |

### CMR Coverage

| CMR | Mô tả | Test Cases |
| --- | --- | --- |
| CMR-01 | Search Box | TC_013 → TC_018 |
| CMR-02 | Filter | TC_019 → TC_029 |
| CMR-03 | Dropdown | TC_028 |
| CMR-04 | Lazy Load | TC_036, TC_037, TC_062 |
| CMR-05 | Badge trạng thái | TC_006 |
| CMR-06 | Header & Navigation | TC_002, TC_009, TC_065, TC_068 |
| CMR-07 | Error handling | TC_039 → TC_044, TC_046 |
| CMR-11 | Format số | TC_003, TC_073 |
| CMR-12 | Format thời gian | TC_072, TC_079 |
| CMR-13 | Pull-to-Refresh | TC_038, TC_047, TC_061 |
| CMR-14 | Empty State | TC_007, TC_016, TC_024 |
| CMR-16 | Timeout 10s | TC_041 |
| CMR-17 | Đa ngôn ngữ | TC_080 |
| CMR-18 | Debounce & Session | TC_034, TC_058, TC_081, TC_082 |

---

## Output Files

| Artifact | File Path |
| --- | --- |
| Test Cases Draft | `docs/QC-MOBILE/testcases/UC54/UC54_bao-cao-da-nop_testcases_draft.md` |
| Test Cases (xlsx) | `docs/QC-MOBILE/testcases/UC54/UC54_bao-cao-da-nop_testcases_20260508_v1.xlsx` |
| Summary | `docs/QC-MOBILE/testcases/UC54/UC54_bao-cao-da-nop_testcases_summary_20260508_v1.md` |

---

## Known Gaps & Assumptions

| # | Mô tả | Xử lý |
| --- | --- | --- |
| 1 | Q5 (mapping trường theo loại báo cáo) vẫn Open | TC thiết kế cho default case (hiển thị tất cả). Cần bổ sung khi BA trả lời. |
| 2 | Q16 (Active filter indicator CMR-02) vẫn Open | TC_029 đã cover theo CMR-02 v1.1 rule. Xác nhận lại khi BA trả lời. |
| 3 | Badge color mapping lấy từ Stat Banner §2.1 | Q1 đã Answered. Badge chỉ có text + màu nền (không icon). |

---

## Out-of-Scope Items

| Loại | Mô tả | Lý do |
| --- | --- | --- |
| Performance | Load time, response time benchmarks | NFR — cần performance testing specialist |
| Security | Penetration testing, OWASP Top 10 | NFR — cần security testing specialist |
| Load | Concurrent users, stress testing | NFR — cần load testing specialist |
| Accessibility | Screen reader, WCAG compliance | Q14 Open — chưa có spec |
| Device Compatibility | iOS/Android min version, tablet | Q15 Open — chưa có spec |