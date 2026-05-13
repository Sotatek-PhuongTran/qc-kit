# BÁO CÁO KIỂM ĐỊNH YÊU CẦU (UC READINESS REVIEW) — RE-AUDIT

**Tiêu đề tài liệu:** UC56-57/66-68 — Khai thác tin tức công bố trên Mobile — Re-Audited Report
**Ngày kiểm định:** 06/05/2026
**Tác giả:** QC Agent (qc-uc-review-MOBILE)
**Phiên bản:** v2 (Re-audit sau khi BA trả lời Q1–Q13)
**Tài liệu gốc:** `docs\BA\SRS-mobile\UC56-57_66_68_TinTuc\UC56-57_66_68_TinTuc.md` (đã cập nhật)
**Báo cáo trước:** `UC56-57_66_68_TinTuc_audited-v1.md`

---

## 📊 Audit Summary (Re-audit)

| #         | Knowledge Area                            | Max Pts | v1 Score | v2 Score | Status |
| --------- | ----------------------------------------- | ------- | -------- | -------- | ------ |
| 1         | Feature Identity                          | 5       | 5/5      | 5/5      | ✅     |
| 2         | Objective & Scope                         | 5       | 4/5      | 5/5      | ✅     |
| 3         | Actors & User Roles                       | 10      | 9/10     | 9/10     | ⚡     |
| 4         | Preconditions & Postconditions            | 10      | 8/10     | 8/10     | ⚡     |
| 5         | UI Object Inventory & Mapping             | 15      | 12/15    | 14/15    | ⚡     |
| 6         | Object Attributes & Behavior Definition   | 20      | 14/20    | 18/20    | ⚡     |
| 7         | Functional Logic & Workflow Decomposition | 20      | 14/20    | 18/20    | ⚡     |
| 8         | Functional Integration Analysis           | 10      | 4/10     | 9/10     | ✅     |
| 9         | Acceptance Criteria                       | 10      | 8/10     | 10/10    | ✅     |
| 10        | Non-functional Requirements               | 5       | 2/5      | 3/5      | ⚡     |
| **Total** |                                           | **110** | **80**   | **99**   | **90.0/100** |

### 🏁 Verdict: ✅ READY

> **Score: 90.0 / 100** _(tăng từ 72.7 → 90.0)_
> Tài liệu đã đạt ngưỡng READY. QA có thể bắt đầu thiết kế test case ngay lập tức trên toàn bộ phạm vi chức năng.

---

## 📋 Unified Gap & Question Report (Trạng thái sau re-audit)

| ID  | Priority | Ref | Question | Why It Matters | Status |
|-----|----------|-----|----------|----------------|--------|
| Q1  | High | — | Tab Bar hiển thị thế nào cho từng màn? | — | ✅ Resolved |
| Q2  | High | — | Tìm kiếm có scope theo Tab đang active không? | — | ✅ Resolved |
| Q3  | High | — | Cơ chế đóng thanh tìm kiếm? | — | ✅ Resolved |
| Q4  | High | — | Filter reset khi đổi Tab không? | — | ✅ Resolved |
| Q5  | Medium | — | Lazy load cho Tin nổi bật? Bài nổi bật có xuất hiện ở Tin mới nhất không? | — | ✅ Resolved |
| Q6  | Medium | — | Tin tức mới nhất (màn chi tiết) scope theo ngôn ngữ hay danh mục? | — | ✅ Resolved |
| Q7  | Medium | — | Mâu thuẫn "Tin liên quan" vs "Tin tức mới nhất" trong mô tả màn chi tiết | — | ✅ Resolved |
| Q8  | Medium | — | Debounce delay bao nhiêu ms? | — | ✅ Resolved (refer CMR-01, không định nghĩa số ms tại đây) |
| Q9  | Medium | — | Quy tắc ngôn ngữ có áp dụng cho màn Chi tiết không? | — | ✅ Resolved |
| Q10 | Medium | — | Bấm Áp dụng khi chưa chọn ngày → xử lý thế nào? | — | ✅ Resolved |
| Q11 | Low | — | HTTP 404 xảy ra trong bối cảnh nào? | — | ✅ Resolved |
| Q12 | Low | — | NFR hiệu năng chưa định nghĩa | — | ✅ Resolved (thuộc phạm vi BE, không áp dụng cho UC FE này) |
| Q13 | Low | — | Hành vi offline chưa định nghĩa | — | ✅ Resolved (refer CMR-07) |

