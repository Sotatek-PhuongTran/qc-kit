# UC Readiness Review
**Functional / Black-box Test Readiness Template**

**Tiêu đề:** UC40 — Tra cứu thông tin quỹ đất trong KCN trên Mobile — Audit Report
**Ngày tạo:** 08/05/2026
**Tác giả:** QC Review Agent
**Phiên bản:** v1

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
| **66.4 / 100** | ❌ **NOT READY** |

> Quá nhiều gap; QA chưa nên bắt đầu thiết kế test case toàn diện. Tuy nhiên có thể bắt đầu với các happy path đã rõ ràng trong khi chờ BA giải quyết các câu hỏi Priority High.

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| UC40 | Tra cứu thông tin quỹ đất trong KCN | v2 | ✅ Complete |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------|
| han.luong & huy.lai2 | ⚡ Partial — Không ghi người phê duyệt | 29/04/2026 | ⚡ Partial — Không ghi ngày cập nhật cuối |

**Score: 4/5** ⚡ Partial
- Thiếu thông tin: người phê duyệt (Approved By), ngày cập nhật cuối (Last Updated).

---

## 1. Objective & Scope

### 1.1 Objective
Cho phép cá nhân, tổ chức tra cứu danh sách lô đất trong các khu công nghiệp. Người dùng có thể tìm kiếm theo từ khóa, lọc theo nhiều tiêu chí (KCN, diện tích, tình trạng quỹ đất, tình trạng công bố), xem thông tin chi tiết từng lô đất.

### 1.2 In Scope
- Hiển thị danh sách lô đất (Card List)
- Tìm kiếm theo tên lô đất
- Bộ lọc tìm kiếm (KCN, Diện tích, Tình trạng quỹ đất, Tình trạng công bố)
- Xem chi tiết lô đất
- Xem file đính kèm (hình ảnh/video quảng bá)
- Lazy load 20 bản ghi/lần
- State Persistence

### 1.3 Out of Scope
⚠️ Missing — Tài liệu không ghi rõ phần nào nằm ngoài phạm vi UC.

**Score: 4/5** ⚡ Partial
- Mục tiêu và phạm vi trong khá rõ ràng, nhưng thiếu Out of Scope.

---

## 2. Actors & Stakeholders

| Actor | Type | Role & Permissions |
|-------|------|-------------------|
| Cá nhân / Tổ chức (đã đăng nhập) | Primary | Truy cập và sử dụng tất cả chức năng tra cứu, không phân biệt vai trò |

**Score: 7/10** ⚡ Partial
- Actor được xác định nhưng mô tả khá chung ("cá nhân / tổ chức").
- Không phân biệt vai trò cụ thể (nhà đầu tư trong nước, nhà đầu tư nước ngoài, tổ chức) — liệu behaviour có khác nhau giữa các vai trò không?
- Thiếu mô tả System Actor (hệ thống backend, API danh mục).

---

## 3. Preconditions & Postconditions

### 3.1 Preconditions
- ✅ Người dùng đã đăng nhập thành công vào ứng dụng Mobile
- ⚡ Truy cập thông qua Sidebar → "Quản lý quỹ đất" — document có ghi

### 3.2 Postconditions
| After completing... | System state / Postcondition |
|--------------------|------------------------------|
| Xem danh sách | ⚡ Partial — Danh sách hiển thị dạng Card, sắp xếp theo tên lô đất tăng dần. Thiếu mô tả số lượng ban đầu hiển thị |
| Tìm kiếm + Lọc | ⚡ Partial — Kết quả hiển thị sau debounce/áp dụng. Thiếu mô tả trạng thái URL/state sau thao tác |
| Xem chi tiết | ⚡ Partial — Hiển thị thông tin chi tiết lô đất. Thiếu mô tả chính xác trạng thái sau khi load xong |
| Quay lại từ chi tiết | ✅ Complete — Danh sách giữ nguyên trạng thái tìm kiếm/lọc trước đó |

**Score: 6/10** ⚡ Partial
- Preconditions cơ bản được ghi, nhưng thiếu điều kiện về dữ liệu hệ thống (có dữ liệu lô đất nào trong hệ thống không?).
- Postconditions phần lớn phải suy luận từ tài liệu, không được ghi rõ ràng từng trường hợp.

---

## 4. UI Object Inventory & Mapping

