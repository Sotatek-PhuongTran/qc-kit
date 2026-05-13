# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG
**Tiêu đề:** UC69 — Tra cứu văn bản pháp luật trên Mobile  
**Ngày tạo:** 06/05/2026  
**Phiên bản:** v1.1

| Thuộc tính | Giá trị |
|---|---|
| BA phụ trách | huyen.dinh2 |
| Phân hệ | Ứng dụng Di động (Mobile App) |
| Loại chức năng | Tra cứu thông tin pháp lý |
| Đối tượng thực hiện | Cá nhân / Tổ chức |
| Giao diện | Màn hình Mobile (Portrait) |
| Ngày tạo | 06/05/2026 |
| Phiên bản | v1.1 |

---

## UC69 — Tra cứu văn bản pháp luật trên Mobile

### 1. Mô tả chức năng

- **Tên chức năng:** Tra cứu văn bản pháp luật trên Mobile
- **Mô tả:** Chức năng cho phép cá nhân, tổ chức tra cứu, xem danh sách và xem chi tiết các văn bản pháp luật liên quan đến đầu tư. Người dùng có thể tìm kiếm theo tên văn bản kết hợp bộ lọc phạm vi (số hiệu, trích yếu hoặc toàn văn); sử dụng bộ lọc nâng cao (cơ quan ban hành, khoảng ngày ban hành, loại văn bản, trạng thái hiệu lực, lĩnh vực, đơn vị soạn thảo); xem nội dung toàn văn, tải văn bản hoặc xem file PDF đính kèm.
- **Phân quyền:** Cá nhân/Tổ chức (đã đăng nhập). Hai nhóm đối tượng có cùng hành vi khi sử dụng UC69 — không có sự phân biệt.
- **Phạm vi ngoài UC (Exclusions):** UC69 KHÔNG bao gồm: chỉnh sửa văn bản, chia sẻ văn bản ra bên ngoài (mạng xã hội), tính năng lưu lại (bookmark) văn bản yêu thích.
- **Truy cập chức năng:** Trang chủ → Quick Access "Văn bản pháp luật" (Tham chiếu UC1 — Trang chủ Dashboard) hoặc Sidebar → "Văn bản pháp luật" (Tham chiếu UC — Sidebar Navigation).
- **Điều kiện tiên quyết (Preconditions):**
  - Người dùng đã đăng nhập vào hệ thống (Cá nhân hoặc Tổ chức). Nếu chưa đăng nhập, màn hình này không hiển thị (không thể truy cập).
  - Thiết bị có kết nối mạng ổn định.
- **Điều kiện kết thúc (Postconditions):** Hệ thống hiển thị kết quả danh sách văn bản theo điều kiện tìm kiếm hoặc hiển thị toàn bộ nội dung chi tiết của văn bản được chọn.
- **Chức năng đáp ứng usecase số:** UC69 (Phụ lục XIV)

---

### 2. Mô tả giao diện

#### 2.1 Màn hình Danh sách Văn bản pháp luật

**Mô tả giao diện:**
Header "Văn bản pháp luật" (màu đỏ đậm, có nút Quay lại ←). Bên dưới là ô tìm kiếm, nút Bộ lọc, và 2 tùy chọn radio (Số hiệu, Trích yếu / Toàn văn). Cuối cùng là danh sách kết quả dạng List Card dọc.

