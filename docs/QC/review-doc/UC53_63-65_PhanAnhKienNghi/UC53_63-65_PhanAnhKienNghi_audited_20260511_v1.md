---

# UC Readiness Review
**Functional / Black-box Test Readiness — UC53/63-65: Phản ánh kiến nghị trên Mobile**

**Ngày tạo:** 2026-05-11  
**Người audit:** QC Agent (Claude)  
**Phiên bản:** v1  
**Loại audit:** First Audit  

---

## Feature Brief

Chức năng "Phản ánh kiến nghị" trên Mobile App cho phép cá nhân/tổ chức đã đăng nhập thực hiện các thao tác:
- **UC53**: Tra cứu danh sách phản ánh kiến nghị đã gửi (search, filter, lazy load)
- **UC63**: Xem chi tiết phản ánh kiến nghị (read-only, với các block: Thông tin chung, Người gửi, Nội dung, Tài liệu đính kèm, Kết quả xử lý, Lịch sử xử lý, nút Hủy bỏ)
- **UC64**: Tạo mới phản ánh kiến nghị (form nhập liệu với 2 loại đối tượng: Cá nhân & Tổ chức/DN)
- **UC65**: Xử lý trạng thái (Hủy bỏ phản ánh ở trạng thái "Chờ tiếp nhận" hoặc "Chờ bổ sung")

Truy cập qua: Sidebar → "Phản ánh kiến nghị"

Tài liệu tham chiếu:
- UC Document: UC53_63-65_PhanAnhKienNghi.md (v1.1)
- Common Rules: CMR_Mobile.md (v1.1)
- Wireframes: 7 hình ảnh PNG cho các màn hình danh sách, bộ lọc, chi tiết (2 phần), tạo mới (3 phần)

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| `78.2 / 100` | ⚡ **CONDITIONALLY READY** |

*QA có thể bắt đầu thiết kế test cho các khu vực rõ ràng; các mục flagged cần được giải quyết song song.*

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status |
|---|----------------|---------|-------|--------|
| 1 | Feature Identity (title, ID, context) | 5 | 5/5 | ✅ Clear |
| 2 | Objective & Scope | 5 | 4/5 | ⚡ Partial |
| 3 | Actors & User Roles | 10 | 8/10 | ⚡ Partial |
| 4 | Preconditions & Postconditions | 10 | 7/10 | ⚡ Partial |
| 5 | UI Object Inventory & Mapping | 15 | 13/15 | ⚡ Partial |
| 6 | Object Attributes & Behavior Definition | 20 | 15/20 | ⚡ Partial |
| 7 | Functional Logic & Workflow Decomposition | 20 | 16/20 | ⚡ Partial |
| 8 | Functional Integration Analysis | 10 | 7/10 | ⚡ Partial |
| 9 | Acceptance Criteria | 10 | 6/10 | ⚡ Partial |
| 10 | Non-functional Requirements | 5 | 5/5 | ✅ Clear |
| **Total** | | **110** | **86/110** | **78.2/100** |

**Normalization:** round((86 / 110) × 100, 1) = **78.2 / 100**

---

## 0. Document Metadata
- UC-ID: UC53/63-65
- Feature Name: Tra cứu & Tạo phản ánh kiến nghị trên Mobile
- Version: v1.1
- Status: In Review
- Author/BA: han.luong & huy.lai2
- Date Created: 2026-04-29
- Last Updated: 2026-05-07

## 1. Objective & Scope

### 1.1 Objective
Chức năng cho phép cá nhân, tổ chức xem danh sách phản ánh kiến nghị đã gửi, xem chi tiết từng phản ánh, tạo mới phản ánh kiến nghị, và hủy bỏ phản ánh ở trạng thái cho phép.

Score: 4/5 — ⚡ Partial
Lý do: Mô tả mục tiêu rõ ràng nhưng thiếu phạm vi OUT OF SCOPE. Không rõ UC65 (tra cứu theo mã) được implement cụ thể ở đâu trên giao diện.

### 1.2 In Scope
- Xem danh sách phản ánh kiến nghị (UC53)
- Xem chi tiết phản ánh kiến nghị (UC63)
- Tạo mới phản ánh kiến nghị (UC64)
- Hủy bỏ phản ánh kiến nghị (UC65 — implicit)
- Tìm kiếm, lọc danh sách
- Lazy load (20 bản ghi/lần)
- Pull to refresh

