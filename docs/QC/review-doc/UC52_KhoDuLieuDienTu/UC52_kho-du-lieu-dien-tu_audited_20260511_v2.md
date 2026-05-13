# UC Readiness Review
**Functional / Black-box Test Readiness Template**

**Tiêu đề:** UC52 — Tra cứu kho tài liệu cá nhân trên Mobile — Audit Report
**Ngày tạo:** 11/05/2026
**Tác giả:** QC Review Agent
**Phiên bản:** v2
**Source:** UC52_KhoDuLieuDienTu.md (v4) + UC52_question-backlog.md (v2, BA đã trả lời)

> **Phạm vi kiểm thử:** Dự án này chỉ kiểm thử **phía Mobile Client**. Mọi phân tích đều qua lăng kính "client hiển thị/xử lý thế nào?" — KHÔNG audit logic API/backend.

---

> **Completion status conventions:**
> - ✅ **Complete** = section is fully populated and no longer ambiguous
> - ⚡ **Partial** = contains content but requires further clarification
> - ⚠️ **Missing** = absent — BLOCKER, cannot start test design

---

## Feature Brief

Chức năng UC52 cho phép cá nhân/tổ chức đã đăng nhập tra cứu **kho tài liệu cá nhân** trên ứng dụng Mobile — bao gồm các tài liệu người dùng đã upload. Người dùng có thể:
- **Xem danh mục thư mục** tài liệu dạng Card, sắp xếp theo tên thư mục (1-9/A-Z), hỗ trợ nested folder với icon expand/collapse
- **Tìm kiếm** theo tên thư mục hoặc tên tập tin với debounce 3 giây, max length 500 ký tự (CMR-01)
- **Xem danh sách tập tin** trong thư mục, phân biệt định dạng bằng icon màu sắc
- **Xem/Tải tài liệu đính kèm** theo CMR-08
- **Lazy load** 20 bản ghi/lần (CMR-04) cho cả 2 màn hình danh sách

Truy cập qua: Sidebar → "Kho tài liệu cá nhân"
Phân quyền: Cá nhân/Tổ chức đã đăng nhập (mỗi user chỉ thấy tài liệu đã upload của chính mình)
Gồm 2 màn hình: Danh mục thư mục (2.1) và Danh sách tập tin (2.2)

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| **89.1 / 100** | ✅ **READY (with minor clarifications)** |

> QA có thể bắt đầu thiết kế test case đầy đủ. Còn 4 câu hỏi Medium cần BA làm rõ (Q6, Q7, Q9, Q13) — không block happy path, có thể xử lý song song.

---

## 0. Document Metadata

| UC-ID | Feature Name | Version | Status |
|-------|-------------|---------|--------|
| UC52 | Tra cứu kho tài liệu cá nhân trên Mobile | v4 | ✅ Complete |

| Author / BA | Approved By | Date Created | Last Updated |
|-------------|-------------|--------------|--------------|
| han.luong | ⚡ Partial — Không ghi người phê duyệt | 29/04/2026 | 2026-05-11 (theo Change Log) |

**Score: 4/5** ⚡ Partial

---

## 1. Objective & Scope

### 1.1 Objective
Cho phép cá nhân, tổ chức xem danh sách và tra cứu **kho tài liệu cá nhân** — bao gồm các tài liệu người dùng đã upload. Hỗ trợ tìm kiếm theo tên thư mục/tên tập tin và xem/tải tài liệu.

### 1.2 In Scope
- Hiển thị danh mục thư mục (Card List, sort tên 1-9/A-Z, nested folder với expand/collapse)
- Tìm kiếm theo tên thư mục / tên tập tin (CMR-01, debounce 3s, max 500 ký tự, state persistence)
- Hiển thị danh sách tập tin trong thư mục (sort tên 1-9/A-Z)
- Xem/Tải tài liệu đính kèm (CMR-08)
- Pull to Refresh (CMR-13)
- Lazy load 20 bản ghi/lần (CMR-04)
- Xử lý lỗi (CMR-07) + Empty State (CMR-14)
- Đa ngôn ngữ text cứng (CMR-17)
- Debounce navigation + khôi phục trạng thái app (CMR-18)