**Khung Header & Tìm kiếm:**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Nút Quay lại (←) | Button (Icon) | — | — | — | **Quy tắc hành động:**<br>- Tap → Quay về màn hình trước. (Xem CMR-06) |
| 2 | Tiêu đề Header | Label | "Văn bản pháp luật" | — | — | **Quy tắc hiển thị:**<br>- Nằm giữa header, màu trắng trên nền đỏ đậm. |
| 3 | Ô tìm kiếm | Textbox (Search) | "Tìm kiếm văn bản..." | x | — | **Quy tắc hiển thị:**<br>- Nền xám nhạt, viền bo tròn. Placeholder theo design: "Tìm kiếm văn bản...".<br>- Tối đa **500 ký tự** (Xem CMR-01).<br><br>**Quy tắc hành động:**<br>- Nhập từ khóa → Hệ thống tìm kiếm theo tên văn bản, kết hợp tùy chọn phạm vi bên dưới (Số hiệu, trích yếu hoặc toàn văn). Kết quả tự động cập nhật sau debounce 3 giây (Tham khảo CMR-01).<br>- Xử lý whitespace: auto-trim khoảng trắng đầu/cuối trước khi tìm kiếm. Nếu sau trim rỗng → coi như input rỗng (Xem CMR-01).<br>- Xóa hết từ khóa → Hiển thị danh sách mặc định.<br>- State Persistence: Sau khi vào chi tiết và quay lại, danh sách giữ nguyên trạng thái tìm kiếm/lọc trước đó (CMR-01). |
| 4 | Nút "Lọc" | Button (Icon) | — | — | — | **Quy tắc hiển thị:**<br>- Icon filter (3 dấu gạch ngang), nằm bên phải ô tìm kiếm, khung viền trắng.<br><br>**Quy tắc hành động:**<br>- Tap → Mở Modal popup "Bộ lọc tìm kiếm". |
| 5 | Phạm vi tìm kiếm | Radio Group | "Số hiệu, Trích yếu" | x | — | **Quy tắc hiển thị:**<br>- Hai tùy chọn xếp ngang: "Số hiệu, Trích yếu" (mặc định) và "Toàn văn".<br><br>**Quy tắc hành động:**<br>- Tap để chuyển đổi phạm vi tìm kiếm kết hợp với ô tìm kiếm.<br>- Khi chuyển radio: danh sách reset về trang đầu, keyword tìm kiếm giữ nguyên, bộ lọc giữ nguyên. |

**Khung Danh sách kết quả:**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 6 | Danh sách Card văn bản | List Card (Vertical) | — | — | — | **Quy tắc hiển thị:**<br>- Danh sách cuộn dọc. Hỗ trợ lazy load / infinite scroll (tải 20 bản ghi/lần).<br>- Mặc định sắp xếp theo ngày ban hành mới nhất.<br>- **Trạng thái Empty (Không có kết quả):** Nếu không tìm thấy, hiển thị *"Không tìm thấy kết quả."* (Tham chiếu CMR-14).<br><br>**Quy tắc hành động:**<br>- Hỗ trợ Pull to Refresh (CMR-13) để tải lại danh sách. |
| 7 | Tag Loại văn bản | Chip | — | — | — | **Quy tắc hiển thị:**<br>- Nằm góc trái trên của thẻ. Lấy từ API. |
| 8 | Tag Trạng thái | Chip | — | — | — | **Quy tắc hiển thị:**<br>- Nằm góc phải trên của thẻ. Lấy từ API. Các trạng thái: [Đang hiệu lực, Chưa hiệu lực, Không xác định hiệu lực, Hết hiệu lực, Hết hiệu lực một phần]. Tất cả trạng thái đều cho phép xem card, tải văn bản và xem PDF bình thường.<br>- Badge trạng thái luôn read-only, không cho phép tap. (Xem CMR-05) |
| 9 | Tên văn bản | Label (H2) | — | — | — | **Quy tắc hiển thị:**<br>- Nằm dưới các tag. Font đậm, màu đen, tối đa 2 dòng, quá dài có `...`. Nếu null hiển thị "-". |
| 10 | Ngày tháng | Label | — | — | — | **Quy tắc hiển thị:**<br>- 2 dòng text xám:<br>&emsp;• Dòng 1: "Ban hành: [DD/MM/YYYY]". Nếu null hiển thị "Ban hành: -".<br>&emsp;• Dòng 2: "Hiệu lực: [DD/MM/YYYY]". Nếu null hiển thị "Hiệu lực: -". |
| 11 | Cơ quan ban hành | Label | — | — | — | **Quy tắc hiển thị:**<br>- Nằm góc trái dưới cùng của thẻ. Màu xám đậm (Ví dụ: "Thủ tướng Chính phủ", "Chính phủ"). Nếu null hiển thị "-". |
| 12 | Nút "Xem chi tiết →" | Button (Outline) | — | — | — | **Quy tắc hiển thị:**<br>- Nằm góc phải dưới cùng, đối diện cơ quan ban hành.<br><br>**Quy tắc hành động:**<br>- Tap vào nút (hoặc tap toàn bộ Card) → Chuyển đến màn hình Chi tiết văn bản.<br>- **Debounce Navigation (CMR-18):** Khi người dùng tap nhanh liên tục (double tap) vào card/nút, hệ thống chỉ nhận action đầu tiên và bỏ qua các tap tiếp theo cho đến khi điều hướng hoàn tất (tránh navigate 2 lần). |
| 13 | Nội dung toàn văn (Chỉ khi chọn Radio "Toàn văn") | Box Text | — | — | — | **Quy tắc hiển thị:**<br>- Chỉ hiển thị nếu Radio "Toàn văn" đang được chọn.<br>- Nằm giữa phần Header của thẻ và Footer của thẻ, có khối nền xám nhạt.<br>- Nếu có dữ liệu: hỗ trợ scroll để xem toàn bộ nội dung văn bản.<br>- Nếu không có dữ liệu: hiển thị *"Không có dữ liệu."* theo CMR-14. |

