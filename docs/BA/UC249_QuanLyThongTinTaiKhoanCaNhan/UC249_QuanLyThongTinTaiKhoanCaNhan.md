# ĐẶC TẢ YÊU CẦU NGƯỜI SỬ DỤNG
**Tiêu đề:** UC249 — Quản lý thông tin tài khoản cá nhân trên Mobile
**Ngày tạo:** 29/04/2026
**Phiên bản:** v2.2
**Cập nhật:** 11/05/2026 — Bổ sung màn hình Xem chi tiết, cập nhật cấu trúc form Chỉnh sửa theo wireframe; bổ sung Preconditions/Postconditions, AC, error flows, validation rules từ BA Q&A; cập nhật block input Họ và tên tại 100 ký tự, spinner cascade dropdown

| Thuộc tính | Giá trị |
|---|---|
| BA phụ trách | han.luong & huy.lai2 |
| Phân hệ | Ứng dụng Di động (Mobile App) |
| Loại chức năng | Quản lý tài khoản |
| Đối tượng thực hiện | Cá nhân (đã đăng nhập) |
| Giao diện | Màn hình Mobile (Portrait) |
| Ngày tạo | 29/04/2026 |
| Phiên bản | v2.1 |

> **Phạm vi UC này:** Chỉ áp dụng cho tài khoản loại **Cá nhân**. Tài khoản **Tổ chức** được xử lý ở màn hình riêng (không thuộc UC249).

---

## UC249 — Quản lý thông tin tài khoản cá nhân trên Mobile

### 1. Mô tả chức năng

**Tên chức năng:** Quản lý thông tin tài khoản cá nhân trên Mobile
**Mô tả:** Chức năng cho phép người dùng xem toàn bộ thông tin tài khoản cá nhân (Hồ sơ + Thông tin định danh) và chỉnh sửa các trường được phép cập nhật. Bao gồm hai màn hình chính: Xem chi tiết (read-only) và Chỉnh sửa thông tin.
**Phân quyền:** Cá nhân đã đăng nhập.
**Truy cập chức năng:** Sidebar → "Cấu hình tài khoản" → Tap "Thông tin cá nhân".
**Chức năng đáp ứng usecase số:** UC249 (Phụ lục XIV)

---

### 1.1 Preconditions & Postconditions

**Preconditions:**
- Người dùng đã đăng nhập vào ứng dụng (session còn hiệu lực).
- Loại tài khoản là **Cá nhân**.

**Postconditions (sau khi cập nhật thành công):**
- Thông tin tài khoản được lưu xuống DB với dữ liệu mới nhất.
- Session không bị ảnh hưởng (người dùng không bị đăng xuất).
- Màn hình Xem chi tiết tự động hiển thị dữ liệu đã cập nhật mới nhất.

---

### 2. Mô tả giao diện

#### 2.1 Giao diện Xem chi tiết thông tin tài khoản cá nhân (UC249 — Read-only)

**Mô tả giao diện:**
Màn hình dạng danh sách thông tin (Detail View). App Bar tiêu đề **"Tài khoản cá nhân"** với nút Back (←) bên trái và nút Edit (✏️) bên phải. Nội dung chia thành 2 section: **Hồ sơ** và **Thông tin**. Hỗ trợ Pull-to-Refresh (CMR-13).

**App Bar:**

| # | Thành phần | Kiểu | Mô tả/Ghi chú |
|---|---|---|---|
| 1 | Nút Back (←) | Icon Button | Tap → Quay về màn hình Cấu hình tài khoản. Tham chiếu: CMR-06. |
| 2 | Tiêu đề | Label | Hiển thị: "Tài khoản cá nhân". |
| 3 | Nút Edit (✏️) | Icon Button | **Quy tắc hiển thị:** Hiển thị với mọi loại tài khoản Cá nhân.<br>**Quy tắc hành động:** Tap → Chuyển sang màn hình Chỉnh sửa (UC249.1). Có cơ chế debounce tránh double-tap (CMR-18). |

