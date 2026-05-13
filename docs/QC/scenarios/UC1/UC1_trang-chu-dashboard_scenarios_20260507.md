# Test Scenarios — UC1 Màn hình Trang chủ (Dashboard) Mobile

**Ngày tạo:** 07/05/2026
**Người thiết kế:** QC Agent
**Phiên bản:** v1
**Nguồn:** UC1_TrangChuDashboard.md (v4), UC1_trang-chu-dashboard_audited_20260507_v2.md

---

## UC1 — Màn hình Trang chủ (Dashboard) Mobile

---

### TS_UC1_001

**Scenario Title:** Hiển thị Trang chủ thành công sau đăng nhập
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-001 (Main Flow Step 1-7)
**Test Type:** Functional
**Description:** Xác minh rằng sau khi đăng nhập thành công, hệ thống tự động điều hướng về Trang chủ và hiển thị đầy đủ tất cả các thành phần: Header, Card thông tin, Quick Access, Tin tức, Chatbot, Footer.
**Test Focus:** Happy path

---

### TS_UC1_002

**Scenario Title:** Header hiển thị đầy đủ 5 components
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-001 (Khung Header)
**Test Type:** UI
**Description:** Xác minh Header hiển thị đúng thứ tự từ trái sang phải: Hamburger (☰), Logo + "Cổng Đầu Tư", Icon Ngôn ngữ (VI), Icon Thông báo (🔔), Icon Người dùng.
**Test Focus:** UI State

---

### TS_UC1_003

**Scenario Title:** Card thông tin người dùng hiển thị đúng dữ liệu
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-002 (Khung Card Thông tin)
**Test Type:** Functional
**Description:** Xác minh Card thông tin hiển thị Avatar (icon mặc định hệ thống), Tên đầy đủ, và Vai trò đúng theo dữ liệu API trả về.
**Test Focus:** Happy path

---

### TS_UC1_004

**Scenario Title:** Tên đầy đủ quá dài — truncate 1 dòng
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-002 (Card — Tên đầy đủ)
**Test Type:** UI
**Description:** Xác minh khi tên người dùng vượt quá giới hạn hiển thị 1 dòng, hệ thống cắt bớt và hiển thị dấu "..." ở cuối (truncate).
**Test Focus:** Boundary

---

### TS_UC1_005

**Scenario Title:** Vai trò hiển thị đúng cho Nhà đầu tư Việt Nam
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-002 (Card — Vai trò)
**Test Type:** Functional
**Description:** Xác minh vai trò hiển thị text "Nhà đầu tư Việt Nam" cho user có role tương ứng.
**Test Focus:** Happy path

---

### TS_UC1_006

**Scenario Title:** Vai trò hiển thị đúng cho Nhà đầu tư nước ngoài
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-002 (Card — Vai trò)
**Test Type:** Functional
**Description:** Xác minh vai trò hiển thị text "Nhà đầu tư nước ngoài" cho user có role tương ứng.
**Test Focus:** Alternative flow

---

### TS_UC1_007

**Scenario Title:** Vai trò hiển thị đúng cho Tổ chức/Doanh nghiệp
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-002 (Card — Vai trò)
**Test Type:** Functional
**Description:** Xác minh vai trò hiển thị text "Tổ chức/Doanh nghiệp" cho user có role tương ứng.
**Test Focus:** Alternative flow

---

### TS_UC1_008

**Scenario Title:** Quick Access hiển thị đủ 6 mục cố định
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-003 (Khung Quick Access)
**Test Type:** UI
**Description:** Xác minh Quick Access hiển thị đúng 6 mục: Hướng dẫn sử dụng, Quản lý hồ sơ, Quản lý đặt lịch, Khu công nghiệp/KKT, Câu hỏi (FAQ), Văn bản pháp luật. Thứ tự cố định, không tùy chỉnh.
**Test Focus:** UI State

---

### TS_UC1_009

**Scenario Title:** Quick Access — Tap "Hướng dẫn sử dụng" điều hướng đến UC-75
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-QA-001
**Test Type:** Integration
**Description:** Xác minh tap vào card "Hướng dẫn sử dụng" điều hướng đúng đến màn hình UC-75.
**Test Focus:** Happy path

---

### TS_UC1_010

**Scenario Title:** Quick Access — Tap "Quản lý hồ sơ" điều hướng đến UC45
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-QA-002
**Test Type:** Integration
**Description:** Xác minh tap vào card "Quản lý hồ sơ" điều hướng đúng đến màn hình UC45.
**Test Focus:** Happy path