---

#### 2.2 Bottom Sheet Bộ lọc tìm kiếm

**Mô tả giao diện:**
Hiển thị dạng Bottom Sheet. Tap ra ngoài hoặc tap nút Đóng đều đóng Bottom Sheet lại mà không áp dụng bộ lọc. Bộ lọc gồm 1 trường Textbox (Cơ quan ban hành) và 4 trường Dropdown single selection (options lấy từ API, trừ Trạng thái là list tĩnh). Mặc định các Dropdown hiển thị "Tất cả [tên trường]"; Textbox để trống.

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Nút Đóng | Button (Icon) | — | — | — | **Quy tắc hành động:**<br>- Tap (X) hoặc tap ngoài vùng Bottom Sheet → Đóng, không áp dụng bộ lọc.<br>- Nhấn nút Back vật lý (Android) khi Bottom Sheet đang mở → Đóng Bottom Sheet (không thoát màn hình danh sách). |
| 2 | Cơ quan ban hành | Textbox (Search) | — | x | — | **Quy tắc hiển thị:**<br>- Placeholder: "Nhập cơ quan ban hành".<br><br>**Quy tắc hành động:**<br>- Người dùng nhập text, tap "Áp dụng" → Hệ thống tìm kiếm gần đúng theo giá trị đã nhập (follow behavior thanh search trong CMR-01: tìm kiếm gần đúng, chứa từ khóa). |
| 3 | Khoảng ngày ban hành | Date Range Picker | — | x | — | **Quy tắc hiển thị:**<br>- Box có icon lịch. Placeholder: "Ngày bắt đầu - Ngày kết thúc".<br><br>**Quy tắc hành động:**<br>- Tap mở Date Picker chọn khoảng thời gian (CMR-15). |
| 4 | Loại văn bản | Dropdown (Single) | "Tất cả văn bản" | x | — | **Quy tắc hiển thị:**<br>- List options trả về từ API. Mặc định "Tất cả văn bản". |
| 5 | Lĩnh vực | Dropdown (Single) | "Tất cả lĩnh vực" | x | — | **Quy tắc hiển thị:**<br>- List options trả về từ API. Mặc định "Tất cả lĩnh vực". |
| 6 | Đơn vị soạn thảo | Dropdown (Single) | "Tất cả đơn vị soạn thảo" | x | — | **Quy tắc hiển thị:**<br>- List options trả về từ API. Mặc định "Tất cả đơn vị soạn thảo". |
| 7 | Trạng thái | Dropdown (Single) | "Tất cả trạng thái" | x | — | **Quy tắc hiển thị:**<br>- List tĩnh: Đang hiệu lực, Chưa hiệu lực, Không xác định hiệu lực, Hết hiệu lực, Hết hiệu lực một phần. Mặc định "Tất cả trạng thái". |
| 8 | Nút "Nhập lại" | Button (Outline) | — | — | — | **Quy tắc hiển thị:**<br>- Nằm bên trái, text đỏ, có icon refresh.<br><br>**Quy tắc hành động:**<br>- Tap → Reset tất cả field về giá trị mặc định ("Tất cả [tên trường]", trống), giữ nguyên Bottom Sheet. |
| 9 | Nút "Áp dụng" | Button (Primary) | — | — | — | **Quy tắc hiển thị:**<br>- Nằm bên phải, nền đỏ đậm.<br><br>**Quy tắc hành động:**<br>- Tap → Đóng Bottom Sheet, tải lại danh sách kết quả với điều kiện lọc đã chọn. |

