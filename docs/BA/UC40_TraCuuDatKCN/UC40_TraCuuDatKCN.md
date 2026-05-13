# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG

**Tiêu đề:** UC40 — Tra cứu thông tin quỹ đất trong Khu công nghiệp trên Mobile
**Ngày tạo:** 29/04/2026
**Phiên bản:** v3.1

| Thuộc tính              | Giá trị                         |
| ------------------------- | --------------------------------- |
| BA phụ trách            | han.luong                         |
| Phân hệ                 | Ứng dụng Di động (Mobile App) |
| Loại chức năng         | Khai thác thông tin KCN/KKT     |
| Đối tượng thực hiện | Cá nhân / Tổ chức             |
| Giao diện                | Màn hình Mobile (Portrait)      |
| Ngày tạo                | 29/04/2026                        |
| Phiên bản               | v3                                |

---

## UC40 — Tra cứu thông tin quỹ đất trong KCN trên Mobile

### 1. Mô tả chức năng

**Tên chức năng:** Tra cứu thông tin quỹ đất trong khu công nghiệp trên Mobile
**Mô tả:** Chức năng cho phép cá nhân, tổ chức tra cứu danh sách lô đất trong các khu công nghiệp. Người dùng có thể tìm kiếm theo từ khóa, lọc theo nhiều tiêu chí (khu công nghiệp, diện tích, tình trạng quỹ đất, tình trạng công bố), xem thông tin chi tiết từng lô đất.
**Phân quyền:** Tất cả cá nhân đã đăng nhập thành công đều được truy cập (không phân biệt vai trò).
**Truy cập chức năng:** Sidebar → "Quản lý quỹ đất".
**Chức năng đáp ứng usecase số:** UC40 (WBS Mobile — STT 40)

---

### 2. Mô tả giao diện

#### 2.1 Giao diện Danh sách quỹ đất

**Mô tả giao diện:**
Màn hình tiêu đề "Quản lý quỹ đất". Phía dưới header là thanh tìm kiếm kết hợp bộ lọc tìm kiếm. Nội dung là danh sách Card lô đất, hiển thị tóm tắt các thông tin chính, badge trạng thái, và các nút hành động nhanh.

**Khung Tìm kiếm & Lọc:**

| # | Tên trường | Kiểu trường       | Giá trị mặc định                       | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| - | ------------- | -------------------- | ------------------------------------------- | ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Ô tìm kiếm | Textbox (Search)     | Placeholder: "Tìm kiếm tên lô đất..." | x            | -         | **Quy tắc hiển thị:**`<br>`- Tìm kiếm like theo tên lô đất.`<br>`- Tìm kiếm gần đúng (chứa từ khóa). Khi xóa hết từ khóa, danh sách trở về trạng thái mặc định (hiển thị tất cả).`<br><br>`**Quy tắc hành vi:**`<br>`- Debounce 3 giây: hiển thị kết quả tìm kiếm trong lúc gõ, sau 3 giây không gõ mới thực hiện tìm kiếm.`<br>`- Người dùng nhập từ khóa → Kết quả hiển thị ngay (sau debounce), không cần nhấn Enter hay nút Tìm kiếm.`<br>`- Nếu không có kết quả trùng khớp: Hiển thị màn *"Không tìm thấy kết quả."* (Xem CMR-14)`<br>`- Max length: **500 ký tự** (Xem CMR-01). Khi nhập đủ 500 ký tự, không cho phép nhập thêm.`<br>`- Xem CMR-01 |
| 2 | Nút "Lọc"   | Button (Icon Filter) | -                                          | —           | -         | **Quy tắc hành động:**`<br>`- Tap → Mở Modal Bộ lọc phía dưới màn hình (Bottom Sheet). Nếu đang có filter đang áp dụng, icon hiển thị badge đếm số filter đang bật.`<br>`- Tap icon filter (≡) → Mở modal/panel bộ lọc.`<br>`- Tap 'Áp dụng' / 'Tìm' → Đóng bộ lọc, tải lại danh sách với tiêu chí đã chọn.`<br>`- Tap 'Đặt lại' / 'Nhập lại' → Reset tất cả trường về giá trị mặc định.`<br>`- Tap vùng ngoài, nút 'Đóng' (X), hoặc nút 'X' góc phải → Đóng bộ lọc, không thay đổi kết quả hiện tại..<br />- Xem CMR-01                                                                                                                                                                |

