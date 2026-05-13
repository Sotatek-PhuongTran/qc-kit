# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG

**Tiêu đề:** UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư trên Mobile  
**Ngày tạo:** 06/05/2026  
**Phiên bản:** v1.3

| Thuộc tính              | Giá trị                            |
| ------------------------- | ------------------------------------ |
| BA phụ trách            | huyen.dinh2                          |
| Phân hệ                 | Ứng dụng Di động (Mobile App)    |
| Loại chức năng         | Khai thác thông tin đã công bố |
| Đối tượng thực hiện | Cá nhân / Tổ chức                |
| Giao diện                | Màn hình Mobile (Portrait)         |
| Ngày tạo                | 06/05/2026                           |
| Phiên bản               | v1.2                                 |

---

## UC55 — Xem chuyên trang đầu tư theo khu vực đầu tư trên Mobile

### 1. Mô tả chức năng

- **Tên chức năng:** Xem chuyên trang đầu tư theo khu vực đầu tư trên Mobile
- **Mô tả:** Chức năng cho phép cá nhân, tổ chức xem thông tin đầu tư chuyên biệt theo từng tỉnh/thành phố. Người dùng chọn tỉnh từ danh sách, sau đó xem trang chuyên mục bao gồm: các chỉ số kinh tế nổi bật, tổng quan đầu tư, lĩnh vực khuyến khích, hạ tầng KCN, vị trí địa lý, thông tin liên hệ đầu tư.
- **Phân quyền:** Cá nhân/Tổ chức (đã đăng nhập). Hai nhóm đối tượng có cùng hành vi khi sử dụng UC55 — không có sự phân biệt.
- **Phạm vi ngoài UC (Exclusions):** UC55 KHÔNG bao gồm: so sánh thông tin giữa các tỉnh, tải xuống tài liệu/dữ liệu, chia sẻ nội dung chuyên trang.
- **Truy cập chức năng:** Sidebar → Mục "Khu vực đầu tư"
- **Điều kiện tiên quyết (Preconditions):** Thiết bị có kết nối mạng ổn định, người dùng đã đăng nhập vào hệ thống.
- **Điều kiện kết thúc (Postconditions):** Hệ thống hiển thị đầy đủ thông tin chuyên trang tỉnh/thành phố trên màn hình.
- **Chức năng đáp ứng usecase số:** UC55 (Phụ lục XIV)

---

### 2. Mô tả giao diện

#### 2.1 Màn hình Danh sách chọn tỉnh / thành phố

**Mô tả giao diện:**
Header "Đầu tư theo khu vực" (màu đỏ đậm, có nút Quay lại ←). Bên dưới là tiêu đề section "Chọn tỉnh / thành phố" và ô tìm kiếm nhanh. Bên dưới là danh sách tỉnh/thành phố dạng list item cuộn dọc, mỗi item có mũi tên ">" bên phải.

