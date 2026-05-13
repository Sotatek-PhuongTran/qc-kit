# UC Readiness Review
**Functional / Black-box Test Readiness Template**

**Tiêu đề:** UC52 — Tra cứu kho tài liệu cá nhân trên Mobile — Audit Report
**Ngày tạo:** 08/05/2026
**Tác giả:** QC Review Agent
**Phiên bản:** v1

> **Phạm vi kiểm thử:** Dự án này chỉ kiểm thử **phía Mobile Client**. Mọi phân tích đều qua lăng kính "client hiển thị/xử lý thế nào?" — KHÔNG audit logic API/backend.

---

> **Completion status conventions:**
> - ✅ **Complete** = section is fully populated and no longer ambiguous
> - ⚡ **Partial** = contains content but requires further clarification
> - ⚠️ **Missing** = absent — BLOCKER, cannot start test design

---

## Feature Brief

Chức năng UC52 cho phép cá nhân/tổ chức đã đăng nhập tra cứu kho dữ liệu điện tử cá nhân trên ứng dụng Mobile. Bao gồm các tài liệu đã được hệ thống lưu trữ hoặc người dùng đã nộp (hồ sơ, giấy tờ, văn bản). Người dùng có thể:
- **Xem danh mục thư mục** tài liệu dạng Card, sắp xếp theo tên thư mục (1-9/A-Z)
- **Tìm kiếm** theo tên thư mục hoặc tên tập tin với debounce 3 giây (CMR-01)
- **Xem danh sách tập tin** trong thư mục, phân biệt định dạng bằng icon màu sắc
- **Xem/Tải tài liệu đính kèm** theo CMR-08

Truy cập qua: Sidebar → "Kho tài liệu cá nhân"
Phân quyền: Cá nhân/Tổ chức đã đăng nhập
Gồm 2 màn hình: Danh mục thư mục (2.1) và Danh sách tập tin (2.2)

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| **70.0 / 100** | ⚡ **CONDITIONALLY READY** |

> QA có thể bắt đầu thiết kế test case cho các phần đã rõ ràng (happy path, UI, tìm kiếm, xem file); các mục flagged cần được giải quyết song song.

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| UC52 | Tra cứu kho tài liệu cá nhân trên Mobile | v1 | ✅ Complete |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------|
| han.luong & huy.lai2 | ⚡ Partial — Không ghi người phê duyệt | 29/04/2026 | ⚡ Partial — Không ghi ngày cập nhật cuối |

**Score: 4/5** ⚡ Partial

---

## 1. Objective & Scope

### 1.1 Objective
Cho phép cá nhân, tổ chức tra cứu kho dữ liệu điện tử cá nhân — bao gồm các tài liệu đã được hệ thống lưu trữ hoặc người dùng đã nộp. Hỗ trợ kết xuất danh sách theo tiêu chí tra cứu.

### 1.2 In Scope
- Hiển thị danh mục thư mục (Card List)
- Tìm kiếm theo tên thư mục / tên tập tin (CMR-01)
- Hiển thị danh sách tập tin trong thư mục
- Xem/Tải tài liệu đính kèm (CMR-08)
- Pull to Refresh (CMR-13)
- Xử lý lỗi (CMR-07) + Empty State (CMR-14)

### 1.3 Out of Scope
⚠️ Missing — Tài liệu không ghi rõ phần nào nằm ngoài phạm vi UC. Ví dụ: Thao tác CRUD thư mục/tập tin (tạo, sửa, xóa) có nằm ngoài scope?

**Score: 4/5** ⚡ Partial

---

## 2. Actors & Stakeholders

| Actor | Type | Role & Permissions |
|-------|------|-------------------|
| Cá nhân / Tổ chức (đã đăng nhập) | Primary | Truy cập và sử dụng tất cả chức năng tra cứu |

**Score: 8/10** ⚡ Partial
- Actor được xác định rõ (Primary user = cá nhân/tổ chức đã đăng nhập).
- UC ghi rõ "Phân quyền: Cá nhân/Tổ chức đã đăng nhập" — đủ cho client test.
- *(Client-only scope: Không cần mô tả System Actor backend)*
- Cần xác nhận: Mọi vai trò đã đăng nhập đều thấy cùng danh mục thư mục? (Q11)

---

## 3. Preconditions & Postconditions

