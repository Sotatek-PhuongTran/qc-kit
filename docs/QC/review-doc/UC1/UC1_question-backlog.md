# Question Backlog — UC1 Trang chủ Dashboard

> Generated: 07/05/2026
> Updated: 07/05/2026
> Source files: UC1_trang-chu-dashboard_audited_20260507_v1.md, UC1_trang-chu-dashboard_audited_20260507_v2.md

---

## Open Questions

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q5 | Medium | N/A (Missing) | Khi session hết hạn trong lúc người dùng đang ở Trang chủ, hệ thống xử lý thế nào? Redirect về đăng nhập hay hiển thị thông báo? | Cần biết để test session timeout scenario — critical cho security testing. | Open |
| Q6 | Medium | N/A (Missing) | Khi Sidebar đang mở và người dùng nhấn nút Back vật lý (Android), Sidebar sẽ đóng hay thoát app? | Behavior nút Back vật lý cần rõ ràng để test trên Android. | Open |
| Q7 | Medium | "Polling 30 giây/lần" — Mục 2.1 | Khi polling thông báo thất bại (mất mạng giữa chừng), hệ thống xử lý thế nào? Bỏ qua lần poll này hay hiển thị lỗi? Có fallback mechanism không? | Cần xác nhận để test edge case polling failure — đặc biệt quan trọng nếu app chạy lâu. | Open |
| Q10 | Low | N/A (Missing) | App có hỗ trợ landscape mode không? Nếu không, có lock portrait không? | Cần biết để xác định phạm vi test UI responsiveness. | Open |
| Q11 | Low | "Kéo thả (Drag & Drop)" — Floating Widget | Khi kéo Chatbot icon ra ngoài vùng màn hình (hoặc vào vùng không hợp lệ), hệ thống xử lý thế nào? Snap trở lại vị trí hợp lệ gần nhất? | Cần mô tả boundary cho drag & drop để test edge case. | Open |

Priority: H = High (blocks design), M = Medium (affects scope), L = Low (nice to know)
Status: Open | Answered | Deferred

---

## Answered Questions

| ID | Priority | Ref | Question | Answer | Answered By | Date | Status |
|----|----------|-----|----------|--------|-------------|------|--------|
| Q1 | High | Mục Xử lý lỗi | UC ghi timeout 30 giây, CMR-07/CMR-16 ghi 10 giây. Giá trị nào đúng? | UC đã cập nhật thành "Timeout (quá 10 giây)" — phù hợp CMR-07/CMR-16 | BA (UC v4 update) | 07/05/2026 | Resolved |
| Q2 | Medium | Mục Xử lý lỗi | Partial API failure: xử lý từng section độc lập hay toàn màn hình? | UC bổ sung "Quy tắc xử lý lỗi độc lập từng section" — mỗi section xử lý riêng, không block toàn màn hình | BA (UC v4 update) | 07/05/2026 | Resolved |
| Q3 | Medium | CMR-13 | Trang chủ có hỗ trợ Pull to Refresh không? | UC bổ sung section "Pull to refresh" tham chiếu CMR-13: kéo xuống → spinner → refresh → ẩn spinner | BA (UC v4 update) | 07/05/2026 | Resolved |
| Q4 | Medium | N/A | Double tap có cơ chế debounce không? | UC bổ sung "Quy tắc debounce cho navigation" — hệ thống có cơ chế debounce | BA (UC v4 update) | 07/05/2026 | Resolved |
| Q8 | Low | Header vs bảng | Phiên bản v3 hay v4? Không nhất quán. | UC đã thống nhất v4 ở cả header và bảng thuộc tính | BA (UC v4 update) | 07/05/2026 | Resolved |
| Q9 | Low | Chuyển ngôn ngữ | Chuyển ngôn ngữ có cập nhật toàn bộ text UI không? | UC ghi "Áp dụng ngôn ngữ đó cho toàn hệ thống" — áp dụng cho toàn bộ, không chỉ Tin tức | BA (UC v4 update) | 07/05/2026 | Resolved |
| Q12 | Low | N/A | Reopen app sau force-close: quay về đâu? | UC bổ sung: Force close → Trang chủ + giữ session; Uninstall → đăng nhập lại từ đầu | BA (UC v4 update) | 07/05/2026 | Resolved |
