# BÁO CÁO KIỂM ĐỊNH YÊU CẦU (UC READINESS REVIEW)

**Tiêu đề tài liệu:** UC56-57/66-68 — Khai thác tin tức công bố trên Mobile — Audited Report
**Ngày kiểm định:** 06/05/2026
**Tác giả:** QC Agent (qc-uc-review-MOBILE)
**Phiên bản:** v1
**Tài liệu gốc:** `docs\BA\SRS-mobile\UC56-57_66_68_TinTuc\UC56-57_66_68_TinTuc.md`

---

## 📊 Audit Summary

| #         | Knowledge Area                            | Max Pts | Score  | Status |
| --------- | ----------------------------------------- | ------- | ------ | ------ |
| 1         | Feature Identity                          | 5       | 5/5    | ✅     |
| 2         | Objective & Scope                         | 5       | 4/5    | ⚡     |
| 3         | Actors & User Roles                       | 10      | 9/10   | ⚡     |
| 4         | Preconditions & Postconditions            | 10      | 8/10   | ⚡     |
| 5         | UI Object Inventory & Mapping             | 15      | 12/15  | ⚡     |
| 6         | Object Attributes & Behavior Definition   | 20      | 14/20  | ⚡     |
| 7         | Functional Logic & Workflow Decomposition | 20      | 14/20  | ⚡     |
| 8         | Functional Integration Analysis           | 10      | 4/10   | ⚠️    |
| 9         | Acceptance Criteria                       | 10      | 8/10   | ⚡     |
| 10        | Non-functional Requirements               | 5       | 2/5    | ⚡     |
| **Total** |                                           | **110** | **80** | **72.7/100** |

### 🏁 Verdict: ⚠️ CONDITIONALLY READY

