# UC Readiness Review
**Functional / Black-box Test Readiness Template**

**Tiêu đề:** UC40 — Tra cứu thông tin quỹ đất trong KCN trên Mobile — Audit Report
**Ngày tạo:** 08/05/2026
**Tác giả:** QC Review Agent
**Phiên bản:** v2

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
- **Tìm kiếm** theo từ khóa (tên lô đất) với debounce 3 giây
- **Lọc** theo nhiều tiêu chí: Khu công nghiệp, Diện tích (Từ-Đến), Tình trạng quỹ đất, Tình trạng công bố
- **Xem chi tiết** từng lô đất (read-only)
- **Xem file đính kèm** (hình ảnh/video quảng bá)

Truy cập qua: Sidebar → "Quản lý quỹ đất"
Phân quyền: Tất cả cá nhân đã đăng nhập (không phân biệt vai trò)
Lazy load: 20 bản ghi/lần
State Persistence: Giữ trạng thái tìm kiếm/lọc khi quay lại từ màn chi tiết

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| **71.8 / 100** | ⚡ **CONDITIONALLY READY** |

> QA có thể bắt đầu thiết kế test case cho các phần đã rõ ràng (happy path, UI, validation); các mục flagged cần được giải quyết song song.

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| UC40 | Tra cứu thông tin quỹ đất trong KCN | v2 | ✅ Complete |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------|
| han.luong & huy.lai2 | ⚡ Partial — Không ghi người phê duyệt | 29/04/2026 | ⚡ Partial — Không ghi ngày cập nhật cuối |

**Score: 4/5** ⚡ Partial

---

## 1. Objective & Scope

### 1.1 Objective
Cho phép cá nhân, tổ chức tra cứu danh sách lô đất trong các khu công nghiệp. Người dùng có thể tìm kiếm theo từ khóa, lọc theo nhiều tiêu chí, xem thông tin chi tiết từng lô đất.

### 1.2 In Scope
- Hiển thị danh sách lô đất (Card List) + Lazy load
- Tìm kiếm theo tên lô đất + Bộ lọc tìm kiếm
- Xem chi tiết lô đất (read-only)
- Xem file đính kèm (CMR-08)
- State Persistence

### 1.3 Out of Scope
⚠️ Missing — Tài liệu không ghi rõ phần nào nằm ngoài phạm vi UC.

**Score: 4/5** ⚡ Partial

---

## 2. Actors & Stakeholders

| Actor | Type | Role & Permissions |
|-------|------|-------------------|
| Cá nhân / Tổ chức (đã đăng nhập) | Primary | Truy cập và sử dụng tất cả chức năng tra cứu, không phân biệt vai trò |

**Score: 8/10** ⚡ Partial
- Actor được xác định rõ (Primary user = cá nhân/tổ chức đã đăng nhập).
- Phân quyền ghi rõ "không phân biệt vai trò" — đủ cho client test.
- *(v2 note: Không cần mô tả System Actor backend vì ngoài phạm vi kiểm thử client)*
- Vẫn cần xác nhận: Mọi vai trò đều thấy lô đất "Chưa công bố"? (Q11)

---

## 3. Preconditions & Postconditions

### 3.1 Preconditions
- ✅ Người dùng đã đăng nhập thành công vào ứng dụng Mobile
- ✅ Truy cập thông qua Sidebar → "Quản lý quỹ đất"

### 3.2 Postconditions
| After completing... | System state / Postcondition |
|--------------------|------------------------------|
| Xem danh sách | ✅ Danh sách hiển thị dạng Card, sắp xếp theo tên lô đất tăng dần, 20 bản ghi/lần |
| Tìm kiếm + Lọc | ✅ Kết quả hiển thị sau debounce/áp dụng, thỏa cả hai điều kiện |
| Xem chi tiết | ⚡ Partial — Hiển thị thông tin chi tiết, null → "-" |
| Quay lại từ chi tiết | ✅ Danh sách giữ nguyên trạng thái tìm kiếm/lọc trước đó |

