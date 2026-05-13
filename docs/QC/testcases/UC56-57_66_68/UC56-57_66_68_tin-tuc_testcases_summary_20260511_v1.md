# UC56-57_66_68 — Tin tức Mobile — Test Cases Summary

| Thông tin | Giá trị |
|-----------|---------|
| Tài liệu | UC56-57_66_68_tin-tuc_testcases_20260511_v1.xlsx |
| Ngày tạo | 2026-05-11 |
| Tác giả | QC Agent |
| Phiên bản | v1 |
| Nguồn yêu cầu | UC56-57_66_68_TinTuc.md v1.2 |
| Audit Report | UC56-57_66_68_tin-tuc_audited_20260511_v2.md (92.7/100 — READY) |
| Scenarios | UC56-57_66_68_tin-tuc_scenarios_20260511.md |

---

## Tổng quan

| Chỉ số | Giá trị |
|--------|---------|
| Tổng số Test Cases | 127 |
| Section Groups | 3 |
| Check UI/UX | Có (mỗi section) |
| Check Function | Có (mỗi section) |
| Check common | Có (mỗi section: 8 UI/UX + 8 Device) |

---

## Phân bổ theo Section

| # | Section Group | TC Range | Số TC |
|---|--------------|----------|-------|
| 1 | Màn hình Danh sách Tin tức (UC56) | TC_001 – TC_056 | 56 |
| 2 | Modal Bộ lọc tìm kiếm & Tìm kiếm (UC66) | TC_057 – TC_094 | 38 |
| 3 | Màn hình Chi tiết bài viết (UC57) | TC_095 – TC_127 | 33 |

---

## Phân bổ theo Check Type

| Check Type | Section 1 | Section 2 | Section 3 | Tổng |
|------------|-----------|-----------|-----------|------|
| Check UI/UX | 15 | 9 | 8 | 32 |
| Check Function | 25 | 13 | 9 | 47 |
| Check common (UI/UX) | 8 | 8 | 8 | 24 |
| Check common (Device) | 8 | 8 | 8 | 24 |
| **Tổng** | **56** | **38** | **33** | **127** |

---

## Kỹ thuật thiết kế đã áp dụng

- **Equivalence Partitioning**: Phân vùng trạng thái carousel (0/1/≥2 bài), trạng thái mạng, ngôn ngữ
- **Boundary Value Analysis**: Giới hạn 500 ký tự tìm kiếm, lazy load 20 bài, max 2 dòng truncate, max 5 tin liên quan
- **State Transition Testing**: Tab active/inactive, thanh tìm kiếm mở/đóng, modal mở/đóng
- **Decision Table Testing**: Bộ lọc ngày (chỉ bắt đầu / chỉ kết thúc / cả hai / không chọn)
- **Use Case Testing**: Trực tiếp từ UC flows (main, alternative, exception)
- **Error Guessing**: Double-tap debounce, partial API failure, 404 bài đã xóa, ảnh null/lỗi

---

## CMR Rules đã bao phủ

| CMR | Mô tả | Test Cases |
|-----|--------|------------|
| CMR-01 | Tìm kiếm gần đúng, debounce 3s, max 500 chars | TC_066, TC_067, TC_068 |
| CMR-04 | Lazy load 20 bài/lần | TC_023, TC_024, TC_025 |
| CMR-06 | Nút Quay lại | TC_010, TC_011, TC_015, TC_102 |
| CMR-07 | Xử lý lỗi mạng/API | TC_025, TC_034, TC_035, TC_036, TC_037, TC_109, TC_110 |
| CMR-13 | Pull to Refresh | TC_026, TC_027 |
| CMR-14 | Empty state / No result | TC_008, TC_033, TC_070 |
| CMR-15 | Date range validation (1 ngày = mở rộng) | TC_071, TC_072, TC_073, TC_074 |
| CMR-17 | Đa ngôn ngữ UI labels | TC_032, TC_033 |
| CMR-18 | Debounce Navigation (chống double-tap) | TC_017, TC_019 |

---

## RTM Coverage

Tất cả 11 Acceptance Criteria (AC1–AC11) và 9 CMR rules đều đã được bao phủ đầy đủ.
Chi tiết RTM xem trong file draft: `UC56-57_66_68_tin-tuc_testcases_draft.md`

---

## Out-of-scope items

Các loại kiểm thử sau KHÔNG nằm trong phạm vi tài liệu này:
- Performance Testing (thời gian tải, throughput)
- Load Testing (concurrent users)
- Security Testing (OWASP, injection, auth bypass)
- Zoom ảnh inline (được ghi nhận ngoài phạm vi UC trong SRS)

---

## Ghi chú

- Debounce tìm kiếm: 3 giây sau khi ngừng gõ mới gọi API
- Carousel auto-scroll: 5 giây/card, không có dot indicator
- Bộ lọc ngày persist xuyên Tab nhưng reset khi đóng app
- Section "Tin tức mới nhất" cuối Chi tiết: max 5 bài, loại trừ bài đang xem, lọc theo ngôn ngữ, không scope theo Tab