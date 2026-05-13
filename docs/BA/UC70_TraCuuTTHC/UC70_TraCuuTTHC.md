# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG
**Tiêu đề:** UC70 — Tra cứu thủ tục hành chính trên Mobile  
**Ngày tạo:** 06/05/2026  
**Phiên bản:** v1.2

| Thuộc tính | Giá trị |
|---|---|
| BA phụ trách | han.luong & huy.lai2 |
| Phân hệ | Ứng dụng Di động (Mobile App) |
| Loại chức năng | Tra cứu thông tin pháp lý |
| Đối tượng thực hiện | Cá nhân / Tổ chức |
| Giao diện | Màn hình Mobile (Portrait) |
| Ngày tạo | 06/05/2026 |
| Phiên bản | v1.1 |

---

## UC70 — Tra cứu thủ tục hành chính trên Mobile

### 1. Mô tả chức năng

**Tên chức năng:** Tra cứu thủ tục hành chính về đầu tư trên Mobile  
**Mô tả:** Chức năng cho phép cá nhân, tổ chức tra cứu, xem danh sách và xem chi tiết các thủ tục hành chính về đầu tư.  
**Phân quyền:** Cá nhân/Tổ chức (không yêu cầu đăng nhập — public access).  
**Truy cập chức năng:** Trang chủ → Sidebar hoặc màn hình liên quan.  
**Chức năng đáp ứng usecase số:** UC70 (Thay thế cho UC73 cũ)

---

### 2. Mô tả giao diện

#### 2.1 Giao diện Tra cứu Thủ tục hành chính (UC70)

**Mô tả giao diện:**  
Màn hình tra cứu thủ tục hành chính.

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| **PHẦN I — TÌM KIẾM & LỌC** | | | | | |   (Xem CMR-02)|
| 1 | Ô tìm kiếm | Textbox (Search) | "Tìm tên thủ tục..." | x | — | **Quy tắc hiển thị:**<br>- Tìm kiếm like.<br>- Tìm kiếm gần đúng (chứa từ khóa). Khi xóa hết từ khóa, danh sách trở về trạng thái mặc định.<br>- Tối đa **500 ký tự** (Xem CMR-01).<br><br>**Quy tắc hành động:**<br>- Nhập từ khóa → Debounce tìm kiếm: 3 giây — hiển thị kết quả tìm kiếm sau 3 giây không gõ thì áp dụng tìm kiếm, không cần nhấn Enter. (Xem CMR-01)<br>- Xử lý whitespace: auto-trim khoảng trắng đầu/cuối trước khi tìm kiếm. Nếu sau trim rỗng → coi như input rỗng (Xem CMR-01).|
| 2 | Lĩnh vực | Dropdown | Tất cả lĩnh vực | x | — | **Quy tắc hành động:**<br>- Lọc theo lĩnh vực quản lý của thủ tục. |
| 3 | Cơ quan thực hiện | Dropdown | Tất cả cơ quan | x | — | **Quy tắc hành động:**<br>- Lọc theo cơ quan có thẩm quyền thực hiện thủ tục. |
| **PHẦN II — DANH SÁCH THỦ TỤC** | | | | | |  |
| 4 | Tên thủ tục | Label (Bold) | — | — | — | **Quy tắc validation:**<br>- Tên đầy đủ của thủ tục hành chính. Max 2 dòng. |
| 5 | Cơ quan thực hiện | Label | — | — | — | **Quy tắc validation:**<br>- Tên cơ quan thực hiện. Max 2 dòng. |
| 6 | Thời hạn giải quyết | Label | — | — | — | **Quy tắc hiển thị:**<br>- VD: "15 ngày làm việc". |
| 7 | Lệ phí | Label | — | — | — | **Quy tắc hiển thị:**<br>- VD: "Không" hoặc số tiền cụ thể. |
| 8 | Tap vào item | Interaction | — | — | — | **Quy tắc hành động:**<br>- Tap → Màn hình Chi tiết thủ tục (Thành phần hồ sơ, Quy trình, Biểu mẫu đính kèm).<br>- **Debounce Navigation (CMR-18):** Khi người dùng tap nhanh liên tục (double tap) vào item thủ tục, hệ thống chỉ nhận action đầu tiên và bỏ qua các tap tiếp theo cho đến khi điều hướng hoàn tất. |

#### 2.2 Giao diện Chi tiết Thủ tục hành chính

