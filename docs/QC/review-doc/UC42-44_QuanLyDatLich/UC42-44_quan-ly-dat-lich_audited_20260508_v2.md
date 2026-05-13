# UC Readiness Review — UC42-44 Quản lý đặt lịch nộp hồ sơ (Mobile)

**Loại báo cáo:** Re-Audit
**Ngày audit:** 2026-05-08
**Agent:** qc-uc-review-MOBILE
**Phiên bản:** v2
**Input audited:**
- `docs/BA/SRS-mobile/UC42-44_QuanLyDatLich/UC42-44_QuanLyDatLich.md` (v2, 07/05/2026)
- `docs/BA/SRS-mobile/UC42-44_QuanLyDatLich/UC 42-44_ Tab List.png`
- `docs/BA/SRS-mobile/UC42-44_QuanLyDatLich/UC 42_ Danh sách thủ tục hành chính chờ xác nhận.png`
- `docs/BA/SRS-mobile/UC42-44_QuanLyDatLich/UC42-filter.png`
- `docs/BA/SRS-mobile/UC42-44_QuanLyDatLich/UC42-44. Chi tiết lịch hẹn.png`
- `docs/BA/SRS-mobile/Common rule/CMR_Mobile.md` (v1.1, 07/05/2026)
- `docs/QC-MOBILE/review-doc/UC42-44_QuanLyDatLich/UC42-44_quan-ly-dat-lich_audited_20260508_v1.md`
- `docs/QC-MOBILE/review-doc/UC42-44_QuanLyDatLich/UC42-44_question-backlog.md`

---

## Feature Brief

UC42-44 mô tả chức năng **Quản lý đặt lịch nộp hồ sơ thủ tục đầu tư** trên ứng dụng di động. Chức năng này phục vụ **Cá nhân và Tổ chức đã đăng nhập**, cho phép người dùng tra cứu và theo dõi các lịch hẹn nộp hồ sơ TTHC của mình — **không bao gồm** chức năng tạo mới, chỉnh sửa hay hủy lịch (toàn bộ read-only trên mobile).

Truy cập qua **Quick Access ở Trang chủ** hoặc **Sidebar**. Màn hình chính gồm: Header đỏ + nút back → Search box (debounce 3s, fuzzy match, tối đa 500 ký tự, scope toàn bộ tab) + Filter icon (Bottom Sheet lọc theo Lĩnh vực & Dịch vụ công, không cascade, có active indicator) → 6 Tab trạng thái cố định (Tất cả, Chờ xác nhận, Đã xác nhận, Đã hủy, Đã bỏ lượt, Đã hoàn thành) → Card list lazy-load 20 records/lần, sắp xếp theo thời gian đặt giảm dần. Tap card → mở màn **Chi tiết lịch hẹn** (5 section read-only: Thủ tục / Người nộp / Lịch hẹn / Trạng thái / Ghi chú). Hỗ trợ pull-to-refresh cả danh sách và chi tiết. Loading state toàn màn hình cho first-load, spinner cục bộ cho các lần tải tiếp theo. Debounce navigation chống double-tap. Đa ngôn ngữ cho text cứng.

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| **85.5 / 100** | ⚠️ **CONDITIONALLY READY** |

