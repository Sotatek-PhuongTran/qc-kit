# UC1 — Trang chủ Dashboard Mobile — Test Cases Draft

**Ngày tạo:** 07/05/2026
**Người thiết kế:** QC Agent
**Phiên bản:** v1
**Nguồn:** UC1_TrangChuDashboard.md (v4), UC1_trang-chu-dashboard_audited_20260507_v2.md, UC1_trang-chu-dashboard_scenarios_20260507.md

---

## Section Group: 1. Màn hình Trang chủ (Dashboard)

### Check UI/UX

#### Giai đoạn 1: Khởi tạo màn hình (Trạng thái tĩnh)

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_001 | Kiểm tra UI/UX màn hình [Trang chủ] khi có dữ liệu | Đăng nhập thành công vào ứng dụng | 1. Kiểm tra hiển thị màn hình [Trang chủ] | 1. Hiển thị đầy đủ các thành phần, màu sắc, font chữ, layout giống Design\n(Tham khảo ảnh 1. Trang chủ sheet WFDesign)\n- Header: Hamburger (☰), Logo + "Cổng Đầu Tư", Icon Ngôn ngữ "VI", Icon Thông báo (🔔), Icon Người dùng\n- Card thông tin: Avatar (icon mặc định), Tên đầy đủ, Vai trò\n- Quick Access: 6 mục cố định:\n  + Hướng dẫn sử dụng\n  + Quản lý hồ sơ\n  + Quản lý đặt lịch\n  + Khu công nghiệp / KKT\n  + Câu hỏi (FAQ)\n  + Văn bản pháp luật\n- Tin tức: Tiêu đề "Tin tức", nút "Xem tất cả" (chữ đỏ), danh sách tối đa 5 tin cuộn ngang\n- Chatbot: Icon nổi góc dưới phải\n- Footer: 4 tab (Trang chủ active đỏ, Thủ tục, KCN/KKT, Cài đặt) | |
| TC_002 | Kiểm tra UI/UX màn hình [Trang chủ] khi tin tức rỗng | Đăng nhập thành công, hệ thống không có tin tức | 1. Kiểm tra hiển thị màn hình [Trang chủ] | 1. Hiển thị đầy đủ các thành phần:\n- Header, Card thông tin, Quick Access, Chatbot, Footer: hiển thị bình thường\n- Vùng Tin tức: hiển thị "Không có dữ liệu." căn giữa vùng nội dung (CMR-14) | |
| TC_003 | Kiểm tra hiển thị Loading state khi tải dữ liệu | Đăng nhập thành công, đang chờ API phản hồi | 1. Kiểm tra hiển thị màn hình [Trang chủ] trong khi chờ API | 1. Hiển thị:\n- Card thông tin: skeleton loading/spinner\n- Tin tức: skeleton loading\n- Quick Access: hiển thị cố định (không loading)\n- Footer: hiển thị cố định | |

