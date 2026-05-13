# UC Readiness Review
**Functional / Black-box Test Readiness Template**

**Tiêu đề:** UC40 — Tra cứu thông tin quỹ đất trong KCN trên Mobile — Audit Report
**Ngày tạo:** 08/05/2026
**Tác giả:** QC Review Agent
**Phiên bản:** v4

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
- **Lọc** theo nhiều tiêu chí: Khu công nghiệp (searchable dropdown), Diện tích (Từ-Đến, min=1, max=số có 500 chữ số), Tình trạng quỹ đất, Tình trạng công bố
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
| **88.2 / 100** | ✅ **READY** |

> Tài liệu v3 đã giải quyết **12/14 câu hỏi** từ backlog. Còn **2 câu Medium open** (Q9, Q11) không block happy path — QA có thể thiết kế test case đầy đủ cho ~95% scope.

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| UC40 | Tra cứu thông tin quỹ đất trong KCN | v3 | ✅ Complete |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------|
| han.luong | ⚡ Partial — Không ghi người phê duyệt | 29/04/2026 | 08/05/2026 |

**Score: 5/5** ✅ Complete

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
| 1 | Khu công nghiệp | Dropdown (Searchable) | ✅ | Searchable (CMR-03) |
| 2 | Diện tích (Từ) | Numeric Input | ✅ | Số nguyên dương, **min=1, max=số có 500 chữ số** (v4 Q7 answered) |
| 3 | Diện tích (Đến) | Numeric Input | ✅ | Validation Đến > Từ |
| 4 | Tình trạng quỹ đất | Dropdown | ✅ | Tất cả / Còn trống / Đã cho thuê |
| 5 | Tình trạng công bố | Dropdown | ✅ | Tất cả / Đã công bố / Chưa công bố |
| 6 | Nút "Nhập lại" | Button (Secondary) | ✅ | Reset filter, không đóng sheet |
| 7 | Nút "Áp dụng" | Button (Primary) | ✅ | Disabled (grayed out) khi validation fail |
| 8 | Nút "X" đóng | Button (Icon) | ✅ | Đóng sheet, không thay đổi kết quả |

### Màn hình 2: Chi tiết lô đất (15 thành phần)
*(Đầy đủ trong UC — Header, Thông tin quỹ đất, Hạ tầng & Hiện trạng, Trạng thái, Thông tin chi tiết, File đính kèm)*

### CMR Cross-Check

| CMR | Status | Notes |
|-----|--------|-------|
| CMR-01 (Search Box) | ✅ | Debounce 3s, max 500 ký tự, state persistence |
| CMR-02 (Search Filter) | ✅ | Bottom Sheet, nút Áp dụng/Nhập lại/X đóng |
| CMR-03 (Dropdown) | ✅ | UC tham chiếu CMR-03 cho searchable dropdown KCN |
| CMR-04 (Lazy Load) | ✅ | 20 bản ghi/lần |
| CMR-05 (Badge) | ⚡ Partial | Badge có mô tả màu sắc cụ thể nhưng không tham chiếu CMR-05 trực tiếp |
| CMR-06 (Header) | ✅ | Nút quay lại, tiêu đề trang |
| CMR-07 (Xử lý lỗi) | ✅ | Lỗi mạng, API 500, 404, timeout, 401 session expiry |
| CMR-08 (File viewer) | ✅ | Xem trực tiếp PDF/Image/Video |
| CMR-11 (Định dạng số) | ✅ | Diện tích format hàng nghìn, max length 500 ký tự số |
| CMR-13 (Pull to Refresh) | ✅ | Bổ sung Section 5.3 |
| CMR-14 (Empty State) | ✅ | Đã fix tham chiếu sai (trước đây ghi CMR-16) |
| CMR-16 (API Performance) | ✅ | Timeout 10s |
| CMR-17 (Đa ngôn ngữ) | ✅ | Bổ sung Section 5.4 |
| CMR-18 (Debounce Navigation) | ✅ | Bổ sung Section 5.5 |

**Score: 13/15** ✅ Nearly Complete

---