| # | Tên trường | Kiểu trường | Mô tả |
|---|---|---|---|
| 1 | Tên thủ tục | Label (H2) | **Quy tắc validation:**<br>- Hiển thị tối đa 2 dòng, quá dài sẽ có dấu ... |
| 2 | Lĩnh vực | Label | **Quy tắc validation:**<br>- Hiển thị tối đa 2 dòng, quá dài sẽ có dấu ... |
| 3 | Cơ quan thực hiện | Label | **Quy tắc validation:**<br>- Hiển thị tối đa 2 dòng, quá dài sẽ có dấu ... |
| 4 | Thời hạn giải quyết | Label | **Quy tắc hiển thị:**<br>- Thời gian xử lý. |
| 5 | Lệ phí | Label | **Quy tắc hiển thị:**<br>- Chi phí nộp hồ sơ. |
| 6 | Thành phần hồ sơ | List (Numbered) | **Quy tắc hiển thị:**<br>- Danh sách tài liệu cần chuẩn bị. |
| 7 | Quy trình thực hiện | List (Numbered Steps) | **Quy tắc hiển thị:**<br>- Các bước thực hiện thủ tục. |
| 8 | Biểu mẫu đính kèm | File List | **Quy tắc hiển thị:**<br>- Tên biểu mẫu + nút Tải xuống. Mở trực tiếp PDF/ảnh, tải file Word/Excel. |

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Xử lý Tìm kiếm & Lọc

- Nhập từ khóa → Debounce tìm kiếm: 3 giây — hiển thị kết quả sau 3 giây không gõ (CMR-01).
- Danh sách kết quả hỗ trợ lazy load 20 bản ghi/lần.
- Hỗ trợ Pull to Refresh (CMR-13): Kéo xuống từ đầu danh sách để tải lại dữ liệu từ API.
- Nếu không có kết quả: *"Không tìm thấy kết quả."* (Xem CMR-14)

#### 3.2 Xử lý lỗi (→ Xem CMR-07)

| Tình huống lỗi | Thông báo hiển thị | Hành vi hệ thống |
| --- | --- | --- |
| Lỗi mạng / Mất kết nối | *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* + nút **"Thử lại"** | Giữ nguyên màn hình, hiển thị nút Thử lại. |
| Lỗi 401 (Session hết hạn) | *"Phiên đăng nhập hết hạn."* (Toast) | Hệ thống tự động sử dụng refresh token để cấp lại access token mới. Nếu refresh token đã hết hạn hoặc không hợp lệ (quá 15 ngày) → chuyển về màn hình Đăng nhập. (Xem CMR-07) |
| Lỗi API (HTTP 500) | *"Hệ thống đang bận. Vui lòng thử lại sau."* | Giữ nguyên màn hình, chỉ hiển thị thông báo. |
| Timeout (API không phản hồi sau 10 giây) | *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + nút **"Thử lại"** | Hiển thị thông báo, giữ nguyên màn hình. |

#### 3.3 Đa ngôn ngữ (→ Xem CMR-17)

Toàn bộ text cứng trên màn hình UC70 (header, placeholder ô tìm kiếm, label dropdown, tên trường danh sách, thông báo lỗi, empty state message) được dịch sang ngôn ngữ hiển thị tương ứng khi người dùng đổi ngôn ngữ. Hỗ trợ 5 ngôn ngữ: VI, EN, ZH, JA, KO. Nội dung dữ liệu từ API (tên thủ tục, cơ quan thực hiện, thời hạn) hiển thị nguyên bản — không thay đổi theo ngôn ngữ.

---

## 4. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-05-11 | v1 → v1.1 | Xử lý lỗi — HTTP 401 | (Không có) | Bổ sung xử lý lỗi 401: auto refresh token, nếu hết hạn >15 ngày → redirect đăng nhập + toast "Phiên đăng nhập hết hạn." | Đồng bộ CMR-07 (B1) |
| 2026-05-11 | v1 → v1.1 | Đa ngôn ngữ | (Không có) | Bổ sung section đa ngôn ngữ: text cứng dịch 5 ngôn ngữ (VI, EN, ZH, JA, KO), nội dung API giữ nguyên | Đồng bộ CMR-17 (B2) |
| 2026-05-11 | v1 → v1.1 | Debounce Navigation | (Không có) | Tap nhanh liên tục vào item thủ tục → chỉ nhận action đầu tiên, bỏ qua tap tiếp theo cho đến khi điều hướng hoàn tất | Đồng bộ CMR-18 (B3) |
| 2026-05-11 | v1 → v1.1 | Pull-to-Refresh | (Không có) | Bổ sung hỗ trợ kéo xuống từ đầu danh sách để tải lại dữ liệu | Đồng bộ CMR-13 (B4) |
| 2026-05-11 | v1 → v1.1 | Ô tìm kiếm | Không có max length, không có whitespace | Bổ sung: tối đa 500 ký tự (CMR-01), auto-trim whitespace đầu/cuối trước khi tìm kiếm | Đồng bộ CMR-01 (C3) |
| 2026-05-12 | v1.1 → v1.2 | Search debounce | Hiển thị tự động ngay (không debounce) | Debounce 3 giây (CMR-01) | Đồng bộ CMR-01 v1.4 |
