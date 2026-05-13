# Test Scenarios — UC42-44 Quản lý đặt lịch nộp hồ sơ (Mobile)

**Ngày tạo:** 2026-05-08
**Phiên bản:** v2
**Agent:** qc-scenario-design-MOBILE
**Input:**
- `docs/BA/SRS-mobile/UC42-44_QuanLyDatLich/UC42-44_QuanLyDatLich.md` (v2, 07/05/2026)
- `docs/QC-MOBILE/review-doc/UC42-44_QuanLyDatLich/UC42-44_quan-ly-dat-lich_audited_20260508_v2.md` (Verdict: CONDITIONALLY READY — 85.5/100)
- `docs/QC-MOBILE/review-doc/UC42-44_QuanLyDatLich/UC42-44_question-backlog.md`
- `docs/BA/SRS-mobile/Common rule/CMR_Mobile.md` (v1.1)
- Mockups: UC 42-44_ Tab List.png, UC 42_ Danh sách thủ tục..., UC42-filter.png, UC42-44. Chi tiết lịch hẹn.png

**Phạm vi test:** Mobile Client (UI, navigation, client-side business logic, client-side validation, app behavior khi API response). **KHÔNG test API endpoint / backend logic** (theo `project-context.md` mục 4.1).

**Giả định áp dụng (từ audit v2 — Remaining Open Questions):**
1. **Q2 — Badge color:** design chưa chốt → verify **follow theo UI design** tại thời điểm test (không cần bảng mapping cụ thể).
2. **Q4 — Cá nhân vs Tổ chức:** giả định không có khác biệt UI ngoài format "Mã định danh" (CCCD/CMND cho Cá nhân vs Mã doanh nghiệp cho Tổ chức).
3. **Q6 — Physical Back button (Android):** giả định (a) đóng Bottom Sheet nếu đang mở; (b) quay về màn trước nếu ở chi tiết; (c) hành vi đồng nhất với icon ← trên header.
4. **Q17 — Push notification deep-link:** defer sang UC258-259 scope.
5. **Q18 — Auto polling:** giả định chỉ pull-to-refresh, không auto polling.
6. **Q20 — Copy-to-clipboard:** giả định không hỗ trợ (read-only thuần).
7. **Q25 — Nút "Áp dụng" disabled state:** giả định luôn enabled (không disable khi filter chưa thay đổi).
8. **Q30 — Offline cache:** giả định không cache; offline → hiển thị lỗi mạng.
9. **Q31 — Entry point UC1/Sidebar:** giả định UC42-44 có trong cả Quick Access (Home) và Sidebar.

---

## UC42-44 — Quản lý đặt lịch nộp hồ sơ trên Mobile

### A. Truy cập & Điều hướng (Navigation & Entry Point)

### Scenario ID: TS_UC42-44_001
**Scenario Title:** Truy cập màn hình Quản lý đặt lịch từ Quick Access trên Trang chủ
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 — Truy cập chức năng
**Test Type:** End-to-End
**Description:** Người dùng đã đăng nhập (Cá nhân/Tổ chức) tap vào Quick Access "Quản lý đặt lịch" trên màn hình Trang chủ → mở màn hình danh sách lịch hẹn với Tab "Tất cả" mặc định.
**Test Focus:** Happy path — Entry point from Quick Access

### Scenario ID: TS_UC42-44_002
**Scenario Title:** Truy cập màn hình Quản lý đặt lịch từ Sidebar
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 — Truy cập chức năng
**Test Type:** End-to-End
**Description:** Người dùng đã đăng nhập mở Sidebar → tap item "Quản lý đặt lịch" → mở màn hình danh sách lịch hẹn, trạng thái giống hệt entry từ Quick Access.
**Test Focus:** Alternative flow — Entry point consistency

### Scenario ID: TS_UC42-44_003
**Scenario Title:** Tap nút Back (←) trên Header màn Danh sách → quay về màn trước
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Khung Header, CMR-06
**Test Type:** UI
**Description:** Từ màn Danh sách lịch hẹn, tap nút Back (←) trên header → quay về màn trước đó (Home hoặc sidebar trigger screen).
**Test Focus:** Happy path — Navigation back from List

### Scenario ID: TS_UC42-44_004
**Scenario Title:** Tap nút Back (←) trên Header màn Chi tiết → quay về Danh sách
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.2 Khung Header, CMR-06
**Test Type:** UI
**Description:** Từ màn Chi tiết lịch hẹn, tap nút Back (←) → quay về màn Danh sách lịch hẹn (không phải Home).
**Test Focus:** Happy path — Navigation back from Detail

### Scenario ID: TS_UC42-44_005
**Scenario Title:** Physical Back button (Android) từ màn Chi tiết → quay về Danh sách
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.2 (assumption Q6 từ audit v2)
**Test Type:** UI
**Description:** Trên Android, từ màn Chi tiết lịch hẹn, nhấn Physical Back button → quay về màn Danh sách lịch hẹn (giả định đồng nhất với icon ←).
**Test Focus:** UI state — Android-specific hardware back (assumption-based)

### Scenario ID: TS_UC42-44_006
**Scenario Title:** Physical Back button (Android) khi Bottom Sheet Filter đang mở → đóng Bottom Sheet
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 (assumption Q6 từ audit v2)
**Test Type:** UI
**Description:** Trên Android, khi Bottom Sheet Filter đang mở, nhấn Physical Back button → đóng Bottom Sheet, giữ nguyên danh sách, KHÔNG thoát màn Danh sách.
**Test Focus:** UI state — Hardware back with modal open

### Scenario ID: TS_UC42-44_007
**Scenario Title:** Tap vùng ngoài Bottom Sheet Filter → đóng Bottom Sheet
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Modal Bộ lọc — Nút X
**Test Type:** UI
**Description:** Khi Bottom Sheet Filter mở, tap vào vùng tối/mờ ngoài Bottom Sheet → đóng Bottom Sheet, không thay đổi kết quả hiện tại.
**Test Focus:** UI state — Dismiss modal on outside tap

### Scenario ID: TS_UC42-44_008
**Scenario Title:** Tap nút "X" trên Bottom Sheet Filter → đóng Bottom Sheet
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Modal Bộ lọc — Nút X
**Test Type:** UI
**Description:** Khi Bottom Sheet Filter mở, tap nút "X" góc trên phải → đóng Bottom Sheet, không thay đổi kết quả hiện tại.
**Test Focus:** Happy path — Explicit close button

---

### B. Phân quyền & Vai trò (Role-based Access)

### Scenario ID: TS_UC42-44_009
**Scenario Title:** Guest (chưa đăng nhập) truy cập Quản lý đặt lịch → không cho phép
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 — Phân quyền
**Test Type:** Functional
**Description:** Người dùng chưa đăng nhập cố truy cập màn Quản lý đặt lịch (qua deep-link, entry point nếu có) → app ẩn entry point hoặc điều hướng về màn đăng nhập, không cho phép xem danh sách.
**Test Focus:** Permission/Role — Unauthorized access

### Scenario ID: TS_UC42-44_010
**Scenario Title:** Tài khoản Cá nhân đăng nhập → Mã định danh hiển thị dạng CCCD/CMND trong chi tiết
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 + Section 2.2 Section 2
**Test Type:** Functional
**Description:** Tài khoản Cá nhân đã đăng nhập xem chi tiết lịch hẹn → trường "Mã định danh" (Section 2) hiển thị số CCCD/CMND của người nộp đúng với dữ liệu API trả về.
**Test Focus:** Permission/Role — Individual user — ID format

### Scenario ID: TS_UC42-44_011
**Scenario Title:** Tài khoản Tổ chức đăng nhập → Mã định danh hiển thị dạng Mã doanh nghiệp trong chi tiết
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 + Section 2.2 Section 2
**Test Type:** Functional
**Description:** Tài khoản Tổ chức đã đăng nhập xem chi tiết lịch hẹn → trường "Mã định danh" (Section 2) hiển thị Mã doanh nghiệp đúng với dữ liệu API trả về.
**Test Focus:** Permission/Role — Organization user — ID format

