# UC54 — Test Cases Draft

| Thông tin | Chi tiết |
| --- | --- |
| **UC** | UC54 — Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên Mobile |
| **Ngày tạo** | 08/05/2026 |
| **Tác giả** | Claude Agent (QC TC Design) |
| **UC Spec** | v2.2 |
| **Audit** | v2 (89.1/100 — CONDITIONALLY READY) |
| **Scenarios** | v2 (93 scenarios) |

---

## Phân tích phạm vi

### Màn hình chính:
1. **Màn hình Danh sách báo cáo đã nộp** (§2.1)
2. **Màn hình Chi tiết báo cáo** (§2.2)
3. **Modal Lịch sử báo cáo** (§2.2 Modal)

### Phạm vi test (client-side only):
- UI/UX hiển thị
- Functional logic (search, filter, navigation, state persistence)
- Integration giữa các thành phần trên cùng màn hình
- Error handling phía client
- Common mobile interactions

---

## SECTION GROUP 1: Màn hình Danh sách báo cáo đã nộp

### Check UI/UX

#### TC_001 — Kiểm tra UI/UX
- **Title:** Kiểm tra UI/UX màn hình Danh sách báo cáo đã nộp
- **Pre-Condition:** Đăng nhập thành công vào ứng dụng. Điều hướng đến Sidebar → "Báo cáo đã nộp".
- **Step:**
  1. Truy cập màn hình [Danh sách báo cáo đã nộp] từ Sidebar
  2. Kiểm tra hiển thị toàn bộ màn hình
- **Expected Result:**
  2. Hiển thị đầy đủ các item, màu sắc, font chữ, layout giống Design
  (Tham khảo ảnh UC54. Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên mobile.png sheet WFDesign)

#### TC_002 — Header
- **Title:** [Header] Kiểm tra hiển thị Header màn hình Danh sách
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp].
- **Step:**
  1. Kiểm tra hiển thị Header
- **Expected Result:**
  1.
  - Hiển thị nút Quay lại (←) ở góc trái header
  - Hiển thị tiêu đề "Báo cáo đã nộp" màu trắng trên nền đỏ đậm, căn giữa

#### TC_003 — Stat Banner hiển thị
- **Title:** [Stat Banner] Kiểm tra hiển thị 6 thẻ chỉ số trạng thái
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Có dữ liệu báo cáo.
- **Step:**
  1. Kiểm tra hiển thị thanh Stat Banner
- **Expected Result:**
  1. Hiển thị đúng 6 thẻ theo thứ tự:
  - Tổng số báo cáo: nền trắng, icon xanh dương
  - Đã nộp: nền xanh dương nhạt, icon xanh dương
  - Đang xử lý: nền vàng nhạt, icon đồng hồ vàng
  - Đã duyệt: nền xanh lá nhạt, icon tích xanh
  - Yêu cầu bổ sung: nền cam nhạt, icon chấm than cam
  - Từ chối: nền đỏ nhạt, icon "X" đỏ
  - Mỗi thẻ hiển thị số lượng tương ứng, format theo CMR-11

#### TC_004 — Search Box hiển thị
- **Title:** [Ô tìm kiếm] Kiểm tra hiển thị ô tìm kiếm
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp].
- **Step:**
  1. Kiểm tra hiển thị ô tìm kiếm
- **Expected Result:**
  1.
  - Hiển thị ô tìm kiếm với placeholder "Tìm kiếm theo mã báo cáo..."
  - Icon kính lúp nằm bên trái trong ô
  - Nút "Lọc" (icon filter) nằm bên phải ô tìm kiếm, viền bo tròn

#### TC_005 — Card List hiển thị
- **Title:** [Card List] Kiểm tra hiển thị danh sách card báo cáo
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Có dữ liệu báo cáo.
- **Step:**
  1. Kiểm tra hiển thị danh sách card
- **Expected Result:**
  1. Mỗi card hiển thị đầy đủ:
  - Mã báo cáo: màu đỏ đậm, bold, tối đa 1 dòng (truncate "..." nếu quá dài)
  - Trạng thái: badge read-only với màu nền tương ứng
  - Dự án: tiền tố "Dự án: " + tên dự án, wrap text
  - Nhà đầu tư: tiền tố "Nhà đầu tư: " + tên NĐT, wrap text
  - Metadata: "Kỳ: [Giá trị] • Nộp: [DD/MM/YYYY] • [Tỉnh/Thành]"
  - Icon ">" màu xám ở góc phải card

#### TC_006 — Badge trạng thái màu sắc
- **Title:** [Badge trạng thái] Kiểm tra màu sắc badge theo từng trạng thái
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Có báo cáo ở các trạng thái khác nhau.
- **Step:**
  1. Kiểm tra badge trạng thái trên các card có trạng thái "Đã nộp"
  2. Kiểm tra badge trạng thái trên các card có trạng thái "Đang xử lý"
  3. Kiểm tra badge trạng thái trên các card có trạng thái "Đã duyệt"
  4. Kiểm tra badge trạng thái trên các card có trạng thái "Yêu cầu bổ sung"
  5. Kiểm tra badge trạng thái trên các card có trạng thái "Từ chối"
- **Expected Result:**
  1. Badge "Đã nộp" hiển thị text trên nền xanh dương nhạt, read-only
  2. Badge "Đang xử lý" hiển thị text trên nền vàng nhạt, read-only
  3. Badge "Đã duyệt" hiển thị text trên nền xanh lá nhạt, read-only
  4. Badge "Yêu cầu bổ sung" hiển thị text trên nền cam nhạt, read-only
  5. Badge "Từ chối" hiển thị text trên nền đỏ nhạt, read-only

#### TC_007 — Empty State (No data)
- **Title:** [Danh sách] Kiểm tra hiển thị khi không có dữ liệu
- **Pre-Condition:** Đăng nhập thành công bằng tài khoản không có báo cáo nào. Điều hướng đến Sidebar → "Báo cáo đã nộp".
- **Step:**
  1. Kiểm tra hiển thị màn hình Danh sách
