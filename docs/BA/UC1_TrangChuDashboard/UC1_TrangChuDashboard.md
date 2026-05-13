# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG

**Tiêu đề:** UC1 — Màn hình Trang chủ (Dashboard) Mobile
**Ngày tạo:** 29/04/2026
**Phiên bản:** v4.1

| Thuộc tính              | Giá trị                                 |
| ------------------------- | ----------------------------------------- |
| BA phụ trách            | han.luong & huy.lai2                      |
| Phân hệ                 | Ứng dụng Di động (Mobile App)         |
| Loại chức năng         | Điều hướng & Tổng quan               |
| Đối tượng thực hiện | Cá nhân / Tổ chức (đã đăng nhập) |
| Giao diện                | Màn hình Mobile (Portrait)              |
| Ngày tạo                | 29/04/2026                                |
| Phiên bản               | v4                                        |

---

## UC1 — Màn hình Trang chủ (Dashboard) Mobile

### 1. Mô tả chức năng

**Tên chức năng:** Màn hình Trang chủ Mobile
**Mô tả:** Màn hình chính được hiển thị ngay sau khi người dùng đăng nhập thành công. Cung cấp tổng quan thông tin tài khoản và các lối tắt điều hướng nhanh (Quick Access) đến các chức năng chính của ứng dụng.
**Phân quyền:** Toàn bộ người dùng đã đăng nhập.
**Áp dụng cho tất cả users/roles:** Nội dung trang chủ (Header, Card thông tin, Quick Access, Tin tức, Footer) luôn giống nhau giữa các users/roles bao gồm: Nhà đầu tư Việt Nam, Nhà đầu tư nước ngoài, Tổ chức/Doanh nghiệp.
**Truy cập chức năng:** Mở ứng dụng → Đăng nhập thành công → Tự động điều hướng về Trang chủ.
**Chức năng đáp ứng usecase số:** UC1 (Phụ lục XIV — STT 1 — Màn hình trang chủ)

---

### 2. Mô tả giao diện

#### 2.1 Giao diện Trang chủ (Dashboard)

**Mô tả giao diện:**Màn hình chính của ứng dụng sau khi đăng nhập. Bố cục theo chiều dọc từ trên xuống dưới:

1. Header điều hướng
2. Card Thông tin người dùng
3. Quick Access (Truy cập nhanh)
4. Tin tức
5. Footer (Bottom Navigation)

**Khung Header:**

