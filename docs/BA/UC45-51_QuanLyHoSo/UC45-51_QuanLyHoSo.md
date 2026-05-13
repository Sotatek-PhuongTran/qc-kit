# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG

**Tiêu đề:** UC45-51 — Quản lý hồ sơ trên Mobile
**Ngày tạo:** 29/04/2026

| Thuộc tính              | Giá trị                                 |
| ------------------------- | ----------------------------------------- |
| BA phụ trách            | han.luong & huy.lai2                      |
| Phân hệ                 | Ứng dụng Di động (Mobile App)         |
| Loại chức năng         | Quản lý hồ sơ                         |
| Đối tượng thực hiện | Cá nhân / Tổ chức (đã đăng nhập) |
| Giao diện                | Màn hình Mobile (Portrait)              |
| Ngày tạo                | 29/04/2026                                |
| Phiên bản               | v2.4                                      |

---

## UC45-51 — Quản lý hồ sơ trên Mobile

### 1. Mô tả chức năng

**Tên chức năng:** Xem danh sách hồ sơ trên Mobile
**Mô tả:** Chức năng cho phép người dùng xem danh sách toàn bộ hồ sơ đã nộp, tra cứu theo trạng thái và xem chi tiết hồ sơ. Hệ thống hiển thị hồ sơ được phân loại theo các tab trạng thái.
**Phân quyền:** Cá nhân/Tổ chức đã đăng nhập chỉ xem được hồ sơ của chính mình nộp.
**Truy cập chức năng:** Sidebar → "Quản lý hồ sơ".
**Chức năng đáp ứng usecase số:** UC45, UC46, UC47, UC48, UC49, UC50, UC51 (Phụ lục XIV)

---

### 2. Mô tả giao diện

#### 2.1 Giao diện Danh sách hồ sơ

**Mô tả giao diện:**
Màn hình cuộn dọc bao gồm các thành phần từ trên xuống dưới: Header đỏ có nút quay lại → Thanh tìm kiếm và bộ lọc → Thanh Tab trạng thái (6 tab) → Danh sách Card hồ sơ.

**Khung Header:**

| # | Tên trường       | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                       |
| - | ------------------- | -------------- | --------------------- | ------------ | ---------- | -------------------------------------------------------------------------------------- |
| 1 | Nút Quay lại (←) | Button (Icon)  | —                    | —           | —         | **Quy tắc hành động:** Tap → Quay về màn hình trước đó. (Xem CMR-06) |
| 2 | Tiêu đề Header   | Label          | "Quản lý hồ sơ"   | —           | —         | **Quy tắc hiển thị:** Màu trắng trên nền đỏ đậm, căn giữa.          |

**Quy tắc chung cho Search/Filter & State Persistence:**

- Khi người dùng đang search/filter và tap vào card để xem chi tiết, sau đó quay lại → **Giữ nguyên** search/filter (theo CMR-01).
- Khi chuyển tab trạng thái nội bộ trong cùng màn hình → **giữ nguyên** keyword tìm kiếm và bộ lọc hiện tại (tab bản chất là một dạng filter bổ sung). Chỉ reset search/filter khi người dùng chuyển sang màn hình khác hoàn toàn (qua Sidebar, Footer tab, hoặc điều hướng chính — không bao gồm màn hình chi tiết).

**Debounce Navigation (CMR-18):** Khi người dùng tap nhanh liên tục (double tap) vào card hồ sơ hoặc các button navigation (Back, Filter, Submit), hệ thống chỉ nhận action đầu tiên, chờ thực hiện xong trước khi nhận action tiếp theo.

**Filter Active Indicator (CMR-02):** Khi có bộ lọc đang active (giá trị khác mặc định), hiển thị icon indicator màu xanh lá cây ở góc phải bên trên của icon filter. Khi không có filter active → ẩn indicator.

**Khung Tìm kiếm & Lọc:**