**Section "Hồ sơ":**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Họ và tên | Label | [Từ tài khoản] | — | — | Hiển thị họ tên đầy đủ. Nếu null → hiển thị "-". Không tap được. |
| 2 | Email | Label | [Từ tài khoản] | — | — | Hiển thị email. Hiển thị tối đa 1 dòng, quá dài truncate (...). Nếu null → hiển thị "-". Không tap được. |
| 3 | Số điện thoại | Label | [Từ tài khoản] | — | — | Hiển thị số điện thoại kèm country code (VD: +84 912 345 678). Nếu null → hiển thị "-". Không tap được. |
| 4 | Loại tài khoản | Label | [Từ tài khoản] | — | — | Hiển thị "Cá nhân". Chỉ đọc. |

**Section "Thông tin":**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Mã định danh | Label | [Từ hệ thống] | — | — | Mã CMND/CCCD. Nếu null → hiển thị "-". Không tap được. |
| 2 | Ngày cấp | Label | [Từ hệ thống] | — | — | Định dạng: DD/MM/YYYY (CMR-12). Nếu null → hiển thị "-". |
| 3 | Nơi cấp | Label | [Từ hệ thống] | — | — | Nơi cấp giấy tờ. Nếu null → hiển thị "-". |
| 4 | Mã số thuế | Label | [Từ hệ thống] | — | — | Nếu null → hiển thị "-". |
| 5 | Quốc gia | Label | [Từ tài khoản] | — | — | Nếu null → hiển thị "-". |
| 6 | Tỉnh/Thành phố | Label | [Từ tài khoản] | — | — | Nếu null → hiển thị "-". |
| 7 | Phường/Xã | Label | [Từ tài khoản] | — | — | Nếu null → hiển thị "-". |
| 8 | Địa chỉ | Label | [Từ tài khoản] | — | — | Nếu null → hiển thị "-". |
| 9 | Mã bưu chính | Label | [Từ tài khoản] | — | — | Nếu null → hiển thị "-". |

---

#### 2.2 Giao diện Chỉnh sửa thông tin tài khoản cá nhân (UC249.1)

**Mô tả giao diện:**
Form chỉnh sửa thông tin tài khoản cá nhân. Nội dung chia thành 2 section có thể thu gọn (Collapsible): **Hồ sơ** và **Thông tin**. Cuối trang có 2 nút hành động cố định: **Lưu thay đổi** và **Hủy**. Tham chiếu: CMR-09.

**App Bar:**

| # | Thành phần | Kiểu | Mô tả/Ghi chú |
|---|---|---|---|
| 1 | Nút Back (←) | Icon Button | Tap → Hiển thị Confirmation Dialog nếu có thay đổi chưa lưu. Nếu chưa thay đổi → Quay về Xem chi tiết. Tham chiếu: CMR-06. |
| 2 | Tiêu đề | Label | Hiển thị: "Tài khoản cá nhân". |

**Section "Hồ sơ" (Collapsible — mặc định mở):**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Họ và tên | Textbox | [Từ tài khoản] | x | x | **Validation:**<br>- Bắt buộc (*). Nếu để trống → *"Họ và tên là bắt buộc."* (CMR-09)<br>- Không chấp nhận số hoặc ký tự đặc biệt. Nếu nhập → *"Không nhập số, ký tự đặc biệt."*<br>- Max length: **100 ký tự — block input**: khi người dùng đã nhập đủ 100 ký tự, hệ thống không cho phép nhập thêm ký tự thứ 101 (input bị chặn hoàn toàn).<br>- Validation on blur. |
| 2 | Email | Textbox (email) | [Từ tài khoản] | x | x | **Validation:**<br>- Bắt buộc (*). Nếu để trống → *"Email là bắt buộc."* (CMR-09)<br>- Sai định dạng → *"Sai định dạng."*<br>- Validation on blur. |
| 3 | Số điện thoại | Textbox (tel) + Country Code Prefix | [Từ tài khoản] | x | — | **Quy tắc hiển thị:** Ô nhập gồm prefix (cờ + mã quốc gia, mặc định 🇻🇳 +84) và ô nhập số.<br>**Quy tắc hành động:** Tap prefix → Mở danh sách chọn quốc gia. Khi đổi quốc gia → cập nhật prefix và áp dụng rule validation SĐT của quốc gia đó (độ dài theo chuẩn quốc tế của quốc gia được chọn).<br>**Validation:** Nếu nhập sai format → *"Sai định dạng."* Validation on blur. |
| 4 | Loại tài khoản | Label (Read-only) | [Từ tài khoản] | — | — | Hiển thị "Cá nhân". Không cho phép chỉnh sửa. |