| # | Tên trường            | Kiểu trường       | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| - | ------------------------ | -------------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 | Nút Hamburger (☰)      | Button (Icon)        | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Header Trang chủ có cấu trúc gồm các thành phần từ trái sang phải: Hamburger (☰), Logo + Tiêu đề trang, Icon Ngôn ngữ, Icon Thông báo (🔔), Icon Người dùng.`<br>`- Nút Hamburger luôn nằm ở góc trái header.`<br><br>`**Quy tắc hành động:**`<br>`- **Tap:** Mở Sidebar Navigation từ bên trái màn hình.`<br>`- Sidebar chứa toàn bộ menu điều hướng chính của ứng dụng. Danh sách menu: Trang chủ, Giới thiệu, Lĩnh vực đầu tư, Khu vực đầu tư, Liên hệ, Thủ tục hành chính, Quản lý hồ sơ, Quản lý đặt lịch, Phản ánh kiến nghị, Cấu hình tài khoản.`<br>`- **Tap vào item trong Sidebar:** Đóng Sidebar và điều hướng đến màn hình tương ứng.`<br>`- **Tap vào vùng mờ bên ngoài Sidebar:** Đóng Sidebar mà không điều hướng.`<br>`- **Multi-language:** Sidebar hỗ trợ hiển thị đa ngôn ngữ (chi tiết tại UC CMR về Sidebar Navigation). |
| 2 | Tiêu đề trang         | Image + Label        | "Cổng Đầu Tư"     | -           | —         | **Quy tắc hiển thị:**`<br>`- Bao gồm App Logo (Icon vuông đỏ với tòa nhà) và dòng chữ "Cổng Đầu Tư".`<br>`- Nằm ngay sát bên phải nút Hamburger.`<br><br>`**Quy tắc hành động:**`<br>`- Không tap được.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 3 | Chuyển đổi ngôn ngữ | Button (Icon + Text) | "VI"                  | -           | —         | **Quy tắc hiển thị:**`<br>`- Nằm ở cụm tính năng bên phải, gồm Icon quả địa cầu và text mã ngôn ngữ hiện tại (VD: "VI"). Mã ngôn ngữ: Tiếng Việt (VI), English (EN), 中文 (ZH), 日本語 (JA), 한국어 (KO).`<br><br>`**Quy tắc hành động:**`<br>`- **Tap:** Mở popup (Bottom Sheet / Dropdown) "Chọn ngôn ngữ" hiển thị danh sách các ngôn ngữ: Tiếng Việt, English, 中文, 日本語, 한국어.`<br>`- Ngôn ngữ đang chọn được đánh dấu check màu đỏ.`<br>`- Tap vào ngôn ngữ khác → Áp dụng ngôn ngữ đó cho toàn hệ thống, cập nhật mã trên Header và đóng popup. **Lưu ý:** Ngôn ngữ được lưu vào server/user profile, không bị reset khi đóng và mở lại ứng dụng. Khi chuyển ngôn ngữ, dữ liệu Tin tức được tải lại và hiển thị các tin tức của ngôn ngữ mới (không dùng cache ngôn ngữ cũ).`<br>`- Tap vào ngôn ngữ hiện tại → Đóng popup, không thay đổi ngôn ngữ hệ thống.          |
| 4 | Icon Thông báo (🔔)    | Button (Icon)        | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Nằm bên phải Icon ngôn ngữ.`<br>`- Hiển thị red dot (chấm đỏ, không kèm số) ở góc phải trên icon nếu có thông báo chưa đọc.`<br>`- Không hiển thị red dot nếu không có thông báo chưa đọc.`<br>`- **Cơ chế cập nhật:** Red dot được cập nhật theo cơ chế polling 30 giây/lần. Khi có thông báo mới, red dot hiển thị ngay lập tức mà không cần người dùng rời đi và quay lại.`<br><br>`**Quy tắc hành động:**`<br>`- **Tap:** Điều hướng đến màn hình Thông báo (UC258, UC259).                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 5 | Icon Người dùng       | Button (Image)       | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Nằm ở ngoài cùng góc phải header, kế bên Icon Thông báo.`<br>`- Hiển thị icon user / avatar thu nhỏ.`<br><br>`**Quy tắc hành động:**`<br>`- **Tap:** Điều hướng đến màn hình Cấu hình tài khoản / Trang cá nhân (UC249).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

**Khung Card Thông tin người dùng:**

| # | Tên trường        | Kiểu trường | Giá trị mặc định       | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                 |
| - | -------------------- | -------------- | --------------------------- | ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Avatar người dùng | Image (Circle) | Icon mặc định hệ thống | -           | —         | **Quy tắc hiển thị:**`<br>`- Luôn hiển thị icon avatar mặc định của hệ thống.`<br>`- Không phụ thuộc vào dữ liệu tài khoản; không lấy ảnh từ profile người dùng.`<br><br>`**Quy tắc hành động:**`<br>`- Không tap được.`<br>`- Người dùng không thể thay đổi hoặc upload ảnh đại diện tại màn hình này. |
| 2 | Tên đầy đủ      | Label          | -                          | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị họ tên đầy đủ của người dùng đã đăng nhập (VD: "Nguyễn Văn A").`<br>`- Giới hạn hiển thị tối đa 1 dòng; nếu quá dài, cắt bớt và hiển thị dấu "..." ở cuối (truncate).`<br><br>`**Quy tắc hành động:**`<br>`- Không tap được.                                           |
| 3 | Vai trò             | Label          | -                          | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị vai trò của người dùng dưới dạng text thuần.`<br>`- Các giá trị hiển thị: "Nhà đầu tư Việt Nam", "Nhà đầu tư nước ngoài", "Tổ chức/Doanh nghiệp".`<br><br>`**Quy tắc hành động:**`<br>`- Không tap được.                                                                     |

**Khung Truy cập nhanh (Quick Access):**

Danh sách các lối tắt điều hướng nhanh đến các chức năng chính.