---

### TS_UC1_011

**Scenario Title:** Quick Access — Tap "Quản lý đặt lịch" điều hướng đến UC42
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-QA-003
**Test Type:** Integration
**Description:** Xác minh tap vào card "Quản lý đặt lịch" điều hướng đúng đến màn hình UC42.
**Test Focus:** Happy path

---

### TS_UC1_012

**Scenario Title:** Quick Access — Tap "Khu công nghiệp / KKT" điều hướng đến UC2
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-QA-004
**Test Type:** Integration
**Description:** Xác minh tap vào card "Khu công nghiệp / KKT" điều hướng đúng đến màn hình UC2.
**Test Focus:** Happy path

---

### TS_UC1_013

**Scenario Title:** Quick Access — Tap "Câu hỏi (FAQ)" điều hướng đến UC76
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-QA-005
**Test Type:** Integration
**Description:** Xác minh tap vào card "Câu hỏi (FAQ)" điều hướng đúng đến màn hình UC76.
**Test Focus:** Happy path

---

### TS_UC1_014

**Scenario Title:** Quick Access — Tap "Văn bản pháp luật" điều hướng đến UC69
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-QA-006
**Test Type:** Integration
**Description:** Xác minh tap vào card "Văn bản pháp luật" điều hướng đúng đến màn hình UC69.
**Test Focus:** Happy path

---

### TS_UC1_015

**Scenario Title:** Tin tức hiển thị tối đa 5 bài mới nhất
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-BR-001 (Tin tức tối đa 5 bài, giảm dần)
**Test Type:** Functional
**Description:** Xác minh danh sách tin tức hiển thị tối đa 5 bài, sắp xếp theo thời gian đăng giảm dần (mới nhất hiển thị trước).
**Test Focus:** Happy path

---

### TS_UC1_016

**Scenario Title:** Tin tức — Cuộn ngang (horizontal scroll) xem thêm tin
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-004 (Danh sách tin tức)
**Test Type:** UI
**Description:** Xác minh danh sách tin tức hỗ trợ cuộn ngang (swipe left/right) để xem thêm các tin trong danh sách.
**Test Focus:** UI State

---

### TS_UC1_017

**Scenario Title:** Tin tức — Mỗi card hiển thị đủ thông tin
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-004 (Card tin tức)
**Test Type:** UI
**Description:** Xác minh mỗi card tin tức hiển thị đầy đủ: ảnh đại diện (thumbnail bo góc), nhãn phân loại (category tag), ngày đăng (DD/MM/YYYY), tiêu đề bài viết (tối đa 2 dòng).
**Test Focus:** UI State

---

### TS_UC1_018

**Scenario Title:** Tin tức — Category tag hiển thị đúng màu sắc
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-004 (Nhãn phân loại)
**Test Type:** UI
**Description:** Xác minh nhãn phân loại hiển thị đúng màu: Đỏ cho "Chính sách", Xanh cho "Tin đầu tư", Cam cho "Thành công".
**Test Focus:** UI State

---

### TS_UC1_019

**Scenario Title:** Tin tức — Tiêu đề bài viết quá dài truncate 2 dòng
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-004 (Tiêu đề bài viết)
**Test Type:** UI
**Description:** Xác minh khi tiêu đề bài viết vượt quá 2 dòng, hệ thống cắt bớt và hiển thị dấu "..." (truncate).
**Test Focus:** Boundary

---

### TS_UC1_020

**Scenario Title:** Tin tức rỗng — Hiển thị Empty State
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-ALT-001, CMR-14
**Test Type:** Functional
**Description:** Xác minh khi không có tin tức nào từ API, hệ thống hiển thị trạng thái rỗng với text "Không có dữ liệu." theo CMR-14.
**Test Focus:** Alternative flow

---

### TS_UC1_021

**Scenario Title:** Tin tức — Tap card điều hướng đến chi tiết bài viết (UC55-68)
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-NEWS-001
**Test Type:** Integration
**Description:** Xác minh tap vào card tin tức điều hướng đến màn hình chi tiết bài viết (UC55-68).
**Test Focus:** Happy path

---

### TS_UC1_022

**Scenario Title:** Tin tức — Tap "Xem tất cả" điều hướng đến danh sách tin tức (UC55-68)
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-NEWS-002
**Test Type:** Integration
**Description:** Xác minh tap nút "Xem tất cả" (chữ đỏ, bên phải tiêu đề section) điều hướng đến màn hình danh sách Tin tức đầy đủ (UC55-68).
**Test Focus:** Happy path

