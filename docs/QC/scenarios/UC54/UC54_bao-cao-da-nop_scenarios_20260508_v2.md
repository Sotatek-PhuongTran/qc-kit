# Test Scenarios

| Thông tin | Chi tiết |
| --- | --- |
| **Tài liệu** | Test Scenarios |
| **UC** | UC54 — Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên Mobile |
| **Ngày tạo** | 08/05/2026 |
| **Tác giả** | Claude Agent (QC Scenario Design) |
| **Phiên bản** | v2 |
| **UC Spec version** | v2.2 |
| **Audit version** | v2 (CONDITIONALLY READY — 89.1/100) |
| **Thay đổi so với v1** | Bổ sung scenarios badge color mapping (Q1 Answered); cập nhật Known Gaps |

---

## UC54 — Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên Mobile

---

### === NHÓM 1: TRUY CẬP & ĐIỀU HƯỚNG (Navigation & Access) ===

---

### Scenario ID: TS_UC54_001
**Scenario Title:** Truy cập màn hình Báo cáo đã nộp từ Sidebar
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§1-027
**Test Type:** Functional
**Description:** Xác minh người dùng đã đăng nhập có thể truy cập chức năng "Báo cáo đã nộp" thông qua Sidebar và hệ thống hiển thị đúng màn hình Danh sách báo cáo với Header, Stat Banner, Search/Filter, và Card List.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_002
**Scenario Title:** Header hiển thị đúng tiêu đề và nút Quay lại
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-050/053, CMR-06
**Test Type:** UI
**Description:** Xác minh Header màn hình Danh sách hiển thị tiêu đề "Báo cáo đã nộp" (màu trắng trên nền đỏ đậm, căn giữa) và nút Quay lại (←) ở góc trái. Tap nút Quay lại → quay về màn hình trước đó.
**Test Focus:** UI State

---

### Scenario ID: TS_UC54_003
**Scenario Title:** Phân quyền — Người dùng chỉ xem được báo cáo của chính mình
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§1-025
**Test Type:** Functional
**Description:** Xác minh người dùng (Cá nhân hoặc Tổ chức) chỉ thấy danh sách báo cáo do chính mình nộp. Đăng nhập bằng 2 tài khoản khác nhau và kiểm tra danh sách báo cáo không lẫn dữ liệu.
**Test Focus:** Permission/Role

---

### Scenario ID: TS_UC54_004
**Scenario Title:** Cá nhân và Tổ chức — Giao diện và hành vi giống nhau
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§1-026
**Test Type:** Functional
**Description:** Xác minh giao diện, dữ liệu hiển thị, và tùy chọn filter của tài khoản Cá nhân và Tổ chức là hoàn toàn giống nhau — không có khác biệt về hành vi hay UI.
**Test Focus:** Permission/Role

---

### === NHÓM 2: STAT BANNER (Thanh chỉ số trạng thái) ===

---

### Scenario ID: TS_UC54_005
**Scenario Title:** Stat Banner hiển thị đúng 6 thẻ trạng thái
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-071/078, AC1
**Test Type:** Functional
**Description:** Xác minh Stat Banner hiển thị đúng 6 thẻ: Tổng số báo cáo, Đã nộp, Đang xử lý, Đã duyệt, Yêu cầu bổ sung, Từ chối. Số lượng mỗi thẻ được hệ thống tự count theo trạng thái tương ứng.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_006
**Scenario Title:** Stat Banner — Cuộn ngang (Horizontal Scroll)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-062
**Test Type:** UI
**Description:** Xác minh Stat Banner hỗ trợ cuộn ngang khi 6 thẻ không vừa màn hình. Swipe trái/phải hiển thị các thẻ ẩn. Thẻ không bị cắt hoặc chồng chéo.
**Test Focus:** UI State

---

### Scenario ID: TS_UC54_007
**Scenario Title:** Stat Banner — Read-only, không thể tap (Unclickable)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-064
**Test Type:** UI
**Description:** Xác minh các thẻ Stat Banner là read-only — tap vào bất kỳ thẻ nào không trigger filter danh sách, không có visual feedback (ripple, highlight), không có navigation.
**Test Focus:** UI State

---

### Scenario ID: TS_UC54_008
**Scenario Title:** Stat Banner — Format số theo CMR-11
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-069, CMR-11
**Test Type:** Functional
**Description:** Xác minh số lượng trên mỗi thẻ Stat Banner hiển thị đúng format CMR-11: dấu phẩy phân tách hàng nghìn, tối đa 3 chữ số thập phân, cắt bỏ số 0 vô nghĩa.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC54_009
**Scenario Title:** Stat Banner — Số lượng = 0 cho một hoặc nhiều trạng thái
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-068, AC1
**Test Type:** Functional
**Description:** Xác minh khi một hoặc nhiều trạng thái có số lượng = 0, thẻ vẫn hiển thị bình thường với giá trị "0" — không ẩn thẻ, không hiển thị lỗi.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC54_010
**Scenario Title:** Stat Banner — Đồng bộ real-time khi trạng thái thay đổi trên Web
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§1-034
**Test Type:** Integration
**Description:** Xác minh khi trạng thái báo cáo thay đổi trên Web (VD: Đang xử lý → Đã duyệt), Stat Banner trên Mobile tự động cập nhật số lượng mà không cần pull-to-refresh.
**Test Focus:** Integration

---

