# UC Readiness Review
**Functional / Black-box Test Readiness Template**

**Tiêu đề:** UC40 — Tra cứu thông tin quỹ đất trong KCN trên Mobile — Audit Report
**Ngày tạo:** 08/05/2026
**Tác giả:** QC Review Agent
**Phiên bản:** v3

> **Phạm vi kiểm thử:** Dự án này chỉ kiểm thử **phía Mobile Client**. Mọi phân tích đều qua lăng kính "client hiển thị/xử lý thế nào?" — KHÔNG audit logic API/backend.

---

> **Completion status conventions:**
> - ✅ **Complete** = section is fully populated and no longer ambiguous
> - ⚡ **Partial** = contains content but requires further clarification
> - ⚠️ **Missing** = absent — BLOCKER, cannot start test design

---

## Feature Brief

Chức năng UC40 cho phép cá nhân/tổ chức đã đăng nhập tra cứu danh sách lô đất trong các khu công nghiệp (KCN) trên ứng dụng Mobile. Người dùng có thể:
- **Xem danh sách** lô đất dạng Card, sắp xếp mặc định theo tên lô đất tăng dần
- **Tìm kiếm** theo từ khóa (tên lô đất) với debounce 3 giây, max 500 ký tự
- **Lọc** theo nhiều tiêu chí: Khu công nghiệp (searchable dropdown), Diện tích (Từ-Đến), Tình trạng quỹ đất, Tình trạng công bố
- **Pull-to-Refresh** để reload toàn bộ danh sách (theo CMR-13)
- **Xem chi tiết** từng lô đất (read-only)
- **Xem file đính kèm** (hình ảnh/video quảng bá, sắp xếp theo ngày upload giảm dần)

Truy cập qua: Sidebar → "Quản lý quỹ đất"
Phân quyền: Tất cả cá nhân đã đăng nhập (không phân biệt vai trò)
Lazy load: 20 bản ghi/lần
State Persistence: Giữ trạng thái tìm kiếm/lọc khi quay lại từ màn chi tiết
Session: HTTP 401 → tự động refresh token; quá 15 ngày → redirect login + toast

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| **84.5 / 100** | ⚡ **CONDITIONALLY READY** (gần ngưỡng ✅ READY) |

> Tài liệu v3 đã giải quyết **11/14 câu hỏi** từ backlog. Còn **3 câu Medium open** (Q7, Q9, Q11) không block happy path — QA có thể bắt đầu thiết kế test case diện rộng.

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| UC40 | Tra cứu thông tin quỹ đất trong KCN | v3 | ✅ Complete |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------|
| han.luong | ⚡ Partial — Không ghi người phê duyệt | 29/04/2026 | 08/05/2026 |

**Score: 5/5** ✅ Complete
- *(v3 note: Tăng từ 4→5. Last Updated đã được ghi rõ qua Section 6 Lịch sử cập nhật với timestamp chi tiết từng thay đổi.)*

---

## 1. Objective & Scope

### 1.1 Objective
Cho phép cá nhân, tổ chức tra cứu danh sách lô đất trong các khu công nghiệp. Người dùng có thể tìm kiếm theo từ khóa, lọc theo nhiều tiêu chí, xem thông tin chi tiết từng lô đất.

### 1.2 In Scope
- Hiển thị danh sách lô đất (Card List) + Lazy load 20 bản ghi/lần
- Tìm kiếm theo tên lô đất (debounce 3s, max 500 ký tự) + Bộ lọc tìm kiếm
- Pull-to-Refresh (CMR-13)
- Xem chi tiết lô đất (read-only)
- Xem file đính kèm (CMR-08) sắp xếp theo ngày upload giảm dần
- State Persistence khi quay lại từ chi tiết
- Đa ngôn ngữ (CMR-17)
- Debounce Navigation & Khôi phục trạng thái force close (CMR-18)
- Xử lý partial load (một phần API fail không block toàn màn)
- Xử lý session 401 (refresh token, >15 ngày → redirect login)

### 1.3 Out of Scope
⚠️ Missing — Tài liệu không ghi rõ phần nào nằm ngoài phạm vi UC. Tuy nhiên, các phần này được hiểu là out-of-scope: (1) Tạo/Sửa/Xoá lô đất; (2) Đặt lịch xem đất; (3) Liên hệ chủ đầu tư. BA nên ghi rõ.

**Score: 4/5** ⚡ Partial