- **Expected Result:**
  1.
  - Hiển thị "Không có dữ liệu." căn giữa vùng nội dung
  - Không có nút Thử lại
  - Stat Banner hiển thị tất cả = 0

### Check Function

#### TC_008 — Truy cập từ Sidebar
- **Title:** [Sidebar] Kiểm tra truy cập chức năng Báo cáo đã nộp
- **Pre-Condition:** Đăng nhập thành công vào ứng dụng.
- **Step:**
  1. Mở Sidebar (Left Sidebar)
  2. Tap vào mục "Báo cáo đã nộp"
- **Expected Result:**
  1. Sidebar mở hiển thị danh sách menu
  2. Chuyển đến màn hình [Danh sách báo cáo đã nộp] với Header, Stat Banner, Search/Filter, Card List

#### TC_009 — Nút Quay lại
- **Title:** [Nút Quay lại] Kiểm tra tap nút Quay lại trên Header
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp].
- **Step:**
  1. Tap nút Quay lại (←) trên Header
- **Expected Result:**
  1. Quay về màn hình trước đó

#### TC_010 — Phân quyền dữ liệu
- **Title:** [Phân quyền] Kiểm tra người dùng chỉ xem được báo cáo của chính mình
- **Pre-Condition:** Có 2 tài khoản (A và B) đều có báo cáo đã nộp.
- **Step:**
  1. Đăng nhập tài khoản A, truy cập màn hình [Danh sách báo cáo đã nộp]
  2. Ghi nhận danh sách báo cáo hiển thị
  3. Đăng xuất, đăng nhập tài khoản B
  4. Truy cập màn hình [Danh sách báo cáo đã nộp]
  5. Kiểm tra danh sách báo cáo
- **Expected Result:**
  2. Chỉ hiển thị báo cáo do tài khoản A nộp
  5. Chỉ hiển thị báo cáo do tài khoản B nộp, không lẫn dữ liệu của tài khoản A

#### TC_011 — Stat Banner read-only
- **Title:** [Stat Banner] Kiểm tra thẻ Stat Banner không thể tap
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp].
- **Step:**
  1. Tap vào thẻ "Đã nộp" trên Stat Banner
  2. Tap vào thẻ "Đang xử lý" trên Stat Banner
  3. Tap vào thẻ "Tổng số báo cáo" trên Stat Banner
- **Expected Result:**
  1-3. Không có phản hồi (không trigger filter, không highlight, không navigation). Thẻ là read-only.

#### TC_012 — Stat Banner cuộn ngang
- **Title:** [Stat Banner] Kiểm tra cuộn ngang Stat Banner
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp].
- **Step:**
  1. Swipe sang trái trên Stat Banner
  2. Swipe sang phải trên Stat Banner
- **Expected Result:**
  1. Hiển thị các thẻ bị ẩn bên phải, thẻ không bị cắt hoặc chồng chéo
  2. Quay lại hiển thị các thẻ đầu tiên

<!-- PLACEHOLDER_SEARCH_FILTER -->

#### TC_013 — Search happy path
- **Title:** [Ô tìm kiếm] Kiểm tra tìm kiếm gần đúng theo mã báo cáo
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Có báo cáo mã "BC-2026-001".
- **Step:**
  1. Tap vào ô tìm kiếm
  2. Nhập "BC-2026"
  3. Chờ 3 giây (debounce)
- **Expected Result:**
  3. Danh sách tự động cập nhật, chỉ hiển thị các card có mã chứa "BC-2026" (tìm kiếm gần đúng)

#### TC_014 — Search debounce 3s
- **Title:** [Ô tìm kiếm] Kiểm tra debounce 3 giây khi nhập liên tục
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp].
- **Step:**
  1. Tap vào ô tìm kiếm
  2. Nhập "BC" rồi tiếp tục nhập "-20" trong vòng 2 giây
  3. Kiểm tra danh sách ngay lập tức
  4. Ngừng gõ, chờ 3 giây
- **Expected Result:**
  3. Danh sách CHƯA thay đổi (debounce chưa hết)
  4. Danh sách cập nhật hiển thị kết quả tìm kiếm cho "BC-20"

#### TC_015 — Search xóa hết từ khóa
- **Title:** [Ô tìm kiếm] Kiểm tra xóa hết từ khóa trở về mặc định
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Đã tìm kiếm "BC-2026" và có kết quả.
- **Step:**
  1. Xóa hết từ khóa trong ô tìm kiếm
  2. Chờ 3 giây
- **Expected Result:**
  2. Danh sách trở về trạng thái mặc định (hiển thị tất cả báo cáo, sắp xếp theo ngày tạo giảm dần)

#### TC_016 — Search không tìm thấy
- **Title:** [Ô tìm kiếm] Kiểm tra khi không tìm thấy kết quả
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp].
- **Step:**
  1. Nhập "XYZABC999" vào ô tìm kiếm
  2. Chờ 3 giây
- **Expected Result:**
  2. Hiển thị "Không tìm thấy kết quả." căn giữa vùng nội dung. Không có nút Thử lại.

#### TC_017 — Search giới hạn 500 ký tự (BVA)
- **Title:** [Ô tìm kiếm] Kiểm tra giới hạn tối đa 500 ký tự
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp].
- **Step:**
  1. Nhập đúng 500 ký tự vào ô tìm kiếm
  2. Nhập thêm ký tự thứ 501
- **Expected Result:**
  1. Hệ thống chấp nhận, hiển thị đủ 500 ký tự
  2. Không cho phép nhập thêm, ô tìm kiếm giữ nguyên 500 ký tự

#### TC_018 — Search ký tự đặc biệt
- **Title:** [Ô tìm kiếm] Kiểm tra nhập ký tự đặc biệt
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp].
- **Step:**
  1. Nhập "@#$%^&*()" vào ô tìm kiếm
  2. Chờ 3 giây
  3. Xóa, nhập "<script>alert('xss')</script>"
  4. Chờ 3 giây
- **Expected Result:**
  2. Không crash, hiển thị "Không tìm thấy kết quả." nếu không match
  4. Không crash, không thực thi script, hiển thị "Không tìm thấy kết quả."