### Scenario ID: TS_UC54_010a
**Scenario Title:** Stat Banner — Màu sắc và icon đúng theo từng trạng thái
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-073/078
**Test Type:** UI
**Description:** Xác minh mỗi thẻ Stat Banner hiển thị đúng màu sắc và icon theo spec: (1) Tổng số báo cáo — nền trắng, icon xanh dương; (2) Đã nộp — nền xanh dương nhạt, icon xanh dương; (3) Đang xử lý — nền vàng nhạt, icon đồng hồ vàng; (4) Đã duyệt — nền xanh lá nhạt, icon tích xanh; (5) Yêu cầu bổ sung — nền cam nhạt, icon chấm than cam; (6) Từ chối — nền đỏ nhạt, icon "X" đỏ.
**Test Focus:** UI State

---

### === NHÓM 3: TÌM KIẾM (Search) ===

---

### Scenario ID: TS_UC54_011
**Scenario Title:** Search — Tìm kiếm gần đúng theo mã báo cáo (Happy path)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-084, CMR-01
**Test Type:** Functional
**Description:** Xác minh nhập một phần mã báo cáo vào ô tìm kiếm → danh sách tự động hiển thị các card có mã chứa từ khóa (tìm kiếm gần đúng/like) sau 3 giây debounce, không cần nhấn Enter.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_012
**Scenario Title:** Search — Debounce 3 giây
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-084, CMR-01
**Test Type:** Functional
**Description:** Xác minh khi người dùng nhập liên tục, hệ thống chỉ trigger search sau 3 giây không gõ thêm. Gõ liên tục trong vòng 3s → không gọi API tìm kiếm. Ngừng gõ 3s → API được gọi và danh sách cập nhật.
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC54_013
**Scenario Title:** Search — Xóa hết từ khóa, danh sách trở về mặc định
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-084, CMR-01
**Test Type:** Functional
**Description:** Xác minh khi xóa hết từ khóa trong ô tìm kiếm, danh sách trở về trạng thái mặc định (hiển thị tất cả báo cáo, sắp xếp theo ngày tạo giảm dần).
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC54_014
**Scenario Title:** Search — Không tìm thấy kết quả
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-084, CMR-14
**Test Type:** Functional
**Description:** Xác minh khi nhập từ khóa không khớp với bất kỳ mã báo cáo nào → hiển thị Empty State "Không tìm thấy kết quả." căn giữa vùng nội dung, không có nút Thử lại.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC54_015
**Scenario Title:** Search — Placeholder hiển thị đúng
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-084, CMR-01
**Test Type:** UI
**Description:** Xác minh ô tìm kiếm hiển thị placeholder "Tìm kiếm theo mã báo cáo..." khi chưa có input. Icon kính lúp nằm bên trái trong ô.
**Test Focus:** UI State

---

### Scenario ID: TS_UC54_016
**Scenario Title:** Search — Giới hạn tối đa 500 ký tự (BVA)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** CMR-01
**Test Type:** Functional
**Description:** Xác minh ô tìm kiếm cho phép nhập tối đa 500 ký tự. Test BVA: nhập đúng 500 ký tự → chấp nhận; nhập ký tự thứ 501 → không cho phép nhập thêm.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC54_017
**Scenario Title:** Search — Ký tự đặc biệt trong ô tìm kiếm
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-084, CMR-01
**Test Type:** Functional
**Description:** Xác minh hệ thống xử lý đúng khi nhập ký tự đặc biệt vào ô tìm kiếm (VD: `@#$%^&*()`, HTML tags `<script>`, SQL injection `' OR 1=1 --`). Không gây lỗi, không crash, trả về "Không tìm thấy kết quả." nếu không match.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC54_018
**Scenario Title:** Search — Kết hợp ô tìm kiếm + bộ lọc đồng thời
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** CMR-01
**Test Type:** Functional
**Description:** Xác minh khi sử dụng ô tìm kiếm cùng bộ lọc tìm kiếm, kết quả phải thỏa CẢ HAI điều kiện. VD: search "BC-2026" + filter Trạng thái = "Đã duyệt" → chỉ hiển thị báo cáo có mã chứa "BC-2026" VÀ trạng thái "Đã duyệt".
**Test Focus:** Alternative flow

---

### === NHÓM 4: BỘ LỌC (Filter — Bottom Sheet) ===

---

### Scenario ID: TS_UC54_019
**Scenario Title:** Filter — Mở Bottom Sheet bộ lọc
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-085, CMR-02
**Test Type:** UI
**Description:** Xác minh tap icon filter (bên phải ô tìm kiếm) → mở Bottom Sheet chứa 3 dropdown (Loại báo cáo, Trạng thái, Tỉnh/Thành phố), nút X đóng (góc phải trên), nút "Nhập lại" (secondary), và nút "Áp dụng" (primary).
**Test Focus:** UI State

---