---

#### 2.3 Màn hình Chi tiết văn bản

**Mô tả giao diện:**
Header "Chi tiết văn bản" (đỏ đậm). Thân màn hình chia làm 3 khối chính: Khối thông tin chi tiết (Card nền trắng viền nhạt), Khối Văn bản liên quan và Khối Nội dung toàn văn (ở cuối màn hình).

**Khung Header & Thông tin:**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Nút Quay lại & Tiêu đề | Button & Label | "Chi tiết văn bản" | — | — | **Quy tắc hiển thị:**<br>- Header đỏ đậm, chữ trắng. |
| 2 | Tên văn bản | Label (H1) | — | — | — | **Quy tắc hiển thị:**<br>- Nằm trên cùng của block chi tiết, font đậm, căn trái, tối đa 2 dòng, quá dài hiện xuống dòng. Nếu null hiển thị "-". |
| 3 | Danh sách thuộc tính chi tiết | List Attribute | — | — | — | **Quy tắc hiển thị:**<br>- Dạng Label bên trái (xám) và Value bên phải (đen, đậm nhẹ hoặc badge). Tất cả các trường: nếu dữ liệu null → hiển thị "-"; nếu text dài → tự động wrap xuống dòng. Gồm các dòng:<br>&emsp;• **Số ký hiệu:** Font đậm. Định dạng ký hiệu văn bản (VD: 20/2026/TT-BNNMT).<br>&emsp;• **Loại văn bản:** (VD: Thông tư).<br>&emsp;• **Ngày ban hành:** Định dạng DD/MM/YYYY.<br>&emsp;• **Ngày có hiệu lực:** Định dạng DD/MM/YYYY.<br>&emsp;• **Tình trạng hiệu lực:** Badge viền. Các trạng thái: Đang hiệu lực, Chưa hiệu lực, Không xác định hiệu lực, Hết hiệu lực, Hết hiệu lực một phần. Badge luôn read-only, không cho phép tap. (Xem CMR-05)<br>&emsp;• **Cơ quan ban hành:** Text.<br>&emsp;• **Người ký:** Text (VD: Nguyễn Văn A).<br>&emsp;• **Đơn vị soạn thảo:** Text.<br>&emsp;• **Lĩnh vực:** Text (VD: Quản lý tài chính doanh nghiệp).<br>&emsp;• **Hiệu lực không gian:** Text (VD: Toàn quốc). Giá trị lấy từ API (không phải list tĩnh). |
| 4 | Nút "Tải văn bản" | Button (Primary) | — | — | — | **Quy tắc hiển thị:**<br>- Nền đỏ đậm, chữ trắng.<br><br>**Quy tắc hành động (theo CMR-08):**<br>- Tap → Tải file đính kèm dạng DOC/DOCX xuống máy. Nếu không có file đính kèm, ẩn hoàn toàn nút này.<br>- Sau khi tải thành công → Hiển thị Toast *"Tải văn bản thành công."* |
| 5 | Nút "Xem PDF" | Button (Outline) | — | — | — | **Quy tắc hiển thị:**<br>- Nền trắng, viền xám, chữ đen.<br><br>**Quy tắc hành động (theo CMR-08):**<br>- Tap → Mở file PDF trực tiếp trên trình duyệt thiết bị. Nếu không có file PDF đính kèm, ẩn hoàn toàn nút này. |
| 6 | Mục lục văn bản | Accordion | — | — | — | **Quy tắc hiển thị:**<br>- Nằm phía trên nội dung toàn văn. Mặc định trạng thái Collapse (Đóng).<br>- Nếu văn bản không có mục lục → Ẩn toàn bộ section Mục lục (không hiển thị).<br><br>**Quy tắc hành động:**<br>- Tap tiêu đề → Expand (Mở rộng) danh sách mục lục.<br>- Tap vào 1 mục lục → Màn hình tự động scroll tới vị trí đoạn text tương ứng trong phần Nội dung toàn văn bên dưới, đồng thời Collapse mục lục lại. |