| # | Tên mục               | Kiểu               | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| - | ----------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Hướng dẫn sử dụng  | Card (Icon + Label) | **Quy tắc hiển thị:**`<br>`- Luôn hiển thị theo cấu hình mặc định; người dùng không được phép tùy chỉnh thứ tự hoặc ẩn/hiện.`<br>`- **Áp dụng cho tất cả users/roles:** Thông tin trong màn trang chủ là giống nhau giữa các users/roles (Nhà đầu tư Việt Nam, Nhà đầu tư nước ngoài, Tổ chức/Doanh nghiệp).`<br><br>`**Quy tắc hành động:**`<br>`- Tap → Điều hướng đến màn hình Hướng dẫn sử dụng (UC-75)). |
| 2 | Quản lý hồ sơ       | Card (Icon + Label) | **Quy tắc hiển thị:**`<br>`- Luôn hiển thị theo cấu hình mặc định; người dùng không được phép tùy chỉnh thứ tự hoặc ẩn/hiện.`<br><br>`**Quy tắc hành động:**`<br>`- Tap → Điều hướng đến màn hình Quản lý hồ sơ (UC45).                                                                                                                                                                                                                          |
| 3 | Quản lý đặt lịch   | Card (Icon + Label) | **Quy tắc hiển thị:**`<br>`- Luôn hiển thị theo cấu hình mặc định; người dùng không được phép tùy chỉnh thứ tự hoặc ẩn/hiện.`<br><br>`**Quy tắc hành động:**`<br>`- Tap → Điều hướng đến màn hình Quản lý đặt lịch (UC42).                                                                                                                                                                                                                      |
| 4 | Khu công nghiệp / KKT | Card (Icon + Label) | **Quy tắc hiển thị:**`<br>`- Luôn hiển thị theo cấu hình mặc định; người dùng không được phép tùy chỉnh thứ tự hoặc ẩn/hiện.`<br><br>`**Quy tắc hành động:**`<br>`- Tap → Điều hướng đến màn hình Tra cứu KCN/KKT (UC2).                                                                                                                                                                                                                            |
| 5 | Câu hỏi (FAQ)         | Card (Icon + Label) | **Quy tắc hiển thị:**`<br>`- Luôn hiển thị theo cấu hình mặc định; người dùng không được phép tùy chỉnh thứ tự hoặc ẩn/hiện.`<br><br>`**Quy tắc hành động:**`<br>`- Tap → Điều hướng đến màn hình Câu hỏi thường gặp (UC82).                                                                                                                                                                                                                    |
| 6 | Văn bản pháp luật   | Card (Icon + Label) | **Quy tắc hiển thị:**`<br>`- Luôn hiển thị theo cấu hình mặc định; người dùng không được phép tùy chỉnh thứ tự hoặc ẩn/hiện.`<br><br>`**Quy tắc hành động:**`<br>`- Tap → Điều hướng đến màn hình Văn bản pháp luật (UC69).                                                                                                                                                                                                                      |

**Khung Tin tức:**

| # | Tên trường       | Kiểu trường                | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| - | ------------------- | ----------------------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Tiêu đề section  | Label                         | "Tin tức"            | -           | —         | **Quy tắc hiển thị:**`<br>`- Hiển thị cố định ở đầu khung, căn trái.`<br><br>`**Quy tắc hành động:**`<br>`- Không tap được.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2 | Nút "Xem tất cả" | Button (Text)                 | "Xem tất cả"        | -           | —         | **Quy tắc hiển thị:**`<br>`- Nằm bên phải tiêu đề section, chữ màu đỏ.`<br><br>`**Quy tắc hành động:**`<br>`- Tap → Điều hướng đến màn hình danh sách Tin tức đầy đủ (UC55-68).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 3 | Danh sách tin tức | List Card (Horizontal Scroll) | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị **tối đa 5 tin tức** mới nhất, sắp xếp theo **thời gian đăng giảm dần** (mới nhất hiển thị trước).`<br>`- Hiển thị theo dạng cuộn ngang (horizontal scroll).`<br>`- Mỗi card tin bao gồm:`<br>`&emsp;• Ảnh đại diện (thumbnail) có bo góc.`<br>`&emsp;• Nhãn phân loại (category tag) với màu sắc theo loại:`<br>`&emsp;&emsp;- **Đỏ**: "Chính sách"`<br>`&emsp;&emsp;- **Xanh**: "Tin đầu tư"`<br>`&emsp;&emsp;- **Cam**: "Thành công"`<br>`&emsp;• Ngày đăng (định dạng DD/MM/YYYY).`<br>`&emsp;• Tiêu đề bài viết (tối đa 2 dòng, truncate nếu dài hơn).`<br>`- Nếu không có tin tức nào: hiển thị trạng thái rỗng với text *"Không có dữ liệu."* (Xem CMR-14)`<br><br>`**Quy tắc hành động:**`<br>`- Vuốt ngang → Xem thêm tin tức trong danh sách.`<br>`- Tap vào card → Điều hướng đến màn hình chi tiết bài viết (UC55-68). |