## 5. Object Attributes & Behavior Definition

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| Ô tìm kiếm | Enabled, Placeholder "Tìm kiếm tên lô đất...", **Max 500 ký tự** | Nhập text → debounce 3s → hiển thị kết quả. Xóa text → reset. Đạt 500 → block nhập thêm | Tìm kiếm like, không cần nhấn Enter |
| Nút "Lọc" | Enabled. **Badge đếm** khi có filter active (CMR-02) | Tap → mở Bottom Sheet | Indicator xanh lá khi filter active |
| Dropdown KCN | **Searchable** (CMR-03). Mặc định "Tất cả các KCN" | Tap → mở list có ô search → nhập keyword → chọn item → tự đóng | Sắp xếp A-Z, highlight option đã chọn |
| Diện tích (Từ/Đến) | Enabled. Placeholder "từ"/"đến". **Min=1, Max=số có 500 chữ số** (v4 Q7) | Nhập số nguyên dương → CMR-11 format | Block ký tự non-numeric, block 0 và số âm; block nhập quá 500 chữ số |
| Nút "Áp dụng" | **Disabled (grayed out)** khi validation fail (Đến < Từ); **Enabled** khi hợp lệ | Tap (khi enabled) → áp dụng filter + đóng Bottom Sheet | Hành vi state rõ ràng |
| Card lô đất | Read-only | Tap → navigate chi tiết (có debounce double-tap CMR-18) | Hiển thị tên, vị trí, diện tích, 2 badge |
| File đính kèm | Read-only list, **sắp xếp theo ngày upload giảm dần** | Tap → mở file (CMR-08) | Empty state CMR-14 khi 0 file |
| Pull-to-Refresh | Enabled ở đầu danh sách | Kéo xuống → spinner → reload toàn bộ (giữ filter/keyword) | Không trigger duplicate khi đang loading |
| Thời hạn thuê (chi tiết) | Read-only, **text tự do** | — | User input sao hiển thị vậy; null → "-"; nếu input "0" thì hiển thị "0" |

### Edge Case Checklist (Client-focused)

**Group A — Extreme Data States (client hiển thị):**
- ✅ Tên/Vị trí overflow → truncate 2 dòng
- ✅ Diện tích = 0 → không cho nhập ở ô filter (Q7: min=1, 0 không phải số nguyên dương); hiển thị = 0 chỉ khi BE trả về giá trị cũ
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
- ✅ **Diện tích min=1, max=số có 500 chữ số** (Q7 answered v4). Nhập 0 hoặc số âm → block; Nhập đúng 500 chữ số → accept; cố nhập chữ số thứ 501 → block.

**Score: 18/20** ✅ Nearly Complete
- *(v4 note: Tăng từ 17→18. Q7 (Boundary diện tích) đã resolved. Còn 2 câu Open Medium: Q9, Q11.)*

---

## 6. Functional Logic & Workflow Decomposition

### 6.1 Function: Tải danh sách quỹ đất

**Main Flow:** Sidebar → "Quản lý quỹ đất" → first-load loading toàn màn → Danh sách Card (sort A-Z, lazy load 20) → ✅ Rõ ràng
**Lazy Load:** Cuộn đến cuối → tự động tải 20 bản ghi tiếp theo → spinner cục bộ → ✅
**Empty State:** 0 bản ghi → "Không có dữ liệu." (CMR-14) → ✅
**Pull-to-Refresh:** Kéo xuống → reload toàn bộ (giữ filter/keyword) → ✅
**Error Flow (client):** Timeout 10s → thông báo + "Thử lại" (CMR-07); Lỗi mạng → CMR-07; 401 → refresh token / redirect → ✅
**Partial load:** Danh sách OK nhưng dropdown KCN fail → vẫn hiển thị danh sách, dropdown hiển thị empty option → ✅

### 6.2 Function: Tìm kiếm & Lọc

