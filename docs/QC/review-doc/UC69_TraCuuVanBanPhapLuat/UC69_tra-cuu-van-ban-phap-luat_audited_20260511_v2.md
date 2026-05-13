# BÁO CÁO ĐÁNH GIÁ ĐỘ SẴN SÀNG YÊU CẦU — UC69 (Re-audit)

**Tiêu đề:** UC69 — Tra cứu văn bản pháp luật trên Mobile  
**Ngày tạo:** 11/05/2026  
**Tác giả:** QC Review Agent  
**Phiên bản:** v2 (Re-audit sau khi BA trả lời Q1–Q12)  
**Verdict:** ✅ **READY** — 95.5 / 100

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status |
|---|---|---|---|---|
| 1 | Feature Identity (title, ID, context) | 5 | 5/5 | ✅ |
| 2 | Objective & Scope | 5 | 5/5 | ✅ |
| 3 | Actors & User Roles | 10 | 10/10 | ✅ |
| 4 | Preconditions & Postconditions | 10 | 10/10 | ✅ |
| 5 | UI Object Inventory & Mapping | 15 | 15/15 | ✅ |
| 6 | Object Attributes & Behavior Definition | 20 | 19/20 | ⚡ |
| 7 | Functional Logic & Workflow Decomposition | 20 | 20/20 | ✅ |
| 8 | Functional Integration Analysis | 10 | 10/10 | ✅ |
| 9 | Acceptance Criteria | 10 | 10/10 | ✅ |
| 10 | Non-functional Requirements | 5 | 4/5 | ⚡ |
| **Total** | | **110** | **105/110** | **→ 95.5/100** |

**Raw Score:** 105 / 110  
**Final Score:** round((105 / 110) × 100, 1) = **95.5 / 100**

**Verdict:** ✅ **READY** — QA có thể bắt đầu thiết kế test case ngay lập tức.

---

## Thông tin bổ sung từ BA (Resolved Q1–Q12)

Các câu trả lời của BA đã được tích hợp vào đánh giá:

| ID | Câu trả lời | Tác động lên audit |
|---|---|---|
| Q1 | Có áp dụng Active filter indicator (CMR-02) | → Section 5 & 8: Bổ sung component indicator vào UI Inventory & Integration |
| Q2 | Có áp dụng giới hạn 500 ký tự cho textbox bộ lọc | → Section 6: Bổ sung max length cho field "Cơ quan ban hành" |
| Q3 | Có áp dụng searchable dropdown (CMR-03) | → Section 5 & 6: Bổ sung behavior searchable cho dropdown |
| Q4 | Không có role khác, chỉ cần đăng nhập | → Section 2: Xác nhận rõ ràng, tăng điểm |
| Q5 | Không test → Deferred | → Không ảnh hưởng điểm |
| Q6 | Wrap xuống dòng nếu quá dài | → Section 6: Bổ sung rule wrap cho "Số ký hiệu" |
| Q7 | Có áp dụng full-screen loading (CMR-07 v1.1) | → Section 6 & 9: Bổ sung loading state first-load |
| Q8 | Có đổi ngôn ngữ (CMR-17) | → Section 9: Bổ sung NFR i18n |
| Q9 | Chưa trả lời | → Giữ Open, ảnh hưởng nhỏ (Low priority) |
| Q10 | Không giới hạn depth navigation | → Section 7 & 8: Bổ sung rule deep navigation |
| Q11 | Follow CMR-15, cho phép chọn ngày tương lai | → Section 6: Bổ sung validation rule date range |
| Q12 | Không áp dụng landscape | → Section 9: Xác nhận chỉ Portrait |

---

## Section 0 — Feature Identity (5/5) ✅

Không thay đổi so với v1. UC69 có đầy đủ: tên, ID, phân hệ, vị trí trong hệ thống, phiên bản.

---

## Section 1 — Objective & Scope (5/5) ✅

Không thay đổi so với v1. Mục tiêu, phạm vi trong/ngoài đều rõ ràng.

---

## Section 2 — Actors & User Roles (10/10) ✅

**Cập nhật từ Q4:** BA xác nhận không có role nào khác ngoài Cá nhân/Tổ chức. Chỉ cần đăng nhập là đủ quyền truy cập UC69. Không cần test phân quyền negative case cho role khác.

---