### Scenario ID: TS_UC42-44_012
**Scenario Title:** Tài khoản Cá nhân → chỉ thấy lịch hẹn của bản thân
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 — Phân quyền
**Test Type:** Functional
**Description:** Tài khoản Cá nhân đăng nhập → danh sách lịch hẹn chỉ chứa lịch hẹn của tài khoản này (data scope theo API phía client — không hiển thị của tài khoản khác).
**Test Focus:** Permission/Role — Data scope isolation (Individual)

### Scenario ID: TS_UC42-44_013
**Scenario Title:** Tài khoản Tổ chức → chỉ thấy lịch hẹn của tổ chức
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 — Phân quyền
**Test Type:** Functional
**Description:** Tài khoản Tổ chức đăng nhập → danh sách lịch hẹn chỉ chứa lịch hẹn của tổ chức đó (không hiển thị của tổ chức khác hay cá nhân khác).
**Test Focus:** Permission/Role — Data scope isolation (Organization)

---

### C. Header & Layout Rendering

### Scenario ID: TS_UC42-44_014
**Scenario Title:** Header màn Danh sách hiển thị đúng tiêu đề và style
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Khung Header
**Test Type:** UI
**Description:** Mở màn Danh sách → Header hiển thị tiêu đề "Quản lý đặt lịch nộp hồ sơ" màu trắng trên nền đỏ đậm, căn giữa; nút Back (←) bên trái header.
**Test Focus:** UI state — Header rendering (List)

### Scenario ID: TS_UC42-44_015
**Scenario Title:** Header màn Chi tiết hiển thị đúng tiêu đề và style
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.2 Khung Header
**Test Type:** UI
**Description:** Mở màn Chi tiết → Header hiển thị tiêu đề "Chi tiết lịch hẹn" màu trắng trên nền đỏ đậm, căn giữa; nút Back (←) bên trái header.
**Test Focus:** UI state — Header rendering (Detail)

### Scenario ID: TS_UC42-44_016
**Scenario Title:** Màn hình Danh sách hiển thị đầy đủ 4 khung theo thứ tự từ trên xuống
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Mô tả giao diện
**Test Type:** UI
**Description:** Mở màn Danh sách → hiển thị đúng thứ tự top-down: (1) Header đỏ + Back, (2) Thanh tìm kiếm + Filter icon, (3) Thanh Tab trạng thái 6 tab, (4) Danh sách Card. Bottom Navigation dưới cùng.
**Test Focus:** UI state — Screen layout order

---

### D. Tabs Trạng thái (6 Tabs Fixed)

### Scenario ID: TS_UC42-44_017
**Scenario Title:** Hiển thị đủ 6 tab cố định đúng thứ tự
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Tabs, AC1
**Test Type:** UI
**Description:** Mở màn Danh sách → tab bar hiển thị đủ 6 tab đúng thứ tự: Tất cả → Chờ xác nhận → Đã xác nhận → Đã hủy → Đã bỏ lượt → Đã hoàn thành. Không có tab khác, không tab nào bị ẩn.
**Test Focus:** UI state — Tab bar rendering

### Scenario ID: TS_UC42-44_018
**Scenario Title:** Tab mặc định khi mở màn hình là "Tất cả"
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1, AC1
**Test Type:** UI
**Description:** Lần đầu mở màn Danh sách → Tab "Tất cả" được active (text đỏ + underline đỏ); danh sách hiển thị tất cả lịch hẹn không phân biệt trạng thái.
**Test Focus:** Happy path — Default tab state

### Scenario ID: TS_UC42-44_019
**Scenario Title:** Tap tab "Chờ xác nhận" → filter danh sách theo trạng thái Chờ xác nhận
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Tabs, Section 3.1 step 4
**Test Type:** Functional
**Description:** Tap tab "Chờ xác nhận" → unselect tab "Tất cả", select tab "Chờ xác nhận" (underline đỏ); danh sách chỉ hiển thị lịch hẹn có trạng thái "Chờ xác nhận".
**Test Focus:** Happy path — Tab switch + data filter

### Scenario ID: TS_UC42-44_020
**Scenario Title:** Tap tab "Đã xác nhận" → filter danh sách theo trạng thái Đã xác nhận
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Tabs
**Test Type:** Functional
**Description:** Tap tab "Đã xác nhận" → hiển thị đúng lịch hẹn trạng thái Đã xác nhận.
**Test Focus:** Happy path — Tab switch (EP: Confirmed partition)

### Scenario ID: TS_UC42-44_021
**Scenario Title:** Tap tab "Đã hủy" → filter danh sách theo trạng thái Đã hủy
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Tabs
**Test Type:** Functional
**Description:** Tap tab "Đã hủy" → hiển thị đúng lịch hẹn trạng thái Đã hủy.
**Test Focus:** Happy path — Tab switch (EP: Cancelled partition)

### Scenario ID: TS_UC42-44_022
**Scenario Title:** Tap tab "Đã bỏ lượt" → filter danh sách theo trạng thái Đã bỏ lượt
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Tabs
**Test Type:** Functional
**Description:** Tap tab "Đã bỏ lượt" → hiển thị đúng lịch hẹn trạng thái Đã bỏ lượt.
**Test Focus:** Happy path — Tab switch (EP: Missed partition)

### Scenario ID: TS_UC42-44_023
**Scenario Title:** Tap tab "Đã hoàn thành" → filter danh sách theo trạng thái Đã hoàn thành
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Tabs
**Test Type:** Functional
**Description:** Tap tab "Đã hoàn thành" → hiển thị đúng lịch hẹn trạng thái Đã hoàn thành.
**Test Focus:** Happy path — Tab switch (EP: Completed partition)

### Scenario ID: TS_UC42-44_024
**Scenario Title:** Single selection — chỉ 1 tab active tại 1 thời điểm
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Tabs — Quy tắc hành động
**Test Type:** UI
**Description:** Tap lần lượt nhiều tab → tại mọi thời điểm chỉ có 1 tab duy nhất hiển thị trạng thái active (text đỏ + underline đỏ); các tab còn lại ở trạng thái inactive.
**Test Focus:** UI state — Single selection constraint

### Scenario ID: TS_UC42-44_025
**Scenario Title:** Thứ tự 6 tab cố định, không thay đổi theo session
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Tabs, AC1
**Test Type:** UI
**Description:** Mở / đóng / mở lại màn hình nhiều lần, chuyển tab nhiều lần → thứ tự 6 tab không đổi.
**Test Focus:** UI state — Fixed tab order

### Scenario ID: TS_UC42-44_026
**Scenario Title:** Tab bar horizontal scroll — có thể swipe để xem tab phía sau
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Khung Tabs Trạng thái (Horizontal Scroll)
**Test Type:** UI
**Description:** Trên thiết bị màn hình nhỏ không hiển thị đủ 6 tab cùng lúc → tab bar cho phép swipe ngang để xem tab bị che.
**Test Focus:** UI state — Horizontal scroll tab bar

### Scenario ID: TS_UC42-44_027
**Scenario Title:** Empty state theo từng tab — "Không có dữ liệu."
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Tabs — Empty state, CMR-14
**Test Type:** UI
**Description:** Tap tab mà tài khoản không có lịch hẹn nào (ví dụ: chưa bao giờ có "Đã hủy") → hiển thị empty state "Không có dữ liệu." (icon + message).
**Test Focus:** UI state — Empty state per tab

---

### E. Search Box — Tìm kiếm (EP + BVA)

### Scenario ID: TS_UC42-44_028
**Scenario Title:** Search box hiển thị đúng icon kính lúp và placeholder
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Ô tìm kiếm
**Test Type:** UI
**Description:** Mở màn Danh sách → search box có icon kính lúp bên trái; placeholder "Tìm kiếm thủ tục..."; ô trống mặc định.
**Test Focus:** UI state — Search box default rendering

### Scenario ID: TS_UC42-44_029
**Scenario Title:** Nhập keyword hợp lệ → sau 3s debounce, danh sách tự filter theo keyword
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Ô tìm kiếm, AC9, CMR-01
**Test Type:** Functional
**Description:** Nhập keyword "đầu tư" vào ô tìm kiếm → chờ 3 giây → danh sách tự động hiển thị kết quả chứa keyword (fuzzy match) mà không cần nhấn Enter.
**Test Focus:** Happy path — Debounce + fuzzy match