### 3.1 Preconditions
- ✅ Người dùng đã đăng nhập thành công vào ứng dụng Mobile
- ✅ Truy cập thông qua Sidebar → "Kho tài liệu cá nhân"

### 3.2 Postconditions
| After completing... | System state / Postcondition |
|--------------------|------------------------------|
| Xem danh mục thư mục | ✅ Danh sách thư mục hiển thị dạng Card, sắp xếp theo tên (1-9/A-Z) |
| Tìm kiếm thư mục/tập tin | ✅ Kết quả hiển thị sau debounce 3 giây |
| Xem danh sách tập tin | ✅ Hiển thị danh sách tập tin trong thư mục đã chọn, icon phân loại theo định dạng |
| Xem/Tải file | ⚡ Partial — Mở trình duyệt hoặc tải xuống tùy định dạng, nhưng không rõ hành vi quay lại app |
| Quay lại | ✅ Điều hướng phân cấp: Tập tin → Thư mục → Trang chủ |

**Score: 7/10** ⚡ Partial

---

## 4. UI Object Inventory & Mapping

### Màn hình 1: Danh mục tài liệu / Thư mục (2.1)

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|----------------|------|--------|---------------|-------|
| 1 | Nút Quay lại (←) | Button (Icon) | ✅ | ✅ | Tap → Quay về Trang chủ. CMR-06 |
| 2 | Tiêu đề "Tài liệu điện tử" | Label | ✅ | ✅ | Font Bold, màu trắng, căn giữa Header |
| 3 | Nút Tìm kiếm | Button (Icon) | ✅ | ✅ | Tap → Hiển thị ô tìm kiếm. CMR-01 |
| 4 | Ô tìm kiếm | Text Input | ✅ | ✅ | Placeholder: "tìm kiếm tên". Debounce 3 giây. CMR-01, CMR-14 |
| 5 | Card Thư mục — Icon | Image (Icon) | ✅ | ✅ | Nền hồng nhạt, viền đỏ, icon folder đỏ |
| 6 | Card Thư mục — Tên | Label | ✅ | ✅ | Font Bold, màu đen |
| 7 | Card Thư mục — Số lượng | Label | ✅ | ✅ | Ví dụ: "8 tài liệu". Tham chiếu CMR-11 |
| 8 | Card Thư mục — Icon mũi tên (>) | Icon | ✅ | ✅ | Căn phải card |
| 9 | Card Thư mục (tổng thể) | Card (Item) | ✅ | ✅ | Tap → Navigate đến màn hình 2.2 |

### Màn hình 2: Danh sách tập tin (2.2)

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|----------------|------|--------|---------------|-------|
| 1 | Nút Quay lại (←) | Button (Icon) | ✅ | ✅ | Tap → Quay về màn hình 2.1. CMR-06 |
| 2 | Tiêu đề (tên thư mục) | Label | ✅ | ✅ | Thay đổi theo thư mục đã chọn |
| 3 | Nút Tìm kiếm | Button (Icon) | ✅ | ✅ | Giống màn hình 2.1 |
| 4 | Ô tìm kiếm | Text Input | ✅ | ✅ | Placeholder: "tìm kiếm tên". Tìm theo tên tập tin. CMR-01 |
| 5 | Icon định dạng file | Image (Icon) | ✅ | ✅ | PDF=đỏ, JPG/PNG=xanh lá, DOCX=xanh dương, Khác=xám |
| 6 | Tên tập tin | Label | ✅ | ✅ | Hiển thị đầy đủ kèm phần mở rộng. Truncate nếu dài |
| 7 | Item Tập tin (tổng thể) | Interaction | ✅ | ✅ | Tap → Xem trực tiếp hoặc tải xuống. CMR-08 |

### CMR Cross-Check

