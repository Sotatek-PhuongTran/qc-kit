# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG

**Tiêu đề:** UC42-44 — Quản lý đặt lịch nộp hồ sơ trên Mobile
**Ngày tạo:** 29/04/2026
**Phiên bản:** v2.1

| Thuộc tính              | Giá trị                                 |
| ------------------------- | ----------------------------------------- |
| BA phụ trách            | han.luong                                 |
| Phân hệ                 | Ứng dụng Di động (Mobile App)         |
| Loại chức năng         | Quản lý đặt lịch                     |
| Đối tượng thực hiện | Cá nhân / Tổ chức (đã đăng nhập) |
| Giao diện                | Màn hình Mobile (Portrait)              |
| Ngày tạo                | 29/04/2026                                |
| Phiên bản               | v2                                        |

---

## UC42-44 — Quản lý đặt lịch nộp hồ sơ trên Mobile

### 1. Mô tả chức năng

**Tên chức năng:** Quản lý đặt lịch nộp hồ sơ thủ tục về đầu tư trên Mobile
**Mô tả:** Chức năng cho phép cá nhân, tổ chức xem danh sách lịch hẹn nộp hồ sơ theo các trạng thái: Tất cả, Chờ xác nhận, Đã xác nhận, Đã hủy, Đã bỏ lượt, Đã hoàn thành. Người dùng có thể xem chi tiết từng lịch hẹn. **Không có chức năng huỷ lịch trên mobile.**
**Phân quyền:** Cá nhân/Tổ chức đã đăng nhập.
**Truy cập chức năng:** Trang chủ → Quick Access "Quản lý đặt lịch" hoặc Sidebar → "Quản lý đặt lịch".
**Chức năng đáp ứng usecase số:** UC42, UC43, UC44 (Phụ lục XIV)

**Scope (Phạm vi chức năng):**

- **In scope:** Xem danh sách lịch hẹn theo trạng thái, tìm kiếm, lọc, xem chi tiết lịch hẹn.
- **Out of scope:** Không có chức năng tạo mới, chỉnh sửa, hoặc hủy lịch hẹn trên mobile.

---

### 2. Mô tả giao diện

#### 2.1 Giao diện Danh sách Đặt lịch nộp hồ sơ

**Mô tả giao diện:**
Màn hình cuộn dọc bao gồm các thành phần từ trên xuống dưới: Header đỏ có nút quay lại → Thanh tìm kiếm và bộ lọc → Thanh Tab trạng thái (6 tab) → Danh sách Card lịch hẹn. Dưới cùng là thanh điều hướng chính (Bottom Navigation).

**Khung Header:**

| # | Tên trường       | Kiểu trường | Giá trị mặc định                | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                |
| - | ------------------- | -------------- | ------------------------------------ | ------------ | ---------- | ----------------------------------------------------------------------------------------------- |
| 1 | Nút Quay lại (←) | Button (Icon)  | —                                   | —           | —         | **Quy tắc hành động:**`<br>`- Tap → Quay về màn hình trước đó. (Xem CMR-06) |
| 2 | Tiêu đề Header   | Label          | "Quản lý đặt lịch nộp hồ sơ" | —           | —         | **Quy tắc hiển thị:**`<br>`- Màu trắng trên nền đỏ đậm, căn giữa.          |

**Quy tắc chung cho Search/Filter & State Persistence:**

- Khi người dùng đang search/filter và tap vào card để xem chi tiết, sau đó quay lại → **Giữ nguyên** search/filter (theo CMR-01).
- Khi chuyển tab trạng thái nội bộ trong cùng màn hình → **giữ nguyên** keyword tìm kiếm và bộ lọc hiện tại (tab bản chất là một dạng filter bổ sung). Chỉ reset search/filter khi người dùng chuyển sang màn hình khác hoàn toàn (qua Sidebar, Footer tab, hoặc điều hướng chính — không bao gồm màn hình chi tiết).

**Khung Tìm kiếm & Lọc:**