### Scenario ID: TS_UC42-44_030
**Scenario Title:** Debounce 3s — gõ liên tục không trigger filter giữa chừng
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Ô tìm kiếm, CMR-01
**Test Type:** Functional
**Description:** Gõ từng ký tự "đ", "ầ", "u", "t", "ư" liên tục trong <3s → hệ thống KHÔNG trigger filter sau mỗi ký tự; chỉ filter 1 lần sau 3s kể từ ký tự cuối cùng.
**Test Focus:** Boundary — Debounce timing (below threshold)

### Scenario ID: TS_UC42-44_031
**Scenario Title:** BVA — Search box chấp nhận 1 ký tự (Min boundary)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Ô tìm kiếm, CMR-01 (max 500 ký tự)
**Test Type:** Functional
**Description:** Nhập đúng 1 ký tự "a" → sau 3s debounce, danh sách filter theo keyword 1 ký tự (fuzzy match).
**Test Focus:** Boundary — Min length (1 char)

### Scenario ID: TS_UC42-44_032
**Scenario Title:** BVA — Search box chấp nhận đúng 500 ký tự (Upper boundary)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Ô tìm kiếm, CMR-01
**Test Type:** Functional
**Description:** Nhập chuỗi dài đúng 500 ký tự (ví dụ lặp "a" x 500) → chấp nhận đầy đủ 500 ký tự, sau 3s debounce trigger filter.
**Test Focus:** Boundary — Upper limit (500 chars exactly)

### Scenario ID: TS_UC42-44_033
**Scenario Title:** BVA — Search box chặn ký tự thứ 501 (Upper boundary + 1)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Ô tìm kiếm, CMR-01
**Test Type:** Functional
**Description:** Khi đã nhập 500 ký tự, cố gắng gõ thêm ký tự 501 → hệ thống chặn input, không cho phép vượt quá 500 ký tự (hoặc auto truncate ở 500).
**Test Focus:** Boundary — Upper limit + 1 (501 chars)

### Scenario ID: TS_UC42-44_034
**Scenario Title:** BVA — Paste chuỗi > 500 ký tự → cắt còn 500
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Ô tìm kiếm, CMR-01
**Test Type:** Functional
**Description:** Paste một chuỗi 600 ký tự vào search box → ô chỉ nhận 500 ký tự đầu tiên, bỏ 100 ký tự dư.
**Test Focus:** Boundary — Paste overflow handling

### Scenario ID: TS_UC42-44_035
**Scenario Title:** Search theo "tên thủ tục" — khớp fuzzy trả về kết quả đúng
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Ô tìm kiếm
**Test Type:** Functional
**Description:** Nhập keyword là một phần tên thủ tục (ví dụ "cấp giấy") → kết quả trả về bao gồm tất cả lịch hẹn có tên thủ tục chứa "cấp giấy".
**Test Focus:** Happy path — Search by procedure name

### Scenario ID: TS_UC42-44_036
**Scenario Title:** Search theo "mã thủ tục" — khớp fuzzy trả về kết quả đúng
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Ô tìm kiếm
**Test Type:** Functional
**Description:** Nhập keyword là một phần mã thủ tục (ví dụ "2.000412") → kết quả trả về bao gồm lịch hẹn có mã thủ tục chứa chuỗi này.
**Test Focus:** Happy path — Search by procedure code

### Scenario ID: TS_UC42-44_037
**Scenario Title:** Search scope — áp dụng toàn bộ tab, kết quả hiển thị trên tab "Tất cả"
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Ô tìm kiếm — Phạm vi tìm kiếm, AC9
**Test Type:** Functional
**Description:** Đang ở tab "Chờ xác nhận" → nhập keyword → kết quả trả về bao gồm lịch hẹn từ TẤT CẢ các trạng thái (không chỉ "Chờ xác nhận"), hiển thị trên tab "Tất cả".
**Test Focus:** Business rule — Search cross-tab scope

### Scenario ID: TS_UC42-44_038
**Scenario Title:** Search không có kết quả → "Không tìm thấy kết quả."
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Ô tìm kiếm, CMR-14
**Test Type:** UI
**Description:** Nhập keyword không tồn tại trong bất kỳ lịch hẹn nào (ví dụ "xyz123notexist") → hiển thị message "Không tìm thấy kết quả.".
**Test Focus:** Error/Exception — No match

### Scenario ID: TS_UC42-44_039
**Scenario Title:** Xóa hết keyword → danh sách reset về mặc định
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Ô tìm kiếm, AC10
**Test Type:** Functional
**Description:** Sau khi đã search có kết quả, xóa hết keyword (ô rỗng) → danh sách tự động trở về trạng thái mặc định (hiển thị tất cả) theo tab đang chọn.
**Test Focus:** Happy path — Clear search resets list

### Scenario ID: TS_UC42-44_040
**Scenario Title:** Search với keyword chỉ chứa khoảng trắng → coi như rỗng
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Ô tìm kiếm (EP invalid)
**Test Type:** Functional
**Description:** Nhập chỉ spaces "   " → hệ thống xử lý như rỗng, hiển thị danh sách mặc định (không trigger filter vô nghĩa).
**Test Focus:** EP — Invalid partition (whitespace only)

### Scenario ID: TS_UC42-44_041
**Scenario Title:** Search với ký tự đặc biệt (UTF-8, tiếng Việt có dấu)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Ô tìm kiếm (EP valid Unicode)
**Test Type:** Functional
**Description:** Nhập keyword có dấu tiếng Việt (ví dụ "Đầu tư", "Giấy phép") → search khớp đúng; các ký tự UTF-8 không gây lỗi.
**Test Focus:** EP — Valid partition (Unicode)

### Scenario ID: TS_UC42-44_042
**Scenario Title:** Search với ký tự emoji/symbol → không crash
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Ô tìm kiếm (EP invalid)
**Test Type:** Functional
**Description:** Nhập emoji hoặc ký tự đặc biệt như "😀", "<>&", "'" → app không crash, search trả về "Không tìm thấy kết quả." nếu không match.
**Test Focus:** EP — Edge input (special chars)

---

### F. Filter — Bộ lọc (Decision Table + EP)

### Scenario ID: TS_UC42-44_043
**Scenario Title:** Tap icon Filter → mở Bottom Sheet Bộ lọc
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Nút Lọc, CMR-02
**Test Type:** UI
**Description:** Tap icon Filter → Bottom Sheet trượt lên từ dưới, hiển thị đầy đủ: Dropdown "Lĩnh vực", Dropdown "Dịch vụ công", nút "X", nút "Nhập lại", nút "Áp dụng".
**Test Focus:** Happy path — Open filter modal

### Scenario ID: TS_UC42-44_044
**Scenario Title:** Filter default — Lĩnh vực và Dịch vụ công đều là "Tất cả ..."
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Modal Bộ lọc
**Test Type:** UI
**Description:** Lần đầu mở Bottom Sheet Filter → Dropdown "Lĩnh vực" = "Tất cả lĩnh vực"; Dropdown "Dịch vụ công" = "Tất cả dịch vụ công".
**Test Focus:** UI state — Default filter values

### Scenario ID: TS_UC42-44_045
**Scenario Title:** Decision Table — Chọn chỉ Lĩnh vực (Valid) → lọc theo lĩnh vực
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Modal Bộ lọc, AC7
**Test Type:** Functional
**Description:** Mở Filter → chọn 1 Lĩnh vực cụ thể (ví dụ "Đầu tư"), giữ Dịch vụ công = "Tất cả" → tap Áp dụng → danh sách lọc theo lĩnh vực "Đầu tư", mọi dịch vụ công.
**Test Focus:** Decision Table — Row (L=Valid, DVC=Default)

### Scenario ID: TS_UC42-44_046
**Scenario Title:** Decision Table — Chọn chỉ Dịch vụ công (Valid) → lọc theo dịch vụ công
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Modal Bộ lọc, AC7
**Test Type:** Functional
**Description:** Mở Filter → giữ Lĩnh vực = "Tất cả", chọn 1 Dịch vụ công cụ thể (ví dụ "DVC mức độ 4") → tap Áp dụng → danh sách lọc theo dịch vụ công "mức độ 4", mọi lĩnh vực.
**Test Focus:** Decision Table — Row (L=Default, DVC=Valid)