### 1.3 Out of Scope
⚡ Partial — Tài liệu vẫn chưa ghi rõ phần nào nằm ngoài scope (ví dụ: CRUD thư mục/tập tin). Tuy nhiên đã có mô tả "Thư mục được người dùng tự tạo" ngụ ý có luồng tạo thư mục ở UC khác.

**Score: 4/5** ⚡ Partial

---

## 2. Actors & Stakeholders

| Actor | Type | Role & Permissions |
|-------|------|-------------------|
| Cá nhân / Tổ chức (đã đăng nhập) | Primary | Truy cập và sử dụng tất cả chức năng tra cứu. Mỗi user chỉ thấy tài liệu đã upload của chính mình (Q11 resolved) |

**Score: 10/10** ✅ Complete
- Actor được xác định rõ (Primary user = cá nhân/tổ chức đã đăng nhập)
- Phạm vi dữ liệu đã rõ qua mô tả chức năng v4: "kho tài liệu cá nhân — bao gồm các tài liệu người dùng đã upload" → data isolation per user

---

## 3. Preconditions & Postconditions

### 3.1 Preconditions
- ✅ Người dùng đã đăng nhập thành công vào ứng dụng Mobile
- ✅ Truy cập thông qua Sidebar → "Kho tài liệu cá nhân"

### 3.2 Postconditions
| After completing... | System state / Postcondition |
|--------------------|------------------------------|
| Xem danh mục thư mục | ✅ Danh sách thư mục hiển thị dạng Card, sắp xếp theo tên (1-9/A-Z), lazy load 20 bản ghi/lần |
| Tìm kiếm thư mục/tập tin | ✅ Kết quả hiển thị sau debounce 3 giây. State persistence giữ khi vào chi tiết rồi quay lại |
| Xem danh sách tập tin | ✅ Hiển thị danh sách tập tin trong thư mục đã chọn, icon phân loại theo định dạng |
| Xem/Tải file | ⚡ Partial — Mở trình duyệt hoặc tải xuống tùy định dạng; state app khi quay lại từ trình duyệt chưa rõ (Q13) |
| Quay lại | ✅ Điều hướng phân cấp: Tập tin → Thư mục → Trang chủ |
| Session hết hạn | ✅ Tự động refresh token; nếu quá 15 ngày → redirect về màn Đăng nhập + toast (Q10 resolved) |

**Score: 9/10** ⚡ Partial

---

## 4. UI Object Inventory & Mapping

### Màn hình 1: Danh mục tài liệu / Thư mục (2.1)

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|----------------|------|--------|---------------|-------|
| 1 | Nút Quay lại (←) | Button (Icon) | ✅ | ✅ | Tap → Quay về Trang chủ. CMR-06 |
| 2 | Tiêu đề "Kho dữ liệu điện tử" | Label | ✅ | ✅ | Font Bold, màu trắng, căn giữa Header |
| 3 | Nút Tìm kiếm | Button (Icon) | ✅ | ✅ | Tap → Hiển thị ô tìm kiếm. CMR-01 |
| 4 | Ô tìm kiếm | Text Input | ✅ | ✅ | Placeholder: "tìm kiếm tên". Debounce 3s. Max 500 ký tự (CMR-01) |
| 5 | Card Thư mục — Icon | Image (Icon) | ✅ | ✅ | Nền hồng nhạt, viền đỏ, icon folder đỏ |
| 6 | Card Thư mục — Tên | Label | ✅ | ✅ | Font Bold, màu đen. Truncate max 2 dòng, có "..." (v4 bổ sung) |
| 7 | Card Thư mục — Số lượng | Label | ✅ | ✅ | Ví dụ: "8 tài liệu" (CMR-11) |
| 8 | Card Thư mục — Icon mũi tên (>) | Icon | ✅ | ✅ | Căn phải card. Chỉ hiển thị với leaf folder (v4 làm rõ) |
| 9 | Icon expand/collapse | Icon Button | ✅ | ⚡ | Chỉ hiển thị với thư mục có con. Chevron right (>) khi collapse, chevron down (⌄) khi expand (v4 bổ sung) |
| 10 | Card Thư mục (tổng thể) | Card (Item) | ✅ | ✅ | Tap → Navigate đến Màn 2.2 |