| CMR | Status | Notes |
|-----|--------|-------|
| CMR-01 (Search Box) | ✅ | Debounce 3s, tìm gần đúng, placeholder, xóa text → reset |
| CMR-02 (Search Filter) | N/A | UC52 không nằm trong scope CMR-02 |
| CMR-03 (Dropdown) | N/A | UC52 không có dropdown |
| CMR-04 (Lazy Load) | 🔴 Conflict | UC52 KHÔNG nằm trong danh sách CMR-04, nhưng có 2 màn hình danh sách. Nếu số lượng thư mục/tập tin lớn → không có cơ chế phân trang? (Q1) |
| CMR-05 (Badge) | N/A | UC52 không có badge trạng thái |
| CMR-06 (Header) | ✅ | Nút quay lại, tiêu đề trang — mô tả đầy đủ |
| CMR-07 (Xử lý lỗi) | ✅ | Lỗi mạng, API 500, timeout 10s — client hiển thị thông báo lỗi đúng |
| CMR-08 (File viewer) | ✅ | Xem trực tiếp PDF/Image/Video, tải xuống các định dạng khác |
| CMR-11 (Định dạng số) | ⚡ Partial | UC tham chiếu CMR-11 cho "số lượng tài liệu" nhưng giá trị thường là số nguyên nhỏ |
| CMR-13 (Pull to Refresh) | ✅ | UC mô tả rõ ràng tại Section 3.3 |
| CMR-14 (Empty State) | ✅ | "Không có dữ liệu." cho no data, "Không tìm thấy kết quả." cho no result |
| CMR-16 (API Performance) | ✅ | Timeout 10s — client hiển thị lỗi timeout |

**Score: 11/15** ⚡ Partial

---

## 5. Object Attributes & Behavior Definition

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------| 
| Nút Tìm kiếm (Màn 2.1) | Enabled | Tap → Hiển thị ô tìm kiếm đè lên Header hoặc bên dưới | ⚡ Vị trí ô tìm kiếm không rõ ("đè lên" hay "bên dưới"?) |
| Ô tìm kiếm (Màn 2.1) | Enabled. Placeholder "tìm kiếm tên" | Nhập text → debounce 3s → lọc danh sách thư mục. Xóa text → reset | CMR-01 |
| Card Thư mục | Read-only | Tap → Navigate sang Màn hình 2.2 | ⚠️ Không có debounce navigation (Q8) |
| Nút Tìm kiếm (Màn 2.2) | Enabled | Tap → Hiển thị ô tìm kiếm | Giống Màn 2.1 |
| Ô tìm kiếm (Màn 2.2) | Enabled. Placeholder "tìm kiếm tên" | Nhập text → debounce 3s → lọc danh sách tập tin | CMR-01 |
| Item Tập tin | Read-only list | Tap → Mở/tải file theo CMR-08 | Empty state CMR-14 khi 0 file |

### Edge Case Checklist (Client-focused)

**Group A — Extreme Data States (client hiển thị):**
- ⚠️ Tên thư mục dài → Không có quy tắc truncate (Q3)
- ⚠️ Tên tập tin dài → UC ghi "truncate" nhưng không nêu cụ thể max chars/dòng (Q4)
- ✅ Danh sách trống → empty state "Không có dữ liệu." (CMR-14)
- ⚠️ Danh sách thư mục = 0 → UC chỉ ghi "Nếu không có hồ sơ" — không rõ "hồ sơ" là thư mục hay tập tin (Q5)
- ⚡ Số lượng tài liệu = 0 → Hiển thị "0 tài liệu" hay ẩn thư mục?

**Group B — Network & API States (hành vi client khi gặp lỗi):**
- ✅ Timeout → hiển thị thông báo timeout + nút "Thử lại"
- ✅ Lỗi mạng → thông báo CMR-07
- ⚠️ Partial API failure (danh sách thư mục OK nhưng đếm file fail) → client hiển thị gì? (Q6)

**Group C — Abnormal User Interactions (client):**
- ⚠️ Double-tap Card thư mục → navigate nhiều lần? Không có debounce (Q8)
- ⚠️ Android Back button behavior không được mô tả (Q9)

**Group D — Permissions & Session (client):**
- ⚠️ Session hết hạn → client xử lý thế nào? (Q10)
- ⚠️ Phân quyền: Mọi vai trò thấy cùng danh mục? (Q11)

**Score: 13/20** ⚡ Partial

---

## 6. Functional Logic & Workflow Decomposition

### 6.1 Function: Hiển thị danh mục thư mục (Màn hình 2.1)

**Main Flow:** Sidebar → "Kho tài liệu cá nhân" → App hiển thị loading → Danh sách thư mục dạng Card (sort tên 1-9/A-Z) → ✅ Rõ ràng
**Empty State:** 0 thư mục → "Không có dữ liệu." (CMR-14) → ⚡ Cần xác nhận "hồ sơ" = "thư mục" (Q5)
**Error Flow (client):** Timeout 10s → thông báo + "Thử lại"; Lỗi mạng → thông báo CMR-07 → ✅

