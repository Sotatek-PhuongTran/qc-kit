# Test Cases Draft — UC55 Xem chuyên trang đầu tư theo khu vực đầu tư

**Ngày tạo:** 08/05/2026
**Tác giả:** QC Agent
**Phiên bản:** v1.0
**Tài liệu tham chiếu:** UC55_ChuyenTrangDauTu.md, UC55_chuyen-trang-dau-tu_audited_20260508_v2.md, UC55_chuyen-trang-dau-tu_scenarios_20260508_v2.md, CMR_Mobile.md

---

## [Section Group] 1. Màn hình Danh sách chọn tỉnh / thành phố

### Check UI/UX

**TC_001 — Kiểm tra UI/UX màn hình Danh sách tỉnh**
- Pre-condition: Đăng nhập thành công vào ứng dụng.
- Steps:
  1. Từ màn hình chính, mở Sidebar → Tap "Khu vực đầu tư"
  2. Kiểm tra hiển thị toàn bộ màn hình [Danh sách chọn tỉnh / thành phố]
- Expected:
  2.
  - Hiển thị đầy đủ các item, màu sắc, font chữ, layout giống Design
  (Tham khảo ảnh wireframe "UC 55. Xem chuyên trang đầu tư - list chọn tỉnh" sheet WFDesign)
  - Header: nền đỏ đậm, tiêu đề "Đầu tư theo khu vực" màu trắng, căn giữa, có nút [←] bên trái
  - Tiêu đề section "Chọn tỉnh / thành phố": font đậm, căn trái, phía trên ô tìm kiếm
  - Ô tìm kiếm: có icon kính lúp bên trái, placeholder "Tìm kiếm tỉnh, thành phố..."
  - Danh sách tỉnh: mỗi item gồm Tên tỉnh (căn trái) + icon mũi tên ">" (căn phải)
  - Danh sách sắp xếp A–Z, cuộn dọc

### Check Function

#### Giai đoạn 1: Khởi tạo màn hình

**TC_002 — [Danh sách tỉnh] Kiểm tra hiển thị mặc định khi truy cập lần đầu**
- Pre-condition: Đăng nhập thành công vào ứng dụng.
- Steps:
  1. Từ Sidebar, tap "Khu vực đầu tư"
  2. Kiểm tra hiển thị danh sách tỉnh
- Expected:
  1. Hiển thị skeleton loading trong khi tải dữ liệu
  2. Sau khi tải xong:
  - Hiển thị đầy đủ 63 tỉnh/thành phố
  - Sắp xếp theo thứ tự A–Z (An Giang → ... → Yên Bái)
  - Tải toàn bộ trong 1 lần (không lazy load, không phân trang)
  - Ô tìm kiếm hiển thị placeholder "Tìm kiếm tỉnh, thành phố..."

**TC_003 — [Danh sách tỉnh] Kiểm tra dữ liệu lấy từ API danh mục (không hard-code)**
- Pre-condition: Đăng nhập thành công. API danh mục trả dữ liệu tỉnh.
- Steps:
  1. Truy cập "Khu vực đầu tư"
  2. Kiểm tra danh sách tỉnh hiển thị
  3. So sánh với dữ liệu API danh mục
- Expected:
  2. Danh sách tỉnh lấy từ API danh mục hệ thống
  3. Dữ liệu hiển thị khớp 100% với API response — không có dữ liệu cứng

#### Giai đoạn 2: Tương tác thành phần

**TC_004 — [Nút Quay lại ←] Kiểm tra tap nút Quay lại trên header (CMR-06)**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh]
- Steps:
  1. Tap nút [←] trên header
  2. Kiểm tra hiển thị
- Expected:
  2. Quay về màn hình trước đó (Home/Sidebar)

**TC_005 — [Ô tìm kiếm] Kiểm tra tap vào ô tìm kiếm**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh]
- Steps:
  1. Tap vào ô tìm kiếm
  2. Kiểm tra hiển thị
- Expected:
  1. Ô tìm kiếm được focus
  2. Bàn phím hiển thị, placeholder "Tìm kiếm tỉnh, thành phố..." biến mất khi bắt đầu nhập

**TC_006 — [Item tỉnh] Kiểm tra tap vào item tỉnh — Điều hướng chi tiết**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh], danh sách đã tải xong.
- Steps:
  1. Tap vào item "An Giang"
  2. Kiểm tra hiển thị
- Expected:
  2. Điều hướng đến màn hình [Chi tiết chuyên trang đầu tư] của tỉnh "An Giang"

#### Giai đoạn 3: Kiểm thử chức năng cốt lõi

**TC_007 — [Ô tìm kiếm] Kiểm tra tìm kiếm tỉnh — có kết quả (Happy path)**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh], danh sách 63 tỉnh đã hiển thị.
- Steps:
  1. Tap vào ô tìm kiếm
  2. Nhập "Bắc"
  3. Kiểm tra hiển thị danh sách
- Expected:
  3. Danh sách lọc hiển thị các tỉnh chứa từ "Bắc" (ví dụ: Bắc Giang, Bắc Kạn, Bắc Ninh)
  - Lọc real-time, không cần nhấn Enter (CMR-01)
  - Tìm kiếm gần đúng (chứa từ khóa)

**TC_008 — [Ô tìm kiếm] Kiểm tra tìm kiếm — không có kết quả (CMR-14)**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh]
- Steps:
  1. Nhập "XYZ123" vào ô tìm kiếm
  2. Kiểm tra hiển thị
- Expected:
  2. Hiển thị thông báo "Không tìm thấy kết quả." căn giữa vùng nội dung (CMR-14 — No result)

**TC_009 — [Ô tìm kiếm] Kiểm tra xóa hết từ khóa — danh sách trở về đầy đủ**
- Pre-condition: Đã nhập từ khóa "Bắc" và danh sách đang lọc 3 tỉnh.
- Steps:
  1. Xóa hết từ khóa trong ô tìm kiếm
  2. Kiểm tra hiển thị
- Expected:
  2. Danh sách trở về trạng thái mặc định: hiển thị đầy đủ 63 tỉnh/thành phố, sắp xếp A–Z

**TC_010 — [Ô tìm kiếm] Kiểm tra tìm kiếm với từ khóa có dấu tiếng Việt**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh]
- Steps:
  1. Nhập "Hà" vào ô tìm kiếm
  2. Kiểm tra hiển thị
- Expected:
  2. Danh sách lọc hiển thị các tỉnh chứa "Hà" (ví dụ: Hà Giang, Hà Nam, Hà Nội, Hà Tĩnh)

**TC_011 — [Ô tìm kiếm] Kiểm tra tìm kiếm với chữ thường**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh]
- Steps:
  1. Nhập "bắc" (chữ thường) vào ô tìm kiếm
  2. Kiểm tra hiển thị
- Expected:
  2. Danh sách lọc hiển thị tương tự nhập "Bắc" (case-insensitive) — Bắc Giang, Bắc Kạn, Bắc Ninh

**TC_012 — [Ô tìm kiếm] Kiểm tra tìm kiếm chỉ nhập khoảng trắng**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh]
- Steps:
  1. Nhập "   " (3 khoảng trắng) vào ô tìm kiếm
  2. Kiểm tra hiển thị
