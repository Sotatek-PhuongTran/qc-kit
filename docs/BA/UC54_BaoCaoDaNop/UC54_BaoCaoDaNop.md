# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG

**Tiêu đề:** UC54 — Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên Mobile
**Ngày tạo:** 29/04/2026
**Phiên bản:** v2.3

| Thuộc tính              | Giá trị                                 |
| ------------------------- | ----------------------------------------- |
| BA phụ trách            | han.luong & huy.lai2                      |
| Phân hệ                 | Ứng dụng Di động (Mobile App)         |
| Loại chức năng         | Tra cứu báo cáo                        |
| Đối tượng thực hiện | Cá nhân / Tổ chức (đã đăng nhập) |
| Giao diện                | Màn hình Mobile (Portrait)              |
| Ngày tạo                | 29/04/2026                                |
| Phiên bản               | v2.1                                      |

---

## UC54 — Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên Mobile

### 1. Mô tả chức năng

**Tên chức năng:** Tra cứu báo cáo nhà đầu tư đã nộp cho cơ quan Nhà nước trên Mobile
**Mô tả:** Chức năng cho phép cá nhân, tổ chức xem danh sách các báo cáo đã nộp cho cơ quan Nhà nước thông qua hệ thống, tra cứu theo tiêu chí lọc và xem chi tiết từng báo cáo. Hệ thống hiển thị báo cáo được phân loại theo các tab trạng thái.
**Phân quyền:** Cá nhân/Tổ chức đã đăng nhập chỉ xem được báo cáo của chính mình nộp.
**Lưu ý:** Giao diện, dữ liệu hiển thị, và các tùy chọn filter của **Cá nhân** và **Tổ chức là giống nhau**, không có khác biệt về hành vi hay UI.
**Truy cập chức năng:** Sidebar → "Báo cáo đã nộp".
**Chức năng đáp ứng usecase số:** UC54 (Phụ lục XIV — Nhóm C.V)

**Quy tắc đồng bộ dữ liệu:**

- Dữ liệu báo cáo trên UC54 (Mobile) được **đồng bộ real-time** với phân hệ Báo cáo trên Web.
- Khi nhà đầu tư nộp báo cáo trên Web → Dữ liệu cập nhật ngay trên Mobile mà không cần thao tác làm mới (pull-to-refresh).
- Khi trạng thái báo cáo thay đổi trên Web (ví dụ: Đã duyệt, Yêu cầu bổ sung, Từ chối) → Stat Banner và danh sách trên Mobile tự động cập nhật theo.
- Tương tự, các thao tác trên Mobile (nếu có) cũng phản ánh ngay lên phân hệ Web.
- **Khi mất kết nối mạng:** Giữ nguyên dữ liệu cũ trên màn hình hiện tại và hiển thị thông báo lỗi mạng. (Xem CMR-07)
- **Khi khôi phục kết nối:** Hiển thị thông báo khôi phục kết nối. Người dùng có thể **pull-to-refresh** để đồng bộ lại dữ liệu mới nhất. (Xem CMR-13)

---

### 2. Mô tả giao diện

#### 2.1 Giao diện Danh sách báo cáo đã nộp

**Mô tả giao diện:**
Màn hình cuộn dọc bắt đầu bằng Header đỏ đặc trưng. Bên dưới Header là thanh chỉ số trạng thái (Stat Banner) cuộn ngang, tiếp đến là thanh tìm kiếm kết hợp bộ lọc, và cuối cùng là danh sách Card báo cáo hiển thị chi tiết thông tin dự án và trạng thái.

**Khung Header:**

| # | Tên trường       | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                       |
| - | ------------------- | -------------- | --------------------- | ------------ | ---------- | -------------------------------------------------------------------------------------- |
| 1 | Nút Quay lại (←) | Button (Icon)  | —                    | —           | —         | **Quy tắc hành động:** Tap → Quay về màn hình trước đó. (Xem CMR-06) |
| 2 | Tiêu đề Header   | Label          | "Báo cáo đã nộp" | —           | —         | **Quy tắc hiển thị:** Màu trắng trên nền đỏ đậm, căn giữa.          |