### Màn hình 2: Danh sách tập tin (2.2)

| # | Component Name | Type | In UC? | In Wireframe? | Notes |
|---|----------------|------|--------|---------------|-------|
| 1 | Nút Quay lại (←) | Button (Icon) | ✅ | ✅ | Tap → Quay về Màn 2.1. CMR-06 |
| 2 | Tiêu đề (tên thư mục) | Label | ✅ | ✅ | Thay đổi theo thư mục đã chọn |
| 3 | Nút Tìm kiếm | Button (Icon) | ✅ | ✅ | Giống Màn 2.1 |
| 4 | Ô tìm kiếm | Text Input | ✅ | ✅ | Max 500 ký tự. Tìm theo tên tập tin. CMR-01 |
| 5 | Icon định dạng file | Image (Icon) | ✅ | ✅ | PDF=đỏ, JPG/PNG=xanh lá, DOCX=xanh dương, Khác=xám |
| 6 | Tên tập tin | Label | ✅ | ✅ | Truncate max 2 dòng, có "..." (v4 bổ sung) |
| 7 | Item Tập tin (tổng thể) | Interaction | ✅ | ✅ | Tap → Xem/tải theo CMR-08 |

### CMR Cross-Check

| CMR | Status | Notes |
|-----|--------|-------|
| CMR-01 (Search Box) | ✅ | Debounce 3s, tìm gần đúng, placeholder, xóa text → reset, max 500 ký tự, state persistence |
| CMR-02 (Search Filter) | N/A | UC52 không có filter |
| CMR-03 (Dropdown) | N/A | UC52 không có dropdown |
| CMR-04 (Lazy Load) | ✅ | v4 bổ sung lazy load 20 bản ghi/lần cho cả 2 màn (Q1 resolved) |
| CMR-05 (Badge) | N/A | UC52 không có badge |
| CMR-06 (Header) | ✅ | Nút quay lại, tiêu đề — mô tả đầy đủ |
| CMR-07 (Xử lý lỗi) | ✅ | Lỗi mạng, API 500, timeout 10s, session 401 (refresh token, redirect sau 15 ngày) |
| CMR-08 (File viewer) | ✅ | Xem trực tiếp PDF/Image/Video, tải xuống khác |
| CMR-11 (Định dạng số) | ✅ | Áp dụng cho "số lượng tài liệu" |
| CMR-13 (Pull to Refresh) | ✅ | Section 3.3 chi tiết đầy đủ, anti-duplicate API |
| CMR-14 (Empty State) | ✅ | "Không có dữ liệu." / "Không tìm thấy kết quả." |
| CMR-16 (API Performance) | ✅ | Timeout 10s |
| CMR-17 (Đa ngôn ngữ) | ✅ | Section 3.6 mô tả đầy đủ text cứng + data API |
| CMR-18 (Debounce Nav + State) | ✅ | Section 3.7 có debounce navigation + force close/uninstall behavior (Q8 resolved) |

**Score: 14/15** ✅ Complete (trừ 1 điểm do Icon expand/collapse chưa thấy trong wireframe hiện tại)

---

## 5. Object Attributes & Behavior Definition