> **Score: 72.7 / 100**
> QA có thể bắt đầu thiết kế test case trên các khu vực đã rõ (luồng danh sách, tìm kiếm, lọc, chi tiết bài viết). Các mục bị flag ⚠️/⚡ phải được BA giải đáp song song trước khi viết test case cho phần tích hợp và edge cases.

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q1 | High | "Tab List (Horizontal Scroll)" — Mục 2.1, Field #6: Danh sách tab gồm 18 mục. Tuy nhiên màn "Câu chuyện thành công" (UC68) cũng dùng chung màn hình này. | **Tab nào hiển thị khi mở màn "Câu chuyện thành công"?** Có phải toàn bộ 18 tab đều hiển thị, hay chỉ hiển thị tab "Câu chuyện thành công" và các tab liên quan? Hay màn "Câu chuyện thành công" không có Tab Bar? | Ảnh hưởng trực tiếp đến phạm vi test: nếu mỗi màn dùng tab set khác nhau thì cần test case riêng. | Open |
| Q2 | High | "Tìm kiếm theo từ khóa" — Mục 3.2: "tự động tìm kiếm gần đúng theo tiêu đề bài viết" | **Tìm kiếm có scope theo Tab đang active không, hay search toàn bộ danh mục?** Ví dụ: đang ở tab "Kinh tế", gõ từ khóa → chỉ search trong bài "Kinh tế" hay search toàn bộ? | Xác định phạm vi test case tìm kiếm. Nếu scope theo tab thì phải test kết hợp tab + keyword. | Open |
| Q3 | High | "Tap → Mở rộng thanh textbox tìm kiếm" — Mục 2.1, Field #3 | **Cách đóng thanh tìm kiếm là gì?** Tap lại icon kính lúp? Nhấn nút Cancel/Back? Cuộn màn hình? Chưa được định nghĩa. | Nếu không có cơ chế đóng, tester không thể viết test case kiểm tra trạng thái UI sau khi thoát tìm kiếm. | Open |
| Q4 | High | "Lọc theo bộ lọc... Khi bấm 'Nhập lại', giá trị bộ lọc bị xóa" — Mục 3.2 | **Khi người dùng chuyển sang Tab khác trong khi đang có bộ lọc ngày đăng active, bộ lọc có bị reset về mặc định không?** | Tích hợp giữa Tab và Filter là khu vực rủi ro cao về bug. Nếu filter persist qua tab đổi, kết quả sẽ bị sai. | Open |
| Q5 | Medium | "Hỗ trợ lazy load / infinite scroll (tải 20 bản ghi/lần)" — Mục 2.1, Field #9 | **Thứ tự tải của "Tin nổi bật" trong lazy load là thế nào?** Tài liệu nói "API trả về bao nhiêu bài được đánh dấu 'Tin nổi bật' thì hiển thị bấy nhiêu" — vậy có giới hạn tối đa không? Nếu có 100 bài "Tin nổi bật" thì có lazy load không? | Ảnh hưởng đến performance test và test case scroll carousel. | Open |
| Q6 | Medium | "Gợi ý hiển thị 5 bài tin tức mới nhất, loại trừ đi bài viết đang xem hiện tại" — Mục 2.3, Khung Tin tức mới nhất | **"5 bài tin tức mới nhất" này có scope theo ngôn ngữ không? Và có scope theo danh mục (Tab) của bài đang xem không?** | Nếu không scope theo ngôn ngữ sẽ mâu thuẫn với quy tắc ngôn ngữ đã định nghĩa ở Mục 2.1. | Open |
| Q7 | Medium | "Màn hình chi tiết chứa toàn bộ nội dung của bài viết... mục 'Tin liên quan' ở cuối bài" — Mục 2.3, mô tả giao diện | **Phần mô tả giao diện màn chi tiết vẫn ghi "Tin liên quan" nhưng bảng component đã đổi thành "Tin tức mới nhất".** Đây là mâu thuẫn nội tại giữa phần mô tả và phần bảng field. | Cross-artefact conflict — gây nhầm lẫn cho tester và dev. | Open |
| Q8 | Medium | "Nhập từ khóa → Hệ thống tìm kiếm theo tiêu đề bài viết (tìm kiếm gần đúng). Kết quả hiển thị tự động (debounce)." — Mục 2.1, Field #4 | **Debounce delay là bao nhiêu milliseconds?** CMR-01 có định nghĩa con số cụ thể không? Nếu không, cần ghi rõ vào đây. | Thiếu thông số debounce → không thể viết automation test cho hành vi tìm kiếm real-time. | Open |
| Q9 | Medium | "Nếu không có bài viết nào thuộc ngôn ngữ đã chọn → Hiển thị trạng thái empty 'Chưa có thông tin'" — Mục 2.1, Quy tắc ngôn ngữ | **Quy tắc ngôn ngữ có áp dụng cho section "Tin tức mới nhất" ở màn Chi tiết không?** Tài liệu chỉ ghi "Áp dụng cho toàn màn hình danh sách" — màn chi tiết chưa được đề cập. | Thiếu scope → tester không biết phải kiểm tra ngôn ngữ trong màn chi tiết hay không. | Open |
| Q10 | Medium | "Khi bấm 'Nhập lại', giá trị bộ lọc bị xóa" — Mục 3.2 & Field #4 Modal | **Sau khi "Nhập lại" xong và bấm "Áp dụng" (không chọn ngày nào), hệ thống xử lý thế nào?** Có gọi API không filter ngày không, hay hiện thông báo lỗi? | Boundary case của bộ lọc — nếu không định nghĩa sẽ có hành vi bất nhất giữa dev và test. | Open |
| Q11 | Low | "Không tìm thấy bài viết (HTTP 404)" — Mục 3.4 | **HTTP 404 xảy ra trong bối cảnh nào?** Khi mở chi tiết bài đã bị xóa từ CMS, hay có tình huống nào khác? Và tại màn danh sách nếu API tab trả 404 thì xử lý ra sao? | Thiếu phân biệt bối cảnh 404 → tester có thể bỏ sót test case. | Open |
| Q12 | Low | N/A (Missing) | **Tài liệu chưa định nghĩa NFR về hiệu năng**: thời gian tải danh sách tối đa chấp nhận được, thời gian tải chi tiết bài viết, kích thước ảnh thumbnail/cover chuẩn. | Thiếu NFR → không có baseline để viết performance test. | Open |
| Q13 | Low | N/A (Missing) | **Tài liệu chưa định nghĩa hành vi offline**: Nếu người dùng mở app khi không có mạng, màn tin tức hiển thị gì? Cache hay màn lỗi ngay? | Liên quan đến CMR-07 nhưng chưa explicit cho màn này. | Open |

---

## 🟢 What's Good