### Màn hình 1: Danh sách quỹ đất (2.1)

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|----------------|------|--------|---------------|-------|
| 1 | Header "Quản lý quỹ đất" | Label | ✅ | ✅ | Tiêu đề trang |
| 2 | Nút Quay lại (←) | Button (Icon) | ⚡ Partial — Không mô tả tường minh ở màn danh sách | ✅ | Xem CMR-06, nhưng UC chỉ mô tả tường minh ở màn chi tiết |
| 3 | Ô tìm kiếm | Textbox (Search) | ✅ | ✅ | Placeholder: "Tìm kiếm tên lô đất..." |
| 4 | Nút "Lọc" | Button (Icon Filter) | ✅ | ✅ | Mở Bottom Sheet bộ lọc |
| 5 | Card lô đất — Tên lô đất | Label (Bold) | ✅ | ✅ | Max 2 dòng, truncate |
| 6 | Card lô đất — Icon mũi tên (>) | Icon | ✅ | ✅ | Góc phải trên, chỉ báo tap |
| 7 | Card lô đất — Vị trí | Label | ✅ | ✅ | Label trái, value phải, max 2 dòng truncate |
| 8 | Card lô đất — Diện tích | Label | ✅ | ✅ | Format CMR-11, label trái value phải |
| 9 | Card lô đất — Tình trạng quỹ đất | Badge | ✅ | ✅ | Xanh lá=Còn trống, Đỏ=Đã cho thuê |
| 10 | Card lô đất — Tình trạng công bố | Badge (Outline) | ✅ | ✅ | Xanh lá+viền=Đã công bố, Xám=Chưa công bố |

### Bottom Sheet — Bộ lọc tìm kiếm

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|----------------|------|--------|---------------|-------|
| 1 | Khu công nghiệp | Dropdown (Single) | ✅ | ⚠️ Wireframe không rõ | Dữ liệu từ API, mặc định "Tất cả các KCN" |
| 2 | Diện tích (Từ) | Number Input | ✅ | ⚠️ Wireframe không rõ | Placeholder "từ", chỉ số nguyên dương |
| 3 | Diện tích (Đến) | Number Input | ✅ | ⚠️ Wireframe không rõ | Placeholder "đến", validation > Từ |
| 4 | Tình trạng quỹ đất | Dropdown (Single) | ✅ | ⚠️ Wireframe không rõ | Tất cả / Còn trống / Đã cho thuê |
| 5 | Tình trạng công bố | Dropdown (Single) | ✅ | ⚠️ Wireframe không rõ | Tất cả / Đã công bố / Chưa công bố |
| 6 | Nút "Nhập lại" | Button (Secondary) | ✅ | ⚠️ Wireframe không rõ | Reset tất cả, không đóng Bottom Sheet |
| 7 | Nút "Áp dụng" | Button (Primary) | ✅ | ⚠️ Wireframe không rõ | Áp dụng filter, đóng Bottom Sheet |
| 8 | Nút "X" đóng | Button (Icon) | ✅ | ⚠️ Wireframe không rõ | Góc phải trên, đóng không thay đổi kết quả |

### Màn hình 2: Chi tiết lô đất (2.2)

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|----------------|------|--------|---------------|-------|
| 1 | Nút quay lại (←) | Button (Icon) | ✅ | ✅ | CMR-06, giữ state search/filter |
| 2 | Tiêu đề "Chi tiết lô đất" | Label | ✅ | ✅ | Căn giữa header |
| 3 | Khu công nghiệp | Label | ✅ | ✅ | [Mã KCN] - [Tên KCN], null→"-", wrap text |
| 4 | Tên lô đất | Label (Bold) | ✅ | ✅ | null→"-", wrap text |
| 5 | Vị trí | Label | ✅ | ✅ | null→"-", wrap text |
| 6 | Diện tích | Label (Number) | ✅ | ✅ | CMR-11, null→"-", wrap text |
| 7 | Thời hạn thuê | Label | ✅ | ✅ | null→"-", wrap text |
| 8 | Hiện trạng đường | Dropdown (read-only) | ✅ | ✅ | Đã có/Chưa có/Đang xây dựng, null→"-" |
| 9 | Hiện trạng điện | Dropdown (read-only) | ✅ | ✅ | Tương tự |
| 10 | Hiện trạng nước | Dropdown (read-only) | ✅ | ✅ | Tương tự |
| 11 | Hiện trạng hạ tầng | Dropdown (read-only) | ✅ | ✅ | Tương tự |
| 12 | Tình trạng quỹ đất | Badge | ✅ | ✅ | Như danh sách, null→không hiển thị |
| 13 | Trạng thái công bố | Badge (Outline) | ✅ | ✅ | Như danh sách, null→không hiển thị |
| 14 | Loại đất | Label | ✅ | ✅ | null→"-", wrap text |
| 15 | File đính kèm | List (Icon+Label) | ✅ | ✅ | CMR-08, CMR-14, truncate name |

### CMR Cross-Check