**Khung Nội dung toàn văn:**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 7 | Nội dung toàn văn | Scrollable Content Block | — | — | — | **Quy tắc hiển thị:**<br>- Nằm phía dưới "Văn bản liên quan" (ở cuối màn hình Chi tiết).<br>- Không giới hạn chiều cao cố định — nội dung scroll trong block này.<br>- Nếu văn bản không có nội dung toàn văn VÀ không có mục lục → Ẩn cả 2 section (Mục lục + Toàn văn), hiển thị thông báo *"Không có dữ liệu."* theo CMR-14 tại vị trí block này.<br><br>**Quy tắc hành động:**<br>- Tap vào mục lục → Tự động scroll tới đoạn toàn văn tương ứng trong block này. |

**Khung Văn bản liên quan:**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Tiêu đề khối | Label | "Văn bản liên quan" | — | — | **Quy tắc hiển thị:**<br>- Font đậm, nằm ở card bên dưới. |
| 2 | Item văn bản liên quan | List Item | — | — | — | **Quy tắc hiển thị:**<br>- Dòng 1: Số hiệu văn bản (màu xanh dương, có thể tap).<br>- Dòng 2: Mô tả văn bản (màu xám, tối đa 2 dòng).<br><br>**Quy tắc hành động:**<br>- Tap vào item → Chuyển đến màn hình Chi tiết của văn bản đó.<br>- Back navigation: Từ chi tiết văn bản liên quan nhấn Back → Quay về màn Chi tiết văn bản gốc (không quay về danh sách).<br>- Nếu danh sách trống, hiển thị thông báo *"Không có dữ liệu."* theo chuẩn CMR-14, KHÔNG ẩn khối này. |

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Luồng xem danh sách và tìm kiếm

1. Người dùng truy cập chức năng "Văn bản pháp luật" (yêu cầu đã đăng nhập).
2. Hệ thống gọi API lấy danh sách mới nhất, sắp xếp mặc định theo ngày ban hành mới nhất. Mặc định phạm vi tìm kiếm là "Số hiệu, Trích yếu".
3. Khi người dùng gõ từ khóa, hệ thống áp dụng debounce 3 giây (CMR-01): sau 3 giây không gõ thêm, kết quả trả về lọc theo tên văn bản, kết hợp tùy chọn phạm vi Số hiệu, Trích yếu hoặc Toàn văn.
4. Khi chuyển sang "Toàn văn", hệ thống hiển thị thêm thẻ nội dung toàn văn bên trong kết quả trả về. Danh sách reset về trang đầu, keyword tìm kiếm giữ nguyên, bộ lọc giữ nguyên. Nếu có toàn văn thì hiện cho scroll, nếu không có thì hiển thị thông báo không có dữ liệu theo CMR-14.
5. Cuộn xuống để xem thêm (lazy load 20 item mỗi lần).
6. Khi nhấn nút Lọc, Bottom Sheet mở lên. Bấm "Áp dụng" để áp dụng bộ lọc cùng với ô tìm kiếm. Tap ra ngoài hoặc tap Đóng để thoát không áp dụng. Nhấn nút Back vật lý (Android) khi Bottom Sheet đang mở → đóng Bottom Sheet (không thoát màn hình).
7. State Persistence (CMR-01): Sau khi vào chi tiết và quay lại, danh sách giữ nguyên trạng thái tìm kiếm/lọc/vị trí scroll trước đó.

#### 3.2 Luồng xem chi tiết và tải tài liệu