**Score: 7/10** ⚡ Partial
- *(v2 note: Preconditions về dữ liệu hệ thống thuộc tầng backend — ngoài phạm vi. Đánh giá dựa trên client behavior)*

---

## 4. UI Object Inventory & Mapping

*(Giữ nguyên nội dung Section 4 từ v1 — không thay đổi vì UI inventory không bị ảnh hưởng bởi phạm vi test)*

### Màn hình 1: Danh sách quỹ đất (2.1)

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|----------------|------|--------|---------------|-------|
| 1 | Header "Quản lý quỹ đất" | Label | ✅ | ✅ | Tiêu đề trang |
| 2 | Nút Quay lại (←) | Button (Icon) | ⚡ Partial | ✅ | CMR-06, chỉ mô tả tường minh ở màn chi tiết |
| 3 | Ô tìm kiếm | Textbox (Search) | ✅ | ✅ | Placeholder: "Tìm kiếm tên lô đất..." |
| 4 | Nút "Lọc" | Button (Icon Filter) | ✅ | ✅ | Mở Bottom Sheet bộ lọc |
| 5-10 | Card lô đất (6 thành phần) | Mixed | ✅ | ✅ | Tên, Icon >, Vị trí, Diện tích, 2 Badge |

### Bottom Sheet — Bộ lọc tìm kiếm (8 thành phần)
*(Đầy đủ trong UC, wireframe không rõ cho Bottom Sheet)*

### Màn hình 2: Chi tiết lô đất (15 thành phần)
*(Đầy đủ trong UC)*

### CMR Cross-Check

| CMR | Status | Notes |
|-----|--------|-------|
| CMR-01 (Search Box) | ✅ | Debounce 3s, tìm gần đúng, placeholder, state persistence |
| CMR-02 (Search Filter) | ✅ | Bottom Sheet, nút Áp dụng/Nhập lại/X đóng |
| CMR-03 (Dropdown) | ⚠️ Partial | UC không tham chiếu CMR-03 cho dropdown KCN — liệu có searchable? |
| CMR-04 (Lazy Load) | ⚡ Partial | UC ghi 20 bản ghi/lần nhưng tham chiếu sai CMR-16 thay vì CMR-04/CMR-14 |
| CMR-05 (Badge) | ⚡ Partial | Badge có mô tả màu sắc nhưng không tham chiếu CMR-05 |
| CMR-06 (Header) | ✅ | Nút quay lại, tiêu đề trang |
| CMR-07 (Xử lý lỗi) | ✅ | Lỗi mạng, API 500, 404, timeout — *chỉ đánh giá cách client hiển thị thông báo lỗi* |
| CMR-08 (File viewer) | ✅ | Xem trực tiếp PDF/Image/Video |
| CMR-11 (Định dạng số) | ✅ | Diện tích format hàng nghìn |
| CMR-13 (Pull to Refresh) | 🔴 Conflict | CMR-13 áp dụng mọi màn danh sách nhưng UC40 không đề cập |
| CMR-14 (Empty State) | ⚡ Partial | UC tham chiếu sai CMR-16 |
| CMR-16 (API Performance) | ✅ | Timeout 10s — *chỉ đánh giá loading/timeout hiển thị phía client* |

**Score: 10/15** ⚡ Partial

---

## 5. Object Attributes & Behavior Definition

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| Ô tìm kiếm | Enabled, Placeholder "Tìm kiếm tên lô đất..." | Nhập text → debounce 3s → hiển thị kết quả. Xóa text → reset | Tìm kiếm like, không cần nhấn Enter |
| Nút "Lọc" | Enabled. Badge đếm khi có filter active | Tap → mở Bottom Sheet | Badge đếm hiển thị khi filter đang áp dụng |
| Dropdown KCN | Enabled. Mặc định "Tất cả các KCN" | Tap → mở danh sách → chọn → tự đóng | ⚠️ Searchable? (Q5) |
| Diện tích (Từ/Đến) | Enabled. Placeholder "từ"/"đến" | Nhập số → chỉ số nguyên dương | Block ký tự non-numeric. Format CMR-11 |
| Nút "Áp dụng" | ⚡ Trạng thái khi validation fail? (Q4) | Tap → áp dụng filter, đóng Bottom Sheet | Block khi Đến < Từ |
| Card lô đất | Read-only | Tap → navigate chi tiết | Hiển thị tên, vị trí, diện tích, 2 badge |
| File đính kèm | Read-only list | Tap → mở file (CMR-08) | Empty state CMR-14 khi 0 file |