**Lý do:** Phần lớn các gap Critical đã được giải quyết trong v2. Tài liệu đã bổ sung đầy đủ: sort order, loading state, debounce navigation, pull-to-refresh, lazy load fail handling, search scope/limit, filter independence/indicator, null handling card, state persistence, i18n, accessibility, và 22 AC theo Given/When/Then. Tuy nhiên, vẫn còn một số gap Medium/Low chưa được giải quyết (push notification deep-link, auto refresh/polling, copy-to-clipboard, tab scroll indicator) và badge color mapping vẫn chỉ tham chiếu "UI design" mà không có bảng mapping cụ thể. Các gap còn lại không block test design nhưng cần được clarify trước khi hoàn thành test case.

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status | Notes |
| - | -------------- | ------- | ----- | ------ | ----- |
| 1 | Feature Identity | 5 | 5/5 | ✅ Clear | UC IDs, phân hệ, entry point đầy đủ |
| 2 | Objective & Scope | 5 | 5/5 | ✅ Clear | In/Out scope rõ ràng, mục tiêu rõ |
| 3 | Actors & User Roles | 10 | 8/10 | ⚠️ Partial | Phân quyền Cá nhân/Tổ chức đã đề cập nhưng chưa rõ khác biệt cụ thể về UI/data scope |
| 4 | Preconditions & Postconditions | 10 | 9/10 | ⚠️ Partial | Precondition rõ (đăng nhập). Postcondition: thiếu mô tả physical Back button behavior |
| 5 | UI Object Inventory & Mapping | 15 | 14/15 | ⚠️ Partial | Đầy đủ 2 màn hình + modal filter. Thiếu: tab scroll indicator visual |
| 6 | Object Attributes & Behavior Definition | 20 | 18/20 | ⚠️ Partial | Bổ sung null handling card, filter indicator, debounce nav. Thiếu: badge color mapping cụ thể, copy-to-clipboard |
| 7 | Functional Logic & Workflow Decomposition | 20 | 19/20 | ⚠️ Partial | Bổ sung loading state, pull-to-refresh, lazy load fail, 401 handling, debounce. Thiếu: auto refresh/polling |
| 8 | Functional Integration Analysis | 10 | 8/10 | ⚠️ Partial | Thiếu: push notification deep-link (UC258-259), entry point consistency |
| 9 | Acceptance Criteria | 10 | 9/10 | ⚠️ Partial | 22 AC Given/When/Then, cover search/filter/lazy load/error/state/i18n/accessibility. Thiếu AC cho push notification |
| 10 | Non-functional Requirements | 5 | 4/5 | ⚠️ Partial | Accessibility + i18n đã bổ sung. Thiếu: offline cache, device compatibility min |
| **Total** | | **110** | **99/110 → 90.0/100** | | |

**Normalization:** Raw score 99 / 110 → Final Score = round((99 / 110) × 100, 1) = **90.0 / 100**

> **Lưu ý:** Sau khi xem xét kỹ mức độ ảnh hưởng thực tế của các gap còn lại đến khả năng thiết kế test case, điểm được điều chỉnh xuống **85.5/100** do:
> - Badge color mapping (Q2) vẫn chưa có bảng cụ thể → ảnh hưởng trực tiếp đến test case verify badge → trừ 2 điểm
> - Physical Back button (Q6) chưa mô tả → ảnh hưởng đến Android test → trừ 1.5 điểm
> - Push notification deep-link (Q17) chưa mô tả → ảnh hưởng integration test → trừ 1 điểm

**Final Adjusted Score: 85.5 / 100**

---

## 📋 Unified Gap & Question Report

### Resolved Questions (từ v1)

| ID | Priority | Ref | Question | Resolution | Status |
|----|----------|-----|----------|------------|--------|
| Q1 | High | Section 3.1 step 3 | Sort order mâu thuẫn | Đã sửa: "sắp xếp theo thời gian đặt giảm dần (mới nhất lên đầu)" | ✅ Resolved |
| Q3 | High | Section 3.1 Xử lý lỗi | Session hết hạn (HTTP 401) | Đã bổ sung: refresh token tự động, nếu hết hạn >15 ngày → redirect đăng nhập + toast | ✅ Resolved |
| Q5 | High | Section 3.3 | AC không measurable | Đã viết lại 22 AC theo Given/When/Then, cover đầy đủ | ✅ Resolved |
| Q7 | High | N/A | Loading/Skeleton state | Đã bổ sung: first-load toàn màn hình, tiếp theo spinner cục bộ (CMR-07) | ✅ Resolved |
| Q8 | Medium | Section 2.1/2.2 | Label inconsistency "Thời gian đặt" vs "Thời gian đặt lịch" | Đã đồng bộ thành "Thời gian đặt" | ✅ Resolved |
| Q9 | Medium | Modal bộ lọc | Cascade giữa Lĩnh vực → Dịch vụ công | Đã ghi rõ: "không phụ thuộc vào nhau" | ✅ Resolved |
| Q10 | Medium | Nút "Nhập lại" | Behavior khi tap | Đã ghi rõ: reset về mặc định, không đóng Bottom Sheet, không gọi API | ✅ Resolved |
| Q11 | Medium | Search scope | Chỉ tab hiện tại hay toàn bộ? | Đã ghi rõ: "toàn bộ các tab" | ✅ Resolved |
| Q12 | Medium | Chi tiết | Pull-to-refresh chi tiết | Đã bổ sung Section 3.2 pull-to-refresh + AC12 | ✅ Resolved |
| Q13 | Medium | N/A | Giữ scroll position & tab khi quay lại | Đã bổ sung trong Tabs section | ✅ Resolved |
| Q14 | Medium | N/A | Double-tap debounce navigation | Đã bổ sung CMR-18 + Section 3.1 | ✅ Resolved |
| Q15 | Medium | Card null handling | Card hiển thị gì khi field null? | Đã bổ sung: hiển thị "-" | ✅ Resolved |
| Q16 | Medium | Filter icon | Active filter indicator | Đã bổ sung: icon indicator màu xanh lá cây (CMR-02) | ✅ Resolved |
| Q19 | Medium | i18n | Đa ngôn ngữ spec | Đã bổ sung Section 4 + AC20 (CMR-17) | ✅ Resolved |
| Q21 | Medium | Lazy load fail | Trang N fail behavior | Đã bổ sung: retry 3 lần, sau đó dừng + pull-to-refresh | ✅ Resolved |
| Q23 | Low | Tab order | Cố định hay thay đổi? | Đã ghi rõ: "cố định, không thể thay đổi" | ✅ Resolved |
| Q26 | Low | Khung giờ format | Format range | Đã ghi rõ: "HH:mm - HH:mm" (CMR-12) | ✅ Resolved |
| Q28 | Low | Accessibility | Font size, contrast, screen reader | Đã bổ sung Section 5 + AC21-22 | ✅ Resolved |
| Q32 | Low | Search max chars | Số ký tự tối đa | Đã ghi rõ: 500 ký tự (CMR-01) | ✅ Resolved |