**Thành phần nổi (Floating Widget):**

| # | Tên trường | Kiểu trường           | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| - | ------------- | ------------------------ | --------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Icon Chatbot  | Button (Floating Action) | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Vị trí mặc định: hiển thị nổi ở góc dưới bên phải màn hình (ngay trên khu vực Footer), nằm đè lên các nội dung khác.`<br>`- Hiển thị icon đặc trưng của Chatbot.`<br><br>`**Quy tắc hành động:**`<br>`- **Tap:** Mở màn hình Chatbot (→ Xem UC60).`<br>`- **Kéo thả (Drag & Drop):** Người dùng có thể chạm giữ và di chuyển icon đến vị trí khác trên màn hình để không bị che khuất nội dung.`<br>`- **Reset vị trí:** Khi người dùng rời khỏi màn hình này và quay lại, icon Chatbot sẽ tự động trở về vị trí mặc định ban đầu. **Lưu ý:** Vị trí chatbot không được lưu vào server; luôn reset về vị trí mặc định khi quay lại trang chủ. |

**Khung Footer (Bottom Navigation):**

Thanh điều hướng ở dưới cùng màn hình (Hiển thị xuyên suốt ở các màn hình chính).

| # | Tên trường  | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| - | -------------- | -------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 | Tab Trang chủ | Button (Tab)   | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị Icon Ngôi nhà và text "Trang chủ".`<br>`- Căn lề trái của Footer.`<br>`- Trạng thái Active: Cả icon và text có màu đỏ khi người dùng đang ở Trang chủ.`<br><br>`**Quy tắc hành động:**`<br>`- Tap → Điều hướng về màn hình Trang chủ (UC1).`<br>`- **Refresh:** Mỗi khi tap vào tab, dữ liệu trên màn hình được refresh (tải lại từ đầu). Khi quay lại Trang chủ từ màn hình khác (không phải từ đăng nhập), dữ liệu vẫn được refresh để đảm bảo hiển thị thông tin mới nhất. |
| 2 | Tab Thủ tục  | Button (Tab)   | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị Icon Văn bản và text "Thủ tục".`<br><br>`**Quy tắc hành động:**`<br>`- Tap → Điều hướng đến màn hình Tra cứu Văn bản & Thủ tục hành chính (UC69, UC73).`<br>`- **Refresh:** Mỗi khi tap vào tab, dữ liệu trên màn hình được refresh (tải lại từ đầu).                                                                                                                                                                                                                                                                   |
| 3 | Tab KCN/KKT    | Button (Tab)   | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị Icon Bản đồ và text "KCN/KKT".`<br><br>`**Quy tắc hành động:**`<br>`- Tap → Điều hướng đến màn hình Tra cứu KCN/KKT (UC2).`<br>`- **Refresh:** Mỗi khi tap vào tab, dữ liệu trên màn hình được refresh (tải lại từ đầu).                                                                                                                                                                                                                                                                                                       |
| 4 | Tab Cài đặt | Button (Tab)   | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị Icon Bánh răng và text "Cài đặt".`<br>`- Nằm ngoài cùng góc phải Footer.`<br><br>`**Quy tắc hành động:**`<br>`- Tap → Điều hướng đến màn hình Cấu hình tài khoản / Trang cá nhân (UC249).`<br>`- **Refresh:** Mỗi khi tap vào tab, dữ liệu trên màn hình được refresh (tải lại từ đầu).                                                                                                                                                                                                                          |

**Pull to refresh:** (Xem CMR-13)

- Kéo xuống từ đầu danh sách → Trigger refresh dữ liệu từ đầu.
- Hiển thị spinner ở đầu danh sách trong khi đang refresh.
- Sau khi refresh thành công: Cập nhật danh sách, ẩn spinner.

**Phân trang:** Hỗ trợ **lazy load**, tải 20 bản ghi mỗi lần. Cuộn đến cuối danh sách → Tự động tải trang tiếp theo. (Xem CMR-04)