---

## 2. Actors & Stakeholders

| Actor | Type | Role & Permissions |
|-------|------|-------------------|
| Cá nhân / Tổ chức (đã đăng nhập) | Primary | Truy cập và sử dụng tất cả chức năng tra cứu, không phân biệt vai trò |

**Score: 8/10** ⚡ Partial
- Actor được xác định rõ (Primary user = cá nhân/tổ chức đã đăng nhập).
- Phân quyền ghi rõ "không phân biệt vai trò" — đủ cho client test.
- Vẫn cần xác nhận: **Q11 — Mọi vai trò đều thấy lô đất "Chưa công bố"?** Thông thường thông tin "Chưa công bố" chỉ dành cho admin/quản trị, cần BA xác nhận rõ ràng.

---

## 3. Preconditions & Postconditions

### 3.1 Preconditions
- ✅ Người dùng đã đăng nhập thành công vào ứng dụng Mobile
- ✅ Truy cập thông qua Sidebar → "Quản lý quỹ đất"
- ✅ Session hợp lệ (chưa quá 15 ngày — refresh token còn hiệu lực)

### 3.2 Postconditions
| After completing... | System state / Postcondition |
|--------------------|------------------------------|
| Xem danh sách | ✅ Danh sách hiển thị dạng Card, sắp xếp theo tên lô đất tăng dần, 20 bản ghi/lần |
| Tìm kiếm + Lọc | ✅ Kết quả hiển thị sau debounce/áp dụng, thỏa cả hai điều kiện |
| Pull-to-Refresh | ✅ Danh sách reload từ đầu (giữ bộ lọc/từ khóa hiện tại) |
| Xem chi tiết | ✅ Hiển thị thông tin chi tiết, null → "-" |
| Quay lại từ chi tiết | ✅ Danh sách giữ nguyên trạng thái tìm kiếm/lọc trước đó |
| Partial load fail | ✅ Phần load thành công vẫn hiển thị; phần fail hiển thị lỗi cục bộ kèm "Thử lại" |
| Session 401 | ✅ Auto refresh token; quá 15 ngày → redirect login + toast "Phiên đăng nhập hết hạn" |

**Score: 9/10** ✅ Nearly Complete
- *(v3 note: Tăng từ 7→9 do Q3 (partial load) và Q10 (session) đã được giải quyết rõ ràng.)*

---

## 4. UI Object Inventory & Mapping

### Màn hình 1: Danh sách quỹ đất (2.1)

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|----------------|------|--------|---------------|-------|
| 1 | Header "Quản lý quỹ đất" | Label | ✅ | ✅ | Tiêu đề trang (CMR-06) |
| 2 | Nút Quay lại (←) | Button (Icon) | ⚡ | ✅ | Chỉ mô tả tường minh ở màn chi tiết; CMR-06 áp dụng ngầm |
| 3 | Ô tìm kiếm | Textbox (Search) | ✅ | ✅ | Placeholder, debounce 3s, max 500 ký tự (CMR-01) |
| 4 | Nút "Lọc" | Button (Icon Filter) | ✅ | ✅ | Mở Bottom Sheet; badge đếm filter active (CMR-02) |
| 5-10 | Card lô đất (6 thành phần) | Mixed | ✅ | ✅ | Tên, Icon >, Vị trí, Diện tích, 2 Badge |
| 11 | Pull-to-Refresh gesture | Gesture | ✅ | — | v3 mới bổ sung (CMR-13) |

### Bottom Sheet — Bộ lọc tìm kiếm (8 thành phần)

| # | Component | Type | In UC? | Notes |
|---|-----------|------|--------|-------|
| 1 | Khu công nghiệp | Dropdown (Searchable) | ✅ | v3 mới: Searchable (CMR-03) |
| 2 | Diện tích (Từ) | Numeric Input | ✅ | Số nguyên dương, CMR-11 |
| 3 | Diện tích (Đến) | Numeric Input | ✅ | Validation Đến > Từ |
| 4 | Tình trạng quỹ đất | Dropdown | ✅ | Tất cả / Còn trống / Đã cho thuê |
| 5 | Tình trạng công bố | Dropdown | ✅ | Tất cả / Đã công bố / Chưa công bố |
| 6 | Nút "Nhập lại" | Button (Secondary) | ✅ | Reset filter, không đóng sheet |
| 7 | Nút "Áp dụng" | Button (Primary) | ✅ | v3 mới: Disabled khi validation fail |
| 8 | Nút "X" đóng | Button (Icon) | ✅ | Đóng sheet, không thay đổi kết quả |