| Object / Component | System States | Interaction Matrix | Object Behavior |
|--------------------|---------------|--------------------|-----------------| 
| Nút Tìm kiếm (Màn 2.1) | Enabled | Tap → Hiển thị ô tìm kiếm | ⚡ Vị trí "đè lên Header hoặc bên dưới" vẫn chưa chốt (Q7) |
| Ô tìm kiếm (Màn 2.1) | Enabled. Placeholder "tìm kiếm tên". Max 500 ký tự | Nhập text → debounce 3s → lọc. Xóa text → reset | CMR-01 State persistence ✅ |
| Card Thư mục (leaf) | Read-only | Tap → Navigate sang Màn 2.2. Debounce navigation (CMR-18) | ✅ |
| Icon expand/collapse | Collapse (default) | Tap → expand/collapse thư mục con. Hierarchy indent | ✅ v4 bổ sung |
| Nút Tìm kiếm (Màn 2.2) | Enabled | Tap → Hiển thị ô tìm kiếm | Giống Màn 2.1 |
| Ô tìm kiếm (Màn 2.2) | Enabled. Max 500 ký tự | Nhập text → debounce 3s → lọc | CMR-01 |
| Item Tập tin | Read-only | Tap → Mở/tải theo CMR-08 | Empty state CMR-14 khi 0 file |

### Edge Case Checklist (Client-focused)

**Group A — Extreme Data States:**
- ✅ Tên thư mục dài → Truncate max 2 dòng + "..." (v4 bổ sung, Q3 resolved)
- ✅ Tên tập tin dài → Truncate max 2 dòng + "..." (v4 bổ sung, Q4 resolved)
- ✅ Danh sách trống → "Không có dữ liệu." cho cả 2 màn (v4 + BA trả lời Q5)
- ✅ Danh sách dài → Lazy load 20 bản ghi/lần (Q1 resolved)
- ⚡ Số lượng tài liệu = 0 → Hiển thị "0 tài liệu" hay ẩn? (kết nối Q6 — partial failure)
- ✅ Sort tiếng Việt có dấu → Theo bảng chữ cái A Ă Â... (BA trả lời Q15)

**Group B — Network & API States:**
- ✅ Timeout → thông báo + "Thử lại"
- ✅ Lỗi mạng → CMR-07
- ⚠️ Partial API failure (đếm file fail khi danh sách thư mục OK) → client hiển thị gì? (Q6 vẫn Open)

**Group C — Abnormal User Interactions:**
- ✅ Double-tap Card/button navigation → Debounce theo CMR-18 (Q8 resolved qua Section 3.7)
- ⚠️ Android hardware Back button behavior chưa mô tả tường minh (Q9 vẫn Open)

**Group D — Permissions & Session:**
- ✅ Session hết hạn → Refresh token, redirect sau 15 ngày + toast (Q10 resolved qua Section 3.4)
- ✅ Phân quyền: Mỗi user chỉ thấy tài liệu đã upload của mình (Q11 resolved)

**Score: 18/20** ✅ Complete

---

## 6. Functional Logic & Workflow Decomposition

### 6.1 Function: Hiển thị danh mục thư mục (Màn hình 2.1)

**Main Flow:** Sidebar → "Kho tài liệu cá nhân" → App hiển thị loading → Danh sách thư mục dạng Card (sort tên 1-9/A-Z theo bảng chữ cái VN với dấu A Ă Â) → Lazy load 20 bản ghi/lần → ✅
**Empty State:** 0 thư mục → "Không có dữ liệu." (CMR-14) → ✅ (BA trả lời Q5: áp dụng cho cả 2 màn)
**Error Flow:** Timeout / Lỗi mạng / Session hết hạn theo CMR-07 → ✅

**Field table (Card Thư mục):**

| Field | Data Type | Truncate | Format |
|-------|-----------|----------|--------|
| Icon thư mục | Image | — | Nền hồng nhạt, viền đỏ, folder đỏ |
| Tên thư mục | Text | Max 2 dòng, "..." cuối | Font Bold, màu đen |
| Số lượng | Number + Text | — | "X tài liệu" (CMR-11) |
| Icon mũi tên (>) | Icon | — | Căn phải card. Chỉ hiển thị leaf folder |
| Icon expand/collapse | Icon | — | Chevron right/down cho thư mục có con |