## Section 3 — Preconditions & Postconditions (10/10) ✅

**Cập nhật từ Q5:** BA xác nhận không cần test trường hợp chưa đăng nhập cố truy cập (Deferred). Preconditions đã đủ rõ cho phạm vi test.

---

## Section 4 — UI Object Inventory & Mapping (15/15) ✅

**Cập nhật từ Q1 & Q3:**

### Bổ sung vào Màn hình Danh sách

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|---|---|---|---|---|
| 4a | Active filter indicator | Icon (dot) | ✅ (BA confirmed) | — | Hiển thị icon xanh lá ở góc phải trên icon filter khi có filter active (CMR-02) |

### Bổ sung vào Bottom Sheet Bộ lọc

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|---|---|---|---|---|
| 4-6 | Dropdown (Loại VB, Lĩnh vực, Đơn vị soạn thảo) | Searchable Dropdown | ✅ (BA confirmed) | ✅ | Hỗ trợ nhập text tìm kiếm trong dropdown (CMR-03) |

### CMR Cross-Check (Updated)

| CMR | Áp dụng? | Status | Ghi chú |
|---|---|---|---|
| CMR-01 (Search) | ✅ | ✅ | Debounce 3s, state persistence, 500 ký tự, tìm gần đúng |
| CMR-02 (Filter) | ✅ | ✅ | Active filter indicator confirmed (Q1) |
| CMR-03 (Dropdown) | ✅ | ✅ | Searchable dropdown confirmed (Q3) |
| CMR-04 (Lazy Load) | ✅ | ✅ | 20 bản ghi/lần |
| CMR-05 (Badge) | ✅ | ✅ | Badge read-only |
| CMR-06 (Header) | ✅ | ✅ | Nút quay lại, tiêu đề |
| CMR-07 (Error) | ✅ | ✅ | Full-screen loading first-load confirmed (Q7) |
| CMR-08 (File Viewer) | ✅ | ✅ | Xem PDF, tải DOC/DOCX |
| CMR-13 (Pull to Refresh) | ✅ | ✅ | |
| CMR-14 (Empty State) | ✅ | ✅ | Phân biệt no data vs no result |
| CMR-15 (Date Range) | ✅ | ✅ | Follow CMR-15 đầy đủ, cho phép ngày tương lai (Q11) |
| CMR-17 (Multi-language) | ✅ | ✅ | Có đổi ngôn ngữ (Q8) |
| CMR-18 (Debounce Nav) | ✅ | ✅ | Debounce rapid tap |

---

## Section 5 — Object Attributes & Behavior Definition (19/20) ⚡

### Bổ sung từ BA answers

**Active Filter Indicator (Q1):**
- Khi có ít nhất 1 field trong bộ lọc có giá trị khác mặc định → Hiển thị icon indicator màu xanh lá cây ở góc phải trên icon filter
- Khi tất cả field trở về mặc định (reset hoặc xóa thủ công) → Ẩn indicator

**Searchable Dropdown (Q3):**
- Dropdown Loại văn bản, Lĩnh vực, Đơn vị soạn thảo hỗ trợ searchable (CMR-03)
- Người dùng nhập text → Danh sách option lọc theo từ khóa (tìm gần đúng)
- Sắp xếp A-Z / 0-9
- Text dài → Truncate + "...", tap giữ để xem toàn bộ
- Option đã chọn được highlight/bold

**Số ký hiệu wrap (Q6):**
- Trường "Số ký hiệu" trong chi tiết: nếu giá trị quá dài → wrap xuống dòng (không truncate)

**Loading state first-load (Q7):**
- First-load màn hình danh sách: Full-screen loading overlay (CMR-07 v1.1)
- Các lần tải tiếp theo (lazy load, refresh): Spinner cục bộ

**Date Range validation (Q11):**
- Follow CMR-15 đầy đủ:
  - Chỉ chọn ngày bắt đầu → Kết thúc = vô hạn (lọc từ ngày bắt đầu đến hiện tại)
  - Chỉ chọn ngày kết thúc → Bắt đầu = không giới hạn
  - Khi chọn ngày bắt đầu → Ngày kết thúc chỉ cho phép từ ngày bắt đầu trở về sau
- Cho phép chọn ngày tương lai (vì có status "Chưa hiệu lực" — văn bản chưa tới ngày ban hành)