### Màn hình 2: Chi tiết lô đất (15 thành phần)
*(Đầy đủ trong UC — Header, Thông tin quỹ đất, Hạ tầng & Hiện trạng, Trạng thái, Thông tin chi tiết, File đính kèm)*

### CMR Cross-Check

| CMR | Status | Notes |
|-----|--------|-------|
| CMR-01 (Search Box) | ✅ | Debounce 3s, max 500 ký tự, state persistence |
| CMR-02 (Search Filter) | ✅ | Bottom Sheet, nút Áp dụng/Nhập lại/X đóng |
| CMR-03 (Dropdown) | ✅ | v3: UC tham chiếu CMR-03 cho searchable dropdown KCN |
| CMR-04 (Lazy Load) | ✅ | 20 bản ghi/lần — đã fix tham chiếu |
| CMR-05 (Badge) | ⚡ Partial | Badge có mô tả màu sắc cụ thể nhưng không tham chiếu CMR-05 trực tiếp |
| CMR-06 (Header) | ✅ | Nút quay lại, tiêu đề trang |
| CMR-07 (Xử lý lỗi) | ✅ | Lỗi mạng, API 500, 404, timeout, 401 session expiry |
| CMR-08 (File viewer) | ✅ | Xem trực tiếp PDF/Image/Video |
| CMR-11 (Định dạng số) | ✅ | Diện tích format hàng nghìn |
| CMR-13 (Pull to Refresh) | ✅ | v3: Bổ sung Section 5.3 |
| CMR-14 (Empty State) | ✅ | v3: Đã fix tham chiếu sai (trước đây ghi CMR-16) |
| CMR-16 (API Performance) | ✅ | Timeout 10s |
| CMR-17 (Đa ngôn ngữ) | ✅ | v3: Bổ sung Section 5.4 |
| CMR-18 (Debounce Navigation) | ✅ | v3: Bổ sung Section 5.5 |

**Score: 13/15** ✅ Nearly Complete
- *(v3 note: Tăng từ 10→13 do Q1 (CMR-14), Q2 (CMR-13), Q5 (searchable dropdown CMR-03), Q6 (max length CMR-01) đã resolved; bổ sung CMR-17, CMR-18.)*

---

## 5. Object Attributes & Behavior Definition

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| Ô tìm kiếm | Enabled, Placeholder "Tìm kiếm tên lô đất...", **Max 500 ký tự** | Nhập text → debounce 3s → hiển thị kết quả. Xóa text → reset. Đạt 500 → block nhập thêm | Tìm kiếm like, không cần nhấn Enter |
| Nút "Lọc" | Enabled. **Badge đếm** khi có filter active (CMR-02) | Tap → mở Bottom Sheet | Indicator xanh lá khi filter active |
| Dropdown KCN | **Searchable** (CMR-03). Mặc định "Tất cả các KCN" | Tap → mở list có ô search → nhập keyword → chọn item → tự đóng | Sắp xếp A-Z, highlight option đã chọn |
| Diện tích (Từ/Đến) | Enabled. Placeholder "từ"/"đến" | Nhập số nguyên dương → CMR-11 format | Block ký tự non-numeric |
| Nút "Áp dụng" | **Disabled (grayed out)** khi validation fail (Đến < Từ); **Enabled** khi hợp lệ | Tap (khi enabled) → áp dụng filter + đóng Bottom Sheet | v3: Hành vi state rõ ràng |
| Card lô đất | Read-only | Tap → navigate chi tiết (có debounce double-tap CMR-18) | Hiển thị tên, vị trí, diện tích, 2 badge |
| File đính kèm | Read-only list, **sắp xếp theo ngày upload giảm dần** | Tap → mở file (CMR-08) | Empty state CMR-14 khi 0 file |
| Pull-to-Refresh | Enabled ở đầu danh sách | Kéo xuống → spinner → reload toàn bộ (giữ filter/keyword) | Không trigger duplicate khi đang loading |
| Thời hạn thuê (chi tiết) | Read-only, **text tự do** | — | User input sao hiển thị vậy; null → "-"; nếu input "0" thì hiển thị "0" |

### Edge Case Checklist (Client-focused)