---

### TS_UC1_023

**Scenario Title:** Tin tức — Số lượng tin ít hơn 5
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-BR-001
**Test Type:** Functional
**Description:** Xác minh khi API trả về ít hơn 5 tin (ví dụ: 2 tin), hệ thống hiển thị đúng số lượng tin có sẵn mà không hiển thị placeholder hay lỗi.
**Test Focus:** Boundary

---

### TS_UC1_024

**Scenario Title:** Footer hiển thị 4 tab đúng thứ tự
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-005 (Khung Footer)
**Test Type:** UI
**Description:** Xác minh Footer hiển thị 4 tab đúng thứ tự: Trang chủ (trái), Thủ tục, KCN/KKT, Cài đặt (phải). Tab Trang chủ ở trạng thái Active (icon + text đỏ).
**Test Focus:** UI State

---

### TS_UC1_025

**Scenario Title:** Footer — Tab Trang chủ active khi đang ở Trang chủ
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-005 (Tab Trang chủ)
**Test Type:** UI
**Description:** Xác minh khi đang ở Trang chủ, tab "Trang chủ" hiển thị trạng thái Active (cả icon và text có màu đỏ), các tab còn lại ở trạng thái Inactive.
**Test Focus:** UI State

---

### TS_UC1_026

**Scenario Title:** Footer — Tap tab Trang chủ refresh dữ liệu
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-FOOTER-001
**Test Type:** Functional
**Description:** Xác minh tap vào tab Trang chủ khi đang ở Trang chủ sẽ refresh (tải lại từ đầu) toàn bộ dữ liệu trên màn hình.
**Test Focus:** Happy path

---

### TS_UC1_027

**Scenario Title:** Footer — Tap tab Thủ tục điều hướng đến UC69/UC73
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-FOOTER-002
**Test Type:** Integration
**Description:** Xác minh tap tab "Thủ tục" điều hướng đến màn hình Tra cứu Văn bản & Thủ tục hành chính (UC69, UC73) và refresh dữ liệu.
**Test Focus:** Happy path

---

### TS_UC1_028

**Scenario Title:** Footer — Tap tab KCN/KKT điều hướng đến UC2
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-FOOTER-003
**Test Type:** Integration
**Description:** Xác minh tap tab "KCN/KKT" điều hướng đến màn hình Tra cứu KCN/KKT (UC2) và refresh dữ liệu.
**Test Focus:** Happy path

---

### TS_UC1_029

**Scenario Title:** Footer — Tap tab Cài đặt điều hướng đến UC249
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-FOOTER-004
**Test Type:** Integration
**Description:** Xác minh tap tab "Cài đặt" điều hướng đến màn hình Cấu hình tài khoản (UC249) và refresh dữ liệu.
**Test Focus:** Happy path

---

### TS_UC1_030

**Scenario Title:** Icon Thông báo — Red dot hiển thị khi có thông báo chưa đọc
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-NOTI-001
**Test Type:** Functional
**Description:** Xác minh icon Thông báo (🔔) hiển thị red dot (chấm đỏ, không kèm số) khi có thông báo chưa đọc.
**Test Focus:** Happy path

---

### TS_UC1_031

**Scenario Title:** Icon Thông báo — Không hiển thị red dot khi không có thông báo chưa đọc
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-NOTI-002
**Test Type:** Functional
**Description:** Xác minh icon Thông báo (🔔) không hiển thị red dot khi tất cả thông báo đã được đọc.
**Test Focus:** Alternative flow

---

### TS_UC1_032

**Scenario Title:** Icon Thông báo — Polling 30s cập nhật red dot realtime
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-BR-003
**Test Type:** Functional
**Description:** Xác minh red dot được cập nhật qua cơ chế polling 30 giây/lần. Khi có thông báo mới phát sinh trong khi user đang ở Trang chủ, red dot hiển thị ngay lập tức mà không cần rời đi và quay lại.
**Test Focus:** Happy path

---

### TS_UC1_033

**Scenario Title:** Icon Thông báo — Tap điều hướng đến UC258/UC259
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-NOTI-003
**Test Type:** Integration
**Description:** Xác minh tap vào icon Thông báo (🔔) điều hướng đến màn hình Thông báo (UC258/UC259).
**Test Focus:** Happy path

---

### TS_UC1_034

