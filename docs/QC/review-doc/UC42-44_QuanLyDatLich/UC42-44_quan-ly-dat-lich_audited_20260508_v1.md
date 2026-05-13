# UC Readiness Review — UC42-44 Quản lý đặt lịch nộp hồ sơ (Mobile)

**Loại báo cáo:** First Audit
**Ngày audit:** 2026-05-08
**Agent:** qc-uc-review-MOBILE
**Phiên bản:** v1
**Input audited:**
- `docs/BA/SRS-mobile/UC42-44_QuanLyDatLich/UC42-44_QuanLyDatLich.md` (v1, 29/04/2026)
- `docs/BA/SRS-mobile/UC42-44_QuanLyDatLich/UC 42-44_ Tab List.png`
- `docs/BA/SRS-mobile/UC42-44_QuanLyDatLich/UC 42_ Danh sách thủ tục hành chính chờ xác nhận.png`
- `docs/BA/SRS-mobile/UC42-44_QuanLyDatLich/UC42-filter.png`
- `docs/BA/SRS-mobile/UC42-44_QuanLyDatLich/UC42-44. Chi tiết lịch hẹn.png`
- `docs/BA/SRS-mobile/Common rule/CMR_Mobile.md` (v1, 01/05/2026)

---

## Feature Brief

UC42-44 mô tả chức năng **Quản lý đặt lịch nộp hồ sơ thủ tục đầu tư** trên ứng dụng di động. Chức năng này phục vụ **Cá nhân và Tổ chức đã đăng nhập**, cho phép người dùng tra cứu và theo dõi các lịch hẹn nộp hồ sơ TTHC của mình — **không bao gồm** chức năng tạo mới, chỉnh sửa hay hủy lịch (toàn bộ read-only trên mobile).

Truy cập qua **Quick Access ở Trang chủ** hoặc **Sidebar**. Màn hình chính gồm: Header đỏ + nút back → Search box (debounce 3s, fuzzy match theo tên/mã thủ tục) + Filter icon (Bottom Sheet lọc theo Lĩnh vực & Dịch vụ công) → 6 Tab trạng thái (Tất cả, Chờ xác nhận, Đã xác nhận, Đã hủy, Đã bỏ lượt, Đã hoàn thành) → Card list lazy-load 20 records/lần, sắp xếp theo ngày hẹn. Tap card → mở màn **Chi tiết lịch hẹn** (5 section read-only: Thủ tục / Người nộp / Lịch hẹn / Trạng thái / Ghi chú).

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| **67.3 / 100** | ❌ **NOT READY** |