**Field table (Card Thư mục):**

| Field | Data Type | Truncate | Format |
|-------|-----------|----------|--------|
| Icon thư mục | Image | — | Nền hồng nhạt, viền đỏ, icon folder đỏ |
| Tên thư mục | Text | ⚠️ Không mô tả | Font Bold, màu đen |
| Số lượng | Number + Text | — | "X tài liệu" (CMR-11) |
| Icon mũi tên (>) | Icon | — | Căn phải card |

### 6.2 Function: Tìm kiếm (Màn hình 2.1 & 2.2)

**Main Flow:** Nhấn icon Tìm kiếm → Hiển thị ô tìm kiếm → Nhập từ khóa → debounce 3s → Lọc real-time → ✅
**Alternative:** Xóa text → reset danh sách mặc định → ✅
**Empty result:** "Không tìm thấy kết quả." (CMR-14) → ✅

**Gaps:**
- ⚠️ Max length ô tìm kiếm? CMR-11 mặc định 500 ký tự? (Q2)
- ⚠️ Ô tìm kiếm hiển thị ở đâu? UC ghi "đè lên Header hoặc ngay bên dưới" — không xác định (Q7)
- ⚠️ State Persistence: Khi user tìm kiếm ở Màn 2.1, tap thư mục vào Màn 2.2, rồi quay lại → giữ state tìm kiếm? (Q12)

### 6.3 Function: Hiển thị danh sách tập tin (Màn hình 2.2)

**Main Flow:** Tap Card thư mục → loading → Danh sách tập tin (sort tên 1-9/A-Z) → ✅
**Empty State:** 0 file → "Không có dữ liệu." (CMR-14) → ✅
**File icon color mapping:**

| Format | Icon Color |
|--------|-----------|
| PDF | Đỏ |
| JPG, PNG | Xanh lá |
| DOCX | Xanh dương |
| Khác | Xám |

### 6.4 Function: Xem / Tải tài liệu (CMR-08)

**Main Flow:** Tap tập tin → Kiểm tra định dạng & quyền truy cập → Mở/Tải → ✅
- **Xem trực tiếp:** PDF, JPG, PNG, MP4, AVI, MOV → Mở trên trình duyệt thiết bị
- **Tải xuống:** DOC, DOCX, XLS, XLSX, ZIP → Tự động tải xuống
- **Không hỗ trợ:** Hiển thị "Định dạng không hỗ trợ. Vui lòng tải xuống."

**Gap:**
- ⚠️ Khi mở file trên trình duyệt, app ở trạng thái nào? Quay lại app → vẫn ở Màn 2.2? (Q13)

### 6.5 Function: Pull to Refresh (CMR-13)

**Main Flow:** Kéo xuống → Trigger refresh → Spinner → Cập nhật danh sách → Ẩn spinner → ✅
**Lỗi:** Refresh thất bại → Giữ dữ liệu cũ + thông báo lỗi CMR-07 → ✅
**Không duplicate:** Khi đang loading, không trigger lại API → ✅

**Score: 15/20** ⚡ Partial

---

## 7. Functional Integration Analysis

| Trigger / Action | Impact (Client behavior) | Status |
|-----------------|--------------------------|--------|
| Tìm kiếm thư mục → Tap thư mục → Quay lại | ⚠️ Chưa rõ: Giữ state tìm kiếm hay reset? (CMR-01 State Persistence) | ⚡ Q12 |
| Tìm kiếm tập tin → Mở file → Quay lại | ⚠️ Chưa rõ: State tìm kiếm giữ khi quay lại từ trình duyệt? | ⚡ Q13 |
| Pull to Refresh + đang tìm kiếm | ⚠️ Refresh có reset kết quả tìm kiếm hay refresh trong phạm vi search? | ⚡ Cần xác nhận |
| Lazy load + danh sách dài | 🔴 UC52 không nằm trong CMR-04. Không có cơ chế phân trang. | Q1 |

**Score: 6/10** ⚡ Partial

---

## 8. Acceptance Criteria

*(Trích từ UC52 Section 4)*