### Scenario ID: TS_UC42-44_047
**Scenario Title:** Decision Table — Chọn cả Lĩnh vực + Dịch vụ công (Valid + Valid) → lọc kết hợp
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Modal Bộ lọc, AC7
**Test Type:** Functional
**Description:** Mở Filter → chọn Lĩnh vực "Đầu tư" + Dịch vụ công "Mức độ 4" → tap Áp dụng → danh sách lọc đồng thời theo cả 2 tiêu chí (AND).
**Test Focus:** Decision Table — Row (L=Valid, DVC=Valid) combined filter

### Scenario ID: TS_UC42-44_048
**Scenario Title:** Decision Table — Kết hợp Lĩnh vực + Dịch vụ công không có dữ liệu matching
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Modal Bộ lọc — "Áp dụng" message, CMR-14
**Test Type:** Functional
**Description:** Chọn combo Lĩnh vực + Dịch vụ công mà không có lịch hẹn nào thỏa mãn → tap Áp dụng → hiển thị "Không tìm thấy kết quả.".
**Test Focus:** Decision Table — Row (Valid+Valid, no match)

### Scenario ID: TS_UC42-44_049
**Scenario Title:** Filter độc lập — Chọn Lĩnh vực KHÔNG ảnh hưởng danh sách Dịch vụ công (no cascade)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Modal Bộ lọc — Filter independence, AC7
**Test Type:** Functional
**Description:** Mở Filter → chọn 1 Lĩnh vực → mở dropdown Dịch vụ công → danh sách option Dịch vụ công KHÔNG bị cắt/thu hẹp theo Lĩnh vực (vẫn đầy đủ như trước khi chọn Lĩnh vực).
**Test Focus:** Business rule — Filter independence (no cascade)

### Scenario ID: TS_UC42-44_050
**Scenario Title:** Dropdown Lĩnh vực — option đã chọn được highlight/bold khi mở lại
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Modal Bộ lọc — Quy tắc hiển thị dropdown, CMR-03
**Test Type:** UI
**Description:** Chọn Lĩnh vực X → mở lại dropdown Lĩnh vực → option X được highlight/bold; các option khác ở state bình thường.
**Test Focus:** UI state — Selected option highlight

### Scenario ID: TS_UC42-44_051
**Scenario Title:** Dropdown Lĩnh vực — tìm kiếm inline trong dropdown (fuzzy)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Modal Bộ lọc — Quy tắc hành động dropdown
**Test Type:** Functional
**Description:** Mở dropdown Lĩnh vực → nhập vài ký tự → danh sách dropdown tự lọc theo fuzzy match.
**Test Focus:** Happy path — In-dropdown search

### Scenario ID: TS_UC42-44_052
**Scenario Title:** Dropdown — option text dài → truncate "..." ở cuối
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Modal Bộ lọc — Quy tắc hiển thị
**Test Type:** UI
**Description:** Dropdown hiển thị option có tên vượt giới hạn → tự động cắt ngắn và thêm "..." ở cuối.
**Test Focus:** UI state — Long option truncation

### Scenario ID: TS_UC42-44_053
**Scenario Title:** Nhấn "Nhập lại" — reset về mặc định, KHÔNG đóng Bottom Sheet, KHÔNG gọi API
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Modal Bộ lọc — Nút Nhập lại
**Test Type:** Functional
**Description:** Chọn Lĩnh vực X + Dịch vụ công Y → tap "Nhập lại" → Dropdown reset về "Tất cả lĩnh vực" & "Tất cả dịch vụ công"; Bottom Sheet VẪN MỞ; danh sách phía sau không thay đổi (không gọi API).
**Test Focus:** Business rule — Reset button behavior

### Scenario ID: TS_UC42-44_054
**Scenario Title:** Nhấn "Áp dụng" — đóng Bottom Sheet, gọi API, cập nhật danh sách
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Modal Bộ lọc — Nút Áp dụng
**Test Type:** Functional
**Description:** Chọn filter → tap "Áp dụng" → Bottom Sheet đóng; app gọi API với tham số filter; danh sách phía sau được cập nhật.
**Test Focus:** Happy path — Apply filter

### Scenario ID: TS_UC42-44_055
**Scenario Title:** Active filter indicator — icon filter có indicator xanh lá khi filter ≠ mặc định
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Nút Lọc, AC8, CMR-02
**Test Type:** UI
**Description:** Sau khi Áp dụng filter khác mặc định → icon filter có chấm indicator màu xanh lá ở góc phải trên.
**Test Focus:** UI state — Active filter indicator ON

### Scenario ID: TS_UC42-44_056
**Scenario Title:** Active filter indicator — ẩn khi reset về mặc định
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Nút Lọc, AC8
**Test Type:** UI
**Description:** Đang active filter → mở Filter → "Nhập lại" → "Áp dụng" → indicator xanh lá ẩn đi, icon filter về trạng thái mặc định.
**Test Focus:** UI state — Active filter indicator OFF

### Scenario ID: TS_UC42-44_057
**Scenario Title:** Đóng Filter bằng "X" không áp dụng → danh sách không thay đổi
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Modal Bộ lọc — Nút X
**Test Type:** Functional
**Description:** Mở Filter → chọn tiêu chí mới → tap "X" (không Áp dụng) → Bottom Sheet đóng, danh sách giữ nguyên theo filter cũ, tiêu chí vừa chọn bị hủy.
**Test Focus:** Business rule — Cancel filter changes

---

### G. Card List — Danh sách Lịch hẹn

### Scenario ID: TS_UC42-44_058
**Scenario Title:** Card hiển thị đủ 5 field + icon điều hướng (>)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Khung Danh sách, AC3
**Test Type:** UI
**Description:** Mỗi card hiển thị: (1) Tên thủ tục bold, (2) Badge Trạng thái, (3) Icon Tòa nhà + "Lĩnh vực: ...", (4) Icon Người + "Thời gian đặt: ...", (5) Icon Lịch + "Ngày cán bộ hẹn nộp: ...", (6) Icon mũi tên > phải.
**Test Focus:** UI state — Card rendering

### Scenario ID: TS_UC42-44_059
**Scenario Title:** Sort order — danh sách sắp xếp theo "Thời gian đặt" giảm dần (mới nhất lên đầu)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 step 3, AC4
**Test Type:** Functional
**Description:** Mở danh sách có nhiều bản ghi → các card xuất hiện theo thứ tự "Thời gian đặt" DESC (bản ghi có thời gian đặt gần nhất ở trên cùng).
**Test Focus:** Business rule — Sort order

### Scenario ID: TS_UC42-44_060
**Scenario Title:** Truncate tên thủ tục quá 2 dòng → "..."
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Card — Tên thủ tục
**Test Type:** UI
**Description:** Card có tên thủ tục dài > 2 dòng → hiển thị tối đa 2 dòng, thêm "..." cuối dòng 2.
**Test Focus:** UI state — Text truncation (2 lines)

### Scenario ID: TS_UC42-44_061
**Scenario Title:** Truncate Lĩnh vực quá 1 dòng → "..."
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Card — Lĩnh vực
**Test Type:** UI
**Description:** Card có Lĩnh vực dài > 1 dòng → tự truncate 1 dòng + "..." ở cuối.
**Test Focus:** UI state — Text truncation (1 line)

### Scenario ID: TS_UC42-44_062
**Scenario Title:** Null handling card — field null hiển thị "-"
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Card — Quy tắc hiển thị null, AC3
**Test Type:** UI
**Description:** API trả về bản ghi có Lĩnh vực = null, Ngày cán bộ hẹn nộp = null → card hiển thị "Lĩnh vực: -" và "Ngày cán bộ hẹn nộp: -".
**Test Focus:** Business rule — Null handling on card

### Scenario ID: TS_UC42-44_063
**Scenario Title:** Format ngày "Thời gian đặt" trên card — DD/MM/YYYY HH:mm
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Card — Thời gian đặt, CMR-12
**Test Type:** UI
**Description:** Card hiển thị "Thời gian đặt: 08/05/2026 14:30" theo đúng format DD/MM/YYYY HH:mm (24h, GMT+7).
**Test Focus:** UI state — Date format