**Khung Modal Bộ lọc tìm kiếm (Bottom Sheet):**

> Bộ lọc được hiển thị dưới dạng Bottom Sheet. Người dùng chỉnh sửa các tiêu chí trong sheet, sau đó tap "Áp dụng" để áp dụng. Tất cả các trường lọc đều là **single-selection** (chỉ chọn một giá trị một lần). Bottom Sheet có nút "X" ở góc phải trên cùng để đóng.

| # | Tên trường           | Kiểu trường                          | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| - | ----------------------- | --------------------------------------- | --------------------- | ------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Khu công nghiệp       | Dropdown (Single-selection, Searchable) | Tất cả các KCN     | x            | -         | **Quy tắc hiển thị:**`<br>`- Danh sách các KCN lấy từ API danh mục KCN/KKT).`<br>`- Danh sách lấy từ API danh mục, không hard-code.`<br>`- **Searchable dropdown**: Cho phép người dùng nhập từ khóa để tìm kiếm trong danh sách KCN (tìm kiếm gần đúng, sắp xếp A-Z). Chi tiết xem CMR-03.`<br><br>`**Quy tắc hành động:**`<br>`- Chọn một KCN cụ thể để lọc lô đất chỉ thuộc KCN đó. Giá trị "Tất cả các KCN" là tùy chọn mặc định — nghĩa là không áp dụng lọc theo KCN.`<br>`- Tap → Mở danh sách lựa chọn (có ô search) → Nhập từ khóa để lọc option → Tap item → Tự động đóng và hiển thị giá trị đã chọn.`<br>`- Option đã chọn được highlight/bold khi mở lại dropdown. (Xem CMR-03)               |
| 2 | Diện tích (Từ)       | Số (m²)                               | Placeholder: "từ"    | x            | -         | **Quy tắc hiển thị:**`<br>`- Placeholder mặc định là "từ".`<br>`- Nếu để trống: mặc định là tất cả (không lọc)).`<br><br>`**Quy tắc hành động:**`<br>`- Nhập giá trị diện tích tối thiểu (m²).`<br>`- Chỉ cho phép số nguyên dương. Nếu người dùng nhập ký tự khác chữ số, block không cho nhập.`<br>`- Định dạng số: (Xem CMR-11)                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 3 | Diện tích (Đến)     | Số (m²)                               | Placeholder: "đến"  | x            | -         | **Quy tắc hiển thị:**`<br>`- Placeholder mặc định là "đến".`<br>`- Nếu để trống: mặc định là tất cả (không lọc)).`<br><br>`**Quy tắc hành động:**`<br>`- Nhập giá trị diện tích tối đa (m²).`<br>`- Chỉ cho phép số nguyên dương. Nếu người dùng nhập ký tự khác chữ số, block không cho nhập.`<br><br>`**Quy tắc validation:**`<br>`- Diện tích (Đến) phải lớn hơn Diện tích (Từ). Nếu diện tích đến nhỏ hơn diện tích từ, hiển thị inline error message "Diện tích (Đến) phải lớn hơn Diện tích (Từ)".`<br>`- Định dạng số: (Xem CMR-11)                                                                                                                                                                                 |
| 4 | Tình trạng quỹ đất | Dropdown (Single-selection)             | Tất cả              | x            | -         | **Quy tắc hiển thị:**`<br>`- Lọc theo tình trạng sử dụng của lô đất.`<br><br>`**Quy tắc hành động:**`<br>`- Các giá trị có thể chọn: **Tất cả** (mặc định — không lọc) / **Còn trống** (lô đất chưa có doanh nghiệp thuê) / **Đã cho thuê** (lô đất đã được doanh nghiệp ký hợp đồng thuê).                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 5 | Tình trạng công bố  | Dropdown (Single-selection)             | Tất cả              | x            | -         | **Quy tắc hiển thị:**`<br>`- Lọc theo tình trạng công khai của lô đất trên hệ thống.`<br><br>`**Quy tắc hành động:**`<br>`- Các giá trị có thể chọn: **Tất cả** (mặc định — không lọc) / **Đã công bố** (thông tin lô đất đã được công khai cho người dùng xem) / **Chưa công bố** (thông tin lô đất chưa được duyệt công khai).                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 6 | Nút "Nhập lại"       | Button (Secondary)                      | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Không đóng Bottom Sheet.`<br><br>`**Quy tắc hành động:**`<br>`- Tap → Reset toàn bộ 5 tiêu chí lọc về giá trị mặc định.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 7 | Nút "Áp dụng"        | Button (Primary)                        | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- **Disabled (grayed out)** khi validation Diện tích fail (Đến < Từ) — không cho phép tap.`<br>`- **Enabled** khi tất cả tiêu chí hợp lệ (hoặc để trống).`<br><br>`**Quy tắc hành động:**`<br>`- Tap (khi enabled) → Áp dụng toàn bộ tiêu chí lọc hiện tại, đóng Bottom Sheet, gọi API với tham số bộ lọc, tải lại danh sách lô đất.`<br>`- Tap icon filter (≡) → Mở modal/panel bộ lọc.`<br>`- Tap 'Áp dụng' / 'Tìm' → Đóng bộ lọc, tải lại danh sách với tiêu chí đã chọn.`<br>`- Tap 'Đặt lại' / 'Nhập lại' → Reset tất cả trường về giá trị mặc định.`<br>`- Tap vùng ngoài, nút 'Đóng' (X), hoặc nút 'X' góc phải → Đóng bộ lọc, không thay đổi kết quả hiện tại. |
| 8 | Nút "X" đóng         | Button (Icon)                           | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Icon "X" nằm ở góc phải trên cùng của Bottom Sheet.`<br><br>`**Quy tắc hành động:**`<br>`- Tap → Đóng Bottom Sheet, không thay đổi kết quả hiện tại (tương tự tap vùng ngoài).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