**Deep navigation VB liên quan (Q10):**
- Không giới hạn depth. Cho phép đi sâu vô hạn qua các văn bản liên quan
- Back luôn quay về chi tiết trước đó (navigation stack)

**Đa ngôn ngữ (Q8):**
- Tất cả text cứng (header, placeholder, button text, empty state message, toast) thay đổi theo ngôn ngữ đã chọn (CMR-17)
- Nội dung từ API (tên văn bản, số hiệu, cơ quan ban hành...) không thay đổi

**Screen rotation (Q12):**
- Không hỗ trợ landscape. App chỉ hoạt động ở chế độ Portrait.

### Edge Case Checklist (Updated)

| Edge Case | UC + BA Answer | Gap? |
|---|---|---|
| Tên văn bản quá dài | ✅ Tối đa 2 dòng + "..." | Không |
| Số ký hiệu quá dài | ✅ Wrap xuống dòng (Q6) | Không |
| Giá trị null | ✅ Hiển thị "-" | Không |
| Danh sách rỗng | ✅ CMR-14 | Không |
| Loading first-load | ✅ Full-screen loading (Q7) | Không |
| Partial API failure | ✅ Xử lý độc lập từng block | Không |
| Rapid tap | ✅ Debounce | Không |
| Screen rotation | ✅ Không hỗ trợ (Q12) | Không |
| Đa ngôn ngữ | ✅ CMR-17 (Q8) | Không |
| Deep navigation VB liên quan | ✅ Không giới hạn (Q10) | Không |
| Tải văn bản — vị trí lưu | ⚠️ Q9 chưa trả lời | Gap nhỏ (Low) |

**Lý do trừ 1 điểm:** Q9 (vị trí lưu file khi tải văn bản, quyền storage) chưa được trả lời. Tuy nhiên đây là Low priority và không block test design.

---

## Section 6 — Functional Logic & Workflow Decomposition (20/20) ✅

Tất cả luồng chính đã đầy đủ thông tin sau khi BA trả lời:

### Bổ sung vào Function 3 (Bộ lọc):

**Searchable Dropdown behavior (Q3):**
- Tap dropdown → Mở danh sách + ô search
- Nhập text → Lọc option theo từ khóa (gần đúng)
- Tap option → Đóng dropdown, hiển thị giá trị đã chọn
- Option đã chọn highlight/bold khi mở lại

**Active filter indicator (Q1):**
- Sau khi "Áp dụng" bộ lọc có giá trị khác mặc định → Icon indicator xanh lá xuất hiện
- Sau khi "Nhập lại" (reset) → Icon indicator biến mất

**Date Range (Q11):**
- Validation theo CMR-15 đầy đủ
- Cho phép chọn ngày tương lai

**Max length textbox bộ lọc (Q2):**
- Trường "Cơ quan ban hành": tối đa 500 ký tự (áp dụng CMR-01)

### Bổ sung vào Function 4 (Xem chi tiết):

**Deep navigation (Q10):**
- VB liên quan → Chi tiết → VB liên quan → Chi tiết → ... (vô hạn)
- Back navigation: luôn quay về màn hình trước đó trong stack

---

## Section 7 — Functional Integration Analysis (10/10) ✅

**Cập nhật:**

| Chức năng nguồn | Chức năng đích | Ảnh hưởng | Status |
|---|---|---|---|
| Bộ lọc active → Icon filter | Active indicator | ✅ Confirmed: hiển thị/ẩn indicator theo CMR-02 (Q1) | Resolved |
| Deep navigation VB liên quan | Navigation stack | ✅ Confirmed: không giới hạn depth (Q10) | Resolved |
| Đổi ngôn ngữ → UC69 | Text cứng | ✅ Confirmed: thay đổi theo CMR-17 (Q8) | Resolved |

Tất cả integration points đã được xác nhận rõ ràng.

---

## Section 8 — Acceptance Criteria (10/10) ✅

AC gốc (AC1–AC13) đã đầy đủ và testable. Bổ sung implicit AC từ BA answers:

