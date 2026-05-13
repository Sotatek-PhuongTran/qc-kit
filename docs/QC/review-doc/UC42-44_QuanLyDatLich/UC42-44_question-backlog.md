# Question Backlog — UC42-44 Quản lý đặt lịch nộp hồ sơ

> Generated: 2026-05-08
> Updated: 2026-05-08 (Re-audit v2)
> Source files: docs/QC-MOBILE/review-doc/UC42-44_QuanLyDatLich/UC42-44_quan-ly-dat-lich_audited_20260508_v2.md

---

## Open Questions

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q2 | Medium | Section 2.1/2.2 Badge "Màu sắc dựa theo UI design" | Badge color mapping chỉ tham chiếu "UI design" — chưa có bảng mapping cụ thể từng trạng thái → màu sắc. CMR-05 chỉ mô tả nguyên tắc chung. Cần bảng: Chờ xác nhận → ?, Đã xác nhận → ?, Đã hủy → ?, Đã bỏ lượt → ?, Đã hoàn thành → ? | QA không thể verify badge color chính xác nếu không có bảng mapping. | Open |
| Q4 | Low | Section 1 + 2.2 "Mã định danh" | Khác biệt Cá nhân vs Tổ chức: ngoài format mã định danh (CCCD/CMND vs Mã doanh nghiệp), có khác biệt UI nào khác không? (label, data scope, filter) | Nếu không có khác biệt → QA chỉ cần 1 bộ scenario. Nếu có → cần 2 bộ. | Open |
| Q6 | Medium | N/A (Missing) | Physical Back button (Android) behavior khi: (a) Bottom Sheet đang mở; (b) đang ở chi tiết; (c) từ deep link vào. | Android-specific behavior cần rõ để tránh implement tùy hứng → bug UX. | Open |
| Q17 | Low | N/A (Missing) | Push Notification (UC258-259): tap push có deep-link vào chi tiết lịch hẹn? | Integration test quan trọng. Có thể defer sang UC258-259 scope. | Open |
| Q18 | Low | N/A (Missing) | Danh sách có tự refresh / polling không? Hay chỉ pull-to-refresh? | Ảnh hưởng data freshness test. | Open |
| Q20 | Low | Section 2.2 "read-only" | Tap field trong Chi tiết: có copy-to-clipboard không? | Read-only thực thụ vs cho select text là khác nhau. | Open |
| Q22 | Low | N/A (Missing) | Tab bar horizontal scroll: có visual indicator (shadow/fade) cho biết còn tab? | UX affordance. | Open |
| Q24 | Low | Section 2.1 tab active state | Tab inactive: text màu gì? Size/font giống active? | UI spec thiếu chi tiết — dựa vào UI design. | Open |
| Q25 | Low | N/A (Missing) | Nút "Áp dụng" có disabled khi chưa thay đổi filter? | Ngăn call API không cần thiết. | Open |
| Q27 | Low | CMR-03 "hover/tap giữ" | CMR-03 mô tả "tap và giữ" để xem option dài — behavior cụ thể trên mobile? (tooltip? popup? expand?) | Mobile gesture phải rõ. | Open |
| Q29 | Low | N/A (Missing) | Device compatibility min (iOS/Android version, screen size)? | Test matrix — dựa vào project-level spec. | Open |
| Q30 | Low | N/A (Missing) | Offline: list đã load có cache không? | Offline UX. | Open |
| Q31 | Low | Section 1 entry point | UC42-44 có được listed trong UC1 (Home) và sidebar chưa? | Entry point consistency. | Open |

Priority: H = High (blocks design), M = Medium (affects scope), L = Low (nice to know)
Status: Open | Answered | Deferred

---

## Answered Questions