#### TC_019 — Search nhập chính xác mã báo cáo
- **Title:** [Ô tìm kiếm] Kiểm tra tìm kiếm khi nhập chính xác mã báo cáo
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Có báo cáo mã "BC-2026-001".
- **Step:**
  1. Tap vào ô tìm kiếm
  2. Nhập chính xác "BC-2026-001"
  3. Chờ 3 giây (debounce)
- **Expected Result:**
  3. Danh sách tự động cập nhật sau debounce 3 giây, hiển thị các card có mã chứa "BC-2026-001" (tìm kiếm gần đúng — like, theo CMR-01). Không cần nhấn Enter.

#### TC_020 — Search nhập mã báo cáo có khoảng trắng đầu/cuối
- **Title:** [Ô tìm kiếm] Kiểm tra tìm kiếm khi nhập mã báo cáo có khoảng trắng trước và sau
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Có báo cáo mã "BC-2026-001".
- **Step:**
  1. Tap vào ô tìm kiếm
  2. Nhập "  BC-2026-001  " (có khoảng trắng trước và sau từ khóa)
  3. Chờ 3 giây (debounce)
- **Expected Result:**
  3. Hệ thống auto-trim khoảng trắng đầu/cuối trước khi tìm kiếm (theo CMR-01 — Xử lý whitespace). Danh sách hiển thị kết quả tìm kiếm gần đúng cho "BC-2026-001", tương đương kết quả khi nhập không có khoảng trắng.

#### TC_021 — Search nhập 1 ký tự
- **Title:** [Ô tìm kiếm] Kiểm tra tìm kiếm khi nhập 1 ký tự vào ô tìm kiếm
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Có nhiều báo cáo với mã bắt đầu bằng "B".
- **Step:**
  1. Tap vào ô tìm kiếm
  2. Nhập "B" (1 ký tự duy nhất)
  3. Chờ 3 giây (debounce)
- **Expected Result:**
  3. Sau debounce 3 giây, danh sách tự động cập nhật hiển thị tất cả báo cáo có mã chứa ký tự "B" (tìm kiếm gần đúng — like, theo CMR-01). Không yêu cầu số ký tự tối thiểu để trigger tìm kiếm.

#### TC_022 — Filter mở Bottom Sheet
- **Title:** [Nút Lọc] Kiểm tra mở Bottom Sheet bộ lọc
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp].
- **Step:**
  1. Tap nút "Lọc" (icon filter) bên phải ô tìm kiếm
- **Expected Result:**
  1. Mở Bottom Sheet chứa:
  - Dropdown "Loại báo cáo" (mặc định "Tất cả loại báo cáo")
  - Dropdown "Trạng thái" (mặc định "Tất cả trạng thái")
  - Dropdown "Tỉnh/Thành phố" (mặc định "Tất cả tỉnh thành phố")
  - Nút "X" đóng ở góc phải trên
  - Nút "Nhập lại" (viền outline đỏ, text đỏ)
  - Nút "Áp dụng" (nền đỏ filled, text trắng)

#### TC_023 — Filter theo Loại báo cáo
- **Title:** [Filter Loại báo cáo] Kiểm tra lọc theo loại báo cáo
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Mở Bottom Sheet bộ lọc.
- **Step:**
  1. Tap dropdown "Loại báo cáo"
  2. Chọn 1 giá trị (VD: "Định kỳ")
  3. Tap nút "Áp dụng"
- **Expected Result:**
  1. Mở danh sách lựa chọn loại báo cáo
  2. Dropdown hiển thị giá trị đã chọn "Định kỳ"
  3. Đóng Bottom Sheet. Danh sách chỉ hiển thị báo cáo thuộc loại "Định kỳ"

#### TC_024 — Filter theo Trạng thái
- **Title:** [Filter Trạng thái] Kiểm tra lọc theo trạng thái
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Mở Bottom Sheet bộ lọc.
- **Step:**
  1. Tap dropdown "Trạng thái"
  2. Chọn "Đã duyệt"
  3. Tap nút "Áp dụng"
- **Expected Result:**
  2. Dropdown hiển thị "Đã duyệt"
  3. Đóng Bottom Sheet. Danh sách chỉ hiển thị báo cáo có trạng thái "Đã duyệt" (badge xanh lá nhạt)

#### TC_025 — Filter theo Tỉnh/Thành phố
- **Title:** [Filter Tỉnh/TP] Kiểm tra lọc theo tỉnh/thành phố
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Mở Bottom Sheet bộ lọc.
- **Step:**
  1. Tap dropdown "Tỉnh/Thành phố"
  2. Chọn "Hà Nội"
  3. Tap nút "Áp dụng"
- **Expected Result:**
  2. Dropdown hiển thị "Hà Nội"
  3. Đóng Bottom Sheet. Danh sách chỉ hiển thị báo cáo thuộc tỉnh/thành phố "Hà Nội"

#### TC_026 — Filter kết hợp nhiều tiêu chí
- **Title:** [Filter] Kiểm tra kết hợp nhiều tiêu chí lọc
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Mở Bottom Sheet bộ lọc.
- **Step:**
  1. Chọn "Loại báo cáo" = "Định kỳ"
  2. Chọn "Trạng thái" = "Đã duyệt"
  3. Chọn "Tỉnh/Thành phố" = "Hà Nội"
  4. Tap nút "Áp dụng"
- **Expected Result:**
  4. Đóng Bottom Sheet. Danh sách chỉ hiển thị báo cáo thỏa TẤT CẢ: loại "Định kỳ" VÀ trạng thái "Đã duyệt" VÀ tỉnh "Hà Nội"

#### TC_027 — Filter không có kết quả
- **Title:** [Filter] Kiểm tra khi bộ lọc không có kết quả phù hợp
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Mở Bottom Sheet bộ lọc.
- **Step:**
  1. Chọn tổ hợp filter mà không có báo cáo nào phù hợp
  2. Tap nút "Áp dụng"
- **Expected Result:**
  2. Đóng Bottom Sheet. Hiển thị "Không tìm thấy kết quả." căn giữa. Stat Banner vẫn hiển thị số liệu tổng.