**Khung Danh sách Lô đất (Card List):**

> Mỗi card đại diện cho một lô đất. Danh sách sắp xếp mặc định theo tên lô đất tăng dần (1-9/A-Z).

| # | Tên trường           | Kiểu trường  | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                            |
| - | ----------------------- | --------------- | --------------------- | ------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Tên lô đất          | Label (Bold)    | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Tên định danh của lô đất (VD: "N102", "N103").`<br>`- Hiển thị tối đa 2 dòng, quá dài sẽ có dấu ... ở cuối (truncate).                                                                                         |
| 2 | Icon mũi tên (>)      | Icon            | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Chỉ báo cho hành động tap vào card. Hiển thị ở góc phải trên cùng.                                                                                                                                                     |
| 3 | Vị trí                | Label           | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Vị trí lô đất (VD: "Số 2", "Số 1").`<br>`- **Layout:** Label bên trái, value căn phải.`<br>`- Không có icon ở prefix.`<br>`- Hiển thị tối đa 2 dòng, quá dài sẽ có dấu ... ở cuối (truncate). |
| 4 | Diện tích             | Label           | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Diện tích lô đất.`<br>`- **Layout:** Label bên trái, value căn phải, có định dạng phân tách hàng nghìn (VD: "50,000", "12,000") theo chuẩn (Xem CMR-11).`<br>`- Không có icon ở prefix.              |
| 5 | Tình trạng quỹ đất | Badge           | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- **Còn trống**: Badge nền màu xanh lá nhạt, chữ màu xanh lá.`<br>`- **Đã cho thuê**: Badge nền màu đỏ nhạt, chữ màu đỏ.                                                                           |
| 6 | Tình trạng công bố  | Badge (Outline) | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- **Đã công bố**: Badge nền trắng, viền xanh lá, chữ xanh lá.`<br>`- **Chưa công bố**: Badge nền màu xám nhạt, chữ xám đậm.                                                                        |