| # | Tên trường                  | Kiểu trường              | Giá trị mặc định              | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| - | ------------------------------ | --------------------------- | ---------------------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Nút Quay lại (←)            | Button (Icon)               | —                                 | —           | —         | **Quy tắc hành động:**<br>- Tap → Quay về màn hình trước. (Xem CMR-06)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2 | Tiêu đề Header              | Label                       | "Đầu tư theo khu vực"          | —           | —         | **Quy tắc hiển thị:**<br>- Nằm giữa header, màu trắng trên nền đỏ đậm.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 3 | Tiêu đề section             | Label                       | "Chọn tỉnh / thành phố"        | —           | —         | **Quy tắc hiển thị:**<br>- Hiển thị bên trái phía trên ô tìm kiếm. Font đậm.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 4 | Ô tìm kiếm tỉnh            | Textbox (Search)            | "Tìm kiếm tỉnh, thành phố..." | x            | —         | **Quy tắc hiển thị:**<br>- Icon kính lúp bên trái. Placeholder: "Tìm kiếm tỉnh, thành phố...".<br>- Tối đa **500 ký tự** (Xem CMR-01).<br><br>**Quy tắc hành động:**<br>- Nhập từ khóa → áp dụng debounce 3 giây: sau 3 giây không gõ thêm ký tự, hệ thống tự động lọc danh sách tỉnh. Không cần nhấn Enter. (Xem CMR-01)<br>- Xử lý whitespace: auto-trim khoảng trắng đầu/cuối trước khi tìm kiếm. Nếu sau trim rỗng → coi như input rỗng (Xem CMR-01).<br>- Xóa hết từ khóa → danh sách trở về đầy đủ.<br>- Tìm kiếm không có kết quả → hiển thị *"Không tìm thấy kết quả."* (CMR-14 — No result). |
| 5 | Danh sách tỉnh / thành phố | List Item (Vertical Scroll) | —                                 | —           | —         | **Quy tắc hiển thị:**<br>- Mỗi item gồm: Tên tỉnh (căn trái) + Icon mũi tên ">" (căn phải).<br>- Sắp xếp theo alphabet (A–Z).<br>- Hiển thị toàn bộ 63 tỉnh/thành phố trong 1 lần tải — **không áp dụng lazy load**. Lấy từ danh mục hệ thống, không hard-code.<br><br>**Quy tắc hành động:**<br>- Hỗ trợ Pull to Refresh (Xem CMR-13): Kéo xuống để tải lại danh sách tỉnh từ API.<br>- Tap vào item → Điều hướng đến màn hình Chi tiết chuyên trang của tỉnh đó.<br>- **Debounce Navigation (CMR-18):** Khi người dùng tap nhanh liên tục (double tap) vào item tỉnh, hệ thống chỉ nhận action đầu tiên và bỏ qua các tap tiếp theo cho đến khi điều hướng hoàn tất. |

---

#### 2.2 Màn hình Chi tiết Chuyên trang đầu tư theo tỉnh

**Mô tả giao diện:**
Header hiển thị tên tỉnh đã chọn (ví dụ: "An Giang"), nền đỏ đậm, có nút Quay lại. Màn hình cuộn dọc gồm các section theo thứ tự từ trên xuống dưới: Banner ảnh tỉnh → Bộ chỉ số KPI → Tổng quan đầu tư → Lĩnh vực khuyến khích → Hạ tầng KCN → Vị trí địa lý → Liên hệ đầu tư.

---

**Khung Header:**

| # | Tên trường       | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                      |
| - | ------------------- | -------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Nút Quay lại (←) | Button (Icon)  | —                    | —           | —         | **Quy tắc hành động:**<br>- Tap → Quay về màn hình danh sách tỉnh. (Xem CMR-06)                                   |
| 2 | Tiêu đề tỉnh    | Label          | Tên tỉnh đã chọn | —           | —         | **Quy tắc hiển thị:**<br>- Hiển thị tên tỉnh (ví dụ: "An Giang"), màu trắng, nằm giữa header, nền đỏ đậm. |

---

**Section 1 — Banner ảnh tỉnh:**

| # | Tên trường          | Kiểu trường     | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                              |
| - | ---------------------- | ------------------ | --------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3 | Ảnh đại diện tỉnh | Image (Full Width) | —                    | —           | —         | **Quy tắc hiển thị:**<br>- Ảnh phong cảnh/đặc trưng của tỉnh, full width màn hình, chiều cao cố định.<br>- Overlay text gồm: Tên tỉnh viết hoa (ví dụ: "AN GIANG") và tagline mô tả ngắn (ví dụ: "Cửa ngõ kinh tế phía Tây Nam"), màu trắng, nằm ở góc dưới trái ảnh.<br>- **Trường hợp lỗi:** Nếu ảnh không load được (network error, 404), hiển thị hình ảnh trạng thái loading. Vẫn hiển thị overlay text đè lên hình ảnh loading này. |

---

**Section 2 — Bộ chỉ số KPI (4 thẻ ngang):**

