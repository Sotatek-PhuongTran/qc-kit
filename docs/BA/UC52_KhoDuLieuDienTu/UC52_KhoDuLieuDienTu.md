# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG

**Tiêu đề:** UC52 — Tra cứu kho tài liệu cá nhân trên Mobile
**Ngày tạo:** 29/04/2026
**Phiên bản:** v4

| Thuộc tính              | Giá trị                                 |
| ------------------------- | ----------------------------------------- |
| BA phụ trách            | han.luong                                 |
| Phân hệ                 | Ứng dụng Di động (Mobile App)         |
| Loại chức năng         | Kho tài liệu cá nhân                  |
| Đối tượng thực hiện | Cá nhân / Tổ chức (đã đăng nhập) |
| Giao diện                | Màn hình Mobile (Portrait)              |
| Ngày tạo                | 29/04/2026                                |
| Phiên bản               | v4                                        |

---

## UC52 — Tra cứu kho tài liệu cá nhân trên Mobile

### 1. Mô tả chức năng

**Tên chức năng:** Tra cứu kho tài liệu cá nhân trên Mobile
**Mô tả:** Chức năng cho phép cá nhân, tổ chức xem danh sách và tra cứu kho tài liệu cá nhân — bao gồm các tài liệu người dùng đã upload.
**Phân quyền:** Cá nhân/Tổ chức đã đăng nhập.
**Truy cập chức năng:** Sidebar → "Kho tài liệu cá nhân".
**Chức năng đáp ứng usecase số:** UC52 (Phụ lục XIV — Nhóm C.III)

---

### 2. Mô tả giao diện

#### 2.1 Màn hình Danh mục tài liệu (Thư mục)

**Mô tả giao diện:**
Màn hình cuộn dọc bắt đầu bằng Header đỏ đặc trưng. Bên dưới là tiêu đề nhóm "Tài liệu của tôi" và danh sách các thư mục tài liệu được phân loại rõ ràng. Mỗi thư mục hiển thị dạng card ngang với icon thư mục nổi bật.

**Khung Header:**

| # | Tên trường       | Kiểu trường | Giá trị mặc định      | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                              |
| - | ------------------- | -------------- | -------------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1 | Nút Quay lại (←) | Button (Icon)  | —                         | —           | —         | **Quy tắc hành động:**`<br>`- Tap → Quay về màn hình trước đó (Trang chủ). (Xem CMR-06)                  |
| 2 | Tiêu đề chính   | Label          | "Kho dữ liệu điện tử" | —           | —         | **Quy tắc hiển thị:** Font Bold, màu trắng, căn giữa Header.                                                     |
| 3 | Nút Tìm kiếm     | Button (Icon)  | —                         | —           | —         | **Quy tắc hành động:**`<br>`- Tap → Hiển thị ô tìm kiếm để tìm nhanh thư mục/tài liệu. (Xem CMR-01) |

**Ô tìm kiếm (Khi tap nút Tìm kiếm):**

| # | Tên trường | Kiểu trường | Giá trị mặc định        | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| - | ------------- | -------------- | ---------------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Ô tìm kiếm | Text Input     | Placeholder: tìm kiếm tên | —           | —         | **Quy tắc hiển thị:**`<br>`- Icon kính lúp nằm bên trái trong ô.`<br>`- Tìm kiếm gần đúng (chứa từ khóa) tên thư mục. Khi xóa hết từ khóa, danh sách trở về trạng thái mặc định (hiển thị tất cả).`<br>`- Max length: **500 ký tự** (Xem CMR-01). Khi nhập đủ 500 ký tự, không cho phép nhập thêm.`<br><br>`**Quy tắc hành động:** (Xem CMR-01)`<br>`- Nhập từ khóa → Kết quả hiển thị tự động sau **3 giây debounce**.`<br>`- Người dùng nhập từ khóa → Kết quả hiển thị ngay, không cần nhấn Enter hay nhấn nút nào.`<br>`- Nếu không có kết quả trùng khớp: Hiển thị màn *"Không tìm thấy kết quả."* (Xem CMR-14) |