| AC-ID | Tiêu chí chấp nhận | Status |
|-------|---------------------|--------|
| AC-01 | Danh sách thư mục và tập tin phải hiển thị đúng icon phân loại và metadata (ngày, dung lượng). | 🔴 **Conflict** — UC mô tả icon phân loại rõ ràng, NHƯNG metadata "ngày, dung lượng" KHÔNG được mô tả ở bất kỳ đâu trong Section 2 (UI description). Không có trường ngày hay dung lượng trên Card thư mục hoặc Item tập tin. (Q14) |
| AC-02 | Chức năng tìm kiếm phải hoạt động real-time theo tên thư mục/tên file. | ✅ Mô tả đầy đủ với CMR-01 |
| AC-03 | Nút quay lại hoạt động đúng logic điều hướng phân cấp (Danh sách tập tin → Danh mục thư mục → Trang chủ). | ✅ Rõ ràng |
| AC-04 | Thư mục được sắp xếp theo tên (1-9/A-Z). | ✅ Rõ ràng |

**Nhận xét:**
- Chỉ có 4 AC, thiếu AC cho: xem/tải file (CMR-08), xử lý lỗi (CMR-07), pull to refresh (CMR-13), empty state (CMR-14)
- AC-01 có xung đột nghiêm trọng với mô tả UI

**Score: 6/10** ⚡ Partial

---

## 9. Non-functional Requirements

| Category | Requirement | Source |
|----------|-------------|--------|
| Performance (client) | Loading indicator cho mọi API call; Timeout 10s hiển thị lỗi | CMR-07, CMR-16 |
| File Viewing (client) | Mở PDF/Image/Video trực tiếp; tải xuống định dạng khác | CMR-08 |
| ⚠️ Accessibility | Không đề cập | Missing |
| ⚠️ Compatibility | Chỉ ghi "Portrait" — không đề cập tablet, landscape | Missing |

**Score: 3/5** ⚡ Partial

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status |
|---|---------------|---------|-------|--------|
| 1 | Feature Identity | 5 | 4/5 | ⚡ Partial |
| 2 | Objective & Scope | 5 | 4/5 | ⚡ Partial |
| 3 | Actors & User Roles | 10 | 8/10 | ⚡ Partial |
| 4 | Preconditions & Postconditions | 10 | 7/10 | ⚡ Partial |
| 5 | UI Object Inventory & Mapping | 15 | 11/15 | ⚡ Partial |
| 6 | Object Attributes & Behavior Definition | 20 | 13/20 | ⚡ Partial |
| 7 | Functional Logic & Workflow Decomposition | 20 | 15/20 | ⚡ Partial |
| 8 | Functional Integration Analysis | 10 | 6/10 | ⚡ Partial |
| 9 | Acceptance Criteria | 10 | 6/10 | ⚡ Partial |
| 10 | Non-functional Requirements | 5 | 3/5 | ⚡ Partial |
| **Total** | | **110** | **77/110** | **→ 70.0/100** |