**Scenario Title:** Icon Người dùng — Tap điều hướng đến UC249
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-USER-001
**Test Type:** Integration
**Description:** Xác minh tap vào icon Người dùng (góc phải header) điều hướng đến màn hình Cấu hình tài khoản (UC249).
**Test Focus:** Happy path

---

### TS_UC1_035

**Scenario Title:** Sidebar — Mở bằng tap Hamburger
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-SIDEBAR-001
**Test Type:** Functional
**Description:** Xác minh tap nút Hamburger (☰) mở Sidebar Navigation từ bên trái màn hình, hiển thị đầy đủ 10 mục menu.
**Test Focus:** Happy path

---

### TS_UC1_036

**Scenario Title:** Sidebar — Hiển thị đủ 10 mục menu
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-SIDEBAR-002
**Test Type:** UI
**Description:** Xác minh Sidebar hiển thị đúng 10 mục: Trang chủ, Giới thiệu, Lĩnh vực đầu tư, Khu vực đầu tư, Liên hệ, Thủ tục hành chính, Quản lý hồ sơ, Quản lý đặt lịch, Phản ánh kiến nghị, Cấu hình tài khoản.
**Test Focus:** UI State

---

### TS_UC1_037

**Scenario Title:** Sidebar — Tap item điều hướng và đóng Sidebar
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-SIDEBAR-003
**Test Type:** Functional
**Description:** Xác minh tap vào một item trong Sidebar sẽ đóng Sidebar và điều hướng đến màn hình tương ứng.
**Test Focus:** Happy path

---

### TS_UC1_038

**Scenario Title:** Sidebar — Đóng bằng tap vùng mờ bên ngoài
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-ALT-SIDEBAR-001
**Test Type:** Functional
**Description:** Xác minh tap vào vùng mờ bên ngoài Sidebar sẽ đóng Sidebar mà không điều hướng đến bất kỳ màn hình nào.
**Test Focus:** Alternative flow

---

### TS_UC1_039

**Scenario Title:** Chuyển ngôn ngữ — Mở popup chọn ngôn ngữ
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-LANG-001
**Test Type:** Functional
**Description:** Xác minh tap icon ngôn ngữ mở popup "Chọn ngôn ngữ" hiển thị danh sách 5 ngôn ngữ: Tiếng Việt, English, 中文, 日本語, 한국어. Ngôn ngữ đang chọn được đánh dấu check đỏ.
**Test Focus:** Happy path

---

### TS_UC1_040

**Scenario Title:** Chuyển ngôn ngữ — Chọn ngôn ngữ khác áp dụng toàn hệ thống
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-LANG-002, UC1-BR-004
**Test Type:** Functional
**Description:** Xác minh tap vào ngôn ngữ khác (ví dụ: EN) sẽ áp dụng ngôn ngữ cho toàn hệ thống, cập nhật mã trên Header, tải lại Tin tức theo ngôn ngữ mới (không dùng cache), và đóng popup.
**Test Focus:** Happy path

---

### TS_UC1_041

**Scenario Title:** Chuyển ngôn ngữ — Chọn ngôn ngữ hiện tại không thay đổi
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-ALT-LANG-001
**Test Type:** Functional
**Description:** Xác minh tap vào ngôn ngữ hiện tại (đang active) sẽ đóng popup mà không thay đổi ngôn ngữ hệ thống.
**Test Focus:** Alternative flow

---

### TS_UC1_042

**Scenario Title:** Chuyển ngôn ngữ — Persistence sau khi đóng app
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-BR-004
**Test Type:** Functional
**Description:** Xác minh ngôn ngữ được lưu vào server/user profile và không bị reset khi đóng và mở lại ứng dụng.
**Test Focus:** Happy path

---

### TS_UC1_043

**Scenario Title:** Chuyển ngôn ngữ — Tin tức tải lại không dùng cache
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-LANG-003
**Test Type:** Functional
**Description:** Xác minh khi chuyển ngôn ngữ, dữ liệu Tin tức được tải lại từ API theo ngôn ngữ mới, không sử dụng cache của ngôn ngữ cũ.
**Test Focus:** Happy path

---

### TS_UC1_044

**Scenario Title:** Chuyển ngôn ngữ — Chuyển sang tiếng Nhật (JA)
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-LANG-002
**Test Type:** Functional
**Description:** Xác minh chuyển sang tiếng Nhật (JA) áp dụng thành công, mã header cập nhật thành "JA", tin tức hiển thị nội dung tiếng Nhật.
**Test Focus:** Alternative flow

---

