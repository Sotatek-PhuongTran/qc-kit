# BÁO CÁO AUDIT YÊU CẦU — UC69 Tra Cứu Văn Bản Pháp Luật (Mobile)

**Tiêu đề:** UC69 — Audit Readiness Review (First Audit)
**Ngày tạo:** 07/05/2026
**Tác giả/Agent:** QC Agent (qc-uc-review-MOBILE v2)
**Phiên bản:** v1

---

## Feature Brief

UC69 "Tra cứu văn bản pháp luật" cho phép người dùng đã đăng nhập (Cá nhân/Tổ chức) tra cứu, xem danh sách và xem chi tiết các văn bản pháp luật liên quan đến đầu tư. Chức năng gồm 3 màn hình chính: (1) Danh sách văn bản với tìm kiếm realtime theo phạm vi (Số hiệu/Trích yếu hoặc Toàn văn) và bộ lọc nâng cao 6 trường; (2) Chi tiết văn bản với đầy đủ thuộc tính, mục lục accordion, xem/tải file; (3) Văn bản liên quan. Không bao gồm chỉnh sửa, chia sẻ, bookmark.

---

## Readiness Verdict

| Overall Score        | Verdict                           |
| -------------------- | --------------------------------- |
| **71.8 / 100** | ⚠️**CONDITIONALLY READY** |

---

## 📊 Audit Summary

| #               | Knowledge Area                            | Max Pts       | Score            | Status             |
| --------------- | ----------------------------------------- | ------------- | ---------------- | ------------------ |
| 1               | Feature Identity                          | 5             | 5/5              | ✅ Complete        |
| 2               | Objective & Scope                         | 5             | 5/5              | ✅ Complete        |
| 3               | Actors & User Roles                       | 10            | 8/10             | ⚡ Partial         |
| 4               | Preconditions & Postconditions            | 10            | 6/10             | ⚡ Partial         |
| 5               | UI Object Inventory & Mapping             | 15            | 10/15            | ⚡ Partial         |
| 6               | Object Attributes & Behavior Definition   | 20            | 13/20            | ⚡ Partial         |
| 7               | Functional Logic & Workflow Decomposition | 20            | 14/20            | ⚡ Partial         |
| 8               | Functional Integration Analysis           | 10            | 6/10             | ⚡ Partial         |
| 9               | Acceptance Criteria                       | 10            | 7/10             | ⚡ Partial         |
| 10              | Non-functional Requirements               | 5             | 5/5              | ✅ Complete        |
| **Total** |                                           | **110** | **79/110** | **71.8/100** |

> Điểm thô: 79/110 → Chuẩn hóa: round((79/110)×100, 1) = **71.8/100**

---

## 🔍 CMR Cross-Check — Kết quả kiểm tra áp dụng CMR

| Component                 | CMR áp dụng         | Trạng thái                                                                                      |
| ------------------------- | --------------------- | ------------------------------------------------------------------------------------------------- |
| Ô tìm kiếm             | CMR-01                | ✅ Đã tham chiếu — nhưng thiếu AC cho debounce 3s và state persistence                     |
| Bộ lọc (Bottom Sheet)   | CMR-02                | ✅ Đã tham chiếu đủ                                                                          |
| Dropdown bộ lọc         | CMR-03                | ✅ Đã tham chiếu                                                                               |
| Lazy load danh sách      | CMR-04 (20 item/lần) | ✅ Đã tham chiếu                                                                               |
| Tag Trạng thái (badge)  | CMR-05                | ⚠️ Partial — UC liệt kê 5 trạng thái nhưng không map màu badge cụ thể cho từng loại |
| Header & Quay lại        | CMR-06                | ✅ Đã tham chiếu                                                                               |
| Error handling            | CMR-07                | ✅ Đã tham chiếu, bảng lỗi đầy đủ                                                        |
| Xem/tải file đính kèm | CMR-08                | ✅ Đã tham chiếu                                                                               |
| Date Range bộ lọc       | CMR-15                | ✅ Đã tham chiếu                                                                               |
| Pull to Refresh           | CMR-13                | ✅ Đã tham chiếu                                                                               |
| Empty state               | CMR-14                | ✅ Đã tham chiếu                                                                               |
| API timeout               | CMR-16                | ✅ Tham chiếu qua CMR-07                                                                         |

**🔴 CMR Conflicts phát hiện:**

- **CMR-02**: Quy định tất cả bộ lọc dùng Dropdown. Design "Cơ quan ban hành" là Textbox → **xung đột trực tiếp với CMR**.

---

## ⚡ Edge Case Checklist — Kết quả kiểm tra

