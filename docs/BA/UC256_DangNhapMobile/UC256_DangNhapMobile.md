# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG
**Tiêu đề:** UC256 — Đăng nhập ứng dụng Mobile  
**Ngày thực hiện:** 12/05/2026  
**Tác giả:** Antigravity (Senior BA)
**Phiên bản:** v1.3

| Thuộc tính | Giá trị |
|---|---|
| BA phụ trách | huy.lai2 |
| Phân hệ | Ứng dụng Di động (Mobile App) |
| Loại chức năng | Xác thực & Phân quyền |
| Đối tượng thực hiện | Cá nhân / Tổ chức |
| Giao diện | Màn hình Mobile (Portrait) |
| Ngày tạo | 29/04/2026 |
| Ngày cập nhật | 12/05/2026 |
| Phiên bản | v1.3 |


---

## UC256 — Đăng nhập ứng dụng Mobile

### 1. Mô tả chức năng

**Tên chức năng:** Đăng nhập ứng dụng Mobile  
**Mô tả:** Chức năng cho phép người dùng (cá nhân hoặc tổ chức) đăng nhập vào ứng dụng di động Cổng một cửa đầu tư Quốc gia bằng một trong các phương thức: nhập Mã định danh & Mật khẩu, hoặc đăng nhập qua VNeID.  
**Phân quyền:** Toàn bộ người dùng chưa đăng nhập (Guest).  
**Truy cập chức năng:** Mở ứng dụng di động → Màn hình đăng nhập hiển thị mặc định.  
**Điều kiện tiên quyết (Preconditions):** Thiết bị cài đặt ứng dụng có kết nối mạng ổn định.  
**Điều kiện kết thúc (Postconditions):** Hệ thống khởi tạo phiên đăng nhập, lưu token an toàn và điều hướng người dùng tới Màn hình Trang chủ.
**Chức năng đáp ứng usecase số:** UC256 (Phụ lục XIV — STT 256)

---

### 2. Mô tả giao diện

#### 2.1 Màn hình Chọn phương thức đăng nhập (Tham chiếu: Chọn cách đăng nhập.png)

**Mô tả giao diện:**  
Màn hình khởi đầu. Nửa trên nền đỏ chứa logo và tiêu đề hệ thống. Nửa dưới nền trắng chứa các lựa chọn đăng nhập.

| # | Tên trường | Kiểu trường | Giá trị mặc định | Mô tả/Ghi chú |
|---|---|---|---|---|
| 1 | Language Switcher | Button (Icon) | "VI" | Nằm góc phải trên cùng. Gồm icon quả địa cầu và nhãn ngôn ngữ. Tap -> Mở Bottom Sheet chọn ngôn ngữ (VI, EN, ZH, JA, KO). |
| 2 | Logo hệ thống | Image | — | Biểu tượng hình tròn vàng, ngôi sao đỏ ở giữa. |
| 3 | Tên hệ thống | Label | — | "Cổng một cửa đầu tư Quốc gia" (National Investment Gateway). |
| 4 | Tiêu đề chính | Label | "Đăng nhập" | Font to, đậm, màu trắng. |
| 5 | Phụ đề | Label | "Chọn phương thức đăng nhập" | Font nhỏ hơn, màu trắng. |
| 6 | Card "Đăng nhập" | Card | — | Nền trắng, bo góc. Gồm icon user hồng, tiêu đề "Đăng nhập", phụ đề "Sử dụng mã định danh và mật khẩu". Tap -> Mở màn hình 2.2. |
| 7 | Card "Đăng nhập với VNeID" | Card | — | Nền trắng, bo góc. Gồm logo VNeID, tiêu đề "Đăng nhập với VNeID", phụ đề về dịch vụ công. Tap -> Mở màn hình 2.3. |
| 8 | Link "Đăng ký tài khoản" | Link (Red) | — | Nằm dưới divider "hoặc". Tap -> Điều hướng sang UC252. |
| 9 | Link "Quên mật khẩu" | Link (Grey) | — | Nằm cạnh link Đăng ký. Tap -> Điều hướng sang UC253. |
| 10 | Banner bảo mật | Container | — | Nằm dưới cùng, nền xám nhạt. Gồm icon bảo mật và text cam kết an toàn. |

#### 2.2 Màn hình Đăng nhập Mã định danh (Tham chiếu: Đăng nhập bằng mã định danh, faceID.png)

