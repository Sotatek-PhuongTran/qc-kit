# UC60-61 Chatbot Trợ lý Đầu Tư — Test Cases Summary

**Tiêu đề:** UC60-61_chatbot_testcases_summary_20260512_v1.md  
**Ngày tạo:** 12/05/2026  
**Tác giả:** QC Agent  
**Phiên bản:** v1

---

## ✅ Hoàn tất thiết kế kiểm thử

| Sản phẩm | Tệp | Số lượng |
|---|---|---|
| Test Cases Draft | UC60-61_chatbot_testcases_draft.md | 77 test cases |
| Test Cases (.xlsx) | UC60-61_chatbot_testcases_20260512_v1.xlsx | 77 test cases (4 UI/UX + 57 Function + 16 Common) |

### Phân bổ theo Section Group:

| # | Section | TC Count |
|---|---|---|
| 1 | Màn hình Welcome | 17 TCs (TC_001–TC_017) |
| 2 | Màn hình Hội thoại | 23 TCs (TC_018–TC_040) |
| 3 | Đánh giá phản hồi (UC61) | 9 TCs (TC_041–TC_049) |
| 4 | Màn hình Offline | 4 TCs (TC_050–TC_053) |
| 5 | Xử lý lỗi | 5 TCs (TC_054–TC_058) |
| 6 | Đa ngôn ngữ & Tích hợp | 3 TCs (TC_059–TC_061) |
| Common | UI/UX + Tương tác thiết bị | 16 TCs (TC_062–TC_077) |

### Kỹ thuật test design áp dụng:

- **BVA:** 499/500/501 ký tự (TC_007–TC_009), 5/6 dòng (TC_010)
- **EP:** Các loại ký tự (TC_011), các loại file (TC_028–TC_031)
- **State Transition:** Nút Gửi 3 states (TC_014, TC_015, TC_020), Rating 3 states (TC_041–TC_045)
- **Decision Table:** Error scenarios (TC_054–TC_058), Offline retry (TC_052–TC_053)
- **Use Case Testing:** Main flow (TC_019), Alternative (TC_004, TC_029), Exception (TC_031, TC_054–TC_058)

---

### Ma trận truy xuất nguồn gốc yêu cầu (RTM)

| AC ID | Tiêu chí chấp nhận | Test Cases liên kết | Trạng thái |
|---|---|---|---|
| AC1 | Mở Chatbot → Welcome. Chip gợi ý từ API | TC_001, TC_002, TC_003 | ✅ Đã bao phủ |
| AC2 | Tap chip → gửi ngay. Welcome ẩn | TC_004, TC_005 | ✅ Đã bao phủ |
| AC3 | Gửi câu hỏi → Bubble + Loading + Typing | TC_019, TC_020, TC_023, TC_024 | ✅ Đã bao phủ |
| AC4 | Ô nhập max 500 ký tự, 5 dòng, out-tap | TC_007–TC_010, TC_012 | ✅ Đã bao phủ |
| AC5 | Tap 👍/👎 → ẩn, "Đánh giá lại?" | TC_041–TC_045 | ✅ Đã bao phủ |
| AC6 | File: PDF/DOCX/lỗi | TC_028–TC_031 | ✅ Đã bao phủ |
| AC7 | Auto-scroll sau bubble bot | TC_032 | ✅ Đã bao phủ |
| AC8 | Back + hội thoại → popup | TC_035–TC_038 | ✅ Đã bao phủ |
| AC9 | Mở lại → Welcome | TC_039 | ✅ Đã bao phủ |
| AC10 | Lỗi API → Toast + trả tin về ô | TC_054–TC_058 | ✅ Đã bao phủ |
| AC11 | Offline → "Chưa hoạt động" + "Thử lại" | TC_050–TC_053 | ✅ Đã bao phủ |

**Coverage: 11/11 AC = 100%**

---

### Out-of-scope items:

| Scenario Area | Reason | Recommended Action |
|---|---|---|
| Performance khi lịch sử chat dài | NFR: PERFORMANCE | Defer to performance testing |
| Load test API Chatbot AI | NFR: LOAD | Defer to load testing |
| Security — token storage, HTTPS | NFR: SECURITY | Defer to security testing |
| Lazy load page size boundary | Dependency: BE/AI team | Chỉ test behavior (loading indicator) |

---

### Notes:

- Timeout 30s (override CMR-16 10s) — UC có lý do tường minh, test theo 30s
- Lazy load page size do API AI quyết định — chỉ test behavior
- Q1 (chip text overflow), Q2 (tap chip khi ô có nội dung), Q3 (API reset fail) chưa có answer từ BA — bổ sung TC sau khi clarify