| Nhóm | Edge Case                                                | Trạng thái                                      |
| ----- | -------------------------------------------------------- | ------------------------------------------------- |
| A     | Text overflow (tên văn bản 2 dòng + "...")           | ✅ Documented                                     |
| A     | Null data → hiển thị "-"                              | ✅ Documented                                     |
| A     | Empty accordion (mục lục không có dữ liệu)         | ❌ Missing                                        |
| A     | Nội dung toàn văn null ở màn chi tiết              | ❌ Missing — chỉ documented cho màn danh sách |
| B     | Skeleton loading cho màn chi tiết                      | ✅ Documented                                     |
| B     | Partial API failure (1 trong nhiều API call thất bại) | ❌ Missing                                        |
| B     | Debounce tìm kiếm 3s (tránh duplicate call)           | ⚡ Referenced CMR-01 nhưng không AC             |
| B     | Network loss mid lazy-load                               | ❌ Missing                                        |
| C     | Rapid tap "Xem chi tiết" → double navigation           | ❌ Missing                                        |
| C     | Android Physical Back khi Bottom Sheet đang mở         | ❌ Missing                                        |
| C     | Screen rotation                                          | N/A (Portrait only — documented)                 |
| D     | Session expire trong khi đang xem                       | ❌ Missing                                        |
| D     | Truy cập khi chưa đăng nhập                         | ❌ Missing                                        |
| E     | Multi-language                                           | N/A (ứng dụng chỉ tiếng Việt)                |

---

## 📋 Unified Gap & Question Report