#### Giai đoạn 2: Tương tác thành phần

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_004 | [Card thông tin] Kiểm tra hiển thị tên đầy đủ quá dài (truncate) | Đăng nhập với tài khoản có tên dài vượt quá 1 dòng hiển thị | 1. Kiểm tra hiển thị trường Tên đầy đủ trên Card thông tin | 1. Tên hiển thị tối đa 1 dòng, phần vượt quá bị cắt và hiển thị dấu "..." ở cuối | BVA: Tên dài |
| TC_005 | [Card thông tin] Kiểm tra hiển thị vai trò "Nhà đầu tư Việt Nam" | Đăng nhập với tài khoản role Nhà đầu tư Việt Nam | 1. Kiểm tra hiển thị trường Vai trò trên Card thông tin | 1. Hiển thị text "Nhà đầu tư Việt Nam" | |
| TC_006 | [Card thông tin] Kiểm tra hiển thị vai trò "Nhà đầu tư nước ngoài" | Đăng nhập với tài khoản role Nhà đầu tư nước ngoài | 1. Kiểm tra hiển thị trường Vai trò trên Card thông tin | 1. Hiển thị text "Nhà đầu tư nước ngoài" | |
| TC_007 | [Card thông tin] Kiểm tra hiển thị vai trò "Tổ chức/Doanh nghiệp" | Đăng nhập với tài khoản role Tổ chức/Doanh nghiệp | 1. Kiểm tra hiển thị trường Vai trò trên Card thông tin | 1. Hiển thị text "Tổ chức/Doanh nghiệp" | |
| TC_008 | [Avatar] Kiểm tra Avatar luôn hiển thị icon mặc định | Đăng nhập thành công | 1. Kiểm tra hiển thị Avatar trên Card thông tin | 1. Avatar hiển thị icon mặc định hệ thống (hình tròn)\n- Không lấy ảnh từ profile người dùng\n- Không tap được | |
| TC_009 | [Tin tức] Kiểm tra hiển thị card tin tức đầy đủ thông tin | Đăng nhập thành công, có tin tức | 1. Kiểm tra hiển thị 1 card tin tức | 1. Mỗi card hiển thị đầy đủ:\n- Ảnh đại diện (thumbnail bo góc)\n- Nhãn phân loại (category tag)\n- Ngày đăng (DD/MM/YYYY)\n- Tiêu đề bài viết (tối đa 2 dòng) | |
| TC_010 | [Tin tức] Kiểm tra category tag hiển thị đúng màu sắc | Đăng nhập thành công, có tin tức các loại | 1. Kiểm tra hiển thị nhãn phân loại trên card tin tức | 1. Nhãn phân loại hiển thị đúng màu:\n- Đỏ: "Chính sách"\n- Xanh: "Tin đầu tư"\n- Cam: "Thành công" | EP: 3 partitions |
| TC_011 | [Tin tức] Kiểm tra tiêu đề bài viết quá dài (truncate 2 dòng) | Đăng nhập thành công, có tin tức với tiêu đề rất dài | 1. Kiểm tra hiển thị tiêu đề bài viết trên card tin tức | 1. Tiêu đề hiển thị tối đa 2 dòng, phần vượt quá bị cắt và hiển thị dấu "..." | BVA: Tiêu đề dài |
| TC_012 | [Icon Thông báo] Kiểm tra hiển thị red dot khi có thông báo chưa đọc | Đăng nhập thành công, có thông báo chưa đọc | 1. Kiểm tra hiển thị icon Thông báo (🔔) trên Header | 1. Icon 🔔 hiển thị red dot (chấm đỏ) ở góc phải trên\n- Không kèm số | |
| TC_013 | [Icon Thông báo] Kiểm tra không hiển thị red dot khi không có thông báo chưa đọc | Đăng nhập thành công, tất cả thông báo đã đọc | 1. Kiểm tra hiển thị icon Thông báo (🔔) trên Header | 1. Icon 🔔 hiển thị bình thường, không có red dot | |
| TC_014 | [Footer] Kiểm tra tab Trang chủ ở trạng thái Active | Đăng nhập thành công, đang ở Trang chủ | 1. Kiểm tra hiển thị Footer | 1. Tab "Trang chủ": icon + text màu đỏ (Active)\n- 3 tab còn lại: trạng thái Inactive | |

### Check Function