**Section "Thông tin" (Collapsible — mặc định mở):**

| # | Tên trường | Kiểu trường | Giá trị mặc định | Được sửa | Bắt buộc | Mô tả/Ghi chú |
|---|---|---|---|---|---|---|
| 1 | Mã định danh | Textbox (Read-only) | [Từ hệ thống] | — | — | Nền xám. Không chỉnh sửa. |
| 2 | Ngày cấp | Textbox (Read-only) | [Từ hệ thống] | — | — | Nền xám. Không chỉnh sửa. |
| 3 | Nơi cấp | Textbox (Read-only) | [Từ hệ thống] | — | — | Nền xám. Không chỉnh sửa. |
| 4 | Mã số thuế | Textbox (Read-only) | [Từ hệ thống] | — | — | Nền xám. Không chỉnh sửa. |
| 5 | Quốc gia | Dropdown | [Từ tài khoản] | x | x | Bắt buộc (*). Danh sách từ API danh mục. Tap → Chọn → Đóng, cập nhật giá trị. Đổi Quốc gia → reset Tỉnh/TP, Phường/Xã và trigger load danh sách Tỉnh/TP mới. Nếu để trống → *"Quốc gia là bắt buộc."* (CMR-03, CMR-09) |
| 6 | Tỉnh/Thành phố | Dropdown | [Từ tài khoản] | x | x | Bắt buộc (*). Danh sách từ API theo Quốc gia. **Trong khi API đang load: hiển thị spinner bên trong dropdown, dropdown ở trạng thái disabled.** Đổi Tỉnh/TP → reset Phường/Xã và trigger load danh sách Phường/Xã mới. Nếu để trống → *"Tỉnh/Thành phố là bắt buộc."* (CMR-03, CMR-09) |
| 7 | Phường/Xã | Dropdown | [Từ tài khoản] | x | x | Bắt buộc (*). Danh sách từ API theo Tỉnh/TP. **Trong khi API đang load: hiển thị spinner bên trong dropdown, dropdown ở trạng thái disabled.** Nếu để trống → *"Phường/Xã là bắt buộc."* (CMR-03, CMR-09) |
| 8 | Địa chỉ | Textbox | [Từ tài khoản] | x | x | Bắt buộc (*). Cho phép nhập ký tự đặc biệt. Nếu để trống → *"Địa chỉ là bắt buộc."* (CMR-09). Validation on blur. |
| 9 | Mã bưu chính | Textbox | [Từ tài khoản] | x | — | Alphanumeric (chữ + số). Không chấp nhận ký tự đặc biệt → *"Không chấp nhận ký tự đặc biệt."* Validation on blur. |

**Khu vực nút hành động (Bottom — cố định):**