| # | Tên trường | Kiểu trường       | Giá trị mặc định     | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| - | ------------- | -------------------- | ------------------------- | ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Ô tìm kiếm | Textbox (Search)     | "Tìm kiếm thủ tục..." | x            | —         | **Quy tắc hiển thị:**`<br>`- Icon kính lúp nằm bên trái trong ô.`<br>`- Tìm kiếm gần đúng (chứa từ khóa) tên hoặc mã thủ tục. Khi xóa hết từ khóa, danh sách trở về trạng thái mặc định (hiển thị tất cả).`<br>`- Tối đa **500 ký tự** (Xem CMR-01).`<br>`- **Phạm vi tìm kiếm:** Áp dụng cho **toàn bộ các tab** (không chỉ tab hiện tại). Kết quả tìm kiếm hiển thị trên tab "Tất cả", bất kể tab nào đang được chọn.`<br><br>`**Quy tắc hành động:** (Xem CMR-01)`<br>`- Nhập từ khóa → Kết quả hiển thị tự động sau **3 giây debounce**.`<br>`- Người dùng nhập từ khóa → Kết quả hiển thị ngay, không cần nhấn Enter hay nhấn nút nào.`<br>`- Nếu không có kết quả trùng khớp: Hiển thị màn *"Không tìm thấy kết quả."* (Xem CMR-14) |
| 2 | Nút "Lọc"   | Button (Icon Filter) | —                        | —           | —         | **Quy tắc hiển thị:**`<br>`- Nằm bên phải ô tìm kiếm, viền bo tròn, icon bộ lọc.`<br>`- Khi có filter đang active (giá trị khác mặc định) → Hiển thị **icon indicator màu xanh lá cây** ở góc phải bên trên của icon filter. (Xem CMR-02)`<br><br>`**Quy tắc hành động:** (Xem CMR-02)`<br>`- Tap → Mở bộ lọc tìm kiếm (Bottom Sheet Modal).`<br>`- Tap icon filter → Mở modal/panel bộ lọc.`<br>`- Tap 'Áp dụng' / 'Tìm' → Đóng bộ lọc, tải lại danh sách với tiêu chí đã chọn.`<br>`- Tap 'Nhập lại' / 'Đặt lại' → Reset tất cả trường về giá trị mặc định.`<br>`- Tap vùng ngoài hoặc nút 'X' → Đóng bộ lọc, không thay đổi kết quả hiện tại.                                                     |

**Modal Bộ lọc tìm kiếm:**

Mô tả giao diện: Bộ lọc hiển thị dưới dạng Bottom Sheet. Người dùng có thể lọc danh sách lịch hẹn theo lĩnh vực và dịch vụ công. Hai trường Lĩnh vực và Dịch vụ công **không phụ thuộc vào nhau** (chọn lĩnh vực không ảnh hưởng đến danh sách dịch vụ công và ngược lại). Sau khi chọn tiêu chí lọc, người dùng tap "Áp dụng" để tải lại danh sách phù hợp.

| # | Tên trường     | Kiểu trường              | Giá trị mặc định      | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| - | ----------------- | --------------------------- | -------------------------- | ------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Lĩnh vực        | Dropdown (Single-selection) | "Tất cả lĩnh vực"      | x            | —         | **Quy tắc hiển thị:** (Xem CMR-03)`<br>`- Danh sách lĩnh vực lấy từ danh mục hệ thống.`<br>`- Giá trị mặc định: "Tất cả lĩnh vực" — không hiển thị placeholder vì không thể clear về placeholder.`<br><br>`**Quy tắc hành động:** (Xem CMR-02)`<br>`- Người dùng tap → Mở danh sách lựa chọn → Tap item → Tự động đóng và hiển thị giá trị đã chọn.`<br>`- Người dùng có thể nhập text để tìm kiếm/filter trong dropdown (tìm kiếm gần đúng).`<br>`- Option đã chọn được highlight/bold khi mở dropdown list.`<br>`- Nếu tên option vượt quá giới hạn ký tự → Tự động cắt ngắn và hiển thị "..." ở cuối.           |
| 2 | Dịch vụ công   | Dropdown (Single-selection) | "Tất cả dịch vụ công" | x            | —         | **Quy tắc hiển thị:** (Xem CMR-03)`<br>`- Danh sách dịch vụ công lấy từ danh mục hệ thống.`<br>`- Giá trị mặc định: "Tất cả dịch vụ công" — không hiển thị placeholder vì không thể clear về placeholder.`<br><br>`**Quy tắc hành động:** (Xem CMR-02)`<br>`- Người dùng tap → Mở danh sách lựa chọn → Tap item → Tự động đóng và hiển thị giá trị đã chọn.`<br>`- Người dùng có thể nhập text để tìm kiếm/filter trong dropdown (tìm kiếm gần đúng).`<br>`- Option đã chọn được highlight/bold khi mở dropdown list.`<br>`- Nếu tên option vượt quá giới hạn ký tự → Tự động cắt ngắn và hiển thị "..." ở cuối. |
| 3 | Nút "X" đóng   | Button (Icon)               | —                         | —           | —         | **Quy tắc hiển thị:**`<br>`- Icon "X" nằm ở góc trên phải của Bottom Sheet.`<br>`- Màu xám đậm, viền bo tròn nếu có nền.`<br><br>`**Quy tắc hành động:**`<br>`- Tap vùng ngoài hoặc tap nút "X" → Đóng Bottom Sheet, không thay đổi kết quả hiện tại. (Xem CMR-02)                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 4 | Nút "Nhập lại" | Button (Secondary)          | —                         | —           | —         | **Quy tắc hiển thị:**`<br>`- Nút viền outline màu đỏ, text màu đỏ.`<br>`- Không đóng Bottom Sheet.`<br><br>`**Quy tắc hành động:** (Xem CMR-02)`<br>`- Tap → Reset toàn bộ tiêu chí lọc về giá trị mặc định ("Tất cả lĩnh vực", "Tất cả dịch vụ công").                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 5 | Nút "Áp dụng"  | Button (Primary)            | —                         | —           | —         | **Quy tắc hiển thị:**`<br>`- Nút nền đỏ filled, text trắng.`<br><br>`**Quy tắc hành động:** (Xem CMR-02)`<br>`- Tap → Áp dụng toàn bộ tiêu chí lọc hiện tại.`<br>`- Đóng Bottom Sheet.`<br>`- Gọi API với tham số bộ lọc và tải lại danh sách lịch hẹn.`<br>`- Nếu không có kết quả phù hợp → hiển thị "Không tìm thấy kết quả." (Xem CMR-14)                                                                                                                                                                                                                                                                                                                       |

