# Question Backlog — UC1: Màn hình Trang chủ (Dashboard) Mobile

| Thuộc tính | Giá trị |
|---|---|
| **UC ID** | UC1 |
| **Source review** | `UC1_trang-chu-dashboard_audited_20260513_v1.md` |
| **Date created** | 2026-05-13 |
| **Author / Agent** | qc-uc-read (run-010) |
| **Version** | v1 |
| **Owner BA** | han.luong & huy.lai2 |
| **Total questions** | 30 (High: 4 · Medium: 12 · Low: 14) |

---

## Hướng dẫn cho BA

- Cột **BA Answer** điền câu trả lời cụ thể (verbatim text, enum values, behaviour rule).
- Cột **Status:** `Open` (mặc định) → `Answered` (BA trả lời) → `Closed` (QC verify áp dụng vào v[N+1]).
- Sau khi BA trả lời tối thiểu các câu **High-priority**, trigger lại `/qc-uc-read` để re-audit (skill chuyển sang `re-audit` mode, generate `uc-review-report v2`).

---

## High-Priority Questions (block test design)

| ID | Ref (source excerpt) | Question | Why It Matters | BA Answer | Status |
|----|----------------------|----------|----------------|-----------|--------|
| Q1 | UC1 §2.1 Card thông tin #3 "Vai trò ... 'Nhà đầu tư Việt Nam', 'Nhà đầu tư nước ngoài', 'Tổ chức/Doanh nghiệp'" vs wireframe "Nhà đầu tư" | Wireframe hiển thị "Nhà đầu tư" plain — không thuộc 3 enum spec. Spec hay wireframe đúng? Khi API trả vai trò ngoài enum hiển thị gì? |  Tester không xác định được expected text → block AC-25 và TC role boundary. |  | Open |
| Q2 | project-context-master §4 vs UC1 §1 "Phân quyền: Toàn bộ người dùng đã đăng nhập" | Khách/Anonymous không thuộc UC1 — entry screen của Khách là gì? Trang chủ phiên bản Khách có không? | Entry-point của actor Khách không xác định được → block scope test. |  | Open |
| Q9 | UC1 §2.1 Tin tức "**tối đa 5 tin tức** mới nhất" AND "**Phân trang:** lazy load, 20 bản ghi mỗi lần" | Mâu thuẫn nội tại. Trang chủ là 5-fixed (xem thêm qua "Xem tất cả") hay lazy load? | ~30% TC tin tức phụ thuộc câu trả lời (count, scroll, lazy retry CMR-04). |  | Open |
| Q11 | UC1 §2.1 "Xử lý lỗi" + "Quy tắc xử lý lỗi độc lập từng section" | Visual của error UI cho từng section là gì cụ thể (toast / inline / banner / placeholder card)? Nút "Thử lại" đặt ở đâu? | Tất cả TC error UI bị block — không có visual reference. |  | Open |

---

## Medium-Priority Questions