**Quy tắc State Persistence (Lưu trạng thái):**

> Sau khi tìm kiếm/lọc, nếu người dùng vào màn chi tiết và quay lại, danh sách phải giữ nguyên trạng thái tìm kiếm/lọc trước đó.

---

#### 2.2 Giao diện Chi tiết lô đất

**Mô tả giao diện:**
Màn hình tiêu đề "Chi tiết lô đất". Hiển thị thông tin chi tiết của lô đất được chọn từ danh sách. **Toàn bộ màn là read-only** (không có input form).

---

**2.2.1 Header:**

| # | Tên trường  | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                        |
| - | -------------- | -------------- | --------------------- | ------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Nút quay lại | Button (Icon)  | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Icon ← nằm góc trái header.`<br>`- Luôn hiển thị trên mọi màn chi tiết. (Xem CMR-06)`<br><br>`**Quy tắc hành động:**`<br>`- Tap → Quay về màn danh sách, giữ nguyên trạng thái tìm kiếm/lọc trước đó. |
| 2 | Tiêu đề     | Label          | "Chi tiết lô đất" | -           | —         | **Quy tắc hiển thị:**`<br>`- Hiển thị text "Chi tiết lô đất".`<br>`- Căn giữa header.`<br><br>`**Quy tắc hành động:**`<br>`- Không tap được.                                                                                                     |

---

**2.2.2 Thông tin quỹ đất:**

| # | Tên trường     | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                  |
| - | ----------------- | -------------- | --------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Khu công nghiệp | Label          | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị dạng: [Mã KCN] - [Tên KCN].`<br>`- Dữ liệu lấy từ API.`<br>`- Nếu null → hiển thị "-".`<br>`- Nếu dài quá → xuống dòng (wrap text), không truncate.`<br><br>`**Quy tắc hành động:**`<br>`- Không cho phép tap.         |
| 2 | Tên lô đất    | Label (Bold)   | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị tên lô đất (VD: "N102").`<br>`- Nếu null → "-".`<br>`- Nếu dài quá → xuống dòng (wrap text), không truncate.`<br><br>`**Quy tắc hành động:**`<br>`- Không tap được.                                                         |
| 3 | Vị trí          | Label          | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị vị trí lô đất (VD: "Số 2").`<br>`- Nếu null → "-".`<br>`- Nếu dài quá → xuống dòng (wrap text), không truncate.`<br><br>`**Quy tắc hành động:**`<br>`- Không tap được.                                                    |
| 4 | Diện tích       | Label (Number) | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị số theo format hàng nghìn (VD: "50,000").`<br>`- Áp dụng CMR-11 (Xem CMR-11).`<br>`- Nếu null → "-".`<br>`- Nếu dài quá → xuống dòng (wrap text), không truncate.`<br><br>`**Quy tắc hành động:**`<br>`- Không tap được. |
| 5 | Thời hạn thuê  | Label          | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị thời gian thuê (VD: "2 năm").`<br>`- Nếu null → "-".`<br>`- Nếu dài quá → xuống dòng (wrap text), không truncate.`<br><br>`**Quy tắc hành động:**`<br>`- Không tap được.                                                     |

---

**2.2.3 Hạ tầng & Hiện trạng:**