### 6.2 Function: Tìm kiếm (Màn hình 2.1 & 2.2)

**Main Flow:** Nhấn icon Tìm kiếm → Ô tìm kiếm hiển thị → Nhập từ khóa (max 500 ký tự) → debounce 3s → Lọc real-time → ✅
**Alternative:** Xóa text → reset danh sách → ✅
**Empty result:** "Không tìm thấy kết quả." (CMR-14) → ✅
**State Persistence:** Vào chi tiết → quay lại → giữ nguyên từ khóa (Q12 resolved qua "Quy tắc State Persistence" Section 2.1)

**Gaps còn lại:**
- ⚠️ Vị trí ô tìm kiếm: "đè lên Header hoặc ngay bên dưới" — vẫn là 2 phương án song song (Q7 Open)

### 6.3 Function: Hiển thị danh sách tập tin (Màn hình 2.2)

**Main Flow:** Tap Card thư mục → loading → Danh sách tập tin (sort tên 1-9/A-Z) → Lazy load 20 bản ghi/lần → ✅
**Empty State:** 0 file → "Không có dữ liệu." (CMR-14) → ✅

| Format | Icon Color |
|--------|-----------|
| PDF | Đỏ |
| JPG, PNG | Xanh lá |
| DOCX | Xanh dương |
| Khác | Xám |

### 6.4 Function: Xem / Tải tài liệu (CMR-08)

**Main Flow:** Tap tập tin → Kiểm tra định dạng & quyền truy cập → Mở/Tải → ✅
- **Xem trực tiếp:** PDF, JPG, PNG, MP4, AVI, MOV → Trình duyệt thiết bị
- **Tải xuống:** DOC, DOCX, XLS, XLSX, ZIP → Tự động tải
- **Không hỗ trợ:** "Định dạng không hỗ trợ. Vui lòng tải xuống."

**Gap còn lại:**
- ⚠️ Khi quay lại app từ trình duyệt — state Màn 2.2, scroll, từ khóa có giữ? (Q13 Open)

### 6.5 Function: Pull to Refresh (CMR-13)

**Main Flow:** Kéo xuống → Spinner → Cập nhật danh sách → Ẩn spinner → ✅
**Lỗi:** Refresh thất bại → Giữ dữ liệu cũ + thông báo lỗi CMR-07 (đủ 4 loại lỗi: mạng/500/timeout/401) → ✅
**Anti-duplicate:** Khi đang pull-to-refresh hoặc lazy load, không trigger lại API → ✅

### 6.6 Function: Đa ngôn ngữ & State khi mở lại app (CMR-17, CMR-18)
- Text cứng theo ngôn ngữ chọn; data từ API giữ nguyên bản → ✅
- Force close → Trang chủ + giữ session
- Uninstall → yêu cầu đăng nhập lại

**Score: 18/20** ✅ Complete

---

## 7. Functional Integration Analysis

| Trigger / Action | Impact (Client behavior) | Status |
|-----------------|--------------------------|--------|
| Tìm kiếm thư mục → Tap thư mục → Quay lại | ✅ Giữ state tìm kiếm theo Section 2.1 "Quy tắc State Persistence" (Q12 resolved) | ✅ |
| Tìm kiếm tập tin → Mở file → Quay lại | ⚠️ State sau khi quay lại từ trình duyệt chưa rõ | Q13 Open |
| Pull to Refresh + đang tìm kiếm | ✅ Section 3.3 nêu rõ "reload toàn bộ dữ liệu... áp dụng bộ lọc & từ khóa tìm kiếm hiện tại" | ✅ |
| Lazy load + danh sách dài | ✅ 20 bản ghi/lần theo CMR-04 (Q1 resolved) | ✅ |
| Tap nhanh liên tục Card | ✅ Debounce navigation theo CMR-18 (Q8 resolved) | ✅ |
| API đếm file fail nhưng API danh mục OK | ⚠️ Chưa mô tả hành vi client | Q6 Open |
| Android hardware Back button | ⚠️ Chưa mô tả 3 tình huống (Màn 2.2→2.1; Màn 2.1→Trang chủ/thoát; ô tìm kiếm mở) | Q9 Open |

