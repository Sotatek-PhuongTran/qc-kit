# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG
**Tiêu đề:** UC250-254 — Quản lý tài khoản doanh nghiệp, Đổi mật khẩu, Đăng ký, Quên mật khẩu & Cấu hình tài khoản trên Mobile  
**Ngày thực hiện:** 12/05/2026  
**Tác giả:** Antigravity (Senior BA)
**Phiên bản:** v2.4

| Thuộc tính | Giá trị |
|---|---|
| BA phụ trách | huy.lai2 |
| Phân hệ | Ứng dụng Di động (Mobile App) |
| Loại chức năng | Quản lý tài khoản |
| Đối tượng thực hiện | Cá nhân / Tổ chức |
| Giao diện | Màn hình Mobile (Portrait) |
| Ngày tạo | 29/04/2026 |
| Ngày cập nhật | 12/05/2026 |
| Phiên bản | v2.4 |


---

## UC250-254 — Quản lý tài khoản: Doanh nghiệp, Đổi MK, Đăng ký, Quên MK, Cấu hình

### 1. Mô tả chức năng

**Tên chức năng:** Nhóm chức năng Quản lý tài khoản trên Mobile  
**Mô tả:** Nhóm chức năng bổ sung cho quản lý tài khoản người dùng: UC250 (cập nhật tài khoản doanh nghiệp), UC251 (đổi mật khẩu), UC252 (đăng ký tài khoản mới), UC253 (quên mật khẩu), UC254 (cấu hình tài khoản người dùng).  
**Phân quyền:** UC252/UC253 — Không yêu cầu đăng nhập. UC250/UC251/UC254 — Yêu cầu đăng nhập.  
**Chức năng đáp ứng usecase số:** UC250, UC251, UC252, UC253, UC254 (Phụ lục XIV — Nhóm E.I)

---

### 2. Mô tả giao diện

#### 2.1 Màn hình Đăng ký tài khoản (UC252)

**Mô tả giao diện:**  
Chức năng cho phép người dùng cá nhân/tổ chức đăng ký tài khoản mới trên hệ thống. Quá trình đăng ký yêu cầu nhập thông tin định danh, tạo mật khẩu và xác thực qua Email.

**Nhập thông tin đăng ký (Tham chiếu: ChitietdangkytkcanhanVN.png, ChitietdktkDN.png)**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Loại tài khoản | Radio/Select | Cá nhân VN | x | x | Tùy chọn: Cá nhân VN / Tổ chức-DN / Cá nhân nước ngoài. |
| 2 | Tên tổ chức / Họ và tên | Textbox | Null | x | x | Nhãn thay đổi theo Loại tài khoản (Họ tên cho Cá nhân, Tên tổ chức cho DN). |
| 3 | Mã định danh | Textbox | Null | x | x | **Cá nhân VN:** CCCD/Số định danh. **Cá nhân NN:** Hộ chiếu. **Tổ chức:** Mã định danh. |
| 4 | Ngày cấp | Datepicker | dd/mm/yyyy | x | x | Chọn ngày cấp của mã định danh. Không cho phép chọn ngày tương lai. |
| 5 | Nơi cấp | Textbox | Null | x | x | |
| 6 | Mã số thuế | Textbox | Null | x | x | Bắt buộc đối với Tổ chức và Cá nhân VN. 10 hoặc 13 chữ số. |
| 7 | Số điện thoại | Textbox (tel) | Null | x | x | Bao gồm chọn mã vùng (mặc định +84). |
| 8 | Email | Textbox (email) | Null | x | x | Định dạng email hợp lệ. Dùng để gửi link kích hoạt. |
| 9 | Mật khẩu | Password Input | Null | x | x | **Quy tắc hiển thị:**<br>- Tối thiểu 8 ký tự, bao gồm chữ hoa, thường, số. Có icon mắt ẩn/hiện. |
| 10 | Nhập lại mật khẩu | Password Input | Null | x | x | **Quy tắc hiển thị:**<br>- Phải trùng khớp với trường Mật khẩu. Có icon mắt ẩn/hiện. |
| 11 | Điều khoản sử dụng | Link | — | — | — | Dẫn tới màn hình Điều khoản sử dụng. |
| 12 | Chính sách bảo mật | Link | — | — | — | Dẫn tới màn hình Chính sách bảo mật. |
| 13 | Nút "Đăng ký tài khoản" | Button (Primary) | — | — | — | **Hành động:** Validate dữ liệu -> Gửi email xác thực -> Thông báo thành công và yêu cầu check email. |

---

#### 2.2 Màn hình Quên mật khẩu (UC253) (Tham chiếu: Quenmk.png, Datlaimk.png)