| # | Tên trường | Kiểu trường       | Giá trị mặc định                  | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| - | ------------- | -------------------- | -------------------------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 | Ô tìm kiếm | Textbox (Search)     | "Tìm kiếm theo mã, tên hồ sơ..." | x            | —         | **Quy tắc hiển thị:** Icon kính lúp nằm bên trái trong ô. Tìm kiếm gần đúng (chứa từ khóa). Khi xóa hết từ khóa, danh sách trở về trạng thái mặc định. (Xem CMR-01)`<br><br>`**Quy tắc hành động:** Nhập từ khóa → Kết quả hiển thị tự động sau **3 giây debounce**. Người dùng nhập từ khóa → Kết quả hiển thị ngay, không cần nhấn Enter hay nhấn nút nào. Nếu không có kết quả trùng khớp: Hiển thị màn *"Không tìm thấy kết quả."* (Xem CMR-14) |
| 2 | Nút "Lọc"   | Button (Icon Filter) | —                                     | —           | —         | **Quy tắc hiển thị:** Nằm bên phải ô tìm kiếm, viền bo tròn, icon bộ lọc.`<br><br>`**Quy tắc hành động:** (Xem CMR-02)`<br>`- Tap icon filter → Mở modal/panel bộ lọc.`<br>`- Tap 'Áp dụng' / 'Tìm' → Đóng bộ lọc, tải lại danh sách với tiêu chí đã chọn.`<br>`- Tap 'Nhập lại' / 'Đặt lại' → Reset tất cả trường về giá trị mặc định.`<br>`- Tap vùng ngoài hoặc nút 'X' → Đóng bộ lọc, không thay đổi kết quả hiện tại.                                 |

**Modal Bộ lọc tìm kiếm (Bottom Sheet):**

> Bộ lọc hiển thị dưới dạng Bottom Sheet. Người dùng chỉnh sửa các tiêu chí trong sheet, sau đó tap "Áp dụng" để áp dụng. Bottom Sheet có nút "X" ở góc phải trên cùng để đóng.