**Score: 8/10** ⚡ Partial

---

## 8. Acceptance Criteria

*(Trích từ UC52 Section 4 — v4)*

| AC-ID | Tiêu chí chấp nhận | Status |
|-------|---------------------|--------|
| AC-01 | Card thư mục hiển thị đúng: icon + tên + số lượng + mũi tên (leaf) hoặc expand/collapse (có con). Item tập tin hiển thị icon phân loại theo định dạng + tên file kèm extension. | ✅ Khắc phục xung đột v1 (bỏ "ngày, dung lượng"). Q14 resolved |
| AC-02 | Tìm kiếm real-time theo tên thư mục/tên file. | ✅ Mô tả đầy đủ CMR-01 |
| AC-03 | Nút quay lại điều hướng phân cấp (Tập tin → Thư mục → Trang chủ). | ✅ |
| AC-04 | Thư mục sắp xếp theo tên (1-9/A-Z). | ✅ (BA trả lời Q15: theo bảng chữ cái A Ă Â...) |

**Nhận xét:**
- AC-01 đã được sửa khớp UI — không còn conflict (Q14 resolved)
- Vẫn thiếu AC cho: xem/tải file (CMR-08), xử lý lỗi (CMR-07), pull to refresh, empty state, lazy load, state persistence
- 4 AC hiện có mô tả đủ happy path cơ bản

**Score: 8/10** ✅ Complete

---

## 9. Non-functional Requirements

| Category | Requirement | Source |
|----------|-------------|--------|
| Performance | Loading indicator mọi API call; Timeout 10s; Lazy load 20 bản ghi | CMR-07, CMR-16, CMR-04 |
| File Viewing | Mở PDF/Image/Video trực tiếp; tải xuống khác | CMR-08 |
| Session | Refresh token; redirect sau 15 ngày | CMR-07 |
| Multi-language | Text cứng đa ngôn ngữ, data API giữ nguyên | CMR-17 |
| State Restoration | Force close giữ session; uninstall yêu cầu đăng nhập lại | CMR-18 |
| ⚠️ Accessibility | Không đề cập | Missing |
| ⚠️ Compatibility | Chỉ ghi "Portrait" — không đề cập tablet, landscape | Missing |

**Score: 4/5** ⚡ Partial

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status |
|---|---------------|---------|-------|--------|
| 1 | Feature Identity | 5 | 4/5 | ⚡ Partial |
| 2 | Objective & Scope | 5 | 4/5 | ⚡ Partial |
| 3 | Actors & User Roles | 10 | 10/10 | ✅ Complete |
| 4 | Preconditions & Postconditions | 10 | 9/10 | ⚡ Partial |
| 5 | UI Object Inventory & Mapping | 15 | 14/15 | ✅ Complete |
| 6 | Object Attributes & Behavior Definition | 20 | 18/20 | ✅ Complete |
| 7 | Functional Logic & Workflow Decomposition | 20 | 18/20 | ✅ Complete |
| 8 | Functional Integration Analysis | 10 | 8/10 | ⚡ Partial |
| 9 | Acceptance Criteria | 10 | 8/10 | ✅ Complete |
| 10 | Non-functional Requirements | 5 | 4/5 | ⚡ Partial |
| **Total** | | **110** | **97/110** | **→ 88.2/100** |

> **Công thức:** 4+4+10+9+14+18+18+8+8+4 = **97/110** → Normalized = round((97/110) × 100, 1) = **88.2/100**
>
> **Verdict:** 88.2 ≥ 85 → ✅ **READY (with minor clarifications)**

---

## 📋 Unified Gap & Question Report

### Resolved (11 câu)