**Quy tắc chung cho Search/Filter & State Persistence:**

- Khi người dùng đang search/filter và tap vào card để xem chi tiết, sau đó quay lại → **Giữ nguyên** search/filter (theo CMR-01).
- Khi người dùng chuyển sang **mục khác trên Sidebar (Left Sidebar)** và quay lại → **Reset** search/filter về mặc định.

**Thanh chỉ số trạng thái (Stat Banner):**

> Thanh này hiển thị tổng quan số lượng báo cáo theo từng trạng thái, hỗ trợ cuộn ngang (Horizontal Scroll).

**Quy tắc hành động:** Các thẻ chỉ số trạng thái là **read-only, không thể tap (unclickable)**. Thẻ chỉ hiển thị thông tin tổng quan, không trigger filter danh sách.

**Quy tắc hiển thị số lượng:**

- Số lượng báo cáo trên mỗi thẻ được **hệ thống tự động đếm (count)** từ API theo từng trạng thái tương ứng.
- **Quy tắc format số:** (Xem CMR-11)

| # | Tên chỉ số       | Kiểu hiển thị    | Mô tả/Ghi chú                                                                                                                       |
| - | ------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Tổng số báo cáo | Card (Icon + Label) | Nền trắng, icon xanh dương. Hiển thị tổng số lượng báo cáo.**(Hệ thống tự count theo trạng thái)** (Xem CMR-11) |
| 2 | Đã nộp           | Card (Icon + Label) | Nền xanh dương nhạt, icon xanh dương. Số lượng được hệ thống tự count. (Xem CMR-11)                                     |
| 3 | Đang xử lý       | Card (Icon + Label) | Nền vàng nhạt, icon đồng hồ vàng. Số lượng được hệ thống tự count. (Xem CMR-11)                                        |
| 4 | Đã duyệt         | Card (Icon + Label) | Nền xanh lá nhạt, icon tích xanh. Số lượng được hệ thống tự count. (Xem CMR-11)                                           |
| 5 | Yêu cầu bổ sung  | Card (Icon + Label) | Nền cam nhạt, icon chấm than cam. Số lượng được hệ thống tự count. (Xem CMR-11)                                            |
| 6 | Từ chối           | Card (Icon + Label) | Nền đỏ nhạt, icon "X" đỏ. Số lượng được hệ thống tự count. (Xem CMR-11)                                                 |

**Khung Tìm kiếm & Lọc:**

| # | Tên trường | Kiểu trường       | Giá trị mặc định              | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| - | ------------- | -------------------- | ---------------------------------- | ------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Ô tìm kiếm | Textbox (Search)     | "Tìm kiếm theo mã báo cáo..." | x            | —         | **Quy tắc hiển thị:** Icon kính lúp nằm bên trái trong ô. Tìm kiếm gần đúng (like) theo mã báo cáo — tìm kiếm chứa từ khóa, không yêu cầu nhập chính xác toàn bộ mã. Khi xóa hết từ khóa, danh sách trở về trạng thái mặc định. (Xem CMR-01)`<br><br>`**Quy tắc hành động:** Nhập từ khóa → Kết quả hiển thị tự động sau **3 giây debounce**. Người dùng nhập từ khóa → Kết quả hiển thị ngay, không cần nhấn Enter hay nhấn nút nào. Nếu không có kết quả trùng khớp: Hiển thị màn *"Không tìm thấy kết quả."* (Xem CMR-14) |
| 2 | Nút "Lọc"   | Button (Icon Filter) | —                                 | —           | —         | **Quy tắc hiển thị:** Nằm bên phải ô tìm kiếm, viền bo tròn, icon bộ lọc.`<br><br>`**Quy tắc hành động:** (Xem CMR-02)`<br>`- Tap icon filter → Mở modal/panel bộ lọc.`<br>`- Tap 'Áp dụng' / 'Tìm' → Đóng bộ lọc, tải lại danh sách với tiêu chí đã chọn.`<br>`- Tap 'Nhập lại' / 'Đặt lại' → Reset tất cả trường về giá trị mặc định.`<br>`- Tap vùng ngoài hoặc nút 'X' → Đóng bộ lọc, không thay đổi kết quả hiện tại.                                                                                                                         |