- Expected:
  2. Danh sách hiển thị đầy đủ 63 tỉnh (hệ thống bỏ qua khoảng trắng) hoặc "Không tìm thấy kết quả."
- Note: Chưa rõ spec — ghi nhận hành vi thực tế

**TC_013 — [Ô tìm kiếm] Kiểm tra tìm kiếm với ký tự đặc biệt**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh]
- Steps:
  1. Nhập "@#$%" vào ô tìm kiếm
  2. Kiểm tra hiển thị
- Expected:
  2. Hiển thị "Không tìm thấy kết quả." (CMR-14)
  - Không crash, không hiển thị lỗi hệ thống

**TC_014 — [Ô tìm kiếm] Kiểm tra tìm kiếm với 1 ký tự**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh]
- Steps:
  1. Nhập "A" vào ô tìm kiếm
  2. Kiểm tra hiển thị
- Expected:
  2. Hiển thị các tỉnh chứa "A" — lọc real-time ngay khi nhập (CMR-01)

**TC_015 — [Pull to Refresh] Kiểm tra kéo xuống làm mới danh sách tỉnh (CMR-13)**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh], danh sách 63 tỉnh hiển thị.
- Steps:
  1. Kéo xuống từ đầu danh sách (pull-to-refresh)
  2. Kiểm tra hiển thị
- Expected:
  1. Hiển thị spinner/animation ở đầu danh sách khi đang refresh
  2. Sau khi refresh thành công: cập nhật danh sách, ẩn spinner, danh sách hiển thị đầy đủ 63 tỉnh

**TC_016 — [Pull to Refresh] Kiểm tra kéo xuống liên tục nhanh — no duplicate request (CMR-13)**
- Pre-condition: Đang ở màn hình [Danh sách tỉnh]
- Steps:
  1. Kéo xuống pull-to-refresh liên tục 3 lần nhanh
  2. Kiểm tra hiển thị
- Expected:
  1. Chỉ 1 API call được gửi (không duplicate)
  2. Dữ liệu cập nhật 1 lần — không bị blink/flash do nhiều response

#### Giai đoạn 3 — Xử lý lỗi

**TC_017 — [Lỗi mạng] Kiểm tra hiển thị khi mất kết nối mạng — MH1 (CMR-07)**
- Pre-condition: Tắt kết nối mạng trên thiết bị.
- Steps:
  1. Truy cập "Khu vực đầu tư"
  2. Kiểm tra hiển thị
- Expected:
  2. Hiển thị thông báo "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." kèm nút [Thử lại]

**TC_018 — [Nút Thử lại] Kiểm tra tap "Thử lại" sau lỗi mạng — MH1**
- Pre-condition: Đang hiển thị lỗi mạng trên MH1, đã bật lại kết nối mạng.
- Steps:
  1. Tap nút [Thử lại]
  2. Kiểm tra hiển thị
- Expected:
  1. Hệ thống gọi lại API danh sách tỉnh
  2. Hiển thị skeleton loading → sau đó danh sách 63 tỉnh hiển thị bình thường

**TC_019 — [Lỗi API 500] Kiểm tra hiển thị khi API trả lỗi 500 — MH1 (CMR-07)**
- Pre-condition: Giả lập API danh sách tỉnh trả HTTP 500.
- Steps:
  1. Truy cập "Khu vực đầu tư"
  2. Kiểm tra hiển thị
- Expected:
  2. Hiển thị thông báo "Hệ thống đang bận. Vui lòng thử lại sau."

**TC_020 — [Timeout] Kiểm tra khi API danh sách tỉnh vượt 10 giây (CMR-07, CMR-16)**
- Pre-condition: Giả lập API phản hồi > 10 giây.
- Steps:
  1. Truy cập "Khu vực đầu tư"
  2. Đợi > 10 giây
  3. Kiểm tra hiển thị
- Expected:
  3. Hiển thị thông báo "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." kèm nút [Thử lại]
- Note: UC55 không đề cập timeout, áp dụng CMR-07/CMR-16. Ref Q5

**TC_021 — [Skeleton loading] Kiểm tra hiển thị skeleton loading khi tải danh sách**
- Pre-condition: API phản hồi chậm (2-5 giây).
- Steps:
  1. Truy cập "Khu vực đầu tư"
  2. Kiểm tra hiển thị trong khi tải
- Expected:
  2. Hiển thị skeleton loading (placeholder UI) thay vì màn hình trắng trong khi chờ API phản hồi

#### Giai đoạn 4: Tích hợp chức năng

**TC_022 — [Tìm kiếm + Pull to Refresh] Kiểm tra pull-to-refresh khi đang lọc tìm kiếm**
- Pre-condition: Đã nhập "Bắc", danh sách đang lọc 3 tỉnh.
- Steps:
  1. Kéo xuống pull-to-refresh
  2. Kiểm tra hiển thị
- Expected:
  2. Danh sách refresh nhưng vẫn giữ kết quả lọc tìm kiếm (nếu State Persistence áp dụng — ref Q4)
  hoặc: danh sách reset về 63 tỉnh, ô tìm kiếm vẫn giữ keyword
- Note: Hành vi chính xác phụ thuộc Q4

**TC_023 — [State Persistence] Kiểm tra giữ trạng thái tìm kiếm khi back từ chi tiết (CMR-01)**
- Pre-condition: Đã nhập "Bắc" → danh sách lọc 3 tỉnh → tap "Bắc Ninh" → xem chi tiết.
- Steps:
  1. Tap nút [←] quay lại từ màn hình chi tiết
  2. Kiểm tra hiển thị màn hình danh sách
- Expected:
  2. Ô tìm kiếm vẫn hiển thị "Bắc", danh sách vẫn lọc 3 tỉnh (theo CMR-01 State Persistence)
- Note: Ref Q4 — chờ BA xác nhận

### Check common

#### [Sub-label] Kiểm tra các trường hợp phổ biến UI/UX

**TC_024 — Kiểm tra hiển thị dữ liệu tối đa (maxlength)**
- Steps: 1. Kiểm tra hiển thị dữ liệu tối đa (maxlength)
- Expected: 1. Hiển thị đúng độ dài tối đa

**TC_025 — Kiểm tra khôi phục/phóng to/thu nhỏ ứng dụng**
- Steps: 1. Thực hiện khôi phục, phóng to, thu nhỏ ứng dụng
- Expected: 1. Không xảy ra lỗi bất thường

**TC_026 — Kiểm tra tính nhất quán của các thông báo**
- Steps: 1. Kiểm tra tính nhất quán của các thông báo
- Expected: 1. Xác nhận thông báo lỗi:
  - Thông báo lỗi inline: hiển thị dưới ô nhập liệu bị lỗi, màu đỏ
  - Thông báo lỗi dạng toast: hiển thị ở giữa hoặc phía dưới màn hình

**TC_027 — Kiểm tra hiển thị khi thiết bị ở chế độ dọc (thiết bị xoay theo chiều đứng)**
- Steps: 1. Kiểm tra hiển thị khi thiết bị ở chế độ dọc
- Expected: 1. Không có lỗi gì xảy ra, giao diện không bị vỡ

**TC_028 — Kiểm tra hiển thị khi thiết bị ở chế độ ngang (thiết bị xoay theo chiều ngang)**
- Steps: 1. Kiểm tra hiển thị khi thiết bị ở chế độ ngang
- Expected: 1. Không có lỗi gì xảy ra, giao diện không bị vỡ

