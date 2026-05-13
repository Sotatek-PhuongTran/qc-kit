# BÁO CÁO AUDIT YÊU CẦU — UC69 Tra Cứu Văn Bản Pháp Luật (Mobile)

**Tiêu đề:** UC69 — Audit Readiness Review (Re-Audit)
**Ngày tạo:** 07/05/2026
**Tác giả/Agent:** BA Agent (BA-audit-SRS-mobile v2)
**Phiên bản:** v2

---

## Feature Brief

UC69 "Tra cứu văn bản pháp luật" cho phép người dùng đã đăng nhập (Cá nhân/Tổ chức) tra cứu, xem danh sách và xem chi tiết các văn bản pháp luật liên quan đến đầu tư. Chức năng gồm 3 màn hình chính: (1) Danh sách văn bản với tìm kiếm realtime theo phạm vi (Số hiệu/Trích yếu hoặc Toàn văn), bộ lọc nâng cao 6 trường, lazy load, mặc định sắp xếp theo ngày ban hành mới nhất, debounce 3s; (2) Chi tiết văn bản với đầy đủ thuộc tính, mục lục accordion, block nội dung toàn văn, xem/tải file; (3) Văn bản liên quan. Không bao gồm chỉnh sửa, chia sẻ, bookmark. Yêu cầu đăng nhập — màn hình không hiển thị nếu chưa đăng nhập.

---

## Readiness Verdict

| Overall Score | Verdict |
|---|---|
| **95.5 / 100** | ✅ **READY** |

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status |
|---|---|---|---|---|
| 1 | Feature Identity | 5 | 5/5 | ✅ Complete |
| 2 | Objective & Scope | 5 | 5/5 | ✅ Complete |
| 3 | Actors & User Roles | 10 | 10/10 | ✅ Complete |
| 4 | Preconditions & Postconditions | 10 | 10/10 | ✅ Complete |
| 5 | UI Object Inventory & Mapping | 15 | 14/15 | ✅ Complete |
| 6 | Object Attributes & Behavior Definition | 20 | 19/20 | ✅ Complete |
| 7 | Functional Logic & Workflow Decomposition | 20 | 19/20 | ✅ Complete |
| 8 | Functional Integration Analysis | 10 | 9/10 | ✅ Complete |
| 9 | Acceptance Criteria | 10 | 10/10 | ✅ Complete |
| 10 | Non-functional Requirements | 5 | 4/5 | ⚡ Partial |
| **Total** | | **110** | **105/110** | **95.5/100** |

> Điểm thô: 105/110 → Chuẩn hóa: round((105/110)×100, 1) = **95.5/100**

---

## 🔍 CMR Cross-Check — Kết quả kiểm tra áp dụng CMR

| Component | CMR áp dụng | Trạng thái |
|---|---|---|
| Ô tìm kiếm | CMR-01 | ✅ Đầy đủ — debounce 3s, state persistence, placeholder theo design |
| Bộ lọc (Bottom Sheet) | CMR-02 | ✅ Đầy đủ — Áp dụng / Nhập lại / Đóng không áp dụng / Back Android đóng sheet |
| Textbox "Cơ quan ban hành" | CMR-01 | ✅ Đã xác nhận là Textbox (Search), follow behavior CMR-01, không phải Dropdown |
| Dropdown bộ lọc (4 trường còn lại) | CMR-03 | ✅ Đã tham chiếu — single select, lấy từ API |
| Lazy load danh sách | CMR-04 (20 item/lần) | ✅ Đã tham chiếu |
| Tag Trạng thái (badge) | CMR-05 | ✅ Liệt kê 5 badge: Đang hiệu lực, Chưa hiệu lực, Không xác định hiệu lực, Hết hiệu lực, Hết hiệu lực một phần |
| Header & Quay lại | CMR-06 | ✅ Đã tham chiếu |
| Error handling | CMR-07 | ✅ Đầy đủ — bảng lỗi, partial API failure xử lý độc lập từng block |
| Xem/tải file đính kèm | CMR-08 | ✅ Đầy đủ — ẩn nút khi không có file, Toast sau tải thành công |
| Date Range bộ lọc | CMR-15 | ✅ Đã tham chiếu |
| Pull to Refresh | CMR-13 | ✅ Đã tham chiếu |
| Empty state | CMR-14 | ✅ Đầy đủ — phân biệt no-data vs no-result, cả block toàn văn |
| API timeout | CMR-16 | ✅ Tham chiếu qua CMR-07 |

**🟢 Không còn CMR Conflict.**
- CMR-02 xung đột cũ (Textbox vs Dropdown) đã được giải quyết: "Cơ quan ban hành" là Textbox (Search) theo design, follow behavior CMR-01 (tìm kiếm gần đúng khi tap Áp dụng).