### 1.3 Out of Scope
⚠️ **Missing** — Tài liệu không nêu rõ phạm vi ngoài. Cần BA xác nhận:
- Có cho phép chỉnh sửa phản ánh đã gửi không?
- Có chức năng xóa bản nháp không?
- UC65 "Tra cứu trạng thái theo mã" — cụ thể màn hình/flow nào?

## 2. Actors & Stakeholders
Score: 8/10 — ⚡ Partial

| Actor | Type | Role & Permissions |
|-------|------|-------------------|
| Cá nhân (đã đăng nhập) | Primary | Xem, tạo, hủy phản ánh kiến nghị |
| Tổ chức/DN (đã đăng nhập) | Primary | Xem, tạo, hủy phản ánh kiến nghị |
| Hệ thống (Mobile App) | System | Xử lý API, hiển thị dữ liệu, validation |

Gap: Không rõ sự khác biệt về quyền hạn giữa Cá nhân và Tổ chức/DN ngoài form nhập liệu. Có role nào khác (VD: Admin) có thể ảnh hưởng đến giao diện không?

## 3. Preconditions & Postconditions
Score: 7/10 — ⚡ Partial

### 3.1 Preconditions
- Người dùng đã đăng nhập thành công
- Người dùng truy cập qua Sidebar → "Phản ánh kiến nghị"

Gap: Không nêu rõ precondition cho từng sub-function. VD: Xem chi tiết cần có phản ánh tồn tại; Hủy bỏ cần trạng thái "Chờ tiếp nhận" hoặc "Chờ bổ sung".

### 3.2 Postconditions
| After completing... | System state / Postcondition |
|--------------------|------------------------------|
| Gửi phản ánh thành công | Hiển thị toast thành công với mã phản ánh. Tự động refresh danh sách. Quay về danh sách. |
| Lưu nháp | Bản nháp được lưu (⚠️ thiếu mô tả trạng thái sau lưu nháp) |
| Hủy bỏ phản ánh | Trạng thái chuyển thành "Đã hủy". Tự động refresh danh sách. Quay về danh sách. |

## 4. UI Object Inventory & Mapping
Score: 13/15 — ⚡ Partial

(Liệt kê đầy đủ các component từ UC doc và wireframes, bao gồm: ô tìm kiếm, nút lọc, tab trạng thái, FAB "Gửi phản ánh", card list, các block chi tiết, form tạo mới với 2 chế độ Cá nhân/Tổ chức, nút Hủy bỏ, nút Lưu nháp, nút Gửi phản ánh)

Gap chính:
- Tab trạng thái trên danh sách (Tất cả / Đang xử lý / Đã trả lời / Đã đóng / Nháp): Mô tả trong UC doc nhưng wireframe không thể hiện rõ mối quan hệ giữa Tab và Bộ lọc. Khi filter có trường "Trạng thái" dropdown, liệu Tab có còn hoạt động không? Xung đột tiềm ẩn.
- Trường "Quận/Huyện" không có trong form Cá nhân/Tổ chức — chỉ có Tỉnh/Thành phố và Xã/Phường. Xác nhận đây là thiết kế có chủ đích?
- Max length cho nhiều trường (Địa chỉ, Nội dung phản ánh, Người đại diện, Chức vụ) không được nêu rõ — cần CMR-11 default 500 ký tự hay có giá trị riêng?

## 5. Object Attributes & Behavior Definition
Score: 15/20 — ⚡ Partial

(Phân tích chi tiết trạng thái, tương tác, behavior của từng component)

Gap chính - Edge Cases:
- **Group A (Extreme Data):** Thiếu quy tắc truncate/wrap cho tên file đính kèm (UC doc nói truncate bằng "..." cho tên file dài nhưng không nêu giới hạn ký tự). Thiếu max items cho danh sách file đính kèm (tối đa bao nhiêu file upload?). Thiếu xử lý null/undefined cho các field chi tiết.
- **Group B (Network/API):** Đã có phần xử lý lỗi (Section 3.6) đầy đủ. ✅
- **Group C (Abnormal User):** Thiếu quy tắc rapid consecutive taps trên nút Gửi phản ánh (debounce submit?). Thiếu xử lý Back button Android khi đang điền form (có confirm dialog hỏi lưu nháp?).
- **Group D (Permissions/Session):** Đã tham chiếu CMR-07 (session 401) và CMR-18 (debounce navigation, force close). ✅
- **Group E (i18n):** Đã tham chiếu CMR-17. ✅