**TC_029 — Kiểm tra hiển thị khi chuyển đổi giữa chế độ dọc và ngang**
- Steps:
  1. Kiểm tra hiển thị khi chuyển từ chế độ dọc sang ngang
  2. Kiểm tra hiển thị khi chuyển từ chế độ ngang sang dọc
- Expected: 1 & 2. Không có lỗi gì xảy ra, giao diện không bị vỡ

**TC_030 — Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất**
- Steps: 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất
- Expected: 1. Giao diện không bị vỡ

**TC_031 — Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất**
- Steps: 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất
- Expected: 1. Giao diện không bị vỡ

#### [Sub-label] Kiểm tra tương tác cơ bản với thiết bị

**TC_032 — Xác nhận hiển thị khi người dùng chạm vào nút [Quay lại] trên thiết bị Android**
- Steps:
  1. Mở ứng dụng, truy cập màn hình [Danh sách tỉnh]
  2. Người dùng chạm vào nút [Quay lại] trên thiết bị Android
  3. Xác nhận hiển thị
- Expected: 3. Quay lại màn hình trước đó

**TC_033 — Xác nhận hiển thị khi người dùng vuốt từ trái sang phải trên thiết bị iOS**
- Steps:
  1. Mở ứng dụng, truy cập màn hình [Danh sách tỉnh]
  2. Người dùng vuốt từ trái sang phải trên thiết bị iOS
  3. Xác nhận hiển thị
- Expected: 3. Quay lại màn hình trước đó

**TC_034 — Xác nhận hiển thị khi người dùng tắt và mở lại ứng dụng**
- Steps:
  1. Mở ứng dụng, truy cập màn hình [Danh sách tỉnh]
  2. Người dùng tắt ứng dụng
  3. Mở lại ứng dụng
  4. Xác nhận hiển thị
- Expected: 4. Ứng dụng mở lại từ trạng thái ban đầu

**TC_035 — Kiểm tra chế độ đa nhiệm (multitasking)**
- Steps:
  1. Mở ứng dụng, truy cập màn hình [Danh sách tỉnh]
  2. Trở về màn hình chính (không tắt ứng dụng)
  3. Mở lại ứng dụng
  4. Xác nhận hiển thị
- Expected: 4. Ứng dụng giữ nguyên ở trạng thái hiện tại (màn hình Danh sách tỉnh)

**TC_036 — Xác nhận hiển thị khi người dùng khóa và mở khóa màn hình thiết bị**
- Steps:
  1. Mở ứng dụng, truy cập màn hình [Danh sách tỉnh]
  2. Khóa thiết bị
  3. Mở khóa thiết bị
  4. Xác nhận hiển thị
- Expected: 4. Giữ nguyên trạng thái hiện tại của ứng dụng

**TC_037 — Kiểm tra hành động kéo xuống để làm mới (pull-to-refresh)**
- Pre-condition: Màn hình hỗ trợ tính năng kéo để làm mới
- Steps:
  1. Người dùng ở màn hình [Danh sách tỉnh]
  2. Kéo xuống để làm mới
- Expected: 2. Hiển thị dữ liệu mới nhất của màn hình

**TC_038 — Kiểm tra hành động cuộn xuống để tải thêm (scroll-down-to-load-more)**
- Note: N/A — Màn hình danh sách tỉnh tải toàn bộ 63 tỉnh 1 lần, không lazy load

**TC_039 — Kiểm tra phản hồi khi thiết bị nhận thông báo từ ứng dụng khác**
- Pre-condition: Ứng dụng khác được phép gửi thông báo
- Steps:
  1. Người dùng mở ứng dụng, truy cập màn hình [Danh sách tỉnh]
  2. Ứng dụng khác gửi thông báo
  3. Xác nhận hiển thị
- Expected: 3. Không có lỗi nào xảy ra

---

## [Section Group] 2. Màn hình Chi tiết Chuyên trang đầu tư theo tỉnh

### Check UI/UX

**TC_040 — Kiểm tra UI/UX màn hình Chi tiết chuyên trang (có đầy đủ dữ liệu)**
- Pre-condition: Đăng nhập thành công. Đã tap vào tỉnh "An Giang" từ danh sách.
- Steps:
  1. Kiểm tra hiển thị toàn bộ màn hình [Chi tiết chuyên trang đầu tư]
  2. Cuộn dọc xuống cuối màn hình
- Expected:
  1.
  - Hiển thị đầy đủ các item, màu sắc, font chữ, layout giống Design
  (Tham khảo ảnh wireframe "UC 55. Xem chi tiết 1 chuyên trang" sheet WFDesign)
  - Header: nền đỏ đậm, tiêu đề "An Giang" màu trắng, căn giữa, có nút [←] bên trái
  2. Hiển thị các section theo thứ tự từ trên xuống:
  Banner ảnh → KPI (4 thẻ) → Tổng quan → Lĩnh vực khuyến khích → Hạ tầng KCN → Vị trí địa lý → Liên hệ → CTA
  - Layout scroll dọc liên tục

### Check Function

#### Giai đoạn 1: Khởi tạo màn hình

**TC_041 — [Skeleton loading] Kiểm tra skeleton loading khi tải chi tiết chuyên trang**
- Pre-condition: Đăng nhập thành công.
- Steps:
  1. Từ danh sách tỉnh, tap vào "An Giang"
  2. Kiểm tra hiển thị trong khi tải
- Expected:
  2. Hiển thị skeleton loading cho từng section trong khi chờ API phản hồi

**TC_042 — [Banner] Kiểm tra hiển thị banner ảnh tỉnh + overlay text**
- Pre-condition: API trả data đầy đủ cho tỉnh An Giang.
- Steps:
  1. Kiểm tra hiển thị Section 1 — Banner ảnh tỉnh
- Expected:
  1.
  - Ảnh phong cảnh/đặc trưng của tỉnh, full width, chiều cao cố định
  - Overlay text: Tên tỉnh viết hoa "AN GIANG" + tagline mô tả ngắn (ví dụ: "Cửa ngõ kinh tế phía Tây Nam"), màu trắng, góc dưới trái ảnh

**TC_043 — [KPI] Kiểm tra hiển thị 4 thẻ KPI — Happy path (dữ liệu đầy đủ)**
- Pre-condition: API trả đầy đủ 4 giá trị KPI cho tỉnh.
- Steps:
  1. Kiểm tra hiển thị Section 2 — Bộ chỉ số KPI
- Expected:
  1. Hiển thị 4 thẻ ngang:
  - Thẻ 1: Icon biểu đồ (đỏ) + "Tăng trưởng GRDP" + giá trị % (ví dụ: 6.2%)
  - Thẻ 2: Icon người (đỏ) + "Dân số" + giá trị rút gọn K/M/B (ví dụ: 2.2M)
  - Thẻ 3: Icon $ (đỏ) + "Vốn đầu tư" + "$" + giá trị rút gọn K/M/B (ví dụ: $1.5B)
  - Thẻ 4: Icon pin map (đỏ) + "Diện tích" + số nguyên + dấu phẩy + "km²" (ví dụ: 3,536 km²)
  - Mỗi thẻ nền trắng, bo góc, shadow nhẹ
  - Cuộn ngang nếu tổng chiều rộng vượt quá màn hình
  - Không tap được