**Khung Tabs Trạng thái (Horizontal Scroll):**

| # | Tên Tab          | Điều kiện hiển thị                                              | Trạng thái active                                |
| - | ----------------- | -------------------------------------------------------------------- | -------------------------------------------------- |
| 1 | Tất cả          | Hiển thị tất cả lịch hẹn không phân biệt trạng thái.      | Text/màu đỏ + underline đỏ khi được chọn. |
| 2 | Chờ xác nhận   | Lịch hẹn mới đăng ký, đang chờ cơ quan tiếp nhận xử lý. | Text/màu đỏ + underline đỏ khi được chọn. |
| 3 | Đã xác nhận   | Lịch hẹn đã được cơ quan xác nhận thời gian.              | Text/màu đỏ + underline đỏ khi được chọn. |
| 4 | Đã hủy         | Lịch hẹn đã bị hủy.                                            | Text/màu đỏ + underline đỏ khi được chọn. |
| 5 | Đã bỏ lượt   | Người dùng không đến nộp theo lịch đã hẹn.                | Text/màu đỏ + underline đỏ khi được chọn. |
| 6 | Đã hoàn thành | Đã hoàn thành việc nộp hồ sơ theo lịch.                     | Text/màu đỏ + underline đỏ khi được chọn. |

**Quy tắc hành động:** (Xem CMR-02)

- **Single selection:** Chỉ cho phép chọn 1 tab tại một thời điểm.
- Tap vào tab → **Tự động unselect tab hiện tại** (bỏ underline đỏ) → **Select tab mới** (hiển thị underline đỏ).
- Hệ thống gọi API với tham số trạng thái tương ứng và cập nhật danh sách lịch hẹn.
- Tab mặc định (khi mở màn hình): Tab "Tất cả".
- Thứ tự và danh sách 6 tabs là **cố định, không thể thay đổi** thứ tự hoặc ẩn/hiện.
- **Giữ tab khi quay lại:** Khi người dùng vào chi tiết lịch hẹn và quay lại → **giữ nguyên tab đang chọn** trước đó (không reset về "Tất cả").
- **Giữ scroll position:** Khi người dùng vào chi tiết lịch hẹn và quay lại → **giữ nguyên vị trí cuộn** (scroll position) trước đó trong danh sách.
- Nếu không có lịch hẹn cho trạng thái tương ứng → Hiển thị *"Không có dữ liệu."* (Xem CMR-14).

**Khung Danh sách Lịch hẹn (Card List):**

**Quy tắc hiển thị null:** Nếu bất kỳ field nào trên Card có giá trị null/rỗng → Hiển thị **"-"** thay thế.