**Group A — Extreme Data States (client hiển thị):**
- ✅ Tên/Vị trí overflow → truncate 2 dòng
- ⚡ Diện tích = 0 → hiển thị "0" (theo CMR-11 format)
- ✅ Danh sách rỗng → empty state "Không có dữ liệu." (CMR-14)
- ✅ Null data → "-" cho chi tiết
- ✅ Tên lô đất/vị trí/thời hạn thuê null → "-"
- ✅ Badge null → ẩn badge

**Group B — Network & API States (hành vi client khi gặp lỗi):**
- ✅ API chậm → loading indicator (first-load toàn màn; sau đó spinner cục bộ)
- ✅ Timeout 10s → thông báo + "Thử lại" (CMR-07)
- ✅ Partial load fail → không block toàn màn, hiển thị partial (Section 3.4)
- ✅ 401 session expiry → auto refresh token; >15 ngày → redirect login

**Group C — Abnormal User Interactions (client):**
- ✅ Double-tap Card lô đất → debounce navigation (CMR-18)
- ⚠️ **Q9 — Android Back button khi Bottom Sheet mở**: UC có mô tả debounce navigation chung (Section 5.5) nhưng không mô tả cụ thể hành vi Back button khi Bottom Sheet đang mở (đóng sheet hay thoát màn?)
- ✅ Pull-to-Refresh + Lazy load đồng thời → không duplicate API (CMR-13)

**Group D — Permissions & Session (client):**
- ✅ Session hết hạn → refresh token hoặc redirect login
- ⚠️ **Q11 — Phân quyền "Chưa công bố"**: Mọi vai trò đều thấy lô đất "Chưa công bố"? Cần BA xác nhận rõ.

**Group E — Input Boundary:**
- ✅ Ô tìm kiếm: max 500 ký tự (CMR-01)
- ⚠️ **Q7 — Diện tích min/max value**: UC chỉ nói "số nguyên dương" + CMR-11 max length 500 ký tự. Không rõ min (0 hay 1?) và max cụ thể

**Score: 17/20** ✅ Nearly Complete
- *(v3 note: Tăng từ 14→17. Q4 (Disabled), Q5 (Searchable), Q6 (max length), Q8 (debounce), Q14 (thời hạn thuê), Q15 (file sort) đều đã resolved. Còn 3 câu Open Medium: Q7, Q9, Q11.)*

---

## 6. Functional Logic & Workflow Decomposition

### 6.1 Function: Tải danh sách quỹ đất

**Main Flow:** Sidebar → "Quản lý quỹ đất" → first-load loading toàn màn → Danh sách Card (sort A-Z, lazy load 20) → ✅ Rõ ràng
**Lazy Load:** Cuộn đến cuối → tự động tải 20 bản ghi tiếp theo → spinner cục bộ → ✅
**Empty State:** 0 bản ghi → "Không có dữ liệu." (CMR-14) → ✅
**Pull-to-Refresh:** Kéo xuống → reload toàn bộ (giữ filter/keyword) → ✅ (v3 mới)
**Error Flow (client):** Timeout 10s → thông báo + "Thử lại" (CMR-07); Lỗi mạng → CMR-07; 401 → refresh token / redirect → ✅
**Partial load:** Danh sách OK nhưng dropdown KCN fail → vẫn hiển thị danh sách, dropdown hiển thị empty option → ✅ (v3 mới)

### 6.2 Function: Tìm kiếm & Lọc

**Search Main Flow:** Nhập từ khóa (max 500 ký tự) → debounce 3s → kết quả → ✅
**Search Alternative:** Xóa text → reset mặc định → ✅
**Filter Flow:** Mở Bottom Sheet → chỉnh tiêu chí → Áp dụng/Nhập lại/Đóng → ✅
**Dropdown KCN (Searchable):** Tap → mở list có ô search → nhập keyword → chọn item → tự đóng → ✅ (v3 mới)
**Validation:** Đến < Từ → inline error + **nút Áp dụng disabled grayed out** → ✅ (v3 mới)
**Empty result:** "Không tìm thấy kết quả." (CMR-14) → ✅
**Kết hợp Search + Filter:** Thỏa cả hai điều kiện → ✅
**State Persistence:** Giữ trạng thái sau khi quay lại từ chi tiết → ✅

**Remaining Gaps:**
- ⚠️ Min/max value diện tích (Q7)

### 6.3 Function: Xem chi tiết lô đất