**TC_044 — [KPI] Kiểm tra hiển thị KPI khi dữ liệu NULL — thẻ hiển thị "--"**
- Pre-condition: API trả KPI GRDP = null, các thẻ khác có dữ liệu.
- Steps:
  1. Kiểm tra hiển thị thẻ GRDP
- Expected:
  1. Thẻ GRDP vẫn hiển thị, giá trị số hiển thị là "--"
  - Các thẻ khác hiển thị bình thường

**TC_045 — [KPI] Kiểm tra hiển thị khi TẤT CẢ 4 thẻ KPI đều NULL**
- Pre-condition: API trả cả 4 giá trị KPI = null.
- Steps:
  1. Kiểm tra hiển thị Section 2
- Expected:
  1. Vẫn hiển thị đầy đủ 4 thẻ KPI, tất cả giá trị hiển thị "--"
  - Cuộn ngang vẫn hoạt động bình thường

**TC_046 — [KPI] Kiểm tra cuộn ngang 4 thẻ KPI**
- Pre-condition: 4 thẻ KPI hiển thị đầy đủ.
- Steps:
  1. Vuốt ngang sang trái trên vùng thẻ KPI
  2. Vuốt ngang sang phải
- Expected:
  1. Các thẻ cuộn ngang sang trái mượt
  2. Các thẻ cuộn ngang sang phải về vị trí ban đầu

#### Giai đoạn 3: Kiểm thử chức năng cốt lõi — KPI Format

**TC_047 — [KPI GRDP] Kiểm tra format số — 1 chữ số thập phân + %**
- Pre-condition: API trả GRDP = 6.2.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ GRDP
- Expected:
  1. Hiển thị "6.2%" — 1 chữ số thập phân, đơn vị %

**TC_048 — [KPI GRDP] Kiểm tra format — BVA: GRDP = 0.0%**
- Pre-condition: API trả GRDP = 0.0.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ GRDP
- Expected:
  1. Hiển thị "0.0%"

**TC_049 — [KPI GRDP] Kiểm tra format — BVA: GRDP = 99.9%**
- Pre-condition: API trả GRDP = 99.9.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ GRDP
- Expected:
  1. Hiển thị "99.9%"

**TC_050 — [KPI Dân số] Kiểm tra format — dưới 1.000 (hiển thị số nguyên)**
- Pre-condition: API trả Dân số = 850.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ Dân số
- Expected:
  1. Hiển thị "850" — số nguyên, không rút gọn

**TC_051 — [KPI Dân số] Kiểm tra format — BVA ranh giới K: 999 → 1,000**
- Pre-condition: API trả Dân số = 999 (test 1), Dân số = 1000 (test 2).
- Steps:
  1. Kiểm tra giá trị thẻ Dân số với giá trị 999
  2. Kiểm tra giá trị thẻ Dân số với giá trị 1000
- Expected:
  1. Hiển thị "999" — không rút gọn (dưới 1.000)
  2. Hiển thị "1K" — rút gọn K (1.000 tròn → không thập phân)

**TC_052 — [KPI Dân số] Kiểm tra format — rút gọn K có 1 thập phân**
- Pre-condition: API trả Dân số = 1500.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ Dân số
- Expected:
  1. Hiển thị "1.5K"

**TC_053 — [KPI Dân số] Kiểm tra format — BVA ranh giới M: 999,999 → 1,000,000**
- Pre-condition: API trả Dân số = 999999 (test 1), Dân số = 1000000 (test 2).
- Steps:
  1. Kiểm tra giá trị thẻ Dân số với giá trị 999,999
  2. Kiểm tra giá trị thẻ Dân số với giá trị 1,000,000
- Expected:
  1. Hiển thị "999.9K"
  2. Hiển thị "1M" — tròn số, không thập phân

**TC_054 — [KPI Dân số] Kiểm tra format — rút gọn M có 1 thập phân**
- Pre-condition: API trả Dân số = 2200000.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ Dân số
- Expected:
  1. Hiển thị "2.2M"

**TC_055 — [KPI Vốn đầu tư] Kiểm tra format — dưới $1,000 (không rút gọn)**
- Pre-condition: API trả Vốn đầu tư = 850.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ Vốn đầu tư
- Expected:
  1. Hiển thị "$850" — ký hiệu $ đứng trước, số nguyên, không rút gọn

**TC_056 — [KPI Vốn đầu tư] Kiểm tra format — BVA ranh giới K: $999 → $1,000**
- Pre-condition: API trả Vốn đầu tư = 999 (test 1), Vốn đầu tư = 1000 (test 2).
- Steps:
  1. Kiểm tra giá trị thẻ Vốn đầu tư với giá trị 999
  2. Kiểm tra giá trị thẻ Vốn đầu tư với giá trị 1000
- Expected:
  1. Hiển thị "$999" — không rút gọn
  2. Hiển thị "$1K" — rút gọn K

**TC_057 — [KPI Vốn đầu tư] Kiểm tra format — BVA ranh giới M: $999,999 → $1,000,000**
- Pre-condition: API trả Vốn đầu tư = 999999 (test 1), Vốn đầu tư = 1000000 (test 2).
- Steps:
  1. Kiểm tra giá trị thẻ Vốn đầu tư với giá trị 999,999
  2. Kiểm tra giá trị thẻ Vốn đầu tư với giá trị 1,000,000
- Expected:
  1. Hiển thị "$999.9K"
  2. Hiển thị "$1M"

**TC_058 — [KPI Vốn đầu tư] Kiểm tra format — BVA ranh giới B: $999,999,999 → $1,000,000,000**
- Pre-condition: API trả Vốn đầu tư = 999999999 (test 1), Vốn đầu tư = 1000000000 (test 2).
- Steps:
  1. Kiểm tra giá trị thẻ Vốn đầu tư với giá trị 999,999,999
  2. Kiểm tra giá trị thẻ Vốn đầu tư với giá trị 1,000,000,000
- Expected:
  1. Hiển thị "$999.9M"
  2. Hiển thị "$1B"

**TC_059 — [KPI Vốn đầu tư] Kiểm tra format — rút gọn B có 1 thập phân**
- Pre-condition: API trả Vốn đầu tư = 1500000000.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ Vốn đầu tư
- Expected:
  1. Hiển thị "$1.5B"

**TC_060 — [KPI Diện tích] Kiểm tra format — số nguyên + dấu phẩy + km²**
- Pre-condition: API trả Diện tích = 3536.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ Diện tích
- Expected:
  1. Hiển thị "3,536 km²" — số nguyên, dấu phẩy ngăn cách nghìn, đơn vị km²

**TC_061 — [KPI Diện tích] Kiểm tra format — BVA: dưới 1,000 (không dấu phẩy)**
- Pre-condition: API trả Diện tích = 999.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ Diện tích
- Expected:
  1. Hiển thị "999 km²" — không có dấu phẩy

**TC_062 — [KPI Diện tích] Kiểm tra format — BVA: đúng 1,000**
- Pre-condition: API trả Diện tích = 1000.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ Diện tích
- Expected:
  1. Hiển thị "1,000 km²" — có dấu phẩy ngăn cách nghìn