### Remaining Open Questions

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q2 | Medium | Section 2.1/2.2 Badge | Badge color mapping chỉ ghi "Màu sắc dựa theo UI design" — chưa có bảng mapping cụ thể từng trạng thái → màu | QA không thể verify badge color nếu không có bảng mapping rõ ràng. CMR-05 chỉ mô tả nguyên tắc chung. | Open |
| Q4 | Low | Section 1 + 2.2 | Khác biệt Cá nhân vs Tổ chức: label, format mã định danh, data scope | Đã mô tả "CCCD/CMND/Mã doanh nghiệp" nhưng chưa rõ có khác biệt UI nào khác không. Giả định: không có khác biệt UI ngoài format mã định danh. | Open (Downgraded to Low) |
| Q6 | Medium | N/A | Physical Back button (Android) behavior khi: Bottom Sheet mở, đang ở chi tiết, từ deep link | Android-specific behavior cần rõ để tránh implement tùy hứng. | Open (Downgraded from High) |
| Q17 | Low | N/A | Push Notification (UC258-259): tap push có deep-link vào chi tiết? | Integration test — có thể defer sang UC258-259 scope. | Open (Downgraded to Low) |
| Q18 | Low | N/A | Danh sách có tự refresh/polling không? | Ảnh hưởng data freshness. Giả định: chỉ pull-to-refresh, không auto polling. | Open (Downgraded to Low) |
| Q20 | Low | Section 2.2 "read-only" | Tap field trong Chi tiết: có copy-to-clipboard không? | Minor UX. Giả định: không hỗ trợ copy. | Open |
| Q22 | Low | N/A | Tab bar horizontal scroll: có visual indicator (shadow/fade)? | UX affordance. Giả định: dựa vào UI design. | Open |
| Q24 | Low | Tab inactive state | Tab inactive: text màu gì? Size/font? | Dựa vào UI design specs. | Open |
| Q25 | Low | N/A | Nút "Áp dụng" có disabled khi chưa thay đổi filter? | Minor UX optimization. | Open |
| Q27 | Low | CMR-03 | Mobile gesture "tap và giữ" cho option dài | CMR-03 đã mô tả nhưng chưa rõ behavior cụ thể trên mobile. | Open |
| Q29 | Low | N/A | Device compatibility min (iOS/Android version, screen size) | Test matrix — dựa vào project-level spec. | Open |
| Q30 | Low | N/A | Offline: list đã load có cache không? | Offline UX — giả định: không cache. | Open |
| Q31 | Low | Section 1 entry point | UC42-44 có được listed trong UC1 (Home) và sidebar? | Entry point consistency — cần verify với UC1. | Open |

---

## 🟢 What's Good (Improvements from v1)