| # | Tên nút | Kiểu | Mô tả/Ghi chú |
|---|---|---|---|
| 1 | Lưu thay đổi | Button (Primary, full-width) | **Quy tắc trạng thái:**<br>- **Disabled:** Khi người dùng chưa thay đổi bất kỳ trường nào so với dữ liệu gốc.<br>- **Enabled:** Khi có ít nhất một trường được thay đổi.<br>**Quy tắc hành động:** Tap → Validate toàn bộ form. Nếu lỗi → Hiển thị inline errors + auto-expand các section có lỗi. Nếu hợp lệ → Gọi API cập nhật → Toast thành công → Quay về Xem chi tiết với dữ liệu mới nhất. Có debounce tránh double-tap (CMR-18). |
| 2 | Hủy | Button (Secondary, full-width) | **Quy tắc hành động:** Tap → Nếu có thay đổi chưa lưu → Hiển thị Confirmation Dialog. Nếu chưa có thay đổi → Quay về Xem chi tiết. Tham chiếu: CMR-10. |

**Confirmation Dialog (khi Hủy hoặc Back có thay đổi chưa lưu):**

| Thành phần | Nội dung |
|---|---|
| Tiêu đề | "Xác nhận hủy" |
| Nội dung | "Dữ liệu chưa được lưu. Bạn có chắc muốn tiếp tục?" |
| Nút chính | "Đồng ý" → Hủy thay đổi, quay về màn hình Xem chi tiết |
| Nút phụ | "Hủy" → Đóng dialog, ở lại màn hình Chỉnh sửa (focus mặc định vào "Hủy" — CMR-10) |

---

### 3. Mô tả các xử lý của chức năng

#### 3.1 Xử lý Xem chi tiết thông tin tài khoản cá nhân

**Main Flow:**
1. Người dùng tap "Thông tin cá nhân" từ màn hình Cấu hình tài khoản.
2. Hệ thống hiển thị full-screen loading overlay (CMR-07).
3. Gọi API lấy thông tin tài khoản → Ẩn loading → Hiển thị 2 section **Hồ sơ** và **Thông tin** (read-only). Field null → hiển thị "-".
4. Người dùng tap nút Edit (✏️) → Chuyển sang màn hình Chỉnh sửa.

**Error Flows:**
- **API fail (5xx):** Ẩn loading → Toast: *"Hệ thống đang bận. Vui lòng thử lại sau."* (CMR-07)
- **Timeout (>10s):** Toast: *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + Nút "Thử lại". (CMR-07, CMR-16)
- **Mất mạng:** Toast: *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* + Nút "Thử lại". (CMR-07)
- **Session hết hạn (401):** Tự động dùng refresh token. Nếu refresh token hết hạn → Redirect về màn hình Đăng nhập + Toast: *"Phiên đăng nhập hết hạn."* (CMR-07)

**Pull-to-Refresh (CMR-13):**
- Kéo xuống từ đầu màn hình → Trigger gọi lại API lấy thông tin → Cập nhật dữ liệu.
- Nếu refresh thất bại → Giữ nguyên dữ liệu cũ + Toast lỗi (CMR-07).

---

#### 3.2 Xử lý Thu gọn / Mở rộng Section (Collapsible)

1. Màn hình Chỉnh sửa có 2 section: **Hồ sơ** và **Thông tin**, mặc định đều mở (expand).
2. Người dùng tap tiêu đề section (hoặc icon ^) → Section thu gọn / mở rộng xen kẽ.
3. Trạng thái thu gọn/mở rộng không ảnh hưởng đến dữ liệu đã nhập bên trong.
4. Khi validate lỗi: Nếu section đang collapsed mà có field lỗi bên trong → **Tự động expand** section đó để hiển thị lỗi.

---

#### 3.3 Xử lý Cập nhật thông tin tài khoản cá nhân