| # | Tên trường          | Kiểu trường       | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                 |
| - | ---------------------- | -------------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 | Hiện trạng đường  | Dropdown (read-only) | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị 1 trong 3 giá trị: **Đã có** / **Chưa có** / **Đang xây dựng**.`<br>`- Disabled (không cho chỉnh sửa).`<br>`- Nếu null → "-".`<br><br>`**Quy tắc hành động:**`<br>`- Không cho phép tap. |
| 2 | Hiện trạng điện    | Dropdown (read-only) | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị trạng thái điện: **Đã có** / **Chưa có** / **Đang xây dựng**.`<br>`- Disabled.`<br>`- Nếu null → "-".`<br><br>`**Quy tắc hành động:**`<br>`- Không cho phép tap.                          |
| 3 | Hiện trạng nước    | Dropdown (read-only) | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị trạng thái nước: **Đã có** / **Chưa có** / **Đang xây dựng**.`<br>`- Disabled.`<br>`- Nếu null → "-".`<br><br>`**Quy tắc hành động:**`<br>`- Không cho phép tap.                          |
| 4 | Hiện trạng hạ tầng | Dropdown (read-only) | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị tổng thể hạ tầng: **Đã có** / **Chưa có** / **Đang xây dựng**.`<br>`- Disabled.`<br>`- Nếu null → "-".`<br><br>`**Quy tắc hành động:**`<br>`- Không cho phép tap.                         |

---

**2.2.4 Trạng thái:**

**2.2.4.1 Tình trạng quỹ đất:**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                  |
| - | ------------- | -------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Tình trạng  | Badge          | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- **Còn trống**: Badge nền xanh lá nhạt, chữ xanh lá.`<br>`- **Đã cho thuê**: Badge nền đỏ nhạt, chữ đỏ.`<br>`- Nếu null → không hiển thị.`<br><br>`**Quy tắc hành động:**`<br>`- Không cho phép tap. |

**2.2.4.2 Trạng thái công bố:**

| # | Tên trường          | Kiểu trường  | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                    |
| - | ---------------------- | --------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Trạng thái công bố | Badge (Outline) | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- **Đã công bố**: Badge nền trắng, viền xanh lá, chữ xanh lá.`<br>`- **Chưa công bố**: Badge nền xám nhạt, chữ xám đậm.`<br>`- Nếu null → không hiển thị.`<br><br>`**Quy tắc hành động:**`<br>`- Không cho phép tap. |

---

**2.2.5 Thông tin chi tiết:**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                      |
| - | ------------- | -------------- | --------------------- | ------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Loại đất   | Label          | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị loại đất (VD: "Đất nông nghiệp").`<br>`- Nếu null → "-".`<br>`- Nếu dài quá → xuống dòng (wrap text), không truncate.`<br><br>`**Quy tắc hành động:**`<br>`- Không tap được. |

---

**2.2.6 Hình ảnh / Video (Quảng bá):**

| # | Tên trường    | Kiểu trường      | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| - | ---------------- | ------------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | File đính kèm | List (Icon + Label) | -                    | —           | -         | **Quy tắc hiển thị:**`<br>`- Hiển thị danh sách file đính kèm (hình ảnh/video quảng bá). Không giới hạn số lượng file.`<br>`- Mỗi file gồm icon + tên file.`<br>`- Tên dài → truncate với dấu "...".`<br>`- **Thứ tự sắp xếp:** Sắp xếp theo **ngày upload giảm dần** (mới nhất hiển thị trên cùng). Nếu nhiều file được upload cùng thời điểm → sắp xếp theo thứ tự như lúc tạo.`<br>`- Không có file → hiển thị empty state *"Không có dữ liệu."* (Xem CMR-14).`<br><br>`**Quy tắc hành động:**`<br>`- Tap vào file → Mở file.`<br>`- PDF/Image/Video → Mở trên trình duyệt thiết bị (Xem CMR-08).`<br>`- File không hỗ trợ → Hiển thị thông báo lỗi (Xem CMR-08).`<br><br>`**Quy tắc validation:**`<br>`- File phải có URL hợp lệ. |

---

### 3. Mô tả xử lý

**3.1 Load dữ liệu:**