| # | Tên trường            | Kiểu trường         | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                     |
| - | ------------------------ | ---------------------- | --------------------- | ------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Tên thủ tục           | Label (Bold)           | —                    | —           | —         | **Quy tắc hiển thị:** Tên thủ tục đăng ký. Tối đa 2 dòng, quá dài sẽ truncate với "..." ở cuối.                                                                              |
| 2 | Trạng thái             | Badge                  | —                    | —           | —         | **Quy tắc hiển thị:** (Xem CMR-05)`<br>`- Màu sắc dự vào UI design.`<br><br>`**Quy tắc hành động:**`<br>`- Badge trạng thái luôn read-only, không cho phép tap.    |
| 3 | Lĩnh vực               | Label (Icon Tòa nhà) | —                    | —           | —         | **Quy tắc hiển thị:** Icon tòa nhà (màu xám) + tiền tố "Lĩnh vực: " + Tên lĩnh vực. Hiển thị tối đa 1 dòng, quá dài sẽ truncate với "..." ở cuối.                     |
| 4 | Thời gian đặt         | Label (Icon Người)   | —                    | —           | —         | **Quy tắc hiển thị:** Icon người (màu xám) + tiền tố "Thời gian đặt: " + Giá trị ngày. Định dạng: DD/MM/YYYY HH:mm (Xem CMR-12).                                             |
| 5 | Ngày cán bộ hẹn nộp | Label (Icon Lịch)     | —                    | —           | —         | **Quy tắc hiển thị:** Icon lịch (màu xám) + tiền tố "Ngày cán bộ hẹn nộp: " + Giá trị ngày. Định dạng: DD/MM/YYYY (Xem CMR-12).                                             |
| 6 | Icon Điều hướng (>)  | Icon                   | —                    | —           | —         | **Quy tắc hành động:** Icon mũi tên ">" màu xám, nằm ở góc phải Card.`<br>`- Tap vào bất kỳ đâu trên Card hoặc icon này → Chuyển sang màn hình Chi tiết lịch hẹn. |

---

#### 2.2 Giao diện Chi tiết Lịch hẹn

**Mô tả giao diện:**
Header tiêu đề "Chi tiết lịch hẹn", có nút quay lại ←. Nội dung màn hình cuộn dọc chia thành các khối (Section) riêng biệt, hiển thị đầy đủ thông tin chi tiết của lịch hẹn. Toàn bộ màn hình là read-only.

**Quy tắc hiển thị chung:** Tất cả các field label trong màn hình chi tiết đều **wrap text nếu dài quá, không truncate**.

**Khung Header:**

| # | Tên trường       | Kiểu trường | Giá trị mặc định  | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                |
| - | ------------------- | -------------- | ---------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------- |
| 1 | Nút Quay lại (←) | Button (Icon)  | —                     | —           | —         | **Quy tắc hành động:** Tap → Quay về màn hình Danh sách lịch hẹn. (Xem CMR-06) |
| 2 | Tiêu đề Header   | Label          | "Chi tiết lịch hẹn" | —           | —         | **Quy tắc hiển thị:** Màu trắng trên nền đỏ đậm, căn giữa.                   |

**Section 1 — Thông tin thủ tục:**

| # | Tên trường         | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                             |
| - | --------------------- | ----------------- | --------------------- | ------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Mã thủ tục         | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị mã thủ tục hành chính (ví dụ: "2.000412.001"). Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-". |
| 2 | Tên thủ tục        | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị đầy đủ tên thủ tục. Wrap text nếu dài, không truncate.                                                                   |
| 3 | Lĩnh vực            | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị tên lĩnh vực của thủ tục. Wrap text nếu dài, không truncate.                                                             |
| 4 | Dịch vụ công       | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị mức độ dịch vụ công (ví dụ: "Dịch vụ công trực tuyến mức độ 4"). Wrap text nếu dài, không truncate.            |
| 5 | Cơ quan thực hiện  | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị tên cơ quan thực hiện thủ tục. Wrap text nếu dài, không truncate.                                                         |
| 6 | Đơn vị tiếp nhận | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị tên đơn vị tiếp nhận hồ sơ. Wrap text nếu dài, không truncate.                                                          |

**Section 2 — Thông tin người nộp:**

| # | Tên trường     | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                       |
| - | ----------------- | ----------------- | --------------------- | ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 7 | Mã định danh   | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị mã định danh cá nhân/tổ chức của người nộp (mã số CCCD/CMND/Mã doanh nghiệp). |
| 8 | Tên người nộp | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị họ tên đầy đủ của người nộp. Wrap text nếu dài, không truncate.                 |

**Section 3 — Thông tin lịch hẹn:**