| # | Tên trường            | Kiểu trường              | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                       |
| - | ------------------------ | --------------------------- | --------------------- | ------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4 | Thẻ Tăng trưởng GRDP | Card (Icon + Value + Label) | — | — | — | **Quy tắc hiển thị:**<br>- Icon: biểu đồ tăng trưởng (màu đỏ).<br>- Nhãn: "Tăng trưởng GRDP".<br>- **Quy tắc format số:** Hiển thị số thập phân 1 chữ số sau dấu phẩy (ví dụ: 6.2%). Không rút gọn đơn vị (luôn hiển thị dạng %). |
| 5 | Thẻ Dân số | Card (Icon + Value + Label) | — | — | — | **Quy tắc hiển thị:**<br>- Icon: người (màu đỏ).<br>- Nhãn: "Dân số".<br>- **Quy tắc format số — rút gọn theo ngưỡng:**<br>&emsp;• Dưới 1.000 người: hiển thị số nguyên, không rút gọn (ví dụ: 850).<br>&emsp;• Từ 1.000 đến dưới 1.000.000: rút gọn đơn vị **K** = nghìn người (ví dụ: 500K = 500.000).<br>&emsp;• Từ 1.000.000 đến dưới 1.000.000.000: rút gọn đơn vị **M** = triệu người (ví dụ: 2.2M = 2.200.000).<br>&emsp;• Từ 1.000.000.000 trở lên: rút gọn đơn vị **B** = tỷ người (hiếm dùng với dân số tỉnh).<br>- Hiển thị tối đa **1 chữ số** sau dấu phẩy nếu không tròn số (ví dụ: 2.2M, 1.5K); hiển thị số nguyên nếu tròn (ví dụ: 3M, 500K). |
| 6 | Thẻ Vốn đầu tư | Card (Icon + Value + Label) | — | — | — | **Quy tắc hiển thị:**<br>- Icon: hình dollar / tiền $ (màu đỏ).<br>- Nhãn: "Vốn đầu tư".<br>- **Quy tắc format số — rút gọn theo ngưỡng:**<br>&emsp;• Dưới 1.000 USD: hiển thị số nguyên, không rút gọn (ví dụ: $850).<br>&emsp;• Từ 1.000 đến dưới 1.000.000: rút gọn đơn vị **K** = nghìn USD (ví dụ: $500K = $500.000).<br>&emsp;• Từ 1.000.000 đến dưới 1.000.000.000: rút gọn đơn vị **M** = triệu USD (ví dụ: $2.2M = $2.200.000).<br>&emsp;• Từ 1.000.000.000 trở lên: rút gọn đơn vị **B** = tỷ USD (ví dụ: $1.5B = $1.500.000.000).<br>- Hiển thị tối đa **1 chữ số** sau dấu phẩy nếu không tròn số (ví dụ: $2.2M, $1.5K); hiển thị số nguyên nếu tròn (ví dụ: $3M, $500K).<br>- Luôn có ký hiệu **$** đứng trước giá trị. |
| 7 | Thẻ Diện tích | Card (Icon + Value + Label) | — | — | — | **Quy tắc hiển thị:**<br>- Icon: vị trí địa lý / pin map (màu đỏ).<br>- Nhãn: "Diện tích".<br>- **Quy tắc format số:** Hiển thị **số nguyên** (không có chữ số thập phân), dùng dấu phẩy ngăn cách hàng nghìn (ví dụ: 3,536 km²). Không rút gọn đơn vị. Đơn vị **km²** hiển thị liền sau số.<br><br>**Quy tắc hiển thị chung 4 thẻ:**<br>- Cuộn ngang (horizontal scroll) khi tổng chiều rộng 4 thẻ vượt quá chiều rộng màn hình (dù đủ 4 thẻ hay ít hơn).<br>- Nếu dữ liệu của một thẻ bị NULL hoặc thiếu từ API → Vẫn hiển thị thẻ đó nhưng giá trị số hiển thị là `-`.<br>- Mỗi thẻ nền trắng, bo góc, có shadow nhẹ. Không tap được. |

