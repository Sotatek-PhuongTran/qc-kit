# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG
**Tiêu đề:** UC258 & UC259 — Nhận thông báo hệ thống trên Mobile  
**Ngày thực hiện:** 08/05/2026  
**Tác giả:** Antigravity (Senior BA)
**Phiên bản:** v3

| Thuộc tính | Giá trị |
|---|---|
| BA phụ trách | huy.lai2 |
| Phân hệ | Ứng dụng Di động (Mobile App) |
| Loại chức năng | Thông báo |
| Đối tượng thực hiện | Cá nhân / Tổ chức (đã đăng nhập) |
| Giao diện | Màn hình Mobile (Portrait) |
| Ngày tạo | 29/04/2026 |
| Ngày cập nhật | 08/05/2026 |
| Phiên bản | v3 |


---

## UC258 & UC259 — Thông báo hệ thống & kết quả xử lý hồ sơ trên Mobile

### 1. Mô tả chức năng

**Tên chức năng:** Nhận thông báo hệ thống và kết quả xử lý hồ sơ trên Mobile  
**Mô tả:** Chức năng cho phép người dùng xem danh sách thông báo được hệ thống gửi đến. Thông báo bao gồm hai loại chính: thông báo hệ thống (UC258) và thông báo kết quả xử lý hồ sơ (UC259). Người dùng có thể xem chi tiết từng thông báo và đánh dấu đã đọc.  
**Phân quyền:** Cá nhân/Tổ chức đã đăng nhập.  
**Truy cập chức năng:** Trang chủ → Icon Thông báo (🔔) ở Header.  
- **Điều kiện kết thúc (Postconditions):** Trạng thái "Đã đọc" của thông báo được cập nhật đồng bộ trên hệ thống. Badge số lượng thông báo giảm tương ứng.
- **Chức năng đáp ứng usecase số:** UC258, UC259 (Phụ lục XIV — Nhóm E.II)

---

### 2. Mô tả giao diện

#### 2.1 Màn hình Danh sách Thông báo

Header chứa nút Quay lại, tiêu đề "Thông báo", và nút Đánh dấu đã đọc tất cả (Icon tick đôi). Bên dưới là 2 tab: "Cảnh báo" và "Thông báo" (kèm badge số lượng chưa đọc màu đỏ).

#### 2.2 Màn hình Chi tiết Thông báo
Hiển thị tiêu đề, thời gian và nội dung Rich Text của thông báo.

#### 2.3 Phân loại và ưu tiên hiển thị thông báo (Bổ sung)

| Loại thông báo | Màu badge | Độ ưu tiên | Ví dụ nội dung |
|---|---|---|---|
| Kết quả xử lý hồ sơ | Xanh dương | Cao | "Hồ sơ [MÃ] của bạn đã được tiếp nhận". |
| Yêu cầu bổ sung hồ sơ | Cam | Cao | "Hồ sơ [MÃ] yêu cầu bổ sung tài liệu trước ngày...". |
| Thông báo hệ thống | Xám | Thấp | "Hệ thống bảo trì ngày XX/XX". |
| Nhắc hạn | Đỏ | Cao | "Hạn nộp báo cáo định kỳ còn 3 ngày". |

#### 2.4 Giao diện Cài đặt thông báo (từ Cấu hình tài khoản)

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Push notification kết quả hồ sơ | Toggle | Bật | x | — | Bật/tắt push cho loại thông báo hồ sơ. |
| 2 | Push notification hệ thống | Toggle | Bật | x | — | Bật/tắt push cho thông báo hệ thống. |
| 3 | Push notification nhắc hạn | Toggle | Bật | x | — | Bật/tắt push nhắc hạn. |

#### 2.5 Deep Link từ Push Notification

| Loại thông báo | Hành vi khi Tap vào Banner |
|---|---|
| Kết quả xử lý hồ sơ | Mở thẳng màn hình Chi tiết hồ sơ liên quan (UC46). |
| Yêu cầu bổ sung | Mở thẳng màn hình Chi tiết hồ sơ liên quan (UC46). |
| Thông báo hệ thống | Mở màn hình danh sách Thông báo (Tab Hệ thống). |
| Nhắc hạn | Mở màn hình phù hợp (hồ sơ, lịch hẹn...) tùy theo loại nhắc. |

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Luồng xem danh sách
1. **Ưu tiên hiển thị:** Ưu tiên Tab có thông báo chưa đọc mới nhất -> Tab "Cảnh báo".
2. **Lazy Load:** Tải 20 bản ghi/lần. Hỗ trợ nút "Tải lại" nếu API lỗi.
3. **Debounce Interaction:** Chống double-tap khi mở card.

#### 3.2 Push Notification & i18n
1. **Foreground:** Hiện In-app Banner trong **4 giây** (Cập nhật từ 3s).
2. **Background:** Hiện Banner OS -> Tap mở app điều hướng theo Deep Link (mục 2.5).
3. **i18n:** Nội dung server trả về theo ngôn ngữ người dùng tại thời điểm phát sinh tin.

#### 3.3 Đồng bộ trạng thái
1. **Real-time Sync:** Trạng thái "Đã đọc" đồng bộ tức thì lên server và các nền tảng khác.

#### 3.4 Xử lý Đánh dấu tất cả đã đọc (Bổ sung)
1. Người dùng tap "Đánh dấu tất cả đã đọc" (Icon tick đôi).
2. Hệ thống gọi API batch-update đánh dấu tất cả thông báo trong tab hiện tại là đã đọc.
3. UI cập nhật: Xóa chấm đỏ, badge trên icon chuông cập nhật lại số lượng chính xác.

---

### 4. Tiêu chí chấp nhận (Acceptance Criteria)

- **AC1:** Giao diện khớp mockup về màu sắc badge theo loại thông báo (Blue/Orange/Grey/Red).
- **AC2:** Deep link phải điều hướng chính xác đến UC46 cho các thông báo liên quan đến hồ sơ.
- **AC3:** Thời gian hiển thị In-app banner phải đạt đúng 4 giây.
- **AC4:** Tính năng "Đánh dấu tất cả" phải cập nhật trạng thái đồng bộ cho toàn bộ tab hiện tại.

---

## 5. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-05-08 | v2 -> v3 | Toàn bộ tài liệu | Tài liệu v2 | Tài liệu v3 tích hợp nội dung bổ sung | Hợp nhất chi tiết từ file BoSung |
| 2026-05-08 | v2 -> v3 | Mục 2.3, 2.4, 2.5 | (Không có) | Thêm phân loại, Cài đặt và Deep link | Bổ sung theo yêu cầu nghiệp vụ chi tiết |
| 2026-05-08 | v2 -> v3 | Mục 3.2.1 | Hiện Banner trong 3 giây | Hiện Banner trong 4 giây | Cập nhật thời gian hiển thị banner |
| 2026-05-08 | v2 -> v3 | Mục 3.4 | (Không có) | Xử lý Đánh dấu tất cả đã đọc | Bổ sung logic xử lý theo lô |