#### TC_028 — Nút "Nhập lại" reset filter
- **Title:** [Nút Nhập lại] Kiểm tra reset bộ lọc về mặc định
- **Pre-Condition:** Đăng nhập thành công. Đang ở Bottom Sheet bộ lọc. Đã chọn giá trị cho cả 3 dropdown.
- **Step:**
  1. Tap nút "Nhập lại"
- **Expected Result:**
  1.
  - Tất cả 3 dropdown reset về mặc định ("Tất cả loại báo cáo", "Tất cả trạng thái", "Tất cả tỉnh thành phố")
  - Bottom Sheet KHÔNG đóng

#### TC_029 — Đóng Bottom Sheet bằng nút X
- **Title:** [Nút X] Kiểm tra đóng Bottom Sheet không áp dụng filter
- **Pre-Condition:** Đăng nhập thành công. Đang ở Bottom Sheet bộ lọc. Đã chọn giá trị filter mới.
- **Step:**
  1. Tap nút "X" ở góc phải trên Bottom Sheet
  2. Kiểm tra danh sách
- **Expected Result:**
  1. Đóng Bottom Sheet
  2. Danh sách KHÔNG thay đổi (giữ nguyên kết quả trước khi mở Bottom Sheet)

#### TC_030 — Đóng Bottom Sheet tap vùng ngoài
- **Title:** [Bottom Sheet] Kiểm tra đóng khi tap vùng ngoài
- **Pre-Condition:** Đăng nhập thành công. Đang ở Bottom Sheet bộ lọc.
- **Step:**
  1. Tap vào vùng ngoài Bottom Sheet (overlay)
  2. Kiểm tra danh sách
- **Expected Result:**
  1. Đóng Bottom Sheet
  2. Danh sách KHÔNG thay đổi

#### TC_031 — Dropdown searchable
- **Title:** [Dropdown] Kiểm tra tìm kiếm trong dropdown
- **Pre-Condition:** Đăng nhập thành công. Đang ở Bottom Sheet bộ lọc.
- **Step:**
  1. Tap dropdown "Tỉnh/Thành phố"
  2. Nhập "Hà" vào ô tìm kiếm trong dropdown
  3. Kiểm tra danh sách options
  4. Tap chọn "Hà Nội"
- **Expected Result:**
  2. Danh sách options lọc theo từ khóa "Hà" (tìm kiếm gần đúng)
  3. Options sắp xếp A-Z
  4. Dropdown đóng, hiển thị "Hà Nội" đã chọn

#### TC_032 — Active filter indicator
- **Title:** [Filter indicator] Kiểm tra hiển thị indicator khi có filter active
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp].
- **Step:**
  1. Kiểm tra icon filter khi chưa có filter active
  2. Mở Bottom Sheet, chọn Trạng thái = "Đã duyệt", tap "Áp dụng"
  3. Kiểm tra icon filter
  4. Mở Bottom Sheet, tap "Nhập lại", tap "Áp dụng"
  5. Kiểm tra icon filter
- **Expected Result:**
  1. Icon filter không có indicator
  3. Icon filter hiển thị indicator màu xanh lá cây ở góc phải trên
  5. Icon filter ẩn indicator (không còn filter active)

#### TC_033 — Search + Filter kết hợp
- **Title:** [Search + Filter] Kiểm tra kết hợp tìm kiếm và bộ lọc
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp].
- **Step:**
  1. Nhập "BC-2026" vào ô tìm kiếm, chờ 3 giây
  2. Tap nút "Lọc", chọn Trạng thái = "Đã duyệt", tap "Áp dụng"
  3. Kiểm tra danh sách
- **Expected Result:**
  3. Danh sách chỉ hiển thị báo cáo có mã chứa "BC-2026" VÀ trạng thái "Đã duyệt"

#### TC_034 — State Persistence vào chi tiết quay lại
- **Title:** [State Persistence] Kiểm tra giữ search/filter khi vào chi tiết rồi quay lại
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Đã search "BC-2026" và filter Trạng thái = "Đã duyệt".
- **Step:**
  1. Tap vào 1 card để xem chi tiết
  2. Tap nút Quay lại (←)
  3. Kiểm tra ô tìm kiếm và danh sách
- **Expected Result:**
  3.
  - Ô tìm kiếm vẫn hiển thị "BC-2026"
  - Danh sách vẫn giữ nguyên kết quả filter trước đó
  - Vị trí cuộn giữ nguyên

#### TC_035 — State Reset chuyển Sidebar
- **Title:** [State Reset] Kiểm tra reset khi chuyển mục Sidebar
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Đã search/filter.
- **Step:**
  1. Mở Sidebar, chuyển sang mục khác
  2. Mở Sidebar, quay lại "Báo cáo đã nộp"
  3. Kiểm tra ô tìm kiếm và danh sách
- **Expected Result:**
  3.
  - Ô tìm kiếm trống (placeholder hiển thị)
  - Danh sách hiển thị toàn bộ báo cáo (mặc định)
  - Filter reset về "Tất cả"

#### TC_036 — Tap card điều hướng chi tiết
- **Title:** [Card] Kiểm tra tap card điều hướng đến Chi tiết
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Có dữ liệu.
- **Step:**
  1. Tap vào vùng giữa card đầu tiên
  2. Quay lại, tap vào icon ">" của card thứ hai
- **Expected Result:**
  1. Chuyển sang màn hình [Chi tiết báo cáo] của báo cáo tương ứng
  2. Chuyển sang màn hình [Chi tiết báo cáo] của báo cáo thứ hai

#### TC_037 — Debounce double-tap card
- **Title:** [Card] Kiểm tra debounce khi double-tap card
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Có dữ liệu.
- **Step:**
  1. Tap nhanh liên tục 2 lần (double-tap) vào 1 card
- **Expected Result:**
  1. Chỉ mở 1 màn hình Chi tiết (không mở 2 màn hình trùng lặp)