**Modal Bộ lọc tìm kiếm (Bottom Sheet):**

> Bộ lọc hiển thị dưới dạng Bottom Sheet. Người dùng chỉnh sửa các tiêu chí trong sheet, sau đó tap "Áp dụng" để áp dụng. Bottom Sheet có nút "X" ở góc phải trên cùng để đóng.

| # | Tên trường     | Kiểu trường              | Giá trị mặc định        | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| - | ----------------- | --------------------------- | ---------------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Loại báo cáo   | Dropdown (Single-selection) | "Tất cả loại báo cáo"   | x            | —         | **Quy tắc hiển thị:** (Xem CMR-03)`<br>`- Danh sách loại báo cáo lấy từ danh mục hệ thống.`<br>`- Giá trị mặc định: "Tất cả loại báo cáo".`<br><br>`**Quy tắc hành động:**`<br>`- Người dùng tap → Mở danh sách lựa chọn → Tap item → Tự động đóng và hiển thị giá trị đã chọn.`<br>`- Người dùng có thể nhập text để tìm kiếm/filter trong dropdown (tìm kiếm gần đúng).`<br>`- Option đã chọn được highlight/bold khi mở dropdown list.`<br>`- Nếu tên option vượt quá giới hạn ký tự → Tự động cắt ngắn và hiển thị "..." ở cuối.     |
| 2 | Trạng thái      | Dropdown (Single-selection) | "Tất cả trạng thái"      | x            | —         | **Quy tắc hiển thị:** (Xem CMR-03)`<br>`- Danh sách trạng thái lấy từ danh mục hệ thống.`<br>`- Giá trị mặc định: "Tất cả trạng thái".`<br><br>`**Quy tắc hành động:**`<br>`- Người dùng tap → Mở danh sách lựa chọn → Tap item → Tự động đóng và hiển thị giá trị đã chọn.`<br>`- Người dùng có thể nhập text để tìm kiếm/filter trong dropdown (tìm kiếm gần đúng).`<br>`- Option đã chọn được highlight/bold khi mở dropdown list.`<br>`- Nếu tên option vượt quá giới hạn ký tự → Tự động cắt ngắn và hiển thị "..." ở cuối.           |
| 3 | Tỉnh/Thành phố | Dropdown (Single-selection) | "Tất cả tỉnh thành phố" | x            | —         | **Quy tắc hiển thị:** (Xem CMR-03)`<br>`- Danh sách tỉnh/thành phố lấy từ danh mục hệ thống.`<br>`- Giá trị mặc định: "Tất cả tỉnh thành phố".`<br><br>`**Quy tắc hành động:**`<br>`- Người dùng tap → Mở danh sách lựa chọn → Tap item → Tự động đóng và hiển thị giá trị đã chọn.`<br>`- Người dùng có thể nhập text để tìm kiếm/filter trong dropdown (tìm kiếm gần đúng).`<br>`- Option đã chọn được highlight/bold khi mở dropdown list.`<br>`- Nếu tên option vượt quá giới hạn ký tự → Tự động cắt ngắn và hiển thị "..." ở cuối. |
| 4 | Nút "X" đóng   | Button (Icon)               | —                           | —           | —         | **Quy tắc hiển thị:** Icon "X" nằm ở góc trên phải của Bottom Sheet. Màu xám đậm, viền bo tròn nếu có nền.`<br><br>`**Quy tắc hành động:** Tap vùng ngoài hoặc tap nút "X" → Đóng Bottom Sheet, không thay đổi kết quả hiện tại. (Xem CMR-02)                                                                                                                                                                                                                                                                                                                                                               |
| 5 | Nút "Nhập lại" | Button (Secondary)          | —                           | —           | —         | **Quy tắc hiển thị:** Nút viền outline màu đỏ, text màu đỏ. Không đóng Bottom Sheet.`<br><br>`**Quy tắc hành động:** (Xem CMR-02)`<br>`- Tap → Reset toàn bộ tiêu chí lọc về giá trị mặc định.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 6 | Nút "Áp dụng"  | Button (Primary)            | —                           | —           | —         | **Quy tắc hiển thị:** Nút nền đỏ filled, text trắng.`<br><br>`**Quy tắc hành động:** (Xem CMR-02)`<br>`- Tap → Áp dụng toàn bộ tiêu chí lọc hiện tại.`<br>`- Đóng Bottom Sheet.`<br>`- Gọi API với tham số bộ lọc và tải lại danh sách báo cáo.`<br>`- Nếu không có kết quả phù hợp → hiển thị "Không tìm thấy kết quả." (Xem CMR-14)                                                                                                                                                                                                                                                 |