**Main Flow:** Tap Card → loading → hiển thị chi tiết (read-only) → ✅
**Debounce double-tap:** Tap nhanh liên tục → chỉ navigate 1 lần (CMR-18) → ✅ (v3 mới)
**Null handling:** null → "-"; badge null → ẩn → ✅
**Text overflow:** Wrap text (khác với Card truncate) → ✅
**Thời hạn thuê:** Text tự do, user input sao hiển thị vậy; null → "-" → ✅ (v3 — Q14 answered via chat)
**File đính kèm:** Sắp xếp theo ngày upload giảm dần; tap → mở theo CMR-08; 0 file → empty state CMR-14 → ✅ (v3 mới)
**Error (client):** CMR-07; 404 → "Lô đất không tồn tại..." → ✅
**Back navigation:** Giữ state search/filter → ✅

**Score: 18/20** ✅ Nearly Complete
- *(v3 note: Tăng từ 15→18. Q1 (CMR-14), Q2 (Pull-to-Refresh), Q3 (Partial load), Q4 (Disabled state), Q5 (Searchable), Q6 (Max length), Q8 (Debounce), Q10 (Session), Q14 (Thời hạn thuê), Q15 (File sort) đều đã resolved.)*

---

## 7. Functional Integration Analysis

| Trigger / Action | Impact (Client behavior) | Status |
|-----------------|--------------------------|--------|
| Search + Filter kết hợp | Kết quả thỏa cả hai (CMR-01) | ✅ |
| Chi tiết → Quay lại | Giữ state search/filter | ✅ |
| Lazy load + Filter mới | Filter mới → reset lazy load từ đầu | ⚡ Cần xác nhận (nên suy luận: reset) |
| Pull to Refresh + active filter | Reload toàn bộ giữ nguyên filter/keyword hiện tại | ✅ (v3 mới) |
| Pull to Refresh đồng thời Lazy load | Không trigger duplicate (CMR-13) | ✅ |
| 401 session expiry khi đang xem | Auto refresh token; >15 ngày → redirect login | ✅ (v3 mới) |
| Partial API fail | Phần thành công vẫn hiển thị; phần fail → lỗi cục bộ | ✅ (v3 mới) |
| Double-tap Card | Debounce navigation → chỉ mở 1 lần (CMR-18) | ✅ (v3 mới) |
| Force close → mở lại | Giữ session, quay về Trang chủ (CMR-18) | ✅ (v3 mới) |
| Đa ngôn ngữ | Text cứng đổi theo ngôn ngữ; dữ liệu API giữ nguyên bản (CMR-17) | ✅ (v3 mới) |

**Score: 8/10** ✅ Nearly Complete
- *(v3 note: Tăng từ 6→8. Tích hợp partial load, session, debounce navigation, đa ngôn ngữ đã rõ ràng.)*

---

## 8. Acceptance Criteria

Từ v1 có 13 AC. V3 bổ sung thêm các AC suy luận được:
- AC-14: Pull-to-Refresh reload đúng dữ liệu giữ filter
- AC-15: Dropdown KCN searchable — nhập keyword → danh sách option filter
- AC-16: Nút "Áp dụng" disabled khi Đến < Từ
- AC-17: Double-tap Card → chỉ mở màn chi tiết 1 lần
- AC-18: Partial load — UI hiển thị phần thành công + lỗi cục bộ
- AC-19: Session 401 — auto refresh; >15 ngày → redirect login + toast
- AC-20: Ô tìm kiếm — nhập tới 500 ký tự → block nhập thêm
- AC-21: File đính kèm sắp xếp theo ngày upload giảm dần

**Score: 8/10** ✅ Nearly Complete
- *(v3 note: Tăng từ 7→8. Nhiều AC mới có thể suy luận.)*

---

## 9. Non-functional Requirements

| Category | Requirement | Source |
|----------|-------------|-------|
| Performance (client) | Loading indicator cho mọi API call; first-load toàn màn, sau đó spinner cục bộ | CMR-07 |
| Performance (client) | Timeout 10s → hiển thị lỗi kèm "Thử lại" | CMR-07, CMR-16 |
| Performance (client) | Lazy load 20 bản ghi/lần | CMR-04 |
| Performance (client) | Debounce navigation cho double-tap | CMR-18 |
| UX (client) | Pull-to-Refresh (CMR-13) | UC v3 Section 5.3 |
| Security (client) | Session 401 → auto refresh token; >15 ngày → redirect login | CMR-07 v1.1, UC v3 Section 3.3 |
| Compatibility (client) | Portrait mode Mobile | UC 0.Metadata |
| i18n (client) | 5 ngôn ngữ cho text cứng; dữ liệu API giữ nguyên bản | CMR-17 |
| File Viewing (client) | Mở PDF/Image/Video trực tiếp; tải xuống định dạng khác | CMR-08 |
| ⚠️ Accessibility | Không đề cập | Missing |