| #  | Tên trường            | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                   |
| -- | ------------------------ | ----------------- | --------------------- | ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 9  | Ngày hẹn nộp          | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị ngày dự kiến nộp hồ sơ. Định dạng: DD/MM/YYYY (Xem CMR-12).`<br>`- Nếu null → hiển thị "-".                                               |
| 10 | Khung giờ hẹn nộp     | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị khung thời gian tiếp nhận hồ sơ. Định dạng: HH:mm - HH:mm (Xem CMR-12).`<br>`- Ví dụ: "08:00 - 09:00".`<br>`- Nếu null → hiển thị "-". |
| 11 | Thời gian đặt        | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị thời điểm người dùng đặt lịch. Định dạng: DD/MM/YYYY HH:mm (Xem CMR-12).`<br>`- Nếu null → hiển thị "-".                               |
| 12 | Ngày cán bộ hẹn nộp | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị ngày cán bộ xác nhận/điều chỉnh lịch hẹn. Định dạng: DD/MM/YYYY (Xem CMR-12).`<br>`- Nếu null → hiển thị "-".                         |

**Section 4 — Trạng thái:**

| #  | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                     |
| -- | ------------- | -------------- | --------------------- | ------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 13 | Trạng thái  | Badge          | —                    | —           | —         | **Quy tắc hiển thị:** (Xem CMR-05)`<br><br>`Màu sắc dựa theo UI design `<br><br>`**Quy tắc hành động:**`<br>`- Badge trạng thái luôn read-only, không cho phép tap. |

**Section 5 — Ghi chú:**

| #  | Tên trường      | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                              |
| -- | ------------------ | -------------- | --------------------- | ------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 14 | Nội dung ghi chú | Label          | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị nội dung ghi chú của đặt lịch (nếu có).`<br>`- Wrap text nếu dài, không truncate.`<br>`- Nếu không có ghi chú → hiển thị "-". |

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Xử lý Tải danh sách lịch hẹn

1. Người dùng truy cập màn hình Quản lý đặt lịch.
2. Hệ thống mặc định hiển thị Tab "Tất cả" (hoặc tab được cấu hình mặc định) và gọi API lấy danh sách lịch hẹn.
3. Danh sách sắp xếp theo thời gian đặt giảm dần (mới nhất lên đầu).
4. Tap vào Tab khác → Hệ thống gọi API với tham số trạng thái tương ứng và cập nhật danh sách.

**Loading state:** (Xem CMR-07)

- **First-load** (lần đầu vào màn hình): Hiển thị **loading state toàn màn hình** (full-screen loading overlay) trong khi chờ API trả về dữ liệu.
- Các lần tải tiếp theo (chuyển tab, pull-to-refresh, lazy load): Sử dụng loading indicator cục bộ (spinner).

**Debounce navigation:** (Xem CMR-18)

- Khi người dùng tap nhanh liên tục (double tap) vào card lịch hẹn, hệ thống có cơ chế debounce để tránh navigate 2 lần.

**Pull to refresh:** (Xem CMR-13)

- Kéo xuống từ đầu danh sách → Trigger refresh dữ liệu từ đầu.
- Hiển thị spinner ở đầu danh sách trong khi đang refresh.
- Sau khi refresh thành công: Cập nhật danh sách, ẩn spinner.

**Xử lý lỗi:** (Xem CMR-07)

| Tình huống lỗi           | Thông báo hiển thị                                                                             | Hành vi hệ thống                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Lỗi mạng / Mất kết nối | *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* + nút **"Thử lại"** | Giữ nguyên màn hình, hiển thị nút Thử lại.              |
| Lỗi API (HTTP 500)         | *"Hệ thống đang bận. Vui lòng thử lại sau."*                                              | Giữ nguyên màn hình, chỉ hiển thị thông báo.            |
| Session hết hạn (HTTP 401) | Toast: *"Phiên đăng nhập hết hạn."* | Hệ thống tự động sử dụng refresh token để cấp lại access token mới. Nếu refresh token hết hạn hoặc không hợp lệ (quá **15 ngày**) → Redirect về màn hình đăng nhập. (Xem CMR-07) |
| Timeout (quá 10 giây)     | *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + nút **"Thử lại"**       | Giữ nguyên màn hình, hiển thị nút Thử lại. (Xem CMR-16) |

**Xử lý lỗi trống (Empty state):** (Xem CMR-14)

- Nếu không có lịch hẹn: Hiển thị Empty State (Icon + Thông báo *"Không có dữ liệu."*).
- Nếu search/filter không có kết quả: Hiển thị *"Không tìm thấy kết quả."*.

**Phân trang:** Hỗ trợ **lazy load**, tải 20 bản ghi mỗi lần. Cuộn đến cuối danh sách → Tự động tải trang tiếp theo. (Xem CMR-04)

**Xử lý lazy load fail:**

- Khi tải trang N bị lỗi → Hệ thống **tự động retry 3 lần** (mỗi lần cách nhau ~2 giây).
- Sau 3 lần retry vẫn fail → **Dừng tự động retry**, hiển thị thông báo lỗi cục bộ ở cuối danh sách. Người dùng có thể dùng **pull-to-refresh** để tải lại từ đầu.