### TS_UC1_045

**Scenario Title:** Chuyển ngôn ngữ — Chuyển sang tiếng Hàn (KO)
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-LANG-002
**Test Type:** Functional
**Description:** Xác minh chuyển sang tiếng Hàn (KO) áp dụng thành công, mã header cập nhật thành "KO", tin tức hiển thị nội dung tiếng Hàn.
**Test Focus:** Alternative flow

---

### TS_UC1_046

**Scenario Title:** Chuyển ngôn ngữ — Chuyển sang tiếng Trung (ZH)
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-LANG-002
**Test Type:** Functional
**Description:** Xác minh chuyển sang tiếng Trung (ZH) áp dụng thành công, mã header cập nhật thành "ZH", tin tức hiển thị nội dung tiếng Trung.
**Test Focus:** Alternative flow

---

### TS_UC1_047

**Scenario Title:** Chatbot — Hiển thị floating ở góc dưới phải
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-006 (Floating Widget)
**Test Type:** UI
**Description:** Xác minh icon Chatbot hiển thị nổi ở góc dưới bên phải màn hình (ngay trên Footer), nằm đè lên các nội dung khác.
**Test Focus:** UI State

---

### TS_UC1_048

**Scenario Title:** Chatbot — Tap mở màn hình Chatbot (UC60)
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-CHATBOT-001
**Test Type:** Integration
**Description:** Xác minh tap vào icon Chatbot điều hướng đến màn hình Chatbot (UC60).
**Test Focus:** Happy path

---

### TS_UC1_049

**Scenario Title:** Chatbot — Drag & Drop di chuyển vị trí
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-CHATBOT-002
**Test Type:** Functional
**Description:** Xác minh người dùng có thể chạm giữ và kéo thả (drag & drop) icon Chatbot đến vị trí khác trên màn hình.
**Test Focus:** Happy path

---

### TS_UC1_050

**Scenario Title:** Chatbot — Reset vị trí khi quay lại Trang chủ
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-BR-005
**Test Type:** Functional
**Description:** Xác minh khi người dùng rời khỏi Trang chủ và quay lại, icon Chatbot tự động trở về vị trí mặc định ban đầu (góc dưới phải). Vị trí không được lưu vào server.
**Test Focus:** Happy path

---

### TS_UC1_051

**Scenario Title:** Loading state — Skeleton loading cho Card thông tin
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-LOADING-001, CMR-07
**Test Type:** UI
**Description:** Xác minh trong khi chờ API phản hồi, hệ thống hiển thị loading indicator (spinner/skeleton) trên Card thông tin người dùng.
**Test Focus:** UI State

---

### TS_UC1_052

**Scenario Title:** Loading state — Skeleton loading cho Tin tức
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-LOADING-002, CMR-07
**Test Type:** UI
**Description:** Xác minh trong khi chờ API tin tức phản hồi, hệ thống hiển thị skeleton loading trên vùng Tin tức.
**Test Focus:** UI State

---

### TS_UC1_053

**Scenario Title:** Lỗi mạng — Hiển thị thông báo và nút Thử lại
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-ERR-001, CMR-07
**Test Type:** Functional
**Description:** Xác minh khi mất kết nối mạng, hệ thống hiển thị thông báo "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." kèm nút "Thử lại" tại section tương ứng.
**Test Focus:** Error/Exception

---

### TS_UC1_054

**Scenario Title:** Lỗi API 500 — Hiển thị thông báo hệ thống bận
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-ERR-002, CMR-07
**Test Type:** Functional
**Description:** Xác minh khi API trả về HTTP 500, hệ thống hiển thị thông báo "Hệ thống đang bận. Vui lòng thử lại sau." tại section tương ứng.
**Test Focus:** Error/Exception

---

### TS_UC1_055

**Scenario Title:** Timeout > 10 giây — Hiển thị thông báo và nút Thử lại
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-ERR-003, CMR-16
**Test Type:** Functional
**Description:** Xác minh khi API không phản hồi quá 10 giây, hệ thống hiển thị thông báo "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." kèm nút "Thử lại" (CMR-16).
**Test Focus:** Error/Exception

---

### TS_UC1_056

**Scenario Title:** Timeout boundary — API phản hồi đúng 10 giây
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-ERR-003, CMR-16
**Test Type:** Functional
**Description:** Xác minh khi API phản hồi đúng tại mốc 10 giây (boundary), hệ thống vẫn hiển thị dữ liệu thành công (không trigger timeout).
**Test Focus:** Boundary