### Edge Case Checklist (Client-focused)

**Group A — Extreme Data States (client hiển thị):**
- ✅ Tên/Vị trí overflow → truncate 2 dòng
- ⚠️ Diện tích = 0 → không mô tả hiển thị
- ✅ Danh sách rỗng → empty state
- ✅ Null data → "-" cho chi tiết

**Group B — Network & API States (hành vi client khi gặp lỗi):**
- ✅ API chậm → loading indicator
- ⚠️ Client xử lý khi 1 phần dữ liệu load fail → *client hiển thị gì? Block toàn màn hay partial?* (Q3 — reframe cho client)
- ⚠️ Double-tap navigation → không mô tả debounce (Q8)

**Group C — Abnormal User Interactions (client):**
- ⚠️ Rapid consecutive taps (Q8)
- ⚠️ Android Back button khi Bottom Sheet mở (Q9)

**Group D — Permissions & Session (client):**
- ⚠️ Session hết hạn → client redirect? (Q10)
- ⚠️ Phân quyền xem "Chưa công bố" (Q11)

**Score: 14/20** ⚡ Partial
- *(v2 note: Tăng từ 12→14 vì bỏ qua các edge case thuộc tầng server-side. Tập trung vào hành vi client)*

---

## 6. Functional Logic & Workflow Decomposition

### 6.1 Function: Tải danh sách quỹ đất

**Main Flow:** Sidebar → "Quản lý quỹ đất" → App hiển thị loading → Danh sách Card (sort tên A-Z, lazy load 20) → ✅ Rõ ràng
**Empty State:** 0 bản ghi → "Không có dữ liệu." → ⚡ Tham chiếu sai CMR-16
**Error Flow (client):** Timeout 10s → thông báo + "Thử lại"; Lỗi mạng → thông báo CMR-07 → ✅

**Field table (danh sách Card):**

| Field | Data Type | Truncate | Format |
|-------|-----------|----------|--------|
| Tên lô đất | Text | Max 2 dòng, "..." | Bold |
| Vị trí | Text | Max 2 dòng, "..." | Label trái-value phải |
| Diện tích | Number | — | Hàng nghìn CMR-11 |
| Tình trạng quỹ đất | Enum | — | Badge (xanh/đỏ) |
| Tình trạng công bố | Enum | — | Badge Outline (xanh/xám) |

### 6.2 Function: Tìm kiếm & Lọc

**Main Flow:** Nhập từ khóa → debounce 3s → kết quả lọc → ✅
**Alternative:** Xóa text → reset mặc định → ✅
**Filter Flow:** Mở Bottom Sheet → chỉnh tiêu chí → Áp dụng/Nhập lại/Đóng → ✅
**Validation:** Đến < Từ → inline error → block Áp dụng → ✅
**Empty result:** "Không tìm thấy kết quả." → ⚡ Tham chiếu sai CMR-16
**Kết hợp Search + Filter:** Thỏa cả hai điều kiện (CMR-01) → ✅

**Gaps:**
- ⚠️ Max length ô tìm kiếm (Q6)
- ⚠️ Min/max value diện tích (Q7)
- ⚠️ Searchable dropdown KCN (Q5)

### 6.3 Function: Xem chi tiết lô đất

**Main Flow:** Tap Card → loading → hiển thị chi tiết (read-only) → ✅
**Null handling:** null → "-"; badge null → ẩn → ✅
**Text overflow:** Wrap text (khác với Card truncate) → ✅
**File đính kèm:** Tap → mở theo CMR-08; 0 file → empty state CMR-14 → ✅
**Error (client):** Lỗi → thông báo CMR-07; 404 → "Lô đất không tồn tại..." → ✅
**Back navigation:** Giữ state search/filter → ✅

