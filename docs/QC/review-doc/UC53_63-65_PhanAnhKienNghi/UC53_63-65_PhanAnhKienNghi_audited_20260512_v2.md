---

# UC Readiness Review
**Functional / Black-box Test Readiness — UC53/63-65: Phản ánh kiến nghị trên Mobile**

**Ngày tạo:** 2026-05-12  
**Người audit:** QC Agent (Claude)  
**Phiên bản:** v2  
**Loại audit:** Re-Audit (dựa trên UC doc v2.2 + CMR v1.5)  

---

## Feature Brief

Chức năng "Phản ánh kiến nghị" trên Mobile App cho phép cá nhân/tổ chức đã đăng nhập thực hiện các thao tác:
- **UC53**: Tra cứu danh sách phản ánh kiến nghị đã gửi (search theo mã, filter, lazy load)
- **UC63**: Xem chi tiết phản ánh kiến nghị (read-only)
- **UC64**: Tạo mới phản ánh kiến nghị (form nhập liệu với 2 loại đối tượng: Cá nhân & Tổ chức/DN)
- **UC65**: Tra cứu trạng thái theo mã phản ánh (implement qua ô tìm kiếm trên danh sách)

Truy cập qua: Sidebar → "Phản ánh kiến nghị"

Tài liệu tham chiếu:
- UC Document: UC53_63-65_PhanAnhKienNghi.md (v2.2)
- Common Rules: CMR_Mobile.md (v1.5)
- Wireframes: 7 hình ảnh PNG

---

## Readiness Verdict

| Overall Score | Verdict |
| ------------- | ------- |
| `87 / 100` | ✅ **READY** |

*QA có thể bắt đầu thiết kế test case đầy đủ. Các gap còn lại (Q2, Q8) ở mức Low/Medium, không block test design.*

---

## 📊 Audit Summary

| # | Knowledge Area | Max | Score | Status |
|---|---|:---:|---|---|
| 1 | Feature Identity | 4 | 4/4 | ✅ Clear |
| 2 | Objective & Scope | 4 | 4/4 | ✅ Clear |
| 3 | Actors & User Roles | 9 | 7/9 | ⚡ Partial |
| 4 | Preconditions & Postconditions | 9 | 7/9 | ⚡ Partial |
| 5 | UI Object Inventory & Mapping | 14 | 14/14 | ✅ Clear |
| 6 | Object Attributes & Behavior Definition | 18 | 15/18 | ⚡ Partial |
| 7 | Functional Logic & Workflow Decomposition | 18 | 16/18 | ⚡ Partial |
| 8 | Functional Integration Analysis | 9 | 7/9 | ⚡ Partial |
| 9 | Acceptance Criteria | 10 | 8/10 | ⚡ Partial |
| 10 | Non-functional Requirements | 5 | 5/5 | ✅ Clear |
| **Total** | | **100** | **87/100** | **✅ READY** |

---

## KA #1 — Feature Identity (4đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 1.1 UC-ID + Tên tính năng | 1 | 1 | ✅ | UC §Header: "UC53/63-65 — Tra cứu & Tạo phản ánh kiến nghị trên Mobile" — nhất quán |
| 1.2 Phiên bản UC + Ngày tạo | 1 | 1 | ✅ | UC §Header: v2.2, 29/04/2026 — rõ ràng |
| 1.3 Phân hệ + Loại chức năng | 1 | 1 | ✅ | UC §Metadata: "Ứng dụng Di động (Mobile App)" / "Phản ánh kiến nghị" |
| 1.4 BA phụ trách + Context | 1 | 1 | ✅ | UC §Metadata: han.luong & huy.lai2; vị trí: Sidebar → "Phản ánh kiến nghị" |

**Subtotal KA #1: 4/4 — ✅ Clear**
**Evaluation:** Metadata đầy đủ, nhất quán giữa header và nội dung.

---