> **Công thức:** 4+4+8+7+11+13+15+6+6+3 = **77/110** → Normalized = round((77/110) × 100, 1) = **70.0/100**
>
> **Verdict:** 70.0 ≥ 70 → ⚡ **CONDITIONALLY READY**

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q1 | High | UC52 không nằm trong CMR-04 (Lazy Load) | UC52 có 2 màn hình danh sách (thư mục, tập tin) nhưng KHÔNG nằm trong scope CMR-04 (Lazy Load). Nếu số lượng thư mục/tập tin nhiều (>20), client có cơ chế phân trang/lazy load không? | Nếu không có lazy load, danh sách lớn sẽ gây chậm app. QA không biết cần test phân trang hay không. | Open |
| Q2 | Medium | N/A (Missing) | Max length ô tìm kiếm? CMR-11 mặc định 500 ký tự — xác nhận áp dụng cho search input trên cả 2 màn hình? | Client cần block nhập quá max length | Open |
| Q3 | Medium | N/A (Missing) | Tên thư mục dài: UC không mô tả quy tắc truncate cho tên thư mục trên Card. Hiển thị bao nhiêu dòng tối đa? Có "..." ở cuối? | Không có truncate rule → QA không thể test boundary hiển thị tên thư mục | Open |
| Q4 | Medium | Bảng 2.2 — Tên tập tin | UC ghi "Truncate nếu tên quá dài" nhưng không nêu cụ thể: max bao nhiêu ký tự/dòng? Có dấu "..."? | QA cần boundary cụ thể để viết test case truncation | Open |
| Q5 | Medium | Section 3.5 — "Nếu không có hồ sơ" | Từ "hồ sơ" trong empty state mô tả chung chung. Cần xác nhận: Empty state áp dụng cho CẢ danh sách thư mục (Màn 2.1) lẫn danh sách tập tin (Màn 2.2)? Hay chỉ tập tin? | QA cần biết rõ empty state hiển thị ở màn hình nào | Open |
| Q6 | Medium | N/A (Missing) | Khi API danh mục thư mục thành công nhưng API đếm file trong thư mục fail → client hiển thị thế nào? Ẩn số lượng? Hiển thị "—"? | Ảnh hưởng test case partial error trên client | Open |
| Q7 | Medium | Section 2.1 — "Ô tìm kiếm đè lên Header hoặc ngay bên dưới" | Vị trí ô tìm kiếm khi tap nút Tìm kiếm không xác định rõ: "đè lên Header" hay "ngay bên dưới"? Cần xác nhận thiết kế. | Client UI test cần biết chính xác layout | Open |
| Q8 | Medium | N/A (Missing) | Tap nhanh liên tục Card thư mục → client navigate nhiều lần? Có debounce navigation? | Double-tap gây UX xấu hoặc crash client | Open |
| Q9 | Medium | N/A (Missing) | Android Back button: Ở Màn 2.2 → quay về Màn 2.1. Ở Màn 2.1 → quay về Trang chủ hay thoát app? Khi ô tìm kiếm đang mở → đóng ô tìm kiếm hay quay lại? | Client behavior trên Android cần rõ ràng | Open |
| Q10 | Medium | N/A (Missing) | Session hết hạn khi đang xem danh sách/tập tin → client redirect về Đăng nhập? Hiển thị thông báo? | Client cần xử lý session expiry gracefully | Open |
| Q11 | Low | "Phân quyền: Cá nhân/Tổ chức đã đăng nhập" | Mọi vai trò đã đăng nhập đều thấy cùng danh mục thư mục? Hay thư mục là riêng tư cho từng người dùng? (UC ghi "tài liệu cá nhân" nhưng cần xác nhận) | Nếu sai, client hiển thị dữ liệu không đúng | Open |
| Q12 | Medium | CMR-01 — State Persistence | State Persistence: Khi user tìm kiếm ở Màn 2.1, tap thư mục vào Màn 2.2, rồi quay lại Màn 2.1 → giữ nguyên từ khóa tìm kiếm và kết quả cũ? | QA cần biết để test state persistence | Open |
| Q13 | Medium | N/A (Missing) | Khi mở file PDF/Image/Video trên trình duyệt (CMR-08), sau đó quay lại app → app vẫn ở Màn 2.2? State tìm kiếm có giữ? | Ảnh hưởng UX và state management trên client | Open |
| Q14 | High | AC-01 — "metadata (ngày, dung lượng)" | AC-01 yêu cầu hiển thị "metadata (ngày, dung lượng)" nhưng mô tả UI trong Section 2 KHÔNG có trường ngày hay dung lượng trên Card thư mục hoặc Item tập tin. Đây là xung đột giữa AC và UI spec. Cần xác nhận: có hiển thị ngày tạo và dung lượng file không? Nếu có → cần bổ sung vào mô tả UI. | Xung đột nghiêm trọng giữa AC và UI spec. QA không biết test metadata hay không. | Open |
| Q15 | Low | N/A (Missing) | Sắp xếp thư mục/tập tin "1-9/A-Z" — với tên tiếng Việt có dấu (ví dụ: "Ấn phẩm" vs "An toàn"), thứ tự sort xử lý dấu thế nào? | Client sort order ảnh hưởng test verification | Open |

> **Tổng: 15 câu hỏi Open** (2 High, 10 Medium, 3 Low)

---

## 🟢 What's Good

