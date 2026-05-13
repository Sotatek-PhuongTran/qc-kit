# UC54 — Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên Mobile

| Thông tin | Chi tiết |
| --- | --- |
| **Tài liệu** | UC Readiness Review — Audit Report |
| **UC** | UC54 — Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên Mobile |
| **Phiên bản UC** | v2 (29/04/2026) |
| **Ngày tạo** | 08/05/2026 |
| **Tác giả** | Claude Agent (QC Review) |
| **Phiên bản báo cáo** | v1 |

---

## Tài liệu đầu vào

| # | Tài liệu | Đường dẫn | Trạng thái |
| --- | --- | --- | --- |
| 1 | Common Mobile Rules | `docs/BA/SRS-mobile/Common rule/CMR_Mobile.md` | ✅ Đã đọc |
| 2 | UC54 Spec | `docs/BA/SRS-mobile/UC54_BaoCaoDaNop/UC54_BaoCaoDaNop.md` | ✅ Đã đọc |
| 3 | Wireframe | `docs/BA/SRS-mobile/UC54_BaoCaoDaNop/UC 54. Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên mobile.png` | ✅ Đã đọc |
| 4 | API Spec | N/A | ⚠️ Không được cung cấp |

---

## 📊 Audit Summary

| # | Knowledge Area | Max Pts | Score | Status |
| --- | --- | --- | --- | --- |
| 1 | Feature Identity (title, ID, context) | 5 | 5/5 | ✅ Complete |
| 2 | Objective & Scope | 5 | 4/5 | ⚡ Partial |
| 3 | Actors & User Roles | 10 | 7/10 | ⚡ Partial |
| 4 | Preconditions & Postconditions | 10 | 6/10 | ⚡ Partial |
| 5 | UI Object Inventory & Mapping | 15 | 11/15 | ⚡ Partial |
| 6 | Object Attributes & Behavior Definition | 20 | 12/20 | ⚡ Partial |
| 7 | Functional Logic & Workflow Decomposition | 20 | 14/20 | ⚡ Partial |
| 8 | Functional Integration Analysis | 10 | 5/10 | ⚡ Partial |
| 9 | Acceptance Criteria | 10 | 6/10 | ⚡ Partial |
| 10 | Non-functional Requirements | 5 | 3/5 | ⚡ Partial |
| **Total** | | **110** | **73/110** | **66.4/100** |

### Verdict: ❌ NOT READY (66.4/100)

> Điểm số 66.4/100 nằm dưới ngưỡng 70 → QA chưa nên bắt đầu thiết kế test case cho đến khi các gap được giải quyết.

---

## Chi tiết đánh giá từng Knowledge Area

### KA1 — Feature Identity (5/5) ✅

- **Tiêu đề**: "Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên Mobile" — rõ ràng, đủ ngữ cảnh.
- **ID**: UC54 — xác định.
- **Ngữ cảnh**: Thuộc module Mobile, liên quan đến quản lý báo cáo nhà đầu tư.
- **Phiên bản**: v2 ngày 29/04/2026 — có tracking version.

### KA2 — Objective & Scope (4/5) ⚡

- **Mục tiêu**: §1 nêu rõ — cho phép người dùng tra cứu, tìm kiếm, lọc và xem chi tiết các báo cáo đã nộp. ✅
- **Phạm vi**: Có đề cập đồng bộ real-time giữa Web và Mobile. ✅
- **Gap**: Phạm vi đồng bộ real-time thiếu chi tiết — không mô tả khi nào đồng bộ, cơ chế gì (WebSocket/polling/push), fallback khi mất kết nối. ⚡
- **Gap**: Không rõ phạm vi "loại báo cáo" bao gồm những loại nào. ⚡

### KA3 — Actors & User Roles (7/10) ⚡