#### TC_038 — Sắp xếp mặc định
- **Title:** [Danh sách] Kiểm tra sắp xếp mặc định theo ngày tạo giảm dần
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Có nhiều báo cáo với ngày tạo khác nhau.
- **Step:**
  1. Kiểm tra thứ tự các card trong danh sách
- **Expected Result:**
  1. Danh sách sắp xếp theo ngày tạo giảm dần (báo cáo mới nhất ở đầu)

#### TC_039 — Lazy Load 20 bản ghi
- **Title:** [Lazy Load] Kiểm tra tải 20 bản ghi/lần
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp]. Có >20 báo cáo.
- **Step:**
  1. Kiểm tra số lượng card hiển thị ban đầu
  2. Cuộn đến cuối danh sách
  3. Kiểm tra hiển thị
- **Expected Result:**
  1. Hiển thị 20 card đầu tiên
  2. Loading indicator hiển thị ở cuối danh sách
  3. Tải thêm 20 card tiếp theo, loading indicator ẩn

#### TC_040 — Lazy Load hết dữ liệu
- **Title:** [Lazy Load] Kiểm tra khi đã tải hết dữ liệu
- **Pre-Condition:** Đăng nhập thành công. Có tổng 25 báo cáo. Đã tải trang 1 (20 bản ghi) và trang 2 (5 bản ghi).
- **Step:**
  1. Cuộn đến cuối danh sách (sau khi đã tải hết)
- **Expected Result:**
  1. Không hiển thị loading indicator, không gọi API thêm

#### TC_041 — Pull-to-Refresh
- **Title:** [Pull-to-Refresh] Kiểm tra kéo xuống refresh danh sách
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp].
- **Step:**
  1. Kéo xuống từ đầu danh sách
  2. Kiểm tra hiển thị
- **Expected Result:**
  1. Spinner hiển thị ở đầu danh sách
  2. Sau khi refresh thành công: danh sách cập nhật, spinner ẩn

#### TC_042 — Error mất mạng
- **Title:** [Error] Kiểm tra hiển thị khi mất kết nối mạng
- **Pre-Condition:** Đăng nhập thành công. Tắt kết nối mạng.
- **Step:**
  1. Truy cập màn hình [Danh sách báo cáo đã nộp]
- **Expected Result:**
  1. Hiển thị "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại." kèm nút "Thử lại". Giữ nguyên màn hình.

#### TC_043 — Error API 500
- **Title:** [Error] Kiểm tra hiển thị khi API trả về lỗi 500
- **Pre-Condition:** Đăng nhập thành công. API trả về HTTP 500.
- **Step:**
  1. Truy cập màn hình [Danh sách báo cáo đã nộp]
- **Expected Result:**
  1. Hiển thị "Hệ thống đang bận. Vui lòng thử lại sau." Không có nút Thử lại.

#### TC_044 — Error Timeout
- **Title:** [Error] Kiểm tra hiển thị khi API timeout >10 giây
- **Pre-Condition:** Đăng nhập thành công. API không phản hồi trong 10 giây.
- **Step:**
  1. Truy cập màn hình [Danh sách báo cáo đã nộp]
  2. Chờ >10 giây
- **Expected Result:**
  2. Hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." kèm nút "Thử lại"

#### TC_045 — Error Session hết hạn (401)
- **Title:** [Error] Kiểm tra xử lý session hết hạn
- **Pre-Condition:** Access token đã hết hạn. Refresh token còn hợp lệ (<15 ngày).
- **Step:**
  1. Truy cập màn hình [Danh sách báo cáo đã nộp]
- **Expected Result:**
  1. Hệ thống tự động dùng refresh token cấp lại access token mới. Màn hình load bình thường.

#### TC_046 — Error Refresh token hết hạn
- **Title:** [Error] Kiểm tra khi refresh token hết hạn (>15 ngày)
- **Pre-Condition:** Access token hết hạn. Refresh token hết hạn (>15 ngày).
- **Step:**
  1. Truy cập màn hình [Danh sách báo cáo đã nộp]
- **Expected Result:**
  1. Redirect về màn hình đăng nhập + toast "Phiên đăng nhập hết hạn."

#### TC_047 — Loading state first-load
- **Title:** [Loading] Kiểm tra loading state toàn màn hình cho first-load
- **Pre-Condition:** Đăng nhập thành công.
- **Step:**
  1. Truy cập màn hình [Danh sách báo cáo đã nộp] lần đầu
  2. Kiểm tra hiển thị trong lúc chờ dữ liệu
- **Expected Result:**
  2. Hiển thị loading state toàn màn hình (full-screen loading overlay)

#### TC_048 — Real-time sync Web→Mobile
- **Title:** [Real-time] Kiểm tra đồng bộ khi trạng thái thay đổi trên Web
- **Pre-Condition:** Đăng nhập thành công trên Mobile. Đang ở màn hình [Danh sách báo cáo đã nộp]. Có báo cáo trạng thái "Đang xử lý".
- **Step:**
  1. Trên Web: thay đổi trạng thái báo cáo từ "Đang xử lý" → "Đã duyệt"
  2. Kiểm tra Mobile (không pull-to-refresh)
- **Expected Result:**
  2. Badge trạng thái trên card tự cập nhật từ vàng nhạt → xanh lá nhạt. Stat Banner count thay đổi tương ứng.

#### TC_049 — Mất kết nối khi đang xem
- **Title:** [Offline] Kiểm tra mất kết nối khi đang xem danh sách
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp] với dữ liệu đã load.
- **Step:**
  1. Tắt kết nối mạng
  2. Kiểm tra hiển thị
- **Expected Result:**
  2. Giữ nguyên dữ liệu cũ trên màn hình + hiển thị thông báo lỗi mạng (CMR-07)

#### TC_050 — Khôi phục kết nối
- **Title:** [Reconnect] Kiểm tra khôi phục kết nối sau khi mất mạng
- **Pre-Condition:** Đang ở màn hình [Danh sách báo cáo đã nộp]. Đã mất kết nối và hiển thị lỗi mạng.
- **Step:**
  1. Bật lại kết nối mạng
  2. Kiểm tra hiển thị
  3. Pull-to-refresh