---

### TS_UC1_057

**Scenario Title:** Timeout boundary — API phản hồi sau 10.1 giây
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-ERR-003, CMR-16
**Test Type:** Functional
**Description:** Xác minh khi API phản hồi sau 10.1 giây (vượt boundary), hệ thống trigger timeout và hiển thị thông báo lỗi.
**Test Focus:** Boundary

---

### TS_UC1_058

**Scenario Title:** Partial API failure — API user info fails, API tin tức succeeds
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-ERR-004 (Xử lý lỗi độc lập từng section)
**Test Type:** Functional
**Description:** Xác minh khi API user info thất bại nhưng API tin tức thành công, chỉ section Card thông tin hiển thị lỗi theo CMR-07, section Tin tức vẫn hiển thị bình thường.
**Test Focus:** Error/Exception

---

### TS_UC1_059

**Scenario Title:** Partial API failure — API tin tức fails, API user info succeeds
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-ERR-004 (Xử lý lỗi độc lập từng section)
**Test Type:** Functional
**Description:** Xác minh khi API tin tức thất bại nhưng API user info thành công, chỉ section Tin tức hiển thị lỗi/empty state, section Card thông tin vẫn hiển thị bình thường.
**Test Focus:** Error/Exception

---

### TS_UC1_060

**Scenario Title:** Partial API failure — Tất cả API fails
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-ERR-004 (Xử lý lỗi độc lập từng section)
**Test Type:** Functional
**Description:** Xác minh khi tất cả API đều thất bại, mỗi section hiển thị thông báo lỗi riêng theo CMR-07, Quick Access vẫn hiển thị (cố định, không phụ thuộc API).
**Test Focus:** Error/Exception

---

### TS_UC1_061

**Scenario Title:** Pull to Refresh — Kéo xuống refresh thành công
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-PTR-001, CMR-13
**Test Type:** Functional
**Description:** Xác minh kéo xuống từ đầu màn hình trigger refresh dữ liệu, hiển thị spinner ở đầu danh sách, sau khi thành công cập nhật dữ liệu và ẩn spinner.
**Test Focus:** Happy path

---

### TS_UC1_062

**Scenario Title:** Pull to Refresh — Refresh thất bại giữ dữ liệu cũ
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-PTR-002, CMR-13
**Test Type:** Functional
**Description:** Xác minh khi Pull to Refresh thất bại (mất mạng), hệ thống giữ nguyên dữ liệu cũ trên màn hình và hiển thị thông báo lỗi theo CMR-07.
**Test Focus:** Error/Exception

---

### TS_UC1_063

**Scenario Title:** Pull to Refresh — Không trigger duplicate API khi đang loading
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-PTR-003, CMR-13
**Test Type:** Functional
**Description:** Xác minh khi đang loading (pull to refresh hoặc lazy load), kéo xuống lần nữa không trigger lại API tương tự (prevent duplicate).
**Test Focus:** Error/Exception

---

### TS_UC1_064

**Scenario Title:** Debounce — Double tap Quick Access không duplicate navigation
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-BR-006
**Test Type:** Functional
**Description:** Xác minh khi người dùng tap nhanh liên tục (double tap) vào card Quick Access, hệ thống chỉ điều hướng 1 lần (debounce), không push duplicate screen.
**Test Focus:** Error/Exception

---

### TS_UC1_065

**Scenario Title:** Debounce — Double tap Footer tab không duplicate navigation
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-BR-006
**Test Type:** Functional
**Description:** Xác minh khi người dùng tap nhanh liên tục vào Footer tab, hệ thống chỉ điều hướng 1 lần (debounce).
**Test Focus:** Error/Exception

---

### TS_UC1_066

**Scenario Title:** Debounce — Double tap Sidebar item không duplicate navigation
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-BR-006
**Test Type:** Functional
**Description:** Xác minh khi người dùng tap nhanh liên tục vào item trong Sidebar, hệ thống chỉ điều hướng 1 lần (debounce).
**Test Focus:** Error/Exception

---

### TS_UC1_067

**Scenario Title:** App lifecycle — Force close giữ session, quay về Trang chủ
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-BR-007
**Test Type:** Functional
**Description:** Xác minh khi người dùng force close app (tắt app không xóa dữ liệu) và mở lại, hệ thống quay về Trang chủ và giữ nguyên session đăng nhập, không yêu cầu đăng nhập lại.
**Test Focus:** Happy path

---

### TS_UC1_068