**Danh sách Thư mục tài liệu:**

| # | Tên trường        | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| - | -------------------- | -------------- | --------------------- | ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Card Thư mục       | Card (Item)    | —                    | —           | —         | **Quy tắc hiển thị:**`<br>`- Icon thư mục: Nền hồng nhạt, viền đỏ, icon folder đỏ ở giữa.`<br>`- Tên thư mục: Font Bold, màu đen. Hiển thị tối đa 2 dòng, quá dài sẽ có dấu "..." ở cuối (truncate).`<br>`- Số lượng: Hiển thị bên dưới tên thư mục (ví dụ: "8 tài liệu"). Hệ thống tự động đếm số lượng tập tin trong thư mục. (Xem CMR-11)`<br>`- Icon mũi tên (>): Căn phải card. **Chỉ hiển thị với thư mục không có thư mục con** (leaf folder). Thư mục có thư mục con sử dụng icon expand/collapse thay thế (xem row #2).`<br>`- Thứ tự sắp xếp: Theo tên thư mục (1-9/A-Z).`<br><br>`**Quy tắc hành động:**`<br>`- Tap vào Card → Điều hướng đến **Màn hình 2.2 Danh sách tập tin** của thư mục đó.                                                                                                                  |
| 2 | Icon expand/collapse | Icon Button    | Collapse              | —           | —         | **Quy tắc hiển thị:**`<br>`- Hiển thị ở đầu dòng bên trái card nếu thư mục có thư mục con.`<br>`- Trạng thái mặc định của thư mục cha là đóng (collapse).`<br>`- Khi collapse → hiển thị icon chevron right (>).`<br>`- Khi expand → hiển thị icon chevron down (⌄).`<br>`- Nếu thư mục không có thư mục con → không hiển thị icon expand/collapse.`<br><br>`**Quy tắc hành động:**`<br>`- Tap icon → expand/collapse thư mục tương ứng.`<br>`- Khi expand → hiển thị danh sách thư mục con bên dưới thư mục cha.`<br>`- Khi collapse → ẩn toàn bộ thư mục con của thư mục đó.`<br>`- Chỉ tác động trên node thư mục được chọn, không ảnh hưởng các thư mục khác.`<br><br>`**Quy tắc hiển thị nested:**`<br>`- Thư mục con được indent vào bên trong so với thư mục cha.`<br>`- Giữ nguyên hierarchy tree structure. |

**Ghi chú:** Thư mục được người dùng tự tạo, không có danh sách mặc định.

**Quy tắc State Persistence (Lưu trạng thái):**

> Sau khi tìm kiếm/lọc, nếu người dùng vào màn chi tiết và quay lại, danh sách phải giữ nguyên trạng thái tìm kiếm/lọc trước đó (không reset về trạng thái mặc định).

**Phân trang:** Hỗ trợ **lazy load**, tải 20 bản ghi mỗi lần. Cuộn đến cuối danh sách → Tự động tải trang tiếp theo. Hiện loading indicator ở cuối danh sách khi đang tải. Khi không còn dữ liệu, ẩn loading indicator. Rỗng: Hiển thị thông báo *"Không có dữ liệu."* (Xem CMR-04, CMR-14)

---

#### 2.2 Màn hình Danh sách tập tin (Trong thư mục)

**Mô tả giao diện:**
Header hiển thị tên thư mục đã chọn. Nội dung là danh sách các tệp tin được liệt kê theo hàng ngang, phân biệt định dạng bằng icon màu sắc khác nhau.

**Khung Header:**

- Tiêu đề chính thay đổi theo thư mục (ví dụ: "Nộp mới", "Kết quả"...).
- Các thành phần khác giữ nguyên như màn hình 2.1.

**Ô tìm kiếm (Khi tap nút Tìm kiếm):**