| CMR | Applicable? | UC References? | Status | Notes |
|-----|-----------|----------------|--------|-------|
| CMR-01 (Search Box) | ✅ | ✅ Có tham chiếu | ✅ | Debounce 3s, tìm gần đúng, placeholder, state persistence |
| CMR-02 (Search Filter) | ✅ | ✅ Có tham chiếu (gián tiếp) | ✅ | Bottom Sheet, nút Áp dụng/Nhập lại/X đóng |
| CMR-03 (Dropdown/Combobox) | ✅ | ⚡ Partial | ⚠️ Partial | UC không tham chiếu CMR-03 tường minh cho dropdown KCN. Liệu dropdown KCN có searchable không? |
| CMR-04 (Lazy Load) | ✅ | ✅ Có mô tả | ⚡ Partial | UC ghi 20 bản ghi/lần nhưng tham chiếu sai CMR-16 thay vì CMR-04/CMR-14 |
| CMR-05 (Badge trạng thái) | ✅ | ⚡ Partial | ⚡ Partial | Badge có mô tả màu sắc nhưng không tham chiếu CMR-05 |
| CMR-06 (Header & Điều hướng) | ✅ | ✅ Có tham chiếu | ✅ | Nút quay lại, tiêu đề trang |
| CMR-07 (Xử lý lỗi chung) | ✅ | ✅ Có tham chiếu | ✅ | Lỗi mạng, API 500, 404, timeout 10s |
| CMR-08 (Xem tài liệu đính kèm) | ✅ | ✅ Có tham chiếu | ✅ | Xem trực tiếp PDF/Image/Video, tải xuống các định dạng khác |
| CMR-11 (Định dạng số) | ✅ | ✅ Có tham chiếu | ✅ | Diện tích hiển thị format hàng nghìn |
| CMR-12 (Định dạng thời gian) | ⚡ Uncertain | ⚠️ Không tham chiếu | ⚠️ Partial | Thời hạn thuê hiển thị dạng "2 năm" — không rõ có trường nào hiển thị ngày/giờ không |
| CMR-13 (Pull to Refresh) | ✅ | ⚠️ Không tham chiếu | 🔴 Conflict | CMR-13 áp dụng cho tất cả màn hình danh sách, nhưng UC40 không đề cập đến Pull to Refresh |
| CMR-14 (Empty State) | ✅ | ⚡ Partial (tham chiếu sai CMR-16) | ⚡ Partial | UC có mô tả empty state nhưng tham chiếu sai sang CMR-16 thay vì CMR-14 |
| CMR-16 (API Performance) | ✅ | ✅ Có mô tả | ✅ | Timeout 10s cho tất cả API calls |

**Score: 10/15** ⚡ Partial
- UI Inventory khá đầy đủ, tuy nhiên wireframe không rõ ràng cho Bottom Sheet.
- Có lỗi tham chiếu CMR (ghi CMR-16 thay vì CMR-14 cho empty state).
- Thiếu tham chiếu CMR-13 (Pull to Refresh).
- Thiếu tham chiếu CMR-03 cho dropdown KCN.

---
## 5. Object Attributes & Behavior Definition

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------|
| Ô tìm kiếm | Enabled, Placeholder "Tìm kiếm tên lô đất..." | Nhập text → debounce 3s → gọi API. Xóa text → reset danh sách | Tìm kiếm like theo tên lô đất. Kết quả hiển thị sau debounce. Không cần nhấn Enter |
| Nút "Lọc" | Enabled. Badge đếm số filter đang bật (nếu có) | Tap → mở Bottom Sheet | Hiển thị badge đếm nếu có filter đang áp dụng |
| Dropdown KCN (trong Bottom Sheet) | Enabled. Mặc định "Tất cả các KCN" | Tap → mở danh sách → chọn item → tự đóng | ⚠️ Không rõ có searchable không (CMR-03 mô tả searchable dropdown) |
| Diện tích (Từ) | Enabled. Placeholder "từ" | Nhập số → chỉ cho phép số nguyên dương | Block ký tự không phải số. Format CMR-11 |
| Diện tích (Đến) | Enabled. Placeholder "đến" | Nhập số → validation phải > Từ | Block ký tự không phải số. Inline error nếu < Từ |
| Nút "Áp dụng" | ⚡ Partial — Trạng thái mặc định? Disabled khi validation fail? | Tap → áp dụng filter, đóng Bottom Sheet, gọi API | UC ghi "không cho phép tap 'Áp dụng'" khi validation fail Diện tích → nhưng không rõ nút có disabled visible hay không |
| Card lô đất | Read-only | Tap → navigate to chi tiết | Hiển thị tên, vị trí, diện tích, 2 badge trạng thái |
| File đính kèm (chi tiết) | Read-only list | Tap → mở file theo CMR-08 | Không có file → empty state CMR-14 |

### Edge Case Checklist

**Group A — Extreme Data States:**
- ✅ Tên lô đất overflow → UC có truncate 2 dòng
- ⚠️ Diện tích = 0 → UC không mô tả trường hợp diện tích = 0 trong bộ lọc
- ✅ Danh sách rỗng → UC có mô tả empty state
- ✅ Null data → Hiển thị "-" cho chi tiết