**Lý do:** Nhiều Critical area chưa đạt yêu cầu: (a) Acceptance Criteria chỉ 5 AC sơ sài, không dùng Given/When/Then; (b) Edge cases chưa bao phủ đầy đủ (session expire, partial API failure, physical Back button, double-tap, i18n); (c) Functional Logic thiếu mô tả chi tiết alternative flow và mâu thuẫn nội dung ("tăng dần" vs "mới nhất lên đầu"); (d) phân biệt hành vi giữa Cá nhân và Tổ chức chưa rõ.

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status |
| - | -------------- | ------- | ----- | ------ |
| 1 | Feature Identity | 5 | 5/5 | ✅ Complete |
| 2 | Objective & Scope | 5 | 4/5 | ⚡ Partial |
| 3 | Actors & User Roles | 10 | 7/10 | ⚡ Partial |
| 4 | Preconditions & Postconditions | 10 | 6/10 | ⚡ Partial |
| 5 | UI Object Inventory & Mapping | 15 | 12/15 | ⚡ Partial |
| 6 | Object Attributes & Behavior Definition | 20 | 13/20 | ⚡ Partial |
| 7 | Functional Logic & Workflow Decomposition | 20 | 14/20 | ⚡ Partial |
| 8 | Functional Integration Analysis | 10 | 6/10 | ⚡ Partial |
| 9 | Acceptance Criteria | 10 | 5/10 | ⚡ Partial |
| 10 | Non-functional Requirements | 5 | 2/5 | ⚡ Partial |
| **Total** | | **110** | **74/110 → 67.3/100** | ❌ **NOT READY** |

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q1 | **High** | "Danh sách sắp xếp theo ngày hẹn tăng dần (mới nhất lên đầu)" (Section 3.1, step 3) | Câu mô tả này **mâu thuẫn nội tại**: "tăng dần" thì cũ nhất lên đầu, còn "mới nhất lên đầu" là giảm dần. Xác định: (a) Sort field là field nào? (b) Thứ tự tăng hay giảm? | QA không thể viết test case verify thứ tự nếu không biết đúng quy tắc. | Open |
| Q2 | **High** | Tab "Trạng thái" với 6 trạng thái + Badge "Màu sắc dự vào UI design" (Section 2.1, 2.2) | Cần bảng mapping cụ thể từng trạng thái → màu badge (theo CMR-05). | AC4 không test được nếu không có bảng mapping. | Open |
| Q3 | **High** | Section 3.1 Xử lý lỗi — chỉ liệt kê network/500/404/timeout | Khi session hết hạn (HTTP 401), hệ thống xử lý thế nào? Redirect về login? Popup? | Thiếu rule sẽ khiến behavior ở prod không nhất quán. | Open |
| Q4 | **High** | Section 1 "Phân quyền: Cá nhân/Tổ chức đã đăng nhập" + Section 2.2 "Mã định danh" | Có khác biệt gì giữa Cá nhân vs Tổ chức trong: label, format, data scope? | Nếu có phân biệt role-based, QA phải có 2 bộ scenario. | Open |
| Q5 | **High** | Section 3.3 AC1-AC5 | 5 AC hiện có không theo Given/When/Then, không measurable. Cần bổ sung AC cho search, pull-to-refresh, lazy load, filter, error handling, state persistence. | QA không đủ AC để cover test case. | Open |
| Q6 | **High** | N/A (Missing) | UC không mô tả hành vi **physical Back button** (Android) khi: (a) Bottom Sheet mở; (b) đang ở chi tiết; (c) từ deep link. | Nếu không định nghĩa, dev sẽ implement tuỳ hứng → bug UX. | Open |
| Q7 | **High** | N/A (Missing) | UC không mô tả **Loading / Skeleton state** cho first-load list và chi tiết. | Thiếu loading spec khiến QA không biết pass/fail. | Open |
| Q8 | **Medium** | Section 2.1 Card "Thời gian đặt" vs Section 2.2 "Thời gian đặt lịch" | Hai label khác nhau cho cùng data point. Intentional hay inconsistency? | Tester và end user nhầm lẫn. | Open |
| Q9 | **Medium** | Section 2.1 Modal bộ lọc — 2 dropdown | Có **cascade** giữa Lĩnh vực → Dịch vụ công không? | Nếu có cascade, cần test case riêng. | Open |
| Q10 | **Medium** | Section 2.1 nút "Nhập lại" | Tap "Nhập lại": gọi API ngay hay chờ "Áp dụng"? | Behavior khác nhau → test case khác nhau. | Open |
| Q11 | **Medium** | N/A (Missing) | Search scope: chỉ trong tab hiện tại hay toàn bộ? | Ảnh hưởng test data & expected result. | Open |
| Q12 | **Medium** | Section 3.1 + 3.2 | Màn chi tiết có hỗ trợ pull-to-refresh không? | CMR-13 áp dụng cho "nội dung cần cập nhật" — chi tiết có thuộc phạm vi? | Open |
| Q13 | **Medium** | N/A (Missing) | UC không mô tả **giữ scroll position** & **giữ tab** khi vào chi tiết → quay lại. | Tester cần biết scroll về top hay giữ nguyên. | Open |
| Q14 | **Medium** | N/A (Missing) | Double-tap vào card: navigate 2 lần? Thiếu rule debounce navigation. | Race condition phổ biến trên mobile. | Open |
| Q15 | **Medium** | N/A (Missing) | Card hiển thị gì khi field null? UC chỉ mô tả "-" cho detail, không cho card. | Null handling không nhất quán → bug hiển thị. | Open |
| Q16 | **Medium** | Section 2.1 badge trạng thái | Có badge/indicator trên filter icon khi filter đang active? | UX common pattern; nếu có thì cần test. | Open |
| Q17 | **Medium** | N/A (Missing) | Push Notification (UC258-259): tap push có deep-link vào chi tiết? | Integration test quan trọng. | Open |
| Q18 | **Medium** | N/A (Missing) | Danh sách có tự refresh / polling không? Hay chỉ pull-to-refresh? | Ảnh hưởng data freshness test. | Open |
| Q19 | **Medium** | N/A (Missing) | i18n 5 ngôn ngữ: tên thủ tục theo ngôn ngữ nào? Label UI đổi? Tab name dài khi dịch? | Không có spec i18n thì QA không test được. | Open |
| Q20 | **Medium** | Section 2.2 "read-only" | Tap field trong Chi tiết: có copy-to-clipboard không? | Read-only thực thụ vs cho select text là khác nhau. | Open |
| Q21 | **Medium** | N/A (Missing) | Lazy load trang N fail: hiển thị gì? Retry tự động hay user action? | Partial load edge case phổ biến. | Open |
| Q22 | **Medium** | N/A (Missing) | Tab bar horizontal scroll: có visual indicator (shadow/fade) cho biết còn tab? | UX affordance. | Open |
| Q23 | **Low** | N/A (Missing) | Thứ tự 6 tab cố định hay có thể thay đổi? | Xác định rõ để tránh mơ hồ. | Open |
| Q24 | **Low** | Section 2.1 tab active state | Tab inactive: text màu gì? Size/font giống active? | UI spec thiếu chi tiết. | Open |
| Q25 | **Low** | N/A (Missing) | Nút "Áp dụng" có disabled khi chưa thay đổi filter? | Ngăn call API không cần thiết. | Open |
| Q26 | **Low** | Section 2.2 "Khung giờ hẹn nộp" — "08:00 - 09:00" | Format " - " hay "-"? Timezone? | CMR-12 không mô tả range format. | Open |
| Q27 | **Low** | Section 2.1 dropdown option dài | CMR-03 "hover/tap giữ" — mobile không có hover. Hành vi tap-và-giữ? | Mobile gesture phải rõ. | Open |
| Q28 | **Low** | N/A (Missing) | Accessibility: font size min, contrast, VoiceOver/TalkBack? | NFR accessibility. | Open |
| Q29 | **Low** | N/A (Missing) | Device compatibility min (iOS/Android version, screen size)? | Test matrix. | Open |
| Q30 | **Low** | N/A (Missing) | Offline: list đã load có cache không? | Offline UX. | Open |
| Q31 | **Low** | Section 1 entry point | UC42-44 có được listed trong UC1 (Home) và sidebar chưa? | Entry point consistency. | Open |
| Q32 | **Low** | N/A (Missing) | Số ký tự tối đa search box? (CMR-11 default 500) | Input validation. | Open |