**Khung Danh sách báo cáo (Card List):**

> Mỗi card đại diện cho một báo cáo. Danh sách sắp xếp mặc định theo **ngày tạo** giảm dần (mới nhất lên đầu).

**Debounce navigation & Khôi phục trạng thái:** (Xem CMR-18)

- **Debounce navigation:** Khi người dùng tap nhanh liên tục (double tap) vào các button navigation (Quick Access cards, Footer tabs, Sidebar items), hệ thống có cơ chế debounce.
- **Force close** (tắt app không xóa dữ liệu): Khi người dùng mở lại app sau khi force close, hệ thống quay về **Trang chủ** và **giữ nguyên session đăng nhập**, không yêu cầu đăng nhập lại.
- **Xóa app** (uninstall): Khi người dùng xóa app và cài đặt lại, hệ thống **yêu cầu đăng nhập lại từ đầu** (không restore session).

**Đa ngôn ngữ (CMR-17):** Hỗ trợ 5 ngôn ngữ (VI, EN, ZH, JA, KO). Text cứng của ứng dụng (header, tên field/label, tên tab, tên nút, placeholder, thông báo lỗi, empty state message) thay đổi theo ngôn ngữ đã chọn. Nội dung dữ liệu từ API (tên báo cáo, trạng thái, ghi chú) hiển thị nguyên bản, không thay đổi theo ngôn ngữ.

| # | Tên trường           | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                     |
| - | ----------------------- | -------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 | Mã báo cáo           | Label (Bold)   | —                    | —           | —         | **Quy tắc hiển thị:** Màu đỏ đậm (ví dụ: "BC-2026-001"). Hiển thị tối đa 1 dòng, quá dài sẽ truncate với "..." ở cuối.                                                                                    |
| 2 | Trạng thái            | Badge          | —                    | —           | —         | **Quy tắc hiển thị:** (Xem CMR-05)`<br><br>`Màu sắc dựa theo UI design:`<br>`- `<br>`**Quy tắc hành động:** Badge trạng thái luôn read-only, không cho phép tap.                                    |
| 3 | Dự án                 | Label          | —                    | —           | —         | **Quy tắc hiển thị:** Tiền tố "Dự án: " + [Tên dự án]. Wrap text nếu dài quá, không truncate.                                                                                                                    |
| 4 | Nhà đầu tư          | Label          | —                    | —           | —         | **Quy tắc hiển thị:** Tiền tố "Nhà đầu tư: " + [Tên NĐT]. Wrap text nếu dài quá, không truncate.                                                                                                                |
| 5 | Metadata                | Label          | —                    | —           | —         | **Quy tắc hiển thị:** "Kỳ: [Giá trị] • Nộp: [DD/MM/YYYY] • [Tỉnh/Thành]". (Xem CMR-12)                                                                                                                              |
| 6 | Icon Điều hướng (>) | Icon           | —                    | —           | —         | **Quy tắc hiển thị:** Icon mũi tên ">" màu xám, nằm ở góc phải Card.`<br><br>`**Quy tắc hành động:** Tap vào bất kỳ đâu trên Card hoặc icon này → Chuyển sang màn hình Chi tiết báo cáo. |