**Group B — Network & API States:**
- ✅ API chậm (> 5s < 10s timeout) → UC có mô tả loading indicator
- ⚠️ Partial API failure → UC không mô tả xử lý khi chỉ 1 trong nhiều API call fail
- ⚠️ Duplicate API calls (double tap, back & re-enter) → UC không mô tả debounce cho navigation, chỉ có debounce cho search
- ⚠️ Network loss mid-load → UC không mô tả

**Group C — Abnormal User Interactions:**
- ⚠️ Rapid consecutive taps → UC không mô tả chống double-tap navigation
- ⚠️ Physical Back button (Android) khi Bottom Sheet đang mở → UC không mô tả
- ⚠️ Screen rotation → UC ghi Portrait, nhưng không đề cập landscape

**Group D — Permissions & Session:**
- ⚠️ Session hết hạn trong khi đang xem → UC không mô tả
- ⚠️ Different roles → UC ghi "không phân biệt vai trò" nhưng không giải thích tại sao tất cả đều thấy cả lô đất "chưa công bố"

**Group E — Internationalization (i18n):**
- ⚠️ Sau khi đổi ngôn ngữ → UC không mô tả
- ⚠️ Lưu trữ ngôn ngữ → UC không mô tả

**Score: 12/20** ⚡ Partial
- UI components được mô tả tương đối nhưng thiếu nhiều edge cases.
- Nhiều trường hợp biên không được đề cập.

---

## 6. Functional Logic & Workflow Decomposition

### 6.1 Function: Tải danh sách quỹ đất

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|------------------------|
| 1 | User | Tap Sidebar → "Quản lý quỹ đất" | Gọi API lấy toàn bộ danh sách lô đất, hiển thị loading | N/A | Lỗi mạng/API: CMR-07 |
| 2 | System | Load dữ liệu | Danh sách Card, sort theo tên tăng dần, lazy load 20 bản ghi | N/A | Timeout 10s: Hiển thị lỗi + nút "Thử lại" |
| 3 | User | Cuộn xuống cuối | Tự động tải 20 bản ghi tiếp theo, hiện loading indicator cuối danh sách | N/A | Hết dữ liệu: Ẩn loading, không gọi API |

**Empty State:** Không có lô đất → Hiển thị "Không có dữ liệu." (⚡ Tham chiếu sai CMR-16 thay vì CMR-14)

**B. Business Rules & Validations**

| Field | Data Type | Required? | Min | Max | Format |
|-------|-----------|-----------|-----|-----|--------|
| Tên lô đất | Text | — | — | 2 dòng | Truncate nếu quá dài |
| Vị trí | Text | — | — | 2 dòng | Truncate nếu quá dài |
| Diện tích | Number | — | — | — | Format hàng nghìn (CMR-11) |
| Tình trạng quỹ đất | Enum | — | — | — | "Còn trống" / "Đã cho thuê" |
| Tình trạng công bố | Enum | — | — | — | "Đã công bố" / "Chưa công bố" |

### 6.2 Function: Tìm kiếm & Lọc

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|------------------------|
| 1 | User | Nhập từ khóa vào ô tìm kiếm | Debounce 3s → Gọi API tìm kiếm like theo tên lô đất | Xóa hết text → Reset danh sách về mặc định | Timeout 10s: Lỗi + "Thử lại" |
| 2 | User | Tap icon Lọc | Mở Bottom Sheet bộ lọc | N/A | N/A |
| 3 | User | Chỉnh sửa tiêu chí trong Bottom Sheet | Hiển thị các dropdown/input | Tap "Nhập lại" → Reset 5 tiêu chí về mặc định | Diện tích Đến < Từ: Inline error, block "Áp dụng" |
| 4 | User | Tap "Áp dụng" | Đóng Bottom Sheet, gọi API kết hợp search + filter, tải lại danh sách | Tap "X" hoặc vùng ngoài → Đóng, không thay đổi | N/A |

**Empty State (no result):** Hiển thị "Không tìm thấy kết quả." (⚡ Tham chiếu sai CMR-16)

**B. Business Rules & Validations**

| Field | Data Type | Required? | Min | Max | Format |
|-------|-----------|-----------|-----|-----|--------|
| Từ khóa tìm kiếm | Text | Không | — | ⚠️ Missing — Không ghi max length | Tìm kiếm gần đúng |
| KCN | Dropdown | Không | — | — | Single-select, dữ liệu từ API |
| Diện tích (Từ) | Number (m²) | Không | ⚠️ Missing — Min=0? | ⚠️ Missing | Số nguyên dương, CMR-11 |
| Diện tích (Đến) | Number (m²) | Không | ⚠️ Missing | ⚠️ Missing | Số nguyên dương, CMR-11. Phải > Từ |
| Tình trạng quỹ đất | Dropdown | Không | — | — | Tất cả / Còn trống / Đã cho thuê |
| Tình trạng công bố | Dropdown | Không | — | — | Tất cả / Đã công bố / Chưa công bố |