**Mô tả:** Người dùng thực hiện đặt lại mật khẩu qua xác thực Email bằng cách cung cấp Mã định danh.

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Số điện thoại hoặc Email | Textbox | Null | x | x | Nhập SĐT hoặc Email đã đăng ký để nhận link đặt lại mật khẩu. |
| 2 | Nút "Gửi yêu cầu" | Button (Primary) | — | — | — | **Hành động:** Validate tài khoản -> Nếu hợp lệ, hệ thống gửi Email chứa link đặt lại mật khẩu. |
| 3 | Link "Quay lại đăng nhập" | Link | — | — | — | Nhấn để quay lại màn hình Đăng nhập. |

**Màn hình Đặt lại mật khẩu (Từ Link Email):**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Mật khẩu mới | Password Input | Null | x | x | Tối thiểu 8 ký tự, bao gồm chữ hoa, thường, số. |
| 2 | Xác nhận mật khẩu mới | Password Input | Null | x | x | Phải khớp với Mật khẩu mới. |
| 3 | Nút "Đặt lại mật khẩu" | Button (Primary) | — | — | — | **Hành động:** Cập nhật mật khẩu mới -> Thông báo thành công -> Về màn hình Đăng nhập. |

---

#### 2.3 Màn hình Đổi mật khẩu (UC251) (Tham chiếu: Doimatkhau.png)

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Mật khẩu hiện tại | Password Input | — | x | x | Có icon mắt ẩn/hiện. |
| 2 | Mật khẩu mới | Password Input | — | x | x | Phải khác mật khẩu hiện tại. Tuân thủ độ phức tạp mật khẩu. |
| 3 | Xác nhận mật khẩu mới | Password Input | — | x | x | Phải trùng khớp với mật khẩu mới. |
| 4 | Nút "Cập nhật mật khẩu" | Button (Primary) | — | — | — | Disabled nếu các trường chưa hợp lệ. |

---

#### 2.4 Màn hình Quản lý tài khoản doanh nghiệp (UC250)

Màn hình bao gồm 2 Tab chính: **Thông vị định danh** và **Thông tin khác**.

**Tab 1: Thông tin định danh (Tham chiếu: QuanlytaikhoanDN.png)**
- Chế độ: Chỉ xem (Read-only) hoàn toàn.
- Nội dung: Loại tài khoản, Tên tổ chức, Mã định danh, Ngày cấp, Nơi cấp, Mã số thuế.
- Thông báo: Banner cảnh báo "Thông tin định danh không thể chỉnh sửa. Nếu có sai sót, vui lòng liên hệ hỗ trợ."

**Tab 2: Thông tin khác (Tham chiếu: QuanlytaikhoanDN2, QuanlytaikhoanDN3, QuanlytaikhoanDN4)**
- Chế độ: Xem và Sửa (khi nhấn icon Bút chì trên Header). Màn hình chia 2 accordion.
- **Nội dung:** 
    - **Thông tin tổ chức:** Tên tiếng Anh, Tên viết tắt, Quyết định thành lập, GCN đầu tư, Địa chỉ (Dropdown Quốc gia, Tỉnh, Huyện, Xã), SĐT (+84), Email.
    - **Thông tin người đại diện:** Họ tên, Chức vụ, Ngày sinh, Mã định danh, Ngày cấp, Nơi cấp, SĐT (+84), Email, Địa chỉ.
- **Quy tắc khi Sửa:** Khi đổi Tỉnh -> Tự động reset Huyện/Xã về mặc định. Các trường ở Tab 1 bị lock.
- **Nút hành động (khi Sửa):** 
    - **Lưu thay đổi:** Validate dữ liệu -> Gọi API cập nhật -> Toast thành công.
    - **Hủy:** Hiển thị Popup xác nhận "Dữ liệu chưa lưu sẽ bị mất. Bạn có chắc chắn muốn hủy bỏ không?" (Theo CMR-10).

---

#### 2.5 Màn hình Cấu hình tài khoản (UC254) (Tham chiếu: Cauhinhtaikhoan.png)