- **Expected Result:**
  2. Hiển thị thông báo khôi phục kết nối
  3. Danh sách và Stat Banner cập nhật dữ liệu mới nhất

<!-- PLACEHOLDER_SECTION2 -->

### Check common

#### Sub-label: Kiểm tra các trường hợp phổ biến UI/UX

#### TC_051
- **Title:** Kiểm tra hiển thị dữ liệu tối đa (maxlength)
- **Step:** 1. Kiểm tra hiển thị dữ liệu tối đa (maxlength)
- **Expected Result:** 1. Hiển thị đúng độ dài tối đa

#### TC_052
- **Title:** Kiểm tra khôi phục/phóng to/thu nhỏ ứng dụng
- **Step:** 1. Thực hiện khôi phục, phóng to, thu nhỏ ứng dụng
- **Expected Result:** 1. Không xảy ra lỗi bất thường

#### TC_053
- **Title:** Kiểm tra tính nhất quán của các thông báo
- **Step:** 1. Kiểm tra tính nhất quán của các thông báo
- **Expected Result:** 1. Xác nhận thông báo lỗi:
  - Thông báo lỗi inline: hiển thị dưới ô nhập liệu bị lỗi, màu đỏ
  - Thông báo lỗi dạng toast: hiển thị ở giữa hoặc phía dưới màn hình

#### TC_054
- **Title:** Kiểm tra hiển thị khi thiết bị ở chế độ dọc
- **Step:** 1. Kiểm tra hiển thị khi thiết bị ở chế độ dọc
- **Expected Result:** 1. Không có lỗi gì xảy ra, giao diện không bị vỡ

#### TC_055
- **Title:** Kiểm tra hiển thị khi thiết bị ở chế độ ngang
- **Step:** 1. Kiểm tra hiển thị khi thiết bị ở chế độ ngang
- **Expected Result:** 1. Không có lỗi gì xảy ra, giao diện không bị vỡ

#### TC_056
- **Title:** Kiểm tra hiển thị khi chuyển đổi giữa chế độ dọc và ngang
- **Step:** 1. Kiểm tra hiển thị khi chuyển từ chế độ dọc sang ngang
  2. Kiểm tra hiển thị khi chuyển từ chế độ ngang sang dọc
- **Expected Result:** 1 & 2. Không có lỗi gì xảy ra, giao diện không bị vỡ

#### TC_057
- **Title:** Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất
- **Step:** 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ lớn nhất
- **Expected Result:** 1. Giao diện không bị vỡ

#### TC_058
- **Title:** Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất
- **Step:** 1. Kiểm tra hiển thị khi thiết bị sử dụng cỡ chữ nhỏ nhất
- **Expected Result:** 1. Giao diện không bị vỡ

#### Sub-label: Kiểm tra tương tác cơ bản với thiết bị

#### TC_059
- **Title:** Xác nhận hiển thị khi nhấn nút [Quay lại] trên thiết bị Android
- **Step:** 1. Mở ứng dụng
  2. Người dùng chạm vào nút [Quay lại] trên thiết bị Android
  3. Xác nhận hiển thị
- **Expected Result:** 3. Quay lại màn hình trước đó

#### TC_060
- **Title:** Xác nhận hiển thị khi vuốt từ trái sang phải trên iOS
- **Step:** 1. Mở ứng dụng
  2. Người dùng vuốt từ trái sang phải trên thiết bị iOS
  3. Xác nhận hiển thị
- **Expected Result:** 3. Quay lại màn hình trước đó

#### TC_061
- **Title:** Xác nhận hiển thị khi tắt và mở lại ứng dụng
- **Step:** 1. Mở ứng dụng
  2. Tắt ứng dụng
  3. Mở lại ứng dụng
  4. Xác nhận hiển thị
- **Expected Result:** 4. Ứng dụng quay về Trang chủ, giữ nguyên session đăng nhập (CMR-18)

#### TC_062
- **Title:** Kiểm tra chế độ đa nhiệm (multitasking)
- **Step:** 1. Mở ứng dụng
  2. Trở về màn hình chính (không tắt ứng dụng)
  3. Mở lại ứng dụng
  4. Xác nhận hiển thị
- **Expected Result:** 4. Ứng dụng giữ nguyên ở trạng thái hiện tại

#### TC_063
- **Title:** Xác nhận hiển thị khi khóa và mở khóa màn hình
- **Step:** 1. Mở ứng dụng
  2. Khóa thiết bị
  3. Mở khóa thiết bị
  4. Xác nhận hiển thị
- **Expected Result:** 4. Giữ nguyên trạng thái hiện tại của ứng dụng

#### TC_064
- **Title:** Kiểm tra hành động kéo xuống để làm mới (pull-to-refresh)
- **Pre-Condition:** Màn hình hỗ trợ tính năng kéo để làm mới
- **Step:** 1. Người dùng ở màn hình hiện tại
  2. Kéo xuống để làm mới
- **Expected Result:** 2. Hiển thị dữ liệu mới nhất của màn hình

#### TC_065
- **Title:** Kiểm tra hành động cuộn xuống để tải thêm (scroll-down-to-load-more)
- **Pre-Condition:** Màn hình hỗ trợ tính năng cuộn xuống để tải thêm
- **Step:** 1. Người dùng cuộn xuống cuối danh sách
- **Expected Result:** 1. Hiển thị thêm dữ liệu mới (20 bản ghi tiếp theo)

#### TC_066
- **Title:** Kiểm tra phản hồi khi nhận thông báo từ ứng dụng khác
- **Pre-Condition:** Ứng dụng khác được phép gửi thông báo
- **Step:** 1. Mở ứng dụng
  2. Ứng dụng khác gửi thông báo
  3. Xác nhận hiển thị
- **Expected Result:** 3. Không có lỗi nào xảy ra

---

## SECTION GROUP 2: Màn hình Chi tiết báo cáo

### Check UI/UX

#### TC_067 — UI Chi tiết
- **Title:** Kiểm tra UI/UX màn hình Chi tiết báo cáo
- **Pre-Condition:** Đăng nhập thành công. Tap vào 1 card từ màn hình Danh sách.
- **Step:**
  1. Kiểm tra hiển thị toàn bộ màn hình [Chi tiết báo cáo]