1. Người dùng tap vào card lô đất từ màn Danh sách (2.1).
2. Hệ thống gọi API lấy chi tiết lô đất theo ID (API: /api/v1/land-plots/{id}).
3. Trong khi chờ API phản hồi, hiển thị loading indicator (spinner/skeleton) trên toàn bộ nội dung (Xem CMR-07).
4. **Quy định thời gian phản hồi:** Tối đa 10 giây cho API chi tiết lô đất. Quá 10 giây → Hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." kèm nút "Thử lại".

**3.2 Mapping dữ liệu:**

1. Map dữ liệu từ API vào các trường UI tương ứng.
2. Nếu giá trị là null → Hiển thị "-".
3. Badge trạng thái map theo value: "Còn trống" / "Đã cho thuê" / "Đã công bố" / "Chưa công bố".

**3.3 Xử lý lỗi:**

- Nếu lô đất không tồn tại: Hiển thị thông báo *"Lô đất không tồn tại hoặc đã bị xóa."* (Xem CMR-07).
- Nếu API lỗi: Hiển thị thông báo lỗi kèm nút "Thử lại" (Xem CMR-07).
- Nếu session hết hạn (HTTP 401): Hệ thống tự động sử dụng refresh token để cấp lại access token mới. Nếu refresh token hết hạn hoặc không hợp lệ (quá 15 ngày) → Redirect về màn hình đăng nhập, hiển thị toast *"Phiên đăng nhập hết hạn."* (Xem CMR-07)

**3.4 Xử lý Partial Load (Một phần dữ liệu fail):**

Khi màn hình cần nhiều API (VD: API danh sách lô đất + API danh mục KCN cho dropdown), nếu một phần tải thành công và một phần fail:

- **Không block toàn màn.** Hiển thị partial: phần dữ liệu đã load thành công vẫn hiển thị bình thường; phần bị lỗi hiển thị trạng thái lỗi cục bộ.
- **Ví dụ:** Danh sách lô đất load OK nhưng API danh mục KCN fail → Vẫn hiển thị danh sách lô đất bình thường; dropdown KCN trong Bottom Sheet bộ lọc hiển thị empty option

---

### 4. Ghi chú

- **Toàn bộ màn là read-only** — không có input form.
- Không có hành động chỉnh sửa trên màn hình này.

---

### 5. Mô tả các xử lý của chức năng

#### 5.1 Xử lý Tải danh sách quỹ đất

1. Người dùng truy cập từ Sidebar → "Quản lý quỹ đất".
2. Hệ thống gọi API lấy toàn bộ danh sách lô đất (không áp dụng bộ lọc).
3. Danh sách hiển thị dạng Card, sắp xếp mặc định theo tên lô đất tăng dần.
4. Danh sách hỗ trợ **lazy load** 20 bản ghi/lần. Khi người dùng cuộn đến cuối, hệ thống tự động tải trang tiếp theo Tải 20 bản ghi mỗi lần tải. Cuộn đến cuối danh sách → Tự động tải trang tiếp theo. Hiện loading indicator ở cuối danh sách khi đang tải. Khi không còn dữ liệu, ẩn loading indicator. Rỗng: Hiển thị thông báo *"Không có dữ liệu."* (Xem CMR-14).
5. **Quy định thời gian phản hồi:** Tối đa 10 giây cho API load danh sách. Quá 10 giây → Hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." kèm nút "Thử lại".

**Xử lý trường hợp rỗng:**

- Nếu không có lô đất nào trong hệ thống: Hiển thị màn hình trống kèm thông báo *"Không có dữ liệu."* (Xem CMR-14)

#### 5.2 Xử lý Tìm kiếm & Lọc

1. **Tìm kiếm:** Người dùng nhập từ khóa vào ô tìm kiếm.
   - Debounce 3 giây: hiển thị kết quả tìm kiếm trong lúc gõ, sau 3 giây không gõ mới thực hiện tìm kiếm API.
   - Hệ thống tìm kiếm like theo tên lô đất.
   - Tìm kiếm gần đúng (chứa từ khóa). Khi xóa hết từ khóa, danh sách trở về trạng thái mặc định (hiển thị tất cả).
   - **Quy định thời gian phản hồi:** Tối đa 10 giây cho API tìm kiếm realtime. Quá 10 giây → Hiển thị "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại." kèm nút "Thử lại".