Màn hình chia thành 3 Section chính: Cài đặt thông báo, Cài đặt đăng nhập, Ứng dụng. Tất cả thao tác cấu hình đều tự động lưu (Real-time).

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Nhận thông báo hệ thống | Toggle | Bật | x | — | (Cài đặt thông báo) Tự lưu realtime. |
| 2 | Nhắc hạn qua Email | Toggle | Bật | x | — | (Cài đặt thông báo) Tự lưu realtime. |
| 3 | Đăng nhập bằng khuôn mặt | Toggle | Tắt | x | — | (Cài đặt đăng nhập) Kích hoạt FaceID / Biometric. |
| 4 | Quản lý thiết bị | Link | — | — | — | (Cài đặt đăng nhập) Link chuyển sang màn Xem và quản lý thiết bị. |
| 5 | Điều khoản sử dụng | Link | — | — | — | (Section Ứng dụng) Link chuyển sang văn bản điều khoản. |
| 6 | Chính sách bảo mật | Link | — | — | — | (Section Ứng dụng) Link chuyển sang văn bản bảo mật. |
| 7 | Phiên bản ứng dụng | Label | 1.0.0 | — | — | (Section Ứng dụng) Chỉ đọc. |

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Xử lý Đăng ký tài khoản
1. **Quy tắc Datepicker (Ngày cấp/Ngày sinh):**
    - **Max date:** Không cho phép chọn ngày tương lai (phải ≤ ngày hiện tại).
    - **Min date:** Không cho phép chọn ngày trước ngày 01/01/1900.
    - **Hành vi UI:** Vô hiệu hóa (disable/làm mờ) các ngày nằm ngoài khoảng [Min, Max] trong giao diện chọn lịch; người dùng không thể tương tác với các ngày này.
2. **Validate realtime:** Hiển thị lỗi inline ngay khi blur khỏi trường (Theo CMR-09). Rule cụ thể: Họ tên (max 50 ký tự), CCCD (12 số), MST (10 hoặc 13 số).
3. **Kiểm tra trùng lặp:** Khi nhấn "Đăng ký tài khoản", hệ thống kiểm tra Mã định danh/Email/SĐT.
    - Nếu đã tồn tại: Hiển thị thông báo lỗi cụ thể: *"Mã định danh/Email/Số điện thoại đã được đăng ký. Vui lòng kiểm tra lại."*

#### 3.2 Xử lý Quản lý tài khoản (Sửa thông tin)
1. **Địa chỉ động (Cascading):** Dropdown địa chỉ load data theo cấp cha. Đổi Tỉnh -> ngầm reset Huyện và Xã. Đổi Huyện -> ngầm reset Xã.
2. **Validation:** Khi nhấn "Lưu", kiểm tra các trường bắt buộc và định dạng (Email, SĐT).
3. **Xác nhận Hủy:** Áp dụng CMR-10 cho nút Hủy để tránh mất dữ liệu nhập liệu của người dùng.

#### 3.3 Xử lý Bảo mật (Đổi mật khẩu / Quên mật khẩu)
1. **Đổi mật khẩu (UC251):** Giới hạn nhập sai mật khẩu hiện tại tối đa 5 lần (server-side). Vượt quá 5 lần -> khóa tài khoản tạm thời 15 phút. Sau khi đổi mật khẩu thành công: Hiển thị Toast và tự động đăng xuất tất cả thiết bị.
2. **Độ phức tạp mật khẩu:** Tối thiểu 8 ký tự, bao gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 số.
3. **Quên mật khẩu (UC253):**
    - Hệ thống kiểm tra sự tồn tại của **Số điện thoại hoặc Email** trong cơ sở dữ liệu.
    - **Nếu tồn tại:** Gửi đường dẫn (link) thiết lập lại mật khẩu vào địa chỉ Email đã đăng ký của tài khoản đó.
    - **Nếu không tồn tại:** Hiển thị lỗi: *"Số điện thoại hoặc Email không tồn tại trên hệ thống."*

#### 3.4 Quản lý thiết bị & Sinh trắc học (UC254) [ASSUMPTION]
1. **Quản lý thiết bị:** Hiển thị Tên thiết bị, OS, Vị trí, Thời gian đăng nhập. Cho phép "Đăng xuất thiết bị này" hoặc "Đăng xuất tất cả thiết bị khác".
2. **Sinh trắc học:** Trước khi bật phải xác thực bằng mật khẩu hoặc OS-level biometric prompt. Sau khi bật có toast xác nhận.

#### 3.4 Đa ngôn ngữ (→ Xem CMR-17)

Toàn bộ text cứng trên màn hình UC250-254 (header, label trường form, placeholder, nút submit, thông báo lỗi validation, toast thành công/thất bại) được dịch sang ngôn ngữ hiển thị tương ứng khi người dùng đổi ngôn ngữ. Hỗ trợ 5 ngôn ngữ: VI, EN, ZH, JA, KO. Nội dung dữ liệu người dùng nhập (họ tên, email, mã định danh) hiển thị nguyên bản — không thay đổi theo ngôn ngữ.

---

### 4. Tiêu chí chấp nhận (Acceptance Criteria)