| # | Tên trường     | Kiểu trường              | Giá trị mặc định                  | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| - | ----------------- | --------------------------- | -------------------------------------- | ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Trạng thái      | Dropdown (Single-selection) | Tất cả trạng thái                  | x            | —         | **Quy tắc hiển thị:** (Xem CMR-03)`<br>`- Danh sách trạng thái lấy từ danh mục hệ thống.`<br>`- Giá trị mặc định: Tất cả trạng thái .`<br><br>`**Quy tắc hành động:**`<br>`- Người dùng tap → Mở danh sách lựa chọn → Tap item → Tự động đóng và hiển thị giá trị đã chọn.`<br>`- Người dùng có thể nhập text để tìm kiếm/filter trong dropdown (tìm kiếm gần đúng).`<br>`- Option đã chọn được highlight/bold khi mở dropdown list.`<br>`- Nếu tên option vượt quá giới hạn ký tự → Tự động cắt ngắn và hiển thị "..." ở cuối.                                                                                                                                                                                                                                                                                                                                                                                     |
| 2 | Ngày tiếp nhận | Date Range Picker           | Placeholder: "Từ ngày - Đến ngày" | x            | —         | **Quy tắc hiển thị:** (Xem CMR-15)`<br>`- Cho phép chọn khoảng thời gian từ ngày - đến ngày bằng component lịch (calendar picker).`<br>`- Định dạng ngày hiển thị: DD/MM/YYYY (Xem CMR-12).`<br><br>`**Quy tắc hành động:**`<br>`- Tap vào field → Mở calendar popup.`<br>`- Chỉ chọn ngày bắt đầu, không chọn ngày kết thúc → Ngày kết thúc = vô hạn (lọc từ ngày bắt đầu đến hiện tại).`<br>`- Chỉ chọn ngày kết thúc, không chọn ngày bắt đầu → Ngày bắt đầu = không giới hạn (lọc từ đầu đến ngày kết thúc).`<br>`- Khi chọn ngày bắt đầu → Chỉ cho phép chọn ngày kết thúc từ ngày bắt đầu trở về sau (các ngày trước đó bị disable).`<br><br>`**Quy tắc validation:**`<br>`- Ngày "Đến ngày" phải lớn hơn hoặc bằng ngày "Từ ngày".`<br>`- Nếu invalid → Hiển thị inline error: "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu" (Xem CMR-15). |
| 3 | Ngày hẹn trả   | Date Range Picker           | Placeholder: "Từ ngày - Đến ngày" | x            | —         | **Quy tắc hiển thị:** (Xem CMR-15)`<br>`- Cho phép chọn khoảng thời gian từ ngày - đến ngày bằng component lịch (calendar picker).`<br>`- Định dạng ngày hiển thị: DD/MM/YYYY (Xem CMR-12).`<br><br>`**Quy tắc hành động:**`<br>`- Tap vào field → Mở calendar popup.`<br>`- Chỉ chọn ngày bắt đầu, không chọn ngày kết thúc → Ngày kết thúc = vô hạn (lọc từ ngày bắt đầu đến hiện tại).`<br>`- Chỉ chọn ngày kết thúc, không chọn ngày bắt đầu → Ngày bắt đầu = không giới hạn (lọc từ đầu đến ngày kết thúc).`<br>`- Khi chọn ngày bắt đầu → Chỉ cho phép chọn ngày kết thúc từ ngày bắt đầu trở về sau (các ngày trước đó bị disable).`<br><br>`**Quy tắc validation:**`<br>`- Ngày "Đến ngày" phải lớn hơn hoặc bằng ngày "Từ ngày".`<br>`- Nếu invalid → Hiển thị inline error: "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu" (Xem CMR-15). |
| 4 | Nút "X" đóng   | Button (Icon)               | —                                     | —           | —         | **Quy tắc hiển thị:** Icon "X" nằm ở góc trên phải của Bottom Sheet. Màu xám đậm, viền bo tròn nếu có nền.`<br><br>`**Quy tắc hành động:** Tap vùng ngoài hoặc tap nút "X" → Đóng Bottom Sheet, không thay đổi kết quả hiện tại. (Xem CMR-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 5 | Nút "Nhập lại" | Button (Secondary)          | —                                     | —           | —         | **Quy tắc hiển thị:** Nút viền outline màu đỏ, text màu đỏ. Không đóng Bottom Sheet.`<br><br>`**Quy tắc hành động:** (Xem CMR-02)`<br>`- Tap → Reset toàn bộ tiêu chí lọc về giá trị mặc định.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 6 | Nút "Áp dụng"  | Button (Primary)            | —                                     | —           | —         | **Quy tắc hiển thị:** Nút nền đỏ filled, text trắng.`<br><br>`**Quy tắc hành động:** (Xem CMR-02)`<br>`- Tap → Áp dụng toàn bộ tiêu chí lọc hiện tại.`<br>`- Đóng Bottom Sheet.`<br>`- Gọi API với tham số bộ lọc và tải lại danh sách hồ sơ.`<br>`- Nếu không có kết quả phù hợp → hiển thị "Không tìm thấy kết quả." (Xem CMR-14)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

**Quy tắc nút Back vật lý (Android):** Khi Bottom Sheet bộ lọc đang mở, người dùng nhấn nút Back vật lý (Android) → Quay về màn hình trước đó (không chỉ đóng Bottom Sheet).

**Khung Tabs Trạng thái (Horizontal Scroll):**

| # | Tên Tab           | Điều kiện hiển thị                                       | Trạng thái active                                |
| - | ------------------ | ------------------------------------------------------------- | -------------------------------------------------- |
| 1 | Tất cả           | Hiển thị toàn bộ hồ sơ không phân biệt trạng thái. | Text/màu đỏ + underline đỏ khi được chọn. |
| 2 | Chờ tiếp nhận   | Hồ sơ mới nộp, chưa được xử lý.                     | Text/màu đỏ + underline đỏ khi được chọn. |
| 3 | Yêu cầu bổ sung | Hồ sơ cần bổ sung giấy tờ.                              | Text/màu đỏ + underline đỏ khi được chọn. |
| 4 | Đã tiếp nhận   | Hồ sơ đang được xử lý.                                | Text/màu đỏ + underline đỏ khi được chọn. |
| 5 | Từ chối          | Hồ sơ bị từ chối tiếp nhận.                            | Text/màu đỏ + underline đỏ khi được chọn. |
| 6 | Hoàn thành       | Hồ sơ đã xử lý xong.                                    | Text/màu đỏ + underline đỏ khi được chọn. |

**Quy tắc hành động:** (Xem CMR-02)

- **Single selection:** Chỉ cho phép chọn 1 tab tại một thời điểm.
- Tap vào tab → **Tự động unselect tab hiện tại** (bỏ underline đỏ) → **Select tab mới** (hiển thị underline đỏ).
- Hệ thống gọi API với tham số trạng thái tương ứng và cập nhật danh sách hồ sơ.
- Tab mặc định (khi mở màn hình): Tab "Tất cả".
- Nếu không có hồ sơ cho trạng thái tương ứng → Hiển thị *"Không có dữ liệu."* (Xem CMR-14).

**Khung Danh sách hồ sơ (Card List):**

> Mỗi card đại diện cho một hồ sơ. Danh sách sắp xếp mặc định theo ngày nộp giảm dần (mới nhất lên đầu).

| # | Tên trường           | Kiểu trường         | Giá trị mặc định | Được sửa | Bắt buôc | Mô tả/Ghi chú                                                                                                                                                                                                                   |
| - | ----------------------- | ---------------------- | --------------------- | ------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Mã hồ sơ & Thủ tục | Label                  | —                    | —           | —         | **Quy tắc hiển thị:** Format: [Mã hồ sơ] • [Mã thủ tục]. Mã hồ sơ hiển thị màu đỏ đậm. Hiển thị tối đa 1 dòng, quá dài sẽ truncate với "..." ở cuối.                                          |
| 2 | Trạng thái            | Badge                  | —                    | —           | —         | **Quy tắc hiển thị:** (Xem CMR-05)`<br><br>`Màu sắc dựa theo UI design `<br><br>`**Quy tắc hành động:** Badge trạng thái luôn read-only, không cho phép tap.                                        |
| 3 | Tên thủ tục          | Label (Bold)           | —                    | —           | —         | **Quy tắc hiển thị:** Tên thủ tục đăng ký. Hiển thị tối đa 2 dòng, quá dài sẽ có dấu "..." ở cuối (truncate).                                                                                           |
| 4 | Đơn vị               | Label (Icon Tòa nhà) | —                    | —           | —         | **Quy tắc hiển thị:** Icon tòa nhà (màu xám) + tiền tố "Đơn vị: " + Tên cơ quan. Wrap text nếu dài quá, không truncate.                                                                                    |
| 5 | Người nộp            | Label (Icon Người)   | —                    | —           | —         | **Quy tắc hiển thị:** Icon người (màu xám) + tiền tố "Người nộp: " + Tên người nộp + Badge [Cá nhân/Tổ chức]. Wrap text nếu dài quá, không truncate.                                                 |
| 6 | Ngày nộp              | Label (Icon Lịch)     | —                    | —           | —         | **Quy tắc hiển thị:** Icon lịch (màu xám) + tiền tố "Ngày nộp: " + DD/MM/YYYY (Xem CMR-12).                                                                                                                        |
| 7 | Lý do                  | Label (Read-only)     | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị lý do từ chối khi trạng thái là **Từ chối**, hoặc lý do yêu cầu bổ sung khi trạng thái là **Yêu cầu bổ sung**. Hiển thị tối đa 2 dòng, quá dài sẽ truncate với "..." ở cuối.`<br>`- Nếu trạng thái khác (Chờ tiếp nhận, Đã tiếp nhận, Hoàn thành) → Không hiển thị trường này. |
| 8 | Icon Điều hướng (>) | Icon                   | —                    | —           | —         | **Quy tắc hiển thị:** Icon mũi tên ">" màu xám, nằm ở góc phải Card.`<br><br>`**Quy tắc hành động:** Tap vào bất kỳ đâu trên Card hoặc icon này → Chuyển sang màn hình Chi tiết hồ sơ. |

---

#### 2.2 Giao diện Chi tiết hồ sơ

**Mô tả giao diện:**
Header tiêu đề "Chi tiết hồ sơ", có nút quay lại ←. Nội dung màn hình cuộn dọc chia thành các khối (Section) riêng biệt, hiển thị đầy đủ thông tin chi tiết của hồ sơ. Toàn bộ màn hình là read-only.

**Quy tắc hiển thị chung:** Tất cả các field label trong màn hình chi tiết đều **wrap text nếu dài quá, không truncate**.

**Quy tắc giao diện:** Giao diện chi tiết hồ sơ không có khác biệt giữa người dùng "Cá nhân" và "Tổ chức".

**Khung Header:**

| # | Tên trường       | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                             |
| - | ------------------- | -------------- | --------------------- | ------------ | ---------- | -------------------------------------------------------------------------------------------- |
| 1 | Nút Quay lại (←) | Button (Icon)  | —                    | —           | —         | **Quy tắc hành động:** Tap → Quay về màn hình Danh sách hồ sơ. (Xem CMR-06) |
| 2 | Tiêu đề Header   | Label          | "Chi tiết hồ sơ"   | —           | —         | **Quy tắc hiển thị:** Màu trắng trên nền đỏ đậm, căn giữa.                |

**2.2.1 Banner chính (Nền đỏ):**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                            |
| - | ------------- | -------------- | --------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Mã hồ sơ   | Label (Bold)   | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị mã hồ sơ (Size lớn). Wrap text nếu dài, không truncate.                                                    |
| 2 | Trạng thái  | Badge          | —                    | —           | —         | **Quy tắc hiển thị:** Badge trạng thái tương ứng. Màu sắc dựa theo UI design. (Xem CMR-05)                                                 |
| 3 | Ngày nộp    | Label          | —                    | —           | —         | **Quy tắc hiển thị:** Icon lịch + "Ngày nộp: DD/MM/YYYY HH:mm" (Xem CMR-12). Nếu null → hiển thị "-". Wrap text nếu dài, không truncate. |

**2.2.2 Section 1 — Thông tin chung hồ sơ:**

| # | Tên trường        | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                       |
| - | -------------------- | ----------------- | --------------------- | ------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Tên dịch vụ công | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị tên dịch vụ công. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".                            |
| 2 | Mã hồ sơ          | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị mã hồ sơ. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".                                     |
| 3 | Đối tượng        | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị đối tượng thực hiện (Cá nhân/Tổ chức). Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-". |
| 4 | Tỉnh/thành         | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị tên tỉnh/thành. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".                               |
| 5 | Số bộ hồ sơ      | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị số bộ hồ sơ. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".                                 |

**2.2.3 Section 2 — Thông tin tiếp nhận & trả kết quả:**

| # | Tên trường                 | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                          |
| - | ----------------------------- | ----------------- | --------------------- | ------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Phương thức tiếp nhận    | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị phương thức tiếp nhận hồ sơ. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-". |
| 2 | Phương thức giao kết quả | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị phương thức giao kết quả. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".      |
| 3 | Đơn vị tiếp nhận         | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị tên đơn vị tiếp nhận hồ sơ. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-". |
| 4 | Đơn vị xử lý             | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị tên đơn vị xử lý hồ sơ. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".     |
| 5 | Ngày nộp                    | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị ngày nộp hồ sơ. Định dạng: DD/MM/YYYY HH:mm (Xem CMR-12).`<br>`- Nếu null → hiển thị "-".          |

**2.2.4 Section 3 — Thông tin văn bản & pháp lý:**

| # | Tên trường    | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                    |
| - | ---------------- | ----------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Số đến        | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị số đến của hồ sơ. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".                       |
| 2 | Số công văn   | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị số công văn. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".                               |
| 3 | Ngày công văn | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị ngày công văn. Định dạng: DD/MM/YYYY (Xem CMR-12).`<br>`- Nếu null → hiển thị "-".                            |
| 4 | Phí hồ sơ     | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị phí hồ sơ. Định dạng số theo (Xem CMR-11), luôn kèm đơn vị tiền tệ **VNĐ**. Nếu phí bằng 0 → Hiển thị "0 VNĐ". Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-". |

**2.2.5 Section 4 — Nội dung chi tiết:**

| # | Tên trường      | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                          |
| - | ------------------ | ----------------- | --------------------- | ------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Nội dung hồ sơ  | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị nội dung hồ sơ. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".                  |
| 2 | Thông tin dự án | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị thông tin dự án (nếu có). Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".      |
| 3 | Lý do            | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị lý do từ chối khi trạng thái là **Từ chối**, hoặc hiển thị lý do yêu cầu bổ sung khi trạng thái là **Yêu cầu bổ sung**. Wrap text nếu dài, không truncate.`<br>`- Nếu trạng thái khác → Không hiển thị trường này. |
| 4 | Ghi chú           | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị ghi chú (nếu có). Wrap text nếu dài, không truncate.`<br>`- Nếu không có ghi chú → hiển thị "-". |

**2.2.6 Section 5 — Kết quả & tài liệu:**

| # | Tên trường    | Kiểu trường      | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| - | ---------------- | ------------------- | --------------------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 | File đính kèm | List (Icon + Label) | —                    | —           | —         | **Quy tắc hiển thị:** (Xem CMR-08)`<br>`- Hiển thị danh sách file đính kèm. Icon file + Tên file + Format file (VD: PDF, DOCX, XLSX).`<br>`- Tên dài → truncate với dấu "..." ở cuối.`<br>`- Không có file → hiển thị empty state *"Không có dữ liệu."* (Xem CMR-14).`<br><br>`**Quy tắc hành động:**`<br>`- Tap item → Mở viewer/document handler để xem tài liệu.`<br>`- PDF, Hình ảnh (JPG, PNG), Video (MP4, AVI, MOV) → Mở xem trực tiếp trên trình duyệt thiết bị. Các định dạng khác (DOC, DOCX, XLS, XLSX, ZIP, v.v.) → Tự động tải xuống máy (download). (Xem CMR-08).` |

**2.2.7 Section 6 — Tiến độ & thời hạn:**

| # | Tên trường                      | Kiểu trường    | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                      |
| - | ---------------------------------- | ----------------- | --------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Số ngày kiểm tra hợp lệ       | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Icon đồng hồ (màu sắc theo thiết kế) + "Số ngày kiểm tra hợp lệ: [Giá trị]". Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-". |
| 2 | Ngày trả lời kiểm tra hợp lệ | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Icon đồng hồ (màu sắc theo thiết kế) + "Ngày trả lời: DD/MM/YYYY" (Xem CMR-12). Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".  |
| 3 | Số ngày giải quyết             | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Icon đồng hồ (màu sắc theo thiết kế) + "Số ngày giải quyết: [Giá trị]". Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".       |
| 4 | Ngày hẹn trả                    | Label (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Icon đồng hồ (màu sắc theo thiết kế) + "Ngày hẹn trả: DD/MM/YYYY" (Xem CMR-12). Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-".  |

**2.2.8 Section 7 — Tiến trình xử lý:**

| # | Tên trường | Kiểu trường       | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú                                                                                                                                                                                                                                      |
| - | ------------- | -------------------- | --------------------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Timeline      | Timeline (Read-only) | —                    | —           | —         | **Quy tắc hiển thị:** Hiển thị timeline các bước xử lý (VD: Đã nộp hồ sơ (Ngày giờ), Đang xử lý...). Mỗi bước gồm tên bước + ngày giờ. Wrap text nếu dài, không truncate.`<br>`- Nếu null → hiển thị "-". |
| 2 | Trạng thái  | Badge                | —                    | —           | —         | **Quy tắc hiển thị:** Badge trạng thái hiện tại của tiến trình. Màu sắc dựa theo UI design. (Xem CMR-05)                                                                                                                           |

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Xử lý Tải danh sách hồ sơ

1. Người dùng truy cập màn hình Quản lý hồ sơ.
2. Hệ thống mặc định hiển thị Tab "Tất cả" và gọi API lấy danh sách.
3. Danh sách sắp xếp theo ngày nộp giảm dần.
4. Hỗ trợ **lazy load** 20 bản ghi/lần. (Xem CMR-04)

**State Persistence:**
- **Giữ tab khi quay lại:** Khi người dùng vào chi tiết hồ sơ và nhấn Back quay lại danh sách, hệ thống giữ nguyên tab đang chọn trước đó (không reset về "Tất cả").
- **Giữ scroll position:** Khi quay lại từ chi tiết, danh sách giữ nguyên vị trí cuộn trước đó.
- **Giữ search/filter:** Trạng thái tìm kiếm và bộ lọc được giữ nguyên khi quay lại từ chi tiết. (Xem CMR-01)

**Loading state:**
- **First-load:** Khi mở màn hình lần đầu hoặc đổi tab, sử dụng loading state toàn màn hình (full-screen loading overlay). (Xem CMR-07)
- **Subsequent load:** Các lần tải tiếp theo (lazy load, refresh) sử dụng loading indicator cục bộ (spinner).

**Lazy load retry:** (Xem CMR-04)
- Khi tải trang N bị lỗi → Hệ thống tự động retry 3 lần (mỗi lần cách nhau ~2 giây).
- Sau 3 lần retry vẫn fail → Dừng tự động retry, hiển thị thông báo lỗi cục bộ ở cuối danh sách.
- Người dùng có thể dùng pull-to-refresh để tải lại từ đầu.

**Pull to refresh:** (Xem CMR-13)

- Kéo xuống từ đầu danh sách → Trigger refresh dữ liệu từ đầu.
- Hiển thị spinner ở đầu danh sách trong khi đang refresh.
- Sau khi refresh thành công: Cập nhật danh sách, ẩn spinner.

**Xử lý lỗi:** (Xem CMR-07)

| Tình huống lỗi           | Thông báo hiển thị                                                                             | Hành vi hệ thống                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Lỗi mạng / Mất kết nối | *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* + nút **"Thử lại"** | Giữ nguyên màn hình, hiển thị nút Thử lại. Dữ liệu đã load trước đó (qua lazy load) được giữ lại trên màn hình; chỉ hiển thị lỗi cho phần chưa load được. |
| Lỗi API (HTTP 500)         | *"Hệ thống đang bận. Vui lòng thử lại sau."*                                              | Giữ nguyên màn hình, chỉ hiển thị thông báo.            |
| Timeout (quá 10 giây)     | *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + nút **"Thử lại"**       | Giữ nguyên màn hình, hiển thị nút Thử lại. (Xem CMR-16) |
| Session hết hạn (HTTP 401) | Toast: *"Phiên đăng nhập hết hạn."* | Hệ thống tự động sử dụng refresh token để cấp lại access token mới. Nếu refresh token hết hạn hoặc không hợp lệ (quá **15 ngày**) → Redirect về màn hình đăng nhập. (Xem CMR-07) |

**Xử lý lỗi trống (Empty state):** (Xem CMR-14)

- Nếu không có hồ sơ: Hiển thị Empty State (Thông báo *"Không có dữ liệu."*).
- Nếu search/filter không có kết quả: Hiển thị *"Không tìm thấy kết quả."*.

**Xử lý lỗi màn hình Chi tiết (Partial Data):**

- Màn hình chi tiết gọi nhiều endpoint (thông tin chung, file đính kèm, timeline).
- Hiển thị section tải thành công bình thường. Section bị lỗi hiển thị thông báo lỗi riêng theo CMR-07 — không block toàn bộ màn hình.

#### 3.2 Đa ngôn ngữ (→ Xem CMR-17)

Toàn bộ text cứng trên màn hình UC45-51 (header, tên tab trạng thái, placeholder ô tìm kiếm, label bộ lọc, tên trường chi tiết, thông báo lỗi, empty state message, toast) được dịch sang ngôn ngữ hiển thị tương ứng khi người dùng đổi ngôn ngữ. Hỗ trợ 5 ngôn ngữ: VI, EN, ZH, JA, KO. Nội dung dữ liệu từ API (tên hồ sơ, mã hồ sơ, trạng thái, timeline) hiển thị nguyên bản — không thay đổi theo ngôn ngữ.

#### 3.3 Tiêu chí chấp nhận (Acceptance Criteria)

- **AC1:** Danh sách hiển thị đúng 6 tab trạng thái và khớp dữ liệu thực tế.
- **AC2:** Card hồ sơ hiển thị đầy đủ các icon và Badge (Cá nhân/Tổ chức) đúng màu sắc thiết kế.
- **AC3:** Toàn bộ card hồ sơ có thể tap để vào màn hình chi tiết.
- **AC4:** Màn hình chi tiết hiển thị đầy đủ 7 section thông tin theo thiết kế.
- **AC5:** Các file đính kèm mở được viewer in-app hoặc ứng dụng hỗ trợ.

---

## 4. Lịch sử cập nhật

| Ngày | Phiên bản | Mục cập nhật | Before | After | Ghi chú |
| --- | --- | --- | --- | --- | --- |
| 2026-05-07 | v2 → v2.1 | Bảng Xử lý lỗi — Thêm HTTP 401 | (Không có) | Session hết hạn (HTTP 401): tự động sử dụng refresh token; nếu refresh token hết hạn (>15 ngày) → redirect đăng nhập + toast "Phiên đăng nhập hết hạn" (CMR-07) | Bổ sung xử lý session |
| 2026-05-11 | v2.1 → v2.2 | Đa ngôn ngữ | (Không có) | Bổ sung section đa ngôn ngữ: text cứng dịch 5 ngôn ngữ (VI, EN, ZH, JA, KO), nội dung API giữ nguyên | Đồng bộ CMR-17 (B2) |
| 2026-05-11 | v2.1 → v2.2 | State Persistence | (Không có) | Bổ sung: giữ tab khi quay lại từ chi tiết, giữ scroll position, giữ search/filter | Đồng bộ C4 |
| 2026-05-11 | v2.1 → v2.2 | Loading state | (Không có) | First-load: full-screen loading overlay. Subsequent: spinner cục bộ | Đồng bộ CMR-07 |
| 2026-05-11 | v2.1 → v2.2 | Lazy load retry | (Không có) | Retry tự động 3 lần (mỗi lần cách 2s). Sau 3 lần fail → dừng, hiển thị lỗi cục bộ | Đồng bộ CMR-04 |
| 2026-05-11 | v2.1 → v2.2 | Metadata version fix | Metadata table: v2 | Metadata table: v2.2 (đồng bộ header) | Đồng bộ D1 |
| 2026-05-12 | v2.2 → v2.3 | Bổ sung CMR-18 (Debounce Navigation) | (Không có) | Double-tap debounce trên card và button navigation | Đồng bộ Cross-UC Inconsistency Report v2 |
| 2026-05-12 | v2.2 → v2.3 | Bổ sung Filter Active Indicator (CMR-02) | (Không có) | Icon indicator xanh lá cây khi filter active | Đồng bộ CMR-02 v1.1 |
| 2026-05-12 | v2.2 → v2.3 | Tab switching behavior | Reset search/filter khi chuyển tab | Giữ nguyên search/filter khi chuyển tab nội bộ (chỉ reset khi chuyển màn — không bao gồm màn chi tiết) | Đồng bộ CMR-01 v1.4 |
| 2026-05-12 | v2.3 → v2.4 | Back vật lý Android — Bottom Sheet | (Không có) | Khi Bottom Sheet bộ lọc đang mở, nhấn Back vật lý (Android) → Quay về màn hình trước đó | Feedback BA |
| 2026-05-12 | v2.3 → v2.4 | Partial Data — Màn chi tiết | (Không có) | Hiển thị section tải thành công bình thường. Section bị lỗi hiển thị thông báo lỗi riêng theo CMR-07 — không block toàn bộ màn hình | Feedback BA |
| 2026-05-12 | v2.3 → v2.4 | Ghi chú UI Cá nhân / Tổ chức | (Không có) | Giao diện chi tiết hồ sơ không có khác biệt giữa Cá nhân và Tổ chức | Feedback BA |
| 2026-05-12 | v2.3 → v2.4 | Sửa tham chiếu sorting | Danh sách sắp xếp theo ngày nộp giảm dần (Xem CMR-11) | Danh sách sắp xếp theo ngày nộp giảm dần. (Xóa tham chiếu CMR-11 sai) | Feedback BA |
| 2026-05-12 | v2.3 → v2.4 | Giữ dữ liệu khi mất mạng giữa chừng | Giữ nguyên màn hình, hiển thị nút Thử lại. | Giữ nguyên màn hình + dữ liệu đã load (lazy load) được giữ lại; chỉ hiển thị lỗi cho phần chưa load | Feedback BA |
| 2026-05-12 | v2.3 → v2.4 | Bỏ phiên bản ở title | `**Phiên bản:** v2.3` dưới tiêu đề | (Đã xóa) — chỉ giữ phiên bản trong bảng thuộc tính | Feedback BA |