| # | Tên trường | Kiểu trường | Giá trị mặc định        | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| - | ------------- | -------------- | ---------------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 | Ô tìm kiếm | Text Input     | Placeholder: tìm kiếm tên | —           | —         | **Quy tắc hiển thị:**`<br>`- Icon kính lúp nằm bên trái trong ô.`<br>`- Tìm kiếm gần đúng (chứa từ khóa) tên tài liệu. Khi xóa hết từ khóa, danh sách trở về trạng thái mặc định (hiển thị tất cả).`<br>`- Max length: **500 ký tự** (Xem CMR-01). Khi nhập đủ 500 ký tự, không cho phép nhập thêm.`<br><br>`**Quy tắc hành động:** (Xem CMR-01)`<br>`- Nhập từ khóa → Kết quả hiển thị tự động sau **3 giây debounce**.`<br>`- Người dùng nhập từ khóa → Kết quả hiển thị ngay, không cần nhấn Enter hay nhấn nút nào.`<br>`- Nếu không có kết quả trùng khớp: Hiển thị màn *"Không tìm thấy kết quả."* (Xem CMR-14) |

**Danh sách Tập tin:**

| # | Tên trường     | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| - | ----------------- | -------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 | Icon định dạng | Image (Icon)   | —                    | —           | —         | **Quy tắc hiển thị màu sắc:**`<br>`- **PDF:** Icon màu đỏ.`<br>`- **Image (JPG, PNG):** Icon màu xanh lá.`<br>`- **Word (DOCX):** Icon màu xanh dương.`<br>`- Các định dạng khác: Icon màu xám.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2 | Tên tập tin     | Label          | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị tên file đầy đủ kèm phần mở rộng (ví dụ: "Chứng minh nhân dân.pdf").`<br>`- Hiển thị tối đa 2 dòng, quá dài sẽ có dấu "..." ở cuối (truncate).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 3 | Item Tập tin     | Interaction    | —                    | —           | —         | <br />**Quy tắc hiển thị:** (Xem CMR-08)`<br>`- Hiển thị tập tin trong thư mục. Thứ tự: sắp xếp theo tên tài liệu 1-9/A-Z `<br>`- Mỗi item gồm icon file, tên file `<br>`- Tên file dài → truncate bằng "...".`<br>`- Nếu không có file → hiển thị empty state "Không có dữ liệu." (Xem CMR-14)`<br><br>`**Quy tắc hành động:** (Xem CMR-08)`<br>`- **Xem trực tiếp (PDF, JPG, PNG, MP4, AVI, MOV):** Tap → Mở xem trực tiếp trên trình duyệt thiết bị.`<br>`- **Tải xuống (DOC, DOCX, XLS, XLSX, ZIP, v.v.):** Tap → Tự động tải xuống máy.`<br>`- **Định dạng không hỗ trợ:** Hiển thị thông báo *"Định dạng không hỗ trợ. Vui lòng tải xuống."* |

**Phân trang:** Hỗ trợ **lazy load**, tải 20 bản ghi mỗi lần. Cuộn đến cuối danh sách → Tự động tải trang tiếp theo. Hiện loading indicator ở cuối danh sách khi đang tải. Khi không còn dữ liệu, ẩn loading indicator. Rỗng: Hiển thị thông báo *"Không có dữ liệu."* (Xem CMR-04, CMR-14)

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Luồng xử lý Tìm kiếm (Xem CMR-01)

1. Người dùng nhấn icon Tìm kiếm trên Header.
2. Hệ thống hiển thị ô tìm kiếm đè lên Header hoặc ngay bên dưới.
3. Người dùng nhập từ khóa.
4. Hệ thống thực hiện lọc real-time:
   - Màn hình Danh mục (2.1): Lọc theo **tên thư mục**.
   - Màn hình Danh sách tập tin (2.2): Lọc theo **tên tập tin**.

#### 3.2 Luồng xử lý Xem / Tải tài liệu (Xem CMR-08)

1. Khi người dùng chọn tập tin, hệ thống kiểm tra định dạng và quyền truy cập.
2. Nếu định dạng được hỗ trợ (PDF, Ảnh): Mở trình duyệt.
3. Nếu định dạng không hỗ trợ xem trình duyệt: Hiển thị tùy chọn tải về.
4. Quy tắc tải về và xem tài liệu thực hiện theo CMR-08.

