# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG
**Tiêu đề:** UC258 & UC259 — Nhận thông báo hệ thống trên Mobile  
**Ngày thực hiện:** 08/05/2026  
**Tác giả:** Antigravity (Senior BA)
**Phiên bản:** v2

| Thuộc tính | Giá trị |
|---|---|
| BA phụ trách | huy.lai2 |
| Phân hệ | Ứng dụng Di động (Mobile App) |
| Loại chức năng | Thông báo |
| Đối tượng thực hiện | Cá nhân / Tổ chức (đã đăng nhập) |
| Giao diện | Màn hình Mobile (Portrait) |
| Ngày tạo | 29/04/2026 |
| Ngày cập nhật | 08/05/2026 |
| Phiên bản | v2 |


---

## UC258 & UC259 — Thông báo hệ thống & kết quả xử lý hồ sơ trên Mobile

### 1. Mô tả chức năng

**Tên chức năng:** Nhận thông báo hệ thống và kết quả xử lý hồ sơ trên Mobile  
**Mô tả:** Chức năng cho phép người dùng xem danh sách thông báo được hệ thống gửi đến. Thông báo bao gồm hai loại chính: thông báo hệ thống (UC258) và thông báo kết quả xử lý hồ sơ (UC259). Người dùng có thể xem chi tiết từng thông báo và đánh dấu đã đọc.  
**Phân quyền:** Cá nhân/Tổ chức đã đăng nhập.  
**Truy cập chức năng:** Trang chủ → Icon Thông báo (🔔) ở Header.  
- **Điều kiện kết thúc (Postconditions):** Trạng thái "Đã đọc" của thông báo được cập nhật đồng bộ trên hệ thống. Badge số lượng thông báo giảm tương ứng.
- **Chức năng đáp ứng usecase số:** UC258, UC259 (Phụ lục XIV)

---

### 2. Mô tả giao diện

#### 2.1 Màn hình Danh sách Thông báo

**Mô tả giao diện:**
Header chứa nút Quay lại, tiêu đề "Thông báo", và nút Đánh dấu đã đọc tất cả (Icon tick đôi). Bên dưới là 2 tab: "Cảnh báo" và "Thông báo" (kèm badge số lượng chưa đọc màu đỏ). Nội dung hiển thị danh sách dạng thẻ (card) cuộn dọc. Mỗi tab có giao diện danh sách riêng biệt.

**Khung Header & Tabs:**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
| - | ---------- | ----------- | ---------------- | -------- | -------- | ------------- |
| 1 | Nút Quay lại (←) | Button (Icon) | — | — | — | **Quy tắc hành động:** Tap → Quay về màn hình trước. (Xem CMR-06) |
| 2 | Tiêu đề Header | Label | "Thông báo" | — | — | **Quy tắc hiển thị:** Nằm giữa header, font chữ đậm. |
| 3 | Nút "Đánh dấu đã đọc tất cả" | Button (Icon tick đôi) | — | — | — | **Hành động:** Tap → Đánh dấu toàn bộ thông báo và cảnh báo thành trạng thái đã đọc. |
| 4 | Tab "Cảnh báo" | Tab | — | — | — | **Hành động:** Tap → Hiển thị danh sách cảnh báo. |
| 5 | Tab "Thông báo" | Tab | — | — | — | **Quy tắc hiển thị:** Hiển thị số lượng thông báo chưa đọc dưới dạng badge đỏ. |

**Khung Danh sách Cảnh báo (Tab "Cảnh báo"):**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
| - | ---------- | ----------- | ---------------- | -------- | -------- | ------------- |
| 6 | Danh sách Card Cảnh báo | List Card | — | — | — | **Hiển thị:** Nền card trắng viền bo góc. Viền đỏ nếu "Quá hạn", viền cam nếu "Sắp đến hạn".<br>**Hành động:** Pull to Refresh. Tap → Điều hướng xử lý. |
| 7 | Icon Cảnh báo | Image (Icon) | — | — | — | **Hiển thị:** Icon chấm than đỏ (Quá hạn) hoặc Icon loại cảnh báo màu cam. |
| 8 | Tiêu đề cảnh báo | Label | — | — | — | **Hiển thị:** Font đậm. Tối đa 1 dòng. |
| 9 | Badge trạng thái | Label | — | — | — | **Hiển thị:** Badge nền đỏ/cam tương ứng trạng thái. |
| 10 | Nội dung chi tiết | Text | — | — | — | **Hiển thị:** Căn trái. Tối đa 2 dòng, truncate (...) nếu dài hơn. |
| 11 | Thời gian | Label | — | — | — | **Hiển thị:** "Quá hạn X ngày" hoặc "Còn X ngày". |
| 12 | Ngày đến hạn | Label | — | — | — | **Hiển thị:** DD/MM/YYYY. |