**TC_063 — [KPI] Kiểm tra KPI value = 0 (phân biệt 0 vs null) — GRDP**
- Pre-condition: API trả GRDP = 0.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ GRDP
- Expected:
  1. Hiển thị "0.0%" — KHÔNG hiển thị "--" (phân biệt 0 valid vs null)
- Note: Ref Q2

**TC_064 — [KPI] Kiểm tra KPI value = 0 — Dân số**
- Pre-condition: API trả Dân số = 0.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ Dân số
- Expected:
  1. Hiển thị "0" — KHÔNG hiển thị "--"
- Note: Ref Q2

**TC_065 — [KPI] Kiểm tra KPI value = 0 — Vốn đầu tư**
- Pre-condition: API trả Vốn đầu tư = 0.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ Vốn đầu tư
- Expected:
  1. Hiển thị "$0" — KHÔNG hiển thị "--"
- Note: Ref Q2

**TC_066 — [KPI] Kiểm tra KPI value = 0 — Diện tích**
- Pre-condition: API trả Diện tích = 0.
- Steps:
  1. Kiểm tra giá trị hiển thị thẻ Diện tích
- Expected:
  1. Hiển thị "0 km²" — KHÔNG hiển thị "--"
- Note: Ref Q2

#### Giai đoạn 3: Kiểm thử chức năng cốt lõi — Các section nội dung

**TC_067 — [Tổng quan đầu tư] Kiểm tra hiển thị nội dung — Happy path**
- Pre-condition: API trả nội dung tổng quan đầy đủ.
- Steps:
  1. Cuộn đến Section 3 — Tổng quan đầu tư
  2. Kiểm tra hiển thị
- Expected:
  1. Tiêu đề "Tổng quan đầu tư": font đậm, căn trái
  2. Nội dung plain text từ API, hiển thị full text (không giới hạn số dòng), khớp 100% với API response

**TC_068 — [Tổng quan đầu tư] Kiểm tra empty state — nội dung null/rỗng**
- Pre-condition: API trả nội dung tổng quan = null.
- Steps:
  1. Kiểm tra hiển thị Section 3
- Expected:
  1. Hiển thị tiêu đề "Tổng quan đầu tư" + bên dưới hiển thị "Không có dữ liệu"

**TC_069 — [Lĩnh vực khuyến khích] Kiểm tra hiển thị chip list — Happy path**
- Pre-condition: API trả danh sách lĩnh vực khuyến khích gồm nhiều item.
- Steps:
  1. Cuộn đến Section 4 — Lĩnh vực khuyến khích
  2. Kiểm tra hiển thị
- Expected:
  1. Tiêu đề "Lĩnh vực khuyến khích": font đậm, căn trái
  2. Mỗi lĩnh vực là chip/tag dạng pill, viền vàng/cam nhạt, text màu vàng/cam đậm
  - Chip xếp ngang, cuộn ngang nếu vượt chiều rộng
  - Không tap được

**TC_070 — [Lĩnh vực khuyến khích] Kiểm tra empty state — danh sách rỗng**
- Pre-condition: API trả danh sách lĩnh vực = rỗng.
- Steps:
  1. Kiểm tra hiển thị Section 4
- Expected:
  1. Hiển thị tiêu đề "Lĩnh vực khuyến khích" + bên dưới hiển thị "Không có dữ liệu"

**TC_071 — [Lĩnh vực khuyến khích] Kiểm tra cuộn ngang chip list**
- Pre-condition: Danh sách lĩnh vực có nhiều chip vượt chiều rộng màn hình.
- Steps:
  1. Vuốt ngang sang trái trên vùng chip
  2. Vuốt ngang sang phải
- Expected:
  1. Các chip cuộn ngang mượt sang trái, hiển thị chip bị ẩn
  2. Cuộn ngược lại, hiển thị chip đầu tiên

**TC_072 — [Hạ tầng KCN] Kiểm tra hiển thị danh sách KCN — Happy path**
- Pre-condition: API trả danh sách KCN gồm nhiều item.
- Steps:
  1. Cuộn đến Section 5 — Hạ tầng KCN
  2. Kiểm tra hiển thị
- Expected:
  1. Tiêu đề "Hạ tầng KCN": font đậm, căn trái
  2. Mỗi item KCN gồm:
  - Icon biểu đồ/nhà máy (đỏ, góc trái)
  - Tên KCN (font đậm)
  - Diện tích: số nguyên + đơn vị ha (ví dụ: "Diện tích: 250 ha")
  - Badge trạng thái: Xanh lá "Sẵn sàng" hoặc Vàng "Đang quy hoạch"
  - Nền trắng, bo góc, đường viền nhạt
  - Không tap được

**TC_073 — [Hạ tầng KCN] Kiểm tra badge trạng thái "Sẵn sàng" (CMR-05)**
- Pre-condition: API trả KCN có trạng thái "Sẵn sàng".
- Steps:
  1. Kiểm tra badge trạng thái của KCN
- Expected:
  1. Badge xanh lá + chấm tròn + text "Sẵn sàng"

**TC_074 — [Hạ tầng KCN] Kiểm tra badge trạng thái "Đang quy hoạch" (CMR-05)**
- Pre-condition: API trả KCN có trạng thái "Đang quy hoạch".
- Steps:
  1. Kiểm tra badge trạng thái của KCN
- Expected:
  1. Badge vàng + chấm tròn + text "Đang quy hoạch"

**TC_075 — [Hạ tầng KCN] Kiểm tra empty state — danh sách KCN rỗng**
- Pre-condition: API trả danh sách KCN = rỗng.
- Steps:
  1. Kiểm tra hiển thị Section 5
- Expected:
  1. Hiển thị tiêu đề "Hạ tầng KCN" + bên dưới hiển thị "Không có dữ liệu"

**TC_076 — [Vị trí địa lý] Kiểm tra hiển thị bản đồ + danh sách khoảng cách — Happy path**
- Pre-condition: API trả dữ liệu bản đồ + danh sách khoảng cách.
- Steps:
  1. Cuộn đến Section 6 — Vị trí địa lý
  2. Kiểm tra hiển thị
- Expected:
  1. Tiêu đề "Vị trí địa lý": font đậm, căn trái
  2.
  - Bản đồ: thumbnail bản đồ khu vực tỉnh, full width, chiều cao cố định
  - Danh sách khoảng cách: mỗi item gồm icon pin map (xám) + mô tả địa danh (căn trái) + khoảng cách màu đỏ đậm (căn phải)
  - Khoảng cách: số nguyên + km (ví dụ: 100 km, 60 km)

**TC_077 — [Vị trí địa lý] Kiểm tra tap bản đồ → mở ứng dụng bản đồ mặc định**
- Pre-condition: Section 6 hiển thị bình thường, thiết bị có cài app bản đồ.
- Steps:
  1. Tap vào bản đồ thumbnail
  2. Kiểm tra hiển thị
- Expected:
  2. Kích hoạt geo URI scheme → Mở ứng dụng bản đồ mặc định thiết bị (Google Maps / Apple Maps / ...) với tọa độ trung tâm tỉnh

**TC_078 — [Vị trí địa lý] Kiểm tra empty state — danh sách khoảng cách rỗng**
- Pre-condition: API trả 0 item khoảng cách.
- Steps:
  1. Kiểm tra hiển thị Section 6