- **Actors**: §1 xác định hai loại: Cá nhân và Tổ chức. ✅
- **Phân quyền**: Người dùng chỉ xem được báo cáo của mình. ✅
- **Gap**: Không mô tả sự khác biệt hành vi/giao diện giữa Cá nhân và Tổ chức. ⚡
- **Gap**: Không nêu rõ role nào có quyền truy cập chức năng này (Admin? User thường? Tất cả?). ⚡

### KA4 — Preconditions & Postconditions (6/10) ⚡

- **Precondition**: Đã đăng nhập, truy cập qua Sidebar → "Báo cáo đã nộp". ✅
- **Gap**: Không có postcondition nào được định nghĩa (trạng thái hệ thống sau khi hoàn thành flow). ⚡
- **Gap**: §2.1 dòng 53-54 đề cập "chuyển sang tab khác" nhưng không có hệ thống tab nào được định nghĩa trong UI spec — mâu thuẫn nội bộ. ⚠️
- **Gap**: Không mô tả điều kiện tiên quyết về kết nối mạng/real-time. ⚡

### KA5 — UI Object Inventory & Mapping (11/15) ⚡

- **Màn hình Danh sách (§2.1)**: Header, Stat Banner (6 thẻ), Search Box, Filter Button, Bottom Sheet (3 dropdown), Card List — đầy đủ. ✅
- **Màn hình Chi tiết (§2.2)**: Header, Banner thông tin, Quick Action, 7 Section thu gọn, Modal Lịch sử — đầy đủ cấu trúc. ✅
- **Wireframe**: Có hình ảnh mockup khớp với mô tả cơ bản. ✅
- **Gap**: AC5 đề cập "Nút Download" để tải file đính kèm theo CMR-08, nhưng KHÔNG CÓ nút Download nào được định nghĩa trong UI spec của §2.1 hoặc §2.2. ⚠️
- **Gap**: Không có UI mapping cho "tab" được đề cập ở §2.1 dòng 53-54. ⚠️

### KA6 — Object Attributes & Behavior Definition (12/20) ⚡