**Search Main Flow:** Nhập từ khóa (max 500 ký tự) → debounce 3s → kết quả → ✅
**Search Alternative:** Xóa text → reset mặc định → ✅
**Filter Flow:** Mở Bottom Sheet → chỉnh tiêu chí → Áp dụng/Nhập lại/Đóng → ✅
**Dropdown KCN (Searchable):** Tap → mở list có ô search → nhập keyword → chọn item → tự đóng → ✅
**Validation Diện tích Boundary (v4):** Min=1, Max=số có 500 chữ số. Nhập 0 hoặc số âm → block. Nhập >500 chữ số → block → ✅
**Validation logic:** Đến < Từ → inline error + **nút Áp dụng disabled grayed out** → ✅
**Empty result:** "Không tìm thấy kết quả." (CMR-14) → ✅
**Kết hợp Search + Filter:** Thỏa cả hai điều kiện → ✅
**State Persistence:** Giữ trạng thái sau khi quay lại từ chi tiết → ✅

### 6.3 Function: Xem chi tiết lô đất

**Main Flow:** Tap Card → loading → hiển thị chi tiết (read-only) → ✅
**Debounce double-tap:** Tap nhanh liên tục → chỉ navigate 1 lần (CMR-18) → ✅
**Null handling:** null → "-"; badge null → ẩn → ✅
**Text overflow:** Wrap text (khác với Card truncate) → ✅
**Thời hạn thuê:** Text tự do, user input sao hiển thị vậy; null → "-" → ✅
**File đính kèm:** Sắp xếp theo ngày upload giảm dần; tap → mở theo CMR-08; 0 file → empty state CMR-14 → ✅
**Error (client):** CMR-07; 404 → "Lô đất không tồn tại..." → ✅
**Back navigation:** Giữ state search/filter → ✅

**Score: 19/20** ✅ Complete
- *(v4 note: Tăng từ 18→19. Q7 boundary diện tích đã rõ ràng đủ để test design đầy đủ.)*

---

## 7. Functional Integration Analysis

| Trigger / Action | Impact (Client behavior) | Status |
|-----------------|--------------------------|--------|
| Search + Filter kết hợp | Kết quả thỏa cả hai (CMR-01) | ✅ |
| Chi tiết → Quay lại | Giữ state search/filter | ✅ |
| Lazy load + Filter mới | Filter mới → reset lazy load từ đầu | ⚡ Cần xác nhận (nên suy luận: reset) |
| Pull to Refresh + active filter | Reload toàn bộ giữ nguyên filter/keyword hiện tại | ✅ |
| Pull to Refresh đồng thời Lazy load | Không trigger duplicate (CMR-13) | ✅ |
| 401 session expiry khi đang xem | Auto refresh token; >15 ngày → redirect login | ✅ |
| Partial API fail | Phần thành công vẫn hiển thị; phần fail → lỗi cục bộ | ✅ |
| Double-tap Card | Debounce navigation → chỉ mở 1 lần (CMR-18) | ✅ |
| Force close → mở lại | Giữ session, quay về Trang chủ (CMR-18) | ✅ |
| Đa ngôn ngữ | Text cứng đổi theo ngôn ngữ; dữ liệu API giữ nguyên bản (CMR-17) | ✅ |

**Score: 8/10** ✅ Nearly Complete

---

## 8. Acceptance Criteria

Từ v1 có 13 AC. V4 có thể bổ sung:
- AC-14: Pull-to-Refresh reload đúng dữ liệu giữ filter
- AC-15: Dropdown KCN searchable — nhập keyword → danh sách option filter
- AC-16: Nút "Áp dụng" disabled khi Đến < Từ
- AC-17: Double-tap Card → chỉ mở màn chi tiết 1 lần
- AC-18: Partial load — UI hiển thị phần thành công + lỗi cục bộ
- AC-19: Session 401 — auto refresh; >15 ngày → redirect login + toast
- AC-20: Ô tìm kiếm — nhập tới 500 ký tự → block nhập thêm
- AC-21: File đính kèm sắp xếp theo ngày upload giảm dần
- **AC-22 (v4): Diện tích Từ/Đến — nhập 0 hoặc số âm → block, min=1**
- **AC-23 (v4): Diện tích Từ/Đến — nhập đúng 500 chữ số → accept; cố nhập chữ số 501 → block**