**Scenario Title:** App lifecycle — Uninstall và cài lại yêu cầu đăng nhập lại
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-BR-008
**Test Type:** Functional
**Description:** Xác minh khi người dùng xóa app (uninstall) và cài đặt lại, hệ thống yêu cầu đăng nhập lại từ đầu (không restore session).
**Test Focus:** Alternative flow

---

### TS_UC1_069

**Scenario Title:** Quay lại Trang chủ từ màn hình khác — Refresh dữ liệu
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-FOOTER-001
**Test Type:** Functional
**Description:** Xác minh khi quay lại Trang chủ từ màn hình khác (không phải từ đăng nhập), dữ liệu vẫn được refresh để đảm bảo hiển thị thông tin mới nhất.
**Test Focus:** Happy path

---

### TS_UC1_070

**Scenario Title:** Lazy Load — Cuộn đến cuối tải thêm 20 bản ghi
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-LAZY-001, CMR-04
**Test Type:** Functional
**Description:** Xác minh khi cuộn đến cuối danh sách, hệ thống tự động tải trang tiếp theo (20 bản ghi/lần) với loading indicator ở cuối danh sách.
**Test Focus:** Happy path

---

### TS_UC1_071

**Scenario Title:** Lazy Load — Hết dữ liệu không gọi API nữa
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-LAZY-002, CMR-04
**Test Type:** Functional
**Description:** Xác minh khi không còn dữ liệu để tải, hệ thống ẩn loading indicator và không gọi API nữa.
**Test Focus:** Boundary

---

### TS_UC1_072

**Scenario Title:** Nút Thử lại — Tap retry sau lỗi mạng
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-ERR-001, CMR-07
**Test Type:** Functional
**Description:** Xác minh tap nút "Thử lại" sau khi gặp lỗi mạng sẽ gọi lại API và hiển thị dữ liệu thành công nếu mạng đã khôi phục.
**Test Focus:** Error/Exception

---

### TS_UC1_073

**Scenario Title:** Nút Thử lại — Tap retry sau timeout
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-ERR-003, CMR-07
**Test Type:** Functional
**Description:** Xác minh tap nút "Thử lại" sau khi gặp timeout sẽ gọi lại API và hiển thị dữ liệu thành công nếu server đã phản hồi.
**Test Focus:** Error/Exception

---

### TS_UC1_074

**Scenario Title:** Sidebar — Hỗ trợ đa ngôn ngữ
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-FN-SIDEBAR-004
**Test Type:** Functional
**Description:** Xác minh Sidebar hiển thị menu đúng ngôn ngữ hiện tại của hệ thống (ví dụ: chuyển sang EN thì menu hiển thị tiếng Anh).
**Test Focus:** Happy path

---

### TS_UC1_075

**Scenario Title:** E2E — Đăng nhập → Trang chủ → Chuyển ngôn ngữ → Xem tin tức → Quay lại
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-E2E-001
**Test Type:** End-to-End
**Description:** Xác minh luồng hoàn chỉnh: Đăng nhập thành công → Trang chủ hiển thị đầy đủ → Chuyển ngôn ngữ sang EN → Tin tức reload tiếng Anh → Tap card tin → Xem chi tiết → Quay lại Trang chủ → Chatbot reset vị trí → Dữ liệu refresh.
**Test Focus:** Happy path

---

### TS_UC1_076

**Scenario Title:** E2E — Đăng nhập → Trang chủ → Navigation qua Quick Access → Quay lại
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-E2E-002
**Test Type:** End-to-End
**Description:** Xác minh luồng: Đăng nhập → Trang chủ → Tap Quick Access "Quản lý hồ sơ" → Điều hướng UC45 → Quay lại Trang chủ → Dữ liệu refresh → Tab Trang chủ active.
**Test Focus:** Happy path

---

### TS_UC1_077

**Scenario Title:** E2E — Đăng nhập → Trang chủ → Sidebar → Điều hướng → Quay lại
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-E2E-003
**Test Type:** End-to-End
**Description:** Xác minh luồng: Đăng nhập → Trang chủ → Mở Sidebar → Tap "Phản ánh kiến nghị" → Đóng Sidebar + điều hướng → Quay lại Trang chủ qua Footer tab.
**Test Focus:** Happy path

---

### TS_UC1_078

