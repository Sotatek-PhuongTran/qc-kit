# BÁO CÁO KIỂM THU YÊU CẦU (UC READINESS REVIEW)

**Tiêu đề:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư trên Mobile
**Ngày audit:** 06/05/2026
**Người thực hiện:** QC Agent (qc-uc-review-MOBILE)
**Phiên bản:** v1
**File nguồn:** `UC55_ChuyenTrangDauTu.md` (v2)

---

## 📊 Audit Summary

| #         | Knowledge Area                            | Max Pts | Score  | Status |
| --------- | ----------------------------------------- | ------- | ------ | ------ |
| 1         | Feature Identity                          | 5       | 5/5    | ✅ Complete |
| 2         | Objective & Scope                         | 5       | 3/5    | ⚡ Partial |
| 3         | Actors & User Roles                       | 10      | 8/10   | ⚡ Partial |
| 4         | Preconditions & Postconditions            | 10      | 2/10   | ⚠️ Missing |
| 5         | UI Object Inventory & Mapping             | 15      | 13/15  | ⚡ Partial |
| 6         | Object Attributes & Behavior Definition   | 20      | 14/20  | ⚡ Partial |
| 7         | Functional Logic & Workflow Decomposition | 20      | 13/20  | ⚡ Partial |
| 8         | Functional Integration Analysis           | 10      | 3/10   | ⚠️ Missing |
| 9         | Acceptance Criteria                       | 10      | 0/10   | ⚠️ Missing |
| 10        | Non-functional Requirements               | 5       | 2/5    | ⚡ Partial |
| **Total** |                                           | **110** | **63** | **57.3/100** |

### 🏁 Verdict: ❌ NOT READY

