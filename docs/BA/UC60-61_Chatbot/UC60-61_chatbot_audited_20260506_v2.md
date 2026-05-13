# UC60-61 — Chatbot Trợ lý Đầu Tư — UC Readiness Review (Re-audit)

**Tiêu đề:** UC60-61_chatbot_audited_20260506_v2.md
**Ngày tạo:** 06/05/2026
**Tác giả:** QC Agent
**Phiên bản:** v2 (Re-audit sau khi BA trả lời Q1–Q10)

---

## 📊 Audit Summary

**Artefacts reviewed:** UC60-61_Chatbot.md (đã cập nhật) + Wireframes (5 ảnh: UC60, UC61, UC61-rate, Popup, Chat frames, Offline screen)

| # | Knowledge Area | Max Pts | Score | Status |
|---|---|---|---|---|
| 1 | Feature Identity | 5 | 5/5 | ✅ Complete |
| 2 | Objective & Scope | 5 | 5/5 | ✅ Complete |
| 3 | Actors & User Roles | 10 | 10/10 | ✅ Complete |
| 4 | Preconditions & Postconditions | 10 | 10/10 | ✅ Complete |
| 5 | UI Object Inventory & Mapping | 15 | 14/15 | ⚡ Partial |
| 6 | Object Attributes & Behavior Definition | 20 | 19/20 | ⚡ Partial |
| 7 | Functional Logic & Workflow Decomposition | 20 | 19/20 | ⚡ Partial |
| 8 | Functional Integration Analysis | 10 | 9/10 | ⚡ Partial |
| 9 | Acceptance Criteria | 10 | 10/10 | ✅ Complete |
| 10 | Non-functional Requirements | 5 | 2/5 | ⚡ Partial |
| **Total** | | **110** | **103/110** | **93.6/100** |

> **Raw:** 103/110 → **Final Score: 93.6/100**
> **Verdict: ✅ READY** — QA có thể bắt đầu thiết kế test case.

---

## 📋 Unified Gap & Question Report (Remaining)

| ID | Priority | Ref | Câu hỏi / Gap | Why It Matters | Status |
|----|----------|-----|----------------|----------------|--------|
| Q1 | Low | Section 2.1 mô tả giao diện | **Dòng `---` thừa** xuất hiện trước "#### 2.2" do edit kỹ thuật — cần dọn dẹp để markdown không bị vỡ. | Minor formatting issue, không ảnh hưởng logic. | Open |
| Q2 | Low | Section 3.1 — Lazy load | **Page size do API AI quyết định** — không có fallback hay giới hạn tối thiểu để QA test được. Ghi nhận là dependency của BE/AI team. | QA không thể test boundary page size, chỉ test behavior (loading indicator xuất hiện/ẩn đúng lúc). | Accepted |
| Q3 | Low | N/A (Missing) | **NFR còn thiếu:** Giới hạn số tin nhắn tối đa trong 1 phiên, performance khi lịch sử dài. Đây là dependency của BE/AI team. | QA ghi nhận không test performance; chỉ test functional flow. | Accepted |

---

## 🟢 What's Good

- **Tất cả gap critical đã được giải quyết:** Actor đồng nhất (confirmed), Postcondition rõ ràng, Subtitle states 2 trạng thái (Đang hoạt động / Chưa hoạt động) được mô tả đầy đủ.
- **Section 2.3 mới (Màn hình Offline):** Đầy đủ fields (#22–#25) khớp với wireframe.
- **Error handling cập nhật chuẩn CMR-07:** Toast thay vì bubble lỗi, tin nhắn trả về ô nhập liệu, timeout 30s.
- **Rating flow hoàn chỉnh:** "Đánh giá lại?" gọi API reset, không chỉ reset UI.
- **AC1–AC11 đo lường được**, phủ đủ happy path + error path + offline state.
- **File attachment error rõ ràng:** Toast CMR-07 khi link hỏng.

---

## 🧪 Testability Outlook

**CÓ THỂ test ngay (đầy đủ):**
- Luồng Welcome → chip → auto-send → hội thoại
- Input bar: max 500 ký tự, max 5 dòng, keyboard behavior
- Send button: 3 trạng thái (ẩn / paper plane / spinner)
- Input khi loading: vẫn nhập được nhưng không gửi được
- Rating: 3 animation states + "Đánh giá lại?" + API reset call
- Back popup: có/không hội thoại
- File attachment: PDF / DOCX / error case
- Error flow: lỗi mạng → Toast + tin nhắn về ô; HTTP 500 → Toast + trả về ô; timeout → Toast + "Thử lại"
- Offline screen: subtitle + icon + text + "Thử lại" behavior
- Auto-scroll sau khi bot phản hồi
- Lazy load: loading indicator xuất hiện khi kéo lên đầu

**Accepted dependencies (không test):**
- Page size lazy load (do AI API quyết định)
- Performance/load test (dependency BE/AI)

**Suggested test focus:**
- Boundary: 500 ký tự / 501 ký tự
- Boundary: 5 dòng / 6 dòng
- Concurrent: gửi tin → đang loading → thêm nội dung vào ô → nhận phản hồi → nội dung cũ còn không?
- Edge: tap chip khi ô đang có nội dung
- Edge: "Đánh giá lại?" nhiều lần liên tiếp
- Edge: back ở trạng thái Welcome (không popup)
- Negative: file PDF hỏng, DOCX không tồn tại

---

## 📌 Summary & Recommendation

Sau khi BA trả lời đầy đủ Q1–Q10 và tài liệu được cập nhật (Postconditions, Subtitle states, Section 2.3 offline, error flow chuẩn CMR-07, API reset rating, lazy load note, AC11), UC60-61 đạt **93.6/100 — ✅ READY**. QA có thể bắt đầu thiết kế test case ngay. Các gap còn lại (Q2, Q3) là accepted dependencies của BE/AI team và không blocking QA.