#### 3.3. Pull-to-Refresh: (Xem CMR-13)

- Màn hình Danh sách hỗ trợ **Pull-to-Refresh**: Người dùng kéo xuống từ đầu danh sách → Hệ thống reload toàn bộ dữ liệu từ đầu (áp dụng bộ lọc & từ khóa tìm kiếm hiện tại).
- Hiển thị spinner/animation ở đầu danh sách trong khi đang refresh. Sau khi refresh xong, ẩn spinner và cập nhật danh sách.
- Nếu refresh thất bại: Giữ nguyên dữ liệu cũ, hiển thị thông báo lỗi theo CMR-07:`<br>`  + Lỗi mạng: *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* + nút "Thử lại".`<br>`  + Lỗi API (HTTP 500): *"Hệ thống đang bận. Vui lòng thử lại sau."*`<br>`  + Timeout (>10 giây): *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + nút "Thử lại".`<br>`  + Session hết hạn (HTTP 401): hệ thống tự động sử dụng refresh token để cấp lại access token mới; nếu refresh token hết hạn hoặc không hợp lệ (quá 15 ngày) → redirect về màn hình đăng nhập và hiển thị toast *"Phiên đăng nhập hết hạn."*
- Khi đang pull-to-refresh hoặc lazy load, không trigger lại API tương tự theo CMR-13.

#### 3.4. Xử lý lỗi: (Xem CMR-07)

| Tình huống lỗi            | Thông báo hiển thị                                                                             | Hành vi hệ thống                                                                                                                                                                                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lỗi mạng / Mất kết nối  | *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* + nút **"Thử lại"** | Giữ nguyên màn hình, hiển thị nút Thử lại.                                                                                                                                                               |
| Lỗi API (HTTP 500)          | *"Hệ thống đang bận. Vui lòng thử lại sau."*                                              | Giữ nguyên màn hình, chỉ hiển thị thông báo.                                                                                                                                                             |
| Timeout (quá 10 giây)      | *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + nút **"Thử lại"**       | Giữ nguyên màn hình, hiển thị nút Thử lại. (Xem CMR-16)                                                                                                                                                  |
| Session hết hạn (HTTP 401) | Toast:*"Phiên đăng nhập hết hạn."*                                                         | Hệ thống tự động sử dụng refresh token để cấp lại access token mới. Nếu refresh token hết hạn hoặc không hợp lệ (quá**15 ngày**) → Redirect về màn hình đăng nhập. (Xem CMR-07) |

#### 3.5. Xử lý lỗi trống (Empty state): (Xem CMR-14)

- Nếu không có dữ liệu: Hiển thị Empty State (Thông báo *"Không có dữ liệu."*).
- Nếu search/filter không có kết quả: Hiển thị *"Không tìm thấy kết quả."*.

#### 3.6. Đa ngôn ngữ (Multi-language): (Xem CMR-17)

- Toàn bộ **text cứng** của màn hình (header, label các field, placeholder, tên nút, thông báo lỗi, badge trạng thái, empty state, toast) tuân theo ngôn ngữ đang được chọn trong thiết lập ứng dụng.
- **Nội dung dữ liệu** lấy từ API (tên thư mục, tên tập tin, v.v.) **không thay đổi** theo ngôn ngữ — hiển thị nguyên bản từ hệ thống.
- Đa ngôn ngữ theo CMR-17: chỉ áp dụng cho text cứng (header, tên field/label, tên tab, tên nút, placeholder, thông báo lỗi, empty state, toast); ngôn ngữ mặc định là tiếng Việt khi mở ứng dụng lần đầu; cài đặt ngôn ngữ được lưu trên thiết bị và giữ nguyên khi đóng/mở lại app.

#### 3.7. Debounce Navigation & Khôi phục trạng thái khi mở lại app: (Xem CMR-18)