1. **Feature Identity rõ ràng**: Tài liệu xác định đúng 5 UC liên quan (UC56/57/66/67/68), trigger từ 3 mục Sidebar riêng biệt, tên màn hình và tiêu đề header khớp nhau — không mơ hồ.
2. **Phạm vi ngoài UC (Exclusions) được khai báo rõ**: Ghi rõ không dịch bài, không chia sẻ, không tải xuống — giúp tránh scope creep và hiểu lầm.
3. **UI Component được mô tả đầy đủ**: Cả 3 màn hình (Danh sách, Modal lọc, Chi tiết) đều có bảng field định nghĩa với Kiểu trường, Giá trị mặc định, Quy tắc hiển thị + hành động.
4. **Empty state được định nghĩa** cho Tin nổi bật, Tin tức mới nhất, ảnh cover null, kết quả tìm kiếm rỗng — đây là điểm yếu thường bị bỏ sót.
5. **Skeleton Loading + Pull to Refresh** được đề cập đúng chỗ (3.1 và AC7/AC8) — tốt cho UX test.
6. **Quy tắc ngôn ngữ** được bổ sung rõ ràng dưới dạng rule độc lập — giúp tester biết cần test scenario đa ngôn ngữ.
7. **Bảng xử lý lỗi 3.4** có đủ 4 case gồm cả empty state từ lọc/tìm kiếm.
8. **AC1–AC9** đều có thể đo lường, pass/fail rõ ràng — không dùng từ "should/may".

---

## 🧪 Testability Outlook

**Có thể bắt đầu test ngay:**

- Hiển thị danh sách bài viết theo 3 màn từ Sidebar (AC1)
- Tin nổi bật: hiển thị, carousel scroll, clickable card, empty state
- Tin tức mới nhất: lazy load 20 bài, sắp xếp mới nhất, empty state "Chưa có thông tin"
- Modal Bộ lọc: mở/đóng, Date Range Picker, Nhập lại, Áp dụng
- Skeleton Loading và Pull to Refresh
- Màn Chi tiết: ảnh bìa, Tag, tiêu đề, meta, Rich Text, section 5 bài cuối
- Xử lý lỗi mạng và HTTP 500

**Chưa thể test (bị block bởi gap):**

- Tìm kiếm: scope theo tab hay toàn bộ? (Q2)
- Đóng thanh tìm kiếm: chưa có cơ chế (Q3)
- Tương tác giữa Tab và Filter active (Q4)
- Ngôn ngữ trong màn Chi tiết (Q9)
- Áp dụng bộ lọc khi không chọn ngày (Q10)
- Hành vi offline (Q13)

**Suggested test focus areas** *(sau khi giải quyết gaps)*:

- Happy path: Mở danh sách → chọn Tab → xem Tin nổi bật → tap → Chi tiết → tap Tin tức mới nhất → Chi tiết khác
- Alternative: Tìm kiếm keyword → có kết quả / không có kết quả
- Alternative: Lọc ngày đăng → kết quả đúng khoảng thời gian
- Boundary: Debounce timing, lazy load page boundary (20/40/60...)
- Error: Mất mạng giữa chừng, HTTP 500, HTTP 404 chi tiết bài xóa
- UI-specific: Truncate 2 dòng title/excerpt, tag category màu sắc, header 3 loại

---

## 📌 Summary & Recommendation

Tài liệu UC56-57/66-68 ở trạng thái **⚠️ CONDITIONALLY READY** với điểm 72.7/100. Tài liệu đã được chuẩn hóa tốt ở mức UI component và luồng cơ bản — đủ để QA bắt đầu thiết kế test case cho các happy path và màn hình chính. Điểm yếu tập trung ở **Functional Integration Analysis** (Section 8 — chỉ đạt 4/10): chưa định nghĩa tương tác giữa Tab ↔ Filter ↔ Search, chưa rõ scope tìm kiếm, và chưa có cơ chế đóng thanh search. Ngoài ra, mâu thuẫn nội tại giữa mô tả giao diện ("Tin liên quan") và bảng field ("Tin tức mới nhất") trong màn Chi tiết (Q7) cần được BA sửa ngay để tránh nhầm lẫn cho dev.

**Khuyến nghị:** BA giải đáp **Q1–Q4 (Priority High)** trước, sau đó QA có thể tiến hành thiết kế test case song song trong khi Q5–Q13 đang được xử lý. Sau khi BA trả lời xong, thực hiện **Re-audit** để cập nhật verdict cuối cùng.