1. Tap vào 1 thẻ trong danh sách → Mở màn hình Chi tiết văn bản (debounce rapid tap: chỉ nhận action đầu tiên, tránh navigate 2 lần).
2. Hệ thống gọi API chi tiết dựa trên mã ID văn bản. Mọi trường thông tin nếu bị NULL sẽ tự động đổi sang ký tự "-".
3. Trong lúc chờ phản hồi, hệ thống hiển thị Skeleton loading.
4. **Partial API failure:** Nếu 1 trong nhiều API call thất bại (VD: API văn bản liên quan lỗi nhưng API thông tin chi tiết thành công) → Hệ thống xử lý độc lập từng block. Block lỗi hiển thị thông báo lỗi riêng (CMR-07), các block khác hiển thị bình thường.
5. Thông tin hiển thị đầy đủ, bao gồm:
   - Mục lục văn bản (mặc định thu gọn). Nếu không có mục lục → ẩn toàn bộ section Mục lục.
   - Nội dung toàn văn: scroll trong block, không giới hạn chiều cao. Nếu không có nội dung toàn văn và không có mục lục → hiển thị *"Không có dữ liệu."* (CMR-14).
   - Tap mục lục → auto scroll tới đoạn toàn văn tương ứng.
6. Người dùng chọn "Xem PDF" để xem tài liệu không cần tải, hoặc "Tải văn bản" để lưu bản gốc (Word/PDF) về máy. Nút sẽ tự động ẩn nếu không có file tương ứng. Sau khi tải thành công → hiển thị Toast *"Tải văn bản thành công."*

#### 3.3 Xử lý session

- **Session expire:** Xử lý session được quy định tại UC1 (Trang chủ Dashboard). Khi phiên đăng nhập hết hạn, hệ thống redirect về màn đăng nhập.
- **Force close (tắt app không xóa dữ liệu):** Khi người dùng mở lại app sau khi force close, hệ thống quay về Trang chủ và giữ nguyên session đăng nhập, không yêu cầu đăng nhập lại.
- **Xóa app (uninstall):** Khi người dùng xóa app và cài đặt lại, hệ thống yêu cầu đăng nhập lại từ đầu (không restore session).

#### 3.4 Xử lý lỗi (Tham chiếu CMR-07)

| Tình huống lỗi | Thông báo hiển thị | Hành vi hệ thống |
| --- | --- | --- |
| Lỗi kết nối mạng | *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* | Giữ nguyên màn hình, hiển thị nút **"Thử lại"**. |
| Lỗi 401 (Session hết hạn) | *"Phiên đăng nhập hết hạn."* (Toast) | Hệ thống tự động sử dụng refresh token để cấp lại access token mới. Nếu refresh token đã hết hạn hoặc không hợp lệ (quá 15 ngày) → chuyển về màn hình Đăng nhập. (Xem CMR-07) |
| Không tìm thấy kết quả | *"Không tìm thấy kết quả."* | Hiển thị empty state theo chuẩn CMR-14, ẩn danh sách kết quả. |
| Tài liệu đính kèm bị lỗi/mất | *"Nội dung không tồn tại hoặc đã bị xóa."* | Khi bấm Tải hoặc Xem PDF mà file trên server không còn, hiển thị Toast lỗi. |

#### 3.5 Tiêu chí chấp nhận (Acceptance Criteria)

