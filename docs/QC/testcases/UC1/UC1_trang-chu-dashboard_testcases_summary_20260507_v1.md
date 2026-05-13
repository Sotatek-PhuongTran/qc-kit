# Test Cases Summary — UC1 Trang chủ Dashboard (Mobile)

> **Ngày tạo:** 2026-05-07
> **Tác giả:** QC Agent
> **Phiên bản:** v1
> **File test cases:** UC1_trang-chu-dashboard_testcases_20260507_v1.xlsx
> **File scenarios tham chiếu:** UC1_trang-chu-dashboard_scenarios_20260507.md
> **File audited tham chiếu:** UC1_trang-chu-dashboard_audited_20260507_v2.md

---

## Tổng quan

| Chỉ số | Giá trị |
|--------|---------|
| Tổng số test cases | 77 |
| Section Groups | 1 (Màn hình Trang chủ Dashboard) |
| Check UI/UX | 14 TCs |
| Check Function | 43 TCs |
| Check Common | 20 TCs (8 UI/UX phổ biến + 4 sub-label device + 8 tương tác thiết bị) |

---

## Phân bổ theo giai đoạn (6 Phases)

| Phase | Mô tả | Số TC |
|-------|--------|-------|
| Phase 1 — Screen Init | Loading state, data state, empty state | 3 |
| Phase 2 — Component Interaction | Header, Sidebar, Quick Access, Footer, Chatbot, Tin tức | 30 |
| Phase 3 — Core Function Testing | Ngôn ngữ, thông báo, polling, Pull to Refresh, lỗi/retry | 18 |
| Phase 4 — Function Integration | Partial API failure, debounce, app lifecycle | 9 |
| Phase 5 — Non-functional UI | Orientation, font size, truncate, category tag | 6 |
| Phase 6 — GUI Compliance / Common | Maxlength, multitasking, Android back, iOS swipe | 11 |

---

## Phân bổ theo Check Type

| Check Type | Số TC | Chi tiết |
|------------|-------|----------|
| Check UI/UX | 14 | Kiểm tra giao diện, layout, loading, empty state, truncate, red dot, footer active state |
| Check Function | 43 | Navigation (Sidebar, Quick Access, Footer, Chatbot), ngôn ngữ (5 ngôn ngữ + persistence), tin tức (cuộn ngang, max 5, tap card), Pull to Refresh (CMR-13), xử lý lỗi (mạng, 500, timeout 10s), partial failure, debounce, app lifecycle |
| Check Common | 20 | UI/UX phổ biến (maxlength, orientation, font size), tương tác thiết bị (Android back, iOS swipe, multitasking, lock/unlock, pull-to-refresh, scroll-down, notification) |

---

## Kỹ thuật test design áp dụng

| Kỹ thuật | Áp dụng tại |
|----------|-------------|
| Equivalence Partitioning (EP) | Category tag (3 partitions: Đỏ/Xanh/Cam), 3 role types, 5 ngôn ngữ |
| Boundary Value Analysis (BVA) | Tên dài >30 ký tự (truncate), tiêu đề 2 dòng, tin tức < 5 / = 5 / > 5, timeout = 10s / > 10s |
| State Transition | Loading → Data / Error, Red dot on/off, Sidebar open/close, Active/Inactive tab, Chatbot position reset |
| Decision Table | Partial API failure (user info fail + news ok, news fail + user info ok, all fail) |
| Use Case Testing | Main flow, alternative flows (ngôn ngữ, empty state), exception flows (lỗi, timeout) |
| Error Guessing | Double tap debounce, pull-to-refresh khi đang loading, force close, uninstall |

---

## Truy xuất nguồn gốc (Traceability)

| UC Reference | CMR Reference | Số TC liên quan |
|-------------|---------------|-----------------|
| UC1 Main Flow | — | 35 |
| UC1 Alternative Flow | — | 12 |
| UC1 Exception Flow | CMR-07 | 8 |
| — | CMR-13 (Pull to Refresh) | 4 |
| — | CMR-14 (Empty State) | 1 |
| — | CMR-16 (Timeout 10s) | 2 |
| — | CMR-04 (Scroll to load) | 1 |
| UC1 Common | — | 14 |

---

## Open Questions chưa cover (từ Question Backlog)

Các câu hỏi mở sau chưa được trả lời bởi BA, do đó **chưa có test case** tương ứng:

| Question ID | Nội dung | Ảnh hưởng |
|------------|----------|-----------|
| Q5 | Session timeout khi đang ở Trang chủ — redirect hay thông báo? | Thiếu TC cho session expiry scenario |
| Q6 | Nút Back Android khi Sidebar mở — đóng sidebar hay thoát app? | TC Android Back hiện viết chung, chưa cover case Sidebar |
| Q7 | Polling thất bại (mất mạng giữa chừng) — bỏ qua hay hiển thị lỗi? | Thiếu TC cho polling failure edge case |
| Q10 | App hỗ trợ landscape mode không? Lock portrait? | TC orientation hiện đang test cả hai, cần confirm scope |
| Q11 | Kéo Chatbot ra ngoài vùng hợp lệ — snap lại? | Thiếu TC cho drag boundary |

---

## Hạng mục ngoài phạm vi (Out-of-Scope)

| Hạng mục | Lý do | Đề xuất |
|----------|-------|---------|
| Performance Testing | NFR — không thuộc phạm vi functional test | Defer to performance testing specialist |
| Security Testing (OWASP) | NFR — cần chuyên gia bảo mật | Defer to security testing specialist |
| Load Testing | NFR — cần tool chuyên dụng | Defer to load testing specialist |
| Accessibility Testing (WCAG) | UC không mô tả yêu cầu accessibility | Defer nếu có yêu cầu từ stakeholder |

---

## Ghi chú

- Tất cả test cases đều ở trạng thái **Untested**
- Cột Status (column 7) và Regression Status (column 11) đã được set mặc định "Untested"
- Test cases được thiết kế atomic — mỗi TC có thể thực thi độc lập
- Expected Result mô tả observable behavior, tránh mô tả vague ("works correctly")
- File xlsx sử dụng template chuẩn MBFS với sheet "Trang chu Dashboard"