### Scenario ID: TS_UC54_020
**Scenario Title:** Filter — Lọc theo Loại báo cáo (Single dropdown)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-093, CMR-03
**Test Type:** Functional
**Description:** Xác minh chọn 1 giá trị trong dropdown "Loại báo cáo" → tap "Áp dụng" → danh sách chỉ hiển thị báo cáo thuộc loại đã chọn. Giá trị mặc định: "Tất cả loại báo cáo".
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_021
**Scenario Title:** Filter — Lọc theo Trạng thái (Single dropdown)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-094, CMR-03
**Test Type:** Functional
**Description:** Xác minh chọn 1 giá trị trong dropdown "Trạng thái" (VD: Đã duyệt) → tap "Áp dụng" → danh sách chỉ hiển thị báo cáo có trạng thái tương ứng.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_022
**Scenario Title:** Filter — Lọc theo Tỉnh/Thành phố (Single dropdown)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-095, CMR-03
**Test Type:** Functional
**Description:** Xác minh chọn 1 giá trị trong dropdown "Tỉnh/Thành phố" → tap "Áp dụng" → danh sách chỉ hiển thị báo cáo thuộc tỉnh/thành phố đã chọn.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_023
**Scenario Title:** Filter — Kết hợp nhiều tiêu chí lọc (Decision Table)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-093/095, CMR-02
**Test Type:** Functional
**Description:** Xác minh kết hợp 2+ tiêu chí lọc cùng lúc: (1) Loại báo cáo X + Trạng thái Y, (2) Loại báo cáo X + Tỉnh/TP Z, (3) Trạng thái Y + Tỉnh/TP Z, (4) Cả 3 dropdown chọn giá trị cụ thể. Kết quả phải thỏa TẤT CẢ điều kiện.
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC54_024
**Scenario Title:** Filter — Kết hợp tất cả tiêu chí lọc không có kết quả
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-098, CMR-14
**Test Type:** Functional
**Description:** Xác minh khi áp dụng bộ lọc mà không có báo cáo nào phù hợp → hiển thị "Không tìm thấy kết quả." (CMR-14). Stat Banner vẫn hiển thị số liệu tổng.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC54_025
**Scenario Title:** Filter — Nút "Nhập lại" reset tất cả về mặc định
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-097, CMR-02
**Test Type:** Functional
**Description:** Xác minh tap "Nhập lại" → tất cả 3 dropdown reset về giá trị mặc định ("Tất cả loại báo cáo", "Tất cả trạng thái", "Tất cả tỉnh thành phố"). Bottom Sheet KHÔNG đóng sau khi reset.
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC54_026
**Scenario Title:** Filter — Đóng Bottom Sheet bằng nút X (không áp dụng)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-096, CMR-02
**Test Type:** Functional
**Description:** Xác minh tap nút "X" hoặc tap vùng ngoài Bottom Sheet → đóng Bottom Sheet, KHÔNG thay đổi kết quả hiện tại (giữ nguyên danh sách trước đó).
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC54_027
**Scenario Title:** Filter — Dropdown searchable (tìm kiếm trong dropdown)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-093/095, CMR-03
**Test Type:** UI
**Description:** Xác minh mỗi dropdown cho phép nhập text để tìm kiếm/filter options (tìm kiếm gần đúng). Options sắp xếp A-Z. Option đã chọn highlight/bold khi mở lại dropdown. Option tên dài tự cắt ngắn "...".
**Test Focus:** UI State

---

### Scenario ID: TS_UC54_028
**Scenario Title:** Filter — Active filter indicator (CMR-02)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** CMR-02
**Test Type:** UI
**Description:** Xác minh khi có filter active (giá trị khác mặc định), icon indicator màu xanh lá cây hiển thị ở góc phải trên của icon filter. Khi không có filter active (tất cả ở mặc định) → ẩn indicator.
**Test Focus:** UI State

---

### === NHÓM 5: STATE PERSISTENCE (Giữ/Reset trạng thái) ===

---

### Scenario ID: TS_UC54_029
**Scenario Title:** State Persistence — Giữ search/filter khi vào chi tiết rồi quay lại
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-057, CMR-01
**Test Type:** Functional
**Description:** Xác minh khi đang search/filter → tap card xem chi tiết → tap nút Quay lại → danh sách vẫn giữ nguyên trạng thái search/filter và vị trí cuộn trước đó.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_030
**Scenario Title:** State Reset — Chuyển sang mục khác trên Sidebar rồi quay lại
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-058
**Test Type:** Functional
**Description:** Xác minh khi đang search/filter → chuyển sang mục khác trên Sidebar → quay lại "Báo cáo đã nộp" → search/filter được reset về mặc định, danh sách hiển thị toàn bộ.
**Test Focus:** Alternative flow

---

### === NHÓM 6: DANH SÁCH CARD (Card List) ===

---

### Scenario ID: TS_UC54_031
**Scenario Title:** Card hiển thị đầy đủ thông tin (Happy path)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-110/117, AC2
**Test Type:** Functional
**Description:** Xác minh mỗi card hiển thị đủ: (1) Mã báo cáo — màu đỏ đậm, bold, truncate "..." nếu quá dài, (2) Trạng thái badge — read-only, (3) Dự án — tiền tố "Dự án: ", wrap text, (4) Nhà đầu tư — tiền tố "Nhà đầu tư: ", wrap text, (5) Metadata — "Kỳ: [value] • Nộp: [DD/MM/YYYY] • [Tỉnh/Thành]", (6) Icon ">" ở góc phải.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_031a
**Scenario Title:** Card — Badge trạng thái hiển thị đúng màu sắc theo từng trạng thái
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-113, CMR-05
**Test Type:** UI
**Description:** Xác minh badge trạng thái trên card hiển thị đúng màu nền theo mapping: (1) Đã nộp → nền xanh dương nhạt; (2) Đang xử lý → nền vàng nhạt; (3) Đã duyệt → nền xanh lá nhạt; (4) Yêu cầu bổ sung → nền cam nhạt; (5) Từ chối → nền đỏ nhạt. Badge chỉ hiển thị text + màu nền, read-only.
**Test Focus:** UI State

---

### Scenario ID: TS_UC54_031b
**Scenario Title:** Card — Badge trạng thái "Đã nộp" hiển thị nền xanh dương nhạt
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-113, CMR-05
**Test Type:** UI
**Description:** Xác minh báo cáo có trạng thái "Đã nộp" → badge hiển thị text "Đã nộp" trên nền xanh dương nhạt. Không có icon. Read-only, không cho phép tap.
**Test Focus:** UI State

---