#### Giai đoạn 3: Kiểm thử chức năng cốt lõi

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_015 | [Nút Hamburger] Kiểm tra mở Sidebar Navigation | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào nút [Hamburger ☰] góc trái header | 1. Mở Sidebar Navigation từ bên trái màn hình.\n- Sidebar chứa toàn bộ menu điều hướng chính của ứng dụng. Danh sách menu: Trang chủ, Giới thiệu, Lĩnh vực đầu tư, Khu vực đầu tư, Liên hệ, Thủ tục hành chính, Quản lý hồ sơ, Quản lý đặt lịch, Phản ánh kiến nghị, Cấu hình tài khoản.\n- Vùng bên ngoài Sidebar hiển thị mờ | |
| TC_016 | [Sidebar] Kiểm tra tap item điều hướng đúng | Đăng nhập thành công, Sidebar đang mở | 1. Nhấp vào item "Quản lý hồ sơ" trong Sidebar | 1. Đóng Sidebar\n2. Điều hướng đến màn hình Quản lý hồ sơ (UC45) | |
| TC_017 | [Sidebar] Kiểm tra tap "Trang chủ" điều hướng đúng | Đăng nhập thành công, Sidebar đang mở, đang ở màn hình khác (không phải Trang chủ) | 1. Nhấp vào item "Trang chủ" trong Sidebar | 1. Đóng Sidebar\n2. Điều hướng về màn hình Trang chủ (UC1) | |
| TC_018 | [Sidebar] Kiểm tra tap "Quản lý đặt lịch" điều hướng đúng | Đăng nhập thành công, Sidebar đang mở | 1. Nhấp vào item "Quản lý đặt lịch" trong Sidebar | 1. Đóng Sidebar\n2. Điều hướng đến màn hình Quản lý đặt lịch (UC42) | |
| TC_019 | [Sidebar] Kiểm tra tap "Phản ánh kiến nghị" điều hướng đúng | Đăng nhập thành công, Sidebar đang mở | 1. Nhấp vào item "Phản ánh kiến nghị" trong Sidebar | 1. Đóng Sidebar\n2. Điều hướng đến màn hình Phản ánh kiến nghị | |
| TC_020 | [Sidebar] Kiểm tra tap "Cấu hình tài khoản" điều hướng đúng | Đăng nhập thành công, Sidebar đang mở | 1. Nhấp vào item "Cấu hình tài khoản" trong Sidebar | 1. Đóng Sidebar\n2. Điều hướng đến màn hình Cấu hình tài khoản (UC249) | |
| TC_021 | [Sidebar] Kiểm tra đóng bằng tap vùng mờ bên ngoài | Đăng nhập thành công, Sidebar đang mở | 1. Nhấp vào vùng mờ bên ngoài Sidebar | 1. Đóng Sidebar\n- Không điều hướng đến bất kỳ màn hình nào\n- Quay lại Trang chủ bình thường | |
| TC_018 | [Icon Ngôn ngữ] Kiểm tra mở popup chọn ngôn ngữ | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào icon Ngôn ngữ trên Header | 1. Mở popup "Chọn ngôn ngữ"\n- Hiển thị 5 ngôn ngữ: Tiếng Việt, English, 中文, 日本語, 한국어\n- Ngôn ngữ đang chọn được đánh dấu check đỏ | |
| TC_019 | [Popup Ngôn ngữ] Kiểm tra chuyển sang English (EN) | Đăng nhập thành công, popup Ngôn ngữ đang mở, ngôn ngữ hiện tại là VI | 1. Nhấp vào "English" trong popup | 1. Đóng popup\n2. Mã ngôn ngữ trên Header cập nhật thành "EN"\n3. Áp dụng ngôn ngữ cho toàn hệ thống\n4. Tin tức tải lại theo ngôn ngữ English (không dùng cache) | |
| TC_020 | [Popup Ngôn ngữ] Kiểm tra chọn ngôn ngữ hiện tại (không thay đổi) | Đăng nhập thành công, popup Ngôn ngữ đang mở, ngôn ngữ hiện tại là VI | 1. Nhấp vào "Tiếng Việt" (ngôn ngữ đang active) | 1. Đóng popup\n- Không thay đổi ngôn ngữ hệ thống\n- Mã header vẫn là "VI"\n- Tin tức không reload | |
| TC_021 | [Popup Ngôn ngữ] Kiểm tra chuyển sang tiếng Nhật (JA) | Đăng nhập thành công, popup Ngôn ngữ đang mở | 1. Nhấp vào "日本語" trong popup | 1. Đóng popup\n2. Mã ngôn ngữ trên Header cập nhật thành "JA"\n3. Tin tức tải lại theo ngôn ngữ Nhật | |
| TC_022 | [Popup Ngôn ngữ] Kiểm tra chuyển sang tiếng Hàn (KO) | Đăng nhập thành công, popup Ngôn ngữ đang mở | 1. Nhấp vào "한국어" trong popup | 1. Đóng popup\n2. Mã ngôn ngữ trên Header cập nhật thành "KO"\n3. Tin tức tải lại theo ngôn ngữ Hàn | |
| TC_023 | [Popup Ngôn ngữ] Kiểm tra chuyển sang tiếng Trung (ZH) | Đăng nhập thành công, popup Ngôn ngữ đang mở | 1. Nhấp vào "中文" trong popup | 1. Đóng popup\n2. Mã ngôn ngữ trên Header cập nhật thành "ZH"\n3. Tin tức tải lại theo ngôn ngữ Trung | |
| TC_024 | [Ngôn ngữ] Kiểm tra ngôn ngữ được lưu lại sau khi đóng và mở lại ứng dụng | Đăng nhập thành công, đã chuyển ngôn ngữ sang EN | 1. Đóng ứng dụng hoàn toàn\n2. Mở lại ứng dụng | 2. Ngôn ngữ vẫn là "EN"\n- Mã header hiển thị "EN"\n- Tin tức hiển thị tiếng Anh | |
| TC_025 | [Icon Thông báo] Kiểm tra tap điều hướng đến màn hình Thông báo | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào icon Thông báo (🔔) trên Header | 1. Điều hướng đến màn hình Thông báo | |
| TC_026 | [Icon Người dùng] Kiểm tra tap điều hướng đến màn hình Cấu hình tài khoản | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào icon Người dùng góc phải Header | 1. Điều hướng đến màn hình Cấu hình tài khoản | |
| TC_027 | [Quick Access] Kiểm tra tap "Hướng dẫn sử dụng" | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào card "Hướng dẫn sử dụng" trong Quick Access | 1. Điều hướng đến màn hình Hướng dẫn sử dụng | |
| TC_028 | [Quick Access] Kiểm tra tap "Quản lý hồ sơ" | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào card "Quản lý hồ sơ" trong Quick Access | 1. Điều hướng đến màn hình Quản lý hồ sơ | |
| TC_029 | [Quick Access] Kiểm tra tap "Quản lý đặt lịch" | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào card "Quản lý đặt lịch" trong Quick Access | 1. Điều hướng đến màn hình Quản lý đặt lịch | |
| TC_030 | [Quick Access] Kiểm tra tap "Khu công nghiệp / KKT" | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào card "Khu công nghiệp / KKT" trong Quick Access | 1. Điều hướng đến màn hình Tra cứu KCN/KKT | |
| TC_031 | [Quick Access] Kiểm tra tap "Câu hỏi (FAQ)" | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào card "Câu hỏi (FAQ)" trong Quick Access | 1. Điều hướng đến màn hình Câu hỏi thường gặp | |
| TC_032 | [Quick Access] Kiểm tra tap "Văn bản pháp luật" | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào card "Văn bản pháp luật" trong Quick Access | 1. Điều hướng đến màn hình Văn bản pháp luật | |
| TC_033 | [Tin tức] Kiểm tra tap card tin tức → chi tiết bài viết | Đăng nhập thành công, có tin tức hiển thị | 1. Nhấp vào 1 card tin tức trong danh sách | 1. Điều hướng đến màn hình chi tiết bài viết (UC55-68) | |
| TC_034 | [Nút "Xem tất cả"] Kiểm tra tap → danh sách tin tức đầy đủ | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào nút "Xem tất cả" (chữ đỏ) bên phải tiêu đề "Tin tức" | 1. Điều hướng đến màn hình danh sách Tin tức đầy đủ (UC55-68) | |
| TC_035 | [Tin tức] Kiểm tra cuộn ngang (horizontal scroll) | Đăng nhập thành công, có >= 3 tin tức | 1. Vuốt ngang (swipe left) trên danh sách tin tức | 1. Danh sách tin tức cuộn ngang, hiển thị các tin tiếp theo | |
| TC_036 | [Tin tức] Kiểm tra hiển thị tối đa 5 bài, sắp xếp giảm dần | Đăng nhập thành công, hệ thống có > 5 tin tức | 1. Kiểm tra số lượng tin tức hiển thị trên Trang chủ | 1. Hiển thị tối đa 5 tin\n- Sắp xếp theo thời gian đăng giảm dần (mới nhất trước) | |
| TC_037 | [Tin tức] Kiểm tra khi có ít hơn 5 tin | Đăng nhập thành công, hệ thống chỉ có 2 tin tức | 1. Kiểm tra hiển thị danh sách tin tức | 1. Hiển thị đúng 2 tin có sẵn\n- Không hiển thị placeholder hay lỗi cho vị trí trống | BVA: < 5 tin |
| TC_038 | [Icon Chatbot] Kiểm tra tap mở Chatbot (UC60) | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào icon Chatbot (góc dưới phải) | 1. Điều hướng đến màn hình Chatbot (UC60) | |
| TC_039 | [Icon Chatbot] Kiểm tra Drag & Drop di chuyển vị trí | Đăng nhập thành công, đang ở Trang chủ | 1. Chạm giữ icon Chatbot\n2. Kéo thả đến vị trí khác trên màn hình | 2. Icon Chatbot di chuyển đến vị trí mới\n- Không che khuất nội dung quan trọng | |
| TC_040 | [Icon Chatbot] Kiểm tra reset vị trí khi quay lại Trang chủ | Đăng nhập thành công, đã kéo Chatbot sang vị trí khác | 1. Điều hướng sang màn hình khác (ví dụ: UC45)\n2. Quay lại Trang chủ | 2. Icon Chatbot tự động trở về vị trí mặc định (góc dưới phải) | |
| TC_041 | [Footer] Kiểm tra tap tab Trang chủ refresh dữ liệu | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào tab "Trang chủ" trên Footer | 1. Dữ liệu trên màn hình được refresh (tải lại từ đầu)\n- Hiển thị loading indicator trong khi tải | |
| TC_042 | [Footer] Kiểm tra tap tab Thủ tục | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào tab "Thủ tục" trên Footer | 1. Điều hướng đến màn hình Tra cứu Văn bản & Thủ tục hành chính\n- Dữ liệu được refresh | |
| TC_043 | [Footer] Kiểm tra tap tab KCN/KKT | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào tab "KCN/KKT" trên Footer | 1. Điều hướng đến màn hình Tra cứu KCN/KKT\n- Dữ liệu được refresh | |
| TC_044 | [Footer] Kiểm tra tap tab Cài đặt | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp vào tab "Cài đặt" trên Footer | 1. Điều hướng đến màn hình Cấu hình tài khoản\n- Dữ liệu được refresh | |
| TC_045 | [Thông báo] Kiểm tra polling 30s cập nhật red dot | Đăng nhập thành công, đang ở Trang chủ, ban đầu không có thông báo chưa đọc | 1. Chờ hệ thống gửi thông báo mới\n2. Chờ tối đa 30 giây\n3. Kiểm tra icon Thông báo | 3. Red dot xuất hiện trên icon 🔔 mà không cần rời đi và quay lại | |
| TC_046 | [Pull to Refresh] Kiểm tra kéo xuống refresh thành công | Đăng nhập thành công, đang ở Trang chủ | 1. Kéo xuống từ đầu màn hình | 1. Hiển thị spinner ở đầu danh sách\n2. Dữ liệu được tải lại từ đầu\n3. Spinner ẩn sau khi refresh thành công | CMR-13 |
| TC_047 | [Pull to Refresh] Kiểm tra refresh thất bại giữ dữ liệu cũ | Đăng nhập thành công, đang ở Trang chủ, tắt mạng | 1. Kéo xuống từ đầu màn hình | 1. Hiển thị spinner\n2. Hiển thị thông báo lỗi theo CMR-07:\n- Lỗi mạng: Hiển thị thông báo "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." kèm nút "Thử lại"\n3. Giữ nguyên dữ liệu cũ trên màn hình | CMR-13 |
| TC_048 | [Pull to Refresh] Kiểm tra không duplicate API khi đang loading | Đăng nhập thành công, đang pull to refresh (spinner đang hiển thị) | 1. Kéo xuống lần nữa trong khi đang loading | 1. Không trigger lại API tương tự\n- Chỉ 1 request được gửi | CMR-13 |