- Expected:
  1. Bản đồ vẫn hiển thị bình thường. Ẩn hoàn toàn danh sách khoảng cách (không hiển thị dòng nào)

**TC_079 — [Liên hệ đầu tư] Kiểm tra hiển thị thẻ liên hệ — Happy path**
- Pre-condition: API trả đầy đủ SĐT + Email.
- Steps:
  1. Cuộn đến Section 7 — Liên hệ đầu tư
  2. Kiểm tra hiển thị
- Expected:
  1. Tiêu đề "Liên hệ đầu tư": font đậm, căn trái
  2.
  - Thẻ nền cam/vàng đậm, bo góc
  - Dòng 1: Icon điện thoại + "Điện thoại" + số ĐT (ví dụ: "(84-296) 3856 606")
  - Dòng 2: Icon email + "Email" + địa chỉ email (ví dụ: "dautugiang@angiang.gov.vn")
  - Không tap được (text tĩnh)

**TC_080 — [Liên hệ đầu tư] Kiểm tra khi thiếu số điện thoại (null)**
- Pre-condition: API trả SĐT = null, Email có dữ liệu.
- Steps:
  1. Kiểm tra hiển thị thẻ liên hệ
- Expected:
  1. Hiển thị label "Điện thoại" + giá trị "--"
  - Email hiển thị bình thường

**TC_081 — [Liên hệ đầu tư] Kiểm tra khi thiếu email (null)**
- Pre-condition: API trả Email = null, SĐT có dữ liệu.
- Steps:
  1. Kiểm tra hiển thị thẻ liên hệ
- Expected:
  1. Hiển thị label "Email" + giá trị "--"
  - SĐT hiển thị bình thường

**TC_082 — [Liên hệ đầu tư] Kiểm tra khi cả SĐT và Email đều null**
- Pre-condition: API trả SĐT = null, Email = null.
- Steps:
  1. Kiểm tra hiển thị thẻ liên hệ
- Expected:
  1. Thẻ vẫn hiển thị, cả SĐT và Email đều hiển thị "--"

**TC_083 — [CTA] Kiểm tra hiển thị card CTA "Đăng ký tư vấn" — Happy path**
- Pre-condition: Tỉnh An Giang, API trả URL Cổng thông tin.
- Steps:
  1. Cuộn đến Section 8 — CTA
  2. Kiểm tra hiển thị
- Expected:
  1.
  - Card nền đỏ đậm, bo góc
  - Tiêu đề: "Bạn quan tâm đến AN GIANG?" (in hoa, trắng, đậm) — tên tỉnh động
  - Mô tả: "Nhận tư vấn đầu tư chi tiết từ chuyên gia" (trắng, font nhỏ hơn)
  2.
  - Nút [Đăng ký tư vấn ngay]: nền trắng, text đỏ đậm, bo góc, full width
  - Nút [Cổng thông tin đầu tư]: nền đỏ đậm hơn card, text trắng, bo góc, full width, nằm dưới nút trên