### Scenario ID: TS_UC54_031c
**Scenario Title:** Card — Badge trạng thái "Đang xử lý" hiển thị nền vàng nhạt
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-113, CMR-05
**Test Type:** UI
**Description:** Xác minh báo cáo có trạng thái "Đang xử lý" → badge hiển thị text "Đang xử lý" trên nền vàng nhạt. Không có icon. Read-only, không cho phép tap.
**Test Focus:** UI State

---

### Scenario ID: TS_UC54_031d
**Scenario Title:** Card — Badge trạng thái "Đã duyệt" hiển thị nền xanh lá nhạt
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-113, CMR-05
**Test Type:** UI
**Description:** Xác minh báo cáo có trạng thái "Đã duyệt" → badge hiển thị text "Đã duyệt" trên nền xanh lá nhạt. Không có icon. Read-only, không cho phép tap.
**Test Focus:** UI State

---

### Scenario ID: TS_UC54_031e
**Scenario Title:** Card — Badge trạng thái "Yêu cầu bổ sung" hiển thị nền cam nhạt
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-113, CMR-05
**Test Type:** UI
**Description:** Xác minh báo cáo có trạng thái "Yêu cầu bổ sung" → badge hiển thị text "Yêu cầu bổ sung" trên nền cam nhạt. Không có icon. Read-only, không cho phép tap.
**Test Focus:** UI State

---

### Scenario ID: TS_UC54_031f
**Scenario Title:** Card — Badge trạng thái "Từ chối" hiển thị nền đỏ nhạt
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-113, CMR-05
**Test Type:** UI
**Description:** Xác minh báo cáo có trạng thái "Từ chối" → badge hiển thị text "Từ chối" trên nền đỏ nhạt. Không có icon. Read-only, không cho phép tap.
**Test Focus:** UI State

---

### Scenario ID: TS_UC54_032
**Scenario Title:** Card — Mã báo cáo truncate khi quá dài
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-112
**Test Type:** UI
**Description:** Xác minh mã báo cáo hiển thị tối đa 1 dòng. Khi mã quá dài → tự cắt ngắn với "..." ở cuối. Không wrap xuống dòng 2.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC54_033
**Scenario Title:** Card — Dự án và Nhà đầu tư wrap text khi dài
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-114/115
**Test Type:** UI
**Description:** Xác minh trường "Dự án" và "Nhà đầu tư" wrap text khi dài → KHÔNG truncate, hiển thị đầy đủ trên nhiều dòng. Card tự mở rộng chiều cao.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC54_034
**Scenario Title:** Card — Metadata hiển thị đúng format ngày (CMR-12)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-116, CMR-12
**Test Type:** Functional
**Description:** Xác minh Metadata trên card hiển thị đúng format: "Kỳ: [Giá trị] • Nộp: [DD/MM/YYYY] • [Tỉnh/Thành]" theo CMR-12 (dd/MM/yyyy, 24h, GMT+7).
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_035
**Scenario Title:** Card — Tap vào card điều hướng đến Chi tiết
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-117, AC3
**Test Type:** Functional
**Description:** Xác minh tap vào bất kỳ đâu trên card hoặc icon ">" → chuyển sang màn hình Chi tiết báo cáo tương ứng.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_036
**Scenario Title:** Card — Debounce navigation khi double-tap (CMR-18)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-104/106, CMR-18
**Test Type:** Functional
**Description:** Xác minh khi tap nhanh liên tục (double-tap) trên card → chỉ trigger 1 lần navigation (debounce). Không mở 2 màn hình chi tiết trùng lặp.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC54_037
**Scenario Title:** Card — Danh sách sắp xếp theo ngày tạo giảm dần
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§3.1-219
**Test Type:** Functional
**Description:** Xác minh danh sách card mặc định sắp xếp theo ngày tạo giảm dần (mới nhất lên đầu). Kiểm tra với nhiều card có ngày tạo khác nhau.
**Test Focus:** Happy path

---

### === NHÓM 7: LAZY LOAD & PULL-TO-REFRESH ===

---

<!-- PLACEHOLDER_NHOM7_ONWARDS -->

### Scenario ID: TS_UC54_038
**Scenario Title:** Lazy Load — Tải 20 bản ghi/lần (CMR-04)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§3.1-220, CMR-04
**Test Type:** Functional
**Description:** Xác minh lần tải đầu chỉ hiển thị 20 bản ghi. Cuộn đến cuối danh sách → loading indicator hiển thị ở cuối → tải thêm 20 bản ghi tiếp theo.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_039
**Scenario Title:** Lazy Load — Hết dữ liệu, ẩn loading indicator
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** CMR-04
**Test Type:** Functional
**Description:** Xác minh khi đã tải hết tất cả bản ghi (VD: tổng 35 bản ghi, tải 2 lần) → ẩn loading indicator, không gọi API nữa khi cuộn tiếp.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC54_040
**Scenario Title:** Lazy Load — Boundary: Đúng 20 bản ghi (1 trang)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** CMR-04
**Test Type:** Functional
**Description:** Xác minh khi tổng số bản ghi đúng bằng 20 → hiển thị đủ 20, cuộn đến cuối không trigger thêm API call.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC54_041
**Scenario Title:** Lazy Load — Boundary: 21 bản ghi (vượt 1 trang)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** CMR-04
**Test Type:** Functional
**Description:** Xác minh khi tổng số 21 bản ghi → tải lần 1 được 20, cuộn xuống → tải lần 2 được 1 bản ghi. Loading indicator ẩn sau lần 2.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC54_042
**Scenario Title:** Pull-to-Refresh — Kéo xuống refresh danh sách (CMR-13)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§3.1-222/226, CMR-13
**Test Type:** Functional
**Description:** Xác minh kéo xuống từ đầu danh sách → spinner hiện ở đầu → refresh thành công → cập nhật danh sách, ẩn spinner. Danh sách tải lại từ trang 1.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_043
**Scenario Title:** Pull-to-Refresh — Giữ dữ liệu cũ khi refresh thất bại
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** CMR-13
**Test Type:** Functional
**Description:** Xác minh khi pull-to-refresh thất bại (mất mạng) → vẫn giữ nguyên dữ liệu cũ trên màn hình, hiển thị thông báo lỗi theo CMR-07.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC54_044
**Scenario Title:** Pull-to-Refresh — Không duplicate API khi đang loading
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** CMR-13
**Test Type:** Functional
**Description:** Xác minh khi đang loading (pull-to-refresh hoặc lazy load) → kéo xuống thêm lần nữa → KHÔNG trigger lại API tương tự (no duplicate call).
**Test Focus:** Error/Exception