- **Debounce navigation:** Khi người dùng tap nhanh liên tục (double tap) vào các button navigation (Quick Access cards, Footer tabs, Sidebar items, card trong danh sách, nút Quay lại, Lọc...), hệ thống có cơ chế debounce để tránh mở trùng lặp màn hình.
- **Force close** (tắt app không xóa dữ liệu): Khi người dùng mở lại app sau khi force close, hệ thống quay về **Trang chủ** và **giữ nguyên session đăng nhập**, không yêu cầu đăng nhập lại.
- **Xóa app** (uninstall): Khi người dùng xóa app và cài đặt lại, hệ thống **yêu cầu đăng nhập lại từ đầu** (không restore session).

### 4. Tiêu chí chấp nhận (Acceptance Criteria)

- **AC1:** Card thư mục phải hiển thị đúng: icon thư mục, tên thư mục, số lượng tập tin, icon mũi tên (leaf folder) hoặc icon expand/collapse (thư mục có con). Item tập tin phải hiển thị đúng icon phân loại theo định dạng (PDF đỏ, Image xanh lá, Word xanh dương, khác xám) và tên file kèm phần mở rộng.
- **AC2:** Chức năng tìm kiếm phải hoạt động real-time theo tên thư mục/tên file.
- **AC3:** Nút quay lại hoạt động đúng logic điều hướng phân cấp (Danh sách tập tin → Danh mục thư mục → Trang chủ).
- **AC4:** Thư mục được sắp xếp theo tên (1-9/A-Z).

---

## 5. Lịch sử cập nhật