#### Giai đoạn 3 (tiếp): Xử lý lỗi

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_049 | [Lỗi mạng] Kiểm tra hiển thị thông báo lỗi mạng | Đăng nhập thành công, tắt kết nối mạng | 1. Mở ứng dụng (hoặc refresh Trang chủ) | 1. Hiển thị thông báo "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." kèm nút "Thử lại" tại section tương ứng | CMR-07 |
| TC_050 | [Lỗi API 500] Kiểm tra hiển thị thông báo hệ thống bận | Đăng nhập thành công, API trả về HTTP 500 | 1. Mở Trang chủ | 1. Hiển thị thông báo "Hệ thống đang bận. Vui lòng thử lại sau." tại section tương ứng | CMR-07 |

| TC_051 | [Timeout] Kiểm tra hiển thị thông báo timeout > 10 giây | Đăng nhập thành công, API phản hồi chậm > 10 giây | 1. Mở Trang chủ\n2. Chờ quá 10 giây | 2. Hiển thị thông báo "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." kèm nút "Thử lại" | CMR-16, BVA |
| TC_052 | [Timeout BVA] Kiểm tra API phản hồi đúng 10 giây | Đăng nhập thành công, API phản hồi đúng 10 giây | 1. Mở Trang chủ\n2. API phản hồi tại mốc 10 giây | 2. Hiển thị dữ liệu thành công\n- Không trigger timeout | BVA: boundary |
| TC_053 | Kiểm tra hiển thị data ở Card thông tin user khi API user info bị failed | Đăng nhập thành công, API user info trả về lỗi, API tin tức thành công | 1. Mở Trang chủ | 1. Section Card thông tin: hiển thị thông báo lỗi theo CMR-07\n- Section Tin tức: hiển thị bình thường\n- Quick Access, Footer: hiển thị bình thường | |
| TC_054 | Kiểm tra hiển thị data ở Card tin tức khi API tin tức bị failed | Đăng nhập thành công, API tin tức trả về lỗi, API user info thành công | 1. Mở Trang chủ | 1. Section Card thông tin: hiển thị bình thường\n- Section Tin tức: hiển thị thông báo lỗi/empty state\n- Quick Access, Footer: hiển thị bình thường | |
| TC_055 | Kiểm tra hiển thị data ở Card thông tin user, card tin tức khi tất cả API fails | Đăng nhập thành công, tất cả API trả về lỗi | 1. Mở Trang chủ | 1. Mỗi section hiển thị thông báo lỗi riêng theo CMR-07\n- Quick Access vẫn hiển thị (cố định, không phụ thuộc API)\n- Footer vẫn hiển thị | |
| TC_056 | [Nút Thử lại] Kiểm tra tap retry sau lỗi mạng | Đăng nhập thành công, đang hiển thị lỗi mạng, đã bật lại mạng | 1. Nhấp vào nút "Thử lại" | 1. Gọi lại API\n2. Hiển thị loading indicator\n3. Hiển thị dữ liệu thành công | |
| TC_057 | [Nút Thử lại] Kiểm tra tap retry sau timeout | Đăng nhập thành công, đang hiển thị lỗi timeout | 1. Nhấp vào nút "Thử lại" | 1. Gọi lại API\n2. Hiển thị loading indicator\n3. Nếu server phản hồi < 10 giây → hiển thị dữ liệu thành công | |
| TC_058 | [Debounce] Kiểm tra double tap Quick Access không duplicate | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp nhanh liên tục 2 lần vào card "Quản lý hồ sơ" | 1. Chỉ điều hướng 1 lần đến UC45\n- Không push duplicate screen | |
| TC_059 | [Debounce] Kiểm tra double tap Footer tab không duplicate | Đăng nhập thành công, đang ở Trang chủ | 1. Nhấp nhanh liên tục 2 lần vào tab "Thủ tục" | 1. Chỉ điều hướng 1 lần đến UC69/UC73\n- Không push duplicate screen | |
| TC_060 | [Debounce] Kiểm tra double tap Sidebar item không duplicate | Đăng nhập thành công, Sidebar đang mở | 1. Nhấp nhanh liên tục 2 lần vào item "Phản ánh kiến nghị" | 1. Đóng Sidebar\n2. Chỉ điều hướng 1 lần\n- Không push duplicate screen | |
| TC_061 | [App lifecycle] Kiểm tra force close giữ session | Đăng nhập thành công, đang ở Trang chủ | 1. Force close ứng dụng (tắt app không xóa dữ liệu)\n2. Mở lại ứng dụng | 2. Quay về Trang chủ\n- Giữ nguyên session đăng nhập\n- Không yêu cầu đăng nhập lại | |
| TC_062 | [App lifecycle] Kiểm tra uninstall yêu cầu đăng nhập lại | Đã đăng nhập trước đó | 1. Xóa ứng dụng (uninstall)\n2. Cài đặt lại ứng dụng\n3. Mở ứng dụng | 3. Yêu cầu đăng nhập lại từ đầu\n- Không restore session cũ | |
| TC_063 | [Quay lại Trang chủ] Kiểm tra refresh khi quay lại từ màn hình khác | Đăng nhập thành công, đã điều hướng sang UC45 | 1. Nhấp vào tab "Trang chủ" trên Footer để quay lại | 1. Dữ liệu Trang chủ được refresh (tải lại từ đầu)\n- Hiển thị thông tin mới nhất | |