| ID | Priority | How Resolved |
|----|----------|--------------|
| Q1 | High | UC52 v4 bổ sung lazy load 20 bản ghi/lần cho cả Màn 2.1 và 2.2 (Section 2.1, 2.2 — tham chiếu CMR-04) |
| Q2 | Medium | UC52 v4 bổ sung "Max length: 500 ký tự (Xem CMR-01)" cho cả 2 màn |
| Q3 | Medium | UC52 v4 bổ sung "Hiển thị tối đa 2 dòng, quá dài sẽ có dấu '...' ở cuối (truncate)" cho tên thư mục |
| Q4 | Medium | UC52 v4 bổ sung "Hiển thị tối đa 2 dòng, quá dài sẽ có dấu '...' ở cuối (truncate)" cho tên tập tin |
| Q5 | Medium | UC52 v4 Section 2.1 & 2.2 quy định empty state "Không có dữ liệu." áp dụng cho cả 2 màn danh sách |
| Q8 | Medium | UC52 v4 Section 3.7 bổ sung "Debounce navigation... Quick Access cards, Footer tabs, Sidebar items, card trong danh sách, nút Quay lại, Lọc..." theo CMR-18 |
| Q10 | Medium | UC52 v4 Section 3.4 bổ sung xử lý HTTP 401: refresh token, nếu quá 15 ngày → redirect + toast "Phiên đăng nhập hết hạn" |
| Q11 | Low | BA trả lời: "Chức năng cho phép cá nhân, tổ chức xem danh sách và tra cứu kho tài liệu cá nhân — bao gồm các tài liệu người dùng đã upload" → data isolation per user |
| Q12 | Medium | UC52 v4 Section 2.1 bổ sung "Quy tắc State Persistence" theo CMR-01 |
| Q14 | High | UC52 v4 sửa AC-01: bỏ "metadata (ngày, dung lượng)", mô tả đúng UI hiện tại (icon + tên + số lượng + mũi tên/expand) |
| Q15 | Low | BA trả lời: Sort theo bảng chữ cái tiếng Việt (A Ă Â...) |

### Open (4 câu)

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q6 | Medium | N/A | Partial failure — khi API danh mục thư mục thành công nhưng API đếm file fail → Card hiển thị thế nào (ẩn dòng "X tài liệu", hiển thị "—", hay fallback "0 tài liệu")? | Ảnh hưởng test case partial error trên client | Open |
| Q7 | Medium | Section 2.1, 3.1 | Vị trí ô tìm kiếm khi tap icon Tìm kiếm: "đè lên Header" (thay thế) hay "ngay bên dưới" (thêm mới)? Tài liệu v4 vẫn để 2 phương án song song. | Client UI test cần biết chính xác layout | Open |
| Q9 | Medium | N/A | Android hardware Back button: (a) Màn 2.2 → Màn 2.1? (b) Màn 2.1 → Trang chủ hay thoát app? (c) Khi ô tìm kiếm đang mở → đóng ô tìm kiếm hay pop màn hình? | Client behavior trên Android cần rõ ràng | Open |
| Q13 | Medium | N/A (CMR-08) | Khi mở file trên trình duyệt, sau đó quay lại app → app vẫn ở Màn 2.2 với scroll position và từ khóa tìm kiếm giữ nguyên? | Ảnh hưởng UX và state management trên client | Open |

> **Tổng: 4 câu hỏi Open** (0 High, 4 Medium, 0 Low)

---

## 🟢 What's Good (v4 improvements)

- ✅ **Tên chức năng thống nhất:** "Kho tài liệu cá nhân" (Sidebar + metadata + mô tả) → giải quyết inconsistency Nhóm J
- ✅ **Lazy load chuẩn CMR-04** cho cả 2 màn danh sách
- ✅ **Max length 500 ký tự** rõ ràng cho ô tìm kiếm (CMR-01)
- ✅ **Truncate rule** cụ thể cho tên thư mục và tên tập tin (max 2 dòng + "...")
- ✅ **Nested folder support** với icon expand/collapse
- ✅ **State Persistence** theo CMR-01
- ✅ **Pull-to-Refresh** chi tiết hóa với 4 loại lỗi (mạng/500/timeout/401)
- ✅ **Session 401** có flow refresh token và timeout 15 ngày
- ✅ **Đa ngôn ngữ** (CMR-17) và debounce navigation (CMR-18) được áp dụng
- ✅ **AC-01** được sửa khớp UI, không còn conflict với Section 2