---

**Section 3 — Tổng quan đầu tư:**

| #  | Tên trường        | Kiểu trường        | Giá trị mặc định  | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                          |
| -- | -------------------- | --------------------- | ---------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8  | Tiêu đề section   | Label                 | "Tổng quan đầu tư" | —           | —         | **Quy tắc hiển thị:**<br>- Font đậm, căn trái.                                                                                                                                                                                                                                                                                                           |
| 9  | Nội dung tổng quan | Text | — | — | — | **Quy tắc hiển thị:**<br>- Nội dung là plain text từ API, không hỗ trợ các định dạng đặc biệt (bold, link, list).<br>- Hiển thị toàn bộ nội dung (full text), không giới hạn số dòng.<br>- **Trạng thái Empty:** Nếu API trả về null hoặc rỗng, vẫn hiển thị tiêu đề section, bên dưới hiển thị chuỗi "Không có dữ liệu." (CMR-14). |

---

**Section 4 — Lĩnh vực khuyến khích:**

| #  | Tên trường         | Kiểu trường                | Giá trị mặc định       | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -- | --------------------- | ----------------------------- | --------------------------- | ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 11 | Tiêu đề section    | Label                         | "Lĩnh vực khuyến khích" | —           | —         | **Quy tắc hiển thị:**<br>- Font đậm, căn trái.                                                                                                                                                                                                                                                                                                                                                                  |
| 12 | Danh sách lĩnh vực | Chip List (Horizontal Scroll) | — | — | — | **Quy tắc hiển thị:**<br>- Mỗi lĩnh vực là một chip/tag dạng pill, viền vàng/cam nhạt, text màu vàng/cam đậm.<br>- Danh sách lĩnh vực khuyến khích là **dữ liệu động theo từng tỉnh**, lấy từ API — không cố định (không hard-code).<br>- Các chip xếp ngang trên một hàng; nếu tổng chiều rộng các chip vượt quá chiều rộng màn hình → cho phép **cuộn ngang (horizontal scroll)**.<br>- **Trạng thái Empty:** Nếu danh sách từ API rỗng, vẫn hiển thị tiêu đề section, bên dưới hiển thị chuỗi "Không có dữ liệu." (CMR-14).<br>- Không tap được (chỉ hiển thị, không điều hướng). |

---

**Section 5 — Hạ tầng KCN:**

| #  | Tên trường      | Kiểu trường       | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -- | ------------------ | -------------------- | --------------------- | ------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 13 | Tiêu đề section | Label                | "Hạ tầng KCN"       | —           | —         | **Quy tắc hiển thị:**<br>- Font đậm, căn trái.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 14 | Danh sách KCN | List Card (Vertical) | — | — | — | **Quy tắc hiển thị:**<br>- Mỗi item KCN gồm:<br>&emsp;• Icon biểu đồ/nhà máy (màu đỏ, góc trái).<br>&emsp;• Tên KCN (font đậm). Dữ liệu động theo tỉnh, lấy từ API (ví dụ: "KCN An Giang", "KCN Bình Hòa").<br>&emsp;• Diện tích: hiển thị số nguyên, đơn vị **ha** (ví dụ: "Diện tích: 250 ha"). Không rút gọn.<br>&emsp;• Badge trạng thái — chỉ có **2 loại** (không có loại nào khác):<br>&emsp;&emsp;- **Xanh lá** + chấm tròn: "Sẵn sàng".<br>&emsp;&emsp;- **Vàng** + chấm tròn: "Đang quy hoạch".<br>- Mỗi item nền trắng, bo góc, có đường viền nhạt.<br>- **Trạng thái Empty:** Nếu danh sách KCN từ API rỗng, vẫn hiển thị tiêu đề section, bên dưới hiển thị chuỗi "Không có dữ liệu." (CMR-14).<br>- **Component tĩnh, không có hành động tap** (chỉ hiển thị thông tin). |

---

**Section 6 — Vị trí địa lý:**