**Score: 15/20** ⚡ Partial
- *(v2 note: Tăng từ 14→15 vì API endpoint detail (Q12) ngoài phạm vi client test)*

---

## 7. Functional Integration Analysis

| Trigger / Action | Impact (Client behavior) | Status |
|-----------------|--------------------------|--------|
| Search + Filter kết hợp | Kết quả thỏa cả hai (CMR-01) | ✅ |
| Chi tiết → Quay lại | Giữ state search/filter | ✅ |
| Lazy load + Filter mới | ⚡ Chưa rõ: reset lazy load hay append? | ⚡ Cần xác nhận |
| Pull to Refresh | ⚠️ UC không đề cập (CMR-13 conflict) | 🔴 Q2 |

**Score: 6/10** ⚡ Partial

---

## 8. Acceptance Criteria

*(Giữ nguyên 13 AC từ v1 — AC-01 đến AC-13, đều suy luận từ UC)*

**Score: 7/10** ⚡ Partial

---

## 9. Non-functional Requirements

| Category | Requirement | Source |
|----------|-------------|-------|
| Performance (client) | Loading indicator cho mọi API call; Timeout 10s hiển thị lỗi | CMR-07, CMR-16 |
| Performance (client) | Lazy load 20 bản ghi/lần | CMR-04 |
| File Viewing (client) | Mở PDF/Image/Video trực tiếp; tải xuống định dạng khác | CMR-08 |
| ⚠️ Accessibility | Không đề cập | Missing |

**Score: 4/5** ⚡ Partial
- *(v2 note: Tăng từ 3→4 vì Security API/token thuộc tầng backend — ngoài phạm vi client test. Compatibility portrait đã ghi trong UC.)*

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | v1 Score | v2 Score | Status |
|---|---------------|---------|----------|----------|--------|
| 1 | Feature Identity | 5 | 4 | 4/5 | ⚡ Partial |
| 2 | Objective & Scope | 5 | 4 | 4/5 | ⚡ Partial |
| 3 | Actors & User Roles | 10 | 7 | **8/10** | ⚡ Partial |
| 4 | Preconditions & Postconditions | 10 | 6 | **7/10** | ⚡ Partial |
| 5 | UI Object Inventory & Mapping | 15 | 10 | 10/15 | ⚡ Partial |
| 6 | Object Attributes & Behavior Definition | 20 | 12 | **14/20** | ⚡ Partial |
| 7 | Functional Logic & Workflow Decomposition | 20 | 14 | **15/20** | ⚡ Partial |
| 8 | Functional Integration Analysis | 10 | 6 | 6/10 | ⚡ Partial |
| 9 | Acceptance Criteria | 10 | 7 | 7/10 | ⚡ Partial |
| 10 | Non-functional Requirements | 5 | 3 | **4/5** | ⚡ Partial |
| **Total** | | **110** | **73** | **79/110** | **→ 71.8/100** |