**Score: 9/10** ✅ Complete
- *(v4 note: Tăng từ 8→9. Bổ sung 2 AC boundary cho diện tích.)*

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
- *(v4 note: Giữ nguyên 4/5. Accessibility vẫn chưa có.)*

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | v1 | v2 | v3 | v4 | Status |
|---|---------------|---------|-----|-----|-----|-----|--------|
| 1 | Feature Identity | 5 | 4 | 4 | 5 | 5 | ✅ Complete |
| 2 | Objective & Scope | 5 | 4 | 4 | 4 | 4 | ⚡ Partial |
| 3 | Actors & User Roles | 10 | 7 | 8 | 8 | 8 | ⚡ Partial |
| 4 | Preconditions & Postconditions | 10 | 6 | 7 | 9 | 9 | ✅ Nearly Complete |
| 5 | UI Object Inventory & Mapping | 15 | 10 | 10 | 13 | 13 | ✅ Nearly Complete |
| 6 | Object Attributes & Behavior Definition | 20 | 12 | 14 | 17 | **18** | ✅ Nearly Complete |
| 7 | Functional Logic & Workflow Decomposition | 20 | 14 | 15 | 18 | **19** | ✅ Complete |
| 8 | Functional Integration Analysis | 10 | 6 | 6 | 8 | 8 | ✅ Nearly Complete |
| 9 | Acceptance Criteria | 10 | 7 | 7 | 8 | **9** | ✅ Complete |
| 10 | Non-functional Requirements | 5 | 3 | 4 | 4 | 4 | ⚡ Partial |
| **Total** | | **110** | **73** | **79** | **94** | **97/110** | **→ 88.2/100** |

> **Công thức:** 5+4+8+9+13+18+19+8+9+4 = **97/110** → Normalized = round((97/110) × 100, 1) = **88.2/100**
>
> **Verdict:** 88.2 ≥ 85 → ✅ **READY**

---

## 📋 Unified Gap & Question Report

### Open Questions (2 câu Medium)

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q9 | Medium | Section 5.5 | Android Back button vật lý khi Bottom Sheet bộ lọc đang mở → **đóng Bottom Sheet** hay **thoát màn hình**? | Client behavior trên Android cần đúng platform convention | Open |
| Q11 | Medium | Section 1 — Phân quyền | UC ghi "không phân biệt vai trò". Vậy mọi người dùng đều thấy lô đất **"Chưa công bố"**? | Nếu sai, client hiển thị dữ liệu không nên thấy → lỗ hổng UX/phân quyền | Open |

### Resolved Questions (12 câu)

| ID | Priority | Resolution Source | Resolution |
|----|----------|-------------------|-----------|
| Q1 | High | UC v3 Section 2.1, 5.1, 5.2 | ✅ Sửa tham chiếu sai CMR-16 → CMR-14 cho empty state |
| Q2 | High | UC v3 Section 5.3 | ✅ Bổ sung Pull-to-Refresh theo CMR-13 |
| Q3 | Medium | UC v3 Section 3.4 | ✅ Partial load — không block toàn màn; phần thành công vẫn hiển thị, phần fail hiển thị lỗi cục bộ |
| Q4 | Medium | UC v3 Section 2.1 Bảng Bottom Sheet | ✅ Nút "Áp dụng" **Disabled (grayed out)** khi validation fail |
| Q5 | Medium | UC v3 Section 2.1 — Dropdown KCN | ✅ Dropdown KCN là **Searchable dropdown**, tham chiếu CMR-03 |
| Q6 | Medium | UC v3 Section 2.1 — Ô tìm kiếm | ✅ Max length **500 ký tự** (CMR-01) |
| Q7 | Medium | **BA chat 2026-05-08** | ✅ **Min=1** (số 0 không phải số nguyên dương); **Max = số có 500 chữ số** (CMR-11 max length mặc định) |
| Q8 | Medium | UC v3 Section 5.5 | ✅ Debounce navigation cho double-tap (CMR-18) |
| Q10 | Medium | UC v3 Section 3.3 | ✅ Session 401 → auto refresh token; >15 ngày → redirect login + toast |
| Q13 | Low | Answer từ BA (v2) | ✅ Không cần hiển thị đơn vị diện tích "m²" trên Card và màn chi tiết |
| Q14 | Low | BA trả lời qua chat (08/05/2026) | ✅ Thời hạn thuê là **text tự do** — user input sao thì hiển thị vậy |
| Q15 | Low | UC v3 Section 2.2.6 | ✅ File đính kèm sắp xếp theo **ngày upload giảm dần** |