| #  | Tên trường            | Kiểu trường          | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                            |
| -- | ------------------------ | ----------------------- | --------------------- | ------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 15 | Tiêu đề section       | Label                   | "Vị trí địa lý"  | —           | —         | **Quy tắc hiển thị:**<br>- Font đậm, căn trái.                                                                                                                                                                                                                                                                                                             |
| 16 | Bản đồ tỉnh | Map (Static Thumbnail) | — | — | — | **Quy tắc hiển thị:**<br>- Hiển thị ảnh thumbnail bản đồ khu vực tỉnh, full width, chiều cao cố định.<br>- **Luôn hiển thị**, kể cả khi danh sách khoảng cách rỗng.<br><br>**Quy tắc hành động:**<br>- Tap vào bản đồ → Kích hoạt geo URI scheme với tọa độ trung tâm tỉnh, mở **ứng dụng bản đồ được cài đặt làm mặc định trên thiết bị** (ví dụ: Google Maps, Apple Maps, Here Maps, Waze...). Hệ thống không chỉ định cứng ứng dụng nào.<br>- **Trường hợp không có ứng dụng bản đồ:** Nếu thiết bị không có ứng dụng bản đồ nào được cài đặt → hệ thống mở trình duyệt mặc định của thiết bị để hiển thị vị trí tỉnh. |
| 17 | Danh sách khoảng cách | List (Icon + Text + Km) | — | — | — | **Quy tắc hiển thị:**<br>- Mỗi item gồm: Icon pin map (xám) + Mô tả địa danh (căn trái) + Khoảng cách màu đỏ đậm (căn phải).<br>- **Quy tắc format số khoảng cách:** Hiển thị số nguyên, đơn vị **km**, làm tròn đến km gần nhất (không hiển thị số thập phân). Ví dụ: 100 km, 60 km, 220 km.<br>- Dữ liệu động theo tỉnh, lấy từ API. Trả về bao nhiêu item thì hiển thị bấy nhiêu (cuộn dọc nếu nhiều).<br>- **Trạng thái Empty:** Nếu API trả về 0 item, ẩn hoàn toàn danh sách khoảng cách (bản đồ vẫn hiển thị bình thường).<br>- Không tap được. |

---

**Section 7 — Liên hệ đầu tư:**

| #  | Tên trường             | Kiểu trường           | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -- | ------------------------- | ------------------------ | --------------------- | ------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 18 | Tiêu đề section        | Label                    | "Liên hệ đầu tư" | —           | —         | **Quy tắc hiển thị:**<br>- Font đậm, căn trái.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 19 | Thẻ thông tin liên hệ | Card (Orange Background) | — | — | — | **Quy tắc hiển thị:**<br>- Nền màu cam/vàng đậm, bo góc.<br>- Gồm 2 dòng:<br>&emsp;• Icon điện thoại + Label "Điện thoại" + Số điện thoại (ví dụ: "(84-296) 3856 606").<br>&emsp;• Icon email + Label "Email" + Địa chỉ email (ví dụ: "dautugiang@angiang.gov.vn").<br>- Dữ liệu động theo tỉnh, lấy từ API. Nếu thiếu field nào (số điện thoại hoặc email), vẫn hiển thị nhãn nhưng giá trị là `-`.<br><br>**Quy tắc hành động:**<br>- Không có hành động tap. Số điện thoại và email chỉ hiển thị dưới dạng text tĩnh. |

---

**Section 8 — CTA Đăng ký tư vấn:**