- **Stat Banner**: 6 thẻ trạng thái với quy tắc viết tắt K/M (1.500 → "1.5K", 2.300.000 → "2.3M"). ✅
- **Search Box**: Áp dụng CMR-01 (debounce 3s, auto-search, state persistence). ✅
- **Bottom Sheet Filter**: 3 dropdown (Loại báo cáo, Trạng thái, Tỉnh/Thành phố) + Nhập lại + Áp dụng. ✅
- **Card List**: Lazy load 20 bản ghi/trang theo CMR-04. ✅
- **Gap**: Badge Trạng thái (§2.1 field #2, dòng 104) — ghi "Màu sắc dựa theo UI design:" theo sau là "- " nhưng KHÔNG CÓ mapping màu-trạng thái. ⚠️ Đây là thông tin thiếu nghiêm trọng vì QA không thể verify badge color.
- **Gap**: 7 Section thu gọn trong màn hình chi tiết (§2.2 dòng 115) — ghi "có thể đóng/mở" nhưng KHÔNG xác định trạng thái mặc định (tất cả mở? tất cả đóng? section đầu mở?). ⚠️
- **Gap**: Stat Banner — không mô tả hành vi khi tap vào thẻ trạng thái (có lọc danh sách bên dưới không?). ⚠️
- **Gap**: §2.2 dòng 117 ghi trường có thể ẩn/hiện khác nhau theo loại báo cáo nhưng KHÔNG CÓ bảng mapping cụ thể. ⚠️
- **Gap**: Quy tắc viết tắt K/M cho Stat Banner (dòng 65-66) mở rộng ngoài CMR-11 nhưng không rõ ngưỡng chuyển đổi (1.000 → "1K" hay từ 10.000? Tương tự cho M). ⚡

### KA7 — Functional Logic & Workflow Decomposition (14/20) ⚡

- **Luồng chính**: Truy cập → Xem danh sách → Tìm kiếm/Lọc → Xem chi tiết → Xem lịch sử — mô tả đầy đủ. ✅
- **Sắp xếp**: Mặc định theo ngày tạo giảm dần. ✅
- **Xử lý lỗi**: Bảng xử lý 3 trường hợp (mất mạng + retry, lỗi 500, timeout 10s + retry) — tuân thủ CMR-07. ✅
- **Empty state**: Phân biệt "Không có dữ liệu" vs "Không tìm thấy kết quả" theo CMR-14. ✅
- **Pull-to-refresh**: Theo CMR-13. ✅
- **Gap**: §3.1 dòng 211 ghi "Hệ thống mặc định lọc theo Năm hiện tại" nhưng Bottom Sheet filter chỉ có 3 dropdown (Loại báo cáo, Trạng thái, Tỉnh/Thành phố) — KHÔNG CÓ trường Năm. ⚠️ Đây là mâu thuẫn logic nghiêm trọng.
- **Gap**: Luồng xử lý khi nhiều API call cùng lúc — nếu API stat banner thất bại nhưng API danh sách thành công, UI xử lý như thế nào? ⚡
- **Gap**: Không mô tả hành vi khi người dùng tap nhanh liên tiếp vào card (double-tap/race condition). ⚡

### KA8 — Functional Integration Analysis (5/10) ⚡

- **Đồng bộ Web↔Mobile**: §1 dòng 30-33 đề cập dữ liệu đồng bộ real-time. ✅
- **Sidebar navigation**: Điểm truy cập xác định rõ. ✅
- **Gap**: Không mô tả cơ chế đồng bộ (WebSocket? polling? push notification?). ⚠️
- **Gap**: Không mô tả fallback khi mất kết nối real-time — người dùng thấy gì? Dữ liệu cũ hay thông báo lỗi? ⚠️
- **Gap**: Không có API spec — không thể đánh giá tích hợp API hoặc partial failure handling. ⚡
- **Gap**: Không mô tả tương tác với các UC khác (ví dụ: nếu có UC tạo báo cáo, khi tạo xong có tự động refresh danh sách không?). ⚡

### KA9 — Acceptance Criteria (6/10) ⚡

- **Số lượng**: 6 AC được định nghĩa (AC1–AC6). ✅
- **AC1**: Stat Banner hiển thị đúng số lượng theo trạng thái. ⚡ (Thiếu chi tiết đo lường cụ thể)
- **AC2**: Card hiển thị đúng thông tin. ⚡ (Thiếu tiêu chí pass/fail rõ ràng)
- **AC3**: Tap card điều hướng đến chi tiết. ✅
- **AC4**: 7 section chi tiết hiển thị đúng. ⚡ (Thiếu mapping field theo loại báo cáo)
- **AC5**: Download file đính kèm theo CMR-08. ⚠️ (Nút Download KHÔNG tồn tại trong UI spec)
- **AC6**: Lịch sử báo cáo hiển thị timeline 5 bước. ⚡ (Chưa rõ 5 bước là cố định hay ví dụ)
- **Gap**: Các AC sử dụng ngôn ngữ mô tả chung, không đo lường được (không có pass/fail statement cụ thể). ⚡
- **Gap**: AC5 tham chiếu UI element không tồn tại trong spec. ⚠️

### KA10 — Non-functional Requirements (3/5) ⚡

- **Hiệu suất**: Timeout 10s theo CMR-16. ✅
- **Lazy load**: 20 bản ghi/trang theo CMR-04. ✅
- **Gap**: Không đề cập yêu cầu bảo mật (mã hóa dữ liệu, token expiry). ⚡
- **Gap**: Không đề cập accessibility (screen reader, font scaling). ⚡
- **Gap**: Không đề cập device/OS compatibility. ⚡

---

## Cross-Artefact Conflict Check

| # | Xung đột | Nguồn A | Nguồn B | Mức độ |
| --- | --- | --- | --- | --- |
| C1 | "Chuyển sang tab khác" nhưng không có hệ thống tab trong UI | §2.1 dòng 53-54 | UI spec §2.1 | ⚠️ Warning |
| C2 | "Mặc định lọc theo Năm hiện tại" nhưng không có trường Năm trong Bottom Sheet filter | §3.1 dòng 211 | §2.1 (Bottom Sheet: 3 dropdown) | ⚠️ Warning |
| C3 | AC5 đề cập "Nút Download" nhưng không có nút này trong UI spec | §3.2 AC5 | §2.1 & §2.2 (UI spec) | ⚠️ Warning |
| C4 | Badge Trạng thái ghi "Màu sắc dựa theo UI design" nhưng danh sách màu trống | §2.1 dòng 104 | (Không có nguồn bổ sung) | ⚠️ Warning |

---

## 📋 Unified Gap & Question Report

| ID | Priority | Ref | Question | Why It Matters | Status |
| --- | --- | --- | --- | --- | --- |
| Q1 | High | §2.1 dòng 104: "Màu sắc dựa theo UI design: - " | Badge Trạng thái thiếu mapping màu sắc. Hiện tại danh sách màu sau dấu "- " là trống. Cần cung cấp bảng mapping cụ thể giữa từng trạng thái (Đã nộp, Đang xử lý, Đã duyệt, Yêu cầu bổ sung, Từ chối) và màu badge tương ứng. CMR-05 định nghĩa quy tắc chung (Green/Yellow/Red/Gray) nhưng cần xác nhận mapping cụ thể cho UC54. | QA không thể viết test case verify màu badge nếu không biết trạng thái nào ứng với màu nào. Đây là UI element hiển thị trên mọi card trong danh sách. | Open |
| Q2 | High | §3.1 dòng 211: "Hệ thống mặc định lọc theo Năm hiện tại" | Bottom Sheet filter chỉ định nghĩa 3 dropdown: Loại báo cáo, Trạng thái, Tỉnh/Thành phố — KHÔNG CÓ trường Năm. Vậy filter theo năm được thực hiện như thế nào? Đây là filter ẩn (backend tự áp dụng)? Hay cần bổ sung dropdown Năm vào Bottom Sheet? | Mâu thuẫn logic giữa xử lý và UI. QA không thể test hành vi filter theo năm nếu không biết cơ chế. Nếu là filter ẩn, người dùng không thể xem báo cáo năm trước — cần xác nhận đây là expected behavior. | Open |
| Q3 | High | §3.2 AC5: "Nút Download cho phép tải file đính kèm theo quy tắc CMR-08" | AC5 tham chiếu "Nút Download" nhưng không có nút Download nào được định nghĩa trong UI spec (§2.1 hoặc §2.2). Cần xác định: (a) Nút Download nằm ở đâu trong giao diện? (b) Trên màn hình danh sách hay chi tiết? (c) Hành vi khi tap? | AC5 không thể test được vì UI element không tồn tại trong spec. Đây là acceptance criteria bị broken — hoặc bổ sung nút vào UI spec hoặc sửa AC5. | Open |
| Q4 | High | §2.1 dòng 53-54: "Khi người dùng chuyển sang tab khác rồi quay lại, bộ lọc và kết quả tìm kiếm sẽ được reset" | Tài liệu đề cập "chuyển sang tab khác" nhưng toàn bộ UC54 không có hệ thống tab nào. UC54 truy cập từ Sidebar → "Báo cáo đã nộp", không phải từ tab. Cần làm rõ: "tab khác" ở đây là gì? Là tab trên Bottom Navigation Bar? Hay là mục khác trên Sidebar? | QA không thể test state persistence/reset nếu không biết trigger chính xác. Đây ảnh hưởng trực tiếp đến hành vi UX khi người dùng điều hướng. | Open |
| Q5 | High | §2.2 dòng 117: "Lưu ý: Các trường thông tin có thể hiển thị khác nhau tùy theo loại báo cáo" | Chi tiết báo cáo có 7 section, nhưng trường nào ẩn/hiện theo loại báo cáo nào thì KHÔNG có bảng mapping. Cần cung cấp: Mapping giữa "Loại báo cáo" → danh sách trường hiển thị/ẩn cho từng section. | QA không thể verify chi tiết báo cáo theo từng loại nếu không biết trường nào expected visible/hidden. Đây ảnh hưởng đến toàn bộ test case màn hình chi tiết. | Open |
| Q6 | Medium | §1 dòng 30-33: "Dữ liệu báo cáo được đồng bộ real-time giữa Web và Mobile" | Đồng bộ real-time được đề cập nhưng thiếu chi tiết: (a) Cơ chế đồng bộ là gì (WebSocket/polling/push)? (b) Khi mất kết nối real-time, UI hiển thị gì? Dữ liệu cũ hay thông báo lỗi? (c) Khi kết nối được khôi phục, có auto-refresh không? | QA cần test hành vi offline/reconnect. Nếu không có spec cho fallback, QA không thể viết test case cho edge case mất kết nối — đây là scenario phổ biến trên mobile. | Open |
| Q7 | Medium | §2.2 dòng 196-202: Timeline 5 bước (Tạo mới → Đã nộp → Đang xử lý → Đã duyệt / Yêu cầu bổ sung / Từ chối → Hoàn thành) | 5 bước timeline được liệt kê nhưng chưa rõ: (a) Đây là danh sách cố định hay chỉ là ví dụ? (b) Bước "Đã duyệt / Yêu cầu bổ sung / Từ chối" là 1 bước hay 3 bước riêng biệt? (c) Flow báo cáo bị từ chối → sửa → nộp lại hiển thị thế nào trên timeline? | QA cần biết chính xác các bước để verify timeline hiển thị đúng. Nếu flow có loop (nộp lại sau từ chối), timeline có reset hay append thêm bước? | Open |
| Q8 | Medium | §2.1 dòng 65-66: "Số lượng được hiển thị dưới dạng viết tắt: 1.500 → '1.5K', 2.300.000 → '2.3M'" | Quy tắc viết tắt K/M cho Stat Banner: (a) Ngưỡng chuyển đổi chính xác là bao nhiêu? (>= 1.000 → K? >= 10.000?) (b) Quy tắc làm tròn: 1.550 → "1.5K" hay "1.6K"? (c) Giá trị dưới ngưỡng hiển thị bình thường (VD: 999 → "999")? (d) Quy tắc này mở rộng ngoài CMR-11 — cần xác nhận đây là override hay bổ sung. | QA cần boundary values chính xác để viết test case. Hiện tại chỉ có 2 ví dụ, không đủ để cover tất cả edge cases. | Open |
| Q9 | Medium | §2.2 dòng 115: "Mỗi section có thể đóng/mở" | 7 section thu gọn trong chi tiết nhưng KHÔNG xác định trạng thái mặc định. Khi mở màn hình chi tiết: (a) Tất cả section đều mở? (b) Tất cả đều đóng? (c) Section đầu mở, còn lại đóng? (d) Có animation khi đóng/mở không? | QA cần default state để verify initial render. Nếu tất cả mở, test case khác với tất cả đóng. Animation cũng cần verify trên nhiều thiết bị. | Open |
| Q10 | Medium | N/A (Missing) | Stat Banner — hành vi khi tap vào thẻ trạng thái không được mô tả. Khi người dùng tap vào thẻ "Đã duyệt" (ví dụ): (a) Có tự động lọc danh sách theo trạng thái đó không? (b) Hay thẻ chỉ là hiển thị thống kê, không interactive? | Nếu thẻ interactive, QA cần test hành vi lọc + interaction giữa stat banner filter và bottom sheet filter. Nếu không interactive, QA cần verify không có response khi tap. | Open |
| Q11 | Medium | N/A (Missing) | Không mô tả sự khác biệt hành vi giữa Cá nhân và Tổ chức khi sử dụng UC54. Giao diện, dữ liệu hiển thị, filter options có khác nhau không? | Nếu có khác biệt, QA cần test riêng cho từng role. Nếu giống nhau, cần xác nhận để không tạo test case thừa. | Open |
| Q12 | Low | N/A (Missing) | Không mô tả postcondition — trạng thái hệ thống sau khi người dùng hoàn thành luồng chính (xem chi tiết, xem lịch sử). Có ghi log audit trail không? Có cập nhật "đã xem" không? | Ảnh hưởng đến thiết kế test case end-to-end và kiểm tra side effects. | Open |
| Q13 | Low | N/A (Missing) | Không mô tả hành vi double-tap trên card trong danh sách. Nếu người dùng tap nhanh 2 lần: (a) Có mở 2 màn hình chi tiết không? (b) Có debounce/throttle navigation không? | Edge case phổ biến trên mobile có thể gây crash hoặc duplicate navigation. | Open |
| Q14 | Low | N/A (Missing) | Không mô tả yêu cầu accessibility: screen reader support, minimum touch target size, font scaling behavior, contrast ratio. | Quan trọng cho tuân thủ WCAG nếu ứng dụng hướng tới người dùng rộng rãi. Không block test design nhưng nên bổ sung. | Open |
| Q15 | Low | N/A (Missing) | Không mô tả yêu cầu hỗ trợ device/OS: iOS minimum version, Android minimum version, tablet layout, landscape mode. | QA cần biết phạm vi thiết bị để lập test matrix. | Open |

---

## 🟢 What's Good

1. **Cấu trúc tài liệu rõ ràng**: UC54 được chia thành 3 phần logic (Mô tả, Giao diện, Xử lý & AC), dễ theo dõi và đối chiếu.
2. **UI Object Inventory tốt**: Hai màn hình (Danh sách & Chi tiết) được mô tả chi tiết với đầy đủ các thành phần — Header, Stat Banner, Search, Filter, Card List, 7 Section chi tiết, Modal Lịch sử.
3. **Tuân thủ CMR tốt**: Tài liệu tham chiếu rõ ràng đến các CMR rules (CMR-01 Search Box, CMR-02 Filter, CMR-04 Lazy Load, CMR-07 Error Handling, CMR-08 File Viewer, CMR-13 Pull-to-Refresh, CMR-14 Empty State).
4. **Xử lý lỗi có bảng cụ thể**: §3.1 cung cấp bảng xử lý 3 trường hợp lỗi (mất mạng, lỗi 500, timeout) với hành vi mong đợi rõ ràng.
5. **Stat Banner thiết kế tốt**: 6 thẻ trạng thái cung cấp tổng quan nhanh, có quy tắc viết tắt K/M cho số lớn.
6. **Detail screen phong phú**: 7 section chứa đầy đủ thông tin dự án, nhà đầu tư, tình hình thực hiện, tiến độ, với bảng dữ liệu (4 hàng × 3 cột).
7. **Timeline lịch sử trực quan**: Modal hiển thị 5 bước timeline theo thứ tự tăng dần — thiết kế UX tốt cho việc theo dõi trạng thái.

---

## 🧪 Testability Outlook

### What CAN be tested now:

- **Luồng chính**: Truy cập Sidebar → Mở danh sách → Xem cards — có đủ thông tin để test basic navigation flow.
- **Search Box**: Theo CMR-01 — debounce 3s, auto-search, state persistence đều có spec rõ ràng.
- **Bottom Sheet Filter**: 3 dropdown + Nhập lại + Áp dụng — có đủ thông tin để test filter UI behavior (trừ filter Năm).
- **Lazy Load**: 20 bản ghi/trang theo CMR-04 — testable.
- **Pull-to-Refresh**: Theo CMR-13 — testable.
- **Error Handling**: 3 trường hợp lỗi có bảng hành vi cụ thể — testable.
- **Empty State**: 2 trạng thái theo CMR-14 — testable.
- **Card Layout**: Các trường Mã BC, Dự án, Nhà đầu tư, Metadata — testable (trừ Badge màu).
- **Detail screen navigation**: Tap card → Chi tiết — testable.
- **Modal Lịch sử**: Basic render 5 bước — testable (dù chưa rõ là cố định hay ví dụ).

### What CANNOT be tested yet (blocked by gaps):

- **Badge color verification**: Không có mapping màu-trạng thái → không test được (Q1).
- **Year filter behavior**: Mâu thuẫn giữa logic "filter theo năm" và UI "không có trường năm" → không test được (Q2).
- **Download attachment**: AC5 ref UI element không tồn tại → không test được (Q3).
- **State reset trigger**: "Tab khác" không định nghĩa → không test state persistence/reset (Q4).
- **Detail fields per report type**: Không có mapping → không test chi tiết theo loại báo cáo (Q5).
- **Real-time sync & fallback**: Không có cơ chế → không test offline/reconnect (Q6).
- **Stat Banner interaction**: Không rõ interactive hay chỉ hiển thị → không test tap behavior (Q10).
- **Role-based differences**: Không rõ khác biệt Cá nhân/Tổ chức → không test theo role (Q11).

### Suggested test focus areas (once gaps are resolved):

- **Happy path**: Đăng nhập → Sidebar → Danh sách → Search/Filter → Xem card → Chi tiết → Lịch sử — end-to-end flow.
- **Alternative scenarios**: Lọc theo từng loại báo cáo, từng trạng thái, từng tỉnh/thành phố; kết hợp nhiều bộ lọc.
- **Boundary & validation tests**: K/M abbreviation boundaries (999, 1000, 999999, 1000000); search text max length; danh sách rỗng; 1 bản ghi; nhiều trang.
- **Error & exception scenarios**: Mất mạng giữa chừng, timeout API, 500 error, pull-to-refresh khi đang loading.
- **UI-specific checks**: Badge colors, section collapse/expand animation, Stat Banner scroll ngang, card layout trên các kích thước màn hình.
- **CMR compliance tests**: Verify tất cả CMR references (01, 02, 04, 05, 07, 08, 11, 13, 14, 16) áp dụng đúng.
- **Real-time behavior tests**: Sync Web→Mobile, tạo báo cáo trên Web → verify hiện trên Mobile.
- **Partial API failure tests**: Stat Banner API fail + List API success → UI xử lý thế nào?
- **Edge case tests**: Tên dự án rất dài (truncate?), ký tự đặc biệt trong search, nhiều filter cùng lúc, back button nhanh liên tiếp.

---

## 📌 Summary & Recommendation

UC54 có cấu trúc tài liệu tốt và coverage rộng cho hai màn hình chính (Danh sách & Chi tiết), tuy nhiên tồn tại **nhiều gap nghiêm trọng** khiến QA chưa thể bắt đầu test design toàn diện. Có 5 vấn đề ở mức **High priority**: badge color mapping hoàn toàn trống (Q1), mâu thuẫn logic giữa "filter theo năm" và UI không có trường năm (Q2), AC5 tham chiếu nút Download không tồn tại trong spec (Q3), reference đến "tab" không tồn tại (Q4), và thiếu mapping trường theo loại báo cáo (Q5). Các gap này ảnh hưởng trực tiếp đến khả năng viết test case cho ~40% tính năng. **Khuyến nghị: ❌ CHƯA SẴN SÀNG — Không bắt đầu thiết kế test case.** BA cần giải quyết ít nhất các câu hỏi Q1–Q5 (High priority) trước khi QA review lại. Sau khi giải quyết Q1–Q5 và Q6–Q10 (Medium), dự kiến điểm sẽ đạt ngưỡng CONDITIONALLY READY hoặc READY.