---

## 🟢 What's Good

- ✅ **Feature Identity rõ ràng:** UC-ID, tên chức năng, phân hệ, đối tượng thực hiện được ghi đầy đủ
- ✅ **Giao diện mô tả chi tiết:** Bảng mô tả UI cho cả 2 màn hình rất chi tiết
- ✅ **Null handling nhất quán:** Tất cả trường chi tiết có quy tắc null → "-"
- ✅ **State Persistence:** Giữ trạng thái search/filter khi quay lại
- ✅ **Validation diện tích đầy đủ:** Min=1, Max=500 chữ số, Đến > Từ, **nút Áp dụng disabled state** (v4 Q7 clarified)
- ✅ **Error handling (client):** Thông báo lỗi rõ ràng theo CMR-07 (mạng, 500, 404, timeout, **401 session**)
- ✅ **Badge trạng thái:** Mô tả chi tiết màu sắc cho từng trạng thái
- ✅ **File viewer:** Tham chiếu CMR-08 đầy đủ cho từng loại file + sắp xếp rõ
- ✅ **Pull-to-Refresh:** Section 5.3 theo CMR-13
- ✅ **Partial Load:** Section 3.4 xử lý rõ ràng
- ✅ **Searchable Dropdown KCN:** CMR-03 đầy đủ
- ✅ **Debounce Navigation:** Section 5.5 theo CMR-18
- ✅ **Đa ngôn ngữ:** Section 5.4 theo CMR-17

---

## 🧪 Testability Outlook

**What CAN be tested now (client-side):**
- Happy path: Tải danh sách, tìm kiếm, lọc, xem chi tiết, quay lại
- Validation diện tích: Min=1, Max=500 chữ số, Đến > Từ, nút Áp dụng disabled
- Empty state: "Không có dữ liệu." (no data) và "Không tìm thấy kết quả." (no result)
- Null handling: "-" cho null, badge ẩn khi null
- Badge display: Màu sắc đúng theo trạng thái, read-only
- Lazy load: 20 bản ghi/lần, loading indicator, hết data
- State Persistence: Search/filter/scroll giữ khi quay lại
- Pull-to-Refresh: Kéo xuống → reload (giữ filter/keyword)
- Error display (client): Timeout, lỗi mạng, 500, 404, **401 session expiry**
- Partial load: Phần thành công + phần lỗi hiển thị song song
- File attachment: Mở/download đúng loại file (CMR-08); sắp xếp theo ngày upload giảm dần
- UI/UX: Truncate, wrap text, format số, header/navigation
- Search box: Max 500 ký tự, debounce 3s
- Searchable dropdown KCN: Nhập keyword → filter options
- Double-tap debounce: Card và buttons navigation
- Thời hạn thuê: Text tự do, hiển thị nguyên input
- Đa ngôn ngữ: Text cứng theo ngôn ngữ, data API nguyên bản
- **Boundary diện tích (v4): Nhập 0/số âm → block, nhập 1 → accept, nhập số 500 chữ số → accept, nhập 501 chữ số → block**

**What CANNOT be tested yet (blocked by remaining gaps):**
- ⚠️ Android Back button khi Bottom Sheet đang mở (Q9)
- ⚠️ Phân quyền hiển thị lô đất "Chưa công bố" (Q11)