## KA #2 — Objective & Scope (4đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 2.1 Mục tiêu (WHY) | 2 | 2 | ✅ | UC §1: Mô tả rõ chức năng cho cá nhân/tổ chức xem, tạo, tra cứu phản ánh |
| 2.2 In-Scope list | 1 | 1 | ✅ | UC §1: Liệt kê UC53, UC63, UC64, UC65 với mô tả cụ thể |
| 2.3 Out-of-Scope list | 1 | 1 | ✅ | UC §1.1: Tường minh "Không hỗ trợ sửa", "Không hỗ trợ xóa", chỉ cho phép hủy bỏ |

**Subtotal KA #2: 4/4 — ✅ Clear**
**Evaluation:** v2.2 bổ sung Section 1.1 Out of Scope — giải quyết hoàn toàn gap từ v1.

---

## KA #3 — Actors & User Roles (9đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 3.1 Danh sách Primary Actors | 3 | 3 | ✅ | UC §Header + §1: Cá nhân, Tổ chức/DN (Primary); Hệ thống Mobile App (System) |
| 3.2 Phân quyền / Role | 3 | 1 | ⚡ | UC §1: "Cá nhân/Tổ chức đã đăng nhập" — không nêu rõ khác biệt hành vi ngoài form nhập liệu |
| 3.3 Permission rules | 2 | 2 | ✅ | UC §2.2.8: Nút Hủy bỏ Enable/Disable theo trạng thái; §2.4: Form tạo mới cho cả 2 loại |
| 3.4 Fallback khi role ngoài enum | 1 | 1 | ✅ | UC §1: Chỉ "Cá nhân/Tổ chức đã đăng nhập" — enum đóng, không có role khác |

**Subtotal KA #3: 7/9 — ⚡ Partial**
**Evaluation:** Thiếu mô tả khác biệt hành vi giữa Cá nhân và Tổ chức ngoài form nhập liệu (VD: danh sách có khác nhau không?).

---

## KA #4 — Preconditions & Postconditions (9đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 4.1 Preconditions — Entry point | 3 | 3 | ✅ | UC §1: Đăng nhập + Sidebar → "Phản ánh kiến nghị" |
| 4.2 Preconditions — System state | 2 | 1 | ⚡ | Implicit: Xem chi tiết cần phản ánh tồn tại; Hủy bỏ cần trạng thái cụ thể — nhưng không nêu tường minh |
| 4.3 Postconditions — Success state | 3 | 3 | ✅ | UC §3.3: Toast + mã phản ánh + quay về danh sách; §3.4: Trạng thái "Đã hủy" + refresh + quay về |
| 4.4 Postconditions — Data changes | 1 | 0 | ❌ | Lưu nháp: Không mô tả postcondition (toast? quay về đâu? trạng thái bản nháp?) — Q2 chưa giải quyết |

**Subtotal KA #4: 7/9 — ⚡ Partial**
**Evaluation:** Postcondition cho Gửi và Hủy rõ ràng. Lưu nháp vẫn thiếu postcondition (Q2 Open).

---

## KA #5 — UI Object Inventory & Mapping (14đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 5.1 Liệt kê đầy đủ component | 5 | 5 | ✅ | UC §2.1-2.4: Bảng chi tiết mọi component (search, filter, tab, FAB, card, form fields, buttons) |
| 5.2 Nhất quán UC ↔ Wireframe | 3 | 3 | ✅ | 7 wireframe cover tất cả màn hình; label/vị trí khớp UC doc |
| 5.3 State / Action / Label per component | 3 | 3 | ✅ | Mỗi component có "Quy tắc hiển thị" + "Quy tắc hành động" + default value |
| 5.4 CMR Cross-Check | 3 | 3 | ✅ | ≥85% CMR ref: CMR-01,02,03,04,05,06,07,08,09,10,12,13,14,15,16,17,18 |

**Subtotal KA #5: 14/14 — ✅ Clear**
**Evaluation:** UC doc v2.2 mô tả component rất chi tiết với format chuẩn, tham chiếu CMR đầy đủ.

---

