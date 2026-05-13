# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG
**Tiêu đề:** UC257 — Đăng xuất ứng dụng Mobile  
**Ngày thực hiện:** 12/05/2026  
**Tác giả:** Antigravity (Senior BA)
**Phiên bản:** v2.2

| Thuộc tính | Giá trị |
|---|---|
| BA phụ trách | huy.lai2 |
| Phân hệ | Ứng dụng Di động (Mobile App) |
| Loại chức năng | Xác thực & Phân quyền |
| Đối tượng thực hiện | Cá nhân / Tổ chức (đã đăng nhập) |
| Giao diện | Màn hình Mobile (Portrait) |
| Ngày tạo | 29/04/2026 |
| Ngày cập nhật | 12/05/2026 |
| Phiên bản | v2.2 |


---

## UC257 — Đăng xuất ứng dụng Mobile

### 1. Mô tả chức năng

**Tên chức năng:** Đăng xuất ứng dụng Mobile  
**Mô tả:** Chức năng cho phép người dùng đã đăng nhập kết thúc phiên làm việc hiện tại, xóa thông tin phiên đăng nhập khỏi thiết bị và quay trở về màn hình Đăng nhập.  
**Phân quyền:** Toàn bộ người dùng đang đăng nhập.  
**Truy cập chức năng:** Menu chính (Sidebar) → Mục "Cấu hình tài khoản" → Màn hình Cài đặt → Nút "Đăng xuất".  
**Điều kiện tiên quyết (Preconditions):** Người dùng đang ở trạng thái đã đăng nhập và phiên làm việc còn hiệu lực.
**Điều kiện kết thúc (Postconditions):** Thông tin phiên làm việc, token bảo mật, dữ liệu cache và Push Token bị xóa khỏi thiết bị; hệ thống chuyển hướng về màn hình Đăng nhập.
**Chức năng đáp ứng usecase số:** UC257 (Phụ lục XIV — STT 257)

---

### 2. Mô tả giao diện

#### 2.1 Giao diện Màn hình Cài đặt (Tham chiếu: Đăng xuất.png)

Màn hình hiển thị thông tin tài khoản và các tùy chọn quản lý.

| # | Tên trường | Kiểu trường | Giá trị mặc định | Mô tả/Ghi chú |
|---|---|---|---|---|
| 1 | Header hệ thống | Component | — | **Shared Component:** Nền đỏ, Logo FIA, Tên hệ thống "CỔNG MỘT CỬA ĐẦU TƯ QUỐC GIA". |
| 2 | Khu vực thông tin User | Container | — | Hiển thị thông tin người dùng đang đăng nhập. |
| 3 | - Avatar | Image | — | Hình tròn, hiển thị ký tự đầu của Tên người dùng (Initials). |
| 4 | - Tên người dùng | Label | — | Hiển thị họ và tên đầy đủ (VD: Lương Ngọc Hân). |
| 5 | - Email | Label | — | Hiển thị địa chỉ email tài khoản. |
| 6 | Nhóm Quản lý tài khoản | List | — | Danh sách các menu điều hướng (Xem mục 3.5 về quy tắc làm mờ). |
| 7 | - Tài khoản cá nhân | Item | — | Dẫn tới UC quản lý thông tin cá nhân. |
| 8 | - Quản lý doanh nghiệp | Item | — | Dẫn tới UC quản lý thông tin tổ chức. |
| 9 | - Đổi mật khẩu | Item | — | Dẫn tới UC251. |
| 10 | - Cấu hình tài khoản | Item | — | Dẫn tới UC254. |
| 11 | Nút "Đăng xuất" | Button (Outline) | "Đăng xuất" | Nằm cuối màn hình. Viền đỏ, chữ đỏ. **Debounce:** Áp dụng CMR-18. Tap -> Hiện Dialog xác nhận. |

#### 2.2 Giao diện Dialog Xác nhận Đăng xuất

Modal Dialog xuất hiện ở giữa màn hình (Overlay).

| # | Tên trường | Kiểu trường | Giá trị mặc định | Mô tả/Ghi chú |
|---|---|---|---|---|
| 1 | Tiêu đề | Label | "Xác nhận đăng xuất" | Font đậm. |
| 2 | Nội dung | Label | "Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?" | Ghi chú: Sử dụng nội dung ngắn gọn theo v1. |
| 3 | Nút "Đăng xuất" | Button (Danger) | — | Tap -> Thực hiện luồng xử lý 3.1. **Debounce:** Áp dụng CMR-18. |
| 4 | Nút "Hủy" | Button (Secondary) | — | Tap -> Đóng dialog, không đăng xuất. |

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Xử lý Đăng xuất
1. **Xác nhận:** Hiển thị Dialog xác nhận. 
   - **Outside Tap:** Tap vào vùng overlay bên ngoài Dialog sẽ KHÔNG đóng dialog.
   - **Android Back button:** Đóng dialog (không đăng xuất).