### 6.3 Function: Xem chi tiết lô đất

**A. Workflows**

| Step | Actor | Action | System Response (Happy Path) | Alternative Flows | Exception & Error Flows |
|------|-------|--------|------------------------------|-------------------|------------------------|
| 1 | User | Tap vào Card lô đất | Gọi API `/api/v1/land-plots/{id}`, hiển thị loading | N/A | Timeout 10s: Lỗi + "Thử lại" |
| 2 | System | Load dữ liệu chi tiết | Map dữ liệu vào UI, null → "-" | N/A | Lô đất không tồn tại: "Lô đất không tồn tại hoặc đã bị xóa." (CMR-07) |
| 3 | User | Tap file đính kèm | Mở file theo CMR-08 | Không có file: Empty state CMR-14 | File URL không hợp lệ: ⚠️ Missing — không mô tả xử lý |
| 4 | User | Tap nút Quay lại | Quay về danh sách, giữ state search/filter | N/A | N/A |

**C. UI/UX Feedback**
- **Loading:** Spinner/skeleton trên toàn bộ nội dung khi chờ API (CMR-07)
- **Error:** Messages theo CMR-07 (Lỗi mạng, API 500, 404, Timeout)
- ⚠️ **Toast/Snackbar:** UC không mô tả cụ thể dùng Toast hay Dialog cho thông báo lỗi

**Score: 14/20** ⚡ Partial
- Workflows mô tả khá chi tiết cho happy path.
- Thiếu nhiều validation rules (max length tìm kiếm, min/max diện tích).
- Tham chiếu CMR sai (CMR-16 thay vì CMR-14).
- Thiếu mô tả xử lý file URL không hợp lệ.

---

## 7. Functional Integration Analysis

| Trigger Function / Action | Impact Analysis | Data Consistency Verification |
|---------------------------|-----------------|------------------------------|
| Tìm kiếm + Lọc kết hợp | Kết quả phải thỏa cả hai điều kiện (CMR-01) | ✅ UC có ghi rõ |
| Vào chi tiết → Quay lại | Danh sách phải giữ state search/filter | ✅ UC có ghi rõ (State Persistence) |
| Thay đổi dữ liệu lô đất từ hệ thống khác | ⚠️ Missing — Không mô tả ảnh hưởng khi dữ liệu backend thay đổi trong lúc user đang xem | ⚠️ Cần Pull to Refresh (CMR-13) nhưng UC không đề cập |
| Lazy load + Filter | ⚡ Partial — UC không giải thích rõ: khi đang lazy load, nếu user apply filter mới thì xử lý như thế nào? | ⚡ Cần xác nhận |

**Score: 6/10** ⚡ Partial
- State Persistence được mô tả tốt.
- Thiếu mô tả integration khi dữ liệu thay đổi từ backend.
- Thiếu Pull to Refresh (CMR-13).
- Chưa rõ interaction giữa lazy load và filter.

---

## 8. Acceptance Criteria

| AC # | Scenario | Given | When | Then |
|------|----------|-------|------|------|
| AC-01 | Load danh sách — Happy Path | User đã đăng nhập, vào "Quản lý quỹ đất" | Trang load xong | Danh sách Card hiển thị, sort theo tên tăng dần, tối đa 20 bản ghi đầu |
| AC-02 | Load danh sách — Empty | Hệ thống không có lô đất nào | Trang load xong | Hiển thị "Không có dữ liệu." |
| AC-03 | Tìm kiếm — Happy Path | User nhập "N10" vào ô tìm kiếm | Sau 3s debounce | Danh sách hiển thị chỉ các lô đất có tên chứa "N10" |
| AC-04 | Tìm kiếm — Không kết quả | User nhập "XYZ999" | Sau 3s debounce | Hiển thị "Không tìm thấy kết quả." |
| AC-05 | Tìm kiếm — Xóa text | User xóa hết text tìm kiếm | Sau debounce | Danh sách trở về mặc định |
| AC-06 | Bộ lọc — Áp dụng | User chọn KCN, đặt diện tích, chọn trạng thái | Tap "Áp dụng" | Đóng Bottom Sheet, danh sách lọc theo tiêu chí đã chọn |
| AC-07 | Bộ lọc — Reset | User tap "Nhập lại" | Tap | Reset 5 tiêu chí về mặc định, Bottom Sheet vẫn mở |
| AC-08 | Bộ lọc — Validation | User nhập Diện tích Đến < Diện tích Từ | Sau nhập | Inline error, block nút "Áp dụng" |
| AC-09 | Chi tiết — Happy path | User tap vào Card lô đất | API load xong | Hiển thị tất cả thông tin chi tiết, null→"-" |
| AC-10 | Chi tiết — Quay lại | User tap nút quay lại từ chi tiết | Tap | Quay về danh sách, giữ state search/filter |
| AC-11 | Chi tiết — File đính kèm | User tap vào file PDF | Tap | Mở trên trình duyệt thiết bị (CMR-08) |
| AC-12 | Lazy load | User cuộn đến cuối danh sách | Cuộn | Tự động tải 20 bản ghi tiếp, hiện loading indicator |
| AC-13 | Timeout | API không phản hồi trong 10s | Timeout | Hiển thị "Yêu cầu đã hết thời gian chờ..." + nút "Thử lại" |