## KA #6 — Object Attributes & Behavior Definition (18đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 6.1 System States | 5 | 5 | ✅ | UC §2.2.8: Enable/Disable nút Hủy bỏ; §2.4.6: Disabled/Enabled nút Gửi; §2.4.3: Disabled Xã/Phường khi chưa chọn Tỉnh |
| 6.2 Interaction Matrix | 5 | 5 | ✅ | UC §2.4.1: Quy tắc giữ dữ liệu khi chuyển đối tượng; §2.4.2: Cascading dropdown; §2.4.6: Tap behavior |
| 6.3 Object Behavior (reactive rules) | 4 | 2 | ⚡ | UC §2.4.6: Real-time enable/disable nút Gửi. Thiếu: debounce submit button (rapid tap), Back button Android khi đang điền form |
| 6.4 Edge Case Coverage | 4 | 3 | ⚡ | Group B (Network) ✅, Group D (Session) ✅, Group E (i18n) ✅. Group A: thiếu max file count. Group C: thiếu debounce submit |

**Subtotal KA #6: 15/18 — ⚡ Partial**
**Evaluation:** v2.2 cải thiện đáng kể (cascading dropdown, giữ dữ liệu khi chuyển tab, enable/disable nút). Còn thiếu debounce submit và max file count.

---

## KA #7 — Functional Logic & Workflow Decomposition (18đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 7.1 Main Flow (Happy Path) | 5 | 5 | ✅ | UC §3.1-3.5: 5 flow đầy đủ bước (tải danh sách, xem chi tiết, gửi mới, hủy bỏ, refresh) |
| 7.2 Alternative Flows | 4 | 4 | ✅ | UC §2.4.1: Chuyển đổi đối tượng; §2.3: Bộ lọc; §2.4.6: Lưu nháp |
| 7.3 Exception & Error Flows | 3 | 3 | ✅ | UC §3.6: Bảng lỗi đầy đủ (mạng, 500, timeout, 401) + CMR-07 |
| 7.4 Business Rules & Validation | 3 | 2 | ⚡ | UC §2.4.2-2.4.4: Max length, SĐT +84 = 9 số, email format. Thiếu: Lưu nháp không validate nhưng postcondition chưa rõ |
| 7.5 UI/UX Feedback | 3 | 2 | ⚡ | UC §3.3: Toast thành công + mã. Thiếu: feedback sau Lưu nháp (Q2 Open) |

**Subtotal KA #7: 16/18 — ⚡ Partial**
**Evaluation:** Flow chính và error handling rõ ràng. Lưu nháp vẫn là gap duy nhất còn lại (Q2).

---

## KA #8 — Functional Integration Analysis (9đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 8.1 Impact Analysis | 3 | 3 | ✅ | UC §3.5: Gửi/Hủy → auto refresh danh sách; §2.4.1: Chuyển tab giữ data |
| 8.2 Data Consistency | 3 | 3 | ✅ | UC §2.4.2: Đổi Tỉnh → clear Xã/Phường; §2.4.1: Data persist khi chuyển đối tượng |
| 8.3 Section-level error isolation | 3 | 1 | ⚡ | UC §3.6: Error handling chung. Thiếu: Lưu nháp fail → UI xử lý thế nào? Bản nháp hiển thị ở đâu trong danh sách? |

**Subtotal KA #8: 7/9 — ⚡ Partial**
**Evaluation:** Integration tốt cho Gửi/Hủy. Lưu nháp thiếu mô tả integration (bản nháp xuất hiện ở Tab nào, trạng thái gì).

---

## KA #9 — Acceptance Criteria (10đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 9.1 AC tường minh trong UC | 4 | 2 | ⚡ | UC không có section AC riêng — AC suy luận từ mô tả chức năng và validation rules |
| 9.2 AC đo lường được (pass/fail) | 3 | 3 | ✅ | UC §2.4.2-2.4.4: Validation rules cụ thể (max length, format, inline error message) — pass/fail rõ ràng |
| 9.3 AC phủ UI/Functional/Integration | 3 | 3 | ✅ | UC cover: UI (component states), Functional (5 flows), Integration (refresh, cascading) |