- ✅ **Feature Identity rõ ràng:** UC-ID, tên chức năng, phân hệ, đối tượng thực hiện được ghi đầy đủ
- ✅ **Tham chiếu CMR nhất quán:** UC tham chiếu đúng CMR-01 (Search), CMR-06 (Header), CMR-07 (Error), CMR-08 (File viewer), CMR-13 (Pull to Refresh), CMR-14 (Empty State), CMR-16 (Timeout)
- ✅ **Luồng xử lý chính rõ ràng:** 2 màn hình với cấu trúc phân cấp logic (Thư mục → Tập tin)
- ✅ **File icon color mapping:** Mô tả rõ ràng icon màu sắc theo định dạng file
- ✅ **Error handling:** Bảng lỗi Section 3.4 mô tả đầy đủ 3 loại lỗi với thông báo cụ thể
- ✅ **File viewer behavior:** Phân loại rõ xem trực tiếp vs tải xuống vs không hỗ trợ (CMR-08)
- ✅ **Điều hướng phân cấp:** AC-03 mô tả rõ logic back navigation 3 cấp

---

## 🧪 Testability Outlook

**What CAN be tested now (client-side):**
- Happy path: Hiển thị danh mục thư mục, tìm kiếm, xem danh sách tập tin, quay lại
- Tìm kiếm: Debounce 3 giây, tìm gần đúng, xóa text → reset, no result
- File icon: Màu sắc đúng theo định dạng (PDF=đỏ, Image=xanh lá, DOCX=xanh dương, Khác=xám)
- File viewer: Mở/download đúng loại file (CMR-08)
- Empty state: "Không có dữ liệu." vs "Không tìm thấy kết quả." (CMR-14)
- Error display: Timeout, lỗi mạng, 500 — client hiển thị thông báo đúng (CMR-07)
- Pull to Refresh: Refresh thành công, refresh lỗi, không duplicate
- Sort order: Thư mục/tập tin sắp xếp 1-9/A-Z
- Header/Navigation: Nút back, tiêu đề trang (CMR-06)

**What CANNOT be tested yet (blocked by gaps):**
- Lazy Load / Phân trang danh sách (Q1)
- Boundary testing ô tìm kiếm — max length (Q2)
- Truncation tên thư mục (Q3)
- Truncation tên tập tin — boundary cụ thể (Q4)
- Empty state Màn 2.1 (Q5)
- Metadata ngày/dung lượng — xung đột AC vs UI (Q14)
- State Persistence khi quay lại từ Màn 2.2 (Q12)
- State preservation khi quay lại từ trình duyệt (Q13)
- Double-tap navigation debounce (Q8)
- Android Back button (Q9)
- Session expiration (Q10)

**Suggested test focus areas:**
- Happy path: Thư mục → Tìm kiếm → Tập tin → Mở/Tải file → Quay lại
- Alternative: Xóa search text, pull to refresh, file không hỗ trợ
- Boundary: Truncation tên file/thư mục (sau khi BA trả lời Q3, Q4)
- Error display: Timeout, network, 500 — client hiển thị đúng message
- UI checks: Icon color mapping, font bold, card layout
- CMR compliance: CMR-01, CMR-06, CMR-07, CMR-08, CMR-13, CMR-14, CMR-16
- Edge case: File tên dài, ký tự đặc biệt, tiếng Việt có dấu, thư mục trống

---

## 📌 Summary & Recommendation

UC52 là một chức năng đơn giản với 2 màn hình (Danh mục thư mục → Danh sách tập tin) và luồng xử lý rõ ràng. Tài liệu mô tả tốt các tham chiếu CMR (01, 06, 07, 08, 13, 14, 16), luồng tìm kiếm, xem/tải file, và xử lý lỗi. Tuy nhiên, vẫn còn **15 câu hỏi mở** (2 High, 10 Medium, 3 Low) cần BA giải quyết. Đặc biệt **Q14** (xung đột giữa AC-01 yêu cầu hiển thị "ngày, dung lượng" nhưng UI spec không mô tả) và **Q1** (UC52 không nằm trong CMR-04 Lazy Load nhưng có 2 danh sách) là 2 vấn đề ưu tiên cao.

**Recommendation:** ⚡ QA có thể bắt đầu thiết kế test case cho happy path, tìm kiếm, xem/tải file, error display, pull to refresh ngay. Các câu hỏi Priority High (Q1, Q14) và Medium (Q2-Q13) nên được giải quyết song song để bổ sung test coverage.

---

## 11. Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|-------------------|
| v1 | 2026-05-08 | QC Review Agent | First audit — UC52 v1. Score 70.0/100 (CONDITIONALLY READY). 15 open questions (2H, 10M, 3L). |

---

*UC Readiness Template v3.0 — For QA Test Design*
