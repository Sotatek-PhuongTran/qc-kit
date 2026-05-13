# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG

**Tiêu đề:** UC90 — Khai thác dự án kêu gọi đầu tư trên Mobile  
**Ngày tạo:** 11/05/2026  
**Phiên bản:** v1.2

| Thuộc tính | Giá trị |
|---|---|
| BA phụ trách | Antigravity |
| Phân hệ | Ứng dụng Di động (Mobile App) |
| Loại chức năng | Khai thác thông tin xúc tiến đầu tư |
| Đối tượng thực hiện | Cá nhân / Tổ chức (Guest & Logged-in) |
| Giao diện | Màn hình Mobile (Portrait) |
| Ngày tạo | 11/05/2026 |
| Phiên bản | v1.1 |

---

## UC90 — Khai thác dự án kêu gọi đầu tư trên Mobile

### 1. Mô tả chức năng

- **Tên chức năng:** Khai thác dự án kêu gọi đầu tư trên Mobile
- **Mô tả:** Chức năng cho phép người dùng tra cứu, tìm kiếm và xem danh sách các dự án đang kêu gọi đầu tư theo nhiều tiêu chí như lĩnh vực, địa bàn và quy mô vốn.
- **Phân quyền:** Toàn bộ người dùng (Khách vãng lai và người dùng đã đăng nhập).
- **Phạm vi ngoài UC (Exclusions):** UC này KHÔNG bao gồm: đăng ký đầu tư (UC92), xem chi tiết văn bản MOU (UC89), hoặc thực hiện các nghiệp vụ quản lý dự án phía Admin.
- **Truy cập chức năng:** Sidebar → Mục **"Xúc tiến đầu tư"** → Chọn **"Dự án kêu gọi đầu tư"**.
- **Điều kiện tiên quyết (Preconditions):** Thiết bị có kết nối mạng ổn định (Wifi/4G/5G).
- **Điều kiện kết thúc (Postconditions):** Hệ thống hiển thị danh sách các dự án thỏa mãn điều kiện hoặc hiển thị trạng thái rỗng nếu không có dữ liệu.
- **Chức năng đáp ứng usecase số:** UC90 (Phụ lục XIV)

---

### 2. Mô tả giao diện

#### 2.1 Màn hình Danh sách Dự án kêu gọi đầu tư (Tham chiếu: UC90XuctienDautu.png)

**Mô tả giao diện:**
Màn hình danh sách dự án với khung Header màu đỏ đậm đặc trưng. Bên dưới là thanh công cụ bao gồm Ô tìm kiếm và Nút lọc. Phần thân màn hình hiển thị danh sách các thẻ Dự án (Card) cuộn dọc, mỗi thẻ chứa thông tin tóm tắt và nút điều hướng chi tiết.

**Khung Header:**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Nút Quay lại (←) | Button (Icon) | — | — | — | **Quy tắc hành động:** Tap → Quay về màn hình trước đó (Sidebar hoặc Hub XTĐT). (Xem CMR-06). |
| 2 | Tiêu đề Header | Label | "Dự án kêu gọi đầu tư" | — | — | **Quy tắc hiển thị:** Font đậm, màu trắng, nằm giữa Header. |
| 3 | Icon Thông báo (Chuông) | Button (Icon) | — | — | — | **Quy tắc hiển thị:** Icon chuông trắng, có Badge đỏ nhỏ ở góc trên phải khi có thông báo mới.<br>**Quy tắc hành động:** Tap → Mở màn hình Trung tâm thông báo chung của ứng dụng. |

**Khung Tìm kiếm & Lọc:**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 4 | Ô tìm kiếm | Textbox (Search) | "Tìm kiếm dự án..." | x | — | **Quy tắc hiển thị:** Nền xám nhạt, có icon kính lúp bên trái. Tối đa **500 ký tự** (Xem CMR-01).<br>**Quy tắc hành động:** Nhập từ khóa → Hệ thống tìm kiếm theo Tên dự án và Mô tả ngắn. Tự động lọc sau khi người dùng ngừng gõ 3 giây (Debounce). (Xem CMR-01).<br>- Xử lý whitespace: auto-trim khoảng trắng đầu/cuối trước khi tìm kiếm. Nếu sau trim rỗng → coi như input rỗng (Xem CMR-01). |
| 5 | Nút Lọc | Button (Icon) | — | — | — | **Quy tắc hiển thị:** Nằm trong khung bo góc bên phải ô tìm kiếm.<br>**Quy tắc hành động:** Tap → Mở Modal Bottom Sheet để chọn tiêu chí lọc (Lĩnh vực, Địa bàn, Vốn). |