**Xử lý lỗi:** (Xem CMR-07)

| Tình huống lỗi           | Thông báo hiển thị                                                                             | Hành vi hệ thống                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Lỗi mạng / Mất kết nối | *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* + nút **"Thử lại"** | Giữ nguyên màn hình, hiển thị nút Thử lại.              |
| Lỗi API (HTTP 500)         | *"Hệ thống đang bận. Vui lòng thử lại sau."*                                              | Giữ nguyên màn hình, chỉ hiển thị thông báo.            |
| Timeout (quá 10 giây)     | *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + nút **"Thử lại"**       | Giữ nguyên màn hình, hiển thị nút Thử lại. (Xem CMR-16) |

**Xử lý lỗi trống (Empty state):** (Xem CMR-14)

- Nếu không có dữ liệu: Hiển thị Empty State (Icon + Thông báo *"Không có dữ liệu."*).
- Nếu search/filter không có kết quả: Hiển thị *"Không tìm thấy kết quả."*.

**Quy tắc xử lý lỗi độc lập từng section:**

- Mỗi section trên Trang chủ (Card thông tin người dùng, Quick Access, Tin tức) được xử lý **độc lập** với nhau.
- Khi 1 API fails (ví dụ: API user info fails nhưng API tin tức succeeds), **chỉ section tươ ứng hiển thị lỗi**, các section còn lại vẫn hiển thị bình thường.
- Thông báo lỗi hiển thị theo CMR-07 cho từng section.
- Không hiển thị lỗi toàn màn hình khi chỉ 1 section gặp sự cố.

**Quy tắc debounce cho navigation:**

- Khi người dùng tap nhanh liên tục (double tap) vào các button navigation (Quick Access cards, Footer tabs, Sidebar items), hệ thống có cơ chế **debounce**.
- **Quy tắc khôi phục trạng thái khi reopen app:**
- **Force close (tắt app không xóa dữ liệu):** Khi người dùng mở lại app sau khi force close, hệ thống quay về **Trang chủ** và giữ nguyên session đăng nhập, không yêu cầu đăng nhập lại.
- **Xóa app (uninstall):** Khi người dùng xóa app và cài đặt lại, hệ thống yêu cầu **đăng nhập lại từ đầu** (không restore session).

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Hiển thị Trang chủ

1. Sau khi đăng nhập thành công, hệ thống gọi API lấy thông tin tài khoản người dùng hiện tại.
2. Trong khi chờ API phản hồi, hiển thị loading indicator (spinner/skeleton) trên Card thông tin người dùng.
3. Hệ thống hiển thị Card thông tin người dùng với dữ liệu trả về từ API (Tên, Vai trò, Avatar).
4. Hệ thống kiểm tra và hiển thị red dot trên Icon Thông báo theo cơ chế **polling 30 giây/lần**: khi có thông báo chưa đọc mới phát sinh trong khi người dùng đang ở Trang chủ, red dot được cập nhật ngay lập tức mà không cần người dùng rời đi và quay lại.
5. Quick Access hiển thị **cố định** theo cấu hình mặc định (người dùng không được phép tùy chỉnh thứ tự hoặc ẩn/hiện).
6. Hệ thống tải dữ liệu Tin tức từ API sau khi màn hình render xong. Trong khi chờ, hiển thị skeleton loading.
7. Danh sách Tin tức hiển thị tối đa 5 bài mới nhất, sắp xếp theo thời gian đăng giảm dần.

**Postcondition (Điều kiện sau khi hiển thị thành công):**

- Session người dùng được duy trì.
- Toàn bộ thông tin hiển thị là dữ liệu mới nhất (up-to-date).
- Dữ liệu Tin tức được hiển thị theo ngôn ngữ hiện tại của hệ thống.

**Accessibility:**

- **Screen Reader:** Các thành phần UI (Header, Card, Quick Access, Tin tức, Footer) cần hỗ trợ đọc bằng screen reader theo tiêu chuẩn iOS/Android accessibility guidelines.
- Các yêu cầu về contrast ratio, font size, touch target dựa vào UI design specs.

---

## 4. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-05-12 | v4 → v4.1 | Null display format (bảng spec) | — (em dash) | - (single dash) | Đồng bộ CMR-14 v1.4 |