**Score: 4/5** ⚡ Partial
- *(v3 note: Giữ nguyên 4/5. Accessibility vẫn chưa có. Security, i18n, Performance đã đầy đủ.)*

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | v1 | v2 | v3 | Status |
|---|---------------|---------|-----|-----|-----|--------|
| 1 | Feature Identity | 5 | 4 | 4 | **5** | ✅ Complete |
| 2 | Objective & Scope | 5 | 4 | 4 | 4 | ⚡ Partial |
| 3 | Actors & User Roles | 10 | 7 | 8 | 8 | ⚡ Partial |
| 4 | Preconditions & Postconditions | 10 | 6 | 7 | **9** | ✅ Nearly Complete |
| 5 | UI Object Inventory & Mapping | 15 | 10 | 10 | **13** | ✅ Nearly Complete |
| 6 | Object Attributes & Behavior Definition | 20 | 12 | 14 | **17** | ✅ Nearly Complete |
| 7 | Functional Logic & Workflow Decomposition | 20 | 14 | 15 | **18** | ✅ Nearly Complete |
| 8 | Functional Integration Analysis | 10 | 6 | 6 | **8** | ✅ Nearly Complete |
| 9 | Acceptance Criteria | 10 | 7 | 7 | **8** | ✅ Nearly Complete |
| 10 | Non-functional Requirements | 5 | 3 | 4 | 4 | ⚡ Partial |
| **Total** | | **110** | **73** | **79** | **94/110** | **→ 85.5/100** |

> **Công thức:** 5+4+8+9+13+17+18+8+8+4 = **94/110** → Normalized = round((94/110) × 100, 1) = **85.5/100**
>
> **Verdict:** 85.5 ≥ 85 → ✅ **READY** (gần chạm ngưỡng trên). Kết luận: ⚡ **CONDITIONALLY READY** vì vẫn còn 3 câu hỏi Medium open (Q7, Q9, Q11) chưa được giải quyết trong doc.

---

## 📋 Unified Gap & Question Report

### Open Questions (3 câu — đều Medium)

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q7 | Medium | Section 2.1 — Bộ lọc Diện tích | Diện tích (Từ) và Diện tích (Đến): UC chỉ ghi "số nguyên dương" + CMR-11 (max length mặc định 500 ký tự). **Min** là 0 hay 1? **Max** value cụ thể là bao nhiêu? | Client cần validate boundary value để QA test min/max | Open |
| Q9 | Medium | Section 5.5 | Android Back button vật lý khi Bottom Sheet bộ lọc đang mở → **đóng Bottom Sheet** hay **thoát màn hình**? Section 5.5 có debounce navigation nhưng không mô tả cụ thể hành vi Back button khi có overlay/Bottom Sheet. | Client behavior trên Android cần đúng platform convention | Open |
| Q11 | Medium | Section 1 — Phân quyền | UC ghi "không phân biệt vai trò". Vậy mọi người dùng đều thấy lô đất **"Chưa công bố"**? Thông thường thông tin "Chưa công bố" chỉ dành cho admin/quản trị — cần BA xác nhận rõ. | Nếu sai, client hiển thị dữ liệu không nên thấy → lỗ hổng UX/phân quyền | Open |

### Resolved Questions (11 câu)