| #  | Tên trường                     | Kiểu trường                         | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                       |
| -- | --------------------------------- | -------------------------------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 20 | Card CTA                          | Card (Dark Red Background)             | —                    | —           | —         | **Quy tắc hiển thị:**<br>- Nền đỏ đậm, bo góc.<br>- Tiêu đề: "Bạn quan tâm đến [TÊN TỈNH]?" (in hoa, màu trắng, font đậm).<br>- Mô tả: "Nhận tư vấn đầu tư chi tiết từ chuyên gia" (màu trắng, font nhỏ hơn).                                   |
| 22 | Nút "Cổng thông tin đầu tư" | Button (Secondary — Dark Red Outline) | — | — | — | **Quy tắc hiển thị:**<br>- Nền đỏ đậm hơn card, text màu trắng, bo góc, full width trong card, nằm ở cuối card CTA (bên dưới tiêu đề và mô tả).<br>- **Trạng thái rỗng:** Nếu API trả về URL null hoặc trống, ẩn hoàn toàn nút này.<br><br>**Quy tắc hành động:**<br>- Tap → Mở **Cổng thông tin đầu tư của tỉnh đó** — là **link web ngoài**, mở trên trình duyệt mặc định của thiết bị. URL lấy từ API theo mã tỉnh (không hard-code).<br>&emsp;• Ví dụ Bắc Ninh: https://bacninh.gov.vn/tiem-nang-phat-trien<br>&emsp;• Ví dụ An Giang: https://angiang.gov.vn/vi/dau-tu-cong |

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Luồng xem danh sách tỉnh

1. Người dùng vào màn hình "Đầu tư theo khu vực".
2. Hệ thống gọi API danh mục → Tải danh sách tỉnh/thành phố.
3. Trong khi tải, hiển thị skeleton loading.
4. Danh sách hiển thị đầy đủ sau khi API phản hồi, sắp xếp A–Z.
5. Người dùng có thể gõ tìm kiếm để lọc nhanh tỉnh.

#### 3.2 Luồng xem chi tiết chuyên trang tỉnh

1. Người dùng tap vào một tỉnh → Điều hướng đến màn hình chi tiết tỉnh đó.
2. Hệ thống gọi API chi tiết chuyên trang theo mã tỉnh.
3. Trong khi tải, hiển thị skeleton loading cho từng section.
4. Màn hình hiển thị lần lượt: Banner ảnh → KPI → Tổng quan → Lĩnh vực → KCN → Vị trí → Liên hệ.
5. Hỗ trợ **Pull to Refresh** (Xem CMR-13): Kéo xuống để gọi lại toàn bộ API chi tiết chuyên trang của tỉnh, làm mới tất cả section trên màn hình.

#### 3.3 Xử lý lỗi (→ Xem CMR-07)

| Tình huống lỗi                  | Thông báo hiển thị                                                                             | Hành vi hệ thống                                 |
| ---------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Lỗi mạng / Mất kết nối        | *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* + nút **"Thử lại"** | Giữ nguyên màn hình, hiển thị nút Thử lại. |
| Lỗi API (HTTP 500)                | *"Hệ thống đang bận. Vui lòng thử lại sau."*                                              | Giữ nguyên màn hình, chỉ hiển thị thông báo.  |
| Lỗi 401 (Session hết hạn)       | *"Phiên đăng nhập hết hạn."* (Toast) | Hệ thống tự động sử dụng refresh token để cấp lại access token mới. Nếu refresh token đã hết hạn hoặc không hợp lệ (quá 15 ngày) → chuyển về màn hình Đăng nhập. (Xem CMR-07) |
| Không tìm thấy tỉnh (HTTP 404) | *"Nội dung không tồn tại hoặc đã bị xóa."*                                              | Quay lại danh sách.                               |
| Timeout (API không phản hồi sau 10 giây) | *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + nút **"Đồng ý"** | Hiển thị thông báo, giữ nguyên màn hình. |

#### 3.4 Đa ngôn ngữ (→ Xem CMR-17)

Toàn bộ text cứng trên màn hình UC55 (header, tên section, label, placeholder, thông báo lỗi, empty state message, toast) được dịch sang ngôn ngữ hiển thị tương ứng khi người dùng đổi ngôn ngữ. Hỗ trợ 5 ngôn ngữ: VI, EN, ZH, JA, KO. Nội dung dữ liệu từ API (tên tỉnh, tên KCN, nội dung tổng quan, lĩnh vực, thông tin liên hệ) hiển thị nguyên bản từ hệ thống — không thay đổi theo ngôn ngữ.