**Subtotal KA #9: 8/10 — ⚡ Partial**
**Evaluation:** Không có section AC riêng biệt do BA viết (9.1 = Partial). Tuy nhiên validation rules và behavior đủ chi tiết để suy luận AC.

---

## KA #10 — Non-functional Requirements (5đ)

| Sub-item | Max | Điểm | Trạng thái | Evidence / Lý do |
|---|:---:|:---:|:---:|---|
| 10.1 Performance | 1 | 1 | ✅ | UC §3.8 #3: Danh sách ≤3s, Chi tiết ≤2s; CMR-16: Timeout 10s |
| 10.2 Security | 1 | 1 | ✅ | UC §3.8 #8: HTTPS, secure storage cho token |
| 10.3 Accessibility | 1 | 1 | ✅ | UC §3.8 #5: Dynamic Type iOS, Font size Android, scale không vỡ layout |
| 10.4 Compatibility | 1 | 1 | ✅ | UC §3.8 #6: Mobile portrait, các kích thước phổ biến |
| 10.5 Reliability | 1 | 1 | ✅ | UC §3.8 #4: Offline handling + CMR-07 retry; §3.8 #7: 24/7 availability |

**Subtotal KA #10: 5/5 — ✅ Clear**
**Evaluation:** v2.2 bổ sung Section 3.8 NFR đầy đủ — cải thiện từ 5/5 (inferred) lên 5/5 (explicit).

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q2 | High | Section 2.4.6 "Nút Lưu nháp" | Khi user tap "Lưu nháp" thành công, App phản hồi gì? (Toast message? Quay về danh sách hay ở lại form?) Trạng thái bản nháp trong danh sách là gì? Có thể mở lại và chỉnh sửa bản nháp không? | Thiếu postcondition cho Lưu nháp → không thể thiết kế test case đầy đủ cho flow này | Open |
| Q8 | Medium | Section 2.4.5 "Upload file" | Tối đa bao nhiêu file có thể upload? UC doc chỉ nêu "Multi File Upload" nhưng không giới hạn số lượng file. | Ảnh hưởng đến test case upload file — cần boundary value | Open |
| Q9 | Low | Section 2.2.1 "Icon thông báo" | UC63 Header có "Icon thông báo" → Tap → Điều hướng sang UC258-259. Đây có phải phạm vi test của UC53/63-65 không? | Xác định scope test cho navigation cross-UC | Open |
| Q10 | Low | Section 2.1 "Đơn vị xử lý" | Trường "Đơn vị xử lý" trên card danh sách có quy tắc "wrap text, không truncate". Có giới hạn số dòng wrap không? | Ảnh hưởng đến UI test trên thiết bị màn hình nhỏ | Open |

---

## Resolved Questions (từ UC doc v2.2 update)