#### Giai đoạn 4: Tích hợp chức năng

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_064 | [Tích hợp] Kiểm tra chuyển ngôn ngữ + Tin tức reload | Đăng nhập thành công, ngôn ngữ hiện tại VI, có tin tức tiếng Việt | 1. Nhấp vào icon Ngôn ngữ\n2. Chọn "English"\n3. Kiểm tra danh sách Tin tức | 3. Tin tức hiển thị nội dung tiếng Anh\n- Không dùng cache ngôn ngữ cũ\n- Mã header hiển thị "EN" | |
| TC_065 | [Tích hợp] Kiểm tra Sidebar đa ngôn ngữ | Đăng nhập thành công, đã chuyển ngôn ngữ sang EN | 1. Nhấp vào nút [Hamburger ☰]\n2. Kiểm tra menu Sidebar | 2. Menu Sidebar hiển thị đúng ngôn ngữ English | |
| TC_066 | [Tích hợp] Kiểm tra Lazy Load cuộn đến cuối tải thêm | Đăng nhập thành công, danh sách có > 20 bản ghi | 1. Cuộn xuống cuối danh sách | 1. Hiển thị loading indicator ở cuối\n2. Tự động tải thêm 20 bản ghi tiếp theo | CMR-04 |
| TC_067 | [Tích hợp] Kiểm tra Lazy Load hết dữ liệu | Đăng nhập thành công, đã cuộn đến hết dữ liệu | 1. Cuộn xuống cuối danh sách (đã hết dữ liệu) | 1. Ẩn loading indicator\n- Không gọi API nữa | CMR-04 |