| AC bổ sung | Mô tả | Nguồn |
|---|---|---|
| AC14 (implicit) | Active filter indicator hiển thị khi có filter active, ẩn khi reset | Q1 + CMR-02 |
| AC15 (implicit) | Searchable dropdown hoạt động đúng (tìm gần đúng, highlight, A-Z) | Q3 + CMR-03 |
| AC16 (implicit) | Full-screen loading cho first-load danh sách | Q7 + CMR-07 v1.1 |
| AC17 (implicit) | Date Range follow CMR-15, cho phép ngày tương lai | Q11 + CMR-15 |
| AC18 (implicit) | Deep navigation VB liên quan không giới hạn, back đúng stack | Q10 |
| AC19 (implicit) | Đa ngôn ngữ: text cứng thay đổi, nội dung API giữ nguyên | Q8 + CMR-17 |

---

## Section 9 — Non-functional Requirements (4/5) ⚡

| NFR | Status | Ghi chú |
|---|---|---|
| Performance (timeout) | ✅ | CMR-16: 10 giây |
| Loading states | ✅ | Full-screen first-load (Q7), skeleton chi tiết, spinner lazy load |
| Security (session) | ✅ | CMR-07 (401), refresh token |
| i18n (Đa ngôn ngữ) | ✅ | CMR-17 confirmed (Q8) |
| Orientation | ✅ | Portrait only (Q12) |
| Accessibility | ⚠️ | Không đề cập |
| Tải file — vị trí lưu & quyền | ⚠️ | Q9 chưa trả lời |

**Lý do trừ 1 điểm:** Accessibility không đề cập + Q9 chưa trả lời (Low priority, không block).

---

## 📋 Unified Gap & Question Report (Updated)

| ID | Priority | Ref | Question | Why It Matters | Status |
|---|---|---|---|---|---|
| Q1 | M | "Nút Lọc" — Section 2.1, #4 | Active filter indicator | — | ✅ Resolved |
| Q2 | M | "Cơ quan ban hành" — Section 2.2, #2 | Max length textbox bộ lọc | — | ✅ Resolved |
| Q3 | M | "Dropdown" — Section 2.2, #4-6 | Searchable dropdown | — | ✅ Resolved |
| Q4 | L | "Phân quyền" — Section 1 | Role khác | — | ✅ Resolved |
| Q5 | L | "Preconditions" — Section 1 | Hành vi chưa đăng nhập | — | ⏸️ Deferred |
| Q6 | M | "Số ký hiệu" — Section 2.3, #3 | Wrap/truncate | — | ✅ Resolved |
| Q7 | M | N/A (Missing) | Loading state first-load | — | ✅ Resolved |
| Q8 | L | N/A (Missing) | Đa ngôn ngữ | — | ✅ Resolved |
| Q9 | L | "Tải văn bản" — Section 2.3, #4 | Khi tap "Tải văn bản", file được lưu ở đâu trên thiết bị? App có yêu cầu quyền storage (Android) không? Trên iOS hành vi tải file như thế nào? | Cần biết vị trí lưu và quyền để test trên cả 2 platform. | 🟡 Open |
| Q10 | M | "Văn bản liên quan" — Section 2.3 | Deep navigation limit | — | ✅ Resolved |
| Q11 | M | "Khoảng ngày ban hành" — Section 2.2, #3 | Date Range validation + ngày tương lai | — | ✅ Resolved |
| Q12 | L | N/A (Missing) | Screen rotation | — | ✅ Resolved |

**Tổng kết:** 10/12 Resolved, 1 Deferred, 1 Open (Low priority).

---

## 🟢 What's Good

- **Tài liệu UC69 chất lượng cao:** Mô tả giao diện chi tiết, luồng xử lý rõ ràng, 13 AC testable.
- **BA phản hồi nhanh và đầy đủ:** 11/12 câu hỏi được trả lời rõ ràng, giúp giải quyết hầu hết gap.
- **CMR compliance tốt:** Sau khi BA xác nhận, UC69 áp dụng đầy đủ CMR-01 đến CMR-18 (trừ CMR-09, CMR-10, CMR-11 không áp dụng cho UC này).
- **Edge case coverage:** Null handling, partial API failure, debounce, state persistence, deep navigation, i18n đều đã được xác nhận.

---

## 🧪 Testability Outlook

**What CAN be tested now (tất cả luồng chính + bổ sung):**