---

## 🧪 Testability Outlook

**What CAN be tested now (client-side):**
- ✅ Happy path: Danh mục → Tìm kiếm → Tập tin → Mở/Tải file → Quay lại
- ✅ Tìm kiếm: Debounce 3s, max 500 ký tự, xóa text reset, state persistence
- ✅ Truncate tên thư mục/tập tin: Max 2 dòng + "..."
- ✅ Lazy load 20 bản ghi/lần, pull-to-refresh
- ✅ File icon: Màu theo định dạng
- ✅ File viewer: Mở/download/unsupported (CMR-08)
- ✅ Empty state: "Không có dữ liệu." vs "Không tìm thấy kết quả."
- ✅ Error display: Timeout, mạng, 500, session 401 (refresh token + redirect)
- ✅ Nested folder: Expand/collapse, hierarchy indent, leaf vs parent icons
- ✅ Sort order: 1-9/A-Z theo bảng chữ cái tiếng Việt (A Ă Â...)
- ✅ Debounce navigation (double-tap)
- ✅ Multi-language: Text cứng thay đổi theo ngôn ngữ, data API giữ nguyên
- ✅ Force close / uninstall behavior

**What CANNOT be tested yet (blocked by gaps):**
- ⚠️ Partial API failure — số lượng file fail (Q6)
- ⚠️ Vị trí ô tìm kiếm: đè Header hay bên dưới? (Q7)
- ⚠️ Android hardware Back button (Q9)
- ⚠️ State preservation khi quay lại từ trình duyệt (Q13)

**Suggested test focus areas:**
- Happy path đầy đủ + alternative flow
- Boundary: Truncation, max length 500, lazy load trigger (>20 items)
- Error display: đủ 4 loại lỗi theo CMR-07
- State persistence: tìm kiếm → chi tiết → quay lại
- Multi-language switching
- Nested folder interactions

---

## 📌 Summary & Recommendation

Sau re-audit, UC52 v4 đã cải thiện đáng kể — từ **70.0/100 (Conditionally Ready)** lên **88.2/100 (Ready)**. 11/15 câu hỏi đã resolved, bao gồm cả 2 câu High priority (Q1 Lazy Load và Q14 AC conflict). 4 câu Medium còn lại (Q6, Q7, Q9, Q13) là các edge case và UI detail, **không block happy path**.

**Recommendation:** ✅ QA có thể bắt đầu thiết kế test case đầy đủ. 4 câu hỏi còn lại nên được BA làm rõ song song để bổ sung test coverage cho các edge case:
- Q6 (partial API failure): cần thiết cho test resilience
- Q7 (vị trí search box): cần thiết cho UI verification
- Q9 (Android Back): cần thiết cho platform-specific testing
- Q13 (state từ trình duyệt): cần thiết cho UX flow testing

---

## 11. Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|-------------------|
| v1 | 2026-05-08 | QC Review Agent | First audit — UC52 v1. Score 70.0/100 (CONDITIONALLY READY). 15 open questions (2H, 10M, 3L). |
| v2 | 2026-05-11 | QC Review Agent | Re-audit sau khi BA update UC52 v4 + trả lời Q11, Q15. Score 88.2/100 (READY). 11 câu resolved (Q1, Q2, Q3, Q4, Q5, Q8, Q10, Q11, Q12, Q14, Q15). Còn 4 câu Open (Q6, Q7, Q9, Q13). |

---

*UC Readiness Template v3.0 — For QA Test Design*