---

### === NHÓM 8: EMPTY STATE ===

---

### Scenario ID: TS_UC54_045
**Scenario Title:** Empty State — Không có báo cáo nào (No data)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§3.1-239, CMR-14
**Test Type:** Functional
**Description:** Xác minh khi người dùng không có bất kỳ báo cáo nào → hiển thị "Không có dữ liệu." căn giữa vùng nội dung, không có nút Thử lại. Stat Banner hiển thị tất cả = 0.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC54_046
**Scenario Title:** Empty State — Search/Filter không tìm thấy kết quả (No result)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§3.1-240, CMR-14
**Test Type:** Functional
**Description:** Xác minh khi search hoặc filter không có kết quả phù hợp → hiển thị "Không tìm thấy kết quả." căn giữa. Phân biệt rõ với "Không có dữ liệu." (no data ≠ no result).
**Test Focus:** Error/Exception

---

### === NHÓM 9: XỬ LÝ LỖI (Error Handling) ===

---

### Scenario ID: TS_UC54_047
**Scenario Title:** Error — Mất kết nối mạng khi tải danh sách
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§3.1-232, CMR-07
**Test Type:** Functional
**Description:** Xác minh khi mất kết nối mạng trong lúc tải danh sách → hiển thị "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." kèm nút "Thử lại". Giữ nguyên màn hình. Tap "Thử lại" → retry API call.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC54_048
**Scenario Title:** Error — Lỗi API 500 khi tải danh sách
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§3.1-233, CMR-07
**Test Type:** Functional
**Description:** Xác minh khi API trả về HTTP 500 → hiển thị "Hệ thống đang bận. Vui lòng thử lại sau." Giữ nguyên màn hình, chỉ hiển thị thông báo (không có nút Thử lại).
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC54_049
**Scenario Title:** Error — Timeout >10 giây (CMR-16)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§3.1-234, CMR-16
**Test Type:** Functional
**Description:** Xác minh khi API không phản hồi trong 10 giây → hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." kèm nút "Thử lại". Tap "Thử lại" → retry API call.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC54_050
**Scenario Title:** Error — Session hết hạn (HTTP 401)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§3.1-235, CMR-07
**Test Type:** Functional
**Description:** Xác minh khi access token hết hạn → hệ thống tự động dùng refresh token để cấp lại. Nếu refresh token hết hạn (>15 ngày) → redirect về màn hình đăng nhập + toast "Phiên đăng nhập hết hạn."
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC54_051
**Scenario Title:** Error — Loading state: Full-screen loading cho first-load
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** CMR-07
**Test Type:** UI
**Description:** Xác minh first-load màn hình Danh sách sử dụng loading state toàn màn hình (full-screen loading overlay). Các lần tải tiếp theo (lazy load, refresh) sử dụng spinner cục bộ.
**Test Focus:** UI State

---

### Scenario ID: TS_UC54_052
**Scenario Title:** Error — Mất kết nối khi đang xem danh sách (Real-time fallback)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§1-036, CMR-07
**Test Type:** Functional
**Description:** Xác minh khi đang xem danh sách và mất kết nối mạng → giữ nguyên dữ liệu cũ trên màn hình + hiển thị thông báo lỗi mạng (CMR-07). Khi khôi phục kết nối → hiển thị thông báo khôi phục, người dùng pull-to-refresh để đồng bộ lại (CMR-13).
**Test Focus:** Error/Exception

---

### === NHÓM 10: MÀN HÌNH CHI TIẾT (Detail Screen) ===

---

### Scenario ID: TS_UC54_053
**Scenario Title:** Chi tiết — Header hiển thị đúng
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-133/136, CMR-06
**Test Type:** UI
**Description:** Xác minh Header Chi tiết hiển thị tiêu đề "Chi tiết báo cáo" (màu trắng trên nền đỏ đậm, căn giữa) và nút Quay lại (←). Tap Quay lại → quay về Danh sách.
**Test Focus:** UI State

---

### Scenario ID: TS_UC54_054
**Scenario Title:** Chi tiết — Banner chính hiển thị Mã BC, Trạng thái, Mô tả
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-140/144
**Test Type:** Functional
**Description:** Xác minh Banner chính (nền đỏ) hiển thị: (1) Mã báo cáo — size lớn, bold, wrap text, (2) Trạng thái badge — màu sắc theo mapping (CMR-05), (3) Mô tả trạng thái — wrap text.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_054a
**Scenario Title:** Chi tiết — Badge trạng thái trên Banner hiển thị đúng màu sắc
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-143, CMR-05
**Test Type:** UI
**Description:** Xác minh badge trạng thái trên Banner chi tiết hiển thị đúng màu nền tương ứng: Đã nộp → xanh dương nhạt; Đang xử lý → vàng nhạt; Đã duyệt → xanh lá nhạt; Yêu cầu bổ sung → cam nhạt; Từ chối → đỏ nhạt. Nhất quán với badge trên card danh sách.
**Test Focus:** UI State