#### 3.5 Tiêu chí chấp nhận (Acceptance Criteria)

- **AC1:** Dữ liệu hiển thị (tổng quan, KPI, lĩnh vực, KCN, khoảng cách, thông tin liên hệ) phải khớp 100% với dữ liệu cấu hình từ API cho từng tỉnh. Nội dung tổng quan phải hiển thị full text.
- **AC2:** Bấm vào bản đồ phải mở ứng dụng bản đồ mặc định của thiết bị và hiển thị đúng tọa độ của tỉnh đó.
- **AC3:** Các thẻ KPI và thông tin hiển thị định dạng số đúng luật (Rút gọn K, M, B; dấu phẩy ngăn cách) như định nghĩa trong thiết kế giao diện.

---

## 4. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-05-08 | v1 → v1.1 | 2.1 Ô tìm kiếm tỉnh — Hành động | `lọc danh sách tỉnh ngay lập tức (real-time)` | `Debounce 3 giây: sau 3 giây không gõ thêm, hệ thống tự động lọc` | Đồng bộ theo CMR-01 |
| 2026-05-08 | v1 → v1.1 | 3.3 Xử lý lỗi — Timeout | (Không có) | Timeout 10 giây → toast + nút Đồng ý, giữ nguyên màn hình | Bổ sung theo CMR-07 |
| 2026-05-08 | v1 → v1.1 | 2.2 Section 6 — Bản đồ tỉnh — Fallback | Chỉ mở app bản đồ mặc định | Thêm case: thiết bị không có app bản đồ → mở trình duyệt mặc định | Bổ sung edge case |
| 2026-05-08 | v1 → v1.1 | 2.2 Section 8 — Nút "Đăng ký tư vấn ngay" (row #21) | Có nút Đăng ký tư vấn ngay (TBD) | (Đã xóa) | Loại bỏ theo yêu cầu |
| 2026-05-11 | v1.1 → v1.2 | 3.3 Xử lý lỗi — HTTP 401 | (Không có) | Bổ sung xử lý lỗi 401: auto refresh token, nếu hết hạn >15 ngày → redirect đăng nhập + toast "Phiên đăng nhập hết hạn." | Đồng bộ CMR-07 (B1) |
| 2026-05-11 | v1.1 → v1.2 | 3.4 Đa ngôn ngữ | (Không có) | Bổ sung section đa ngôn ngữ: text cứng dịch 5 ngôn ngữ (VI, EN, ZH, JA, KO), nội dung API giữ nguyên | Đồng bộ CMR-17 (B2) |
| 2026-05-11 | v1.1 → v1.2 | 2.1 Field #5 — Debounce Navigation | (Không có) | Tap nhanh liên tục vào item tỉnh → chỉ nhận action đầu tiên, bỏ qua tap tiếp theo cho đến khi điều hướng hoàn tất | Đồng bộ CMR-18 (B3) |
| 2026-05-11 | v1.1 → v1.2 | 2.1 Field #4 — Ô tìm kiếm | Không có max length, không có whitespace | Bổ sung: tối đa 500 ký tự (CMR-01), auto-trim whitespace đầu/cuối trước khi tìm kiếm | Đồng bộ CMR-01 (C3) |
| 2026-05-11 | v1.1 → v1.2 | 2.2 Section 3/4/5 — Empty state | "Không có dữ liệu" (thiếu dấu chấm) | "Không có dữ liệu." (có dấu chấm) | Đồng bộ CMR-14 (D2) |
| 2026-05-12 | v1.2 → v1.3 | Null display format | `--` (double dash) | `-` (single dash) | Đồng bộ CMR-14 v1.4 |
| 2026-05-12 | v1.2 → v1.3 | Timeout error message | "Yêu cầu hết thời gian chờ..." | "Yêu cầu đã hết thời gian chờ..." | Đồng bộ CMR-07 |