### Scenario ID: TS_UC42-44_064
**Scenario Title:** Format ngày "Ngày cán bộ hẹn nộp" trên card — DD/MM/YYYY (không có giờ)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Card — Ngày cán bộ hẹn nộp, CMR-12
**Test Type:** UI
**Description:** Card hiển thị "Ngày cán bộ hẹn nộp: 10/05/2026" theo đúng format DD/MM/YYYY (không bao gồm giờ).
**Test Focus:** UI state — Date format

### Scenario ID: TS_UC42-44_065
**Scenario Title:** Badge trạng thái — read-only, không tap
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Card — Badge, CMR-05
**Test Type:** UI
**Description:** Tap vào vùng badge trạng thái trên card → không có phản hồi riêng (không mở menu, không toast); nếu tap → navigate chi tiết (vì tap toàn card).
**Test Focus:** Business rule — Badge non-interactive

### Scenario ID: TS_UC42-44_066
**Scenario Title:** Badge — màu sắc follow theo UI design
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Card — Badge, AC6, CMR-05
**Test Type:** UI
**Description:** Với mỗi trạng thái (Chờ xác nhận / Đã xác nhận / Đã hủy / Đã bỏ lượt / Đã hoàn thành), badge hiển thị đúng màu sắc **follow theo UI design** tại thời điểm test.
**Test Focus:** UI state — Badge color (follow UI design)

### Scenario ID: TS_UC42-44_067
**Scenario Title:** Tap card → navigate sang màn Chi tiết lịch hẹn
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Card — Icon Điều hướng, Section 3.2 step 1
**Test Type:** End-to-End
**Description:** Tap vào bất kỳ vùng nào của card (hoặc icon >) → navigate sang màn Chi tiết lịch hẹn với đúng mã lịch hẹn tương ứng.
**Test Focus:** Happy path — Card tap navigate

### Scenario ID: TS_UC42-44_068
**Scenario Title:** Debounce navigation — double tap card chỉ navigate 1 lần
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Debounce navigation, CMR-18
**Test Type:** Functional
**Description:** Double tap nhanh vào card → chỉ navigate 1 lần sang màn Chi tiết, không mở 2 instance.
**Test Focus:** Business rule — Debounce double tap

### Scenario ID: TS_UC42-44_069
**Scenario Title:** Danh sách empty — "Không có dữ liệu."
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Empty state, CMR-14
**Test Type:** UI
**Description:** Tài khoản chưa có lịch hẹn nào (tab "Tất cả" rỗng) → hiển thị empty state "Không có dữ liệu." (icon + message).
**Test Focus:** Error/Exception — Empty list

---

### H. Lazy Load & Pagination (BVA)

### Scenario ID: TS_UC42-44_070
**Scenario Title:** First page load — 20 records đầu tiên
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Phân trang, CMR-04, AC13
**Test Type:** Functional
**Description:** Mở màn Danh sách → app tự gọi API lấy 20 records đầu tiên; danh sách hiển thị tối đa 20 card.
**Test Focus:** Happy path — First page lazy load

### Scenario ID: TS_UC42-44_071
**Scenario Title:** BVA — Tổng bản ghi = 20 → không trigger lazy load, không có spinner lazy
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Phân trang, CMR-04
**Test Type:** Functional
**Description:** Tài khoản có đúng 20 lịch hẹn → load hiển thị đủ 20, cuộn xuống cuối → KHÔNG trigger thêm page, không hiển thị spinner lazy.
**Test Focus:** Boundary — Exact page size (20)

### Scenario ID: TS_UC42-44_072
**Scenario Title:** BVA — Tổng bản ghi = 21 → cuộn cuối trigger load page 2 (1 record)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Phân trang, CMR-04, AC13
**Test Type:** Functional
**Description:** Tài khoản có 21 lịch hẹn → load page 1 có 20 → cuộn đến cuối → auto trigger load page 2, thêm 1 record, tổng hiển thị đủ 21.
**Test Focus:** Boundary — Page + 1 (auto-load next page)

### Scenario ID: TS_UC42-44_073
**Scenario Title:** BVA — Tổng bản ghi = 40 → cuộn cuối page 1 trigger load page 2 (đủ 20)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Phân trang, CMR-04
**Test Type:** Functional
**Description:** Tài khoản có 40 lịch hẹn → load page 1 (20) → cuộn cuối → trigger load page 2 (20 thêm) → tổng 40; cuộn tiếp xuống không có page 3.
**Test Focus:** Boundary — Exact 2 full pages (40)

### Scenario ID: TS_UC42-44_074
**Scenario Title:** Spinner cục bộ ở cuối danh sách khi lazy load page tiếp theo
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Loading state — tiếp theo, CMR-07
**Test Type:** UI
**Description:** Khi cuộn đến cuối trigger lazy load page N+1 → hiển thị spinner cục bộ ở cuối danh sách trong khi chờ API; spinner ẩn sau khi load xong.
**Test Focus:** UI state — Lazy load spinner

### Scenario ID: TS_UC42-44_075
**Scenario Title:** Lazy load fail — retry tự động 3 lần
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Xử lý lazy load fail, AC14
**Test Type:** Functional
**Description:** Simulate API lazy load page N lỗi → hệ thống tự retry 3 lần (mỗi lần ~2s); nếu cuối cùng thành công → append records.
**Test Focus:** Business rule — Auto retry on lazy fail

### Scenario ID: TS_UC42-44_076
**Scenario Title:** Lazy load fail sau 3 lần retry → hiển thị lỗi cục bộ cuối danh sách
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Xử lý lazy load fail, AC14
**Test Type:** Functional
**Description:** Simulate API lazy load luôn lỗi → sau 3 lần retry đều fail → dừng auto retry; hiển thị message lỗi cục bộ ở cuối danh sách.
**Test Focus:** Error/Exception — Lazy load final fail

### Scenario ID: TS_UC42-44_077
**Scenario Title:** Lazy load fail — pull-to-refresh để tải lại từ đầu
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Xử lý lazy load fail, AC14
**Test Type:** Functional
**Description:** Sau khi lazy load fail hiển thị lỗi cục bộ → kéo xuống pull-to-refresh → app gọi lại từ page 1, reset toàn bộ danh sách.
**Test Focus:** Recovery — Pull to reload after fail

---

### I. Pull-to-Refresh

### Scenario ID: TS_UC42-44_078
**Scenario Title:** Pull-to-refresh trên Danh sách → refresh từ page 1
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Pull to refresh, AC11, CMR-13
**Test Type:** Functional
**Description:** Đang ở danh sách → kéo xuống từ đầu → spinner xuất hiện ở đầu → app gọi API page 1 → cập nhật danh sách → ẩn spinner.
**Test Focus:** Happy path — Pull to refresh list

### Scenario ID: TS_UC42-44_079
**Scenario Title:** Pull-to-refresh trên Chi tiết → refresh chi tiết lịch hẹn
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.2 Pull to refresh, AC12, CMR-13
**Test Type:** Functional
**Description:** Đang ở màn Chi tiết → kéo xuống từ đầu → spinner xuất hiện → app gọi API chi tiết → cập nhật nội dung 5 section → ẩn spinner.
**Test Focus:** Happy path — Pull to refresh detail

### Scenario ID: TS_UC42-44_080
**Scenario Title:** Pull-to-refresh giữ nguyên tab + search + filter hiện tại
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Quy tắc chung + Section 3.1
**Test Type:** Functional
**Description:** Đang ở tab "Chờ xác nhận" + search keyword + filter active → pull-to-refresh → refresh danh sách vẫn giữ tab/search/filter hiện tại, không reset.
**Test Focus:** Business rule — Pull-to-refresh preserves state

### Scenario ID: TS_UC42-44_081
**Scenario Title:** Pull-to-refresh khi đang lazy load → reset scroll về đầu, dừng lazy
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Pull to refresh
**Test Type:** Functional
**Description:** Đang ở page N (lazy load xong) → pull-to-refresh → danh sách load lại từ page 1, scroll về đầu; lazy state reset.
**Test Focus:** Business rule — Refresh resets pagination

---

### J. Loading State (First-load vs Subsequent)

### Scenario ID: TS_UC42-44_082
**Scenario Title:** First-load màn Danh sách → full-screen loading overlay
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Loading state, AC17, CMR-07
**Test Type:** UI
**Description:** Lần đầu vào màn Danh sách → full-screen loading overlay hiển thị cho đến khi API trả về; sau đó hiển thị danh sách.
**Test Focus:** UI state — First-load overlay (List)