> **Ghi chú:** Các AC trên được suy luận từ tài liệu UC, chưa được BA xác nhận chính thức. Nhiều AC cần bổ sung thêm cho edge cases.

**Score: 7/10** ⚡ Partial
- Acceptance Criteria không được ghi tường minh trong tài liệu UC, phải suy luận.
- Thiếu AC cho nhiều edge cases (network loss, session timeout, double-tap, v.v.).

---

## 9. Non-functional Requirements

| Category | Requirement | Source / Reference |
|----------|-------------|-------------------|
| Performance | API timeout tối đa 10 giây | CMR-16 |
| Performance | Loading indicator cho mọi API call | CMR-07 |
| Performance | Lazy load 20 bản ghi/lần | CMR-04 |
| File Viewing | Xem trực tiếp PDF/Image/Video; tải xuống các định dạng khác | CMR-08 |
| ⚠️ Security | Không đề cập bảo mật API, authentication token | Missing |
| ⚠️ Accessibility | Không đề cập | Missing |
| ⚠️ Compatibility | Không đề cập (ngoài "Portrait") | Missing |

**Score: 3/5** ⚡ Partial
- Performance requirements được mô tả qua CMR.
- Thiếu hoàn toàn Security, Accessibility, Compatibility.

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status |
|---|---------------|---------|-------|--------|
| 1 | Feature Identity (title, ID, context) | 5 | 4/5 | ⚡ Partial |
| 2 | Objective & Scope | 5 | 4/5 | ⚡ Partial |
| 3 | Actors & User Roles | 10 | 7/10 | ⚡ Partial |
| 4 | Preconditions & Postconditions | 10 | 6/10 | ⚡ Partial |
| 5 | UI Object Inventory & Mapping | 15 | 10/15 | ⚡ Partial |
| 6 | Object Attributes & Behavior Definition | 20 | 12/20 | ⚡ Partial |
| 7 | Functional Logic & Workflow Decomposition | 20 | 14/20 | ⚡ Partial |
| 8 | Functional Integration Analysis | 10 | 6/10 | ⚡ Partial |
| 9 | Acceptance Criteria | 10 | 7/10 | ⚡ Partial |
| 10 | Non-functional Requirements | 5 | 3/5 | ⚡ Partial |
| **Total** | | **110** | **73/110** | **→ 66.4/100** |