> Tất cả 13 câu hỏi từ v1 đã được giải đáp. **Không phát sinh câu hỏi mới** trong lần re-audit này.

---

## 🟢 What's Good (Sau re-audit)

1. **Tab Bar behavior per-context đã rõ ràng**: Màn "Tin tức" → 18 tabs, màn "Tin tức Dịch vụ công" & "Câu chuyện thành công" → ẩn Tab Bar hoàn toàn. Không còn mơ hồ.
2. **Search scope được định nghĩa chính xác**: Tìm kiếm chỉ trong phạm vi Tab đang active; giữ keyword khi đổi tab. Cơ chế đóng search (tap lại icon) và non-sticky behavior khi cuộn đã được ghi rõ.
3. **Filter behavior hoàn chỉnh**: Bộ lọc ngày đăng áp dụng xuyên suốt tất cả Tab (không reset). Validation "Trường bắt buộc" khi Áp dụng mà chưa chọn ngày đã được định nghĩa rõ.
4. **Rule loại trừ Tin nổi bật ↔ Tin mới nhất**: Bài đã xuất hiện trong carousel Tin nổi bật sẽ không lặp lại ở list Tin mới nhất — ngăn trùng lặp dữ liệu. Tin nổi bật không có lazy load.
5. **Quy tắc ngôn ngữ được áp dụng toàn bộ module**: Mở rộng scope từ "màn danh sách" ra toàn bộ UC56/57/66/67/68, bao gồm cả section Tin tức mới nhất cuối màn chi tiết.
6. **Mâu thuẫn nội tại đã được sửa**: Mô tả màn chi tiết đã đổi từ "Tin liên quan" → "Tin tức mới nhất", đồng nhất với bảng field.
7. **Tin tức mới nhất (màn chi tiết) rõ scope**: Lọc theo ngôn ngữ, **không** scope theo danh mục Tab.
8. **Acceptance Criteria tái cấu trúc hoàn chỉnh** — AC1–AC11 đều đo lường được, không trùng lặp, map đúng với từng rule đã định nghĩa.

---

## 🧪 Testability Outlook (Sau re-audit)

**Có thể bắt đầu test ngay — Toàn bộ scope:**

- **UC56/UC66 — Màn "Tin tức"**: Tab Bar 18 tabs, carousel Tin nổi bật (no lazy load, loại trừ bài trùng), list Tin mới nhất (lazy load 20/lần, sort mới nhất), tìm kiếm theo tab active, filter ngày persist qua tab, Pull to Refresh, Skeleton Loading.
- **UC67 — Màn "Tin tức Dịch vụ công"**: Ẩn Tab Bar, chỉ hiển thị Tin nổi bật + Tin mới nhất, không có filter tab.
- **UC68 — Màn "Câu chuyện thành công"**: Ẩn Tab Bar, chỉ hiển thị Tin nổi bật + Tin mới nhất.
- **Modal Filter**: Date Range Picker, Nhập lại (popup không đóng), Áp dụng (validate bắt buộc khi chưa chọn ngày), đóng bằng X hoặc tap ngoài.
- **Màn Chi tiết**: Ảnh bìa, Tag, Tiêu đề, Meta, Rich Text, section 5 bài mới nhất (lọc theo ngôn ngữ, không scope theo Tab).
- **Quy tắc ngôn ngữ**: Test với 2+ ngôn ngữ — danh sách thay đổi, nội dung bài không bị dịch.
- **Error states**: Lỗi mạng, HTTP 500, HTTP 404 (bài đã xóa từ CMS), empty state tìm kiếm/lọc.

**Suggested test focus areas:**