## 6. Functional Logic & Workflow Decomposition
Score: 16/20 — ⚡ Partial

(Phân tích 5 luồng chính: 3.1-3.5 trong UC doc)

Gap chính:
- **Lưu nháp (Section 2.4.6):** Nút "Lưu nháp" mô tả "Không yêu cầu validate bắt buộc" nhưng thiếu: Postcondition sau lưu nháp (toast message? quay về danh sách?). Trạng thái của bản nháp trong danh sách? Có thể chỉnh sửa bản nháp không?
- **CMR-09 vs UC doc:** CMR-09 nói "Nút Submit Disabled khi form chưa hợp lệ. Enabled khi tất cả trường bắt buộc hợp lệ." Nhưng UC doc Section 2.4.6 không mô tả trạng thái Enable/Disable cho nút "Gửi phản ánh" — chỉ nói tap → validate → gọi API. Xung đột: Nút Gửi phản ánh luôn Enable hay Disable theo CMR-09?
- **Validation SĐT:** "Đúng định dạng số điện thoại Việt Nam" — thiếu regex/pattern cụ thể. Bao nhiêu số? Có chấp nhận format +84xxx không?
- **Tab trạng thái vs Bộ lọc:** UC doc mô tả cả Tab trạng thái (Section 2.1) và Dropdown Trạng thái trong bộ lọc (Section 2.3). Khi user chọn Tab "Đang xử lý" rồi mở bộ lọc, trạng thái dropdown có auto-sync với Tab không?

## 7. Functional Integration Analysis
Score: 7/10 — ⚡ Partial

| Trigger Function | Impact Analysis | Data Consistency |
|-------------------|-----------------|------------------|
| Gửi phản ánh thành công | Danh sách phản ánh cần refresh để hiển thị phản ánh mới | ✅ Section 3.5 xác nhận auto refresh |
| Hủy bỏ phản ánh | Trạng thái thay đổi → danh sách cần refresh | ✅ Section 3.4 xác nhận |
| Lưu nháp | Bản nháp xuất hiện trong Tab "Nháp" | ⚠️ Thiếu mô tả - bản nháp hiển thị ở đâu, trạng thái gì |
| Thay đổi Tỉnh/Thành phố | Danh sách Xã/Phường phải reset & reload theo tỉnh mới | ⚡ Mô tả "Disabled khi chưa chọn Tỉnh/TP" nhưng thiếu reset khi đổi tỉnh |

## 8. Acceptance Criteria
Score: 6/10 — ⚡ Partial
Tài liệu UC không có section AC riêng biệt. Các AC cần được suy ra từ mô tả chức năng và Business Rules. Thiếu AC cho nhiều scenario: empty state, error handling, edge cases.