**Danh sách Dự án (List Card):**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 6 | Thẻ dự án (Card) | Container | — | — | — | **Quy tắc hiển thị:**<br>- Khung trắng, bo góc, có shadow nhẹ.<br>- Hiển thị theo danh sách cuộn dọc. Hỗ trợ Lazy load (20 bản ghi/lần). (Xem CMR-04).<br>- Hỗ trợ Pull to Refresh (CMR-13): Kéo xuống từ đầu danh sách để tải lại dữ liệu từ API. |
| 7 | Tên dự án | Label | — | — | — | **Quy tắc hiển thị:** Font đậm (H2), màu đen. Tối đa 2 dòng, quá 2 dòng hiển thị `...` (truncate). |
| 8 | Mô tả ngắn | Label | — | — | — | **Quy tắc hiển thị:** Font thường, màu xám. Nằm ngay dưới tên dự án. Tối đa 1 dòng, quá dài hiển thị `...` (truncate). |
| 9 | Lĩnh vực đầu tư | Icon + Label | — | — | — | **Quy tắc hiển thị:** Icon túi xách + Tên ngành nghề (Ví dụ: "Sản xuất công nghiệp"). |
| 10 | Địa điểm (Địa bàn) | Icon + Label | — | — | — | **Quy tắc hiển thị:** Icon định vị + Tên tỉnh/thành hoặc tên KCN (Ví dụ: "Khu công nghiệp Thăng Long, Hà Nội"). |
| 11 | Tổng vốn đầu tư | Icon + Label | — | — | — | **Quy tắc hiển thị:** Icon $ + Số tiền vốn (Màu đỏ). Định dạng theo CMR-11 (Ví dụ: "500 tỷ VNĐ" hoặc "$50 million USD"). |
| 12 | Nút Chi tiết | Button | "Chi tiết" | — | — | **Quy tắc hiển thị:** Button viền xám, full-width cuối Card.<br>**Quy tắc hành động:** Tap → Điều hướng đến Màn hình Chi tiết dự án.<br>- **Debounce Navigation (CMR-18):** Khi người dùng tap nhanh liên tục (double tap) vào nút/card dự án, hệ thống chỉ nhận action đầu tiên và bỏ qua các tap tiếp theo cho đến khi điều hướng hoàn tất. |

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Luồng tải danh sách bài viết
1. Hệ thống gọi API lấy danh sách các dự án có trạng thái "Đang kêu gọi" hoặc "Còn hiệu lực". Các dự án hết hạn sẽ không hiển thị.
2. Mặc định sắp xếp theo ngày đăng mới nhất lên đầu.
3. Khi người dùng cuộn tới cuối trang, hệ thống tự động tải thêm dữ liệu (Infinite Scroll) theo quy tắc CMR-04.
4. Trường hợp không có dữ liệu: Hiển thị màn hình Empty State với thông báo "Không có dữ liệu." (Xem CMR-14).

#### 3.2 Luồng Tìm kiếm & Lọc
1. **Tìm kiếm:** Thực hiện lọc dữ liệu realtime dựa trên từ khóa người dùng nhập vào ô tìm kiếm. Nếu không tìm thấy kết quả phù hợp → Hiển thị "Không tìm thấy kết quả." (Xem CMR-14).
2. **Lọc:** Khi người dùng áp dụng bộ lọc từ Modal, hệ thống sẽ gửi yêu cầu API kèm theo các tham số (IndustryID, ProvinceID, CapitalRange) để làm mới danh sách.

#### 3.3 Xử lý lỗi (Tham chiếu CMR-07)