---

#### 2.2 Giao diện Chi tiết báo cáo

**Mô tả giao diện:**

**Lưu ý:** Các trường thông tin hiển thị tại màn hình chi tiết báo cáo **tùy thuộc vào loại báo cáo được mở** — một số trường có thể ẩn hoặc hiển thị khác nhau giữa các loại báo cáo (Định kỳ, Đột xuất...).

**Quy tắc hiển thị chung:** Tất cả các field label trong màn hình chi tiết đều **wrap text nếu dài quá, không truncate**.

**Quy tắc đóng/mở section:** Các section 2.2.3 → 2.2.9 có thể **đóng/mở (collapsible)**. Mặc định khi mở màn hình chi tiết: **tất cả section ở trạng thái mở**. Đóng/mở một section **không ảnh hưởng** đến trạng thái đóng/mở của các section khác.

**Khung Header:**

| # | Tên trường       | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                               |
| - | ------------------- | -------------- | --------------------- | ------------ | ---------- | ---------------------------------------------------------------------------------------------- |
| 1 | Nút Quay lại (←) | Button (Icon)  | —                    | —           | —         | **Quy tắc hành động:** Tap → Quay về màn hình Danh sách báo cáo. (Xem CMR-06) |
| 2 | Tiêu đề Header   | Label          | "Chi tiết báo cáo" | —           | —         | **Quy tắc hiển thị:** Màu trắng trên nền đỏ đậm, căn giữa.                  |

**2.2.1 Banner chính (Nền đỏ):**

| # | Tên trường        | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                |
| - | -------------------- | -------------- | --------------------- | ------------ | ---------- | --------------------------------------------------------------------------------------------------------------- |
| 1 | Mã báo cáo        | Label (Bold)   | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị mã báo cáo (Size lớn). Wrap text nếu dài, không truncate.      |
| 2 | Trạng thái         | Badge          | —                    | —           | —         | **Quy tắc hiển thị:** Badge trạng thái tương ứng. Màu sắc dựa theo UI design. (Xem CMR-05)     |
| 3 | Mô tả trạng thái | Label          | —                    | —           | —         | **Quy tắc hiển thị:** Ví dụ: "Đã gửi tổng hợp báo cáo". Wrap text nếu dài, không truncate. |

**2.2.2 Khối hành động nhanh:**

| # | Tên trường              | Kiểu trường   | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                       |
| - | -------------------------- | ---------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 | Nút "Lịch sử báo cáo" | Button (Primary) | —                    | —           | —         | **Quy tắc hiển thị:** Nền xanh dương, icon đồng hồ.`<br><br>`**Quy tắc hành động:** Tap → Mở Modal "Lịch sử báo cáo". |

**2.2.3 Section 1 — Thông tin dự án:**

| # | Tên trường | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                    |
| - | ------------- | ----------------- | --------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Tên dự án  | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị tên dự án. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-". |

**2.2.4 Section 2 — Thông tin chung:**

| # | Tên trường        | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                 |
| - | -------------------- | ----------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 | Thời gian báo cáo | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị thời gian báo cáo. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".      |
| 2 | Cơ quan tiếp nhận | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị tên cơ quan tiếp nhận. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-". |