> **Công thức:** 4+4+8+7+10+14+15+6+7+4 = **79/110** → Normalized = round((79/110) × 100, 1) = **71.8/100**
>
> **Verdict:** 71.8 ≥ 70 → ⚡ **CONDITIONALLY READY**

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q1 | High | "Xem CMR-16" ở mục 5.1 và 5.2 | UC tham chiếu sai CMR-16 (API Performance) thay vì CMR-14 (Empty State). Cần xác nhận thông điệp empty state tuân theo CMR-14: "Không có dữ liệu." cho no data, "Không tìm thấy kết quả." cho no result? | Client hiển thị sai message nếu tham chiếu sai | Open |
| Q2 | High | N/A (Missing) | UC40 không đề cập CMR-13 (Pull to Refresh). CMR-13 áp dụng cho mọi màn hình danh sách. Client có hỗ trợ pull-to-refresh không? | QA không biết có cần test gesture pull-down trên client hay không | Open |
| Q3 | Medium | N/A (Missing) | Khi một phần dữ liệu load thất bại (VD: danh sách OK nhưng dropdown KCN fail), **client hiển thị thế nào?** Block toàn màn hay hiển thị partial? *(Chỉ hỏi hành vi hiển thị phía client, không audit logic API)* | Ảnh hưởng test case cho error display trên client | Open |
| Q4 | Medium | Bảng 2.1 — Nút "Lọc" | Nút "Áp dụng" khi validation diện tích fail (Đến < Từ): nút bị **disabled (grayed out)** hay chỉ **không phản hồi** khi tap? | Client state rendering khác nhau ảnh hưởng test UI | Open |
| Q5 | Medium | N/A (Missing) | Dropdown KCN có **searchable** không? CMR-03 mô tả searchable dropdown. | Nếu có, cần test nhập text trong dropdown trên client | Open |
| Q6 | Medium | N/A (Missing) | Max length ô tìm kiếm? CMR-11 mặc định 500 ký tự — xác nhận áp dụng cho search input? | Client cần block nhập quá max length | Open |
| Q7 | Medium | N/A (Missing) | Diện tích (Từ/Đến): UC ghi "số nguyên dương" + CMR-11 (max length 500). Giá trị tối thiểu là 0 hay 1? Giá trị tối đa? | Client cần validate boundary value | Open |
| Q8 | Medium | N/A (Missing) | Tap nhanh liên tục Card lô đất → client navigate nhiều lần? Có debounce navigation? | Double-tap gây UX xấu hoặc crash client | Open |
| Q9 | Medium | N/A (Missing) | Android Back button khi Bottom Sheet mở → đóng Bottom Sheet hay thoát màn hình? | Client behavior trên Android cần đúng platform convention | Open |
| Q10 | Medium | N/A (Missing) | Session hết hạn khi đang xem → client redirect về Đăng nhập? | Client cần xử lý session expiry gracefully | Open |
| Q11 | Medium | "Phân quyền: không phân biệt vai trò" | Mọi vai trò đều thấy lô đất "Chưa công bố"? Xác nhận client hiển thị đúng theo phân quyền. | Nếu sai, client hiển thị dữ liệu không nên thấy → lỗ hổng UX/phân quyền | Open |
| Q13 | Low | N/A (Missing) | Đơn vị diện tích "m²" có hiển thị trên Card và màn chi tiết không? | Client display consistency | Open |
| Q14 | Low | Mục 2.2.2 — "Thời hạn thuê" | "Thời hạn thuê" hiển thị dạng "2 năm" — text tự do hay format cố định? Giá trị 0 hiển thị gì? | Client test boundary hiển thị | Open |
| Q15 | Low | N/A (Missing) | File đính kèm sắp xếp theo thứ tự nào trên client? | Client verify thứ tự hiển thị | Open |

> **v2 note — loại bỏ Q12:** Câu hỏi Q12 (API endpoint cho danh sách) thuộc tầng backend, ngoài phạm vi kiểm thử Mobile Client. QA test client behavior không cần biết chi tiết endpoint/query params.
>
> **v2 note — hạ mức Q3:** Từ High → Medium vì câu hỏi được reframe sang "client hiển thị thế nào" thay vì "API xử lý thế nào".
>
> **Tổng: 14 câu hỏi Open** (2 High, 9 Medium, 3 Low)

---

## 🟢 What's Good

- ✅ **Feature Identity rõ ràng:** UC-ID, tên chức năng, phân hệ, đối tượng thực hiện được ghi đầy đủ
- ✅ **Giao diện mô tả chi tiết:** Bảng mô tả UI cho cả 2 màn hình rất chi tiết
- ✅ **Null handling nhất quán:** Tất cả trường chi tiết có quy tắc null → "-"
- ✅ **State Persistence:** Giữ trạng thái search/filter khi quay lại
- ✅ **Validation diện tích:** Mô tả cụ thể Đến > Từ kèm inline error
- ✅ **Error handling (client):** Thông báo lỗi rõ ràng theo CMR-07 (mạng, 500, 404, timeout)
- ✅ **Badge trạng thái:** Mô tả chi tiết màu sắc cho từng trạng thái
- ✅ **File viewer:** Tham chiếu CMR-08 đầy đủ cho từng loại file