| # | Tên trường | Kiểu trường | Giá trị mặc định | Mô tả/Ghi chú |
|---|---|---|---|---|
| 1 | Header | Component | — | Nền đỏ. Gồm nút Back (←) và tiêu đề "Đăng nhập Nhà đầu tư". |
| 2 | Mã định danh | Textbox | Null | Label "Mã định danh*". Placeholder "Nhập mã định danh của bạn". Có icon thẻ (card) ở đầu. |
| 3 | Mật khẩu | Password Input | Null | Label "Mật khẩu*". Placeholder "Nhập mật khẩu". Có icon mắt (ẩn/hiện). |
| 4 | Link "Quên mật khẩu?" | Link (Red) | — | Nằm ngay dưới trường Mật khẩu. |
| 5 | Row Biometric | Row (Icon+Text) | — | Gồm icon FaceID/Vân tay và text "Đăng nhập bằng Face ID" (hoặc Vân tay). Chỉ hiện sau khi đã login thành công lần đầu. |
| 6 | Divider | Label | "Chưa có tài khoản?" | Đường gạch ngang hai bên text. |
| 7 | Nút "Đăng ký tài khoản mới"| Button (Outline) | — | Viền xám, nền trắng. Tap -> UC252. |
| 8 | Nút "Đăng nhập" | Button (Primary) | — | Nền đỏ, text trắng. **Sticky Bottom** (cố định dưới cùng màn hình). Luôn active, validate khi tap. |

#### 2.3 Màn hình Đăng nhập VNeID (Tham chiếu: Đăng nhập bằng VNeID.png)

Tích hợp qua **Web View**.

| # | Tên trường | Kiểu trường | Giá trị mặc định | Mô tả/Ghi chú |
|---|---|---|---|---|
| 1 | Header VNeID | Image | — | Logo VNeID, Huy hiệu CA, tiêu đề "BỘ CÔNG AN". |
| 2 | Số định danh cá nhân | Textbox | Null | Placeholder "Số định danh cá nhân". Có icon user. |
| 3 | Mật khẩu | Password Input | Null | Placeholder "Mật khẩu". Có icon lock và icon mắt. |
| 4 | Nút "Đăng nhập" | Button (Primary) | — | Nền đỏ sậm. |
| 5 | Link "xem hướng dẫn" | Link (Red) | — | Tap -> Mở Bottom Sheet hướng dẫn (2 mục: Mã OTP về chậm, Các vấn đề khác). |
| 6 | Mã QR Code | Image (QR) | — | Hiển thị mã QR để quét đăng nhập. |
| 7 | Đếm ngược QR | Label | — | "Mã hết hạn sau 4:58" (chạy đếm ngược từ 5:00). Khi hết hạn hiển thị nút "Làm mới mã". |
| 8 | Link "Tải VNeID ->" | Link (Red) | — | Tap -> Điều hướng sang Store tải app. |

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Xử lý Đăng nhập Mã định danh
1. **Validation:** Khi tap "Đăng nhập", nếu trường trống hiển thị lỗi inline: *"[tên trường] là bắt buộc."* (CMR-09).
2. **Debounce:** Áp dụng CMR-18 cho nút Đăng nhập.
3. **Loading:** Hiển thị loading overlay trong khi gọi API.
4. **Lỗi 401/Sai thông tin:** Hiển thị toast *"Mã định danh hoặc mật khẩu không đúng. Vui lòng thử lại."*
5. **Khóa tài khoản:** Nhập sai 5 lần liên tiếp -> Khóa 15 phút. Hiển thị popup thông báo thời gian mở khóa.

#### 3.2 Xử lý Sinh trắc học (Biometric)
- **Điều kiện:** Chỉ xuất hiện lựa chọn Biometric tại màn hình đăng nhập nếu User đã đăng nhập thành công bằng mật khẩu trên thiết bị này ít nhất một lần.
- **Xác thực:** Tap vào hàng Biometric -> Hệ thống gọi Biometric Prompt của OS. Thành công -> Tự động login.

#### 3.3 Xử lý VNeID (Web View)
- Ứng dụng mở Web View dẫn tới cổng xác thực VNeID.
- Sau khi User đăng nhập thành công trên Web View, App nhận callback token để thực hiện ánh xạ tài khoản.
- **QR Expired:** Sau 5 phút mã QR không được quét -> Tự động mờ mã QR và hiển thị nút "Làm mới mã".

#### 3.4 Đa ngôn ngữ (→ Xem CMR-17)
- Ngôn ngữ mặc định theo cài đặt máy.
- Cho phép đổi ngôn ngữ tại màn hình 2.1. Cập nhật tức thì toàn bộ nhãn, thông báo lỗi.

---

### 4. Tiêu chí chấp nhận (AC)
- **AC1:** Bố cục form đăng nhập (thứ tự trường, nút sticky bottom) khớp 100% với wireframe.
- **AC2:** Đổi ngôn ngữ qua Bottom Sheet tại màn hình khởi đầu hoạt động đúng.
- **AC3:** Nút Đăng nhập luôn active và hiển thị thông báo "là bắt buộc" khi để trống.
- **AC4:** QR VNeID có đếm ngược và xử lý được trường hợp hết hạn.

---

### 5. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-05-11 | v1.1 | Đa ngôn ngữ | (Không có) | Bổ sung section đa ngôn ngữ | CMR-17 |
| 2026-05-12 | v1.2 | Timeout | 30s | 10s | CMR-16 |
| 2026-05-12 | v1.3 | Cập nhật UI & Logic | Form cũ, không có biometric logic, thiếu chi tiết VNeID | Cập nhật tên hệ thống, Language Switcher Bottom Sheet, Biometric logic (sau login 1st), VNeID Web View & QR handling, Form layout sticky bottom | Theo Feedback BA & Wireframe |