| Tình huống lỗi | Thông báo hiển thị | Hành vi hệ thống |
| --- | --- | --- |
| Lỗi mạng / Mất kết nối | *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* + nút **"Thử lại"** | Giữ nguyên màn hình, hiển thị nút Thử lại. |
| Lỗi 401 (Session hết hạn) | *"Phiên đăng nhập hết hạn."* (Toast) | Hệ thống tự động sử dụng refresh token để cấp lại access token mới. Nếu refresh token đã hết hạn hoặc không hợp lệ (quá 15 ngày) → chuyển về màn hình Đăng nhập. (Xem CMR-07) |
| Lỗi API (HTTP 500) | *"Hệ thống đang bận. Vui lòng thử lại sau."* | Giữ nguyên màn hình, chỉ hiển thị thông báo. |
| Timeout (API không phản hồi sau 10 giây) | *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + nút **"Thử lại"** | Hiển thị thông báo, giữ nguyên màn hình. |

#### 3.4 Đa ngôn ngữ (→ Xem CMR-17)

Toàn bộ text cứng trên màn hình UC90 (header, placeholder ô tìm kiếm, label bộ lọc, tên trường danh sách, thông báo lỗi, empty state message) được dịch sang ngôn ngữ hiển thị tương ứng khi người dùng đổi ngôn ngữ. Hỗ trợ 5 ngôn ngữ: VI, EN, ZH, JA, KO. Nội dung dữ liệu từ API (tên dự án, lĩnh vực, địa bàn, quy mô vốn) hiển thị nguyên bản — không thay đổi theo ngôn ngữ.

---

### 4. Tiêu chí chấp nhận (Acceptance Criteria)

- **AC1:** Giao diện Card dự án hiển thị đầy đủ và chính xác 5 thông tin: Tên, Mô tả ngắn, Lĩnh vực, Địa bàn, Vốn đầu tư theo đúng Mockup.
- **AC2:** Tên dự án và Mô tả ngắn được xử lý truncate (dấu `...`) chính xác khi vượt quá số dòng quy định.
- **AC3:** Số vốn đầu tư được hiển thị nổi bật bằng màu đỏ và định dạng đúng theo CMR-11.
- **AC4:** Chức năng tìm kiếm hoạt động ổn định với cơ chế debounce, không gây giật lag giao diện.
- **AC5:** Bell icon trên Header điều hướng đúng về màn hình thông báo tổng hợp của ứng dụng.
- **AC6:** Hệ thống ẩn hoàn toàn các dự án đã hết hạn kêu gọi đầu tư.

---

### 5. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-05-11 | v1 → v1.1 | Tổng thể tài liệu | Phiên bản nhóm UC87-95 | Tách riêng và chi tiết hóa UC90 theo format mới. | Đổi tên file & cấu trúc lại |
| 2026-05-11 | v1.1 | 2. Mô tả giao diện | Bảng thuộc tính đơn giản | Bảng thuộc tính chi tiết kèm quy tắc hiển thị/hành động. | Chi tiết hóa theo Mockup |
| 2026-05-11 | v1.1 → v1.2 | Xử lý lỗi — HTTP 401 | (Không có) | Bổ sung xử lý lỗi 401: auto refresh token, nếu hết hạn >15 ngày → redirect đăng nhập + toast "Phiên đăng nhập hết hạn." | Đồng bộ CMR-07 (B1) |
| 2026-05-11 | v1.1 → v1.2 | Đa ngôn ngữ | (Không có) | Bổ sung section đa ngôn ngữ: text cứng dịch 5 ngôn ngữ (VI, EN, ZH, JA, KO), nội dung API giữ nguyên | Đồng bộ CMR-17 (B2) |
| 2026-05-11 | v1.1 → v1.2 | Debounce Navigation | (Không có) | Tap nhanh liên tục vào card dự án → chỉ nhận action đầu tiên, bỏ qua tap tiếp theo cho đến khi điều hướng hoàn tất | Đồng bộ CMR-18 (B3) |
| 2026-05-11 | v1.1 → v1.2 | Pull-to-Refresh | (Không có) | Bổ sung hỗ trợ kéo xuống từ đầu danh sách để tải lại dữ liệu | Đồng bộ CMR-13 (B4) |
| 2026-05-11 | v1.1 → v1.2 | Ô tìm kiếm | Không có max length, không có whitespace | Bổ sung: tối đa 500 ký tự (CMR-01), auto-trim whitespace đầu/cuối trước khi tìm kiếm | Đồng bộ CMR-01 (C3) |