**Main Flow:**
1. Người dùng chỉnh sửa các trường được phép → Nút "Lưu thay đổi" chuyển sang Enabled.
2. Tap "Lưu thay đổi" (có debounce — CMR-18) → Validate toàn bộ form:
   - **Họ và tên:** Bắt buộc. Không chứa số hoặc ký tự đặc biệt. Max 100 ký tự.
   - **Email:** Bắt buộc. Đúng định dạng email.
   - **Số điện thoại:** Nếu nhập, phải đúng format theo quốc gia được chọn.
   - **Quốc gia, Tỉnh/TP, Phường/Xã, Địa chỉ:** Bắt buộc.
   - **Mã bưu chính:** Nếu nhập, chỉ alphanumeric.
3. Nếu có lỗi → Hiển thị inline error dưới trường tương ứng + Auto-expand section có lỗi. Không gọi API.
4. Validate thành công → Hiển thị loading indicator cục bộ → Gọi API cập nhật.
5. Thành công → Toast: *"Cập nhật thông tin thành công."* → Tự động quay về màn hình Xem chi tiết với dữ liệu mới nhất.

**Error Flows:**
- **API lưu fail (5xx):** Giữ nguyên dữ liệu đã nhập trên form. Toast: *"Hệ thống đang bận. Vui lòng thử lại sau."* (CMR-07)
- **Timeout (>10s):** Giữ nguyên dữ liệu đã nhập. Toast: *"Yêu cầu đã hết thời gian chờ. Vui lòng thử lại."* + Nút "Thử lại". (CMR-07)
- **Mất mạng:** Giữ nguyên dữ liệu đã nhập. Toast: *"Không thể kết nối. Vui lòng kiểm tra mạng và thử lại."* (CMR-07)
- **Session hết hạn:** Redirect về Đăng nhập + Toast: *"Phiên đăng nhập hết hạn."* (CMR-07)

**Hủy / Back khi có thay đổi chưa lưu:**
- Tap "Hủy" hoặc nút Back (←) hoặc nhấn Android Back button khi đã có thay đổi chưa lưu → Hiển thị Confirmation Dialog (CMR-10):
  - "Đồng ý" → Hủy toàn bộ thay đổi, quay về Xem chi tiết.
  - "Hủy" → Đóng dialog, ở lại màn hình Chỉnh sửa.
- Nếu chưa có thay đổi → Quay về Xem chi tiết ngay, không cần dialog.

---

#### 3.4 Xử lý Cascade Dropdown địa chỉ

1. Khi người dùng thay đổi **Quốc gia** → Tự động reset và load lại danh sách **Tỉnh/TP**. Đồng thời reset **Phường/Xã** về trống.
2. Khi người dùng thay đổi **Tỉnh/TP** → Tự động reset và load lại danh sách **Phường/Xã**.
3. Danh sách được lấy từ API danh mục — không hard-code (CMR-03).

#### 3.5 Đa ngôn ngữ (→ Xem CMR-17)

Toàn bộ text cứng trên màn hình UC249 (header, label trường thông tin, placeholder, nút "Lưu thay đổi"/"Hủy", thông báo lỗi validation, toast thành công/thất bại) được dịch sang ngôn ngữ hiển thị tương ứng khi người dùng đổi ngôn ngữ. Hỗ trợ 5 ngôn ngữ: VI, EN, ZH, JA, KO. Nội dung dữ liệu người dùng (họ tên, email, số điện thoại, địa chỉ) hiển thị nguyên bản — không thay đổi theo ngôn ngữ.

---

### 4. Acceptance Criteria

#### AC-01: Xem chi tiết thông tin tài khoản

| # | Tiêu chí | Pass condition |
|---|---|---|
| AC-01-1 | Màn hình tải thành công | Hiển thị full-screen loading khi gọi API. Sau khi nhận dữ liệu: 2 section Hồ sơ + Thông tin hiển thị đúng với dữ liệu tài khoản. |
| AC-01-2 | Field null hiển thị đúng | Mọi field có giá trị null từ API hiển thị "-". |
| AC-01-3 | Tất cả fields là read-only | Không có field nào cho phép chỉnh sửa trực tiếp trên màn hình Xem chi tiết. |
| AC-01-4 | Nút Edit hiển thị và hoạt động | Nút ✏️ hiển thị trên App Bar với mọi tài khoản Cá nhân. Tap → Mở màn hình Chỉnh sửa. |
| AC-01-5 | Pull-to-Refresh hoạt động | Kéo xuống → Spinner hiển thị → Dữ liệu mới nhất được tải lại. |
| AC-01-6 | Xử lý lỗi API | API fail / timeout / mất mạng → Hiển thị đúng message lỗi theo CMR-07. |