| ID | Ref | Question | Why It Matters | BA Answer | Status |
|----|-----|----------|----------------|-----------|--------|
| Q3 | UC1 §2.1 Quick Access + CMR-01 "Reset khi chuyển màn" | Quay lại Trang chủ từ Quick Access target — refresh data hay giữ state? | TC navigation back-stack. |  | Open |
| Q4 | UC1 §2.1 Footer #1 "Tap tab Trang chủ → refresh" | Tap tab Trang chủ khi đang ở Trang chủ → scroll position reset top hay giữ? | AC-19 chính xác. |  | Open |
| Q5 | Wireframe label "Xin chào," không có trong UC1 §2.1 Card table | "Xin chào," là label cố định riêng hay phần của Tên ("Xin chào, [Tên]")? Đa ngôn ngữ thế nào? | Inventory Section 4 row #7 hiện *(inferred)*. |  | Open |
| Q6 | Wireframe Quick Access grid 3×2 [Hướng dẫn, Hồ sơ, KCN/KKT][Đặt lịch, FAQ, VBPL] vs spec order [1,2,3,4,5,6] | Thứ tự cứng theo wireframe hay theo spec liệt kê? Grid layout (3 cột / 2 cột) responsive? | Visual TC position. |  | Open |
| Q10 | UC1 §2.1 Floating "Drag & Drop" | Drag boundary (không cho phép đè Header/Footer/Card)? Edge snap? | Visual regression TC. |  | Open |
| Q12 | UC1 §2.1 Header #3 "UC CMR về Sidebar Navigation" | File spec cho Sidebar + Language Bottom Sheet ở đâu? Không tìm thấy "UC CMR Sidebar". | Sidebar/Bottom Sheet TC. |  | Open |
| Q13 | UC1 §2.1 Header #1 Sidebar 10 menu items | Spec đầy đủ Sidebar (icon, sub-items, active state, đa ngôn ngữ labels)? | Sidebar TC. |  | Open |
| Q14 | UC1 §2.1 Header #4 polling 30s | Khi 1 lần polling fail → retry ngay hay đợi tick tiếp? Hiển thị error gì không? | Polling reliability TC. |  | Open |
| Q15 | UC1 §2.1 Header #4 "cập nhật ngay lập tức" | App background — polling tiếp tục? Khi resume — tick mới hay cũ? | Background/foreground TC. |  | Open |
| Q16 | UC1 §2.1 "section độc lập" | Card thông tin error UI cụ thể? News error UI cụ thể? (Liên quan Q11) | Section error TC. |  | Open |
| Q20 | CMR-07 v1.1 "first-load full-screen loading" vs UC1 §3.1 skeleton từng section | Trang chủ first-load dùng full-screen loading hay skeleton từng section? | AC-02, AC-03 đúng/sai. |  | Open |
| Q23 | NFR Performance | Target FPS / API p95 / first-paint cho Trang chủ? | Performance TC baseline. |  | Open |
| Q24 | NFR Compatibility — project-context Q-007 | iOS / Android version min/max? Tablet? Screen size? | Compat matrix TC. |  | Open |
| Q25 | NFR Accessibility | WCAG level / contrast ratio / font dynamic / touch target min? | Accessibility TC. |  | Open |

---

## Low-Priority Questions

| ID | Ref | Question | Why It Matters | BA Answer | Status |
|----|-----|----------|----------------|-----------|--------|
| Q7 | UC1 §2.1 News card thumbnail | Kích thước/aspect ratio? Placeholder khi ảnh null/404? | TC ảnh null/fail. |  | Open |
| Q8 | UC1 §2.1 News category enum | Có category khác 3 giá trị không? Màu fallback cho unknown? | TC unknown category. |  | Open |
| Q17 | CMR-13 + UC1 Pull-to-refresh | Pull refresh toàn màn hay 1 section? | Refresh scope TC. |  | Open |
| Q18 | CMR-07 lỗi 500 không có "Thử lại" | User recovery path khi 500? | TC recovery 500. |  | Open |
| Q19 | UC1 §2.1 News "Vuốt ngang" | List < 5 tin: horizontal scroll disable hay vẫn enable? | Visual TC list ít tin. |  | Open |
| Q21 | CMR-18 Force-close behaviour | Sau force-close mở lại, API user info fail → quay login hay ở Trang chủ với error? | TC reopen-after-crash. |  | Open |
| Q22 | UC1 §2.1 inline "Tap → UC..." | Verify đầy đủ integration mapping (matrix tổng hợp)? | Integration TC. |  | Open |
| Q26 | NFR Offline + project-context KT-05 | UC1 cache offline behaviour? | TC offline mode. |  | Open |
| Q27 | UC1 §1 "Áp dụng cho tất cả users" | Onboarding tour overlay cho user lần đầu? | First-time-user TC. |  | Open |
| Q28 | CMR-17 ngôn ngữ lưu server | Lần đầu mở app (chưa có session) — language mặc định VI hay theo locale thiết bị? | Initial launch TC. |  | Open |
| Q29 | UC1 Header vs CMR-06 | CMR-06 v1.5 thiếu Language + User icons. Cần đồng bộ CMR-06 hoặc đánh dấu UC1 override. | CMR consistency. |  | Open |
| Q30 | UC1 §1 "Phụ lục XIV — STT 1" | File "Phụ lục XIV" ở đâu? | Có thể chứa constraints bổ sung. |  | Open |

---

## Changelog

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1 | 2026-05-13 | qc-uc-read (run-010) | Khởi tạo backlog với 30 câu hỏi (4 High, 12 Medium, 14 Low) từ audit `UC1_trang-chu-dashboard_audited_20260513_v1.md`. |