2. **Bộ lọc:** Người dùng tap icon Lọc → Chỉnh sửa tiêu chí trong Bottom Sheet → Tap "Áp dụng".
3. Hệ thống **kết hợp** tham số tìm kiếm và bộ lọc vào một lần gọi API duy nhất.
4. Nếu không có kết quả phù hợp: Hiển thị *"Không tìm thấy kết quả."* (Xem CMR-14)

**Xử lý validate bộ lọc Diện tích:**

- Nếu giá trị "Đến" nhỏ hơn giá trị "Từ": Hiển thị lỗi inline *"Diện tích (Đến) phải lớn hơn Diện tích (Từ)"* và không cho phép tap "Áp dụng".

**Quy tắc State Persistence:**

- Sau khi tìm kiếm/lọc, nếu người dùng vào màn chi tiết và quay lại, danh sách phải giữ nguyên trạng thái tìm kiếm/lọc trước đó (không reset về trạng thái mặc định).

#### 5.3 Pull-to-Refresh

- Màn hình Danh sách quỹ đất hỗ trợ **Pull-to-Refresh**: Người dùng kéo xuống từ đầu danh sách → Hệ thống reload toàn bộ dữ liệu từ đầu (áp dụng bộ lọc & từ khóa tìm kiếm hiện tại).
- Hiển thị spinner/animation ở đầu danh sách trong khi đang refresh. Sau khi refresh xong, ẩn spinner và cập nhật danh sách.
- Nếu refresh thất bại: Giữ nguyên dữ liệu cũ, hiển thị thông báo lỗi (Xem CMR-07).
- Khi đang pull-to-refresh hoặc lazy load, không trigger lại API tương tự. (Xem CMR-13)

#### 5.4 Đa ngôn ngữ (Multi-language)

- Toàn bộ **text cứng** của màn hình (header "Quản lý quỹ đất" / "Chi tiết lô đất", label các field, placeholder, tên nút "Lọc" / "Áp dụng" / "Nhập lại", thông báo lỗi, badge "Còn trống" / "Đã cho thuê" / "Đã công bố" / "Chưa công bố", empty state, toast) tuân theo ngôn ngữ đang được chọn trong thiết lập ứng dụng.
- **Nội dung dữ liệu** lấy từ API (tên lô đất, mã/tên KCN, vị trí, loại đất, ghi chú, v.v.) **không thay đổi** theo ngôn ngữ — hiển thị nguyên bản từ hệ thống. (Xem CMR-17)

#### 5.5 Debounce Navigation & Khôi phục trạng thái khi mở lại app

- Khi người dùng tap nhanh liên tục (double tap) vào card lô đất hoặc các nút navigation (Quay lại, Lọc...), hệ thống áp dụng cơ chế debounce để tránh mở trùng lặp màn hình.
- **Force close app** (tắt app không xóa dữ liệu) → Khi mở lại: giữ nguyên session đăng nhập, app quay về **Trang chủ** (không yêu cầu đăng nhập lại, không restore trạng thái tìm kiếm/lọc của UC40).
- **Uninstall app** → Khi cài lại: yêu cầu đăng nhập lại từ đầu. (Xem CMR-18)

---

## 6. Lịch sử cập nhật

