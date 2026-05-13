# UC60-61 — Chatbot Trợ lý Đầu Tư — UC Readiness Review

**Tiêu đề:** UC60-61_chatbot_audited_20260506_v1.md
**Ngày tạo:** 06/05/2026
**Tác giả:** QC Agent
**Phiên bản:** v1

---

## 📊 Audit Summary

**Artefacts reviewed:** UC60-61_Chatbot.md + Wireframes (4 ảnh: UC60, UC61, UC61-rate, Popup, Chat frames)

| # | Knowledge Area | Max Pts | Score | Status |
|---|---|---|---|---|
| 1 | Feature Identity | 5 | 5/5 | ✅ Complete |
| 2 | Objective & Scope | 5 | 5/5 | ✅ Complete |
| 3 | Actors & User Roles | 10 | 8/10 | ⚡ Partial |
| 4 | Preconditions & Postconditions | 10 | 9/10 | ⚡ Partial |
| 5 | UI Object Inventory & Mapping | 15 | 13/15 | ⚡ Partial |
| 6 | Object Attributes & Behavior Definition | 20 | 17/20 | ⚡ Partial |
| 7 | Functional Logic & Workflow Decomposition | 20 | 17/20 | ⚡ Partial |
| 8 | Functional Integration Analysis | 10 | 7/10 | ⚡ Partial |
| 9 | Acceptance Criteria | 10 | 9/10 | ⚡ Partial |
| 10 | Non-functional Requirements | 5 | 1/5 | ⚡ Partial |
| **Total** | | **110** | **91/110** | **82.7/100** |

> **Verdict: ⚠️ CONDITIONALLY READY**
> QA có thể bắt đầu test trên các luồng rõ ràng. Các gap cần được fix song song.

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Câu hỏi / Gap | Why It Matters | Status |
|----|----------|-----|----------------|----------------|--------|
| Q1 | Medium | Section 1 — `Phân quyền: Cá nhân/Tổ chức (đã đăng nhập)` | **Không phân biệt hành vi 2 nhóm actor?** Cá nhân vs Tổ chức — có sự khác biệt nào trong giao diện, dữ liệu hồ sơ trả về, hay giới hạn tra cứu không? Nếu hoàn toàn giống nhau → cần xác nhận chính thức. | Nếu 2 nhóm khác nhau → cần 2 bộ test case. Nếu giống nhau → QA không thiếu case nhưng cần xác nhận chính thức. | Open |
| Q2 | Medium | Section 1 — `Postconditions: Người dùng nhận được phản hồi từ Chatbot và/hoặc đã gửi đánh giá` | **Postcondition "và/hoặc" quá mơ hồ.** Trường hợp chatbot lỗi, không nhận được phản hồi → postcondition có được thoả mãn không? | QA cần biết rõ điều kiện kết thúc thành công để thiết kế test case pass/fail cho error flow. | Open |
| Q3 | Medium | Field #4 — `Subtitle: "Đang hoạt động"` | **Subtitle thay đổi theo trạng thái nào?** Nếu chatbot offline hoặc lỗi hệ thống thì subtitle đổi thành gì? Hay cố định? | Nếu có state thay đổi → cần test case riêng. Nếu cố định → cần ghi rõ để tránh QA viết test sai. | Open |
| Q4 | Medium | Section 3.1 — Bước 9 `Lazy load lịch sử` | **Lazy load tải bao nhiêu tin nhắn mỗi lần?** Page size chưa được định nghĩa. Trigger "kéo lên đầu" — đầu của vùng hiển thị hay top toàn bộ lịch sử? | QA cần page size để test boundary. Không rõ trigger → không thể viết test step chính xác. | Open |
| Q5 | Medium | Section 3.2 — `Hệ thống gửi đánh giá qua API (kèm ID phản hồi)` | **Khi "Đánh giá lại?" được tap → API có gọi lại để reset đánh giá không?** Hay chỉ reset UI phía client? | Nếu có gọi API reset → cần test case riêng. Nếu không → QA cần biết để không test API reset. | Open |
| Q6 | Low | Field #16 — `PDF → Mở trực tiếp trên trình duyệt` | **Nếu file đính kèm bị lỗi (link hỏng, file không tồn tại, hết quyền truy cập)?** Không có mô tả trạng thái lỗi cho file đính kèm. | QA cần test negative case: file không mở được → UI hiển thị gì? | Open |
| Q7 | Medium | AC6 — `File đính kèm trong bubble bot: hình ảnh tap → mở fullscreen` | **Mâu thuẫn nội bộ:** AC6 đề cập "hình ảnh tap → mở fullscreen" và "PDF/ảnh → mở trình duyệt", nhưng Field #15 và #16 đã xác định AI không gen hình ảnh, chỉ có document. Cần loại bỏ phần "hình ảnh" trong AC6. | QA đọc AC6 sẽ viết test case tap hình ảnh → nhưng thực tế không có hình ảnh. Blocker cho AC design. | Open |
| Q8 | Low | Section 3.4 — `Lỗi mạng: hiển thị lỗi dưới bubble người dùng` | **Định dạng hiển thị lỗi cụ thể là gì?** Inline text dưới bubble? Toast? Bubble lỗi riêng? Màu sắc? Icon? | Cần rõ để QA viết test case UI verification cho error state. | Open |
| Q9 | Low | N/A (Missing) | **Thiếu NFR:** Timeout API Chatbot (CMR-07 quy định 30 giây), giới hạn số tin nhắn tối đa trong 1 phiên, performance khi lịch sử dài. | Không có NFR → QA không thể thiết kế performance test hay timeout test. | Open |
| Q10 | Medium | Field #12 — Nút Gửi Loading state | **Trạng thái ô nhập liệu khi đang Loading chưa được mô tả.** Ô nhập liệu có bị disabled không? Hay vẫn nhập được (nhưng chưa gửi)? | Nếu ô vẫn nhập được → cần test case: user nhập thêm rồi loading xong thì xử lý thế nào? Có gửi tiếp hay mất? | Open |