**2.2.5 Section 3 — Thông tin nhà đầu tư:**

| # | Tên trường       | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                         |
| - | ------------------- | ----------------- | --------------------- | ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Mã số dự án     | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị mã số dự án. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".                   |
| 2 | Ngày cấp          | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị ngày cấp. Định dạng: DD/MM/YYYY (Xem CMR-12).`<br>`- Nếu null → hiển thị "-".                       |
| 3 | Ngày điều chỉnh | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị ngày điều chỉnh. Định dạng: DD/MM/YYYY (Xem CMR-12).`<br>`- Nếu null → hiển thị "-".              |
| 4 | Tên công ty       | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị tên công ty/tên nhà đầu tư. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-". |

**2.2.6 Section 4 — Tình hình thực hiện:**

| # | Tên trường   | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                |
| - | --------------- | ----------------- | --------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Bảng số liệu | Table (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:**`<br>`- Cột: Loại (Máy móc thiết bị, Nguyên vật liệu, Lợi nhuận, Khác) + Vốn chuyển ra + Tiền chuyển về + Dự báo.`<br>`- Mỗi dòng gồm: Loại + 3 cột số liệu.`<br>`- Format số theo CMR-11.`<br>`- Nếu null → hiển thị "-". |

**2.2.7 Section 5 — Tiến độ dự án:**

| # | Tên trường | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                              |
| - | ------------- | ----------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Trạng thái  | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị trạng thái (Đúng tiến độ/Chậm). Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-". |
| 2 | Lý do        | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị lý do (nếu có). Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".                      |

**2.2.8 Section 6 — Tình hình hoạt động:**

| # | Tên trường     | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                 |
| - | ----------------- | ----------------- | --------------------- | ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Nội dung mô tả | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị nội dung chi tiết tình hình hoạt động của dự án. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-". |

**2.2.9 Section 7 — Ký xác nhận:**

| # | Tên trường | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                        |
| - | ------------- | ----------------- | --------------------- | ------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Nơi ký      | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị nơi ký. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".         |
| 2 | Ngày ký     | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị ngày ký. Định dạng: DD/MM/YYYY (Xem CMR-12).`<br>`- Nếu null → hiển thị "-".       |
| 3 | Người ký   | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị tên người ký. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-". |

**Modal Lịch sử báo cáo:**

> Hiển thị lịch sử xử lý báo cáo. Sắp xếp theo **thời gian giảm dần** (bước mới nhất ở trên, bước cũ nhất ở dưới).

| # | Tên trường        | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                             |
| - | -------------------- | ----------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 | Bước xử lý       | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị tên bước xử lý báo cáo (refer phân hệ Báo cáo trên Web). Wrap text nếu dài, không truncate.`<br>` |
| 2 | Tên người xử lý | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị tên đầy đủ của người thực hiện hành động. Wrap text nếu dài, không truncate.`<br>`               |
| 3 | Thời gian xử lý   | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị thời gian thực hiện bước xử lý. Định dạng: HH:mm DD/MM/YYYY (Xem CMR-12).`<br>`                        |

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Xử lý Tải danh sách báo cáo

1. Người dùng truy cập màn hình Báo cáo đã nộp.
2. Hệ thống gọi API lấy danh sách báo cáo của người dùng hiện tại.
3. Danh sách sắp xếp theo **ngày tạo** giảm dần (Mới nhất lên đầu).
4. **Lazy load:** Tải 20 bản ghi/lần. Khi cuộn đến cuối, tự động tải trang tiếp theo. (Xem CMR-04)

**Pull to refresh:** (Xem CMR-13)

- Kéo xuống từ đầu danh sách → Trigger refresh dữ liệu từ đầu.
- Hiển thị spinner ở đầu danh sách trong khi đang refresh.
- Sau khi refresh thành công: Cập nhật danh sách, ẩn spinner.

**Xử lý lỗi:** (Xem CMR-07, 16)

| Tình huống lỗi            | Thông báo hiển thị                                                                             | Hành vi hệ thống                                                                                                                                                                                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lỗi mạng / Mất kết nối  | *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* + nút **"Thử lại"** | Giữ nguyên màn hình, hiển thị nút Thử lại.                                                                                                                                                               |
| Lỗi API (HTTP 500)          | *"Hệ thống đang bận. Vui lòng thử lại sau."*                                              | Giữ nguyên màn hình, chỉ hiển thị thông báo.                                                                                                                                                             |
| Timeout (>10 giây)          | *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + nút **"Thử lại"**       | Giữ nguyên màn hình, hiển thị nút Thử lại. (Xem CMR-16)                                                                                                                                                  |
| Session hết hạn (HTTP 401) | Toast:*"Phiên đăng nhập hết hạn."*                                                         | Hệ thống tự động sử dụng refresh token để cấp lại access token mới. Nếu refresh token hết hạn hoặc không hợp lệ (quá**15 ngày**) → Redirect về màn hình đăng nhập. (Xem CMR-07) |

**Xử lý lỗi trống (Empty state):** (Xem CMR-14)

- Nếu không có báo cáo: Hiển thị Empty State (Thông báo *"Không có dữ liệu."*).
- Nếu search/filter không có kết quả: Hiển thị *"Không tìm thấy kết quả."*.

#### 3.2 Tiêu chí chấp nhận (Acceptance Criteria)

- **AC1:** Thanh Stat Banner hiển thị đúng 6 chỉ số trạng thái với số lượng được hệ thống tự count và format theo CMR-11.
- **AC2:** Card báo cáo hiển thị đầy đủ các thông tin: Mã báo cáo (màu đỏ đậm), Trạng thái badge, Dự án, Nhà đầu tư, Metadata (Kỳ • Nộp • Tỉnh/Thành).
- **AC3:** Toàn bộ card báo cáo có thể tap để vào màn hình chi tiết.
- **AC4:** Màn hình chi tiết hiển thị đầy đủ 7 section thông tin theo thiết kế.
- **AC5:** Modal Lịch sử báo cáo hiển thị lịch sử xử lý báo cáo bao gồm bước xử lý, tên người xử lý, thời gian xử lý — sắp xếp theo thời gian giảm dần.

---

## 4. Lịch sử cập nhật

| Ngày      | Phiên bản  | Mục cập nhật                                       | Before                                                                                           | After                                                                                                                                                                                | Ghi chú                                          |
| ---------- | ------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| 2026-05-08 | v2 → v2.1   | §3.1 — Xử lý Tải danh sách báo cáo (bước 2) | "Hệ thống mặc định lọc theo Năm hiện tại và gọi API lấy danh sách."                 | "Hệ thống gọi API lấy danh sách báo cáo của người dùng hiện tại."                                                                                                       | Không có filter năm trong UC54                 |
| 2026-05-08 | v2 → v2.1   | §3.2 — AC5 (Nút Download)                          | "AC5: Nút Download tải được tệp báo cáo đính kèm đúng theo CMR-08."                 | (Đã xóa)                                                                                                                                                                          | Không có nút Download trong UC54               |
| 2026-05-08 | v2 → v2.1   | §2.1 — Quy tắc Search/Filter State Persistence     | "Khi người dùng chuyển sang tab khác và quay lại → Reset search/filter về mặc định." | "Khi người dùng chuyển sang mục khác trên Sidebar (Left Sidebar) và quay lại → Reset search/filter về mặc định."                                                       | UC54 không có tab; truy cập từ Sidebar        |
| 2026-05-08 | v2 → v2.1   | §1 — Quy tắc đồng bộ dữ liệu                  | Chỉ mô tả happy-path real-time sync                                                           | Thêm 2 rule fallback: mất kết nối → giữ dữ liệu cũ + thông báo lỗi mạng (CMR-07); khôi phục → thông báo + pull-to-refresh (CMR-13)                                 | Bổ sung xử lý offline/reconnect                |
| 2026-05-08 | v2 → v2.1   | §2.1 — Stat Banner: Quy tắc format số             | 3 bullet inline mô tả K/M format (1,234; 2.3M; 1.5K…)                                         | Thay bằng "Quy tắc format số: Xem CMR-11"                                                                                                                                         | Delegate chi tiết format cho CMR-11              |
| 2026-05-08 | v2 → v2.1   | §2.1 — Stat Banner: Hành vi tap                    | (Không có)                                                                                     | "Các thẻ chỉ số trạng thái là read-only, không thể tap (unclickable). Thẻ chỉ hiển thị thông tin tổng quan, không trigger filter danh sách."                        | Làm rõ Stat Banner unclickable                  |
| 2026-05-08 | v2 → v2.1   | §2.2 — Quy tắc đóng/mở section chi tiết        | (Không có)                                                                                     | "Các section 2.2.3 → 2.2.9 có thể đóng/mở (collapsible). Mặc định: tất cả section ở trạng thái mở. Đóng/mở section này không ảnh hưởng section khác."       | Thêm rule collapsible + trạng thái mặc định |
| 2026-05-08 | v2 → v2.1   | §2.1 — Card List: Debounce tap                      | (Không có)                                                                                     | "Debounce tap: tap nhanh nhiều lần trên cùng một card → chỉ trigger 1 lần navigation (debounce 500ms)."                                                                      | Tránh mở nhiều màn hình trùng lặp          |
| 2026-05-07 | v2.1 → v2.2 | §2.1 — Debounce & Khôi phục trạng thái          | Chỉ có debounce tap 500ms                                                                      | Cập nhật debounce navigation + force close giữ session + uninstall yêu cầu đăng nhập lại (CMR-18)                                                                           | Mở rộng rule                                    |
| 2026-05-07 | v2.1 → v2.2 | §2.2.1 — Xóa field "Ngày nộp"                    | Field #4 "Ngày nộp" (Icon lịch + DD/MM/YYYY HH:mm)                                            | (Đã xóa)                                                                                                                                                                          | Bỏ field theo yêu cầu                          |
| 2026-05-07 | v2.1 → v2.2 | Modal Lịch sử báo cáo                             | Timeline tăng dần + bảng 5 bước cố định                                                  | Mô tả gọn: bước xử lý, tên người xử lý, thời gian xử lý. Sắp xếp**giảm dần** (mới nhất trên). Xóa bảng ví dụ cứng                                   | Đơn giản hóa + sửa thứ tự sort             |
| 2026-05-08 | v2 → v2.1   | §1 — Phân quyền: Cá nhân vs Tổ chức           | "Cá nhân/Tổ chức đã đăng nhập chỉ xem được báo cáo của chính mình nộp."       | Giữ nguyên + thêm: "Giao diện, dữ liệu hiển thị, và các tùy chọn filter của Cá nhân và Tổ chức là giống nhau, không có khác biệt về hành vi hay UI."       | Làm rõ không có khác biệt CN/TC             |
| 2026-05-07 | v2.1 → v2.2 | Bảng Xử lý lỗi — Thêm HTTP 401                  | (Không có)                                                                                     | Session hết hạn (HTTP 401): tự động sử dụng refresh token; nếu refresh token hết hạn (>15 ngày) → redirect đăng nhập + toast "Phiên đăng nhập hết hạn" (CMR-07) | Bổ sung xử lý session                          |
| 2026-05-12 | v2.2 → v2.3 | Bổ sung CMR-17 (Đa ngôn ngữ) | (Không có) | Hỗ trợ 5 ngôn ngữ (VI, EN, ZH, JA, KO) cho text cứng | Đồng bộ Cross-UC Inconsistency Report v2 |