## 9. Non-functional Requirements
Score: 5/5 — ✅ Clear
- Performance: CMR-16 (API timeout 10s cho tất cả API calls)
- Error handling: CMR-07 (lỗi mạng, 500, 404, 401, timeout)
- Loading state: CMR-07 (first-load full-screen, lazy load spinner cục bộ)
- Đa ngôn ngữ: CMR-17
- Debounce: CMR-18
- Pull to Refresh: CMR-13
- Form: CMR-09 (validation realtime, upload file JPG/PNG/PDF max 5MB)

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q1 | High | Section 2.1 "Tab trạng thái" + Section 2.3 "Dropdown Trạng thái" | Có xung đột giữa Tab trạng thái trên danh sách và Dropdown Trạng thái trong bộ lọc. Khi user chọn Tab cụ thể rồi mở bộ lọc, dropdown trạng thái có đồng bộ với Tab đang chọn không? Hai cơ chế lọc này hoạt động song song hay thay thế nhau? | Ảnh hưởng đến thiết kế test cho chức năng tìm kiếm/lọc — cần rõ ràng logic để xây dựng test case chính xác | Open |
| Q2 | High | Section 2.4.6 "Nút Lưu nháp" | Khi user tap "Lưu nháp" thành công, hệ thống phản hồi gì? (Toast message? Quay về danh sách hay ở lại form?) Trạng thái bản nháp trong danh sách là gì? Có thể mở lại và chỉnh sửa bản nháp không? | Thiếu postcondition cho Lưu nháp → không thể thiết kế test case đầy đủ cho flow này | Open |
| Q3 | High | Section 2.4.6 "Nút Gửi phản ánh" vs CMR-09 | CMR-09 quy định "Nút Submit Disabled khi form chưa hợp lệ. Enabled khi tất cả trường bắt buộc hợp lệ." Nhưng UC doc không mô tả trạng thái Enable/Disable cho nút "Gửi phản ánh". Nút này có tuân theo CMR-09 (disabled by default, enabled khi valid) hay luôn enabled và validate khi tap? | Xác định rõ behavior để thiết kế test case validation chính xác | Open |
| Q4 | Medium | Section 3.3 "Validation SĐT" | "Đúng định dạng số điện thoại Việt Nam" — cần cung cấp regex/pattern cụ thể. SĐT bao nhiêu chữ số? Có chấp nhận format quốc tế +84xxx không (theo prefix dropdown trên wireframe)? | Không có pattern cụ thể → không thể thiết kế test case boundary cho SĐT | Open |
| Q5 | Medium | Section 1 "Mô tả chức năng" | UC65 "Tra cứu trạng thái theo mã" được liệt kê trong phạm vi nhưng không có giao diện/flow riêng. Chức năng này được implement qua ô tìm kiếm trên danh sách (search theo mã phản ánh) hay có giao diện riêng? | Cần xác nhận để đánh giá đúng scope test | Open |
| Q6 | Medium | Section 2.4 | Không có phạm vi Out of Scope. Có cho phép chỉnh sửa phản ánh đã gửi (ở trạng thái Nháp)? Có chức năng xóa bản nháp? | Thiếu phạm vi ngoài → risk miss test scenario | Open |
| Q7 | Medium | Section 2.4.2/2.4.3 | Max length cho các trường: Địa chỉ, Nội dung phản ánh (Textarea), Người đại diện, Chức vụ — không được nêu rõ trong UC doc. Áp dụng CMR-11 default 500 ký tự hay có giá trị riêng? | Cần boundary value để thiết kế test case validation | Open |
| Q8 | Medium | Section 2.4.5 "Upload file" | Tối đa bao nhiêu file có thể upload? UC doc chỉ nêu "Multi File Upload" nhưng không giới hạn số lượng file. CMR-09 nói max 5MB/file nhưng UC doc nói max 10MB/file — ưu tiên giá trị nào? (UC doc ghi "Lưu ý: Dung lượng tối đa có thể khác nhau tùy theo mô tả chi tiết từng trường trong từng UC cụ thể" → 10MB cho UC này?) | Ảnh hưởng đến test case upload file | Open |
| Q9 | Low | Section 2.2 "Icon thông báo" trên Header Chi tiết | UC63 Header có "Icon thông báo" → Tap → Điều hướng sang UC258-259. Đây có phải phạm vi test của UC53/63-65 không? | Xác định scope test cho navigation cross-UC | Open |
| Q10 | Low | Section 2.1 | Trường "Đơn vị xử lý" trên card danh sách có quy tắc "wrap text, không truncate". Nhưng wireframe hiển thị text dài có thể gây vấn đề layout trên thiết bị có màn hình nhỏ. Có giới hạn số dòng wrap không? | Ảnh hưởng đến UI test trên các thiết bị khác nhau | Open |
| Q11 | Medium | Section 2.4.1 "Đối tượng phản ánh" | Khi user đang điền form Cá nhân rồi chuyển sang Tổ chức/DN (hoặc ngược lại), dữ liệu đã nhập ở form trước có bị xóa không? Có hiển thị confirm dialog không? | Ảnh hưởng đến UX test khi chuyển đổi đối tượng phản ánh | Open |
| Q12 | Medium | Section 2.4.2/2.4.3 "Tỉnh/Thành phố" | Khi user đã chọn Tỉnh và Xã/Phường, sau đó thay đổi Tỉnh → Xã/Phường có tự động reset về "Chọn xã/phường" không? (CMR-03 không mô tả cascading dropdown) | Cần xác nhận behavior cascading dropdown | Open |

---

## 🟢 What's Good