> **Score: 57.3/100** — Dưới ngưỡng 70. Ngoài ra, Knowledge Area #9 (Acceptance Criteria) = 0/10 → **Auto-fail**.
> QA chưa thể bắt đầu thiết kế test case. BA cần bổ sung các mục còn thiếu theo danh sách Gap bên dưới.

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
|----|----------|-----|----------|----------------|--------|
| Q1 | High | N/A (Missing) | **Thiếu hoàn toàn Acceptance Criteria (AC):** Toàn bộ tài liệu không có bất kỳ tiêu chí chấp nhận nào được định nghĩa dưới dạng pass/fail có thể đo lường được. | Không có AC → QA không thể xác định điều kiện PASS/FAIL cho bất kỳ test case nào. Đây là auto-fail. | Open |
| Q2 | High | N/A (Missing) | **Thiếu Preconditions & Postconditions:** Tài liệu không định nghĩa (1) điều kiện tiên quyết trước khi vào màn hình (app trạng thái gì? mạng? user đã login chưa hay anonymous?), (2) trạng thái hệ thống sau khi user thoát màn hình. | QA không thể setup môi trường test đúng cách. Không rõ liệu màn hình có hoạt động offline không. | Open |
| Q3 | High | `**Phân quyền:** Cá nhân/Tổ chức (không yêu cầu đăng nhập — public access).` | **Mâu thuẫn phân quyền với truy cập thực tế:** Tài liệu nêu không yêu cầu đăng nhập (public access), nhưng không rõ ứng dụng có cho phép truy cập màn hình này khi chưa đăng nhập không (anonymous user). Trên nhiều app, sidebar chỉ hiển thị sau khi đăng nhập. | Nếu màn hình yêu cầu đăng nhập trên thực tế nhưng tài liệu nói public, QA sẽ thiết kế test case sai luồng. | Open |
| Q4 | High | `Tap → **[TBD]** Màn hình/luồng đăng ký tư vấn chưa được xác định` | **Nút "Đăng ký tư vấn ngay" chưa có hành vi:** Tap vào nút này dẫn đến đâu? Màn hình nào? Form gì? Đây là chức năng chính của CTA nhưng bị để trống [TBD]. | Không thể viết test case cho hành động quan trọng nhất của màn hình. Chặn hoàn toàn test coverage của Section 8. | Open |
| Q5 | Medium | `Section 2 — Bộ chỉ số KPI (4 thẻ ngang)` | **Không rõ nguồn dữ liệu KPI và tần suất cập nhật:** Dữ liệu GRDP, dân số, vốn đầu tư, diện tích lấy từ API nào? Cập nhật theo năm, quý, hay realtime? Nếu API trả về null/thiếu 1 trong 4 thẻ thì UI xử lý thế nào? | QA cần biết để thiết kế test case cho trạng thái partial data hoặc null data trên từng thẻ KPI. | Open |
| Q6 | Medium | `Danh sách lĩnh vực khuyến khích là **dữ liệu động theo từng tỉnh**, lấy từ API` | **Empty state của Lĩnh vực khuyến khích:** Nếu tỉnh không có lĩnh vực khuyến khích nào được cấu hình trong API, UI hiển thị gì? (Ẩn section? Hiển thị placeholder "Chưa có thông tin"?) | QA không thể viết test case cho trạng thái dữ liệu rỗng của section này. | Open |
| Q7 | Medium | `Danh sách KCN — Component tĩnh, không có hành động tap` | **Empty state của Hạ tầng KCN:** Nếu tỉnh không có KCN nào trong API (vd: tỉnh nhỏ), UI hiển thị gì? Ẩn toàn bộ section hay hiển thị thông báo "Chưa có dữ liệu"? | Không thể test trạng thái rỗng của danh sách KCN. | Open |
| Q8 | Medium | `Ô tìm kiếm tỉnh — lọc danh sách tỉnh ngay lập tức (real-time)` | **Hành vi tìm kiếm không khớp tỉnh:** Nếu người dùng nhập từ khóa không khớp với bất kỳ tỉnh nào (ví dụ: "XYZ"), UI hiển thị gì? Empty state "Không tìm thấy kết quả" hay danh sách rỗng trơn? | QA không thể viết test case cho NULL search result. | Open |
| Q9 | Medium | `Bộ chỉ số KPI — Cuộn ngang (horizontal scroll) khi tổng chiều rộng 4 thẻ vượt quá chiều rộng màn hình` | **Điều kiện trigger horizontal scroll không rõ:** 4 thẻ KPI có luôn hiển thị đủ 4 hay có thể ít hơn? Nếu chỉ có 2-3 thẻ (thiếu dữ liệu), layout ra sao? | Cần làm rõ để QA viết test case đúng cho responsive layout. | Open |
| Q10 | Medium | `Section 6 — Vị trí địa lý — Danh sách khoảng cách` | **Số lượng item khoảng cách không xác định:** Có bao nhiêu item tối đa trong danh sách khoảng cách? Có phân trang hay cuộn không? Có thể 0 item không? | Không rõ giới hạn dữ liệu → không thể test boundary và layout khi danh sách dài/rỗng. | Open |
| Q11 | Medium | `Nút "Cổng thông tin đầu tư" — URL lấy từ API theo mã tỉnh` | **Xử lý khi URL cổng thông tin tỉnh không tồn tại/null trong API:** Nếu API không trả về URL cho một tỉnh cụ thể, nút "Cổng thông tin đầu tư" có ẩn đi không hay vẫn hiển thị nhưng disabled? | Không xác định được hành vi UI khi thiếu data. | Open |
| Q12 | Medium | `Section 7 — Liên hệ đầu tư` | **Empty state của thông tin liên hệ:** Nếu tỉnh không có số điện thoại hoặc email được cấu hình trong API, từng field (điện thoại/email) xử lý thế nào? Ẩn dòng đó hay hiển thị placeholder? | QA cần biết để test trường hợp thiếu 1 trong 2 thông tin liên hệ. | Open |
| Q13 | Medium | `Banner ảnh tỉnh — Ảnh phong cảnh/đặc trưng của tỉnh` | **Fallback khi ảnh banner không load được:** Nếu ảnh tỉnh fail (network error, 404), UI hiển thị gì? Placeholder màu? Icon mặc định? Vẫn hiển thị overlay text không? | Cần xác định để test loading failure state của banner. | Open |
| Q14 | Low | `Truy cập chức năng: Sidebar → "Đầu tư theo khu vực"` | **Thiếu mô tả vị trí trong Sidebar:** "Đầu tư theo khu vực" nằm ở đâu trong Sidebar? Thứ tự item bao nhiêu? Icon gì? | Minor — ảnh hưởng đến test case navigation. | Open |
| Q15 | Low | `Section 3 — Tổng quan đầu tư — Nội dung tổng quan` | **Không rõ nguồn nội dung "Tổng quan đầu tư":** Nội dung này là rich text từ CMS, plain text từ API, hay HTML? Hỗ trợ các định dạng đặc biệt (bold, link, list) không? | Ảnh hưởng đến test case kiểm tra render content, đặc biệt là truncation 3 dòng khi có HTML tags. | Open |
| Q16 | Low | `3.3 Xử lý lỗi — Lỗi API (HTTP 500) — Giữ nguyên màn hình.` | **Hành vi thử lại (retry) khi lỗi 500:** Khi gặp lỗi 500, có nút "Thử lại" như lỗi mạng không? Hay chỉ hiển thị thông báo rồi thôi? | Không nhất quán với behavior lỗi mạng (có nút Thử lại) → QA không rõ phân biệt 2 case này. | Open |