| ID | Priority | Resolution Source | Resolution |
|----|----------|-------------------|-----------|
| Q1 | High | UC v3 Section 2.1, 5.1, 5.2 | ✅ Sửa tham chiếu sai CMR-16 → CMR-14 cho empty state |
| Q2 | High | UC v3 Section 5.3 | ✅ Bổ sung Pull-to-Refresh theo CMR-13 |
| Q3 | Medium | UC v3 Section 3.4 | ✅ Partial load — không block toàn màn; phần thành công vẫn hiển thị, phần fail hiển thị lỗi cục bộ |
| Q4 | Medium | UC v3 Section 2.1 Bảng Bottom Sheet | ✅ Nút "Áp dụng" **Disabled (grayed out)** khi validation fail; Enabled khi hợp lệ |
| Q5 | Medium | UC v3 Section 2.1 — Dropdown KCN | ✅ Dropdown KCN là **Searchable dropdown** (Single-selection, Searchable), tham chiếu CMR-03 |
| Q6 | Medium | UC v3 Section 2.1 — Ô tìm kiếm | ✅ Max length **500 ký tự** (CMR-01) |
| Q8 | Medium | UC v3 Section 5.5 | ✅ Debounce navigation cho double-tap Card và các nút navigation (CMR-18) |
| Q10 | Medium | UC v3 Section 3.3 | ✅ Session 401 → auto refresh token; refresh token >15 ngày hoặc không hợp lệ → redirect login + toast "Phiên đăng nhập hết hạn" |
| Q13 | Low | Answer từ BA (v2) | ✅ Không cần hiển thị đơn vị diện tích "m²" trên Card và màn chi tiết |
| Q14 | Low | BA trả lời qua chat (08/05/2026) | ✅ Thời hạn thuê là **text tự do** — user input sao thì hiển thị vậy. Null → "-" |
| Q15 | Low | UC v3 Section 2.2.6 | ✅ File đính kèm sắp xếp theo **ngày upload giảm dần** (mới nhất trên cùng); cùng thời điểm → thứ tự tạo |

---

## 🟢 What's Good

- ✅ **Feature Identity rõ ràng:** UC-ID, tên chức năng, phân hệ, đối tượng thực hiện được ghi đầy đủ
- ✅ **Giao diện mô tả chi tiết:** Bảng mô tả UI cho cả 2 màn hình rất chi tiết
- ✅ **Null handling nhất quán:** Tất cả trường chi tiết có quy tắc null → "-"
- ✅ **State Persistence:** Giữ trạng thái search/filter khi quay lại
- ✅ **Validation diện tích:** Mô tả cụ thể Đến > Từ kèm inline error + **nút Áp dụng disabled state** (v3)
- ✅ **Error handling (client):** Thông báo lỗi rõ ràng theo CMR-07 (mạng, 500, 404, timeout, **401 session**)
- ✅ **Badge trạng thái:** Mô tả chi tiết màu sắc cho từng trạng thái
- ✅ **File viewer:** Tham chiếu CMR-08 đầy đủ cho từng loại file + **sắp xếp rõ** (v3)
- ✅ **Pull-to-Refresh:** v3 bổ sung Section 5.3 theo CMR-13
- ✅ **Partial Load:** v3 bổ sung Section 3.4 xử lý rõ ràng
- ✅ **Searchable Dropdown KCN:** v3 tham chiếu CMR-03 đầy đủ
- ✅ **Debounce Navigation:** v3 bổ sung Section 5.5 theo CMR-18
- ✅ **Đa ngôn ngữ:** v3 bổ sung Section 5.4 theo CMR-17

---

## 🧪 Testability Outlook

**What CAN be tested now (client-side):**
- Happy path: Tải danh sách, tìm kiếm, lọc, xem chi tiết, quay lại
- Validation: Diện tích Đến > Từ, inline error, **nút Áp dụng disabled**
- Empty state: "Không có dữ liệu." (no data) và "Không tìm thấy kết quả." (no result)
- Null handling: "-" cho null, badge ẩn khi null
- Badge display: Màu sắc đúng theo trạng thái, read-only
- Lazy load: 20 bản ghi/lần, loading indicator, hết data
- State Persistence: Search/filter/scroll giữ khi quay lại
- Pull-to-Refresh: Kéo xuống → reload (giữ filter/keyword)
- Error display (client): Timeout, lỗi mạng, 500, 404, **401 session expiry**
- Partial load: Phần thành công + phần lỗi hiển thị song song
- File attachment: Mở/download đúng loại file (CMR-08); **sắp xếp theo ngày upload giảm dần**
- UI/UX: Truncate, wrap text, format số, header/navigation
- Search box: Max 500 ký tự, debounce 3s
- Searchable dropdown KCN: Nhập keyword → filter options
- Double-tap debounce: Card và buttons navigation
- Thời hạn thuê: Text tự do, hiển thị nguyên input
- Đa ngôn ngữ: Text cứng theo ngôn ngữ, data API nguyên bản