**TC_084 — [Nút Cổng thông tin đầu tư] Kiểm tra tap → mở link web ngoài**
- Pre-condition: API trả URL Cổng thông tin hợp lệ (ví dụ: https://angiang.gov.vn/vi/dau-tu-cong).
- Steps:
  1. Tap nút [Cổng thông tin đầu tư]
  2. Kiểm tra hiển thị
- Expected:
  2. Mở URL trên trình duyệt mặc định thiết bị, hiển thị đúng trang web

**TC_085 — [Nút Cổng thông tin đầu tư] Kiểm tra URL khác nhau theo tỉnh**
- Pre-condition: 2 tỉnh khác nhau: An Giang và Bắc Ninh.
- Steps:
  1. Xem chi tiết An Giang → tap nút [Cổng thông tin đầu tư]
  2. Quay lại, xem chi tiết Bắc Ninh → tap nút [Cổng thông tin đầu tư]
  3. So sánh URL mở ra
- Expected:
  1. Mở URL tỉnh An Giang (ví dụ: angiang.gov.vn/...)
  2. Mở URL tỉnh Bắc Ninh (ví dụ: bacninh.gov.vn/...)
  3. URL là động theo mã tỉnh, không hard-code

**TC_086 — [Nút Cổng thông tin đầu tư] Kiểm tra ẩn nút khi URL null**
- Pre-condition: API trả URL Cổng thông tin = null.
- Steps:
  1. Kiểm tra hiển thị card CTA
- Expected:
  1. Nút [Cổng thông tin đầu tư] bị ẩn hoàn toàn
  - Nút [Đăng ký tư vấn ngay] và card CTA vẫn hiển thị bình thường

**TC_087 — [Nút Đăng ký tư vấn ngay] Kiểm tra tap nút — [TBD]**
- Pre-condition: Card CTA hiển thị bình thường.
- Steps:
  1. Tap nút [Đăng ký tư vấn ngay]
  2. Kiểm tra hiển thị
- Expected:
  2. Hành vi [TBD] — chờ BA xác định luồng/màn hình đích
- Note: BLOCKED — Ref Q1

#### Giai đoạn 3 — Navigation & Interaction

**TC_088 — [Nút Quay lại ←] Kiểm tra quay về danh sách tỉnh từ chi tiết (CMR-06)**
- Pre-condition: Đang ở màn hình [Chi tiết chuyên trang] tỉnh An Giang.
- Steps:
  1. Tap nút [←] trên header
  2. Kiểm tra hiển thị
- Expected:
  2. Quay về màn hình [Danh sách tỉnh]

**TC_089 — [Pull to Refresh] Kiểm tra pull-to-refresh trên chi tiết chuyên trang (CMR-13)**
- Pre-condition: Đang ở màn hình [Chi tiết chuyên trang].
- Steps:
  1. Kéo xuống pull-to-refresh từ đầu màn hình
  2. Kiểm tra hiển thị
- Expected:
  1. Hiển thị spinner/animation
  2. Gọi lại toàn bộ API chi tiết → làm mới tất cả section. Sau khi thành công, ẩn spinner.

#### Giai đoạn 3 — Xử lý lỗi

**TC_090 — [Lỗi mạng] Kiểm tra khi mất kết nối mạng — MH2 (CMR-07)**
- Pre-condition: Đang ở danh sách tỉnh, tắt mạng.
- Steps:
  1. Tap vào tỉnh "An Giang"
  2. Kiểm tra hiển thị
- Expected:
  2. Hiển thị thông báo "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." kèm nút [Thử lại]

**TC_091 — [Lỗi API 500] Kiểm tra khi API chi tiết trả 500 — MH2 (CMR-07)**
- Pre-condition: Giả lập API chi tiết chuyên trang trả HTTP 500.
- Steps:
  1. Tap vào tỉnh "An Giang"
  2. Kiểm tra hiển thị
- Expected:
  2. Hiển thị thông báo "Hệ thống đang bận. Vui lòng thử lại sau."

**TC_092 — [Lỗi 404] Kiểm tra khi tỉnh không tồn tại (HTTP 404) (CMR-07)**
- Pre-condition: Giả lập API trả HTTP 404.
- Steps:
  1. Tap vào tỉnh → API trả 404
  2. Kiểm tra hiển thị
- Expected:
  2. Hiển thị thông báo "Nội dung không tồn tại hoặc đã bị xóa." → Quay lại danh sách tỉnh

**TC_093 — [Banner] Kiểm tra khi ảnh banner không load được (network error/404)**
- Pre-condition: Ảnh banner tỉnh trả lỗi (404 hoặc network error).
- Steps:
  1. Kiểm tra hiển thị Section 1 — Banner
- Expected:
  1. Hiển thị hình ảnh trạng thái loading (placeholder image)
  - Overlay text (tên tỉnh + tagline) vẫn hiển thị đè lên hình ảnh loading

**TC_094 — [Timeout] Kiểm tra khi API chi tiết vượt 10 giây (CMR-07, CMR-16)**
- Pre-condition: Giả lập API chi tiết phản hồi > 10 giây.
- Steps:
  1. Tap vào tỉnh "An Giang"
  2. Đợi > 10 giây
  3. Kiểm tra hiển thị
- Expected:
  3. Hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." kèm nút [Thử lại]
- Note: Ref Q5

**TC_095 — [Pull to Refresh] Kiểm tra pull-to-refresh thất bại — giữ dữ liệu cũ (CMR-13)**
- Pre-condition: Đang xem chi tiết tỉnh An Giang (có dữ liệu), tắt mạng.
- Steps:
  1. Kéo xuống pull-to-refresh
  2. Kiểm tra hiển thị
- Expected:
  1. Refresh thất bại
  2. Vẫn giữ nguyên dữ liệu cũ, hiển thị thông báo lỗi mạng (CMR-07)

#### Giai đoạn 4: Tích hợp chức năng

**TC_096 — [Dữ liệu khớp API] Kiểm tra dữ liệu hiển thị khớp 100% với API (AC1)**
- Pre-condition: Có API response cho tỉnh An Giang.
- Steps:
  1. Xem chi tiết tỉnh An Giang
  2. So sánh dữ liệu hiển thị với API response cho từng section: KPI, tổng quan, lĩnh vực, KCN, khoảng cách, liên hệ
- Expected:
  2. Dữ liệu hiển thị khớp 100% với API response — không có sai khác

**TC_097 — [Bản đồ → Tọa độ] Kiểm tra bản đồ mở đúng tọa độ tỉnh (AC2)**
- Pre-condition: API trả tọa độ trung tâm tỉnh An Giang.
- Steps:
  1. Tap bản đồ
  2. Kiểm tra tọa độ trong ứng dụng bản đồ mở ra
- Expected:
  2. Tọa độ hiển thị khớp với tọa độ trung tâm tỉnh An Giang từ API

**TC_098 — [Chuyển giữa 2 tỉnh] Kiểm tra xem chi tiết tỉnh khác**
- Pre-condition: Đang xem chi tiết "An Giang".
- Steps:
  1. Tap [←] quay lại danh sách
  2. Tap vào "Bắc Ninh"
  3. Kiểm tra hiển thị chi tiết
- Expected:
  3. Hiển thị chi tiết chuyên trang "Bắc Ninh" — header hiển thị "Bắc Ninh"
  - Dữ liệu KPI, tổng quan, KCN... là dữ liệu riêng của Bắc Ninh (khác An Giang)

**TC_099 — [CTA tên tỉnh động] Kiểm tra CTA title thay đổi theo tỉnh**
- Pre-condition: Xem chi tiết 2 tỉnh khác nhau.
- Steps:
  1. Xem chi tiết "An Giang" → kiểm tra CTA title
  2. Quay lại, xem chi tiết "Bắc Ninh" → kiểm tra CTA title
- Expected:
  1. CTA title: "Bạn quan tâm đến AN GIANG?"
  2. CTA title: "Bạn quan tâm đến BẮC NINH?"

#### Giai đoạn 5: Kiểm thử phi chức năng mức UI

**TC_100 — [Loading] Kiểm tra có skeleton/spinner cho mọi API call**
- Pre-condition: API phản hồi chậm.
- Steps:
  1. Truy cập danh sách tỉnh
  2. Tap vào 1 tỉnh
- Expected:
  1. Skeleton loading khi tải danh sách
  2. Skeleton loading từng section khi tải chi tiết

**TC_101 — [Cuộn ngang KPI] Kiểm tra thẻ KPI không tap được (read-only)**
- Pre-condition: 4 thẻ KPI hiển thị.
- Steps:
  1. Tap vào thẻ GRDP
  2. Tap vào thẻ Dân số
- Expected:
  1 & 2. Không có phản hồi, không điều hướng — thẻ KPI chỉ read-only

**TC_102 — [Chip lĩnh vực] Kiểm tra chip không tap được**
- Pre-condition: Section Lĩnh vực khuyến khích hiển thị chip list.
- Steps:
  1. Tap vào 1 chip lĩnh vực
- Expected:
  1. Không có phản hồi — chip chỉ hiển thị, không điều hướng

**TC_103 — [Card KCN] Kiểm tra card KCN không tap được**
- Pre-condition: Section KCN hiển thị danh sách.
- Steps:
  1. Tap vào 1 card KCN
- Expected:
  1. Không có phản hồi — card chỉ read-only

**TC_104 — [Danh sách khoảng cách] Kiểm tra danh sách khoảng cách không tap được**
- Pre-condition: Section Vị trí địa lý hiển thị.
- Steps:
  1. Tap vào 1 item khoảng cách
- Expected:
  1. Không có phản hồi — danh sách chỉ read-only

**TC_105 — [Thẻ liên hệ] Kiểm tra thẻ liên hệ không tap được (text tĩnh)**
- Pre-condition: Section Liên hệ đầu tư hiển thị.
- Steps:
  1. Tap vào số điện thoại
  2. Tap vào email
- Expected:
  1 & 2. Không có phản hồi — SĐT và email chỉ hiển thị dạng text tĩnh, không gọi/gửi mail

### Check common

#### [Sub-label] Kiểm tra các trường hợp phổ biến UI/UX

**TC_106 — Kiểm tra hiển thị dữ liệu tối đa (maxlength)**
- Steps: 1. Kiểm tra hiển thị dữ liệu tối đa (maxlength) trên màn hình chi tiết
- Expected: 1. Hiển thị đúng độ dài tối đa

**TC_107 — Kiểm tra khôi phục/phóng to/thu nhỏ ứng dụng**
- Steps: 1. Thực hiện khôi phục, phóng to, thu nhỏ ứng dụng
- Expected: 1. Không xảy ra lỗi bất thường

**TC_108 — Kiểm tra tính nhất quán của các thông báo**
- Steps: 1. Kiểm tra tính nhất quán của các thông báo
- Expected: 1. Xác nhận thông báo lỗi:
  - Thông báo lỗi inline: hiển thị dưới ô nhập liệu bị lỗi, màu đỏ
  - Thông báo lỗi dạng toast: hiển thị ở giữa hoặc phía dưới màn hình

**TC_109 — Kiểm tra hiển thị khi thiết bị ở chế độ dọc (thiết bị xoay theo chiều đứng)**
- Steps: 1. Kiểm tra hiển thị khi thiết bị ở chế độ dọc
- Expected: 1. Không có lỗi gì xảy ra, giao diện không bị vỡ

**TC_110 — Kiểm tra hiển thị khi thiết bị ở chế độ ngang (thiết bị xoay theo chiều ngang)**
- Steps: 1. Kiểm tra hiển thị khi thiết bị ở chế độ ngang
- Expected: 1. Không có lỗi gì xảy ra, giao diện không bị vỡ

**TC_111 — Kiểm tra hiển thị khi chuyển đổi giữa chế độ dọc và ngang**
- Steps:
  1. Kiểm tra hiển thị khi chuyển từ chế độ dọc sang ngang
  2. Kiểm tra hiển thị khi chuyển từ chế độ ngang sang dọc
- Expected: 1 & 2. Không có lỗi gì xảy ra, giao diện không bị vỡ

**TC_112 — Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất**
- Steps: 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất
- Expected: 1. Giao diện không bị vỡ

**TC_113 — Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất**
- Steps: 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất
- Expected: 1. Giao diện không bị vỡ

#### [Sub-label] Kiểm tra tương tác cơ bản với thiết bị

**TC_114 — Xác nhận hiển thị khi người dùng chạm vào nút [Quay lại] trên thiết bị Android**
- Steps:
  1. Mở ứng dụng, truy cập màn hình [Chi tiết chuyên trang]
  2. Người dùng chạm vào nút [Quay lại] trên thiết bị Android
  3. Xác nhận hiển thị
- Expected: 3. Quay lại màn hình [Danh sách tỉnh]

**TC_115 — Xác nhận hiển thị khi người dùng vuốt từ trái sang phải trên thiết bị iOS**
- Steps:
  1. Mở ứng dụng, truy cập màn hình [Chi tiết chuyên trang]
  2. Người dùng vuốt từ trái sang phải trên thiết bị iOS
  3. Xác nhận hiển thị
- Expected: 3. Quay lại màn hình [Danh sách tỉnh]

**TC_116 — Xác nhận hiển thị khi người dùng tắt và mở lại ứng dụng**
- Steps:
  1. Mở ứng dụng, truy cập màn hình [Chi tiết chuyên trang]
  2. Người dùng tắt ứng dụng
  3. Mở lại ứng dụng
  4. Xác nhận hiển thị
- Expected: 4. Ứng dụng mở lại từ trạng thái ban đầu

**TC_117 — Kiểm tra chế độ đa nhiệm (multitasking)**
- Steps:
  1. Mở ứng dụng, truy cập màn hình [Chi tiết chuyên trang]
  2. Trở về màn hình chính (không tắt ứng dụng)
  3. Mở lại ứng dụng
  4. Xác nhận hiển thị
- Expected: 4. Ứng dụng giữ nguyên ở trạng thái hiện tại (màn hình Chi tiết chuyên trang)

**TC_118 — Xác nhận hiển thị khi người dùng khóa và mở khóa màn hình thiết bị**
- Steps:
  1. Mở ứng dụng, truy cập màn hình [Chi tiết chuyên trang]
  2. Khóa thiết bị
  3. Mở khóa thiết bị
  4. Xác nhận hiển thị
- Expected: 4. Giữ nguyên trạng thái hiện tại của ứng dụng

**TC_119 — Kiểm tra hành động kéo xuống để làm mới (pull-to-refresh)**
- Pre-condition: Màn hình chi tiết hỗ trợ tính năng kéo để làm mới
- Steps:
  1. Người dùng ở màn hình [Chi tiết chuyên trang]
  2. Kéo xuống để làm mới
- Expected: 2. Hiển thị dữ liệu mới nhất của màn hình

**TC_120 — Kiểm tra hành động cuộn xuống để tải thêm (scroll-down-to-load-more)**
- Note: N/A — Màn hình chi tiết chuyên trang hiển thị toàn bộ nội dung, không lazy load

**TC_121 — Kiểm tra phản hồi khi thiết bị nhận thông báo từ ứng dụng khác**
- Pre-condition: Ứng dụng khác được phép gửi thông báo
- Steps:
  1. Người dùng mở ứng dụng, truy cập màn hình [Chi tiết chuyên trang]
  2. Ứng dụng khác gửi thông báo
  3. Xác nhận hiển thị
- Expected: 3. Không có lỗi nào xảy ra

---

## Requirement Traceability Matrix (RTM)

| AC ID | Tiêu chí chấp nhận | Test Cases liên kết | Trạng thái |
|---|---|---|---|
| AC1 | Dữ liệu hiển thị khớp 100% với API | TC_043, TC_067, TC_069, TC_072, TC_076, TC_079, TC_096 | Đã bao phủ |
| AC2 | Bản đồ mở ứng dụng mặc định + đúng tọa độ | TC_077, TC_097 | Đã bao phủ |
| AC3 | KPI format số đúng luật (K/M/B, dấu phẩy) | TC_047–TC_066 | Đã bao phủ |
| AC4 | Empty state hiển thị "Không có dữ liệu" hoặc "--" | TC_044, TC_045, TC_063–TC_066, TC_068, TC_070, TC_075, TC_078, TC_080–TC_082, TC_086 | Đã bao phủ |

### Supplementary Traceability — Business Rules

| BR | Mô tả | Test Cases | Trạng thái |
|---|---|---|---|
| BR-01 | Dữ liệu tỉnh từ API, không hard-code | TC_003 | Đã bao phủ |
| BR-02 | 63 tỉnh tải 1 lần, không lazy load | TC_002 | Đã bao phủ |
| BR-03 | Sắp xếp A–Z | TC_002 | Đã bao phủ |
| BR-04 | Tìm kiếm real-time (CMR-01) | TC_007, TC_014 | Đã bao phủ |
| BR-05 | Dữ liệu dynamic theo tỉnh | TC_085, TC_098, TC_099 | Đã bao phủ |
| BR-06 | KPI null → "--" | TC_044, TC_045 | Đã bao phủ |
| BR-07 | Section rỗng → "Không có dữ liệu" | TC_068, TC_070, TC_075 | Đã bao phủ |
| BR-08 | Khoảng cách rỗng → ẩn | TC_078 | Đã bao phủ |
| BR-09 | Liên hệ null → "--" | TC_080, TC_081, TC_082 | Đã bao phủ |
| BR-10 | URL null → ẩn nút | TC_086 | Đã bao phủ |
| BR-11 | UC55 KPI format riêng | TC_047–TC_062 | Đã bao phủ |
| BR-12 | KPI cuộn ngang | TC_046 | Đã bao phủ |
| BR-13 | Badge KCN 2 loại | TC_073, TC_074 | Đã bao phủ |

### CMR Traceability

| CMR | Test Cases | Trạng thái |
|---|---|---|
| CMR-01 (Search) | TC_007–TC_014, TC_023 | Đã bao phủ |
| CMR-05 (Badge) | TC_073, TC_074 | Đã bao phủ |
| CMR-06 (Header/Nav) | TC_004, TC_088 | Đã bao phủ |
| CMR-07 (Error) | TC_017–TC_020, TC_090–TC_094 | Đã bao phủ |
| CMR-13 (Pull to Refresh) | TC_015, TC_016, TC_089, TC_095 | Đã bao phủ |
| CMR-14 (Empty State) | TC_008, TC_068, TC_070, TC_075 | Đã bao phủ |
| CMR-16 (API Timeout 10s) | TC_020, TC_094 | Đã bao phủ |