#### 3.2 Xử lý Xem chi tiết lịch hẹn

1. Người dùng tap vào card lịch hẹn.
2. Hệ thống gọi API chi tiết lịch hẹn theo mã lịch hẹn.
3. Hiển thị thông tin chi tiết trong 5 section.

**Loading state:** (Xem CMR-07)

- **First-load** (lần đầu vào màn hình chi tiết): Hiển thị **loading state toàn màn hình** trong khi chờ API trả về dữ liệu.
- Các lần tải tiếp theo (pull-to-refresh): Sử dụng spinner ở đầu màn hình.

**Pull to refresh:** (Xem CMR-13)

- Kéo xuống từ đầu màn hình chi tiết → Trigger refresh dữ liệu chi tiết lịch hẹn.
- Hiển thị spinner ở đầu màn hình trong khi đang refresh.
- Sau khi refresh thành công: Cập nhật nội dung các section, ẩn spinner.

**Xử lý lỗi:** (Xem CMR-07)

| Tình huống lỗi                                                                          | Thông báo hiển thị                                                                             | Hành vi hệ thống                                              |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Lỗi mạng / Mất kết nối                                                                | *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* + nút **"Thử lại"** | Giữ nguyên màn hình, hiển thị nút Thử lại.              |
| Lỗi API (HTTP 500)                                                                        | *"Hệ thống đang bận. Vui lòng thử lại sau."*                                              | Giữ nguyên màn hình, chỉ hiển thị thông báo.            |
| Không tìm thấy lịch hẹn (HTTP 404) — lịch hẹn không tồn tại hoặc đã bị xóa | *"Nội dung không tồn tại hoặc đã bị xóa."*                                              | Quay lại màn hình Danh sách lịch hẹn.                      |
| Session hết hạn (HTTP 401) | Toast: *"Phiên đăng nhập hết hạn."* | Hệ thống tự động sử dụng refresh token để cấp lại access token mới. Nếu refresh token hết hạn hoặc không hợp lệ (quá **15 ngày**) → Redirect về màn hình đăng nhập. (Xem CMR-07) |
| Timeout (quá 10 giây)                                                                    | *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + nút **"Thử lại"**       | Giữ nguyên màn hình, hiển thị nút Thử lại. (Xem CMR-16) |

#### 3.3 Tiêu chí chấp nhận (Acceptance Criteria)

**Tabs & Danh sách:**

- **AC1:** Given người dùng mở màn hình Quản lý đặt lịch, When hệ thống load xong, Then danh sách hiển thị đúng và đủ 6 tab trạng thái cố định theo thứ tự: Tất cả, Chờ xác nhận, Đã xác nhận, Đã hủy, Đã bỏ lượt, Đã hoàn thành. Tab mặc định là "Tất cả".
- **AC2:** Given người dùng đang ở danh sách, When tap vào 1 card lịch hẹn rồi quay lại, Then hệ thống giữ nguyên tab đang chọn, scroll position, search/filter trước đó.
- **AC3:** Given danh sách lịch hẹn, When hệ thống hiển thị card, Then thông tin trên Card phải hiển thị đầy đủ 3 icon (Tòa nhà, Người, Lịch) kèm dữ liệu tương ứng. Nếu bất kỳ field nào null/rỗng → hiển thị "-".
- **AC4:** Given danh sách lịch hẹn, When dữ liệu trả về, Then danh sách sắp xếp theo thời gian đặt giảm dần (mới nhất lên đầu).

**Chi tiết:**

- **AC5:** Given người dùng tap vào card lịch hẹn, When hệ thống trả về dữ liệu, Then màn hình chi tiết hiển thị đầy đủ 5 section thông tin, khớp 100% với dữ liệu từ API. Field "Thời gian đặt" phải nhất quán giữa card và chi tiết.

**Badge:**

- **AC6:** Given lịch hẹn có trạng thái, When hiển thị badge, Then badge trạng thái hiển thị đúng màu sắc theo UI design cho từng trạng thái cụ thể. (Xem CMR-05)

**Filter:**

- **AC7:** Given người dùng mở modal bộ lọc, When chọn Lĩnh vực và/hoặc Dịch vụ công rồi tap "Áp dụng", Then danh sách được lọc chính xác theo tiêu chí. Hai trường Lĩnh vực và Dịch vụ công không phụ thuộc vào nhau.
- **AC8:** Given có filter đang active (giá trị khác mặc định), When hiển thị icon filter, Then hiển thị icon indicator màu xanh lá cây ở góc phải trên. Khi reset filter → ẩn indicator.