> **Công thức:** Raw Score = 4+4+7+6+10+12+14+6+7+3 = **73/110** → Normalized = round((73/110) × 100, 1) = **66.4/100**
>
> **Verdict:** 66.4 < 70 → ❌ **NOT READY**

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q1 | High | "Xem CMR-16" xuất hiện ở mục 5.1 (empty state danh sách rỗng) và mục 5.2 (empty state không tìm thấy kết quả) | UC tham chiếu sai CMR-16 (API Performance) thay vì CMR-14 (Empty State). Cần xác nhận: (1) Đây có phải lỗi tham chiếu? (2) Thông điệp empty state có tuân theo CMR-14 không: "Không có dữ liệu." cho no data, "Không tìm thấy kết quả." cho no result? | Nếu tham chiếu sai, QA sẽ không biết chính xác quy tắc empty state nào áp dụng → có thể test sai | Open |
| Q2 | High | N/A (Missing) | UC40 không đề cập CMR-13 (Pull to Refresh). Theo CMR-13: "Áp dụng cho: Tất cả màn hình mobile có danh sách hoặc nội dung cần cập nhật". Hỏi BA: UC40 có hỗ trợ Pull to Refresh không? Nếu có, cần bổ sung mô tả vào UC. | QA không thể test Pull to Refresh nếu không rõ UC có hỗ trợ hay không. Đây là quy tắc chung trong CMR nên cần tuân theo | Open |
| Q3 | High | N/A (Missing) | UC không mô tả trường hợp xử lý khi chỉ một phần API call thất bại (partial API failure). Ví dụ: API danh mục KCN thất bại nhưng API danh sách lô đất thành công → UI xử lý thế nào? | Ảnh hưởng đến test case cho error handling, đặc biệt khi màn hình có nhiều API call đồng thời | Open |
| Q4 | Medium | Bảng 2.1 — Nút "Lọc", dòng mô tả | Nút "Áp dụng" trong Bottom Sheet: Khi validation diện tích fail (Đến < Từ), UC ghi "không cho phép tap 'Áp dụng'". Xác nhận: Nút "Áp dụng" có thực sự bị disabled (grayed out) hay chỉ không có phản hồi khi tap? | Ảnh hưởng đến kiểm tra UI state và testability của validation flow | Open |
| Q5 | Medium | N/A (Missing) | Dropdown KCN trong bộ lọc: CMR-03 mô tả "Searchable dropdown" cho phép người dùng nhập text tìm kiếm trong dropdown. UC40 không nói rõ dropdown KCN có searchable hay không. Hỏi BA: Dropdown KCN có hỗ trợ searchable không? | Nếu có searchable, cần test thêm nhiều scenario (tìm kiếm trong dropdown, sắp xếp A-Z, hiển thị text dài, v.v.) | Open |
| Q6 | Medium | N/A (Missing) | Ô tìm kiếm: Không ghi Max Length cho từ khóa tìm kiếm. Theo CMR-11: "Với các trường không quy định max length, mặc định max length là 500 ký tự." Hỏi BA: (1) Max length áp dụng cho ô tìm kiếm là 500 ký tự? (2) Có giới hạn ký tự đặc biệt nào cho search input không? | QA cần biết max length để test boundary value | Open |
| Q7 | Medium | N/A (Missing) | Diện tích (Từ) và Diện tích (Đến): UC ghi "chỉ cho phép số nguyên dương" và tham chiếu CMR-11 (max length mặc định 500 ký tự đã được xử lý). Tuy nhiên UC không ghi min/max value. Hỏi BA: (1) Giá trị tối thiểu là 0 hay 1? (2) Giá trị tối đa là bao nhiêu? | QA cần giá trị min/max để test boundary value | Open |
| Q8 | Medium | N/A (Missing) | Trường hợp user tap nhanh liên tục vào cùng một Card lô đất → có bị navigate nhiều lần không? UC không mô tả debounce cho navigation. | Edge case: Nếu không có debounce, user có thể gây ra multiple navigation → crash hoặc UX xấu | Open |
| Q9 | Medium | N/A (Missing) | Nút Back vật lý (Android) khi Bottom Sheet đang mở → Đóng Bottom Sheet hay thoát màn hình? | Cần mô tả rõ để QA test trên thiết bị Android | Open |
| Q10 | Medium | N/A (Missing) | Session hết hạn trong khi user đang xem danh sách hoặc chi tiết → UC không mô tả hành vi. | QA cần biết để test session expiration scenario | Open |
| Q11 | Medium | "Phân quyền: Tất cả cá nhân đã đăng nhập thành công đều được truy cập (không phân biệt vai trò)." | Tất cả người dùng đều thấy cả lô đất "Chưa công bố"? Thông thường, thông tin "Chưa công bố" chỉ dành cho admin/quản trị. Hỏi BA: Xác nhận rằng mọi vai trò đều có quyền xem lô đất "Chưa công bố". | Nếu sai, đây là lỗ hổng phân quyền nghiêm trọng → cần test phân quyền chi tiết | Open |
| Q12 | Low | N/A (Missing) | UC không đề cập api endpoint cho tải danh sách và tìm kiếm/lọc (chỉ có `/api/v1/land-plots/{id}` cho chi tiết). Hỏi BA: (1) API endpoint cho danh sách là gì? (2) Tham số API cho search và filter như thế nào? | Giúp QA thiết kế test case API level chính xác hơn | Open |
| Q13 | Low | N/A (Missing) | Đơn vị diện tích: UC ghi "m²" trong bộ lọc nhưng trong danh sách Card không ghi đơn vị. Hỏi BA: Đơn vị diện tích có hiển thị trên Card và màn chi tiết không? | Ảnh hưởng đến test UI display consistency | Open |
| Q14 | Low | Mục 2.2.2 — "Thời hạn thuê" | Thời hạn thuê hiển thị dạng "2 năm" — Đây là text tự do hay format cố định? Nếu giá trị là null, hiển thị "-", nhưng nếu giá trị là 0 thì hiển thị gì? | QA cần biết format chính xác để test boundary | Open |
| Q15 | Low | N/A (Missing) | UC không mô tả sắp xếp danh sách file đính kèm trong màn chi tiết. Hỏi BA: File sắp xếp theo thứ tự nào? (tên, ngày upload, v.v.) | QA cần biết để verify thứ tự file | Open |

---

## 🟢 What's Good