- **AC1:** Tất cả các form nhập mật khẩu phải có icon ẩn/hiện mật khẩu.
- **AC2:** Thông tin định danh doanh nghiệp (MST, Mã định danh) phải được khóa (Read-only) trong màn hình chỉnh sửa tài khoản.
- **AC3:** Luồng chọn địa chỉ 4 cấp phải hoạt động nhất quán, không xảy ra lỗi khi thay đổi cấp cha.
- **AC4:** Thông báo lỗi phải hiển thị inline màu đỏ dưới trường nhập liệu. Format: "[tên trường] là bắt buộc." (Theo CMR-09).
- **AC5:** Hệ thống phải ghi lại lịch sử đăng nhập thiết bị khi người dùng đăng nhập thành công.

---

### 4.1 Yêu cầu phi chức năng (Non-functional Requirements)

| Quy tắc | Mô tả |
|---------|-------|
| Xử lý lỗi chung (CMR-07) | - Lỗi mạng: *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* kèm nút "Thử lại".<br>- Lỗi API (500): *"Hệ thống đang bận. Vui lòng thử lại sau."*<br>- Lỗi 404: *"Nội dung không tồn tại hoặc đã bị xóa."*<br>- Lỗi 401 (Session hết hạn): Hệ thống tự động sử dụng refresh token để cấp lại access token mới. Nếu refresh token đã hết hạn (quá 15 ngày), người dùng được chuyển về màn hình đăng nhập và hiển thị toast: *"Phiên đăng nhập hết hạn."*<br>- Loading state: Mọi API call phải có loading indicator. First-load sử dụng loading state toàn màn hình, các lần tải tiếp theo dùng spinner cục bộ. |
| Pull-to-Refresh (CMR-13) | Màn hình thông tin tài khoản doanh nghiệp hỗ trợ kéo xuống để refresh dữ liệu. Hiển thị spinner trong khi đang refresh. Nếu refresh thất bại: giữ nguyên dữ liệu cũ, hiển thị thông báo lỗi (CMR-07). |
| Debounce Navigation (CMR-18) | Khi người dùng tap nhanh liên tục (double tap) vào các button (Submit, Cancel, Back), hệ thống chỉ nhận action đầu tiên, chờ thực hiện xong trước khi nhận action tiếp theo. |
| Timeout (CMR-16) | Tất cả API call có thời gian phản hồi tối đa 10 giây. Quá 10 giây → hiển thị *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* kèm nút "Thử lại". |

---

## 5. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-05-11 | v2 → v2.1 | Đa ngôn ngữ | (Không có) | Bổ sung section đa ngôn ngữ: text cứng dịch 5 ngôn ngữ (VI, EN, ZH, JA, KO), nội dung dữ liệu người dùng giữ nguyên | Đồng bộ CMR-17 (B2) |
| 2026-05-12 | v2.1 → v2.2 | Inline error format (bắt buộc) | "Vui lòng nhập/chọn [field]." (implicit) | "[field] là bắt buộc." | Đồng bộ CMR-09 v1.4 |
| 2026-05-12 | v2.1 → v2.2 | Bổ sung NFR (§4.1) | (Không có) | CMR-07 (xử lý lỗi chung), CMR-13 (Pull-to-Refresh), CMR-18 (Debounce Navigation), CMR-16 (Timeout 10s) | Đồng bộ Cross-UC Inconsistency Report v2 |
| 2026-05-12 | v2.2 → v2.3 | UC252 Đăng ký | Form 2 loại, OTP SMS | Form 3 loại, gửi Email xác thực, thêm Nơi cấp/Ngày cấp/MST. Bỏ OTP | Áp dụng theo Feedback QnA |
| 2026-05-12 | v2.2 → v2.3 | UC253 Quên MK | Nhập SĐT/Email, OTP SMS | Nhập Mã định danh, gửi Email link reset | Áp dụng theo Feedback QnA |
| 2026-05-12 | v2.2 → v2.3 | UC250 Quản lý DN | Form chung | Chia 2 Tab: Định danh (read-only) và Thông tin khác | Áp dụng theo Feedback QnA |
| 2026-05-12 | v2.2 → v2.3 | UC254 Cấu hình | Có chọn ngôn ngữ, nút Lưu | Tự lưu realtime, bỏ nút lưu. Thêm FaceID, QL Thiết bị | Áp dụng theo Feedback QnA |
| 2026-05-12 | v2.3 → v2.4 | Quy tắc Datepicker | (Chưa có) | Max today, Min 1900, Disable ngày ngoài khoảng | Đồng bộ UX hệ thống |
| 2026-05-12 | v2.3 → v2.4 | UC253 Quên MK | Nhập Mã định danh | Nhập SĐT hoặc Email, gửi link về mail đăng ký | Cập nhật theo phương án (a) |
