# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG
**Tiêu đề:** UC258 & UC259 — Nhận thông báo hệ thống trên Mobile  
**Ngày tạo:** 29/04/2026  
**Phiên bản:** v1.2

| Thuộc tính | Giá trị |
|---|---|
| BA phụ trách | huy.lai2 |
| Phân hệ | Ứng dụng Di động (Mobile App) |
| Loại chức năng | Thông báo |
| Đối tượng thực hiện | Cá nhân / Tổ chức (đã đăng nhập) |
| Giao diện | Màn hình Mobile (Portrait) |
| Ngày tạo | 29/04/2026 |
| Phiên bản | v1 |


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
| 1 | Nút Quay lại (←) | Button (Icon) | — | — | — | **Quy tắc hành động:**<br>- Tap → Quay về màn hình trước. (Xem CMR-06) |
| 2 | Tiêu đề Header | Label | "Thông báo" | — | — | **Quy tắc hiển thị:**<br>- Nằm giữa header, font chữ đậm. |
| 3 | Nút "Đánh dấu đã đọc tất cả" | Button (Icon tick đôi) | — | — | — | **Quy tắc hiển thị:**<br>- Nằm góc phải header.<br><br>**Quy tắc hành động:**<br>- Tap → Đánh dấu toàn bộ thông báo và cảnh báo thành trạng thái đã đọc. (Tham chiếu: CF_01) |
| 4 | Tab "Cảnh báo" | Tab | — | — | — | **Quy tắc hành động:**<br>- Tap → Hiển thị danh sách cảnh báo. |
| 5 | Tab "Thông báo" | Tab | — | — | — | **Quy tắc hiển thị:**<br>- Hiển thị số lượng thông báo chưa đọc dưới dạng badge màu đỏ (ví dụ: số 3).<br><br>**Quy tắc hành động:**<br>- Tap → Hiển thị danh sách thông báo. |

**Khung Danh sách Cảnh báo (Tab "Cảnh báo"):**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
| - | ---------- | ----------- | ---------------- | -------- | -------- | ------------- |
| 6 | Danh sách Card Cảnh báo | List Card (Vertical Scroll) | — | — | — | **Quy tắc hiển thị:**<br>- Nền card trắng viền bo góc.<br>- Nếu là cảnh báo "Quá hạn", card có viền màu đỏ nhạt.<br>- Nếu là cảnh báo "Sắp đến hạn", card có viền màu vàng/cam nhạt.<br><br>**Quy tắc hành động:**<br>- Hỗ trợ Pull to Refresh (Xem CMR-13): Kéo xuống tải lại danh sách.<br>- Tap → Điều hướng đến màn hình xử lý tương ứng với cảnh báo.<br>- **Debounce Navigation (CMR-18):** Khi người dùng tap nhanh liên tục (double tap) vào item thông báo/cảnh báo, hệ thống chỉ nhận action đầu tiên và bỏ qua các tap tiếp theo cho đến khi điều hướng hoàn tất. |
| 7 | Icon Cảnh báo | Image (Icon) | — | — | — | **Quy tắc hiển thị:**<br>- "Quá hạn": Icon chấm than đỏ, nền tròn hồng nhạt.<br>- "Sắp đến hạn": Icon tương ứng loại cảnh báo (tài liệu, đồng hồ, tiền tệ...), màu cam, nền tròn vàng nhạt. |
| 8 | Tiêu đề cảnh báo | Label | — | — | — | **Quy tắc hiển thị:**<br>- Tóm tắt nội dung cảnh báo. Font đậm (Ví dụ: Cảnh báo quá hạn, Nhắc hạn bổ sung hồ sơ). |
| 9 | Badge trạng thái | Label | — | — | — | **Quy tắc hiển thị:**<br>- "Quá hạn": Badge nền đỏ, text trắng.<br>- "Sắp đến hạn": Badge nền cam, text trắng. |
| 10 | Nội dung chi tiết | Text | — | — | — | **Quy tắc hiển thị:**<br>- Căn trái, hiển thị mô tả cụ thể về hồ sơ/dự án cần xử lý. Hiển thị tối đa 2 dòng, quá dài sẽ truncate (...). |
| 11 | Thời gian còn lại / quá hạn | Label | — | — | — | **Quy tắc hiển thị:**<br>- Căn trái góc dưới.<br>- Ví dụ: "Quá hạn 2 ngày" (màu đỏ) hoặc "Còn 2 ngày" (màu cam). |
| 12 | Ngày đến hạn | Label | — | — | — | **Quy tắc hiển thị:**<br>- Căn phải góc dưới. Định dạng: DD/MM/YYYY. |
| 13 | Nút mũi tên (>) | Icon | — | — | — | **Quy tắc hiển thị:**<br>- Căn phải góc trên. |