**Khung Danh sách Thông báo (Tab "Thông báo"):**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
| - | ---------- | ----------- | ---------------- | -------- | -------- | ------------- |
| 14 | Danh sách Card Thông báo | List Card | — | — | — | **Hiển thị:** Nền card trắng. Viền xanh nhạt nếu chưa đọc.<br>**Hành động:** Tap → Đánh dấu đã đọc và mở chi tiết. |
| 15 | Icon & Trạng thái | Image (Icon) | — | — | — | **Hiển thị:** Chấm đỏ góc icon nếu chưa đọc. |
| 16 | Badge loại | Label | — | — | — | **Hiển thị:** "Kết quả" (Xanh lá) hoặc "Hệ thống" (Xanh dương). |
| 17 | Tiêu đề | Label | — | — | — | **Hiển thị:** In đậm nếu chưa đọc. Tối đa 1 dòng. |
| 18 | Nội dung | Text | — | — | — | **Hiển thị:** Tối đa 2 dòng, truncate (...). |
| 19 | Thời gian nhận | Label | — | — | — | **Hiển thị:** Định dạng tương đối (X phút trước). |

---

#### 2.2 Màn hình Chi tiết Thông báo

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
| - | ---------- | ----------- | ---------------- | -------- | -------- | ------------- |
| 1 | Tiêu đề | Label (H2) | — | — | — | **Hiển thị:** Full text, font đậm. |
| 2 | Thời gian gửi | Label | — | — | — | **Hiển thị:** DD/MM/YYYY HH:mm. |
| 3 | Nội dung đầy đủ | Rich Text | — | — | — | **Hiển thị:** Hỗ trợ Bold, Italic, Link. |
| 4 | Nút hành động | Button (Primary) | — | — | — | **Hành động:** Tap → Điều hướng đến màn hình xử lý nghiệp vụ liên quan. |

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Luồng xem danh sách
1. **Ưu tiên hiển thị:** 
    - Ưu tiên Tab có thông báo chưa đọc mới nhất.
    - Nếu cả 2 có tin mới cùng lúc -> Ưu tiên Tab "Cảnh báo".
2. **Lazy Load:** Tải 20 bản ghi/lần (CMR-04). 
    - Nếu API lỗi khi tải thêm -> Hiển thị nút "Tải lại" ở cuối danh sách.
3. **Empty State:** Hiển thị placeholder theo CMR-14.
4. **Debounce Interaction:** Chống double-tap khi mở card thông báo để tránh mở 2 màn hình chi tiết trùng nhau.

#### 3.2 Push Notification & i18n
1. **Push Behavior:**
    - **Foreground:** Hiện In-app Banner trong 3 giây -> Tự động cập nhật Badge icon chuông.
    - **Background:** Hiện Banner OS -> Tap mở app điều hướng chi tiết.
2. **Đa ngôn ngữ (i18n):** 
    - Nội dung thông báo (Tiêu đề/Nội dung) được server trả về theo ngôn ngữ người dùng đã cài đặt tại thời điểm phát sinh thông báo. 
    - Các nhãn hệ thống (Badge, Tab) thay đổi theo cài đặt ngôn ngữ hiện tại của App (UC254).

#### 3.3 Đồng bộ trạng thái
1. **Real-time Sync:** Trạng thái "Đã đọc" được đồng bộ tức thì lên server. Nếu người dùng mở app trên thiết bị khác (hoặc Web), thông báo đó phải hiển thị đã đọc.

#### 3.4 Xử lý lỗi (Tham chiếu CMR-07)
1. Áp dụng các mẫu thông báo lỗi mạng và hệ thống theo quy chuẩn chung của ứng dụng.

---

### 4. Tiêu chí chấp nhận (Acceptance Criteria)

- **AC1:** Giao diện khớp mockup 100% về màu sắc viền card và icon theo trạng thái (Quá hạn/Sắp đến hạn/Chưa đọc).
- **AC2:** Trạng thái "Đã đọc" phải cập nhật ngay lập tức (Xóa chấm đỏ, bỏ in đậm) sau hành động của người dùng.
- **AC3:** Badge số lượng chưa đọc trên icon Header và Tab phải luôn chính xác và đồng bộ.
- **AC4:** Lazy load hoạt động mượt mà, hỗ trợ tải lại nếu gặp lỗi mạng giữa chừng.
- **AC5:** In-app Toast hiển thị đúng 3 giây khi có thông báo mới ở trạng thái Foreground.
- **AC6:** Đảm bảo không xảy ra hiện tượng chồng chéo điều hướng khi tap nhanh liên tục vào card.