| ID gốc | Ref | Giải quyết bởi | Tóm tắt |
|---------|-----|-----------------|----------|
| Q1 | Tab vs Bộ lọc | CMR-01 v1.4 "Phạm vi tìm kiếm (Tab)" + UC §2.3 | Search áp dụng toàn bộ tab, kết quả hiển thị trên tab "Tất cả". Bộ lọc = filter nâng cao riêng biệt (Trạng thái dropdown + Date Range). Hai cơ chế hoạt động song song, không xung đột. |
| Q3 | Nút Gửi phản ánh | UC §2.4.6 v2.2 | Mặc định Disabled; Enabled khi toàn bộ field bắt buộc hợp lệ; real-time trigger mỗi khi field thay đổi (CMR-09). |
| Q4 | Validation SĐT | UC §2.4.2 #5 v2.2 | Prefix +84: đúng 9 chữ số sau prefix. Chỉ cho phép ký tự số (0-9). Prefix khác: validate theo format quốc gia. |
| Q5 | UC65 scope | UC §2.1 placeholder v2.2 | UC65 "Tra cứu trạng thái theo mã" = ô tìm kiếm trên danh sách với placeholder "Tìm kiếm theo mã phản ánh..." |
| Q6 | Out of Scope | UC §1.1 v2.2 | Không hỗ trợ sửa/xóa phản ánh đã gửi. Chỉ cho phép hủy bỏ ở trạng thái "Chờ tiếp nhận" / "Chờ bổ sung". |
| Q7 | Max length | UC §2.4.2-2.4.4 v2.2 | Họ tên: 200; Địa chỉ: 500; Người đại diện: 500; Chức vụ: 500; Tên tổ chức: 255; Tiêu đề: 200; Nội dung: 10.000 |
| Q11 | Chuyển đối tượng | UC §2.4.1 v2.2 | Dữ liệu giữ nguyên khi chuyển tab; restore đầy đủ khi quay lại; chỉ xóa khi rời Form hoặc submit thành công. Không có confirm dialog. |
| Q12 | Cascading dropdown | UC §2.4.2 #2, §2.4.3 #4 v2.2 | Đổi Tỉnh → Xã/Phường tự động clear về blank (yêu cầu chọn lại). |

---

## 🟢 What's Good

- **Out of Scope (Section 1.1):** Tường minh "Không sửa, không xóa" — loại bỏ ambiguity.
- **Nút Gửi phản ánh (Section 2.4.6):** Mô tả chi tiết Disabled/Enabled + real-time trigger — khớp CMR-09.
- **Cascading dropdown (Section 2.4.2/2.4.3):** Đổi Tỉnh → auto clear Xã/Phường — behavior rõ ràng.
- **Giữ dữ liệu khi chuyển đối tượng (Section 2.4.1):** Quy tắc restore đầy đủ, rõ ràng khi nào xóa.
- **Max length tường minh:** Mọi trường text đều có giới hạn cụ thể (200, 255, 500, 10.000).
- **SĐT validation (Section 2.4.2/2.4.3):** Prefix +84 = 9 chữ số, chỉ cho phép số, inline error cụ thể.
- **NFR Section 3.8:** Bổ sung đầy đủ Performance, Accessibility, Responsive, Offline, Security.
- **CMR cross-reference:** 17/18 CMR được tham chiếu đúng trong UC doc.
- **Xử lý lỗi (Section 3.6):** Bảng mapping rõ ràng: Tình huống → Thông báo → Hành vi.

---

## 🧪 Testability Outlook

**CAN test now:**
- Hiển thị danh sách phản ánh (card list, lazy load 20/lần, empty state, pull-to-refresh)
- Tìm kiếm theo mã phản ánh (CMR-01: debounce 3s, auto-trim, search toàn bộ tab)
- Bộ lọc nâng cao (Trạng thái dropdown, Date Range × 2, Áp dụng, Nhập lại)
- Xem chi tiết phản ánh (read-only, tất cả block, null → "-")
- Xem/tải file đính kèm (CMR-08)
- Tạo mới phản ánh — Cá nhân (form validation đầy đủ: max length, SĐT +84 = 9 số, email format)
- Tạo mới phản ánh — Tổ chức/DN (form validation đầy đủ)
- Chuyển đổi đối tượng phản ánh (giữ data, restore khi quay lại)
- Cascading dropdown Tỉnh → Xã/Phường (auto clear khi đổi Tỉnh)
- Nút Gửi phản ánh (Disabled by default, Enabled khi valid, real-time)
- Hủy bỏ phản ánh (Enable/Disable theo trạng thái, confirmation dialog, state change)
- Xử lý lỗi (mạng, 500, timeout, 401 + refresh token)
- Debounce navigation (CMR-18)
- NFR: Performance (≤3s danh sách, ≤2s chi tiết), Accessibility, Responsive

**CANNOT test yet (blocked by gaps):**
- Flow Lưu nháp đầy đủ — thiếu postcondition (Q2 Open)
- Boundary test max file upload count (Q8 Open)