- **Feature Identity (Section 0):** Rõ ràng, đầy đủ thông tin metadata (UC-ID, BA phụ trách, phiên bản, ngày tạo). ✅
- **Mô tả giao diện chi tiết:** Các bảng mô tả trường (Section 2.1-2.4) rất chi tiết với format chuẩn: Tên trường, Kiểu trường, Giá trị mặc định, Được sửa, Bắt buộc, Mô tả/Ghi chú.
- **Tham chiếu CMR đầy đủ:** Hầu hết các component đều tham chiếu đúng CMR tương ứng (CMR-01 Search, CMR-02 Filter, CMR-03 Dropdown, CMR-04 Lazy Load, CMR-05 Badge, CMR-07 Error, CMR-08 File Viewer, CMR-09 Form, CMR-12 Date Format, CMR-14 Empty State, CMR-15 Date Range, CMR-16 API Performance, CMR-17 Multi-language, CMR-18 Debounce).
- **Xử lý lỗi (Section 3.6):** Bảng lỗi rõ ràng với mapping: Tình huống lỗi → Thông báo hiển thị → Hành vi hệ thống. ✅
- **Wireframes:** Đủ 7 wireframe cover tất cả màn hình chính.

---

## 🧪 Testability Outlook

**What CAN be tested now:**
- Hiển thị danh sách phản ánh kiến nghị (card list, lazy load, empty state)
- Tìm kiếm gần đúng (CMR-01)
- Xem chi tiết phản ánh (read-only, tất cả block thông tin)
- Xem/tải file đính kèm (CMR-08)
- Tạo mới phản ánh (form validation cơ bản cho Cá nhân & Tổ chức)
- Hủy bỏ phản ánh (confirmation dialog, state change)
- Xử lý lỗi (mạng, 500, timeout, 401)
- Pull to refresh (CMR-13)
- Debounce navigation (CMR-18)

**What CANNOT be tested yet (blocked by gaps):**
- Flow Lưu nháp đầy đủ (thiếu postcondition — Q2)
- Validation SĐT chính xác (thiếu pattern — Q4)
- Interaction giữa Tab trạng thái và Bộ lọc (xung đột — Q1)
- Enable/Disable nút Gửi phản ánh (xung đột CMR-09 — Q3)
- Boundary test cho max length các trường thiếu spec (Q7)

**Suggested test focus areas (once gaps are resolved):**
- Happy path: Tạo phản ánh Cá nhân/Tổ chức → Gửi thành công → Verify trong danh sách
- Alternative scenarios: Lưu nháp, Hủy bỏ, Chuyển đổi loại đối tượng
- Boundary & validation: Max length, format SĐT/email, upload file (size/format)
- Error & exception: API timeout, mất mạng giữa chừng, session hết hạn
- UI-specific: Responsive layout, wrap/truncate text, badge màu sắc
- CMR compliance: Verify tất cả CMR referenced (01,02,03,04,05,06,07,08,09,10,12,13,14,15,16,17,18)
- Cascading dropdown: Tỉnh → Xã/Phường dependency
- Edge case: Double-tap nút Gửi, Back button khi đang điền form

---

## 📌 Summary & Recommendation

Tài liệu UC53/63-65 đạt mức **CONDITIONALLY READY** (78.2/100). Nhìn chung, UC doc được viết chi tiết với format chuẩn, tham chiếu CMR đầy đủ, và có wireframe cover tất cả màn hình. Tuy nhiên, có một số gap quan trọng cần BA giải quyết trước khi QA hoàn thiện test design:

**Cần giải quyết ngay (High priority):**
1. Xung đột Tab trạng thái vs Dropdown trạng thái trong bộ lọc (Q1)
2. Thiếu postcondition cho flow Lưu nháp (Q2)
3. Xung đột CMR-09 về trạng thái Enable/Disable nút Gửi phản ánh (Q3)

**Cần làm rõ (Medium priority):**
4. Pattern validation SĐT (Q4)
5. Scope UC65 (Q5)
6. Out of Scope (Q6)
7. Max length các trường thiếu spec (Q7)
8. Giới hạn upload file (Q8)
9. Behavior chuyển đổi đối tượng phản ánh (Q11)
10. Cascading dropdown behavior (Q12)

**Khuyến nghị:** QA có thể bắt đầu thiết kế test case cho các flow cơ bản (xem danh sách, xem chi tiết, tạo mới - happy path, hủy bỏ) song song với việc BA trả lời các câu hỏi trên. Các test case liên quan đến gap sẽ được bổ sung sau khi có câu trả lời từ BA.

---

## Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|-------------------|
| v1 | 2026-05-11 | QC Agent (Claude) | First audit — Initial readiness review |

---

*UC Readiness Review — Generated by QC Agent*