---

## ⚡ Edge Case Checklist — Kết quả kiểm tra

| Nhóm | Edge Case | Trạng thái |
|---|---|---|
| A | Text overflow (tên văn bản 2 dòng + "...") | ✅ Documented |
| A | Null data → hiển thị "-" | ✅ Documented |
| A | Empty accordion (mục lục không có dữ liệu) → ẩn toàn bộ section | ✅ Documented |
| A | Nội dung toàn văn null + không có mục lục → ẩn cả 2, hiện "Không có dữ liệu." | ✅ Documented |
| B | Skeleton loading cho màn chi tiết | ✅ Documented |
| B | Partial API failure (1 block lỗi, block khác bình thường) | ✅ Documented |
| B | Debounce tìm kiếm 3s (CMR-01) — có AC riêng | ✅ Documented |
| B | Network loss mid lazy-load | ⚡ Referenced qua CMR-07/CMR-13 |
| C | Rapid tap "Xem chi tiết" → chỉ navigate 1 lần | ✅ Documented |
| C | Android Physical Back khi Bottom Sheet đang mở → đóng sheet | ✅ Documented |
| C | Screen rotation | N/A (Portrait only — documented) |
| D | Session expire → redirect về màn đăng nhập | ✅ Documented (mục 3.3) |
| D | Force close → quay về Trang chủ, giữ session | ✅ Documented (mục 3.3) |
| D | Uninstall → đăng nhập lại từ đầu | ✅ Documented (mục 3.3) |
| D | Truy cập khi chưa đăng nhập → màn hình không hiển thị | ✅ Documented (Precondition) |
| E | Multi-language | N/A (ứng dụng chỉ tiếng Việt) |

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|---|---|---|---|---|---|
| Q1 | High | Mục 2.2 — "Cơ quan ban hành: Dropdown (Single)" vs Design: Textbox | Đã xác nhận: Textbox (Search), follow CMR-01, placeholder "Nhập cơ quan ban hành", tap Áp dụng thì search gần đúng. | — | ✅ Resolved |
| Q2 | High | Thứ tự 6 trường bộ lọc | Đã cập nhật theo design: Cơ quan ban hành → Khoảng ngày ban hành → Loại văn bản → Lĩnh vực → Đơn vị soạn thảo → Trạng thái. | — | ✅ Resolved |
| Q3 | High | Thiếu precondition đăng nhập | Đã bổ sung: "Người dùng đã đăng nhập. Nếu chưa đăng nhập, màn hình này không hiển thị." | — | ✅ Resolved |
| Q4 | High | Thiếu spec block "Xem toàn văn" | Đã bổ sung mục "Khung Nội dung toàn văn": scroll trong block, không giới hạn chiều cao, empty state theo CMR-14, liên kết với Mục lục. | — | ✅ Resolved |
| Q5 | Medium | Thiếu empty state Accordion | Đã xác nhận: Nếu không có mục lục → ẩn toàn bộ section Mục lục. | — | ✅ Resolved |
| Q6 | Medium | Thiếu behavior Android Physical Back khi Bottom Sheet mở | Đã xác nhận: Nhấn Back vật lý → Đóng Bottom Sheet (không thoát màn hình). | — | ✅ Resolved |
| Q7 | Medium | Thiếu xử lý session expire | Đã bổ sung mục 3.3: session expire redirect đăng nhập, force close giữ session, uninstall mất session. | — | ✅ Resolved |
| Q8 | Medium | Thiếu AC cho debounce 3s và state persistence | Đã thêm AC8 (debounce 3s) và AC9 (state persistence). | — | ✅ Resolved |
| Q9 | Medium | Thiếu default sort order | Đã xác nhận: Mặc định sắp xếp theo ngày ban hành mới nhất. | — | ✅ Resolved |
| Q10 | Medium | Thiếu behavior khi switch radio | Đã xác nhận: reset về trang đầu, keyword giữ nguyên, filter giữ nguyên. Đã thêm AC11. | — | ✅ Resolved |
| Q11 | Medium | Thiếu xử lý Partial API failure | Đã xác nhận: xử lý độc lập từng block, block lỗi hiện thông báo riêng. Đã thêm AC12. | — | ✅ Resolved |
| Q12 | Medium | Thiếu feedback sau tải thành công | Đã xác nhận: hiển thị Toast "Tải văn bản thành công." Đã bổ sung trong mục 3.2 và AC4. | — | ✅ Resolved |
| Q13 | Medium | Thiếu back navigation từ Văn bản liên quan | Đã xác nhận: Tap văn bản liên quan → chi tiết → Back → quay về chi tiết gốc. | — | ✅ Resolved |
| Q14 | Medium | Thiếu xử lý rapid tap | Đã xác nhận: debounce — chỉ nhận action đầu tiên. Đã thêm AC13. | — | ✅ Resolved |
| Q15 | Medium | Placeholder không khớp design vs spec | Đã cập nhật theo design: "Tìm kiếm văn bản..." | — | ✅ Resolved |
| Q16 | Low | Thiếu enum "Hiệu lực không gian" | Đã xác nhận: lấy từ API (không phải list tĩnh). | — | ✅ Resolved |
| Q17 | Low | Màu badge Trạng thái | Đã xác nhận: chỉ liệt kê 5 badge, không quy định màu cụ thể. | — | ✅ Resolved |
| Q18 | Low | Thiếu tham chiếu UC Trang chủ và Sidebar | Đã bổ sung: "Tham chiếu UC1 — Trang chủ Dashboard" và "Tham chiếu UC — Sidebar Navigation". | — | ✅ Resolved |