- **AC1:** Tìm kiếm realtime theo Tên văn bản, kết hợp phạm vi Số hiệu/Trích yếu hoặc Toàn văn hoạt động đúng.
- **AC2:** Bottom Sheet bộ lọc (6 trường: Cơ quan ban hành dạng Textbox, còn lại Dropdown single select) kết hợp với ô tìm kiếm khi bấm "Áp dụng". Tap ngoài/Đóng/Back vật lý Android thì không áp dụng (đóng sheet). Nút "Nhập lại" reset về mặc định.
- **AC3:** Màn hình chi tiết hiển thị đúng format: ngày DD/MM/YYYY, text dài wrap xuống dòng, tất cả trường null hiển thị "-", badge đúng trạng thái.
- **AC4:** Nút "Tải văn bản" tải DOC/DOCX về máy và hiển thị Toast *"Tải văn bản thành công."*; Nút "Xem PDF" mở PDF trên trình duyệt thiết bị. Ẩn từng nút nếu không có file tương ứng.
- **AC5:** Khối "Văn bản liên quan" luôn hiển thị. Nếu rỗng → hiển thị *"Không có dữ liệu."* (CMR-14). Tap văn bản liên quan → mở chi tiết → Back → quay về chi tiết gốc.
- **AC6:** Nội dung toàn văn hỗ trợ scroll toàn bộ khi có data. Nếu không có data và không có mục lục → hiển thị *"Không có dữ liệu."* (CMR-14).
- **AC7:** Mục lục mặc định collapse. Tap 1 mục lục → scroll đến đoạn tương ứng trong toàn văn và tự động collapse mục lục lại. Nếu không có mục lục → ẩn toàn bộ section.
- **AC8:** Debounce tìm kiếm 3 giây hoạt động đúng: sau 3 giây không gõ thêm mới gọi API tìm kiếm (CMR-01).
- **AC9:** State Persistence: Sau khi vào chi tiết và quay lại danh sách, trạng thái tìm kiếm/lọc/vị trí scroll được giữ nguyên (CMR-01).
- **AC10:** Danh sách mặc định sắp xếp theo ngày ban hành mới nhất.
- **AC11:** Khi chuyển radio (Số hiệu, Trích yếu ↔ Toàn văn): danh sách reset về trang đầu, keyword giữ nguyên, bộ lọc giữ nguyên.
- **AC12:** Partial API failure: Nếu 1 API block thất bại, các block khác vẫn hiển thị bình thường, block lỗi hiển thị thông báo lỗi riêng.
- **AC13:** Rapid tap: Tap nhanh liên tiếp vào "Xem chi tiết" chỉ navigate 1 lần (CMR-18 — debounce action đầu tiên).

#### 3.6 Đa ngôn ngữ (→ Xem CMR-17)

Toàn bộ text cứng trên màn hình UC69 (header, placeholder ô tìm kiếm, label radio, tên trường bộ lọc, nút "Áp dụng"/"Nhập lại", label thuộc tính chi tiết, thông báo lỗi, empty state message, toast) được dịch sang ngôn ngữ hiển thị tương ứng khi người dùng đổi ngôn ngữ. Hỗ trợ 5 ngôn ngữ: VI, EN, ZH, JA, KO. Nội dung dữ liệu từ API (tên văn bản, số hiệu, cơ quan ban hành, nội dung toàn văn) hiển thị nguyên bản — không thay đổi theo ngôn ngữ.

---

## 4. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-05-11 | v1 → v1.1 | 3.4 Xử lý lỗi — HTTP 401 | (Không có) | Bổ sung xử lý lỗi 401: auto refresh token, nếu hết hạn >15 ngày → redirect đăng nhập + toast "Phiên đăng nhập hết hạn." | Đồng bộ CMR-07 (B1) |
| 2026-05-11 | v1 → v1.1 | 3.6 Đa ngôn ngữ | (Không có) | Bổ sung section đa ngôn ngữ: text cứng dịch 5 ngôn ngữ (VI, EN, ZH, JA, KO), nội dung API giữ nguyên | Đồng bộ CMR-17 (B2) |
| 2026-05-11 | v1 → v1.1 | 2.1 Field #12 — Debounce Navigation | Debounce rapid tap (rule riêng, không tham chiếu CMR) | Refactor → tham chiếu CMR-18: tap nhanh liên tục vào card/nút, chỉ nhận action đầu tiên, bỏ qua tap tiếp theo cho đến khi điều hướng hoàn tất | Đồng bộ CMR-18 (D6) |
| 2026-05-11 | v1 → v1.1 | 2.1 Field #3 — Ô tìm kiếm | Không có max length, không có whitespace | Bổ sung: tối đa 500 ký tự (CMR-01), auto-trim whitespace đầu/cuối trước khi tìm kiếm | Đồng bộ CMR-01 (C3) |