- Luồng xem danh sách: full-screen loading first-load, hiển thị, sắp xếp, lazy load, pull to refresh
- Luồng tìm kiếm: debounce 3s, 500 ký tự max, tìm gần đúng, xóa keyword, kết hợp bộ lọc
- Chuyển đổi radio: reset trang, giữ keyword/filter
- Bottom Sheet bộ lọc: mở/đóng, áp dụng, nhập lại, searchable dropdown, active filter indicator, date range (CMR-15 + ngày tương lai), max 500 ký tự textbox
- Xem chi tiết: skeleton loading, hiển thị thông tin, null → "-", format ngày, badge, số ký hiệu wrap
- Tải văn bản / Xem PDF: ẩn nút khi không có file, toast thành công, file lỗi
- Mục lục: collapse/expand, tap scroll, ẩn khi không có
- Văn bản liên quan: hiển thị, tap navigate, deep navigation vô hạn, back đúng stack, empty state
- State Persistence: quay lại giữ nguyên trạng thái
- Debounce rapid tap: chỉ navigate 1 lần
- Error handling: mất mạng, timeout, partial failure, file lỗi
- Đa ngôn ngữ: text cứng thay đổi, nội dung API giữ nguyên
- Portrait only: không hỗ trợ landscape

**What CANNOT be tested yet:**

- Q9 (Low): Vị trí lưu file khi tải, quyền storage — chỉ ảnh hưởng đến verification step sau khi tải, không block test design

**Suggested test focus areas:**

- **Happy path:** Xem danh sách → Tìm kiếm → Lọc (searchable dropdown) → Xem chi tiết → Tải/Xem PDF → Mục lục → VB liên quan (deep)
- **Alternative scenarios:** Chuyển radio, reset bộ lọc, xóa keyword, pull to refresh
- **Boundary & validation tests:** 500 ký tự search + textbox bộ lọc, date range (CMR-15 + ngày tương lai), text dài wrap
- **Error & exception scenarios:** Mất mạng, timeout, partial failure, file lỗi/mất
- **UI-specific checks:** Null → "-", badge colors, empty states, full-screen loading, active filter indicator
- **CMR compliance tests:** CMR-01 (search 500 chars), CMR-02 (filter indicator), CMR-03 (searchable dropdown), CMR-04 (lazy load), CMR-05 (badge), CMR-13 (pull to refresh), CMR-14 (empty state), CMR-15 (date range + future date), CMR-17 (i18n)
- **Partial API failure tests:** 1 block lỗi, các block khác bình thường
- **Edge case tests:** Rapid tap, deep navigation VB liên quan, text overflow wrap, searchable dropdown edge cases
- **i18n tests:** Đổi ngôn ngữ → verify text cứng thay đổi, nội dung API giữ nguyên

---

## 📌 Summary & Recommendation

UC69 sau khi BA trả lời 11/12 câu hỏi đã đạt mức **✅ READY (95.5/100)**. Tất cả các gap quan trọng (Medium priority) đã được giải quyết. Chỉ còn 1 câu hỏi Low priority (Q9 — vị trí lưu file) chưa trả lời, không ảnh hưởng đến khả năng thiết kế test case.

**Recommendation:** ✅ **READY** — QA bắt đầu thiết kế test case ngay. Q9 có thể được bổ sung sau khi BA trả lời mà không ảnh hưởng đến tiến độ.

---

## 📝 Changelog (v1 → v2)

| Mục | Thay đổi | Nguồn |
|---|---|---|
| Section 2 (Actors) | 9/10 → 10/10 | Q4: Xác nhận không có role khác |
| Section 3 (Preconditions) | 9/10 → 10/10 | Q5: Deferred, không ảnh hưởng phạm vi test |
| Section 4 (UI Inventory) | 14/15 → 15/15 | Q1: Active filter indicator, Q3: Searchable dropdown |
| Section 5 (Attributes) | 15/20 → 19/20 | Q1, Q2, Q3, Q6, Q7, Q10, Q11, Q12 resolved |
| Section 6 (Workflows) | 17/20 → 20/20 | Q1, Q2, Q3, Q7, Q10, Q11 integrated |
| Section 7 (Integration) | 7/10 → 10/10 | Q1, Q10 resolved integration gaps |
| Section 8 (AC) | 9/10 → 10/10 | Implicit AC14–AC19 bổ sung |
| Section 9 (NFR) | 3/5 → 4/5 | Q7, Q8, Q12 resolved; Q9 still open |
| **Total** | **84.5 → 95.5** | **11 questions resolved** |