### Scenario ID: TS_UC42-44_083
**Scenario Title:** First-load màn Chi tiết → full-screen loading overlay
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.2 Loading state, AC17, CMR-07
**Test Type:** UI
**Description:** Lần đầu vào màn Chi tiết → full-screen loading overlay hiển thị cho đến khi API trả về dữ liệu chi tiết.
**Test Focus:** UI state — First-load overlay (Detail)

### Scenario ID: TS_UC42-44_084
**Scenario Title:** Subsequent load — đổi tab → chỉ spinner cục bộ (không overlay)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Loading state — tiếp theo, CMR-07
**Test Type:** UI
**Description:** Sau khi first-load xong, tap chuyển tab → chỉ hiển thị spinner cục bộ ở vùng danh sách, KHÔNG full-screen overlay.
**Test Focus:** UI state — Subsequent load spinner

---

### K. Màn Chi tiết Lịch hẹn (Detail Screen)

### Scenario ID: TS_UC42-44_085
**Scenario Title:** Chi tiết hiển thị đủ 5 section theo thứ tự
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.2, AC5
**Test Type:** UI
**Description:** Mở chi tiết → hiển thị đúng 5 section theo thứ tự: (1) Thông tin thủ tục, (2) Thông tin người nộp, (3) Thông tin lịch hẹn, (4) Trạng thái, (5) Ghi chú.
**Test Focus:** UI state — Detail screen section order

### Scenario ID: TS_UC42-44_086
**Scenario Title:** Section 1 "Thông tin thủ tục" — 6 field hiển thị đúng dữ liệu
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.2 Section 1
**Test Type:** Functional
**Description:** Section 1 hiển thị đủ 6 field: Mã thủ tục, Tên thủ tục, Lĩnh vực, Dịch vụ công, Cơ quan thực hiện, Đơn vị tiếp nhận — tất cả read-only, khớp 100% với API.
**Test Focus:** Happy path — Section 1 data

### Scenario ID: TS_UC42-44_087
**Scenario Title:** Section 2 "Thông tin người nộp" — 2 field hiển thị đúng dữ liệu
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.2 Section 2
**Test Type:** Functional
**Description:** Section 2 hiển thị 2 field: Mã định danh (CCCD/CMND hoặc Mã DN), Tên người nộp — khớp 100% với API.
**Test Focus:** Happy path — Section 2 data

### Scenario ID: TS_UC42-44_088
**Scenario Title:** Section 3 "Thông tin lịch hẹn" — 4 field hiển thị đúng format
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.2 Section 3, CMR-12
**Test Type:** Functional
**Description:** Section 3 hiển thị 4 field: Ngày hẹn nộp (DD/MM/YYYY), Khung giờ hẹn nộp (HH:mm - HH:mm), Thời gian đặt (DD/MM/YYYY HH:mm), Ngày cán bộ hẹn nộp (DD/MM/YYYY) — format theo CMR-12.
**Test Focus:** Happy path — Section 3 data + formats

### Scenario ID: TS_UC42-44_089
**Scenario Title:** Khung giờ hẹn nộp format đúng "HH:mm - HH:mm"
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.2 Khung giờ hẹn nộp, CMR-12
**Test Type:** UI
**Description:** Hiển thị ví dụ "08:00 - 09:00" (24h, GMT+7); không ở dạng "8h-9h" hay "08:00 AM - 09:00 AM".
**Test Focus:** UI state — Time range format

### Scenario ID: TS_UC42-44_090
**Scenario Title:** Section 4 "Trạng thái" — Badge read-only không tap được
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.2 Section 4, AC6, CMR-05
**Test Type:** UI
**Description:** Section 4 chỉ có 1 field Trạng thái dạng Badge, màu theo UI design; tap vào badge → không có phản hồi.
**Test Focus:** Business rule — Badge read-only

### Scenario ID: TS_UC42-44_091
**Scenario Title:** Section 5 "Ghi chú" — hiển thị nội dung
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.2 Section 5
**Test Type:** UI
**Description:** Section 5 hiển thị nội dung ghi chú text; wrap text nếu dài, không truncate.
**Test Focus:** Happy path — Section 5 data

### Scenario ID: TS_UC42-44_092
**Scenario Title:** Null handling chi tiết — field null hiển thị "-"
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.2 — Quy tắc null handling
**Test Type:** UI
**Description:** API trả về Mã thủ tục/Ngày hẹn nộp/Khung giờ/Ngày cán bộ hẹn nộp/Ghi chú = null → các field tương ứng hiển thị "-".
**Test Focus:** Business rule — Null handling detail

### Scenario ID: TS_UC42-44_093
**Scenario Title:** Wrap text — field có nội dung dài không bị truncate
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.2 — Quy tắc hiển thị chung
**Test Type:** UI
**Description:** Tên thủ tục / Lĩnh vực / Cơ quan thực hiện / Ghi chú rất dài → text wrap xuống nhiều dòng, KHÔNG truncate ("..." không xuất hiện).
**Test Focus:** UI state — Wrap full text

### Scenario ID: TS_UC42-44_094
**Scenario Title:** Chi tiết "Thời gian đặt" khớp 100% với card (cùng bản ghi)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.2 Section 3 + AC5 + Q8 resolved
**Test Type:** Integration
**Description:** Xem "Thời gian đặt" trên card trong danh sách → tap vào card → xem "Thời gian đặt" trong chi tiết → hai giá trị khớp 100%, cùng format DD/MM/YYYY HH:mm.
**Test Focus:** Integration — Card vs Detail consistency

### Scenario ID: TS_UC42-44_095
**Scenario Title:** Chi tiết — toàn bộ read-only, không có CTA hành động
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 Out of scope + Section 2.2 "Toàn bộ màn hình là read-only"
**Test Type:** UI
**Description:** Quan sát toàn màn chi tiết → không có nút "Hủy lịch", "Chỉnh sửa", "Tạo mới" hoặc bất kỳ CTA nào; chỉ có nút Back và gesture pull-to-refresh.
**Test Focus:** Business rule — Read-only scope (out of scope for create/edit/cancel)

---

### L. State Persistence (Back Navigation)

### Scenario ID: TS_UC42-44_096
**Scenario Title:** Back từ Chi tiết → giữ nguyên tab đang chọn
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Quy tắc chung, AC2
**Test Type:** Functional
**Description:** Đang tab "Chờ xác nhận" → tap card → vào chi tiết → back → màn Danh sách vẫn giữ tab "Chờ xác nhận" active (không reset về "Tất cả").
**Test Focus:** Business rule — Tab persistence

### Scenario ID: TS_UC42-44_097
**Scenario Title:** Back từ Chi tiết → giữ nguyên scroll position
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Quy tắc chung, AC2
**Test Type:** Functional
**Description:** Cuộn xuống card thứ 15 → tap vào card → vào chi tiết → back → danh sách vẫn giữ nguyên vị trí cuộn (card 15 vẫn ở vị trí cũ).
**Test Focus:** Business rule — Scroll position persistence

### Scenario ID: TS_UC42-44_098
**Scenario Title:** Back từ Chi tiết → giữ nguyên keyword search
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Quy tắc chung, AC18, CMR-01
**Test Type:** Functional
**Description:** Search keyword "đầu tư" → tap card → vào chi tiết → back → search box vẫn giữ "đầu tư", danh sách vẫn hiển thị kết quả search.
**Test Focus:** Business rule — Search persistence

### Scenario ID: TS_UC42-44_099
**Scenario Title:** Back từ Chi tiết → giữ nguyên filter đã áp dụng
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Quy tắc chung, AC18
**Test Type:** Functional
**Description:** Áp dụng filter Lĩnh vực = X → tap card → vào chi tiết → back → filter indicator xanh lá vẫn hiển thị, danh sách vẫn lọc theo Lĩnh vực = X.
**Test Focus:** Business rule — Filter persistence

### Scenario ID: TS_UC42-44_100
**Scenario Title:** Chuyển sang tab khác → reset search + filter về mặc định
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 Quy tắc chung, AC19
**Test Type:** Functional
**Description:** Ở tab "Tất cả" có search "đầu tư" + filter "Lĩnh vực X" → tap sang tab "Đã xác nhận" → search box và filter reset về mặc định (không còn keyword, filter indicator ẩn).
**Test Focus:** Business rule — Reset on tab switch