- **Expected Result:**
  1. Hiển thị đầy đủ các item, màu sắc, font chữ, layout giống Design
  (Tham khảo ảnh UC54 sheet WFDesign)

#### TC_068 — Header Chi tiết
- **Title:** [Header] Kiểm tra hiển thị Header Chi tiết
- **Pre-Condition:** Đang ở màn hình [Chi tiết báo cáo].
- **Step:**
  1. Kiểm tra hiển thị Header
- **Expected Result:**
  1.
  - Nút Quay lại (←) ở góc trái
  - Tiêu đề "Chi tiết báo cáo" màu trắng trên nền đỏ đậm, căn giữa

#### TC_069 — Banner chính
- **Title:** [Banner chính] Kiểm tra hiển thị Banner chính (nền đỏ)
- **Pre-Condition:** Đang ở màn hình [Chi tiết báo cáo].
- **Step:**
  1. Kiểm tra hiển thị Banner chính
- **Expected Result:**
  1.
  - Mã báo cáo: size lớn, bold, wrap text
  - Trạng thái badge: màu nền đúng theo mapping (xanh dương nhạt/vàng nhạt/xanh lá nhạt/cam nhạt/đỏ nhạt)
  - Mô tả trạng thái: wrap text

#### TC_070 — 7 Sections collapsible
- **Title:** [Sections] Kiểm tra 7 section hiển thị mặc định mở
- **Pre-Condition:** Đang ở màn hình [Chi tiết báo cáo].
- **Step:**
  1. Kiểm tra trạng thái 7 section (§2.2.3 → §2.2.9)
- **Expected Result:**
  1. Tất cả 7 section ở trạng thái MỞ (expanded) khi mới vào chi tiết

### Check Function

#### TC_071 — Nút Quay lại Chi tiết
- **Title:** [Nút Quay lại] Kiểm tra quay về Danh sách từ Chi tiết
- **Pre-Condition:** Đang ở màn hình [Chi tiết báo cáo].
- **Step:**
  1. Tap nút Quay lại (←)
- **Expected Result:**
  1. Quay về màn hình [Danh sách báo cáo đã nộp]

#### TC_072 — Section collapsible toggle
- **Title:** [Section] Kiểm tra đóng/mở section
- **Pre-Condition:** Đang ở màn hình [Chi tiết báo cáo]. Tất cả section đang mở.
- **Step:**
  1. Tap header Section 1 "Thông tin dự án"
  2. Kiểm tra Section 1
  3. Kiểm tra các section khác (2-7)
  4. Tap lại header Section 1
- **Expected Result:**
  2. Section 1 thu gọn (collapsed)
  3. Các section khác vẫn giữ nguyên trạng thái MỞ (không bị ảnh hưởng)
  4. Section 1 mở lại (expanded)

#### TC_073 — Section 1: Thông tin dự án
- **Title:** [Section 1] Kiểm tra hiển thị Thông tin dự án
- **Pre-Condition:** Đang ở màn hình [Chi tiết báo cáo]. Báo cáo có dữ liệu đầy đủ.
- **Step:**
  1. Kiểm tra Section 1 "Thông tin dự án"
- **Expected Result:**
  1. Hiển thị field "Tên dự án" (read-only, wrap text)

#### TC_074 — Section 2: Thông tin chung
- **Title:** [Section 2] Kiểm tra hiển thị Thông tin chung
- **Pre-Condition:** Đang ở màn hình [Chi tiết báo cáo].
- **Step:**
  1. Kiểm tra Section 2 "Thông tin chung"
- **Expected Result:**
  1. Hiển thị:
  - Thời gian báo cáo (read-only, wrap text)
  - Cơ quan tiếp nhận (read-only, wrap text)

#### TC_075 — Section 3: Thông tin nhà đầu tư
- **Title:** [Section 3] Kiểm tra hiển thị Thông tin nhà đầu tư
- **Pre-Condition:** Đang ở màn hình [Chi tiết báo cáo].
- **Step:**
  1. Kiểm tra Section 3 "Thông tin nhà đầu tư"
- **Expected Result:**
  1. Hiển thị 4 field (read-only):
  - Mã số dự án
  - Ngày cấp (DD/MM/YYYY)
  - Ngày điều chỉnh (DD/MM/YYYY)
  - Tên công ty (wrap text)

#### TC_076 — Section 4: Tình hình thực hiện
- **Title:** [Section 4] Kiểm tra hiển thị bảng Tình hình thực hiện
- **Pre-Condition:** Đang ở màn hình [Chi tiết báo cáo].
- **Step:**
  1. Kiểm tra Section 4 "Tình hình thực hiện"
- **Expected Result:**
  1. Hiển thị bảng read-only:
  - 4 hàng: Máy móc thiết bị, Nguyên vật liệu, Lợi nhuận, Khác
  - 3 cột: Vốn chuyển ra, Tiền chuyển về, Dự báo
  - Số liệu format theo CMR-11 (dấu phẩy phân tách hàng nghìn)

#### TC_077 — Section 5: Tiến độ dự án
- **Title:** [Section 5] Kiểm tra hiển thị Tiến độ dự án
- **Pre-Condition:** Đang ở màn hình [Chi tiết báo cáo].
- **Step:**
  1. Kiểm tra Section 5 "Tiến độ dự án"
- **Expected Result:**
  1. Hiển thị:
  - Trạng thái (Đúng tiến độ/Chậm) — read-only, wrap text
  - Lý do (nếu có) — read-only, wrap text

#### TC_078 — Section 6: Tình hình hoạt động
- **Title:** [Section 6] Kiểm tra hiển thị Tình hình hoạt động
- **Pre-Condition:** Đang ở màn hình [Chi tiết báo cáo].
- **Step:**
  1. Kiểm tra Section 6 "Tình hình hoạt động"
- **Expected Result:**
  1. Hiển thị "Nội dung mô tả" — read-only, wrap text