**Khung Danh sách Thông báo (Tab "Thông báo"):**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
| - | ---------- | ----------- | ---------------- | -------- | -------- | ------------- |
| 14 | Danh sách Card Thông báo | List Card (Vertical Scroll) | — | — | — | **Quy tắc hiển thị:**<br>- Nền card trắng viền bo góc. Nếu chưa đọc có viền màu xanh nhạt.<br><br>**Quy tắc hành động:**<br>- Hỗ trợ Pull to Refresh (Xem CMR-13).<br>- Tap → Đánh dấu đã đọc và mở màn hình chi tiết thông báo. |
| 15 | Icon Thông báo & Trạng thái đọc | Image (Icon) | — | — | — | **Quy tắc hiển thị:**<br>- Icon theo loại (Check, Document, Chat, Setting, Info...). Nền tròn màu xanh nhạt.<br>- **Chấm đỏ góc trên bên phải icon**: Hiển thị nếu chưa đọc. Biến mất sau khi đọc. |
| 16 | Badge loại thông báo | Label | — | — | — | **Quy tắc hiển thị:**<br>- "Kết quả": Badge nền xanh lá nhạt, chữ xanh lá đậm.<br>- "Hệ thống": Badge nền xanh dương nhạt, chữ xanh dương đậm. |
| 17 | Tiêu đề thông báo | Label | — | — | — | **Quy tắc hiển thị:**<br>- Tóm tắt nội dung thông báo. In đậm nếu chưa đọc. |
| 18 | Nội dung chi tiết | Text | — | — | — | **Quy tắc hiển thị:**<br>- Căn trái. Mô tả chi tiết thông báo. Hiển thị tối đa 2 dòng, quá dài sẽ truncate (...). |
| 19 | Thời gian nhận | Label | — | — | — | **Quy tắc hiển thị:**<br>- Căn trái góc dưới. Định dạng tương đối (Ví dụ: "10 phút trước", "1 giờ trước"). |
| 20 | Ngày thông báo | Label | — | — | — | **Quy tắc hiển thị:**<br>- Căn phải góc dưới. Định dạng: DD/MM/YYYY. |
| 21 | Nút mũi tên (>) | Icon | — | — | — | **Quy tắc hiển thị:**<br>- Căn phải góc trên. |

#### 2.2 Màn hình Chi tiết Thông báo

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
| - | ---------- | ----------- | ---------------- | -------- | -------- | ------------- |
| 1 | Tiêu đề thông báo | Label (H2) | — | — | — | **Quy tắc hiển thị:**<br>- Hiển thị toàn bộ tiêu đề (full text). Font đậm. |
| 2 | Thời gian gửi | Label | — | — | — | **Quy tắc hiển thị:**<br>- Định dạng: DD/MM/YYYY HH:mm. |
| 3 | Nội dung đầy đủ | Rich Text | — | — | — | **Quy tắc hiển thị:**<br>- Nội dung chi tiết. Hỗ trợ định dạng cơ bản (Bold, Italic, Link). |
| 4 | Nút "Xem chi tiết hồ sơ/dự án" | Button (Primary) | — | — | — | **Quy tắc hiển thị:**<br>- Hiển thị nếu thông báo liên quan đến đối tượng cụ thể có thể điều hướng (Hồ sơ, Dự án...).<br><br>**Quy tắc hành động:**<br>- Tap → Điều hướng thẳng đến màn hình chi tiết đối tượng tương ứng. |

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Luồng xem danh sách thông báo và cảnh báo
1. Người dùng tap Icon Thông báo trên Header từ màn hình bất kỳ.
2. Hệ thống mặc định hiển thị Tab "Cảnh báo" hoặc Tab "Thông báo" theo quy tắc:
   - Ưu tiên hiển thị Tab có thông báo/cảnh báo mới nhất chưa đọc.
   - Nếu cả 2 tab đều có thông báo mới cùng lúc, ưu tiên hiển thị Tab "Cảnh báo" (UC258).
3. API lấy danh sách tương ứng cho tab được chọn, sắp xếp theo thời gian giảm dần (mới nhất lên đầu).
4. **Lazy Load:** Tải 20 bản ghi mỗi lần tải. Cuộn đến cuối danh sách → Tự động tải trang tiếp theo. Hiện loading indicator ở cuối danh sách khi đang tải. Khi không còn dữ liệu, ẩn loading indicator.
5. **Trạng thái Empty:** Nếu không có dữ liệu, hiển thị placeholder "Không có dữ liệu.".
6. Badge số lượng trên icon chuông ở màn hình chính và trên Tab "Thông báo" được hiển thị đồng bộ với số lượng thông báo/cảnh báo chưa đọc.

#### 3.2 Luồng xử lý đọc thông báo
1. Người dùng tap vào một Card thông báo ở trạng thái chưa đọc.
2. Hệ thống gọi API đánh dấu thông báo này là "Đã đọc".
3. UI cập nhật tức thì: Chấm đỏ trên Icon biến mất, màu nền/viền Card chuyển về trạng thái đã đọc, text tiêu đề hết in đậm.
4. Badge số lượng chưa đọc trên Header và Tab giảm đi 1.
5. Màn hình điều hướng sang Chi tiết thông báo (đối với Thông báo) hoặc trực tiếp vào màn hình xử lý nghiệp vụ (đối với Cảnh báo).

