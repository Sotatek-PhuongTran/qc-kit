# Test Scenarios — UC42-44 Quản lý đặt lịch nộp hồ sơ (Mobile)

**Ngày tạo:** 2026-05-08
**Phiên bản:** v1
**Agent:** qc-scenario-design-MOBILE
**Input:**
- `docs/BA/SRS-mobile/UC42-44_QuanLyDatLich/UC42-44_QuanLyDatLich.md` (v2, 07/05/2026)
- `docs/QC-MOBILE/review-doc/UC42-44_QuanLyDatLich/UC42-44_quan-ly-dat-lich_audited_20260508_v2.md` (Verdict: CONDITIONALLY READY — 85.5/100)
- `docs/BA/SRS-mobile/Common rule/CMR_Mobile.md` (v1.1)
- Mockup images: UC 42-44_ Tab List.png, UC 42_ Danh sách..., UC42-filter.png, UC42-44. Chi tiết lịch hẹn.png

**Phạm vi test:** Mobile Client (UI, navigation, client-side business logic, client-side validation, app behavior khi API response). **KHÔNG test API endpoint / backend logic** (theo `project-context.md` mục 4.1).

**Giả định áp dụng (từ audit v2):**
1. Badge color: verify theo CMR-05 nguyên tắc chung (Xanh/Vàng/Đỏ/Xám). Mapping cụ thể từng status chờ BA/UI confirm.
2. Physical Back button (Android): giả định đóng Bottom Sheet nếu đang mở; quay về màn trước nếu ở chi tiết.
3. Push notification deep-link: defer sang UC258-259.
4. Auto polling: giả định không auto polling, chỉ pull-to-refresh.
5. Copy-to-clipboard: giả định không hỗ trợ.

---

## UC42-44 — Quản lý đặt lịch nộp hồ sơ trên Mobile

### A. Truy cập & Điều hướng (Navigation & Entry Point)

### Scenario ID: TS_UC42-44_001
**Scenario Title:** Truy cập màn hình Quản lý đặt lịch từ Quick Access trên Trang chủ
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 — Truy cập chức năng
**Test Type:** End-to-End
**Description:** Người dùng đã đăng nhập (Cá nhân/Tổ chức) tap vào Quick Access "Quản lý đặt lịch" trên màn hình Trang chủ → mở màn hình danh sách lịch hẹn với Tab "Tất cả" mặc định.
**Test Focus:** Happy path — Entry point flow

### Scenario ID: TS_UC42-44_002
**Scenario Title:** Truy cập màn hình Quản lý đặt lịch từ Sidebar
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 — Truy cập chức năng
**Test Type:** End-to-End
**Description:** Người dùng đã đăng nhập mở Sidebar → tap item "Quản lý đặt lịch" → mở màn hình danh sách lịch hẹn đúng và giống hệt như entry từ Quick Access.
**Test Focus:** Alternative flow — Entry point consistency

### Scenario ID: TS_UC42-44_003
**Scenario Title:** Tap nút Back (←) trên Header màn hình Danh sách → quay về màn hình trước đó
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 — Khung Header, CMR-06
**Test Type:** UI
**Description:** Từ màn hình Danh sách lịch hẹn, người dùng tap nút Back (←) → quay về màn hình trước đó (Home hoặc Sidebar trigger).
**Test Focus:** Happy path — Navigation back

### Scenario ID: TS_UC42-44_004
**Scenario Title:** Tap nút Back (←) trên Header màn hình Chi tiết → quay về Danh sách
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.2 — Khung Header, CMR-06
**Test Type:** UI
**Description:** Từ màn hình Chi tiết lịch hẹn, tap nút Back (←) → quay về màn Danh sách lịch hẹn.
**Test Focus:** Happy path — Navigation back

### Scenario ID: TS_UC42-44_005
**Scenario Title:** Physical Back button (Android) từ màn Chi tiết → quay về Danh sách
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.2 (assumption từ audit Q6)
**Test Type:** UI
**Description:** Trên thiết bị Android, từ màn hình Chi tiết lịch hẹn, người dùng nhấn Physical Back button → quay về màn Danh sách lịch hẹn (giả định tương tự Back icon).
**Test Focus:** UI state — Android-specific behavior (dựa trên assumption)

### Scenario ID: TS_UC42-44_006
**Scenario Title:** Physical Back button (Android) khi Bottom Sheet Filter đang mở → đóng Bottom Sheet, không thoát màn
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 (assumption từ audit Q6)
**Test Type:** UI
**Description:** Khi Bottom Sheet Filter đang mở, người dùng nhấn Physical Back button Android → đóng Bottom Sheet, không làm thay đổi kết quả, không thoát màn Danh sách.
**Test Focus:** UI state — Android-specific behavior

---

### B. Phân quyền (Role-based Access)

### Scenario ID: TS_UC42-44_007
**Scenario Title:** Guest (chưa đăng nhập) cố gắng truy cập Quản lý đặt lịch
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 — Phân quyền
**Test Type:** Functional
**Description:** Người dùng chưa đăng nhập tap Quick Access hoặc Sidebar "Quản lý đặt lịch" → hệ thống điều hướng đến màn hình đăng nhập (hoặc ẩn entry point nếu theo spec phân quyền client-side).
**Test Focus:** Permission/Role — Unauthorized access

### Scenario ID: TS_UC42-44_008
**Scenario Title:** Tài khoản Cá nhân đăng nhập → xem được danh sách lịch hẹn
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 — Phân quyền
**Test Type:** Functional
**Description:** Tài khoản Cá nhân đã đăng nhập truy cập màn hình → hiển thị danh sách lịch hẹn của cá nhân đó; Mã định danh trong Chi tiết hiển thị dạng CCCD/CMND.
**Test Focus:** Permission/Role — Individual user

### Scenario ID: TS_UC42-44_009
**Scenario Title:** Tài khoản Tổ chức đăng nhập → xem được danh sách lịch hẹn
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 1 — Phân quyền
**Test Type:** Functional
**Description:** Tài khoản Tổ chức đã đăng nhập truy cập màn hình → hiển thị danh sách lịch hẹn của tổ chức; Mã định danh trong Chi tiết hiển thị dạng Mã doanh nghiệp.
**Test Focus:** Permission/Role — Organization user

---

### C. Tabs Trạng thái (6 Tabs Fixed)

### Scenario ID: TS_UC42-44_010
**Scenario Title:** Hiển thị đủ 6 tab cố định theo đúng thứ tự
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1 — Khung Tabs Trạng thái, AC1
**Test Type:** UI
**Description:** Mở màn hình Quản lý đặt lịch → hiển thị đủ 6 tab: Tất cả, Chờ xác nhận, Đã xác nhận, Đã hủy, Đã bỏ lượt, Đã hoàn thành — đúng thứ tự cố định, không thể thay đổi hoặc ẩn.
**Test Focus:** UI state — Tab bar rendering

### Scenario ID: TS_UC42-44_011
**Scenario Title:** Tab mặc định khi mở màn hình là "Tất cả"
**UC Reference:** UC42-44 — Quản lý đặt lịch nộp hồ sơ
**Req-ID:** Section 2.1, AC1
**Test Type:** UI
**Description:** Lần đầu mở màn hình → tab "Tất cả" được active (text đỏ + underline đỏ); danh sách hiển thị lịch hẹn của tất cả trạng thái.
**Test Focus:** Happy path — Default state
