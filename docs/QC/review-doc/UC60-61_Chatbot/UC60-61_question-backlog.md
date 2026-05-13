# Question Backlog

> Generated: 12/05/2026
> Source files: UC60-61_chatbot_audited_20260512_v1.md

---

## Open Questions

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q1 | ⚠️ Medium | UC §2.1 Field #10 | Chip gợi ý text dài → App truncate hay wrap? Có tooltip/long-press xem full không? | QA cần biết expected behavior khi chip text overflow | Open |
| Q2 | ⚠️ Medium | UC §3.1 step 2 | Khi tap chip mà ô nhập liệu đang có nội dung → App xử lý thế nào? Ghi đè? Nối? Bỏ qua nội dung cũ? | QA cần test case cho edge case này | Open |
| Q3 | 🟡 Low | UC §3.2 step 4 | Tap "Đánh giá lại?" → gọi API reset. Nếu API reset fail → App giữ UI "Đã đánh giá" hay quay về 2 icon? | Đảm bảo data consistency giữa UI và server | Open |
| Q4 | 🟡 Low | UC §3.4 | Timeout 30s khác CMR-16 (10s). UC có lý do nhưng không ghi tường minh "override CMR-16". Đề xuất bổ sung 1 dòng. | Tránh nhầm lẫn khi QA cross-check CMR | Open |
| Q5 | 🟡 Low | UC §3.1 step 9 | Lazy load page size do API AI quyết định — QA không test boundary page size được. | Ghi nhận dependency, QA chỉ test behavior (loading indicator) | Accepted |
| Q6 | 🟡 Low | UC §3.3 | Fallback khi user chưa đăng nhập tap vào entry point Chatbot (Sidebar/Widget) → App xử lý thế nào? | Precondition nói "đã đăng nhập" nhưng không nêu guard/redirect | Open |
| Q7 | 🟡 Low | N/A (Missing) | NFR thiếu: Accessibility (WCAG), Compatibility (OS versions, orientations) | Non-critical nhưng cần cho test coverage đầy đủ | Open |

Priority: ⚠️ Medium = affects scope/edge cases, 🟡 Low = nice to know / non-blocking
Status: Open | Answered | Deferred | Accepted

---

## Answered Questions

| ID | Priority | Ref | Question | Answer | Answered By | Date | Status |
|----|----------|-----|----------|--------|-------------|------|--------|