| ID | Priority | Ref | Question | Answer | Answered By | Date | Status |
|----|----------|-----|----------|--------|-------------|------|--------|
| Q1 | High | Section 3.1 step 3 | Sort order mâu thuẫn "tăng dần" vs "mới nhất lên đầu" | Đã sửa thành: "sắp xếp theo thời gian đặt giảm dần (mới nhất lên đầu)" | BA (UC v2) | 2026-05-07 | Answered |
| Q3 | High | Section 3.1 Xử lý lỗi | Session hết hạn (HTTP 401) xử lý thế nào? | Hệ thống tự động sử dụng refresh token. Nếu refresh token hết hạn (>15 ngày) → redirect đăng nhập + toast "Phiên đăng nhập hết hạn" (CMR-07) | BA (UC v2) | 2026-05-07 | Answered |
| Q5 | High | Section 3.3 AC1-AC5 | AC không measurable, thiếu coverage | Đã viết lại 22 AC theo Given/When/Then, cover: tabs, chi tiết, badge, filter, search, pull-to-refresh, lazy load, error, loading, state persistence, đa ngôn ngữ, accessibility | BA (UC v2) | 2026-05-07 | Answered |
| Q7 | High | N/A | Loading/Skeleton state cho first-load | First-load: loading state toàn màn hình (full-screen loading overlay). Các lần tải tiếp theo: spinner cục bộ (CMR-07) | BA (UC v2) | 2026-05-07 | Answered |
| Q8 | Medium | Section 2.1/2.2 | "Thời gian đặt" vs "Thời gian đặt lịch" — inconsistency? | Đã đồng bộ thành "Thời gian đặt" trên cả card và chi tiết | BA (UC v2) | 2026-05-07 | Answered |
| Q9 | Medium | Modal bộ lọc | Cascade giữa Lĩnh vực → Dịch vụ công? | Hai trường "không phụ thuộc vào nhau" (chọn lĩnh vực không ảnh hưởng danh sách dịch vụ công) | BA (UC v2) | 2026-05-07 | Answered |
| Q10 | Medium | Nút "Nhập lại" | Tap "Nhập lại": gọi API ngay hay chờ "Áp dụng"? | Reset toàn bộ tiêu chí về mặc định. Không đóng Bottom Sheet. Không gọi API (chỉ reset UI) | BA (UC v2) | 2026-05-07 | Answered |
| Q11 | Medium | Search scope | Chỉ trong tab hiện tại hay toàn bộ? | "Toàn bộ các tab" — kết quả hiển thị trên tab "Tất cả" bất kể tab nào đang chọn | BA (UC v2) | 2026-05-07 | Answered |
| Q12 | Medium | Section 3.2 | Màn chi tiết có hỗ trợ pull-to-refresh không? | Có. Kéo xuống từ đầu màn hình chi tiết → refresh dữ liệu chi tiết (CMR-13) | BA (UC v2) | 2026-05-07 | Answered |
| Q13 | Medium | N/A | Giữ scroll position & giữ tab khi vào chi tiết → quay lại | Giữ nguyên tab đang chọn + giữ nguyên scroll position khi quay lại từ chi tiết | BA (UC v2) | 2026-05-07 | Answered |
| Q14 | Medium | N/A | Double-tap vào card: navigate 2 lần? | Hệ thống có cơ chế debounce để tránh navigate 2 lần (CMR-18) | BA (UC v2) | 2026-05-07 | Answered |
| Q15 | Medium | N/A | Card hiển thị gì khi field null? | Hiển thị "-" thay thế (giống chi tiết) | BA (UC v2) | 2026-05-07 | Answered |
| Q16 | Medium | Section 2.1 icon filter | Có badge/indicator trên filter icon khi filter đang active? | Hiển thị icon indicator màu xanh lá cây ở góc phải bên trên icon filter (CMR-02) | BA (UC v2) | 2026-05-07 | Answered |
| Q19 | Medium | N/A | i18n 5 ngôn ngữ spec | Text cứng (header, label, tab, nút, placeholder, thông báo) đổi theo ngôn ngữ. Nội dung từ API giữ nguyên ngôn ngữ gốc (CMR-17) | BA (UC v2) | 2026-05-07 | Answered |
| Q21 | Medium | N/A | Lazy load trang N fail: hiển thị gì? | Retry tự động 3 lần (mỗi lần ~2 giây). Sau 3 lần fail → dừng retry, hiển thị lỗi cục bộ cuối danh sách. User pull-to-refresh để tải lại | BA (UC v2) | 2026-05-07 | Answered |
| Q23 | Low | N/A | Thứ tự 6 tab cố định hay thay đổi? | Cố định, không thể thay đổi thứ tự hoặc ẩn/hiện | BA (UC v2) | 2026-05-07 | Answered |
| Q26 | Low | Section 2.2 "Khung giờ hẹn nộp" | Format range? Timezone? | Format: "HH:mm - HH:mm" (VD: "08:00 - 09:00"). Timezone GMT+7 (CMR-12) | BA (UC v2) | 2026-05-07 | Answered |
| Q28 | Low | N/A | Accessibility: font size, contrast, VoiceOver/TalkBack? | Screen reader support theo iOS/Android accessibility guidelines. Contrast ratio, font size, touch target dựa vào UI design specs (Section 5, AC21-22) | BA (UC v2) | 2026-05-07 | Answered |
| Q32 | Low | N/A | Số ký tự tối đa search box? | 500 ký tự (CMR-01 v1.1) | BA (UC v2) | 2026-05-07 | Answered |

---

## Deferred Questions

| ID | Priority | Ref | Question | Reason for Deferral | Deferred By | Date | Status |
|----|----------|-----|----------|---------------------|-------------|------|--------|