#### 3.3 Luồng đánh dấu đã đọc tất cả
1. Người dùng tap vào nút "Tick đôi" trên góc phải Header.
2. Hệ thống gọi API đánh dấu tất cả thông báo và cảnh báo của người dùng thành "Đã đọc".
3. Toàn bộ danh sách trên 2 tab tự động loại bỏ các yếu tố UI của trạng thái "Chưa đọc" (chấm đỏ, viền nổi bật, chữ in đậm).
4. Badge số lượng trên Icon Header và trên Tab biến mất hoàn toàn.

#### 3.4 Push Notification (Background & Foreground)
- Thông báo được gửi qua **push notification (in-app hoặc thiết bị)**.
- **Trạng thái Background (Ứng dụng đang đóng/chạy nền):** Người dùng nhận được banner thông báo của OS. Tap vào banner → Mở ứng dụng và điều hướng thẳng đến màn hình Chi tiết thông báo hoặc màn hình xử lý liên quan.
- **Trạng thái Foreground (Ứng dụng đang mở):** Hiển thị một In-app Banner/Toast ở cạnh trên màn hình trong 3 giây. Người dùng tap vào Toast -> Điều hướng đến chi tiết. Nếu không tap, Badge trên icon Chuông sẽ tự động cập nhật số lượng mới.

#### 3.5 Xử lý lỗi (Tham chiếu CMR-07)

| Tình huống lỗi | Thông báo hiển thị | Hành vi hệ thống |
|---|---|---|
| Lỗi mạng / Mất kết nối | *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* | Hiển thị Toast báo lỗi. Giữ nguyên màn hình hiện tại. |
| Lỗi 401 (Session hết hạn) | *"Phiên đăng nhập hết hạn."* (Toast) | Hệ thống tự động sử dụng refresh token để cấp lại access token mới. Nếu refresh token đã hết hạn hoặc không hợp lệ (quá 15 ngày) → chuyển về màn hình Đăng nhập. (Xem CMR-07) |
| Lỗi API (HTTP 500) | *"Hệ thống đang bận. Vui lòng thử lại sau."* | Hiển thị placeholder lỗi trong vùng danh sách. |

#### 3.6 Đa ngôn ngữ (→ Xem CMR-17)

Toàn bộ text cứng trên màn hình UC258-259 (header, tên tab, nút "Đánh dấu đã đọc tất cả", thông báo lỗi, empty state message, toast) được dịch sang ngôn ngữ hiển thị tương ứng khi người dùng đổi ngôn ngữ. Hỗ trợ 5 ngôn ngữ: VI, EN, ZH, JA, KO. Nội dung thông báo từ hệ thống (tiêu đề, nội dung chi tiết) hiển thị nguyên bản — không thay đổi theo ngôn ngữ.

---

### 4. Tiêu chí chấp nhận (Acceptance Criteria)

- **AC1:** Giao diện hiển thị (màu sắc, icon, font chữ) phải khớp 100% với thiết kế mockup cho cả 2 Tab Cảnh báo và Thông báo.
- **AC2:** Trạng thái "Đã đọc" (mất chấm đỏ, hết in đậm tiêu đề) phải được cập nhật ngay lập tức sau khi người dùng tap vào Card hoặc nhấn "Đánh dấu đã đọc tất cả".
- **AC3:** Badge số lượng thông báo chưa đọc trên Header và trên Tab phải luôn đồng bộ và giảm đúng số lượng khi người dùng đọc thông báo.
- **AC4:** Tính năng Lazy load phải hoạt động mượt mà, tải đúng 20 bản ghi tiếp theo khi cuộn xuống cuối.
- **AC5:** Khi nhận Push Notification trong lúc đang mở app, In-app Toast phải xuất hiện và cho phép điều hướng đúng mục tiêu khi tap vào.
- **AC6:** Trạng thái "Đã đọc" phải được đồng bộ hóa với phiên bản Web của hệ thống (nếu có kết nối cùng tài khoản).

---

## 5. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-05-11 | v1 → v1.1 | Xử lý lỗi — HTTP 401 | (Không có) | Bổ sung xử lý lỗi 401: auto refresh token, nếu hết hạn >15 ngày → redirect đăng nhập + toast "Phiên đăng nhập hết hạn." | Đồng bộ CMR-07 (B1) |
| 2026-05-11 | v1 → v1.1 | Đa ngôn ngữ | (Không có) | Bổ sung section đa ngôn ngữ: text cứng dịch 5 ngôn ngữ (VI, EN, ZH, JA, KO), nội dung thông báo hệ thống giữ nguyên | Đồng bộ CMR-17 (B2) |
| 2026-05-11 | v1 → v1.1 | Debounce Navigation | (Không có) | Tap nhanh liên tục vào item thông báo/cảnh báo → chỉ nhận action đầu tiên, bỏ qua tap tiếp theo cho đến khi điều hướng hoàn tất | Đồng bộ CMR-18 (B3) || 2026-05-12 | v1.1 → v1.2 | Empty state message | "Không có dữ liệu" (thiếu dấu chấm) | "Không có dữ liệu." (có dấu chấm) | Đồng bộ CMR-14 |