**Scenario Title:** E2E — Partial failure recovery: Lỗi mạng → Thử lại → Thành công
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-E2E-004
**Test Type:** End-to-End
**Description:** Xác minh luồng: Đăng nhập → Mất mạng → Trang chủ hiển thị lỗi từng section → Khôi phục mạng → Tap "Thử lại" → Dữ liệu hiển thị thành công.
**Test Focus:** Error/Exception

---

### TS_UC1_079

**Scenario Title:** Acceptance — Trang chủ hiển thị đầy đủ components cho tất cả roles
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-AC-001
**Test Type:** Acceptance
**Description:** Xác minh nội dung Trang chủ (Header, Card thông tin, Quick Access, Tin tức, Footer) luôn giống nhau giữa tất cả roles: Nhà đầu tư Việt Nam, Nhà đầu tư nước ngoài, Tổ chức/Doanh nghiệp.
**Test Focus:** Permission/Role

---

### TS_UC1_080

**Scenario Title:** Acceptance — Ngôn ngữ persist sau đóng/mở app
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-AC-002
**Test Type:** Acceptance
**Description:** Xác minh ngôn ngữ đã chọn được lưu vào server/user profile và vẫn giữ nguyên sau khi đóng và mở lại ứng dụng.
**Test Focus:** Happy path

---

### TS_UC1_081

**Scenario Title:** Acceptance — Xử lý lỗi không chặn tính năng khác
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-AC-003
**Test Type:** Acceptance
**Description:** Xác minh khi 1 section gặp lỗi API, các section khác và tính năng navigation (Quick Access, Footer, Sidebar) vẫn hoạt động bình thường.
**Test Focus:** Error/Exception

---

### TS_UC1_082

**Scenario Title:** Avatar — Luôn hiển thị icon mặc định, không lấy từ profile
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-002 (Avatar)
**Test Type:** UI
**Description:** Xác minh Avatar trên Card thông tin luôn hiển thị icon mặc định của hệ thống, không phụ thuộc vào dữ liệu tài khoản, không lấy ảnh từ profile người dùng.
**Test Focus:** UI State

---

### TS_UC1_083

**Scenario Title:** Avatar — Không tap được
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-002 (Avatar — Action)
**Test Type:** UI
**Description:** Xác minh Avatar không phản hồi khi tap (không tap được, không có action).
**Test Focus:** UI State

---

### TS_UC1_084

**Scenario Title:** Tiêu đề trang — Không tap được
**UC Reference:** UC1 — Màn hình Trang chủ
**Req-ID:** UC1-UI-001 (Tiêu đề trang)
**Test Type:** UI
**Description:** Xác minh Logo + "Cổng Đầu Tư" trên header không phản hồi khi tap (không tap được).
**Test Focus:** UI State

---

---

## ⚠️ Out-of-Scope Flags

| Scenario Area                                                 | Reason             | Recommended Action                        |
| ------------------------------------------------------------- | ------------------ | ----------------------------------------- |
| Performance testing — API response time under load           | NFR: PERFORMANCE   | Defer to performance testing specialist   |
| Security testing — Session token storage & encryption        | NFR: SECURITY      | Defer to security testing specialist      |
| Load testing — Polling mechanism under high concurrent users | NFR: LOAD          | Defer to load testing specialist          |
| Accessibility testing — Screen reader compliance, WCAG       | NFR: ACCESSIBILITY | Defer to accessibility testing specialist |

---

## ✅ Test Design Complete

| Artifact       | File                                                                       | Count                |
| -------------- | -------------------------------------------------------------------------- | -------------------- |
| Test Scenarios | docs/QC-MOBILE/scenarios/UC1/UC1_trang-chu-dashboard_scenarios_20260507.md | 84 scenarios — 1 UC |

### Coverage breakdown by test type:

- Functional: 42 scenarios
- Integration: 14 scenarios
- UI: 16 scenarios
- End-to-End: 4 scenarios
- Acceptance: 3 scenarios

### Coverage breakdown by test focus:

- Happy path: 35 scenarios
- Alternative flow: 8 scenarios
- Error/Exception: 16 scenarios
- Boundary: 5 scenarios
- UI State: 14 scenarios
- Permission/Role: 1 scenario

### Notes:

- UC ID: UC1 — lấy trực tiếp từ tài liệu yêu cầu
- Tất cả câu hỏi High priority từ audit đã được giải quyết, cho phép coverage đầy đủ
- Các câu hỏi còn mở (Q5, Q6, Q7, Q10, Q11) thuộc edge case — có thể bổ sung scenarios khi BA trả lời
- Lazy Load (CMR-04) được áp dụng cho section Tin tức theo mô tả UC