---

## 🧪 Testability Outlook

**What CAN be tested now (client-side):**
- Happy path: Tải danh sách, tìm kiếm, lọc, xem chi tiết, quay lại
- Validation: Diện tích Đến > Từ, inline error
- Empty state: Không có dữ liệu, không tìm thấy kết quả
- Null handling: "-" cho null, badge ẩn khi null
- Badge display: Màu sắc đúng theo trạng thái, read-only
- Lazy load: 20 bản ghi/lần, loading indicator, hết data
- State Persistence: Search/filter/scroll giữ khi quay lại
- Error display (client): Timeout, lỗi mạng, 500, 404 — client hiển thị thông báo đúng
- File attachment: Mở/download đúng loại file (CMR-08)
- UI/UX: Truncate, wrap text, format số, header/navigation

**What CANNOT be tested yet (blocked by gaps):**
- Pull to Refresh (Q2)
- Trạng thái nút "Áp dụng" disabled/enabled (Q4)
- Searchable dropdown KCN (Q5)
- Boundary testing ô tìm kiếm — max length (Q6)
- Boundary testing diện tích — min/max value (Q7)
- Double-tap navigation debounce (Q8)
- Android Back button + Bottom Sheet (Q9)
- Session expiration client behavior (Q10)
- Phân quyền hiển thị lô đất "Chưa công bố" (Q11)

**Suggested test focus areas:**
- Happy path: Danh sách → Tìm kiếm → Lọc → Chi tiết → Quay lại
- Alternative: Reset filter, đóng Bottom Sheet, xóa search text
- Boundary: Diện tích Từ/Đến (=, +1, -1), lazy load (20, 21, 1, 0)
- Error display: Timeout, network, 500, 404 — client hiển thị đúng message
- UI checks: Truncate, badge color, null display, loading indicator
- CMR compliance: CMR-01→CMR-08, CMR-11, CMR-14, CMR-16
- Edge case: Long text, special characters, case insensitive search

---

## 📌 Summary & Recommendation

**v2 re-audit** với phạm vi kiểm thử **Mobile Client only**: Điểm tăng từ **66.4 → 71.8/100** (CONDITIONALLY READY) do loại bỏ các yêu cầu thuộc tầng API/backend ra khỏi phạm vi đánh giá. Tài liệu UC40 mô tả đầy đủ giao diện, luồng xử lý chính, validation, error display và null handling cho phía client. Tuy nhiên vẫn còn **13 câu hỏi mở** (2 High, 8 Medium, 3 Low) cần BA giải quyết.

**Recommendation:** ⚡ QA có thể bắt đầu thiết kế test case cho các happy path, validation, UI/UX, error display ngay. Các câu hỏi Priority High (Q1 — CMR-14 tham chiếu sai, Q2 — Pull to Refresh) và Medium quan trọng (Q3-Q11) nên được giải quyết song song để bổ sung test coverage. Tổng cộng **14 câu hỏi Open** (2 High, 9 Medium, 3 Low).

---

## 11. Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|-------------------|
| v1 | 2026-05-08 | QC Review Agent | First audit — UC40 v2. Score 66.4/100 (NOT READY). 15 open questions. |
| v2 | 2026-05-08 | QC Review Agent | Re-audit với phạm vi "Mobile Client only". Loại bỏ Q12 (API endpoint — backend scope). Hạ mức Q3 từ High→Medium (reframe cho client). Tăng điểm: Actors 7→8, Preconditions 6→7, Object Behavior 12→14, Workflow 14→15, NFR 3→4. Score 71.8/100 (CONDITIONALLY READY). 14 câu hỏi Open (2H, 9M, 3L). |

---

*UC Readiness Template v3.0 — For QA Test Design*