| ID  | Priority | Ref                                                                                                                                       | Question                                                                                                                                                                                                                                                                                                                                                                        | Why It Matters                                                                                         | Status |
| --- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------ |
| Q1  | High     | Mục 2.2 —`"Cơ quan ban hành: Dropdown (Single)"` vs Design: Textbox                                                                 | **Xung đột design vs spec + vi phạm CMR-02:** "Cơ quan ban hành" trong Bottom Sheet là **Textbox nhập liệu** (design) nhưng spec ghi **Dropdown (Single)**. CMR-02 quy định bộ lọc dùng Dropdown. BA cần xác nhận component đúng. Nếu là Textbox: bổ sung behavior tìm kiếm (gần đúng? debounce?). Nếu là Dropdown: sửa design. | Component type khác nhau hoàn toàn → test case input behavior, validation, empty state khác nhau. | Open   |
| Q2  | High     | Mục 2.2 — Thứ tự trường spec:`Trạng thái (#5) → Lĩnh vực (#6)` vs Design: `Lĩnh vực → Trạng thái (cuối)`             | **Xung đột thứ tự trường bộ lọc:** Spec và design liệt kê thứ tự 6 trường không giống nhau. Thứ tự đúng là gì?                                                                                                                                                                                                                                     | Ảnh hưởng test case UI layout và tab order.                                                        | Open   |
| Q3  | High     | Mục 1 —`"Phân quyền: Cá nhân/Tổ chức (đã đăng nhập)"` nhưng Precondition: `"Thiết bị có kết nối mạng ổn định"` | **Thiếu precondition đăng nhập + thiếu error flow chưa đăng nhập:** Actor yêu cầu đăng nhập nhưng Preconditions không liệt kê. Không có flow xử lý khi user chưa đăng nhập cố truy cập.                                                                                                                                                       | Security test case không thể viết nếu không biết expected behavior.                              | Open   |
| Q4  | High     | Design `Màn xem chi tiết (1).png` — Block **"Xem toàn văn"** hiển thị sau "Văn bản liên quan"                           | **Thiếu spec cho block "Xem toàn văn" ở màn chi tiết:** Design có block "Xem toàn văn" riêng biệt phía dưới "Văn bản liên quan". Spec không mô tả block này: scroll behavior, height, empty state, mối liên kết với Mục lục.                                                                                                                   | Không có spec → không thể viết test case cho block này.                                         | Open   |
| Q5  | Medium   | Mục 2.3 —`"Mục lục văn bản: Accordion — Mặc định Collapse"`                                                                   | **Thiếu empty state cho Accordion:** Nếu văn bản không có mục lục, Accordion hiển thị gì? Ẩn toàn bộ section? Hiện "Không có dữ liệu"?                                                                                                                                                                                                                 | Cần biết expected behavior để viết test case edge case.                                           | Open   |
| Q6  | Medium   | N/A (Missing)                                                                                                                             | **Thiếu behavior Android Physical Back khi Bottom Sheet đang mở:** Nhấn nút Back vật lý (Android) trong khi Bottom Sheet bộ lọc đang mở → đóng sheet hay thoát màn hình danh sách?                                                                                                                                                                      | Lỗi phổ biến trên Android nếu không xử lý đúng.                                              | Open   |
| Q7  | Medium   | N/A (Missing)                                                                                                                             | **Thiếu xử lý session expire:** Nếu phiên đăng nhập hết hạn trong khi user đang xem chi tiết văn bản, hệ thống redirect về màn đăng nhập hay hiển thị toast?                                                                                                                                                                                       | Test case bảo mật/session quan trọng.                                                               | Open   |
| Q8  | Medium   | Mục 3.1 —`"Kết quả tự động cập nhật ngay khi nhập (Tham khảo CMR-01)"`                                                       | **Thiếu AC cho debounce 3 giây và state persistence:** CMR-01 quy định debounce 3s và giữ state khi back từ chi tiết. UC69 không có AC kiểm tra 2 hành vi này.                                                                                                                                                                                              | Có thể bỏ sót bug UX: gọi API liên tục khi gõ / list reset khi back.                           | Open   |
| Q9  | Medium   | Mục 3.1 — Không đề cập default sort                                                                                                 | **Thiếu default sort order:** Danh sách mặc định sắp xếp theo tiêu chí nào? (Ngày ban hành mới nhất? Tên? Số hiệu?)                                                                                                                                                                                                                                      | Cần biết để test "Danh sách hiển thị đúng thứ tự".                                          | Open   |
| Q10 | Medium   | Mục 2.1 — Component #13:`"Nội dung toàn văn (Chỉ khi chọn Radio 'Toàn văn')"`                                                  | **Thiếu behavior khi switch radio:** Khi user đang xem danh sách với Radio "Số hiệu, Trích yếu" rồi chuyển sang "Toàn văn" (hoặc ngược lại) → kết quả có reset về trang đầu không? Keyword có bị xóa không? Loading state như thế nào?                                                                                                     | Ảnh hưởng test case "Chuyển đổi phạm vi tìm kiếm".                                            | Open   |
| Q11 | Medium   | N/A (Missing)                                                                                                                             | **Thiếu xử lý Partial API failure:** Nếu API danh sách thành công nhưng API chi tiết 1 trường thất bại (VD: API văn bản liên quan lỗi) → hệ thống chặn toàn bộ màn hình hay xử lý độc lập từng block?                                                                                                                                      | Pattern quan trọng trên mobile — ảnh hưởng nhiều test case.                                     | Open   |
| Q12 | Medium   | Mục 3.2 —`"Người dùng chọn 'Tải văn bản' để lưu bản gốc"`                                                                 | **Thiếu feedback sau tải thành công:** Sau khi tap "Tải văn bản" và tải thành công, hệ thống hiển thị Toast thành công hay im lặng?                                                                                                                                                                                                                     | Cần biết expected feedback để viết test case.                                                     | Open   |
| Q13 | Medium   | Mục 2.3 —`"Tap vào item → Chuyển đến màn hình Chi tiết của văn bản đó"` (Văn bản liên quan)                           | **Thiếu back navigation từ Văn bản liên quan:** Khi tap vào văn bản liên quan → mở chi tiết → nhấn Back → quay về đâu? (Chi tiết gốc hay danh sách?)                                                                                                                                                                                                 | Navigation stack ảnh hưởng test case UX và regression.                                             | Open   |
| Q14 | Medium   | N/A (Missing)                                                                                                                             | **Thiếu xử lý rapid tap:** Tap nhanh liên tiếp vào "Xem chi tiết" → có thể navigate 2 lần không? CMR không đề cập debounce cho navigation tap.                                                                                                                                                                                                            | Bug phổ biến trên mobile.                                                                           | Open   |
| Q15 | Medium   | Mục 2.1 — Ô tìm kiếm placeholder: spec `"Tìm kiếm văn bản pháp luật..."` vs design `"Tìm kiếm văn bản..."`             | **Placeholder không khớp design vs spec.** Cần xác nhận text chính xác.                                                                                                                                                                                                                                                                                            | Ảnh hưởng test case kiểm tra UI text.                                                              | Open   |
| Q16 | Low      | Mục 2.3 —`"Hiệu lực không gian: Text (VD: Toàn quốc)"`                                                                           | **Thiếu enum giá trị cho "Hiệu lực không gian":** Chỉ ví dụ "Toàn quốc", không liệt kê các giá trị khác. Lấy từ API hay list tĩnh?                                                                                                                                                                                                                   | Boundary test cases.                                                                                   | Open   |
| Q17 | Low      | Mục 2.1 — Tag Loại văn bản và Tag Trạng thái — màu Chip                                                                         | **Thiếu màu cho Tag Loại văn bản và map màu badge Trạng thái:** CMR-05 quy định màu tổng quát nhưng không map cụ thể cho 5 trạng thái VBPL (Đang hiệu lực, Chưa hiệu lực, Không xác định, Hết hiệu lực, Hết hiệu lực một phần).                                                                                                     | UI test case kiểm tra màu badge không thể viết nếu không có mapping.                           | Open   |
| Q18 | Low      | Mục 1 —`"Trang chủ → Quick Access 'Văn bản pháp luật' hoặc Sidebar → 'Văn bản pháp luật'"`                                | **Thiếu tham chiếu UC Trang chủ và Sidebar:** Không link đến UC tương ứng.                                                                                                                                                                                                                                                                                      | Traceability và integration test.                                                                     | Open   |