> **Tổng: 18/18 câu hỏi đã được giải đáp. Không còn câu hỏi mở.**

---

## 🟢 What's Good

- **Feature Identity & Scope:** Rất đầy đủ — tên, ID, phân hệ, loại chức năng, BA, ngày, exclusions rõ ràng. Tham chiếu UC1 và Sidebar chính xác.
- **Preconditions:** Đã bổ sung đầy đủ — yêu cầu đăng nhập và xử lý trường hợp chưa đăng nhập.
- **Bottom Sheet Bộ lọc:** 6 trường đúng thứ tự theo design, hành vi Textbox "Cơ quan ban hành" rõ ràng, Android Back đã cover.
- **Block "Nội dung toàn văn":** Spec mới đầy đủ — chiều cao không giới hạn, scroll trong block, empty state (CMR-14), liên kết với Mục lục.
- **Session handling (mục 3.3):** Bao phủ cả 3 kịch bản — session expire, force close, uninstall.
- **Acceptance Criteria:** 13 AC bao phủ toàn bộ happy path, edge case, CMR compliance (debounce, state persistence, partial API, rapid tap, switch radio).
- **Null Handling:** Nhất quán toàn document — tất cả trường null → "-".
- **Partial API failure:** Rõ ràng — xử lý độc lập từng block.
- **Toast feedback:** Đã có "Tải văn bản thành công." sau download.
- **CMR compliance:** 13/13 CMR áp dụng được tham chiếu đúng.

---

## 🧪 Testability Outlook

**Có thể test ngay (toàn bộ):**
- Hiển thị danh sách: lazy load 20 item, sort mặc định theo ngày ban hành mới nhất, Pull to Refresh
- Tìm kiếm realtime: debounce 3s, Số hiệu/Trích yếu và Toàn văn
- State Persistence: vào chi tiết → back → giữ nguyên search/filter/scroll
- Switch radio: reset trang đầu, giữ keyword và filter
- Bộ lọc Bottom Sheet: 6 trường đúng thứ tự, Textbox Cơ quan ban hành, Date Range, 4 Dropdown
- Android Back khi Bottom Sheet mở → đóng sheet
- Màn chi tiết: tất cả thuộc tính, null → "-", skeleton loading
- Block Mục lục Accordion: collapse/expand, ẩn nếu không có mục lục, tap → scroll toàn văn
- Block Nội dung toàn văn: scroll, empty state (CMR-14)
- Block Văn bản liên quan: empty state, tap → chi tiết → back → chi tiết gốc
- Nút Tải/Xem PDF: ẩn khi không có file, Toast sau tải thành công
- Partial API failure: block lỗi hiện riêng, block khác bình thường
- Rapid tap: chỉ navigate 1 lần
- Truy cập khi chưa đăng nhập: không thấy màn hình
- Session expire → redirect đăng nhập; force close → giữ session; uninstall → mất session
- Error handling: mạng, timeout, file đính kèm lỗi

**Chưa thể test (blocked):** _Không có_ — Tất cả gaps đã được giải đáp.

**Suggested test focus areas:**
- Happy path: Đăng nhập → Tìm kiếm + Lọc → Xem chi tiết → Tải/Xem PDF → Back về danh sách (giữ state)
- Alternative: Switch radio Số hiệu ↔ Toàn văn; kết hợp search + filter; tap Văn bản liên quan → chi tiết → back
- Boundary: Keyword rỗng, lazy load hết trang, all-null fields, mục lục rỗng (ẩn section)
- Error: Mất mạng, timeout 10s, file đính kèm 404, partial API failure
- CMR compliance: Debounce 3s, state persistence, empty state phân biệt no-data vs no-result
- Edge cases: Accordion empty, rapid tap debounce, Android Back, session expire, uninstall
- UI: Badge 5 trạng thái, text dài wrap/truncate, placeholder text, thứ tự 6 trường bộ lọc