---

## 🟢 What's Good

1. ✅ **Feature Identity rõ ràng:** UC IDs, phân hệ, entry point đầy đủ.
2. ✅ **UI Inventory chi tiết:** 2 màn hình có bảng field đầy đủ.
3. ✅ **Tham chiếu CMR tốt:** UC trích dẫn CMR-01 đến CMR-16 ở từng hành vi cụ thể.
4. ✅ **Error handling 4 loại:** Network / HTTP 500 / HTTP 404 / Timeout — có message và behavior rõ.
5. ✅ **Scope In/Out rõ:** Mobile không có tạo/sửa/hủy.
6. ✅ **State persistence rule:** Giữ search/filter khi vào detail → quay lại; reset khi đổi tab.
7. ✅ **Empty state phân biệt:** "Không có dữ liệu" vs "Không tìm thấy kết quả" theo CMR-14.

---

## 🧪 Testability Outlook

**What CAN be tested now:**
- UI rendering cơ bản: layout, header, search, filter, tabs, card, detail.
- Format ngày giờ (CMR-12), truncate rules, wrap text, null handling detail.
- Tab select/unselect, reset search/filter khi đổi tab.
- Error flows, empty state, lazy load, pull-to-refresh.
- Search debounce 3s, state persistence.
- Bottom Sheet filter Apply / Reset / X close.

**What CANNOT be tested yet (blocked by gaps):**
- Sort order (Q1), badge color mapping (Q2), session expired (Q3).
- Phân biệt Cá nhân vs Tổ chức (Q4), AC đầy đủ (Q5).
- Physical Back button (Q6), loading/skeleton (Q7).
- Cascade dropdown (Q9), push notification deep link (Q17), i18n (Q19).

---

## 📌 Summary & Recommendation

**Kết luận:** UC42-44 đạt **67.3/100 → NOT READY**. Tài liệu có chất lượng tốt ở tầng UI Inventory + Display Rules, nhưng chưa đủ chín ở các khía cạnh Critical: AC sơ sài, edge case chưa bao phủ, mâu thuẫn sort order, thiếu badge color mapping, không tách bạch Cá nhân vs Tổ chức.

**Recommendation:** ❌ **HOLD** — không chuyển sang test design cho đến khi các câu hỏi High priority (Q1-Q7) được trả lời.

**Next step:** Chạy skill `qc-ask-ba-MOBILE` để chuyển 32 open questions vào Question Backlog cho BA trả lời.

---

## Change Log

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1 | 2026-05-08 | qc-uc-review-MOBILE | First audit. Verdict: NOT READY (67.3/100). 32 open questions (7 High / 15 Medium / 10 Low). |