| Ngày      | Phiên bản | Mục cập nhật                                      | Before                                                                                                                        | After                                                                                                                                                                                                                                      | Ghi chú                                                                                                                          |
| ---------- | ----------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| 2026-05-07 | v1 → v1.1  | Section 3.4 — Thêm HTTP 401                        | (Không có)                                                                                                                  | Session hết hạn (HTTP 401): tự động sử dụng refresh token; nếu refresh token hết hạn (>15 ngày) → redirect đăng nhập + toast "Phiên đăng nhập hết hạn" (CMR-07)                                                       | Bổ sung xử lý session                                                                                                          |
| 2026-05-11 | v1.1 → v2  | Metadata — Loại chức năng                        | Kho dữ liệu điện tử                                                                                                      | Kho tài liệu cá nhân                                                                                                                                                                                                                   | Thống nhất tên chức năng với Sidebar canonical (khắc phục inconsistency Nhóm J)                                          |
| 2026-05-11 | v1.1 → v2  | Section 1 — Tên chức năng + Mô tả              | Tra cứu kho dữ liệu điện tử cá nhân trên Mobile / …xem danh sách và tra cứu kho dữ liệu điện tử cá nhân… | Tra cứu kho tài liệu cá nhân trên Mobile / …xem danh sách và tra cứu kho tài liệu cá nhân…                                                                                                                                  | Đồng bộ tên chức năng toàn bộ tài liệu                                                                                  |
| 2026-05-11 | v1.1 → v2  | Section 2.1 — Tiêu đề chính Header UI           | "Tài liệu điện tử"                                                                                                       | "Kho dữ liệu điện tử"                                                                                                                                                                                                                 | Chuẩn hoá label Header UI theo yêu cầu BA (giữ tên phụ hệ để phân biệt với entry Sidebar "Kho tài liệu cá nhân") |
| 2026-05-11 | v1.1 → v2  | Section 2.1 & 2.2 — Ô tìm kiếm (Max length)      | (Không có)                                                                                                                  | Max length: 500 ký tự (Xem CMR-01). Khi nhập đủ 500 ký tự, không cho phép nhập thêm.                                                                                                                                            | Bổ sung max length chuẩn CMR-01 cho cả 2 màn tìm kiếm (khắc phục inconsistency Nhóm F)                                   |
| 2026-05-11 | v2 → v3    | Section 2.1 — Card Thư mục (Icon mũi tên)       | Icon mũi tên (>): Căn phải card.                                                                                          | Icon mũi tên (>): Căn phải card.**Chỉ hiển thị với thư mục không có thư mục con** (leaf folder). Thư mục có thư mục con sử dụng icon expand/collapse thay thế.                                                 | Làm rõ hành vi Icon mũi tên khi có nested folder                                                                            |
| 2026-05-11 | v2 → v3    | Section 2.1 — Card Thư mục (Icon expand/collapse) | (Không có)                                                                                                                  | Thêm row #2: Icon expand/collapse (chevron right/down) cho thư mục có thư mục con; quy tắc expand/collapse & nested indent                                                                                                          | Bổ sung hỗ trợ nested folder (hierarchy tree)                                                                                  |
| 2026-05-11 | v2 → v3    | Section 2.1 — Quy tắc State Persistence            | (Không có)                                                                                                                  | Sau khi tìm kiếm/lọc, vào màn chi tiết và quay lại → giữ nguyên trạng thái tìm kiếm/lọc trước đó (không reset về mặc định)                                                                                        | Bổ sung non-functional requirement                                                                                               |
| 2026-05-11 | v2 → v3    | Section 3.3 — Pull-to-Refresh                       | 3 bullet tóm tắt (kéo xuống, spinner, refresh thành công)                                                               | Chi tiết hóa: spinner/animation; refresh fail (lỗi mạng/500/timeout/401 theo CMR-07); anti-duplicate API khi đang pull-to-refresh hoặc lazy load (CMR-13)                                                                            | Chuẩn hóa Pull-to-Refresh theo CMR-13                                                                                           |
| 2026-05-11 | v2 → v3    | Section 3.6 — Đa ngôn ngữ                        | (Không có)                                                                                                                  | Thêm mục 3.6: text cứng theo ngôn ngữ chọn; nội dung dữ liệu API giữ nguyên bản; ngôn ngữ mặc định tiếng Việt khi mở app lần đầu (CMR-17)                                                                           | Áp dụng CMR-17                                                                                                                  |
| 2026-05-11 | v2 → v3    | Section 3.7 — Debounce & Khôi phục trạng thái   | (Không có)                                                                                                                  | Thêm mục 3.7: debounce double-tap navigation; force close giữ session & quay về Trang chủ; uninstall → yêu cầu đăng nhập lại (CMR-18)                                                                                          | Áp dụng CMR-18                                                                                                                  |
| 2026-05-11 | v3 → v4    | Section 2.1 — Phân trang (Lazy Load)               | (Không có)                                                                                                                  | Hỗ trợ lazy load, tải 20 bản ghi mỗi lần. Cuộn đến cuối → tự động tải trang tiếp theo. Loading indicator ở cuối danh sách. Hết dữ liệu → ẩn indicator. Rỗng → "Không có dữ liệu." (CMR-04, CMR-14)           | Bổ sung rule lazy load cho màn Danh mục thư mục                                                                              |
| 2026-05-11 | v3 → v4    | Section 2.2 — Phân trang (Lazy Load)               | (Không có)                                                                                                                  | Hỗ trợ lazy load, tải 20 bản ghi mỗi lần. Cuộn đến cuối → tự động tải trang tiếp theo. Loading indicator ở cuối danh sách. Hết dữ liệu → ẩn indicator. Rỗng → "Không có dữ liệu." (CMR-04, CMR-14)           | Bổ sung rule lazy load cho màn Danh sách tập tin                                                                              |
| 2026-05-11 | v3 → v4    | Section 4 — AC1                                     | "Danh sách thư mục và tập tin phải hiển thị đúng icon phân loại và metadata (ngày, dung lượng)."              | Sửa AC1 khớp UI thực tế: Card thư mục hiển thị icon + tên + số lượng + mũi tên/expand; Item tập tin hiển thị icon phân loại theo định dạng + tên file. Bỏ reference "ngày, dung lượng" vì bảng UI không có. | Sửa AC1 mâu thuẫn với spec UI (không có trường ngày/dung lượng)                                                        |
| 2026-05-11 | v3 → v4    | Section 2.1 — Card Thư mục (Tên thư mục)       | Tên thư mục: Font Bold, màu đen.                                                                                         | Tên thư mục: Font Bold, màu đen. Hiển thị tối đa 2 dòng, quá dài sẽ có dấu "..." ở cuối (truncate).                                                                                                                       | Bổ sung rule truncate tên thư mục                                                                                             |