#### TC_079 — Section 7: Ký xác nhận
- **Title:** [Section 7] Kiểm tra hiển thị Ký xác nhận
- **Pre-Condition:** Đang ở màn hình [Chi tiết báo cáo].
- **Step:**
  1. Kiểm tra Section 7 "Ký xác nhận"
- **Expected Result:**
  1. Hiển thị 3 field (read-only):
  - Nơi ký (wrap text)
  - Ngày ký (DD/MM/YYYY)
  - Người ký (wrap text)

#### TC_080 — Field null hiển thị "-"
- **Title:** [Chi tiết] Kiểm tra field null hiển thị "-"
- **Pre-Condition:** Đang ở màn hình [Chi tiết báo cáo]. Báo cáo có một số field null.
- **Step:**
  1. Kiểm tra các field có giá trị null trong 7 section
- **Expected Result:**
  1. Tất cả field null hiển thị "-" (không để trống, không hiện N/A)

#### TC_081 — Nút Lịch sử báo cáo
- **Title:** [Nút Lịch sử] Kiểm tra tap nút "Lịch sử báo cáo"
- **Pre-Condition:** Đang ở màn hình [Chi tiết báo cáo].
- **Step:**
  1. Tap nút "Lịch sử báo cáo" (nền xanh dương, icon đồng hồ)
- **Expected Result:**
  1. Mở Modal "Lịch sử báo cáo"

#### TC_082 — Modal Lịch sử hiển thị
- **Title:** [Modal Lịch sử] Kiểm tra hiển thị Modal Lịch sử báo cáo
- **Pre-Condition:** Đang ở Modal "Lịch sử báo cáo". Báo cáo có ≥3 bước xử lý.
- **Step:**
  1. Kiểm tra hiển thị Modal
- **Expected Result:**
  1. Hiển thị danh sách bước xử lý, mỗi bước gồm:
  - Bước xử lý (tên) — wrap text
  - Tên người xử lý — wrap text
  - Thời gian xử lý (HH:mm DD/MM/YYYY)
  - Sắp xếp theo thời gian giảm dần (mới nhất ở trên)

#### TC_083 — Đa ngôn ngữ
- **Title:** [Đa ngôn ngữ] Kiểm tra text cứng thay đổi theo ngôn ngữ
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp].
- **Step:**
  1. Chuyển ngôn ngữ sang Tiếng Anh
  2. Kiểm tra các text cứng (header, labels, placeholder, nút, thông báo)
  3. Kiểm tra nội dung dữ liệu (tên dự án, tên NĐT)
- **Expected Result:**
  2. Các text cứng thay đổi sang Tiếng Anh
  3. Nội dung dữ liệu giữ nguyên (không dịch)

#### TC_084 — Force close giữ session
- **Title:** [Session] Kiểm tra force close app giữ session
- **Pre-Condition:** Đăng nhập thành công. Đang ở màn hình [Danh sách báo cáo đã nộp].
- **Step:**
  1. Force close app
  2. Mở lại app
- **Expected Result:**
  2. App quay về Trang chủ. Session đăng nhập giữ nguyên (không yêu cầu đăng nhập lại)

#### TC_085 — Uninstall yêu cầu đăng nhập lại
- **Title:** [Session] Kiểm tra uninstall app yêu cầu đăng nhập lại
- **Pre-Condition:** Đăng nhập thành công.
- **Step:**
  1. Xóa app (uninstall)
  2. Cài đặt lại app
  3. Mở app
- **Expected Result:**
  3. Yêu cầu đăng nhập lại từ đầu (không restore session cũ)

### Check common (Màn hình Chi tiết)

#### Sub-label: Kiểm tra các trường hợp phổ biến UI/UX

#### TC_086 — TC_093
(Tương tự TC_051 → TC_058 cho màn hình Chi tiết)

#### Sub-label: Kiểm tra tương tác cơ bản với thiết bị

#### TC_094 — TC_101
(Tương tự TC_059 → TC_066 cho màn hình Chi tiết, TC_064 pull-to-refresh = N/A, TC_065 scroll-to-load = N/A)

---

## Bước 3: Requirement Traceability Matrix (RTM)

| AC ID | Tiêu chí chấp nhận | Test Cases liên kết | Trạng thái |
|---|---|---|---|
| AC1 | Stat Banner hiển thị đúng 6 chỉ số, count + format CMR-11 | TC_003, TC_008, TC_011, TC_012 | ✅ Đã bao phủ |
| AC2 | Card hiển thị đầy đủ: Mã BC, Badge, Dự án, NĐT, Metadata | TC_005, TC_006, TC_034, TC_037, TC_038 | ✅ Đã bao phủ |
| AC3 | Tap card → Chi tiết | TC_036, TC_037 | ✅ Đã bao phủ |
| AC4 | Chi tiết hiển thị 7 section | TC_070, TC_072-TC_079 | ✅ Đã bao phủ |
| AC5 | Modal Lịch sử hiển thị đúng | TC_081, TC_082 | ✅ Đã bao phủ |

### CMR Coverage:
| CMR | Mô tả | Test Cases |
|---|---|---|
| CMR-01 | Search Box | TC_013-TC_021 |
| CMR-02 | Filter | TC_022-TC_035 |
| CMR-03 | Dropdown | TC_034 |
| CMR-04 | Lazy Load | TC_039, TC_040, TC_065 |
| CMR-05 | Badge trạng thái | TC_006 |
| CMR-06 | Header & Navigation | TC_002, TC_009, TC_068, TC_071 |
| CMR-07 | Error handling | TC_042-TC_047, TC_049 |
| CMR-11 | Format số | TC_003, TC_076 |
| CMR-12 | Format thời gian | TC_037, TC_075, TC_082 |
| CMR-13 | Pull-to-Refresh | TC_041, TC_050, TC_064 |
| CMR-14 | Empty State | TC_007, TC_016, TC_027 |
| CMR-16 | Timeout 10s | TC_044 |
| CMR-17 | Đa ngôn ngữ | TC_083 |
| CMR-18 | Debounce & Session | TC_037, TC_061, TC_084, TC_085 |