**Suggested test focus areas:**
- Happy path: Danh sách → Tìm kiếm → Lọc (searchable KCN) → Chi tiết → Quay lại
- Alternative: Pull-to-Refresh, reset filter, xóa search text, đóng Bottom Sheet bằng X/vùng ngoài
- Boundary: Diện tích (0 → block, 1 → accept, 500 chữ số, 501 chữ số → block), lazy load (20, 21, 1, 0), search 500 ký tự
- Error display: Timeout, network, 500, 404, 401 session expiry
- State: Nút "Áp dụng" disabled ↔ enabled khi validation fail/pass
- Edge case: Double-tap Card, pull-to-refresh + lazy load concurrent, partial API fail
- UI checks: Truncate, badge color, null display, loading indicator (first-load toàn màn vs cục bộ)
- CMR compliance: CMR-01, CMR-02, CMR-03, CMR-04, CMR-05, CMR-06, CMR-07, CMR-08, CMR-11, CMR-13, CMR-14, CMR-16, CMR-17, CMR-18
- i18n: Switch ngôn ngữ → text cứng đổi, data API nguyên bản
- Session: Mock 401 → auto refresh token; mock >15 ngày → redirect login

---

## 📌 Summary & Recommendation

**v4 re-audit** sau khi BA trả lời thêm Q7 (min/max diện tích): Điểm tăng từ **85.5 → 88.2/100** → ✅ **READY**. BA đã giải quyết **12/14 câu hỏi** từ backlog:
- **2 câu High:** Q1 (CMR-14 empty state), Q2 (Pull-to-Refresh CMR-13) — đều đã resolved ở v3
- **7 câu Medium:** Q3 (Partial load), Q4 (Disabled state), Q5 (Searchable KCN), Q6 (Max length search), Q7 (Min/max diện tích — v4), Q8 (Debounce), Q10 (Session) — đều đã resolved
- **3 câu Low:** Q13 (unit diện tích), Q14 (Thời hạn thuê text tự do), Q15 (File sort) — đều đã resolved

Còn **2 câu Medium open** (Q9 Android Back + Bottom Sheet, Q11 phân quyền "Chưa công bố") — đều không block happy path test design và không ảnh hưởng đến Acceptance Criteria chính.

**Recommendation:**
- ✅ **UC40 ĐẠT NGƯỠNG READY (88.2/100)** — QA có thể triển khai thiết kế test case đầy đủ cho ~95% scope bao gồm cả boundary validation diện tích.
- ⚠️ Đưa 2 câu Medium còn lại (Q9, Q11) vào **parking lot** — thiết kế test cases placeholder, hoàn thiện khi BA trả lời.
- 📝 Đề xuất BA bổ sung vào doc v4 (trong tương lai): (1) Ghi rõ boundary min=1, max=500 chữ số cho diện tích Từ/Đến ở Section 2.1 (hiện mới chỉ có trong chat); (2) Hành vi Android Back button khi Bottom Sheet mở; (3) Xác nhận phân quyền xem "Chưa công bố".

---

## 11. Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|-------------------|
| v1 | 2026-05-08 | QC Review Agent | First audit — UC40 v2. Score 66.4/100 (NOT READY). 15 open questions. |
| v2 | 2026-05-08 | QC Review Agent | Re-audit với phạm vi "Mobile Client only". Loại bỏ Q12 (API endpoint — backend scope). Hạ mức Q3 từ High→Medium. Score 71.8/100 (CONDITIONALLY READY). 14 câu hỏi Open. |
| v3 | 2026-05-08 | QC Review Agent | Re-audit sau khi BA update UC v3 theo question backlog. **11/14 câu đã resolved** (Q1, Q2, Q3, Q4, Q5, Q6, Q8, Q10, Q13, Q14, Q15). Còn 3 câu Medium Open (Q7, Q9, Q11). Score **85.5/100** (CONDITIONALLY READY). |
| v4 | 2026-05-08 | QC Review Agent | Re-audit sau khi BA trả lời Q7 qua chat: min=1, max=số có 500 chữ số. **12/14 câu đã resolved.** Còn 2 câu Medium Open (Q9, Q11). Score tăng từ 85.5 → **88.2/100** → ✅ **READY**. Điểm tăng ở Section 5 (17→18), Section 6 (18→19), Section 8 (8→9). |

---

*UC Readiness Template v3.0 — For QA Test Design*