---

## 🟢 What's Good

- **Mô tả UI chi tiết và có cấu trúc tốt:** Phân tách rõ 3 khung (Header, Welcome, Input Bar, Conversation, Rating) với bảng field đầy đủ.
- **3 trạng thái animation rating được mô tả rõ:** xám → fill đỏ đậm → text "Đã đánh giá" + link "Đánh giá lại?".
- **Popup thoát được mô tả đầy đủ** kèm wireframe, gồm tiêu đề, nội dung, 2 nút và edge case (Welcome state không hiện popup).
- **Luồng 3.1 chi tiết, đủ happy path** gồm cả auto-scroll, lazy load, keyboard behavior, loading state.
- **Exclusions được liệt kê rõ**, tránh scope creep.
- **CMR references nhất quán** (CMR-06, CMR-07, CMR-08).
- **AC1–AC10 đo lường được**, mỗi AC gắn với 1 behaviour cụ thể.

---

## 🧪 Testability Outlook

**CÓ THỂ test ngay:**
- Luồng Welcome → chip gợi ý → auto-send → hội thoại bắt đầu
- Luồng nhập câu hỏi → gửi → Typing Indicator → nhận bubble bot
- Keyboard behavior: giữ nguyên sau send, đóng khi out-tap
- Input bar: max 5 dòng scroll, max 500 ký tự
- Rating flow: 3 trạng thái animation + "Đánh giá lại?"
- Back popup: có/không hội thoại
- File attachment: PDF mở browser, DOCX tải xuống
- Error handling: lỗi mạng, HTTP 500, fallback response

**CHƯA THỂ test (blocked by gaps):**
- Subtitle trạng thái bot (Q3)
- Lazy load page size (Q4)
- API call khi "Đánh giá lại?" (Q5)
- Error state khi file đính kèm lỗi (Q6)
- Input field state khi đang Loading (Q10)

**Suggested test focus (sau khi fix gap):**
- Boundary: đúng 500 ký tự / 501 ký tự
- Boundary: đúng 5 dòng / 6 dòng trong input field
- Negative: API timeout >30s
- Edge: tap chip khi input đang có nội dung sẵn
- Edge: đánh giá rồi "Đánh giá lại?" nhiều lần liên tiếp

---

## 📌 Summary & Recommendation

Tài liệu UC60-61 đã đạt chất lượng tốt về mô tả UI và luồng chức năng chính (Score: 82.7/100 — CONDITIONALLY READY). Các gap chủ yếu là medium/low priority và tập trung vào edge case. **Ưu tiên fix trước khi QA bắt đầu:** Q7 (mâu thuẫn AC6 về hình ảnh), Q3 (subtitle state), Q10 (input state khi loading). Các câu Q4, Q5, Q6 có thể làm song song trong quá trình test design mà không blocking.