### Scenario ID: TS_UC42-44_101
**Scenario Title:** Kill app → mở lại → không giữ state (app restart)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 (implicit — không có cache persistent)
**Test Type:** Functional
**Description:** Mở màn Danh sách → kill app hoàn toàn → mở lại → vào màn Danh sách → tab default = "Tất cả", search rỗng, filter mặc định (không khôi phục state từ session trước).
**Test Focus:** UI state — Fresh state after kill

### Scenario ID: TS_UC42-44_102
**Scenario Title:** Background/foreground — giữ nguyên state
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 (Mobile common behavior)
**Test Type:** UI
**Description:** Đang ở tab "Đã hoàn thành" với search keyword → đưa app về background (Home button) → mở lại app → state giữ nguyên (tab + search).
**Test Focus:** UI state — Background/foreground state preservation

---

### M. Error Handling (Mobile Client xử lý API response)

### Scenario ID: TS_UC42-44_103
**Scenario Title:** Lỗi mạng (Danh sách) → message + nút "Thử lại"
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Xử lý lỗi — Lỗi mạng, AC15, CMR-07
**Test Type:** Functional
**Description:** Tắt mạng → mở màn Danh sách → hiển thị "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." kèm nút "Thử lại"; nhấn "Thử lại" → gọi lại API.
**Test Focus:** Error/Exception — Network error (List)

### Scenario ID: TS_UC42-44_104
**Scenario Title:** Lỗi HTTP 500 (Danh sách) → message, không có nút Thử lại
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Xử lý lỗi — Lỗi API 500, AC15, CMR-07
**Test Type:** Functional
**Description:** Simulate API trả 500 → hiển thị "Hệ thống đang bận. Vui lòng thử lại sau." — KHÔNG có nút Thử lại theo spec.
**Test Focus:** Error/Exception — 500 error (no retry button)

### Scenario ID: TS_UC42-44_105
**Scenario Title:** Timeout >10s (Danh sách) → message + nút "Thử lại"
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Xử lý lỗi — Timeout, AC15, CMR-16
**Test Type:** Functional
**Description:** Simulate API timeout >10s → hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." kèm nút "Thử lại".
**Test Focus:** Error/Exception — Timeout

### Scenario ID: TS_UC42-44_106
**Scenario Title:** BVA — API response 9.9s (dưới 10s) → load thành công
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Timeout, CMR-16 (Boundary)
**Test Type:** Functional
**Description:** Simulate API trả response tại ~9.9s (dưới 10s) → app vẫn hiển thị danh sách thành công, KHÔNG trigger timeout.
**Test Focus:** Boundary — Timeout below threshold

### Scenario ID: TS_UC42-44_107
**Scenario Title:** BVA — API response 10.1s (vừa quá ngưỡng) → trigger timeout
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Timeout, CMR-16 (Boundary + 1)
**Test Type:** Functional
**Description:** Simulate API mất ~10.1s → app trigger timeout, hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + nút "Thử lại".
**Test Focus:** Boundary — Timeout just over threshold

### Scenario ID: TS_UC42-44_108
**Scenario Title:** HTTP 401 có refresh token hợp lệ → tự động refresh, load thành công
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Xử lý lỗi — Session 401, CMR-07
**Test Type:** Integration
**Description:** API trả 401 nhưng refresh token còn hiệu lực (<15 ngày) → app tự gọi refresh token → retry API gốc → load danh sách thành công, user không bị gián đoạn.
**Test Focus:** Happy path — Silent token refresh

### Scenario ID: TS_UC42-44_109
**Scenario Title:** HTTP 401 + refresh token hết hạn → toast + redirect đăng nhập
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 Xử lý lỗi — Session 401, AC16, CMR-07
**Test Type:** Functional
**Description:** API trả 401 + refresh token cũng hết hạn (>15 ngày) → hiển thị toast "Phiên đăng nhập hết hạn." → redirect về màn đăng nhập.
**Test Focus:** Error/Exception — Session expired

### Scenario ID: TS_UC42-44_110
**Scenario Title:** Lỗi mạng (Chi tiết) → message + nút "Thử lại"
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.2 Xử lý lỗi — Lỗi mạng, CMR-07
**Test Type:** Functional
**Description:** Tắt mạng → tap card vào chi tiết → hiển thị "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." + nút "Thử lại".
**Test Focus:** Error/Exception — Network error (Detail)

### Scenario ID: TS_UC42-44_111
**Scenario Title:** Lỗi HTTP 500 (Chi tiết) → message không có nút Thử lại
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.2 Xử lý lỗi — 500
**Test Type:** Functional
**Description:** Simulate API chi tiết trả 500 → hiển thị "Hệ thống đang bận. Vui lòng thử lại sau." — không có nút Thử lại.
**Test Focus:** Error/Exception — 500 error (Detail)

### Scenario ID: TS_UC42-44_112
**Scenario Title:** HTTP 404 (Chi tiết) — lịch hẹn không tồn tại → toast + back về Danh sách
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.2 Xử lý lỗi — 404
**Test Type:** Functional
**Description:** API chi tiết trả 404 (record bị xóa/không tồn tại) → hiển thị "Nội dung không tồn tại hoặc đã bị xóa." → app tự quay về màn Danh sách.
**Test Focus:** Error/Exception — 404 record deleted

### Scenario ID: TS_UC42-44_113
**Scenario Title:** Timeout >10s (Chi tiết) → message + nút "Thử lại"
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.2 Xử lý lỗi — Timeout, CMR-16
**Test Type:** Functional
**Description:** Simulate API chi tiết timeout >10s → hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." + nút "Thử lại"; tap "Thử lại" → gọi lại API.
**Test Focus:** Error/Exception — Timeout (Detail)

### Scenario ID: TS_UC42-44_114
**Scenario Title:** Tap "Thử lại" sau lỗi mạng + mạng đã phục hồi → load thành công
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 + 3.2 Xử lý lỗi — Nút Thử lại
**Test Type:** Integration
**Description:** Lỗi mạng → hiển thị nút "Thử lại" → bật mạng lại → tap "Thử lại" → app gọi lại API thành công, ẩn message lỗi, hiển thị dữ liệu.
**Test Focus:** Recovery — Retry after network restore

### Scenario ID: TS_UC42-44_115
**Scenario Title:** Offline khi đang có danh sách → không cache, báo lỗi ở lần refresh
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.1 (assumption Q30 — không cache)
**Test Type:** Functional
**Description:** Đang xem danh sách có data → tắt mạng → pull-to-refresh → hiển thị lỗi mạng; danh sách cũ có thể giữ hoặc xóa (theo Q30 giả định không cache, nên sẽ hiển thị lỗi toàn màn).
**Test Focus:** Error/Exception — Offline behavior (assumption-based)

---

### N. Đa ngôn ngữ (i18n)

### Scenario ID: TS_UC42-44_116
**Scenario Title:** Đổi ngôn ngữ sang Tiếng Anh → text cứng đổi sang EN, text động giữ nguyên
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 4, AC20, CMR-17
**Test Type:** Functional
**Description:** Đổi ngôn ngữ app sang English → Header, tên tab, label field, placeholder, nút, error message đổi sang EN; tên thủ tục, lĩnh vực, dịch vụ công, ghi chú (text động từ API) giữ nguyên ngôn ngữ gốc.
**Test Focus:** Business rule — i18n static vs dynamic

### Scenario ID: TS_UC42-44_117
**Scenario Title:** Đổi ngôn ngữ sang Tiếng Trung → text cứng đổi sang ZH, text động giữ nguyên
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 4, AC20, CMR-17
**Test Type:** Functional
**Description:** Đổi ngôn ngữ app sang 中文 → verify: Header ("管理..."), tab names, label, placeholder, message — đổi hết; text động giữ nguyên.
**Test Focus:** Business rule — i18n ZH

### Scenario ID: TS_UC42-44_118
**Scenario Title:** Đổi ngôn ngữ sang Tiếng Nhật → text cứng đổi sang JA, text động giữ nguyên
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 4, AC20, CMR-17
**Test Type:** Functional
**Description:** Đổi ngôn ngữ sang 日本語 → text cứng đổi; text động giữ nguyên.
**Test Focus:** Business rule — i18n JA