**What CANNOT be tested yet (blocked by remaining gaps):**
- ⚠️ Boundary value diện tích — min/max (Q7)
- ⚠️ Android Back button khi Bottom Sheet đang mở (Q9)
- ⚠️ Phân quyền hiển thị lô đất "Chưa công bố" (Q11)

**Suggested test focus areas:**
- Happy path: Danh sách → Tìm kiếm → Lọc (searchable KCN) → Chi tiết → Quay lại
- Alternative: Pull-to-Refresh, reset filter, xóa search text, đóng Bottom Sheet bằng X/vùng ngoài
- Boundary: Diện tích Từ/Đến (=, +1, -1), lazy load (20, 21, 1, 0), search 500 ký tự
- Error display: Timeout, network, 500, 404, 401 session expiry
- State: Nút "Áp dụng" disabled ↔ enabled khi validation fail/pass
- Edge case: Double-tap Card, pull-to-refresh + lazy load concurrent, partial API fail
- UI checks: Truncate, badge color, null display, loading indicator (first-load toàn màn vs cục bộ)
- CMR compliance: CMR-01, CMR-02, CMR-03, CMR-04, CMR-05, CMR-06, CMR-07, CMR-08, CMR-11, CMR-13, CMR-14, CMR-16, CMR-17, CMR-18
- i18n: Switch ngôn ngữ → text cứng đổi, data API nguyên bản
- Session: Mock 401 → auto refresh token; mock >15 ngày → redirect login

---

## 📌 Summary & Recommendation

**v3 re-audit** sau khi BA update doc UC40 theo question backlog: Điểm tăng từ **71.8 → 85.5/100** (CONDITIONALLY READY, gần ngưỡng READY). BA đã giải quyết **11/14 câu hỏi** từ backlog v2:
- **2 câu High:** Q1 (CMR-14 empty state), Q2 (Pull-to-Refresh CMR-13) — đều đã resolved
- **6 câu Medium:** Q3 (Partial load), Q4 (Disabled state), Q5 (Searchable KCN), Q6 (Max length), Q8 (Debounce), Q10 (Session) — đều đã resolved
- **3 câu Low:** Q13 (unit diện tích), Q14 (Thời hạn thuê text tự do — BA trả lời qua chat), Q15 (File sort) — đều đã resolved

Doc BA v3 còn **3 câu Medium open** (Q7 min/max diện tích, Q9 Android Back + Bottom Sheet, Q11 phân quyền "Chưa công bố") — đều không block happy path test design.

**Recommendation:**
- ✅ **QA CÓ THỂ BẮT ĐẦU THIẾT KẾ TEST CASE ngay** cho happy path, alternative flow, validation, UI/UX, error display, i18n, session — chiếm ~90% scope.
- ⚠️ Đưa 3 câu hỏi Medium còn lại (Q7, Q9, Q11) vào **parking lot** — thiết kế test cases placeholder cho các scenario này, hoàn thiện khi BA trả lời.
- 📝 Đề xuất BA bổ sung: (1) Boundary value cho diện tích Từ/Đến; (2) Hành vi Android Back button khi Bottom Sheet mở; (3) Xác nhận phân quyền xem "Chưa công bố" (nếu cần restrict, bổ sung logic phân quyền vào UC).

---

## 11. Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|-------------------|
| v1 | 2026-05-08 | QC Review Agent | First audit — UC40 v2. Score 66.4/100 (NOT READY). 15 open questions. |
| v2 | 2026-05-08 | QC Review Agent | Re-audit với phạm vi "Mobile Client only". Loại bỏ Q12 (API endpoint — backend scope). Hạ mức Q3 từ High→Medium. Score 71.8/100 (CONDITIONALLY READY). 14 câu hỏi Open. |
| v3 | 2026-05-08 | QC Review Agent | Re-audit sau khi BA update UC v3 theo question backlog. **11/14 câu đã resolved:** Q1, Q2 (High); Q3, Q4, Q5, Q6, Q8, Q10 (Medium); Q13 (v2), Q14 (chat), Q15 (Low). **3 câu Medium còn Open:** Q7, Q9, Q11. Score tăng từ 71.8 → **85.5/100** (CONDITIONALLY READY, gần ngưỡng READY). QA có thể bắt đầu test design cho ~90% scope. |

---

*UC Readiness Template v3.0 — For QA Test Design*