#### Giai đoạn 5: Kiểm thử phi chức năng mức UI

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_068 | [Loading] Kiểm tra skeleton loading khi tải Card thông tin | Đăng nhập thành công, API đang phản hồi | 1. Kiểm tra hiển thị vùng Card thông tin trong khi chờ API | 1. Hiển thị skeleton loading/spinner\n- Không hiển thị dữ liệu trống hoặc lỗi | CMR-07 |
| TC_069 | [Loading] Kiểm tra skeleton loading khi tải Tin tức | Đăng nhập thành công, API đang phản hồi | 1. Kiểm tra hiển thị vùng Tin tức trong khi chờ API | 1. Hiển thị skeleton loading\n- Không hiển thị dữ liệu trống hoặc lỗi | CMR-07 |

### Check common

#### Sub-label: Kiểm tra các trường hợp phổ biến UI/UX

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_070 | Kiểm tra hiển thị dữ liệu tối đa (maxlength) | Đăng nhập thành công | 1. Kiểm tra hiển thị dữ liệu tối đa (maxlength) | 1. Hiển thị đúng độ dài tối đa | |
| TC_071 | Kiểm tra khôi phục/phóng to/thu nhỏ ứng dụng | Đăng nhập thành công, đang ở Trang chủ | 1. Thực hiện khôi phục, phóng to, thu nhỏ ứng dụng | 1. Không xảy ra lỗi bất thường | |
| TC_072 | Kiểm tra tính nhất quán của các thông báo | Đăng nhập thành công | 1. Kiểm tra tính nhất quán của các thông báo | 1. Xác nhận thông báo lỗi:\n- Thông báo lỗi inline: hiển thị dưới ô nhập liệu bị lỗi, màu đỏ\n- Thông báo lỗi dạng toast: hiển thị ở giữa hoặc phía dưới màn hình | |
| TC_073 | Kiểm tra hiển thị khi thiết bị ở chế độ dọc | Đăng nhập thành công | 1. Kiểm tra hiển thị khi thiết bị ở chế độ dọc | 1. Không có lỗi gì xảy ra, giao diện không bị vỡ | |
| TC_074 | Kiểm tra hiển thị khi thiết bị ở chế độ ngang | Đăng nhập thành công | 1. Kiểm tra hiển thị khi thiết bị ở chế độ ngang | 1. Không có lỗi gì xảy ra, giao diện không bị vỡ | |
| TC_075 | Kiểm tra hiển thị khi chuyển đổi giữa chế độ dọc và ngang | Đăng nhập thành công | 1. Kiểm tra hiển thị khi chuyển từ chế độ dọc sang ngang\n2. Kiểm tra hiển thị khi chuyển từ chế độ ngang sang dọc | 1 & 2. Không có lỗi gì xảy ra, giao diện không bị vỡ | |
| TC_076 | Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất | Đăng nhập thành công | 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất | 1. Giao diện không bị vỡ | |
| TC_077 | Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất | Đăng nhập thành công | 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất | 1. Giao diện không bị vỡ | |