| Ngày      | Phiên bản | Mục cập nhật                 | Before       | After                                                                                                                                                                                | Ghi chú                 |
| ---------- | ----------- | ------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| 2026-05-07 | v2 → v2.1  | Section 3.3 — Xử lý lỗi 401 | (Không có) | Session hết hạn (HTTP 401): tự động sử dụng refresh token; nếu refresh token hết hạn (>15 ngày) → redirect đăng nhập + toast "Phiên đăng nhập hết hạn" (CMR-07) | Bổ sung xử lý session |
| 2026-05-08 | v2.1 → v3 | Section 2.1 — Ô tìm kiếm (empty state reference) | `Không tìm thấy kết quả.` (Xem CMR-16) | `Không tìm thấy kết quả.` (Xem CMR-14) | Sửa tham chiếu sai (CMR-16 là API Performance, đúng là CMR-14 Empty State) |
| 2026-05-08 | v2.1 → v3 | Section 2.1 — Ô tìm kiếm (Max length) | (Không có) | Max length: 500 ký tự (Xem CMR-01) | Bổ sung max length theo CMR-01 v1.1 |
| 2026-05-08 | v2.1 → v3 | Section 2.1 — Bộ lọc KCN (Searchable) | Dropdown (Single-selection) thường | Dropdown (Single-selection, Searchable) — cho phép nhập từ khóa tìm kiếm trong danh sách KCN (Xem CMR-03) | BA xác nhận KCN dropdown searchable |
| 2026-05-08 | v2.1 → v3 | Section 2.1 — Nút "Áp dụng" (Disabled state) | (Không mô tả trạng thái disable) | Disabled (grayed out) khi validation Diện tích fail (Đến < Từ); Enabled khi hợp lệ | BA xác nhận disable button khi validation fail |
| 2026-05-08 | v2.1 → v3 | Section 2.2.6 — File đính kèm (thứ tự sắp xếp) | (Không có) | Sắp xếp theo ngày upload giảm dần (mới nhất trên cùng); cùng thời điểm → theo thứ tự tạo | BA xác nhận thứ tự sắp xếp file |
| 2026-05-08 | v2.1 → v3 | Section 3.4 — Xử lý Partial Load | (Không có) | Bổ sung mục 3.4: Khi một phần API fail → Hiển thị partial, không block toàn màn; phần lỗi hiển thị trạng thái lỗi cục bộ kèm "Thử lại" riêng | BA xác nhận hành vi partial load |
| 2026-05-08 | v2.1 → v3 | Section 5.1 — Empty state (no data) | `Không có dữ liệu.` (Xem CMR-16) | `Không có dữ liệu.` (Xem CMR-14) | Sửa tham chiếu sai |
| 2026-05-08 | v2.1 → v3 | Section 5.1 — Trường hợp rỗng toàn hệ thống | `Không có dữ liệu.` (Xem CMR-16) | `Không có dữ liệu.` (Xem CMR-14) | Sửa tham chiếu sai |
| 2026-05-08 | v2.1 → v3 | Section 5.2 — Empty state (no result) | `Không tìm thấy kết quả.` (Xem CMR-16) | `Không tìm thấy kết quả.` (Xem CMR-14) | Sửa tham chiếu sai |
| 2026-05-08 | v2.1 → v3 | Section 5.3 — Pull-to-Refresh | (Không có) | Bổ sung mục 5.3: hỗ trợ kéo xuống để reload toàn bộ danh sách, spinner ở đầu list, xử lý lỗi theo CMR-07 (Xem CMR-13) | Áp dụng CMR-13 cho UC40 |
| 2026-05-08 | v2.1 → v3 | Section 5.4 — Đa ngôn ngữ | (Không có) | Bổ sung mục 5.4: text cứng theo ngôn ngữ chọn; nội dung dữ liệu từ API giữ nguyên bản (Xem CMR-17) | Áp dụng CMR-17 cho UC40 |
| 2026-05-08 | v2.1 → v3 | Section 5.5 — Debounce Navigation & Khôi phục trạng thái | (Không có) | Bổ sung mục 5.5: debounce double-tap navigation; force close giữ session & quay về Trang chủ; uninstall → yêu cầu đăng nhập lại (Xem CMR-18) | Áp dụng CMR-18 cho UC40 |
| 2026-05-12 | v3 → v3.1 | Null display format (bảng spec) | — (em dash) | - (single dash) | Đồng bộ CMR-14 v1.4 |