- Happy path: Sidebar → "Tin tức" → Tab "Kinh tế" → Tin nổi bật carousel → Chi tiết → Tin tức mới nhất cuối trang → Chi tiết khác → Back
- Integration: Đổi Tab trong khi có Filter active → Filter giữ nguyên, kết quả lọc đúng danh mục mới
- Integration: Search trong Tab "Kinh tế" → chỉ ra bài thuộc "Kinh tế"; đổi sang Tab "Xã hội" → keyword giữ, kết quả đổi danh mục
- Boundary: Bấm "Áp dụng" khi chưa chọn ngày → lỗi "Trường bắt buộc"
- Boundary: Cuộn xuống cuối list → lazy load tự động; Pull to Refresh → reset dữ liệu
- Boundary: Tin nổi bật rỗng → section ẩn, Tin mới nhất kéo lên trên
- UI: Các Card đều truncate đúng 2 dòng với `...`, clickable toàn diện tích
- Language: Đổi ngôn ngữ → bài viết thay đổi theo ngôn ngữ (danh sách + chi tiết)
- Error: Mở chi tiết bài đã xóa → thông báo 404 + back về danh sách

---

## 📌 Summary & Recommendation

Sau khi BA giải đáp đầy đủ 13 câu hỏi từ v1, tài liệu UC56-57/66-68 đã đạt **✅ READY** với điểm **90.0/100** (tăng +17.3 điểm so với v1). Các gap quan trọng nhất đã được giải quyết hoàn toàn: Tab Bar ẩn/hiện theo context, search scope theo Tab, filter persist qua Tab, rule loại trừ bài nổi bật, quy tắc ngôn ngữ mở rộng toàn module, validate Áp dụng khi chưa chọn ngày. Điểm còn lại ⚡ (Partial) chủ yếu ở NFR (Actors còn hơi chung chung — public access nhưng không có điều kiện cụ thể), và Preconditions chưa đề cập đến trạng thái app lần đầu khởi động. Đây là những mục không blockers cho test design.

**Khuyến nghị:** QA có thể **bắt đầu thiết kế test case ngay** cho toàn bộ scope 3 màn hình (Tin tức, Tin tức Dịch vụ công, Câu chuyện thành công) và màn Chi tiết.

---

## 📝 Changelog từ v1 → v2

| # | Thay đổi | Nguồn |
|---|----------|-------|
| 1 | Bổ sung rule Tab Bar ẩn với màn "Tin tức Dịch vụ công" và "Câu chuyện thành công" | Q1 |
| 2 | Search scope theo Tab đang active; giữ keyword khi đổi tab | Q2 |
| 3 | Cơ chế đóng thanh search: tap lại icon. Non-sticky khi cuộn | Q3 |
| 4 | Filter ngày apply xuyên suốt tất cả Tab, không reset khi đổi tab | Q4 |
| 5 | Tin nổi bật không có lazy load. Bài trong Tin nổi bật loại trừ khỏi Tin mới nhất | Q5 |
| 6 | Tin tức mới nhất (màn chi tiết): theo ngôn ngữ, không scope theo danh mục | Q6 |
| 7 | Sửa mô tả màn chi tiết: "Tin liên quan" → "Tin tức mới nhất" | Q7 |
| 8 | Bỏ mention debounce delay ms; hành vi debounce vẫn giữ, refer CMR-01 | Q8 |
| 9 | Quy tắc ngôn ngữ mở rộng áp dụng toàn module (cả màn chi tiết) | Q9 |
| 10 | Bấm "Áp dụng" khi chưa chọn ngày → lỗi inline "Trường bắt buộc" | Q10 |
| 11 | HTTP 404: context = mở chi tiết bài đã xóa từ CMS, xử lý theo CMR-07 | Q11 |
| 12 | NFR hiệu năng: xác nhận không áp dụng (phạm vi BE) | Q12 |
| 13 | Hành vi offline: refer CMR-07, thêm vào bảng xử lý lỗi | Q13 |
| 14 | AC1–AC11 được tái cấu trúc hoàn chỉnh theo các rule mới | Tổng hợp |