#### Sub-label: Kiểm tra tương tác cơ bản với thiết bị

| TC_ID | Title | Pre-Condition | Step | Expected Result | Note |
|-------|-------|---------------|------|-----------------|------|
| TC_078 | Xác nhận hiển thị khi người dùng chạm vào nút [Quay lại] trên thiết bị Android | Đăng nhập thành công, đang ở Trang chủ | 1. Mở ứng dụng\n2. Người dùng chạm vào nút [Quay lại] trên thiết bị Android\n3. Xác nhận hiển thị | 3. Quay lại màn hình trước đó | |
| TC_079 | Xác nhận hiển thị khi người dùng vuốt từ trái sang phải trên thiết bị iOS | Đăng nhập thành công, đang ở Trang chủ | 1. Mở ứng dụng\n2. Người dùng vuốt từ trái sang phải trên thiết bị iOS\n3. Xác nhận hiển thị | 3. Quay lại màn hình trước đó | |
| TC_080 | Xác nhận hiển thị khi người dùng tắt và mở lại ứng dụng | Đăng nhập thành công | 1. Mở ứng dụng\n2. Người dùng tắt ứng dụng\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị | 4. Ứng dụng mở lại từ Trang chủ, giữ session | |
| TC_081 | Kiểm tra chế độ đa nhiệm (multitasking) | Đăng nhập thành công, đang ở Trang chủ | 1. Mở ứng dụng\n2. Trở về màn hình chính (không tắt ứng dụng)\n3. Mở lại ứng dụng\n4. Xác nhận hiển thị | 4. Ứng dụng giữ nguyên ở trạng thái hiện tại | |
| TC_082 | Xác nhận hiển thị khi người dùng khóa và mở khóa màn hình thiết bị | Đăng nhập thành công, đang ở Trang chủ | 1. Mở ứng dụng\n2. Khóa thiết bị\n3. Mở khóa thiết bị\n4. Xác nhận hiển thị | 4. Giữ nguyên trạng thái hiện tại của ứng dụng | |
| TC_083 | Kiểm tra hành động kéo xuống để làm mới (pull-to-refresh) | Đăng nhập thành công, đang ở Trang chủ | 1. Người dùng ở màn hình Trang chủ\n2. Kéo xuống để làm mới | 2. Hiển thị dữ liệu mới nhất của màn hình | CMR-13 |
| TC_084 | Kiểm tra hành động cuộn xuống để tải thêm (scroll-down-to-load-more) | Đăng nhập thành công, danh sách có > 20 bản ghi | 1. Người dùng cuộn xuống cuối danh sách | 1. Hiển thị thêm dữ liệu mới | CMR-04 |
| TC_085 | Kiểm tra phản hồi khi thiết bị nhận thông báo từ ứng dụng khác | Đăng nhập thành công, đang ở Trang chủ, ứng dụng khác được phép gửi thông báo | 1. Mở ứng dụng\n2. Ứng dụng khác gửi thông báo\n3. Xác nhận hiển thị | 3. Không có lỗi nào xảy ra | |