- ✅ **Feature Identity rõ ràng:** UC-ID, tên chức năng, phân hệ, đối tượng thực hiện được ghi đầy đủ
- ✅ **Giao diện mô tả chi tiết:** Bảng mô tả UI cho cả 2 màn hình (Danh sách + Chi tiết) rất chi tiết với từng component, kiểu trường, giá trị mặc định, quy tắc hiển thị và hành vi
- ✅ **Null handling nhất quán:** Tất cả trường trong màn chi tiết đều có quy tắc xử lý null → hiển thị "-"
- ✅ **State Persistence:** Tài liệu mô tả rõ ràng việc giữ trạng thái tìm kiếm/lọc khi quay lại từ chi tiết
- ✅ **Validation diện tích:** Có mô tả cụ thể validation Diện tích Đến > Diện tích Từ kèm inline error message
- ✅ **Error handling:** Tham chiếu đầy đủ đến CMR-07 cho xử lý lỗi chung, timeout 10s (CMR-16)
- ✅ **API endpoint chi tiết:** Ghi rõ `/api/v1/land-plots/{id}` cho API chi tiết
- ✅ **Badge trạng thái:** Mô tả chi tiết màu sắc cho từng trạng thái (Còn trống, Đã cho thuê, Đã công bố, Chưa công bố)

---

## 🧪 Testability Outlook

**What CAN be tested now:**
- Happy path: Tải danh sách, tìm kiếm, lọc, xem chi tiết, quay lại
- Validation: Diện tích Đến > Từ
- Empty state: Không có dữ liệu, không tìm thấy kết quả
- Null handling: Các trường hiển thị "-" khi null
- Badge display: Màu sắc đúng theo trạng thái
- Lazy load: 20 bản ghi/lần
- State Persistence: Giữ state khi quay lại
- Error handling: Timeout, lỗi mạng, API 500, 404
- File attachment: Mở file theo CMR-08

**What CANNOT be tested yet (blocked by gaps):**
- Pull to Refresh (chưa rõ có hỗ trợ không — Q2)
- Partial API failure handling (Q3)
- Trạng thái nút "Áp dụng" khi validation fail (Q4)
- Searchable dropdown cho KCN (Q5)
- Boundary testing cho ô tìm kiếm (Q6) và diện tích (Q7)
- Double-tap navigation (Q8)
- Android Back button khi Bottom Sheet mở (Q9)
- Session expiration (Q10)
- Phân quyền xem lô đất "Chưa công bố" (Q11)

**Suggested test focus areas** *(once gaps are resolved)*:
- Happy path: Tải danh sách → Tìm kiếm → Lọc → Xem chi tiết → Quay lại
- Alternative scenarios: Reset bộ lọc, đóng Bottom Sheet không áp dụng, xóa text tìm kiếm
- Boundary & validation tests: Diện tích min/max, search max length, lazy load boundary
- Error & exception scenarios: Timeout, network error, API 500, 404, lô đất đã bị xóa
- UI-specific checks: Truncate text, badge colors, null display, loading indicators
- CMR compliance tests: CMR-01 (Search), CMR-02 (Filter), CMR-03 (Dropdown), CMR-04 (Lazy Load), CMR-05 (Badge), CMR-06 (Header), CMR-07 (Error), CMR-08 (File viewer), CMR-11 (Số), CMR-13 (Pull to Refresh), CMR-14 (Empty State), CMR-16 (API Performance)
- Partial API failure tests: Khi 1 API call fail, phần còn lại thành công
- Edge case tests: Double-tap, Android back button, long text, special characters

---

## 📌 Summary & Recommendation

Tài liệu UC40 v2 mô tả chi tiết giao diện và luồng xử lý chính cho chức năng tra cứu quỹ đất KCN, bao gồm tìm kiếm, lọc, xem danh sách, và xem chi tiết. Tuy nhiên, điểm readiness chỉ đạt **66.4/100** (NOT READY) do thiếu nhiều thông tin quan trọng: (1) Tham chiếu CMR sai (CMR-16 thay vì CMR-14 cho empty state), (2) Thiếu mô tả Pull to Refresh (CMR-13), (3) Thiếu validation rules cho các input field (max length, min/max value), (4) Thiếu mô tả xử lý edge cases (partial API failure, double-tap, session expiration, Android back button), (5) Chưa rõ phân quyền xem lô đất "Chưa công bố".

**Recommendation:** ❌ Cần giải quyết ít nhất các câu hỏi Priority High (Q1-Q3) và các câu hỏi Priority Medium quan trọng (Q4-Q11) trước khi QA bắt đầu thiết kế test case toàn diện. Tuy nhiên, QA có thể bắt đầu thiết kế test case cho các happy path đã rõ ràng trong khi chờ BA trả lời các câu hỏi.

---

## 11. Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|-------------------|
| v1 | 2026-05-08 | QC Review Agent | First audit — UC40 v2 |

---

*UC Readiness Template v3.0 — For QA Test Design*