---

<!-- PLACEHOLDER_NHOM10_CONTINUE -->

### Scenario ID: TS_UC54_055
**Scenario Title:** Chi tiết — Nút "Lịch sử báo cáo" hiển thị và hoạt động
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-148/150
**Test Type:** Functional
**Description:** Xác minh nút "Lịch sử báo cáo" (nền xanh dương, icon đồng hồ) hiển thị trong khối hành động nhanh. Tap → mở Modal "Lịch sử báo cáo".
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_056
**Scenario Title:** Chi tiết — 7 Section hiển thị đầy đủ (AC4)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-152/199, AC4
**Test Type:** Functional
**Description:** Xác minh màn hình chi tiết hiển thị đầy đủ 7 section: (1) Thông tin dự án, (2) Thông tin chung, (3) Thông tin nhà đầu tư, (4) Tình hình thực hiện, (5) Tiến độ dự án, (6) Tình hình hoạt động, (7) Ký xác nhận. Tất cả field read-only.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_057
**Scenario Title:** Chi tiết — Sections collapsible, mặc định tất cả mở
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-129
**Test Type:** UI
**Description:** Xác minh khi mở chi tiết: tất cả 7 section (§2.2.3 → §2.2.9) ở trạng thái mở. Tap header section → thu gọn. Tap lần nữa → mở ra. Đóng/mở một section KHÔNG ảnh hưởng trạng thái section khác.
**Test Focus:** UI State

---

### Scenario ID: TS_UC54_058
**Scenario Title:** Chi tiết — Field null hiển thị "-"
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-156/199
**Test Type:** Functional
**Description:** Xác minh khi bất kỳ field nào trong 7 section có giá trị null → hiển thị "-" thay vì để trống, hiện N/A, hoặc crash.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC54_059
**Scenario Title:** Chi tiết — Wrap text tất cả field label (không truncate)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-127
**Test Type:** UI
**Description:** Xác minh tất cả field label và giá trị trong chi tiết wrap text khi dài → KHÔNG truncate. Màn hình tự mở rộng chiều dọc.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC54_060
**Scenario Title:** Chi tiết — Section 1: Thông tin dự án
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-154/156
**Test Type:** Functional
**Description:** Xác minh Section 1 hiển thị field "Tên dự án" (read-only). Nếu null → "-". Wrap text.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_061
**Scenario Title:** Chi tiết — Section 2: Thông tin chung
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-160/163
**Test Type:** Functional
**Description:** Xác minh Section 2 hiển thị: (1) Thời gian báo cáo, (2) Cơ quan tiếp nhận. Cả hai read-only, null → "-", wrap text.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_062
**Scenario Title:** Chi tiết — Section 3: Thông tin nhà đầu tư
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-167/172
**Test Type:** Functional
**Description:** Xác minh Section 3 hiển thị 4 field: (1) Mã số dự án, (2) Ngày cấp (DD/MM/YYYY — CMR-12), (3) Ngày điều chỉnh (DD/MM/YYYY — CMR-12), (4) Tên công ty. Tất cả read-only, null → "-".
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_063
**Scenario Title:** Chi tiết — Section 4: Tình hình thực hiện (Bảng số liệu)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-176/178
**Test Type:** Functional
**Description:** Xác minh Section 4 hiển thị bảng read-only: 4 hàng (Máy móc thiết bị, Nguyên vật liệu, Lợi nhuận, Khác) × 3 cột dữ liệu (Vốn chuyển ra, Tiền chuyển về, Dự báo). Số liệu format theo CMR-11, null → "-".
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_064
**Scenario Title:** Chi tiết — Section 4: Format số trong bảng (CMR-11 BVA)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-178, CMR-11
**Test Type:** Functional
**Description:** Xác minh số liệu trong bảng Section 4: dấu phẩy phân tách hàng nghìn (VD: 1,234,567), tối đa 3 chữ số thập phân, cắt số 0 vô nghĩa (VD: 123.320 → 123.32). Giá trị < 0.001 → hiển thị "< 0.001".
**Test Focus:** Boundary

---

### Scenario ID: TS_UC54_065
**Scenario Title:** Chi tiết — Section 5: Tiến độ dự án
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-182/185
**Test Type:** Functional
**Description:** Xác minh Section 5 hiển thị: (1) Trạng thái (Đúng tiến độ/Chậm), (2) Lý do (nếu có). Read-only, null → "-", wrap text.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_066
**Scenario Title:** Chi tiết — Section 6: Tình hình hoạt động
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-189/191
**Test Type:** Functional
**Description:** Xác minh Section 6 hiển thị "Nội dung mô tả" — chi tiết tình hình hoạt động. Read-only, null → "-", wrap text.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_067
**Scenario Title:** Chi tiết — Section 7: Ký xác nhận
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-195/199
**Test Type:** Functional
**Description:** Xác minh Section 7 hiển thị 3 field: (1) Nơi ký, (2) Ngày ký (DD/MM/YYYY — CMR-12), (3) Người ký. Read-only, null → "-", wrap text.
**Test Focus:** Happy path

---

### === NHÓM 11: MODAL LỊCH SỬ BÁO CÁO ===

---