---

## 🟢 What's Good

- **Feature Identity & Scope (Mục 1):** Rất đầy đủ — tên, ID, phân hệ, loại chức năng, BA, ngày, exclusions rõ ràng.
- **Null Handling:** Tất cả trường đều có quy tắc "nếu null → hiển thị '-'" — nhất quán và rõ ràng.
- **Tham chiếu CMR:** 12/16 CMR áp dụng được tham chiếu đúng — thể hiện sự tuân thủ tốt.
- **Error Handling (Mục 3.3):** Bảng lỗi với 3 tình huống cụ thể, thông báo chính xác.
- **Badge Trạng thái:** 5 trạng thái được liệt kê nhất quán giữa màn danh sách và chi tiết.
- **Acceptance Criteria (Mục 3.4):** 7 AC bao phủ hầu hết happy path chính.
- **File handling (CMR-08):** Phân biệt rõ Tải văn bản (DOC/DOCX) và Xem PDF — ẩn nút nếu không có file.

---

## 🧪 Testability Outlook

**Có thể test ngay:**

- Hiển thị danh sách với lazy load 20 item, Pull to Refresh
- Tìm kiếm realtime theo Số hiệu/Trích yếu và Toàn văn (sau khi Q1, Q2 giải đáp)
- Bộ lọc: Áp dụng / Nhập lại / Đóng không áp dụng
- Màn chi tiết: tất cả thuộc tính, null → "-", skeleton loading
- Nút Tải văn bản và Xem PDF: hiển thị/ẩn theo dữ liệu
- Mục lục Accordion: collapse/expand mặc định, scroll to anchor
- Văn bản liên quan: empty state
- Error handling: mạng, timeout, file đính kèm lỗi
- Empty state no data / no result

**Chưa thể test (blocked):**

- Truy cập khi chưa đăng nhập (Q3)
- Block "Xem toàn văn" ở màn chi tiết (Q4)
- Empty state Accordion (Q5)
- Android Back khi Bottom Sheet mở (Q6)
- Session expire (Q7)
- State persistence sau back navigation (Q8)
- Default sort order (Q9)
- Chuyển đổi radio behavior (Q10)
- Partial API failure (Q11)
- Rapid tap debounce (Q14)

**Suggested test focus areas (sau khi gaps giải đáp):**

- Happy path: Tìm kiếm + Lọc → Xem chi tiết → Tải/Xem PDF
- Alternative: Switch radio Số hiệu ↔ Toàn văn; kết hợp search + filter
- Boundary: Keyword rỗng, lazy load hết trang, all-null fields
- Error: Mất mạng, timeout 10s, file đính kèm 404
- CMR compliance: Debounce 3s, state persistence, empty state phân biệt no-data vs no-result
- Edge cases: Accordion no-data, Partial API failure, rapid tap, Android Back
- UI: Badge màu đúng trạng thái, text dài wrap/truncate đúng, placeholder text

---

## 📌 Summary & Recommendation

UC69 được viết có cấu trúc tốt, tuân thủ CMR đúng mực, và null handling nhất quán. Với điểm 71.8/100, tài liệu đạt ngưỡng **Conditionally Ready**. Tuy nhiên có **4 gaps High priority** cần giải quyết trước khi test design đầy đủ: (1) xung đột type component "Cơ quan ban hành" giữa design và spec — vi phạm trực tiếp CMR-02; (2) thứ tự trường bộ lọc không khớp; (3) thiếu precondition và error flow cho trường hợp chưa đăng nhập; (4) thiếu spec cho block "Xem toàn văn" ở màn chi tiết. Ngoài ra, workflow mới phát hiện thêm 5 edge case quan trọng chưa được cover (empty accordion, Android Back, session expire, partial API failure, rapid tap). **Khuyến nghị:** BA giải đáp Q1–Q4 trong sprint hiện tại, QA bắt đầu thiết kế test case cho các phần đã rõ song song.

---

## 📊 Tóm tắt Gap theo Priority

| Priority | Số lượng | IDs                                              |
| -------- | ----------- | ------------------------------------------------ |
| High     | 4           | Q1, Q2, Q3, Q4                                   |
| Medium   | 11          | Q5, Q6, Q7, Q8, Q9, Q10, Q11, Q12, Q13, Q14, Q15 |
| Low      | 3           | Q16, Q17, Q18                                    |

*(Tổng: 18 câu hỏi mở)*