1. ✅ **Sort order đã rõ ràng:** "Thời gian đặt giảm dần (mới nhất lên đầu)" — không còn mâu thuẫn.
2. ✅ **22 AC theo Given/When/Then:** Cover đầy đủ tabs, chi tiết, badge, filter, search, pull-to-refresh, lazy load, error handling, loading state, state persistence, đa ngôn ngữ, accessibility.
3. ✅ **Loading state đầy đủ:** First-load toàn màn hình + spinner cục bộ cho các lần tải tiếp theo.
4. ✅ **Session 401 handling:** Refresh token tự động + redirect đăng nhập khi hết hạn.
5. ✅ **Pull-to-refresh cả danh sách và chi tiết.**
6. ✅ **Lazy load fail handling:** Retry 3 lần + dừng + pull-to-refresh.
7. ✅ **Debounce navigation (CMR-18):** Chống double-tap navigate 2 lần.
8. ✅ **Search scope + limit rõ ràng:** Toàn bộ tab, 500 ký tự.
9. ✅ **Filter independence + active indicator.**
10. ✅ **Null handling card:** Hiển thị "-".
11. ✅ **State persistence:** Giữ tab, scroll, search/filter khi quay lại từ chi tiết.
12. ✅ **Đa ngôn ngữ (Section 4):** Phân biệt text cứng vs text động.
13. ✅ **Accessibility (Section 5):** Screen reader + dựa vào UI design specs.
14. ✅ **Label consistency:** "Thời gian đặt" đồng bộ giữa card và chi tiết.

---

## 🧪 Testability Outlook

**What CAN be tested now (v2):**
- UI rendering: layout, header, search, filter, tabs, card, detail — đầy đủ spec.
- Sort order: thời gian đặt giảm dần.
- Search: debounce 3s, fuzzy match, scope toàn bộ tab, max 500 ký tự, state persistence.
- Filter: Bottom Sheet, Lĩnh vực + Dịch vụ công (independent), Apply/Reset/X close, active indicator.
- Tabs: 6 tab cố định, single select, giữ tab + scroll khi quay lại, reset search/filter khi đổi tab.
- Card: null handling "-", truncate 2 dòng, tap navigate.
- Chi tiết: 5 section read-only, wrap text, null "-", pull-to-refresh.
- Loading state: first-load toàn màn hình, spinner cục bộ.
- Lazy load: 20 records, auto load, retry 3 lần khi fail.
- Pull-to-refresh: danh sách + chi tiết.
- Debounce navigation: double-tap protection.
- Error handling: network/500/404/401/timeout — đầy đủ message + behavior.
- Đa ngôn ngữ: text cứng đổi, text động giữ nguyên.
- Accessibility: screen reader support.

**What CANNOT be tested yet (blocked by remaining gaps):**
- Badge color mapping cụ thể (Q2) — chỉ test được "badge hiển thị" nhưng không verify màu chính xác.
- Physical Back button Android (Q6) — cần giả định hoặc clarify.
- Push notification deep-link (Q17) — defer sang UC258-259.

---

## 📌 Summary & Recommendation

**Kết luận:** UC42-44 đạt **85.5/100 → CONDITIONALLY READY**. Tài liệu v2 đã cải thiện đáng kể so với v1 (từ 67.3 lên 85.5). Phần lớn các gap Critical đã được giải quyết: sort order, AC, loading state, session handling, pull-to-refresh, lazy load fail, debounce navigation, search/filter spec, i18n, accessibility.

**Recommendation:** ⚠️ **PROCEED WITH ASSUMPTIONS** — có thể bắt đầu test design với các giả định sau:
1. Badge color: test theo CMR-05 nguyên tắc chung (Xanh = tích cực, Vàng = chờ, Đỏ = tiêu cực, Xám = trung tính). Cần confirm bảng mapping cụ thể với BA/UI.
2. Physical Back button: giả định đóng Bottom Sheet nếu đang mở, quay lại màn trước nếu ở chi tiết.
3. Push notification deep-link: defer sang scope UC258-259.
4. Auto refresh: giả định chỉ pull-to-refresh, không auto polling.
5. Copy-to-clipboard: giả định không hỗ trợ.

**Next step:** Có thể chuyển sang test scenario design. Các câu hỏi Low priority còn lại nên được clarify song song trong quá trình design.

---

## Change Log

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1 | 2026-05-08 | qc-uc-review-MOBILE | First audit. Verdict: NOT READY (67.3/100). 32 open questions (7 High / 15 Medium / 10 Low). |
| v2 | 2026-05-08 | qc-uc-review-MOBILE | Re-audit after BA update to v2. Verdict: CONDITIONALLY READY (85.5/100). 19 questions resolved, 13 remaining (0 High / 2 Medium / 11 Low). Significant improvement in AC, loading state, error handling, search/filter spec, i18n, accessibility. |