### Scenario ID: TS_UC42-44_119
**Scenario Title:** Đổi ngôn ngữ sang Tiếng Hàn → text cứng đổi sang KO, text động giữ nguyên
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 4, AC20, CMR-17
**Test Type:** Functional
**Description:** Đổi ngôn ngữ sang 한국어 → text cứng đổi; text động giữ nguyên.
**Test Focus:** Business rule — i18n KO

### Scenario ID: TS_UC42-44_120
**Scenario Title:** Format ngày giờ không đổi theo locale (luôn DD/MM/YYYY HH:mm GMT+7)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** CMR-12 + Section 4
**Test Type:** Functional
**Description:** Đổi ngôn ngữ từ VI → EN → JA → verify format ngày giờ vẫn là DD/MM/YYYY và HH:mm (24h GMT+7), KHÔNG đổi sang MM/DD/YYYY hay 12h AM/PM.
**Test Focus:** Business rule — Date format consistent across locales

### Scenario ID: TS_UC42-44_121
**Scenario Title:** Text cứng vượt giới hạn khi dịch dài (EN/ZH) → không vỡ UI
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 4 + General UI
**Test Type:** UI
**Description:** Ở ngôn ngữ có text dài hơn VI (ví dụ EN "Appointment Management for Dossier Submission") → UI header, tab, label không vỡ layout, không chồng chéo; truncate "..." đúng quy tắc.
**Test Focus:** UI state — i18n UI robustness

---

### O. Accessibility (A11y)

### Scenario ID: TS_UC42-44_122
**Scenario Title:** Screen reader — đọc được Header, Tab, Card, Button
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 5, AC21
**Test Type:** Acceptance
**Description:** Bật VoiceOver (iOS) hoặc TalkBack (Android) → điều hướng qua Header, Tab Bar, Card, nút Filter, nút Back → mỗi thành phần được đọc rõ ràng theo nội dung UI.
**Test Focus:** Acceptance — Screen reader support

### Scenario ID: TS_UC42-44_123
**Scenario Title:** Screen reader — đọc được toàn bộ 5 section trong Chi tiết
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 5, AC21
**Test Type:** Acceptance
**Description:** Bật screen reader → mở màn Chi tiết → vuốt/điều hướng qua 5 section → mỗi field label + giá trị đều được đọc.
**Test Focus:** Acceptance — Screen reader on detail

### Scenario ID: TS_UC42-44_124
**Scenario Title:** Touch target — Card, Tab, Button dễ tap
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 5, AC22
**Test Type:** UI
**Description:** Tap các phần tử tương tác (card, tab, filter icon, back) → vùng chạm đủ lớn theo UI design spec (ít nhất 44x44pt iOS / 48x48dp Android — dựa UI design).
**Test Focus:** UI state — Touch target size

---

### P. Entry Point Integration & Consistency

### Scenario ID: TS_UC42-44_125
**Scenario Title:** Entry point consistency — Quick Access và Sidebar navigate cùng màn
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 Truy cập chức năng (Q31 assumption)
**Test Type:** Integration
**Description:** Mở màn từ Quick Access → quan sát màn hình → quay về Home → mở từ Sidebar → 2 màn hình giống hệt (cùng layout, cùng tab default "Tất cả").
**Test Focus:** Integration — Entry point consistency

### Scenario ID: TS_UC42-44_126
**Scenario Title:** UC42-44 liệt kê trong Quick Access của UC1 (Home)
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 (Q31 assumption)
**Test Type:** Integration
**Description:** Mở màn Home (UC1) → tìm trong Quick Access section → có item "Quản lý đặt lịch" với icon thích hợp.
**Test Focus:** Integration — Quick Access listing

### Scenario ID: TS_UC42-44_127
**Scenario Title:** UC42-44 liệt kê trong Sidebar
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 (Q31 assumption)
**Test Type:** Integration
**Description:** Mở Sidebar (hamburger menu) → có item "Quản lý đặt lịch"; tap → mở đúng màn UC42-44.
**Test Focus:** Integration — Sidebar listing

---

### Q. Acceptance Criteria Verification (AC1 — AC22)

### Scenario ID: TS_UC42-44_128
**Scenario Title:** AC1 — 6 tab trạng thái cố định đúng thứ tự + tab default "Tất cả"
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.3 AC1
**Test Type:** Acceptance
**Description:** Given mở màn Quản lý đặt lịch, When load xong, Then hiển thị đủ 6 tab theo thứ tự: Tất cả → Chờ xác nhận → Đã xác nhận → Đã hủy → Đã bỏ lượt → Đã hoàn thành; tab default = "Tất cả" active.
**Test Focus:** Acceptance — AC1

### Scenario ID: TS_UC42-44_129
**Scenario Title:** AC2 — Giữ tab, scroll, search, filter khi quay lại từ chi tiết
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.3 AC2
**Test Type:** Acceptance
**Description:** Given đang ở danh sách với tab + scroll + search + filter, When tap card → chi tiết → back, Then state được giữ nguyên 100%.
**Test Focus:** Acceptance — AC2

### Scenario ID: TS_UC42-44_130
**Scenario Title:** AC6 — Badge hiển thị đúng màu follow theo UI design
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.3 AC6
**Test Type:** Acceptance
**Description:** Given lịch hẹn trạng thái X, When hiển thị badge, Then màu sắc follow theo UI design cho trạng thái X.
**Test Focus:** Acceptance — AC6

### Scenario ID: TS_UC42-44_131
**Scenario Title:** AC22 — Contrast / font-size / touch target khớp UI design spec
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 3.3 AC22
**Test Type:** Acceptance
**Description:** Given UI design có spec cụ thể, When đo contrast ratio, font-size, touch target trên app thực tế, Then khớp UI design.
**Test Focus:** Acceptance — AC22

---

## ⚠️ Out-of-Scope Flags

| Scenario Area | Reason | Recommended Action |
|---------------|--------|--------------------|
| API endpoint testing (request/response payload, status code backend logic) | NFR: API thuộc provider bên thứ ba (`project-context.md` mục 4.1) | Chuyển cho team provider API. Mobile chỉ test hành vi client khi nhận response. |
| API Performance / Load / Stress test | NFR: PERFORMANCE / LOAD | Defer to performance testing specialist (backend team). |
| Security testing (authentication server-side, token signing, SSL cert validation) | NFR: SECURITY server-side | Defer to security testing specialist. Mobile chỉ test client-side flow (401 handling, session expiry UX). |
| Push notification deep-link (Q17) | Integration thuộc scope UC258-259 | Defer to UC258-259 test design. |
| Badge color exact mapping (Q2) | Design chưa chốt | Khi viết test case, ghi expected result = "follow theo UI design"; không cần mapping chi tiết từng trạng thái. |
| Copy-to-clipboard (Q20) | Giả định không hỗ trợ — chưa có spec | Nếu sau này BA confirm có hỗ trợ → bổ sung scenario. |
| Auto polling / periodic refresh (Q18) | Giả định không có; chỉ pull-to-refresh | Nếu có → bổ sung scenario. |
| Device compatibility matrix (iOS/Android min version) (Q29) | Project-level spec, chưa nêu trong UC | Cần tham chiếu project-level test matrix. |
| Offline cache data (Q30) | Giả định không cache | Nếu BA confirm có cache → bổ sung scenario cache hit/miss. |
| Tab bar horizontal scroll visual indicator (Q22) | UX minor, phụ thuộc UI design | Verify thủ công khi có UI design. |
| Tab inactive state color/font (Q24) | UX minor, phụ thuộc UI design | Verify thủ công khi có UI design. |
| CMR-03 "tap và giữ" option dài (Q27) | UX minor, cần rõ gesture | Clarify với BA/UI trước test case. |

---

## Change Log

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| v1 | 2026-05-08 | qc-scenario-design-MOBILE | First draft. 11 scenarios (chưa đầy đủ). |
| v2 | 2026-05-08 | qc-scenario-design-MOBILE | Comprehensive version. 131 scenarios cover 17 area. Áp dụng bắt buộc EP/BVA/Decision Table theo skill requirements. Bổ sung Out-of-Scope Flags. |