---

## 🟢 What's Good

- **Feature Identity rõ ràng (5/5):** UC ID, tên chức năng, phân hệ, BA phụ trách đầy đủ và chính xác.
- **UI Object Inventory chi tiết (13/15):** Tất cả 22 UI elements được catalog hóa đầy đủ với kiểu trường và quy tắc hiển thị cụ thể.
- **Quy tắc format số xuất sắc:** Các thẻ KPI (GRDP, Dân số, Vốn đầu tư, Diện tích) đều có quy tắc format số rõ ràng theo từng ngưỡng giá trị — đây là mức độ chi tiết hiếm gặp trong tài liệu BA.
- **Xử lý lỗi cơ bản có mặt (Section 3.3):** Đã định nghĩa 3 tình huống lỗi chính với thông báo và hành vi hệ thống rõ ràng.
- **Hành vi tìm kiếm real-time được mô tả đúng:** Lọc tức thì, không cần Enter, reset khi xóa text.
- **Dữ liệu động được khai báo rõ:** Các section (KCN, Lĩnh vực, Liên hệ, URL cổng thông tin) đều đánh dấu rõ "lấy từ API, không hard-code" — tốt cho traceability.
- **Hành vi tap Bản đồ rõ:** Kích hoạt geo URI scheme với app mặc định thiết bị — đúng chuẩn mobile UX.

---

## 🧪 Testability Outlook

**Có thể test ngay:**
- Navigation: Màn hình danh sách tỉnh → Chi tiết tỉnh (tap item)
- Search/Filter tỉnh: real-time, reset khi xóa text
- Hiển thị 4 thẻ KPI và format số
- Tổng quan đầu tư: truncation 3 dòng, toggle Xem thêm/Thu gọn
- Lĩnh vực khuyến khích: hiển thị chip, scroll ngang
- KCN: hiển thị card tĩnh, badge trạng thái màu sắc
- Khoảng cách địa lý: format số nguyên km
- Liên hệ: tap SĐT mở dialer, tap email mở mail app
- Xử lý lỗi: 3 case lỗi đã định nghĩa

**Chưa thể test (blocked by gaps):**
- Toàn bộ Acceptance Criteria (không có AC → không có pass/fail baseline)
- Luồng "Đăng ký tư vấn ngay" [TBD] — chặn test toàn bộ CTA
- Precondition setup (không rõ trạng thái cần thiết)
- Empty state: tìm kiếm NULL, KCN rỗng, Lĩnh vực rỗng, Liên hệ thiếu field, Banner fail
- Xử lý tỉnh không có URL cổng thông tin

**Test focus areas (sau khi giải quyết gaps):**
- Happy path: chọn tỉnh → xem đủ 8 section → tap bản đồ / SĐT / email / cổng thông tin
- Alternative: màn hình có ít KCN, nhiều lĩnh vực khuyến khích (scroll ngang)
- Boundary & validation: số KPI ở biên ngưỡng (999 vs 1K, 999K vs 1M, v.v.)
- Error & exception: mạng off, API 500, tỉnh không tìm thấy, ảnh banner lỗi
- UI checks: responsive 4 thẻ KPI trên màn hình nhỏ (SE), truncation đúng 3 dòng

---

## 📌 Summary & Recommendation

UC55 có nền tảng tốt về mô tả UI components — đặc biệt là quy tắc format số rất chi tiết và rõ ràng. Tuy nhiên, tài liệu **hoàn toàn thiếu Acceptance Criteria** (auto-fail), **thiếu Preconditions/Postconditions**, và có một **hành động CTA chính còn [TBD]** chưa được định nghĩa. Ngoài ra, toàn bộ các empty state (tìm kiếm null, section rỗng, banner lỗi) và xử lý dữ liệu thiếu từ API chưa được đề cập.

**Khuyến nghị:** ❌ Giữ lại — chưa bắt đầu test design. BA cần ưu tiên xử lý theo thứ tự:
1. **(Blockers)** Bổ sung Acceptance Criteria — Q1
2. **(Blockers)** Xác định luồng nút "Đăng ký tư vấn ngay" — Q4
3. **(Blockers)** Bổ sung Preconditions & Postconditions — Q2
4. **(High)** Làm rõ phân quyền anonymous vs. authenticated — Q3
5. **(Medium)** Định nghĩa empty state cho toàn bộ section dynamic — Q6, Q7, Q8, Q11, Q12, Q13