**Search:**

- **AC9:** Given người dùng nhập từ khóa tìm kiếm (tối đa 500 ký tự), When sau debounce 3 giây, Then danh sách hiển thị kết quả tìm kiếm gần đúng trên **toàn bộ các tab** (không chỉ tab hiện tại).
- **AC10:** Given người dùng xóa hết từ khóa, When ô tìm kiếm rỗng, Then danh sách trở về trạng thái mặc định (hiển thị tất cả).

**Pull-to-refresh:**

- **AC11:** Given người dùng đang ở danh sách lịch hẹn, When kéo xuống từ đầu danh sách (pull-to-refresh), Then hệ thống refresh dữ liệu từ đầu, hiển thị spinner trong khi đang refresh, cập nhật danh sách khi xong.
- **AC12:** Given người dùng đang ở màn hình chi tiết lịch hẹn, When kéo xuống từ đầu màn hình (pull-to-refresh), Then hệ thống refresh dữ liệu chi tiết, hiển thị spinner trong khi đang refresh, cập nhật nội dung khi xong.

**Lazy load:**

- **AC13:** Given danh sách có nhiều hơn 20 bản ghi, When người dùng cuộn đến cuối danh sách, Then hệ thống tự động tải 20 bản ghi tiếp theo (Xem CMR-04).
- **AC14:** Given tải trang N bị lỗi, When retry tự động 3 lần vẫn fail, Then dừng retry, hiển thị lỗi cục bộ ở cuối danh sách. Người dùng có thể pull-to-refresh để tải lại.

**Error handling:**

- **AC15:** Given API trả về lỗi mạng/500/timeout, When hệ thống hiển thị thông báo lỗi, Then thông báo đúng nội dung theo CMR-07 kèm nút "Thử lại" (trừ lỗi 500 không có nút).
- **AC16:** Given session đăng nhập hết hạn (HTTP 401), When refresh token cũng hết hạn (quá 15 ngày), Then hệ thống redirect về màn hình đăng nhập và hiển thị toast "Phiên đăng nhập hết hạn". (Xem CMR-07)

**Loading state:**

- **AC17:** Given người dùng lần đầu vào màn hình danh sách hoặc chi tiết, When đang chờ API trả về, Then hiển thị loading state toàn màn hình (full-screen loading overlay).

**State persistence:**

- **AC18:** Given người dùng đang search/filter, When tap vào card chi tiết rồi quay lại, Then giữ nguyên search/filter trước đó. (Xem CMR-01)
- **AC19:** Given người dùng chuyển tab trạng thái nội bộ trong cùng màn hình, When chuyển tab, Then giữ nguyên keyword tìm kiếm và bộ lọc hiện tại. Chỉ reset search/filter khi chuyển sang màn hình khác hoàn toàn (qua Sidebar, Footer tab, hoặc điều hướng chính — không bao gồm màn hình chi tiết).

**Đa ngôn ngữ:**

- **AC20:** Given ứng dụng hỗ trợ 5 ngôn ngữ, When người dùng đổi ngôn ngữ, Then tất cả text cứng (header, tên field, tên tab, placeholder, thông báo lỗi, toast) đổi theo ngôn ngữ đã chọn. Nội dung dữ liệu từ API (tên thủ tục, tên lĩnh vực, ghi chú) giữ nguyên ngôn ngữ gốc. (Xem CMR-17)

**Accessibility:**

- **AC21:** Given người dùng sử dụng screen reader, When điều hướng qua các thành phần UI (Header, Card, Quick Access, Tin tức, Footer), Then các thành phần phải hỗ trợ đọc bằng screen reader theo tiêu chuẩn iOS/Android accessibility guidelines.
- **AC22:** Các yêu cầu về contrast ratio, font size, touch target dựa vào UI design specs.

---

### 4. Đa ngôn ngữ (Xem CMR-17)

Đa ngôn ngữ chỉ áp dụng cho **text cứng** của màn hình UC42-44:

| Text cứng (đổi theo ngôn ngữ)                             | Text động (không đổi)                 |
| ----------------------------------------------------------- | --------------------------------------- |
| Header: "Quản lý đặt lịch nộp hồ sơ", "Chi tiết lịch hẹn" | Tên thủ tục                         |
| Label field: "Mã thủ tục", "Lĩnh vực", "Dịch vụ công"... | Tên lĩnh vực                        |
| Tab: "Tất cả", "Chờ xác nhận", "Đã xác nhận"...         | Tên dịch vụ công                    |
| Placeholder: "Tìm kiếm thủ tục..."                        | Tên cơ quan, đơn vị                |
| Nút: "Áp dụng", "Nhập lại"                                | Nội dung ghi chú                    |
| Thông báo lỗi, empty state, toast                         | Mã thủ tục, mã định danh          |