#### AC-02: Chỉnh sửa thông tin tài khoản

| # | Tiêu chí | Pass condition |
|---|---|---|
| AC-02-1 | Trạng thái nút "Lưu thay đổi" | Disabled khi mở màn hình lần đầu (chưa có thay đổi). Enabled ngay khi có bất kỳ field nào thay đổi. |
| AC-02-2 | Validation Họ và tên | Để trống → *"Họ và tên là bắt buộc."* Nhập số/ký tự đặc biệt → *"Không nhập số, ký tự đặc biệt."* |
| AC-02-3 | Validation Email | Để trống → *"Email là bắt buộc."* Sai định dạng → *"Sai định dạng."* |
| AC-02-4 | Validation SĐT | Sai format theo quốc gia → *"Sai định dạng."* |
| AC-02-5 | Validation Mã bưu chính | Nhập ký tự đặc biệt → *"Không chấp nhận ký tự đặc biệt."* |
| AC-02-6 | Auto-expand khi lỗi | Section đang collapsed có field lỗi → Tự động expand. |
| AC-02-7 | Lưu thành công | Toast *"Cập nhật thông tin thành công."* → Quay về Xem chi tiết với dữ liệu mới nhất. |
| AC-02-8 | Confirmation Dialog khi Hủy | Có thay đổi chưa lưu + tap Hủy/Back → Hiển thị dialog "Dữ liệu chưa được lưu. Bạn có chắc muốn tiếp tục?" |
| AC-02-9 | Xử lý lỗi khi lưu | API lưu fail → Giữ nguyên dữ liệu đã nhập + Toast lỗi đúng theo CMR-07. |
| AC-02-10 | Cascade Dropdown | Đổi Quốc gia → Reset Tỉnh/TP + Phường/Xã. Đổi Tỉnh/TP → Reset Phường/Xã. |
| AC-02-11 | Debounce | Double-tap nút ✏️ hoặc "Lưu thay đổi" không trigger 2 lần (CMR-18). |

---

### 5. Lịch sử cập nhật

| Ngày | Phiên bản | Nội dung cập nhật |
|---|---|---|
| 29/04/2026 | v1 | Khởi tạo |
| 11/05/2026 | v2 | Bổ sung màn hình Xem chi tiết, cấu trúc 2-section, các trường địa chỉ theo wireframe |
| 11/05/2026 | v2 | Bổ sung Preconditions/Postconditions, Acceptance Criteria, error flows, validation rules chi tiết theo BA Q&A |
| 11/05/2026 | v2 | Cập nhật Họ và tên: block input tại 100 ký tự (không cho nhập thêm) |
| 11/05/2026 | v2 | Cập nhật Cascade Dropdown: spinner bên trong dropdown khi API đang load Tỉnh/TP và Phường/Xã |
| 11/05/2026 | v2 → v2.1 | Bổ sung section đa ngôn ngữ (CMR-17): text cứng dịch 5 ngôn ngữ (VI, EN, ZH, JA, KO), nội dung dữ liệu người dùng giữ nguyên |
| 2026-05-12 | v2.1 → v2.2 | Null display format | `--` (double dash) | `-` (single dash) | Đồng bộ CMR-14 v1.4 |
| 2026-05-12 | v2.1 → v2.2 | Inline error format (bắt buộc) | "Vui lòng nhập/chọn [field]." | "[field] là bắt buộc." | Đồng bộ CMR-09 v1.4 |