---

## Requirement Traceability Matrix (RTM)

| AC-ID | Tiêu chí chấp nhận | Test Cases liên kết | Trạng thái |
|-------|---------------------|---------------------|------------|
| AC-UI-01 | Header hiển thị đủ 5 components | TC_001, TC_002 | Đã bao phủ |
| AC-UI-02 | Card thông tin hiển thị Avatar, Tên, Vai trò | TC_001, TC_004-TC_008 | Đã bao phủ |
| AC-UI-03 | Quick Access hiển thị đủ 6 mục cố định | TC_001, TC_008 | Đã bao phủ |
| AC-UI-04 | Tin tức tối đa 5 bài, cuộn ngang, card đầy đủ | TC_009-TC_011, TC_035-TC_037 | Đã bao phủ |
| AC-UI-05 | Footer hiển thị 4 tab | TC_001, TC_014 | Đã bao phủ |
| AC-UI-06 | Chatbot floating góc dưới phải, drag & drop | TC_038-TC_040 | Đã bao phủ |
| AC-FN-01 | Đăng nhập → Trang chủ | TC_001 | Đã bao phủ |
| AC-FN-02 | Red dot polling 30s | TC_012, TC_013, TC_045 | Đã bao phủ |
| AC-FN-03 | Chuyển ngôn ngữ → Tin tức reload | TC_019-TC_024, TC_064 | Đã bao phủ |
| AC-FN-04 | Tap Sidebar item → Đóng + điều hướng | TC_015, TC_016 | Đã bao phủ |
| AC-FN-05 | Tap vùng ngoài Sidebar → Đóng | TC_017 | Đã bao phủ |
| AC-FN-06 | Ngôn ngữ lưu server, persist | TC_024 | Đã bao phủ |
| AC-FN-07 | Chatbot reset vị trí | TC_040 | Đã bao phủ |
| AC-FN-08 | Lỗi API → Xử lý độc lập từng section | TC_053-TC_055 | Đã bao phủ |
| AC-FN-09 | Pull to Refresh | TC_046-TC_048, TC_083 | Đã bao phủ |
| AC-FN-10 | Debounce navigation | TC_058-TC_060 | Đã bao phủ |
| AC-FN-11 | Force close → Giữ session | TC_061 | Đã bao phủ |
| AC-FN-12 | Uninstall → Đăng nhập lại | TC_062 | Đã bao phủ |
| AC-FN-13 | Timeout > 10s → Thông báo + Thử lại | TC_051, TC_052 | Đã bao phủ |
| AC-INT-01 | Footer tab → Refresh | TC_041-TC_044 | Đã bao phủ |
| AC-INT-02 | Quick Access → Đúng UC | TC_027-TC_032 | Đã bao phủ |
| AC-INT-03 | Pull to Refresh không duplicate | TC_048 | Đã bao phủ |
| BR-01 | Tin tức tối đa 5, giảm dần | TC_036, TC_037 | Đã bao phủ |
| BR-02 | Quick Access cố định | TC_008 | Đã bao phủ |
| BR-03 | Polling 30s | TC_045 | Đã bao phủ |
| BR-04 | Ngôn ngữ lưu server | TC_024 | Đã bao phủ |
| BR-05 | Chatbot reset vị trí | TC_040 | Đã bao phủ |
| BR-06 | Debounce navigation | TC_058-TC_060 | Đã bao phủ |
| BR-07 | Force close giữ session | TC_061 | Đã bao phủ |
| BR-08 | Uninstall đăng nhập lại | TC_062 | Đã bao phủ |
| CMR-07 | Xử lý lỗi chung | TC_049-TC_057 | Đã bao phủ |
| CMR-13 | Pull to Refresh | TC_046-TC_048, TC_083 | Đã bao phủ |
| CMR-14 | Empty State | TC_002, TC_020 (scenario) | Đã bao phủ |
| CMR-16 | Timeout 10 giây | TC_051, TC_052 | Đã bao phủ |