---

## 📌 Summary & Recommendation

UC69 đã được nâng cấp toàn diện sau khi BA giải đáp đầy đủ 18/18 câu hỏi mở từ lần audit v1. Tài liệu đạt điểm **95.5/100**, verdict **✅ READY**. Tất cả gaps High priority đã được xử lý: component "Cơ quan ban hành" xác nhận là Textbox (Search) follow CMR-01; thứ tự 6 trường bộ lọc chuẩn hóa theo design; precondition đăng nhập đã bổ sung; block "Nội dung toàn văn" có spec đầy đủ. Các gaps Medium/Low cũng đều được giải đáp: session handling (3 kịch bản), debounce AC, default sort, switch radio behavior, partial API failure, Toast download, back navigation, rapid tap, placeholder, hiệu lực không gian (API), badge list. Không còn CMR conflict. **Khuyến nghị: QA có thể bắt đầu thiết kế test case ngay lập tức cho toàn bộ chức năng UC69.**

---

## 📊 Tóm tắt Gap theo Priority

| Priority | Số lượng | IDs |
|---|---|---|
| High | 4 | Q1, Q2, Q3, Q4 — **Tất cả đã Resolved** |
| Medium | 11 | Q5–Q15 — **Tất cả đã Resolved** |
| Low | 3 | Q16, Q17, Q18 — **Tất cả đã Resolved** |

*(Tổng: 18/18 câu hỏi đã Resolved — 0 câu hỏi còn Open)*

---

## 📝 Changelog v1 → v2

| # | Thay đổi trong SRS | Nguồn giải đáp |
|---|---|---|
| 1 | "Cơ quan ban hành" trong Bottom Sheet: đổi từ Dropdown → Textbox (Search), placeholder "Nhập cơ quan ban hành", behavior follow CMR-01 | Q1 — BA confirm |
| 2 | Thứ tự 6 trường bộ lọc cập nhật theo design: Cơ quan ban hành → Khoảng ngày ban hành → Loại văn bản → Lĩnh vực → Đơn vị soạn thảo → Trạng thái | Q2 — BA confirm |
| 3 | Precondition bổ sung: "Người dùng đã đăng nhập. Nếu chưa đăng nhập, màn hình không hiển thị." | Q3 — BA confirm |
| 4 | Bổ sung "Khung Nội dung toàn văn" trong màn chi tiết: chiều cao không giới hạn, scroll trong block, empty state CMR-14, liên kết scroll với Mục lục | Q4 — BA confirm |
| 5 | Mục lục Accordion: nếu không có mục lục → ẩn toàn bộ section | Q5 — BA confirm |
| 6 | Android Physical Back khi Bottom Sheet mở → đóng sheet (không thoát màn hình) | Q6 — BA confirm |
| 7 | Thêm mục 3.3 Xử lý session: expire redirect đăng nhập, force close giữ session, uninstall mất session | Q7 — BA confirm |
| 8 | Thêm AC8 (debounce 3s) và AC9 (state persistence) | Q8 — BA confirm |
| 9 | Default sort: mặc định theo ngày ban hành mới nhất | Q9 — BA confirm |
| 10 | Switch radio: reset trang đầu, keyword giữ nguyên, filter giữ nguyên. Thêm AC11 | Q10 — BA confirm |
| 11 | Partial API failure: xử lý độc lập từng block. Thêm AC12 | Q11 — BA confirm |
| 12 | Toast "Tải văn bản thành công." sau khi tải xong | Q12 — BA confirm |
| 13 | Back navigation từ văn bản liên quan → quay về chi tiết gốc. AC5 cập nhật | Q13 — BA confirm |
| 14 | Rapid tap debounce: chỉ nhận action đầu tiên. Thêm AC13 | Q14 — BA confirm |
| 15 | Placeholder ô tìm kiếm: "Tìm kiếm văn bản..." (theo design) | Q15 — BA confirm |
| 16 | "Hiệu lực không gian": giá trị lấy từ API (không phải list tĩnh) | Q16 — BA confirm |
| 17 | Badge Trạng thái: chỉ liệt kê 5 loại, không quy định màu cụ thể | Q17 — BA confirm |
| 18 | Tham chiếu UC1 (Trang chủ Dashboard) và UC Sidebar Navigation trong mục Truy cập chức năng | Q18 — BA confirm |