2. **Gọi API Logout:** Khi user nhấn "Đăng xuất", hệ thống hiển thị **Loading Overlay** (CMR-07) và gọi API thu hồi token trên Server.
3. **Dọn dẹp (Client):** Sau khi API phản hồi thành công (hoặc fallback), xóa sạch Token, User Info, Secure Storage, Cache.
4. **Điều hướng:** Về màn hình Đăng nhập. Hiển thị Toast thông báo: *"Đăng xuất thành công."*

#### 3.2 Xử lý Android Back button (Hardware)
- **Tại màn hình Cài đặt:** Tap Back button -> Quay về màn hình Trang chủ (Home).
- **Khi Dialog xác nhận đang mở:** Tap Back button -> Đóng Dialog (giữ nguyên tại màn hình Cài đặt).

#### 3.3 Xử lý Ngoại lệ
- **Timeout (API Logout):** Quá **10 giây** (CMR-16) -> Thực hiện Fallback: Xóa local data, điều hướng Login, hiển thị Toast: *"Đã đăng xuất khỏi thiết bị."*
- **Lỗi 401 (Token hết hạn khi đang Logout):** Vẫn gọi API -> Nhận lỗi 401 -> Áp dụng CMR-07: Hiển thị toast *"Phiên đăng nhập hết hạn"*, xóa local và điều hướng về Login.
- **Lỗi mạng:** Thực hiện quy trình Fallback tương tự trường hợp Timeout.

#### 3.4 Phân loại Tài khoản (Cá nhân vs Tổ chức)
- **Tài khoản Cá nhân:** Menu "Quản lý doanh nghiệp" bị làm mờ (blur), không cho phép tương tác.
- **Tài khoản Tổ chức:** Menu "Tài khoản cá nhân" bị làm mờ (blur), không cho phép tương tác.
- Luồng đăng xuất là chung cho cả hai loại tài khoản.

#### 3.5 Tiêu chí chấp nhận (Acceptance Criteria)
- **AC1:** Dialog xác nhận phải được phản hồi bằng nút bấm (không được đóng bằng tap ngoài).
- **AC2:** Phải có loading indicator khi đang xử lý API logout.
- **AC3:** Token phiên và Push Token phải bị vô hiệu hóa trên Server (nếu có mạng).
- **AC4:** Hệ thống phải điều hướng về màn hình Login ngay cả khi API logout gặp lỗi mạng hoặc timeout 10s.

#### 3.6 Đa ngôn ngữ (→ Xem CMR-17)
Toàn bộ text cứng trên màn hình (Dialog, Menu, Button, Toast) hỗ trợ 5 ngôn ngữ: VI, EN, ZH, JA, KO.

---

## 4. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-05-11 | v2 → v2.1 | Đa ngôn ngữ | (Không có) | Bổ sung section đa ngôn ngữ: text cứng dịch 5 ngôn ngữ (VI, EN, ZH, JA, KO) | Đồng bộ CMR-17 (B2) |
| 2026-05-12 | v2.1 → v2.2 | Cập nhật UI & Logic Logout | Màn hình Sidebar, Nút Đăng xuất filled, Timeout 5s, Text Dialog v2 | Màn hình Cài đặt, Nút Đăng xuất Outline, Timeout 10s, Back button behavior, Blur menu theo loại TK, Xử lý 401 | Theo Feedback BA & Wireframe |
ỗi mạng khi gọi API logout.

#### 3.3 Yêu cầu phi chức năng (NFR)
- **Bảo mật:** Không được để lại bất kỳ dữ liệu định danh nào trên LocalStorage sau khi đăng xuất.
- **Hiệu năng:** Luồng đăng xuất (xóa dữ liệu và điều hướng) phải hoàn tất trong vòng dưới 2 giây.

#### 3.4 Đa ngôn ngữ (→ Xem CMR-17)

Toàn bộ text cứng trên màn hình UC257 (popup xác nhận đăng xuất, nút "Xác nhận"/"Hủy", toast thông báo) được dịch sang ngôn ngữ hiển thị tương ứng khi người dùng đổi ngôn ngữ. Hỗ trợ 5 ngôn ngữ: VI, EN, ZH, JA, KO.

---

## 4. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-05-11 | v2 → v2.1 | Đa ngôn ngữ | (Không có) | Bổ sung section đa ngôn ngữ: text cứng dịch 5 ngôn ngữ (VI, EN, ZH, JA, KO) | Đồng bộ CMR-17 (B2) |