**Focus areas:**
- Happy path: Tạo phản ánh Cá nhân/Tổ chức → Gửi thành công → Verify trong danh sách
- Alternative: Lưu nháp (partial), Hủy bỏ, Chuyển đổi đối tượng
- Boundary & validation: Max length (200/255/500/10000), SĐT +84 = 9 số, email, file 10MB
- Error & exception: API timeout 10s, mất mạng, session hết hạn (refresh token 15 ngày)
- UI-specific: Wrap text, badge màu, null → "-", responsive portrait
- CMR compliance: 01,02,03,04,05,06,07,08,09,10,12,13,14,15,16,17,18
- Edge case: Double-tap (debounce), Back button, cascading dropdown, chuyển đối tượng

---

## 📌 Summary & Recommendation

UC53/63-65 đạt mức **READY** (87/100) sau khi UC doc v2.2 bổ sung nhiều thông tin quan trọng: Out of Scope, max length, SĐT validation, cascading dropdown, giữ dữ liệu khi chuyển đối tượng, Enable/Disable nút Gửi, và NFR đầy đủ.

**Còn lại 2 gap cần BA làm rõ (không block test design):**
1. Postcondition cho Lưu nháp (Q2) — QA có thể thiết kế test case cho action "tap Lưu nháp" nhưng chưa verify postcondition
2. Max file upload count (Q8) — QA test với 1-5 files, chờ BA xác nhận giới hạn

**Khuyến nghị:** QA bắt đầu thiết kế test case đầy đủ ngay. Bổ sung test case cho Lưu nháp postcondition và max file count sau khi BA trả lời.

---

## 📝 Changelog (Re-Audit v1 → v2)

| Thay đổi | Nguồn | Ảnh hưởng |
|----------|-------|-----------|
| Bổ sung Out of Scope (§1.1) | UC v2.2 | KA #2: 4/5 → 4/4; Q6 Resolved |
| Placeholder search = "Tìm kiếm theo mã phản ánh" | UC v2.2 §2.1 | Q5 Resolved — UC65 = search theo mã |
| Quy tắc giữ dữ liệu khi chuyển đối tượng | UC v2.2 §2.4.1 | KA #6 cải thiện; Q11 Resolved |
| Cascading dropdown: Đổi Tỉnh → clear Xã/Phường | UC v2.2 §2.4.2/2.4.3 | Q12 Resolved |
| Max length tường minh (200/255/500/10000) | UC v2.2 §2.4.2-2.4.4 | Q7 Resolved |
| SĐT +84 = 9 chữ số, chỉ cho phép số | UC v2.2 §2.4.2/2.4.3 | Q4 Resolved |
| Nút Gửi: Disabled by default, Enabled khi valid | UC v2.2 §2.4.6 | Q3 Resolved |
| NFR Section 3.8 | UC v2.2 | KA #10: explicit thay vì inferred |
| CMR-01 v1.4: Search áp dụng toàn bộ tab | CMR v1.5 | Q1 Resolved |
| CMR-09 v1.4: Inline error format "[field] là bắt buộc" | CMR v1.5 | Thống nhất format |

**Open questions chưa được BA trả lời (giữ nguyên từ v1):** Q2, Q8, Q9, Q10
- Các câu hỏi trên chưa được BA trả lời — điểm số tại các KA liên quan (KA #4, #6, #8) giữ nguyên assessment cho phần Lưu nháp và max file count.

---

## Change Log

| Version | Date | Author | Summary of Changes |
|---------|------|--------|-------------------|
| v1 | 2026-05-11 | QC Agent (Claude) | First audit — Initial readiness review |
| v2 | 2026-05-12 | QC Agent (Claude) | Re-audit — Tích hợp UC doc v2.2 + CMR v1.5. Score: 78.2 → 87. Verdict: CONDITIONALLY READY → READY. 8/12 questions resolved. |

---

*UC Readiness Review — Generated by QC Agent*