### Scenario ID: TS_UC54_068
**Scenario Title:** Lịch sử — Modal hiển thị đúng thông tin (AC5)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-203/209, AC5
**Test Type:** Functional
**Description:** Xác minh Modal "Lịch sử báo cáo" hiển thị danh sách các bước xử lý, mỗi bước gồm: (1) Bước xử lý (tên), (2) Tên người xử lý, (3) Thời gian xử lý (HH:mm DD/MM/YYYY — CMR-12). Sắp xếp theo thời gian giảm dần (mới nhất ở trên).
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_069
**Scenario Title:** Lịch sử — Sắp xếp giảm dần (mới nhất trên)
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-203
**Test Type:** Functional
**Description:** Xác minh timeline sắp xếp theo thời gian giảm dần — bước xử lý mới nhất hiển thị ở đầu, bước cũ nhất ở cuối. Kiểm tra với báo cáo có ≥3 bước xử lý.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_070
**Scenario Title:** Lịch sử — Wrap text cho bước xử lý và tên người xử lý dài
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-207/208
**Test Type:** UI
**Description:** Xác minh khi tên bước xử lý hoặc tên người xử lý dài → wrap text, không truncate. Modal tự mở rộng hoặc cuộn được.
**Test Focus:** Boundary

---

### Scenario ID: TS_UC54_071
**Scenario Title:** Lịch sử — Báo cáo chỉ có 1 bước xử lý
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.2-203/209
**Test Type:** Functional
**Description:** Xác minh Modal vẫn hiển thị bình thường khi báo cáo chỉ có 1 bước xử lý (VD: vừa mới tạo).
**Test Focus:** Boundary

---

### === NHÓM 12: ĐỒNG BỘ REAL-TIME (Real-time Sync) ===

---

### Scenario ID: TS_UC54_072
**Scenario Title:** Real-time — Nộp báo cáo trên Web → hiện trên Mobile
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§1-033
**Test Type:** Integration
**Description:** Xác minh khi nhà đầu tư nộp báo cáo trên Web → báo cáo mới xuất hiện ngay trên Mobile (danh sách + Stat Banner count) mà không cần pull-to-refresh.
**Test Focus:** Integration

---

### Scenario ID: TS_UC54_073
**Scenario Title:** Real-time — Trạng thái thay đổi trên Web → cập nhật trên Mobile
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§1-034
**Test Type:** Integration
**Description:** Xác minh khi trạng thái thay đổi trên Web (VD: Đang xử lý → Đã duyệt) → badge trạng thái trên card Mobile tự cập nhật (đổi màu từ vàng nhạt sang xanh lá nhạt) + Stat Banner count thay đổi tương ứng.
**Test Focus:** Integration

---

### Scenario ID: TS_UC54_074
**Scenario Title:** Real-time — Mất kết nối → giữ dữ liệu cũ + thông báo lỗi
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§1-036, CMR-07
**Test Type:** Functional
**Description:** Xác minh khi mất kết nối mạng trong khi đang xem danh sách → giữ nguyên dữ liệu cũ trên màn hình + hiển thị thông báo lỗi mạng theo CMR-07.
**Test Focus:** Error/Exception

---

### Scenario ID: TS_UC54_075
**Scenario Title:** Real-time — Khôi phục kết nối → thông báo + pull-to-refresh
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§1-037, CMR-13
**Test Type:** Functional
**Description:** Xác minh khi khôi phục kết nối → hiển thị thông báo khôi phục. Người dùng pull-to-refresh → đồng bộ lại dữ liệu mới nhất. Stat Banner và danh sách cập nhật.
**Test Focus:** Alternative flow

---

### === NHÓM 13: SESSION HANDLING (CMR-18) ===

---

### Scenario ID: TS_UC54_076
**Scenario Title:** Force close app → Quay về Trang chủ, giữ session
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-107, CMR-18
**Test Type:** Functional
**Description:** Xác minh khi đang ở UC54 và force close app → mở lại app → quay về Trang chủ (không phải UC54). Session đăng nhập được giữ nguyên, không yêu cầu đăng nhập lại.
**Test Focus:** Alternative flow

---

### Scenario ID: TS_UC54_077
**Scenario Title:** Xóa app (uninstall) → Yêu cầu đăng nhập lại
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§2.1-108, CMR-18
**Test Type:** Functional
**Description:** Xác minh khi xóa app và cài đặt lại → yêu cầu đăng nhập lại từ đầu (không restore session cũ).
**Test Focus:** Alternative flow

---

### === NHÓM 14: ĐA NGÔN NGỮ (CMR-17) ===

---

### Scenario ID: TS_UC54_078
**Scenario Title:** Đa ngôn ngữ — Text cứng thay đổi theo ngôn ngữ
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** CMR-17
**Test Type:** Functional
**Description:** Xác minh khi chuyển ngôn ngữ (VD: Tiếng Việt → Tiếng Anh), các text cứng thay đổi: header "Báo cáo đã nộp", labels field, placeholder, nút, thông báo lỗi, empty state message. Nội dung dữ liệu (tên dự án, tên NĐT...) giữ nguyên.
**Test Focus:** Alternative flow

---

### === NHÓM 15: ACCEPTANCE CRITERIA VERIFICATION ===

---