---

### 5. Accessibility

- **Screen Reader:** Các thành phần UI (Header, Card, Quick Access, Tin tức, Footer) cần hỗ trợ đọc bằng screen reader theo tiêu chuẩn iOS/Android accessibility guidelines.
- Các yêu cầu về contrast ratio, font size, touch target dựa vào UI design specs.

---

## 6. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-04-29 | v1 | Khởi tạo UC42-44 | (Không có) | Toàn bộ nội dung UC42-44 v1 | Tạo mới |
| 2026-05-07 | v1 → v2 | Section 3.1 step 3 — Sort order | "sắp xếp theo ngày hẹn tăng dần (mới nhất lên đầu)" — mâu thuẫn | "sắp xếp theo thời gian đặt giảm dần (mới nhất lên đầu)" | Sửa mâu thuẫn nội tại |
| 2026-05-07 | v1 → v2 | Section 2.2 field #11 — Tên field | "Thời gian đặt lịch" | "Thời gian đặt" — nhất quán với card list | Đồng bộ tên field |
| 2026-05-07 | v1 → v2 | Section 2.1 Search — Scope & giới hạn ký tự | Không rõ scope, không giới hạn ký tự | Search toàn bộ các tab, tối đa 500 ký tự (CMR-01) | Làm rõ yêu cầu |
| 2026-05-07 | v1 → v2 | Section 2.1 Filter — Filter independence | Không rõ quan hệ phụ thuộc | Lĩnh vực và Dịch vụ công không phụ thuộc nhau | Làm rõ yêu cầu |
| 2026-05-07 | v1 → v2 | Section 2.1 Filter — Active indicator | (Không có) | Icon indicator màu xanh lá cây (CMR-02) | Bổ sung UX |
| 2026-05-07 | v1 → v2 | Section 2.1 Card — Null handling | Chỉ mô tả "-" cho detail | Card cũng hiển thị "-" khi field null/rỗng | Bổ sung quy tắc |
| 2026-05-07 | v1 → v2 | Section 2.1 Tabs — Giữ tab, scroll, tab cố định | (Không có) | Giữ tab, scroll position khi quay lại; 6 tabs cố định không đổi | Bổ sung UX |
| 2026-05-07 | v1 → v2 | Section 3.1 — Loading state | (Không có) | First-load: loading toàn màn hình. Tiếp theo: spinner cục bộ (CMR-07) | Bổ sung |
| 2026-05-07 | v1 → v2 | Section 3.1 — Debounce navigation | (Không có) | Debounce double-tap chống navigate 2 lần (CMR-18) | Bổ sung |
| 2026-05-07 | v1 → v2 | Section 3.1 — Lazy load fail | (Không có) | Retry tự động 3 lần, sau đó dừng, user pull-to-refresh | Bổ sung |
| 2026-05-07 | v1 → v2 | Section 3.1 + 3.2 — Xử lý 401 | (Không có) | Tự động refresh token; nếu refresh token hết hạn (>15 ngày) → redirect đăng nhập + toast "Phiên đăng nhập hết hạn" (CMR-07) | Bổ sung |
| 2026-05-07 | v1 → v2 | Section 3.2 — Pull to refresh chi tiết | (Không có) | Pull-to-refresh trên màn hình chi tiết lịch hẹn (CMR-13) | Bổ sung |
| 2026-05-07 | v1 → v2 | Section 3.2 — Loading state chi tiết | (Không có) | First-load: loading toàn màn hình (CMR-07) | Bổ sung |
| 2026-05-07 | v1 → v2 | Section 3.3 — AC viết lại | 5 AC không measurable | 22 AC theo Given/When/Then, bổ sung search/filter/lazy load/error/state/đa ngôn ngữ/accessibility | Nâng cấp AC |
| 2026-05-07 | v1 → v2 | Section 4 — Đa ngôn ngữ | (Không có) | Mô tả text cứng vs text động (CMR-17) | Bổ sung |
| 2026-05-07 | v1 → v2 | Section 5 — Accessibility | (Không có) | Screen reader + dựa vào UI design specs | Bổ sung |
| 2026-05-12 | v2 → v2.1 | Tab switching behavior | Reset search/filter khi chuyển tab | Giữ nguyên search/filter khi chuyển tab nội bộ (chỉ reset khi chuyển màn — không bao gồm màn chi tiết) | Đồng bộ CMR-01 v1.4 |