### Scenario ID: TS_UC54_079
**Scenario Title:** AC1 — Stat Banner đúng 6 chỉ số, count và format CMR-11
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** AC1
**Test Type:** Acceptance
**Description:** Xác minh end-to-end: Stat Banner hiển thị đúng 6 chỉ số trạng thái (Tổng số, Đã nộp, Đang xử lý, Đã duyệt, Yêu cầu bổ sung, Từ chối) với số lượng tự count đúng và format theo CMR-11.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_080
**Scenario Title:** AC2 — Card báo cáo hiển thị đầy đủ thông tin
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** AC2
**Test Type:** Acceptance
**Description:** Xác minh end-to-end: Card hiển thị đủ Mã báo cáo (đỏ đậm), Trạng thái badge (đúng màu nền theo mapping), Dự án, Nhà đầu tư, Metadata (Kỳ • Nộp • Tỉnh/Thành) đúng format.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_081
**Scenario Title:** AC3 — Card tap điều hướng đến Chi tiết
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** AC3
**Test Type:** Acceptance
**Description:** Xác minh end-to-end: Tap vào bất kỳ card nào → chuyển sang Chi tiết báo cáo tương ứng. Dữ liệu chi tiết khớp với card đã tap.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_082
**Scenario Title:** AC4 — Chi tiết hiển thị đầy đủ 7 section
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** AC4
**Test Type:** Acceptance
**Description:** Xác minh end-to-end: Màn hình chi tiết hiển thị đủ 7 section (Thông tin dự án, Thông tin chung, Thông tin NĐT, Tình hình thực hiện, Tiến độ, Tình hình hoạt động, Ký xác nhận) theo thiết kế.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_083
**Scenario Title:** AC5 — Modal Lịch sử báo cáo hiển thị đúng
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** AC5
**Test Type:** Acceptance
**Description:** Xác minh end-to-end: Modal Lịch sử hiển thị đầy đủ bước xử lý, tên người xử lý, thời gian xử lý — sắp xếp theo thời gian giảm dần.
**Test Focus:** Happy path

---

### === NHÓM 16: END-TO-END FLOW ===

---

### Scenario ID: TS_UC54_084
**Scenario Title:** E2E — Luồng hoàn chỉnh: Truy cập → Search → Filter → Chi tiết → Lịch sử → Quay lại
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54 (all sections)
**Test Type:** End-to-End
**Description:** Xác minh luồng hoàn chỉnh: (1) Sidebar → "Báo cáo đã nộp" → Danh sách load, (2) Xem Stat Banner, (3) Search mã BC → kết quả hiện, (4) Mở filter → chọn Trạng thái → Áp dụng, (5) Tap card → Chi tiết mở, (6) Cuộn xem 7 sections, (7) Tap "Lịch sử" → Modal mở, (8) Đóng modal, (9) Back → Danh sách, (10) Search/filter vẫn giữ.
**Test Focus:** Happy path

---

### Scenario ID: TS_UC54_085
**Scenario Title:** E2E — Luồng lỗi và khôi phục: Mất mạng → Reconnect → Refresh
**UC Reference:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp
**Req-ID:** UC54-§1-036/037, CMR-07, CMR-13
**Test Type:** End-to-End
**Description:** Xác minh luồng lỗi: (1) Đang xem Danh sách, (2) Tắt mạng → lỗi mạng hiển thị + giữ dữ liệu cũ, (3) Bật mạng → thông báo khôi phục, (4) Pull-to-refresh → dữ liệu mới cập nhật, (5) Tiếp tục search/filter bình thường.
**Test Focus:** Error/Exception

---

## ⚠️ Out-of-Scope Flags

| Scenario Area | Reason | Recommended Action |
| --- | --- | --- |
| Performance testing — API response time under load | NFR: PERFORMANCE | Defer to performance testing specialist. Verify 10s timeout under concurrent users. |
| Security testing — Token/session security, data encryption | NFR: SECURITY | Defer to security testing specialist. Verify token handling, refresh token rotation. |
| Load testing — Lazy load with 10,000+ records | NFR: LOAD | Defer to performance testing specialist. Stress test pagination and scroll performance. |
| Compatibility testing — Specific iOS/Android versions, tablet/landscape | NFR: COMPATIBILITY | Defer to compatibility testing. UC54 does not specify min OS versions. (Q15 Open) |
| Accessibility testing — Screen reader, font scaling, contrast | NFR: ACCESSIBILITY | Defer to accessibility testing specialist. UC54 does not specify a11y requirements. (Q14 Open) |

---

## ⚠️ Known Gaps (from Audit v2)

| Gap ID | Description | Impact on Test Scenarios | Status |
| --- | --- | --- | --- |
| Q1 | Badge color mapping — đã xác nhận từ Stat Banner §2.1 trong UC54 doc | Đã bổ sung scenarios TS_UC54_010a, TS_UC54_031a-031f, TS_UC54_054a để verify badge color cụ thể. | ✅ Resolved |
| Q5 | Report type field mapping thiếu — không biết trường nào ẩn/hiện theo loại | Các scenario chi tiết (TS_UC54_056-067) test default case (tất cả section hiện). Cần bổ sung scenarios per report type khi BA cung cấp mapping. | ❌ Open |

---

## Changelog (v1 → v2)

| # | Thay đổi | Chi tiết |
| --- | --- | --- |
| 1 | Bổ sung TS_UC54_010a | Stat Banner — Màu sắc và icon đúng theo từng trạng thái |
| 2 | Bổ sung TS_UC54_031a | Card — Badge trạng thái hiển thị đúng màu sắc tổng hợp |
| 3 | Bổ sung TS_UC54_031b-031f | Card — Badge từng trạng thái cụ thể (EP: 5 partitions) |
| 4 | Bổ sung TS_UC54_054a | Chi tiết — Badge trạng thái trên Banner hiển thị đúng màu |
| 5 | Cập nhật TS_UC54_073 | Bổ sung verify đổi màu badge khi trạng thái thay đổi real-time |
| 6 | Cập nhật Known Gaps | Q1 chuyển sang Resolved |
| 7 | Tổng scenarios | 85 → 93 (+8 scenarios badge color) |